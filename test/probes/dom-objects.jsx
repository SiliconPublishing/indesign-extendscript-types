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
