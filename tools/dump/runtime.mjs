#!/usr/bin/env node
// Runs the runtime type sampler (runtime.jsx), surviving InDesign crashes: when a property read
// takes InDesign down, the key it was reading (the last line of progress.log) is added to
// runtime-crashers.json with the InDesign version, InDesign is relaunched, and the sampler runs
// again. The crashers are themselves a finding: they are documented on the members concerned.
//
//   node tools/dump/runtime.mjs [--writes] [--app "Adobe InDesign 2026"] [--snapshot snapshots/indesign-21.6]
//
// --writes runs the write sampler (writes.jsx → writes.json) instead of the read sampler
// (runtime.jsx → runtime.json). Both share runtime-crashers.json.
import { execFileSync } from 'node:child_process';
import { cpSync, existsSync, mkdtempSync, readFileSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { inlineIncludes, runExtendScript, runExtendScriptFile } from '../run-extendscript.mjs';
import { INDESIGN_VERSION, SNAPSHOT } from '../snapshot.mjs';

const here = dirname(fileURLToPath(import.meta.url));
const root = join(here, '..', '..');

function arg(name, fallback) {
    const i = process.argv.indexOf(name);
    return i >= 0 ? process.argv[i + 1] : fallback;
}

function waitForApp(app, timeoutSec = 300) {
    const until = Date.now() + timeoutSec * 1000;
    while (Date.now() < until) {
        try {
            execFileSync('osascript', ['-e', `with timeout of 20 seconds\ntell application "${app}" to get version\nend timeout`], { stdio: 'ignore' });
            return;
        } catch {
            execFileSync('sleep', ['5']);
        }
    }
    throw new Error(`${app} did not come back within ${timeoutSec}s`);
}

/** Closes documents InDesign recovered after a crash, if they are ours (in an idx-fixture- folder). */
function closeRecoveredFixtures(app) {
    const script = `var closed = 0;
for (var i = app.documents.length - 1; i >= 0; i--) {
    var d = app.documents[i], path = '';
    try { path = d.fullName.fsName; } catch (e) { try { path = d.filePath.fsName; } catch (e2) {} }
    if (/idx-fixture-/.test(path)) { d.close(SaveOptions.NO); closed++; }
}
closed;`;
    try {
        execFileSync('osascript', ['-e', `with timeout of 60 seconds\ntell application "${app}" to do script ${JSON.stringify(script)} language javascript\nend timeout`], { stdio: 'ignore' });
    } catch {}
}

/**
 * prelude: ExtendScript prepended to the sampler, such as a plugin's pluginFixture() (tools/plugin).
 * snapshot: relative to the repository, or absolute.
 */
export function sampleRuntime({ app = 'Adobe InDesign 2026', snapshot = SNAPSHOT, script = 'runtime.jsx', prelude = '', maxCrashes = 15 } = {}) {
    const crashFile = join(resolve(root, snapshot), 'runtime-crashers.json');
    const source = `${prelude}\n${inlineIncludes(readFileSync(join(here, script), 'utf8'), here)}`;
    const crashers = existsSync(crashFile) ? JSON.parse(readFileSync(crashFile, 'utf8')) : {};
    for (let attempt = 0; attempt <= maxCrashes; attempt++) {
        // A fresh folder each attempt: after a crash InDesign may reopen the last attempt's document.
        const dir = mkdtempSync(join(tmpdir(), 'idx-fixture-'));
        cpSync(join(root, 'test/fixtures/media'), dir, { recursive: true });
        try {
            return runExtendScript(source, { app, arg: `${dir}|${JSON.stringify(Object.keys(crashers))}`, timeoutSec: 600 });
        } catch (e) {
            // Whatever went wrong, leave nothing of the fixture behind in InDesign.
            const cleanup = () => {
                try {
                    runExtendScriptFile(join(here, 'cleanup.jsx'), { app, timeoutSec: 120 });
                } catch {}
            };
            const log = existsSync(join(dir, 'progress.log')) ? readFileSync(join(dir, 'progress.log'), 'utf8').trim().split(/\r\n|\r|\n/) : [];
            const last = log[log.length - 1];
            if (!last || /ExtendScript error/.test(e.message)) {
                cleanup();
                throw new Error(`${e.message}\n  (last step: ${last})`);
            }
            console.log(`  InDesign went down at ${last}; blocklisting it and retrying`);
            crashers[last] = { crashes: true, version: INDESIGN_VERSION, error: String(e.message).split('\n')[0].slice(0, 200) };
            writeFileSync(crashFile, JSON.stringify(crashers, null, 1) + '\n');
            waitForApp(app);
            closeRecoveredFixtures(app);
            cleanup();
        }
    }
    throw new Error('too many crashes');
}

/**
 * Samples what exists only once a script yields (BackgroundTask, IdleEvent): arm, let InDesign
 * idle, collect. Collects again until the document is closed (its export must finish first).
 */
export function sampleAsync({ app = 'Adobe InDesign 2026' } = {}) {
    const dir = mkdtempSync(join(tmpdir(), 'idx-fixture-'));
    // The idle listener is a script file (a function would die with the arming script).
    const json = readFileSync(join(here, 'json.jsxinc'), 'utf8');
    writeFileSync(join(dir, 'idle-handler.jsx'), `${json}\n${inlineIncludes(readFileSync(join(here, 'idle-handler.jsx'), 'utf8'), here)}`);
    const armed = runExtendScriptFile(join(here, 'async.jsx'), { app, arg: `arm|${dir}` });
    const samples = { ...armed.samples };
    let idle = false;
    let r = {};
    for (let i = 0; i < 15; i++) {
        execFileSync('sleep', ['2']);
        if (!idle && existsSync(join(dir, 'idle.json'))) {
            Object.assign(samples, JSON.parse(readFileSync(join(dir, 'idle.json'), 'utf8')));
            idle = true;
        }
        if (!idle && i < 5) continue; // give the idle task a chance first
        r = runExtendScriptFile(join(here, 'async.jsx'), { app, arg: 'collect' });
        if (!r.stillOpen) break;
    }
    return { samples, idle, task: Object.keys(armed.samples).length > 0, ...r };
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
    const snapshot = arg('--snapshot', SNAPSHOT);
    const writes = process.argv.includes('--writes');
    const r = sampleRuntime({ app: arg('--app', 'Adobe InDesign 2026'), snapshot, script: writes ? 'writes.jsx' : 'runtime.jsx' });
    if (!writes) {
        const a = sampleAsync({ app: arg('--app', 'Adobe InDesign 2026') });
        console.log(`async: task ${a.task}, idle event ${a.idle}, documents closed ${a.closed}, still open ${a.stillOpen}`);
        for (const [k, v] of Object.entries(a.samples)) r.samples[k] = v;
        for (const c of new Set(Object.keys(a.samples).map((k) => k.split('.')[0]))) if (!r.classesSampled.includes(c)) r.classesSampled.push(c);
    }
    writeFileSync(resolve(root, snapshot, writes ? 'writes.json' : 'runtime.json'), JSON.stringify(r, null, 1) + '\n');
    // A crash's recovery can reopen fixture documents and libraries after the retry has started.
    const left = runExtendScriptFile(join(here, 'cleanup.jsx'), { app: arg('--app', 'Adobe InDesign 2026') });
    if (left.some((l) => !/^kept /.test(l))) console.log(`cleanup: ${left.join('; ')}`);
    console.log(`${r.classesSampled.length} classes, ${Object.keys(writes ? r.writes : r.samples).length} members in ${r.ms}ms${r.timedOut ? ' (timed out)' : ''}`);
    if (r.fixtureErrors.length) console.log('fixture errors:\n  ' + r.fixtureErrors.join('\n  '));
}
