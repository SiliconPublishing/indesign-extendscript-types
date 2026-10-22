/**
 * BorderPanel.d.ts — indesign-uxp-types
 * Adobe InDesign 2026 (21.x) ExtendScript DOM declarations,
 * converted from indesign-uxp-types by tools/codemod.
 * Version: 1.0.0 · Updated: 2026-09-29
 * Author: Vlad Vladila (Krommatine Systems) · https://github.com/vamitul/indesign-uxp-types
 */
import type { Mode, Read } from './_base/Types';
import type { Widget } from './Widget';
import type { WidgetContainer } from './_base/WidgetMixins';
import type { DialogColumns } from './DialogColumns';

/**
 * A bordered panel that can hold any number and type of controls.
 */
export interface BorderPanel<M extends Mode = 'single'> extends Widget<M>, WidgetContainer<M>, InDesignPlugins.BorderPanel<M>{
  /** Resolves the proxy into the individual {@link BorderPanel} objects it stands for. */
  getElements(): BorderPanel<'single'>[];

  /** The columns nested directly inside the panel. */
  readonly dialogColumns: DialogColumns;
}
