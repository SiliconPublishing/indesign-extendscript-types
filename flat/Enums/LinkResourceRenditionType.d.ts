/**
 * LinkResourceRenditionType.d.ts — indesign-uxp-types
 * Adobe InDesign 2026 (21.x) ExtendScript DOM declarations,
 * converted from indesign-uxp-types by tools/codemod.
 * Version: 1.0.0 · Updated: 2026-09-29
 * Author: Vlad Vladila (Krommatine Systems) · https://github.com/vamitul/indesign-uxp-types
 */
import type { Enumeration, Enumerator, __val} from "../_base/Enums";



declare const __LinkResourceRenditionType: unique symbol;


/*----------------------------------------/
/   Internal enumerator interfaces        /
/       -- Not exported --                /
/----------------------------------------*/


interface LinkResourceRenditionType extends Enumerator {
  /**
   * @internal **WARNING:** `__LinkResourceRenditionType` is a phantom type for compiler strictness only. 
   * It DOES NOT exist at runtime. Do not evaluate it in your logic.
   */
  readonly [__LinkResourceRenditionType]: never;
}


/**
 * A low-resolution for-position-only rendition.
 */
interface LinkResourceRenditionType_FPO extends LinkResourceRenditionType {
  /**
   * @internal **WARNING:** `__val` is a phantom type for compiler strictness only. 
   * It DOES NOT exist at runtime. Do not evaluate it in your logic.
   */
  readonly [__val]: 1281781871;
}

/**
 * The original, full-resolution rendition.
 */
interface LinkResourceRenditionType_ACTUAL extends LinkResourceRenditionType {
  /**
   * @internal **WARNING:** `__val` is a phantom type for compiler strictness only. 
   * It DOES NOT exist at runtime. Do not evaluate it in your logic.
   */
  readonly [__val]: 1282372201;
}



/*----------------------------------------/
/                Exports                  /
/----------------------------------------*/

/**
 * The rendition type of the link resource.
 */
export declare namespace LinkResourceRenditionType {
/**
 * The link resource has FPO rendition.
 */
type FPO = LinkResourceRenditionType_FPO;

/**
 * The link resource has original rendition.
 */
type ACTUAL = LinkResourceRenditionType_ACTUAL;

}
/**
 * The rendition type of the link resource.
 */
export declare const LinkResourceRenditionType: typeof Enumeration & {

  /**
   * A low-resolution for-position-only rendition.
   */
  readonly FPO: LinkResourceRenditionType_FPO;
  /**
   * A low-resolution for-position-only rendition.
   */
  readonly fpo: LinkResourceRenditionType_FPO;

  /**
   * The original, full-resolution rendition.
   */
  readonly ACTUAL: LinkResourceRenditionType_ACTUAL;
  /**
   * The original, full-resolution rendition.
   */
  readonly actual: LinkResourceRenditionType_ACTUAL;

}
