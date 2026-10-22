/**
 * PercentEditbox.d.ts — indesign-uxp-types
 * Adobe InDesign 2026 (21.x) ExtendScript DOM declarations,
 * converted from indesign-uxp-types by tools/codemod.
 * Version: 1.0.0 · Updated: 2026-09-29
 * Author: Vlad Vladila (Krommatine Systems) · https://github.com/vamitul/indesign-uxp-types
 */
import type { Mode, Read } from './_base/Types';
import type { Widget } from './Widget';
import type { NumericEditboxSurface } from './_base/WidgetMixins';

/**
 * A numeric entry field for percentage values.
 */
export interface PercentEditbox<M extends Mode = 'single'> extends Widget<M>, NumericEditboxSurface<M>, InDesignEdition.PercentEditbox<M>, InDesignPlugins.PercentEditbox<M>{
  /** Resolves the proxy into the individual {@link PercentEditbox} objects it stands for. */
  getElements(): PercentEditbox<'single'>[];
}
