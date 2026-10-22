/**
 * indesign-extendscript-types — TypeScript declarations for Adobe InDesign ExtendScript (.jsx).
 *
 * Declares the ExtendScript global scope: the ES3 core library (lib/: $, File, Folder, BridgeTalk,
 * XML, Socket, UnitValue, Reflection, ScriptUI, ...) and InDesign's DOM (`app`, every class and
 * enumeration), from the flattened tree: the same API as the authored one, with readable tooltips.
 *
 * In tsconfig.json — no other lib, since ExtendScript is ES3:
 *
 *     "noLib": true,
 *     "types": ["indesign-extendscript-types"]
 *
 * This is InDesign desktop. For InDesign Server use `indesign-extendscript-types/server`; for
 * scripts that must run on both, `indesign-extendscript-types/portable` (only what both have, in
 * the form both take). For the authored, fully generic tree add `/authored`
 * (`indesign-extendscript-types/authored`, `.../server/authored`, ...). Use exactly one.
 */
/// <reference path="./lib/global.d.ts" />
/// <reference path="./lib/ScriptUI.d.ts" />
/// <reference path="./flat/editions/desktop.d.ts" />
