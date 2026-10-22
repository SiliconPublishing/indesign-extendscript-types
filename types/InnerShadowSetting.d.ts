/**
 * InnerShadowSetting.d.ts — indesign-uxp-types
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
import type { Swatch } from './Swatch';
import type { TransparencySetting } from './TransparencySetting';
import type { BlendMode } from './Enums/BlendMode';
import type { FindChangeInnerShadowSetting } from './FindChangeInnerShadowSetting';
import type { NothingEnum } from "./Enums/NothingEnum";

/**
 * Inner shadow effect settings.
 */
export interface InnerShadowSetting<M extends Mode = 'single', TParent = TransparencySetting | StrokeTransparencySetting | FillTransparencySetting | ContentTransparencySetting, NSet = never> extends EventTargetDOMObject<TParent, M>, InDesignPlugins.InnerShadowSetting<M> {
  /** Resolves the proxy into the individual {@link InnerShadowSetting} objects it stands for. */
  getElements(): InnerShadowSetting<'single', TParent>[];

  /**
   * The horizontal offset of the shadow.
   *
   * **Crashes InDesign 21.6**: reading it on a FindChangeInnerShadowSetting takes InDesign down (measured).
   */
  get xOffset(): Read<M, number | NothingEnum.NOTHING>;
  set xOffset(value: MeasurementValue | NSet);

  /**
   * The vertical offset of the shadow.
   *
   * **Crashes InDesign 21.6**: reading it on a FindChangeInnerShadowSetting takes InDesign down (measured).
   */
  get yOffset(): Read<M, number | NothingEnum.NOTHING>;
  set yOffset(value: MeasurementValue | NSet);

  /** If true, the inner shadow effect is applied. */
  get applied(): Read<M, boolean | NothingEnum.NOTHING>;
  set applied(value: boolean | NSet);

  /** The {@link Swatch} applied to the inner shadow. */
  get effectColor(): Read<M, Swatch | NothingEnum.NOTHING>;
  set effectColor(value: Swatch | string | NSet);

  /** The blending mode for the inner shadow effect. */
  get blendMode(): Read<M, BlendMode | NothingEnum.NOTHING>;
  set blendMode(value: BlendMode | NSet);

  /** The opacity (as a percentage) of the inner shadow. (Range: 0 to 100). */
  get opacity(): Read<M, number | NothingEnum.NOTHING>;
  set opacity(value: number | NSet);

  /** The angle at which the inner shadow is thrown. (Range: -360 to 360). */
  get angle(): Read<M, number | NothingEnum.NOTHING>;
  set angle(value: number | NSet);

  /** The distance between the InnerShadowSetting and the shadow. */
  get distance(): Read<M, number | NothingEnum.NOTHING>;
  set distance(value: MeasurementValue | NSet);

  /** If true, the global light angle is used. */
  get useGlobalLight(): Read<M, boolean | NothingEnum.NOTHING>;
  set useGlobalLight(value: boolean | NSet);

  /** The amount to choke the inner shadow (as a percentage of shadow size). (Range: 0 to 100). */
  get chokeAmount(): Read<M, number | NothingEnum.NOTHING>;
  set chokeAmount(value: number | NSet);

  /** The size of the inner shadow. */
  get size(): Read<M, number | NothingEnum.NOTHING>;
  set size(value: MeasurementValue | NSet);

  /** The amount (as a percentage) of noise to add to the shadow. (Range: 0 to 100). */
  get noise(): Read<M, number | NothingEnum.NOTHING>;
  set noise(value: number | NSet);
}
