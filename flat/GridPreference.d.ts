/**
 * GridPreference.d.ts — indesign-uxp-types
 * Adobe InDesign 2026 (21.x) ExtendScript DOM declarations,
 * converted from indesign-uxp-types by tools/codemod.
 * Version: 1.0.0 · Updated: 2026-09-29
 * Author: Vlad Vladila (Krommatine Systems) · https://github.com/vamitul/indesign-uxp-types
 */
import type { Mode, Read } from './_base/Types';
import type { EventTargetDOMObject } from './_base/DomObjects';
import type { DocumentOrApplication } from './_base/Parents';
import type { MeasurementValue } from './_base/Types';
import type { BaselineGridRelativeOption } from './Enums/BaselineGridRelativeOption';
import type { UIColors } from './Enums/UIColors';
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
 * Document/application baseline and document-grid display defaults.
 */
export interface GridPreference {
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
  get properties(): PropertiesGetter<GridPreference, 'single'>;
  /**
   * Sets multiple properties at once from an object literal, in a single call
   * to the native InDesign engine — much faster than assigning each property
   * individually.
   */
  set properties(value: PropertiesSetter<GridPreference, 'single'>);
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
  /** Resolves the proxy into the individual {@link GridPreference} objects it stands for. */
  getElements(): GridPreference[];
  /** If true, displays the document grid. */
  get documentGridShown(): boolean;
  set documentGridShown(value: boolean);
  /** If true, an object snaps to the nearest grid line when the object is created, moved, or resized. */
  get documentGridSnapto(): boolean;
  set documentGridSnapto(value: boolean);
  /** The amount of space between major horizontal lines in the document grid. */
  get horizontalGridlineDivision(): number;
  set horizontalGridlineDivision(value: MeasurementValue);
  /** The amount of space between major vertical lines in the document grid. */
  get verticalGridlineDivision(): number;
  set verticalGridlineDivision(value: MeasurementValue);
  /** The number of rows into which to subdivide the space between horizontal document grid lines. */
  get horizontalGridSubdivision(): number;
  set horizontalGridSubdivision(value: number);
  /** The number of columns into which to subdivide the space between vertical document grid lines. */
  get verticalGridSubdivision(): number;
  set verticalGridSubdivision(value: number);
  /** The color of the document grid, specified either as an array of three doubles, each in the range 0 to 255, representing R, G, and B values, or as a UI color. */
  get gridColor(): number[] | UIColors;
  set gridColor(value: number[] | UIColors);
  /** If true, places grids behind all other objects on the spread. */
  get gridsInBack(): boolean;
  set gridsInBack(value: boolean);
  /** If true, displays the baseline grid. */
  get baselineGridShown(): boolean;
  set baselineGridShown(value: boolean);
  /** The amount to offset the baseline grid from the zero point. */
  get baselineStart(): number;
  set baselineStart(value: MeasurementValue);
  /** The amount of space between baseline grid lines. */
  get baselineDivision(): number;
  set baselineDivision(value: MeasurementValue);
  /** The magnification (as a percentage) less than which ruler guides do not appear. (Range: 5 to 4000) */
  get baselineViewThreshold(): number;
  set baselineViewThreshold(value: number);
  /** The color of the baseline grid, specified either as an array of three doubles, each in the range 0 to 255, representing R, G, and B values, or as a UI color. */
  get baselineColor(): number[] | UIColors;
  set baselineColor(value: number[] | UIColors);
  /** The zero point for the baseline grid offset. */
  get baselineGridRelativeOption(): BaselineGridRelativeOption;
  set baselineGridRelativeOption(value: BaselineGridRelativeOption);
}

/**
 * Document/application baseline and document-grid display defaults.
 */
export interface GridPreferencePlural {
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
  get properties(): (PropertiesGetter<GridPreferencePlural, 'plural'>)[];
  /**
   * Sets multiple properties at once from an object literal, in a single call
   * to the native InDesign engine — much faster than assigning each property
   * individually.
   */
  set properties(value: PropertiesSetter<GridPreferencePlural, 'plural'>);
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
  /** Resolves the proxy into the individual {@link GridPreference} objects it stands for. */
  getElements(): GridPreference[];
  /** If true, displays the document grid. */
  get documentGridShown(): (boolean)[];
  set documentGridShown(value: boolean);
  /** If true, an object snaps to the nearest grid line when the object is created, moved, or resized. */
  get documentGridSnapto(): (boolean)[];
  set documentGridSnapto(value: boolean);
  /** The amount of space between major horizontal lines in the document grid. */
  get horizontalGridlineDivision(): (number)[];
  set horizontalGridlineDivision(value: MeasurementValue);
  /** The amount of space between major vertical lines in the document grid. */
  get verticalGridlineDivision(): (number)[];
  set verticalGridlineDivision(value: MeasurementValue);
  /** The number of rows into which to subdivide the space between horizontal document grid lines. */
  get horizontalGridSubdivision(): (number)[];
  set horizontalGridSubdivision(value: number);
  /** The number of columns into which to subdivide the space between vertical document grid lines. */
  get verticalGridSubdivision(): (number)[];
  set verticalGridSubdivision(value: number);
  /** The color of the document grid, specified either as an array of three doubles, each in the range 0 to 255, representing R, G, and B values, or as a UI color. */
  get gridColor(): (number[] | UIColors)[];
  set gridColor(value: number[] | UIColors);
  /** If true, places grids behind all other objects on the spread. */
  get gridsInBack(): (boolean)[];
  set gridsInBack(value: boolean);
  /** If true, displays the baseline grid. */
  get baselineGridShown(): (boolean)[];
  set baselineGridShown(value: boolean);
  /** The amount to offset the baseline grid from the zero point. */
  get baselineStart(): (number)[];
  set baselineStart(value: MeasurementValue);
  /** The amount of space between baseline grid lines. */
  get baselineDivision(): (number)[];
  set baselineDivision(value: MeasurementValue);
  /** The magnification (as a percentage) less than which ruler guides do not appear. (Range: 5 to 4000) */
  get baselineViewThreshold(): (number)[];
  set baselineViewThreshold(value: number);
  /** The color of the baseline grid, specified either as an array of three doubles, each in the range 0 to 255, representing R, G, and B values, or as a UI color. */
  get baselineColor(): (number[] | UIColors)[];
  set baselineColor(value: number[] | UIColors);
  /** The zero point for the baseline grid offset. */
  get baselineGridRelativeOption(): (BaselineGridRelativeOption)[];
  set baselineGridRelativeOption(value: BaselineGridRelativeOption);
}
