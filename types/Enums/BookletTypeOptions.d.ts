/**
 * BookletTypeOptions.d.ts — indesign-uxp-types
 * Adobe InDesign 2026 (21.x) ExtendScript DOM declarations,
 * converted from indesign-uxp-types by tools/codemod.
 * Version: 1.0.0 · Updated: 2026-09-29
 * Author: Vlad Vladila (Krommatine Systems) · https://github.com/vamitul/indesign-uxp-types
 */
import type { Enumeration, Enumerator, __val} from "../_base/Enums";



declare const __BookletTypeOptions: unique symbol;


/*----------------------------------------/
/   Internal enumerator interfaces        /
/       -- Not exported --                /
/----------------------------------------*/


interface BookletTypeOptions extends Enumerator {
  /**
   * @internal **WARNING:** `__BookletTypeOptions` is a phantom type for compiler strictness only. 
   * It DOES NOT exist at runtime. Do not evaluate it in your logic.
   */
  readonly [__BookletTypeOptions]: never;
}


/**
 * Two up saddle stitch imposition.
 */
interface BookletTypeOptions_TWO_UP_SADDLE_STITCH extends BookletTypeOptions {
  /**
   * @internal **WARNING:** `__val` is a phantom type for compiler strictness only. 
   * It DOES NOT exist at runtime. Do not evaluate it in your logic.
   */
  readonly [__val]: 1110594387;
}

/**
 * Two up perfect bound imposition.
 */
interface BookletTypeOptions_TWO_UP_PERFECT_BOUND extends BookletTypeOptions {
  /**
   * @internal **WARNING:** `__val` is a phantom type for compiler strictness only. 
   * It DOES NOT exist at runtime. Do not evaluate it in your logic.
   */
  readonly [__val]: 1110593602;
}

/**
 * Two up consecutive imposition.
 */
interface BookletTypeOptions_TWO_UP_CONSECUTIVE extends BookletTypeOptions {
  /**
   * @internal **WARNING:** `__val` is a phantom type for compiler strictness only. 
   * It DOES NOT exist at runtime. Do not evaluate it in your logic.
   */
  readonly [__val]: 1110590291;
}

/**
 * Three up consecutive imposition.
 */
interface BookletTypeOptions_THREE_UP_CONSECUTIVE extends BookletTypeOptions {
  /**
   * @internal **WARNING:** `__val` is a phantom type for compiler strictness only. 
   * It DOES NOT exist at runtime. Do not evaluate it in your logic.
   */
  readonly [__val]: 1110655827;
}

/**
 * Four up consecutive imposition.
 */
interface BookletTypeOptions_FOUR_UP_CONSECUTIVE extends BookletTypeOptions {
  /**
   * @internal **WARNING:** `__val` is a phantom type for compiler strictness only. 
   * It DOES NOT exist at runtime. Do not evaluate it in your logic.
   */
  readonly [__val]: 1110721363;
}



/*----------------------------------------/
/                Exports                  /
/----------------------------------------*/

/**
 * How pages are imposed when printing a booklet — saddle-stitched, perfect-bound, or one of the
 * consecutive layouts.
 */
export declare namespace BookletTypeOptions {
/**
 * Two up saddle stitch imposition.
 */
type TWO_UP_SADDLE_STITCH = BookletTypeOptions_TWO_UP_SADDLE_STITCH;

/**
 * Two up perfect bound imposition.
 */
type TWO_UP_PERFECT_BOUND = BookletTypeOptions_TWO_UP_PERFECT_BOUND;

/**
 * Two up consecutive imposition.
 */
type TWO_UP_CONSECUTIVE = BookletTypeOptions_TWO_UP_CONSECUTIVE;

/**
 * Three up consecutive imposition.
 */
type THREE_UP_CONSECUTIVE = BookletTypeOptions_THREE_UP_CONSECUTIVE;

/**
 * Four up consecutive imposition.
 */
type FOUR_UP_CONSECUTIVE = BookletTypeOptions_FOUR_UP_CONSECUTIVE;

}
/**
 * How pages are imposed when printing a booklet — saddle-stitched, perfect-bound, or one of the
 * consecutive layouts.
 */
export declare const BookletTypeOptions: typeof Enumeration & {

  /**
   * Two up saddle stitch imposition.
   */
  readonly TWO_UP_SADDLE_STITCH: BookletTypeOptions_TWO_UP_SADDLE_STITCH;
  /**
   * Two up saddle stitch imposition.
   */
  readonly twoUpSaddleStitch: BookletTypeOptions_TWO_UP_SADDLE_STITCH;
  /**
   * Two up perfect bound imposition.
   */
  readonly TWO_UP_PERFECT_BOUND: BookletTypeOptions_TWO_UP_PERFECT_BOUND;
  /**
   * Two up perfect bound imposition.
   */
  readonly twoUpPerfectBound: BookletTypeOptions_TWO_UP_PERFECT_BOUND;
  /**
   * Two up consecutive imposition.
   */
  readonly TWO_UP_CONSECUTIVE: BookletTypeOptions_TWO_UP_CONSECUTIVE;
  /**
   * Two up consecutive imposition.
   */
  readonly twoUpConsecutive: BookletTypeOptions_TWO_UP_CONSECUTIVE;
  /**
   * Three up consecutive imposition.
   */
  readonly THREE_UP_CONSECUTIVE: BookletTypeOptions_THREE_UP_CONSECUTIVE;
  /**
   * Three up consecutive imposition.
   */
  readonly threeUpConsecutive: BookletTypeOptions_THREE_UP_CONSECUTIVE;
  /**
   * Four up consecutive imposition.
   */
  readonly FOUR_UP_CONSECUTIVE: BookletTypeOptions_FOUR_UP_CONSECUTIVE;
  /**
   * Four up consecutive imposition.
   */
  readonly fourUpConsecutive: BookletTypeOptions_FOUR_UP_CONSECUTIVE;
}
