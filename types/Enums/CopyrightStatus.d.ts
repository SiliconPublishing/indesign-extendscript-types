/**
 * CopyrightStatus.d.ts — indesign-uxp-types
 * Adobe InDesign 2026 (21.x) ExtendScript DOM declarations,
 * converted from indesign-uxp-types by tools/codemod.
 * Version: 1.0.0 · Updated: 2026-09-29
 * Author: Vlad Vladila (Krommatine Systems) · https://github.com/vamitul/indesign-uxp-types
 */
import type { Enumeration, Enumerator, __val} from "../_base/Enums";



declare const __CopyrightStatus: unique symbol;


/*----------------------------------------/
/   Internal enumerator interfaces        /
/       -- Not exported --                /
/----------------------------------------*/


interface CopyrightStatus extends Enumerator {
  /**
   * @internal **WARNING:** `__CopyrightStatus` is a phantom type for compiler strictness only. 
   * It DOES NOT exist at runtime. Do not evaluate it in your logic.
   */
  readonly [__CopyrightStatus]: never;
}


/**
 * The copyright status is unknown.
 */
interface CopyrightStatus_UNKNOWN extends CopyrightStatus {
  /**
   * @internal **WARNING:** `__val` is a phantom type for compiler strictness only. 
   * It DOES NOT exist at runtime. Do not evaluate it in your logic.
   */
  readonly [__val]: 1433299822;
}

/**
 * The document is copyrighted.
 */
interface CopyrightStatus_YES extends CopyrightStatus {
  /**
   * @internal **WARNING:** `__val` is a phantom type for compiler strictness only. 
   * It DOES NOT exist at runtime. Do not evaluate it in your logic.
   */
  readonly [__val]: 2036691744;
}

/**
 * The document is in the public domain.
 */
interface CopyrightStatus_NO extends CopyrightStatus {
  /**
   * @internal **WARNING:** `__val` is a phantom type for compiler strictness only. 
   * It DOES NOT exist at runtime. Do not evaluate it in your logic.
   */
  readonly [__val]: 1852776480;
}



/*----------------------------------------/
/                Exports                  /
/----------------------------------------*/

/**
 * The copyright status of the document.
 */
export declare namespace CopyrightStatus {
/**
 * The copyright status is unknown.
 */
type UNKNOWN = CopyrightStatus_UNKNOWN;

/**
 * The document is copyrighted.
 */
type YES = CopyrightStatus_YES;

/**
 * The document is in the public domain.
 */
type NO = CopyrightStatus_NO;

}
/**
 * The copyright status of the document.
 */
export declare const CopyrightStatus: typeof Enumeration & {

  /**
   * The copyright status is unknown.
   */
  readonly UNKNOWN: CopyrightStatus_UNKNOWN;
  /**
   * The copyright status is unknown.
   */
  readonly unknown: CopyrightStatus_UNKNOWN;

  /**
   * The document is copyrighted.
   */
  readonly YES: CopyrightStatus_YES;
  /**
   * The document is copyrighted.
   */
  readonly yes: CopyrightStatus_YES;

  /**
   * The document is in the public domain.
   */
  readonly NO: CopyrightStatus_NO;
  /**
   * The document is in the public domain.
   */
  readonly no: CopyrightStatus_NO;

}
