#!/usr/bin/env node
// Compares the declarations against the measured scripting dictionary.
//
//   node tools/compare/index.mjs [--edition desktop|server|portable] [--tree types|flat]
//                                [--entry <file>] [--snapshot <dir>] [--json out.json]
//
// Each edition is compared with its own measurements: desktop with snapshots/indesign-<ver>,
// server with snapshots/indesign-server-<ver>, portable with what both dictionaries share
// (tools/editions/model.mjs) and desktop's runtime samples of it. The entry defaults to the
// edition's file in the tree (types/editions/desktop.d.ts, ...).
//
// Each DOM class is instantiated with its default type arguments (`InDesign.TextFrame`) through a
// synthetic source file, and its members, inherited ones included, are compared with the
// dictionary class and its superclass chain. Types are compared as sets of "atoms" (number,
// string, boolean, File, Function, array, enum:X, class:X, ...): the dictionary's own vocabulary
// is too coarse for more ("varies=any" plus prose), and upstream's refinements (literal unions,
// tuples, narrowed parents) are legitimate as long as every atom the dictionary allows is there.
//
// Findings, by kind:
//   missing-class / missing-member   the dictionary has it, the declarations do not
//   extra-member                      declared, but not in the dictionary (needs a runtime probe)
//   readonly                          writable in one, read-only in the other
//   read-type / write-type            an atom the dictionary allows is not in the declared type
//   params / param-type / returns     method signature differences
//   enum-member / enum-value          enumerations
//   runtime-read                      InDesign returned a value the declared read type does not allow
//                                     (snapshots/<ver>/runtime.json, from dump/runtime.jsx)
//   runtime-crash                     reading the property crashes InDesign (runtime-crashers.json)
//   runtime-write                     InDesign accepted a kind of value the declared setter does not
//   runtime-write-rejected            the declared setter allows a kind of value InDesign rejects
//   runtime-readonly                  declared writable, but InDesign says it is read-only
//                                     (snapshots/<ver>/writes.json, from dump/writes.jsx)
//
// Policy: an enumerator's bare number is accepted by every enum setter, but is deliberately not
// declared (see Enumerator), so the "number" trial is not checked.
import { existsSync, mkdtempSync, readFileSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import ts from 'typescript';
import { TypeAtoms, covered, observedCovered, superclasses } from './atoms.mjs';
import { SERVER_SNAPSHOT, SNAPSHOT } from '../snapshot.mjs';
import { portableDictionary } from '../editions/model.mjs';

const root = join(dirname(fileURLToPath(import.meta.url)), '..', '..');

// ---------------------------------------------------------------------------------------------
// Dictionary side
// ---------------------------------------------------------------------------------------------

const NUMBER_WORDS = /^(Long Long Integer|Long Integer|Short Integer|Real|Integer|Number)s?$/;

/** Atoms for one prose alternative ("Array of Swatches", "NothingEnum enumerator", ...). */
function altAtoms(alt, dict) {
    const a = alt.replace(/\s*\(.*\)\s*$/, '').trim();
    if (/^(Ordered array|Array|Arrays)\b/.test(a) || a.includes(':')) return ['array'];
    let m;
    if ((m = /^(\w+) enumerators?$/.exec(a))) return [`enum:${m[1]}`];
    if (NUMBER_WORDS.test(a)) return ['number'];
    if (/^Strings?$/.test(a)) return ['string'];
    if (/^Booleans?$/.test(a)) return ['boolean'];
    if (/^Units?$/.test(a)) return ['number', 'string'];
    if (/^Files?$/.test(a)) return ['File'];
    if (a === 'JavaScript Function') return ['Function'];
    if (/^Objects?$/.test(a)) return ['object'];
    if (a === 'Any Type') return ['any'];
    if (dict[a]) return [dict[a].kind === 'enum' ? `enum:${a}` : `class:${a}`];
    return [`?${a}`];
}

/** The atoms a dictionary type allows. `null` means "anything" (an unexplained varies=any). */
function dictAtoms(t, dict) {
    if (t.array) return new Set(['array']);
    if (t.alternatives) return new Set(t.alternatives.flatMap((a) => altAtoms(a, dict)));
    switch (t.name) {
        case 'any':
            return null;
        case 'Measurement':
            return new Set(['number', 'string']);
        case 'Object':
            return new Set(['object']);
        case 'number':
        case 'string':
        case 'boolean':
        case 'void':
        case 'File':
        case 'Date':
            return new Set([t.name]);
        default:
            return new Set([dict[t.name]?.kind === 'enum' ? `enum:${t.name}` : `class:${t.name}`]);
    }
}

/** For reading: a "Unit" alternative (number or string when set) reads back as a number. */
function readAtoms(t, want) {
    if (!t.alternatives || !t.alternatives.some((a) => /^Units?\b/.test(a))) return want;
    const out = new Set(want);
    if (!t.alternatives.some((a) => /^Strings?\b/.test(a))) out.delete('string');
    return out;
}

/** Own members plus the superclass chain's, the class's own winning. */
function dictMembers(cls, dict) {
    const chain = [];
    for (let c = cls; c; c = c.superclass ? dict[c.superclass] : null) chain.push(c);
    const props = new Map();
    const methods = new Map();
    for (const c of chain.reverse()) {
        for (const p of c.props) props.set(p.name, p);
        for (const m of c.methods) methods.set(m.name, m);
    }
    return { props, methods };
}

// ---------------------------------------------------------------------------------------------
// Declaration side
// ---------------------------------------------------------------------------------------------

function createProgram(entry, classNames, enumNames, globalNames = new Set(), libs = ['lib/global.d.ts', 'lib/ScriptUI.d.ts']) {
    const dir = mkdtempSync(join(tmpdir(), 'idx-compare-'));
    const probe = join(dir, 'probe.ts');
    const lines = [`/// <reference path="${resolve(root, entry)}" />`];
    for (const n of classNames) {
        // A plugin's classes are globals of their own, not part of the InDesign namespace.
        const q = globalNames.has(n) ? n : `InDesign.${n}`;
        lines.push(`type __${n} = ${q};`);
        if (enumNames.has(n)) lines.push(`declare const __value_${n}: typeof ${q};`);
    }
    writeFileSync(probe, lines.join('\n'));
    const files = libs.map((f) => join(root, f));
    const program = ts.createProgram([...files, probe], {
        noLib: true,
        target: ts.ScriptTarget.ES5,
        module: ts.ModuleKind.None,
        strict: true,
        noEmit: true,
        types: [],
    });
    return { program, probe };
}

function propertyInfo(checker, sym, owner) {
    const decls = sym.getDeclarations() ?? [];
    const getter = decls.find(ts.isGetAccessorDeclaration);
    const setter = decls.find(ts.isSetAccessorDeclaration);
    const prop = decls.find((d) => ts.isPropertySignature(d) || ts.isPropertyDeclaration(d));
    const readType = checker.getTypeOfSymbolAtLocation(sym, owner);
    // A member that reached the class through a mapped type (Omit, Pick, ...) keeps its
    // declarations but not its accessor pair: it is a plain property of the getter's type, and a
    // wider setter is lost. Only a symbol that is still a set accessor has a separate write type.
    const mapped = !(sym.flags & (ts.SymbolFlags.GetAccessor | ts.SymbolFlags.SetAccessor)) && (getter || setter);
    const mappedReadonly = mapped && !!(ts.getCheckFlags?.(sym) & 8 /* CheckFlags.Readonly */);
    const isReadonly = mapped ? mappedReadonly || !setter : setter ? false : getter ? true : prop ? !!(ts.getCombinedModifierFlags(prop) & ts.ModifierFlags.Readonly) : false;
    let writeType = readType;
    let writeExact = true;
    if (!mapped && setter && setter.parameters[0]) {
        writeType = checker.getTypeAtLocation(setter.parameters[0]);
        // The setter's declared type, uninstantiated: `number | NSet` cannot be resolved here, so
        // such setters are checked on the flat tree, where nothing is left generic.
        writeExact = !mentionsTypeParameter(writeType);
    }
    return { isReadonly, readType, writeType, writeExact, mapped };
}

function mentionsTypeParameter(type) {
    if (type.flags & ts.TypeFlags.TypeParameter) return true;
    if (type.isUnionOrIntersection()) return type.types.some(mentionsTypeParameter);
    return false;
}

// Members every ExtendScript object has that the dictionary does not list (probes "dom reflect.name",
// "dom toString", "collection reflect", "collection toString").
const UNIVERSAL = new Set(['reflect', 'toString']);

// Dictionary parameter names that are reserved words, which TypeScript cannot use as parameter
// names; upstream renames them.
const RESERVED_PARAM = { in: /^in[A-Z]/, with: /^with[A-Z]/, for: /^for[A-Z]/, function: /^function[A-Z]/ };
const sameParam = (declared, dictName) => declared === dictName || (RESERVED_PARAM[dictName]?.test(declared) ?? false);

// ---------------------------------------------------------------------------------------------

const readSnapshot = (snapshot, file, fallback) => {
    const path = join(root, snapshot, file);
    if (!existsSync(path)) {
        if (fallback !== undefined) return fallback;
        throw new Error(`${snapshot}/${file} is missing`);
    }
    return JSON.parse(readFileSync(path, 'utf8'));
};

/** The libraries an edition's entry point loads: InDesign Server has no ScriptUI. */
export const editionLibs = (edition) => (edition === 'desktop' ? ['lib/global.d.ts', 'lib/ScriptUI.d.ts'] : ['lib/global.d.ts']);

/** What an edition is measured to have: dictionary, enumerator aliases, runtime samples. */
export function editionData(edition, snapshot) {
    const load = (snap) => ({
        dict: readSnapshot(snap, 'dictionary.json').classes,
        enumAliases: readSnapshot(snap, 'enum-aliases.json'),
        runtime: readSnapshot(snap, 'runtime.json', { samples: {} }),
        writes: readSnapshot(snap, 'writes.json', { writes: {} }).writes,
        crashers: readSnapshot(snap, 'runtime-crashers.json', {}),
    });
    if (snapshot) return load(snapshot);
    if (edition === 'desktop') return load(SNAPSHOT);
    if (edition === 'server') return load(SERVER_SNAPSHOT);
    const d = load(SNAPSHOT);
    const s = load(SERVER_SNAPSHOT);
    const enumAliases = {};
    for (const [e, list] of Object.entries(d.enumAliases)) enumAliases[e] = list.filter((a) => (s.enumAliases[e] ?? []).includes(a));
    return { ...d, dict: portableDictionary(d.dict, s.dict), enumAliases };
}

/** globalClasses: dictionary classes declared as plain globals (a plugin's, by tools/plugin). */
export function compare({ edition = 'desktop', tree = 'types', entry = `${tree}/editions/${edition}.d.ts`, snapshot, globalClasses = [] } = {}) {
    const { dict, enumAliases, runtime, writes, crashers } = editionData(edition, snapshot);
    const names = Object.keys(dict).sort();
    const enumNames = new Set(names.filter((n) => dict[n].kind === 'enum'));
    const { program, probe } = createProgram(entry, names, enumNames, new Set(globalClasses), editionLibs(edition));
    const checker = program.getTypeChecker();
    const sf = program.getSourceFile(probe);
    const atoms = new TypeAtoms(ts, checker, enumNames);
    const findings = [];
    const add = (kind, cls, member, detail) => findings.push({ kind, class: cls, member, detail });
    const fmt = (s) => [...s].sort().join(' | ');

    const aliases = new Map();
    const enumValues = new Map();
    for (const st of sf.statements) {
        if (ts.isTypeAliasDeclaration(st)) aliases.set(st.name.text.slice(2), st);
        if (ts.isVariableStatement(st)) {
            const d = st.declarationList.declarations[0];
            enumValues.set(d.name.text.replace(/^__value_/, ''), d);
        }
    }

    const diags = ts.getPreEmitDiagnostics(program, sf);
    const unresolved = new Set();
    for (const d of diags) {
        const text = ts.flattenDiagnosticMessageText(d.messageText, '\n');
        const m = /'InDesign'.*?'(\w+)'|has no exported member '(\w+)'/.exec(text);
        if (m) unresolved.add(m[1] ?? m[2]);
    }

    for (const name of names) {
        const cls = dict[name];
        const alias = aliases.get(name);
        if (unresolved.has(name)) {
            add('missing-class', name, null, `no declaration for ${cls.kind} ${name}`);
            continue;
        }
        const type = checker.getTypeAtLocation(alias.name);

        if (cls.kind === 'enum') {
            // The enumeration object (value side) lists its enumerators.
            const valueType = checker.getTypeAtLocation(enumValues.get(name).name);
            const declared = new Map(checker.getPropertiesOfType(valueType).map((p) => [p.getName(), p]));
            for (const [member, value] of Object.entries(cls.enumValues)) {
                const p = declared.get(member);
                if (!p) {
                    add('enum-member', name, member, `missing enumerator (value ${value})`);
                    continue;
                }
                const memberType = checker.getTypeOfSymbolAtLocation(p, sf);
                const valProp = checker.getPropertiesOfType(memberType).find((q) => q.getName().startsWith('__@__val'));
                const declaredValue = valProp && checker.getTypeOfSymbolAtLocation(valProp, sf);
                if (declaredValue && declaredValue.isNumberLiteral() && declaredValue.value !== value)
                    add('enum-value', name, member, `declared ${declaredValue.value}, dictionary ${value}`);
            }
            const aliases = new Set(enumAliases[name] ?? []);
            for (const member of declared.keys()) {
                if (member === 'reflect' || member === 'prototype') continue;
                if (!(member in cls.enumValues) && !aliases.has(member))
                    add('enum-member', name, member, 'declared enumerator does not exist (not in the dictionary, not a measured alias)');
            }
            for (const alias of aliases) if (!declared.has(alias)) add('enum-member', name, alias, 'measured alias not declared');
            continue;
        }

        const { props, methods } = dictMembers(cls, dict);
        const declared = new Map(checker.getPropertiesOfType(type).map((p) => [p.getName(), p]));

        for (const [pname, p] of props) {
            const sym = declared.get(pname);
            if (!sym) {
                add('missing-member', name, pname, `property: ${p.readonly ? 'readonly ' : ''}${p.type.name}`);
                continue;
            }
            const info = propertyInfo(checker, sym, alias);
            if (info.isReadonly !== p.readonly)
                add('readonly', name, pname, p.readonly ? 'dictionary read-only, declared writable' : 'dictionary writable, declared read-only');
            const want = dictAtoms(p.type, dict);
            // A measurement reads back as a number in the current units; strings are only accepted.
            const wantRead = want && p.type.name === 'Measurement' && !p.type.array && !p.type.alternatives ? new Set(['number']) : want && readAtoms(p.type, want);
            const key = `${name}.${pname}`;
            if (crashers[key]) add('runtime-crash', name, pname, `reading it crashes InDesign ${crashers[key].version}`);
            const observed = runtime.samples[key];
            if (observed) {
                const got = atoms.atoms(info.readType);
                const bad = Object.keys(observed).filter((a) => a !== 'throws' && a !== 'blocked' && !observedCovered(a, got, dict));
                if (bad.length) add('runtime-read', name, pname, `declared ${fmt(got)}; InDesign returned ${bad.join(', ')}`);
            }
            const tried = info.writeExact ? writes[key] : null;
            if (tried) {
                const gotW = atoms.atoms(info.writeType);
                const rt = tried.roundtrip ?? '';
                if (/is a read only property/.test(rt)) {
                    if (!info.isReadonly) add('runtime-readonly', name, pname, 'declared writable; InDesign: read-only');
                } else {
                    // trial -> the atom a setter needs to accept that kind of value
                    for (const [trial, atom] of [['nothing', 'enum:NothingEnum'], ['name', 'string'], ['unit', 'string'], ['path', 'string']]) {
                        const r = tried[trial];
                        if (!r || r === 'blocked') continue;
                        const declaredOk = gotW.has(atom) || gotW.has('any');
                        if (r === 'ok' && !declaredOk) add('runtime-write', name, pname, `setter takes ${fmt(gotW)}; InDesign also accepts ${trial === 'nothing' ? 'NothingEnum.NOTHING' : `a ${trial} string`}`);
                        // A root style ([Basic Paragraph Style], ...) cannot unset anything; derived
                        // styles can, so a style's NOTHING rejection says nothing about the type.
                        const instanceSpecific = /root style/.test(r) || /Style$/.test(name);
                        if (r !== 'ok' && declaredOk && !gotW.has('any') && trial === 'nothing' && !instanceSpecific)
                            add('runtime-write-rejected', name, pname, `setter allows NothingEnum; InDesign ${r}`);
                    }
                    // "x is undefined": collections, which reflection lists as read-write.
                    if (rt && rt !== 'ok' && rt !== 'blocked' && !/is undefined$|root style/.test(rt))
                        add('runtime-roundtrip', name, pname, `writing back the value just read: ${rt}`);
                }
            }
            if (want) {
                const got = atoms.atoms(info.readType);
                const missing = [...wantRead].filter((a) => !covered(a, got, dict));
                if (missing.length) add('read-type', name, pname, `declared ${fmt(got)}; dictionary also allows ${missing.join(', ')}`);
                if (!p.readonly && info.writeExact) {
                    const gotW = atoms.atoms(info.writeType);
                    const missingW = [...want].filter((a) => !covered(a, gotW, dict));
                    if (missingW.length) add('write-type', name, pname, `setter takes ${fmt(gotW)}; dictionary also allows ${missingW.join(', ')}`);
                }
            }
        }

        for (const [mname, m] of methods) {
            if (mname === '[]') {
                // The dictionary's indexer is a method named "[]"; declared as an index signature.
                if (!checker.getIndexInfoOfType(type, ts.IndexKind.Number)) add('missing-member', name, '[]', 'no numeric index signature');
                continue;
            }
            const sym = declared.get(mname);
            if (!sym) {
                add('missing-member', name, mname, `method(${m.params.map((a) => a.name).join(', ')})`);
                continue;
            }
            const sigs = checker.getTypeOfSymbolAtLocation(sym, alias).getCallSignatures();
            if (!sigs.length) {
                add('params', name, mname, 'declared as a property, dictionary has a method');
                continue;
            }
            // Compare against the widest overload (the one with the most parameters).
            const sig = sigs.reduce((a, b) => (b.parameters.length > a.parameters.length ? b : a));
            const decl = sig.parameters;
            const declNames = decl.map((s) => s.getName());
            const dictNames = m.params.map((a) => a.name);
            if (declNames.length !== dictNames.length || declNames.some((n, i) => !sameParam(n, dictNames[i])))
                add('params', name, mname, `declared (${declNames.join(', ')}); dictionary (${dictNames.join(', ')})`);
            m.params.forEach((a, i) => {
                const s = decl[i];
                if (!s) return;
                // Optional when some overload omits it or marks it optional (upstream models
                // "reference is required when at is BEFORE" as separate overloads).
                const optional = sigs.some((sg) => {
                    const q = sg.parameters[i]?.valueDeclaration;
                    return !q || !!(q.questionToken || q.initializer || q.dotDotDotToken);
                });
                // The dictionary marks some optional parameters only in prose: "(Optional)".
                const dictOptional = a.optional || /\(Optional\)/.test(a.desc);
                if (optional !== dictOptional)
                    add('params', name, mname, `parameter ${a.name}: declared ${optional ? 'optional' : 'required'}, dictionary ${dictOptional ? 'optional' : 'required'}`);
                const want = dictAtoms(a.type, dict);
                if (want) {
                    // Union of all overloads' types at this position.
                    const got = new Set();
                    for (const sg of sigs) if (sg.parameters[i]) atoms.atoms(checker.getTypeOfSymbolAtLocation(sg.parameters[i], alias), got);
                    const missing = [...want].filter((x) => !covered(x, got, dict));
                    if (missing.length) add('param-type', name, mname, `${a.name}: declared ${fmt(got)}; dictionary also allows ${missing.join(', ')}`);
                }
            });
            const wantR = dictAtoms(m.returns, dict);
            if (wantR) {
                const got = new Set();
                for (const sg of sigs) atoms.atoms(checker.getReturnTypeOfSignature(sg), got);
                const missing = [...wantR].filter((x) => !covered(x, got, dict));
                if (missing.length) add('returns', name, mname, `declared ${fmt(got)}; dictionary ${fmt(wantR)}`);
            }
        }

        for (const member of declared.keys()) {
            if (UNIVERSAL.has(member)) continue;
            if (!props.has(member) && !methods.has(member)) add('extra-member', name, member, 'not in the dictionary');
        }
    }
    return { findings, classes: names.length };
}

function summarize(findings) {
    const byKind = {};
    for (const f of findings) byKind[f.kind] = (byKind[f.kind] || 0) + 1;
    return byKind;
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
    const opt = (n, d) => {
        const i = process.argv.indexOf(n);
        return i >= 0 ? process.argv[i + 1] : d;
    };
    const t0 = Date.now();
    const edition = opt('--edition', 'desktop');
    const tree = opt('--tree', 'types');
    const { findings, classes } = compare({ edition, tree, entry: opt('--entry', `${tree}/editions/${edition}.d.ts`), snapshot: opt('--snapshot') });
    console.log(`${classes} dictionary classes, ${findings.length} findings in ${((Date.now() - t0) / 1000).toFixed(1)}s`);
    console.log(summarize(findings));
    const json = opt('--json');
    if (json) writeFileSync(json, JSON.stringify(findings, null, 1) + '\n');
}
