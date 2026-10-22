/**
 * TextPathEffects.d.ts — indesign-uxp-types
 * Adobe InDesign 2026 (21.x) ExtendScript DOM declarations,
 * converted from indesign-uxp-types by tools/codemod.
 * Version: 1.0.0 · Updated: 2026-09-29
 * Author: Vlad Vladila (Krommatine Systems) · https://github.com/vamitul/indesign-uxp-types
 */
import type { Enumeration, Enumerator, __val} from "../_base/Enums";



declare const __TextPathEffects: unique symbol;


/*----------------------------------------/
/   Internal enumerator interfaces        /
/       -- Not exported --                /
/----------------------------------------*/


interface TextPathEffects extends Enumerator {
  /**
   * @internal **WARNING:** `__TextPathEffects` is a phantom type for compiler strictness only. 
   * It DOES NOT exist at runtime. Do not evaluate it in your logic.
   */
  readonly [__TextPathEffects]: never;
}


/**
 * The center of each character's baseline is parallel to the path's tangent. This is the default effect.
 */
interface TextPathEffects_RAINBOW_PATH_EFFECT extends TextPathEffects {
  /**
   * @internal **WARNING:** `__val` is a phantom type for compiler strictness only. 
   * It DOES NOT exist at runtime. Do not evaluate it in your logic.
   */
  readonly [__val]: 1601201778;
}

/**
 * The text characters' vertical edges are perfectly vertical regardless of the path shape.
 */
interface TextPathEffects_SKEW_PATH_EFFECT extends TextPathEffects {
  /**
   * @internal **WARNING:** `__val` is a phantom type for compiler strictness only. 
   * It DOES NOT exist at runtime. Do not evaluate it in your logic.
   */
  readonly [__val]: 1601201779;
}

/**
 * The text characters' horizontal edges are perfectly horizontal regardless of the path shape.
 */
interface TextPathEffects_RIBBON_PATH_EFFECT extends TextPathEffects {
  /**
   * @internal **WARNING:** `__val` is a phantom type for compiler strictness only. 
   * It DOES NOT exist at runtime. Do not evaluate it in your logic.
   */
  readonly [__val]: 1601201715;
}

/**
 * The left edge of each character's baseline is on the path and no characters are rotated.
 */
interface TextPathEffects_STAIR_STEP_PATH_EFFECT extends TextPathEffects {
  /**
   * @internal **WARNING:** `__val` is a phantom type for compiler strictness only. 
   * It DOES NOT exist at runtime. Do not evaluate it in your logic.
   */
  readonly [__val]: 1601205107;
}

/**
 * The center of each character's baseline is on the path while each vertical edge is in line with the path's center point.
 */
interface TextPathEffects_GRAVITY_PATH_EFFECT extends TextPathEffects {
  /**
   * @internal **WARNING:** `__val` is a phantom type for compiler strictness only. 
   * It DOES NOT exist at runtime. Do not evaluate it in your logic.
   */
  readonly [__val]: 1601201767;
}



/*----------------------------------------/
/                Exports                  /
/----------------------------------------*/

/**
 * Options for the alignment and appearance of type on a path.
 */
export declare namespace TextPathEffects {
/**
 * The center of each character's baseline is parallel to the path's tangent. This is the default effect.
 */
type RAINBOW_PATH_EFFECT = TextPathEffects_RAINBOW_PATH_EFFECT;

/**
 * The text characters' vertical edges are perfectly vertical regardless of the path shape.
 */
type SKEW_PATH_EFFECT = TextPathEffects_SKEW_PATH_EFFECT;

/**
 * The text characters' horizontal edges are perfectly horizontal regardless of the path shape.
 */
type RIBBON_PATH_EFFECT = TextPathEffects_RIBBON_PATH_EFFECT;

/**
 * The left edge of each character's baseline is on the path and no characters are rotated.
 */
type STAIR_STEP_PATH_EFFECT = TextPathEffects_STAIR_STEP_PATH_EFFECT;

/**
 * The center of each character's baseline is on the path while each vertical edge is in line with the path's center point.
 */
type GRAVITY_PATH_EFFECT = TextPathEffects_GRAVITY_PATH_EFFECT;

}
/**
 * Options for the alignment and appearance of type on a path.
 */
export declare const TextPathEffects: typeof Enumeration & {

  /**
   * The center of each character's baseline is parallel to the path's tangent. This is the default effect.
   */
  readonly RAINBOW_PATH_EFFECT: TextPathEffects_RAINBOW_PATH_EFFECT;
  /**
   * The center of each character's baseline is parallel to the path's tangent. This is the default effect.
   */
  readonly rainbowPathEffect: TextPathEffects_RAINBOW_PATH_EFFECT;
  /**
   * The text characters' vertical edges are perfectly vertical regardless of the path shape.
   */
  readonly SKEW_PATH_EFFECT: TextPathEffects_SKEW_PATH_EFFECT;
  /**
   * The text characters' vertical edges are perfectly vertical regardless of the path shape.
   */
  readonly skewPathEffect: TextPathEffects_SKEW_PATH_EFFECT;
  /**
   * The text characters' horizontal edges are perfectly horizontal regardless of the path shape.
   */
  readonly RIBBON_PATH_EFFECT: TextPathEffects_RIBBON_PATH_EFFECT;
  /**
   * The text characters' horizontal edges are perfectly horizontal regardless of the path shape.
   */
  readonly ribbonPathEffect: TextPathEffects_RIBBON_PATH_EFFECT;
  /**
   * The left edge of each character's baseline is on the path and no characters are rotated.
   */
  readonly STAIR_STEP_PATH_EFFECT: TextPathEffects_STAIR_STEP_PATH_EFFECT;
  /**
   * The left edge of each character's baseline is on the path and no characters are rotated.
   */
  readonly stairStepPathEffect: TextPathEffects_STAIR_STEP_PATH_EFFECT;
  /**
   * The center of each character's baseline is on the path while each vertical edge is in line with the path's center point.
   */
  readonly GRAVITY_PATH_EFFECT: TextPathEffects_GRAVITY_PATH_EFFECT;
  /**
   * The center of each character's baseline is on the path while each vertical edge is in line with the path's center point.
   */
  readonly gravityPathEffect: TextPathEffects_GRAVITY_PATH_EFFECT;
}
