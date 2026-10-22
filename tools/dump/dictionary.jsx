// Dumps InDesign's scripting dictionary ($.dictionary) as raw OMV XML: one <name>.xml per class
// into the folder passed as the argument, plus the suite map as JSON. Parsing happens in Node
// (tools/dump/parse-dictionary.mjs); escaping 40MB of XML in ExtendScript is far too slow.
function writeText(path, text) {
    var f = new File(path);
    f.encoding = 'UTF-8';
    f.open('w');
    f.write(text);
    f.close();
}

// Third-party plugins: Adobe's own live inside the application bundle, so anything in the
// application's Plug-Ins folder (or a user Plug-Ins folder) was installed by someone else.
function thirdPartyPlugins() {
    var found = [];
    var folders = [new Folder(Folder.appPackage.parent.fsName + '/Plug-Ins')];
    try {
        var userRoot = new Folder(Folder.userData.fsName + '/Adobe/InDesign');
        var versions = userRoot.getFiles();
        for (var v = 0; v < versions.length; v++) {
            if (!(versions[v] instanceof Folder)) continue;
            var locales = versions[v].getFiles();
            for (var l = 0; l < locales.length; l++) if (locales[l] instanceof Folder) folders.push(new Folder(locales[l].fsName + '/Plug-Ins'));
        }
    } catch (e) {}
    for (var f = 0; f < folders.length; f++) {
        if (!folders[f].exists) continue;
        var entries = folders[f].getFiles();
        for (var i = 0; i < entries.length; i++) {
            var name = decodeURI(entries[i].name);
            if (/^(\.|Icon)/.test(name)) continue;
            found.push(entries[i].fsName);
        }
    }
    return found;
}

function main(dir) {
    var d = $.dictionary;
    new Folder(dir + '/classes').create();
    var suites = {};
    var groups = d.getGroups();
    for (var g = 0; g < groups.length; g++) {
        var members = d.getClasses(groups[g]);
        var names = [];
        for (var i = 0; i < members.length; i++) names.push(String(members[i]));
        suites[String(groups[g])] = names;
    }
    var all = d.getClasses();
    for (var j = 0; j < all.length; j++) {
        var name = String(all[j]);
        writeText(dir + '/classes/' + name + '.xml', String(d.getClass(name).toXML()));
    }
    var meta = { version: app.version, build: $.build, classCount: all.length, suites: suites, thirdPartyPlugins: thirdPartyPlugins() };
    writeText(dir + '/meta.json', __json.stringify(meta));
    return { classCount: all.length };
}
