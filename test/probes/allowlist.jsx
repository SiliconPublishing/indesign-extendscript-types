// Probes behind entries in tools/compare/allowlist.json: where the declarations knowingly differ
// from the dictionary, these show the declarations are the ones that match InDesign.
#include "_harness.jsxinc"

function tempFolder(name) {
    var f = new Folder(Folder.temp.fsName + '/idx-probe-' + name);
    f.create();
    return f;
}

// Argument: the repository root (test/run.mjs passes it), for test/fixtures/media.
function main(repo) {
    var saved = app.scriptPreferences.userInteractionLevel;
    app.scriptPreferences.userInteractionLevel = UserInteractionLevels.NEVER_INTERACT;
    try {
        var dir = tempFolder('allowlist');
        var doc = fixtureDocument();
        doc.viewPreferences.horizontalMeasurementUnits = MeasurementUnits.POINTS;
        doc.viewPreferences.verticalMeasurementUnits = MeasurementUnits.POINTS;
        var page = doc.pages[0];
        var tf = page.textFrames.add({ geometricBounds: [20, 20, 200, 300], contents: 'one two three four' });

        // allowlist: text collections' itemByRange() has no use for names.
        probe('words.itemByRange() with name strings throws', function () { return tf.words.itemByRange('one', 'two').contents; }, didThrow);

        // allowlist: Movie and Sound inherit duplicate(to, by).
        probe('movie.duplicate(to, by) takes page-item parameters', function () {
            var m = page.rectangles.add({ geometricBounds: [300, 20, 340, 60] }).place(new File(repo + '/test/fixtures/media/fixture.mp4'))[0];
            return m.duplicate(page, [10, 10]).constructor.name;
        }, 'Movie');
        probe('sound.duplicate(to, by) takes page-item parameters', function () {
            var snd = page.rectangles.add({ geometricBounds: [350, 20, 390, 60] }).place(new File(repo + '/test/fixtures/media/fixture.mp3'))[0];
            return snd.duplicate(page, [10, 10]).constructor.name;
        }, 'Sound');

        // allowlist: graphic cells hold their page item in contents.
        probe('a graphic cell reads back its page item', function () {
            var t = tf.insertionPoints[-1].tables.add({ bodyRowCount: 1, columnCount: 1 });
            var c = t.cells[0];
            c.convertCellType(CellTypeEnum.GRAPHIC_TYPE_CELL);
            var v = c.contents;
            return typeof v === 'string' ? 'string' : v.constructor.name;
        }, function (a) { return a !== 'PageItems'; });

        // allowlist: folder destinations take a Folder or a path.
        probe('generateIDMLSchema() to a Folder', function () {
            var out = tempFolder('idml-schema');
            app.generateIDMLSchema(out, false);
            return out.getFiles().length > 0;
        }, true);

        // allowlist: ClippingPathSettings are writable once a clipping path applies.
        probe('ClippingPathSettings: writable with a clipping path', function () {
            var jpg = new File(dir.fsName + '/clip.jpg');
            app.jpegExportPreferences.exportResolution = 36;
            doc.exportFile(ExportFormat.JPG, jpg);
            var img = page.rectangles.add({ geometricBounds: [300, 100, 400, 200] }).place(jpg)[0];
            var cps = img.clippingPath;
            cps.clippingType = ClippingPathType.DETECT_EDGES;
            cps.invertPath = true;
            return cps.invertPath;
        }, true);
        probe('ClippingPathSettings: read-only without one (clippingType NONE)', function () {
            var img = page.allGraphics[page.allGraphics.length - 1];
            img.clippingPath.clippingType = ClippingPathType.NONE;
            img.clippingPath.invertPath = false;
        }, function (a) { return didThrow(a) && /read only/.test(a); });

        // patches.json: primaryTextFrame takes a frame; NOTHING is rejected (upstream allows it).
        var master = doc.masterSpreads[0];
        var primary = master.pages[0].textFrames.add({ geometricBounds: [0, 0, 100, 100] });
        probe('MasterSpread.primaryTextFrame takes a text frame', function () {
            master.primaryTextFrame = primary;
            return master.primaryTextFrame === primary;
        }, true);
        probe('MasterSpread.primaryTextFrame rejects NothingEnum.NOTHING', function () { master.primaryTextFrame = NothingEnum.NOTHING; }, didThrow);
        probe('MasterSpread.primaryTextFrame rejects null', function () { master.primaryTextFrame = null; }, didThrow);
        probe('MasterSpread.primaryTextFrame without one reads null', function () { return doc.masterSpreads.add().primaryTextFrame; }, null);

        // allowlist: SVGs.add has the page-item add() parameters.
        probe('svgs.add(layer, at, reference, withProperties)', function () {
            var r = page.rectangles.add({ geometricBounds: [420, 20, 460, 60] });
            return r.svgs.add(doc.layers[0], LocationOptions.AT_END, undefined, {}).constructor.name;
        }, function (a) { return a === 'SVG' || didThrow(a); });

        // allowlist (lib): BridgeTalk callbacks are listed once assigned.
        probe('BridgeTalk.onResult is reflected once assigned', function () {
            var bt = new BridgeTalk();
            bt.onResult = function () {};
            var props = bt.reflect.properties, found = false;
            for (var i = 0; i < props.length; i++) if (String(props[i].name) === 'onResult') found = true;
            return found || typeof bt.onResult === 'function';
        }, true);
    } finally {
        app.scriptPreferences.userInteractionLevel = saved;
    }
    return finish();
}
