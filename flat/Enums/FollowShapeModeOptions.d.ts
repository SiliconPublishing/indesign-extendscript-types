/**
 * FollowShapeModeOptions.d.ts — indesign-uxp-types
 * Adobe InDesign 2026 (21.x) ExtendScript DOM declarations,
 * converted from indesign-uxp-types by tools/codemod.
 * Version: 1.0.0 · Updated: 2026-09-29
 * Author: Vlad Vladila (Krommatine Systems) · https://github.com/vamitul/indesign-uxp-types
 */
import type { Enumeration, Enumerator, __val} from "../_base/Enums";



declare const __FollowShapeModeOptions: unique symbol;


/*----------------------------------------/
/   Internal enumerator interfaces        /
/       -- Not exported --                /
/----------------------------------------*/


interface FollowShapeModeOptions extends Enumerator {
  /**
   * @internal **WARNING:** `__FollowShapeModeOptions` is a phantom type for compiler strictness only. 
   * It DOES NOT exist at runtime. Do not evaluate it in your logic.
   */
  readonly [__FollowShapeModeOptions]: never;
}


/**
 * Disables shape following and uses the rectangular bounds of the object.
 */
interface FollowShapeModeOptions_NONE extends FollowShapeModeOptions {
  /**
   * @internal **WARNING:** `__val` is a phantom type for compiler strictness only. 
   * It DOES NOT exist at runtime. Do not evaluate it in your logic.
   */
  readonly [__val]: 1852796517;
}

/**
 * Feathers only the leading edge facing the specified angle.
 */
interface FollowShapeModeOptions_LEADING_EDGE extends FollowShapeModeOptions {
  /**
   * @internal **WARNING:** `__val` is a phantom type for compiler strictness only. 
   * It DOES NOT exist at runtime. Do not evaluate it in your logic.
   */
  readonly [__val]: 1701721441;
}

/**
 * Feathers all edges that face the specified angle.
 */
interface FollowShapeModeOptions_ALL_EDGES extends FollowShapeModeOptions {
  /**
   * @internal **WARNING:** `__val` is a phantom type for compiler strictness only. 
   * It DOES NOT exist at runtime. Do not evaluate it in your logic.
   */
  readonly [__val]: 1701721442;
}



/*----------------------------------------/
/                Exports                  /
/----------------------------------------*/

/**
 * Follow-shape options for directional feathering.
 */
export declare namespace FollowShapeModeOptions {
/**
 * Disables shape following and uses the rectangular bounds of the object.
 */
type NONE = FollowShapeModeOptions_NONE;

/**
 * Feathers only the leading edge facing the specified angle.
 */
type LEADING_EDGE = FollowShapeModeOptions_LEADING_EDGE;

/**
 * Feathers all edges that face the specified angle.
 */
type ALL_EDGES = FollowShapeModeOptions_ALL_EDGES;

}
/**
 * Follow-shape options for directional feathering.
 */
export declare const FollowShapeModeOptions: typeof Enumeration & {

  /**
   * Disables shape following and uses the rectangular bounds of the object.
   */
  readonly NONE: FollowShapeModeOptions_NONE;
  /**
   * Disables shape following and uses the rectangular bounds of the object.
   */
  readonly none: FollowShapeModeOptions_NONE;

  /**
   * Feathers only the leading edge facing the specified angle.
   */
  readonly LEADING_EDGE: FollowShapeModeOptions_LEADING_EDGE;
  /**
   * Feathers only the leading edge facing the specified angle.
   */
  readonly leadingEdge: FollowShapeModeOptions_LEADING_EDGE;
  /**
   * Feathers all edges that face the specified angle.
   */
  readonly ALL_EDGES: FollowShapeModeOptions_ALL_EDGES;
  /**
   * Feathers all edges that face the specified angle.
   */
  readonly allEdges: FollowShapeModeOptions_ALL_EDGES;
}
