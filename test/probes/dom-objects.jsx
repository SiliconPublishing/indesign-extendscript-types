// DOM objects and collections in ExtendScript.
#include "_harness.jsxinc"

function main() {
    var doc = fixtureDocument();
    var page = doc.pages[0];
    probe('no constructorName', function () { return page.constructorName; }, didThrow);
    probe('no equals()', function () { return typeof page.equals; }, 'undefined');
    probe('=== between two reads of the same object', function () { return doc.pages[0] === doc.pages.item(0); }, true);
    probe('toString() is [object Class]', function () { return page.toString(); }, '[object Page]');
    probe('toSpecifier()', function () { return page.toSpecifier().indexOf('/document[@id=') === 0; }, true);
    probe('toSource() wraps resolve()', function () { return page.toSource().indexOf('resolve(') === 0; }, true);
    probe('resolve() round-trips a specifier', function () { return resolve(page.toSpecifier()) === page; }, true);
    probe('constructor.name', function () { return page.constructor.name; }, 'Page');
    probe('reflect.name', function () { return page.reflect.name; }, 'Page');
    probe('instanceof the global class', function () { return page instanceof Page; }, true);
    probe('class global carries event names', function () { return Document.AFTER_OPEN; }, 'afterOpen');
    probe('collection classes become globals once used', function () {
        var before = typeof TextFrames;
        var c = doc.pages[0].textFrames;
        return before + '/' + typeof TextFrames + '/' + (c instanceof TextFrames);
    }, function (a) { return /\/function\/true$/.test(a); });
    probe('collection[index]', function () { return doc.pages[0].name; }, '1');
    probe('collection[out of range] is an object, not undefined', function () { return typeof doc.pages[99]; }, 'object');
    probe('item() of a missing index is invalid', function () { return doc.pages.item(99).isValid; }, false);
    probe('itemByName() of a missing name is invalid', function () { return doc.layers.itemByName('nope').isValid; }, false);
    probe('collection toString()', function () { return doc.pages.toString(); }, '[object Pages]');
    probe('collection reflect', function () { return doc.pages.reflect.name; }, 'Pages');
    probe('everyItem() reads arrays', function () { return doc.pages.everyItem().name instanceof Array; }, true);
    probe('collection length is a number, even where the dictionary says it can be NOTHING', function () {
        return [typeof doc.characterStyles.length, typeof doc.cellStyles.length, doc.pages[0].polygons.length].join('/');
    }, 'number/number/0');
    probe('collection length throws once its parent is gone', function () {
        var tf = page.textFrames.add({ geometricBounds: [0, 0, 10, 10], contents: 'x' });
        var texts = tf.parentStory.texts;
        tf.remove();
        return texts.length;
    }, function (a) { return didThrow(a); });
    probe('bounds always have four entries', function () {
        var r = page.rectangles.add({ geometricBounds: [0, 0, 10, 10] });
        var g = page.groups.add([page.ovals.add({ geometricBounds: [20, 0, 30, 10] }), page.ovals.add({ geometricBounds: [20, 20, 30, 30] })]);
        var d = doc.hyperlinkPageDestinations.add(page);
        var lengths = [r.geometricBounds.length, r.visibleBounds.length, g.geometricBounds.length, g.visibleBounds.length, d.viewBounds.length].join(',');
        r.geometricBounds = g.geometricBounds;
        return lengths + ' ' + r.geometricBounds.join(',');
    }, function (a) { return /^4,4,4,4,4 20,0,30,30$/.test(a); });
    probe('a text range reads one-element arrays (one Text), not single values', function () {
        var story = page.textFrames.add({ geometricBounds: [40, 0, 60, 30], contents: 'abcdefghij' }).parentStory;
        var range = story.characters.itemByRange(2, 5);
        var c = range.contents;
        var els = range.getElements();
        return [range.constructor.name, String(range), c instanceof Array, c.length, c[0], range.parentStory instanceof Array,
            els.length, els[0].constructor.name, typeof els[0].contents, els[0].characters.length].join('|');
    }, 'Character|[object Text]|true|1|cdef|true|1|Text|string|4');
    probe('a range of any text collection resolves to one Text', function () {
        var story = page.textFrames.add({ geometricBounds: [70, 0, 200, 200], contents: 'one two\rthree four' }).parentStory;
        var kinds = ['characters', 'words', 'lines', 'paragraphs', 'textStyleRanges', 'insertionPoints', 'texts', 'textColumns'];
        var out = [];
        for (var i = 0; i < kinds.length; i++) {
            var c = story[kinds[i]];
            var els = c.itemByRange(0, c.length > 1 ? 1 : 0).getElements();
            out.push(els.length + els[0].constructor.name);
        }
        return out.join(',');
    }, '1Text,1Text,1Text,1Text,1Text,1Text,1Text,1Text');
    probe('everyItem() constructor is the item class', function () { return doc.pages.everyItem().constructor.name; }, 'Page');
    probe('properties reads an object', function () { return typeof page.properties; }, 'object');
    probe('reflect is a read-only key on every object', function () { var o = {}; o.reflect = 1; }, didThrow);
    desktopProbe('ScriptUI owns the Window global', function () {
        var w = new Window('palette', 'probe');
        var r = w.reflect.name;
        w.close();
        return r;
    }, 'Window');
    desktopProbe('the Window global also carries DOM event names', function () { return Window.AFTER_ACTIVATE; }, 'afterActivate');
    return finish();
}
