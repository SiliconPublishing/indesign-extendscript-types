/**
 * MarginPreference.d.ts — indesign-uxp-types
 * Adobe InDesign 2026 (21.x) ExtendScript DOM declarations,
 * converted from indesign-uxp-types by tools/codemod.
 * Version: 1.0.0 · Updated: 2026-09-29
 * Author: Vlad Vladila (Krommatine Systems) · https://github.com/vamitul/indesign-uxp-types
 */
import type { Mode, Read } from './_base/Types';
import type { EventTargetDOMObject } from './_base/DomObjects';
import type { MeasurementValue } from './_base/Types';
import type { Application } from './Application';
import type { Document } from './Document';
import type { Page } from './Page';
import type { HorizontalOrVertical } from './Enums/HorizontalOrVertical';
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
 * A page's or spread's margin and column layout.
 */
export interface MarginPreference extends InDesignEdition.MarginPreference, InDesignPlugins.MarginPreference<'single'> {
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
  readonly parent: Application | Document | Page;
  /**
   * A snapshot of every editable property on this object.
   *
   * Reads its full state in one call rather than property-by-property.
   */
  get properties(): PropertiesGetter<MarginPreference, 'single'>;
  /**
   * Sets multiple properties at once from an object literal, in a single call
   * to the native InDesign engine — much faster than assigning each property
   * individually.
   */
  set properties(value: PropertiesSetter<MarginPreference, 'single'>);
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
  /** Resolves the proxy into the individual {@link MarginPreference} objects it stands for. */
  getElements(): MarginPreference[];
  /** If false, columns are evenly spaced. If true, columns can have custom widths. */
  readonly customColumns: boolean;
  /** The number of columns to place on the page. */
  get columnCount(): number;
  set columnCount(value: number);
  /** The distance between columns. */
  get columnGutter(): number;
  set columnGutter(value: MeasurementValue);
  /** The top edge of the MarginPreference. */
  get top(): number;
  set top(value: MeasurementValue);
  /** The bottom edge of the MarginPreference. */
  get bottom(): number;
  set bottom(value: MeasurementValue);
  /** The left edge of the MarginPreference. */
  get left(): number;
  set left(value: MeasurementValue);
  /** The right edge of the MarginPreference. */
  get right(): number;
  set right(value: MeasurementValue);
  /** The direction of text in the column. */
  get columnDirection(): HorizontalOrVertical;
  set columnDirection(value: HorizontalOrVertical);
  /** The distance that each column guide is placed from the left margin, formatted as an array in the format [guide1, guide2, guide3]. */
  get columnsPositions(): number[];
  set columnsPositions(value: MeasurementValue[]);
}

/**
 * A page's or spread's margin and column layout.
 */
export interface MarginPreferencePlural extends InDesignEdition.MarginPreferencePlural, InDesignPlugins.MarginPreference<'plural'> {
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
  readonly parent: (Application | Document | Page)[];
  /**
   * A snapshot of every editable property on this object.
   *
   * Reads its full state in one call rather than property-by-property.
   */
  get properties(): (PropertiesGetter<MarginPreferencePlural, 'plural'>)[];
  /**
   * Sets multiple properties at once from an object literal, in a single call
   * to the native InDesign engine — much faster than assigning each property
   * individually.
   */
  set properties(value: PropertiesSetter<MarginPreferencePlural, 'plural'>);
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
  /** Resolves the proxy into the individual {@link MarginPreference} objects it stands for. */
  getElements(): MarginPreference[];
  /** If false, columns are evenly spaced. If true, columns can have custom widths. */
  readonly customColumns: (boolean)[];
  /** The number of columns to place on the page. */
  get columnCount(): (number)[];
  set columnCount(value: number);
  /** The distance between columns. */
  get columnGutter(): (number)[];
  set columnGutter(value: MeasurementValue);
  /** The top edge of the MarginPreference. */
  get top(): (number)[];
  set top(value: MeasurementValue);
  /** The bottom edge of the MarginPreference. */
  get bottom(): (number)[];
  set bottom(value: MeasurementValue);
  /** The left edge of the MarginPreference. */
  get left(): (number)[];
  set left(value: MeasurementValue);
  /** The right edge of the MarginPreference. */
  get right(): (number)[];
  set right(value: MeasurementValue);
  /** The direction of text in the column. */
  get columnDirection(): (HorizontalOrVertical)[];
  set columnDirection(value: HorizontalOrVertical);
  /** The distance that each column guide is placed from the left margin, formatted as an array in the format [guide1, guide2, guide3]. */
  get columnsPositions(): (number[])[];
  set columnsPositions(value: MeasurementValue[]);
}
