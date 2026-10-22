/**
 * FeatherSetting.d.ts — indesign-uxp-types
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
import type { FeatherCornerType } from './Enums/FeatherCornerType';
import type { FeatherMode } from './Enums/FeatherMode';
import type { FindChangeFeatherSetting } from './FindChangeFeatherSetting';
import type { NothingEnum } from "./Enums/NothingEnum";

/**
 * Feather effect settings.
 */
export interface FeatherSetting<M extends Mode = 'single', TParent = TransparencySetting | StrokeTransparencySetting | FillTransparencySetting | ContentTransparencySetting, NSet = never> extends EventTargetDOMObject<TParent, M>, InDesignPlugins.FeatherSetting<M> {
  /** Resolves the proxy into the individual {@link FeatherSetting} objects it stands for. */
  getElements(): FeatherSetting<'single', TParent>[];

  /** Whether feathering is applied to the object's edges. See {@link FeatherMode}. */
  get mode(): Read<M, FeatherMode | NothingEnum.NOTHING>;
  set mode(value: FeatherMode | NSet);

  /** The feather width. (Range depends on the unit type. For points: 0 to 1000; for picas: 0 to 83p4; for inches: 0 to 13.8889; for mm: 0 to 352.778; for cm: 0 to 35.277; for ciceros: 0 to 78c2.389.). */
  get width(): Read<M, number | NothingEnum.NOTHING>;
  set width(value: MeasurementValue | NSet);

  /** How the feather's corners render: sharp, rounded, or a soft diffusion. See {@link FeatherCornerType}. */
  get cornerType(): Read<M, FeatherCornerType | NothingEnum.NOTHING>;
  set cornerType(value: FeatherCornerType | NSet);

  /** The amount (as a percentage) of noise applied to the feather. (Range: 0 to 100). */
  get noise(): Read<M, number | NothingEnum.NOTHING>;
  set noise(value: number | NSet);

  /** The amount to choke the feather (as a percentage of the feather width). (Range: 0 to 100). */
  get chokeAmount(): Read<M, number | NothingEnum.NOTHING>;
  set chokeAmount(value: number | NSet);
}
