// Portable edition: only what both InDesign desktop and InDesign Server have, in the form both take.
var f = new File('/tmp/x.indd');
var doc = app.open(f) as InDesign.Document;
doc.exportFile(ExportFormat.PDF_TYPE, new File('/tmp/x.pdf'));
doc.close(SaveOptions.NO);
var names: string[] = app.documents.everyItem().name;
var place: string = Button.BEFORE_PLACE;
$.writeln(app.name);

// A branch for one edition, with its escape hatch.
if (app.name.indexOf('Server') >= 0) (app as InDesignServer.Application).consoleout('on Server');
else $.writeln((app as InDesignDesktop.Application).selection.length);

// @ts-expect-error the second parameter differs between the editions
app.open(f, OpenOptions.OPEN_COPY);
// @ts-expect-error the second parameter differs between the editions
app.open(f, false);
// @ts-expect-error desktop only
app.selection;
// @ts-expect-error Server only
app.consoleout('x');
// @ts-expect-error desktop only
SaveOptions.ASK;
// @ts-expect-error no ScriptUI on InDesign Server
new Window('dialog');
// @ts-expect-error desktop and Server differ in what Button is, so there is no Button type
var b: Button;
