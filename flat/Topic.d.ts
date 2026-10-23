/**
 * Topic.d.ts — indesign-uxp-types
 * Adobe InDesign 2026 (21.x) ExtendScript DOM declarations,
 * converted from indesign-uxp-types by tools/codemod.
 * Version: 1.0.0 · Updated: 2026-09-29
 * Author: Vlad Vladila (Krommatine Systems) · https://github.com/vamitul/indesign-uxp-types
 */
import type { Mode, Read } from './_base/Types';
import type { EventTargetDOMObject, IndexedDOMObject, NamableDOMObject } from './_base/DomObjects';
import type { IndexSection } from './IndexSection';
import type { Index } from './Index';
import type { Topics } from './Topics';
import type { CrossReferences } from './CrossReferences';
import type { PageReferences } from './PageReferences';
import type { IndexCapitalizationOptions } from './Enums/IndexCapitalizationOptions';
import type { CrossReference } from './CrossReference';
import type { PageReference } from './PageReference';
import type { CrossReferenceSource } from './CrossReferenceSource';
import type { Hyperlink } from './Hyperlink';
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
 * A topic (entry) in an {@link Index}. Topics nest arbitrarily deep via their
 * own {@link topics} collection, and carry the {@link CrossReference}s and
 * {@link PageReference}s that make up the generated index entry.
 */
export interface Topic extends InDesignEdition.Topic, InDesignPlugins.Topic<'single'> {
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
   * The index of the object within its containing parent.
   */
  readonly index: number;
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
  readonly parent: IndexSection | Topic | Index;
  /**
   * A snapshot of every editable property on this object.
   *
   * Reads its full state in one call rather than property-by-property.
   */
  get properties(): PropertiesGetter<Topic, 'single'>;
  /**
   * Sets multiple properties at once from an object literal, in a single call
   * to the native InDesign engine — much faster than assigning each property
   * individually.
   */
  set properties(value: PropertiesSetter<Topic, 'single'>);
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
   * The name of the object, and what the containing collection's `itemByName` looks up.
   */
  get name(): string;
  set name(value: string);
  /** Resolves the proxy into the individual {@link Topic} objects it stands for. */
  getElements(): Topic[];
  /** The child topics nested under this topic. */
  readonly topics: Topics;
  /**
   * The index cross references for this topic. For cross references embedded
   * in text, use {@link CrossReferenceSource} and {@link Hyperlink} instead.
   */
  readonly crossReferences: CrossReferences;
  /** The index page references for this topic. */
  readonly pageReferences: PageReferences;
  /**
   * The string the topic is sorted by, instead of its name. The topic's own
   * name, not this sort string, still appears in the generated index.
   */
  get sortOrder(): string;
  set sortOrder(value: string);
  /** Deletes the topic. */
  remove(): void;
  /**
   * Makes the initial letter for the specified index topic or group of index
   * topics upper case.
   * @param capitalizationOption Which entries are affected. Defaults to
   * {@link IndexCapitalizationOptions.ALL_ENTRIES}.
   */
  capitalize(capitalizationOption?: IndexCapitalizationOptions): void;
}

/**
 * A topic (entry) in an {@link Index}. Topics nest arbitrarily deep via their
 * own {@link topics} collection, and carry the {@link CrossReference}s and
 * {@link PageReference}s that make up the generated index entry.
 */
export interface TopicPlural extends InDesignEdition.TopicPlural, InDesignPlugins.Topic<'plural'> {
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
   * The index of the object within its containing parent.
   */
  readonly index: (number)[];
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
  readonly parent: (IndexSection | Topic | Index)[];
  /**
   * A snapshot of every editable property on this object.
   *
   * Reads its full state in one call rather than property-by-property.
   */
  get properties(): (PropertiesGetter<TopicPlural, 'plural'>)[];
  /**
   * Sets multiple properties at once from an object literal, in a single call
   * to the native InDesign engine — much faster than assigning each property
   * individually.
   */
  set properties(value: PropertiesSetter<TopicPlural, 'plural'>);
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
   * The name of the object, and what the containing collection's `itemByName` looks up.
   */
  get name(): (string)[];
  set name(value: string);
  /** Resolves the proxy into the individual {@link Topic} objects it stands for. */
  getElements(): Topic[];
  /** The child topics nested under this topic. */
  readonly topics: Topics;
  /**
   * The index cross references for this topic. For cross references embedded
   * in text, use {@link CrossReferenceSource} and {@link Hyperlink} instead.
   */
  readonly crossReferences: CrossReferences;
  /** The index page references for this topic. */
  readonly pageReferences: PageReferences;
  /**
   * The string the topic is sorted by, instead of its name. The topic's own
   * name, not this sort string, still appears in the generated index.
   */
  get sortOrder(): (string)[];
  set sortOrder(value: string);
  /** Deletes the topic. */
  remove(): (void)[];
  /**
   * Makes the initial letter for the specified index topic or group of index
   * topics upper case.
   * @param capitalizationOption Which entries are affected. Defaults to
   * {@link IndexCapitalizationOptions.ALL_ENTRIES}.
   */
  capitalize(capitalizationOption?: IndexCapitalizationOptions): (void)[];
}
