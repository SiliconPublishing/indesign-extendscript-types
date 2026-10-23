# Changelog

## 21.6.2

- `itemByRange` on text: corrected documentation. `getElements()` resolves a text range to a single
  `Text` (its `contents` a plain string), not to the individual characters; those are its
  `characters`. Measured for all eight text collections on InDesign and InDesign Server 21.6, and
  already typed that way (`Text[]`).

## 21.6.1

Fixes from migrating a 60k-line ExtendScript codebase, each measured on InDesign 21.6 and
InDesign Server 21.6 (probes in `test/probes/`):

- **Collection `length` is `number`** again. 21.6.0 declared `number | NothingEnum.NOTHING` for
  every collection, because the dictionary says `CellStyles`/`CharacterStyles.length` "Can return"
  NothingEnum; a count never reads back NOTHING (and throws once its parent is gone).
- **Bounds read as `InDesign.Bounds`** (four numbers) instead of `number[]`: `geometricBounds`,
  `visibleBounds`, hyperlink destinations' `viewBounds`. One item's bounds can be assigned to
  another's.
- **`GradientStop.stopColor`** takes a `Tint` or a `Swatch`, and reads back a `Tint`.
- **`ScriptLanguage.VISUAL_BASIC`** (and `visualBasic`) is back: Windows only, so absent from the
  macOS dictionary the declarations are measured against.
- Documented: text ranges (`itemByRange` on text) read one-element arrays; edition casts reach one
  object only; `$.global` for desktop-only globals; a migration section in the README.
- Generated declarations are indented like upstream's (two spaces).

## 21.6.0 (indesign-extendscript-types)

First ExtendScript edition, converted from indesign-uxp-types 1.0.0 and measured against
InDesign 2026 (21.6.0.57).

- **Editions:** `indesign-extendscript-types/server` (InDesign Server) and
  `indesign-extendscript-types/portable` (what desktop and Server share, in the form both take),
  beside the desktop default. Members are split by measured dictionaries
  (`tools/editions/`, `tools/codemod/editions.mjs`); `InDesignDesktop.X` / `InDesignServer.X` give
  one edition's class from any entry.
- The package version follows InDesign: 21.6.x is measured against InDesign 21.6.
- **Globals instead of the `indesign` module:** `app`, every enumeration and DOM class, with event
  names, `reflect` and `instanceof` narrowing. Every DOM type is also under `InDesign.`.
- **ES3 core library** (`lib/`): `$` (with `$.dictionary`, `$.list`, `$.summary`), `File`, `Folder`,
  a fully typed `BridgeTalk`, `XML`/`XMLList`, `Socket`, `UnitValue`, `Reflection`, ScriptUI, the
  Error classes including `IOError`, `exit()`/`beep()`. Nothing the engine lacks.
- **ExtendScript semantics:** `File`/`Folder` instead of promises of UXP entries; no
  `constructorName` or `.equals()`; enumerator aliases cut to the camelCase ones that exist; names
  accepted by `itemByRange()`.
- **Measured types:** about 540 declarations widened by what InDesign returned or accepted
  (unset style attributes as `NothingEnum.NOTHING`, swatch names, `null`s, unit strings);
  14 members and 2 enumerators the 21.6 dictionary has and upstream lacked;
  six crash-prone members documented.
- **Tooling:** dumps, runtime samplers, codemod, flattener (verified against upstream's own flat
  tree), comparer, probes and `npm test`.
- **Runtime coverage:** 417 of 424 object classes read at runtime (the other 7 cannot be made by
  script), 16,129 properties read, 8,249 writable properties tried, 111 probes; nine crash-prone
  reads/writes documented.
- **XMP library** fully declared from measurement (`XMPMeta`, `XMPFile`, `XMPUtils`, `XMPDateTime`,
  `XMPIterator`, `XMPProperty`, `XMPConst`'s 161 constants), replacing a stub.
- **Plugins:** `npm run plugin` declares a plugin's scripting API as an add-on package; every
  DOM class has an `InDesignPlugins.<Class>` extension point. `npm run dump` refuses to snapshot
  with third-party plugins installed.
- **Corrections from probes:** `MasterSpread.primaryTextFrame` takes no `NothingEnum`;
  `PrintEvent.documentPrintUiOption` is an array; `TimingTarget.parent` can be a `Spread`;
  text objects' attribute setters take no `NothingEnum` (styles' do).


## 1.0.0

First public release.

### Installing and enabling

- **The package now declares the `indesign` module itself.** Add `"types": ["indesign-uxp-types"]`
  to tsconfig.json; no `paths` mapping is needed any more.
- **The flattened tree is the default** — short tooltips, same API. The authored, fully generic
  tree is `indesign-uxp-types/authored`.
- **Adobe's UXP types are a peer dependency** and are loaded by the package. Without them every
  `File` and `Folder` silently became `any`.

### Precision

- **`.parent` is exact in the flattened tree**: `spread.rectangles.item(0).parent` is `Spread`, as in
  the authored tree. The beta widened it to the general parent union.

### Files and folders

- **File parameters and setters accept a UXP `File` entry** as well as a path string —
  `app.open(file)`, `app.open([a, b])`, `frame.exportFile(format, file)`, `frame.place(file)`,
  `doc.save(file)`, `printPreferences.printFile = file`, and every other file slot.
- **Folder parameters take a path string only** — `packageUCF`, `unpackageUCF`, `packageForPrint`,
  `generateIDMLSchema`, `exportFolioToDirectory`, `generalPreferences.temporaryFolder`. InDesign
  rejects a `Folder` entry there.
- **Four getters are promises**, as every other file-valued getter is: `XMLExportPreference` and
  `XMLImportPreference.transformFilename`, `XMLExportPreference.preferredBrowser`, and
  `EventListener.handler` when it is a script file. They were typed as strings.

### InDesign 21.5

- Modelled on the 21.5 object-model dictionary, which also covers 21.6.
- `Document.updateTOC(using?)` takes an optional `TOCStyle` and returns nothing.
- `ObjectExportOption.altTextGenerationError` is writable.

## 1.0.0-beta.1

First beta, InDesign 21.3 dictionary, distributed to testers.
