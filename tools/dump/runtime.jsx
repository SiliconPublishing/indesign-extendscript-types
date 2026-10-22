// Runtime type sampler: builds the fixture document, walks every DOM object reachable from `app`
// and the fixture (a few instances per class), reads every property reflection lists, and records
// the type of each value read. tools/compare uses the result to check declared read types against
// what InDesign actually hands back. Driven by dump/runtime.mjs, which survives crashes.
//
// Argument: see parseSamplerArg in walk.jsxinc.
#include "../../test/fixtures/fixture.jsxinc"
#include "walk.jsxinc"

var onFixtureEvent = null;

function main(arg) {
    var s = parseSamplerArg(arg);
    var start = new Date().getTime();
    var samples = {};     // "Class.prop" -> { atom: count }
    var errors = {};      // "Class.prop" -> first error message
    var eventClasses = {};

    function record(key, atom) {
        var r = samples[key] || (samples[key] = {});
        r[atom] = (r[atom] || 0) + 1;
    }

    // Instance property names of a class from the dictionary, superclasses included (for objects
    // that must not be reflected on).
    function dictionaryProperties(cls) {
        var names = [];
        for (var c = cls; c; ) {
            var x = new XML(String($.dictionary.getClass(c).toXML()));
            var inst = x.elements.(@type == 'instance').property;
            for (var i = 0; i < inst.length(); i++) names.push({ name: String(inst[i].@name) });
            c = x.superclass.length() ? String(x.superclass[0]) : null;
        }
        return names;
    }

    function sampleObject(obj, cls, get) {
        var props, next = [];
        if (get) props = dictionaryProperties(cls);
        else try { props = obj.reflect.properties; } catch (e) { return next; }
        for (var i = 0; i < props.length; i++) {
            var name = String(props[i].name);
            if (name === '__proto__' || name === 'properties') continue;
            var key = cls + '.' + name;
            if (s.blocked[key]) { record(key, 'blocked'); continue; }
            s.progress(key);
            var v;
            try {
                v = get ? get()[name] : obj[name];
            } catch (e) {
                record(key, 'throws');
                if (!errors[key]) errors[key] = String(e.message);
                continue;
            }
            record(key, atomOf(v));
            next.push(v);
        }
        return next;
    }

    // Event objects exist only during dispatch: the fixture's listeners hand them over then.
    onFixtureEvent = function (e) {
        var cls = e.constructor.name;
        if (eventClasses[cls]) return;
        eventClasses[cls] = true;
        s.progress('<event ' + cls + '>');
        sampleObject(e, cls);
    };

    fixtureProgress = s.progress;
    fixtureSkip = s.blocked;
    var doc = buildFixture(s.dir);
    var closeProblems;
    try {
        var walked = walkDom([app, doc].concat(fixtureRoots), sampleObject, s.progress, s.blocked);
        for (var ec in eventClasses) walked.classes.push(ec);
    } finally {
        closeProblems = closeFixture(doc);
    }
    return {
        ms: new Date().getTime() - start,
        timedOut: walked.timedOut,
        fixtureErrors: fixtureErrors.concat(closeProblems),
        classesSampled: walked.classes,
        samples: samples,
        errors: errors,
    };
}
