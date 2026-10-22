/**
 * Types.d.ts — indesign-uxp-types
 * Adobe InDesign 2026 (21.x) ExtendScript DOM declarations,
 * converted from indesign-uxp-types by tools/codemod.
 * Version: 1.0.0 · Updated: 2026-09-29
 * Author: Vlad Vladila (Krommatine Systems) · https://github.com/vamitul/indesign-uxp-types
 */
/**
 * A file to pass to InDesign: a path string, or an ExtendScript {@link File}.
 *
 * Setters and method parameters take either — `app.open(path)`, `app.open([fileA, fileB])`,
 * `doc.exportFile(format, file)` — and the file need not exist on disk yet.
 *
 * Reading a file-valued property back always gives a {@link File}.
 */
export type FilePath = string | File;

/**
 * A folder to pass to InDesign: a path string, or an ExtendScript {@link Folder}.
 *
 * Reading a folder-valued property back always gives a {@link Folder}.
 */
export type FolderPath = string | Folder;

/** A filesystem object handed back by the DOM: an ExtendScript {@link File} or {@link Folder}. */
export type Entry = File | Folder;

/** An ExtendScript file object (the global `File` class). */
export type File = globalThis.File;

/** An ExtendScript folder object (the global `Folder` class). */
export type Folder = globalThis.Folder;

/**
 * The pair-kerning method applied to text.
 *
 * `'Metrics'` uses the font's own kerning pairs, `'Optical'` lets InDesign judge the spacing
 * from the glyph shapes, and `'None'` disables kerning. A plugin may register further methods,
 * so any other string is accepted.
 */
export type KerningMethodName = 'Metrics' | 'Optical' | 'None' | (string & {});

/**
 * What {@link KerningMethodName} can read back, which is one value wider.
 *
 * An {@link InsertionPoint} whose `kerningValue` has been set by hand reports `'Manual'` —
 * and only an insertion point does, never the enclosing character, word or paragraph.
 *
 * **Do not assign `'Manual'`** — InDesign throws, even on a point that is already hand-kerned.
 * Set the insertion point's `kerningValue` instead and the state follows.
 */
export type KerningMethodValue = KerningMethodName | 'Manual';

/**
 * The composer that lays out a paragraph — the engine deciding line breaks and justification.
 *
 * **The spelling is exact and case-sensitive.** `'Adobe Single-line Composer'` is accepted and
 * `'Adobe Single-Line Composer'` is not; `'World-Ready'` must be hyphenated. A rejected name
 * throws `Invalid value for set property 'composer'` and leaves the paragraph unchanged.
 *
 * A plugin, or a CJK or Middle-Eastern install, may register further composers, so any other
 * string is accepted.
 */
export type ComposerName =
  | 'Adobe Paragraph Composer'
  | 'Adobe Single-line Composer'
  | 'Adobe World-Ready Paragraph Composer'
  | 'Adobe World-Ready Single-line Composer'
  | 'Adobe Japanese Paragraph Composer'
  | 'Adobe Japanese Single-line Composer'
  | (string & {});

/**
 * Represents a measurement value.
 * Can be a number (defaulting to the document's current units)
 * or a string specifying the unit (e.g., '12pt', '1in', '10mm').
 */
export type MeasurementValue = number | string;

/**
 * Represents coordinate arrays, bounds, or geometric bounds.
 * Formatted as [y1, x1, y2, x2].
 */
export type BoundsArray = [
  MeasurementValue,
  MeasurementValue,
  MeasurementValue,
  MeasurementValue,
];

/**
 * Whether a DOM object is a single resolved object or a plural proxy standing
 * in for many of them.
 */
export type Mode = 'single' | 'plural';

/**
 * What a member reads back as: the value itself on a single object, one value
 * per item on a plural proxy.
 */
export type Read<M extends Mode, V> = M extends 'plural' ? V[] : V;

/**
 * The retired plural-proxy shape. Nothing uses it; prefer the mode-parameterised
 * element type, as every collection in the package does.
 *
 * @deprecated Retired 2026-09-18 and referenced by nothing. Kept only so an
 * external consumer importing it does not break; it will go at 1.0.
 *
 * This was `BaseCollection`'s default `TPlural`. It derived both accessors from
 * `T[K]`, the *getter* type, so a plural proxy built from it would have lost every
 * widened setter, array-ified `isValid` and `constructorName` against [[R15]], and
 * flattened method overload sets. None of that ever shipped: all 242 collections
 * pass an explicit `TPlural` bound to the mode-parameterised element
 * (`Rectangle<TParent, 'plural'>`), which is the correct construction.
 *
 * Six external reviewers independently read this default as live and reported it
 * as a high-severity break. It was not live — but a collection that forgot
 * `TPlural` would have got exactly the shape they described, so the default is now
 * `never` and the parameter is effectively required.
 */
export type Plural<T> = {
  [K in keyof T as K extends 'getElements' | 'toSpecifier' ? never : K]: T[K] extends (...args: infer A) => infer R ?
    (...args: A) => R[]
  : T[K][] | T[K];
} & {
  getElements(): T[];
  toSpecifier(): string;
};

