/**
 * XMLAttribute.d.ts — indesign-uxp-types
 * Adobe InDesign 2026 (21.x) ExtendScript DOM declarations,
 * converted from indesign-uxp-types by tools/codemod.
 * Version: 1.0.0 · Updated: 2026-09-29
 * Author: Vlad Vladila (Krommatine Systems) · https://github.com/vamitul/indesign-uxp-types
 */
import type { Mode, Read } from './_base/Types';
import type { EventTargetDOMObject, IndexedDOMObject, NamableDOMObject } from './_base/DomObjects';
import type { XMLElement } from './XMLElement';
import type { XMLTag } from './XMLTag';
import type { XMLElementLocation } from './Enums/XMLElementLocation';
import type { SelectionOptions } from './Enums/SelectionOptions';
import type { EditionPart } from "./_base/Editions";

/**
 * An attribute (`name="value"`) on an {@link XMLElement} in a document's
 * underlying XML structure.
 */
export interface XMLAttribute<M extends Mode = 'single'>
  extends EventTargetDOMObject<XMLElement, M>,
    IndexedDOMObject<XMLElement, M>,
    NamableDOMObject<XMLElement, M>, InDesignEdition.XMLAttribute<M>, InDesignPlugins.XMLAttribute<M> {
  /** Resolves the proxy into the individual {@link XMLAttribute} objects it stands for. */
  getElements(): XMLAttribute<'single'>[];

  /** The value of the XML attribute. */
  get value(): Read<M, string>;
  set value(value: string);

  /** Deletes the XML attribute. */
  remove(): Read<M, void>;

  /**
   * Converts the attribute to a child element of its parent element.
   * @param located Where to insert the new element within its parent. Defaults to `XMLElementLocation.ELEMENT_START`.
   * @param markupTag The tag to apply to the new element.
   */
  convertToElement(located?: XMLElementLocation, markupTag?: XMLTag): Read<M, XMLElement>;
}
/** XMLAttribute's members only InDesign desktop has, or has differently (tools/codemod/editions.mjs). */
export interface XMLAttributeDesktop<M extends Mode = 'single'> extends EditionPart {
  /**
   * Selects the object.
   * Desktop only: InDesign Server 21.6 does not have it.
   * @param existingSelection How this selection combines with the current one. Defaults to `SelectionOptions.REPLACE_WITH`.
   */
  select(existingSelection?: SelectionOptions): Read<M, void>;
}

/** XMLAttribute's members only InDesign Server has, or has differently (tools/codemod/editions.mjs). */
export interface XMLAttributeServer<M extends Mode = 'single'> extends EditionPart {}

/** XMLAttribute's members as both InDesign desktop and InDesign Server have them (tools/codemod/editions.mjs). */
export interface XMLAttributePortable<M extends Mode = 'single'> extends EditionPart {}
