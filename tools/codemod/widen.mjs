// Codemod rule: widen read types by what InDesign actually returned (snapshots/<ver>/runtime.json).
//
// For every sampled `Class.prop` whose observed values are not covered by the declared read type,
// the declaration that provides the member (often a shared mixin, such as TextAttributes) gets the
// missing types added to its getter: `get ruleAboveColor(): Read<M, Swatch>` becomes
// `Read<M, Swatch | string>`. A writable property signature is split into a widened getter and the
// original setter, so only reading changes.
//
// What gets added, per observed value:
//   null, string, number, boolean      as is
//   enum NOTHING                       NothingEnum.NOTHING (unset style attributes read back as NOTHING)
//   another enumerator                 its enumeration, when the value identifies exactly one
//   File, Folder                       ExtendScript File / Folder
//   a DOM object                       its class
// Arrays and anything else are left to overlays, and reported.
import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { Node, SyntaxKind, ts } from 'ts-morph';
import { TypeAtoms, observedCovered } from '../compare/atoms.mjs';
import { ensureImport } from './util.mjs';

export function widenByRuntime(project, src, root, snapshot) {
    const dict = JSON.parse(readFileSync(join(root, snapshot, 'dictionary.json'), 'utf8')).classes;
    const runtime = JSON.parse(readFileSync(join(root, snapshot, 'runtime.json'), 'utf8'));
    const enumNames = new Set(Object.keys(dict).filter((n) => dict[n].kind === 'enum'));

    // Resolve each sampled class with default type arguments, as the comparer does.
    const classes = Object.keys(dict).filter((c) => dict[c].kind !== 'enum');
    const libs = ['typescript.d.ts', 'JavaScript.d.ts', 'global.d.ts'].map((f) => project.addSourceFileAtPath(join(root, 'lib', f)));
    const probe = project.createSourceFile(
        join(src, '__widen_probe.ts'),
        classes.map((c) => `type __${c} = import('./indesign').${c};`).join('\n'),
        { overwrite: true },
    );
    const checker = project.getTypeChecker().compilerObject;
    const atoms = new TypeAtoms(ts, checker, enumNames);
    const aliases = new Map(probe.getTypeAliases().map((a) => [a.getName().slice(2), a]));

    const writes = existsSync(join(root, snapshot, 'writes.json')) ? JSON.parse(readFileSync(join(root, snapshot, 'writes.json'), 'utf8')).writes : {};
    const setterEdits = new Map(); // set-accessor declaration -> Set of type texts to add
    const nsetNeeds = new Map(); // shared interface -> { props, classes } needing `| NSet`
    const addNsetNeed = (setter, prop, cls) => {
        const owner = setter.parent;
        const key = `${owner.getSourceFile().fileName}#${owner.name?.text}`;
        const need = nsetNeeds.get(key) ?? { file: owner.getSourceFile().fileName, iface: owner.name?.text, props: new Set(), classes: new Set() };
        need.props.add(prop);
        need.classes.add(cls);
        nsetNeeds.set(key, need);
    };
    const edits = new Map(); // declaration node -> Set of type texts to add
    const parentOverrides = new Map(); // class -> observed parent types its inherited declaration lacks
    const unhandled = [];
    // Observations: runtime samples, plus what the dictionary's prose says a getter "Can return"
    // (strings for swatches/styles/fonts named by string, NothingEnum, File): the sample cannot
    // prove those never come back, and where it did meet them it confirmed the dictionary.
    const observations = { ...runtime.samples };
    const RETURNS = { String: 'string', 'NothingEnum enumerator': `enum:${dict.NothingEnum.enumValues.NOTHING}:NOTHING`, File: 'File' };
    for (const c of Object.values(dict)) {
        if (c.kind === 'enum') continue;
        const chain = [];
        for (let k = c; k; k = k.superclass ? dict[k.superclass] : null) chain.push(k);
        for (const p of chain.flatMap((k) => k.props)) {
            if (!/Can return/.test(p.desc) || !p.type.alternatives || p.type.array) continue;
            for (const alt of p.type.alternatives) {
                const atom = RETURNS[alt.replace(/\s*\(.*\)\s*$/, '')];
                if (!atom) continue;
                const key = `${c.name}.${p.name}`;
                observations[key] = { ...(observations[key] ?? {}), [atom]: 1 };
            }
        }
    }
    for (const [key, observed] of Object.entries(observations)) {
        const [cls, prop] = key.split('.');
        const alias = aliases.get(cls);
        if (!alias) continue;
        const type = checker.getTypeAtLocation(alias.compilerNode.name);
        const sym = checker.getPropertyOfType(type, prop);
        if (!sym) continue;
        const declared = atoms.atoms(checker.getTypeOfSymbolAtLocation(sym, alias.compilerNode));
        const add = new Set();
        for (const seen of Object.keys(observed)) {
            if (seen === 'throws' || seen === 'blocked' || observedCovered(seen, declared, dict)) continue;
            const text = typeText(seen, dict, prop);
            if (text) add.add(text);
            else unhandled.push(`${key}: ${seen}`);
        }
        if (!add.size) continue;
        const decl = (sym.getDeclarations() ?? []).find((d) => ts.isGetAccessorDeclaration(d) || ts.isPropertySignature(d));
        if (!decl) {
            unhandled.push(`${key}: no editable declaration`);
            continue;
        }
        // A declaration typed by its interface's own type parameters (`parent: Read<M, Parent>`)
        // is shared by every class; one class's observation must not widen it.
        const owner = decl.parent;
        // (`NGet`/`NObj`/`NSet` only widen sparse styles, so those declarations are fair game.)
        const params = (owner.typeParameters ?? []).map((tp) => tp.name.text).filter((n) => /Parent/.test(n));
        const typeNode = ts.isGetAccessorDeclaration(decl) ? decl.type : decl.type;
        if (typeNode && params.some((n) => new RegExp(`\\b${n}\\b`).test(typeNode.getText()))) {
            if (prop === 'parent') {
                const entry = parentOverrides.get(cls) ?? new Map();
                for (const t of add) entry.set(t.text, t);
                parentOverrides.set(cls, entry);
            } else unhandled.push(`${key}: ${[...add].map((t) => t.text).join(' | ')} (generic declaration)`);
            continue;
        }
        const set = edits.get(decl) ?? new Set();
        for (const t of add) set.add(t);
        edits.set(decl, set);
    }

    // Apply, after all type queries (edits invalidate the checker).
    // Members whose read or write crashes InDesign (runtime-crashers.json): warn in their docs.
    const crashers = existsSync(join(root, snapshot, 'runtime-crashers.json')) ? JSON.parse(readFileSync(join(root, snapshot, 'runtime-crashers.json'), 'utf8')) : {};
    const crashDocs = new Map(); // "file:pos" -> { file, pos, notes }
    for (const [key, info] of Object.entries(crashers)) {
        if (key.startsWith('<') || key.endsWith('[]')) continue; // a fixture step or a collection, not a member
        const [member, trial] = key.split(':');
        const [cls, prop] = member.split('.');
        const alias = aliases.get(cls);
        const sym = alias && checker.getPropertyOfType(checker.getTypeAtLocation(alias.compilerNode.name), prop);
        const decl = sym?.getDeclarations()?.find((d) => ts.isGetAccessorDeclaration(d) || ts.isPropertySignature(d));
        if (!decl) {
            unhandled.push(`${key}: crasher not declared on ${cls} (documented where declared)`);
            continue;
        }
        const what = !trial ? 'Reading it' : trial === 'roundtrip' ? 'Assigning it the value it reads back' : trial === 'nothing' ? 'Assigning `NothingEnum.NOTHING`' : `Assigning a ${trial} value`;
        const k = `${decl.getSourceFile().fileName}:${decl.getStart()}`;
        const entry = crashDocs.get(k) ?? { file: decl.getSourceFile().fileName, iface: decl.parent.name.text, member: decl.name.text, notes: new Set() };
        entry.notes.add(`**Crashes InDesign ${info.version}**: ${what.charAt(0).toLowerCase() + what.slice(1)} on a ${cls} takes InDesign down (measured).`);
        crashDocs.set(k, entry);
    }

    // Setters: kinds of value InDesign accepted that the declared setter does not take.
    // (An enumerator's bare number is accepted too, but deliberately not declared.)
    const TRIALS = { nothing: { atom: 'enum:NothingEnum', text: 'NothingEnum.NOTHING', importName: 'NothingEnum', import: 'Enums/NothingEnum' }, name: { atom: 'string', text: 'string' }, unit: { atom: 'string', text: 'string' }, path: { atom: 'string', text: 'string' } };
    // Which classes share each setter declaration (mixins serve styles and text objects alike).
    const users = new Map();
    for (const [cls, alias] of aliases) {
        for (const sym of checker.getPropertiesOfType(checker.getTypeAtLocation(alias.compilerNode.name))) {
            const setter = sym.getDeclarations()?.find((d) => ts.isSetAccessorDeclaration(d));
            if (!setter) continue;
            const set = users.get(setter) ?? new Set();
            set.add(cls);
            users.set(setter, set);
        }
    }
    for (const [key, tried] of Object.entries(writes)) {
        if (/is a read only property/.test(tried.roundtrip ?? '')) continue;
        const [cls, prop] = key.split('.');
        const alias = aliases.get(cls);
        if (!alias) continue;
        const sym = checker.getPropertyOfType(checker.getTypeAtLocation(alias.compilerNode.name), prop);
        const setter = sym?.getDeclarations()?.find((d) => ts.isSetAccessorDeclaration(d));
        if (!setter?.parameters[0]?.type) continue;
        const declared = atoms.atoms(checker.getTypeAtLocation(setter.parameters[0]));
        for (const [trial, t] of Object.entries(TRIALS)) {
            if (tried[trial] !== 'ok' || declared.has(t.atom) || declared.has('any')) continue;
            if (trial === 'nothing') {
                // Shared with a class that rejects NOTHING (a style's attribute is also a text
                // object's): only the accepting classes get it, through the NSet parameter.
                const sharers = [...(users.get(setter) ?? [])];
                const rejecting = sharers.filter((u) => { const w = writes[`${u}.${prop}`]?.nothing; return w && w !== 'ok' && w !== 'blocked'; });
                if (rejecting.length) {
                    addNsetNeed(setter, prop, cls);
                    continue;
                }
            }
            const set = setterEdits.get(setter) ?? new Map();
            set.set(t.text, t);
            setterEdits.set(setter, set);
        }
    }
    // Setters, from the dictionary's "Can accept": unit strings ("6pt") and name strings
    // everywhere, NothingEnum where unsetting means something: styles and find/change criteria
    // (probes "a derived character style unsets with NothingEnum", "find preferences unset ...";
    // text objects reject it: "NothingEnum on a text attribute").
    const UNSETTABLE = /Style$|^(Find|Change)\w*(Preference|Setting)$|^FindChange\w*Setting$/;
    for (const c of Object.values(dict)) {
        if (c.kind === 'enum') continue;
        const alias = aliases.get(c.name);
        if (!alias) continue;
        const chain = [];
        for (let k = c; k; k = k.superclass ? dict[k.superclass] : null) chain.push(k);
        for (const p of chain.flatMap((k) => k.props)) {
            if (p.readonly || p.type.array) continue;
            const alternatives = p.type.alternatives ?? (p.type.name === 'Measurement' ? ['Unit'] : []);
            const wants = [];
            for (const alt of alternatives.map((a) => a.replace(/\s*\(.*\)\s*$/, ''))) {
                if (alt === 'Unit' || alt === 'String') wants.push(TRIALS.name);
                if (alt === 'NothingEnum enumerator' && UNSETTABLE.test(c.name)) wants.push(TRIALS.nothing);
            }
            if (!wants.length) continue;
            const sym = checker.getPropertyOfType(checker.getTypeAtLocation(alias.compilerNode.name), p.name);
            const setter = sym?.getDeclarations()?.find((d) => ts.isSetAccessorDeclaration(d));
            if (!setter?.parameters[0]?.type) continue;
            const declared = atoms.atoms(checker.getTypeAtLocation(setter.parameters[0]));
            for (const t of wants) {
                if (declared.has(t.atom) || declared.has('any')) continue;
                if (t === TRIALS.nothing && ![...(users.get(setter) ?? [])].every((u) => UNSETTABLE.test(u))) {
                    // Shared with classes that reject NOTHING: parameterise the declaring interface.
                    addNsetNeed(setter, p.name, c.name);
                    continue;
                }
                const set = setterEdits.get(setter) ?? new Map();
                set.set(t.text, t);
                setterEdits.set(setter, set);
            }
        }
    }
    const setterPending = [...setterEdits].map(([d, add]) => ({ file: d.getSourceFile().fileName, pos: d.parameters[0].type.getStart(), add: [...add.values()] }));

    // One edit per declaration, however many classes observed it.
    const merged = new Map();
    for (const [decl, add] of edits) {
        const key = `${decl.getSourceFile().fileName}:${decl.getStart()}`;
        const entry = merged.get(key) ?? { file: decl.getSourceFile().fileName, pos: decl.getStart(), add: new Map() };
        for (const t of add) entry.add.set(t.text, t);
        merged.set(key, entry);
    }
    const pending = [...merged.values()].map((e) => ({ ...e, add: [...e.add.values()] }));
    probe.delete();
    for (const l of libs) project.removeSourceFile(l);
    // Index the editable declarations by position first: edits shift later positions.
    const index = new Map();
    const nodeAt = (sf, pos) => {
        if (!index.has(sf)) {
            const m = new Map();
            sf.forEachDescendant((n) => {
                if (Node.isGetAccessorDeclaration(n) || Node.isPropertySignature(n)) m.set(n.getStart(), n);
            });
            index.set(sf, m);
        }
        return index.get(sf).get(pos);
    };
    const targets = pending.map(({ file, pos, add }) => {
        const sf = project.getSourceFileOrThrow(file);
        return { sf, node: nodeAt(sf, pos), add };
    });
    const setterTargets = setterPending.map(({ file, pos, add }) => {
        const sf = project.getSourceFileOrThrow(file);
        return { sf, node: sf.getDescendantAtPos(pos)?.getParentWhile((n) => n.getStart() === pos) ?? sf.getDescendantAtPos(pos), add };
    });
    let count = 0;
    for (const { sf, node: target, add } of targets) {
        if (!target) continue;
        const typeNode = Node.isGetAccessorDeclaration(target) ? target.getReturnTypeNode() : target.getTypeNode();
        if (!typeNode) continue;
        const original = typeNode.getText();
        const widened = widenText(original, [...add].map((t) => t.text));
        const arrays = add.filter((t) => t.text.endsWith('[]'));
        if (arrays.length && Node.isGetAccessorDeclaration(target)) {
            // The value read back is an array, and the dictionary types the property as one: the
            // setter takes what the getter gives.
            const setter = target.getSetAccessor();
            const p = setter?.getParameters()[0]?.getTypeNode();
            if (p) p.replaceWithText(widenText(p.getText(), arrays.map((t) => t.text)));
        }
        if (Node.isPropertySignature(target) && !target.isReadonly()) {
            // Keep the setter as declared; only the getter widens.
            const name = target.getName();
            const docs = target.getJsDocs().map((d) => d.getText()).join('\n  ');
            target.replaceWithText(`${docs ? docs + '\n  ' : ''}get ${name}(): ${widened};\n  set ${name}(value: ${unRead(original)});`);
        } else {
            typeNode.replaceWithText(widened);
        }
        for (const t of add) if (t.import) ensureImport(sf, t.importName ?? t.text, t.import, src);
        count++;
    }

    for (const { sf, node, add } of setterTargets) {
        if (!node) continue;
        node.replaceWithText(widenText(node.getText(), add.map((t) => t.text)));
        for (const t of add) if (t.import) ensureImport(sf, t.importName ?? t.text, t.import, src);
        count++;
    }

    // A class whose observed parents its inherited `parent` does not allow (FindChangeBlendingSetting
    // inherits BlendingSetting's): give the base a `TParent` type parameter defaulting to its current
    // parents, and pass the observed ones from the class. (Not `Omit<Base, 'parent'>`: a mapped type
    // collapses every accessor pair to its getter type, losing wider setters.)
    for (const [cls, add] of parentOverrides) {
        const sf = project.getSourceFile(join(src, `${cls}.d.ts`));
        const iface = sf?.getInterface(cls);
        const bases = iface?.getExtends() ?? [];
        // The class passes its parent straight to the DOM-object bases: widen those arguments.
        const direct = bases.filter((h) => /DOMObject$/.test(h.getExpression().getText()) && h.getTypeArguments().length);
        if (direct.length) {
            const types = [...add.values()];
            for (const h of direct) {
                const arg = h.getTypeArguments()[0];
                arg.replaceWithText(widenText(arg.getText(), types.map((t) => t.text)));
            }
            for (const t of types) if (t.import) ensureImport(sf, t.importName ?? t.text, t.import, src);
            count++;
            continue;
        }
        const baseName = bases.length === 1 ? bases[0].getExpression().getText() : null;
        const baseDecl = baseName && project.getSourceFile(join(src, `${baseName}.d.ts`))?.getInterface(baseName);
        const tps = baseDecl?.getTypeParameters() ?? [];
        const heritage = baseDecl?.getExtends().find((h) => /DOMObject$/.test(h.getExpression().getText()));
        const parentArg = heritage?.getTypeArguments()[0];
        if (!baseDecl || tps.length !== 1 || tps[0].getName() !== 'M' || !parentArg) {
            unhandled.push(`${cls}.parent: ${[...add.keys()].join(' | ')} (base not parameterisable)`);
            continue;
        }
        if (!baseDecl.getTypeParameter('TParent')) {
            baseDecl.addTypeParameter({ name: 'TParent', default: parentArg.getText() });
            parentArg.replaceWithText('TParent');
            // Self-references (getElements(): Base<'single'>[]) carry the parent through.
            for (const ref of baseDecl.getDescendantsOfKind(SyntaxKind.TypeReference)) {
                if (ref.getTypeName().getText() === baseName && ref.getTypeArguments().length === 1) ref.replaceWithText(`${baseName}<${ref.getTypeArguments()[0].getText()}, TParent>`);
            }
        }
        const types = [...add.values()];
        bases[0].replaceWithText(`${baseName}<M, ${types.map((t) => t.text).join(' | ')}>`);
        for (const t of types) if (t.import) ensureImport(sf, t.importName ?? t.text, t.import, src);
        count++;
    }

    // Shared setters some classes may unset (CharacterStyle via TextGraphicAttributes,
    // FindChangeBlendingSetting via BlendingSetting): give the declaring interface an `NSet = never`
    // parameter used by just those setters, and have the unsettable classes pass NothingEnum.NOTHING.
    for (const need of nsetNeeds.values()) {
        const decl = project.getSourceFileOrThrow(need.file).getInterface(need.iface);
        if (!decl || decl.getTypeParameter('NSet') && !decl.getTypeParameter('NSet').getDefault()) {
            unhandled.push(`${need.iface}: cannot add NSet`);
            continue;
        }
        // A base that already has NSet (CharacterAttributesBase) is wired to NOTHING by upstream's
        // style interfaces; it only needs `| NSet` on the setters.
        const preexisting = !!decl.getTypeParameter('NSet');
        if (!preexisting) decl.addTypeParameter({ name: 'NSet', default: 'never' });
        for (const name of need.props) {
            const setter = decl.getSetAccessor(name);
            const param = setter?.getParameters()[0]?.getTypeNode();
            if (param && !/\bNSet\b/.test(param.getText())) param.replaceWithText(`${param.getText()} | NSet`);
        }
        const params = decl.getTypeParameters();
        const index = params.findIndex((tp) => tp.getName() === 'NSet');
        for (const cls of preexisting ? [] : need.classes) {
            const sf = project.getSourceFile(join(src, `${cls}.d.ts`));
            const ref = sf?.getInterface(cls)?.getExtends().find((h) => h.getExpression().getText() === need.iface);
            if (!ref) {
                unhandled.push(`${cls}: NOTHING setters from ${need.iface}, which it does not extend directly`);
                continue;
            }
            const args = ref.getTypeArguments().map((a) => a.getText());
            while (args.length < index) args.push(params[args.length].getDefault()?.getText() ?? 'never');
            args[index] = 'NothingEnum.NOTHING';
            ref.replaceWithText(`${need.iface}<${args.join(', ')}>`);
            ensureImport(sf, 'NothingEnum', 'Enums/NothingEnum', src);
        }
        ensureImport(decl.getSourceFile(), 'NothingEnum', 'Enums/NothingEnum', src);
        count++;
    }

    // Crash warnings last: raw text edits make ts-morph forget the file's nodes, so each member is
    // looked up afresh by interface and name.
    for (const { file, iface, member, notes } of crashDocs.values()) {
        const sf = project.getSourceFileOrThrow(file);
        const node = sf.getInterface(iface)?.getMembers().find((m) => (Node.isGetAccessorDeclaration(m) || Node.isPropertySignature(m)) && m.getName() === member);
        if (!node) {
            unhandled.push(`${iface}.${member}: crash note not placed`);
            continue;
        }
        const docs = node.getJsDocs();
        const last = docs[docs.length - 1];
        const existing = last ? last.getInnerText().trim().split('\n').map((l) => l.replace(/^\s*\*?\s?/, '')) : [];
        const lines = [...existing, ...(last ? [''] : []), ...[...notes].flatMap((n, i) => (i ? ['', n] : [n]))];
        const comment = `/**\n${lines.map((l) => `   *${l ? ` ${l}` : ''}`).join('\n')}\n   */`;
        if (last) sf.replaceText([last.getStart(), last.getEnd()], comment);
        else sf.replaceText([node.getStart(), node.getStart()], `${comment}\n  `);
        count++;
    }
    return { count, unhandled };
}

/** The type to add for one observed runtime atom, with the module it is imported from. */
function typeText(seen, dict, prop) {
    if (['null', 'string', 'number', 'boolean'].includes(seen)) return { text: seen };
    if (seen === 'undefined') return { text: 'undefined' };
    if (seen === 'File' || seen === 'Folder') return { text: seen, import: '_base/Types' };
    if (seen.startsWith('enum:')) {
        const [, value, name] = seen.split(':');
        if (name === 'NOTHING') return { text: 'NothingEnum.NOTHING', importName: 'NothingEnum', import: 'Enums/NothingEnum' };
        const candidates = Object.values(dict).filter((c) => c.kind === 'enum' && c.enumValues[name] === Number(value));
        return candidates.length === 1 ? { text: candidates[0].name, import: `Enums/${candidates[0].name}` } : null;
    }
    if (seen.startsWith('array<')) {
        // array<a|b>: an array of the element types, when each is expressible.
        const inner = seen.slice(6, -1).split('|').filter(Boolean);
        if (!inner.length) return null;
        const parts = inner.map((a) => typeText(a, dict, prop));
        if (parts.some((x) => !x)) return null;
        const names = [...new Set(parts.map((x) => x.text))];
        const imp = parts.find((x) => x.import);
        return { text: names.length > 1 ? `(${names.join(' | ')})[]` : `${names[0]}[]`, import: imp?.import, importName: imp?.importName ?? (imp ? imp.text : undefined) };
    }
    if (seen === 'Function' || seen === 'Object') return null;
    if (dict[seen]) return { text: seen, import: seen };
    return null;
}

/** Adds alternatives to a declared type, inside `Read<M, T>` when that is the shape. */
function widenText(text, add) {
    const m = /^Read<(\w+),\s*([\s\S]*)>$/.exec(text);
    const inner = m ? m[2] : text;
    const parts = add.filter((a) => !new RegExp(`(^|[|\\s])${a}($|[|\\s])`).test(inner));
    if (!parts.length) return text;
    const needsParens = /=>/.test(inner) && !/^\(.*\)$/.test(inner);
    const widened = `${needsParens ? `(${inner})` : inner} | ${parts.join(' | ')}`;
    return m ? `Read<${m[1]}, ${widened}>` : widened;
}

function unRead(text) {
    const m = /^Read<\w+,\s*([\s\S]*)>$/.exec(text);
    return m ? m[1] : text;
}
