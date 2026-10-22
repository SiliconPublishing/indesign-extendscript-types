// Write sampler: for every writable property of objects inside the fixture document, tries the
// kinds of value the dictionary says a setter accepts, and records which InDesign takes:
//   roundtrip     the value just read
//   name          a DOM object's name instead of the object (swatches, styles, fonts, ...)
//   nothing       NothingEnum.NOTHING
//   number        an enumerator's numeric value instead of the enumerator
//   unit          a measurement as a string with units ("12pt")
//   path          a File's path string instead of the File
// The original value is put back after each try. Objects outside the document (application
// preferences, which InDesign saves) are never written.
//
// Argument: see parseSamplerArg in walk.jsxinc. Keys in the blocklist are "Class.prop:trial".
#include "../../test/fixtures/fixture.jsxinc"
#include "walk.jsxinc"

function trialsFor(orig) {
    var t = [['roundtrip', orig]];
    var a = atomOf(orig);
    if (a.indexOf('enum:') === 0) {
        t.push(['number', Number(orig)]);
        if (String(orig) !== 'NOTHING') t.push(['nothing', NothingEnum.NOTHING]);
        return t;
    }
    t.push(['nothing', NothingEnum.NOTHING]);
    if (a === 'number') t.push(['unit', orig + 'pt']);
    else if (a === 'File') t.push(['path', orig.fsName]);
    else if (orig !== null && typeof orig === 'object' && !(orig instanceof Array)) {
        try { if (typeof orig.name === 'string') t.push(['name', orig.name]); } catch (e) {}
    }
    return t;
}

function main(arg) {
    var s = parseSamplerArg(arg);
    var start = new Date().getTime();
    fixtureProgress = s.progress;
    fixtureSkip = s.blocked;
    var doc = buildFixture(s.dir);
    var closeProblems;
    try {
        var writes = {};   // "Class.prop" -> { trial: "ok" | "rejects: message" }

        var walked = walkDom([doc].concat(fixtureRoots), function (obj, cls) {
            var spec = '';
            try { spec = obj.toSpecifier(); } catch (e) {}
            if (spec.indexOf('/document') !== 0) return [];
            // "Class.*:write": a class whose writes crash InDesign whichever comes first.
            var noWrites = !!s.blocked[cls + '.*:write'];
            var props, next = [];
            try { props = obj.reflect.properties; } catch (e) { return next; }
            for (var i = 0; i < props.length; i++) {
                var name = String(props[i].name);
                if (name === '__proto__' || name === 'properties') continue;
                var key = cls + '.' + name;
                if (s.blocked[key]) continue;
                var orig;
                try { orig = obj[name]; } catch (e) { continue; }
                next.push(orig);
                if (noWrites || String(props[i].type) !== 'readwrite' || writes[key]) continue;
                var result = {};
                var trials = trialsFor(orig);
                for (var t = 0; t < trials.length; t++) {
                    var tkey = key + ':' + trials[t][0];
                    if (s.blocked[tkey]) { result[trials[t][0]] = 'blocked'; continue; }
                    s.progress(tkey);
                    try {
                        obj[name] = trials[t][1];
                        result[trials[t][0]] = 'ok';
                    } catch (e) {
                        result[trials[t][0]] = 'rejects: ' + String(e.message).substr(0, 160);
                    }
                    try { obj[name] = orig; } catch (e) {}
                }
                writes[key] = result;
            }
            return next;
        }, s.progress, s.blocked);
    } finally {
        closeProblems = closeFixture(doc);
    }
    return { ms: new Date().getTime() - start, timedOut: walked.timedOut, fixtureErrors: fixtureErrors.concat(closeProblems), classesSampled: walked.classes, writes: writes };
}
