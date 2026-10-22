/**
 * PPDValues.d.ts — indesign-uxp-types
 * Adobe InDesign 2026 (21.x) ExtendScript DOM declarations,
 * converted from indesign-uxp-types by tools/codemod.
 * Version: 1.0.0 · Updated: 2026-09-29
 * Author: Vlad Vladila (Krommatine Systems) · https://github.com/vamitul/indesign-uxp-types
 */
import type { Enumeration, Enumerator, __val} from "../_base/Enums";



declare const __PPDValues: unique symbol;


/*----------------------------------------/
/   Internal enumerator interfaces        /
/       -- Not exported --                /
/----------------------------------------*/


interface PPDValues extends Enumerator {
  /**
   * @internal **WARNING:** `__PPDValues` is a phantom type for compiler strictness only. 
   * It DOES NOT exist at runtime. Do not evaluate it in your logic.
   */
  readonly [__PPDValues]: never;
}


/**
 * Device-independent.
 */
interface PPDValues_DEVICE_INDEPENDENT extends PPDValues {
  /**
   * @internal **WARNING:** `__val` is a phantom type for compiler strictness only. 
   * It DOES NOT exist at runtime. Do not evaluate it in your logic.
   */
  readonly [__val]: 1684367716;
}



/*----------------------------------------/
/                Exports                  /
/----------------------------------------*/

/**
 * A stand-in for a PostScript Printer Description file when no specific one is used.
 */
export declare namespace PPDValues {
/**
 * Device-independent.
 */
type DEVICE_INDEPENDENT = PPDValues_DEVICE_INDEPENDENT;

}
/**
 * A stand-in for a PostScript Printer Description file when no specific one is used.
 */
export declare const PPDValues: typeof Enumeration & {

  /**
   * Device-independent.
   */
  readonly DEVICE_INDEPENDENT: PPDValues_DEVICE_INDEPENDENT;
  /**
   * Device-independent.
   */
  readonly deviceIndependent: PPDValues_DEVICE_INDEPENDENT;
}
