// Helpers shared by the dumps and tools/plugin.

/** Classes, members and enumerators in `after` that `before` lacks, as "Class.member" strings. */
export function surfaceAdded(before, after) {
    const out = [];
    for (const [name, c] of Object.entries(after)) {
        const b = before[name];
        if (!b) {
            out.push(name);
            continue;
        }
        for (const p of c.props) if (!b.props.some((q) => q.name === p.name)) out.push(`${name}.${p.name}`);
        for (const m of c.methods) if (!b.methods.some((q) => q.name === m.name)) out.push(`${name}.${m.name}()`);
        for (const e of Object.keys(c.enumValues ?? {})) if (!(e in (b.enumValues ?? {}))) out.push(`${name}.${e}`);
    }
    return out;
}

/** Alias spellings worth testing for an enumerator: camelCase and all-lowercase. */
export function aliasCandidates(name) {
    const parts = name.toLowerCase().split('_');
    const camel = parts[0] + parts.slice(1).map((p) => p.charAt(0).toUpperCase() + p.slice(1)).join('');
    return [...new Set([camel, parts.join('')])].filter((n) => n !== name);
}
