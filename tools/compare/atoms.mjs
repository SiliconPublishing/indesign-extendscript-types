// Type "atoms": the shared vocabulary in which tools/compare and the codemod's runtime widening
// describe types (number, string, boolean, null, void, File, Folder, Function, array, object,
// any, enum:X, class:X). Works with the TypeScript instance passed in, so it serves both the
// `typescript` package and ts-morph's bundled copy.

export function superclasses(name, dict) {
    const out = new Set();
    for (let c = dict[name]; c?.superclass; c = dict[c.superclass]) out.add(c.superclass);
    return out;
}

export class TypeAtoms {
    constructor(ts, checker, enumNames) {
        this.ts = ts;
        this.checker = checker;
        this.enumNames = enumNames;
    }
    /** The atoms a declared type covers. */
    atoms(type, out = new Set(), depth = 0) {
        const ts = this.ts;
        const c = this.checker;
        const f = type.flags;
        if (depth > 6) return out;
        if (f & (ts.TypeFlags.Any | ts.TypeFlags.Unknown)) out.add('any');
        else if (f & ts.TypeFlags.NumberLike) out.add('number');
        else if (f & ts.TypeFlags.StringLike) out.add('string');
        else if (f & ts.TypeFlags.BooleanLike) out.add('boolean');
        else if (f & (ts.TypeFlags.Void | ts.TypeFlags.Undefined)) out.add('void');
        else if (f & ts.TypeFlags.Null) out.add('null');
        else if (f & ts.TypeFlags.Never) out.add('never');
        else if (type.isUnion()) for (const t of type.types) this.atoms(t, out, depth + 1);
        else if (type.isIntersection()) {
            // `string & {}` style brands and enum-member intersections: take the meaningful part.
            for (const t of type.types) this.atoms(t, out, depth + 1);
            out.delete('object');
        } else if (c.isArrayType(type) || c.isTupleType(type)) out.add('array');
        else if (f & ts.TypeFlags.TypeParameter) {
            // Only uninstantiated declarations (a setter's `value: number | NSet`) still hold type
            // parameters; an unconstrained one adds nothing (NSet defaults to never), rather than
            // `any`, which would hide every gap in generic setters.
            const k = c.getBaseConstraintOfType(type);
            if (k && k !== type && !(k.flags & ts.TypeFlags.Unknown)) this.atoms(k, out, depth + 1);
        } else if (f & ts.TypeFlags.Object) {
            // A plural proxy (`X<..., 'plural'>`, or a flat XPlural) stands for an array of X.
            const args = c.getTypeArguments?.(type) ?? [];
            const aliasArgs = type.aliasTypeArguments ?? [];
            if ([...args, ...aliasArgs].some((a) => a.isStringLiteral?.() && a.value === 'plural') || /Plural$/.test(type.getSymbol()?.getName() ?? ''))
                out.add('array');
            const sym = type.aliasSymbol ?? type.getSymbol();
            const name = sym?.getName();
            if (name === 'File' || name === 'Folder' || name === 'Date') out.add(name);
            else if (name === 'Function' || type.getCallSignatures().length) out.add('Function');
            else if (name && this.enumNames.has(name)) out.add(`enum:${name}`);
            else if (name && /_[A-Z0-9_]+$/.test(name) && this.enumNames.has(name.replace(/_[A-Z0-9_]+$/, '')))
                out.add(`enum:${name.replace(/_[A-Z0-9_]+$/, '')}`);
            else if (name && !name.startsWith('__') && name !== '__type' && /^[A-Z]/.test(name)) out.add(`class:${name}`);
            else out.add('object');
        } else out.add('object');
        return out;
    }
}

/** True when the dictionary atom is covered by one of the declared atoms. */
export function covered(atom, declared, dict) {
    if (declared.has('any') || declared.has(atom)) return true;
    if (atom === 'object' && [...declared].some((d) => d.startsWith('class:') || d === 'object')) return true;
    if (atom.startsWith('class:')) {
        // Declared as subclasses of the dictionary class (e.g. a union of page-item kinds).
        const want = atom.slice(6);
        const classes = [...declared].filter((d) => d.startsWith('class:')).map((d) => d.slice(6));
        if (classes.some((c) => superclasses(c, dict).has(want))) return true;
        // Declared as a superclass (Text where the dictionary says Character).
        if ([...superclasses(want, dict)].some((s) => declared.has(`class:${s}`))) return true;
        if (declared.has('object')) return true;
    }
    if (atom === 'File' && declared.has('string')) return false;
    return false;
}

/** Is an observed runtime value (runtime.jsx's atom) allowed by the declared atoms? */
export function observedCovered(seen, declared, dict) {
    if (declared.has('any')) return true;
    if (seen === 'undefined') return declared.has('void');
    if (seen.startsWith('array<')) return declared.has('array');
    if (seen.startsWith('enum:')) {
        const [, value, name] = seen.split(':');
        return [...declared].some((d) => d.startsWith('enum:') && dict[d.slice(5)]?.enumValues?.[name] === Number(value));
    }
    if (['number', 'string', 'boolean', 'null', 'File', 'Folder', 'Function', 'Date'].includes(seen)) return declared.has(seen);
    if (seen === 'Object') return declared.has('object');
    // A DOM object or collection.
    return declared.has(`class:${seen}`) || superclasses(seen, dict).size > 0 && [...superclasses(seen, dict)].some((s) => declared.has(`class:${s}`)) || declared.has('object');
}
