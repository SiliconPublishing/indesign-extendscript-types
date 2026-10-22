/**
 * TaggedPDFStructureOrderOptions.d.ts — indesign-uxp-types
 * Adobe InDesign 2026 (21.x) ExtendScript DOM declarations,
 * converted from indesign-uxp-types by tools/codemod.
 * Version: 1.0.0 · Updated: 2026-09-29
 * Author: Vlad Vladila (Krommatine Systems) · https://github.com/vamitul/indesign-uxp-types
 */
import type { Enumeration, Enumerator, __val} from "../_base/Enums";



declare const __TaggedPDFStructureOrderOptions: unique symbol;


/*----------------------------------------/
/   Internal enumerator interfaces        /
/       -- Not exported --                /
/----------------------------------------*/


interface TaggedPDFStructureOrderOptions extends Enumerator {
  /**
   * @internal **WARNING:** `__TaggedPDFStructureOrderOptions` is a phantom type for compiler strictness only. 
   * It DOES NOT exist at runtime. Do not evaluate it in your logic.
   */
  readonly [__TaggedPDFStructureOrderOptions]: never;
}


/**
 * Use XML structure and layout heuristic fallback for the tagged PDF structure.
 */
interface TaggedPDFStructureOrderOptions_USE_XML_STRUCTURE extends TaggedPDFStructureOrderOptions {
  /**
   * @internal **WARNING:** `__val` is a phantom type for compiler strictness only. 
   * It DOES NOT exist at runtime. Do not evaluate it in your logic.
   */
  readonly [__val]: 1350062959;
}

/**
 * Use Articles order for the tagged PDF structure.
 */
interface TaggedPDFStructureOrderOptions_USE_ARTICLES extends TaggedPDFStructureOrderOptions {
  /**
   * @internal **WARNING:** `__val` is a phantom type for compiler strictness only. 
   * It DOES NOT exist at runtime. Do not evaluate it in your logic.
   */
  readonly [__val]: 1348554610;
}



/*----------------------------------------/
/                Exports                  /
/----------------------------------------*/

/**
 * Options for determining the tag order of the structure in a tagged PDF.
 */
export declare namespace TaggedPDFStructureOrderOptions {
/**
 * Use XML structure and layout heuristic fallback for the tagged PDF structure.
 */
type USE_XML_STRUCTURE = TaggedPDFStructureOrderOptions_USE_XML_STRUCTURE;

/**
 * Use Articles order for the tagged PDF structure.
 */
type USE_ARTICLES = TaggedPDFStructureOrderOptions_USE_ARTICLES;

}
/**
 * Options for determining the tag order of the structure in a tagged PDF.
 */
export declare const TaggedPDFStructureOrderOptions: typeof Enumeration & {

  /**
   * Use XML structure and layout heuristic fallback for the tagged PDF structure.
   */
  readonly USE_XML_STRUCTURE: TaggedPDFStructureOrderOptions_USE_XML_STRUCTURE;
  /**
   * Use Articles order for the tagged PDF structure.
   */
  readonly USE_ARTICLES: TaggedPDFStructureOrderOptions_USE_ARTICLES;
  /**
   * Use Articles order for the tagged PDF structure.
   */
  readonly useArticles: TaggedPDFStructureOrderOptions_USE_ARTICLES;
}
