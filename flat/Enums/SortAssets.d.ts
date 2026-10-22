/**
 * SortAssets.d.ts — indesign-uxp-types
 * Adobe InDesign 2026 (21.x) ExtendScript DOM declarations,
 * converted from indesign-uxp-types by tools/codemod.
 * Version: 1.0.0 · Updated: 2026-09-29
 * Author: Vlad Vladila (Krommatine Systems) · https://github.com/vamitul/indesign-uxp-types
 */
import type { Enumeration, Enumerator, __val} from "../_base/Enums";



declare const __SortAssets: unique symbol;


/*----------------------------------------/
/   Internal enumerator interfaces        /
/       -- Not exported --                /
/----------------------------------------*/


interface SortAssets extends Enumerator {
  /**
   * @internal **WARNING:** `__SortAssets` is a phantom type for compiler strictness only. 
   * It DOES NOT exist at runtime. Do not evaluate it in your logic.
   */
  readonly [__SortAssets]: never;
}


/**
 * Sort by name.
 */
interface SortAssets_BY_NAME extends SortAssets {
  /**
   * @internal **WARNING:** `__val` is a phantom type for compiler strictness only. 
   * It DOES NOT exist at runtime. Do not evaluate it in your logic.
   */
  readonly [__val]: 1699955278;
}

/**
 * Sort oldest first.
 */
interface SortAssets_BY_OLDEST extends SortAssets {
  /**
   * @internal **WARNING:** `__val` is a phantom type for compiler strictness only. 
   * It DOES NOT exist at runtime. Do not evaluate it in your logic.
   */
  readonly [__val]: 1699955279;
}

/**
 * Sort newest first.
 */
interface SortAssets_BY_NEWEST extends SortAssets {
  /**
   * @internal **WARNING:** `__val` is a phantom type for compiler strictness only. 
   * It DOES NOT exist at runtime. Do not evaluate it in your logic.
   */
  readonly [__val]: 1699955310;
}

/**
 * Sort by type.
 */
interface SortAssets_BY_TYPE extends SortAssets {
  /**
   * @internal **WARNING:** `__val` is a phantom type for compiler strictness only. 
   * It DOES NOT exist at runtime. Do not evaluate it in your logic.
   */
  readonly [__val]: 1699955284;
}



/*----------------------------------------/
/                Exports                  /
/----------------------------------------*/

/**
 * Sort order for assets displayed in a Library panel.
 */
export declare namespace SortAssets {
/**
 * Sort by name.
 */
type BY_NAME = SortAssets_BY_NAME;

/**
 * Sort oldest first.
 */
type BY_OLDEST = SortAssets_BY_OLDEST;

/**
 * Sort newest first.
 */
type BY_NEWEST = SortAssets_BY_NEWEST;

/**
 * Sort by type.
 */
type BY_TYPE = SortAssets_BY_TYPE;

}
/**
 * Sort order for assets displayed in a Library panel.
 */
export declare const SortAssets: typeof Enumeration & {

  /**
   * Sort by name.
   */
  readonly BY_NAME: SortAssets_BY_NAME;
  /**
   * Sort by name.
   */
  readonly byName: SortAssets_BY_NAME;
  /**
   * Sort oldest first.
   */
  readonly BY_OLDEST: SortAssets_BY_OLDEST;
  /**
   * Sort oldest first.
   */
  readonly byOldest: SortAssets_BY_OLDEST;
  /**
   * Sort newest first.
   */
  readonly BY_NEWEST: SortAssets_BY_NEWEST;
  /**
   * Sort newest first.
   */
  readonly byNewest: SortAssets_BY_NEWEST;
  /**
   * Sort by type.
   */
  readonly BY_TYPE: SortAssets_BY_TYPE;
  /**
   * Sort by type.
   */
  readonly byType: SortAssets_BY_TYPE;
}
