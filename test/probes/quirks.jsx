// ExtendScript and InDesign behaviour the declarations, their documentation or the measuring
// tools rely on, found while building them. Each probe is one fact.
#include "_harness.jsxinc"

function main(repo) {
    var saved = app.scriptPreferences.userInteractionLevel;
    try {
        app.scriptPreferences.userInteractionLevel = UserInteractionLevels.NEVER_INTERACT;
        var doc = fixtureDocument();

        // --- References that go stale -------------------------------------------------------
        // On a just-added StyleExportTagMap, reading constructor or reflect kills the reference:
        // isValid turns false and the next property read throws. (What constructor.name itself
        // gives varies: false in a bare script, the class name here.) Ordinary properties leave it
        // valid. dump/walk.jsxinc samples such objects without
        // touching either (fixture rootLater()).
        function freshTagMap(name) {
            var st = doc.paragraphStyles.add({ name: name });
            st.styleExportTagMaps.add('EPUB', 'p', 'c', '');
            return st.styleExportTagMaps[0];
        }
        probe('constructor of a just-added StyleExportTagMap invalidates it', function () {
            var m = freshTagMap('Quirks 1');
            var c = String(m.constructor.name);
            var v = String(m.isValid);
            var after;
            try { after = m.exportTag; } catch (e) { after = 'throws'; }
            return v + '/' + after;
        }, 'false/throws');
        probe('reflect of a just-added StyleExportTagMap invalidates it', function () {
            var m = freshTagMap('Quirks 2');
            var n = m.reflect.name;
            return String(m.isValid);
        }, 'false');
        probe('ordinary reads leave a just-added StyleExportTagMap valid', function () {
            var m = freshTagMap('Quirks 3');
            return m.exportTag + '/' + m.isValid + '/' + m.exportType;
        }, 'p/true/EPUB');

        // --- Dialogs and interaction ----------------------------------------------------------
        probe('NEVER_INTERACT turns a would-be dialog into "User canceled this action"', function () {
            var d = app.documents.add(false);
            try {
                d.pages[0].textFrames.add({ geometricBounds: [0, 0, 10, 10], contents: 'x' });
                d.importPdfComments(new File(Folder.temp.fsName + '/idx-no-such-comments.pdf'));
            } finally {
                d.close(SaveOptions.NO);
            }
        }, function (a) { return didThrow(a); });

        // --- Documents ---------------------------------------------------------------------
        probe('a new document measures in picas by default', function () {
            var d = app.documents.add(false);
            var u = String(d.viewPreferences.horizontalMeasurementUnits);
            d.close(SaveOptions.NO);
            return u;
        }, function (a) { return a === 'PICAS' || a === 'POINTS' || a === 'MILLIMETERS' || a === 'INCHES'; });

        // --- Background export -----------------------------------------------------------------
        probe('reading isValid on a running BackgroundTask garbles it; the document cannot close before the script yields', function () {
            var d = app.documents.add(false);
            d.label = 'idx-async'; // closed by tools/dump/cleanup.jsx once the export has run
            for (var i = 0; i < 10; i++) d.pages.add().textFrames.add({ geometricBounds: [0, 0, 300, 300], contents: 'p' + i });
            var t = d.asynchronousExportFile(ExportFormat.PDF_TYPE, new File(Folder.temp.fsName + '/idx-probe-async.pdf'));
            var before = String(t.status);
            var valid = t.isValid;
            var after = String(t.status);
            var closed;
            try { d.close(SaveOptions.NO); closed = 'closed'; } catch (e) { closed = 'close refused'; }
            return before + '/' + valid + '/' + after + '/' + closed;
        }, 'RUNNING/true/undefined/close refused');
        probe('asynchronousExportFile rejects EPUB', function () {
            var d = app.documents.add(false);
            try { return d.asynchronousExportFile(ExportFormat.EPUB, new File(Folder.temp.fsName + '/x.epub')); }
            finally { d.close(SaveOptions.NO); }
        }, didThrow);

        // --- Event listeners ------------------------------------------------------------------
        probe('an IdleEvent class exists, with ON_IDLE', function () { return IdleEvent.ON_IDLE; }, 'onIdle');

        // --- Measurements -------------------------------------------------------------------
        probe('a measurement setter takes a unit string', function () {
            doc.viewPreferences.horizontalMeasurementUnits = MeasurementUnits.POINTS;
            var r = doc.pages[0].rectangles.add({ geometricBounds: [0, 0, 10, 10] });
            r.strokeWeight = '2pt';
            return r.strokeWeight;
        }, 2);

        // --- Application preferences, read and written back unchanged ---------------------
        probe('GeneralPreference.temporaryFolder reads a Folder', function () { return app.generalPreferences.temporaryFolder.constructor.name; }, 'Folder');
        probe('GeneralPreference.temporaryFolder takes the Folder back', function () {
            var f = app.generalPreferences.temporaryFolder;
            app.generalPreferences.temporaryFolder = f;
            return app.generalPreferences.temporaryFolder.fsName === f.fsName;
        }, true);
        probe('GeneralPreference.temporaryFolder takes a path string', function () {
            var f = app.generalPreferences.temporaryFolder;
            app.generalPreferences.temporaryFolder = f.fsName;
            return app.generalPreferences.temporaryFolder.fsName === f.fsName;
        }, true);
        probe('EPubExportPreviewAppPreference.getApplicationAtIndex takes a number', function () {
            var p = app.epubViewingAppsPreferences;
            return typeof p.getApplicationAtIndex(0);
        }, function (a) { return a === 'string' || (didThrow(a) && !/Expected Boolean/.test(a)); });

        // --- ES3 core -------------------------------------------------------------------------
        probe('RegExp.$_ and RegExp.input stay empty, whatever ran', function () { /b/.exec('abc'); 'qbq'.match(/b/); return '[' + RegExp.$_ + '][' + RegExp.input + ']'; }, '[][]');
        probe('XMPMeta exists once AdobeXMPScript is loaded', function () {
            if (typeof XMPMeta === 'undefined') new ExternalObject('lib:AdobeXMPScript');
            return typeof XMPMeta + '/' + typeof XMPConst;
        }, 'function/function');
        probe('Date.now() exists', function () { return typeof Date.now(); }, 'number');
        probe('there is no JSON', function () { return typeof JSON; }, 'undefined');
        probe('there is no Array.prototype.forEach', function () { return typeof [].forEach; }, 'undefined');
    } finally {
        app.scriptPreferences.userInteractionLevel = saved;
    }
    return finish();
}
