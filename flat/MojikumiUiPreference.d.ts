/**
 * MojikumiUiPreference.d.ts — indesign-uxp-types
 * Adobe InDesign 2026 (21.x) ExtendScript DOM declarations,
 * converted from indesign-uxp-types by tools/codemod.
 * Version: 1.0.0 · Updated: 2026-09-29
 * Author: Vlad Vladila (Krommatine Systems) · https://github.com/vamitul/indesign-uxp-types
 */
import type { Mode, Read } from './_base/Types';
import type { EventTargetDOMObject } from './_base/DomObjects';
import type { DocumentOrApplication } from './_base/Parents';
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
 * Mojikumi UI preferences.
 */
export interface MojikumiUiPreference {
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
  readonly parent: DocumentOrApplication;
  /**
   * A snapshot of every editable property on this object.
   *
   * Reads its full state in one call rather than property-by-property.
   */
  get properties(): PropertiesGetter<MojikumiUiPreference, 'single'>;
  /**
   * Sets multiple properties at once from an object literal, in a single call
   * to the native InDesign engine — much faster than assigning each property
   * individually.
   */
  set properties(value: PropertiesSetter<MojikumiUiPreference, 'single'>);
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
  /** Resolves the proxy into the individual {@link MojikumiUiPreference} objects it stands for. */
  getElements(): MojikumiUiPreference[];
  /** If true, uses half-width spacing for all characters. */
  get lineEndAllOneHalfEm(): boolean;
  set lineEndAllOneHalfEm(value: boolean);
  /** If true, indents lines one space and uses line end uke one half space. */
  get oneEmIndentLineEndUkeOneHalfEm(): boolean;
  set oneEmIndentLineEndUkeOneHalfEm(value: boolean);
  /** If true, indents lines one full or half space and uses line end uke one half space. */
  get oneOrOneHalfEmIndentLineEndUkeOneHalfEm(): boolean;
  set oneOrOneHalfEmIndentLineEndUkeOneHalfEm(value: boolean);
  /** If true, Uses full-witdh spacing for all characters except the last character in the line, which uses either full- or half-width spacing. */
  get oneOrOneHalfEmIndentLineEndAllOneEm(): boolean;
  set oneOrOneHalfEmIndentLineEndAllOneEm(value: boolean);
  /** If true, indents lines one full space and uses full-width spacing for all characters. */
  get oneEmIndentLineEndAllOneEm(): boolean;
  set oneEmIndentLineEndAllOneEm(value: boolean);
  /** If true, indents lines one full space and uses no float for all characters. */
  get oneEmIndentLineEndAllNoFloat(): boolean;
  set oneEmIndentLineEndAllNoFloat(value: boolean);
  /** If true, indents lines one full space and uses line end uke no float. */
  get oneEmIndentLineEndUkeNoFloat(): boolean;
  set oneEmIndentLineEndUkeNoFloat(value: boolean);
  /** If true, indents lines one half space or one full space and uses line end uke no float. */
  get oneOrOneHalfEmIndentLineEndUkeNoFloat(): boolean;
  set oneOrOneHalfEmIndentLineEndUkeNoFloat(value: boolean);
  /** If true, indents lines one full space and uses half-width spacing for all characters. */
  get oneEmIndentLineEndAllOneHalfEm(): boolean;
  set oneEmIndentLineEndAllOneHalfEm(value: boolean);
  /** If true, uses full-width spacing for all characters. */
  get lineEndAllOneEm(): boolean;
  set lineEndAllOneEm(value: boolean);
  /** If true, uses line end uke no float. */
  get lineEndUkeNoFloat(): boolean;
  set lineEndUkeNoFloat(value: boolean);
  /** If true, indents lines one or one-half space and uses full-width spacing for punctuation and for the last character in the line. */
  get oneOrOneHalfEmIndentLineEndPeriodOneEm(): boolean;
  set oneOrOneHalfEmIndentLineEndPeriodOneEm(value: boolean);
  /** If true, indents lines one space and uses full-width spacing for punctuation and for the last character in the line. */
  get oneEmIndentLineEndPeriodOneEm(): boolean;
  set oneEmIndentLineEndPeriodOneEm(value: boolean);
  /** If true, uses full-width spacing for punctuation and for the last character in the line. */
  get lineEndPeriodOneEm(): boolean;
  set lineEndPeriodOneEm(value: boolean);
}

/**
 * Mojikumi UI preferences.
 */
export interface MojikumiUiPreferencePlural {
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
  readonly parent: (DocumentOrApplication)[];
  /**
   * A snapshot of every editable property on this object.
   *
   * Reads its full state in one call rather than property-by-property.
   */
  get properties(): (PropertiesGetter<MojikumiUiPreferencePlural, 'plural'>)[];
  /**
   * Sets multiple properties at once from an object literal, in a single call
   * to the native InDesign engine — much faster than assigning each property
   * individually.
   */
  set properties(value: PropertiesSetter<MojikumiUiPreferencePlural, 'plural'>);
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
  /** Resolves the proxy into the individual {@link MojikumiUiPreference} objects it stands for. */
  getElements(): MojikumiUiPreference[];
  /** If true, uses half-width spacing for all characters. */
  get lineEndAllOneHalfEm(): (boolean)[];
  set lineEndAllOneHalfEm(value: boolean);
  /** If true, indents lines one space and uses line end uke one half space. */
  get oneEmIndentLineEndUkeOneHalfEm(): (boolean)[];
  set oneEmIndentLineEndUkeOneHalfEm(value: boolean);
  /** If true, indents lines one full or half space and uses line end uke one half space. */
  get oneOrOneHalfEmIndentLineEndUkeOneHalfEm(): (boolean)[];
  set oneOrOneHalfEmIndentLineEndUkeOneHalfEm(value: boolean);
  /** If true, Uses full-witdh spacing for all characters except the last character in the line, which uses either full- or half-width spacing. */
  get oneOrOneHalfEmIndentLineEndAllOneEm(): (boolean)[];
  set oneOrOneHalfEmIndentLineEndAllOneEm(value: boolean);
  /** If true, indents lines one full space and uses full-width spacing for all characters. */
  get oneEmIndentLineEndAllOneEm(): (boolean)[];
  set oneEmIndentLineEndAllOneEm(value: boolean);
  /** If true, indents lines one full space and uses no float for all characters. */
  get oneEmIndentLineEndAllNoFloat(): (boolean)[];
  set oneEmIndentLineEndAllNoFloat(value: boolean);
  /** If true, indents lines one full space and uses line end uke no float. */
  get oneEmIndentLineEndUkeNoFloat(): (boolean)[];
  set oneEmIndentLineEndUkeNoFloat(value: boolean);
  /** If true, indents lines one half space or one full space and uses line end uke no float. */
  get oneOrOneHalfEmIndentLineEndUkeNoFloat(): (boolean)[];
  set oneOrOneHalfEmIndentLineEndUkeNoFloat(value: boolean);
  /** If true, indents lines one full space and uses half-width spacing for all characters. */
  get oneEmIndentLineEndAllOneHalfEm(): (boolean)[];
  set oneEmIndentLineEndAllOneHalfEm(value: boolean);
  /** If true, uses full-width spacing for all characters. */
  get lineEndAllOneEm(): (boolean)[];
  set lineEndAllOneEm(value: boolean);
  /** If true, uses line end uke no float. */
  get lineEndUkeNoFloat(): (boolean)[];
  set lineEndUkeNoFloat(value: boolean);
  /** If true, indents lines one or one-half space and uses full-width spacing for punctuation and for the last character in the line. */
  get oneOrOneHalfEmIndentLineEndPeriodOneEm(): (boolean)[];
  set oneOrOneHalfEmIndentLineEndPeriodOneEm(value: boolean);
  /** If true, indents lines one space and uses full-width spacing for punctuation and for the last character in the line. */
  get oneEmIndentLineEndPeriodOneEm(): (boolean)[];
  set oneEmIndentLineEndPeriodOneEm(value: boolean);
  /** If true, uses full-width spacing for punctuation and for the last character in the line. */
  get lineEndPeriodOneEm(): (boolean)[];
  set lineEndPeriodOneEm(value: boolean);
}
