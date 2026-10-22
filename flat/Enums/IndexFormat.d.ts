/**
 * IndexFormat.d.ts — indesign-uxp-types
 * Adobe InDesign 2026 (21.x) ExtendScript DOM declarations,
 * converted from indesign-uxp-types by tools/codemod.
 * Version: 1.0.0 · Updated: 2026-09-29
 * Author: Vlad Vladila (Krommatine Systems) · https://github.com/vamitul/indesign-uxp-types
 */
import type { Enumeration, Enumerator, __val} from "../_base/Enums";



declare const __IndexFormat: unique symbol;


/*----------------------------------------/
/   Internal enumerator interfaces        /
/       -- Not exported --                /
/----------------------------------------*/


interface IndexFormat extends Enumerator {
  /**
   * @internal **WARNING:** `__IndexFormat` is a phantom type for compiler strictness only. 
   * It DOES NOT exist at runtime. Do not evaluate it in your logic.
   */
  readonly [__IndexFormat]: never;
}


/**
 * Places nested topics on the same line as their parent topic, separated by the specified separator.
 */
interface IndexFormat_RUNIN_FORMAT extends IndexFormat {
  /**
   * @internal **WARNING:** `__val` is a phantom type for compiler strictness only. 
   * It DOES NOT exist at runtime. Do not evaluate it in your logic.
   */
  readonly [__val]: 1382631782;
}

/**
 * Places nested topics on the line below and indented from the parent topic.
 */
interface IndexFormat_NESTED_FORMAT extends IndexFormat {
  /**
   * @internal **WARNING:** `__val` is a phantom type for compiler strictness only. 
   * It DOES NOT exist at runtime. Do not evaluate it in your logic.
   */
  readonly [__val]: 1316243814;
}



/*----------------------------------------/
/                Exports                  /
/----------------------------------------*/

/**
 * Options for formatting level 2 and lower index topics.
 */
export declare namespace IndexFormat {
/**
 * Places nested topics on the same line as their parent topic, separated by the specified separator.
 */
type RUNIN_FORMAT = IndexFormat_RUNIN_FORMAT;

/**
 * Places nested topics on the line below and indented from the parent topic.
 */
type NESTED_FORMAT = IndexFormat_NESTED_FORMAT;

}
/**
 * Options for formatting level 2 and lower index topics.
 */
export declare const IndexFormat: typeof Enumeration & {

  /**
   * Places nested topics on the same line as their parent topic, separated by the specified separator.
   */
  readonly RUNIN_FORMAT: IndexFormat_RUNIN_FORMAT;
  /**
   * Places nested topics on the same line as their parent topic, separated by the specified separator.
   */
  readonly runinFormat: IndexFormat_RUNIN_FORMAT;
  /**
   * Places nested topics on the line below and indented from the parent topic.
   */
  readonly NESTED_FORMAT: IndexFormat_NESTED_FORMAT;
  /**
   * Places nested topics on the line below and indented from the parent topic.
   */
  readonly nestedFormat: IndexFormat_NESTED_FORMAT;
}
