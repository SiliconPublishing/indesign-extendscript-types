/**
 * HTTPLinkResolution.d.ts — generated from the InDesign 21.6 scripting dictionary by tools/codemod/fill.mjs.
 */

import type { Enumeration, Enumerator, __val} from "../_base/Enums";

declare const __HTTPLinkResolution: unique symbol;

interface HTTPLinkResolution extends Enumerator {
  readonly [__HTTPLinkResolution]: never;
}

interface HTTPLinkResolution_LOW_RES extends HTTPLinkResolution {
  readonly [__val]: 1699500666;
}

interface HTTPLinkResolution_HIGH_RES extends HTTPLinkResolution {
  readonly [__val]: 1699238522;
}

export declare namespace HTTPLinkResolution {
type LOW_RES = HTTPLinkResolution_LOW_RES;
type HIGH_RES = HTTPLinkResolution_HIGH_RES;
}

/**
 * HTTP link resolutions.
 */
export declare const HTTPLinkResolution: typeof Enumeration & {
  readonly LOW_RES: HTTPLinkResolution_LOW_RES;
  readonly lowRes: HTTPLinkResolution_LOW_RES;
  readonly HIGH_RES: HTTPLinkResolution_HIGH_RES;
  readonly highRes: HTTPLinkResolution_HIGH_RES;
}
