/**
 * ExcelImportPreference.d.ts — indesign-uxp-types
 * Adobe InDesign 2026 (21.x) ExtendScript DOM declarations,
 * converted from indesign-uxp-types by tools/codemod.
 * Version: 1.0.0 · Updated: 2026-09-29
 * Author: Vlad Vladila (Krommatine Systems) · https://github.com/vamitul/indesign-uxp-types
 */
import type { Mode, Read } from './_base/Types';
import type { EventTargetDOMObject } from './_base/DomObjects';
import type { Application } from './Application';
import type { AlignmentStyleOptions } from './Enums/AlignmentStyleOptions';
import type { TableFormattingOptions } from './Enums/TableFormattingOptions';
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
 * Settings controlling how an Excel worksheet is imported — which sheet and cell
 * range, cell alignment and decimal formatting, and whether inline graphics and
 * hidden cells are included.
 */
export interface ExcelImportPreference extends InDesignEdition.ExcelImportPreference, InDesignPlugins.ExcelImportPreference<'single'> {
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
  get properties(): PropertiesGetter<ExcelImportPreference, 'single'>;
  /**
   * Sets multiple properties at once from an object literal, in a single call
   * to the native InDesign engine — much faster than assigning each property
   * individually.
   */
  set properties(value: PropertiesSetter<ExcelImportPreference, 'single'>);
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
  /** Resolves the proxy into the individual {@link ExcelImportPreference} objects it stands for. */
  getElements(): ExcelImportPreference[];
  /** If true, convert straight quotes and apostrophes in the imported text to typographic quotation marks and apostrophes. */
  get useTypographersQuotes(): boolean;
  set useTypographersQuotes(value: boolean);
  /** If true, preserves inline graphics. */
  get preserveGraphics(): boolean;
  set preserveGraphics(value: boolean);
  /** The stored custom or personal view(s) to import with the file. */
  get viewName(): string;
  set viewName(value: string);
  /** The worksheet to import. */
  get sheetName(): string;
  set sheetName(value: string);
  /** The worksheet's index, as an alternative to naming it via {@link sheetName}. */
  get sheetIndex(): number;
  set sheetIndex(value: number);
  /** The range of cells to import. Use a colon (:) to separate the start and end cell names in the range. */
  get rangeName(): string;
  set rangeName(value: string);
  /** How imported cell content is horizontally aligned — the spreadsheet's own alignment, or forced left/right/center. See {@link AlignmentStyleOptions}. */
  get alignmentStyle(): AlignmentStyleOptions;
  set alignmentStyle(value: AlignmentStyleOptions);
  /** The number of decimal places to include. Valid only when {@link alignmentStyle} is decimal. */
  get decimalPlaces(): number;
  set decimalPlaces(value: number);
  /** If true, shows hidden cells. */
  get showHiddenCells(): boolean;
  set showHiddenCells(value: boolean);
  /** The import error code. (Key: 0=Success; 1=Empty Sheet; 2=Invalid sheet; 3=Invalid range; 4=Invalid View; 5=Misc. Error). */
  get errorCode(): number;
  set errorCode(value: number);
  /** Whether the imported spreadsheet keeps its original Excel formatting, is converted to an unformatted table or tabbed text, or is formatted only on the initial import. See {@link TableFormattingOptions}. */
  get tableFormatting(): TableFormattingOptions;
  set tableFormatting(value: TableFormattingOptions);
}

/**
 * Settings controlling how an Excel worksheet is imported — which sheet and cell
 * range, cell alignment and decimal formatting, and whether inline graphics and
 * hidden cells are included.
 */
export interface ExcelImportPreferencePlural extends InDesignEdition.ExcelImportPreferencePlural, InDesignPlugins.ExcelImportPreference<'plural'> {
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
  get properties(): (PropertiesGetter<ExcelImportPreferencePlural, 'plural'>)[];
  /**
   * Sets multiple properties at once from an object literal, in a single call
   * to the native InDesign engine — much faster than assigning each property
   * individually.
   */
  set properties(value: PropertiesSetter<ExcelImportPreferencePlural, 'plural'>);
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
  /** Resolves the proxy into the individual {@link ExcelImportPreference} objects it stands for. */
  getElements(): ExcelImportPreference[];
  /** If true, convert straight quotes and apostrophes in the imported text to typographic quotation marks and apostrophes. */
  get useTypographersQuotes(): (boolean)[];
  set useTypographersQuotes(value: boolean);
  /** If true, preserves inline graphics. */
  get preserveGraphics(): (boolean)[];
  set preserveGraphics(value: boolean);
  /** The stored custom or personal view(s) to import with the file. */
  get viewName(): (string)[];
  set viewName(value: string);
  /** The worksheet to import. */
  get sheetName(): (string)[];
  set sheetName(value: string);
  /** The worksheet's index, as an alternative to naming it via {@link sheetName}. */
  get sheetIndex(): (number)[];
  set sheetIndex(value: number);
  /** The range of cells to import. Use a colon (:) to separate the start and end cell names in the range. */
  get rangeName(): (string)[];
  set rangeName(value: string);
  /** How imported cell content is horizontally aligned — the spreadsheet's own alignment, or forced left/right/center. See {@link AlignmentStyleOptions}. */
  get alignmentStyle(): (AlignmentStyleOptions)[];
  set alignmentStyle(value: AlignmentStyleOptions);
  /** The number of decimal places to include. Valid only when {@link alignmentStyle} is decimal. */
  get decimalPlaces(): (number)[];
  set decimalPlaces(value: number);
  /** If true, shows hidden cells. */
  get showHiddenCells(): (boolean)[];
  set showHiddenCells(value: boolean);
  /** The import error code. (Key: 0=Success; 1=Empty Sheet; 2=Invalid sheet; 3=Invalid range; 4=Invalid View; 5=Misc. Error). */
  get errorCode(): (number)[];
  set errorCode(value: number);
  /** Whether the imported spreadsheet keeps its original Excel formatting, is converted to an unformatted table or tabbed text, or is formatted only on the initial import. See {@link TableFormattingOptions}. */
  get tableFormatting(): (TableFormattingOptions)[];
  set tableFormatting(value: TableFormattingOptions);
}
