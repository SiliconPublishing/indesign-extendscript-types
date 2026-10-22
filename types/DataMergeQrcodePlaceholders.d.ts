/**
 * DataMergeQrcodePlaceholders.d.ts — indesign-uxp-types
 * Adobe InDesign 2026 (21.x) ExtendScript DOM declarations,
 * converted from indesign-uxp-types by tools/codemod.
 * Version: 1.0.0 · Updated: 2026-09-29
 * Author: Vlad Vladila (Krommatine Systems) · https://github.com/vamitul/indesign-uxp-types
 */
import type { PropertiesSetter } from './_base/Properties';
import type { DataMergeField } from './DataMergeField';
import type { PageItem } from './PageItem';
import type { BaseCollection } from './_base/Collections';
import type { DataMergeQrcodePlaceholder } from './DataMergeQrcodePlaceholder';
import type { EditionPart } from "./_base/Editions";
import type { Read } from "./_base/Types";

/**
 * A collection of {@link DataMergeQrcodePlaceholder} objects. These placeholders
 * mark the locations on a page where QR code data from a source file will
 * be generated during a data merge operation.
 *
 * @collection DataMergeQrcodePlaceholder
 */
export interface DataMergeQrcodePlaceholders extends BaseCollection<DataMergeQrcodePlaceholder, DataMergeQrcodePlaceholder, DataMergeQrcodePlaceholder<'plural'>>, InDesignEdition.DataMergeQrcodePlaceholders, InDesignPlugins.DataMergeQrcodePlaceholders {
  /**
   * Creates a new data merge QR code placeholder.
   *
   * @param placeholder The {@link PageItem} (typically a rectangle) to act as the container for the QR code.
   * @param field The {@link DataMergeField} to associate with the placeholder.
   * @param withProperties Initial values for properties of the new DataMergeQrcodePlaceholder.
   */
  add(
    placeholder: PageItem,
    field: DataMergeField,
    withProperties?: PropertiesSetter<DataMergeQrcodePlaceholder>,
  ): DataMergeQrcodePlaceholder;
}
/** DataMergeQrcodePlaceholders's members only InDesign desktop has, or has differently (tools/codemod/editions.mjs). */
export interface DataMergeQrcodePlaceholdersDesktop extends EditionPart {}

/** DataMergeQrcodePlaceholders's members only InDesign Server has, or has differently (tools/codemod/editions.mjs). */
export interface DataMergeQrcodePlaceholdersServer extends EditionPart {
  /**
   * Returns the DataMergeQrcodePlaceholder with the specified name.
   * InDesign Server only.
   * @param name The name.
   * Generated from the InDesign Server 21.6 scripting dictionary.
   */
  itemByName(name: string): DataMergeQrcodePlaceholder;
}

/** DataMergeQrcodePlaceholders's members as both InDesign desktop and InDesign Server have them (tools/codemod/editions.mjs). */
export interface DataMergeQrcodePlaceholdersPortable extends EditionPart {}
