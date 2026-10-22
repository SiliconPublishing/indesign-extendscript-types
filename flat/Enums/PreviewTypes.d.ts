/**
 * PreviewTypes.d.ts — indesign-uxp-types
 * Adobe InDesign 2026 (21.x) ExtendScript DOM declarations,
 * converted from indesign-uxp-types by tools/codemod.
 * Version: 1.0.0 · Updated: 2026-09-29
 * Author: Vlad Vladila (Krommatine Systems) · https://github.com/vamitul/indesign-uxp-types
 */
import type { Enumeration, Enumerator, __val} from "../_base/Enums";



declare const __PreviewTypes: unique symbol;


/*----------------------------------------/
/   Internal enumerator interfaces        /
/       -- Not exported --                /
/----------------------------------------*/


interface PreviewTypes extends Enumerator {
  /**
   * @internal **WARNING:** `__PreviewTypes` is a phantom type for compiler strictness only. 
   * It DOES NOT exist at runtime. Do not evaluate it in your logic.
   */
  readonly [__PreviewTypes]: never;
}


/**
 * Does not save a preview image.
 */
interface PreviewTypes_NONE extends PreviewTypes {
  /**
   * @internal **WARNING:** `__val` is a phantom type for compiler strictness only. 
   * It DOES NOT exist at runtime. Do not evaluate it in your logic.
   */
  readonly [__val]: 1852796517;
}

/**
 * Saves the preview in TIFF format.
 */
interface PreviewTypes_TIFF_PREVIEW extends PreviewTypes {
  /**
   * @internal **WARNING:** `__val` is a phantom type for compiler strictness only. 
   * It DOES NOT exist at runtime. Do not evaluate it in your logic.
   */
  readonly [__val]: 1164997734;
}

/** Generated from the InDesign 21.6 scripting dictionary (macOS only). */
interface PreviewTypes_PICT_PREVIEW extends PreviewTypes {
    readonly [__val]: 1164996724;
}

/*----------------------------------------/
/                Exports                  /
/----------------------------------------*/

/**
 * Whether a preview image is saved inside the document, and in what format.
 */
export declare namespace PreviewTypes {
/**
 * Does not save a preview image.
 */
type NONE = PreviewTypes_NONE;

/**
 * Saves the preview in TIFF format.
 */
type TIFF_PREVIEW = PreviewTypes_TIFF_PREVIEW;
    type PICT_PREVIEW = PreviewTypes_PICT_PREVIEW;
}
/**
 * Whether a preview image is saved inside the document, and in what format.
 */
export declare const PreviewTypes: typeof Enumeration & {

  /**
   * Does not save a preview image.
   */
  readonly NONE: PreviewTypes_NONE;
  /**
   * Does not save a preview image.
   */
  readonly none: PreviewTypes_NONE;

  /**
   * Saves the preview in TIFF format.
   */
  readonly TIFF_PREVIEW: PreviewTypes_TIFF_PREVIEW;
  /**
   * Saves the preview in TIFF format.
   */
  readonly tiffPreview: PreviewTypes_TIFF_PREVIEW;
    readonly PICT_PREVIEW: PreviewTypes_PICT_PREVIEW;
    readonly pictPreview: PreviewTypes_PICT_PREVIEW;
}
