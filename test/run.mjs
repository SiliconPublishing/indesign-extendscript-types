#!/usr/bin/env node
// The test suite.
//
//   node test/run.mjs            static: typecheck fixtures, compare declarations with the
//                                committed snapshots (no InDesign needed)
//   node test/run.mjs --live     also re-measure InDesign desktop and InDesign Server
//                                (dump/index.mjs) and run every probe in test/probes on both;
//                                needs both running on macOS
//   --app "Adobe InDesign 2026"  which InDesign desktop to measure
//   --server-app "Adobe InDesign Server 2026" | --no-server
//
// The comparison passes when every finding is informational or allow-listed
// (tools/compare/allowlist.json), and every allow-list entry still matches something.
import { execFileSync } from 'node:child_process';
import { mkdtempSync, readdirSync, readFileSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { compare } from '../tools/compare/index.mjs';
import { compareLib } from '../tools/compare/lib.mjs';
import { runExtendScriptFile } from '../tools/run-extendscript.mjs';
import { INDESIGN_VERSION, PACKAGE_VERSION, SERVER_SNAPSHOT, SNAPSHOT } from '../tools/snapshot.mjs';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const live = process.argv.includes('--live');
const appIndex = process.argv.indexOf('--app');
const app = appIndex >= 0 ? process.argv[appIndex + 1] : 'Adobe InDesign 2026';
const serverIndex = process.argv.indexOf('--server-app');
const serverApp = process.argv.includes('--no-server') ? null : serverIndex >= 0 ? process.argv[serverIndex + 1] : 'Adobe InDesign Server 2026';
let failed = 0;

function section(title) {
    console.log(`\n== ${title}`);
}

function fail(message) {
    failed++;
    console.log(`  FAIL ${message}`);
}

if (live) {
    for (const [target, snapshot] of [[app, SNAPSHOT], ...(serverApp ? [[serverApp, SERVER_SNAPSHOT]] : [])]) {
        section(`re-measuring ${target}`);
        execFileSync('node', [join(root, 'tools/dump/index.mjs'), '--app', target, '--snapshot', snapshot], { stdio: 'inherit' });

        section(`probes (${target})`);
        const dir = join(root, 'test/probes');
        for (const file of readdirSync(dir).filter((f) => f.endsWith('.jsx')).sort()) {
            let results;
            try {
                results = runExtendScriptFile(join(dir, file), { app: target, arg: root });
            } catch (e) {
                fail(`${file}: ${e.message}`);
                continue;
            }
            const bad = results.filter((r) => !r.pass);
            console.log(`  ${bad.length ? 'FAIL' : 'ok  '} ${file}: ${results.length - bad.length}/${results.length}`);
            for (const r of bad) fail(`${target}: ${file}: ${r.name}: got ${JSON.stringify(r.actual)}${'expected' in r ? `, expected ${JSON.stringify(r.expected)}` : ''}`);
        }
        // Probes that cannot close their documents before yielding (background export) label them;
        // close them now, with anything else a failed probe left.
        execFileSync('sleep', ['3']);
        runExtendScriptFile(join(root, 'tools/dump/cleanup.jsx'), { app: target });
    }
}

section(`package version ${PACKAGE_VERSION} follows the measured InDesign`);
try {
    const measured = JSON.parse(readFileSync(join(root, SNAPSHOT, 'dictionary.json'), 'utf8')).version;
    if (!measured.startsWith(`${INDESIGN_VERSION}.`)) fail(`${SNAPSHOT} was measured on InDesign ${measured}`);
    else console.log(`  ok   ${SNAPSHOT} (InDesign ${measured})`);
} catch (e) {
    fail(`no snapshot for InDesign ${INDESIGN_VERSION}: ${e.message}`);
}
try {
    const server = JSON.parse(readFileSync(join(root, SERVER_SNAPSHOT, 'dictionary.json'), 'utf8')).version;
    // A Server release can lag the desktop's; the declarations then say which Server they describe.
    console.log(`  ${server.startsWith(`${INDESIGN_VERSION}.`) ? 'ok  ' : 'note'} ${SERVER_SNAPSHOT} (InDesign Server ${server})`);
} catch (e) {
    fail(`no InDesign Server snapshot: ${e.message}`);
}

// Every entry point: each edition, from each tree, with the fixtures for that edition.
const EDITION_FIXTURES = { desktop: 'test/typecheck/*.ts', server: 'test/typecheck/server/*.ts', portable: 'test/typecheck/portable/*.ts' };
const tsconfigDir = mkdtempSync(join(tmpdir(), 'idx-tsc-'));
for (const edition of ['desktop', 'server', 'portable']) {
    for (const tree of ['types', 'flat']) {
        section(`typecheck: ${edition}, ${tree === 'types' ? 'authored' : 'flat'} tree`);
        const config = join(tsconfigDir, `${edition}-${tree}.json`);
        const libs = edition === 'desktop' ? ['lib/global.d.ts', 'lib/ScriptUI.d.ts'] : ['lib/global.d.ts'];
        writeFileSync(
            config,
            JSON.stringify({
                compilerOptions: { noLib: true, target: 'es5', module: 'none', ignoreDeprecations: '5.0', strict: true, noEmit: true, types: [] },
                files: [...libs, `${tree}/editions/${edition}.d.ts`].map((f) => join(root, f)),
                include: [join(root, EDITION_FIXTURES[edition])],
            }),
        );
        try {
            execFileSync(join(root, 'node_modules/.bin/tsc'), ['-p', config], { stdio: 'pipe' });
            console.log('  ok');
        } catch (e) {
            fail(`tsc:\n${e.stdout}`);
        }
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
// Every edition, from both trees: the authored one, and the flat one (where setters are not
// generic, so write types are exact). Findings are merged by identity.
const seenFinding = new Set();
const findings = [];
const classes = {};
for (const edition of ['desktop', 'server', 'portable']) {
    for (const tree of ['types', 'flat']) {
        const r = compare({ edition, tree });
        classes[edition] = r.classes;
        for (const f of r.findings) {
            const k = `${f.kind}|${f.class}|${f.member}|${f.detail}`;
            if (!seenFinding.has(k)) {
                seenFinding.add(k);
                findings.push({ ...f, edition });
            }
        }
    }
}
for (const edition of ['desktop', 'server']) {
    for (const f of compareLib({ edition })) {
        const k = `${f.kind}|${f.class}|${f.member}|${f.detail}`;
        if (!seenFinding.has(k)) {
            seenFinding.add(k);
            findings.push({ ...f, edition });
        }
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
console.log(`  ${Object.entries(classes).map(([e, n]) => `${e} ${n}`).join(', ')} classes; ${findings.length} findings: ${informational} informational, ${findings.length - informational - unexplained.length} allow-listed, ${unexplained.length} unexplained`);
for (const f of unexplained.slice(0, 50)) fail(`${f.edition}: ${f.kind} ${f.class}.${f.member}: ${f.detail}`);
if (unexplained.length > 50) fail(`... and ${unexplained.length - 50} more`);
allow.entries.forEach((e, i) => {
    if (!used.has(i)) fail(`stale allow-list entry (matches nothing): ${JSON.stringify(e)}`);
});

console.log(failed ? `\n${failed} failure(s)` : '\nall passed');
process.exit(failed ? 1 : 0);
