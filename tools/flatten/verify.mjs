#!/usr/bin/env node
// Checks the flattener against upstream: flattens upstream's own types/ and compares the result,
// interface by interface and member by member, with the flat/ tree upstream publishes.
//
//   node tools/flatten/verify.mjs [--ref upstream/main] [--show 20]
//
// Members are compared by name and by their declaration text with whitespace and comments
// removed. Prints what differs; exits non-zero when anything does.
import { execSync } from 'node:child_process';
import { mkdtempSync, readdirSync, readFileSync, statSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { dirname, join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';
import ts from 'typescript';
import { flatten } from './index.mjs';

const root = join(dirname(fileURLToPath(import.meta.url)), '..', '..');
const arg = (n, d) => {
    const i = process.argv.indexOf(n);
    return i >= 0 ? process.argv[i + 1] : d;
};
const ref = arg('--ref', 'upstream/main');
const show = Number(arg('--show', 20));

const dir = mkdtempSync(join(tmpdir(), 'idx-verify-'));
execSync(`git archive ${ref} types flat | tar -x -C ${dir}`, { cwd: root });

const norm = (text) =>
    text
        .replace(/\/\*[\s\S]*?\*\//g, '')
        .replace(/\/\/.*$/gm, '')
        .replace(/\s+/g, '')
        .replace(/,([)>\]}])/g, '$1');

function interfacesOf(text) {
    const sf = ts.createSourceFile('x.ts', text, ts.ScriptTarget.Latest, true);
    const out = new Map();
    for (const st of sf.statements) {
        if (!ts.isInterfaceDeclaration(st)) continue;
        const members = new Map();
        for (const m of st.members) {
            const name = m.name ? m.name.getText(sf) : m.kind === ts.SyntaxKind.IndexSignature ? '[index]' : '()';
            members.set(name, (members.get(name) ?? '') + norm(m.getText(sf)));
        }
        out.set(st.name.text, { header: norm(`${st.name.text}${st.typeParameters ? `<${st.typeParameters.map((t) => t.getText(sf)).join(',')}>` : ''}`), members });
    }
    return out;
}

function walk(d) {
    const out = [];
    for (const f of readdirSync(d)) {
        const p = join(d, f);
        if (statSync(p).isDirectory()) out.push(...walk(p));
        else if (f.endsWith('.d.ts')) out.push(p);
    }
    return out;
}

const ours = flatten(join(dir, 'types'), join(dir, 'flat-ours'));
// Where upstream's own flattener is wrong and ours is not: its flat FlexObject drops the
// ShapeContainer members that `Omit<ShapeContainer<FlexObject>, 'epstexts'>` keeps.
const KNOWN = [/^FlexObject\.d\.ts: FlexObject(Plural)?\.(ovals|splineItems|rectangles|graphicLines|textFrames|polygons|groups) extra$/];
const problems = [];
let interfaces = 0;
let members = 0;
for (const theirsPath of walk(join(dir, 'flat'))) {
    const rel = relative(join(dir, 'flat'), theirsPath);
    const mine = ours.get(join(dir, 'flat-ours', rel));
    if (mine === undefined) {
        problems.push(`${rel}: not produced`);
        continue;
    }
    const a = interfacesOf(readFileSync(theirsPath, 'utf8'));
    const b = interfacesOf(mine);
    for (const [name, t] of a) {
        interfaces++;
        const m = b.get(name);
        if (!m) {
            problems.push(`${rel}: interface ${name} missing`);
            continue;
        }
        if (t.header !== m.header) problems.push(`${rel}: ${name} header: theirs ${t.header}, ours ${m.header}`);
        for (const [k, v] of t.members) {
            members++;
            if (!m.members.has(k)) problems.push(`${rel}: ${name}.${k} missing`);
            else if (m.members.get(k) !== v) problems.push(`${rel}: ${name}.${k} differs\n      theirs ${v.slice(0, 220)}\n      ours   ${m.members.get(k).slice(0, 220)}`);
        }
        for (const k of m.members.keys()) if (!t.members.has(k)) problems.push(`${rel}: ${name}.${k} extra`);
    }
    for (const name of b.keys()) if (!a.has(name)) problems.push(`${rel}: interface ${name} extra`);
}
const known = problems.filter((p) => KNOWN.some((k) => k.test(p)));
problems.splice(0, problems.length, ...problems.filter((p) => !known.includes(p)));
console.log(`${interfaces} interfaces, ${members} members compared; ${problems.length} differences (${known.length} known upstream deviations)`);
const kinds = {};
for (const p of problems) {
    const k = p.match(/(missing|extra|differs|header|not produced)/)?.[1] ?? '?';
    kinds[k] = (kinds[k] ?? 0) + 1;
}
console.log(kinds);
for (const p of problems.slice(0, show)) console.log(`  ${p}`);
process.exit(problems.length ? 1 : 0);
