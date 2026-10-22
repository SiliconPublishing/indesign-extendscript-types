/**
 * SearchModes.d.ts — indesign-uxp-types
 * Adobe InDesign 2026 (21.x) ExtendScript DOM declarations,
 * converted from indesign-uxp-types by tools/codemod.
 * Version: 1.0.0 · Updated: 2026-09-29
 * Author: Vlad Vladila (Krommatine Systems) · https://github.com/vamitul/indesign-uxp-types
 */
import type { Enumeration, Enumerator, __val} from "../_base/Enums";



declare const __SearchModes: unique symbol;


/*----------------------------------------/
/   Internal enumerator interfaces        /
/       -- Not exported --                /
/----------------------------------------*/


interface SearchModes extends Enumerator {
  /**
   * @internal **WARNING:** `__SearchModes` is a phantom type for compiler strictness only. 
   * It DOES NOT exist at runtime. Do not evaluate it in your logic.
   */
  readonly [__SearchModes]: never;
}


/**
 * Text search.
 */
interface SearchModes_TEXT_SEARCH extends SearchModes {
  /**
   * @internal **WARNING:** `__val` is a phantom type for compiler strictness only. 
   * It DOES NOT exist at runtime. Do not evaluate it in your logic.
   */
  readonly [__val]: 1182038131;
}

/**
 * Grep search.
 */
interface SearchModes_GREP_SEARCH extends SearchModes {
  /**
   * @internal **WARNING:** `__val` is a phantom type for compiler strictness only. 
   * It DOES NOT exist at runtime. Do not evaluate it in your logic.
   */
  readonly [__val]: 1181184627;
}

/**
 * Glyph search.
 */
interface SearchModes_GLYPH_SEARCH extends SearchModes {
  /**
   * @internal **WARNING:** `__val` is a phantom type for compiler strictness only. 
   * It DOES NOT exist at runtime. Do not evaluate it in your logic.
   */
  readonly [__val]: 1181183091;
}

/**
 * Object search.
 */
interface SearchModes_OBJECT_SEARCH extends SearchModes {
  /**
   * @internal **WARNING:** `__val` is a phantom type for compiler strictness only. 
   * It DOES NOT exist at runtime. Do not evaluate it in your logic.
   */
  readonly [__val]: 1181704819;
}

/**
 * Color search.
 */
interface SearchModes_COLOR_SEARCH extends SearchModes {
  /**
   * @internal **WARNING:** `__val` is a phantom type for compiler strictness only. 
   * It DOES NOT exist at runtime. Do not evaluate it in your logic.
   */
  readonly [__val]: 1180921708;
}

/** Generated from the InDesign Server 21.6 scripting dictionary. */
interface SearchModes_TRANSLITERATE_SEARCH extends SearchModes {
    readonly [__val]: 1182036595;
}

/*----------------------------------------/
/                Exports                  /
/----------------------------------------*/

/**
 * Which find/change engine a search uses — plain text, GREP, glyph, object, or colour.
 */
export declare namespace SearchModes {
/**
 * Text search.
 */
type TEXT_SEARCH = SearchModes_TEXT_SEARCH;

/**
 * Grep search.
 */
type GREP_SEARCH = SearchModes_GREP_SEARCH;

/**
 * Glyph search.
 */
type GLYPH_SEARCH = SearchModes_GLYPH_SEARCH;

/**
 * Object search.
 */
type OBJECT_SEARCH = SearchModes_OBJECT_SEARCH;

/**
 * Color search.
 */
type COLOR_SEARCH = SearchModes_COLOR_SEARCH;
    type TRANSLITERATE_SEARCH = SearchModes_TRANSLITERATE_SEARCH;
}
/**
 * Which find/change engine a search uses — plain text, GREP, glyph, object, or colour.
 */
export declare const SearchModes: typeof Enumeration & {

          /**
           * Text search.
           */
          readonly TEXT_SEARCH: SearchModes_TEXT_SEARCH;
          /**
           * Text search.
           */
          readonly textSearch: SearchModes_TEXT_SEARCH;
          /**
           * Grep search.
           */
          readonly GREP_SEARCH: SearchModes_GREP_SEARCH;
          /**
           * Grep search.
           */
          readonly grepSearch: SearchModes_GREP_SEARCH;
          /**
           * Glyph search.
           */
          readonly GLYPH_SEARCH: SearchModes_GLYPH_SEARCH;
          /**
           * Glyph search.
           */
          readonly glyphSearch: SearchModes_GLYPH_SEARCH;
          /**
           * Object search.
           */
          readonly OBJECT_SEARCH: SearchModes_OBJECT_SEARCH;
          /**
           * Object search.
           */
          readonly objectSearch: SearchModes_OBJECT_SEARCH;
          /**
           * Color search.
           */
          readonly COLOR_SEARCH: SearchModes_COLOR_SEARCH;
          /**
           * Color search.
           */
          readonly colorSearch: SearchModes_COLOR_SEARCH;
        } & InDesignEdition.SearchModes
