/**
 * ScriptLanguage.d.ts — indesign-uxp-types
 * Adobe InDesign 2026 (21.x) ExtendScript DOM declarations,
 * converted from indesign-uxp-types by tools/codemod.
 * Version: 1.0.0 · Updated: 2026-09-29
 * Author: Vlad Vladila (Krommatine Systems) · https://github.com/vamitul/indesign-uxp-types
 */
import type { Enumeration, Enumerator, __val} from "../_base/Enums";



declare const __ScriptLanguage: unique symbol;


/*----------------------------------------/
/   Internal enumerator interfaces        /
/       -- Not exported --                /
/----------------------------------------*/


interface ScriptLanguage extends Enumerator {
  /**
   * @internal **WARNING:** `__ScriptLanguage` is a phantom type for compiler strictness only. 
   * It DOES NOT exist at runtime. Do not evaluate it in your logic.
   */
  readonly [__ScriptLanguage]: never;
}


/**
 * Language not specified.
 */
interface ScriptLanguage_UNKNOWN extends ScriptLanguage {
  /**
   * @internal **WARNING:** `__val` is a phantom type for compiler strictness only. 
   * It DOES NOT exist at runtime. Do not evaluate it in your logic.
   */
  readonly [__val]: 1433299822;
}

/**
 * The VBScript language.
 */
interface ScriptLanguage_VISUAL_BASIC extends ScriptLanguage {
  /**
   * @internal **WARNING:** `__val` is a phantom type for compiler strictness only. 
   * It DOES NOT exist at runtime. Do not evaluate it in your logic.
   */
  readonly [__val]: 1447185511;
}

/**
 * The UxpScript language.
 */
interface ScriptLanguage_UXPSCRIPT extends ScriptLanguage {
  /**
   * @internal **WARNING:** `__val` is a phantom type for compiler strictness only. 
   * It DOES NOT exist at runtime. Do not evaluate it in your logic.
   */
  readonly [__val]: 1431522407;
}

/**
 * The JavaScript language.
 */
interface ScriptLanguage_JAVASCRIPT extends ScriptLanguage {
  /**
   * @internal **WARNING:** `__val` is a phantom type for compiler strictness only. 
   * It DOES NOT exist at runtime. Do not evaluate it in your logic.
   */
  readonly [__val]: 1246973031;
}

/** Generated from the InDesign 21.6 scripting dictionary (macOS only). */
interface ScriptLanguage_APPLESCRIPT_LANGUAGE extends ScriptLanguage {
  readonly [__val]: 1095978087;
}

/*----------------------------------------/
/                Exports                  /
/----------------------------------------*/

/**
 * The language of the script to execute.
 */
export declare namespace ScriptLanguage {
/**
 * Language not specified.
 */
type UNKNOWN = ScriptLanguage_UNKNOWN;

/**
 * The VBScript language.
 */
type VISUAL_BASIC = ScriptLanguage_VISUAL_BASIC;

/**
 * The UxpScript language.
 */
type UXPSCRIPT = ScriptLanguage_UXPSCRIPT;

/**
 * The JavaScript language.
 */
type JAVASCRIPT = ScriptLanguage_JAVASCRIPT;
type APPLESCRIPT_LANGUAGE = ScriptLanguage_APPLESCRIPT_LANGUAGE;
}
/**
 * The language of the script to execute.
 */
export declare const ScriptLanguage: typeof Enumeration & {

  /**
   * Language not specified.
   */
  readonly UNKNOWN: ScriptLanguage_UNKNOWN;
  /**
   * Language not specified.
   */
  readonly unknown: ScriptLanguage_UNKNOWN;

  /** The VBScript language. (Windows only: not in the macOS dictionary these declarations are measured against, so not measured.) */
  readonly VISUAL_BASIC: ScriptLanguage_VISUAL_BASIC;
  /** The VBScript language. (Windows only: not in the macOS dictionary these declarations are measured against, so not measured.) */
  readonly visualBasic: ScriptLanguage_VISUAL_BASIC;
  /**
   * The UxpScript language.
   */
  readonly UXPSCRIPT: ScriptLanguage_UXPSCRIPT;
  /**
   * The UxpScript language.
   */
  readonly uxpscript: ScriptLanguage_UXPSCRIPT;

  /**
   * The JavaScript language.
   */
  readonly JAVASCRIPT: ScriptLanguage_JAVASCRIPT;
  /**
   * The JavaScript language.
   */
  readonly javascript: ScriptLanguage_JAVASCRIPT;
  readonly APPLESCRIPT_LANGUAGE: ScriptLanguage_APPLESCRIPT_LANGUAGE;
  readonly applescriptLanguage: ScriptLanguage_APPLESCRIPT_LANGUAGE;
}
