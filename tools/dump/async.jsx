// Objects that exist only once a script yields: a background export's task, and the IdleEvent an
// idle task dispatches. Run twice, with a pause between (dump/runtime.mjs does this):
//   "arm|<scratch folder>"   starts an export in a hidden document and samples its BackgroundTask
//                            while it runs (returned); registers an idle task whose listener is
//                            <scratch>/idle-handler.jsx (written by runtime.mjs), which samples the
//                            IdleEvent into <scratch>/idle.json when it fires;
//   "collect"                removes the idle task and closes the document.
// Function listeners do not survive the script that adds them; a file listener does.
#include "walk.jsxinc"

var ASYNC_TAG = 'idx-async';

function sampleInto(samples, obj) {
    var cls = obj.constructor.name, props;
    try { props = obj.reflect.properties; } catch (e) { return; }
    for (var i = 0; i < props.length; i++) {
        var name = String(props[i].name);
        if (name === '__proto__' || name === 'properties') continue;
        var key = cls + '.' + name, atom;
        try { atom = atomOf(obj[name]); } catch (e) { atom = 'throws'; }
        var r = samples[key] || (samples[key] = {});
        r[atom] = (r[atom] || 0) + 1;
    }
}

function main(arg) {
    var saved = app.scriptPreferences.userInteractionLevel;
    app.scriptPreferences.userInteractionLevel = UserInteractionLevels.NEVER_INTERACT;
    try {
        if (arg.indexOf('arm|') === 0) {
            var dir = arg.substr(4);
            var samples = {};
            var doc = app.documents.add(false);
            doc.label = ASYNC_TAG;
            for (var p = 0; p < 20; p++) doc.pages.add().textFrames.add({ geometricBounds: [0, 0, 300, 300], contents: 'page ' + p });
            var task = doc.asynchronousExportFile(ExportFormat.PDF_TYPE, new File(dir + '/async.pdf'));
            sampleInto(samples, task);
            var idle = app.idleTasks.add({ name: ASYNC_TAG, sleep: 100 });
            idle.addEventListener(IdleEvent.ON_IDLE, new File(dir + '/idle-handler.jsx'));
            return { samples: samples };
        }
        var tasks = app.idleTasks;
        for (var t = tasks.length - 1; t >= 0; t--) if (tasks[t].name === ASYNC_TAG) tasks[t].remove();
        var closed = 0, stillOpen = 0;
        for (var d = app.documents.length - 1; d >= 0; d--) {
            var doc2 = app.documents[d];
            if (doc2.label !== ASYNC_TAG) continue;
            try { doc2.close(SaveOptions.NO); closed++; } catch (e) { stillOpen++; }
        }
        return { closed: closed, stillOpen: stillOpen };
    } finally {
        app.scriptPreferences.userInteractionLevel = saved;
    }
}
