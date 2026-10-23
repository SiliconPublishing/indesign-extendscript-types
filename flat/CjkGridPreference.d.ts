/**
 * CjkGridPreference.d.ts — indesign-uxp-types
 * Adobe InDesign 2026 (21.x) ExtendScript DOM declarations,
 * converted from indesign-uxp-types by tools/codemod.
 * Version: 1.0.0 · Updated: 2026-09-29
 * Author: Vlad Vladila (Krommatine Systems) · https://github.com/vamitul/indesign-uxp-types
 */
import type { Mode, Read } from './_base/Types';
import type { EventTargetDOMObject } from './_base/DomObjects';
import type { DocumentOrApplication } from './_base/Parents';
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
 * Settings controlling how CJK layout and frame (character) grids are
 * displayed — grid color, snap-to-grid, the zoom level below which grids hide,
 * and per-cell coloring.
 */
export interface CjkGridPreference extends InDesignEdition.CjkGridPreference, InDesignPlugins.CjkGridPreference<'single'> {
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
  get properties(): PropertiesGetter<CjkGridPreference, 'single'>;
  /**
   * Sets multiple properties at once from an object literal, in a single call
   * to the native InDesign engine — much faster than assigning each property
   * individually.
   */
  set properties(value: PropertiesSetter<CjkGridPreference, 'single'>);
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
  /** Resolves the proxy into the individual {@link CjkGridPreference} objects it stands for. */
  getElements(): CjkGridPreference[];
  /** If true, displays the layout grids. */
  get showAllLayoutGrids(): boolean;
  set showAllLayoutGrids(value: boolean);
  /** If true, displays the frame (story) grids. */
  get showAllFrameGrids(): boolean;
  set showAllFrameGrids(value: boolean);
  /** The view magnification (as a percentage) less than which grids do not appear. (Range: 5 to 4000). */
  get minimumScale(): number;
  set minimumScale(value: number);
  /** If true, objects snap to the layout grid. */
  get snapToLayoutGrid(): boolean;
  set snapToLayoutGrid(value: boolean);
  /** The layout grid color, specified either as an array of three doubles, each in the range 0 to 255 and representing R, G, and B values, or as a UI color. */
  get layoutGridColorIndex(): number[] | UIColors;
  set layoutGridColorIndex(value: number[] | UIColors);
  /** Applies the grid color to every nth cell, where n is the value of this property. */
  get colorEveryNthCell(): number;
  set colorEveryNthCell(value: number);
  /** If true, applies the grid color from the the edge of the line. If false, applies the grid color from the corner of the frame. */
  get singleLineColorMode(): boolean;
  set singleLineColorMode(value: boolean);
  /** If true, uses ICF mode for grid cells. If false, uses virtual body mode. */
  get icfMode(): boolean;
  set icfMode(value: boolean);
  /** If true, cell shape is circular. If false, cell shape is rectangular. */
  get useCircularCells(): boolean;
  set useCircularCells(value: boolean);
  /** If true, displays the character count for the frame. */
  get showCharacterCount(): boolean;
  set showCharacterCount(value: boolean);
}

/**
 * Settings controlling how CJK layout and frame (character) grids are
 * displayed — grid color, snap-to-grid, the zoom level below which grids hide,
 * and per-cell coloring.
 */
export interface CjkGridPreferencePlural extends InDesignEdition.CjkGridPreferencePlural, InDesignPlugins.CjkGridPreference<'plural'> {
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
  get properties(): (PropertiesGetter<CjkGridPreferencePlural, 'plural'>)[];
  /**
   * Sets multiple properties at once from an object literal, in a single call
   * to the native InDesign engine — much faster than assigning each property
   * individually.
   */
  set properties(value: PropertiesSetter<CjkGridPreferencePlural, 'plural'>);
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
  /** Resolves the proxy into the individual {@link CjkGridPreference} objects it stands for. */
  getElements(): CjkGridPreference[];
  /** If true, displays the layout grids. */
  get showAllLayoutGrids(): (boolean)[];
  set showAllLayoutGrids(value: boolean);
  /** If true, displays the frame (story) grids. */
  get showAllFrameGrids(): (boolean)[];
  set showAllFrameGrids(value: boolean);
  /** The view magnification (as a percentage) less than which grids do not appear. (Range: 5 to 4000). */
  get minimumScale(): (number)[];
  set minimumScale(value: number);
  /** If true, objects snap to the layout grid. */
  get snapToLayoutGrid(): (boolean)[];
  set snapToLayoutGrid(value: boolean);
  /** The layout grid color, specified either as an array of three doubles, each in the range 0 to 255 and representing R, G, and B values, or as a UI color. */
  get layoutGridColorIndex(): (number[] | UIColors)[];
  set layoutGridColorIndex(value: number[] | UIColors);
  /** Applies the grid color to every nth cell, where n is the value of this property. */
  get colorEveryNthCell(): (number)[];
  set colorEveryNthCell(value: number);
  /** If true, applies the grid color from the the edge of the line. If false, applies the grid color from the corner of the frame. */
  get singleLineColorMode(): (boolean)[];
  set singleLineColorMode(value: boolean);
  /** If true, uses ICF mode for grid cells. If false, uses virtual body mode. */
  get icfMode(): (boolean)[];
  set icfMode(value: boolean);
  /** If true, cell shape is circular. If false, cell shape is rectangular. */
  get useCircularCells(): (boolean)[];
  set useCircularCells(value: boolean);
  /** If true, displays the character count for the frame. */
  get showCharacterCount(): (boolean)[];
  set showCharacterCount(value: boolean);
}
