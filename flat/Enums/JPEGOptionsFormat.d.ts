/**
 * JPEGOptionsFormat.d.ts — indesign-uxp-types
 * Adobe InDesign 2026 (21.x) ExtendScript DOM declarations,
 * converted from indesign-uxp-types by tools/codemod.
 * Version: 1.0.0 · Updated: 2026-09-29
 * Author: Vlad Vladila (Krommatine Systems) · https://github.com/vamitul/indesign-uxp-types
 */
import type { Enumeration, Enumerator, __val} from "../_base/Enums";



declare const __JPEGOptionsFormat: unique symbol;


/*----------------------------------------/
/   Internal enumerator interfaces        /
/       -- Not exported --                /
/----------------------------------------*/


interface JPEGOptionsFormat extends Enumerator {
  /**
   * @internal **WARNING:** `__JPEGOptionsFormat` is a phantom type for compiler strictness only. 
   * It DOES NOT exist at runtime. Do not evaluate it in your logic.
   */
  readonly [__JPEGOptionsFormat]: never;
}


/**
 * Uses baseline encoding to download the image in one pass.
 */
interface JPEGOptionsFormat_BASELINE_ENCODING extends JPEGOptionsFormat {
  /**
   * @internal **WARNING:** `__val` is a phantom type for compiler strictness only. 
   * It DOES NOT exist at runtime. Do not evaluate it in your logic.
   */
  readonly [__val]: 1785751394;
}

/**
 * Uses progressive encoding to download the image in a series of passes, with the first pass at low resolution and each successive pass adding resolution to the image.
 */
interface JPEGOptionsFormat_PROGRESSIVE_ENCODING extends JPEGOptionsFormat {
  /**
   * @internal **WARNING:** `__val` is a phantom type for compiler strictness only. 
   * It DOES NOT exist at runtime. Do not evaluate it in your logic.
   */
  readonly [__val]: 1785751408;
}



/*----------------------------------------/
/                Exports                  /
/----------------------------------------*/

/**
 * Formatting options for converted JPEG images.
 */
export declare namespace JPEGOptionsFormat {
/**
 * Uses baseline encoding to download the image in one pass.
 */
type BASELINE_ENCODING = JPEGOptionsFormat_BASELINE_ENCODING;

/**
 * Uses progressive encoding to download the image in a series of passes, with the first pass at low resolution and each successive pass adding resolution to the image.
 */
type PROGRESSIVE_ENCODING = JPEGOptionsFormat_PROGRESSIVE_ENCODING;

}
/**
 * Formatting options for converted JPEG images.
 */
export declare const JPEGOptionsFormat: typeof Enumeration & {

  /**
   * Uses baseline encoding to download the image in one pass.
   */
  readonly BASELINE_ENCODING: JPEGOptionsFormat_BASELINE_ENCODING;
  /**
   * Uses baseline encoding to download the image in one pass.
   */
  readonly baselineEncoding: JPEGOptionsFormat_BASELINE_ENCODING;
  /**
   * Uses progressive encoding to download the image in a series of passes, with the first pass at low resolution and each successive pass adding resolution to the image.
   */
  readonly PROGRESSIVE_ENCODING: JPEGOptionsFormat_PROGRESSIVE_ENCODING;
  /**
   * Uses progressive encoding to download the image in a series of passes, with the first pass at low resolution and each successive pass adding resolution to the image.
   */
  readonly progressiveEncoding: JPEGOptionsFormat_PROGRESSIVE_ENCODING;
}
