/**
 * FindChangeInnerShadowSetting.d.ts — indesign-uxp-types
 * Adobe InDesign 2026 (21.x) ExtendScript DOM declarations,
 * converted from indesign-uxp-types by tools/codemod.
 * Version: 1.0.0 · Updated: 2026-09-29
 * Author: Vlad Vladila (Krommatine Systems) · https://github.com/vamitul/indesign-uxp-types
 */
import type { Mode, Read } from './_base/Types';
import type { InnerShadowSetting } from './InnerShadowSetting';
import type { FindChangeTransparencySetting } from './FindChangeTransparencySetting';
import type { FindChangeStrokeTransparencySetting } from './FindChangeStrokeTransparencySetting';
import type { FindChangeFillTransparencySetting } from './FindChangeFillTransparencySetting';
import type { FindChangeContentTransparencySetting } from './FindChangeContentTransparencySetting';
import type { Swatch } from './Swatch';
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
import type { BlendMode } from './Enums/BlendMode';

/**
 * The same {@link InnerShadowSetting} settings, applied as find/change criteria.
 */
export interface FindChangeInnerShadowSetting extends InDesignEdition.FindChangeInnerShadowSetting, InDesignPlugins.FindChangeInnerShadowSetting<'single'> {
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
  get properties(): PropertiesGetter<FindChangeInnerShadowSetting, 'single'>;
  /**
   * Sets multiple properties at once from an object literal, in a single call
   * to the native InDesign engine — much faster than assigning each property
   * individually.
   */
  set properties(value: PropertiesSetter<FindChangeInnerShadowSetting, 'single'>);
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
  /**
   * The horizontal offset of the shadow.
   *
   * *Crashes InDesign 21.6**: reading it on a FindChangeInnerShadowSetting takes InDesign down (measured).
   *
   * **Crashes InDesign 21.6**: reading it on a FindChangeInnerShadowSetting takes InDesign down (measured).
   */
  get xOffset(): number | NothingEnum.NOTHING;
  set xOffset(value: MeasurementValue | NothingEnum.NOTHING);
  /**
   * The vertical offset of the shadow.
   *
   * *Crashes InDesign 21.6**: reading it on a FindChangeInnerShadowSetting takes InDesign down (measured).
   *
   * **Crashes InDesign 21.6**: reading it on a FindChangeInnerShadowSetting takes InDesign down (measured).
   */
  get yOffset(): number | NothingEnum.NOTHING;
  set yOffset(value: MeasurementValue | NothingEnum.NOTHING);
  /** If true, the inner shadow effect is applied. */
  get applied(): boolean | NothingEnum.NOTHING;
  set applied(value: boolean | NothingEnum.NOTHING);
  /** The {@link Swatch} applied to the inner shadow. */
  get effectColor(): Swatch | NothingEnum.NOTHING;
  set effectColor(value: Swatch | string | NothingEnum.NOTHING);
  /** The blending mode for the inner shadow effect. */
  get blendMode(): BlendMode | NothingEnum.NOTHING;
  set blendMode(value: BlendMode | NothingEnum.NOTHING);
  /** The opacity (as a percentage) of the inner shadow. (Range: 0 to 100). */
  get opacity(): number | NothingEnum.NOTHING;
  set opacity(value: number | NothingEnum.NOTHING);
  /** The angle at which the inner shadow is thrown. (Range: -360 to 360). */
  get angle(): number | NothingEnum.NOTHING;
  set angle(value: number | NothingEnum.NOTHING);
  /** The distance between the InnerShadowSetting and the shadow. */
  get distance(): number | NothingEnum.NOTHING;
  set distance(value: MeasurementValue | NothingEnum.NOTHING);
  /** If true, the global light angle is used. */
  get useGlobalLight(): boolean | NothingEnum.NOTHING;
  set useGlobalLight(value: boolean | NothingEnum.NOTHING);
  /** The amount to choke the inner shadow (as a percentage of shadow size). (Range: 0 to 100). */
  get chokeAmount(): number | NothingEnum.NOTHING;
  set chokeAmount(value: number | NothingEnum.NOTHING);
  /** The size of the inner shadow. */
  get size(): number | NothingEnum.NOTHING;
  set size(value: MeasurementValue | NothingEnum.NOTHING);
  /** The amount (as a percentage) of noise to add to the shadow. (Range: 0 to 100). */
  get noise(): number | NothingEnum.NOTHING;
  set noise(value: number | NothingEnum.NOTHING);
  /** Resolves the proxy into the individual {@link FindChangeInnerShadowSetting} objects it stands for. */
  getElements(): FindChangeInnerShadowSetting[];
}

/**
 * The same {@link InnerShadowSetting} settings, applied as find/change criteria.
 */
export interface FindChangeInnerShadowSettingPlural extends InDesignEdition.FindChangeInnerShadowSettingPlural, InDesignPlugins.FindChangeInnerShadowSetting<'plural'> {
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
  get properties(): (PropertiesGetter<FindChangeInnerShadowSettingPlural, 'plural'>)[];
  /**
   * Sets multiple properties at once from an object literal, in a single call
   * to the native InDesign engine — much faster than assigning each property
   * individually.
   */
  set properties(value: PropertiesSetter<FindChangeInnerShadowSettingPlural, 'plural'>);
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
  /**
   * The horizontal offset of the shadow.
   *
   * *Crashes InDesign 21.6**: reading it on a FindChangeInnerShadowSetting takes InDesign down (measured).
   *
   * **Crashes InDesign 21.6**: reading it on a FindChangeInnerShadowSetting takes InDesign down (measured).
   */
  get xOffset(): (number | NothingEnum.NOTHING)[];
  set xOffset(value: MeasurementValue | NothingEnum.NOTHING);
  /**
   * The vertical offset of the shadow.
   *
   * *Crashes InDesign 21.6**: reading it on a FindChangeInnerShadowSetting takes InDesign down (measured).
   *
   * **Crashes InDesign 21.6**: reading it on a FindChangeInnerShadowSetting takes InDesign down (measured).
   */
  get yOffset(): (number | NothingEnum.NOTHING)[];
  set yOffset(value: MeasurementValue | NothingEnum.NOTHING);
  /** If true, the inner shadow effect is applied. */
  get applied(): (boolean | NothingEnum.NOTHING)[];
  set applied(value: boolean | NothingEnum.NOTHING);
  /** The {@link Swatch} applied to the inner shadow. */
  get effectColor(): (Swatch | NothingEnum.NOTHING)[];
  set effectColor(value: Swatch | string | NothingEnum.NOTHING);
  /** The blending mode for the inner shadow effect. */
  get blendMode(): (BlendMode | NothingEnum.NOTHING)[];
  set blendMode(value: BlendMode | NothingEnum.NOTHING);
  /** The opacity (as a percentage) of the inner shadow. (Range: 0 to 100). */
  get opacity(): (number | NothingEnum.NOTHING)[];
  set opacity(value: number | NothingEnum.NOTHING);
  /** The angle at which the inner shadow is thrown. (Range: -360 to 360). */
  get angle(): (number | NothingEnum.NOTHING)[];
  set angle(value: number | NothingEnum.NOTHING);
  /** The distance between the InnerShadowSetting and the shadow. */
  get distance(): (number | NothingEnum.NOTHING)[];
  set distance(value: MeasurementValue | NothingEnum.NOTHING);
  /** If true, the global light angle is used. */
  get useGlobalLight(): (boolean | NothingEnum.NOTHING)[];
  set useGlobalLight(value: boolean | NothingEnum.NOTHING);
  /** The amount to choke the inner shadow (as a percentage of shadow size). (Range: 0 to 100). */
  get chokeAmount(): (number | NothingEnum.NOTHING)[];
  set chokeAmount(value: number | NothingEnum.NOTHING);
  /** The size of the inner shadow. */
  get size(): (number | NothingEnum.NOTHING)[];
  set size(value: MeasurementValue | NothingEnum.NOTHING);
  /** The amount (as a percentage) of noise to add to the shadow. (Range: 0 to 100). */
  get noise(): (number | NothingEnum.NOTHING)[];
  set noise(value: number | NothingEnum.NOTHING);
  /** Resolves the proxy into the individual {@link FindChangeInnerShadowSetting} objects it stands for. */
  getElements(): FindChangeInnerShadowSetting[];
}
