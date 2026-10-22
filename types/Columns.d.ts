/**
 * Columns.d.ts — indesign-uxp-types
 * Adobe InDesign 2026 (21.x) ExtendScript DOM declarations,
 * converted from indesign-uxp-types by tools/codemod.
 * Version: 1.0.0 · Updated: 2026-09-29
 * Author: Vlad Vladila (Krommatine Systems) · https://github.com/vamitul/indesign-uxp-types
 */
import type { Table } from './Table';
import type { Cell } from './Cell';
import type { Row } from './Row';
import type {
  AddableTableElementCollection,
  NamedCollection,
  BaseCollection,
} from './_base/Collections';
import type { Column } from './Column';
import type { LocationOptions } from './Enums/LocationOptions';

/**
 * A collection of table {@link Column} objects. Columns are managed by the table model
 * and provide structural organization for table cells.
 *
 * @collection Column
 */
export interface Columns
  extends
    BaseCollection<Column, Column, Column<'plural'>>,
    NamedCollection<Column>,
    AddableTableElementCollection<Column, Row | Column | Cell | Table> {
}
