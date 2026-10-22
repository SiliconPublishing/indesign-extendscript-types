/**
 * ChangeConditionsModes.d.ts — indesign-uxp-types
 * Adobe InDesign 2026 (21.x) ExtendScript DOM declarations,
 * converted from indesign-uxp-types by tools/codemod.
 * Version: 1.0.0 · Updated: 2026-09-29
 * Author: Vlad Vladila (Krommatine Systems) · https://github.com/vamitul/indesign-uxp-types
 */
import type { Enumeration, Enumerator, __val} from "../_base/Enums";



declare const __ChangeConditionsModes: unique symbol;


/*----------------------------------------/
/   Internal enumerator interfaces        /
/       -- Not exported --                /
/----------------------------------------*/


interface ChangeConditionsModes extends Enumerator {
  /**
   * @internal **WARNING:** `__ChangeConditionsModes` is a phantom type for compiler strictness only. 
   * It DOES NOT exist at runtime. Do not evaluate it in your logic.
   */
  readonly [__ChangeConditionsModes]: never;
}


/**
 * Change replaces applied conditions.
 */
interface ChangeConditionsModes_REPLACE_WITH extends ChangeConditionsModes {
  /**
   * @internal **WARNING:** `__val` is a phantom type for compiler strictness only. 
   * It DOES NOT exist at runtime. Do not evaluate it in your logic.
   */
  readonly [__val]: 1919250519;
}

/**
 * Change adds to applied conditions.
 */
interface ChangeConditionsModes_ADD_TO extends ChangeConditionsModes {
  /**
   * @internal **WARNING:** `__val` is a phantom type for compiler strictness only. 
   * It DOES NOT exist at runtime. Do not evaluate it in your logic.
   */
  readonly [__val]: 1633969202;
}



/*----------------------------------------/
/                Exports                  /
/----------------------------------------*/

/**
 * Whether a change operation adds its conditions to those already applied, or replaces them.
 */
export declare namespace ChangeConditionsModes {
/**
 * Change replaces applied conditions.
 */
type REPLACE_WITH = ChangeConditionsModes_REPLACE_WITH;

/**
 * Change adds to applied conditions.
 */
type ADD_TO = ChangeConditionsModes_ADD_TO;

}
/**
 * Whether a change operation adds its conditions to those already applied, or replaces them.
 */
export declare const ChangeConditionsModes: typeof Enumeration & {

  /**
   * Change replaces applied conditions.
   */
  readonly REPLACE_WITH: ChangeConditionsModes_REPLACE_WITH;
  /**
   * Change replaces applied conditions.
   */
  readonly replaceWith: ChangeConditionsModes_REPLACE_WITH;
  /**
   * Change adds to applied conditions.
   */
  readonly ADD_TO: ChangeConditionsModes_ADD_TO;
  /**
   * Change adds to applied conditions.
   */
  readonly addTo: ChangeConditionsModes_ADD_TO;
}
