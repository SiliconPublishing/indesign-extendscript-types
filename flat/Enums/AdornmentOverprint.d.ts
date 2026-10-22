/**
 * AdornmentOverprint.d.ts — indesign-uxp-types
 * Adobe InDesign 2026 (21.x) ExtendScript DOM declarations,
 * converted from indesign-uxp-types by tools/codemod.
 * Version: 1.0.0 · Updated: 2026-09-29
 * Author: Vlad Vladila (Krommatine Systems) · https://github.com/vamitul/indesign-uxp-types
 */
import type { Enumeration, Enumerator, __val} from "../_base/Enums";



declare const __AdornmentOverprint: unique symbol;


/*----------------------------------------/
/   Internal enumerator interfaces        /
/       -- Not exported --                /
/----------------------------------------*/


interface AdornmentOverprint extends Enumerator {
  /**
   * @internal **WARNING:** `__AdornmentOverprint` is a phantom type for compiler strictness only. 
   * It DOES NOT exist at runtime. Do not evaluate it in your logic.
   */
  readonly [__AdornmentOverprint]: never;
}


/**
 * Uses auto overprint.
 */
interface AdornmentOverprint_AUTO extends AdornmentOverprint {
  /**
   * @internal **WARNING:** `__val` is a phantom type for compiler strictness only. 
   * It DOES NOT exist at runtime. Do not evaluate it in your logic.
   */
  readonly [__val]: 1635019116;
}

/**
 * Turns on overprint.
 */
interface AdornmentOverprint_OVERPRINT_ON extends AdornmentOverprint {
  /**
   * @internal **WARNING:** `__val` is a phantom type for compiler strictness only. 
   * It DOES NOT exist at runtime. Do not evaluate it in your logic.
   */
  readonly [__val]: 1701736302;
}

/**
 * Turns off overprint.
 */
interface AdornmentOverprint_OVERPRINT_OFF extends AdornmentOverprint {
  /**
   * @internal **WARNING:** `__val` is a phantom type for compiler strictness only. 
   * It DOES NOT exist at runtime. Do not evaluate it in your logic.
   */
  readonly [__val]: 1701736294;
}



/*----------------------------------------/
/                Exports                  /
/----------------------------------------*/

/**
 * Overprint options for kenten marks — the emphasis dots used in Japanese
 * typesetting to highlight characters, similar in role to bold or underline in Latin text.
 */
export declare namespace AdornmentOverprint {
/**
 * Uses auto overprint.
 */
type AUTO = AdornmentOverprint_AUTO;

/**
 * Turns on overprint.
 */
type OVERPRINT_ON = AdornmentOverprint_OVERPRINT_ON;

/**
 * Turns off overprint.
 */
type OVERPRINT_OFF = AdornmentOverprint_OVERPRINT_OFF;

}
/**
 * Overprint options for kenten marks — the emphasis dots used in Japanese
 * typesetting to highlight characters, similar in role to bold or underline in Latin text.
 */
export declare const AdornmentOverprint: typeof Enumeration & {

  /**
   * Uses auto overprint.
   */
  readonly AUTO: AdornmentOverprint_AUTO;
  /**
   * Uses auto overprint.
   */
  readonly auto: AdornmentOverprint_AUTO;

  /**
   * Turns on overprint.
   */
  readonly OVERPRINT_ON: AdornmentOverprint_OVERPRINT_ON;
  /**
   * Turns on overprint.
   */
  readonly overprintOn: AdornmentOverprint_OVERPRINT_ON;
  /**
   * Turns off overprint.
   */
  readonly OVERPRINT_OFF: AdornmentOverprint_OVERPRINT_OFF;
  /**
   * Turns off overprint.
   */
  readonly overprintOff: AdornmentOverprint_OVERPRINT_OFF;
}
