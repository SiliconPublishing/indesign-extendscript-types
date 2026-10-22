/**
 * DataMergeImagePlaceholders.d.ts — indesign-uxp-types
 * Adobe InDesign 2026 (21.x) ExtendScript DOM declarations,
 * converted from indesign-uxp-types by tools/codemod.
 * Version: 1.0.0 · Updated: 2026-09-29
 * Author: Vlad Vladila (Krommatine Systems) · https://github.com/vamitul/indesign-uxp-types
 */
import type { PropertiesSetter } from './_base/Properties';
import type { DataMergeField } from './DataMergeField';
import type { PageItem } from './PageItem';
import type { BaseCollection } from './_base/Collections';
import type { DataMergeImagePlaceholder } from './DataMergeImagePlaceholder';
import type { EditionPart } from "./_base/Editions";
import type { Read } from "./_base/Types";

/**
 * A collection of {@link DataMergeImagePlaceholder} objects. These placeholders
 * mark the locations on a page where image files referenced in a source file
 * will be placed during a data merge operation.
 *
 * @collection DataMergeImagePlaceholder
 */
export interface DataMergeImagePlaceholders extends BaseCollection<DataMergeImagePlaceholder, DataMergeImagePlaceholder, DataMergeImagePlaceholder<'plural'>>, InDesignEdition.DataMergeImagePlaceholders, InDesignPlugins.DataMergeImagePlaceholders {
  /**
   * Creates a new data merge image placeholder.
   *
   * @param placeholder The {@link PageItem} (typically a rectangle) to act as the container for the image.
   * @param field The {@link DataMergeField} to associate with the placeholder.
   * @param withProperties Initial values for properties of the new DataMergeImagePlaceholder.
   */
  add(
    placeholder: PageItem,
    field: DataMergeField,
    withProperties?: PropertiesSetter<DataMergeImagePlaceholder>,
  ): DataMergeImagePlaceholder;
}
/** DataMergeImagePlaceholders's members only InDesign desktop has, or has differently (tools/codemod/editions.mjs). */
export interface DataMergeImagePlaceholdersDesktop extends EditionPart {}

/** DataMergeImagePlaceholders's members only InDesign Server has, or has differently (tools/codemod/editions.mjs). */
export interface DataMergeImagePlaceholdersServer extends EditionPart {
  /**
   * Returns the DataMergeImagePlaceholder with the specified name.
   * InDesign Server only.
   * @param name The name.
   * Generated from the InDesign Server 21.6 scripting dictionary.
   */
  itemByName(name: string): DataMergeImagePlaceholder;
}

/** DataMergeImagePlaceholders's members as both InDesign desktop and InDesign Server have them (tools/codemod/editions.mjs). */
export interface DataMergeImagePlaceholdersPortable extends EditionPart {}
