/**
 * HorizontalOrVertical.d.ts — indesign-uxp-types
 * Adobe InDesign 2026 (21.x) ExtendScript DOM declarations,
 * converted from indesign-uxp-types by tools/codemod.
 * Version: 1.0.0 · Updated: 2026-09-29
 * Author: Vlad Vladila (Krommatine Systems) · https://github.com/vamitul/indesign-uxp-types
 */
import type { Enumeration, Enumerator, __val} from "../_base/Enums";



declare const __HorizontalOrVertical: unique symbol;


/*----------------------------------------/
/   Internal enumerator interfaces        /
/       -- Not exported --                /
/----------------------------------------*/


interface HorizontalOrVertical extends Enumerator {
  /**
   * @internal **WARNING:** `__HorizontalOrVertical` is a phantom type for compiler strictness only. 
   * It DOES NOT exist at runtime. Do not evaluate it in your logic.
   */
  readonly [__HorizontalOrVertical]: never;
}


/**
 * Horizontal orientation.
 */
interface HorizontalOrVertical_HORIZONTAL extends HorizontalOrVertical {
  /**
   * @internal **WARNING:** `__val` is a phantom type for compiler strictness only. 
   * It DOES NOT exist at runtime. Do not evaluate it in your logic.
   */
  readonly [__val]: 1752134266;
}

/**
 * Vertical orientation.
 */
interface HorizontalOrVertical_VERTICAL extends HorizontalOrVertical {
  /**
   * @internal **WARNING:** `__val` is a phantom type for compiler strictness only. 
   * It DOES NOT exist at runtime. Do not evaluate it in your logic.
   */
  readonly [__val]: 1986359924;
}



/*----------------------------------------/
/                Exports                  /
/----------------------------------------*/

/**
 * Orientation options.
 */
export declare namespace HorizontalOrVertical {
/**
 * Horizontal orientation.
 */
type HORIZONTAL = HorizontalOrVertical_HORIZONTAL;

/**
 * Vertical orientation.
 */
type VERTICAL = HorizontalOrVertical_VERTICAL;

}
/**
 * Orientation options.
 */
export declare const HorizontalOrVertical: typeof Enumeration & {

  /**
   * Horizontal orientation.
   */
  readonly HORIZONTAL: HorizontalOrVertical_HORIZONTAL;
  /**
   * Horizontal orientation.
   */
  readonly horizontal: HorizontalOrVertical_HORIZONTAL;

  /**
   * Vertical orientation.
   */
  readonly VERTICAL: HorizontalOrVertical_VERTICAL;
  /**
   * Vertical orientation.
   */
  readonly vertical: HorizontalOrVertical_VERTICAL;

}
