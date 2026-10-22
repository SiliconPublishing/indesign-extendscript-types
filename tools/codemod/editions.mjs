// Codemod rule: one tree, three editions (desktop, server, portable).
//
// tools/editions/model.mjs sorts every member by edition. Members both editions share stay where
// they are. The rest moves out of the interface that declares it (a class, or a mixin many classes
// share) into that interface's edition parts, declared next to it:
//
//   export interface PageItem<…> extends …, InDesignEdition.PageItem<…> { …common members… }
//   export interface PageItemDesktop<…> extends EditionPart, TransformableItemDesktop<…> { exportFile(format, to, showingOptions?, …) }
//   export interface PageItemServer<…>  extends EditionPart, TransformableItemServer<…>  { exportFile(format, to, …) }
//   export interface PageItemPortable<…> extends EditionPart, TransformableItemPortable<…> { exportFile(format, to) }
//
// A part extends the parts of its interface's bases, with the same type arguments, so a class's
// part carries everything its mixins moved. Only dictionary classes are hooked (InDesignEdition.X,
// with all their type parameters); each entry point's edition file (tools/codemod/globals.mjs)
// declares the hooks as extending the desktop, server or portable parts.
//
//   - desktop only: moved to the Desktop part as is.
//   - server only: generated from the Server dictionary into the class's own Server part.
//   - both, with different parameters: the declaration moves to the Desktop part; the Server part
//     gets it with the Server's parameter list (parameters matched by name; new ones generated);
//     the Portable part gets it cut after the parameters both share (tools/editions/model.mjs).
//   - enumerators only one edition has leave the enumeration object for InDesignEdition.<Enum>.
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { Node, SyntaxKind } from 'ts-morph';
import { editionModel } from '../editions/model.mjs';
import { aliasesFor, importRefs, memberTexts, tsType } from './fill.mjs';
import { ensureImport } from './util.mjs';

export const EDITIONS = ['Desktop', 'Server', 'Portable'];

const read = (root, snapshot, file) => JSON.parse(readFileSync(join(root, snapshot, file), 'utf8'));
const shortVersion = (v) => v.split('.').slice(0, 2).join('.');

/** Adds a line to a member's doc comment (or gives it one), after the description, before any tag. */
function withNote(text, note) {
    const m = /^(\s*\/\*\*[\s\S]*?)(\s*\*\/)/.exec(text);
    if (!m || !text.trimStart().startsWith('/**')) return `  /**\n   * ${note}\n   */\n  ${text.trimStart()}`;
    const tag = /\n\s*\*\s*@/.exec(m[1]);
    if (tag) return `${m[1].slice(0, tag.index)}\n   * ${note}${m[1].slice(tag.index)}${m[2]}${text.slice(m[0].length)}`;
    return `${m[1]}\n   * ${note}${m[2]}${text.slice(m[0].length)}`;
}

const signatureText = (entry) => `${entry.params.map((p) => `${p.name}${p.optional || /\(Optional\)/.test(p.desc ?? '') ? '?' : ''}`).join(', ')}`;

/**
 * A method declaration rewritten to another parameter list. dParams: the dictionary parameters the
 * declaration was written for (positional); target: the parameters wanted, by dictionary name.
 */
function rewriteMethod(node, dParams, target, dict) {
    const tsParams = node.getParameters();
    const byName = new Map();
    dParams.forEach((p, i) => tsParams[i] && byName.set(p.name, tsParams[i]));
    const refs = new Set();
    const docs = node.getJsDocs();
    const keptNames = new Set();
    const params = target.map((p) => {
        const existing = byName.get(p.name);
        if (existing) {
            keptNames.add(existing.getName());
            return { text: existing.getText(), doc: null };
        }
        const w = tsType(p.type, dict, { write: true });
        w.refs.forEach((r) => refs.add(r));
        const name = { in: 'inCoordinateSpace', with: 'withItems', for: 'forStatus', function: 'functionName' }[p.name] ?? p.name;
        const optional = p.optional || /\(Optional\)/.test(p.desc ?? '');
        return { text: `${name}${optional ? '?' : ''}: ${w.text}`, doc: `@param ${name} ${p.desc ?? ''}`.trim() };
    });
    let seenOptional = false;
    for (const p of params) {
        if (/^\.\.\.|\?\s*:/.test(p.text) || /=/.test(p.text)) seenOptional = true;
        else if (seenOptional) p.text = p.text.replace(/^(\w+)\s*:/, '$1?:');
    }
    // Doc comment: the description and tags, minus @param tags of parameters that are gone.
    let doc = '';
    if (docs.length) {
        const d = docs[docs.length - 1];
        const lines = d.getDescription().trim().replace(/\*\//g, '*\\/').split('\n');
        for (const tag of d.getTags()) {
            const t = tag.getText().trim().replace(/\s*\*\s*$/, '');
            if (Node.isJSDocParameterTag(tag) && !keptNames.has(tag.getName())) continue;
            lines.push(t.replace(/\n\s*\*\s?/g, ' '));
        }
        for (const p of params) if (p.doc) lines.push(p.doc);
        doc = `  /**\n${lines.filter(Boolean).map((l) => `   * ${l}`).join('\n')}\n   */\n`;
    } else {
        const added = params.filter((p) => p.doc).map((p) => p.doc);
        if (added.length) doc = `  /**\n${added.map((l) => `   * ${l}`).join('\n')}\n   */\n`;
    }
    const tps = node.getTypeParameters().map((t) => t.getText());
    const ret = node.getReturnTypeNode()?.getText() ?? 'any';
    return { text: `${doc}  ${node.getName()}${tps.length ? `<${tps.join(', ')}>` : ''}(${params.map((p) => p.text).join(', ')}): ${ret};`, refs };
}

export function splitEditions(project, src, root, { desktop: desktopSnapshot, server: serverSnapshot }) {
    const desktopRaw = read(root, desktopSnapshot, 'dictionary.json');
    const serverRaw = read(root, serverSnapshot, 'dictionary.json');
    const D = desktopRaw.classes;
    const S = serverRaw.classes;
    const union = { ...S, ...D };
    const dver = shortVersion(desktopRaw.version);
    const sver = shortVersion(serverRaw.version);
    const model = editionModel(D, S);
    const serverSamples = (() => {
        try {
            return read(root, serverSnapshot, 'runtime.json').samples;
        } catch {
            return {};
        }
    })();
    project.createSourceFile(
        join(src, '_base/Editions.d.ts'),
        `/**\n * Editions.d.ts — generated by tools/codemod/editions.mjs.\n */\n\n/** The base of every edition part (XDesktop, XServer, XPortable): members one edition has, or has differently. */\nexport interface EditionPart {}\n`,
        { overwrite: true },
    );
    const report = { moved: 0, generated: 0, conflicts: [], unplaced: [], parts: 0, hooks: 0, enumerators: 0 };

    const libs = ['typescript.d.ts', 'JavaScript.d.ts', 'global.d.ts'].map((f) => project.addSourceFileAtPath(join(root, 'lib', f)));
    const ifaceOf = (name) => project.getSourceFile(join(src, `${name}.d.ts`))?.getInterface(name);
    const keyOf = (decl) => `${decl.getSourceFile().getFilePath()}#${decl.getName()}`;

    // ---- 1. Where each moving member is declared (all type queries before any edit). -------------
    // owner key -> { owner, members: Map<name, { status, x }> }
    const owners = new Map();
    const serverOnly = new Map(); // class -> [dictionary entries]
    const movedDecls = new Map(); // owner key -> Set<member name>
    for (const [cls, members] of model.members) {
        const iface = ifaceOf(cls);
        if (!iface) {
            report.unplaced.push(`${cls}: no interface`);
            continue;
        }
        const type = iface.getType();
        for (const [name, x] of members) {
            if (x.status === 'server') {
                (serverOnly.get(cls) ?? serverOnly.set(cls, []).get(cls)).push(x);
                continue;
            }
            const sym = type.getProperty(name);
            const decls = (sym?.getDeclarations() ?? []).map((d) => d.getFirstAncestorByKind(SyntaxKind.InterfaceDeclaration) ?? d).filter(Node.isInterfaceDeclaration);
            const owner = [...new Set(decls)].find((d) => d.getSourceFile().getFilePath().startsWith(src));
            if (!owner) {
                report.unplaced.push(`${cls}.${name}: no declaration`);
                continue;
            }
            const key = keyOf(owner);
            if (!owners.has(key)) owners.set(key, { owner, members: new Map() });
            const entry = owners.get(key).members.get(name);
            const sig = JSON.stringify(x.server ?? null);
            if (entry && (entry.x.status !== x.status || JSON.stringify(entry.x.server ?? null) !== sig)) report.conflicts.push(`${owner.getName()}.${name}: ${entry.cls} ${entry.x.status}, ${cls} ${x.status}`);
            else if (!entry) owners.get(key).members.set(name, { x, cls });
            (movedDecls.get(key) ?? movedDecls.set(key, new Set()).get(key)).add(name);
        }
    }
    // A shared declaration moves only if no class that both editions have uses it unchanged.
    for (const [cls, status] of model.classes) {
        if (status !== 'common' || union[cls].kind === 'enum') continue;
        const iface = ifaceOf(cls);
        if (!iface) continue;
        const own = model.members.get(cls) ?? new Map();
        const type = iface.getType();
        for (const [key, names] of movedDecls) {
            for (const name of names) {
                if (own.has(name)) continue;
                const sym = type.getProperty(name);
                if (!sym) continue;
                const decls = sym.getDeclarations().map((d) => d.getFirstAncestorByKind(SyntaxKind.InterfaceDeclaration) ?? d);
                if (decls.some((d) => Node.isInterfaceDeclaration(d) && keyOf(d) === key) && resolvedHas(D, cls, name) && resolvedHas(S, cls, name))
                    report.conflicts.push(`${owners.get(key).owner.getName()}.${name}: shared with ${cls}, where both editions have it alike`);
            }
        }
    }
    if (report.conflicts.length) {
        for (const l of libs) project.removeSourceFile(l);
        return report;
    }

    // Heritage of every interface in the tree: [{ name, args, decl }] of resolved bases.
    const heritage = new Map(); // key -> { decl, bases: [{ decl, args: string[] }] }
    for (const sf of project.getSourceFiles()) {
        if (!sf.getFilePath().startsWith(src)) continue;
        for (const iface of sf.getInterfaces()) {
            const bases = [];
            for (const h of iface.getExtends()) {
                let expr = h;
                if (h.getExpression().getText() === 'Omit') {
                    const inner = h.getTypeArguments()[0];
                    if (!Node.isTypeReference(inner)) continue;
                    const sym = inner.getTypeName().getSymbol();
                    const target = (sym?.getAliasedSymbol?.() ?? sym)?.getDeclarations()?.find(Node.isInterfaceDeclaration);
                    if (target) bases.push({ decl: target, key: keyOf(target), args: inner.getTypeArguments().map((a) => a.getText()) });
                    continue;
                }
                const sym = expr.getExpression().getSymbol();
                const target = (sym?.getAliasedSymbol?.() ?? sym)?.getDeclarations()?.find(Node.isInterfaceDeclaration);
                if (target && target.getSourceFile().getFilePath().startsWith(src)) bases.push({ decl: target, key: keyOf(target), args: h.getTypeArguments().map((a) => a.getText()) });
            }
            heritage.set(keyOf(iface), { decl: iface, path: sf.getFilePath(), name: iface.getName(), bases });
        }
    }
    for (const l of libs) project.removeSourceFile(l);

    // ---- 2. Part contents. -----------------------------------------------------------------------
    const parts = new Map(); // key -> { Desktop: [text], Server: [], Portable: [], refs: Set }
    const partOf = (key) => parts.get(key) ?? parts.set(key, { Desktop: [], Server: [], Portable: [], refs: new Set() }).get(key);
    const removals = [];
    for (const [key, { owner, members }] of owners) {
        const part = partOf(key);
        for (const [name, { x }] of members) {
            const nodes = owner.getMembers().filter((m) => (m.getName?.() ?? m.getSymbol?.()?.getName()) === name);
            for (const node of nodes) {
                const docs = node.getJsDocs?.() ?? [];
                const text = `${docs.map((d) => `  ${d.getText()}\n`).join('')}  ${node.getText()}`;
                if (x.status === 'desktop') {
                    part.Desktop.push(withNote(text, `Desktop only: InDesign Server ${sver} does not have it.`));
                } else {
                    part.Desktop.push(withNote(text, `InDesign Server ${sver} takes \`${name}(${signatureText(x.server)})\` instead.`));
                    if (Node.isMethodSignature(node)) {
                        const s = rewriteMethod(node, x.desktop.params, x.server.params, union);
                        s.refs.forEach((r) => part.refs.add(r));
                        part.Server.push(withNote(s.text, `InDesign desktop ${dver} takes \`${name}(${signatureText(x.desktop)})\` instead.`));
                        if (x.portable) {
                            const p = rewriteMethod(node, x.desktop.params, x.portable.params, union);
                            part.Portable.push(
                                withNote(
                                    p.text,
                                    `Portable form: the editions' parameters differ after these (desktop \`${name}(${signatureText(x.desktop)})\`, InDesign Server \`${name}(${signatureText(x.server)})\`). Cast to \`InDesignDesktop\` or \`InDesignServer\` types for the rest.`,
                                ),
                            );
                        }
                    }
                }
                removals.push(node);
            }
            report.moved++;
        }
    }
    // Server-only members, generated into each class's own Server part.
    for (const [cls, list] of serverOnly) {
        const iface = ifaceOf(cls);
        const key = keyOf(iface);
        const part = partOf(key);
        const body = memberTexts(S[cls], { props: list.filter((x) => x.kind === 'props').map((x) => x.server), methods: list.filter((x) => x.kind === 'methods').map((x) => x.server) }, union, `Server ${sver}`);
        // Widened by what InDesign Server returned (only null so far: an unset reference).
        body.text = body.text.replace(/(get |readonly )(\w+)(\(\))?: Read<M, (.*)>;$/gm, (m, kw, name, call, t) =>
            serverSamples[`${cls}.${name}`]?.null && !/\bnull\b/.test(t) ? `${kw}${name}${call ?? ''}: Read<M, ${t} | null>;` : m,
        );
        body.refs.forEach((r) => part.refs.add(r));
        // Collections have no mode parameter.
        const text = iface.getTypeParameter('M') ? body.text : body.text.replace(/Read<M, (.*)>;$/gm, '$1;');
        part.Server.push(...text.split('\n\n').map((t) => withNote(t, 'InDesign Server only.')));
        report.generated += list.length;
    }

    // An interface needs parts when it has moved members or a base that needs parts.
    const needs = new Map();
    const need = (key, seen = new Set()) => {
        if (needs.has(key)) return needs.get(key);
        if (seen.has(key)) return false;
        seen.add(key);
        const h = heritage.get(key);
        const v = parts.has(key) || (h?.bases ?? []).some((b) => need(b.key, seen));
        needs.set(key, v);
        return v;
    };
    for (const key of heritage.keys()) need(key);

    // ---- 3. Edits. --------------------------------------------------------------------------------
    for (const node of removals.reverse()) if (!node.wasForgotten()) node.remove();
    const hooks = [];
    const partNames = new Set();
    for (const [key, h] of heritage) {
        if (!needs.get(key)) continue;
        const sf = project.getSourceFileOrThrow(h.path);
        const name = h.name;
        const iface = sf.getInterfaceOrThrow(name);
        const content = parts.get(key) ?? { Desktop: [], Server: [], Portable: [], refs: new Set() };
        const tps = iface.getTypeParameters().map((t) => t.getText());
        const tpDecl = tps.length ? `<${tps.join(', ')}>` : '';
        const texts = EDITIONS.map((ed) => {
            const bases = ['EditionPart'];
            for (const b of h.bases) {
                if (!needs.get(b.key)) continue;
                const bh = heritage.get(b.key);
                const bname = `${bh.name}${ed}`;
                bases.push(`${bname}${b.args.length ? `<${b.args.join(', ')}>` : ''}`);
                if (bh.path !== h.path) {
                    const rel = bh.path.slice(src.length + 1).replace(/\.d\.ts$/, '');
                    ensureImport(sf, bname, rel, src);
                }
            }
            const body = content[ed].length ? `\n${content[ed].join('\n\n')}\n` : '';
            return `\n\n/** ${name}'s members ${ed === 'Portable' ? 'as both InDesign desktop and InDesign Server have them' : `only InDesign ${ed === 'Desktop' ? 'desktop' : 'Server'} has, or has differently`} (tools/codemod/editions.mjs). */\nexport interface ${name}${ed}${tpDecl} extends ${bases.join(', ')} {${body}}`;
        });
        sf.insertStatements(iface.getChildIndex() + 1, texts.join('').trim());
        ensureImport(sf, 'EditionPart', '_base/Editions', src);
        importRefs(sf, content.refs, src, union);
        EDITIONS.forEach((ed) => partNames.add(`${name}${ed}`));
        report.parts++;
    }
    // Hooks on every dictionary class, with all its type parameters.
    for (const [cls] of model.classes) {
        if (union[cls].kind === 'enum') continue;
        const iface = ifaceOf(cls);
        if (!iface) continue;
        const use = iface.getTypeParameters().map((t) => t.getName());
        iface.addExtends(`InDesignEdition.${cls}${use.length ? `<${use.join(', ')}>` : ''}`);
        hooks.push({ name: cls, hasParts: partNames.has(`${cls}Desktop`) });
        report.hooks++;
    }

    // ---- 4. Enumerators only one edition has. -----------------------------------------------------
    const desktopAliases = read(root, desktopSnapshot, 'enum-aliases.json');
    const serverAliases = read(root, serverSnapshot, 'enum-aliases.json');
    const enumHooks = [];
    for (const [e, only] of model.enumerators) {
        const sf = project.getSourceFile(join(src, `Enums/${e}.d.ts`));
        const constDecl = sf?.getVariableDeclaration(e);
        if (!constDecl) {
            report.unplaced.push(`${e}: no enumeration object`);
            continue;
        }
        const literal = constDecl.getTypeNodeOrThrow().getDescendantsOfKind(SyntaxKind.TypeLiteral)[0];
        for (const n of only.desktop) for (const p of literal.getProperties()) if (p.getTypeNode()?.getText() === `${e}_${n}`) p.remove();
        const ns = sf.getModule(e);
        for (const n of only.server) {
            const last = sf.getInterfaces().filter((i) => i.getName().startsWith(`${e}_`)).pop();
            sf.insertInterface(last ? last.getChildIndex() + 1 : 0, {
                name: `${e}_${n}`,
                extends: [e],
                docs: [`Generated from the InDesign Server ${sver} scripting dictionary.`],
                properties: [{ name: '[__val]', isReadonly: true, type: String(S[e].enumValues[n]) }],
            });
            ns?.addTypeAlias({ name: n, type: `${e}_${n}` });
        }
        constDecl.setType(`${constDecl.getTypeNodeOrThrow().getText()} & InDesignEdition.${e}`);
        enumHooks.push({
            name: e,
            Desktop: only.desktop.flatMap((n) => [n, ...aliasesFor(n, desktopAliases[e] ?? [])].map((k) => [k, n])),
            Server: only.server.flatMap((n) => [n, ...aliasesFor(n, serverAliases[e] ?? [])].map((k) => [k, n])),
        });
        report.enumerators += only.desktop.length + only.server.length;
    }
    return { ...report, hooks, enumHooks, model, versions: { desktop: dver, server: sver } };
}

function resolvedHas(dict, cls, name) {
    for (let k = dict[cls]; k; k = k.superclass ? dict[k.superclass] : null) if (k.props.some((p) => p.name === name) || k.methods.some((m) => m.name === name)) return true;
    return false;
}
