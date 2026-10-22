// Codemod rule: give every DOM class an empty, augmentable base in the global InDesignPlugins
// namespace, so that a plugin's declarations (tools/plugin) can add members to InDesign's own
// classes:
//
//   export interface Application<M ...> extends ..., InDesignPlugins.Application<M> { ... }
//
//   // in a plugin's declarations:
//   declare namespace InDesignPlugins {
//     interface Application<M extends InDesign.Mode = 'single'> { readonly myThing: InDesign.Read<M, string>; }
//   }
//
// The hook is generic over the mode M where the class is, so plugin members can use Read<M, V>
// and read back as arrays on everyItem() proxies. The flattener keeps these bases (it does not
// inline them), so the flat tree is extensible too. hookDeclarations() gives globals.d.ts the
// empty interfaces.
import { join } from 'node:path';

/** Classes that get a hook: every non-enumeration dictionary class the tree declares. */
export function addPluginHooks(project, src, dict) {
    const hooks = [];
    for (const c of Object.values(dict)) {
        if (c.kind === 'enum') continue;
        const sf = project.getSourceFile(join(src, `${c.name}.d.ts`));
        const iface = sf?.getInterface(c.name);
        if (!iface) continue;
        const hasMode = !!iface.getTypeParameter('M');
        iface.addExtends(`InDesignPlugins.${c.name}${hasMode ? '<M>' : ''}`);
        hooks.push({ name: c.name, hasMode });
    }
    return hooks;
}

export function hookDeclarations(hooks) {
    return hooks
        .sort((a, b) => a.name.localeCompare(b.name))
        .map((h) => `    interface ${h.name}${h.hasMode ? `<M extends DOM.Mode = 'single'>` : ''} {}`)
        .join('\n');
}
