/**
 * indesign-extendscript-types/server — the ExtendScript global scope of InDesign Server.
 *
 * InDesign Server's DOM: no ScriptUI, no UI (selection, windows, dialogs, menus), its own
 * members (consoleout, serverSettings, ...) and its own parameter lists (app.open(from,
 * openOption)). In tsconfig.json:
 *
 *     "noLib": true,
 *     "types": ["indesign-extendscript-types/server"]
 */
/// <reference path="../lib/global.d.ts" />
/// <reference path="../flat/editions/server.d.ts" />
