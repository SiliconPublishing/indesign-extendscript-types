/**
 * AlternatingFillsTypes.d.ts — indesign-uxp-types
 * Adobe InDesign 2026 (21.x) ExtendScript DOM declarations,
 * converted from indesign-uxp-types by tools/codemod.
 * Version: 1.0.0 · Updated: 2026-09-29
 * Author: Vlad Vladila (Krommatine Systems) · https://github.com/vamitul/indesign-uxp-types
 */
import type { Enumeration, Enumerator, __val} from "../_base/Enums";



declare const __AlternatingFillsTypes: unique symbol;


/*----------------------------------------/
/   Internal enumerator interfaces        /
/       -- Not exported --                /
/----------------------------------------*/


interface AlternatingFillsTypes extends Enumerator {
  /**
   * @internal **WARNING:** `__AlternatingFillsTypes` is a phantom type for compiler strictness only. 
   * It DOES NOT exist at runtime. Do not evaluate it in your logic.
   */
  readonly [__AlternatingFillsTypes]: never;
}


/**
 * No alternating pattern.
 */
interface AlternatingFillsTypes_NO_ALTERNATING_PATTERN extends AlternatingFillsTypes {
  /**
   * @internal **WARNING:** `__val` is a phantom type for compiler strictness only. 
   * It DOES NOT exist at runtime. Do not evaluate it in your logic.
   */
  readonly [__val]: 1097617007;
}

/**
 * Alternates row fills.
 */
interface AlternatingFillsTypes_ALTERNATING_ROWS extends AlternatingFillsTypes {
  /**
   * @internal **WARNING:** `__val` is a phantom type for compiler strictness only. 
   * It DOES NOT exist at runtime. Do not evaluate it in your logic.
   */
  readonly [__val]: 1097618039;
}

/**
 * Alternates column fills.
 */
interface AlternatingFillsTypes_ALTERNATING_COLUMNS extends AlternatingFillsTypes {
  /**
   * @internal **WARNING:** `__val` is a phantom type for compiler strictness only. 
   * It DOES NOT exist at runtime. Do not evaluate it in your logic.
   */
  readonly [__val]: 1097614188;
}



/*----------------------------------------/
/                Exports                  /
/----------------------------------------*/

/**
 * Pattern options for alternating fills.
 */
export declare namespace AlternatingFillsTypes {
/**
 * No alternating pattern.
 */
type NO_ALTERNATING_PATTERN = AlternatingFillsTypes_NO_ALTERNATING_PATTERN;

/**
 * Alternates row fills.
 */
type ALTERNATING_ROWS = AlternatingFillsTypes_ALTERNATING_ROWS;

/**
 * Alternates column fills.
 */
type ALTERNATING_COLUMNS = AlternatingFillsTypes_ALTERNATING_COLUMNS;

}
/**
 * Pattern options for alternating fills.
 */
export declare const AlternatingFillsTypes: typeof Enumeration & {

  /**
   * No alternating pattern.
   */
  readonly NO_ALTERNATING_PATTERN: AlternatingFillsTypes_NO_ALTERNATING_PATTERN;
  /**
   * No alternating pattern.
   */
  readonly noAlternatingPattern: AlternatingFillsTypes_NO_ALTERNATING_PATTERN;
  /**
   * Alternates row fills.
   */
  readonly ALTERNATING_ROWS: AlternatingFillsTypes_ALTERNATING_ROWS;
  /**
   * Alternates row fills.
   */
  readonly alternatingRows: AlternatingFillsTypes_ALTERNATING_ROWS;
  /**
   * Alternates column fills.
   */
  readonly ALTERNATING_COLUMNS: AlternatingFillsTypes_ALTERNATING_COLUMNS;
  /**
   * Alternates column fills.
   */
  readonly alternatingColumns: AlternatingFillsTypes_ALTERNATING_COLUMNS;
}
