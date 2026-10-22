// Valid ExtendScript must compile; UXP-only idioms must not (@ts-expect-error fails the build if
// the line compiles). Each line mirrors a probe in test/probes.
var doc = app.documents.add();
var page = doc.pages[0];
var tf = page.textFrames.add({ geometricBounds: [0, 0, 100, 100], contents: 'hi' });
$.writeln(tf.contents);

// Files come back synchronously as ExtendScript File/Folder objects.
var full: File = doc.fullName;
var fsName: string = doc.filePath.fsName;
var scripts: Folder = app.scriptPreferences.scriptsFolder;
doc.save(new File('~/a.indd'));
doc.save('~/a.indd');

// Enumerators compare with ===; there is no equals().
var same: boolean = doc.viewPreferences.horizontalMeasurementUnits === MeasurementUnits.POINTS;
// @ts-expect-error UXP only
SaveOptions.NO.equals(SaveOptions.NO);

// DOM objects: ===, instanceof, reflect, specifiers; no constructorName / equals.
var same2: boolean = page === doc.pages.item(0);
var parent = tf.parent;
if (parent instanceof Spread) parent.pages;
var className: string = page.reflect.name;
var spec: string = page.toSpecifier();
var again = resolve(spec);
// @ts-expect-error UXP only
page.constructorName;
// @ts-expect-error UXP only
page.equals(page);

// Classes are globals with their event names.
var evt: 'afterOpen' = Document.AFTER_OPEN;
doc.addEventListener(Document.AFTER_SAVE, function (e) {});

// ScriptUI owns the Window/Button/... globals; the DOM's are InDesign.Window and so on.
var dlg = new Window('dialog', 'Title');
dlg.add('button', undefined, 'OK');
var layoutWindow: InDesign.Window = app.activeWindow;

doc.close(SaveOptions.NO);

// instanceof narrows through the class globals; the classes are not callable.
var items = doc.allPageItems;
for (var i = 0; i < items.length; i++) {
    var item = items[i];
    if (item instanceof TextFrame) $.writeln(item.contents);
}
// @ts-expect-error DOM classes cannot be called
TextFrame();
// @ts-expect-error nor constructed
new TextFrame();

// Collection classes: globals once used, for instanceof.
var isPages: boolean = doc.pages instanceof Pages;

// BridgeTalk is typed, callbacks included.
var bt = new BridgeTalk();
bt.target = 'photoshop';
bt.body = 'app.documents.length';
bt.onResult = function (reply) { $.writeln(reply.body); };
var targets: string[] = BridgeTalk.getTargets();

// The scripting dictionary.
var tfClass = $.dictionary.getClass('TextFrame');

// Strict ES3: no ES5 library.
var nums = [1, 2, 3];
// @ts-expect-error ES5 Array.prototype.forEach does not exist in ExtendScript
nums.forEach(function () {});
// @ts-expect-error no JSON in ExtendScript
JSON.stringify({});
// @ts-expect-error no String.prototype.trim
' x '.trim();
// Date.now exists (ExtendScript has it).
var now: number = Date.now();

// Unset style attributes read back as NothingEnum.NOTHING; styles accept it.
var cs = doc.characterStyles.add();
var scale = cs.horizontalScale;
cs.horizontalScale = NothingEnum.NOTHING;
// @ts-expect-error text objects reject NOTHING
tf.characters[0].kentenFontStyle = NothingEnum.NOTHING;

// XMP: the library's globals exist once it is loaded, so they are typed `| undefined`.
if (ExternalObject.AdobeXMPScript == undefined) ExternalObject.AdobeXMPScript = new ExternalObject('lib:AdobeXMPScript');
if (XMPMeta && XMPConst) {
    var meta = new XMPMeta();
    meta.setProperty(XMPConst.NS_DC, 'format', 'text/plain');
    var prop = meta.getProperty(XMPConst.NS_DC, 'format');
    if (prop !== null) $.writeln(prop.value);
    var it = meta.iterator();
    for (var node = it.next(); node !== null; node = it.next()) $.writeln(node.path);
}
// @ts-expect-error not narrowed: XMPMeta may be undefined until the library is loaded
new XMPMeta();
