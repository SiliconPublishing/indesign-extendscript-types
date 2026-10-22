/**
 * NestedStyle.d.ts — indesign-uxp-types
 * Adobe InDesign 2026 (21.x) ExtendScript DOM declarations,
 * converted from indesign-uxp-types by tools/codemod.
 * Version: 1.0.0 · Updated: 2026-09-29
 * Author: Vlad Vladila (Krommatine Systems) · https://github.com/vamitul/indesign-uxp-types
 */
import type { Mode, Read } from './_base/Types';
import type { EventTargetDOMObject, IndexedDOMObject } from './_base/DomObjects';
import type { ParagraphAttributeOwner } from './_base/Parents';
import type { CharacterStyle } from './CharacterStyle';
import type { NestedStyleDelimiters } from './Enums/NestedStyleDelimiters';
import type { NestedStyles } from './NestedStyles';
import type { ParagraphStyle } from './ParagraphStyle';
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
 * A single rule within a {@link ParagraphStyle}'s {@link NestedStyles} collection.
 *
 * Automatically applies a {@link CharacterStyle} to the span of text from the
 * start of the paragraph up to (or through) a delimiter, repeated a given
 * number of times.
 */
export interface NestedStyle extends InDesignPlugins.NestedStyle<'single'> {
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
  readonly parent: ParagraphAttributeOwner;
  /**
   * A snapshot of every editable property on this object.
   *
   * Reads its full state in one call rather than property-by-property.
   */
  get properties(): PropertiesGetter<NestedStyle, 'single'>;
  /**
   * Sets multiple properties at once from an object literal, in a single call
   * to the native InDesign engine — much faster than assigning each property
   * individually.
   */
  set properties(value: PropertiesSetter<NestedStyle, 'single'>);
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
  /** Resolves the proxy into the individual {@link NestedStyle} objects it stands for. */
  getElements(): NestedStyle[];
  /** The character style applied to the nested text. Accepts a {@link CharacterStyle} or its name. */
  get appliedCharacterStyle(): CharacterStyle;
  set appliedCharacterStyle(value: CharacterStyle | string);
  /**
   * The delimiter marking how deep into the paragraph the nested style
   * reaches, as literal text or a {@link NestedStyleDelimiters} enumerator
   * (e.g. any word, any character, a tab).
   */
  get delimiter(): string | NestedStyleDelimiters;
  set delimiter(value: string | NestedStyleDelimiters);
  /** The number of occurrences of {@link delimiter} the nested style reaches to. */
  get repetition(): number;
  set repetition(value: number);
  /**
   * If `true`, the nested style is applied through the last matched
   * delimiter; if `false`, it stops just before it.
   */
  get inclusive(): boolean;
  set inclusive(value: boolean);
  /** Deletes the nested style rule. */
  remove(): void;
}

/**
 * A single rule within a {@link ParagraphStyle}'s {@link NestedStyles} collection.
 *
 * Automatically applies a {@link CharacterStyle} to the span of text from the
 * start of the paragraph up to (or through) a delimiter, repeated a given
 * number of times.
 */
export interface NestedStylePlural extends InDesignPlugins.NestedStyle<'plural'> {
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
  readonly parent: (ParagraphAttributeOwner)[];
  /**
   * A snapshot of every editable property on this object.
   *
   * Reads its full state in one call rather than property-by-property.
   */
  get properties(): (PropertiesGetter<NestedStylePlural, 'plural'>)[];
  /**
   * Sets multiple properties at once from an object literal, in a single call
   * to the native InDesign engine — much faster than assigning each property
   * individually.
   */
  set properties(value: PropertiesSetter<NestedStylePlural, 'plural'>);
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
  /** Resolves the proxy into the individual {@link NestedStyle} objects it stands for. */
  getElements(): NestedStyle[];
  /** The character style applied to the nested text. Accepts a {@link CharacterStyle} or its name. */
  get appliedCharacterStyle(): (CharacterStyle)[];
  set appliedCharacterStyle(value: CharacterStyle | string);
  /**
   * The delimiter marking how deep into the paragraph the nested style
   * reaches, as literal text or a {@link NestedStyleDelimiters} enumerator
   * (e.g. any word, any character, a tab).
   */
  get delimiter(): (string | NestedStyleDelimiters)[];
  set delimiter(value: string | NestedStyleDelimiters);
  /** The number of occurrences of {@link delimiter} the nested style reaches to. */
  get repetition(): (number)[];
  set repetition(value: number);
  /**
   * If `true`, the nested style is applied through the last matched
   * delimiter; if `false`, it stops just before it.
   */
  get inclusive(): (boolean)[];
  set inclusive(value: boolean);
  /** Deletes the nested style rule. */
  remove(): (void)[];
}
