/**
 * SatinSetting.d.ts — indesign-uxp-types
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
import type { FindChangeSatinSetting } from './FindChangeSatinSetting';
import type { NothingEnum } from "./Enums/NothingEnum";

/**
 * Settings for the satin effect, which applies interior shading with a wavy,
 * satin-like appearance based on the object's shape.
 */
export interface SatinSetting<M extends Mode = 'single', TParent = TransparencySetting | StrokeTransparencySetting | FillTransparencySetting | ContentTransparencySetting, NSet = never> extends EventTargetDOMObject<TParent, M>, InDesignEdition.SatinSetting<M, TParent, NSet>, InDesignPlugins.SatinSetting<M> {
  /** Resolves the proxy into the individual {@link SatinSetting} objects it stands for. */
  getElements(): SatinSetting<'single', TParent>[];

  /** If true, applies the satin effect. */
  get applied(): Read<M, boolean | NothingEnum.NOTHING>;
  set applied(value: boolean | NSet);

  /**
   * The color applied to the satin effect, specified as a swatch (color, gradient, tint, or
   * mixed ink), a color library color, a hex value, or as an array of color values.
   *
   * The color mode dictates the array values: for RGB, specify three values, each in the
   * range 0 to 255, in the format [R,G,B]; for CMYK, specify four values, each as a
   * percentage and each in the range 0 to 100, in the format [C,M,Y,K]; for LAB, specify
   * three values in the format [L,A,B], with L in the range 0 to 100 and A and B in the range
   * -128 to 127; for HSB, specify three colors in the format [H,S,B], with H in the range 0
   * to 360 and S and B as percentages in the range 0 to 100.
   */
  get effectColor(): Read<M, Swatch | NothingEnum.NOTHING>;
  set effectColor(value: Swatch | string | NSet);

  /** The blending mode for the satin effect. */
  get blendMode(): Read<M, BlendMode | NothingEnum.NOTHING>;
  set blendMode(value: BlendMode | NSet);

  /** The opacity of the satin effect (as a percentage). (Range: 0 to 100). */
  get opacity(): Read<M, number | NothingEnum.NOTHING>;
  set opacity(value: number | NSet);

  /** The light angle of the satin effect. (Range: -360 to 360). */
  get angle(): Read<M, number | NothingEnum.NOTHING>;
  set angle(value: number | NSet);

  /** The distance (in pixels) from the SatinSetting to the satin effect. */
  get distance(): Read<M, number | NothingEnum.NOTHING>;
  set distance(value: MeasurementValue | NSet);

  /** The width (in pixels) of the satin effect. */
  get size(): Read<M, number | NothingEnum.NOTHING>;
  set size(value: MeasurementValue | NSet);

  /** If true, inverts the satin effect. */
  get invertEffect(): Read<M, boolean | NothingEnum.NOTHING>;
  set invertEffect(value: boolean | NSet);
}
