/**
 * DataMergeTextPlaceholder.d.ts — indesign-uxp-types
 * Adobe InDesign 2026 (21.x) ExtendScript DOM declarations,
 * converted from indesign-uxp-types by tools/codemod.
 * Version: 1.0.0 · Updated: 2026-09-29
 * Author: Vlad Vladila (Krommatine Systems) · https://github.com/vamitul/indesign-uxp-types
 */
import type { Mode, Read } from './_base/Types';
import type { EventTargetDOMObject, IndexedDOMObject } from './_base/DomObjects';
import type { Document } from './Document';
import type { DataMergeField } from './DataMergeField';
import type { InsertionPoint } from './InsertionPoint';
import type { Story } from './Story';
import type { EditionPart } from "./_base/Editions";

/**
 * A location in story text marked to receive a data merge field's text value
 * during a merge.
 */
export interface DataMergeTextPlaceholder<M extends Mode = 'single'>
  extends EventTargetDOMObject<Document, M>,
    IndexedDOMObject<Document, M>, InDesignEdition.DataMergeTextPlaceholder<M>, InDesignPlugins.DataMergeTextPlaceholder<M> {
  /** Resolves the proxy into the individual {@link DataMergeTextPlaceholder} objects it stands for. */
  getElements(): DataMergeTextPlaceholder<'single'>[];

  /** The data merge field inserted at this placeholder. */
  readonly field: Read<M, DataMergeField>;

  /** The insertion point immediately before the placeholder in its story. */
  readonly storyOffset: Read<M, InsertionPoint>;

  /** The story that contains the placeholder. */
  readonly parentStory: Read<M, Story>;

  /** The number of characters the placeholder occupies in {@link parentStory}, starting at
   * {@link storyOffset}. */
  readonly length: Read<M, number>;
}
/** DataMergeTextPlaceholder's members only InDesign desktop has, or has differently (tools/codemod/editions.mjs). */
export interface DataMergeTextPlaceholderDesktop<M extends Mode = 'single'> extends EditionPart {}

/** DataMergeTextPlaceholder's members only InDesign Server has, or has differently (tools/codemod/editions.mjs). */
export interface DataMergeTextPlaceholderServer<M extends Mode = 'single'> extends EditionPart {
  /**
   * The name of the tag.
   * Generated from the InDesign Server 21.6 scripting dictionary.
   * InDesign Server only.
   */
  readonly name: Read<M, string>;
}

/** DataMergeTextPlaceholder's members as both InDesign desktop and InDesign Server have them (tools/codemod/editions.mjs). */
export interface DataMergeTextPlaceholderPortable<M extends Mode = 'single'> extends EditionPart {}
