/**
 * DataMergeTextPlaceholders.d.ts — indesign-uxp-types
 * Adobe InDesign 2026 (21.x) ExtendScript DOM declarations,
 * converted from indesign-uxp-types by tools/codemod.
 * Version: 1.0.0 · Updated: 2026-09-29
 * Author: Vlad Vladila (Krommatine Systems) · https://github.com/vamitul/indesign-uxp-types
 */
import type { PropertiesSetter } from './_base/Properties';
import type { BaseCollection } from './_base/Collections';
import type { DataMergeTextPlaceholder } from './DataMergeTextPlaceholder';
import type { DataMergeField } from './DataMergeField';
import type { Story } from './Story';
import type { InsertionPoint } from './InsertionPoint';
import type { EditionPart } from "./_base/Editions";
import type { Read } from "./_base/Types";

/**
 * A collection of {@link DataMergeTextPlaceholder} objects. These placeholders
 * mark the locations within a story where text data from a source file will
 * be inserted during a data merge operation.
 *
 * @collection DataMergeTextPlaceholder
 */
export interface DataMergeTextPlaceholders extends BaseCollection<DataMergeTextPlaceholder, DataMergeTextPlaceholder, DataMergeTextPlaceholder<'plural'>>, InDesignEdition.DataMergeTextPlaceholders, InDesignPlugins.DataMergeTextPlaceholders {
  /**
   * Creates a new data merge text placeholder.
   *
   * @param parentStory The {@link Story} in which to insert the placeholder.
   * @param storyOffset The location within the story to insert the placeholder. Can be a specific {@link InsertionPoint} or a character index (offset number).
   * @param field The {@link DataMergeField} to associate with the placeholder.
   * @param withProperties Initial values for properties of the new DataMergeTextPlaceholder.
   */
  add(
    parentStory: Story,
    storyOffset: InsertionPoint | number,
    field: DataMergeField,
    withProperties?: PropertiesSetter<DataMergeTextPlaceholder>,
  ): DataMergeTextPlaceholder;
}
/** DataMergeTextPlaceholders's members only InDesign desktop has, or has differently (tools/codemod/editions.mjs). */
export interface DataMergeTextPlaceholdersDesktop extends EditionPart {}

/** DataMergeTextPlaceholders's members only InDesign Server has, or has differently (tools/codemod/editions.mjs). */
export interface DataMergeTextPlaceholdersServer extends EditionPart {
  /**
   * Returns the DataMergeTextPlaceholder with the specified name.
   * InDesign Server only.
   * @param name The name.
   * Generated from the InDesign Server 21.6 scripting dictionary.
   */
  itemByName(name: string): DataMergeTextPlaceholder;
}

/** DataMergeTextPlaceholders's members as both InDesign desktop and InDesign Server have them (tools/codemod/editions.mjs). */
export interface DataMergeTextPlaceholdersPortable extends EditionPart {}
