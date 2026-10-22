/**
 * FindChangeFeatherSetting.d.ts — indesign-uxp-types
 * Adobe InDesign 2026 (21.x) ExtendScript DOM declarations,
 * converted from indesign-uxp-types by tools/codemod.
 * Version: 1.0.0 · Updated: 2026-09-29
 * Author: Vlad Vladila (Krommatine Systems) · https://github.com/vamitul/indesign-uxp-types
 */
import type { Mode, Read } from './_base/Types';
import type { FeatherSetting } from './FeatherSetting';
import type { FindChangeTransparencySetting } from './FindChangeTransparencySetting';
import type { FindChangeStrokeTransparencySetting } from './FindChangeStrokeTransparencySetting';
import type { FindChangeFillTransparencySetting } from './FindChangeFillTransparencySetting';
import type { FindChangeContentTransparencySetting } from './FindChangeContentTransparencySetting';
import type { FeatherCornerType } from './Enums/FeatherCornerType';
import type { FeatherMode } from './Enums/FeatherMode';
import type { NothingEnum } from "./Enums/NothingEnum";

/**
 * The same {@link FeatherSetting} settings, applied as find/change criteria.
 */
export interface FindChangeFeatherSetting<M extends Mode = 'single'> extends FeatherSetting<M, FindChangeTransparencySetting | FindChangeStrokeTransparencySetting | FindChangeFillTransparencySetting, NothingEnum.NOTHING>, InDesignPlugins.FindChangeFeatherSetting<M>{
  /** Resolves the proxy into the individual {@link FindChangeFeatherSetting} objects it stands for. */
  getElements(): FindChangeFeatherSetting<'single'>[];
}
