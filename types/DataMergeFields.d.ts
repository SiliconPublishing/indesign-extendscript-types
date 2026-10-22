/**
 * DataMergeFields.d.ts — indesign-uxp-types
 * Adobe InDesign 2026 (21.x) ExtendScript DOM declarations,
 * converted from indesign-uxp-types by tools/codemod.
 * Version: 1.0.0 · Updated: 2026-09-29
 * Author: Vlad Vladila (Krommatine Systems) · https://github.com/vamitul/indesign-uxp-types
 */
import type { BaseCollection } from './_base/Collections';
import type { DataMergeField } from './DataMergeField';

/**
 * A collection of {@link DataMergeField} objects. These represent the specific
 * data columns or fields available in the currently loaded data source for a
 * data merge operation.
 *
 * @collection DataMergeField
 */
export interface DataMergeFields extends BaseCollection<DataMergeField, DataMergeField, DataMergeField<'plural'>>, InDesignEdition.DataMergeFields, InDesignPlugins.DataMergeFields {
}
