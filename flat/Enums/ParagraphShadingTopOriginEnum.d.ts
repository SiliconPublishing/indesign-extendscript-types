/**
 * ParagraphShadingTopOriginEnum.d.ts — indesign-uxp-types
 * Adobe InDesign 2026 (21.x) ExtendScript DOM declarations,
 * converted from indesign-uxp-types by tools/codemod.
 * Version: 1.0.0 · Updated: 2026-09-29
 * Author: Vlad Vladila (Krommatine Systems) · https://github.com/vamitul/indesign-uxp-types
 */
import type { Enumeration, Enumerator, __val} from "../_base/Enums";



declare const __ParagraphShadingTopOriginEnum: unique symbol;


/*----------------------------------------/
/   Internal enumerator interfaces        /
/       -- Not exported --                /
/----------------------------------------*/


interface ParagraphShadingTopOriginEnum extends Enumerator {
  /**
   * @internal **WARNING:** `__ParagraphShadingTopOriginEnum` is a phantom type for compiler strictness only. 
   * It DOES NOT exist at runtime. Do not evaluate it in your logic.
   */
  readonly [__ParagraphShadingTopOriginEnum]: never;
}


/**
 * Makes the paragraph shading top origin based on ascent of the text in the paragraph.
 */
interface ParagraphShadingTopOriginEnum_ASCENT_TOP_ORIGIN extends ParagraphShadingTopOriginEnum {
  /**
   * @internal **WARNING:** `__val` is a phantom type for compiler strictness only. 
   * It DOES NOT exist at runtime. Do not evaluate it in your logic.
   */
  readonly [__val]: 1886606433;
}

/**
 * Makes the paragraph shading top origin based on baseline of the text in the paragraph.
 */
interface ParagraphShadingTopOriginEnum_BASELINE_TOP_ORIGIN extends ParagraphShadingTopOriginEnum {
  /**
   * @internal **WARNING:** `__val` is a phantom type for compiler strictness only. 
   * It DOES NOT exist at runtime. Do not evaluate it in your logic.
   */
  readonly [__val]: 1886606434;
}

/**
 * Makes the paragraph shading top origin based on leading of the text in the paragraph.
 */
interface ParagraphShadingTopOriginEnum_LEADING_TOP_ORIGIN extends ParagraphShadingTopOriginEnum {
  /**
   * @internal **WARNING:** `__val` is a phantom type for compiler strictness only. 
   * It DOES NOT exist at runtime. Do not evaluate it in your logic.
   */
  readonly [__val]: 1885492332;
}



/*----------------------------------------/
/                Exports                  /
/----------------------------------------*/

/**
 * Options for specifying basis of the top origin of the paragraph shading.
 */
export declare namespace ParagraphShadingTopOriginEnum {
/**
 * Makes the paragraph shading top origin based on ascent of the text in the paragraph.
 */
type ASCENT_TOP_ORIGIN = ParagraphShadingTopOriginEnum_ASCENT_TOP_ORIGIN;

/**
 * Makes the paragraph shading top origin based on baseline of the text in the paragraph.
 */
type BASELINE_TOP_ORIGIN = ParagraphShadingTopOriginEnum_BASELINE_TOP_ORIGIN;

/**
 * Makes the paragraph shading top origin based on leading of the text in the paragraph.
 */
type LEADING_TOP_ORIGIN = ParagraphShadingTopOriginEnum_LEADING_TOP_ORIGIN;

}
/**
 * Options for specifying basis of the top origin of the paragraph shading.
 */
export declare const ParagraphShadingTopOriginEnum: typeof Enumeration & {

  /**
   * Makes the paragraph shading top origin based on ascent of the text in the paragraph.
   */
  readonly ASCENT_TOP_ORIGIN: ParagraphShadingTopOriginEnum_ASCENT_TOP_ORIGIN;
  /**
   * Makes the paragraph shading top origin based on ascent of the text in the paragraph.
   */
  readonly ascentTopOrigin: ParagraphShadingTopOriginEnum_ASCENT_TOP_ORIGIN;
  /**
   * Makes the paragraph shading top origin based on baseline of the text in the paragraph.
   */
  readonly BASELINE_TOP_ORIGIN: ParagraphShadingTopOriginEnum_BASELINE_TOP_ORIGIN;
  /**
   * Makes the paragraph shading top origin based on baseline of the text in the paragraph.
   */
  readonly baselineTopOrigin: ParagraphShadingTopOriginEnum_BASELINE_TOP_ORIGIN;
  /**
   * Makes the paragraph shading top origin based on leading of the text in the paragraph.
   */
  readonly LEADING_TOP_ORIGIN: ParagraphShadingTopOriginEnum_LEADING_TOP_ORIGIN;
  /**
   * Makes the paragraph shading top origin based on leading of the text in the paragraph.
   */
  readonly leadingTopOrigin: ParagraphShadingTopOriginEnum_LEADING_TOP_ORIGIN;
}
