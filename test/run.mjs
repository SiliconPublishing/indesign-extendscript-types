#!/usr/bin/env node
// The test suite.
//
//   node test/run.mjs            static: typecheck fixtures, compare declarations with the
//                                committed snapshots (no InDesign needed)
//   node test/run.mjs --live     also re-measure InDesign (dump/index.mjs) and run every probe in
//                                test/probes; needs InDesign 2026 on macOS
//   --app "Adobe InDesign 2026"  which InDesign to measure
//
// The comparison passes when every finding is informational or allow-listed
// (tools/compare/allowlist.json), and every allow-list entry still matches something.
import { execFileSync } from 'node:child_process';
import { readdirSync, readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { compare } from '../tools/compare/index.mjs';
import { compareLib } from '../tools/compare/lib.mjs';
import { runExtendScriptFile } from '../tools/run-extendscript.mjs';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const live = process.argv.includes('--live');
const appIndex = process.argv.indexOf('--app');
const app = appIndex >= 0 ? process.argv[appIndex + 1] : 'Adobe InDesign 2026';
let failed = 0;

function section(title) {
    console.log(`\n== ${title}`);
}

function fail(message) {
    failed++;
    console.log(`  FAIL ${message}`);
}

if (live) {
    section(`re-measuring ${app}`);
    execFileSync('node', [join(root, 'tools/dump/index.mjs'), '--app', app], { stdio: 'inherit' });

    section('probes');
    const dir = join(root, 'test/probes');
    for (const file of readdirSync(dir).filter((f) => f.endsWith('.jsx')).sort()) {
        let results;
        try {
            results = runExtendScriptFile(join(dir, file), { app, arg: root });
        } catch (e) {
            fail(`${file}: ${e.message}`);
            continue;
        }
        const bad = results.filter((r) => !r.pass);
        console.log(`  ${bad.length ? 'FAIL' : 'ok  '} ${file}: ${results.length - bad.length}/${results.length}`);
        for (const r of bad) fail(`${file}: ${r.name}: got ${JSON.stringify(r.actual)}${'expected' in r ? `, expected ${JSON.stringify(r.expected)}` : ''}`);
    }
    // Probes that cannot close their documents before yielding (background export) label them;
    // close them now, with anything else a failed probe left.
    execFileSync('sleep', ['3']);
    runExtendScriptFile(join(root, 'tools/dump/cleanup.jsx'), { app });
}

for (const config of ['tsconfig.json', 'tsconfig.flat.json']) {
    section(`typecheck (tsc -p ${config})`);
    try {
        execFileSync(join(root, 'node_modules/.bin/tsc'), ['-p', join(root, config)], { stdio: 'pipe' });
        console.log('  ok');
    } catch (e) {
        fail(`tsc:\n${e.stdout}`);
    }
}

section('plugin declarations (tools/plugin, offline, a synthetic plugin)');
try {
    execFileSync('node', [join(root, 'test/plugin/synthetic.mjs')], { stdio: 'pipe' });
    console.log('  ok');
} catch (e) {
    fail(`plugin tool:\n${e.stderr || e.stdout}`);
}

section('flattener reproduces upstream flat/ from upstream types/');
try {
    console.log(`  ${execFileSync('node', [join(root, 'tools/flatten/verify.mjs'), '--show', '10'], { stdio: 'pipe' }).toString().split('\n')[0]}`);
} catch (e) {
    fail(`flatten/verify:\n${e.stdout}`);
}

section('declarations vs. measurements (DOM and ES3 core)');
const allow = JSON.parse(readFileSync(join(root, 'tools/compare/allowlist.json'), 'utf8'));
// Both trees: the authored one, and the flat one (where setters are not generic, so write types
// are exact). Findings are merged by identity.
const { findings: domFindings, classes } = compare();
const { findings: flatFindings } = compare({ entry: 'flat/globals.d.ts' });
const seenFinding = new Set();
const findings = [];
for (const f of [...domFindings, ...flatFindings, ...compareLib()]) {
    const k = `${f.kind}|${f.class}|${f.member}|${f.detail}`;
    if (!seenFinding.has(k)) {
        seenFinding.add(k);
        findings.push(f);
    }
}
const matches = (e, f) =>
    new RegExp(`^(${e.kind})$`).test(f.kind) &&
    (!e.class || new RegExp(e.class).test(f.class)) &&
    (!e.member || new RegExp(e.member).test(f.member ?? '')) &&
    (!e.detail || new RegExp(e.detail).test(f.detail));
const used = new Set();
let informational = 0;
const unexplained = [];
for (const f of findings) {
    if (allow.informational.includes(f.kind)) {
        informational++;
        continue;
    }
    const i = allow.entries.findIndex((e) => matches(e, f));
    if (i >= 0) used.add(i);
    else unexplained.push(f);
}
console.log(`  ${classes} classes; ${findings.length} findings: ${informational} informational, ${findings.length - informational - unexplained.length} allow-listed, ${unexplained.length} unexplained`);
for (const f of unexplained.slice(0, 50)) fail(`${f.kind} ${f.class}.${f.member}: ${f.detail}`);
if (unexplained.length > 50) fail(`... and ${unexplained.length - 50} more`);
allow.entries.forEach((e, i) => {
    if (!used.has(i)) fail(`stale allow-list entry (matches nothing): ${JSON.stringify(e)}`);
});

console.log(failed ? `\n${failed} failure(s)` : '\nall passed');
process.exit(failed ? 1 : 0);
