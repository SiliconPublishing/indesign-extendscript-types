// Dumps the ExtendScript core (non-DOM) object model by reflection and feature tests.
// Run in the pristine "main" engine (tools/run-extendscript.mjs), never through a console that
// polyfills: the point is to record what the engine itself provides.

function reflectInfo(info) {
    var r = { name: String(info.name), type: String(info.type), dataType: String(info.dataType) };
    try { if (info.description) r.desc = String(info.description); } catch (e) {}
    try { if (info.isCollection) r.isCollection = true; } catch (e) {}
    try { if (info.max !== undefined && info.max !== null) r.max = info.max; } catch (e) {}
    try { if (info.min !== undefined && info.min !== null) r.min = info.min; } catch (e) {}
    try {
        if (info.type === 'method') {
            r.args = [];
            for (var i = 0; i < info.arguments.length; i++) {
                var a = info.arguments[i];
                var arg = { name: String(a.name), dataType: String(a.dataType) };
                try { if (a.description) arg.desc = String(a.description); } catch (e) {}
                try { if (a.defaultValue !== undefined) arg.defaultValue = String(a.defaultValue); } catch (e) {}
                r.args.push(arg);
            }
        }
    } catch (e) {}
    return r;
}

function reflectOf(obj) {
    var out = { properties: [], methods: [] };
    var refl;
    try { refl = obj.reflect; } catch (e) { return { error: String(e.message) }; }
    if (!refl) return { error: 'no reflect' };
    try { out.name = String(refl.name); } catch (e) {}
    var lists = ['properties', 'methods'];
    for (var l = 0; l < lists.length; l++) {
        var list;
        try { list = refl[lists[l]]; } catch (e) { out[lists[l]] = { error: String(e.message) }; continue; }
        for (var i = 0; i < list.length; i++) out[lists[l]].push(reflectInfo(list[i]));
    }
    try { if (refl.staticProperties) { out.staticProperties = []; for (var s = 0; s < refl.staticProperties.length; s++) out.staticProperties.push(reflectInfo(refl.staticProperties[s])); } } catch (e) {}
    try { if (refl.staticMethods) { out.staticMethods = []; for (var t = 0; t < refl.staticMethods.length; t++) out.staticMethods.push(reflectInfo(refl.staticMethods[t])); } } catch (e) {}
    return out;
}

function safeTypeof(get) {
    try { return typeof get(); } catch (e) { return 'throws: ' + e.message; }
}

// Globals that reflection on $.global does not list, or lists only in part. `document` is left out:
// touching it without an open document raises an error that escapes try/catch.
var CANDIDATE_GLOBALS = [
    '$', 'app', 'Object', 'Function', 'Array', 'String', 'Number', 'Boolean', 'Date', 'RegExp', 'Math',
    'Error', 'EvalError', 'RangeError', 'ReferenceError', 'SyntaxError', 'TypeError', 'URIError', 'IOError',
    'InternalError', 'JSON', 'File', 'Folder', 'Socket', 'XML', 'XMLList', 'QName', 'Namespace', 'UnitValue',
    'BridgeTalk', 'ExternalObject', 'Reflection', 'ReflectionInfo', 'Dictionary', 'ScriptUI', 'Window',
    'LuminanceSpaceEnum', 'XMPMeta', 'XMPConst', 'XMPFile', 'CSXSEvent', 'Enumerator', 'Enumeration',
    'Symbol', 'Promise', 'Map', 'Set', 'WeakMap', 'Proxy', 'Reflect', 'globalThis', 'setTimeout',
    'require', 'console', 'resolve', 'localize', 'isXMLName', 'setDefaultXMLNamespace', 'uneval', 'exit',
    'beep', 'alert', 'confirm', 'prompt', 'escape', 'unescape', 'eval', 'isNaN', 'isFinite', 'parseInt',
    'parseFloat', 'encodeURI', 'encodeURIComponent', 'decodeURI', 'decodeURIComponent', 'NaN', 'Infinity',
    'undefined', 'Point', 'Dimension', 'Bounds', 'Margins', 'UIEvent', 'KeyboardEvent', 'MouseEvent',
    'Event', 'ScriptUIGraphics', 'ScriptUIBrush', 'ScriptUIPen', 'ScriptUIFont', 'ScriptUIImage', 'ScriptUIPath',
    'Group', 'Panel', 'Button', 'IconButton', 'Image', 'StaticText', 'EditText', 'Checkbox', 'RadioButton',
    'Progressbar', 'Slider', 'Scrollbar', 'ListBox', 'DropDownList', 'ListItem', 'TreeView', 'TabbedPanel',
    'Tab', 'FlashPlayer', 'DrawState', 'Graphics', 'arguments',
    'XMPFile', 'XMPUtils', 'XMPDateTime', 'XMPIterator', 'XMPProperty', 'XMPFileInfo', 'XMPPacketInfo', 'XMPAliasInfo',
];

// Instances to reflect on, so prototype members are visible (reflection on a constructor gives
// mostly statics). Each builder runs in a try so one failure does not lose the rest.
var INSTANCES = {
    Object: function () { return {}; },
    Array: function () { return []; },
    String: function () { return new String('a'); },
    Number: function () { return new Number(1); },
    Boolean: function () { return new Boolean(true); },
    Date: function () { return new Date(); },
    RegExp: function () { return /a/g; },
    Function: function () { return function () {}; },
    Error: function () { return new Error('x'); },
    File: function () { return new File(Folder.temp + '/idx-probe.txt'); },
    Folder: function () { return Folder.temp; },
    Socket: function () { return new Socket(); },
    XML: function () { return new XML('<a b="1"><c/></a>'); },
    XMLList: function () { return new XML('<a><c/><c/></a>').c; },
    QName: function () { return new QName('ns', 'local'); },
    Namespace: function () { return new Namespace('p', 'http://x'); },
    UnitValue: function () { return new UnitValue(1, 'in'); },
    BridgeTalk: function () { return new BridgeTalk(); },
    Reflection: function () { return $.reflect; },
    ReflectionInfo: function () { return $.reflect.properties[0]; },
    Dictionary: function () { return $.dictionary; },
    Math: function () { return Math; },
    Dollar: function () { return $; },
    ScriptUI: function () { return ScriptUI; },
    ScriptUIWindow: function () { return new Window('palette', 'probe'); },
    // The XMP library's objects (loaded by main() first).
    XMPMeta: function () { return new XMPMeta(); },
    XMPDateTime: function () { return new XMPDateTime(); },
    XMPProperty: function () {
        var m = new XMPMeta();
        m.setProperty(XMPConst.NS_DC, 'format', 'text/plain');
        return m.getProperty(XMPConst.NS_DC, 'format');
    },
    XMPIterator: function () {
        var m = new XMPMeta();
        m.setProperty(XMPConst.NS_DC, 'format', 'text/plain');
        return m.iterator();
    },
    XMPFile: function () { return new XMPFile(xmpProbeFile(), XMPConst.UNKNOWN, XMPConst.OPEN_FOR_READ); },
    XMPPacketInfo: function () { return new XMPFile(xmpProbeFile(), XMPConst.UNKNOWN, XMPConst.OPEN_FOR_READ).getPacketInfo(); },
    XMPFileInfo: function () { return new XMPFile(xmpProbeFile(), XMPConst.UNKNOWN, XMPConst.OPEN_FOR_READ).getFileInfo(); },
    CSXSEvent: function () { return new CSXSEvent(); },
};

// A small file with an XMP packet, for XMPFile.
function xmpProbeFile() {
    var f = new File(Folder.temp.fsName + '/idx-probe-xmp.xmp');
    if (!f.exists) {
        f.encoding = 'UTF-8';
        f.open('w');
        f.write('<?xpacket begin="" id="W5M0MpCehiHzreSzNTczkc9d"?><x:xmpmeta xmlns:x="adobe:ns:meta/"><rdf:RDF xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#"/></x:xmpmeta><?xpacket end="w"?>');
        f.close();
    }
    return f.fsName;
}

// Members to feature-test on prototypes and statics: anything a TS lib might claim beyond ES3.
var FEATURES = {
    'Array.prototype': ['concat', 'join', 'pop', 'push', 'reverse', 'shift', 'slice', 'sort', 'splice', 'unshift',
        'toSource', 'toLocaleString', 'indexOf', 'lastIndexOf', 'every', 'some', 'forEach', 'map', 'filter',
        'reduce', 'reduceRight', 'find', 'findIndex', 'includes', 'fill', 'flat', 'keys', 'entries', 'at'],
    Array: ['isArray', 'from', 'of'],
    'String.prototype': ['charAt', 'charCodeAt', 'concat', 'indexOf', 'lastIndexOf', 'localeCompare', 'match',
        'replace', 'search', 'slice', 'split', 'substring', 'substr', 'toLowerCase', 'toUpperCase',
        'toLocaleLowerCase', 'toLocaleUpperCase', 'trim', 'trimLeft', 'trimRight', 'startsWith', 'endsWith',
        'includes', 'repeat', 'padStart', 'padEnd', 'anchor', 'big', 'blink', 'bold', 'fixed', 'fontcolor',
        'fontsize', 'italics', 'link', 'small', 'strike', 'sub', 'sup', 'toSource', 'fromCharCode'],
    String: ['fromCharCode', 'fromCodePoint', 'raw'],
    Object: ['keys', 'create', 'defineProperty', 'defineProperties', 'getPrototypeOf', 'getOwnPropertyNames',
        'getOwnPropertyDescriptor', 'freeze', 'isFrozen', 'seal', 'isSealed', 'preventExtensions',
        'isExtensible', 'assign', 'entries', 'values', 'is'],
    'Object.prototype': ['hasOwnProperty', 'isPrototypeOf', 'propertyIsEnumerable', 'toLocaleString', 'toString',
        'valueOf', 'toSource', 'watch', 'unwatch', 'reflect', '__defineGetter__', '__defineSetter__',
        '__lookupGetter__', '__lookupSetter__'],
    'Function.prototype': ['apply', 'call', 'bind', 'toSource', 'toString'],
    'Number.prototype': ['toFixed', 'toExponential', 'toPrecision', 'toLocaleString', 'toSource'],
    Number: ['isInteger', 'isFinite', 'isNaN', 'parseFloat', 'parseInt', 'MAX_VALUE', 'MIN_VALUE', 'NaN',
        'NEGATIVE_INFINITY', 'POSITIVE_INFINITY', 'EPSILON', 'MAX_SAFE_INTEGER'],
    'Date.prototype': ['toISOString', 'toJSON', 'toDateString', 'toTimeString', 'toLocaleDateString',
        'toLocaleTimeString', 'toUTCString', 'toGMTString', 'getYear', 'setYear', 'toSource'],
    Date: ['now', 'parse', 'UTC'],
    Math: ['abs', 'acos', 'asin', 'atan', 'atan2', 'ceil', 'cos', 'exp', 'floor', 'log', 'max', 'min', 'pow',
        'random', 'round', 'sin', 'sqrt', 'tan', 'sign', 'trunc', 'log10', 'log2', 'hypot', 'cbrt', 'E', 'LN10',
        'LN2', 'LOG10E', 'LOG2E', 'PI', 'SQRT1_2', 'SQRT2'],
    'XML.prototype': ['addNamespace', 'appendChild', 'attribute', 'attributes', 'child', 'childIndex', 'children',
        'comments', 'contains', 'copy', 'descendants', 'elements', 'hasComplexContent', 'hasSimpleContent',
        'inScopeNamespaces', 'insertChildAfter', 'insertChildBefore', 'length', 'localName', 'name', 'namespace',
        'namespaceDeclarations', 'nodeKind', 'normalize', 'parent', 'prependChild', 'processingInstructions',
        'removeNamespace', 'replace', 'setChildren', 'setLocalName', 'setName', 'setNamespace', 'text',
        'toString', 'toXMLString', 'valueOf', 'xpath',
        // Canary: must come out "undefined", or the detection is not discriminating.
        'bogusMethodXyz'],
    'RegExp.prototype': ['exec', 'test', 'compile', 'toSource', 'source', 'global', 'ignoreCase', 'multiline',
        'lastIndex', 'flags', 'sticky', 'unicode'],
};

// E4X: `xml.name` looks up child elements, so typeof says "xml" for anything. A method is present
// when calling it does anything but fail as "not a function".
function xmlMethodTest(name) {
    var x = new XML('<a b="1"><c>t</c></a>');
    try {
        x[name]();
        return 'function';
    } catch (e) {
        return /not a function|does not support/i.test(e.message) ? 'undefined' : 'function';
    }
}

function featureTests() {
    var out = {};
    for (var path in FEATURES) {
        if (path === 'XML.prototype') {
            out[path] = [];
            for (var x = 0; x < FEATURES[path].length; x++) out[path].push([FEATURES[path][x], xmlMethodTest(FEATURES[path][x])]);
            continue;
        }
        var parts = path.split('.');
        var target = $.global;
        for (var p = 0; p < parts.length; p++) target = target[parts[p]];
        var names = FEATURES[path];
        // [name, typeof] pairs, not an object: `reflect` is a read-only key on every object.
        out[path] = [];
        for (var i = 0; i < names.length; i++) {
            var n = names[i];
            out[path].push([n, safeTypeof(function () { return target[n]; })]);
        }
    }
    return out;
}

function main() {
    // The XMP and CEP libraries add globals when loaded, and stay loaded for the session: load
    // them first so the snapshot does not depend on what ran before.
    try { if (typeof XMPMeta === 'undefined') new ExternalObject('lib:AdobeXMPScript'); } catch (e) {}
    try { if (typeof CSXSEvent === 'undefined') new ExternalObject('lib:PlugPlugExternalObject'); } catch (e) {}
    var r = { engine: $.engineName, version: $.version, build: String($.build), os: $.os, globals: {}, statics: {}, instances: {} };
    for (var i = 0; i < CANDIDATE_GLOBALS.length; i++) {
        var name = CANDIDATE_GLOBALS[i];
        r.globals[name] = safeTypeof(function () { return $.global[name]; });
        if (r.globals[name] === 'function' || (r.globals[name] === 'object' && name !== 'app')) {
            try { r.statics[name] = reflectOf($.global[name]); } catch (e) { r.statics[name] = { error: String(e.message) }; }
        }
    }
    var g = $.global.reflect;
    r.globalReflection = { properties: [], methods: [] };
    // Names only: reading a property such as `document` evaluates it, and that throws without a document.
    for (var a = 0; a < g.properties.length; a++) r.globalReflection.properties.push(String(g.properties[a].name));
    for (var b = 0; b < g.methods.length; b++) r.globalReflection.methods.push(reflectInfo(g.methods[b]));
    for (var k in INSTANCES) {
        try {
            var inst = INSTANCES[k]();
            r.instances[k] = reflectOf(inst);
            if (k === 'ScriptUIWindow') inst.close();
        } catch (e) {
            r.instances[k] = { error: String(e.message) };
        }
    }
    r.features = featureTests();
    return r;
}
