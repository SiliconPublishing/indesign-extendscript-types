/**
 * PercentComboboxes.d.ts — indesign-uxp-types
 * Adobe InDesign 2026 (21.x) ExtendScript DOM declarations,
 * converted from indesign-uxp-types by tools/codemod.
 * Version: 1.0.0 · Updated: 2026-09-29
 * Author: Vlad Vladila (Krommatine Systems) · https://github.com/vamitul/indesign-uxp-types
 */
import type { PropertiesSetter } from './_base/Properties';
import type { IdCollection, BaseCollection } from './_base/Collections';
import type { PercentCombobox } from './PercentCombobox';
import type { Dialog } from './Dialog';

/**
 * A collection of {@link PercentCombobox} objects within an InDesign {@link Dialog}.
 * These UI controls provide a list of preset percentages while also allowing
 * custom text entry.
 *
 * @collection PercentCombobox
 */
export interface PercentComboboxes
  extends BaseCollection<PercentCombobox, PercentCombobox, PercentCombobox<'plural'>>, IdCollection<PercentCombobox> {
  /**
   * Creates and adds a new percentage combobox control to the dialog.
   * @param withProperties Initial values for properties of the new control.
   */
  add(withProperties?: PropertiesSetter<PercentCombobox>): PercentCombobox;
}
