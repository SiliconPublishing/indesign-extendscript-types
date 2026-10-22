// Records which dictionary classes exist as ExtendScript globals, and for each global the
// static members its constructor carries (DOM event-name constants; ScriptUI hybrids).
// Argument: a JSON array of class names, passed through eval (the engine has no JSON.parse).
function main(namesJson) {
    var names = eval(namesJson);
    var out = {};
    for (var i = 0; i < names.length; i++) {
        var n = names[i];
        var v;
        try { v = $.global[n]; } catch (e) { out[n] = { error: String(e.message) }; continue; }
        if (v === undefined) { out[n] = { global: false }; continue; }
        var entry = { global: true, type: typeof v, statics: [] };
        try {
            var ps = v.reflect.properties;
            for (var k = 0; k < ps.length; k++) entry.statics.push(String(ps[k].name));
        } catch (e) { entry.reflectError = String(e.message); }
        try { entry.source = String(v).substr(0, 40); } catch (e) {}
        out[n] = entry;
    }
    return out;
}
