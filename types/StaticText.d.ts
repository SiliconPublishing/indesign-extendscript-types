/**
 * StaticText.d.ts — indesign-uxp-types
 * Adobe InDesign 2026 (21.x) ExtendScript DOM declarations,
 * converted from indesign-uxp-types by tools/codemod.
 * Version: 1.0.0 · Updated: 2026-09-29
 * Author: Vlad Vladila (Krommatine Systems) · https://github.com/vamitul/indesign-uxp-types
 */
import type { Mode, Read } from './_base/Types';
import type { Widget } from './Widget';
import type { StaticAlignmentOptions } from './Enums/StaticAlignmentOptions';

/**
 * A non-interactive text label, typically identifying another control or
 * group of controls.
 */
export interface StaticText<M extends Mode = 'single'> extends Widget<M>, InDesignEdition.StaticText<M>, InDesignPlugins.StaticText<M>{
  /** Resolves the proxy into the individual {@link StaticText} objects it stands for. */
  getElements(): StaticText<'single'>[];

  /** The text shown in the control. */
  get staticLabel(): Read<M, string>;
  set staticLabel(value: string);

  /** The {@link StaticAlignmentOptions text alignment} of the control. */
  get staticAlignment(): Read<M, StaticAlignmentOptions>;
  set staticAlignment(value: StaticAlignmentOptions);
}
