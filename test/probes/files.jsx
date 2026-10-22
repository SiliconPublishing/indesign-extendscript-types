// Files and folders: ExtendScript File/Folder objects, returned synchronously; paths accepted.
#include "_harness.jsxinc"

function main() {
    var dir = Folder.temp.fsName + '/idx-probe-files';
    new Folder(dir).create();
    var doc = fixtureDocument();
    probe('fullName of an unsaved document throws', function () { return doc.fullName; }, didThrow);
    probe('save() takes a path string', function () { doc.save(dir + '/a.indd'); return doc.fullName.constructor.name; }, 'File');
    probe('save() takes a File', function () { doc.save(new File(dir + '/b.indd')); return doc.name; }, 'b.indd');
    probe('filePath is a Folder', function () { return doc.filePath.constructor.name; }, 'Folder');
    probe('exportFile() takes a path string', function () { doc.exportFile(ExportFormat.JPG, dir + '/a.jpg'); return File(dir + '/a.jpg').exists; }, true);
    probe('exportFile() takes a format name string', function () { doc.exportFile('JPEG', new File(dir + '/b.jpg')); return File(dir + '/b.jpg').exists; }, true);
    probe('place() takes a path string, returns an array', function () {
        var r = doc.pages[0].place(dir + '/a.jpg');
        return (r instanceof Array) + ':' + r[0].constructor.name;
    }, 'true:Image');
    probe('scriptsFolder is a Folder', function () { return app.scriptPreferences.scriptsFolder.constructor.name; }, 'Folder');
    probe('Application.fullName is a Folder on macOS (the app bundle)', function () { return $.os.indexOf('Mac') < 0 || app.fullName.constructor.name; }, function (a) { return a === true || a === 'Folder'; });
    probe('activeScript is a File', function () { return app.activeScript.constructor.name; }, 'File');
    probe('event handler file reads back as a File', function () {
        var f = new File(dir + '/h.jsx');
        f.open('w'); f.write('1'); f.close();
        var l = doc.addEventListener('afterSave', f);
        var h = l.handler.constructor.name;
        l.remove();
        return h;
    }, 'File');
    probe('app.open() takes a path string', function () {
        closeFixtures();
        __doc = app.open(dir + '/a.indd', false);
        return __doc.name;
    }, 'a.indd');
    probe('app.open() of an array returns an array', function () {
        var r = app.open([new File(dir + '/b.indd')], false);
        var t = (r instanceof Array) + '/' + r.length;
        r[0].close(SaveOptions.NO);
        return t;
    }, 'true/1');
    return finish();
}
