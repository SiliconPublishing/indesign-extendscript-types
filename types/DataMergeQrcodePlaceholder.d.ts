/**
 * DataMergeQrcodePlaceholder.d.ts — indesign-uxp-types
 * Adobe InDesign 2026 (21.x) ExtendScript DOM declarations,
 * converted from indesign-uxp-types by tools/codemod.
 * Version: 1.0.0 · Updated: 2026-09-29
 * Author: Vlad Vladila (Krommatine Systems) · https://github.com/vamitul/indesign-uxp-types
 */
import type { Mode, Read } from './_base/Types';
import type { EventTargetDOMObject, IndexedDOMObject } from './_base/DomObjects';
import type { Document } from './Document';
import type { DataMergeField } from './DataMergeField';
import type { PageItem } from './PageItem';
import type { EditionPart } from "./_base/Editions";

/**
 * A page item marked to receive a generated QR code image built from a data
 * merge field's value during a merge.
 */
export interface DataMergeQrcodePlaceholder<M extends Mode = 'single'>
  extends EventTargetDOMObject<Document, M>,
    IndexedDOMObject<Document, M>, InDesignEdition.DataMergeQrcodePlaceholder<M>, InDesignPlugins.DataMergeQrcodePlaceholder<M> {
  /** Resolves the proxy into the individual {@link DataMergeQrcodePlaceholder} objects it stands for. */
  getElements(): DataMergeQrcodePlaceholder<'single'>[];

  /** The data merge field encoded into the QR code at this placeholder. */
  readonly field: Read<M, DataMergeField>;

  /** The page item that hosts the placeholder. */
  readonly placeholderPageItem: Read<M, PageItem>;
}
/** DataMergeQrcodePlaceholder's members only InDesign desktop has, or has differently (tools/codemod/editions.mjs). */
export interface DataMergeQrcodePlaceholderDesktop<M extends Mode = 'single'> extends EditionPart {}

/** DataMergeQrcodePlaceholder's members only InDesign Server has, or has differently (tools/codemod/editions.mjs). */
export interface DataMergeQrcodePlaceholderServer<M extends Mode = 'single'> extends EditionPart {
  /**
   * The name of the tag.
   * Generated from the InDesign Server 21.6 scripting dictionary.
   * InDesign Server only.
   */
  readonly name: Read<M, string>;
}

/** DataMergeQrcodePlaceholder's members as both InDesign desktop and InDesign Server have them (tools/codemod/editions.mjs). */
export interface DataMergeQrcodePlaceholderPortable<M extends Mode = 'single'> extends EditionPart {}
