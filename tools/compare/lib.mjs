#!/usr/bin/env node
// Compares the ES3 core library (lib/*.d.ts) with the measured engine (snapshots/<ver>/corejs.json:
// reflection on each core global, its instances, and feature tests of ES5+ members).
//
//   node tools/compare/lib.mjs [--snapshot snapshots/indesign-21.6] [--json out.json]
//
// Findings:
//   lib-missing        the engine has it, lib/ does not declare it
//   lib-nonexistent    lib/ declares it, the engine does not have it (feature test: undefined)
//   lib-unreflected    lib/ declares it, reflection does not list it (weaker: reflection on
//                      builtins is partial; worth a probe)
//   lib-global         a global the engine has and lib/ lacks, or the reverse
import { mkdtempSync, readFileSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import ts from 'typescript';
import { SERVER_SNAPSHOT, SNAPSHOT } from '../snapshot.mjs';

const root = join(dirname(fileURLToPath(import.meta.url)), '..', '..');

// name -> [instance type expression, static value expression, corejs instances key]
const TARGETS = {
    Object: ['Object', 'Object', 'Object'],
    Array: ['any[]', 'Array', 'Array'],
    String: ['String', 'String', 'String'],
    Number: ['Number', 'Number', 'Number'],
    Boolean: ['Boolean', 'Boolean', 'Boolean'],
    Date: ['Date', 'Date', 'Date'],
    RegExp: ['RegExp', 'RegExp', 'RegExp'],
    Function: ['Function', 'Function', 'Function'],
    Error: ['Error', 'Error', 'Error'],
    Math: [null, 'Math', 'Math'],
    $: ['typeof $', null, 'Dollar'],
    File: ['File', 'File', 'File'],
    Folder: ['Folder', 'Folder', 'Folder'],
    Socket: ['Socket', 'Socket', 'Socket'],
    XML: ['XML', 'XML', 'XML'],
    XMLList: ['XMLList', 'XMLList', 'XMLList'],
    QName: ['QName', 'QName', 'QName'],
    Namespace: ['Namespace', 'Namespace', 'Namespace'],
    UnitValue: ['UnitValue', 'UnitValue', 'UnitValue'],
    BridgeTalk: ['BridgeTalk', 'BridgeTalk', 'BridgeTalk'],
    Reflection: ['Reflection', null, 'Reflection'],
    ReflectionInfo: ['ReflectionInfo', null, 'ReflectionInfo'],
    Dictionary: ['typeof $.dictionary', null, 'Dictionary'],
    ScriptUI: [null, 'ScriptUI', 'ScriptUI'],
    // The XMP and CEP libraries (loaded by dump/corejs.jsx before measuring).
    XMPMeta: ['XMPMeta', 'XMPMeta', 'XMPMeta'],
    XMPConst: [null, 'XMPConst', null],
    XMPFile: ['XMPFile', 'XMPFile', 'XMPFile'],
    XMPUtils: [null, 'XMPUtils', null],
    XMPDateTime: ['XMPDateTime', 'XMPDateTime', 'XMPDateTime'],
    XMPProperty: ['XMPProperty', null, 'XMPProperty'],
    XMPIterator: ['XMPIterator', null, 'XMPIterator'],
    XMPPacketInfo: ['XMPPacketInfo', null, 'XMPPacketInfo'],
    XMPFileInfo: ['XMPFileInfo', null, 'XMPFileInfo'],
    CSXSEvent: ['CSXSEvent', 'CSXSEvent', 'CSXSEvent'],
};

// Members every function or object carries that say nothing about the class.
const NOISE = new Set(['__proto__', 'prototype', 'arguments', 'arity', 'length', 'name', 'apply', 'call', 'toSource', 'toString', 'valueOf', 'constructor', 'reflect']);

function createProgram(libs) {
    const dir = mkdtempSync(join(tmpdir(), 'idx-lib-'));
    const probe = join(dir, 'probe.ts');
    const lines = [];
    for (const [name, [inst, stat]] of Object.entries(TARGETS)) {
        if (inst) lines.push(`declare const __inst_${name.replace('$', 'Dollar')}: ${inst};`);
        // NonNullable: library globals are typed `| undefined` until their ExternalObject loads.
        if (stat) lines.push(`declare const __static_${name.replace('$', 'Dollar')}: NonNullable<typeof ${stat}>;`);
    }
    writeFileSync(probe, lines.join('\n'));
    const files = libs.map((f) => join(root, f));
    const program = ts.createProgram([...files, probe], { noLib: true, target: ts.ScriptTarget.ES5, module: ts.ModuleKind.None, noEmit: true, types: [] });
    return { program, probe };
}

/** edition: desktop (with ScriptUI) or server (InDesign Server has none), each with its own measurements. */
export function compareLib({ edition = 'desktop', snapshot = edition === 'server' ? SERVER_SNAPSHOT : SNAPSHOT } = {}) {
    const core = JSON.parse(readFileSync(join(root, snapshot, 'corejs.json'), 'utf8'));
    const { program, probe } = createProgram(edition === 'desktop' ? ['lib/global.d.ts', 'lib/ScriptUI.d.ts'] : ['lib/global.d.ts']);
    const checker = program.getTypeChecker();
    const sf = program.getSourceFile(probe);
    const findings = [];
    const add = (kind, target, member, detail) => findings.push({ kind, class: target, member, detail });
    const vars = new Map();
    for (const st of sf.statements) {
        const d = st.declarationList.declarations[0];
        vars.set(d.name.text, checker.getTypeAtLocation(d.name));
    }
    const declaredNames = (key) => {
        const t = vars.get(key);
        return t ? new Set(checker.getPropertiesOfType(t).map((p) => p.getName())) : null;
    };

    // Members a feature test found present count as reflected (reflection on E4X lists nothing).
    const featured = (name, side) => {
        const out = new Set();
        for (const [path, tests] of Object.entries(core.features)) {
            const [cls, proto] = path.split('.');
            const owner = cls === 'XML' && name === 'XMLList' ? 'XMLList' : cls;
            if (owner !== name || (side === 'instance') !== !!proto) continue;
            for (const [m, t] of tests) if (t !== 'undefined' && !t.startsWith('throws')) out.add(m);
        }
        if (name === 'XMLList') for (const [m, t] of core.features['XML.prototype'] ?? []) if (t === 'function') out.add(m);
        return out;
    };

    for (const [name, [inst, stat, key]] of Object.entries(TARGETS)) {
        const id = name.replace('$', 'Dollar');
        const reflectedInst = core.instances[key];
        const reflectedStatic = core.statics[name];
        const sides = [
            ['instance', inst && declaredNames(`__inst_${id}`), key ? reflectedInst : null],
            ['static', stat && declaredNames(`__static_${id}`), name === '$' ? null : reflectedStatic],
        ];
        for (const [side, declared, reflected] of sides) {
            if (!declared || !reflected || reflected.error) continue;
            const names = new Set([...(reflected.properties ?? []), ...(reflected.methods ?? [])].map((m) => m.name).filter((n) => !NOISE.has(n) && /^[\w$]+$/.test(n)));
            for (const n of names) if (!declared.has(n)) add('lib-missing', name, n, `${side} member listed by reflection`);
            const tested = featured(name, side);
            for (const n of declared) if (!names.has(n) && !NOISE.has(n) && !tested.has(n)) add('lib-unreflected', name, n, `${side} member not listed by reflection`);
        }
    }

    // Feature tests: ES5+ members the engine lacks must not be declared, and ones it has must be.
    for (const [path, tests] of Object.entries(core.features)) {
        const [name, proto] = path.split('.');
        const id = name.replace('$', 'Dollar');
        const declared = declaredNames(proto ? `__inst_${id}` : `__static_${id}`);
        if (!declared) continue;
        for (const [member, type] of tests) {
            if (type === 'undefined' && declared.has(member)) add('lib-nonexistent', name, member, `${proto ? 'instance' : 'static'} member the engine does not have`);
            if (type !== 'undefined' && !type.startsWith('throws') && !declared.has(member) && !NOISE.has(member)) add('lib-missing', name, member, `${proto ? 'instance' : 'static'} member the engine has (${type})`);
        }
    }

    // Globals.
    const globalSyms = new Set(checker.getSymbolsInScope(sf, ts.SymbolFlags.Value).map((s) => s.getName()));
    // DOM classes (InDesign Server's Button, Event, ... where desktop has ScriptUI's) are the DOM
    // comparison's to check.
    const dictionary = JSON.parse(readFileSync(join(root, snapshot, 'dictionary.json'), 'utf8')).classes;
    for (const [name, type] of Object.entries(core.globals)) {
        if (dictionary[name] && !globalSyms.has(name)) continue;
        const exists = type !== 'undefined' && !type.startsWith('throws');
        if (exists && !globalSyms.has(name)) add('lib-global', null, name, `global ${type} not declared`);
        if (!exists && globalSyms.has(name) && name !== 'undefined') add('lib-global', null, name, 'declared global the engine does not have');
    }
    return findings;
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
    const i = process.argv.indexOf('--snapshot');
    const e = process.argv.indexOf('--edition');
    const findings = compareLib({ edition: e >= 0 ? process.argv[e + 1] : 'desktop', ...(i >= 0 ? { snapshot: process.argv[i + 1] } : {}) });
    const by = {};
    for (const f of findings) by[f.kind] = (by[f.kind] ?? 0) + 1;
    console.log(`${findings.length} findings`, by);
    const j = process.argv.indexOf('--json');
    if (j >= 0) writeFileSync(process.argv[j + 1], JSON.stringify(findings, null, 1) + '\n');
    else for (const f of findings) console.log(`  ${f.kind.padEnd(16)} ${(f.class ? `${f.class}.` : '') + f.member}: ${f.detail}`);
}
