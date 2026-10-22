/**
 * SourceSpaces.d.ts — indesign-uxp-types
 * Adobe InDesign 2026 (21.x) ExtendScript DOM declarations,
 * converted from indesign-uxp-types by tools/codemod.
 * Version: 1.0.0 · Updated: 2026-09-29
 * Author: Vlad Vladila (Krommatine Systems) · https://github.com/vamitul/indesign-uxp-types
 */
import type { Enumeration, Enumerator, __val} from "../_base/Enums";



declare const __SourceSpaces: unique symbol;


/*----------------------------------------/
/   Internal enumerator interfaces        /
/       -- Not exported --                /
/----------------------------------------*/


interface SourceSpaces extends Enumerator {
  /**
   * @internal **WARNING:** `__SourceSpaces` is a phantom type for compiler strictness only. 
   * It DOES NOT exist at runtime. Do not evaluate it in your logic.
   */
  readonly [__SourceSpaces]: never;
}


/**
 * Uses the color space of the document.
 */
interface SourceSpaces_USE_DOCUMENT extends SourceSpaces {
  /**
   * @internal **WARNING:** `__val` is a phantom type for compiler strictness only. 
   * It DOES NOT exist at runtime. Do not evaluate it in your logic.
   */
  readonly [__val]: 1967419235;
}

/**
 * Uses the color space of the proof.
 */
interface SourceSpaces_PROOF_SPACE extends SourceSpaces {
  /**
   * @internal **WARNING:** `__val` is a phantom type for compiler strictness only. 
   * It DOES NOT exist at runtime. Do not evaluate it in your logic.
   */
  readonly [__val]: 1886548848;
}



/*----------------------------------------/
/                Exports                  /
/----------------------------------------*/

/**
 * Which color space a color-management operation reads from — the document's own space or the
 * current proof space.
 */
export declare namespace SourceSpaces {
/**
 * Uses the color space of the document.
 */
type USE_DOCUMENT = SourceSpaces_USE_DOCUMENT;

/**
 * Uses the color space of the proof.
 */
type PROOF_SPACE = SourceSpaces_PROOF_SPACE;

}
/**
 * Which color space a color-management operation reads from — the document's own space or the
 * current proof space.
 */
export declare const SourceSpaces: typeof Enumeration & {

  /**
   * Uses the color space of the document.
   */
  readonly USE_DOCUMENT: SourceSpaces_USE_DOCUMENT;
  /**
   * Uses the color space of the document.
   */
  readonly useDocument: SourceSpaces_USE_DOCUMENT;
  /**
   * Uses the color space of the proof.
   */
  readonly PROOF_SPACE: SourceSpaces_PROOF_SPACE;
  /**
   * Uses the color space of the proof.
   */
  readonly proofSpace: SourceSpaces_PROOF_SPACE;
}
