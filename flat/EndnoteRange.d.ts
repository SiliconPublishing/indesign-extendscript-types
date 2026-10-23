/**
 * EndnoteRange.d.ts — indesign-uxp-types
 * Adobe InDesign 2026 (21.x) ExtendScript DOM declarations,
 * converted from indesign-uxp-types by tools/codemod.
 * Version: 1.0.0 · Updated: 2026-09-29
 * Author: Vlad Vladila (Krommatine Systems) · https://github.com/vamitul/indesign-uxp-types
 */
import type { Mode, Read } from './_base/Types';
import type { LabelableEventDOMObject, IndexedDOMObject, NamableDOMObject } from './_base/DomObjects';
import type { Text } from './Text';
import type { InsertionPoint } from './InsertionPoint';
import type { TextStyleRange } from './TextStyleRange';
import type { Paragraph } from './Paragraph';
import type { TextColumn } from './TextColumn';
import type { Line } from './Line';
import type { Word } from './Word';
import type { Character } from './Character';
import type { Story } from './Story';
import type { XmlStory } from './XmlStory';
import type { Endnote } from './Endnote';
import type { SpecialCharacters } from './Enums/SpecialCharacters';
import type { NothingEnum } from './Enums/NothingEnum';
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
 * The text range holding one endnote's content, collected (together with
 * every other endnote's range in the same story) at the end of the story
 * rather than inline — see {@link Endnote} for the in-text marker it belongs to.
 */
export interface EndnoteRange extends InDesignEdition.EndnoteRange, InDesignPlugins.EndnoteRange<'single'> {
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
  readonly parent: Text | InsertionPoint | TextStyleRange | Paragraph | TextColumn | Line | Word | Character | Story | XmlStory;
  /**
   * A snapshot of every editable property on this object.
   *
   * Reads its full state in one call rather than property-by-property.
   */
  get properties(): PropertiesGetter<EndnoteRange, 'single'>;
  /**
   * Sets multiple properties at once from an object literal, in a single call
   * to the native InDesign engine — much faster than assigning each property
   * individually.
   */
  set properties(value: PropertiesSetter<EndnoteRange, 'single'>);
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
  /** Resolves the proxy into the individual {@link EndnoteRange} objects it stands for. */
  getElements(): EndnoteRange[];
  /** The unique ID of the endnote range, stable across saves and reopens. */
  readonly id: number;
  /** The zero-based start index of this range within the endnote text frame's story. */
  readonly endnoteRangeStartIndex: number;
  /** The zero-based end index of this range within the endnote text frame's story. */
  readonly endnoteRangeEndIndex: number;
  /** The {@link Endnote} marker this range's text belongs to. */
  get sourceEndnote(): Endnote;
  set sourceEndnote(value: Endnote);
  /**
   * The range's text content, excluding its endnote number marker. Assigning
   * `NothingEnum.NOTHING` (or an array item of it) clears that portion.
   */
  get endnoteRangeContent(): string | SpecialCharacters | Array<string | SpecialCharacters | NothingEnum>;
  set endnoteRangeContent(value: string | SpecialCharacters | Array<string | SpecialCharacters | NothingEnum>);
  /** Deletes the endnote range and its associated {@link Endnote} anchor. */
  deleteEndnoteRange(): void;
}

/**
 * The text range holding one endnote's content, collected (together with
 * every other endnote's range in the same story) at the end of the story
 * rather than inline — see {@link Endnote} for the in-text marker it belongs to.
 */
export interface EndnoteRangePlural extends InDesignEdition.EndnoteRangePlural, InDesignPlugins.EndnoteRange<'plural'> {
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
  readonly parent: (Text | InsertionPoint | TextStyleRange | Paragraph | TextColumn | Line | Word | Character | Story | XmlStory)[];
  /**
   * A snapshot of every editable property on this object.
   *
   * Reads its full state in one call rather than property-by-property.
   */
  get properties(): (PropertiesGetter<EndnoteRangePlural, 'plural'>)[];
  /**
   * Sets multiple properties at once from an object literal, in a single call
   * to the native InDesign engine — much faster than assigning each property
   * individually.
   */
  set properties(value: PropertiesSetter<EndnoteRangePlural, 'plural'>);
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
  /** Resolves the proxy into the individual {@link EndnoteRange} objects it stands for. */
  getElements(): EndnoteRange[];
  /** The unique ID of the endnote range, stable across saves and reopens. */
  readonly id: (number)[];
  /** The zero-based start index of this range within the endnote text frame's story. */
  readonly endnoteRangeStartIndex: (number)[];
  /** The zero-based end index of this range within the endnote text frame's story. */
  readonly endnoteRangeEndIndex: (number)[];
  /** The {@link Endnote} marker this range's text belongs to. */
  get sourceEndnote(): (Endnote)[];
  set sourceEndnote(value: Endnote);
  /**
   * The range's text content, excluding its endnote number marker. Assigning
   * `NothingEnum.NOTHING` (or an array item of it) clears that portion.
   */
  get endnoteRangeContent(): (string | SpecialCharacters | Array<string | SpecialCharacters | NothingEnum>)[];
  set endnoteRangeContent(value: string | SpecialCharacters | Array<string | SpecialCharacters | NothingEnum>);
  /** Deletes the endnote range and its associated {@link Endnote} anchor. */
  deleteEndnoteRange(): (void)[];
}
