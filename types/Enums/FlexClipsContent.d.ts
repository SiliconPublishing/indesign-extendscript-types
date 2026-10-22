/**
 * FlexClipsContent.d.ts — indesign-uxp-types
 * Adobe InDesign 2026 (21.x) ExtendScript DOM declarations,
 * converted from indesign-uxp-types by tools/codemod.
 * Version: 1.0.0 · Updated: 2026-09-29
 * Author: Vlad Vladila (Krommatine Systems) · https://github.com/vamitul/indesign-uxp-types
 */
import type { Enumeration, Enumerator, __val} from "../_base/Enums";



declare const __FlexClipsContent: unique symbol;


/*----------------------------------------/
/   Internal enumerator interfaces        /
/       -- Not exported --                /
/----------------------------------------*/


interface FlexClipsContent extends Enumerator {
  /**
   * @internal **WARNING:** `__FlexClipsContent` is a phantom type for compiler strictness only. 
   * It DOES NOT exist at runtime. Do not evaluate it in your logic.
   */
  readonly [__FlexClipsContent]: never;
}


/**
 * Does not clip content.
 */
interface FlexClipsContent_DONT_CLIP extends FlexClipsContent {
  /**
   * @internal **WARNING:** `__val` is a phantom type for compiler strictness only. 
   * It DOES NOT exist at runtime. Do not evaluate it in your logic.
   */
  readonly [__val]: 1715684451;
}

/**
 * Clips content.
 */
interface FlexClipsContent_CLIP extends FlexClipsContent {
  /**
   * @internal **WARNING:** `__val` is a phantom type for compiler strictness only. 
   * It DOES NOT exist at runtime. Do not evaluate it in your logic.
   */
  readonly [__val]: 1715684204;
}



/*----------------------------------------/
/                Exports                  /
/----------------------------------------*/

/**
 * Whether the flex container clips its content.
 */
export declare namespace FlexClipsContent {
/**
 * Does not clip content.
 */
type DONT_CLIP = FlexClipsContent_DONT_CLIP;

/**
 * Clips content.
 */
type CLIP = FlexClipsContent_CLIP;

}
/**
 * Whether the flex container clips its content.
 */
export declare const FlexClipsContent: typeof Enumeration & {

  /**
   * Does not clip content.
   */
  readonly DONT_CLIP: FlexClipsContent_DONT_CLIP;
  /**
   * Does not clip content.
   */
  readonly dontClip: FlexClipsContent_DONT_CLIP;
  /**
   * Clips content.
   */
  readonly CLIP: FlexClipsContent_CLIP;
  /**
   * Clips content.
   */
  readonly clip: FlexClipsContent_CLIP;

}
