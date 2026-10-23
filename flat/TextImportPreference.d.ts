/**
 * TextImportPreference.d.ts — indesign-uxp-types
 * Adobe InDesign 2026 (21.x) ExtendScript DOM declarations,
 * converted from indesign-uxp-types by tools/codemod.
 * Version: 1.0.0 · Updated: 2026-09-29
 * Author: Vlad Vladila (Krommatine Systems) · https://github.com/vamitul/indesign-uxp-types
 */
import type { Mode, Read } from './_base/Types';
import type { EventTargetDOMObject } from './_base/DomObjects';
import type { Application } from './Application';
import type { ImportPlatform } from './Enums/ImportPlatform';
import type { TextImportCharacterSet } from './Enums/TextImportCharacterSet';
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
 * Formatting and encoding options applied when importing a plain-text file into a document.
 */
export interface TextImportPreference extends InDesignEdition.TextImportPreference, InDesignPlugins.TextImportPreference<'single'> {
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
  readonly parent: Application;
  /**
   * A snapshot of every editable property on this object.
   *
   * Reads its full state in one call rather than property-by-property.
   */
  get properties(): PropertiesGetter<TextImportPreference, 'single'>;
  /**
   * Sets multiple properties at once from an object literal, in a single call
   * to the native InDesign engine — much faster than assigning each property
   * individually.
   */
  set properties(value: PropertiesSetter<TextImportPreference, 'single'>);
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
  /** Resolves the proxy into the individual {@link TextImportPreference} objects it stands for. */
  getElements(): TextImportPreference[];
  /** The computer language character set used to create the text file. */
  get characterSet(): TextImportCharacterSet;
  set characterSet(value: TextImportCharacterSet);
  /** The platform used to create the imported text file. */
  get platform(): ImportPlatform;
  set platform(value: ImportPlatform);
  /** The dictionary to use for the imported text. */
  get dictionary(): string;
  set dictionary(value: string);
  /** If true, the import filter removes extra carriage returns at the ends of lines. */
  get stripReturnsBetweenLines(): boolean;
  set stripReturnsBetweenLines(value: boolean);
  /** If true, the import filter removes extra carriage returns between paragraphs. */
  get stripReturnsBetweenParagraphs(): boolean;
  set stripReturnsBetweenParagraphs(value: boolean);
  /** If true, converts runs of {@link spacesIntoTabsCount} spaces into a tab character. */
  get convertSpacesIntoTabs(): boolean;
  set convertSpacesIntoTabs(value: boolean);
  /** The number of spaces {@link convertSpacesIntoTabs} converts into a tab. Ignored when that's `false`. */
  get spacesIntoTabsCount(): number;
  set spacesIntoTabsCount(value: number);
  /** If true, convert straight quotes and apostrophes in the imported text to typographic quotation marks and apostrophes. */
  get useTypographersQuotes(): boolean;
  set useTypographersQuotes(value: boolean);
}

/**
 * Formatting and encoding options applied when importing a plain-text file into a document.
 */
export interface TextImportPreferencePlural extends InDesignEdition.TextImportPreferencePlural, InDesignPlugins.TextImportPreference<'plural'> {
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
  readonly parent: (Application)[];
  /**
   * A snapshot of every editable property on this object.
   *
   * Reads its full state in one call rather than property-by-property.
   */
  get properties(): (PropertiesGetter<TextImportPreferencePlural, 'plural'>)[];
  /**
   * Sets multiple properties at once from an object literal, in a single call
   * to the native InDesign engine — much faster than assigning each property
   * individually.
   */
  set properties(value: PropertiesSetter<TextImportPreferencePlural, 'plural'>);
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
  /** Resolves the proxy into the individual {@link TextImportPreference} objects it stands for. */
  getElements(): TextImportPreference[];
  /** The computer language character set used to create the text file. */
  get characterSet(): (TextImportCharacterSet)[];
  set characterSet(value: TextImportCharacterSet);
  /** The platform used to create the imported text file. */
  get platform(): (ImportPlatform)[];
  set platform(value: ImportPlatform);
  /** The dictionary to use for the imported text. */
  get dictionary(): (string)[];
  set dictionary(value: string);
  /** If true, the import filter removes extra carriage returns at the ends of lines. */
  get stripReturnsBetweenLines(): (boolean)[];
  set stripReturnsBetweenLines(value: boolean);
  /** If true, the import filter removes extra carriage returns between paragraphs. */
  get stripReturnsBetweenParagraphs(): (boolean)[];
  set stripReturnsBetweenParagraphs(value: boolean);
  /** If true, converts runs of {@link spacesIntoTabsCount} spaces into a tab character. */
  get convertSpacesIntoTabs(): (boolean)[];
  set convertSpacesIntoTabs(value: boolean);
  /** The number of spaces {@link convertSpacesIntoTabs} converts into a tab. Ignored when that's `false`. */
  get spacesIntoTabsCount(): (number)[];
  set spacesIntoTabsCount(value: number);
  /** If true, convert straight quotes and apostrophes in the imported text to typographic quotation marks and apostrophes. */
  get useTypographersQuotes(): (boolean)[];
  set useTypographersQuotes(value: boolean);
}
