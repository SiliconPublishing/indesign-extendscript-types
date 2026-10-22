/**
 * EventListener.d.ts — indesign-uxp-types
 * Adobe InDesign 2026 (21.x) ExtendScript DOM declarations,
 * converted from indesign-uxp-types by tools/codemod.
 * Version: 1.0.0 · Updated: 2026-09-29
 * Author: Vlad Vladila (Krommatine Systems) · https://github.com/vamitul/indesign-uxp-types
 */
import type { Mode, Read } from './_base/Types';
import type { IndexedDOMObject, LabelableDOMObject, NamableDOMObject } from './_base/DomObjects';
import type { EventString } from './_base/DomObjects';
import type { File } from './_base/Types';
import type { Application } from './Application';
import type { Document } from './Document';
import type { PropertiesGetter } from './_base/Properties';
import type { PropertiesSetter } from './_base/Properties';

/**
 * A registered event listener, returned by `addEventListener` on the object it was registered
 * with — an {@link Application}, a {@link Document}, or any other object that raises events.
 *
 * Call {@link remove} on it to stop listening; that is more reliable than matching the event
 * name, handler and capture flag through `removeEventListener`.
 */
export interface EventListener extends InDesignPlugins.EventListener<'single'> {
  /**
   * The index of the object within its containing parent.
   */
  readonly index: number;
  /**
   * A property that can be set to any string.
   * Note: In InDesign's UI this is user viewable and modifiable via the Script Label panel.
   */
  get label(): string;
  set label(value: string);
  /**
   * Sets the label to the value associated with the specified key.
   */
  insertLabel(key: string, value: string): void;
  /**
   * Gets the label value associated with the specified key.
   */
  extractLabel(key: string): string;
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
  readonly parent: unknown;
  /**
   * A snapshot of every editable property on this object.
   *
   * Reads its full state in one call rather than property-by-property.
   */
  get properties(): PropertiesGetter<EventListener, 'single'>;
  /**
   * Sets multiple properties at once from an object literal, in a single call
   * to the native InDesign engine — much faster than assigning each property
   * individually.
   */
  set properties(value: PropertiesSetter<EventListener, 'single'>);
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
  /** Resolves the proxy into the individual {@link EventListener} objects it stands for. */
  getElements(): EventListener[];
  /** The unique ID of the EventListener. */
  readonly id: number;
  /** The event type this listener is registered for. */
  readonly eventType: EventString;
  /** The handler invoked when the event fires — a JavaScript function, or the script file it runs, which reads back as a {@link File}. */
  readonly handler: Function | File;
  /** Deletes the EventListener, unregistering it from its target. */
  remove(): void;
}

/**
 * A registered event listener, returned by `addEventListener` on the object it was registered
 * with — an {@link Application}, a {@link Document}, or any other object that raises events.
 *
 * Call {@link remove} on it to stop listening; that is more reliable than matching the event
 * name, handler and capture flag through `removeEventListener`.
 */
export interface EventListenerPlural extends InDesignPlugins.EventListener<'plural'> {
  /**
   * The index of the object within its containing parent.
   */
  readonly index: (number)[];
  /**
   * A property that can be set to any string.
   * Note: In InDesign's UI this is user viewable and modifiable via the Script Label panel.
   */
  get label(): (string)[];
  set label(value: string);
  /**
   * Sets the label to the value associated with the specified key.
   */
  insertLabel(key: string, value: string): (void)[];
  /**
   * Gets the label value associated with the specified key.
   */
  extractLabel(key: string): (string)[];
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
  readonly parent: (unknown)[];
  /**
   * A snapshot of every editable property on this object.
   *
   * Reads its full state in one call rather than property-by-property.
   */
  get properties(): (PropertiesGetter<EventListenerPlural, 'plural'>)[];
  /**
   * Sets multiple properties at once from an object literal, in a single call
   * to the native InDesign engine — much faster than assigning each property
   * individually.
   */
  set properties(value: PropertiesSetter<EventListenerPlural, 'plural'>);
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
  /** Resolves the proxy into the individual {@link EventListener} objects it stands for. */
  getElements(): EventListener[];
  /** The unique ID of the EventListener. */
  readonly id: (number)[];
  /** The event type this listener is registered for. */
  readonly eventType: (EventString)[];
  /** The handler invoked when the event fires — a JavaScript function, or the script file it runs, which reads back as a {@link File}. */
  readonly handler: (Function | File)[];
  /** Deletes the EventListener, unregistering it from its target. */
  remove(): (void)[];
}
