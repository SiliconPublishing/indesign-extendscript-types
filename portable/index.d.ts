/**
 * indesign-extendscript-types/portable — for scripts that run on InDesign desktop and InDesign Server.
 *
 * Only what both have, in the form both take: a method whose parameters differ between them is
 * declared up to the last parameter both share (app.open(from)). For a branch that runs on one
 * of them, cast to InDesignDesktop.X or InDesignServer.X. No ScriptUI (Server has none).
 *
 *     "noLib": true,
 *     "types": ["indesign-extendscript-types/portable"]
 */
/// <reference path="../lib/global.d.ts" />
/// <reference path="../flat/editions/portable.d.ts" />
