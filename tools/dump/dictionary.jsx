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
    var meta = { version: app.version, build: $.build, classCount: all.length, suites: suites };
    writeText(dir + '/meta.json', __json.stringify(meta));
    return { classCount: all.length };
}
