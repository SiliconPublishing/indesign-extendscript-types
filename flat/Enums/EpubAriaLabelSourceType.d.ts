/**
 * EpubAriaLabelSourceType.d.ts — indesign-uxp-types
 * Adobe InDesign 2026 (21.x) ExtendScript DOM declarations,
 * converted from indesign-uxp-types by tools/codemod.
 * Version: 1.0.0 · Updated: 2026-09-29
 * Author: Vlad Vladila (Krommatine Systems) · https://github.com/vamitul/indesign-uxp-types
 */
import type { Enumeration, Enumerator, __val} from "../_base/Enums";



declare const __EpubAriaLabelSourceType: unique symbol;


/*----------------------------------------/
/   Internal enumerator interfaces        /
/       -- Not exported --                /
/----------------------------------------*/


interface EpubAriaLabelSourceType extends Enumerator {
  /**
   * @internal **WARNING:** `__EpubAriaLabelSourceType` is a phantom type for compiler strictness only. 
   * It DOES NOT exist at runtime. Do not evaluate it in your logic.
   */
  readonly [__EpubAriaLabelSourceType]: never;
}


/**
 * Automatically derive the aria-label.
 */
interface EpubAriaLabelSourceType_AUTOMATIC_ARIA_LABEL extends EpubAriaLabelSourceType {
  /**
   * @internal **WARNING:** `__val` is a phantom type for compiler strictness only. 
   * It DOES NOT exist at runtime. Do not evaluate it in your logic.
   */
  readonly [__val]: 1095516533;
}

/**
 * Use the custom aria-label string.
 */
interface EpubAriaLabelSourceType_CUSTOM_ARIA_LABEL extends EpubAriaLabelSourceType {
  /**
   * @internal **WARNING:** `__val` is a phantom type for compiler strictness only. 
   * It DOES NOT exist at runtime. Do not evaluate it in your logic.
   */
  readonly [__val]: 1095517045;
}

/**
 * Do not emit an aria-label.
 */
interface EpubAriaLabelSourceType_NONE_ARIA_LABEL extends EpubAriaLabelSourceType {
  /**
   * @internal **WARNING:** `__val` is a phantom type for compiler strictness only. 
   * It DOES NOT exist at runtime. Do not evaluate it in your logic.
   */
  readonly [__val]: 1095519855;
}



/*----------------------------------------/
/                Exports                  /
/----------------------------------------*/

/**
 * ARIA label source type options for EPUB export.
 */
export declare namespace EpubAriaLabelSourceType {
/**
 * Automatically derive the aria-label.
 */
type AUTOMATIC_ARIA_LABEL = EpubAriaLabelSourceType_AUTOMATIC_ARIA_LABEL;

/**
 * Use the custom aria-label string.
 */
type CUSTOM_ARIA_LABEL = EpubAriaLabelSourceType_CUSTOM_ARIA_LABEL;

/**
 * Do not emit an aria-label.
 */
type NONE_ARIA_LABEL = EpubAriaLabelSourceType_NONE_ARIA_LABEL;

}
/**
 * ARIA label source type options for EPUB export.
 */
export declare const EpubAriaLabelSourceType: typeof Enumeration & {

  /**
   * Automatically derive the aria-label.
   */
  readonly AUTOMATIC_ARIA_LABEL: EpubAriaLabelSourceType_AUTOMATIC_ARIA_LABEL;
  /**
   * Use the custom aria-label string.
   */
  readonly CUSTOM_ARIA_LABEL: EpubAriaLabelSourceType_CUSTOM_ARIA_LABEL;
  /**
   * Do not emit an aria-label.
   */
  readonly NONE_ARIA_LABEL: EpubAriaLabelSourceType_NONE_ARIA_LABEL;
}
