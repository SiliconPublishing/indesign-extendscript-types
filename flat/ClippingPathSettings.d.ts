/**
 * ClippingPathSettings.d.ts — indesign-uxp-types
 * Adobe InDesign 2026 (21.x) ExtendScript DOM declarations,
 * converted from indesign-uxp-types by tools/codemod.
 * Version: 1.0.0 · Updated: 2026-09-29
 * Author: Vlad Vladila (Krommatine Systems) · https://github.com/vamitul/indesign-uxp-types
 */
import type { Mode, Read } from './_base/Types';
import type { EventTargetDOMObject } from './_base/DomObjects';
import type { MeasurementValue } from './_base/Types';
import type { EPS } from './EPS';
import type { Image } from './Image';
import type { ImportedPage } from './ImportedPage';
import type { PDF } from './PDF';
import type { PICT } from './PICT';
import type { PageItem } from './PageItem';
import type { Paths } from './Paths';
import type { WMF } from './WMF';
import type { ClippingPathType } from './Enums/ClippingPathType';
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
 * The path that masks a placed graphic, hiding everything outside it.
 *
 * The path can come from an alpha channel or a Photoshop path stored in the file, or
 * be detected from the image's own edges — see {@link clippingType}.
 */
export interface ClippingPathSettings extends InDesignPlugins.ClippingPathSettings<'single'> {
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
  readonly parent: Image | EPS | WMF | PICT | PDF | ImportedPage;
  /**
   * A snapshot of every editable property on this object.
   *
   * Reads its full state in one call rather than property-by-property.
   */
  get properties(): PropertiesGetter<ClippingPathSettings, 'single'>;
  /**
   * Sets multiple properties at once from an object literal, in a single call
   * to the native InDesign engine — much faster than assigning each property
   * individually.
   */
  set properties(value: PropertiesSetter<ClippingPathSettings, 'single'>);
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
  /** Resolves the proxy into the individual {@link ClippingPathSettings} objects it stands for. */
  getElements(): ClippingPathSettings[];
  /** A list of the clipping paths stored in the graphic. */
  readonly photoshopPathNames: string[];
  /** A list of the alpha channels stored in the graphic. */
  readonly alphaChannelPathNames: string[];
  /** A collection of paths. */
  readonly paths: Paths;
  /** The clipping path type. */
  get clippingType(): ClippingPathType;
  set clippingType(value: ClippingPathType);
  /** If true, inverts the clipping path. */
  get invertPath(): boolean;
  set invertPath(value: boolean);
  /** If true, creates interior clipping paths within the surrounding clipping path. Applies only when {@link clippingType} is {@link ClippingPathType.ALPHA_CHANNEL} or {@link ClippingPathType.DETECT_EDGES}. */
  get includeInsideEdges(): boolean;
  set includeInsideEdges(value: boolean);
  /** If true, truncates the clipping path at the edge of the frame containing the graphic. Applies only when {@link clippingType} is {@link ClippingPathType.ALPHA_CHANNEL} or {@link ClippingPathType.DETECT_EDGES}. */
  get restrictToFrame(): boolean;
  set restrictToFrame(value: boolean);
  /**
   * If true, uses the high-resolution version of the graphic to create the
   * clipping path. If false, calculates the clipping path based on
   * screen-display resolution.
   *
   * Applies only when {@link clippingType} is {@link ClippingPathType.DETECT_EDGES}.
   */
  get useHighResolutionImage(): boolean;
  set useHighResolutionImage(value: boolean);
  /**
   * The lowest value (darkest) pixel to allow in the image.
   *
   * All pixels in the image whose values are greater than (lighter than) the threshold value
   * are clipped (obscured). (Range: 0 to 255) Applies only when {@link clippingType} is
   * {@link ClippingPathType.DETECT_EDGES} or {@link ClippingPathType.ALPHA_CHANNEL}.
   */
  get threshold(): number;
  set threshold(value: number);
  /**
   * How similar a pixel's intensity value can be to the threshold value
   * before the pixel is obscured by the clipping path. (Range: 0 to 10)
   *
   * Applies only when {@link clippingType} is {@link ClippingPathType.DETECT_EDGES}
   * or {@link ClippingPathType.ALPHA_CHANNEL}.
   */
  get tolerance(): number;
  set tolerance(value: number);
  /**
   * Shrinks the area enclosed by the clipping path by the specified amount.
   *
   * (Range depends on the unit. For points: -10000 to 10000; picas: -833p4 to 833p4; inches:
   * -138.8889 to 138.8889; mm: -3527.778 to 3527.778; cm: -352.7778 to 352.7778; ciceros:
   * -781c11.889 to 781c11.889).
   */
  get insetFrame(): number;
  set insetFrame(value: MeasurementValue);
  /** The name of the Photoshop path or alpha channel to use as a clipping path. */
  get appliedPathName(): string;
  set appliedPathName(value: string);
  /** Converts the clipping path to a frame. */
  convertToFrame(): PageItem;
}

/**
 * The path that masks a placed graphic, hiding everything outside it.
 *
 * The path can come from an alpha channel or a Photoshop path stored in the file, or
 * be detected from the image's own edges — see {@link clippingType}.
 */
export interface ClippingPathSettingsPlural extends InDesignPlugins.ClippingPathSettings<'plural'> {
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
  readonly parent: (Image | EPS | WMF | PICT | PDF | ImportedPage)[];
  /**
   * A snapshot of every editable property on this object.
   *
   * Reads its full state in one call rather than property-by-property.
   */
  get properties(): (PropertiesGetter<ClippingPathSettingsPlural, 'plural'>)[];
  /**
   * Sets multiple properties at once from an object literal, in a single call
   * to the native InDesign engine — much faster than assigning each property
   * individually.
   */
  set properties(value: PropertiesSetter<ClippingPathSettingsPlural, 'plural'>);
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
  /** Resolves the proxy into the individual {@link ClippingPathSettings} objects it stands for. */
  getElements(): ClippingPathSettings[];
  /** A list of the clipping paths stored in the graphic. */
  readonly photoshopPathNames: (string[])[];
  /** A list of the alpha channels stored in the graphic. */
  readonly alphaChannelPathNames: (string[])[];
  /** A collection of paths. */
  readonly paths: Paths;
  /** The clipping path type. */
  get clippingType(): (ClippingPathType)[];
  set clippingType(value: ClippingPathType);
  /** If true, inverts the clipping path. */
  get invertPath(): (boolean)[];
  set invertPath(value: boolean);
  /** If true, creates interior clipping paths within the surrounding clipping path. Applies only when {@link clippingType} is {@link ClippingPathType.ALPHA_CHANNEL} or {@link ClippingPathType.DETECT_EDGES}. */
  get includeInsideEdges(): (boolean)[];
  set includeInsideEdges(value: boolean);
  /** If true, truncates the clipping path at the edge of the frame containing the graphic. Applies only when {@link clippingType} is {@link ClippingPathType.ALPHA_CHANNEL} or {@link ClippingPathType.DETECT_EDGES}. */
  get restrictToFrame(): (boolean)[];
  set restrictToFrame(value: boolean);
  /**
   * If true, uses the high-resolution version of the graphic to create the
   * clipping path. If false, calculates the clipping path based on
   * screen-display resolution.
   *
   * Applies only when {@link clippingType} is {@link ClippingPathType.DETECT_EDGES}.
   */
  get useHighResolutionImage(): (boolean)[];
  set useHighResolutionImage(value: boolean);
  /**
   * The lowest value (darkest) pixel to allow in the image.
   *
   * All pixels in the image whose values are greater than (lighter than) the threshold value
   * are clipped (obscured). (Range: 0 to 255) Applies only when {@link clippingType} is
   * {@link ClippingPathType.DETECT_EDGES} or {@link ClippingPathType.ALPHA_CHANNEL}.
   */
  get threshold(): (number)[];
  set threshold(value: number);
  /**
   * How similar a pixel's intensity value can be to the threshold value
   * before the pixel is obscured by the clipping path. (Range: 0 to 10)
   *
   * Applies only when {@link clippingType} is {@link ClippingPathType.DETECT_EDGES}
   * or {@link ClippingPathType.ALPHA_CHANNEL}.
   */
  get tolerance(): (number)[];
  set tolerance(value: number);
  /**
   * Shrinks the area enclosed by the clipping path by the specified amount.
   *
   * (Range depends on the unit. For points: -10000 to 10000; picas: -833p4 to 833p4; inches:
   * -138.8889 to 138.8889; mm: -3527.778 to 3527.778; cm: -352.7778 to 352.7778; ciceros:
   * -781c11.889 to 781c11.889).
   */
  get insetFrame(): (number)[];
  set insetFrame(value: MeasurementValue);
  /** The name of the Photoshop path or alpha channel to use as a clipping path. */
  get appliedPathName(): (string)[];
  set appliedPathName(value: string);
  /** Converts the clipping path to a frame. */
  convertToFrame(): (PageItem)[];
}
