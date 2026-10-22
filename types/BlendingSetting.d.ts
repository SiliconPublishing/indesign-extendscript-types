/**
 * BlendingSetting.d.ts — indesign-uxp-types
 * Adobe InDesign 2026 (21.x) ExtendScript DOM declarations,
 * converted from indesign-uxp-types by tools/codemod.
 * Version: 1.0.0 · Updated: 2026-09-29
 * Author: Vlad Vladila (Krommatine Systems) · https://github.com/vamitul/indesign-uxp-types
 */
import type { Mode, Read } from './_base/Types';
import type { EventTargetDOMObject } from './_base/DomObjects';
import type { ContentTransparencySetting } from './ContentTransparencySetting';
import type { FillTransparencySetting } from './FillTransparencySetting';
import type { StrokeTransparencySetting } from './StrokeTransparencySetting';
import type { TransparencySetting } from './TransparencySetting';
import type { BlendMode } from './Enums/BlendMode';
import type { NothingEnum } from "./Enums/NothingEnum";

/**
 * Basic object blending settings.
 */
export interface BlendingSetting<M extends Mode = 'single', TParent = TransparencySetting | StrokeTransparencySetting | FillTransparencySetting | ContentTransparencySetting, NSet = never> extends EventTargetDOMObject<TParent, M> {
  /** Resolves the proxy into the individual {@link BlendingSetting} objects it stands for. */
  getElements(): BlendingSetting<'single', TParent>[];

  /** The blending mode for controlling how the base color interacts with the color of the BlendingSetting. */
  get blendMode(): Read<M, BlendMode | NothingEnum.NOTHING>;
  set blendMode(value: BlendMode | NSet);

  /** The fill opacity of the BlendingSetting (as a percentage). (Range: 0 to 100). */
  get opacity(): Read<M, number | NothingEnum.NOTHING>;
  set opacity(value: number | NSet);

  /** If true, the BlendingSetting is a knockout group. */
  get knockoutGroup(): Read<M, boolean | NothingEnum.NOTHING>;
  set knockoutGroup(value: boolean | NSet);

  /** If true, blending is applied only to the group. If false, blending includes all objects beneath the group. */
  get isolateBlending(): Read<M, boolean | NothingEnum.NOTHING>;
  set isolateBlending(value: boolean | NSet);
}
