/**
 * DTD.d.ts — indesign-uxp-types
 * Adobe InDesign 2026 (21.x) ExtendScript DOM declarations,
 * converted from indesign-uxp-types by tools/codemod.
 * Version: 1.0.0 · Updated: 2026-09-29
 * Author: Vlad Vladila (Krommatine Systems) · https://github.com/vamitul/indesign-uxp-types
 */
import type { Mode, Read } from './_base/Types';
import type { EventTargetDOMObject, IndexedDOMObject } from './_base/DomObjects';
import type { Document } from './Document';
import type { XMLTag } from './XMLTag';
import type { SpecialCharacters } from './Enums/SpecialCharacters';
import type { SelectionOptions } from './Enums/SelectionOptions';
import type { XMLItem } from "./XMLItem";

/**
 * The document type declaration governing XML validation and the tag
 * structure of a document's XML view.
 */
export interface DTD<M extends Mode = 'single'> extends EventTargetDOMObject<Document, M>, IndexedDOMObject<Document, M>, InDesignPlugins.DTD<M> {
  /** Resolves the proxy into the individual {@link DTD} objects it stands for. */
  getElements(): DTD<'single'>[];

  /** The unique ID of the DTD. */
  readonly id: Read<M, number>;

  /** The system ID of the DOCTYPE declaration. Valid only when the DTD is an external subset. */
  readonly systemId: Read<M, string>;

  /** The public ID of the DOCTYPE declaration. Valid only when the DTD is an external subset. */
  readonly publicId: Read<M, string>;

  /** The raw text of the DTD. */
  readonly contents: Read<M, string | SpecialCharacters>;

  /** The tag of the document's root XML element. */
  get rootTag(): Read<M, XMLTag>;
  set rootTag(value: XMLTag);

  /** Deletes the DTD. */
  remove(): Read<M, void>;

  /**
   * Selects the object.
   * @param existingSelection How this selection combines with the current one. Defaults to `SelectionOptions.REPLACE_WITH`.
   */
  select(existingSelection?: SelectionOptions): Read<M, void>;

  // ---- Generated from the InDesign 21.6 dictionary (not in upstream) ----

  /**
   * Duplicates the XMLItem.
   * Generated from the InDesign 21.6 scripting dictionary.
   */
  duplicate(): Read<M, XMLItem>;
}
