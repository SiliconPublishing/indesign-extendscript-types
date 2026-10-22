// Enumerators in ExtendScript: objects that compare with === against each other and their number.
#include "_harness.jsxinc"

function main() {
    probe('typeof an enumerator is "object"', function () { return typeof SaveOptions.NO; }, 'object');
    probe('String(enumerator) is its name', function () { return String(SaveOptions.NO); }, 'NO');
    probe('valueOf() is its number', function () { return SaveOptions.NO.valueOf(); }, 1852776480);
    probe('=== between enumerators', function () { return SaveOptions.NO === SaveOptions.NO; }, true);
    probe('=== against the number', function () { return SaveOptions.NO === 1852776480; }, true);
    probe('constructor is Enumerator', function () { return SaveOptions.NO.constructor.name; }, 'Enumerator');
    probe('no equals()', function () { return SaveOptions.NO.equals; }, didThrow);
    probe('unknown member access throws', function () { return SaveOptions.NO.bogus; }, didThrow);
    probe('camelCase alias exists', function () { return SaveOptions.no === SaveOptions.NO; }, true);
    probe('camelCase alias, multi-word', function () { return NumberingStyle.upperRoman === NumberingStyle.UPPER_ROMAN; }, true);
    probe('all-lowercase alias does not exist', function () { return typeof AddPageOptions.endofstory; }, 'undefined');
    probe('enumeration reflects as Enumeration', function () { return SaveOptions.reflect.name; }, 'Enumeration');
    var doc = fixtureDocument();
    var vp = doc.viewPreferences;
    probe('enum property read === enumerator', function () {
        vp.horizontalMeasurementUnits = MeasurementUnits.POINTS;
        return vp.horizontalMeasurementUnits === MeasurementUnits.POINTS;
    }, true);
    probe('enum property accepts the bare number', function () {
        vp.horizontalMeasurementUnits = 2054188905;
        return String(vp.horizontalMeasurementUnits);
    }, 'POINTS');
    probe('enum property rejects the name string', function () { vp.horizontalMeasurementUnits = 'POINTS'; }, didThrow);
    return finish();
}
