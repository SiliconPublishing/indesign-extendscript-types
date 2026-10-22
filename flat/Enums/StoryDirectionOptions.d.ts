/**
 * StoryDirectionOptions.d.ts — indesign-uxp-types
 * Adobe InDesign 2026 (21.x) ExtendScript DOM declarations,
 * converted from indesign-uxp-types by tools/codemod.
 * Version: 1.0.0 · Updated: 2026-09-29
 * Author: Vlad Vladila (Krommatine Systems) · https://github.com/vamitul/indesign-uxp-types
 */
import type { Enumeration, Enumerator, __val} from "../_base/Enums";



declare const __StoryDirectionOptions: unique symbol;


/*----------------------------------------/
/   Internal enumerator interfaces        /
/       -- Not exported --                /
/----------------------------------------*/


interface StoryDirectionOptions extends Enumerator {
  /**
   * @internal **WARNING:** `__StoryDirectionOptions` is a phantom type for compiler strictness only. 
   * It DOES NOT exist at runtime. Do not evaluate it in your logic.
   */
  readonly [__StoryDirectionOptions]: never;
}


/**
 * Left to right direction.
 */
interface StoryDirectionOptions_LEFT_TO_RIGHT_DIRECTION extends StoryDirectionOptions {
  /**
   * @internal **WARNING:** `__val` is a phantom type for compiler strictness only. 
   * It DOES NOT exist at runtime. Do not evaluate it in your logic.
   */
  readonly [__val]: 1278366308;
}

/**
 * Right to left direction.
 */
interface StoryDirectionOptions_RIGHT_TO_LEFT_DIRECTION extends StoryDirectionOptions {
  /**
   * @internal **WARNING:** `__val` is a phantom type for compiler strictness only. 
   * It DOES NOT exist at runtime. Do not evaluate it in your logic.
   */
  readonly [__val]: 1379028068;
}

/**
 * Unknown direction.
 */
interface StoryDirectionOptions_UNKNOWN_DIRECTION extends StoryDirectionOptions {
  /**
   * @internal **WARNING:** `__val` is a phantom type for compiler strictness only. 
   * It DOES NOT exist at runtime. Do not evaluate it in your logic.
   */
  readonly [__val]: 1433299812;
}



/*----------------------------------------/
/                Exports                  /
/----------------------------------------*/

/**
 * Whether a story reads left to right or right to left.
 */
export declare namespace StoryDirectionOptions {
/**
 * Left to right direction.
 */
type LEFT_TO_RIGHT_DIRECTION = StoryDirectionOptions_LEFT_TO_RIGHT_DIRECTION;

/**
 * Right to left direction.
 */
type RIGHT_TO_LEFT_DIRECTION = StoryDirectionOptions_RIGHT_TO_LEFT_DIRECTION;

/**
 * Unknown direction.
 */
type UNKNOWN_DIRECTION = StoryDirectionOptions_UNKNOWN_DIRECTION;

}
/**
 * Whether a story reads left to right or right to left.
 */
export declare const StoryDirectionOptions: typeof Enumeration & {

  /**
   * Left to right direction.
   */
  readonly LEFT_TO_RIGHT_DIRECTION: StoryDirectionOptions_LEFT_TO_RIGHT_DIRECTION;
  /**
   * Left to right direction.
   */
  readonly leftToRightDirection: StoryDirectionOptions_LEFT_TO_RIGHT_DIRECTION;
  /**
   * Right to left direction.
   */
  readonly RIGHT_TO_LEFT_DIRECTION: StoryDirectionOptions_RIGHT_TO_LEFT_DIRECTION;
  /**
   * Right to left direction.
   */
  readonly rightToLeftDirection: StoryDirectionOptions_RIGHT_TO_LEFT_DIRECTION;
  /**
   * Unknown direction.
   */
  readonly UNKNOWN_DIRECTION: StoryDirectionOptions_UNKNOWN_DIRECTION;
  /**
   * Unknown direction.
   */
  readonly unknownDirection: StoryDirectionOptions_UNKNOWN_DIRECTION;
}
