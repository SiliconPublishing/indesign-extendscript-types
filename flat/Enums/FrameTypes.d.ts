/**
 * FrameTypes.d.ts — generated from the InDesign Server 21.6 scripting dictionary by tools/codemod/fill.mjs.
 */

import type { Enumeration, Enumerator, __val} from "../_base/Enums";

declare const __FrameTypes: unique symbol;

interface FrameTypes extends Enumerator {
  readonly [__FrameTypes]: never;
}

interface FrameTypes_TEXT_FRAME_TYPE extends FrameTypes {
  readonly [__val]: 1417176692;
}

interface FrameTypes_FRAME_GRID_TYPE extends FrameTypes {
  readonly [__val]: 1179087984;
}

interface FrameTypes_UNKNOWN extends FrameTypes {
  readonly [__val]: 1433299822;
}

export declare namespace FrameTypes {
type TEXT_FRAME_TYPE = FrameTypes_TEXT_FRAME_TYPE;
type FRAME_GRID_TYPE = FrameTypes_FRAME_GRID_TYPE;
type UNKNOWN = FrameTypes_UNKNOWN;
}

/**
 * Text frame type options.
 */
export declare const FrameTypes: typeof Enumeration & {
  readonly TEXT_FRAME_TYPE: FrameTypes_TEXT_FRAME_TYPE;
  readonly textFrameType: FrameTypes_TEXT_FRAME_TYPE;
  readonly FRAME_GRID_TYPE: FrameTypes_FRAME_GRID_TYPE;
  readonly frameGridType: FrameTypes_FRAME_GRID_TYPE;
  readonly UNKNOWN: FrameTypes_UNKNOWN;
  readonly unknown: FrameTypes_UNKNOWN;
}
