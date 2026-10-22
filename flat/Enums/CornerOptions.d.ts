/**
 * CornerOptions.d.ts — indesign-uxp-types
 * Adobe InDesign 2026 (21.x) ExtendScript DOM declarations,
 * converted from indesign-uxp-types by tools/codemod.
 * Version: 1.0.0 · Updated: 2026-09-29
 * Author: Vlad Vladila (Krommatine Systems) · https://github.com/vamitul/indesign-uxp-types
 */
import type { Enumeration, Enumerator, __val} from "../_base/Enums";



declare const __CornerOptions: unique symbol;


/*----------------------------------------/
/   Internal enumerator interfaces        /
/       -- Not exported --                /
/----------------------------------------*/


interface CornerOptions extends Enumerator {
  /**
   * @internal **WARNING:** `__CornerOptions` is a phantom type for compiler strictness only. 
   * It DOES NOT exist at runtime. Do not evaluate it in your logic.
   */
  readonly [__CornerOptions]: never;
}


/**
 * No corner option.
 */
interface CornerOptions_NONE extends CornerOptions {
  /**
   * @internal **WARNING:** `__val` is a phantom type for compiler strictness only. 
   * It DOES NOT exist at runtime. Do not evaluate it in your logic.
   */
  readonly [__val]: 1852796517;
}

/**
 * Rounded corner option.
 */
interface CornerOptions_ROUNDED_CORNER extends CornerOptions {
  /**
   * @internal **WARNING:** `__val` is a phantom type for compiler strictness only. 
   * It DOES NOT exist at runtime. Do not evaluate it in your logic.
   */
  readonly [__val]: 1667592804;
}

/**
 * Inverted rounded corner option.
 */
interface CornerOptions_INVERSE_ROUNDED_CORNER extends CornerOptions {
  /**
   * @internal **WARNING:** `__val` is a phantom type for compiler strictness only. 
   * It DOES NOT exist at runtime. Do not evaluate it in your logic.
   */
  readonly [__val]: 1667591798;
}

/**
 * Inset corner option.
 */
interface CornerOptions_INSET_CORNER extends CornerOptions {
  /**
   * @internal **WARNING:** `__val` is a phantom type for compiler strictness only. 
   * It DOES NOT exist at runtime. Do not evaluate it in your logic.
   */
  readonly [__val]: 1667591795;
}

/**
 * Beveled corner option.
 */
interface CornerOptions_BEVEL_CORNER extends CornerOptions {
  /**
   * @internal **WARNING:** `__val` is a phantom type for compiler strictness only. 
   * It DOES NOT exist at runtime. Do not evaluate it in your logic.
   */
  readonly [__val]: 1667588726;
}

/**
 * Fancy corner option.
 */
interface CornerOptions_FANCY_CORNER extends CornerOptions {
  /**
   * @internal **WARNING:** `__val` is a phantom type for compiler strictness only. 
   * It DOES NOT exist at runtime. Do not evaluate it in your logic.
   */
  readonly [__val]: 1667589742;
}



/*----------------------------------------/
/                Exports                  /
/----------------------------------------*/

/**
 * The shape a frame corner is drawn with. Each corner carries its own value, so a frame may mix them.
 */
export declare namespace CornerOptions {
/**
 * No corner option.
 */
type NONE = CornerOptions_NONE;

/**
 * Rounded corner option.
 */
type ROUNDED_CORNER = CornerOptions_ROUNDED_CORNER;

/**
 * Inverted rounded corner option.
 */
type INVERSE_ROUNDED_CORNER = CornerOptions_INVERSE_ROUNDED_CORNER;

/**
 * Inset corner option.
 */
type INSET_CORNER = CornerOptions_INSET_CORNER;

/**
 * Beveled corner option.
 */
type BEVEL_CORNER = CornerOptions_BEVEL_CORNER;

/**
 * Fancy corner option.
 */
type FANCY_CORNER = CornerOptions_FANCY_CORNER;

}
export declare const CornerOptions: typeof Enumeration & {

  /**
   * No corner option.
   */
  readonly NONE: CornerOptions_NONE;
  /**
   * No corner option.
   */
  readonly none: CornerOptions_NONE;

  /**
   * Rounded corner option.
   */
  readonly ROUNDED_CORNER: CornerOptions_ROUNDED_CORNER;
  /**
   * Rounded corner option.
   */
  readonly roundedCorner: CornerOptions_ROUNDED_CORNER;
  /**
   * Inverted rounded corner option.
   */
  readonly INVERSE_ROUNDED_CORNER: CornerOptions_INVERSE_ROUNDED_CORNER;
  /**
   * Inverted rounded corner option.
   */
  readonly inverseRoundedCorner: CornerOptions_INVERSE_ROUNDED_CORNER;
  /**
   * Inset corner option.
   */
  readonly INSET_CORNER: CornerOptions_INSET_CORNER;
  /**
   * Inset corner option.
   */
  readonly insetCorner: CornerOptions_INSET_CORNER;
  /**
   * Beveled corner option.
   */
  readonly BEVEL_CORNER: CornerOptions_BEVEL_CORNER;
  /**
   * Beveled corner option.
   */
  readonly bevelCorner: CornerOptions_BEVEL_CORNER;
  /**
   * Fancy corner option.
   */
  readonly FANCY_CORNER: CornerOptions_FANCY_CORNER;
  /**
   * Fancy corner option.
   */
  readonly fancyCorner: CornerOptions_FANCY_CORNER;
}
