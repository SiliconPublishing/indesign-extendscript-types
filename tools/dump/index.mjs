#!/usr/bin/env node
// Re-measures everything the declarations are checked against, into snapshots/<version>/.
//
//   node tools/dump/index.mjs [--app "Adobe InDesign 2026"] [--snapshot snapshots/indesign-21.6]
//
// Steps: dictionary (raw OMV XML, then parsed), globals, enum aliases, core JS. Each runs in the
// pristine "main" ExtendScript engine through tools/run-extendscript.mjs.
import { mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { runExtendScriptFile } from '../run-extendscript.mjs';
import { parseDictionary, readRaw } from './parse-dictionary.mjs';

const here = dirname(fileURLToPath(import.meta.url));
const root = join(here, '..', '..');

function arg(name, fallback) {
    const i = process.argv.indexOf(name);
    return i >= 0 ? process.argv[i + 1] : fallback;
}

/** Alias spellings worth testing for an enumerator: camelCase and all-lowercase. */
export function aliasCandidates(name) {
    const parts = name.toLowerCase().split('_');
    const camel = parts[0] + parts.slice(1).map((p) => p.charAt(0).toUpperCase() + p.slice(1)).join('');
    return [...new Set([camel, parts.join('')])].filter((n) => n !== name);
}

const app = arg('--app', 'Adobe InDesign 2026');
const out = resolve(root, arg('--snapshot', 'snapshots/indesign-21.6'));
const write = (file, value) => writeFileSync(join(out, file), JSON.stringify(value, null, 1) + '\n');
mkdirSync(out, { recursive: true });

console.log('dictionary...');
rmSync(join(out, 'raw'), { recursive: true, force: true });
runExtendScriptFile(join(here, 'dictionary.jsx'), { app, arg: join(out, 'raw') });
const dictionary = parseDictionary(readRaw(join(out, 'raw')));
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
