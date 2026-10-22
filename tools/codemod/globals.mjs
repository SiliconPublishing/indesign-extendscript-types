// Generates types/globals.d.ts: the ExtendScript global scope for the converted DOM.
//
// What is global is measured, not assumed (snapshots/<ver>/globals.json, from dump/globals.jsx):
//   - every enumeration and every non-collection DOM class is a global constructor carrying its
//     static event-name constants (Document.AFTER_OPEN) and `reflect`;
//   - a collection class becomes a global only once a collection of its kind has been obtained
//     (probe "collection classes become globals once used"); it is declared, with that caveat,
//     because `instanceof` is only ever applied to a collection already in hand;
//   - a few names are ScriptUI classes that InDesign merges its DOM statics into (`Window`,
//     `Button`, `Group`, ...): `new Window('dialog')` builds a ScriptUI window. Those globals keep
//     ScriptUI's type (lib/ScriptUI.d.ts) and get the DOM statics merged in; the DOM classes stay
//     reachable as `InDesign.Window` and so on.
// Every DOM type, generic helpers included, is also available under the `InDesign` namespace.
//
// Editions (tools/codemod/editions.mjs): globals.d.ts holds what InDesign desktop and InDesign
// Server share; editions/{desktop,server,portable}.d.ts each reference it and add the edition's
// hooks (InDesignEdition.X extends XDesktop, XServer or XPortable), its own classes and
// enumerations, and its enumerators. The ScriptUI hybrids are desktop's: on Server, which has no
// ScriptUI, the same names are plain DOM classes, and a portable script gets only their statics.
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { Node } from 'ts-morph';
import { hookDeclarations } from './plugin-hooks.mjs';
import { SERVER_SNAPSHOT, SNAPSHOT } from '../snapshot.mjs';
import { EDITIONS } from './editions.mjs';


const readJson = (root, snapshot, file) => JSON.parse(readFileSync(join(root, snapshot, file), 'utf8'));

/** Names that are ScriptUI classes with InDesign's statics merged in, per globals.json. */
const hybridsOf = (globals) =>
    new Set(
        Object.entries(globals)
            .filter(([, g]) => g.global && /^\[object (?!Enumeration\])/.test(g.source || ''))
            .map(([name]) => name),
    );

/**
 * @returns {{ globals: string, editions: { desktop: string, server: string, portable: string } }}
 * editions: what tools/codemod/editions.mjs returned (hooks, enumHooks, model, versions).
 */
export function generateGlobals(project, typesDir, root, hooks = [], editions) {
    const desktop = readJson(root, SNAPSHOT, 'dictionary.json').classes;
    const server = readJson(root, SERVER_SNAPSHOT, 'dictionary.json').classes;
    const desktopGlobals = readJson(root, SNAPSHOT, 'globals.json');
    const serverGlobals = readJson(root, SERVER_SNAPSHOT, 'globals.json');
    const barrel = project.getSourceFileOrThrow(join(typesDir, 'indesign.d.ts'));
    const exported = barrel.getExportedDeclarations();
    const exportedNames = new Set(exported.keys());
    const desktopHybrids = hybridsOf(desktopGlobals);
    const serverHybrids = hybridsOf(serverGlobals);
    const { model, enumHooks, versions } = editions;

    /** Rewrites identifiers in a type-parameter constraint/default so they resolve through DOM. */
    const qualify = (text) => text.replace(/\b[A-Z]\w*\b/g, (id) => (exportedNames.has(id) ? `DOM.${id}` : id));

    const typeParams = (decl, { defaults = true } = {}) => {
        const tps = decl.getTypeParameters?.() ?? [];
        if (!tps.length) return { decl: '', use: '' };
        return {
            decl: `<${tps
                .map((tp) => {
                    let s = tp.getName();
                    if (tp.getConstraint()) s += ` extends ${qualify(tp.getConstraint().getText())}`;
                    if (defaults && tp.getDefault()) s += ` = ${qualify(tp.getDefault().getText())}`;
                    return s;
                })
                .join(', ')}>`,
            use: `<${tps.map((tp) => tp.getName()).join(', ')}>`,
        };
    };

    const statics = (cls) =>
        (cls.statics || [])
            .map((s) => `    /** ${s.desc.replace(/\*\//g, '*\\/')} */\n    readonly ${s.name}: ${JSON.stringify(s.value)};`)
            .join('\n');
    const ifaceOf = (name) => exported.get(name)?.find((d) => Node.isInterfaceDeclaration(d) || Node.isTypeAliasDeclaration(d));

    /** The global declarations of one class or enumeration, as one edition measured it. */
    function classLines(name, cls, globals, hybrids) {
        if (cls.kind === 'enum') return [`  export import ${name} = Enums.${name};`];
        if (hybrids.has(name)) {
            // ScriptUI owns the type and the constructor; add the DOM statics to it.
            const s = statics(cls);
            return s ? [`  namespace ${name} {\n${s.replace(/readonly /g, 'const ')}\n  }`] : [];
        }
        const g = globals[name];
        const tp = typeParams(ifaceOf(name));
        const lines = [`  type ${name}${tp.decl} = DOM.${name}${tp.use};`];
        if (g && g.global) {
            const s = statics(cls);
            lines.push(`  /** The ${name} class: \`instanceof ${name}\`, \`${name}.reflect\`${s ? ' and its event names' : ''}. */`);
            lines.push(`  var ${name}: DOMClass<DOM.${name}>${s ? ` & {\n${s}\n  }` : ''};`);
        } else if (cls.methods.some((m) => m.name === 'everyItem')) {
            lines.push(`  /**\n   * The ${name} collection class, for \`instanceof ${name}\`. Registered lazily: the global exists only\n   * once a collection of this kind has been obtained, so test \`typeof ${name}\` before using it otherwise.\n   */`);
            lines.push(`  var ${name}: DOMClass<DOM.${name}>;`);
        }
        return lines;
    }

    // Names whose global differs by edition: own classes, and the desktop's ScriptUI hybrids.
    const perEdition = (name) => model.classes.get(name) !== 'common' || desktopHybrids.has(name) || serverHybrids.has(name);
    const common = [];
    const enums = [];
    const skipped = [];
    for (const name of [...model.classes.keys()].sort()) {
        if (!exported.get(name)) {
            skipped.push(name);
            continue;
        }
        if (perEdition(name)) continue;
        (desktop[name].kind === 'enum' ? enums : common).push(...classLines(name, desktop[name], desktopGlobals, desktopHybrids));
    }

    // Escape hatches: every class as one edition has it, whichever edition the entry point is.
    const hatch = (ed) =>
        [...model.classes]
            .filter(([n, st]) => (st === 'common' || st === ed.toLowerCase()) && (desktop[n] ?? server[n]).kind !== 'enum' && exported.get(n))
            .map(([n]) => {
                const tp = typeParams(ifaceOf(n));
                return `    type ${n}${tp.decl} = DOM.${n}${tp.use}${exportedNames.has(`${n}${ed}`) ? ` & DOM.${n}${ed}${tp.use}` : ''};`;
            })
            .join('\n');

    // Hooked interfaces in this tree: X (and XPlural in the flat tree).
    const hooked = [];
    for (const sf of project.getSourceFiles()) {
        for (const iface of sf.getInterfaces()) {
            const h = iface.getExtends().find((e) => e.getExpression().getText().startsWith('InDesignEdition.'));
            if (h) hooked.push({ iface, hook: h.getExpression().getText().slice('InDesignEdition.'.length) });
        }
    }
    hooked.sort((a, b) => a.hook.localeCompare(b.hook));

    const editionFile = (ed) => {
        const key = ed.toLowerCase();
        const hookLines = hooked.map(({ iface, hook }) => {
            const tp = typeParams(iface, { defaults: false });
            // In the flat tree XPlural's part is XDesktopPlural (the flattened XDesktop).
            const plural = hook.endsWith('Plural') && exportedNames.has(`${hook.slice(0, -6)}${ed}Plural`);
            const part = plural ? `${hook.slice(0, -6)}${ed}Plural` : `${hook}${ed}`;
            return `    interface ${hook}${tp.decl}${exportedNames.has(part) ? ` extends DOM.${part}${tp.use}` : ''} {}`;
        });
        const enumLines = enumHooks.map((e) => `    interface ${e.name} {${(e[ed] ?? []).map(([k, n]) => `\n      readonly ${k}: Enums.${e.name}.${n};`).join('')}${(e[ed] ?? []).length ? '\n    ' : ''}}`);
        const own = [];
        for (const name of [...model.classes.keys()].sort()) {
            if (!exported.get(name) || !perEdition(name)) continue;
            const st = model.classes.get(name);
            if (key === 'desktop' && st !== 'server') own.push(...classLines(name, desktop[name], desktopGlobals, desktopHybrids));
            if (key === 'server' && st !== 'desktop') own.push(...classLines(name, server[name], serverGlobals, serverHybrids));
            if (key === 'portable' && st === 'common') {
                // A ScriptUI class on desktop, a DOM class on Server: only the statics both have.
                const shared = { ...desktop[name], statics: (desktop[name].statics ?? []).filter((s) => (server[name].statics ?? []).some((t) => t.name === s.name)) };
                own.push(...classLines(name, shared, desktopGlobals, new Set([name])));
            }
        }
        const what = { desktop: `InDesign desktop ${versions.desktop}`, server: `InDesign Server ${versions.server}`, portable: `scripts that run on both InDesign desktop ${versions.desktop} and InDesign Server ${versions.server}` }[key];
        return `/**
 * ${key}.d.ts — generated by tools/codemod/globals.mjs; do not edit.
 * The DOM for ${what}: the shared globals (../globals.d.ts), plus this edition's members
 * (InDesignEdition), classes and enumerators.
 */
/// <reference path="../globals.d.ts" />
import * as DOM from '../indesign';
import * as Enums from '../Enums/index';

declare global {
  /** This edition's members, enumerators and classes (tools/codemod/editions.mjs). */
  namespace InDesignEdition {
${[...hookLines, ...enumLines].join('\n')}
  }

${own.join('\n')}
}

export {};
`;
    };

    const globals = `/**
 * globals.d.ts — generated by tools/codemod/globals.mjs; do not edit.
 * The ExtendScript global scope InDesign desktop and InDesign Server share: \`app\`, the
 * enumerations, DOM classes and collections both have. An entry point adds one edition
 * (editions/desktop.d.ts, server.d.ts or portable.d.ts).
 * Every DOM type is also available as \`InDesign.<Name>\`, including the ones whose global name
 * belongs to ScriptUI (\`InDesign.Window\`, \`InDesign.Button\`, ...).
 */
import type { Application } from './Application';
import * as DOM from './indesign';
import * as Enums from './Enums/index';

declare global {
  /** The InDesign DOM by name, generic helpers included. */
  export import InDesign = DOM;

  /** The running InDesign application. */
  const app: Application;

  /**
   * Resolves an object specifier (from \`toSpecifier()\`) back to its DOM object.
   * @param specifier Such as \`/document[@id=1]//rectangle[@id=239]\`.
   */
  function resolve(specifier: string): any;

  /** A DOM class as a global value: usable with \`instanceof\` and \`reflect\`, but not \`new\`. */
  interface DOMClass<T> extends Function {
    /**
     * Not callable (\`this: never\`). TypeScript narrows with \`instanceof\` only through a value
     * with a call or construct signature, or a \`bind\` method, which ES3's Function lacks.
     * It returns void, not never: a never-returning call would make TypeScript treat the code
     * after it as unreachable.
     */
    (this: never, ...args: never[]): void;
    readonly prototype: T;
    readonly reflect: Reflection;
  }

  /**
   * Extension points for plugins: every DOM class extends its (empty) namesake here, so a
   * plugin's declarations can add members to InDesign's classes by declaration merging.
   * See tools/plugin.
   */
  namespace InDesignPlugins {
${hookDeclarations(hooks)}
  }

  /**
   * Every class as InDesign desktop ${versions.desktop} has it, whichever edition this program uses: for a
   * branch of a portable script that only runs on desktop,
   * \`(app as InDesignDesktop.Application).selection\`.
   */
  namespace InDesignDesktop {
${hatch('Desktop')}
  }

  /** Every class as InDesign Server ${versions.server} has it, whichever edition this program uses. */
  namespace InDesignServer {
${hatch('Server')}
  }

${enums.join('\n')}

${common.join('\n')}
}

export {};
${skipped.length ? `// Dictionary classes upstream does not declare: ${skipped.join(', ')}\n` : ''}`;

    return { globals, editions: Object.fromEntries(EDITIONS.map((ed) => [ed.toLowerCase(), editionFile(ed)])) };
}
