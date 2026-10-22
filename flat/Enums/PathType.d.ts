/**
 * PathType.d.ts — indesign-uxp-types
 * Adobe InDesign 2026 (21.x) ExtendScript DOM declarations,
 * converted from indesign-uxp-types by tools/codemod.
 * Version: 1.0.0 · Updated: 2026-09-29
 * Author: Vlad Vladila (Krommatine Systems) · https://github.com/vamitul/indesign-uxp-types
 */
import type { Enumeration, Enumerator, __val} from "../_base/Enums";



declare const __PathType: unique symbol;


/*----------------------------------------/
/   Internal enumerator interfaces        /
/       -- Not exported --                /
/----------------------------------------*/


interface PathType extends Enumerator {
  /**
   * @internal **WARNING:** `__PathType` is a phantom type for compiler strictness only. 
   * It DOES NOT exist at runtime. Do not evaluate it in your logic.
   */
  readonly [__PathType]: never;
}


/**
 * The path is an open path.
 */
interface PathType_OPEN_PATH extends PathType {
  /**
   * @internal **WARNING:** `__val` is a phantom type for compiler strictness only. 
   * It DOES NOT exist at runtime. Do not evaluate it in your logic.
   */
  readonly [__val]: 1869639280;
}

/**
 * The path is a closed path.
 */
interface PathType_CLOSED_PATH extends PathType {
  /**
   * @internal **WARNING:** `__val` is a phantom type for compiler strictness only. 
   * It DOES NOT exist at runtime. Do not evaluate it in your logic.
   */
  readonly [__val]: 1668051812;
}



/*----------------------------------------/
/                Exports                  /
/----------------------------------------*/

/**
 * Whether the path's ends are joined into a closed shape or left open.
 */
export declare namespace PathType {
/**
 * The path is an open path.
 */
type OPEN_PATH = PathType_OPEN_PATH;

/**
 * The path is a closed path.
 */
type CLOSED_PATH = PathType_CLOSED_PATH;

}
/**
 * Whether the path's ends are joined into a closed shape or left open.
 */
export declare const PathType: typeof Enumeration & {

  /**
   * The path is an open path.
   */
  readonly OPEN_PATH: PathType_OPEN_PATH;
  /**
   * The path is an open path.
   */
  readonly openPath: PathType_OPEN_PATH;
  /**
   * The path is a closed path.
   */
  readonly CLOSED_PATH: PathType_CLOSED_PATH;
  /**
   * The path is a closed path.
   */
  readonly closedPath: PathType_CLOSED_PATH;
}
