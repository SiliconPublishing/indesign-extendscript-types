// Method parameters where the dictionary and the declarations disagree.
#include "_harness.jsxinc"

function main() {
    var dir = Folder.temp.fsName + '/idx-probe-methods';
    new Folder(dir).create();
    var doc = fixtureDocument();
    doc.layers.add({ name: 'Second' });
    doc.layers.add({ name: 'Third' });
    var page = doc.pages[0];
    probe('itemByRange() takes names', function () { return doc.layers.itemByRange('Third', 'Second').getElements().length; }, 2);
    probe('itemByRange() takes indexes', function () { return doc.layers.itemByRange(0, 1).getElements().length; }, 2);
    probe('itemByRange() takes objects', function () { return doc.layers.itemByRange(doc.layers[0], doc.layers[2]).getElements().length; }, 3);
    var tf = page.textFrames.add({ geometricBounds: [0, 0, 100, 100], contents: 'one two three four' });
    probe('words.itemByRange() takes objects', function () { return tf.words.itemByRange(tf.words[0], tf.words[1]).contents; }, function (a) { return a instanceof Array && a[0] === 'one two'; });
    probe('createPlainTextQRCode() withProperties as an object', function () {
        var r = page.rectangles.add({ geometricBounds: [0, 0, 50, 50] });
        r.createPlainTextQRCode('hello', undefined, { name: 'qr' });
        return r.name;
    }, function (a) { return !didThrow(a); });
    probe('resolve() takes [x, y] with a coordinate space', function () {
        var r = page.rectangles.add({ geometricBounds: [0, 0, 50, 50] });
        return r.resolve(AnchorPoint.CENTER_ANCHOR, CoordinateSpaces.PASTEBOARD_COORDINATES)[0].length;
    }, 2);
    probe('resolve() takes [[x, y], CoordinateSpaces]', function () {
        var r = page.rectangles.add({ geometricBounds: [0, 0, 50, 50] });
        return r.resolve([[10, 10], CoordinateSpaces.PAGE_COORDINATES], CoordinateSpaces.PASTEBOARD_COORDINATES)[0].length;
    }, 2);
    probe('packageForPrint() to a Folder', function () {
        doc.save(new File(dir + '/pkg.indd'));
        var f = new Folder(dir + '/pkg-out');
        f.create();
        return doc.packageForPrint(f, false, false, false, false, false, false, false);
    }, true);
    probe('packageForPrint() to a path string', function () {
        return doc.packageForPrint(dir + '/pkg-out2', false, false, false, false, false, false, false);
    }, true);
    // The dictionary says text attributes accept NothingEnum; only styles and find/change preferences do.
    probe('NothingEnum on a text attribute', function () { tf.characters[0].kentenFontStyle = NothingEnum.NOTHING; return String(tf.characters[0].kentenFontStyle); }, didThrow);
    probe('Section.pageNumberStyle readback', function () { return String(doc.sections[0].pageNumberStyle); }, 'ARABIC');
    probe('Cell.contents readback', function () {
        var t = tf.insertionPoints[-1].tables.add({ bodyRowCount: 1, columnCount: 1 });
        return typeof t.cells[0].contents;
    }, 'string');
    // A string run by doScript() is evaluated in the caller's scope, like eval(): it sees the
    // caller's locals, and `arguments` is the caller's, not withArguments.
    probe('doScript() string sees the caller\'s locals', function () {
        var localValue = 5;
        return app.doScript('localValue', ScriptLanguage.JAVASCRIPT);
    }, 5);
    probe('doScript() string: `arguments` is the caller\'s, not withArguments', function () {
        return (function (one) {
            return app.doScript('arguments.length + ":" + arguments[0]', ScriptLanguage.JAVASCRIPT, [2, 3, 4]);
        })('a');
    }, '1:a');
    probe('doScript() function', function () { return app.doScript(function () { return 42; }); }, 42);
    probe('doScript() of UXP from ExtendScript returns undefined', function () { return app.doScript('return 7', ScriptLanguage.UXPSCRIPT); }, undefined);
    // Without a document window, app.selection is [] or throws "No document windows are open", depending on state.
    probe('app.selection with no document window', function () { return app.selection; }, function (a) { return a instanceof Array || didThrow(a); });
    return finish();
}
