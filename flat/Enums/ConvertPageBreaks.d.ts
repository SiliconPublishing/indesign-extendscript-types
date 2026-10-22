/**
 * ConvertPageBreaks.d.ts — indesign-uxp-types
 * Adobe InDesign 2026 (21.x) ExtendScript DOM declarations,
 * converted from indesign-uxp-types by tools/codemod.
 * Version: 1.0.0 · Updated: 2026-09-29
 * Author: Vlad Vladila (Krommatine Systems) · https://github.com/vamitul/indesign-uxp-types
 */
import type { Enumeration, Enumerator, __val} from "../_base/Enums";



declare const __ConvertPageBreaks: unique symbol;


/*----------------------------------------/
/   Internal enumerator interfaces        /
/       -- Not exported --                /
/----------------------------------------*/


interface ConvertPageBreaks extends Enumerator {
  /**
   * @internal **WARNING:** `__ConvertPageBreaks` is a phantom type for compiler strictness only. 
   * It DOES NOT exist at runtime. Do not evaluate it in your logic.
   */
  readonly [__ConvertPageBreaks]: never;
}


/**
 * Does not preserve page breaks; allows text to flow.
 */
interface ConvertPageBreaks_NONE extends ConvertPageBreaks {
  /**
   * @internal **WARNING:** `__val` is a phantom type for compiler strictness only. 
   * It DOES NOT exist at runtime. Do not evaluate it in your logic.
   */
  readonly [__val]: 1852796517;
}

/**
 * Preserves page breaks.
 */
interface ConvertPageBreaks_PAGE_BREAK extends ConvertPageBreaks {
  /**
   * @internal **WARNING:** `__val` is a phantom type for compiler strictness only. 
   * It DOES NOT exist at runtime. Do not evaluate it in your logic.
   */
  readonly [__val]: 1397778242;
}

/**
 * Converts manual page breaks to column breaks.
 */
interface ConvertPageBreaks_COLUMN_BREAK extends ConvertPageBreaks {
  /**
   * @internal **WARNING:** `__val` is a phantom type for compiler strictness only. 
   * It DOES NOT exist at runtime. Do not evaluate it in your logic.
   */
  readonly [__val]: 1396927554;
}



/*----------------------------------------/
/                Exports                  /
/----------------------------------------*/

/**
 * Options for converting manual page breaks.
 */
export declare namespace ConvertPageBreaks {
/**
 * Does not preserve page breaks; allows text to flow.
 */
type NONE = ConvertPageBreaks_NONE;

/**
 * Preserves page breaks.
 */
type PAGE_BREAK = ConvertPageBreaks_PAGE_BREAK;

/**
 * Converts manual page breaks to column breaks.
 */
type COLUMN_BREAK = ConvertPageBreaks_COLUMN_BREAK;

}
/**
 * Options for converting manual page breaks.
 */
export declare const ConvertPageBreaks: typeof Enumeration & {

  /**
   * Does not preserve page breaks; allows text to flow.
   */
  readonly NONE: ConvertPageBreaks_NONE;
  /**
   * Does not preserve page breaks; allows text to flow.
   */
  readonly none: ConvertPageBreaks_NONE;

  /**
   * Preserves page breaks.
   */
  readonly PAGE_BREAK: ConvertPageBreaks_PAGE_BREAK;
  /**
   * Preserves page breaks.
   */
  readonly pageBreak: ConvertPageBreaks_PAGE_BREAK;
  /**
   * Converts manual page breaks to column breaks.
   */
  readonly COLUMN_BREAK: ConvertPageBreaks_COLUMN_BREAK;
  /**
   * Converts manual page breaks to column breaks.
   */
  readonly columnBreak: ConvertPageBreaks_COLUMN_BREAK;
}
