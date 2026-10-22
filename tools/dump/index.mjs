#!/usr/bin/env node
// Re-measures everything the declarations are checked against, into snapshots/<version>/.
//
//   node tools/dump/index.mjs [--app "Adobe InDesign 2026"] [--snapshot snapshots/indesign-21.6]
//                             [--allow-plugins] [--accept-new-surface]
//
// Snapshots describe InDesign itself, so the dump refuses to write one while third-party plugins
// are installed (they add to the scripting dictionary; see tools/plugin for declaring theirs), or
// when the dictionary has gained classes or members over the snapshot it replaces for the same
// version (an unexplained addition is most likely a plugin). Override with the flags.
//
// Steps: dictionary (raw OMV XML, then parsed), globals, enum aliases, core JS. Each runs in the
// pristine "main" ExtendScript engine through tools/run-extendscript.mjs.
import { cpSync, existsSync, mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { runExtendScriptFile } from '../run-extendscript.mjs';
import { parseDictionary, readRaw } from './parse-dictionary.mjs';
import { aliasCandidates, surfaceAdded } from './surface.mjs';
import { SNAPSHOT } from '../snapshot.mjs';

const here = dirname(fileURLToPath(import.meta.url));
const root = join(here, '..', '..');

function arg(name, fallback) {
    const i = process.argv.indexOf(name);
    return i >= 0 ? process.argv[i + 1] : fallback;
}

const app = arg('--app', 'Adobe InDesign 2026');
const out = resolve(root, arg('--snapshot', SNAPSHOT));
const write = (file, value) => writeFileSync(join(out, file), JSON.stringify(value, null, 1) + '\n');
mkdirSync(out, { recursive: true });

console.log('dictionary...');
const staging = mkdtempSync(join(tmpdir(), 'idx-dict-'));
runExtendScriptFile(join(here, 'dictionary.jsx'), { app, arg: staging });
const raw = readRaw(staging);
if (raw.thirdPartyPlugins?.length && !process.argv.includes('--allow-plugins')) {
    console.error(`Third-party plugins are installed; their scripting additions would leak into the snapshot:\n  ${raw.thirdPartyPlugins.join('\n  ')}\nRemove them and restart InDesign, or pass --allow-plugins. To declare a plugin's API, use npm run plugin.`);
    process.exit(1);
}
const dictionary = parseDictionary(raw);
const previousPath = join(out, 'dictionary.json');
if (existsSync(previousPath) && !process.argv.includes('--accept-new-surface')) {
    const previous = JSON.parse(readFileSync(previousPath, 'utf8'));
    if (previous.version === dictionary.version) {
        const grown = surfaceAdded(previous.classes, dictionary.classes);
        if (grown.length) {
            console.error(`The dictionary has grown since this snapshot, for the same InDesign version (${dictionary.version}); a plugin is the likely cause:\n  ${grown.slice(0, 30).join('\n  ')}${grown.length > 30 ? `\n  ... and ${grown.length - 30} more` : ''}\nPass --accept-new-surface if this is InDesign's own.`);
            process.exit(1);
        }
    }
}
rmSync(join(out, 'raw'), { recursive: true, force: true });
cpSync(staging, join(out, 'raw'), { recursive: true });
write('dictionary.json', dictionary);
const classes = Object.values(dictionary.classes);

console.log('globals...');
write('globals.json', runExtendScriptFile(join(here, 'globals.jsx'), { app, arg: JSON.stringify(classes.map((c) => c.name)) }));

console.log('enum aliases...');
const candidates = classes
    .filter((c) => c.kind === 'enum')
    .map((c) => [c.name, Object.keys(c.enumValues).flatMap(aliasCandidates)]);
write('enum-aliases.json', runExtendScriptFile(join(here, 'enum-aliases.jsx'), { app, arg: JSON.stringify(candidates) }));

console.log('core JS...');
write('corejs.json', runExtendScriptFile(join(here, 'corejs.jsx'), { app }));
console.log(`wrote ${out}`);
