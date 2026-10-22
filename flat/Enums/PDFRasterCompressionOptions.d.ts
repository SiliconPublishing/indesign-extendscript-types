/**
 * PDFRasterCompressionOptions.d.ts — indesign-uxp-types
 * Adobe InDesign 2026 (21.x) ExtendScript DOM declarations,
 * converted from indesign-uxp-types by tools/codemod.
 * Version: 1.0.0 · Updated: 2026-09-29
 * Author: Vlad Vladila (Krommatine Systems) · https://github.com/vamitul/indesign-uxp-types
 */
import type { Enumeration, Enumerator, __val} from "../_base/Enums";



declare const __PDFRasterCompressionOptions: unique symbol;


/*----------------------------------------/
/   Internal enumerator interfaces        /
/       -- Not exported --                /
/----------------------------------------*/


interface PDFRasterCompressionOptions extends Enumerator {
  /**
   * @internal **WARNING:** `__PDFRasterCompressionOptions` is a phantom type for compiler strictness only. 
   * It DOES NOT exist at runtime. Do not evaluate it in your logic.
   */
  readonly [__PDFRasterCompressionOptions]: never;
}


/**
 * Uses JPEG compression.
 */
interface PDFRasterCompressionOptions_JPEG_COMPRESSION extends PDFRasterCompressionOptions {
  /**
   * @internal **WARNING:** `__val` is a phantom type for compiler strictness only. 
   * It DOES NOT exist at runtime. Do not evaluate it in your logic.
   */
  readonly [__val]: 1936878179;
}

/**
 * Uses the best quality type.
 */
interface PDFRasterCompressionOptions_LOSSLESS_COMPRESSION extends PDFRasterCompressionOptions {
  /**
   * @internal **WARNING:** `__val` is a phantom type for compiler strictness only. 
   * It DOES NOT exist at runtime. Do not evaluate it in your logic.
   */
  readonly [__val]: 1936878691;
}

/**
 * Uses JPEG compression and automatically determines the best quality type.
 */
interface PDFRasterCompressionOptions_AUTOMATIC_COMPRESSION extends PDFRasterCompressionOptions {
  /**
   * @internal **WARNING:** `__val` is a phantom type for compiler strictness only. 
   * It DOES NOT exist at runtime. Do not evaluate it in your logic.
   */
  readonly [__val]: 1936875875;
}



/*----------------------------------------/
/                Exports                  /
/----------------------------------------*/

/**
 * How raster content is compressed in the exported PDF.
 */
export declare namespace PDFRasterCompressionOptions {
/**
 * Uses JPEG compression.
 */
type JPEG_COMPRESSION = PDFRasterCompressionOptions_JPEG_COMPRESSION;

/**
 * Uses the best quality type.
 */
type LOSSLESS_COMPRESSION = PDFRasterCompressionOptions_LOSSLESS_COMPRESSION;

/**
 * Uses JPEG compression and automatically determines the best quality type.
 */
type AUTOMATIC_COMPRESSION = PDFRasterCompressionOptions_AUTOMATIC_COMPRESSION;

}
/**
 * How raster content is compressed in the exported PDF.
 */
export declare const PDFRasterCompressionOptions: typeof Enumeration & {

  /**
   * Uses JPEG compression.
   */
  readonly JPEG_COMPRESSION: PDFRasterCompressionOptions_JPEG_COMPRESSION;
  /**
   * Uses JPEG compression.
   */
  readonly jpegCompression: PDFRasterCompressionOptions_JPEG_COMPRESSION;
  /**
   * Uses the best quality type.
   */
  readonly LOSSLESS_COMPRESSION: PDFRasterCompressionOptions_LOSSLESS_COMPRESSION;
  /**
   * Uses the best quality type.
   */
  readonly losslessCompression: PDFRasterCompressionOptions_LOSSLESS_COMPRESSION;
  /**
   * Uses JPEG compression and automatically determines the best quality type.
   */
  readonly AUTOMATIC_COMPRESSION: PDFRasterCompressionOptions_AUTOMATIC_COMPRESSION;
  /**
   * Uses JPEG compression and automatically determines the best quality type.
   */
  readonly automaticCompression: PDFRasterCompressionOptions_AUTOMATIC_COMPRESSION;
}
