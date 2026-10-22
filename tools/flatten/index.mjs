#!/usr/bin/env node
// Flattens the authored tree (types/) into flat/: the shape upstream publishes for editors that
// show resolved members instead of mixins and mode generics.
//
//   node tools/flatten/index.mjs [--in types] [--out flat]
//
// Rules (inferred from upstream's published flat/ tree, and checked against it by
// `node tools/flatten/verify.mjs`):
//   - An interface with an `extends` clause has its inherited members inlined (bases first, its
//     own last, a member redeclared later replacing the earlier one) and loses the clause.
//   - If it has the mode parameter M, it becomes two interfaces: `X<…>` (M = 'single') and
//     `XPlural<…>` (M = 'plural'), both without M. Of its other type parameters only TParent is
//     kept; the rest (TChildParent, NGet, NSet, ...) take their defaults.
//   - Everywhere, including doc comments: `Read<'single', V>` → `V`, `Read<'plural', V>` → `V[]`,
//     `X<…, 'single'>` → `X<…>`, `X<…, 'plural'>` → `XPlural<…>` for a flattened X.
//   - Not flattened: interfaces without heritage, interfaces with a type parameter that has no
//     default (building blocks such as InDesignDOMObject<Parent, M>), and enumerations.
//   - Other declarations are untouched.
//   - Hooks (InDesignPlugins.X<M>, InDesignEdition.X<…>) stay bases: a plugin hook with the mode
//     fixed, an edition hook renamed per variant (InDesignEdition.X<TParent> / XPlural<TParent>).
import { cpSync, existsSync, mkdirSync, readdirSync, readFileSync, renameSync, rmSync, statSync, writeFileSync } from 'node:fs';
import { dirname, join, relative, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import ts from 'typescript';

const root = join(dirname(fileURLToPath(import.meta.url)), '..', '..');

function walk(dir) {
    const out = [];
    for (const f of readdirSync(dir)) {
        const p = join(dir, f);
        if (statSync(p).isDirectory()) out.push(...walk(p));
        else if (f.endsWith('.d.ts')) out.push(p);
    }
    return out;
}

const parse = (path, text) => ts.createSourceFile(path, text, ts.ScriptTarget.Latest, true);

// Plugin extension points (tools/codemod/plugin-hooks.mjs) and edition hooks
// (tools/codemod/editions.mjs): bases that stay as bases.
const isHook = (h, sf) => /^InDesign(Plugins|Edition)\./.test(h.expression.getText(sf));

// Interface name -> its type parameters' default texts, to spell `X<Default>` as `X`, as upstream does.
let DEFAULTS = new Map();

/** Applies [start, end, text] edits to a string (non-overlapping). */
function splice(text, edits) {
    let out = text;
    for (const [a, b, t] of [...edits].sort((x, y) => y[0] - x[0])) out = out.slice(0, a) + t + out.slice(b);
    return out;
}

// ---------------------------------------------------------------------------------------------
// The program: files, their imports, and their interfaces.
// ---------------------------------------------------------------------------------------------

function load(dir) {
    const files = new Map();
    for (const path of walk(dir)) {
        const text = readFileSync(path, 'utf8');
        const sf = parse(path, text);
        const imports = new Map(); // local name -> { module: abs path w/o ext, name }
        const interfaces = new Map();
        for (const st of sf.statements) {
            if (ts.isImportDeclaration(st) && st.importClause?.namedBindings && ts.isNamedImports(st.importClause.namedBindings)) {
                const module = resolve(dirname(path), st.moduleSpecifier.text);
                for (const el of st.importClause.namedBindings.elements) imports.set(el.name.text, { module, name: (el.propertyName ?? el.name).text });
            }
            if (ts.isInterfaceDeclaration(st)) interfaces.set(st.name.text, st);
        }
        files.set(path.replace(/\.d\.ts$/, ''), { path, text, sf, imports, interfaces });
    }
    return files;
}

/** The interface a name refers to from a file: declared there, or imported (following re-exports is not needed here). */
function resolveInterface(files, file, name) {
    if (file.interfaces.has(name)) return { file, decl: file.interfaces.get(name) };
    const imp = file.imports.get(name);
    if (!imp) return null;
    const target = files.get(imp.module) ?? files.get(join(imp.module, 'index'));
    if (!target || !target.interfaces.has(imp.name)) return null;
    return { file: target, decl: target.interfaces.get(imp.name) };
}

// ---------------------------------------------------------------------------------------------
// Type text rewriting, by AST spans.
// ---------------------------------------------------------------------------------------------

/**
 * Rewrites type text: substitutes type parameters (`subst`: name -> text) and `this`, then
 * resolves Read<'single'|'plural', V> and mode arguments of flattened interfaces, to a fixpoint.
 */
function rewriteType(text, subst, flattened, self) {
    let cur = text;
    for (let pass = 0; pass < 20; pass++) {
        const sf = parse('x.ts', `type __T = ${cur};`);
        const base = 'type __T = '.length;
        const edits = [];
        let changed = false;
        const visit = (node) => {
            if (ts.isTypeReferenceNode(node) && ts.isIdentifier(node.typeName)) {
                const name = node.typeName.text;
                const args = node.typeArguments ?? [];
                if (!args.length && subst.has(name)) {
                    edits.push([node.getStart(sf) - base, node.getEnd() - base, subst.get(name)]);
                    changed = true;
                    return;
                }
                const lit = (a) => (a && ts.isLiteralTypeNode(a) && ts.isStringLiteral(a.literal) ? a.literal.text : null);
                if (name === 'Read' && args.length === 2 && lit(args[0])) {
                    const v = args[1].getText(sf);
                    edits.push([node.getStart(sf) - base, node.getEnd() - base, lit(args[0]) === 'plural' ? `(${v})[]` : v]);
                    changed = true;
                    return;
                }
                const defaults = DEFAULTS.get(name);
                if (defaults && args.length) {
                    let keep = args.length;
                    while (keep > 0 && defaults[keep - 1] !== undefined && defaults[keep - 1] !== "'single'" && defaults[keep - 1] === args[keep - 1].getText(sf).replace(/\s+/g, ' ')) keep--;
                    if (keep < args.length) {
                        const kept = args.slice(0, keep).map((a) => a.getText(sf));
                        edits.push([node.getStart(sf) - base, node.getEnd() - base, `${name}${kept.length ? `<${kept.join(', ')}>` : ''}`]);
                        changed = true;
                        return;
                    }
                }
                const info = flattened.get(name);
                const dropped = info ? args.some((_, i) => i !== info.modeIndex && i !== info.keptIndex) : false;
                if (info && ((info.modeIndex >= 0 && args.length > info.modeIndex && lit(args[info.modeIndex])) || dropped)) {
                    const mode = info.modeIndex >= 0 ? lit(args[info.modeIndex]) : null;
                    const rest = args.filter((_, i) => i === info.keptIndex).map((a) => a.getText(sf));
                    edits.push([node.getStart(sf) - base, node.getEnd() - base, `${mode === 'plural' ? `${name}Plural` : name}${rest.length ? `<${rest.join(', ')}>` : ''}`]);
                    changed = true;
                    return;
                }
            }
            if (node.kind === ts.SyntaxKind.ThisType && subst.has('this')) {
                edits.push([node.getStart(sf) - base, node.getEnd() - base, subst.get('this')]);
                changed = true;
                return;
            }
            ts.forEachChild(node, visit);
        };
        visit(sf.statements[0].type);
        if (!changed) break;
        cur = splice(cur, edits);
        subst = new Map(); // substitutions apply once; later passes only simplify
    }
    return cur;
}

/** The same rewrites in doc comments: `X<TParent, 'plural'>` → `XPlural<TParent>`. */
function rewriteDocs(text, flattened) {
    return text.replace(/\b([A-Z]\w*)<([^<>`]*?),\s*'(single|plural)'>/g, (m, name, rest, mode) =>
        flattened.get(name)?.modeIndex >= 0 ? `${mode === 'plural' ? `${name}Plural` : name}<${rest}>` : m,
    ).replace(/\b([A-Z]\w*)<'(single|plural)'>/g, (m, name, mode) => (flattened.get(name)?.modeIndex >= 0 ? (mode === 'plural' ? `${name}Plural` : name) : m));
}

// ---------------------------------------------------------------------------------------------
// Member collection.
// ---------------------------------------------------------------------------------------------

const memberName = (m) => (m.name ? (ts.isIdentifier(m.name) || ts.isStringLiteral(m.name) ? m.name.text : m.name.getText()) : m.kind === ts.SyntaxKind.IndexSignature ? '[index]' : m.kind === ts.SyntaxKind.CallSignature ? '()' : '?');

/**
 * Members of `decl` with type parameters bound by `subst` (name -> text), bases first.
 * Returns [{ name, texts: [member text with docs], file }], one entry per name (accessor pairs and
 * overloads together).
 */
function collect(files, file, decl, subst, omit = new Set(), seen = new Set()) {
    const key = `${file.path}#${decl.name.text}`;
    if (seen.has(key)) return [];
    seen = new Set([...seen, key]);
    const out = new Map();
    const put = (entries) => {
        for (const e of entries) {
            if (omit.has(e.name)) continue;
            out.delete(e.name); // a later declaration replaces and moves to the end
            out.set(e.name, e);
        }
    };
    for (const clause of decl.heritageClauses ?? []) {
        for (const h of clause.types) {
            let expr = h.expression.getText(file.sf);
            let args = (h.typeArguments ?? []).map((a) => rewriteType(a.getText(file.sf), subst, new Map(), null));
            let baseOmit = new Set();
            if ((expr === 'Omit' || expr === 'Pick') && h.typeArguments?.length === 2) {
                // Omit<Base<...>, 'a' | 'b'>
                const inner = h.typeArguments[0];
                const keys = new Set([...h.typeArguments[1].getText(file.sf).matchAll(/'([^']+)'/g)].map((m) => m[1]));
                if (!ts.isTypeReferenceNode(inner)) continue;
                expr = inner.typeName.getText(file.sf);
                args = (inner.typeArguments ?? []).map((a) => rewriteType(a.getText(file.sf), subst, new Map(), null));
                baseOmit = expr && h.expression.getText(file.sf) === 'Omit' ? keys : baseOmit;
            }
            const target = resolveInterface(files, file, expr);
            if (!target) continue;
            const tps = target.decl.typeParameters ?? [];
            const bind = new Map();
            tps.forEach((tp, i) => {
                const v = args[i] ?? (tp.default ? rewriteType(tp.default.getText(target.file.sf), bind, new Map(), null) : 'unknown');
                bind.set(tp.name.text, v);
            });
            if (subst.has('this')) bind.set('this', subst.get('this'));
            put(collect(files, target.file, target.decl, bind, new Set([...baseOmit, ...omit]), seen));
        }
    }
    // Own members, grouped by name.
    const own = new Map();
    for (const m of decl.members) {
        const name = memberName(m);
        const entry = own.get(name) ?? { name, members: [], file };
        entry.members.push(m);
        own.set(name, entry);
    }
    put(
        [...own.values()].map((e) => ({
            name: e.name,
            file,
            texts: e.members.map((m) => ({ text: m.getFullText(file.sf), node: m })),
            subst,
        })),
    );
    return [...out.values()];
}

/** Renders collected members for one mode. */
function renderMembers(entries, flattened, extraSubst) {
    const lines = [];
    for (const e of entries) {
        for (const { text, node } of e.texts) {
            // Rewrite each type node inside the member, keeping docs and layout.
            const sf = node.getSourceFile();
            const start = node.getFullStart();
            const edits = [];
            const subst = new Map([...e.subst, ...extraSubst]);
            const visit = (n) => {
                if (ts.isTypeNode(n) && !ts.isTypeNode(n.parent)) {
                    edits.push([n.getStart(sf) - start, n.getEnd() - start, rewriteType(n.getText(sf), subst, flattened, null)]);
                    return;
                }
                ts.forEachChild(n, visit);
            };
            visit(node);
            lines.push(rewriteDocs(splice(text, edits), flattened).replace(/^\n+/, '\n'));
        }
    }
    return lines.join('');
}

// ---------------------------------------------------------------------------------------------

export function flatten(inDir, outDir) {
    const files = load(inDir);
    DEFAULTS = new Map();
    for (const f of files.values())
        for (const [name, decl] of f.interfaces)
            if (decl.typeParameters?.some((tp) => tp.default)) DEFAULTS.set(name, decl.typeParameters.map((tp) => (tp.default ? tp.default.getText(f.sf).replace(/\s+/g, ' ') : undefined)));
    // Which interfaces flatten, and where their mode parameter is.
    const flattened = new Map();
    for (const f of files.values()) {
        if (relative(inDir, f.path).startsWith('Enums')) continue; // enumerations stay as they are
        for (const [name, decl] of f.interfaces) {
            const real = (decl.heritageClauses ?? []).flatMap((c) => c.types).filter((h) => !isHook(h, f.sf));
            if (!real.length) continue;
            // Only interfaces that can stand alone: a parameter without a default (InDesignDOMObject's
            // Parent) marks a building block, which upstream keeps generic.
            if ((decl.typeParameters ?? []).some((tp) => !tp.default)) continue;
            const tps = decl.typeParameters ?? [];
            const modeIndex = tps.findIndex((tp) => tp.name.text === 'M');
            const keptIndex = tps.findIndex((tp) => /Parent$/.test(tp.name.text));
            flattened.set(name, { modeIndex, keptIndex });
        }
    }
    // Interfaces with a mode parameter that are not flattened still get mode references rewritten?
    // No: upstream keeps them generic (TextGraphicAttributes<M>).

    // Every exported type name in the tree -> the file (abs, no extension) that declares it,
    // XPlural names included, for importing what inlined members bring along.
    const exportIndex = new Map();
    for (const f of files.values()) {
        if (/[\\/]index$/.test(f.path.replace(/\.d\.ts$/, '')) || /indesign$|globals$|module$/.test(f.path.replace(/\.d\.ts$/, ''))) continue;
        for (const st of f.sf.statements) {
            const exported = st.modifiers?.some((m) => m.kind === ts.SyntaxKind.ExportKeyword);
            if (!exported) continue;
            const names = [];
            if ((ts.isInterfaceDeclaration(st) || ts.isTypeAliasDeclaration(st) || ts.isClassDeclaration(st) || ts.isModuleDeclaration(st)) && st.name) names.push(st.name.text);
            if (ts.isVariableStatement(st)) for (const d of st.declarationList.declarations) names.push(d.name.text);
            for (const n of names) {
                if (!exportIndex.has(n)) exportIndex.set(n, f.path.replace(/\.d\.ts$/, ''));
                if (flattened.get(n)?.modeIndex >= 0) exportIndex.set(`${n}Plural`, f.path.replace(/\.d\.ts$/, ''));
            }
        }
    }

    const outputs = new Map();
    for (const f of files.values()) {
        const edits = [];
        const extraImports = new Map(); // name -> module (abs, no ext)
        for (const [name, decl] of f.interfaces) {
            const info = flattened.get(name);
            const tps = decl.typeParameters ?? [];
            if (!info) {
                // Kept as is, apart from reference rewriting inside it.
                const start = decl.getStart(f.sf);
                const text = f.text.slice(start, decl.getEnd());
                edits.push([start, decl.getEnd(), rewriteBody(text, decl, f, flattened)]);
                continue;
            }
            // Only the first parent parameter stays; any other (TChildParent beside TParent, NGet,
            // NSet, ...) takes its default.
            const others = tps.filter((_, i) => i === info.keptIndex);
            const fixed = new Map(tps.filter((tp, i) => tp.name.text !== 'M' && i !== info.keptIndex).map((tp) => [tp.name.text, tp.default.getText(f.sf)]));
            const paramDecl = others.length ? `<${others.map((tp) => tp.getText(f.sf)).join(', ')}>` : '';
            const paramUse = others.length ? `<${others.map((tp) => tp.name.text).join(', ')}>` : '';
            const variants = info.modeIndex >= 0 ? ['single', 'plural'] : [null];
            const docs = (decl.jsDoc ?? []).map((d) => d.getText(f.sf)).join('\n');
            // Plugin hooks stay bases, with the mode fixed per variant.
            const hooks = (decl.heritageClauses ?? []).flatMap((c) => c.types).filter((h) => isHook(h, f.sf));
            const blocks = [];
            for (const mode of variants) {
                const iname = mode === 'plural' ? `${name}Plural` : name;
                const subst = new Map(tps.map((tp) => [tp.name.text, fixed.get(tp.name.text) ?? tp.name.text]));
                if (mode) subst.set('M', `'${mode}'`);
                subst.set('this', `${iname}${paramUse}`);
                const entries = collect(files, f, decl, subst);
                for (const e of entries) {
                    if (e.file !== f) for (const id of identifiersIn(e)) if (!f.imports.has(id) && !f.interfaces.has(id)) {
                        const mod = moduleOf(files, e.file, id);
                        if (mod) extraImports.set(id, mod);
                    }
                }
                const body = renderMembers(entries, flattened, new Map([['this', `${iname}${paramUse}`]]));
                // An edition hook is per variant (InDesignEdition.X / XPlural, with the kept
                // parameters), since each edition file extends the variant's flattened part.
                const hookText = hooks.map((h) =>
                    h.expression.getText(f.sf).startsWith('InDesignEdition.') ? `InDesignEdition.${iname}${paramUse}` : h.getText(f.sf).replace(/<M>$/, mode ? `<'${mode}'>` : '<M>'),
                );
                blocks.push(`${mode === 'plural' && docs ? `${rewriteDocs(docs, flattened)}\n` : ''}export interface ${iname}${paramDecl}${hookText.length ? ` extends ${hookText.join(', ')}` : ''} {${body}\n}`);
            }
            const start = decl.getStart(f.sf);
            edits.push([start, decl.getEnd(), blocks.join('\n\n')]);
        }
        let text = splice(f.text, edits);
        // Imports the inlined members need, and plural names of flattened interfaces.
        const importLines = [];
        for (const [id, mod] of extraImports) {
            let spec = relative(dirname(f.path), mod);
            if (!spec.startsWith('.')) spec = `./${spec}`;
            importLines.push(`import type { ${id} } from '${spec}';`);
        }
        text = addPluralImports(text, f, files, flattened);
        if (importLines.length) text = insertImports(text, importLines);
        text = importUnresolved(text, f, exportIndex);
        // Re-exported plural names: `export type { X }` lists in barrels name only X; upstream's
        // barrels use `export *`, which carries XPlural along.
        outputs.set(join(outDir, relative(inDir, f.path)), text);
    }
    return outputs;
}

/** Rewrites type references inside a kept interface (mode refs to flattened interfaces). */
function rewriteBody(text, decl, f, flattened) {
    const start = decl.getStart(f.sf);
    const edits = [];
    const visit = (n) => {
        if (ts.isTypeNode(n) && !ts.isTypeNode(n.parent)) {
            const t = n.getText(f.sf);
            const r = rewriteType(t, new Map(), flattened, null);
            if (r !== t) edits.push([n.getStart(f.sf) - start, n.getEnd() - start, r]);
            return;
        }
        ts.forEachChild(n, visit);
    };
    ts.forEachChild(decl, visit);
    return rewriteDocs(splice(text, edits), flattened);
}

const BUILTIN = new Set(['Read', 'Mode', 'Array', 'Function', 'Object', 'String', 'Number', 'Boolean', 'Date', 'RegExp', 'Partial', 'Readonly', 'Pick', 'Record', 'Omit', 'Exclude', 'Extract', 'NonNullable', 'ReturnType', 'Parameters', 'File', 'Folder', 'Reflection', 'XML']);

function identifiersIn(entry) {
    const ids = new Set();
    for (const { node } of entry.texts) {
        const sf = node.getSourceFile();
        const visit = (n) => {
            if (ts.isTypeReferenceNode(n)) ids.add((ts.isIdentifier(n.typeName) ? n.typeName : n.typeName.left).getText(sf).split('.')[0]);
            if (ts.isExpressionWithTypeArguments(n)) ids.add(n.expression.getText(sf));
            ts.forEachChild(n, visit);
        };
        visit(node);
    }
    for (const id of [...ids]) if (entry.subst?.has(id) || BUILTIN.has(id)) ids.delete(id);
    return ids;
}

/** The module (abs path, no extension) that provides `id` as seen from `file`. */
function moduleOf(files, file, id) {
    if (file.imports.has(id)) return file.imports.get(id).module;
    for (const st of file.sf.statements) {
        if ((ts.isInterfaceDeclaration(st) || ts.isTypeAliasDeclaration(st) || ts.isClassDeclaration(st)) && st.name?.text === id) return file.path.replace(/\.d\.ts$/, '');
    }
    return null;
}

/** Adds `import type { XPlural }` wherever the rewritten text mentions an imported X's plural. */
function addPluralImports(text, f, files, flattened) {
    const lines = [];
    for (const [local, imp] of f.imports) {
        const plural = `${local}Plural`;
        if (!flattened.get(local) || flattened.get(local).modeIndex < 0) continue;
        if (!new RegExp(`\\b${plural}\\b`).test(text) || f.imports.has(plural)) continue;
        let spec = relative(dirname(f.path), imp.module);
        if (!spec.startsWith('.')) spec = `./${spec}`;
        lines.push(`import type { ${plural} } from '${spec}';`);
    }
    return lines.length ? insertImports(text, lines) : text;
}

/** Imports, from the tree, every type name the text references but neither declares nor imports. */
function importUnresolved(text, f, exportIndex) {
    const sf = parse('x.ts', text);
    const local = new Set();
    const used = new Set();
    for (const st of sf.statements) {
        if (ts.isImportDeclaration(st) && st.importClause?.namedBindings && ts.isNamedImports(st.importClause.namedBindings))
            for (const el of st.importClause.namedBindings.elements) local.add(el.name.text);
        if ((ts.isInterfaceDeclaration(st) || ts.isTypeAliasDeclaration(st) || ts.isClassDeclaration(st) || ts.isModuleDeclaration(st)) && st.name) local.add(st.name.text);
        if (ts.isVariableStatement(st)) for (const d of st.declarationList.declarations) local.add(d.name.text);
    }
    const visit = (n) => {
        if (ts.isTypeParameterDeclaration(n)) local.add(n.name.text);
        if (ts.isTypeReferenceNode(n)) used.add((ts.isIdentifier(n.typeName) ? n.typeName : n.typeName.left).getText(sf).split('.')[0]);
        if (ts.isTypeQueryNode(n)) used.add(n.exprName.getText(sf).split('.')[0]);
        ts.forEachChild(n, visit);
    };
    visit(sf);
    const self = f.path.replace(/\.d\.ts$/, '');
    const lines = [];
    for (const id of used) {
        if (local.has(id) || !exportIndex.has(id) || exportIndex.get(id) === self) continue;
        let spec = relative(dirname(f.path), exportIndex.get(id));
        if (!spec.startsWith('.')) spec = `./${spec}`;
        lines.push(`import type { ${id} } from '${spec}';`);
    }
    return lines.length ? insertImports(text, lines) : text;
}

function insertImports(text, lines) {
    const sf = parse('x.ts', text);
    const last = [...sf.statements].filter(ts.isImportDeclaration).pop();
    const at = last ? last.getEnd() : 0;
    return `${text.slice(0, at)}\n${lines.join('\n')}${text.slice(at)}`;
}

export function writeFlat(inDir, outDir) {
    const outputs = flatten(inDir, outDir);
    const staging = `${outDir}.new`;
    rmSync(staging, { recursive: true, force: true });
    for (const [path, text] of outputs) {
        const target = join(staging, relative(outDir, path));
        mkdirSync(dirname(target), { recursive: true });
        writeFileSync(target, text);
    }
    if (existsSync(outDir)) {
        rmSync(`${outDir}.old`, { recursive: true, force: true });
        renameSync(outDir, `${outDir}.old`);
    }
    renameSync(staging, outDir);
    try {
        rmSync(`${outDir}.old`, { recursive: true, force: true, maxRetries: 5, retryDelay: 200 });
    } catch (e) {
        console.log(`  (could not remove ${relative(root, `${outDir}.old`)}: ${e.code}; it is safe to delete)`);
    }
    return outputs.size;
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
    const arg = (n, d) => {
        const i = process.argv.indexOf(n);
        return i >= 0 ? process.argv[i + 1] : d;
    };
    const n = writeFlat(resolve(root, arg('--in', 'types')), resolve(root, arg('--out', 'flat')));
    console.log(`wrote ${n} files`);
}
