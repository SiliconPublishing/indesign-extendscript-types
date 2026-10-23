/**
 * PNGExportPreference.d.ts — indesign-uxp-types
 * Adobe InDesign 2026 (21.x) ExtendScript DOM declarations,
 * converted from indesign-uxp-types by tools/codemod.
 * Version: 1.0.0 · Updated: 2026-09-29
 * Author: Vlad Vladila (Krommatine Systems) · https://github.com/vamitul/indesign-uxp-types
 */
import type { Mode, Read } from './_base/Types';
import type { EventTargetDOMObject } from './_base/DomObjects';
import type { Application } from './Application';
import type { PNGColorSpaceEnum } from './Enums/PNGColorSpaceEnum';
import type { PNGExportRangeEnum } from './Enums/PNGExportRangeEnum';
import type { PNGQualityEnum } from './Enums/PNGQualityEnum';
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
 * Settings for exporting pages or spreads as PNG images — resolution, color
 * space, quality, transparency, and which pages to include.
 */
export interface PNGExportPreference extends InDesignEdition.PNGExportPreference, InDesignPlugins.PNGExportPreference<'single'> {
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
  get properties(): PropertiesGetter<PNGExportPreference, 'single'>;
  /**
   * Sets multiple properties at once from an object literal, in a single call
   * to the native InDesign engine — much faster than assigning each property
   * individually.
   */
  set properties(value: PropertiesSetter<PNGExportPreference, 'single'>);
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
  /** Resolves the proxy into the individual {@link PNGExportPreference} objects it stands for. */
  getElements(): PNGExportPreference[];
  /** Suffix to be used at the end of each exported file. */
  get pngSuffix(): string;
  set pngSuffix(value: string);
  /** If true, export hidden spreads. If false, skip export of hidden spreads. */
  get exportingHiddenSpread(): boolean;
  set exportingHiddenSpread(value: boolean);
  /** Whether to export all pages or just the range given in {@link pageString}. See {@link PNGExportRangeEnum}. */
  get pngExportRange(): PNGExportRangeEnum;
  set pngExportRange(value: PNGExportRangeEnum);
  /** The page(s) to export, specified as a page number or an array of page numbers. Note: Valid when PNG export range is not all. */
  get pageString(): string;
  set pageString(value: string);
  /** If true, exports each spread as a single PNG file. If false, exports facing pages as separate files and appends sequential numbers to each file name. */
  get exportingSpread(): boolean;
  set exportingSpread(value: boolean);
  /** The compression quality of the exported PNG — low, medium, high, or maximum. See {@link PNGQualityEnum}. */
  get pngQuality(): PNGQualityEnum;
  set pngQuality(value: PNGQualityEnum);
  /** The export resolution expressed as a real number instead of an integer. (Range: 1.0 to 2400.0). */
  get exportResolution(): number;
  set exportResolution(value: number);
  /** RGB or Gray. */
  get pngColorSpace(): PNGColorSpaceEnum;
  set pngColorSpace(value: PNGColorSpaceEnum);
  /** If true, use a transparent background for the exported PNG. */
  get transparentBackground(): boolean;
  set transparentBackground(value: boolean);
  /** If true, use anti-aliasing for text and vectors during export. */
  get antiAlias(): boolean;
  set antiAlias(value: boolean);
  /** If true, uses the document's bleed settings in the exported PNG. */
  get useDocumentBleeds(): boolean;
  set useDocumentBleeds(value: boolean);
  /** If true, simulates the effects of overprinting spot and process colors in the same way they would occur when printing. */
  get simulateOverprint(): boolean;
  set simulateOverprint(value: boolean);
}

/**
 * Settings for exporting pages or spreads as PNG images — resolution, color
 * space, quality, transparency, and which pages to include.
 */
export interface PNGExportPreferencePlural extends InDesignEdition.PNGExportPreferencePlural, InDesignPlugins.PNGExportPreference<'plural'> {
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
  get properties(): (PropertiesGetter<PNGExportPreferencePlural, 'plural'>)[];
  /**
   * Sets multiple properties at once from an object literal, in a single call
   * to the native InDesign engine — much faster than assigning each property
   * individually.
   */
  set properties(value: PropertiesSetter<PNGExportPreferencePlural, 'plural'>);
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
  /** Resolves the proxy into the individual {@link PNGExportPreference} objects it stands for. */
  getElements(): PNGExportPreference[];
  /** Suffix to be used at the end of each exported file. */
  get pngSuffix(): (string)[];
  set pngSuffix(value: string);
  /** If true, export hidden spreads. If false, skip export of hidden spreads. */
  get exportingHiddenSpread(): (boolean)[];
  set exportingHiddenSpread(value: boolean);
  /** Whether to export all pages or just the range given in {@link pageString}. See {@link PNGExportRangeEnum}. */
  get pngExportRange(): (PNGExportRangeEnum)[];
  set pngExportRange(value: PNGExportRangeEnum);
  /** The page(s) to export, specified as a page number or an array of page numbers. Note: Valid when PNG export range is not all. */
  get pageString(): (string)[];
  set pageString(value: string);
  /** If true, exports each spread as a single PNG file. If false, exports facing pages as separate files and appends sequential numbers to each file name. */
  get exportingSpread(): (boolean)[];
  set exportingSpread(value: boolean);
  /** The compression quality of the exported PNG — low, medium, high, or maximum. See {@link PNGQualityEnum}. */
  get pngQuality(): (PNGQualityEnum)[];
  set pngQuality(value: PNGQualityEnum);
  /** The export resolution expressed as a real number instead of an integer. (Range: 1.0 to 2400.0). */
  get exportResolution(): (number)[];
  set exportResolution(value: number);
  /** RGB or Gray. */
  get pngColorSpace(): (PNGColorSpaceEnum)[];
  set pngColorSpace(value: PNGColorSpaceEnum);
  /** If true, use a transparent background for the exported PNG. */
  get transparentBackground(): (boolean)[];
  set transparentBackground(value: boolean);
  /** If true, use anti-aliasing for text and vectors during export. */
  get antiAlias(): (boolean)[];
  set antiAlias(value: boolean);
  /** If true, uses the document's bleed settings in the exported PNG. */
  get useDocumentBleeds(): (boolean)[];
  set useDocumentBleeds(value: boolean);
  /** If true, simulates the effects of overprinting spot and process colors in the same way they would occur when printing. */
  get simulateOverprint(): (boolean)[];
  set simulateOverprint(value: boolean);
}
