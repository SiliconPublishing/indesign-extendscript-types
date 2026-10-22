/**
 * CharacterAlignment.d.ts — indesign-uxp-types
 * Adobe InDesign 2026 (21.x) ExtendScript DOM declarations,
 * converted from indesign-uxp-types by tools/codemod.
 * Version: 1.0.0 · Updated: 2026-09-29
 * Author: Vlad Vladila (Krommatine Systems) · https://github.com/vamitul/indesign-uxp-types
 */
import type { Enumeration, Enumerator, __val} from "../_base/Enums";



declare const __CharacterAlignment: unique symbol;


/*----------------------------------------/
/   Internal enumerator interfaces        /
/       -- Not exported --                /
/----------------------------------------*/


interface CharacterAlignment extends Enumerator {
  /**
   * @internal **WARNING:** `__CharacterAlignment` is a phantom type for compiler strictness only. 
   * It DOES NOT exist at runtime. Do not evaluate it in your logic.
   */
  readonly [__CharacterAlignment]: never;
}


/**
 * Aligns small characters in a line to the large character.
 */
interface CharacterAlignment_ALIGN_BASELINE extends CharacterAlignment {
  /**
   * @internal **WARNING:** `__val` is a phantom type for compiler strictness only. 
   * It DOES NOT exist at runtime. Do not evaluate it in your logic.
   */
  readonly [__val]: 1247896172;
}

/**
 * Aligns small characters in horizontal text to the top of the em box of large characters. In vertical text, aligns characters to the right of the em box.
 */
interface CharacterAlignment_ALIGN_EM_TOP extends CharacterAlignment {
  /**
   * @internal **WARNING:** `__val` is a phantom type for compiler strictness only. 
   * It DOES NOT exist at runtime. Do not evaluate it in your logic.
   */
  readonly [__val]: 1247900784;
}

/**
 * Aligns small characters to the center of the em box of large characters.
 */
interface CharacterAlignment_ALIGN_EM_CENTER extends CharacterAlignment {
  /**
   * @internal **WARNING:** `__val` is a phantom type for compiler strictness only. 
   * It DOES NOT exist at runtime. Do not evaluate it in your logic.
   */
  readonly [__val]: 1247896436;
}

/**
 * Aligns small characters in horizontal text to the bottom of the em box of large characters. In vertical text, aligns characters to the left of the em box.
 */
interface CharacterAlignment_ALIGN_EM_BOTTOM extends CharacterAlignment {
  /**
   * @internal **WARNING:** `__val` is a phantom type for compiler strictness only. 
   * It DOES NOT exist at runtime. Do not evaluate it in your logic.
   */
  readonly [__val]: 1247896173;
}

/**
 * Aligns small characters in horizontal text to the top of the ICF of large characters. In vertical text, aligns characters to the right of the ICF.
 */
interface CharacterAlignment_ALIGN_ICF_TOP extends CharacterAlignment {
  /**
   * @internal **WARNING:** `__val` is a phantom type for compiler strictness only. 
   * It DOES NOT exist at runtime. Do not evaluate it in your logic.
   */
  readonly [__val]: 1248425072;
}

/**
 * Aligns small characters in horizontal text to the bottom of the ICF of large characters. In vertical text, aligns characters to the left of the ICF.
 */
interface CharacterAlignment_ALIGN_ICF_BOTTOM extends CharacterAlignment {
  /**
   * @internal **WARNING:** `__val` is a phantom type for compiler strictness only. 
   * It DOES NOT exist at runtime. Do not evaluate it in your logic.
   */
  readonly [__val]: 1248420461;
}



/*----------------------------------------/
/                Exports                  /
/----------------------------------------*/

/**
 * Options for aligning small characters to the largest character in the line.
 */
export declare namespace CharacterAlignment {
/**
 * Aligns small characters in a line to the large character.
 */
type ALIGN_BASELINE = CharacterAlignment_ALIGN_BASELINE;

/**
 * Aligns small characters in horizontal text to the top of the em box of large characters. In vertical text, aligns characters to the right of the em box.
 */
type ALIGN_EM_TOP = CharacterAlignment_ALIGN_EM_TOP;

/**
 * Aligns small characters to the center of the em box of large characters.
 */
type ALIGN_EM_CENTER = CharacterAlignment_ALIGN_EM_CENTER;

/**
 * Aligns small characters in horizontal text to the bottom of the em box of large characters. In vertical text, aligns characters to the left of the em box.
 */
type ALIGN_EM_BOTTOM = CharacterAlignment_ALIGN_EM_BOTTOM;

/**
 * Aligns small characters in horizontal text to the top of the ICF of large characters. In vertical text, aligns characters to the right of the ICF.
 */
type ALIGN_ICF_TOP = CharacterAlignment_ALIGN_ICF_TOP;

/**
 * Aligns small characters in horizontal text to the bottom of the ICF of large characters. In vertical text, aligns characters to the left of the ICF.
 */
type ALIGN_ICF_BOTTOM = CharacterAlignment_ALIGN_ICF_BOTTOM;

}
/**
 * Options for aligning small characters to the largest character in the line.
 */
export declare const CharacterAlignment: typeof Enumeration & {

  /**
   * Aligns small characters in a line to the large character.
   */
  readonly ALIGN_BASELINE: CharacterAlignment_ALIGN_BASELINE;
  /**
   * Aligns small characters in a line to the large character.
   */
  readonly alignBaseline: CharacterAlignment_ALIGN_BASELINE;
  /**
   * Aligns small characters in horizontal text to the top of the em box of large characters. In vertical text, aligns characters to the right of the em box.
   */
  readonly ALIGN_EM_TOP: CharacterAlignment_ALIGN_EM_TOP;
  /**
   * Aligns small characters in horizontal text to the top of the em box of large characters. In vertical text, aligns characters to the right of the em box.
   */
  readonly alignEmTop: CharacterAlignment_ALIGN_EM_TOP;
  /**
   * Aligns small characters to the center of the em box of large characters.
   */
  readonly ALIGN_EM_CENTER: CharacterAlignment_ALIGN_EM_CENTER;
  /**
   * Aligns small characters to the center of the em box of large characters.
   */
  readonly alignEmCenter: CharacterAlignment_ALIGN_EM_CENTER;
  /**
   * Aligns small characters in horizontal text to the bottom of the em box of large characters. In vertical text, aligns characters to the left of the em box.
   */
  readonly ALIGN_EM_BOTTOM: CharacterAlignment_ALIGN_EM_BOTTOM;
  /**
   * Aligns small characters in horizontal text to the bottom of the em box of large characters. In vertical text, aligns characters to the left of the em box.
   */
  readonly alignEmBottom: CharacterAlignment_ALIGN_EM_BOTTOM;
  /**
   * Aligns small characters in horizontal text to the top of the ICF of large characters. In vertical text, aligns characters to the right of the ICF.
   */
  readonly ALIGN_ICF_TOP: CharacterAlignment_ALIGN_ICF_TOP;
  /**
   * Aligns small characters in horizontal text to the bottom of the ICF of large characters. In vertical text, aligns characters to the left of the ICF.
   */
  readonly ALIGN_ICF_BOTTOM: CharacterAlignment_ALIGN_ICF_BOTTOM;
}
