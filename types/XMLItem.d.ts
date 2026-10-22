/**
 * XMLItem.d.ts — indesign-uxp-types
 * Adobe InDesign 2026 (21.x) ExtendScript DOM declarations,
 * converted from indesign-uxp-types by tools/codemod.
 * Version: 1.0.0 · Updated: 2026-09-29
 * Author: Vlad Vladila (Krommatine Systems) · https://github.com/vamitul/indesign-uxp-types
 */
import type { Mode, Read } from './_base/Types';
import type { EventTargetDOMObject, IndexedDOMObject } from './_base/DomObjects';
import type { Document } from './Document';
import type { XMLElement } from './XMLElement';
import type { SelectionOptions } from './Enums/SelectionOptions';
import type { DTD } from './DTD';
import type { XMLComment } from './XMLComment';
import type { XMLInstruction } from './XMLInstruction';
import type { EditionPart } from "./_base/Editions";

/**
 * The base of the XML item family — {@link XMLElement}, {@link XMLComment},
 * {@link XMLInstruction}, and {@link DTD} all extend this. Represents any node
 * in a document's underlying XML structure.
 */
export interface XMLItem<M extends Mode = 'single'>
  extends EventTargetDOMObject<Document | XMLElement, M>,
    IndexedDOMObject<Document | XMLElement, M>, InDesignEdition.XMLItem<M>, InDesignPlugins.XMLItem<M> {
  /** Resolves the proxy into the individual {@link XMLItem} objects it stands for. */
  getElements(): XMLItem<'single'>[];

  /** The unique ID of the XMLItem. */
  readonly id: Read<M, number>;

  /** Deletes the XMLItem. */
  remove(): Read<M, void>;

  /** Duplicates the XMLItem. */
  duplicate(): Read<M, XMLItem>;
}
/** XMLItem's members only InDesign desktop has, or has differently (tools/codemod/editions.mjs). */
export interface XMLItemDesktop<M extends Mode = 'single'> extends EditionPart {
  /**
   * Selects the object.
   * Desktop only: InDesign Server 21.6 does not have it.
   * @param existingSelection How this selection combines with the current one. Defaults to {@link SelectionOptions.REPLACE_WITH}.
   */
  select(existingSelection?: SelectionOptions): Read<M, void>;
}

/** XMLItem's members only InDesign Server has, or has differently (tools/codemod/editions.mjs). */
export interface XMLItemServer<M extends Mode = 'single'> extends EditionPart {}

/** XMLItem's members as both InDesign desktop and InDesign Server have them (tools/codemod/editions.mjs). */
export interface XMLItemPortable<M extends Mode = 'single'> extends EditionPart {}

/**
 * A structure node InDesign reports as a plain {@link XMLItem} rather than as an element,
 * comment or processing instruction.
 *
 * Handle it in the `'XMLItem'` branch of an `instanceof` check. Only the members every
 * structure node has are available on it.
 */
export interface PlainXMLItem<M extends Mode = 'single'> extends XMLItem<M> {
}
/** PlainXMLItem's members only InDesign desktop has, or has differently (tools/codemod/editions.mjs). */
export interface PlainXMLItemDesktop<M extends Mode = 'single'> extends EditionPart, XMLItemDesktop<M> {}

/** PlainXMLItem's members only InDesign Server has, or has differently (tools/codemod/editions.mjs). */
export interface PlainXMLItemServer<M extends Mode = 'single'> extends EditionPart, XMLItemServer<M> {}

/** PlainXMLItem's members as both InDesign desktop and InDesign Server have them (tools/codemod/editions.mjs). */
export interface PlainXMLItemPortable<M extends Mode = 'single'> extends EditionPart, XMLItemPortable<M> {}
