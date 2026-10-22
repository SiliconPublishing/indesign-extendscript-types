/**
 * ObjectTypes.d.ts — indesign-uxp-types
 * Adobe InDesign 2026 (21.x) ExtendScript DOM declarations,
 * converted from indesign-uxp-types by tools/codemod.
 * Version: 1.0.0 · Updated: 2026-09-29
 * Author: Vlad Vladila (Krommatine Systems) · https://github.com/vamitul/indesign-uxp-types
 */
import type { Enumeration, Enumerator, __val} from "../_base/Enums";



declare const __ObjectTypes: unique symbol;


/*----------------------------------------/
/   Internal enumerator interfaces        /
/       -- Not exported --                /
/----------------------------------------*/


interface ObjectTypes extends Enumerator {
  /**
   * @internal **WARNING:** `__ObjectTypes` is a phantom type for compiler strictness only. 
   * It DOES NOT exist at runtime. Do not evaluate it in your logic.
   */
  readonly [__ObjectTypes]: never;
}


/**
 * All frame types.
 */
interface ObjectTypes_ALL_FRAMES_TYPE extends ObjectTypes {
  /**
   * @internal **WARNING:** `__val` is a phantom type for compiler strictness only. 
   * It DOES NOT exist at runtime. Do not evaluate it in your logic.
   */
  readonly [__val]: 1178682995;
}

/**
 * Text frame.
 */
interface ObjectTypes_TEXT_FRAMES_TYPE extends ObjectTypes {
  /**
   * @internal **WARNING:** `__val` is a phantom type for compiler strictness only. 
   * It DOES NOT exist at runtime. Do not evaluate it in your logic.
   */
  readonly [__val]: 1179928178;
}

/**
 * Graphics frame.
 */
interface ObjectTypes_GRAPHIC_FRAMES_TYPE extends ObjectTypes {
  /**
   * @internal **WARNING:** `__val` is a phantom type for compiler strictness only. 
   * It DOES NOT exist at runtime. Do not evaluate it in your logic.
   */
  readonly [__val]: 1179076211;
}

/**
 * Unassigned frame.
 */
interface ObjectTypes_UNASSIGNED_FRAMES_TYPE extends ObjectTypes {
  /**
   * @internal **WARNING:** `__val` is a phantom type for compiler strictness only. 
   * It DOES NOT exist at runtime. Do not evaluate it in your logic.
   */
  readonly [__val]: 1179993715;
}



/*----------------------------------------/
/                Exports                  /
/----------------------------------------*/

/**
 * Options for filtering or specifying page item frame types, such as when
 * selecting or converting object types.
 */
export declare namespace ObjectTypes {
/**
 * All frame types.
 */
type ALL_FRAMES_TYPE = ObjectTypes_ALL_FRAMES_TYPE;

/**
 * Text frame.
 */
type TEXT_FRAMES_TYPE = ObjectTypes_TEXT_FRAMES_TYPE;

/**
 * Graphics frame.
 */
type GRAPHIC_FRAMES_TYPE = ObjectTypes_GRAPHIC_FRAMES_TYPE;

/**
 * Unassigned frame.
 */
type UNASSIGNED_FRAMES_TYPE = ObjectTypes_UNASSIGNED_FRAMES_TYPE;

}
/**
 * Options for filtering or specifying page item frame types, such as when
 * selecting or converting object types.
 */
export declare const ObjectTypes: typeof Enumeration & {

  /**
   * All frame types.
   */
  readonly ALL_FRAMES_TYPE: ObjectTypes_ALL_FRAMES_TYPE;
  /**
   * All frame types.
   */
  readonly allFramesType: ObjectTypes_ALL_FRAMES_TYPE;
  /**
   * Text frame.
   */
  readonly TEXT_FRAMES_TYPE: ObjectTypes_TEXT_FRAMES_TYPE;
  /**
   * Text frame.
   */
  readonly textFramesType: ObjectTypes_TEXT_FRAMES_TYPE;
  /**
   * Graphics frame.
   */
  readonly GRAPHIC_FRAMES_TYPE: ObjectTypes_GRAPHIC_FRAMES_TYPE;
  /**
   * Graphics frame.
   */
  readonly graphicFramesType: ObjectTypes_GRAPHIC_FRAMES_TYPE;
  /**
   * Unassigned frame.
   */
  readonly UNASSIGNED_FRAMES_TYPE: ObjectTypes_UNASSIGNED_FRAMES_TYPE;
  /**
   * Unassigned frame.
   */
  readonly unassignedFramesType: ObjectTypes_UNASSIGNED_FRAMES_TYPE;
}
