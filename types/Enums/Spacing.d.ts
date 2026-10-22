/**
 * Spacing.d.ts — indesign-uxp-types
 * Adobe InDesign 2026 (21.x) ExtendScript DOM declarations,
 * converted from indesign-uxp-types by tools/codemod.
 * Version: 1.0.0 · Updated: 2026-09-29
 * Author: Vlad Vladila (Krommatine Systems) · https://github.com/vamitul/indesign-uxp-types
 */
import type { Enumeration, Enumerator, __val} from "../_base/Enums";



declare const __Spacing: unique symbol;


/*----------------------------------------/
/   Internal enumerator interfaces        /
/       -- Not exported --                /
/----------------------------------------*/


interface Spacing extends Enumerator {
  /**
   * @internal **WARNING:** `__Spacing` is a phantom type for compiler strictness only. 
   * It DOES NOT exist at runtime. Do not evaluate it in your logic.
   */
  readonly [__Spacing]: never;
}


/**
 * Ignore the space between paragraphs using the same style.
 */
interface Spacing_SETIGNORE extends Spacing {
  /**
   * @internal **WARNING:** `__val` is a phantom type for compiler strictness only. 
   * It DOES NOT exist at runtime. Do not evaluate it in your logic.
   */
  readonly [__val]: 1768386162;
}



/*----------------------------------------/
/                Exports                  /
/----------------------------------------*/

/**
 * A single flag value meaning the space between paragraphs of the same style is ignored, used
 * in place of an explicit measurement.
 */
export declare namespace Spacing {
/**
 * Ignore the space between paragraphs using the same style.
 */
type SETIGNORE = Spacing_SETIGNORE;

}
/**
 * A single flag value meaning the space between paragraphs of the same style is ignored, used
 * in place of an explicit measurement.
 */
export declare const Spacing: typeof Enumeration & {

  /**
   * Ignore the space between paragraphs using the same style.
   */
  readonly SETIGNORE: Spacing_SETIGNORE;
  /**
   * Ignore the space between paragraphs using the same style.
   */
  readonly setignore: Spacing_SETIGNORE;

}
