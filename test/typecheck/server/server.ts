// Server edition: InDesign Server's own API compiles; desktop-only API does not.
var f = new File('/tmp/x.indd');
var doc = app.open(f, OpenOptions.OPEN_COPY) as InDesign.Document;
app.consoleout('opened ' + doc.name);
var setting: ServerSetting = app.serverSettings;
doc.exportFile(ExportFormat.PDF_TYPE, new File('/tmp/x.pdf'));
doc.close(SaveOptions.NO);
var b: InDesign.Button | undefined;
if (b instanceof Button) $.writeln(Button.BEFORE_PLACE);

// @ts-expect-error desktop's parameter order
app.open(f, false, OpenOptions.OPEN_COPY);
// @ts-expect-error desktop only
app.selection;
// @ts-expect-error desktop only
app.activeDocument;
// @ts-expect-error desktop only
SaveOptions.ASK;
// @ts-expect-error desktop only (showingOptions)
doc.exportFile(ExportFormat.PDF_TYPE, f, false);
// @ts-expect-error no ScriptUI on InDesign Server
new Window('dialog');
// @ts-expect-error desktop only
app.dialogs;
