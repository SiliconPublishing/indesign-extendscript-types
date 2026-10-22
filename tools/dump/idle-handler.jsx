// IdleEvent listener for async.jsx, run by InDesign in its own engine: the event is `evt`.
// Samples it once into idle.json next to this file.
#include "walk.jsxinc"
(function () {
    var out = new File(File($.fileName).parent + '/idle.json');
    if (out.exists) return;
    var samples = {};
    var props = evt.reflect.properties;
    for (var i = 0; i < props.length; i++) {
        var name = String(props[i].name);
        if (name === '__proto__' || name === 'properties') continue;
        var key = evt.constructor.name + '.' + name, atom;
        try { atom = atomOf(evt[name]); } catch (e) { atom = 'throws'; }
        samples[key] = {};
        samples[key][atom] = 1;
    }
    out.encoding = 'UTF-8';
    out.open('w');
    out.write(__json.stringify(samples));
    out.close();
})();
