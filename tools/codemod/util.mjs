// Shared helpers for codemod rules.
import { dirname, join, relative } from 'node:path';

/** Adds `import type { name } from '<modulePath relative to src>'` unless the name is already in scope. */
export function ensureImport(sf, name, modulePath, src) {
    if (sf.getImportDeclarations().some((i) => i.getNamedImports().some((n) => n.getName() === name))) return;
    if (sf.getInterface(name) || sf.getTypeAlias(name) || sf.getVariableDeclaration(name)) return;
    let spec = relative(dirname(sf.getFilePath()), join(src, modulePath));
    if (!spec.startsWith('.')) spec = `./${spec}`;
    sf.addImportDeclaration({ isTypeOnly: true, namedImports: [name], moduleSpecifier: spec });
}
