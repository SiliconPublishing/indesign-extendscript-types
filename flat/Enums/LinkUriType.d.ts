/**
 * LinkUriType.d.ts — generated from the InDesign 21.6 scripting dictionary by tools/codemod/fill.mjs.
 */

import type { Enumeration, Enumerator, __val} from "../_base/Enums";

declare const __LinkUriType: unique symbol;

interface LinkUriType extends Enumerator {
  readonly [__LinkUriType]: never;
}

interface LinkUriType_FILE extends LinkUriType {
  readonly [__val]: 1699113324;
}

interface LinkUriType_VERSION_CUE extends LinkUriType {
  readonly [__val]: 1700152096;
}

interface LinkUriType_BUZZWORD extends LinkUriType {
  readonly [__val]: 1698854756;
}

interface LinkUriType_HTTP extends LinkUriType {
  readonly [__val]: 1699238992;
}

interface LinkUriType_HTTPS extends LinkUriType {
  readonly [__val]: 1699237971;
}

interface LinkUriType_OTHER extends LinkUriType {
  readonly [__val]: 1699705960;
}

export declare namespace LinkUriType {
type FILE = LinkUriType_FILE;
type VERSION_CUE = LinkUriType_VERSION_CUE;
type BUZZWORD = LinkUriType_BUZZWORD;
type HTTP = LinkUriType_HTTP;
type HTTPS = LinkUriType_HTTPS;
type OTHER = LinkUriType_OTHER;
}

/**
 * Link URI types.
 */
export declare const LinkUriType: typeof Enumeration & {
  readonly FILE: LinkUriType_FILE;
  readonly file: LinkUriType_FILE;
  readonly VERSION_CUE: LinkUriType_VERSION_CUE;
  readonly versionCue: LinkUriType_VERSION_CUE;
  readonly BUZZWORD: LinkUriType_BUZZWORD;
  readonly buzzword: LinkUriType_BUZZWORD;
  readonly HTTP: LinkUriType_HTTP;
  readonly http: LinkUriType_HTTP;
  readonly HTTPS: LinkUriType_HTTPS;
  readonly https: LinkUriType_HTTPS;
  readonly OTHER: LinkUriType_OTHER;
  readonly other: LinkUriType_OTHER;
}
