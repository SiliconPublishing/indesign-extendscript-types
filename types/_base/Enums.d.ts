/**
 * Enums.d.ts — indesign-uxp-types
 * Adobe InDesign 2026 (21.x) ExtendScript DOM declarations,
 * converted from indesign-uxp-types by tools/codemod.
 * Version: 1.0.0 · Updated: 2026-09-29
 * Author: Vlad Vladila (Krommatine Systems) · https://github.com/vamitul/indesign-uxp-types
 */
import type { NothingEnum } from '../Enums/NothingEnum';
/**
 * The base of every InDesign enumeration value.
 *
 * In ExtendScript an enumerator is an `Enumerator` object whose `valueOf()` is its numeric
 * value, so `===` works both between enumerators (`x === SaveOptions.NO`) and against the number
 * (`SaveOptions.NO === 1852776480`). `String(e)` gives its name, such as `"NO"`.
 *
 * Properties typed as an enumeration also accept the bare number when set, but not the name
 * string: `viewPreferences.horizontalMeasurementUnits = "POINTS"` throws.
 */
export declare class Enumerator {
  /** The enumerator's name, such as `"NO"`. */
  toString(): string;
  /** The enumerator's numeric value. */
  valueOf(): number;
  /** Reflection on this object. */
  readonly reflect: Reflection;
}

/**
 * The base of every InDesign enumeration (the object holding the enumerators, such as
 * `SaveOptions`).
 */
export declare class Enumeration {
  /** Reflection on the enumeration: its enumerators are listed as properties. */
  static readonly reflect: Reflection;
}

/**
 * Unique value of each enumeration.
 */
export declare const __val: unique symbol;
