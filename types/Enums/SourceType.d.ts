/**
 * SourceType.d.ts — indesign-uxp-types
 * Adobe InDesign 2026 (21.x) ExtendScript DOM declarations,
 * converted from indesign-uxp-types by tools/codemod.
 * Version: 1.0.0 · Updated: 2026-09-29
 * Author: Vlad Vladila (Krommatine Systems) · https://github.com/vamitul/indesign-uxp-types
 */
import type { Enumeration, Enumerator, __val} from "../_base/Enums";



declare const __SourceType: unique symbol;


/*----------------------------------------/
/   Internal enumerator interfaces        /
/       -- Not exported --                /
/----------------------------------------*/


interface SourceType extends Enumerator {
  /**
   * @internal **WARNING:** `__SourceType` is a phantom type for compiler strictness only. 
   * It DOES NOT exist at runtime. Do not evaluate it in your logic.
   */
  readonly [__SourceType]: never;
}


/**
 * Custom text.
 */
interface SourceType_SOURCE_CUSTOM extends SourceType {
  /**
   * @internal **WARNING:** `__val` is a phantom type for compiler strictness only. 
   * It DOES NOT exist at runtime. Do not evaluate it in your logic.
   */
  readonly [__val]: 1934902125;
}

/**
 * XMP title.
 */
interface SourceType_SOURCE_XMP_TITLE extends SourceType {
  /**
   * @internal **WARNING:** `__val` is a phantom type for compiler strictness only. 
   * It DOES NOT exist at runtime. Do not evaluate it in your logic.
   */
  readonly [__val]: 1934907508;
}

/**
 * XMP description.
 */
interface SourceType_SOURCE_XMP_DESCRIPTION extends SourceType {
  /**
   * @internal **WARNING:** `__val` is a phantom type for compiler strictness only. 
   * It DOES NOT exist at runtime. Do not evaluate it in your logic.
   */
  readonly [__val]: 1934907492;
}

/**
 * XMP headline.
 */
interface SourceType_SOURCE_XMP_HEADLINE extends SourceType {
  /**
   * @internal **WARNING:** `__val` is a phantom type for compiler strictness only. 
   * It DOES NOT exist at runtime. Do not evaluate it in your logic.
   */
  readonly [__val]: 1934907496;
}

/**
 * User-specified XMP metadata property.
 */
interface SourceType_SOURCE_XMP_OTHER extends SourceType {
  /**
   * @internal **WARNING:** `__val` is a phantom type for compiler strictness only. 
   * It DOES NOT exist at runtime. Do not evaluate it in your logic.
   */
  readonly [__val]: 1934907503;
}

/**
 * XML structure.
 */
interface SourceType_SOURCE_XML_STRUCTURE extends SourceType {
  /**
   * @internal **WARNING:** `__val` is a phantom type for compiler strictness only. 
   * It DOES NOT exist at runtime. Do not evaluate it in your logic.
   */
  readonly [__val]: 1934907507;
}

/**
 * XMP alt text.
 */
interface SourceType_SOURCE_XMP_ALT_TEXT extends SourceType {
  /**
   * @internal **WARNING:** `__val` is a phantom type for compiler strictness only. 
   * It DOES NOT exist at runtime. Do not evaluate it in your logic.
   */
  readonly [__val]: 1934907489;
}

/**
 * XMP extended description.
 */
interface SourceType_SOURCE_XMP_EXTENDED_DESCRIPTION extends SourceType {
  /**
   * @internal **WARNING:** `__val` is a phantom type for compiler strictness only. 
   * It DOES NOT exist at runtime. Do not evaluate it in your logic.
   */
  readonly [__val]: 1934907493;
}

/**
 * Decorative image.
 */
interface SourceType_SOURCE_DECORATIVE_IMAGE extends SourceType {
  /**
   * @internal **WARNING:** `__val` is a phantom type for compiler strictness only. 
   * It DOES NOT exist at runtime. Do not evaluate it in your logic.
   */
  readonly [__val]: 1648649065;
}



/*----------------------------------------/
/                Exports                  /
/----------------------------------------*/

/**
 * Where an object's alternate or actual text is taken from — typed in directly, an XMP field,
 * or the XML structure.
 */
export declare namespace SourceType {
/**
 * Custom text.
 */
type SOURCE_CUSTOM = SourceType_SOURCE_CUSTOM;

/**
 * XMP title.
 */
type SOURCE_XMP_TITLE = SourceType_SOURCE_XMP_TITLE;

/**
 * XMP description.
 */
type SOURCE_XMP_DESCRIPTION = SourceType_SOURCE_XMP_DESCRIPTION;

/**
 * XMP headline.
 */
type SOURCE_XMP_HEADLINE = SourceType_SOURCE_XMP_HEADLINE;

/**
 * User-specified XMP metadata property.
 */
type SOURCE_XMP_OTHER = SourceType_SOURCE_XMP_OTHER;

/**
 * XML structure.
 */
type SOURCE_XML_STRUCTURE = SourceType_SOURCE_XML_STRUCTURE;

/**
 * XMP alt text.
 */
type SOURCE_XMP_ALT_TEXT = SourceType_SOURCE_XMP_ALT_TEXT;

/**
 * XMP extended description.
 */
type SOURCE_XMP_EXTENDED_DESCRIPTION = SourceType_SOURCE_XMP_EXTENDED_DESCRIPTION;

/**
 * Decorative image.
 */
type SOURCE_DECORATIVE_IMAGE = SourceType_SOURCE_DECORATIVE_IMAGE;

}
/**
 * Where an object's alternate or actual text is taken from — typed in directly, an XMP field,
 * or the XML structure.
 */
export declare const SourceType: typeof Enumeration & {

  /**
   * Custom text.
   */
  readonly SOURCE_CUSTOM: SourceType_SOURCE_CUSTOM;
  /**
   * Custom text.
   */
  readonly sourceCustom: SourceType_SOURCE_CUSTOM;
  /**
   * XMP title.
   */
  readonly SOURCE_XMP_TITLE: SourceType_SOURCE_XMP_TITLE;
  /**
   * XMP description.
   */
  readonly SOURCE_XMP_DESCRIPTION: SourceType_SOURCE_XMP_DESCRIPTION;
  /**
   * XMP headline.
   */
  readonly SOURCE_XMP_HEADLINE: SourceType_SOURCE_XMP_HEADLINE;
  /**
   * User-specified XMP metadata property.
   */
  readonly SOURCE_XMP_OTHER: SourceType_SOURCE_XMP_OTHER;
  /**
   * XML structure.
   */
  readonly SOURCE_XML_STRUCTURE: SourceType_SOURCE_XML_STRUCTURE;
  /**
   * XMP alt text.
   */
  readonly SOURCE_XMP_ALT_TEXT: SourceType_SOURCE_XMP_ALT_TEXT;
  /**
   * XMP extended description.
   */
  readonly SOURCE_XMP_EXTENDED_DESCRIPTION: SourceType_SOURCE_XMP_EXTENDED_DESCRIPTION;
  /**
   * Decorative image.
   */
  readonly SOURCE_DECORATIVE_IMAGE: SourceType_SOURCE_DECORATIVE_IMAGE;
  /**
   * Decorative image.
   */
  readonly sourceDecorativeImage: SourceType_SOURCE_DECORATIVE_IMAGE;
}
