/**
 * OuterGlowSetting.d.ts — indesign-uxp-types
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
import type { GlowTechnique } from './Enums/GlowTechnique';
import type { FindChangeOuterGlowSetting } from './FindChangeOuterGlowSetting';
import type { NothingEnum } from "./Enums/NothingEnum";

/**
 * Settings for the outer-glow effect — a glow that radiates outward from the
 * edges of the object or text it's applied to.
 */
export interface OuterGlowSetting<M extends Mode = 'single', TParent = TransparencySetting | StrokeTransparencySetting | FillTransparencySetting | ContentTransparencySetting, NSet = never> extends EventTargetDOMObject<TParent, M>, InDesignEdition.OuterGlowSetting<M, TParent, NSet>, InDesignPlugins.OuterGlowSetting<M> {
  /** Resolves the proxy into the individual {@link OuterGlowSetting} objects it stands for. */
  getElements(): OuterGlowSetting<'single', TParent>[];

  /** If true, the outer glow effect is applied. */
  get applied(): Read<M, boolean | NothingEnum.NOTHING>;
  set applied(value: boolean | NSet);

  /** The blending mode for the outer glow effect. */
  get blendMode(): Read<M, BlendMode | NothingEnum.NOTHING>;
  set blendMode(value: BlendMode | NSet);

  /** The opacity of the outer glow (as a percentage). (Range: 0 to 100). */
  get opacity(): Read<M, number | NothingEnum.NOTHING>;
  set opacity(value: number | NSet);

  /** The amount (as a percentage) of noise applied to the outer glow. (Range: 0 to 100). */
  get noise(): Read<M, number | NothingEnum.NOTHING>;
  set noise(value: number | NSet);

  /**
   * The color applied to the outer glow, specified as a swatch (color, gradient, tint, or
   * mixed ink), or an array of color values.
   *
   * The color mode dictates the array values: for RGB, specify three values, each in the
   * range 0 to 255, in the format [R,G,B]; for CMYK, specify four values, each as a
   * percentage and each in the range 0 to 100, in the format [C,M,Y,K]; for LAB, specify
   * three values in the format [L,A,B], with L in the range 0 to 100 and A and B in the range
   * -128 to 127.
   */
  get effectColor(): Read<M, Swatch | NothingEnum.NOTHING>;
  set effectColor(value: Swatch | string | NSet);

  /** Whether the glow's edge is soft or precise. See {@link GlowTechnique}. */
  get technique(): Read<M, GlowTechnique | NothingEnum.NOTHING>;
  set technique(value: GlowTechnique | NSet);

  /** The amount of spread (as a percentage of the outer glow size). (Range: 0 to 100). */
  get spread(): Read<M, number | NothingEnum.NOTHING>;
  set spread(value: number | NSet);

  /** The size of the outer glow. */
  get size(): Read<M, number | NothingEnum.NOTHING>;
  set size(value: MeasurementValue | NSet);
}
