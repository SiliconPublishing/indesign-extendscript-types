// Editions: InDesign desktop and InDesign Server script the same DOM, minus or plus a few hundred
// members. This model sorts every class, member and enumerator of the two measured dictionaries
// into what both have, what only one has, and what both have with a different signature, and
// derives the portable surface: what a script may call on either.
//
// Members are compared with their superclasses' members merged in (the dictionary lists a class's
// own members only), the way InDesign resolves them.
//
// A method whose parameters differ is portable up to the first parameter that differs in name or
// type: arguments are positional, so `app.open(f, OpenOptions.OPEN_COPY)` passes a showingWindow
// flag on desktop. Past that point it is portable only if every remaining parameter, on either
// side, is optional.

const optional = (p) => p.optional || /\(Optional\)/.test(p.desc ?? '');
const same = (a, b) => JSON.stringify(a) === JSON.stringify(b);
// A property's documented range (min/max) is not part of its type.
const propType = ({ min, max, ...t }) => t;

/** A class's members with its superclasses' merged in, by name. */
export function resolvedMembers(dict, name) {
    const chain = [];
    for (let k = dict[name]; k; k = k.superclass ? dict[k.superclass] : null) chain.push(k);
    const props = new Map();
    const methods = new Map();
    for (const k of chain.reverse()) {
        for (const p of k.props) props.set(p.name, p);
        for (const m of k.methods) methods.set(m.name, m);
    }
    return { props, methods };
}

const methodSignature = (m) => ({ params: m.params.map((p) => ({ name: p.name, type: p.type, optional: optional(p) })), returns: m.returns });

/** The portable form of a method both editions have with different parameters, or null. */
export function portableMethod(d, s) {
    if (!same(d.returns, s.returns)) return null;
    let n = 0;
    while (n < d.params.length && n < s.params.length && d.params[n].name === s.params[n].name && same(d.params[n].type, s.params[n].type)) n++;
    const rest = [...d.params.slice(n), ...s.params.slice(n)];
    if (rest.some((p) => !optional(p))) return null;
    return {
        ...d,
        params: d.params.slice(0, n).map((p, i) => ({ ...p, optional: optional(p) && optional(s.params[i]) })),
    };
}

/**
 * @param desktop dictionary.json classes of InDesign desktop
 * @param server  dictionary.json classes of InDesign Server
 */
export function editionModel(desktop, server) {
    const classes = new Map(); // name -> 'common' | 'desktop' | 'server'
    for (const n of Object.keys(desktop)) classes.set(n, server[n] ? 'common' : 'desktop');
    for (const n of Object.keys(server)) if (!desktop[n]) classes.set(n, 'server');

    // Class -> member -> { status: 'desktop' | 'server' | 'differs', kind, desktop?, server?, portable? }
    const members = new Map();
    // Enumeration -> { desktop: [enumerator names], server: [...] }
    const enumerators = new Map();
    for (const [name, status] of classes) {
        if (status !== 'common') continue;
        const d = desktop[name];
        const s = server[name];
        if (d.kind === 'enum') {
            const dn = Object.keys(d.enumValues);
            const sn = Object.keys(s.enumValues);
            const only = { desktop: dn.filter((x) => !(x in s.enumValues)), server: sn.filter((x) => !(x in d.enumValues)) };
            if (only.desktop.length || only.server.length) enumerators.set(name, only);
            continue;
        }
        const dm = resolvedMembers(desktop, name);
        const sm = resolvedMembers(server, name);
        const out = new Map();
        for (const kind of ['props', 'methods']) {
            for (const [m, dv] of dm[kind]) {
                const sv = sm[kind].get(m);
                if (!sv) out.set(m, { status: 'desktop', kind, desktop: dv });
                else if (kind === 'props' ? !same(propType(dv.type), propType(sv.type)) || dv.readonly !== sv.readonly : !same(methodSignature(dv), methodSignature(sv)))
                    out.set(m, { status: 'differs', kind, desktop: dv, server: sv, portable: kind === 'methods' ? portableMethod(dv, sv) : null });
            }
            for (const [m, sv] of sm[kind]) if (!dm[kind].has(m)) out.set(m, { status: 'server', kind, server: sv });
        }
        if (out.size) members.set(name, out);
    }
    return { classes, members, enumerators };
}

/**
 * The dictionary a portable script sees: classes both have; their common members; the portable
 * form of methods that differ (or nothing, when there is none); enumerators both have.
 */
export function portableDictionary(desktop, server, model = editionModel(desktop, server)) {
    const out = {};
    for (const [name, status] of model.classes) {
        if (status !== 'common') continue;
        const d = desktop[name];
        if (d.kind === 'enum') {
            const values = Object.fromEntries(Object.entries(d.enumValues).filter(([k]) => k in server[name].enumValues));
            out[name] = { ...d, enumValues: values };
            continue;
        }
        const diff = model.members.get(name) ?? new Map();
        out[name] = {
            ...d,
            props: d.props.filter((p) => !diff.has(p.name)),
            methods: d.methods.flatMap((m) => {
                const x = diff.get(m.name);
                if (!x) return [m];
                return x.portable ? [x.portable] : [];
            }),
        };
    }
    // Inherited members that differ were dropped from the class declaring them; nothing else to do,
    // since resolvedMembers merges the chain again.
    return out;
}
