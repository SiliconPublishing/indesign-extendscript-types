/**
 * IntegerEditboxes.d.ts — indesign-uxp-types
 * Adobe InDesign 2026 (21.x) ExtendScript DOM declarations,
 * converted from indesign-uxp-types by tools/codemod.
 * Version: 1.0.0 · Updated: 2026-09-29
 * Author: Vlad Vladila (Krommatine Systems) · https://github.com/vamitul/indesign-uxp-types
 */
import type { PropertiesSetter } from './_base/Properties';
import type { IdCollection, BaseCollection } from './_base/Collections';
import type { IntegerEditbox } from './IntegerEditbox';
import type { Dialog } from './Dialog';

/**
 * A collection of {@link IntegerEditbox} objects within an InDesign {@link Dialog}.
 * These UI controls allow users to input or edit whole number (integer) values.
 *
 * @collection IntegerEditbox
 */
export interface IntegerEditboxes
  extends BaseCollection<IntegerEditbox, IntegerEditbox, IntegerEditbox<'plural'>>, IdCollection<IntegerEditbox> {
  /**
   * Creates and adds a new integer editbox control to the dialog.
   * @param withProperties Initial values for properties of the new control.
   */
  add(withProperties?: PropertiesSetter<IntegerEditbox>): IntegerEditbox;
}
