/**
 * FindChangeDirectionalFeatherSetting.d.ts — indesign-uxp-types
 * Adobe InDesign 2026 (21.x) ExtendScript DOM declarations,
 * converted from indesign-uxp-types by tools/codemod.
 * Version: 1.0.0 · Updated: 2026-09-29
 * Author: Vlad Vladila (Krommatine Systems) · https://github.com/vamitul/indesign-uxp-types
 */
import type { Mode, Read } from './_base/Types';
import type { DirectionalFeatherSetting } from './DirectionalFeatherSetting';
import type { FindChangeTransparencySetting } from './FindChangeTransparencySetting';
import type { FindChangeStrokeTransparencySetting } from './FindChangeStrokeTransparencySetting';
import type { FindChangeFillTransparencySetting } from './FindChangeFillTransparencySetting';
import type { FindChangeContentTransparencySetting } from './FindChangeContentTransparencySetting';
import type { NothingEnum } from "./Enums/NothingEnum";
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
import type { MeasurementValue } from './_base/Types';
import type { FollowShapeModeOptions } from './Enums/FollowShapeModeOptions';

/**
 * The same {@link DirectionalFeatherSetting} settings, applied as find/change criteria.
 */
export interface FindChangeDirectionalFeatherSetting extends InDesignEdition.FindChangeDirectionalFeatherSetting, InDesignPlugins.FindChangeDirectionalFeatherSetting<'single'> {
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
  readonly parent: FindChangeTransparencySetting | FindChangeStrokeTransparencySetting | FindChangeFillTransparencySetting;
  /**
   * A snapshot of every editable property on this object.
   *
   * Reads its full state in one call rather than property-by-property.
   */
  get properties(): PropertiesGetter<FindChangeDirectionalFeatherSetting, 'single'>;
  /**
   * Sets multiple properties at once from an object literal, in a single call
   * to the native InDesign engine — much faster than assigning each property
   * individually.
   */
  set properties(value: PropertiesSetter<FindChangeDirectionalFeatherSetting, 'single'>);
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
  /** If true, the directional feather effect is applied. */
  get applied(): boolean | NothingEnum.NOTHING;
  set applied(value: boolean | NothingEnum.NOTHING);
  /** The feather width (in pixels) on the left side of the object. */
  get leftWidth(): number | NothingEnum.NOTHING;
  set leftWidth(value: MeasurementValue | NothingEnum.NOTHING);
  /** The feather width (in pixels) on the right side of the object. (Range: .2 to 250). */
  get rightWidth(): number | NothingEnum.NOTHING;
  set rightWidth(value: MeasurementValue | NothingEnum.NOTHING);
  /** The feather width (in pixels) on the top side of the object. (Range: .2 to 250). */
  get topWidth(): number | NothingEnum.NOTHING;
  set topWidth(value: MeasurementValue | NothingEnum.NOTHING);
  /** The feather width (in pixels) on the bottom side of the object. (Range: .2 to 250). */
  get bottomWidth(): number | NothingEnum.NOTHING;
  set bottomWidth(value: MeasurementValue | NothingEnum.NOTHING);
  /** The amount to choke the directional feather (as a percentage of the feather width). (Range: 0 to 100). */
  get chokeAmount(): number | NothingEnum.NOTHING;
  set chokeAmount(value: number | NothingEnum.NOTHING);
  /** The angle of the feather. (Range: 180 to -180). */
  get angle(): number | NothingEnum.NOTHING;
  set angle(value: number | NothingEnum.NOTHING);
  /** The shape-following algorithm applied to the feather. */
  get followShapeMode(): FollowShapeModeOptions | NothingEnum.NOTHING;
  set followShapeMode(value: FollowShapeModeOptions | NothingEnum.NOTHING);
  /** The amount of noise (as a percentage) applied to the feather region. (Range: 0 to 100). */
  get noise(): number | NothingEnum.NOTHING;
  set noise(value: number | NothingEnum.NOTHING);
  /** Resolves the proxy into the individual {@link FindChangeDirectionalFeatherSetting} objects it stands for. */
  getElements(): FindChangeDirectionalFeatherSetting[];
}

/**
 * The same {@link DirectionalFeatherSetting} settings, applied as find/change criteria.
 */
export interface FindChangeDirectionalFeatherSettingPlural extends InDesignEdition.FindChangeDirectionalFeatherSettingPlural, InDesignPlugins.FindChangeDirectionalFeatherSetting<'plural'> {
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
  readonly parent: (FindChangeTransparencySetting | FindChangeStrokeTransparencySetting | FindChangeFillTransparencySetting)[];
  /**
   * A snapshot of every editable property on this object.
   *
   * Reads its full state in one call rather than property-by-property.
   */
  get properties(): (PropertiesGetter<FindChangeDirectionalFeatherSettingPlural, 'plural'>)[];
  /**
   * Sets multiple properties at once from an object literal, in a single call
   * to the native InDesign engine — much faster than assigning each property
   * individually.
   */
  set properties(value: PropertiesSetter<FindChangeDirectionalFeatherSettingPlural, 'plural'>);
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
  /** If true, the directional feather effect is applied. */
  get applied(): (boolean | NothingEnum.NOTHING)[];
  set applied(value: boolean | NothingEnum.NOTHING);
  /** The feather width (in pixels) on the left side of the object. */
  get leftWidth(): (number | NothingEnum.NOTHING)[];
  set leftWidth(value: MeasurementValue | NothingEnum.NOTHING);
  /** The feather width (in pixels) on the right side of the object. (Range: .2 to 250). */
  get rightWidth(): (number | NothingEnum.NOTHING)[];
  set rightWidth(value: MeasurementValue | NothingEnum.NOTHING);
  /** The feather width (in pixels) on the top side of the object. (Range: .2 to 250). */
  get topWidth(): (number | NothingEnum.NOTHING)[];
  set topWidth(value: MeasurementValue | NothingEnum.NOTHING);
  /** The feather width (in pixels) on the bottom side of the object. (Range: .2 to 250). */
  get bottomWidth(): (number | NothingEnum.NOTHING)[];
  set bottomWidth(value: MeasurementValue | NothingEnum.NOTHING);
  /** The amount to choke the directional feather (as a percentage of the feather width). (Range: 0 to 100). */
  get chokeAmount(): (number | NothingEnum.NOTHING)[];
  set chokeAmount(value: number | NothingEnum.NOTHING);
  /** The angle of the feather. (Range: 180 to -180). */
  get angle(): (number | NothingEnum.NOTHING)[];
  set angle(value: number | NothingEnum.NOTHING);
  /** The shape-following algorithm applied to the feather. */
  get followShapeMode(): (FollowShapeModeOptions | NothingEnum.NOTHING)[];
  set followShapeMode(value: FollowShapeModeOptions | NothingEnum.NOTHING);
  /** The amount of noise (as a percentage) applied to the feather region. (Range: 0 to 100). */
  get noise(): (number | NothingEnum.NOTHING)[];
  set noise(value: number | NothingEnum.NOTHING);
  /** Resolves the proxy into the individual {@link FindChangeDirectionalFeatherSetting} objects it stands for. */
  getElements(): FindChangeDirectionalFeatherSetting[];
}
