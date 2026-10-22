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
import type { EditionPart } from "./_base/Editions";
import type { Events } from './Events';
import type { EventListeners } from './EventListeners';
import type { InDesignEventMap } from './_base/Events';
import type { EventHandler } from './_base/Events';
import type { EventListener } from './EventListener';
import type { EventString } from './_base/Events';
import type { Event } from './Event';
import type { FilePath } from './_base/Types';
import type { PropertiesGetter } from './_base/Properties';
import type { PropertiesSetter } from './_base/Properties';

/**
 * The document type declaration governing XML validation and the tag
 * structure of a document's XML view.
 */
export interface DTD extends InDesignEdition.DTD, InDesignPlugins.DTD<'single'> {
  /**
   * A collection of events
   */
  readonly events: Events;
  /**
   * A collection of event listeners
   */
  readonly eventListeners: EventListeners;
  /**
   * Adds an event listener.
   * @param eventType The event to listen for, such as `beforeSave` or `afterOpen`.
   * @param handler Invoked when the event fires. Either a JavaScript function or a {@link FilePath} referencing an external script.
   * @param captures Obsolete and ignored. Defaults to `false`.
   */
  addEventListener<K extends keyof InDesignEventMap>(
    eventType: K,
    handler: EventHandler<K>,
    captures?: boolean,
  ): EventListener;
  addEventListener(
    eventType: EventString,
    handler: ((event: Event) => void) | FilePath,
    captures?: boolean,
  ): EventListener;
  /**
   * Removes a previously registered event listener. The `eventType`, `handler`,
   * and `captures` must match those passed to {@link addEventListener}.
   * @param captures Obsolete and ignored. Defaults to `false`.
   * @returns `true` if a matching listener was found and removed.
   */
  removeEventListener<K extends keyof InDesignEventMap>(
    eventType: K,
    handler: EventHandler<K>,
    captures?: boolean,
  ): boolean;
  removeEventListener(
    eventType: EventString,
    handler: ((event: Event) => void) | FilePath,
    captures?: boolean,
  ): boolean;
  /**
       * Indicates whether the underlying InDesign DOM object still exists and is valid.
       * Returns `false` if the object has been deleted, closed, or invalidated.
       */
      readonly isValid: boolean;
      /**
       * Reflection on this object: its class name and its properties and methods, as the scripting
       * dictionary describes them.
       */
      readonly reflect: Reflection;
  /**
   * The immediate parent object of this element in the InDesign DOM hierarchy.
   */
  readonly parent: Document;
  /**
   * A snapshot of every editable property on this object.
   *
   * Reads its full state in one call rather than property-by-property.
   */
  get properties(): PropertiesGetter<DTD, 'single'>;
  /**
   * Sets multiple properties at once from an object literal, in a single call
   * to the native InDesign engine — much faster than assigning each property
   * individually.
   */
  set properties(value: PropertiesSetter<DTD, 'single'>);
  /**
   * Generates a string which, if executed, will return the InDesign object referenced.
   */
  toSource(): string;
  /**
   * Generates the specifier string stringently mapping the path
   * to this object within the InDesign DOM hierarchy (e.g., `/document[@id=1]/rectangle[@id=242]`).
   */
  toSpecifier(): string;
  /**
       * `"[object ClassName]"`, such as `"[object Page]"`. Use {@link toSpecifier} for the object's path.
       */
      toString(): string;
  /**
   * The index of the object within its containing parent.
   */
  readonly index: number;
  /** Resolves the proxy into the individual {@link DTD} objects it stands for. */
  getElements(): DTD[];
  /** The unique ID of the DTD. */
  readonly id: number;
  /** The system ID of the DOCTYPE declaration. Valid only when the DTD is an external subset. */
  readonly systemId: string;
  /** The public ID of the DOCTYPE declaration. Valid only when the DTD is an external subset. */
  readonly publicId: string;
  /** The raw text of the DTD. */
  readonly contents: string | SpecialCharacters;
  /** The tag of the document's root XML element. */
  get rootTag(): XMLTag;
  set rootTag(value: XMLTag);
  /** Deletes the DTD. */
  remove(): void;
  // ---- Generated from the InDesign 21.6 dictionary (not in upstream) ----

  /**
   * Duplicates the XMLItem.
   * Generated from the InDesign 21.6 scripting dictionary.
   */
  duplicate(): XMLItem;
}

/**
 * The document type declaration governing XML validation and the tag
 * structure of a document's XML view.
 */
export interface DTDPlural extends InDesignEdition.DTDPlural, InDesignPlugins.DTD<'plural'> {
  /**
   * A collection of events
   */
  readonly events: Events;
  /**
   * A collection of event listeners
   */
  readonly eventListeners: EventListeners;
  /**
   * Adds an event listener.
   * @param eventType The event to listen for, such as `beforeSave` or `afterOpen`.
   * @param handler Invoked when the event fires. Either a JavaScript function or a {@link FilePath} referencing an external script.
   * @param captures Obsolete and ignored. Defaults to `false`.
   */
  addEventListener<K extends keyof InDesignEventMap>(
    eventType: K,
    handler: EventHandler<K>,
    captures?: boolean,
  ): EventListener;
  addEventListener(
    eventType: EventString,
    handler: ((event: Event) => void) | FilePath,
    captures?: boolean,
  ): EventListener;
  /**
   * Removes a previously registered event listener. The `eventType`, `handler`,
   * and `captures` must match those passed to {@link addEventListener}.
   * @param captures Obsolete and ignored. Defaults to `false`.
   * @returns `true` if a matching listener was found and removed.
   */
  removeEventListener<K extends keyof InDesignEventMap>(
    eventType: K,
    handler: EventHandler<K>,
    captures?: boolean,
  ): boolean;
  removeEventListener(
    eventType: EventString,
    handler: ((event: Event) => void) | FilePath,
    captures?: boolean,
  ): boolean;
  /**
       * Indicates whether the underlying InDesign DOM object still exists and is valid.
       * Returns `false` if the object has been deleted, closed, or invalidated.
       */
      readonly isValid: boolean;
      /**
       * Reflection on this object: its class name and its properties and methods, as the scripting
       * dictionary describes them.
       */
      readonly reflect: Reflection;
  /**
   * The immediate parent object of this element in the InDesign DOM hierarchy.
   */
  readonly parent: (Document)[];
  /**
   * A snapshot of every editable property on this object.
   *
   * Reads its full state in one call rather than property-by-property.
   */
  get properties(): (PropertiesGetter<DTDPlural, 'plural'>)[];
  /**
   * Sets multiple properties at once from an object literal, in a single call
   * to the native InDesign engine — much faster than assigning each property
   * individually.
   */
  set properties(value: PropertiesSetter<DTDPlural, 'plural'>);
  /**
   * Generates a string which, if executed, will return the InDesign object referenced.
   */
  toSource(): string;
  /**
   * Generates the specifier string stringently mapping the path
   * to this object within the InDesign DOM hierarchy (e.g., `/document[@id=1]/rectangle[@id=242]`).
   */
  toSpecifier(): string;
  /**
       * `"[object ClassName]"`, such as `"[object Page]"`. Use {@link toSpecifier} for the object's path.
       */
      toString(): string;
  /**
   * The index of the object within its containing parent.
   */
  readonly index: (number)[];
  /** Resolves the proxy into the individual {@link DTD} objects it stands for. */
  getElements(): DTD[];
  /** The unique ID of the DTD. */
  readonly id: (number)[];
  /** The system ID of the DOCTYPE declaration. Valid only when the DTD is an external subset. */
  readonly systemId: (string)[];
  /** The public ID of the DOCTYPE declaration. Valid only when the DTD is an external subset. */
  readonly publicId: (string)[];
  /** The raw text of the DTD. */
  readonly contents: (string | SpecialCharacters)[];
  /** The tag of the document's root XML element. */
  get rootTag(): (XMLTag)[];
  set rootTag(value: XMLTag);
  /** Deletes the DTD. */
  remove(): (void)[];
  // ---- Generated from the InDesign 21.6 dictionary (not in upstream) ----

  /**
   * Duplicates the XMLItem.
   * Generated from the InDesign 21.6 scripting dictionary.
   */
  duplicate(): (XMLItem)[];
}
/** DTD's members only InDesign desktop has, or has differently (tools/codemod/editions.mjs). */
export interface DTDDesktop {
  /**
   * Selects the object.
   * Desktop only: InDesign Server 21.6 does not have it.
   * @param existingSelection How this selection combines with the current one. Defaults to `SelectionOptions.REPLACE_WITH`.
   */
  select(existingSelection?: SelectionOptions): void;
}

/** DTD's members only InDesign desktop has, or has differently (tools/codemod/editions.mjs). */
export interface DTDDesktopPlural {
  /**
   * Selects the object.
   * Desktop only: InDesign Server 21.6 does not have it.
   * @param existingSelection How this selection combines with the current one. Defaults to `SelectionOptions.REPLACE_WITH`.
   */
  select(existingSelection?: SelectionOptions): (void)[];
}

/** DTD's members only InDesign Server has, or has differently (tools/codemod/editions.mjs). */
export interface DTDServer {
}

/** DTD's members only InDesign Server has, or has differently (tools/codemod/editions.mjs). */
export interface DTDServerPlural {
}

/** DTD's members as both InDesign desktop and InDesign Server have them (tools/codemod/editions.mjs). */
export interface DTDPortable {
}

/** DTD's members as both InDesign desktop and InDesign Server have them (tools/codemod/editions.mjs). */
export interface DTDPortablePlural {
}
