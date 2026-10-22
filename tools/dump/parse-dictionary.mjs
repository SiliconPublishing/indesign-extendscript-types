#!/usr/bin/env node
// Normalises the raw OMV XML dumped by dictionary.jsx into a model the comparer can diff.
//
//   node tools/dump/parse-dictionary.mjs <raw dir from dictionary.jsx> <dictionary.json>
//
// Model, per class:
//   { name, kind: 'enum' | 'class', suite, superclass, dynamic, desc,
//     enumValues: { NAME: number }                       (enums only)
//     statics:  [{ name, type, value, desc }]            (event-name constants etc.)
//     props:    [{ name, readonly, type, desc }]         (own members only, see `inherited`)
//     methods:  [{ name, desc, returns, params: [{ name, optional, type, default, desc }] }] }
//
// A type is { name, array (nesting depth), alternatives?, min?, max? }. The OMV writes unions as
// `varies=any`; their members only appear in the prose ("Can accept: File or String."), so those
// are parsed into `alternatives`.
import { readFileSync, writeFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { XMLParser } from 'fast-xml-parser';

const parser = new XMLParser({
    ignoreAttributes: false,
    attributeNamePrefix: '',
    isArray: (name) => ['elements', 'property', 'method', 'parameter', 'array'].includes(name),
    parseTagValue: false,
    trimValues: true,
});

const PRIMS = { 'Measurement Unit (Number or String)=any': 'Measurement', bool: 'boolean', number: 'number', string: 'string', Object: 'Object', any: 'any', undefined: 'void' };

function parseAlternatives(desc) {
    const m = /Can (?:accept|return):\s*(.*?)(?:\.\s*$|\.\s+[A-Z(]|$)/s.exec(desc || '');
    if (!m) return undefined;
    // Split at top-level commas and "or"s only: "Array of 4 Units (Number or String)" is one.
    const parts = [];
    let depth = 0;
    let cur = '';
    const text = m[1];
    for (let i = 0; i < text.length; i++) {
        const ch = text[i];
        if (ch === '(') depth++;
        if (ch === ')') depth--;
        const rest = text.slice(i);
        const sep = depth === 0 && (/^,\s*(?:or\s+)?/.exec(rest) || /^\s+or\s+/.exec(rest));
        if (sep) {
            parts.push(cur.trim());
            cur = '';
            i += sep[0].length - 1;
        } else cur += ch;
    }
    parts.push(cur.trim());
    // "Ordered array containing a:X, b:Y" was split at its commas: fold the "b:Y" pieces back.
    // Likewise "Array of Arrays of 2 Reals, CoordinateSpaces enumerators or Long Integers": plural
    // items after an array are its element types, not alternatives of their own.
    const PLURAL = /^(\w+ enumerators|(Long |Short |Long Long )?Integers|Reals|Strings|Booleans|Units|Objects|Files|Arrays of .*)$/;
    const out = [];
    for (const p of parts.filter(Boolean)) {
        const prev = out[out.length - 1];
        if (/^[a-z]\w*:/.test(p) && prev && /Ordered array containing|:/.test(prev)) out[out.length - 1] += `, ${p}`;
        else if (PLURAL.test(p) && prev && /^(Array|Arrays|Ordered array)\b/.test(prev)) out[out.length - 1] += `, ${p}`;
        else out.push(p);
    }
    return out;
}

function parseType(dt, desc) {
    if (!dt) return { name: 'void', array: 0 };
    const raw = String(dt.type ?? 'any');
    const t = { name: raw.startsWith('varies') ? 'any' : PRIMS[raw] ?? raw, array: dt.array ? dt.array.length : 0 };
    if (raw.startsWith('varies')) t.varies = true;
    const alts = parseAlternatives(desc);
    if (alts) t.alternatives = alts;
    if (dt.min !== undefined) t.min = Number(dt.min);
    if (dt.max !== undefined) t.max = Number(dt.max);
    return t;
}

function parseClass(name, xml) {
    const def = parser.parse(xml).classdef;
    const out = {
        name,
        kind: def.enumeration === 'true' ? 'enum' : 'class',
        superclass: typeof def.superclass === 'object' ? def.superclass['#text'] : def.superclass,
        dynamic: def.dynamic === 'true',
        desc: def.shortdesc || '',
        statics: [],
        props: [],
        methods: [],
    };
    if (out.kind === 'enum') out.enumValues = {};
    for (const el of def.elements ?? []) {
        const isClass = el.type === 'class';
        for (const p of el.property ?? []) {
            const type = parseType(p.datatype, p.shortdesc);
            if (out.kind === 'enum') {
                out.enumValues[p.name] = Number(p.datatype?.value);
            } else if (isClass) {
                out.statics.push({ name: p.name, type, value: p.datatype?.value, desc: p.shortdesc || '' });
            } else {
                out.props.push({ name: p.name, readonly: p.rwaccess === 'readonly', type, desc: p.shortdesc || '' });
            }
        }
        for (const m of el.method ?? []) {
            const params = (m.parameters?.parameter ?? []).map((a) => ({
                name: a.name,
                optional: a.optional === 'true',
                type: parseType(a.datatype, a.shortdesc),
                default: a.datatype?.value,
                desc: a.shortdesc || '',
            }));
            const entry = { name: m.name, desc: m.shortdesc || '', returns: parseType(m.datatype, m.shortdesc), params };
            (isClass ? (out.staticMethods ??= []) : out.methods).push(entry);
        }
    }
    return out;
}

export function readRaw(dir) {
    const meta = JSON.parse(readFileSync(join(dir, 'meta.json'), 'utf8'));
    const classes = {};
    for (const f of readdirSync(join(dir, 'classes')).sort()) {
        classes[f.replace(/\.xml$/, '')] = readFileSync(join(dir, 'classes', f), 'utf8');
    }
    return { ...meta, classes };
}

export function parseDictionary(raw) {
    const suiteOf = {};
    for (const [suite, names] of Object.entries(raw.suites)) for (const n of names) suiteOf[n] = suite;
    const classes = {};
    for (const [name, xml] of Object.entries(raw.classes)) {
        classes[name] = { ...parseClass(name, xml), suite: suiteOf[name] };
    }
    return { version: raw.version, build: raw.build, classes };
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
    const [src, dest] = process.argv.slice(2);
    const model = parseDictionary(readRaw(src));
    writeFileSync(dest, JSON.stringify(model, null, 1) + '\n');
    const cls = Object.values(model.classes);
    console.log(
        `${cls.length} classes: ${cls.filter((c) => c.kind === 'enum').length} enums, ` +
            `${cls.reduce((a, c) => a + c.props.length, 0)} props, ${cls.reduce((a, c) => a + c.methods.length, 0)} methods`,
    );
}
