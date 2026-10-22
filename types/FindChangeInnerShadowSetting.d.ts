/**
 * FindChangeInnerShadowSetting.d.ts — indesign-uxp-types
 * Adobe InDesign 2026 (21.x) ExtendScript DOM declarations,
 * converted from indesign-uxp-types by tools/codemod.
 * Version: 1.0.0 · Updated: 2026-09-29
 * Author: Vlad Vladila (Krommatine Systems) · https://github.com/vamitul/indesign-uxp-types
 */
import type { Mode, Read } from './_base/Types';
import type { InnerShadowSetting } from './InnerShadowSetting';
import type { FindChangeTransparencySetting } from './FindChangeTransparencySetting';
import type { FindChangeStrokeTransparencySetting } from './FindChangeStrokeTransparencySetting';
import type { FindChangeFillTransparencySetting } from './FindChangeFillTransparencySetting';
import type { FindChangeContentTransparencySetting } from './FindChangeContentTransparencySetting';
import type { Swatch } from './Swatch';
import type { NothingEnum } from "./Enums/NothingEnum";

/**
 * The same {@link InnerShadowSetting} settings, applied as find/change criteria.
 */
export interface FindChangeInnerShadowSetting<M extends Mode = 'single'> extends InnerShadowSetting<M, FindChangeTransparencySetting | FindChangeStrokeTransparencySetting | FindChangeFillTransparencySetting, NothingEnum.NOTHING>, InDesignPlugins.FindChangeInnerShadowSetting<M>{
  /** Resolves the proxy into the individual {@link FindChangeInnerShadowSetting} objects it stands for. */
  getElements(): FindChangeInnerShadowSetting<'single'>[];
}
