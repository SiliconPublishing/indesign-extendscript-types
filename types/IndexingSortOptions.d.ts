/**
 * IndexingSortOptions.d.ts — indesign-uxp-types
 * Adobe InDesign 2026 (21.x) ExtendScript DOM declarations,
 * converted from indesign-uxp-types by tools/codemod.
 * Version: 1.0.0 · Updated: 2026-09-29
 * Author: Vlad Vladila (Krommatine Systems) · https://github.com/vamitul/indesign-uxp-types
 */
import type { NamedCollection, BaseCollection } from './_base/Collections';
import type { IndexingSortOption } from './IndexingSortOption';

/**
 * A collection of {@link IndexingSortOption} objects. These options define the
 * specific sorting and grouping rules used for generating an index in different
 * languages or character sets.
 *
 * @collection IndexingSortOption
 */
export interface IndexingSortOptions
  extends
    BaseCollection<IndexingSortOption, IndexingSortOption, IndexingSortOption<'plural'>>,
    NamedCollection<IndexingSortOption> {
}
