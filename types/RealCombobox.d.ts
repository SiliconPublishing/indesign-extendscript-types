/**
 * RealCombobox.d.ts — indesign-uxp-types
 * Adobe InDesign 2026 (21.x) ExtendScript DOM declarations,
 * converted from indesign-uxp-types by tools/codemod.
 * Version: 1.0.0 · Updated: 2026-09-29
 * Author: Vlad Vladila (Krommatine Systems) · https://github.com/vamitul/indesign-uxp-types
 */
import type { Mode, Read } from './_base/Types';
import type { Widget } from './Widget';
import type { NumericComboboxSurface } from './_base/WidgetMixins';

/**
 * An editable dropdown for high-precision numeric values.
 */
export interface RealCombobox<M extends Mode = 'single'> extends Widget<M>, NumericComboboxSurface<M>, InDesignEdition.RealCombobox<M>, InDesignPlugins.RealCombobox<M>{
  /** Resolves the proxy into the individual {@link RealCombobox} objects it stands for. */
  getElements(): RealCombobox<'single'>[];
}
