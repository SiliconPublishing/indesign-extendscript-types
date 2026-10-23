#!/usr/bin/env node
// Converts upstream indesign-uxp-types (`types/` tree) into ExtendScript declarations.
//
//   node tools/codemod/index.mjs [--from <git ref>] [--out <dir>]
//
// The input is always a pristine `git archive` of the upstream ref (default `upstream/main`), so
// the output is reproducible: re-run after `git fetch upstream` to pick up a new release.
//
// Every rule reports how many edits it made and fails when that falls outside what it expects:
// an upstream change that moves an anchor stops the build instead of silently skipping a rule.
// ExtendScript-only declarations that have no upstream counterpart live in overlays/, copied in
// last.
import { execSync } from 'node:child_process';
import { cpSync, existsSync, mkdirSync, mkdtempSync, readFileSync, renameSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { dirname, join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';
import { IndentationText, Node, Project, SyntaxKind } from 'ts-morph';
import { generateGlobals } from './globals.mjs';
import { widenByRuntime } from './widen.mjs';
import { fillFromDictionary } from './fill.mjs';
import { addPluginHooks } from './plugin-hooks.mjs';
import { splitEditions } from './editions.mjs';
import { writeFlat } from '../flatten/index.mjs';
import { SERVER_SNAPSHOT, SNAPSHOT } from '../snapshot.mjs';

const root = join(dirname(fileURLToPath(import.meta.url)), '..', '..');

function arg(name, fallback) {
    const i = process.argv.indexOf(name);
    return i >= 0 ? process.argv[i + 1] : fallback;
}

/** Extracts `<ref>:types` into a temp dir and returns its path. */
function extractUpstream(ref) {
    const dir = mkdtempSync(join(tmpdir(), 'idx-upstream-'));
    execSync(`git archive ${ref} types | tar -x -C ${dir}`, { cwd: root, stdio: ['ignore', 'ignore', 'inherit'] });
    return join(dir, 'types');
}

// ---------------------------------------------------------------------------------------------
// Text rules: run on every file's text, in order. `expect` bounds the total number of edits.
// ---------------------------------------------------------------------------------------------

/** A text rule replacing `find` (string or global RegExp) everywhere. */
function replaceAll(name, find, replacement, expect, files = () => true) {
    return {
        name,
        expect,
        apply(path, text) {
            if (!files(path)) return [text, 0];
            let count = 0;
            const re = typeof find === 'string' ? new RegExp(find.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g') : find;
            const out = text.replace(re, (...m) => {
                count++;
                return typeof replacement === 'function' ? replacement(...m) : replacement.replace(/\$(\d)/g, (_, i) => m[+i]);
            });
            return [out, count];
        },
    };
}

/** A text rule replacing the span from `start` up to (not including) `end` in one file. */
function replaceSpan(name, file, start, end, replacement) {
    return {
        name,
        expect: [1, 1],
        apply(path, text) {
            if (path !== file) return [text, 0];
            const a = text.indexOf(start);
            const b = end === null ? text.length : text.indexOf(end, a);
            if (a < 0 || b < 0) return [text, 0];
            return [text.slice(0, a) + replacement + text.slice(b), 1];
        },
    };
}

const isEnumFile = (p) => p.startsWith('Enums/') && p !== 'Enums/index.d.ts';

const TEXT_RULES = [
    replaceAll(
        'header: UXP → ExtendScript',
        ' * Adobe InDesign 2026 (21.x) UXP scripting DOM declarations.',
        ' * Adobe InDesign 2026 (21.x) ExtendScript DOM declarations,\n * converted from indesign-uxp-types by tools/codemod.',
        [600, 2000],
    ),

    // File and folder values are ExtendScript File/Folder objects, returned synchronously
    // (probes: "save string path", "filePath", "scriptsFolder", "activeScript").
    replaceAll('Promise<File> → File', /Promise<File>/g, 'File', [20, 60]),
    replaceAll('Promise<Folder> → Folder', /Promise<Folder>/g, 'Folder', [5, 20]),
    replaceAll('docs: `Promise<`{@link File}`>`', /a `Promise<`\{@link (File|Folder)\}`>`/g, 'a {@link $1}', [1, 10]),

    replaceSpan(
        'Types: UXP storage entries → ExtendScript File/Folder',
        '_base/Types.d.ts',
        "import type { storage } from 'uxp';\n",
        '/**\n * The pair-kerning method',
        `/**
 * A file to pass to InDesign: a path string, or an ExtendScript {@link File}.
 *
 * Setters and method parameters take either — \`app.open(path)\`, \`app.open([fileA, fileB])\`,
 * \`doc.exportFile(format, file)\` — and the file need not exist on disk yet.
 *
 * Reading a file-valued property back always gives a {@link File}.
 */
export type FilePath = string | File;

/**
 * A folder to pass to InDesign: a path string, or an ExtendScript {@link Folder}.
 *
 * Reading a folder-valued property back always gives a {@link Folder}.
 */
export type FolderPath = string | Folder;

/** A filesystem object handed back by the DOM: an ExtendScript {@link File} or {@link Folder}. */
export type Entry = File | Folder;

/** An ExtendScript file object (the global \`File\` class). */
export type File = globalThis.File;

/** An ExtendScript folder object (the global \`Folder\` class). */
export type Folder = globalThis.Folder;

`,
    ),

    // Enumerators: no equals(); `===` works between enumerators and against their numeric value
    // (probes: "enum === enum", "get enum === enum", "enum valueOf").
    replaceAll(
        'enum: drop equals()',
        /  \/\*\* True when `other` is this same enumerator\. Enumerators are objects — `===` is always false\. \*\/\n  equals\(other: EnumComparand<[^>]+>\): boolean;\n\n/g,
        '',
        [430, 440],
        isEnumFile,
    ),
    replaceAll(
        'enum: drop EnumComparand import',
        'import type { EnumComparand, Enumeration, Enumerator, __val} from "../_base/Enums";',
        'import type { Enumeration, Enumerator, __val} from "../_base/Enums";',
        [430, 440],
        isEnumFile,
    ),
    replaceSpan(
        'Enums: ExtendScript Enumerator / Enumeration',
        '_base/Enums.d.ts',
        '/**\n * What an enumerator',
        '/**\n * Unique value of each enumeration.',
        `/**
 * The base of every InDesign enumeration value.
 *
 * In ExtendScript an enumerator is an \`Enumerator\` object whose \`valueOf()\` is its numeric
 * value, so \`===\` works both between enumerators (\`x === SaveOptions.NO\`) and against the number
 * (\`SaveOptions.NO === 1852776480\`). \`String(e)\` gives its name, such as \`"NO"\`.
 *
 * Properties typed as an enumeration also accept the bare number when set, but not the name
 * string: \`viewPreferences.horizontalMeasurementUnits = "POINTS"\` throws.
 */
export declare class Enumerator {
  /** The enumerator's name, such as \`"NO"\`. */
  toString(): string;
  /** The enumerator's numeric value. */
  valueOf(): number;
  /** Reflection on this object. */
  readonly reflect: Reflection;
}

/**
 * The base of every InDesign enumeration (the object holding the enumerators, such as
 * \`SaveOptions\`).
 */
export declare class Enumeration {
  /** Reflection on the enumeration: its enumerators are listed as properties. */
  static readonly reflect: Reflection;
}

`,
    ),

    // Consumers use \`module: none\` (classic resolution), which does not resolve a directory to its
    // index file.
    replaceAll('imports: ./Enums → ./Enums/index', /from '(\.\.?)\/Enums'/g, "from '$1/Enums/index'", [1, 5]),

    // ExtendScript has no constructorName; `instanceof` is the idiom, and TypeScript narrows on it.
    replaceAll('docs: x.constructorName === \'C\' → x instanceof C', /([\w.]+)\.constructorName === '(\w+)'/g, '$1 instanceof $2', [3, 10]),
    replaceAll('docs: case of a constructorName check', /case of a `constructorName` check/g, 'branch of an `instanceof` check', [5, 15]),
    replaceAll('docs: a constructorName check', /a `constructorName` check/g, 'an `instanceof` check', [1, 5]),
    replaceAll('docs: check constructorName', /([Cc])heck `constructorName`/g, (m, c) => `${c === 'C' ? 'U' : 'u'}se \`instanceof\``, [3, 8]),
    replaceAll('docs: `constructorName` to narrow', /`constructorName` to narrow/g, '`instanceof` to narrow', [1, 3]),
    replaceAll('docs: {@link constructorName} on the value', '{@link constructorName} on the value', '`instanceof` on the value', [1, 1]),
    replaceAll('docs: equals() test', /an `equals\(\)` test/g, 'a `===` test', [2, 6]),
    replaceAll('docs: await the second element', '`await` the second element to reach the {@link File}.', 'The second element is the {@link File}.', [1, 1]),
    replaceAll(
        'docs: path getters are not promises',
        ' — which arrives as a promise\n * you `await` — is *set* with a plain path string instead.',
        ' — is *set* with either a File/Folder or a plain\n * path string.',
        [1, 1],
    ),
    // Facts upstream measured in UXP only; keep them, flagged until an ExtendScript probe confirms.
    replaceAll('docs: UXP-measured facts', /live UXP runtime/g, 'live UXP runtime (not yet re-measured in ExtendScript)', [2, 5]),

    // ExtendScript accepts names as itemByRange() bounds (probe "itemByRange() takes names");
    // upstream measured UXP, which rejects them.
    replaceSpan(
        'itemByRange(): names accepted',
        '_base/Collections.d.ts',
        '   * * **Names are not accepted**, unlike {@link item}. A string bound throws, even though the\n   * dictionary lists one.\n',
        '   * * Like `everyItem()`',
        '   * * Names are accepted, as with {@link item}: `layers.itemByRange(\'Top\', \'Bottom\')`.\n',
    ),
    replaceAll(
        'itemByRange(): string bounds',
        'itemByRange(from: number | TLookup, to: number | TLookup): TRange;',
        'itemByRange(from: number | string | TLookup, to: number | string | TLookup): TRange;',
        [1, 1],
        (p) => p === '_base/Collections.d.ts',
    ),

    replaceAll(
        'docs: everyItem/itemByRange proxies are not UXP-specific',
        / Operations applied to this proxy are broadcast directly within the native C\+\+ engine/g,
        ' Operations applied to this proxy are broadcast directly within the native engine',
        [0, 10],
    ),
];

// ---------------------------------------------------------------------------------------------
// AST rules: run once over the whole project after the text rules.
// ---------------------------------------------------------------------------------------------

// Enumerators that exist only on another platform than the one measured (macOS): upstream's are
// kept, with their camelCase alias, rather than dropped for being absent from the dictionary.
const PLATFORM_ONLY = { ScriptLanguage: { VISUAL_BASIC: 'Windows' } };
const camelAlias = (e) => e.toLowerCase().replace(/_([a-z0-9])/g, (_, c) => c.toUpperCase());

const AST_RULES = [
    {
        // `constructorName` throws in ExtendScript ("Object does not support the property or method
        // 'constructorName'"); use `obj.constructor.name` instead.
        name: 'drop constructorName',
        expect: [660, 720],
        apply(project) {
            let n = 0;
            for (const sf of project.getSourceFiles()) {
                for (const decl of [...sf.getInterfaces(), ...sf.getClasses()]) {
                    for (const m of decl.getMembers()) {
                        if (Node.isPropertyNamed(m) && m.getName() === 'constructorName') {
                            m.remove();
                            n++;
                        }
                    }
                }
            }
            return n;
        },
    },
    {
        // DOM objects have no equals() in ExtendScript; `===` compares them (probe "dom ===").
        name: 'drop DOM equals()',
        expect: [1, 5],
        apply(project) {
            let n = 0;
            for (const sf of project.getSourceFiles()) {
                for (const decl of sf.getInterfaces()) {
                    for (const m of decl.getMethods()) {
                        if (m.getName() === 'equals') {
                            m.remove();
                            n++;
                        }
                    }
                }
            }
            return n;
        },
    },
    {
        // Upstream declares two aliases per enumerator (camelCase and all-lowercase); ExtendScript
        // answers to the camelCase one only. Keep exactly the measured aliases.
        name: 'enums: keep measured aliases only',
        expect: [1000, 3000],
        apply(project) {
            const measured = JSON.parse(readFileSync(join(root, SNAPSHOT, 'enum-aliases.json'), 'utf8'));
            const dictionary = JSON.parse(readFileSync(join(root, SNAPSHOT, 'dictionary.json'), 'utf8')).classes;
            let n = 0;
            for (const sf of project.getSourceFiles(join(project.__dir, 'Enums/*.d.ts'))) {
                for (const v of sf.getVariableDeclarations()) {
                    const name = v.getName();
                    const cls = dictionary[name];
                    if (!cls || cls.kind !== 'enum') continue;
                    const platform = PLATFORM_ONLY[name] ?? {};
                    const keep = new Set([...Object.keys(cls.enumValues), ...(measured[name] ?? []), ...Object.keys(platform).flatMap((e) => [e, camelAlias(e)])]);
                    const literal = v.getTypeNodeOrThrow().getDescendantsOfKind(SyntaxKind.TypeLiteral)[0];
                    for (const m of literal.getProperties()) {
                        if (!keep.has(m.getName())) {
                            m.remove();
                            n++;
                            continue;
                        }
                        const e = Object.keys(platform).find((k) => m.getName() === k || m.getName() === camelAlias(k));
                        const doc = e && m.getJsDocs()[0];
                        if (doc) doc.setDescription(`${doc.getDescription().trim()} (${platform[e]} only: not in the macOS dictionary these declarations are measured against, so not measured.)`);
                    }
                }
            }
            return n;
        },
    },
    {
        name: 'DOM objects: reflect, ExtendScript toString()',
        expect: [1, 1],
        apply(project) {
            const iface = project.getSourceFileOrThrow(join(project.__dir, '_base/DomObjects.d.ts')).getInterfaceOrThrow('InDesignDOMObject');
            iface.getPropertyOrThrow('isValid').replaceWithText(`/**
 * Indicates whether the underlying InDesign DOM object still exists and is valid.
 * Returns \`false\` if the object has been deleted, closed, or invalidated.
 */
readonly isValid: boolean;

/**
 * Reflection on this object: its class name and its properties and methods, as the scripting
 * dictionary describes them.
 */
readonly reflect: Reflection;
`);
            iface.getMethodOrThrow('toString').replaceWithText(`/**
   * \`"[object ClassName]"\`, such as \`"[object Page]"\`. Use {@link toSpecifier} for the object's path.
   */
  toString(): string;`);
            iface.getJsDocs()[0].replaceWithText(`/**
 * Every InDesign DOM object provides these members: whether it still exists
 * ({@link isValid}), its parent in the object hierarchy, bulk property
 * read/write via {@link properties}, and {@link reflect}.
 *
 * Two references to the same DOM object compare equal with \`===\`.
 */`);
            return 1;
        },
    },
    {
        name: 'collections: index signature, reflect, toString()',
        expect: [1, 1],
        apply(project) {
            const iface = project.getSourceFileOrThrow(join(project.__dir, '_base/Collections.d.ts')).getInterfaceOrThrow('BaseCollection');
            // Written at column 0: replaceWithText indents every line after the first (two spaces,
            // the project's manipulation setting).
            iface.getPropertyOrThrow('length').replaceWithText(`/**
 * The number of objects in the collection. Reading it throws once the collection's parent is gone
 * (probe "collection length throws once its parent is gone").
 */
readonly length: number;

/**
 * The object at the given position: \`doc.pages[0]\`. Out of range gives an invalid object, not
 * \`undefined\` (check \`isValid\`).
 */
readonly [index: number]: T;

/** Reflection on the collection. */
readonly reflect: Reflection;`);
            iface.getMethodOrThrow('toString').replaceWithText(`/** \`"[object CollectionName]"\`, such as \`"[object Pages]"\`. */
  toString(): string;`);
            return 1;
        },
    },
];

// ---------------------------------------------------------------------------------------------

function check(rule, count) {
    const [lo, hi] = rule.expect;
    const ok = count >= lo && count <= hi;
    console.log(`${ok ? '  ok ' : 'FAIL '} ${String(count).padStart(5)}  ${rule.name}`);
    return ok;
}

/** globals.d.ts and editions/*.d.ts of a tree. */
function writeGlobals(project, dir, hooks, editions) {
    const out = generateGlobals(project, dir, root, hooks, editions);
    writeFileSync(join(dir, 'globals.d.ts'), out.globals);
    mkdirSync(join(dir, 'editions'), { recursive: true });
    for (const [name, text] of Object.entries(out.editions)) writeFileSync(join(dir, 'editions', `${name}.d.ts`), text);
}

export function runCodemod({ from = 'upstream/main', out = join(root, 'types') } = {}) {
    const src = extractUpstream(from);
    let ok = true;

    // Text rules.
    // Upstream indents by two spaces; ts-morph's insertions follow this setting.
    const project = new Project({ skipAddingFilesFromTsConfig: true, compilerOptions: { noLib: true }, manipulationSettings: { indentationText: IndentationText.TwoSpaces } });
    project.__dir = src;
    const files = project.addSourceFilesAtPaths(join(src, '**/*.d.ts'));
    const counts = TEXT_RULES.map(() => 0);
    for (const sf of files) {
        const rel = relative(src, sf.getFilePath());
        let text = sf.getFullText();
        TEXT_RULES.forEach((rule, i) => {
            const [next, n] = rule.apply(rel, text);
            text = next;
            counts[i] += n;
        });
        if (text !== sf.getFullText()) sf.replaceWithText(text);
    }
    TEXT_RULES.forEach((rule, i) => (ok = check(rule, counts[i]) && ok));

    // Patches: one-off corrections, each backed by a probe (overlays/patches.json).
    const patches = JSON.parse(readFileSync(join(root, 'overlays', 'patches.json'), 'utf8')).patches;
    for (const p of patches) {
        const sf = project.getSourceFileOrThrow(join(src, p.file));
        const text = sf.getFullText();
        const n = text.split(p.find).length - 1;
        ok = check({ name: `patch ${p.file}: ${p.probe}`, expect: [1, 1] }, n) && ok;
        if (n === 1) sf.replaceWithText(text.replace(p.find, () => p.replace));
    }

    // AST rules.
    for (const rule of AST_RULES) ok = check(rule, rule.apply(project)) && ok;
    project.saveSync();

    if (!ok) throw new Error('codemod: a rule matched an unexpected number of times; see FAIL above');

    // Data-driven: declare what the dictionary has and upstream lacks.
    const filled = fillFromDictionary(project, src, root, SNAPSHOT);
    for (const [k, v] of Object.entries(filled)) console.log(`  ok  ${String(v.length).padStart(5)}  fill from dictionary: ${k}${v.length ? ` (${v.slice(0, 6).join(', ')}${v.length > 6 ? ', ...' : ''})` : ''}`);
    // InDesign Server's own classes and enumerations (its members come with the editions below).
    const serverFilled = fillFromDictionary(project, src, root, SERVER_SNAPSHOT, { wholeOnly: true, label: 'InDesign Server' });
    for (const [k, v] of Object.entries(serverFilled)) if (v.length) console.log(`  ok  ${String(v.length).padStart(5)}  fill from the Server dictionary: ${k} (${v.slice(0, 6).join(', ')}${v.length > 6 ? ', ...' : ''})`);
    project.saveSync();

    // Data-driven: widen getters by what InDesign returned at runtime.
    const widened = widenByRuntime(project, src, root, SNAPSHOT);
    console.log(`  ok  ${String(widened.count).padStart(5)}  widen reads by runtime observations`);
    // What InDesign Server returned, for the members both editions share; its own members are
    // widened as they are generated (tools/codemod/editions.mjs).
    if (existsSync(join(root, SERVER_SNAPSHOT, 'runtime.json'))) {
        project.saveSync();
        const serverWidened = widenByRuntime(project, src, root, SERVER_SNAPSHOT);
        console.log(`  ok  ${String(serverWidened.count).padStart(5)}  widen reads by InDesign Server's runtime observations`);
    }
    if (widened.unhandled.length) console.log(`       ${widened.unhandled.length} observations need an overlay:\n         ${widened.unhandled.join('\n         ')}`);
    project.saveSync();

    // Desktop, Server and portable editions of the members that differ.
    const editions = splitEditions(project, src, root, { desktop: SNAPSHOT, server: SERVER_SNAPSHOT });
    if (editions.conflicts.length) throw new Error(`codemod: editions: shared declarations the editions disagree on:\n  ${editions.conflicts.join('\n  ')}`);
    console.log(`  ok  ${String(editions.moved).padStart(5)}  editions: members moved to parts (${editions.generated} generated from the Server dictionary, ${editions.parts} interfaces with parts, ${editions.enumerators} enumerators)`);
    if (editions.unplaced.length) console.log(`       ${editions.unplaced.length} not placed:\n         ${editions.unplaced.join('\n         ')}`);
    project.saveSync();

    // Extension points for plugins' declarations (tools/plugin).
    const hooks = addPluginHooks(project, src, {
        ...JSON.parse(readFileSync(join(root, SERVER_SNAPSHOT, 'dictionary.json'), 'utf8')).classes,
        ...JSON.parse(readFileSync(join(root, SNAPSHOT, 'dictionary.json'), 'utf8')).classes,
    });
    console.log(`  ok  ${String(hooks.length).padStart(5)}  plugin hooks (InDesignPlugins.<Class>)`);
    project.saveSync();

    // module.d.ts declared the UXP `indesign` module's `app` export; ExtendScript has no modules.
    rmSync(join(src, 'module.d.ts'), { force: true });

    // Globals entry, generated from the measured globals list.
    writeGlobals(project, src, hooks, editions);

    if (existsSync(join(root, 'overlays', 'types'))) cpSync(join(root, 'overlays', 'types'), src, { recursive: true });

    // Swap the new tree in by renames: deleting in place races with editors watching the folder.
    const staging = `${out}.new`;
    const old = `${out}.old`;
    rmSync(staging, { recursive: true, force: true, maxRetries: 5, retryDelay: 200 });
    rmSync(old, { recursive: true, force: true, maxRetries: 5, retryDelay: 200 });
    cpSync(src, staging, { recursive: true });
    if (existsSync(out)) renameSync(out, old);
    renameSync(staging, out);
    rmSync(dirname(src), { recursive: true, force: true });
    try {
        rmSync(old, { recursive: true, force: true, maxRetries: 5, retryDelay: 200 });
    } catch (e) {
        console.log(`  (could not remove ${relative(root, old)}: ${e.code}; it is safe to delete)`);
    }
    console.log(`wrote ${relative(root, out)}/`);

    // The flat tree, with its own globals entry (its classes have no mode parameter).
    const flatOut = join(dirname(out), 'flat');
    writeFlat(out, flatOut);
    const flatProject = new Project({ skipAddingFilesFromTsConfig: true, compilerOptions: { noLib: true } });
    flatProject.addSourceFilesAtPaths(join(flatOut, '**/*.d.ts'));
    writeGlobals(flatProject, flatOut, hooks, editions);
    console.log(`wrote ${relative(root, flatOut)}/`);
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
    runCodemod({ from: arg('--from', 'upstream/main'), out: arg('--out', join(root, 'types')) });
}
