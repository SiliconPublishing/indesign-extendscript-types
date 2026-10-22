/**
 * WordRTFImportPreference.d.ts — indesign-uxp-types
 * Adobe InDesign 2026 (21.x) ExtendScript DOM declarations,
 * converted from indesign-uxp-types by tools/codemod.
 * Version: 1.0.0 · Updated: 2026-09-29
 * Author: Vlad Vladila (Krommatine Systems) · https://github.com/vamitul/indesign-uxp-types
 */
import type { Mode, Read } from './_base/Types';
import type { EventTargetDOMObject } from './_base/DomObjects';
import type { Application } from './Application';
import type { ConvertPageBreaks } from './Enums/ConvertPageBreaks';
import type { ConvertTablesOptions } from './Enums/ConvertTablesOptions';
import type { ResolveStyleClash } from './Enums/ResolveStyleClash';
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
 * Word RTF import preferences.
 */
export interface WordRTFImportPreference extends InDesignEdition.WordRTFImportPreference, InDesignPlugins.WordRTFImportPreference<'single'> {
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
  get properties(): PropertiesGetter<WordRTFImportPreference, 'single'>;
  /**
   * Sets multiple properties at once from an object literal, in a single call
   * to the native InDesign engine — much faster than assigning each property
   * individually.
   */
  set properties(value: PropertiesSetter<WordRTFImportPreference, 'single'>);
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
  /** Resolves the proxy into the individual {@link WordRTFImportPreference} objects it stands for. */
  getElements(): WordRTFImportPreference[];
  /** If true, imports endnotes as static text rather than live, editable endnotes. */
  get importAsStaticEndnotes(): boolean;
  set importAsStaticEndnotes(value: boolean);
  /** If true, maintains character formatting in text whose formatting has been removed. Applies only when {@link removeFormatting} is `true`. */
  get preserveLocalOverrides(): boolean;
  set preserveLocalOverrides(value: boolean);
  /** If true, imports unused styles. */
  get importUnusedStyles(): boolean;
  set importUnusedStyles(value: boolean);
  /** The option for handling style name conflicts. */
  get resolveCharacterStyleClash(): ResolveStyleClash;
  set resolveCharacterStyleClash(value: ResolveStyleClash);
  /** The option for resolving conflicts that arise when paragraph styles have matching names. */
  get resolveParagraphStyleClash(): ResolveStyleClash;
  set resolveParagraphStyleClash(value: ResolveStyleClash);
  /** If true, preserves inline graphics. */
  get preserveGraphics(): boolean;
  set preserveGraphics(value: boolean);
  /** If true, preserves comments and edits in the imported file. */
  get preserveTrackChanges(): boolean;
  set preserveTrackChanges(value: boolean);
  /** If true, imports footnotes. */
  get importFootnotes(): boolean;
  set importFootnotes(value: boolean);
  /** If true, imports endnotes. */
  get importEndnotes(): boolean;
  set importEndnotes(value: boolean);
  /** If true, convert straight quotes and apostrophes in the imported text to typographic quotation marks and apostrophes. */
  get useTypographersQuotes(): boolean;
  set useTypographersQuotes(value: boolean);
  /** The option for handling manual page breaks. */
  get convertPageBreaks(): ConvertPageBreaks;
  set convertPageBreaks(value: ConvertPageBreaks);
  /** If true, imports the index. */
  get importIndex(): boolean;
  set importIndex(value: boolean);
  /** If true, imports the table of contents. */
  get importTOC(): boolean;
  set importTOC(value: boolean);
  /** If true, removes text and table formatting. */
  get removeFormatting(): boolean;
  set removeFormatting(value: boolean);
  /** The policy for converting tables whose formatting has been removed. Applies only when {@link removeFormatting} is `true`. */
  get convertTablesTo(): ConvertTablesOptions;
  set convertTablesTo(value: ConvertTablesOptions);
  /** If true, bullets and numbers will be converted to embedded characters during import. If false, bullets and numbers will be rendered by InDesign. */
  get convertBulletsAndNumbersToText(): boolean;
  set convertBulletsAndNumbersToText(value: boolean);
}

/**
 * Word RTF import preferences.
 */
export interface WordRTFImportPreferencePlural extends InDesignEdition.WordRTFImportPreferencePlural, InDesignPlugins.WordRTFImportPreference<'plural'> {
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
  get properties(): (PropertiesGetter<WordRTFImportPreferencePlural, 'plural'>)[];
  /**
   * Sets multiple properties at once from an object literal, in a single call
   * to the native InDesign engine — much faster than assigning each property
   * individually.
   */
  set properties(value: PropertiesSetter<WordRTFImportPreferencePlural, 'plural'>);
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
  /** Resolves the proxy into the individual {@link WordRTFImportPreference} objects it stands for. */
  getElements(): WordRTFImportPreference[];
  /** If true, imports endnotes as static text rather than live, editable endnotes. */
  get importAsStaticEndnotes(): (boolean)[];
  set importAsStaticEndnotes(value: boolean);
  /** If true, maintains character formatting in text whose formatting has been removed. Applies only when {@link removeFormatting} is `true`. */
  get preserveLocalOverrides(): (boolean)[];
  set preserveLocalOverrides(value: boolean);
  /** If true, imports unused styles. */
  get importUnusedStyles(): (boolean)[];
  set importUnusedStyles(value: boolean);
  /** The option for handling style name conflicts. */
  get resolveCharacterStyleClash(): (ResolveStyleClash)[];
  set resolveCharacterStyleClash(value: ResolveStyleClash);
  /** The option for resolving conflicts that arise when paragraph styles have matching names. */
  get resolveParagraphStyleClash(): (ResolveStyleClash)[];
  set resolveParagraphStyleClash(value: ResolveStyleClash);
  /** If true, preserves inline graphics. */
  get preserveGraphics(): (boolean)[];
  set preserveGraphics(value: boolean);
  /** If true, preserves comments and edits in the imported file. */
  get preserveTrackChanges(): (boolean)[];
  set preserveTrackChanges(value: boolean);
  /** If true, imports footnotes. */
  get importFootnotes(): (boolean)[];
  set importFootnotes(value: boolean);
  /** If true, imports endnotes. */
  get importEndnotes(): (boolean)[];
  set importEndnotes(value: boolean);
  /** If true, convert straight quotes and apostrophes in the imported text to typographic quotation marks and apostrophes. */
  get useTypographersQuotes(): (boolean)[];
  set useTypographersQuotes(value: boolean);
  /** The option for handling manual page breaks. */
  get convertPageBreaks(): (ConvertPageBreaks)[];
  set convertPageBreaks(value: ConvertPageBreaks);
  /** If true, imports the index. */
  get importIndex(): (boolean)[];
  set importIndex(value: boolean);
  /** If true, imports the table of contents. */
  get importTOC(): (boolean)[];
  set importTOC(value: boolean);
  /** If true, removes text and table formatting. */
  get removeFormatting(): (boolean)[];
  set removeFormatting(value: boolean);
  /** The policy for converting tables whose formatting has been removed. Applies only when {@link removeFormatting} is `true`. */
  get convertTablesTo(): (ConvertTablesOptions)[];
  set convertTablesTo(value: ConvertTablesOptions);
  /** If true, bullets and numbers will be converted to embedded characters during import. If false, bullets and numbers will be rendered by InDesign. */
  get convertBulletsAndNumbersToText(): (boolean)[];
  set convertBulletsAndNumbersToText(value: boolean);
}
