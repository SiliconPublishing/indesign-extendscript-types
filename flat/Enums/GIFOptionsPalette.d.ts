/**
 * GIFOptionsPalette.d.ts — indesign-uxp-types
 * Adobe InDesign 2026 (21.x) ExtendScript DOM declarations,
 * converted from indesign-uxp-types by tools/codemod.
 * Version: 1.0.0 · Updated: 2026-09-29
 * Author: Vlad Vladila (Krommatine Systems) · https://github.com/vamitul/indesign-uxp-types
 */
import type { Enumeration, Enumerator, __val} from "../_base/Enums";



declare const __GIFOptionsPalette: unique symbol;


/*----------------------------------------/
/   Internal enumerator interfaces        /
/       -- Not exported --                /
/----------------------------------------*/


interface GIFOptionsPalette extends Enumerator {
  /**
   * @internal **WARNING:** `__GIFOptionsPalette` is a phantom type for compiler strictness only. 
   * It DOES NOT exist at runtime. Do not evaluate it in your logic.
   */
  readonly [__GIFOptionsPalette]: never;
}


/**
 * Uses the adaptive (no dither) palette.
 */
interface GIFOptionsPalette_ADAPTIVE_PALETTE extends GIFOptionsPalette {
  /**
   * @internal **WARNING:** `__val` is a phantom type for compiler strictness only. 
   * It DOES NOT exist at runtime. Do not evaluate it in your logic.
   */
  readonly [__val]: 1886151024;
}

/**
 * Uses the Macintosh palette.
 */
interface GIFOptionsPalette_MACINTOSH_PALETTE extends GIFOptionsPalette {
  /**
   * @internal **WARNING:** `__val` is a phantom type for compiler strictness only. 
   * It DOES NOT exist at runtime. Do not evaluate it in your logic.
   */
  readonly [__val]: 1886154096;
}

/**
 * Uses the Web palette.
 */
interface GIFOptionsPalette_WEB_PALETTE extends GIFOptionsPalette {
  /**
   * @internal **WARNING:** `__val` is a phantom type for compiler strictness only. 
   * It DOES NOT exist at runtime. Do not evaluate it in your logic.
   */
  readonly [__val]: 1886156656;
}

/**
 * Uses the Windows palette.
 */
interface GIFOptionsPalette_WINDOWS_PALETTE extends GIFOptionsPalette {
  /**
   * @internal **WARNING:** `__val` is a phantom type for compiler strictness only. 
   * It DOES NOT exist at runtime. Do not evaluate it in your logic.
   */
  readonly [__val]: 1886156644;
}



/*----------------------------------------/
/                Exports                  /
/----------------------------------------*/

/**
 * Color palette options for GIF conversion.
 */
export declare namespace GIFOptionsPalette {
/**
 * Uses the adaptive (no dither) palette.
 */
type ADAPTIVE_PALETTE = GIFOptionsPalette_ADAPTIVE_PALETTE;

/**
 * Uses the Macintosh palette.
 */
type MACINTOSH_PALETTE = GIFOptionsPalette_MACINTOSH_PALETTE;

/**
 * Uses the Web palette.
 */
type WEB_PALETTE = GIFOptionsPalette_WEB_PALETTE;

/**
 * Uses the Windows palette.
 */
type WINDOWS_PALETTE = GIFOptionsPalette_WINDOWS_PALETTE;

}
/**
 * Color palette options for GIF conversion.
 */
export declare const GIFOptionsPalette: typeof Enumeration & {

  /**
   * Uses the adaptive (no dither) palette.
   */
  readonly ADAPTIVE_PALETTE: GIFOptionsPalette_ADAPTIVE_PALETTE;
  /**
   * Uses the adaptive (no dither) palette.
   */
  readonly adaptivePalette: GIFOptionsPalette_ADAPTIVE_PALETTE;
  /**
   * Uses the Macintosh palette.
   */
  readonly MACINTOSH_PALETTE: GIFOptionsPalette_MACINTOSH_PALETTE;
  /**
   * Uses the Macintosh palette.
   */
  readonly macintoshPalette: GIFOptionsPalette_MACINTOSH_PALETTE;
  /**
   * Uses the Web palette.
   */
  readonly WEB_PALETTE: GIFOptionsPalette_WEB_PALETTE;
  /**
   * Uses the Web palette.
   */
  readonly webPalette: GIFOptionsPalette_WEB_PALETTE;
  /**
   * Uses the Windows palette.
   */
  readonly WINDOWS_PALETTE: GIFOptionsPalette_WINDOWS_PALETTE;
  /**
   * Uses the Windows palette.
   */
  readonly windowsPalette: GIFOptionsPalette_WINDOWS_PALETTE;
}
