/**
 * RealEditbox.d.ts — indesign-uxp-types
 * Adobe InDesign 2026 (21.x) ExtendScript DOM declarations,
 * converted from indesign-uxp-types by tools/codemod.
 * Version: 1.0.0 · Updated: 2026-09-29
 * Author: Vlad Vladila (Krommatine Systems) · https://github.com/vamitul/indesign-uxp-types
 */
import type { Mode, Read } from './_base/Types';
import type { Widget } from './Widget';
import type { NumericEditboxSurface } from './_base/WidgetMixins';

/**
 * A high-precision (non-rounding) numeric entry field.
 */
export interface RealEditbox<M extends Mode = 'single'> extends Widget<M>, NumericEditboxSurface<M>, InDesignPlugins.RealEditbox<M>{
  /** Resolves the proxy into the individual {@link RealEditbox} objects it stands for. */
  getElements(): RealEditbox<'single'>[];
}
