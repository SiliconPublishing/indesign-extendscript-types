// Unsetting style attributes, measurement strings, and parameter lists the dictionary disputes.
#include "_harness.jsxinc"

function main() {
    var doc = fixtureDocument();
    var base = doc.characterStyles.add({ name: 'Base' });
    var derived = doc.characterStyles.add({ name: 'Derived', basedOn: base, horizontalScale: 90 });
    var para = doc.paragraphStyles.add({ name: 'Para', spaceBefore: 6 });
    probe('a derived character style unsets with NothingEnum', function () {
        derived.horizontalScale = NothingEnum.NOTHING;
        return String(derived.horizontalScale);
    }, 'NOTHING');
    probe('a paragraph style unsets with NothingEnum', function () {
        para.spaceBefore = NothingEnum.NOTHING;
        return String(para.spaceBefore);
    }, function (a) { return !didThrow(a); });
    probe('find preferences unset with NothingEnum', function () {
        app.findTextPreferences.pointSize = 12;
        app.findTextPreferences.pointSize = NothingEnum.NOTHING;
        return String(app.findTextPreferences.pointSize);
    }, 'NOTHING');
    var tf = doc.pages[0].textFrames.add({ geometricBounds: [0, 0, 100, 100], contents: 'x' });
    var table = tf.insertionPoints[-1].tables.add({ bodyRowCount: 1, columnCount: 1 });
    probe('a cell measurement takes a unit string', function () {
        table.cells[0].minimumFirstBaselineOffset = '6pt';
        return table.cells[0].minimumFirstBaselineOffset;
    }, function (a) { return typeof a === 'number'; });
    probe('tables.add() first parameter is `to`, a LocationOptions', function () {
        var t = tf.insertionPoints[0].tables.add(LocationOptions.AT_BEGINNING, undefined, { columnCount: 2 });
        return t.columnCount;
    }, 2);
    probe('placeXML() without a placePoint', function () {
        var el = doc.xmlElements[0].xmlElements.add(doc.xmlTags.add('t'), 'text');
        return doc.pages[0].placeXML(el).constructor.name;
    }, didThrow);
    probe('paths.add() with layer/at', function () {
        var r = doc.pages[0].rectangles.add({ geometricBounds: [0, 0, 10, 10] });
        return r.paths.add(undefined, undefined, undefined, { entirePath: [[0, 0], [5, 5], [0, 5]] }).constructor.name;
    }, 'Path');
    probe('mixedInkGroups.add() with only inks', function () {
        doc.colors.add({ name: 'Spot', model: ColorModel.SPOT, space: ColorSpace.CMYK, colorValue: [0, 100, 0, 0] });
        return doc.mixedInkGroups.add([doc.inks.item(0), doc.inks.itemByName('Spot')]).constructor.name;
    }, 'MixedInkGroup');
    desktopProbe('useApplicationFrame is writable', function () {
        var v = app.generalPreferences.useApplicationFrame;
        app.generalPreferences.useApplicationFrame = v;
        return 'ok';
    }, 'ok');
    probe('a gradient stop takes a tint or a swatch', function () {
        var black = doc.swatches.itemByName('Black');
        var stop = doc.gradients.add({ name: 'Probe Gradient' }).gradientStops[0];
        stop.stopColor = doc.tints.add(black, { tintValue: 40 });
        var tint = stop.stopColor.constructor.name;
        stop.stopColor = black;
        return black.constructor.name + ' ' + tint + ' ' + stop.stopColor.constructor.name;
    }, 'Swatch Tint Color');
    probe('motionPathPoints reads an array', function () {
        var o = doc.pages[0].ovals.add({ geometricBounds: [0, 0, 10, 10] });
        return o.animationSettings.motionPathPoints instanceof Array;
    }, true);
    probe('Cell.contents of a text cell is a string', function () { return typeof table.cells[0].contents; }, 'string');
    return finish();
}
