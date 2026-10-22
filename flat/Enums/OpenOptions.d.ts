/**
 * OpenOptions.d.ts — indesign-uxp-types
 * Adobe InDesign 2026 (21.x) ExtendScript DOM declarations,
 * converted from indesign-uxp-types by tools/codemod.
 * Version: 1.0.0 · Updated: 2026-09-29
 * Author: Vlad Vladila (Krommatine Systems) · https://github.com/vamitul/indesign-uxp-types
 */
import type { Enumeration, Enumerator, __val} from "../_base/Enums";



declare const __OpenOptions: unique symbol;


/*----------------------------------------/
/   Internal enumerator interfaces        /
/       -- Not exported --                /
/----------------------------------------*/


interface OpenOptions extends Enumerator {
  /**
   * @internal **WARNING:** `__OpenOptions` is a phantom type for compiler strictness only. 
   * It DOES NOT exist at runtime. Do not evaluate it in your logic.
   */
  readonly [__OpenOptions]: never;
}


/**
 * Default based on the file type or extension.
 */
interface OpenOptions_DEFAULT_VALUE extends OpenOptions {
  /**
   * @internal **WARNING:** `__val` is a phantom type for compiler strictness only. 
   * It DOES NOT exist at runtime. Do not evaluate it in your logic.
   */
  readonly [__val]: 1147563124;
}

/**
 * Open the document itself.
 */
interface OpenOptions_OPEN_ORIGINAL extends OpenOptions {
  /**
   * @internal **WARNING:** `__val` is a phantom type for compiler strictness only. 
   * It DOES NOT exist at runtime. Do not evaluate it in your logic.
   */
  readonly [__val]: 1332760434;
}

/**
 * Open a copy of the document.
 */
interface OpenOptions_OPEN_COPY extends OpenOptions {
  /**
   * @internal **WARNING:** `__val` is a phantom type for compiler strictness only. 
   * It DOES NOT exist at runtime. Do not evaluate it in your logic.
   */
  readonly [__val]: 1332757360;
}



/*----------------------------------------/
/                Exports                  /
/----------------------------------------*/

/**
 * Used to specify how to open a document.
 */
export declare namespace OpenOptions {
/**
 * Default based on the file type or extension.
 */
type DEFAULT_VALUE = OpenOptions_DEFAULT_VALUE;

/**
 * Open the document itself.
 */
type OPEN_ORIGINAL = OpenOptions_OPEN_ORIGINAL;

/**
 * Open a copy of the document.
 */
type OPEN_COPY = OpenOptions_OPEN_COPY;

}
/**
 * Used to specify how to open a document.
 */
export declare const OpenOptions: typeof Enumeration & {

  /**
   * Default based on the file type or extension.
   */
  readonly DEFAULT_VALUE: OpenOptions_DEFAULT_VALUE;
  /**
   * Default based on the file type or extension.
   */
  readonly defaultValue: OpenOptions_DEFAULT_VALUE;
  /**
   * Open the document itself.
   */
  readonly OPEN_ORIGINAL: OpenOptions_OPEN_ORIGINAL;
  /**
   * Open the document itself.
   */
  readonly openOriginal: OpenOptions_OPEN_ORIGINAL;
  /**
   * Open a copy of the document.
   */
  readonly OPEN_COPY: OpenOptions_OPEN_COPY;
  /**
   * Open a copy of the document.
   */
  readonly openCopy: OpenOptions_OPEN_COPY;
}
