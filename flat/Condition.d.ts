/**
 * Condition.d.ts — indesign-uxp-types
 * Adobe InDesign 2026 (21.x) ExtendScript DOM declarations,
 * converted from indesign-uxp-types by tools/codemod.
 * Version: 1.0.0 · Updated: 2026-09-29
 * Author: Vlad Vladila (Krommatine Systems) · https://github.com/vamitul/indesign-uxp-types
 */
import type { Mode, Read } from './_base/Types';
import type { LabelableEventDOMObject, IndexedDOMObject, NamableDOMObject } from './_base/DomObjects';
import type { Application } from './Application';
import type { Document } from './Document';
import type { ConditionIndicatorMethod } from './Enums/ConditionIndicatorMethod';
import type { ConditionUnderlineIndicatorAppearance } from './Enums/ConditionUnderlineIndicatorAppearance';
import type { UIColors } from './Enums/UIColors';
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
 * A condition for conditional text — a named tag that can be applied to text
 * ranges so they can be shown or hidden together, as either visible published
 * content or an editing-time annotation (indicated by {@link indicatorColor}).
 */
export interface Condition extends InDesignEdition.Condition, InDesignPlugins.Condition<'single'> {
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
  readonly parent: Application | Document;
  /**
   * A snapshot of every editable property on this object.
   *
   * Reads its full state in one call rather than property-by-property.
   */
  get properties(): PropertiesGetter<Condition, 'single'>;
  /**
   * Sets multiple properties at once from an object literal, in a single call
   * to the native InDesign engine — much faster than assigning each property
   * individually.
   */
  set properties(value: PropertiesSetter<Condition, 'single'>);
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
  /** Resolves the proxy into the individual {@link Condition} objects it stands for. */
  getElements(): Condition[];
  /** The unique ID of the condition, stable across saves and reopens. */
  readonly id: number;
  /**
   * The color used to mark text tagged with this condition. Either an
   * `[R, G, B]` triple (each `0`–`255`) or a named {@link UIColors} value.
   */
  get indicatorColor(): [number, number, number] | UIColors;
  set indicatorColor(value: [number, number, number] | UIColors);
  /** How the condition indicator is drawn on tagged text — underline, highlight, and so on. */
  get indicatorMethod(): ConditionIndicatorMethod;
  set indicatorMethod(value: ConditionIndicatorMethod);
  /** The appearance of the underline indicator, when {@link indicatorMethod} uses one. */
  get underlineIndicatorAppearance(): ConditionUnderlineIndicatorAppearance;
  set underlineIndicatorAppearance(value: ConditionUnderlineIndicatorAppearance);
  /** Whether text tagged with this condition is currently shown in the document. */
  get visible(): boolean;
  set visible(value: boolean);
  /**
   * Deletes the condition, removing its tag from every text range it was applied to.
   * @param replacingWith A condition (or its name) to apply to the affected text instead. If omitted, no replacement condition is applied.
   */
  remove(replacingWith?: Condition | string): void;
}

/**
 * A condition for conditional text — a named tag that can be applied to text
 * ranges so they can be shown or hidden together, as either visible published
 * content or an editing-time annotation (indicated by {@link indicatorColor}).
 */
export interface ConditionPlural extends InDesignEdition.ConditionPlural, InDesignPlugins.Condition<'plural'> {
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
  readonly parent: (Application | Document)[];
  /**
   * A snapshot of every editable property on this object.
   *
   * Reads its full state in one call rather than property-by-property.
   */
  get properties(): (PropertiesGetter<ConditionPlural, 'plural'>)[];
  /**
   * Sets multiple properties at once from an object literal, in a single call
   * to the native InDesign engine — much faster than assigning each property
   * individually.
   */
  set properties(value: PropertiesSetter<ConditionPlural, 'plural'>);
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
  /** Resolves the proxy into the individual {@link Condition} objects it stands for. */
  getElements(): Condition[];
  /** The unique ID of the condition, stable across saves and reopens. */
  readonly id: (number)[];
  /**
   * The color used to mark text tagged with this condition. Either an
   * `[R, G, B]` triple (each `0`–`255`) or a named {@link UIColors} value.
   */
  get indicatorColor(): ([number, number, number] | UIColors)[];
  set indicatorColor(value: [number, number, number] | UIColors);
  /** How the condition indicator is drawn on tagged text — underline, highlight, and so on. */
  get indicatorMethod(): (ConditionIndicatorMethod)[];
  set indicatorMethod(value: ConditionIndicatorMethod);
  /** The appearance of the underline indicator, when {@link indicatorMethod} uses one. */
  get underlineIndicatorAppearance(): (ConditionUnderlineIndicatorAppearance)[];
  set underlineIndicatorAppearance(value: ConditionUnderlineIndicatorAppearance);
  /** Whether text tagged with this condition is currently shown in the document. */
  get visible(): (boolean)[];
  set visible(value: boolean);
  /**
   * Deletes the condition, removing its tag from every text range it was applied to.
   * @param replacingWith A condition (or its name) to apply to the affected text instead. If omitted, no replacement condition is applied.
   */
  remove(replacingWith?: Condition | string): (void)[];
}
