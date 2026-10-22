/**
 * DirectionalFeatherSetting.d.ts — indesign-uxp-types
 * Adobe InDesign 2026 (21.x) ExtendScript DOM declarations,
 * converted from indesign-uxp-types by tools/codemod.
 * Version: 1.0.0 · Updated: 2026-09-29
 * Author: Vlad Vladila (Krommatine Systems) · https://github.com/vamitul/indesign-uxp-types
 */
import type { Mode, Read } from './_base/Types';
import type { EventTargetDOMObject } from './_base/DomObjects';
import type { MeasurementValue } from './_base/Types';
import type { ContentTransparencySetting } from './ContentTransparencySetting';
import type { FillTransparencySetting } from './FillTransparencySetting';
import type { StrokeTransparencySetting } from './StrokeTransparencySetting';
import type { TransparencySetting } from './TransparencySetting';
import type { FollowShapeModeOptions } from './Enums/FollowShapeModeOptions';
import type { FindChangeDirectionalFeatherSetting } from './FindChangeDirectionalFeatherSetting';
import type { NothingEnum } from "./Enums/NothingEnum";

/**
 * Settings for the directional feather effect, which fades an object's edges
 * outward by a different width on each of its four sides.
 */
export interface DirectionalFeatherSetting<M extends Mode = 'single', TParent = TransparencySetting | StrokeTransparencySetting | FillTransparencySetting | ContentTransparencySetting, NSet = never> extends EventTargetDOMObject<TParent, M> {
  /** Resolves the proxy into the individual {@link DirectionalFeatherSetting} objects it stands for. */
  getElements(): DirectionalFeatherSetting<'single', TParent>[];

  /** If true, the directional feather effect is applied. */
  get applied(): Read<M, boolean | NothingEnum.NOTHING>;
  set applied(value: boolean | NSet);

  /** The feather width (in pixels) on the left side of the object. */
  get leftWidth(): Read<M, number | NothingEnum.NOTHING>;
  set leftWidth(value: MeasurementValue | NSet);

  /** The feather width (in pixels) on the right side of the object. (Range: .2 to 250). */
  get rightWidth(): Read<M, number | NothingEnum.NOTHING>;
  set rightWidth(value: MeasurementValue | NSet);

  /** The feather width (in pixels) on the top side of the object. (Range: .2 to 250). */
  get topWidth(): Read<M, number | NothingEnum.NOTHING>;
  set topWidth(value: MeasurementValue | NSet);

  /** The feather width (in pixels) on the bottom side of the object. (Range: .2 to 250). */
  get bottomWidth(): Read<M, number | NothingEnum.NOTHING>;
  set bottomWidth(value: MeasurementValue | NSet);

  /** The amount to choke the directional feather (as a percentage of the feather width). (Range: 0 to 100). */
  get chokeAmount(): Read<M, number | NothingEnum.NOTHING>;
  set chokeAmount(value: number | NSet);

  /** The angle of the feather. (Range: 180 to -180). */
  get angle(): Read<M, number | NothingEnum.NOTHING>;
  set angle(value: number | NSet);

  /** The shape-following algorithm applied to the feather. */
  get followShapeMode(): Read<M, FollowShapeModeOptions | NothingEnum.NOTHING>;
  set followShapeMode(value: FollowShapeModeOptions | NSet);

  /** The amount of noise (as a percentage) applied to the feather region. (Range: 0 to 100). */
  get noise(): Read<M, number | NothingEnum.NOTHING>;
  set noise(value: number | NSet);
}
