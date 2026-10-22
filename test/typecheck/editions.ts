// Desktop edition: what only InDesign Server has must not compile.
var f = new File('/tmp/x.indd');
app.open(f, false, OpenOptions.OPEN_COPY);
var selection: object[] = app.selection;
app.activeDocument.close(SaveOptions.ASK);
app.documents[0].exportFile(ExportFormat.PDF_TYPE, f, false);
var w = new Window('dialog');

// @ts-expect-error Server's parameter order: the second parameter is showingWindow on desktop
app.open(f, OpenOptions.OPEN_COPY);
// @ts-expect-error InDesign Server only
app.consoleout('hello');
// @ts-expect-error InDesign Server only
var setting: ServerSetting;

// The escape hatch works from any edition.
(app as InDesignServer.Application).consoleout('hello');
