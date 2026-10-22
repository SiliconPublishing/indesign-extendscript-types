/**
 * NamedGrids.d.ts — indesign-uxp-types
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
import type { NamedGrid } from './NamedGrid';

/**
 * A collection of {@link NamedGrid} objects. Named grids allow you to define and
 * reuse complex frame grid settings (such as font, character size, and alignment)
 * for consistent layout across different documents.
 *
 * @collection NamedGrid
 */
export interface NamedGrids
  extends
    BaseCollection<NamedGrid, NamedGrid, NamedGrid<'plural'>>,
    IdCollection<NamedGrid>,
    NamedCollection<NamedGrid>, InDesignPlugins.NamedGrids {
  /**
   * Creates a new named grid.
   *
   * * **Duplicate Names:** If a named grid with the specified name already exists, this method will throw an error. Check existence using `itemByName("Name").isValid` before adding.
   *
   * @param withProperties Initial values for properties of the new NamedGrid.
   */
  add(withProperties?: PropertiesSetter<NamedGrid>): NamedGrid;
}
