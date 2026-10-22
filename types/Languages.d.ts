/**
 * Languages.d.ts — indesign-uxp-types
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
import type { Language } from './Language';

/**
 * A collection of {@link Language} objects available in the InDesign application.
 * Languages define the dictionary and hyphenation rules used for text composition.
 *
 * @collection Language
 */
export interface Languages
  extends
    BaseCollection<Language, Language, Language<'plural'>>,
    IdCollection<Language>,
    NamedCollection<Language>, InDesignEdition.Languages, InDesignPlugins.Languages {
}
