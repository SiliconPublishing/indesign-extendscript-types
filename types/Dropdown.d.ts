/**
 * Dropdown.d.ts — indesign-uxp-types
 * Adobe InDesign 2026 (21.x) ExtendScript DOM declarations,
 * converted from indesign-uxp-types by tools/codemod.
 * Version: 1.0.0 · Updated: 2026-09-29
 * Author: Vlad Vladila (Krommatine Systems) · https://github.com/vamitul/indesign-uxp-types
 */
import type { Mode, Read } from './_base/Types';
import type { Widget } from './Widget';

/**
 * A non-editable dropdown list of fixed choices.
 */
export interface Dropdown<M extends Mode = 'single'> extends Widget<M>, InDesignEdition.Dropdown<M>, InDesignPlugins.Dropdown<M>{
  /** Resolves the proxy into the individual {@link Dropdown} objects it stands for. */
  getElements(): Dropdown<'single'>[];

  /** The items shown in the dropdown list. */
  get stringList(): Read<M, string[]>;
  set stringList(value: string[]);

  /** The index of the currently selected item. */
  get selectedIndex(): Read<M, number>;
  set selectedIndex(value: number);
}
