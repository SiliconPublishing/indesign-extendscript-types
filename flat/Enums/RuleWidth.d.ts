/**
 * RuleWidth.d.ts — indesign-uxp-types
 * Adobe InDesign 2026 (21.x) ExtendScript DOM declarations,
 * converted from indesign-uxp-types by tools/codemod.
 * Version: 1.0.0 · Updated: 2026-09-29
 * Author: Vlad Vladila (Krommatine Systems) · https://github.com/vamitul/indesign-uxp-types
 */
import type { Enumeration, Enumerator, __val} from "../_base/Enums";



declare const __RuleWidth: unique symbol;


/*----------------------------------------/
/   Internal enumerator interfaces        /
/       -- Not exported --                /
/----------------------------------------*/


interface RuleWidth extends Enumerator {
  /**
   * @internal **WARNING:** `__RuleWidth` is a phantom type for compiler strictness only. 
   * It DOES NOT exist at runtime. Do not evaluate it in your logic.
   */
  readonly [__RuleWidth]: never;
}


/**
 * Makes the paragraph rule above the width of the first line of text in the paragraph.
 */
interface RuleWidth_TEXT_WIDTH extends RuleWidth {
  /**
   * @internal **WARNING:** `__val` is a phantom type for compiler strictness only. 
   * It DOES NOT exist at runtime. Do not evaluate it in your logic.
   */
  readonly [__val]: 1886681207;
}

/**
 * Makes the rule the width of the column.
 */
interface RuleWidth_COLUMN_WIDTH extends RuleWidth {
  /**
   * @internal **WARNING:** `__val` is a phantom type for compiler strictness only. 
   * It DOES NOT exist at runtime. Do not evaluate it in your logic.
   */
  readonly [__val]: 1265399652;
}



/*----------------------------------------/
/                Exports                  /
/----------------------------------------*/

/**
 * Options for specifying an object on which to base the width of the paragraph rule above.
 */
export declare namespace RuleWidth {
/**
 * Makes the paragraph rule above the width of the first line of text in the paragraph.
 */
type TEXT_WIDTH = RuleWidth_TEXT_WIDTH;

/**
 * Makes the rule the width of the column.
 */
type COLUMN_WIDTH = RuleWidth_COLUMN_WIDTH;

}
/**
 * Options for specifying an object on which to base the width of the paragraph rule above.
 */
export declare const RuleWidth: typeof Enumeration & {

  /**
   * Makes the paragraph rule above the width of the first line of text in the paragraph.
   */
  readonly TEXT_WIDTH: RuleWidth_TEXT_WIDTH;
  /**
   * Makes the paragraph rule above the width of the first line of text in the paragraph.
   */
  readonly textWidth: RuleWidth_TEXT_WIDTH;
  /**
   * Makes the rule the width of the column.
   */
  readonly COLUMN_WIDTH: RuleWidth_COLUMN_WIDTH;
  /**
   * Makes the rule the width of the column.
   */
  readonly columnWidth: RuleWidth_COLUMN_WIDTH;
}
