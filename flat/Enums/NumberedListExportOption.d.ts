/**
 * NumberedListExportOption.d.ts — indesign-uxp-types
 * Adobe InDesign 2026 (21.x) ExtendScript DOM declarations,
 * converted from indesign-uxp-types by tools/codemod.
 * Version: 1.0.0 · Updated: 2026-09-29
 * Author: Vlad Vladila (Krommatine Systems) · https://github.com/vamitul/indesign-uxp-types
 */
import type { Enumeration, Enumerator, __val} from "../_base/Enums";



declare const __NumberedListExportOption: unique symbol;


/*----------------------------------------/
/   Internal enumerator interfaces        /
/       -- Not exported --                /
/----------------------------------------*/


interface NumberedListExportOption extends Enumerator {
  /**
   * @internal **WARNING:** `__NumberedListExportOption` is a phantom type for compiler strictness only. 
   * It DOES NOT exist at runtime. Do not evaluate it in your logic.
   */
  readonly [__NumberedListExportOption]: never;
}


/**
 * Maps to an HTML ordered list.
 */
interface NumberedListExportOption_ORDERED_LIST extends NumberedListExportOption {
  /**
   * @internal **WARNING:** `__val` is a phantom type for compiler strictness only. 
   * It DOES NOT exist at runtime. Do not evaluate it in your logic.
   */
  readonly [__val]: 1700949359;
}

/**
 * Converts to text.
 */
interface NumberedListExportOption_AS_TEXT extends NumberedListExportOption {
  /**
   * @internal **WARNING:** `__val` is a phantom type for compiler strictness only. 
   * It DOES NOT exist at runtime. Do not evaluate it in your logic.
   */
  readonly [__val]: 1700946804;
}



/*----------------------------------------/
/                Exports                  /
/----------------------------------------*/

/**
 * Options for exporting numbered lists.
 */
export declare namespace NumberedListExportOption {
/**
 * Maps to an HTML ordered list.
 */
type ORDERED_LIST = NumberedListExportOption_ORDERED_LIST;

/**
 * Converts to text.
 */
type AS_TEXT = NumberedListExportOption_AS_TEXT;

}
/**
 * Options for exporting numbered lists.
 */
export declare const NumberedListExportOption: typeof Enumeration & {

  /**
   * Maps to an HTML ordered list.
   */
  readonly ORDERED_LIST: NumberedListExportOption_ORDERED_LIST;
  /**
   * Maps to an HTML ordered list.
   */
  readonly orderedList: NumberedListExportOption_ORDERED_LIST;
  /**
   * Converts to text.
   */
  readonly AS_TEXT: NumberedListExportOption_AS_TEXT;
  /**
   * Converts to text.
   */
  readonly asText: NumberedListExportOption_AS_TEXT;
}
