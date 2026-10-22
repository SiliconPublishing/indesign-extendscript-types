/**
 * AssignedStories.d.ts — indesign-uxp-types
 * Adobe InDesign 2026 (21.x) ExtendScript DOM declarations,
 * converted from indesign-uxp-types by tools/codemod.
 * Version: 1.0.0 · Updated: 2026-09-29
 * Author: Vlad Vladila (Krommatine Systems) · https://github.com/vamitul/indesign-uxp-types
 */
import type {
  NamedCollection,
  IdCollection,
  BaseCollection,
} from './_base/Collections';
import type { AssignedStory } from './AssignedStory';
import type { Assignment } from './Assignment';

/**
 * A collection of {@link AssignedStory} objects within an {@link Assignment}.
 * These represent the specific stories and text content that have been explicitly
 * linked to the assignment for collaborative editing.
 *
 * @collection AssignedStory
 */
export interface AssignedStories
  extends
    BaseCollection<AssignedStory, AssignedStory, AssignedStory<'plural'>>,
    IdCollection<AssignedStory>,
    NamedCollection<AssignedStory>, InDesignPlugins.AssignedStories {
}
