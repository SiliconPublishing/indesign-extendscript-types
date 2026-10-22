/**
 * PercentEditboxes.d.ts — indesign-uxp-types
 * Adobe InDesign 2026 (21.x) ExtendScript DOM declarations,
 * converted from indesign-uxp-types by tools/codemod.
 * Version: 1.0.0 · Updated: 2026-09-29
 * Author: Vlad Vladila (Krommatine Systems) · https://github.com/vamitul/indesign-uxp-types
 */
import type { PropertiesSetter } from './_base/Properties';
import type { IdCollection, BaseCollection } from './_base/Collections';
import type { PercentEditbox } from './PercentEditbox';
import type { Dialog } from './Dialog';

/**
 * A collection of {@link PercentEditbox} objects within an InDesign {@link Dialog}.
 * These UI controls allow users to input or edit percentage values.
 *
 * @collection PercentEditbox
 */
export interface PercentEditboxes
  extends BaseCollection<PercentEditbox, PercentEditbox, PercentEditbox<'plural'>>, IdCollection<PercentEditbox> {
  /**
   * Creates and adds a new percentage editbox control to the dialog.
   * @param withProperties Initial values for properties of the new control.
   */
  add(withProperties?: PropertiesSetter<PercentEditbox>): PercentEditbox;
}
