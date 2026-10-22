/**
 * SubmitFormBehaviors.d.ts — indesign-uxp-types
 * Adobe InDesign 2026 (21.x) ExtendScript DOM declarations,
 * converted from indesign-uxp-types by tools/codemod.
 * Version: 1.0.0 · Updated: 2026-09-29
 * Author: Vlad Vladila (Krommatine Systems) · https://github.com/vamitul/indesign-uxp-types
 */
import type { PropertiesSetter } from './_base/Properties';
import type {
  NamedCollection,
  IdCollection,
  BaseCollection,
} from './_base/Collections';
import type { SubmitFormBehavior } from './SubmitFormBehavior';

/**
 * A collection of {@link SubmitFormBehavior} objects. This behavior is applied
 * to interactive elements (like buttons) to trigger the submission of form data
 * to a specified URL.
 *
 * @collection SubmitFormBehavior
 */
export interface SubmitFormBehaviors
  extends
    BaseCollection<SubmitFormBehavior, SubmitFormBehavior, SubmitFormBehavior<'plural'>>,
    IdCollection<SubmitFormBehavior>,
    NamedCollection<SubmitFormBehavior> {
  /**
   * Creates a new submit form behavior.
   * @param withProperties Initial values for properties of the new {@link SubmitFormBehavior}.
   */
  add(withProperties?: PropertiesSetter<SubmitFormBehavior>): SubmitFormBehavior;
}
