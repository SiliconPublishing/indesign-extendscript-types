// Everyday DOM code that must compile (reported from a 60k-line migration, 21.6.0).
var doc = app.documents[0];
var page = doc.pages[0];

// Collection length is a number (21.6.0 declared number | NothingEnum.NOTHING).
for (var i = 0; i < doc.pages.length; i++) $.writeln(doc.pages[i].name);
var last = doc.pages[doc.pages.length - 1];
var styleCount: number = doc.characterStyles.length;

// Bounds copy from one item to another; reads are four numbers (InDesign.Bounds), writes also take
// unit strings (InDesign.BoundsArray).
var rect = page.rectangles[0];
rect.geometricBounds = page.groups[0].geometricBounds;
var bounds: InDesign.Bounds = rect.visibleBounds;
var top: number = bounds[0];
var written: InDesign.BoundsArray = ['1p', 0, '10p', 10];
rect.geometricBounds = written;

// A gradient stop takes a tint or a swatch.
var stop = doc.gradients[0].gradientStops[0];
stop.stopColor = doc.tints[0];
stop.stopColor = doc.swatches.itemByName('Black');

// Windows-only enumerator, kept from upstream.
var vb = ScriptLanguage.VISUAL_BASIC;
var vbAlias = ScriptLanguage.visualBasic;

// A text range reads one-element arrays.
var range = page.textFrames[0].parentStory.characters.itemByRange(2, 5);
var contents = range.contents[0];
// getElements() resolves the range to one Text.
var whole: InDesign.Text = range.getElements()[0];
var wordRange: InDesign.Text[] = page.textFrames[0].parentStory.words.itemByRange(0, 1).getElements();
