/**
 * ScaleModes.d.ts — indesign-uxp-types
 * Adobe InDesign 2026 (21.x) ExtendScript DOM declarations,
 * converted from indesign-uxp-types by tools/codemod.
 * Version: 1.0.0 · Updated: 2026-09-29
 * Author: Vlad Vladila (Krommatine Systems) · https://github.com/vamitul/indesign-uxp-types
 */
import type { Enumeration, Enumerator, __val} from "../_base/Enums";



declare const __ScaleModes: unique symbol;


/*----------------------------------------/
/   Internal enumerator interfaces        /
/       -- Not exported --                /
/----------------------------------------*/


interface ScaleModes extends Enumerator {
  /**
   * @internal **WARNING:** `__ScaleModes` is a phantom type for compiler strictness only. 
   * It DOES NOT exist at runtime. Do not evaluate it in your logic.
   */
  readonly [__ScaleModes]: never;
}


/**
 * Scales the page width and height.
 */
interface ScaleModes_SCALE_WIDTH_HEIGHT extends ScaleModes {
  /**
   * @internal **WARNING:** `__val` is a phantom type for compiler strictness only. 
   * It DOES NOT exist at runtime. Do not evaluate it in your logic.
   */
  readonly [__val]: 1935898745;
}

/**
 * Scales the page to fit the paper. Note: Valid only when tile is false. 
 */
interface ScaleModes_SCALE_TO_FIT extends ScaleModes {
  /**
   * @internal **WARNING:** `__val` is a phantom type for compiler strictness only. 
   * It DOES NOT exist at runtime. Do not evaluate it in your logic.
   */
  readonly [__val]: 1935897702;
}



/*----------------------------------------/
/                Exports                  /
/----------------------------------------*/

/**
 * Whether the page is scaled by explicit width and height or shrunk to fit the paper.
 */
export declare namespace ScaleModes {
/**
 * Scales the page width and height.
 */
type SCALE_WIDTH_HEIGHT = ScaleModes_SCALE_WIDTH_HEIGHT;

/**
 * Scales the page to fit the paper. Note: Valid only when tile is false. 
 */
type SCALE_TO_FIT = ScaleModes_SCALE_TO_FIT;

}
/**
 * Whether the page is scaled by explicit width and height or shrunk to fit the paper.
 */
export declare const ScaleModes: typeof Enumeration & {

  /**
   * Scales the page width and height.
   */
  readonly SCALE_WIDTH_HEIGHT: ScaleModes_SCALE_WIDTH_HEIGHT;
  /**
   * Scales the page width and height.
   */
  readonly scaleWidthHeight: ScaleModes_SCALE_WIDTH_HEIGHT;
  /**
   * Scales the page to fit the paper. Note: Valid only when tile is false. 
   */
  readonly SCALE_TO_FIT: ScaleModes_SCALE_TO_FIT;
  /**
   * Scales the page to fit the paper. Note: Valid only when tile is false. 
   */
  readonly scaleToFit: ScaleModes_SCALE_TO_FIT;
}
