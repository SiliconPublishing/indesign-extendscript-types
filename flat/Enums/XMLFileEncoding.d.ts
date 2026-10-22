/**
 * XMLFileEncoding.d.ts — indesign-uxp-types
 * Adobe InDesign 2026 (21.x) ExtendScript DOM declarations,
 * converted from indesign-uxp-types by tools/codemod.
 * Version: 1.0.0 · Updated: 2026-09-29
 * Author: Vlad Vladila (Krommatine Systems) · https://github.com/vamitul/indesign-uxp-types
 */
import type { Enumeration, Enumerator, __val} from "../_base/Enums";



declare const __XMLFileEncoding: unique symbol;


/*----------------------------------------/
/   Internal enumerator interfaces        /
/       -- Not exported --                /
/----------------------------------------*/


interface XMLFileEncoding extends Enumerator {
  /**
   * @internal **WARNING:** `__XMLFileEncoding` is a phantom type for compiler strictness only. 
   * It DOES NOT exist at runtime. Do not evaluate it in your logic.
   */
  readonly [__XMLFileEncoding]: never;
}


/**
 * UTF-8 encoding.
 */
interface XMLFileEncoding_UTF8 extends XMLFileEncoding {
  /**
   * @internal **WARNING:** `__val` is a phantom type for compiler strictness only. 
   * It DOES NOT exist at runtime. Do not evaluate it in your logic.
   */
  readonly [__val]: 1937134904;
}

/**
 * UTF-16 encoding.
 */
interface XMLFileEncoding_UTF16 extends XMLFileEncoding {
  /**
   * @internal **WARNING:** `__val` is a phantom type for compiler strictness only. 
   * It DOES NOT exist at runtime. Do not evaluate it in your logic.
   */
  readonly [__val]: 1937125686;
}

/**
 * Shift-JIS encoding.
 */
interface XMLFileEncoding_SHIFT_JIS extends XMLFileEncoding {
  /**
   * @internal **WARNING:** `__val` is a phantom type for compiler strictness only. 
   * It DOES NOT exist at runtime. Do not evaluate it in your logic.
   */
  readonly [__val]: 1249077875;
}



/*----------------------------------------/
/                Exports                  /
/----------------------------------------*/

/**
 * File encoding options for exported XML content.
 */
export declare namespace XMLFileEncoding {
/**
 * UTF-8 encoding.
 */
type UTF8 = XMLFileEncoding_UTF8;

/**
 * UTF-16 encoding.
 */
type UTF16 = XMLFileEncoding_UTF16;

/**
 * Shift-JIS encoding.
 */
type SHIFT_JIS = XMLFileEncoding_SHIFT_JIS;

}
/**
 * File encoding options for exported XML content.
 */
export declare const XMLFileEncoding: typeof Enumeration & {

  /**
   * UTF-8 encoding.
   */
  readonly UTF8: XMLFileEncoding_UTF8;
  /**
   * UTF-8 encoding.
   */
  readonly utf8: XMLFileEncoding_UTF8;

  /**
   * UTF-16 encoding.
   */
  readonly UTF16: XMLFileEncoding_UTF16;
  /**
   * UTF-16 encoding.
   */
  readonly utf16: XMLFileEncoding_UTF16;

  /**
   * Shift-JIS encoding.
   */
  readonly SHIFT_JIS: XMLFileEncoding_SHIFT_JIS;
}
