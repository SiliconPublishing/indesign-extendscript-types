/**
 * TOCStyleEntry.d.ts — indesign-uxp-types
 * Adobe InDesign 2026 (21.x) ExtendScript DOM declarations,
 * converted from indesign-uxp-types by tools/codemod.
 * Version: 1.0.0 · Updated: 2026-09-29
 * Author: Vlad Vladila (Krommatine Systems) · https://github.com/vamitul/indesign-uxp-types
 */
import type { Mode, Read } from './_base/Types';
import type { EventTargetDOMObject, IndexedDOMObject, NamableDOMObject } from './_base/DomObjects';
import type { TOCStyle } from './TOCStyle';
import type { ParagraphStyle } from './ParagraphStyle';
import type { CharacterStyle } from './CharacterStyle';
import type { PageNumberPosition } from './Enums/PageNumberPosition';
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
 * A single entry definition within a {@link TOCStyle}, mapping one source
 * paragraph style to its formatting, indent level, and page-number display
 * in the generated table of contents.
 */
export interface TOCStyleEntry extends InDesignEdition.TOCStyleEntry, InDesignPlugins.TOCStyleEntry<'single'> {
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
  readonly parent: TOCStyle;
  /**
   * A snapshot of every editable property on this object.
   *
   * Reads its full state in one call rather than property-by-property.
   */
  get properties(): PropertiesGetter<TOCStyleEntry, 'single'>;
  /**
   * Sets multiple properties at once from an object literal, in a single call
   * to the native InDesign engine — much faster than assigning each property
   * individually.
   */
  set properties(value: PropertiesSetter<TOCStyleEntry, 'single'>);
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
  /** Resolves the proxy into the individual {@link TOCStyleEntry} objects it stands for. */
  getElements(): TOCStyleEntry[];
  /** The paragraph style applied to the TOC entry. */
  get formatStyle(): ParagraphStyle | string;
  set formatStyle(value: ParagraphStyle | string);
  /** The indent level of the entry in the TOC. */
  get level(): number;
  set level(value: number);
  /** The character style applied to the entry's page number. */
  get pageNumberStyle(): CharacterStyle | string;
  set pageNumberStyle(value: CharacterStyle | string);
  /** Where the page number is placed relative to the entry text. */
  get pageNumberPosition(): PageNumberPosition;
  set pageNumberPosition(value: PageNumberPosition);
  /** The string inserted between the entry text and its page number. */
  get separator(): string;
  set separator(value: string);
  /** The character style applied to {@link separator}. */
  get separatorStyle(): CharacterStyle | string;
  set separatorStyle(value: CharacterStyle | string);
  /** If `true`, sorts the entries alphabetically. */
  get sortAlphabet(): boolean;
  set sortAlphabet(value: boolean);
  /** Deletes the TOC style entry. */
  remove(): void;
}

/**
 * A single entry definition within a {@link TOCStyle}, mapping one source
 * paragraph style to its formatting, indent level, and page-number display
 * in the generated table of contents.
 */
export interface TOCStyleEntryPlural extends InDesignEdition.TOCStyleEntryPlural, InDesignPlugins.TOCStyleEntry<'plural'> {
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
  readonly parent: (TOCStyle)[];
  /**
   * A snapshot of every editable property on this object.
   *
   * Reads its full state in one call rather than property-by-property.
   */
  get properties(): (PropertiesGetter<TOCStyleEntryPlural, 'plural'>)[];
  /**
   * Sets multiple properties at once from an object literal, in a single call
   * to the native InDesign engine — much faster than assigning each property
   * individually.
   */
  set properties(value: PropertiesSetter<TOCStyleEntryPlural, 'plural'>);
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
  /** Resolves the proxy into the individual {@link TOCStyleEntry} objects it stands for. */
  getElements(): TOCStyleEntry[];
  /** The paragraph style applied to the TOC entry. */
  get formatStyle(): (ParagraphStyle | string)[];
  set formatStyle(value: ParagraphStyle | string);
  /** The indent level of the entry in the TOC. */
  get level(): (number)[];
  set level(value: number);
  /** The character style applied to the entry's page number. */
  get pageNumberStyle(): (CharacterStyle | string)[];
  set pageNumberStyle(value: CharacterStyle | string);
  /** Where the page number is placed relative to the entry text. */
  get pageNumberPosition(): (PageNumberPosition)[];
  set pageNumberPosition(value: PageNumberPosition);
  /** The string inserted between the entry text and its page number. */
  get separator(): (string)[];
  set separator(value: string);
  /** The character style applied to {@link separator}. */
  get separatorStyle(): (CharacterStyle | string)[];
  set separatorStyle(value: CharacterStyle | string);
  /** If `true`, sorts the entries alphabetically. */
  get sortAlphabet(): (boolean)[];
  set sortAlphabet(value: boolean);
  /** Deletes the TOC style entry. */
  remove(): (void)[];
}
