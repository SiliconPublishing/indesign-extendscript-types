#!/usr/bin/env node
// Declarations for an InDesign plugin's scripting API, as an add-on to indesign-extendscript-types.
//
//   npm run plugin -- --name my-plugin-extendscript-types [options]
//
//   --name <package>        the package to generate (required)
//   --out <dir>             where (default: plugins/<name>)
//   --app <name>            InDesign to measure (default "Adobe InDesign 2026"), with the plugin installed
//   --baseline <dir>        InDesign without plugins (default snapshots/indesign-21.6)
//   --setup <file.jsx>      defines pluginFixture(doc, root, dir): makes the plugin's objects, so
//                           the samplers can read and write them (root(obj) registers one)
//   --raw <dir>             use an existing dictionary dump (dump/dictionary.jsx output) taken
//                           with the plugin loaded, instead of dumping; skips runtime sampling
//   --no-sample             dump the dictionary, but do not sample at runtime
//
// What it does:
//   1. dumps InDesign's scripting dictionary with the plugin loaded, and diffs it against the
//      baseline: the plugin's classes, enumerations, and members on InDesign's own classes;
//   2. samples those at runtime (unless offline): what reads return, what writes accept, which
//      crash InDesign (recorded, skipped, documented);
//   3. writes <out>/index.d.ts: members on InDesign's classes through the InDesignPlugins
//      extension points (tools/codemod/plugin-hooks.mjs), new classes and enumerations as globals;
//   4. checks it: typechecks it with both declaration trees, and compares it with the plugin's
//      dictionary and samples using tools/compare (findings in <out>/REPORT.md).
import { cpSync, existsSync, mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { tmpdir } from 'node:os';
import { dirname, join, relative, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { runExtendScriptFile } from '../run-extendscript.mjs';
import { parseDictionary, readRaw } from '../dump/parse-dictionary.mjs';
import { aliasCandidates, surfaceAdded } from '../dump/surface.mjs';
import { sampleRuntime } from '../dump/runtime.mjs';
import { compare } from '../compare/index.mjs';

const root = join(dirname(fileURLToPath(import.meta.url)), '..', '..');
const dumpDir = join(root, 'tools', 'dump');

// ---------------------------------------------------------------------------------------------
// The plugin's surface
// ---------------------------------------------------------------------------------------------

/** What the plugin adds to the dictionary, structured. */
export function pluginSurface(base, withPlugin) {
    const surface = { classes: [], enums: [], members: {}, enumerators: {} };
    for (const [name, c] of Object.entries(withPlugin)) {
        const b = base[name];
        if (!b) {
            (c.kind === 'enum' ? surface.enums : surface.classes).push(name);
            continue;
        }
        if (c.kind === 'enum') {
            const added = Object.keys(c.enumValues).filter((e) => !(e in b.enumValues));
            if (added.length) surface.enumerators[name] = added;
            continue;
        }
        const props = c.props.filter((p) => !b.props.some((q) => q.name === p.name));
        const methods = c.methods.filter((m) => !b.methods.some((q) => q.name === m.name));
        if (props.length || methods.length) surface.members[name] = { props, methods };
    }
    return surface;
}

// ---------------------------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------------------------

const NUMBER_WORDS = /^(Long Long Integer|Long Integer|Short Integer|Real|Integer|Number)s?$/;

/** TypeScript text for a dictionary type, qualified for a global declaration file. */
function makeTyper(plugin, base) {
    // InDesign's classes through the InDesign namespace (their global names may be ScriptUI's);
    // the plugin's own classes by their global names.
    const ref = (name) => (base[name] ? `InDesign.${name}` : plugin[name] ? name : 'any');
    const one = (name, write) => {
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
                return write ? 'File | string' : 'File';
            default:
                return ref(name);
        }
    };
    const alt = (a, write) => {
        a = a.replace(/\s*\(.*\)\s*$/, '').trim();
        let m;
        if (/^(Ordered array|Array|Arrays)\b/.test(a) || a.includes(':')) return 'any[]';
        if ((m = /^(\w+) enumerators?$/.exec(a))) return m[1] === 'NothingEnum' ? 'InDesign.NothingEnum.NOTHING' : one(m[1], write);
        if (NUMBER_WORDS.test(a)) return 'number';
        if (/^Strings?$/.test(a)) return 'string';
        if (/^Booleans?$/.test(a)) return 'boolean';
        if (/^Units?$/.test(a)) return write ? 'number | string' : 'number';
        if (/^Files?$/.test(a)) return one('File', write);
        if (a === 'JavaScript Function') return 'Function';
        if (/^Objects?$/.test(a)) return 'object';
        return one(a, write);
    };
    return (t, { write = false } = {}) => {
        let text = t.alternatives ? [...new Set(t.alternatives.map((a) => alt(a, write)))].join(' | ') : one(t.name, write);
        for (let i = 0; i < t.array; i++) text = /[|]/.test(text) ? `(${text})[]` : `${text}[]`;
        return text;
    };
}

/** TypeScript text for a runtime atom (dump/walk.jsxinc atomOf), or null. */
function atomType(atom, plugin, base) {
    if (['null', 'string', 'number', 'boolean'].includes(atom)) return atom;
    if (atom === 'File' || atom === 'Folder') return atom;
    if (atom.startsWith('enum:')) {
        const [, value, name] = atom.split(':');
        if (name === 'NOTHING') return 'InDesign.NothingEnum.NOTHING';
        const hits = Object.values({ ...base, ...plugin }).filter((c) => c.kind === 'enum' && c.enumValues[name] === Number(value));
        return hits.length === 1 ? (base[hits[0].name] ? `InDesign.${hits[0].name}` : hits[0].name) : null;
    }
    if (atom.startsWith('array<')) {
        const inner = atom.slice(6, -1).split('|').filter(Boolean).map((a) => atomType(a, plugin, base));
        if (!inner.length || inner.some((x) => !x)) return null;
        const u = [...new Set(inner)];
        return u.length > 1 ? `(${u.join(' | ')})[]` : `${u[0]}[]`;
    }
    if (base[atom]) return `InDesign.${atom}`;
    if (plugin[atom]) return atom;
    return null;
}

function union(text, add) {
    const parts = new Set(text.split(/\s*\|\s*/));
    const out = [text];
    for (const a of add) if (a && !parts.has(a) && !(a === 'number' && parts.has('any'))) out.push(a);
    return out.join(' | ');
}

// ---------------------------------------------------------------------------------------------
// Declarations
// ---------------------------------------------------------------------------------------------

const RESERVED = { in: 'inCoordinateSpace', with: 'withItems', for: 'forStatus', function: 'functionName' };
const BASE_MEMBERS = new Set(['isValid', 'parent', 'properties', 'toSource', 'toSpecifier', 'getElements', 'events', 'eventListeners', 'addEventListener', 'removeEventListener', 'label', 'insertLabel', 'extractLabel', 'index']);

function docBlock(indent, lines) {
    const ls = lines.filter(Boolean).flatMap((l) => String(l).replace(/\*\//g, '*\\/').split('\n'));
    return `${indent}/**\n${ls.map((l) => `${indent} *${l ? ` ${l}` : ''}`).join('\n')}\n${indent} */`;
}

/** Member declarations for a class, typed by the dictionary and widened by runtime evidence. */
function memberDecls(cls, props, methods, ctx, { mode, indent }) {
    const { typer, plugin, base, samples, writes, crashers, version } = ctx;
    const read = (t) => (mode ? `InDesign.Read<M, ${t}>` : t);
    const out = [];
    for (const p of props) {
        const key = `${cls}.${p.name}`;
        let get = typer(p.type);
        let set = typer(p.type, { write: true });
        const observed = Object.keys(samples[key] ?? {}).filter((a) => a !== 'throws' && a !== 'blocked' && a !== 'undefined');
        get = union(get, observed.map((a) => atomType(a, plugin, base)));
        const tried = writes[key] ?? {};
        if (tried.nothing === 'ok') set = union(set, ['InDesign.NothingEnum.NOTHING']);
        if (['name', 'unit', 'path'].some((k) => tried[k] === 'ok')) set = union(set, ['string']);
        const notes = [];
        if (crashers[key]) notes.push(`**Crashes InDesign ${crashers[key].version}** when read (measured).`);
        for (const [k, v] of Object.entries(crashers)) if (k.startsWith(`${key}:`)) notes.push(`**Crashes InDesign ${v.version}** when assigned a ${k.split(':')[1]} value (measured).`);
        const docs = docBlock(indent, [p.desc, observed.length ? `Measured: reads back ${observed.join(', ')}.` : '', ...notes, `From the plugin's scripting dictionary (InDesign ${version}).`]);
        if (p.readonly) out.push(`${docs}\n${indent}readonly ${p.name}: ${read(get)};`);
        else out.push(`${docs}\n${indent}get ${p.name}(): ${read(get)};\n${indent}set ${p.name}(value: ${set});`);
    }
    for (const m of methods) {
        if (m.name === '[]') continue;
        let seenOptional = false;
        const params = m.params.map((a) => {
            const name = RESERVED[a.name] ?? a.name;
            const optional = a.optional || /\(Optional\)/.test(a.desc) || seenOptional;
            if (optional) seenOptional = true;
            return { text: `${name}${optional ? '?' : ''}: ${typer(a.type, { write: true })}`, doc: `@param ${name} ${a.desc}` };
        });
        const docs = docBlock(indent, [m.desc, ...params.map((p) => p.doc), `From the plugin's scripting dictionary (InDesign ${version}).`]);
        out.push(`${docs}\n${indent}${m.name}(${params.map((p) => p.text).join(', ')}): ${read(typer(m.returns))};`);
    }
    return out.join('\n\n');
}

function enumDecl(e, aliases) {
    const names = Object.keys(e.enumValues);
    const sym = `__${e.name}`;
    return [
        docBlock('', [e.desc]),
        `declare const ${sym}: unique symbol;`,
        `interface ${e.name} extends InDesign.Enumerator {\n  readonly [${sym}]: never;\n}`,
        ...names.map((n) => `interface ${e.name}_${n} extends ${e.name} {\n  readonly [InDesign.__val]: ${e.enumValues[n]};\n}`),
        `declare namespace ${e.name} {\n${names.map((n) => `  type ${n} = ${e.name}_${n};`).join('\n')}\n}`,
        `declare const ${e.name}: typeof InDesign.Enumeration & {\n${names
            .flatMap((n) => [`  readonly ${n}: ${e.name}_${n};`, ...aliasCandidates(n).filter((a) => aliases.includes(a)).map((a) => `  readonly ${a}: ${e.name}_${n};`)])
            .join('\n')}\n};`,
    ].join('\n');
}

export function generateDeclarations({ name, surface, plugin, base, samples = {}, writes = {}, crashers = {}, aliases = {}, version }) {
    const typer = makeTyper(plugin, base);
    const ctx = { typer, plugin, base, samples, writes, crashers, version };
    const parts = [
        `/**
 * ${name}: ExtendScript declarations for a plugin's scripting API, generated by
 * indesign-extendscript-types' tools/plugin from InDesign ${version}'s scripting dictionary with the
 * plugin loaded${Object.keys(samples).length ? ', and from runtime samples of it' : ''}.
 *
 * Use it beside indesign-extendscript-types (either entry):
 *
 *     "types": ["indesign-extendscript-types", "${name}"]
 */`,
    ];

    // Members on InDesign's own classes, through the extension points.
    const extended = Object.entries(surface.members).sort(([a], [b]) => a.localeCompare(b));
    if (extended.length) {
        const ifaces = extended.map(([cls, { props, methods }]) => {
            const mode = !base[cls].methods.some((m) => m.name === 'everyItem');
            return `  interface ${cls}${mode ? `<M extends InDesign.Mode = 'single'>` : ''} {\n${memberDecls(cls, props, methods, ctx, { mode, indent: '    ' })}\n  }`;
        });
        parts.push(`/** Members the plugin adds to InDesign's classes. */\ndeclare namespace InDesignPlugins {\n${ifaces.join('\n\n')}\n}`);
    }

    // The plugin's classes.
    for (const cname of surface.classes.sort()) {
        const c = plugin[cname];
        const isCollection = c.methods.some((m) => m.name === 'everyItem');
        const chain = [];
        for (let k = c; k; k = k.superclass ? plugin[k.superclass] ?? base[k.superclass] : null) chain.push(k);
        const props = chain.flatMap((k) => k.props).filter((p, i, all) => all.findIndex((q) => q.name === p.name) === i);
        const methods = chain.flatMap((k) => k.methods).filter((m, i, all) => all.findIndex((q) => q.name === m.name) === i);
        const statics = (c.statics ?? []).map((s) => `${docBlock('  ', [s.desc])}\n  readonly ${s.name}: ${JSON.stringify(s.value)};`).join('\n');
        if (isCollection) {
            const item = c.methods.find((m) => m.name === 'item')?.returns.name;
            const itemType = item ? (base[item] ? `InDesign.${item}` : item) : 'any';
            parts.push(
                `${docBlock('', [c.desc])}\ninterface ${cname} {\n  readonly length: number;\n  readonly [index: number]: ${itemType};\n  readonly reflect: Reflection;\n${memberDecls(cname, props.filter((p) => p.name !== 'length'), methods, ctx, { mode: false, indent: '  ' })}\n}`,
                `${docBlock('', [`The ${cname} collection class, for \`instanceof\`; a global once a collection of this kind has been obtained.`])}\ndeclare var ${cname}: DOMClass<${cname}>;`,
            );
            continue;
        }
        const parentProp = props.find((p) => p.name === 'parent');
        const parent = parentProp ? typer(parentProp.type) : 'any';
        const evented = methods.some((m) => m.name === 'addEventListener');
        const own = { props: props.filter((p) => !BASE_MEMBERS.has(p.name)), methods: methods.filter((m) => !BASE_MEMBERS.has(m.name)) };
        parts.push(
            `${docBlock('', [c.desc])}\ninterface ${cname}<M extends InDesign.Mode = 'single'> extends InDesign.${evented ? 'EventTargetDOMObject' : 'InDesignDOMObject'}<${parent}, M> {\n${memberDecls(cname, own.props, own.methods, ctx, { mode: true, indent: '  ' })}\n\n  /** Resolves the proxy into the individual objects it stands for. */\n  getElements(): ${cname}<'single'>[];\n}`,
            `${docBlock('', [`The ${cname} class: \`instanceof ${cname}\`, \`${cname}.reflect\`${statics ? ' and its event names' : ''}.`])}\ndeclare var ${cname}: DOMClass<${cname}>${statics ? ` & {\n${statics}\n}` : ''};`,
        );
    }

    // The plugin's enumerations.
    for (const ename of surface.enums.sort()) parts.push(enumDecl(plugin[ename], aliases[ename] ?? []));

    const added = Object.entries(surface.enumerators);
    if (added.length)
        parts.push(`// Enumerators the plugin adds to InDesign's enumerations cannot be declared by augmentation
// (an enumeration is a const); use their numbers or \`InDesign.<Enumeration>\` casts:
${added.map(([e, ns]) => `//   ${e}: ${ns.map((n) => `${n} = ${plugin[e].enumValues[n]}`).join(', ')}`).join('\n')}`);

    return `${parts.join('\n\n')}\n`;
}

// ---------------------------------------------------------------------------------------------
// Measuring
// ---------------------------------------------------------------------------------------------

function samplePlugin({ app, snapshotDir, setup }) {
    // The plugin's own setup runs at the end of the fixture (fixture.jsxinc: pluginFixture()).
    const prelude = setup ? readFileSync(resolve(setup), 'utf8') : '';
    const reads = sampleRuntime({ app, snapshot: snapshotDir, prelude });
    const writes = sampleRuntime({ app, snapshot: snapshotDir, prelude, script: 'writes.jsx' });
    try {
        runExtendScriptFile(join(dumpDir, 'cleanup.jsx'), { app });
    } catch {}
    return { reads, writes };
}

// ---------------------------------------------------------------------------------------------

function arg(name, fallback) {
    const i = process.argv.indexOf(name);
    return i >= 0 ? process.argv[i + 1] : fallback;
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
    const name = arg('--name');
    if (!name) {
        console.error('usage: npm run plugin -- --name <package> [--app ...] [--setup file.jsx] [--raw dir] [--no-sample]');
        process.exit(2);
    }
    const app = arg('--app', 'Adobe InDesign 2026');
    const out = resolve(root, arg('--out', join('plugins', name)));
    const baselineDir = resolve(root, arg('--baseline', 'snapshots/indesign-21.6'));
    const snap = join(out, 'snapshot');
    mkdirSync(snap, { recursive: true });

    // 1. The dictionary with the plugin loaded.
    const rawArg = arg('--raw');
    if (rawArg) cpSync(resolve(rawArg), join(snap, 'raw'), { recursive: true });
    else {
        console.log('dumping the dictionary with the plugin loaded...');
        rmSync(join(snap, 'raw'), { recursive: true, force: true });
        runExtendScriptFile(join(dumpDir, 'dictionary.jsx'), { app, arg: join(snap, 'raw') });
    }
    const raw = readRaw(join(snap, 'raw'));
    if (!rawArg && !raw.thirdPartyPlugins?.length) console.warn('warning: no third-party plugin is installed; the surface will be empty');
    const pluginDict = parseDictionary(raw);
    const baseDict = JSON.parse(readFileSync(join(baselineDir, 'dictionary.json'), 'utf8'));
    if (baseDict.version !== pluginDict.version) console.warn(`warning: baseline is InDesign ${baseDict.version}, the plugin was measured on ${pluginDict.version}`);
    writeFileSync(join(snap, 'dictionary.json'), JSON.stringify(pluginDict, null, 1) + '\n');
    const surface = pluginSurface(baseDict.classes, pluginDict.classes);
    writeFileSync(join(snap, 'surface.json'), JSON.stringify(surface, (k, v) => (k === 'props' || k === 'methods' ? v.map((x) => x.name) : v), 1) + '\n');
    const memberCount = Object.values(surface.members).reduce((n, m) => n + m.props.length + m.methods.length, 0);
    console.log(`surface: ${surface.classes.length} classes, ${surface.enums.length} enumerations, ${memberCount} members on ${Object.keys(surface.members).length} InDesign classes, ${Object.keys(surface.enumerators).length} enumerations extended`);

    // 2. Runtime evidence, with InDesign's known crashers skipped.
    const crashFile = join(snap, 'runtime-crashers.json');
    if (!existsSync(crashFile) && existsSync(join(baselineDir, 'runtime-crashers.json'))) cpSync(join(baselineDir, 'runtime-crashers.json'), crashFile);
    let samples = {};
    let writes = {};
    let aliases = {};
    if (!rawArg && !process.argv.includes('--no-sample')) {
        console.log('sampling at runtime...');
        const r = samplePlugin({ app, snapshotDir: snap, setup: arg('--setup') });
        samples = r.reads.samples;
        writes = r.writes.writes;
        writeFileSync(join(snap, 'runtime.json'), JSON.stringify(r.reads, null, 1) + '\n');
        writeFileSync(join(snap, 'writes.json'), JSON.stringify(r.writes, null, 1) + '\n');
        if (surface.enums.length) {
            const candidates = surface.enums.map((e) => [e, Object.keys(pluginDict.classes[e].enumValues).flatMap(aliasCandidates)]);
            aliases = runExtendScriptFile(join(dumpDir, 'enum-aliases.jsx'), { app, arg: JSON.stringify(candidates) });
        }
    }
    const crashers = existsSync(crashFile) ? JSON.parse(readFileSync(crashFile, 'utf8')) : {};
    // For the comparer: the plugin's runs where there are some, the baseline's otherwise.
    for (const f of ['runtime.json', 'writes.json']) if (!existsSync(join(snap, f))) cpSync(join(baselineDir, f), join(snap, f));
    const baseAliases = JSON.parse(readFileSync(join(baselineDir, 'enum-aliases.json'), 'utf8'));
    writeFileSync(join(snap, 'enum-aliases.json'), JSON.stringify({ ...baseAliases, ...aliases }, null, 1) + '\n');

    // 3. Declarations and a package.
    const text = generateDeclarations({ name, surface, plugin: pluginDict.classes, base: baseDict.classes, samples, writes, crashers, aliases, version: pluginDict.version });
    writeFileSync(join(out, 'index.d.ts'), text);
    const pkgPath = join(out, 'package.json');
    const pkg = existsSync(pkgPath) ? JSON.parse(readFileSync(pkgPath, 'utf8')) : { name, version: '0.1.0', description: `ExtendScript declarations for ${name.replace(/-extendscript-types$/, '')}'s scripting API.` };
    pkg.types = './index.d.ts';
    pkg.files = ['index.d.ts'];
    pkg.peerDependencies = { 'indesign-extendscript-types': `>=${JSON.parse(readFileSync(join(root, 'package.json'), 'utf8')).version}` };
    writeFileSync(pkgPath, JSON.stringify(pkg, null, 2) + '\n');

    // 4. Checks: typecheck with both trees; compare with the plugin's dictionary and samples.
    const problems = [];
    for (const tree of ['types', 'flat']) {
        const cfg = join(snap, `tsconfig.${tree}.json`);
        writeFileSync(cfg, JSON.stringify({ compilerOptions: { noLib: true, target: 'es5', module: 'none', ignoreDeprecations: '5.0', strict: true, noEmit: true, types: [] }, files: [join(root, 'lib/global.d.ts'), join(root, 'lib/ScriptUI.d.ts'), join(root, tree, 'globals.d.ts'), join(out, 'index.d.ts')] }, null, 1));
        try {
            execFileSync(join(root, 'node_modules/.bin/tsc'), ['-p', cfg], { stdio: 'pipe' });
        } catch (e) {
            problems.push(`typecheck with ${tree}/:\n${e.stdout}`);
        }
    }
    const entry = join(snap, 'entry.d.ts');
    writeFileSync(entry, `/// <reference path="${join(root, 'types/globals.d.ts')}" />\n/// <reference path="${join(out, 'index.d.ts')}" />\n`);
    const ours = (f) => surface.classes.includes(f.class) || surface.enums.includes(f.class) || (surface.members[f.class] && [...surface.members[f.class].props, ...surface.members[f.class].methods].some((m) => m.name === f.member));
    const { findings } = compare({ entry: relative(root, entry), snapshot: relative(root, snap), globalClasses: [...surface.classes, ...surface.enums] });
    const mine = findings.filter(ours);
    const byKind = {};
    for (const f of mine) byKind[f.kind] = (byKind[f.kind] ?? 0) + 1;

    writeFileSync(
        join(out, 'REPORT.md'),
        `# ${name}: measurement report

InDesign ${pluginDict.version}; baseline \`${relative(root, baselineDir)}\`.

| | |
|---|---|
| Classes | ${surface.classes.join(', ') || '-'} |
| Enumerations | ${surface.enums.join(', ') || '-'} |
| Members on InDesign's classes | ${memberCount} (${Object.keys(surface.members).join(', ') || '-'}) |
| Runtime samples | ${Object.keys(samples).length ? `${Object.keys(samples).filter((k) => ours({ class: k.split('.')[0], member: k.split('.')[1] })).length} of the plugin's members read` : 'none (offline)'} |
| Crashers | ${Object.keys(crashers).filter((k) => ours({ class: k.split('.')[0], member: k.split('.')[1]?.split(':')[0] })).join(', ') || 'none found'} |

## Checks

${problems.length ? problems.map((p) => `- FAIL ${p}`).join('\n') : '- Typechecks with types/ and flat/.'}

## Comparison with the dictionary and samples

${mine.length ? mine.map((f) => `- **${f.kind}** \`${f.class}.${f.member}\`: ${f.detail}`).join('\n') : 'No findings.'}
`,
    );
    console.log(`wrote ${relative(root, out)}/ (index.d.ts, package.json, REPORT.md)`);
    console.log(`findings: ${mine.length ? JSON.stringify(byKind) : 'none'}${problems.length ? `\n${problems.join('\n')}` : ''}`);
    process.exit(problems.length ? 1 : 0);
}
