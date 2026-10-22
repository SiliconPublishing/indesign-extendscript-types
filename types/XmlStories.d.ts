/**
 * XmlStories.d.ts — indesign-uxp-types
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
import type { XmlStory } from './XmlStory';

/**
 * A collection of {@link XmlStory} objects in an InDesign document.
 * XML stories are specialized text containers that store unplaced
 * XML data within the document's logical structure.
 *
 * @collection XmlStory
 */
export interface XmlStories
  extends
    BaseCollection<XmlStory, XmlStory, XmlStory<'plural'>>,
    IdCollection<XmlStory>,
    NamedCollection<XmlStory>, InDesignEdition.XmlStories, InDesignPlugins.XmlStories {
}
