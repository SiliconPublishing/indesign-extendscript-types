/**
 * ConditionIndicatorMethod.d.ts — indesign-uxp-types
 * Adobe InDesign 2026 (21.x) ExtendScript DOM declarations,
 * converted from indesign-uxp-types by tools/codemod.
 * Version: 1.0.0 · Updated: 2026-09-29
 * Author: Vlad Vladila (Krommatine Systems) · https://github.com/vamitul/indesign-uxp-types
 */
import type { Enumeration, Enumerator, __val} from "../_base/Enums";



declare const __ConditionIndicatorMethod: unique symbol;


/*----------------------------------------/
/   Internal enumerator interfaces        /
/       -- Not exported --                /
/----------------------------------------*/


interface ConditionIndicatorMethod extends Enumerator {
  /**
   * @internal **WARNING:** `__ConditionIndicatorMethod` is a phantom type for compiler strictness only. 
   * It DOES NOT exist at runtime. Do not evaluate it in your logic.
   */
  readonly [__ConditionIndicatorMethod]: never;
}


/**
 * Underlines conditional text.
 */
interface ConditionIndicatorMethod_USE_UNDERLINE extends ConditionIndicatorMethod {
  /**
   * @internal **WARNING:** `__val` is a phantom type for compiler strictness only. 
   * It DOES NOT exist at runtime. Do not evaluate it in your logic.
   */
  readonly [__val]: 1700097644;
}

/**
 * Highlights conditional text.
 */
interface ConditionIndicatorMethod_USE_HIGHLIGHT extends ConditionIndicatorMethod {
  /**
   * @internal **WARNING:** `__val` is a phantom type for compiler strictness only. 
   * It DOES NOT exist at runtime. Do not evaluate it in your logic.
   */
  readonly [__val]: 1699244391;
}



/*----------------------------------------/
/                Exports                  /
/----------------------------------------*/

/**
 * Options for the condition indicator method.
 */
export declare namespace ConditionIndicatorMethod {
/**
 * Underlines conditional text.
 */
type USE_UNDERLINE = ConditionIndicatorMethod_USE_UNDERLINE;

/**
 * Highlights conditional text.
 */
type USE_HIGHLIGHT = ConditionIndicatorMethod_USE_HIGHLIGHT;

}
/**
 * Options for the condition indicator method.
 */
export declare const ConditionIndicatorMethod: typeof Enumeration & {

  /**
   * Underlines conditional text.
   */
  readonly USE_UNDERLINE: ConditionIndicatorMethod_USE_UNDERLINE;
  /**
   * Underlines conditional text.
   */
  readonly useUnderline: ConditionIndicatorMethod_USE_UNDERLINE;
  /**
   * Highlights conditional text.
   */
  readonly USE_HIGHLIGHT: ConditionIndicatorMethod_USE_HIGHLIGHT;
  /**
   * Highlights conditional text.
   */
  readonly useHighlight: ConditionIndicatorMethod_USE_HIGHLIGHT;
}
