/**
 * AutoEnum.d.ts — indesign-uxp-types
 * Adobe InDesign 2026 (21.x) ExtendScript DOM declarations,
 * converted from indesign-uxp-types by tools/codemod.
 * Version: 1.0.0 · Updated: 2026-09-29
 * Author: Vlad Vladila (Krommatine Systems) · https://github.com/vamitul/indesign-uxp-types
 */
import type { Enumeration, Enumerator, __val} from "../_base/Enums";
import type { MeasurementUnits } from "./MeasurementUnits";



declare const __AutoEnum: unique symbol;


/*----------------------------------------/
/   Internal enumerator interfaces        /
/       -- Not exported --                /
/----------------------------------------*/


interface AutoEnum extends Enumerator {
  /**
   * @internal **WARNING:** `__AutoEnum` is a phantom type for compiler strictness only. 
   * It DOES NOT exist at runtime. Do not evaluate it in your logic.
   */
  readonly [__AutoEnum]: never;
}


/**
 * Uses the default value defined automatically for the object based on a parent or other type of object.
 */
interface AutoEnum_AUTO_VALUE extends AutoEnum {
  /**
   * @internal **WARNING:** `__val` is a phantom type for compiler strictness only. 
   * It DOES NOT exist at runtime. Do not evaluate it in your logic.
   */
  readonly [__val]: 1635087471;
}



/*----------------------------------------/
/                Exports                  /
/----------------------------------------*/

/**
 * A single value meaning "automatic" — the object takes the setting from its parent or from the
 * kind of object it is.
 */
export declare namespace AutoEnum {
/**
 * Uses the default value defined automatically for the object based on a parent or other type of object.
 */
type AUTO_VALUE = AutoEnum_AUTO_VALUE;

}
/**
 * A single value meaning "automatic" — the object takes the setting from its parent or from the
 * kind of object it is.
 */
export declare const AutoEnum: typeof Enumeration & {

  /**
   * Uses the default value defined automatically for the object based on a parent or other type of object.
   */
  readonly AUTO_VALUE: AutoEnum_AUTO_VALUE;
  /**
   * Uses the default value defined automatically for the object based on a parent or other type of object.
   */
  readonly autoValue: AutoEnum_AUTO_VALUE;
}
