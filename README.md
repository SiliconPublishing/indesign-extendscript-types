# indesign-extendscript-types

TypeScript declarations for **Adobe InDesign ExtendScript** (`.jsx`): the InDesign DOM as
ExtendScript sees it, and the ExtendScript engine's own library (`$`, `File`, `Folder`,
`BridgeTalk`, `XML`, `Socket`, `UnitValue`, `Reflection`, ScriptUI, ...). They give you completion,
hover documentation and type checking in VS Code or any TypeScript-aware editor, for `.ts` sources
you compile to ES3 or for `.jsx` files checked in place.

- **InDesign 2026 (21.6)**. Every class, property, method, parameter and enumerator in InDesign's
  own scripting dictionary is checked against the declarations on every test run. The package
  version follows InDesign: `21.6.x` is measured against InDesign 21.6, and the patch number is
  ours, for fixes to the declarations.
- **Measured, not guessed.** A live InDesign was asked what it returns, what it accepts and what it
  throws, and the declarations follow the answers (see [How it is measured](#how-it-is-measured)).
- **Converted from [indesign-uxp-types](https://github.com/vamitul/indesign-uxp-types)** by Vlad
  Vladila, the UXP edition of the same DOM. The conversion is a repeatable codemod, so upstream
  improvements flow in.

## Install and enable

```sh
npm install --save-dev indesign-extendscript-types
```

`tsconfig.json`: ExtendScript is ES3, so turn TypeScript's own library off and use this package's:

```jsonc
{
  "compilerOptions": {
    "noLib": true,
    "types": ["indesign-extendscript-types"],
    "target": "es5",
    "module": "none",
    "strict": true,
    // to check .jsx files in place:
    "allowJs": true,
    "checkJs": true
  }
}
```

Then, with no imports (everything is global, as in ExtendScript):

```ts
var doc = app.documents.add();
var frame = doc.pages[0].textFrames.add({ geometricBounds: [0, 0, 100, 100], contents: 'Hello' });
doc.exportFile(ExportFormat.PDF_TYPE, new File(Folder.desktop + '/hello.pdf'));
$.writeln(doc.fullName.fsName);
doc.close(SaveOptions.NO);
```

TypeScript can no longer emit ES3, so `.ts` sources need a compiler that can (Babel with an ES3
preset, for instance). Type-checking `.jsx` with `checkJs` needs nothing more.

## InDesign desktop, InDesign Server, or both

InDesign Server scripts the same DOM with a few hundred differences: no ScriptUI and no UI
(`app.selection`, `activeDocument`, windows, dialogs, menus), members of its own (`consoleout`,
`serverSettings`, HTTP links, ...), and, for about 90 methods, its own parameter list. On desktop
`app.open(from, showingWindow, openOption)`; on Server `app.open(from, openOption)`: arguments are
positional, so `app.open(f, OpenOptions.OPEN_COPY)` passes a `showingWindow` flag on desktop.

| entry | for |
|---|---|
| `indesign-extendscript-types` | InDesign desktop |
| `indesign-extendscript-types/server` | InDesign Server |
| `indesign-extendscript-types/portable` | scripts that must run on both |

`portable` declares only what both have, in the form both take: a method whose parameters differ
is cut after the ones both share (`app.open(from)`, `doc.exportFile(format, to)`), so anything
that would mean something else on the other edition is a type error. For a branch that only runs
on one of them, cast to that edition's class, available from every entry:

```ts
if (app.name.indexOf('Server') >= 0) (app as InDesignServer.Application).consoleout('done');
else (app as InDesignDesktop.Application).activeDocument.save();
```

On the desktop and Server entries, members the other edition lacks or takes differently say so in
their documentation. The editions are measured separately (`snapshots/indesign-<ver>/` and
`snapshots/indesign-server-<ver>/`); see `REPORT.md` in each for the versions.

## Two variants

The same API, declared twice:

| entry | tooltips | use it when |
|---|---|---|
| `indesign-extendscript-types` (default) | short: `Rectangle<Spread>.geometricBounds: number[]` | writing scripts |
| `indesign-extendscript-types/authored` | fully generic: `TransformableItem<"single">.geometricBounds` | extending the declarations |

Each edition has both (`.../server/authored`, `.../portable/authored`).

The default (`flat/`) is generated from the authored tree (`types/`). Pick one in `"types"`, never
both.

## What ExtendScript does differently from UXP

Each line is a probe in `test/probes/` that runs against InDesign.

- **Everything is global.** `app`, every enumeration and every DOM class are globals; there is no
  `require('indesign')`. A class global carries its event names and `reflect`
  (`Document.AFTER_OPEN`, `TextFrame.reflect`) and works with `instanceof`, which narrows:
  `if (item instanceof TextFrame) item.contents`. A collection class (`Pages`) becomes a global only
  once a collection of its kind has been obtained.
- **`===` works.** Two reads of the same object compare equal, and enumerators compare equal to each
  other and to their number (`SaveOptions.NO === 1852776480`). There is no `.equals()` and no
  `constructorName` (use `instanceof`, or `obj.constructor.name`).
- **Enumerators** are `Enumerator` objects: `String(e)` is the name, `e.valueOf()` the number. Setters
  take the enumerator or its bare number, never the name string. The camelCase aliases exist
  (`SaveOptions.no`, `NumberingStyle.upperRoman`); upstream's all-lowercase ones do not.
- **Files are `File` and `Folder` objects, returned directly**, not promises. `doc.fullName` is a
  `File`, `doc.filePath` a `Folder`, and file parameters take a `File`, a `Folder` or a path string.
  `itemByRange()` takes names too.
- **Unset style attributes read back as `NothingEnum.NOTHING`** (UXP gives `null`), and styles and
  find/change preferences accept it to unset; text objects do not. Many object-valued properties
  can also come back as a string (a swatch name such as `"Text Color"`, a missing font) or `null`
  (`parentPage` on the pasteboard), and say so.
- **`toString()` is `"[object Page]"`**; `toSpecifier()` gives the path, `resolve()` takes it back.
- **ScriptUI owns `Window`, `Button`, `Group`, `Panel`, `StaticText`, `Image`, `Event`:**
  `new Window('dialog')` is a ScriptUI window. InDesign's classes of those names are
  `InDesign.Window` and so on. Every DOM type is also reachable under the `InDesign` namespace.
- **`app.doScript(string)` runs in the caller's scope**, like `eval`: it sees the caller's locals,
  and `arguments` is the caller's, not `withArguments`. `doScript` of `ScriptLanguage.UXPSCRIPT`
  returns `undefined`.
- **Strict ES3.** No `forEach`, `map`, `JSON`, `Object.keys`, `bind`, `trim`, `Promise`: the engine has
  none of them, so the declarations do not either. It does have `Date.now()`, `toSource()`,
  `watch()`/`unwatch()`, and `reflect` on every object.
- **Some reads and writes crash InDesign 21.6.** Reading `distance`/`angle` of a
  `FindChangeDropShadowSetting` or `xOffset`/`yOffset` of a `FindChangeInnerShadowSetting`;
  assigning to `XMLElement.contents`; assigning a page name to a layout window's `activePage`;
  and taking items from an `Events` collection, all take InDesign down. The declarations say so.
- **Some references die when inspected.** On a just-added `StyleExportTagMap`, reading
  `constructor` or `reflect` invalidates the reference (`isValid` turns false, the next read
  throws); ordinary properties are safe. `typeof` itself throws on an invalidated reference.
- **Background exports wait for the script to end.** A task from `asynchronousExportFile` stays
  RUNNING until the script yields, its document cannot be closed before (`"User canceled this
  action"`), and reading `isValid` on it garbles the reference (`status` reads undefined after).
- **With `userInteractionLevel = NEVER_INTERACT`**, anything that would ask the user fails with
  `"User canceled this action"` instead.
- **XMP** (`XMPMeta`, `XMPConst`, `XMPFile`, `XMPUtils`, `XMPDateTime`) exists once
  `new ExternalObject('lib:AdobeXMPScript')` has run, so those globals are typed `| undefined`
  until checked. Setters return `null`, a missing property reads `null`, iteration ends with
  `null`, `XMPMeta.deleteNamespace` is unimplemented, and `RegExp.$_`/`RegExp.input` are always
  empty.

In a `.jsx` file, TypeScript does not type the parameter of a function assigned to a property
(`bt.onResult = function (reply) {}`); add `/** @param {BridgeTalk} reply */` or write `.ts`.

## Declarations for plugins

A C++ plugin can add classes, enumerations and members to InDesign's scripting API. `npm run
plugin` declares them as an add-on package that sits beside this one:

```sh
# with the plugin installed, and InDesign running:
npm run plugin -- --name acme-plugin-extendscript-types --setup acme-setup.jsx
```

It dumps InDesign's scripting dictionary with the plugin loaded and diffs it against the plugin-free
snapshot. It then samples the plugin's members at runtime, the same way as for InDesign's own:
what reads return and what writes accept, with crash-prone members recorded, skipped and
documented. Finally it writes `plugins/<name>/` (`index.d.ts`, `package.json`, `REPORT.md`),
typechecks the result with both trees, and compares it against the plugin's dictionary.

- **Members added to InDesign's classes** are declared through extension points: every DOM class
  extends an empty `InDesignPlugins.<Class>` interface, so the add-on merges into it
  (`app.myPluginThing` simply type-checks). The plugin's own classes and enumerations become
  globals, like InDesign's.
- **`--setup file.jsx`** defines `pluginFixture(doc, root, dir)`, which creates the plugin's
  objects so they can be sampled; pass each one to `root(obj)`.
- **`--raw <dir>`** works offline from an existing dictionary dump (`tools/dump/dictionary.jsx`
  output), without runtime samples.
- **Consumers** list both packages: `"types": ["indesign-extendscript-types", "acme-plugin-extendscript-types"]`.
- **Enumerators a plugin adds to InDesign's own enumerations** cannot be declared by augmentation;
  the add-on lists them with their values.

The main `npm run dump` refuses to update a snapshot while third-party plugins are installed, or
when the dictionary has grown for the same InDesign version (`--allow-plugins` and
`--accept-new-surface` override), so a plugin cannot leak into this package's declarations.

## How it is measured

Everything runs in InDesign's pristine `main` ExtendScript engine, through AppleScript
(`tools/run-extendscript.mjs`), on macOS:

| snapshot (`snapshots/indesign-21.6/`) | what | from |
|---|---|---|
| `dictionary.json` | every class, property, method, parameter and enumerator | `$.dictionary` |
| `globals.json` | which classes exist as globals, and their statics | `$.global` |
| `enum-aliases.json` | which enumerator aliases exist | probing each candidate |
| `corejs.json` | the ES3 library: reflection on every core class, feature tests of ES5+ members | reflection |
| `runtime.json` | the type of every property read, on a fixture document (417 of 424 object classes reached; see REPORT.md) | `tools/dump/runtime.jsx` |
| `writes.json` | which kinds of value every writable property accepts | `tools/dump/writes.jsx` |
| `runtime-crashers.json` | reads and writes that crash InDesign | the samplers, which survive crashes |

InDesign Server is measured the same way into `snapshots/indesign-server-21.6/` (pass
`--app "Adobe InDesign Server 2026"` to the dumps and samplers; the fixture and probes skip what
needs a UI). Server goes down when the samplers reach a few classes late in the fixture (books,
library assets, composite fonts, ...), so those are sampled on desktop only; its `REPORT.md` lists
them.

`tools/compare/` reads both declaration trees with the TypeScript compiler and diffs them against
the snapshots. `npm test` fails on any difference that is not informational or explained, with a
reason and usually a probe, in `tools/compare/allowlist.json`.
[`REPORT.md`](snapshots/indesign-21.6/REPORT.md) summarises coverage and findings.

## Maintaining

```sh
npm run build          # upstream types/ → codemod → types/ and flat/
npm test               # typecheck both trees, verify the flattener, compare with the snapshots
npm run test:live      # also re-measure InDesign and run the probes (macOS, InDesign 2026 running)
npm run dump           # re-measure dictionary, globals, enum aliases, core JS
npm run dump:runtime   # re-run the read sampler (may crash InDesign; crashes are recorded and skipped)
npm run dump:writes    # re-run the write sampler (same)
npm run report         # regenerate REPORT.md
npm run plugin -- --name <package> [--setup file.jsx]   # declarations for a plugin (above)
```

- **A new upstream release:** `git fetch upstream && npm run build && npm test`. The codemod
  (`tools/codemod/`) starts from a pristine `git archive` of `upstream/main`. Each rule reports how
  often it applied and stops the build when an upstream change moves its anchor.
- **A new InDesign version:** set `version` in `package.json` to the new release (`22.0.0` for
  InDesign 22.0); every tool then defaults to `snapshots/indesign-22.0/`. Run `npm run dump` and the
  samplers into it, then `npm test`. Members the dictionary has and upstream lacks are generated
  (`tools/codemod/fill.mjs`). Getters and
  setters are widened by what the runtime samples observed (`tools/codemod/widen.mjs`), and the
  rest shows up as findings.
- **One-off corrections** go in `overlays/patches.json`, each naming the probe that justifies it.

The pieces: `tools/dump/` (measurement), `tools/codemod/` (conversion), `tools/flatten/` (the flat
tree; `npm run verify:flatten` checks it reproduces upstream's own flat tree from upstream's
authored one), `tools/compare/` (comparison), `test/probes/` (behaviour), `test/typecheck/`
(fixtures that must and must not compile), `lib/` (the ES3 library, maintained by hand).

## Licence

[MIT](LICENSE). Based on indesign-uxp-types by Vlad Vladila (Krommatine Systems). Adobe and InDesign
are trademarks of Adobe Inc. This package is not affiliated with or endorsed by Adobe.
