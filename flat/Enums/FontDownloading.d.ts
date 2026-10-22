/**
 * FontDownloading.d.ts — indesign-uxp-types
 * Adobe InDesign 2026 (21.x) ExtendScript DOM declarations,
 * converted from indesign-uxp-types by tools/codemod.
 * Version: 1.0.0 · Updated: 2026-09-29
 * Author: Vlad Vladila (Krommatine Systems) · https://github.com/vamitul/indesign-uxp-types
 */
import type { Enumeration, Enumerator, __val} from "../_base/Enums";



declare const __FontDownloading: unique symbol;


/*----------------------------------------/
/   Internal enumerator interfaces        /
/       -- Not exported --                /
/----------------------------------------*/


interface FontDownloading extends Enumerator {
  /**
   * @internal **WARNING:** `__FontDownloading` is a phantom type for compiler strictness only. 
   * It DOES NOT exist at runtime. Do not evaluate it in your logic.
   */
  readonly [__FontDownloading]: never;
}


/**
 * Downloads only references to fonts. Note: Use when fonts reside in the printer.
 */
interface FontDownloading_NONE extends FontDownloading {
  /**
   * @internal **WARNING:** `__val` is a phantom type for compiler strictness only. 
   * It DOES NOT exist at runtime. Do not evaluate it in your logic.
   */
  readonly [__val]: 1852796517;
}

/**
 * Downloads all fonts once per page.
 */
interface FontDownloading_COMPLETE extends FontDownloading {
  /**
   * @internal **WARNING:** `__val` is a phantom type for compiler strictness only. 
   * It DOES NOT exist at runtime. Do not evaluate it in your logic.
   */
  readonly [__val]: 2003332197;
}

/**
 * Downloads only the characters (glyphs) used in the document. Glyphs are downloaded once per page.
 */
interface FontDownloading_SUBSET extends FontDownloading {
  /**
   * @internal **WARNING:** `__val` is a phantom type for compiler strictness only. 
   * It DOES NOT exist at runtime. Do not evaluate it in your logic.
   */
  readonly [__val]: 1768842098;
}

/**
 * Downloads only the characters (glyphs) used in the document. Glyphs are downloaded once per page. Note: Use when the number of glyphs exceeds 350. 
 */
interface FontDownloading_SUBSET_LARGE extends FontDownloading {
  /**
   * @internal **WARNING:** `__val` is a phantom type for compiler strictness only. 
   * It DOES NOT exist at runtime. Do not evaluate it in your logic.
   */
  readonly [__val]: 1818325607;
}



/*----------------------------------------/
/                Exports                  /
/----------------------------------------*/

/**
 * Options for downloading fonts to the printer.
 */
export declare namespace FontDownloading {
/**
 * Downloads only references to fonts. Note: Use when fonts reside in the printer.
 */
type NONE = FontDownloading_NONE;

/**
 * Downloads all fonts once per page.
 */
type COMPLETE = FontDownloading_COMPLETE;

/**
 * Downloads only the characters (glyphs) used in the document. Glyphs are downloaded once per page.
 */
type SUBSET = FontDownloading_SUBSET;

/**
 * Downloads only the characters (glyphs) used in the document. Glyphs are downloaded once per page. Note: Use when the number of glyphs exceeds 350. 
 */
type SUBSET_LARGE = FontDownloading_SUBSET_LARGE;

}
/**
 * Options for downloading fonts to the printer.
 */
export declare const FontDownloading: typeof Enumeration & {

  /**
   * Downloads only references to fonts. Note: Use when fonts reside in the printer.
   */
  readonly NONE: FontDownloading_NONE;
  /**
   * Downloads only references to fonts. Note: Use when fonts reside in the printer.
   */
  readonly none: FontDownloading_NONE;

  /**
   * Downloads all fonts once per page.
   */
  readonly COMPLETE: FontDownloading_COMPLETE;
  /**
   * Downloads all fonts once per page.
   */
  readonly complete: FontDownloading_COMPLETE;

  /**
   * Downloads only the characters (glyphs) used in the document. Glyphs are downloaded once per page.
   */
  readonly SUBSET: FontDownloading_SUBSET;
  /**
   * Downloads only the characters (glyphs) used in the document. Glyphs are downloaded once per page.
   */
  readonly subset: FontDownloading_SUBSET;

  /**
   * Downloads only the characters (glyphs) used in the document. Glyphs are downloaded once per page. Note: Use when the number of glyphs exceeds 350. 
   */
  readonly SUBSET_LARGE: FontDownloading_SUBSET_LARGE;
  /**
   * Downloads only the characters (glyphs) used in the document. Glyphs are downloaded once per page. Note: Use when the number of glyphs exceeds 350. 
   */
  readonly subsetLarge: FontDownloading_SUBSET_LARGE;
}
