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
 * A location in story text marked to receive a data merge field's text value
 * during a merge.
 */
export interface DataMergeTextPlaceholder extends InDesignEdition.DataMergeTextPlaceholder, InDesignPlugins.DataMergeTextPlaceholder<'single'> {
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
  get properties(): PropertiesGetter<DataMergeTextPlaceholder, 'single'>;
  /**
   * Sets multiple properties at once from an object literal, in a single call
   * to the native InDesign engine — much faster than assigning each property
   * individually.
   */
  set properties(value: PropertiesSetter<DataMergeTextPlaceholder, 'single'>);
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
  /** Resolves the proxy into the individual {@link DataMergeTextPlaceholder} objects it stands for. */
  getElements(): DataMergeTextPlaceholder[];
  /** The data merge field inserted at this placeholder. */
  readonly field: DataMergeField;
  /** The insertion point immediately before the placeholder in its story. */
  readonly storyOffset: InsertionPoint;
  /** The story that contains the placeholder. */
  readonly parentStory: Story;
  /** The number of characters the placeholder occupies in {@link parentStory}, starting at
   * {@link storyOffset}. */
  readonly length: number;
}

/**
 * A location in story text marked to receive a data merge field's text value
 * during a merge.
 */
export interface DataMergeTextPlaceholderPlural extends InDesignEdition.DataMergeTextPlaceholderPlural, InDesignPlugins.DataMergeTextPlaceholder<'plural'> {
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
  get properties(): (PropertiesGetter<DataMergeTextPlaceholderPlural, 'plural'>)[];
  /**
   * Sets multiple properties at once from an object literal, in a single call
   * to the native InDesign engine — much faster than assigning each property
   * individually.
   */
  set properties(value: PropertiesSetter<DataMergeTextPlaceholderPlural, 'plural'>);
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
  /** Resolves the proxy into the individual {@link DataMergeTextPlaceholder} objects it stands for. */
  getElements(): DataMergeTextPlaceholder[];
  /** The data merge field inserted at this placeholder. */
  readonly field: (DataMergeField)[];
  /** The insertion point immediately before the placeholder in its story. */
  readonly storyOffset: (InsertionPoint)[];
  /** The story that contains the placeholder. */
  readonly parentStory: (Story)[];
  /** The number of characters the placeholder occupies in {@link parentStory}, starting at
   * {@link storyOffset}. */
  readonly length: (number)[];
}
/** DataMergeTextPlaceholder's members only InDesign desktop has, or has differently (tools/codemod/editions.mjs). */
export interface DataMergeTextPlaceholderDesktop {
}

/** DataMergeTextPlaceholder's members only InDesign desktop has, or has differently (tools/codemod/editions.mjs). */
export interface DataMergeTextPlaceholderDesktopPlural {
}

/** DataMergeTextPlaceholder's members only InDesign Server has, or has differently (tools/codemod/editions.mjs). */
export interface DataMergeTextPlaceholderServer {
  /**
   * The name of the tag.
   * Generated from the InDesign Server 21.6 scripting dictionary.
   * InDesign Server only.
   */
  readonly name: string;
}

/** DataMergeTextPlaceholder's members only InDesign Server has, or has differently (tools/codemod/editions.mjs). */
export interface DataMergeTextPlaceholderServerPlural {
  /**
   * The name of the tag.
   * Generated from the InDesign Server 21.6 scripting dictionary.
   * InDesign Server only.
   */
  readonly name: (string)[];
}

/** DataMergeTextPlaceholder's members as both InDesign desktop and InDesign Server have them (tools/codemod/editions.mjs). */
export interface DataMergeTextPlaceholderPortable {
}

/** DataMergeTextPlaceholder's members as both InDesign desktop and InDesign Server have them (tools/codemod/editions.mjs). */
export interface DataMergeTextPlaceholderPortablePlural {
}
