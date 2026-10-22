// Removes what interrupted fixture runs left behind: only objects named Fixture*/idx-* or whose
// files are in an idx-fixture- temp folder. Restores interaction to INTERACT_WITH_ALL.
function main() {
    var r = [];
    app.scriptPreferences.userInteractionLevel = UserInteractionLevels.NEVER_INTERACT;
    var ours = function (path) { return /idx-fixture-/.test(path); };
    function pathOf(o) { try { return o.fullName.fsName; } catch (e) { try { return o.filePath.fsName; } catch (e2) { return ''; } } }
    try { for (var p = 0; p < app.xmlRuleProcessors.length; p++) { try { app.xmlRuleProcessors[p].endProcessingRuleSet(); } catch (e) {} } } catch (e) {}
    for (var x = app.xmlRuleProcessors.length - 1; x >= 0; x--) { try { app.xmlRuleProcessors[x].remove(); r.push('removed rule processor'); } catch (e) { r.push('rule processor: ' + e.message); } }
    for (var d = app.dialogs.length - 1; d >= 0; d--) if (/^Fixture/.test(app.dialogs[d].name)) { app.dialogs[d].destroy(); r.push('destroyed dialog'); }
    for (var m = app.scriptMenuActions.length - 1; m >= 0; m--) if (/^Fixture/.test(app.scriptMenuActions[m].name)) { app.scriptMenuActions[m].remove(); r.push('removed menu action'); }
    for (var t = app.idleTasks.length - 1; t >= 0; t--) if (/^(Fixture|idx-)/.test(app.idleTasks[t].name)) { app.idleTasks[t].remove(); r.push('removed idle task'); }
    for (var pr = app.preflightProfiles.length - 1; pr >= 0; pr--) if (/^Fixture/.test(app.preflightProfiles[pr].name)) { app.preflightProfiles[pr].remove(); r.push('removed preflight profile'); }
    for (var b = app.books.length - 1; b >= 0; b--) if (ours(pathOf(app.books[b]))) { app.books[b].close(SaveOptions.NO); r.push('closed book'); }
    for (var l = app.libraries.length - 1; l >= 0; l--) if (ours(pathOf(app.libraries[l]))) { app.libraries[l].close(); r.push('closed library'); }
    try { for (var g = 0; g < app.documents.length; g++) { try { app.documents[g].placeGuns.abortPlaceGun(); } catch (e) {} } } catch (e) {}
    for (var i = app.documents.length - 1; i >= 0; i--) {
        var doc = app.documents[i];
        if (ours(pathOf(doc)) || (doc.label === 'idx-async')) { try { doc.close(SaveOptions.NO); r.push('closed ' + doc.name); } catch (e) { r.push('close ' + e.message); } }
        else r.push('kept ' + doc.name);
    }
    app.scriptPreferences.userInteractionLevel = UserInteractionLevels.INTERACT_WITH_ALL;
    return r;
}
