/**
 * GradientFeatherSetting.d.ts — indesign-uxp-types
 * Adobe InDesign 2026 (21.x) ExtendScript DOM declarations,
 * converted from indesign-uxp-types by tools/codemod.
 * Version: 1.0.0 · Updated: 2026-09-29
 * Author: Vlad Vladila (Krommatine Systems) · https://github.com/vamitul/indesign-uxp-types
 */
import type { Mode, Read } from './_base/Types';
import type { EventTargetDOMObject } from './_base/DomObjects';
import type { MeasurementValue } from './_base/Types';
import type { ContentTransparencySetting } from './ContentTransparencySetting';
import type { FillTransparencySetting } from './FillTransparencySetting';
import type { OpacityGradientStops } from './OpacityGradientStops';
import type { StrokeTransparencySetting } from './StrokeTransparencySetting';
import type { TransparencySetting } from './TransparencySetting';
import type { GradientType } from './Enums/GradientType';
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
 * A soft fade to transparent along a gradient, defined by
 * {@link opacityGradientStops} and this object's angle, length, and type.
 */
export interface GradientFeatherSetting {
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
  readonly parent: TransparencySetting | StrokeTransparencySetting | FillTransparencySetting | ContentTransparencySetting;
  /**
   * A snapshot of every editable property on this object.
   *
   * Reads its full state in one call rather than property-by-property.
   */
  get properties(): PropertiesGetter<GradientFeatherSetting, 'single'>;
  /**
   * Sets multiple properties at once from an object literal, in a single call
   * to the native InDesign engine — much faster than assigning each property
   * individually.
   */
  set properties(value: PropertiesSetter<GradientFeatherSetting, 'single'>);
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
  /** Resolves the proxy into the individual {@link GradientFeatherSetting} objects it stands for. */
  getElements(): GradientFeatherSetting[];
  /** A collection of opacity gradient stops. */
  readonly opacityGradientStops: OpacityGradientStops;
  /** If true, the gradient feather effect is applied. */
  get applied(): boolean;
  set applied(value: boolean);
  /** Whether the fade follows a straight line ({@link GradientType.LINEAR}) or radiates from a point ({@link GradientType.RADIAL}). */
  get type(): GradientType;
  set type(value: GradientType);
  /** The angle of the gradient feather. */
  get angle(): number;
  set angle(value: number);
  /** The length of the axial gradient, or radius of the radial gradient. */
  get length(): number;
  set length(value: MeasurementValue);
  /** The center point (for a radial gradient) or starting point (for a linear gradient) applied to the fill, as page coordinates in the format [x, y]. */
  get gradientStart(): number[];
  set gradientStart(value: MeasurementValue[]);
  /** The hilite angle of the radial gradient feather. */
  get hiliteAngle(): number;
  set hiliteAngle(value: number);
  /** The hilite length of the radial gradient feather. */
  get hiliteLength(): number;
  set hiliteLength(value: MeasurementValue);
}

/**
 * A soft fade to transparent along a gradient, defined by
 * {@link opacityGradientStops} and this object's angle, length, and type.
 */
export interface GradientFeatherSettingPlural {
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
  readonly parent: (TransparencySetting | StrokeTransparencySetting | FillTransparencySetting | ContentTransparencySetting)[];
  /**
   * A snapshot of every editable property on this object.
   *
   * Reads its full state in one call rather than property-by-property.
   */
  get properties(): (PropertiesGetter<GradientFeatherSettingPlural, 'plural'>)[];
  /**
   * Sets multiple properties at once from an object literal, in a single call
   * to the native InDesign engine — much faster than assigning each property
   * individually.
   */
  set properties(value: PropertiesSetter<GradientFeatherSettingPlural, 'plural'>);
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
  /** Resolves the proxy into the individual {@link GradientFeatherSetting} objects it stands for. */
  getElements(): GradientFeatherSetting[];
  /** A collection of opacity gradient stops. */
  readonly opacityGradientStops: OpacityGradientStops;
  /** If true, the gradient feather effect is applied. */
  get applied(): (boolean)[];
  set applied(value: boolean);
  /** Whether the fade follows a straight line ({@link GradientType.LINEAR}) or radiates from a point ({@link GradientType.RADIAL}). */
  get type(): (GradientType)[];
  set type(value: GradientType);
  /** The angle of the gradient feather. */
  get angle(): (number)[];
  set angle(value: number);
  /** The length of the axial gradient, or radius of the radial gradient. */
  get length(): (number)[];
  set length(value: MeasurementValue);
  /** The center point (for a radial gradient) or starting point (for a linear gradient) applied to the fill, as page coordinates in the format [x, y]. */
  get gradientStart(): (number[])[];
  set gradientStart(value: MeasurementValue[]);
  /** The hilite angle of the radial gradient feather. */
  get hiliteAngle(): (number)[];
  set hiliteAngle(value: number);
  /** The hilite length of the radial gradient feather. */
  get hiliteLength(): (number)[];
  set hiliteLength(value: MeasurementValue);
}
