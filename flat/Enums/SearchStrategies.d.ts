/**
 * SearchStrategies.d.ts — indesign-uxp-types
 * Adobe InDesign 2026 (21.x) ExtendScript DOM declarations,
 * converted from indesign-uxp-types by tools/codemod.
 * Version: 1.0.0 · Updated: 2026-09-29
 * Author: Vlad Vladila (Krommatine Systems) · https://github.com/vamitul/indesign-uxp-types
 */
import type { Enumeration, Enumerator, __val} from "../_base/Enums";



declare const __SearchStrategies: unique symbol;


/*----------------------------------------/
/   Internal enumerator interfaces        /
/       -- Not exported --                /
/----------------------------------------*/


interface SearchStrategies extends Enumerator {
  /**
   * @internal **WARNING:** `__SearchStrategies` is a phantom type for compiler strictness only. 
   * It DOES NOT exist at runtime. Do not evaluate it in your logic.
   */
  readonly [__SearchStrategies]: never;
}


/**
 * Searches forward from the start of the current page.
 */
interface SearchStrategies_FIRST_ON_PAGE extends SearchStrategies {
  /**
   * @internal **WARNING:** `__val` is a phantom type for compiler strictness only. 
   * It DOES NOT exist at runtime. Do not evaluate it in your logic.
   */
  readonly [__val]: 1396794992;
}

/**
 * Search backward from the end of the current page.
 */
interface SearchStrategies_LAST_ON_PAGE extends SearchStrategies {
  /**
   * @internal **WARNING:** `__val` is a phantom type for compiler strictness only. 
   * It DOES NOT exist at runtime. Do not evaluate it in your logic.
   */
  readonly [__val]: 1396796528;
}



/*----------------------------------------/
/                Exports                  /
/----------------------------------------*/

/**
 * Whether a search runs forward from the start of the page or backward from its end.
 */
export declare namespace SearchStrategies {
/**
 * Searches forward from the start of the current page.
 */
type FIRST_ON_PAGE = SearchStrategies_FIRST_ON_PAGE;

/**
 * Search backward from the end of the current page.
 */
type LAST_ON_PAGE = SearchStrategies_LAST_ON_PAGE;

}
/**
 * Whether a search runs forward from the start of the page or backward from its end.
 */
export declare const SearchStrategies: typeof Enumeration & {

  /**
   * Searches forward from the start of the current page.
   */
  readonly FIRST_ON_PAGE: SearchStrategies_FIRST_ON_PAGE;
  /**
   * Searches forward from the start of the current page.
   */
  readonly firstOnPage: SearchStrategies_FIRST_ON_PAGE;
  /**
   * Search backward from the end of the current page.
   */
  readonly LAST_ON_PAGE: SearchStrategies_LAST_ON_PAGE;
  /**
   * Search backward from the end of the current page.
   */
  readonly lastOnPage: SearchStrategies_LAST_ON_PAGE;
}
