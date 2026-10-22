/**
 * BevelAndEmbossSetting.d.ts — indesign-uxp-types
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
import type { BevelAndEmbossDirection } from './Enums/BevelAndEmbossDirection';
import type { BevelAndEmbossStyle } from './Enums/BevelAndEmbossStyle';
import type { BevelAndEmbossTechnique } from './Enums/BevelAndEmbossTechnique';
import type { BlendMode } from './Enums/BlendMode';
import type { FindChangeBevelAndEmbossSetting } from './FindChangeBevelAndEmbossSetting';
import type { NothingEnum } from "./Enums/NothingEnum";

/**
 * Bevel and emboss effect settings.
 */
export interface BevelAndEmbossSetting<M extends Mode = 'single', TParent = TransparencySetting | StrokeTransparencySetting | FillTransparencySetting | ContentTransparencySetting, NSet = never> extends EventTargetDOMObject<TParent, M> {
  /** Resolves the proxy into the individual {@link BevelAndEmbossSetting} objects it stands for. */
  getElements(): BevelAndEmbossSetting<'single', TParent>[];

  /** If true, the bevel or emboss effect is applied. */
  get applied(): Read<M, boolean | NothingEnum.NOTHING>;
  set applied(value: boolean | NSet);

  /** The style of bevel or emboss. */
  get style(): Read<M, BevelAndEmbossStyle | NothingEnum.NOTHING>;
  set style(value: BevelAndEmbossStyle | NSet);

  /** The edging technique of the bevel or emboss. */
  get technique(): Read<M, BevelAndEmbossTechnique | NothingEnum.NOTHING>;
  set technique(value: BevelAndEmbossTechnique | NSet);

  /** The depth of the bevel or emboss (as a percentage). (Range: 0 to 1000). */
  get depth(): Read<M, number | NothingEnum.NOTHING>;
  set depth(value: number | NSet);

  /** The direction of the bevel or emboss. */
  get direction(): Read<M, BevelAndEmbossDirection | NothingEnum.NOTHING>;
  set direction(value: BevelAndEmbossDirection | NSet);

  /** The size of the bevel or emboss. */
  get size(): Read<M, number | NothingEnum.NOTHING>;
  set size(value: MeasurementValue | NSet);

  /** The amount (in pixels) of softening. */
  get soften(): Read<M, number | NothingEnum.NOTHING>;
  set soften(value: MeasurementValue | NSet);

  /** The angle of the light source. (Range: -180 to 180). */
  get angle(): Read<M, number | NothingEnum.NOTHING>;
  set angle(value: number | NSet);

  /** The altitude of the light source. (Range: 0 to 90). */
  get altitude(): Read<M, number | NothingEnum.NOTHING>;
  set altitude(value: number | NSet);

  /** If true, the global light source is used. */
  get useGlobalLight(): Read<M, boolean | NothingEnum.NOTHING>;
  set useGlobalLight(value: boolean | NSet);

  /** The {@link Swatch} applied to the highlight portion of the effect. */
  get highlightColor(): Read<M, Swatch | NothingEnum.NOTHING>;
  set highlightColor(value: Swatch | string | NSet);

  /** The blending mode for the highlight portion of the effect. */
  get highlightBlendMode(): Read<M, BlendMode | NothingEnum.NOTHING>;
  set highlightBlendMode(value: BlendMode | NSet);

  /** The opacity of the highlight portion of the effect (as a percentage). (Range: 0 to 100). */
  get highlightOpacity(): Read<M, number | NothingEnum.NOTHING>;
  set highlightOpacity(value: number | NSet);

  /** The {@link Swatch} applied to the shadow portion of the effect. */
  get shadowColor(): Read<M, Swatch | NothingEnum.NOTHING>;
  set shadowColor(value: Swatch | string | NSet);

  /** The blending mode for the shadow portion of the effect. */
  get shadowBlendMode(): Read<M, BlendMode | NothingEnum.NOTHING>;
  set shadowBlendMode(value: BlendMode | NSet);

  /** The opacity of the shadow portion of the effect (as a percentage). (Range: 0 to 100). */
  get shadowOpacity(): Read<M, number | NothingEnum.NOTHING>;
  set shadowOpacity(value: number | NSet);
}
