// Records which alias spellings of each enumerator exist. Reflection lists only the UPPER_CASE
// names, but the engine also answers to some aliases (SaveOptions.no, NumberingStyle.upperRoman).
// Argument: JSON [[enumeration, [candidate, ...]], ...], built by dump/index.mjs from the dictionary.
function main(json) {
    var list = eval(json);
    var out = {};
    for (var i = 0; i < list.length; i++) {
        var e = list[i][0], names = list[i][1], found = [];
        for (var j = 0; j < names.length; j++) {
            var t;
            try { t = typeof $.global[e][names[j]]; } catch (x) { t = 'throws'; }
            if (t === 'object') found.push(names[j]);
        }
        out[e] = found;
    }
    return out;
}
