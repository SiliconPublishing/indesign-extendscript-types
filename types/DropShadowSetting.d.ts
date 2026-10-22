/**
 * DropShadowSetting.d.ts — indesign-uxp-types
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
import type { ShadowMode } from './Enums/ShadowMode';
import type { FindChangeDropShadowSetting } from './FindChangeDropShadowSetting';
import type { NothingEnum } from "./Enums/NothingEnum";

/**
 * Drop shadow settings.
 */
export interface DropShadowSetting<M extends Mode = 'single', TParent = TransparencySetting | StrokeTransparencySetting | FillTransparencySetting | ContentTransparencySetting, NSet = never> extends EventTargetDOMObject<TParent, M>, InDesignEdition.DropShadowSetting<M, TParent, NSet>, InDesignPlugins.DropShadowSetting<M> {
  /** Resolves the proxy into the individual {@link DropShadowSetting} objects it stands for. */
  getElements(): DropShadowSetting<'single', TParent>[];

  /**
   * The distance between the item and its shadow.
   *
   * *Crashes InDesign 21.6**: reading it on a FindChangeDropShadowSetting takes InDesign down (measured).
   *
   * **Crashes InDesign 21.6**: reading it on a FindChangeDropShadowSetting takes InDesign down (measured).
   */
  get distance(): Read<M, number | NothingEnum.NOTHING>;
  set distance(value: MeasurementValue | NSet);

  /**
   * The angle at which the shadow is thrown.
   *
   * *Crashes InDesign 21.6**: reading it on a FindChangeDropShadowSetting takes InDesign down (measured).
   *
   * **Crashes InDesign 21.6**: reading it on a FindChangeDropShadowSetting takes InDesign down (measured).
   */
  get angle(): Read<M, number | NothingEnum.NOTHING>;
  set angle(value: number | NSet);

  /** The shadow mode. */
  get mode(): Read<M, ShadowMode | NothingEnum.NOTHING>;
  set mode(value: ShadowMode | NSet);

  /** The blending mode for the drop shadow effect. */
  get blendMode(): Read<M, BlendMode | NothingEnum.NOTHING>;
  set blendMode(value: BlendMode | NSet);

  /** The opacity of the drop shadow (as a percentage). (Range: 0 to 100). */
  get opacity(): Read<M, number | NothingEnum.NOTHING>;
  set opacity(value: number | NSet);

  /**
   * The horizontal offset of the drop shadow.
   *
   * Range depends on the unit type. For points: -1000 to 1000; for picas: -83p4 to 83p4; for
   * inches: -13.8889 to 13.8889; for mm: -352.778 to 352.778; for cm: -35.277 to 35.277; for
   * ciceros: -78c2.389 to 78c2.389.
   */
  get xOffset(): Read<M, number | NothingEnum.NOTHING>;
  set xOffset(value: MeasurementValue | NSet);

  /**
   * The vertical offset of the drop shadow.
   *
   * (Range depends on the unit type. For points: -1000 to 1000; for picas: -83p4 to 83p4; for
   * inches: -13.8889 to 13.8889; for mm: -352.778 to 352.778; for cm: -35.277 to 35.277; for
   * ciceros: -78c2.389 to 78c2.389).
   */
  get yOffset(): Read<M, number | NothingEnum.NOTHING>;
  set yOffset(value: MeasurementValue | NSet);

  /** The radius (in pixels) of the blur applied to the drop shadow. (Range depends on the unit type. For points: 0 to 144; for picas: 0p0 to 12p0; for inches: 0 to 2; for mm: 0 to 50.08; for cm: 0 to 5.08; for ciceros: 0c0 to 11c3.128.). */
  get size(): Read<M, number | NothingEnum.NOTHING>;
  set size(value: MeasurementValue | NSet);

  /** The {@link Swatch} applied to the drop shadow. */
  get effectColor(): Read<M, Swatch | NothingEnum.NOTHING>;
  set effectColor(value: Swatch | string | NSet);

  /** The amount (as a percentage) of noise applied to the shadow. (Range: 0 to 100). */
  get noise(): Read<M, number | NothingEnum.NOTHING>;
  set noise(value: number | NSet);

  /** The amount (as a percentage of the blur width) to spread the footprint of the drop shadow and reduce the radius of the blur. (Range: 0 to 100). */
  get spread(): Read<M, number | NothingEnum.NOTHING>;
  set spread(value: number | NSet);

  /** If true, uses the global light angle. */
  get useGlobalLight(): Read<M, boolean | NothingEnum.NOTHING>;
  set useGlobalLight(value: boolean | NSet);

  /** If true, the layer will knock out the drop shadow. */
  get knockedOut(): Read<M, boolean | NothingEnum.NOTHING>;
  set knockedOut(value: boolean | NSet);

  /** If true, the drop shadow will take into account other non-shadow effects. */
  get honorOtherEffects(): Read<M, boolean | NothingEnum.NOTHING>;
  set honorOtherEffects(value: boolean | NSet);
}
