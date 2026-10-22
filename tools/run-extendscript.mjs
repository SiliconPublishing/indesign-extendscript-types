#!/usr/bin/env node
// Runs an ExtendScript file in InDesign's pristine "main" engine via AppleScript `do script`,
// and returns the JSON its main() function produced.
//
// The script must define `function main(arg) { ... }`. `#include "file"` lines are inlined, and
// tools/dump/json.jsxinc is always prepended (the engine has no JSON). The result is written to a temp file by the
// engine (AppleScript string results are slow and lossy for large payloads).
//
//   node tools/run-extendscript.mjs <script.jsx> [--app "Adobe InDesign 2026"] [--out file.json] [--arg value]
import { execFileSync } from 'node:child_process';
import { mkdtempSync, readFileSync, writeFileSync, existsSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const JSON_INC = readFileSync(join(here, 'dump', 'json.jsxinc'), 'utf8');

// Inlines `#include "file"` lines (relative to baseDir), recursively; the script runs from a temp
// copy, where ExtendScript's own #include could not find them.
export function inlineIncludes(source, baseDir) {
    return source.replace(/^#include\s+"([^"]+)"\s*$/gm, (_, rel) => {
        const path = resolve(baseDir, rel);
        return inlineIncludes(readFileSync(path, 'utf8'), dirname(path));
    });
}

export function runExtendScriptFile(path, opts) {
    return runExtendScript(inlineIncludes(readFileSync(path, 'utf8'), dirname(resolve(path))), opts);
}

/** The AppleScript target for an app: InDesign Server's dictionary only loads when addressed by bundle id. */
export const appTarget = (app) => (/server/i.test(app) ? 'application id "com.adobe.InDesignServer"' : `application "${app}"`);

export function runExtendScript(source, { app = 'Adobe InDesign 2026', arg = null, timeoutSec = 600 } = {}) {
    const dir = mkdtempSync(join(tmpdir(), 'idx-'));
    const outPath = join(dir, 'out.json');
    const scriptPath = join(dir, 'script.jsx');
    const bodyPath = join(dir, 'body.jsx');
    writeFileSync(bodyPath, `${JSON_INC}\n${source}\n`, 'utf8');
    // The body is loaded with $.evalFile inside try/catch so that syntax errors come back with
    // their line number instead of failing the AppleScript call.
    const wrapped = [
        JSON_INC,
        `(function () {`,
        `  var r;`,
        `  // The "main" engine keeps globals between runs: drop a stale main() before loading.
  $.global.main = undefined;
  try { $.evalFile(new File(${JSON.stringify(bodyPath)})); r = { ok: true, value: main(${JSON.stringify(arg)}) }; }`,
        `  catch (e) { r = { ok: false, error: String(e.message || e), line: e.line, source: e.source ? String(e.source).split('\\n')[e.line - 1] : undefined }; }`,
        `  var f = new File(${JSON.stringify(outPath)}); f.encoding = 'UTF-8'; f.open('w'); f.write(__json.stringify(r)); f.close();`,
        `})();`,
    ].join('\n');
    writeFileSync(scriptPath, wrapped, 'utf8');
    const as = `with timeout of ${timeoutSec} seconds
tell ${appTarget(app)} to do script (POSIX file "${scriptPath}") language javascript
end timeout`;
    execFileSync('osascript', ['-e', as], { stdio: ['ignore', 'ignore', 'pipe'], timeout: (timeoutSec + 30) * 1000 });
    if (!existsSync(outPath)) throw new Error('script produced no output');
    const r = JSON.parse(readFileSync(outPath, 'utf8'));
    if (!r.ok) {
        // Line numbers count from the body file, which starts with json.jsxinc.
        const line = r.line ? r.line - JSON_INC.split('\n').length : '?';
        throw new Error(`ExtendScript error (line ${line}): ${r.error}${r.source ? `\n  > ${r.source.trim()}` : ''}`);
    }
    return r.value;
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
    const args = process.argv.slice(2);
    const opt = (n) => { const i = args.indexOf(n); return i >= 0 ? args.splice(i, 2)[1] : undefined; };
    const app = opt('--app'), out = opt('--out'), arg = opt('--arg');
    const value = runExtendScriptFile(args[0], { app, arg: arg ?? null });
    const text = JSON.stringify(value, null, 2) + '\n';
    if (out) writeFileSync(out, text); else process.stdout.write(text);
}
