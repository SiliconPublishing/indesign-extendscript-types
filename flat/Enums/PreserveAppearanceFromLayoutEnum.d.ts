/**
 * PreserveAppearanceFromLayoutEnum.d.ts — indesign-uxp-types
 * Adobe InDesign 2026 (21.x) ExtendScript DOM declarations,
 * converted from indesign-uxp-types by tools/codemod.
 * Version: 1.0.0 · Updated: 2026-09-29
 * Author: Vlad Vladila (Krommatine Systems) · https://github.com/vamitul/indesign-uxp-types
 */
import type { Enumeration, Enumerator, __val} from "../_base/Enums";



declare const __PreserveAppearanceFromLayoutEnum: unique symbol;


/*----------------------------------------/
/   Internal enumerator interfaces        /
/       -- Not exported --                /
/----------------------------------------*/


interface PreserveAppearanceFromLayoutEnum extends Enumerator {
  /**
   * @internal **WARNING:** `__PreserveAppearanceFromLayoutEnum` is a phantom type for compiler strictness only. 
   * It DOES NOT exist at runtime. Do not evaluate it in your logic.
   */
  readonly [__PreserveAppearanceFromLayoutEnum]: never;
}


/**
 * Export preferences will be honoured.
 */
interface PreserveAppearanceFromLayoutEnum_PRESERVE_APPEARANCE_DEFAULT extends PreserveAppearanceFromLayoutEnum {
  /**
   * @internal **WARNING:** `__val` is a phantom type for compiler strictness only. 
   * It DOES NOT exist at runtime. Do not evaluate it in your logic.
   */
  readonly [__val]: 1349665893;
}

/**
 * Existing image will be used.
 */
interface PreserveAppearanceFromLayoutEnum_PRESERVE_APPEARANCE_USE_EXISTING_IMAGE extends PreserveAppearanceFromLayoutEnum {
  /**
   * @internal **WARNING:** `__val` is a phantom type for compiler strictness only. 
   * It DOES NOT exist at runtime. Do not evaluate it in your logic.
   */
  readonly [__val]: 1349670245;
}

/**
 * Container and content will both be rasterized, if possible.
 */
interface PreserveAppearanceFromLayoutEnum_PRESERVE_APPEARANCE_RASTERIZE_CONTAINER extends PreserveAppearanceFromLayoutEnum {
  /**
   * @internal **WARNING:** `__val` is a phantom type for compiler strictness only. 
   * It DOES NOT exist at runtime. Do not evaluate it in your logic.
   */
  readonly [__val]: 1349669490;
}

/**
 * Content will be rasterized, if possible.
 */
interface PreserveAppearanceFromLayoutEnum_PRESERVE_APPEARANCE_RASTERIZE_CONTENT extends PreserveAppearanceFromLayoutEnum {
  /**
   * @internal **WARNING:** `__val` is a phantom type for compiler strictness only. 
   * It DOES NOT exist at runtime. Do not evaluate it in your logic.
   */
  readonly [__val]: 1349669492;
}



/*----------------------------------------/
/                Exports                  /
/----------------------------------------*/

/**
 * Options for preserving the appearance of content from the layout when
 * exporting.
 */
export declare namespace PreserveAppearanceFromLayoutEnum {
/**
 * Export preferences will be honoured.
 */
type PRESERVE_APPEARANCE_DEFAULT = PreserveAppearanceFromLayoutEnum_PRESERVE_APPEARANCE_DEFAULT;

/**
 * Existing image will be used.
 */
type PRESERVE_APPEARANCE_USE_EXISTING_IMAGE = PreserveAppearanceFromLayoutEnum_PRESERVE_APPEARANCE_USE_EXISTING_IMAGE;

/**
 * Container and content will both be rasterized, if possible.
 */
type PRESERVE_APPEARANCE_RASTERIZE_CONTAINER = PreserveAppearanceFromLayoutEnum_PRESERVE_APPEARANCE_RASTERIZE_CONTAINER;

/**
 * Content will be rasterized, if possible.
 */
type PRESERVE_APPEARANCE_RASTERIZE_CONTENT = PreserveAppearanceFromLayoutEnum_PRESERVE_APPEARANCE_RASTERIZE_CONTENT;

}
/**
 * Options for preserving the appearance of content from the layout when
 * exporting.
 */
export declare const PreserveAppearanceFromLayoutEnum: typeof Enumeration & {

  /**
   * Export preferences will be honoured.
   */
  readonly PRESERVE_APPEARANCE_DEFAULT: PreserveAppearanceFromLayoutEnum_PRESERVE_APPEARANCE_DEFAULT;
  /**
   * Export preferences will be honoured.
   */
  readonly preserveAppearanceDefault: PreserveAppearanceFromLayoutEnum_PRESERVE_APPEARANCE_DEFAULT;
  /**
   * Existing image will be used.
   */
  readonly PRESERVE_APPEARANCE_USE_EXISTING_IMAGE: PreserveAppearanceFromLayoutEnum_PRESERVE_APPEARANCE_USE_EXISTING_IMAGE;
  /**
   * Existing image will be used.
   */
  readonly preserveAppearanceUseExistingImage: PreserveAppearanceFromLayoutEnum_PRESERVE_APPEARANCE_USE_EXISTING_IMAGE;
  /**
   * Container and content will both be rasterized, if possible.
   */
  readonly PRESERVE_APPEARANCE_RASTERIZE_CONTAINER: PreserveAppearanceFromLayoutEnum_PRESERVE_APPEARANCE_RASTERIZE_CONTAINER;
  /**
   * Container and content will both be rasterized, if possible.
   */
  readonly preserveAppearanceRasterizeContainer: PreserveAppearanceFromLayoutEnum_PRESERVE_APPEARANCE_RASTERIZE_CONTAINER;
  /**
   * Content will be rasterized, if possible.
   */
  readonly PRESERVE_APPEARANCE_RASTERIZE_CONTENT: PreserveAppearanceFromLayoutEnum_PRESERVE_APPEARANCE_RASTERIZE_CONTENT;
  /**
   * Content will be rasterized, if possible.
   */
  readonly preserveAppearanceRasterizeContent: PreserveAppearanceFromLayoutEnum_PRESERVE_APPEARANCE_RASTERIZE_CONTENT;
}
