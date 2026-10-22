/**
 * GradientType.d.ts — indesign-uxp-types
 * Adobe InDesign 2026 (21.x) ExtendScript DOM declarations,
 * converted from indesign-uxp-types by tools/codemod.
 * Version: 1.0.0 · Updated: 2026-09-29
 * Author: Vlad Vladila (Krommatine Systems) · https://github.com/vamitul/indesign-uxp-types
 */
import type { Enumeration, Enumerator, __val} from "../_base/Enums";



declare const __GradientType: unique symbol;


/*----------------------------------------/
/   Internal enumerator interfaces        /
/       -- Not exported --                /
/----------------------------------------*/


interface GradientType extends Enumerator {
  /**
   * @internal **WARNING:** `__GradientType` is a phantom type for compiler strictness only. 
   * It DOES NOT exist at runtime. Do not evaluate it in your logic.
   */
  readonly [__GradientType]: never;
}


/**
 * A linear gradient.
 */
interface GradientType_LINEAR extends GradientType {
  /**
   * @internal **WARNING:** `__val` is a phantom type for compiler strictness only. 
   * It DOES NOT exist at runtime. Do not evaluate it in your logic.
   */
  readonly [__val]: 1635282023;
}

/**
 * A radial gradient.
 */
interface GradientType_RADIAL extends GradientType {
  /**
   * @internal **WARNING:** `__val` is a phantom type for compiler strictness only. 
   * It DOES NOT exist at runtime. Do not evaluate it in your logic.
   */
  readonly [__val]: 1918985319;
}



/*----------------------------------------/
/                Exports                  /
/----------------------------------------*/

/**
 * Gradient type options.
 */
export declare namespace GradientType {
/**
 * A linear gradient.
 */
type LINEAR = GradientType_LINEAR;

/**
 * A radial gradient.
 */
type RADIAL = GradientType_RADIAL;

}
/**
 * Gradient type options.
 */
export declare const GradientType: typeof Enumeration & {

  /**
   * A linear gradient.
   */
  readonly LINEAR: GradientType_LINEAR;
  /**
   * A linear gradient.
   */
  readonly linear: GradientType_LINEAR;

  /**
   * A radial gradient.
   */
  readonly RADIAL: GradientType_RADIAL;
  /**
   * A radial gradient.
   */
  readonly radial: GradientType_RADIAL;

}
