/**
 * PreflightScopeOptions.d.ts — indesign-uxp-types
 * Adobe InDesign 2026 (21.x) ExtendScript DOM declarations,
 * converted from indesign-uxp-types by tools/codemod.
 * Version: 1.0.0 · Updated: 2026-09-29
 * Author: Vlad Vladila (Krommatine Systems) · https://github.com/vamitul/indesign-uxp-types
 */
import type { Enumeration, Enumerator, __val} from "../_base/Enums";



declare const __PreflightScopeOptions: unique symbol;


/*----------------------------------------/
/   Internal enumerator interfaces        /
/       -- Not exported --                /
/----------------------------------------*/


interface PreflightScopeOptions extends Enumerator {
  /**
   * @internal **WARNING:** `__PreflightScopeOptions` is a phantom type for compiler strictness only. 
   * It DOES NOT exist at runtime. Do not evaluate it in your logic.
   */
  readonly [__PreflightScopeOptions]: never;
}


/**
 * Include all pages in the preflight.
 */
interface PreflightScopeOptions_PREFLIGHT_ALL_PAGES extends PreflightScopeOptions {
  /**
   * @internal **WARNING:** `__val` is a phantom type for compiler strictness only. 
   * It DOES NOT exist at runtime. Do not evaluate it in your logic.
   */
  readonly [__val]: 1885552976;
}

/**
 * Include only the selected document for book preflight.
 */
interface PreflightScopeOptions_PREFLIGHT_SELECTED_DOCUMENTS extends PreflightScopeOptions {
  /**
   * @internal **WARNING:** `__val` is a phantom type for compiler strictness only. 
   * It DOES NOT exist at runtime. Do not evaluate it in your logic.
   */
  readonly [__val]: 1885557572;
}

/**
 * Include all documents in the book preflight.
 */
interface PreflightScopeOptions_PREFLIGHT_ALL_DOCUMENTS extends PreflightScopeOptions {
  /**
   * @internal **WARNING:** `__val` is a phantom type for compiler strictness only. 
   * It DOES NOT exist at runtime. Do not evaluate it in your logic.
   */
  readonly [__val]: 1885552964;
}



/*----------------------------------------/
/                Exports                  /
/----------------------------------------*/

/**
 * How much of the document preflight covers: everything, the current page, or a page range.
 */
export declare namespace PreflightScopeOptions {
/**
 * Include all pages in the preflight.
 */
type PREFLIGHT_ALL_PAGES = PreflightScopeOptions_PREFLIGHT_ALL_PAGES;

/**
 * Include only the selected document for book preflight.
 */
type PREFLIGHT_SELECTED_DOCUMENTS = PreflightScopeOptions_PREFLIGHT_SELECTED_DOCUMENTS;

/**
 * Include all documents in the book preflight.
 */
type PREFLIGHT_ALL_DOCUMENTS = PreflightScopeOptions_PREFLIGHT_ALL_DOCUMENTS;

}
/**
 * How much of the document preflight covers: everything, the current page, or a page range.
 */
export declare const PreflightScopeOptions: typeof Enumeration & {

  /**
   * Include all pages in the preflight.
   */
  readonly PREFLIGHT_ALL_PAGES: PreflightScopeOptions_PREFLIGHT_ALL_PAGES;
  /**
   * Include all pages in the preflight.
   */
  readonly preflightAllPages: PreflightScopeOptions_PREFLIGHT_ALL_PAGES;
  /**
   * Include only the selected document for book preflight.
   */
  readonly PREFLIGHT_SELECTED_DOCUMENTS: PreflightScopeOptions_PREFLIGHT_SELECTED_DOCUMENTS;
  /**
   * Include only the selected document for book preflight.
   */
  readonly preflightSelectedDocuments: PreflightScopeOptions_PREFLIGHT_SELECTED_DOCUMENTS;
  /**
   * Include all documents in the book preflight.
   */
  readonly PREFLIGHT_ALL_DOCUMENTS: PreflightScopeOptions_PREFLIGHT_ALL_DOCUMENTS;
  /**
   * Include all documents in the book preflight.
   */
  readonly preflightAllDocuments: PreflightScopeOptions_PREFLIGHT_ALL_DOCUMENTS;
}
