/**
 * Preference.d.ts — indesign-uxp-types
 * Adobe InDesign 2026 (21.x) ExtendScript DOM declarations,
 * converted from indesign-uxp-types by tools/codemod.
 * Version: 1.0.0 · Updated: 2026-09-29
 * Author: Vlad Vladila (Krommatine Systems) · https://github.com/vamitul/indesign-uxp-types
 */
import type { Mode, Read } from './_base/Types';
import type { EventTargetDOMObject } from './_base/DomObjects';
import type { PageItemUnion } from './_base/Unions';
import type { Application } from './Application';
import type { Book } from './Book';
import type { ChangeGrepPreference } from './ChangeGrepPreference';
import type { ChangeObjectPreference } from './ChangeObjectPreference';
import type { ChangeTextPreference } from './ChangeTextPreference';
import type { ChangeTransliteratePreference } from './ChangeTransliteratePreference';
import type { Character } from './Character';
import type { ContentTransparencySetting } from './ContentTransparencySetting';
import type { DataMerge } from './DataMerge';
import type { Document } from './Document';
import type { FillTransparencySetting } from './FillTransparencySetting';
import type { FindChangeContentTransparencySetting } from './FindChangeContentTransparencySetting';
import type { FindChangeFillTransparencySetting } from './FindChangeFillTransparencySetting';
import type { FindChangeStrokeTransparencySetting } from './FindChangeStrokeTransparencySetting';
import type { FindChangeTransparencySetting } from './FindChangeTransparencySetting';
import type { FindGrepPreference } from './FindGrepPreference';
import type { FindObjectPreference } from './FindObjectPreference';
import type { FindTextPreference } from './FindTextPreference';
import type { FindTransliteratePreference } from './FindTransliteratePreference';
import type { FormField } from './FormField';
import type { InsertionPoint } from './InsertionPoint';
import type { Line } from './Line';
import type { Link } from './Link';
import type { MasterSpread } from './MasterSpread';
import type { NamedGrid } from './NamedGrid';
import type { ObjectStyle } from './ObjectStyle';
import type { Page } from './Page';
import type { PageItemDefault } from './PageItemDefault';
import type { Paragraph } from './Paragraph';
import type { ParagraphStyle } from './ParagraphStyle';
import type { Spread } from './Spread';
import type { Story } from './Story';
import type { StrokeTransparencySetting } from './StrokeTransparencySetting';
import type { Text } from './Text';
import type { TextColumn } from './TextColumn';
import type { TextDefault } from './TextDefault';
import type { TextStyleRange } from './TextStyleRange';
import type { TextVariable } from './TextVariable';
import type { TextWrapPreference } from './TextWrapPreference';
import type { TransparencySetting } from './TransparencySetting';
import type { Word } from './Word';
import type { XmlStory } from './XmlStory';
import type { Preferences } from './Preferences';
import type { PropertiesGetter } from './_base/Properties';
import type { PropertiesSetter } from './_base/Properties';
import type { Events } from './Events';
import type { EventListeners } from './EventListeners';
import type { InDesignEventMap } from './_base/Events';
import type { EventHandler } from './_base/Events';
import type { EventListener } from './EventListener';
import type { EventString } from './_base/Events';
import type { Event } from './Event';
import type { FilePath } from './_base/Types';

/**
 * A settings object reached through a {@link Preferences} collection before you know which
 * kind it is — transparency, text wrap, find/change, and so on.
 */
export interface Preference {
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
  readonly parent: PageItemUnion | Application | Document | Book | DataMerge | XmlStory | Spread | FindChangeTransparencySetting | FindChangeStrokeTransparencySetting | FindChangeFillTransparencySetting | FindChangeContentTransparencySetting | FormField | PageItemDefault | TransparencySetting | StrokeTransparencySetting | FillTransparencySetting | ContentTransparencySetting | FindObjectPreference | ChangeObjectPreference | Story | TextVariable | TextWrapPreference | Page | Link | ObjectStyle | MasterSpread | NamedGrid | TextDefault | ParagraphStyle | InsertionPoint | TextStyleRange | Paragraph | TextColumn | Line | Word | Character | Text | FindTextPreference | ChangeTextPreference | FindGrepPreference | ChangeGrepPreference | FindTransliteratePreference | ChangeTransliteratePreference;
  /**
   * A snapshot of every editable property on this object.
   *
   * Reads its full state in one call rather than property-by-property.
   */
  get properties(): PropertiesGetter<Preference, 'single'>;
  /**
   * Sets multiple properties at once from an object literal, in a single call
   * to the native InDesign engine — much faster than assigning each property
   * individually.
   */
  set properties(value: PropertiesSetter<Preference, 'single'>);
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
  /** Resolves the proxy into the individual {@link Preference} objects it stands for. */
  getElements(): Preference[];
}

/**
 * A settings object reached through a {@link Preferences} collection before you know which
 * kind it is — transparency, text wrap, find/change, and so on.
 */
export interface PreferencePlural {
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
  readonly parent: (PageItemUnion | Application | Document | Book | DataMerge | XmlStory | Spread | FindChangeTransparencySetting | FindChangeStrokeTransparencySetting | FindChangeFillTransparencySetting | FindChangeContentTransparencySetting | FormField | PageItemDefault | TransparencySetting | StrokeTransparencySetting | FillTransparencySetting | ContentTransparencySetting | FindObjectPreference | ChangeObjectPreference | Story | TextVariable | TextWrapPreference | Page | Link | ObjectStyle | MasterSpread | NamedGrid | TextDefault | ParagraphStyle | InsertionPoint | TextStyleRange | Paragraph | TextColumn | Line | Word | Character | Text | FindTextPreference | ChangeTextPreference | FindGrepPreference | ChangeGrepPreference | FindTransliteratePreference | ChangeTransliteratePreference)[];
  /**
   * A snapshot of every editable property on this object.
   *
   * Reads its full state in one call rather than property-by-property.
   */
  get properties(): (PropertiesGetter<PreferencePlural, 'plural'>)[];
  /**
   * Sets multiple properties at once from an object literal, in a single call
   * to the native InDesign engine — much faster than assigning each property
   * individually.
   */
  set properties(value: PropertiesSetter<PreferencePlural, 'plural'>);
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
  /** Resolves the proxy into the individual {@link Preference} objects it stands for. */
  getElements(): Preference[];
}
