/**
 * SingleWordJustification.d.ts — indesign-uxp-types
 * Adobe InDesign 2026 (21.x) ExtendScript DOM declarations,
 * converted from indesign-uxp-types by tools/codemod.
 * Version: 1.0.0 · Updated: 2026-09-29
 * Author: Vlad Vladila (Krommatine Systems) · https://github.com/vamitul/indesign-uxp-types
 */
import type { Enumeration, Enumerator, __val} from "../_base/Enums";



declare const __SingleWordJustification: unique symbol;


/*----------------------------------------/
/   Internal enumerator interfaces        /
/       -- Not exported --                /
/----------------------------------------*/


interface SingleWordJustification extends Enumerator {
  /**
   * @internal **WARNING:** `__SingleWordJustification` is a phantom type for compiler strictness only. 
   * It DOES NOT exist at runtime. Do not evaluate it in your logic.
   */
  readonly [__SingleWordJustification]: never;
}


/**
 * Left aligns the word.
 */
interface SingleWordJustification_LEFT_ALIGN extends SingleWordJustification {
  /**
   * @internal **WARNING:** `__val` is a phantom type for compiler strictness only. 
   * It DOES NOT exist at runtime. Do not evaluate it in your logic.
   */
  readonly [__val]: 1818584692;
}

/**
 * Center aligns the word.
 */
interface SingleWordJustification_CENTER_ALIGN extends SingleWordJustification {
  /**
   * @internal **WARNING:** `__val` is a phantom type for compiler strictness only. 
   * It DOES NOT exist at runtime. Do not evaluate it in your logic.
   */
  readonly [__val]: 1667591796;
}

/**
 * Right aligns the word.
 */
interface SingleWordJustification_RIGHT_ALIGN extends SingleWordJustification {
  /**
   * @internal **WARNING:** `__val` is a phantom type for compiler strictness only. 
   * It DOES NOT exist at runtime. Do not evaluate it in your logic.
   */
  readonly [__val]: 1919379572;
}

/**
 * Fully justifies the word.
 */
interface SingleWordJustification_FULLY_JUSTIFIED extends SingleWordJustification {
  /**
   * @internal **WARNING:** `__val` is a phantom type for compiler strictness only. 
   * It DOES NOT exist at runtime. Do not evaluate it in your logic.
   */
  readonly [__val]: 1718971500;
}



/*----------------------------------------/
/                Exports                  /
/----------------------------------------*/

/**
 * Alignment options for lines that contain a single word.
 */
export declare namespace SingleWordJustification {
/**
 * Left aligns the word.
 */
type LEFT_ALIGN = SingleWordJustification_LEFT_ALIGN;

/**
 * Center aligns the word.
 */
type CENTER_ALIGN = SingleWordJustification_CENTER_ALIGN;

/**
 * Right aligns the word.
 */
type RIGHT_ALIGN = SingleWordJustification_RIGHT_ALIGN;

/**
 * Fully justifies the word.
 */
type FULLY_JUSTIFIED = SingleWordJustification_FULLY_JUSTIFIED;

}
/**
 * Alignment options for lines that contain a single word.
 */
export declare const SingleWordJustification: typeof Enumeration & {

  /**
   * Left aligns the word.
   */
  readonly LEFT_ALIGN: SingleWordJustification_LEFT_ALIGN;
  /**
   * Left aligns the word.
   */
  readonly leftAlign: SingleWordJustification_LEFT_ALIGN;
  /**
   * Center aligns the word.
   */
  readonly CENTER_ALIGN: SingleWordJustification_CENTER_ALIGN;
  /**
   * Center aligns the word.
   */
  readonly centerAlign: SingleWordJustification_CENTER_ALIGN;
  /**
   * Right aligns the word.
   */
  readonly RIGHT_ALIGN: SingleWordJustification_RIGHT_ALIGN;
  /**
   * Right aligns the word.
   */
  readonly rightAlign: SingleWordJustification_RIGHT_ALIGN;
  /**
   * Fully justifies the word.
   */
  readonly FULLY_JUSTIFIED: SingleWordJustification_FULLY_JUSTIFIED;
  /**
   * Fully justifies the word.
   */
  readonly fullyJustified: SingleWordJustification_FULLY_JUSTIFIED;
}
