/**
 * ParagraphStyleGroups.d.ts — indesign-uxp-types
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
import type { ParagraphStyleGroup } from './ParagraphStyleGroup';

/**
 * A collection of {@link ParagraphStyleGroup} objects. Style groups allow you to
 * organize paragraph styles into hierarchical folders for better management
 * in large documents.
 *
 * @collection ParagraphStyleGroup
 */
export interface ParagraphStyleGroups
  extends
    BaseCollection<ParagraphStyleGroup, ParagraphStyleGroup, ParagraphStyleGroup<'plural'>>,
    IdCollection<ParagraphStyleGroup>,
    NamedCollection<ParagraphStyleGroup>, InDesignEdition.ParagraphStyleGroups, InDesignPlugins.ParagraphStyleGroups {
  /**
   * Creates a new paragraph style group.
   * * **Duplicate Names:** If a style group with the specified name already exists, this method will throw an error. Check existence using `itemByName("Name").isValid` before adding.
   *
   * @param withProperties Initial values for properties of the new ParagraphStyleGroup.
   */
  add(withProperties: PropertiesSetter<ParagraphStyleGroup>): ParagraphStyleGroup;

  add(
    withProperties?: PropertiesSetter<ParagraphStyleGroup>,
  ): ParagraphStyleGroup;
}
