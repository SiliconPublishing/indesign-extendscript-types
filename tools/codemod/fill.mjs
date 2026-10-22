// Codemod rule: declare what the measured dictionary has and upstream does not.
//
// Upstream is modelled on the 21.5 dictionary (and built on a platform without AppleScript), so
// some classes, enumerations, members and enumerators are absent. They are generated here from
// snapshots/<ver>/dictionary.json, marked "Generated from the InDesign <ver> scripting dictionary"
// so hand-tuning can replace them later. Typing is mechanical: the dictionary's own types, its
// "Can accept / Can return" alternatives where it gives them, `any` where it gives neither.
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { Node, SyntaxKind } from 'ts-morph';
import { ensureImport } from './util.mjs';

const NUMBER_WORDS = /^(Long Long Integer|Long Integer|Short Integer|Real|Integer|Number)s?$/;

/** A dictionary type as TypeScript text, plus the DOM names it refers to (to import). */
export function tsType(t, dict, { write = false } = {}) {
    const refs = new Set();
    const one = (name) => {
        switch (name) {
            case 'number':
            case 'string':
            case 'boolean':
            case 'void':
                return name;
            case 'any':
                return 'any';
            case 'Object':
                return 'object';
            case 'Date':
                return 'Date';
            case 'Measurement':
                return write ? 'number | string' : 'number';
            case 'File':
                refs.add(write ? 'FilePath' : 'File');
                return write ? 'FilePath' : 'File';
            default:
                if (dict[name]) {
                    refs.add(name);
                    return dict[name].kind === 'enum' ? name : name;
                }
                return 'any';
        }
    };
    const alt = (a) => {
        a = a.replace(/\s*\(.*\)\s*$/, '').trim();
        let m;
        if (/^(Ordered array|Array|Arrays)\b/.test(a) || a.includes(':')) return 'any[]';
        if ((m = /^(\w+) enumerators?$/.exec(a))) return one(m[1]);
        if (NUMBER_WORDS.test(a)) return 'number';
        if (/^Strings?$/.test(a)) return 'string';
        if (/^Booleans?$/.test(a)) return 'boolean';
        if (/^Units?$/.test(a)) return write ? 'number | string' : 'number';
        if (/^Files?$/.test(a)) return one('File');
        if (a === 'JavaScript Function') return 'Function';
        if (/^Objects?$/.test(a)) return 'object';
        return one(a);
    };
    let text = t.alternatives ? [...new Set(t.alternatives.map(alt))].join(' | ') : one(t.name);
    for (let i = 0; i < t.array; i++) text = /[|]/.test(text) ? `(${text})[]` : `${text}[]`;
    return { text, refs };
}

const doc = (desc, extra = []) => {
    const lines = [desc.replace(/\*\//g, '*\\/'), ...extra].filter(Boolean);
    return `  /**\n   * ${lines.join('\n   * ')}\n   */`;
};

export function memberTexts(cls, members, dict, ver) {
    const refs = new Set(['Read']);
    const out = [];
    const mark = `Generated from the InDesign ${ver} scripting dictionary.`;
    for (const p of members.props) {
        const r = tsType(p.type, dict);
        r.refs.forEach((x) => refs.add(x));
        if (p.readonly) out.push(`${doc(p.desc, [mark])}\n  readonly ${p.name}: Read<M, ${r.text}>;`);
        else {
            const w = tsType(p.type, dict, { write: true });
            w.refs.forEach((x) => refs.add(x));
            out.push(`${doc(p.desc, [mark])}\n  get ${p.name}(): Read<M, ${r.text}>;\n  set ${p.name}(value: ${w.text});`);
        }
    }
    for (const m of members.methods) {
        const params = m.params.map((a) => {
            const w = tsType(a.type, dict, { write: true });
            w.refs.forEach((x) => refs.add(x));
            const optional = a.optional || /\(Optional\)/.test(a.desc);
            const name = { in: 'inCoordinateSpace', with: 'withItems', for: 'forStatus', function: 'functionName' }[a.name] ?? a.name;
            return { text: `${name}${optional ? '?' : ''}: ${w.text}`, doc: `@param ${name} ${a.desc}` };
        });
        // A required parameter cannot follow an optional one in TypeScript.
        let seenOptional = false;
        for (let i = 0; i < params.length; i++) {
            if (params[i].text.includes('?:')) seenOptional = true;
            else if (seenOptional) params[i].text = params[i].text.replace(/^(\w+):/, '$1?:');
        }
        const r = tsType(m.returns, dict);
        r.refs.forEach((x) => refs.add(x));
        out.push(`${doc(m.desc, [...params.map((p) => p.doc), mark])}\n  ${m.name}(${params.map((p) => p.text).join(', ')}): Read<M, ${r.text}>;`);
    }
    return { text: out.join('\n\n'), refs };
}

export function importRefs(sf, refs, src, dict) {
    for (const r of refs) {
        if (['Read', 'Mode', 'File', 'Folder', 'FilePath'].includes(r)) ensureImport(sf, r, '_base/Types', src);
        else if (dict[r]?.kind === 'enum') ensureImport(sf, r, `Enums/${r}`, src);
        else if (dict[r] && sf.getBaseNameWithoutExtension() !== r) ensureImport(sf, r, r, src);
    }
}

function enumFile(e, aliases, ver) {
    const names = Object.keys(e.enumValues);
    const lines = [
        `/**\n * ${e.name}.d.ts — generated from the InDesign ${ver} scripting dictionary by tools/codemod/fill.mjs.\n */`,
        `import type { Enumeration, Enumerator, __val} from "../_base/Enums";`,
        `declare const __${e.name}: unique symbol;`,
        `interface ${e.name} extends Enumerator {\n  readonly [__${e.name}]: never;\n}`,
        ...names.map((n) => `interface ${e.name}_${n} extends ${e.name} {\n  readonly [__val]: ${e.enumValues[n]};\n}`),
        `export declare namespace ${e.name} {\n${names.map((n) => `type ${n} = ${e.name}_${n};`).join('\n')}\n}`,
        `/**\n * ${e.desc}\n */\nexport declare const ${e.name}: typeof Enumeration & {\n${names
            .flatMap((n) => [`  readonly ${n}: ${e.name}_${n};`, ...aliasesFor(n, aliases).map((a) => `  readonly ${a}: ${e.name}_${n};`)])
            .join('\n')}\n}`,
    ];
    return lines.join('\n\n') + '\n';
}

export function aliasesFor(name, aliases) {
    const parts = name.toLowerCase().split('_');
    const camel = parts[0] + parts.slice(1).map((p) => p.charAt(0).toUpperCase() + p.slice(1)).join('');
    return [camel, parts.join('')].filter((a, i, all) => a !== name && aliases.includes(a) && all.indexOf(a) === i);
}

/** Members a generated collection gets from the base collection interfaces. */
const COLLECTION_MEMBERS = new Set(['length', 'count', 'item', '[]', 'itemByRange', 'firstItem', 'lastItem', 'middleItem', 'previousItem', 'nextItem', 'anyItem', 'everyItem', 'toSource', 'itemByName', 'itemByID', 'getElements']);

/** Members a generated class gets from its base and must not redeclare. */
const BASE_MEMBERS = new Set(['isValid', 'parent', 'properties', 'toSource', 'toSpecifier', 'getElements', 'events', 'eventListeners', 'addEventListener', 'removeEventListener']);

/**
 * wholeOnly: only classes and enumerations the tree lacks entirely (InDesign Server's own; its
 * members and enumerators go to the edition parts, tools/codemod/editions.mjs). label names the
 * product in the "Generated from" notes.
 */
export function fillFromDictionary(project, src, root, snapshot, { wholeOnly = false, label = 'InDesign' } = {}) {
    const raw = JSON.parse(readFileSync(join(root, snapshot, 'dictionary.json'), 'utf8'));
    const dict = raw.classes;
    const ver = `${label === 'InDesign' ? '' : label.replace(/^InDesign /, '') + ' '}${raw.version.split('.').slice(0, 2).join('.')}`;
    const aliases = JSON.parse(readFileSync(join(root, snapshot, 'enum-aliases.json'), 'utf8'));
    const barrel = project.getSourceFileOrThrow(join(src, 'indesign.d.ts'));
    const enumBarrel = project.getSourceFileOrThrow(join(src, 'Enums/index.d.ts'));
    const added = { classes: [], enums: [], members: [], enumerators: [] };

    // Whole enumerations and classes.
    for (const c of Object.values(dict)) {
        if (c.kind === 'enum') {
            if (project.getSourceFile(join(src, `Enums/${c.name}.d.ts`))) continue;
            project.createSourceFile(join(src, `Enums/${c.name}.d.ts`), enumFile(c, aliases[c.name] ?? [], ver));
            enumBarrel.addExportDeclaration({ moduleSpecifier: `./${c.name}` });
            added.enums.push(c.name);
        } else if (!project.getSourceFile(join(src, `${c.name}.d.ts`)) && c.methods.some((m) => m.name === 'everyItem')) {
            // A collection: the base collection interfaces carry item(), everyItem(), [] and the rest.
            const element = c.methods.find((m) => m.name === 'item' || m.name === '[]')?.returns.name;
            const bases = [`BaseCollection<${element}, ${element}, ${element}<'plural'>>`];
            if (c.methods.some((m) => m.name === 'itemByName')) bases.push(`NamedCollection<${element}>`);
            if (c.methods.some((m) => m.name === 'itemByID')) bases.push(`IdCollection<${element}>`);
            const members = { props: c.props.filter((p) => !COLLECTION_MEMBERS.has(p.name)), methods: c.methods.filter((m) => !COLLECTION_MEMBERS.has(m.name)) };
            const body = memberTexts(c, members, dict, ver);
            const sf = project.createSourceFile(
                join(src, `${c.name}.d.ts`),
                `/**\n * ${c.name}.d.ts — generated from the InDesign ${ver} scripting dictionary by tools/codemod/fill.mjs.\n */\n\n` +
                    `/**\n * ${c.desc}\n */\nexport interface ${c.name} extends ${bases.join(', ')} {\n${body.text.replace(/Read<M, (.*)>;$/gm, '$1;')}\n}\n`,
            );
            body.refs.delete('Read');
            importRefs(sf, new Set([...body.refs, element]), src, dict);
            for (const b of ['BaseCollection', 'NamedCollection', 'IdCollection']) if (bases.some((x) => x.startsWith(b))) ensureImport(sf, b, '_base/Collections', src);
            barrel.addExportDeclaration({ moduleSpecifier: `./${c.name}` });
            added.classes.push(c.name);
        } else if (!project.getSourceFile(join(src, `${c.name}.d.ts`))) {
            const parentProp = c.props.find((p) => p.name === 'parent');
            const evented = c.methods.some((m) => m.name === 'addEventListener');
            const members = { props: c.props.filter((p) => !BASE_MEMBERS.has(p.name)), methods: c.methods.filter((m) => !BASE_MEMBERS.has(m.name)) };
            const body = memberTexts(c, members, dict, ver);
            const parent = parentProp ? tsType(parentProp.type, dict) : { text: 'any', refs: new Set() };
            const base = evented ? 'EventTargetDOMObject' : 'InDesignDOMObject';
            const sf = project.createSourceFile(
                join(src, `${c.name}.d.ts`),
                `/**\n * ${c.name}.d.ts — generated from the InDesign ${ver} scripting dictionary by tools/codemod/fill.mjs.\n */\n\n` +
                    `/**\n * ${c.desc}\n */\nexport interface ${c.name}<M extends Mode = 'single'> extends ${base}<${parent.text}, M> {\n${body.text}\n\n  /** Resolves the proxy into the individual objects it stands for. */\n  getElements(): ${c.name}<'single'>[];\n}\n`,
            );
            importRefs(sf, new Set([...body.refs, ...parent.refs, 'Mode']), src, dict);
            ensureImport(sf, base, '_base/DomObjects', src);
            barrel.addExportDeclaration({ moduleSpecifier: `./${c.name}` });
            added.classes.push(c.name);
        }
    }

    if (wholeOnly) return added;

    // Members of existing classes: compare against the class's resolved members (own + bases).
    // All type queries first; editing a file invalidates the checker for every later query.
    // The lib is needed to resolve bases such as `Omit<ShapeContainer<...>, 'epstexts'>`.
    const libs = ['typescript.d.ts', 'JavaScript.d.ts', 'global.d.ts'].map((f) => project.addSourceFileAtPath(join(root, 'lib', f)));
    const plans = [];
    for (const c of Object.values(dict)) {
        if (c.kind === 'enum' || added.classes.includes(c.name)) continue;
        const sf = project.getSourceFile(join(src, `${c.name}.d.ts`));
        const iface = sf?.getInterface(c.name);
        if (!iface) continue;
        plans.push({ c, sf, have: new Set(iface.getType().getProperties().map((p) => p.getName())) });
    }
    for (const l of libs) project.removeSourceFile(l);
    for (const { c, sf, have } of plans) {
        const iface = sf.getInterfaceOrThrow(c.name);
        const chain = [];
        for (let k = c; k; k = k.superclass ? dict[k.superclass] : null) chain.push(k);
        const props = new Map();
        const methods = new Map();
        for (const k of chain.reverse()) {
            k.props.forEach((p) => props.set(p.name, p));
            k.methods.forEach((m) => methods.set(m.name, m));
        }
        const missing = { props: [...props.values()].filter((p) => !have.has(p.name)), methods: [...methods.values()].filter((m) => m.name !== '[]' && !have.has(m.name)) };
        if (!missing.props.length && !missing.methods.length) continue;
        const body = memberTexts(c, missing, dict, ver);
        const close = iface.getEnd() - 1;
        sf.insertText(close, `\n  // ---- Generated from the InDesign ${ver} dictionary (not in upstream) ----\n\n${body.text}\n`);
        importRefs(sf, body.refs, src, dict);
        for (const m of [...missing.props, ...missing.methods]) added.members.push(`${c.name}.${m.name}`);
    }

    // Enumerators missing from existing enumerations.
    for (const e of Object.values(dict)) {
        if (e.kind !== 'enum' || added.enums.includes(e.name)) continue;
        const sf = project.getSourceFile(join(src, `Enums/${e.name}.d.ts`));
        const constDecl = sf?.getVariableDeclaration(e.name);
        if (!constDecl) continue;
        const literal = constDecl.getTypeNodeOrThrow().getDescendantsOfKind(SyntaxKind.TypeLiteral)[0];
        const have = new Set(literal.getProperties().map((p) => p.getName()));
        const ns = sf.getModule(e.name);
        for (const [name, value] of Object.entries(e.enumValues)) {
            if (have.has(name)) continue;
            const iname = `${e.name}_${name}`;
            const last = sf.getInterfaces().filter((i) => i.getName().startsWith(`${e.name}_`)).pop();
            sf.insertInterface(last ? last.getChildIndex() + 1 : 0, {
                name: iname,
                extends: [e.name],
                docs: [`Generated from the InDesign ${ver} scripting dictionary${/APPLESCRIPT|PICT/.test(name) ? ' (macOS only)' : ''}.`],
                properties: [{ name: '[__val]', isReadonly: true, type: String(value) }],
            });
            ns?.addTypeAlias({ name, type: iname });
            literal.addProperty({ name, isReadonly: true, type: iname });
            for (const a of aliasesFor(name, aliases[e.name] ?? [])) literal.addProperty({ name: a, isReadonly: true, type: iname });
            added.enumerators.push(`${e.name}.${name}`);
        }
    }
    return added;
}
