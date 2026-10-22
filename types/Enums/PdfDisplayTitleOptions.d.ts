/**
 * PdfDisplayTitleOptions.d.ts — indesign-uxp-types
 * Adobe InDesign 2026 (21.x) ExtendScript DOM declarations,
 * converted from indesign-uxp-types by tools/codemod.
 * Version: 1.0.0 · Updated: 2026-09-29
 * Author: Vlad Vladila (Krommatine Systems) · https://github.com/vamitul/indesign-uxp-types
 */
import type { Enumeration, Enumerator, __val} from "../_base/Enums";



declare const __PdfDisplayTitleOptions: unique symbol;


/*----------------------------------------/
/   Internal enumerator interfaces        /
/       -- Not exported --                /
/----------------------------------------*/


interface PdfDisplayTitleOptions extends Enumerator {
  /**
   * @internal **WARNING:** `__PdfDisplayTitleOptions` is a phantom type for compiler strictness only. 
   * It DOES NOT exist at runtime. Do not evaluate it in your logic.
   */
  readonly [__PdfDisplayTitleOptions]: never;
}


/**
 * Uses file name.
 */
interface PdfDisplayTitleOptions_DISPLAY_FILE_NAME extends PdfDisplayTitleOptions {
  /**
   * @internal **WARNING:** `__val` is a phantom type for compiler strictness only. 
   * It DOES NOT exist at runtime. Do not evaluate it in your logic.
   */
  readonly [__val]: 1148413550;
}

/**
 * Uses document title.
 */
interface PdfDisplayTitleOptions_DISPLAY_DOCUMENT_TITLE extends PdfDisplayTitleOptions {
  /**
   * @internal **WARNING:** `__val` is a phantom type for compiler strictness only. 
   * It DOES NOT exist at runtime. Do not evaluate it in your logic.
   */
  readonly [__val]: 1148413044;
}



/*----------------------------------------/
/                Exports                  /
/----------------------------------------*/

/**
 * Whether a PDF reader shows the file name or the document title in its window title bar.
 */
export declare namespace PdfDisplayTitleOptions {
/**
 * Uses file name.
 */
type DISPLAY_FILE_NAME = PdfDisplayTitleOptions_DISPLAY_FILE_NAME;

/**
 * Uses document title.
 */
type DISPLAY_DOCUMENT_TITLE = PdfDisplayTitleOptions_DISPLAY_DOCUMENT_TITLE;

}
/**
 * Whether a PDF reader shows the file name or the document title in its window title bar.
 */
export declare const PdfDisplayTitleOptions: typeof Enumeration & {

  /**
   * Uses file name.
   */
  readonly DISPLAY_FILE_NAME: PdfDisplayTitleOptions_DISPLAY_FILE_NAME;
  /**
   * Uses file name.
   */
  readonly displayFileName: PdfDisplayTitleOptions_DISPLAY_FILE_NAME;
  /**
   * Uses document title.
   */
  readonly DISPLAY_DOCUMENT_TITLE: PdfDisplayTitleOptions_DISPLAY_DOCUMENT_TITLE;
  /**
   * Uses document title.
   */
  readonly displayDocumentTitle: PdfDisplayTitleOptions_DISPLAY_DOCUMENT_TITLE;
}
