/**
 * DropShadowSetting.d.ts — indesign-uxp-types
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
import type { StrokeTransparencySetting } from './StrokeTransparencySetting';
import type { Swatch } from './Swatch';
import type { TransparencySetting } from './TransparencySetting';
import type { BlendMode } from './Enums/BlendMode';
import type { ShadowMode } from './Enums/ShadowMode';
import type { FindChangeDropShadowSetting } from './FindChangeDropShadowSetting';
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

/**
 * Drop shadow settings.
 */
export interface DropShadowSetting<TParent = TransparencySetting | StrokeTransparencySetting | FillTransparencySetting | ContentTransparencySetting> extends InDesignPlugins.DropShadowSetting<'single'> {
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
  readonly parent: TParent;
  /**
   * A snapshot of every editable property on this object.
   *
   * Reads its full state in one call rather than property-by-property.
   */
  get properties(): PropertiesGetter<DropShadowSetting<TParent>, 'single'>;
  /**
   * Sets multiple properties at once from an object literal, in a single call
   * to the native InDesign engine — much faster than assigning each property
   * individually.
   */
  set properties(value: PropertiesSetter<DropShadowSetting<TParent>, 'single'>);
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
  /** Resolves the proxy into the individual {@link DropShadowSetting} objects it stands for. */
  getElements(): DropShadowSetting<TParent>[];
  /**
   * The distance between the item and its shadow.
   *
   * **Crashes InDesign 21.6**: reading it on a FindChangeDropShadowSetting takes InDesign down (measured).
   */
  get distance(): number | NothingEnum.NOTHING;
  set distance(value: MeasurementValue | never);
  /**
   * The angle at which the shadow is thrown.
   *
   * **Crashes InDesign 21.6**: reading it on a FindChangeDropShadowSetting takes InDesign down (measured).
   */
  get angle(): number | NothingEnum.NOTHING;
  set angle(value: number | never);
  /** The shadow mode. */
  get mode(): ShadowMode | NothingEnum.NOTHING;
  set mode(value: ShadowMode | never);
  /** The blending mode for the drop shadow effect. */
  get blendMode(): BlendMode | NothingEnum.NOTHING;
  set blendMode(value: BlendMode | never);
  /** The opacity of the drop shadow (as a percentage). (Range: 0 to 100). */
  get opacity(): number | NothingEnum.NOTHING;
  set opacity(value: number | never);
  /**
   * The horizontal offset of the drop shadow.
   *
   * Range depends on the unit type. For points: -1000 to 1000; for picas: -83p4 to 83p4; for
   * inches: -13.8889 to 13.8889; for mm: -352.778 to 352.778; for cm: -35.277 to 35.277; for
   * ciceros: -78c2.389 to 78c2.389.
   */
  get xOffset(): number | NothingEnum.NOTHING;
  set xOffset(value: MeasurementValue | never);
  /**
   * The vertical offset of the drop shadow.
   *
   * (Range depends on the unit type. For points: -1000 to 1000; for picas: -83p4 to 83p4; for
   * inches: -13.8889 to 13.8889; for mm: -352.778 to 352.778; for cm: -35.277 to 35.277; for
   * ciceros: -78c2.389 to 78c2.389).
   */
  get yOffset(): number | NothingEnum.NOTHING;
  set yOffset(value: MeasurementValue | never);
  /** The radius (in pixels) of the blur applied to the drop shadow. (Range depends on the unit type. For points: 0 to 144; for picas: 0p0 to 12p0; for inches: 0 to 2; for mm: 0 to 50.08; for cm: 0 to 5.08; for ciceros: 0c0 to 11c3.128.). */
  get size(): number | NothingEnum.NOTHING;
  set size(value: MeasurementValue | never);
  /** The {@link Swatch} applied to the drop shadow. */
  get effectColor(): Swatch | NothingEnum.NOTHING;
  set effectColor(value: Swatch | string | never);
  /** The amount (as a percentage) of noise applied to the shadow. (Range: 0 to 100). */
  get noise(): number | NothingEnum.NOTHING;
  set noise(value: number | never);
  /** The amount (as a percentage of the blur width) to spread the footprint of the drop shadow and reduce the radius of the blur. (Range: 0 to 100). */
  get spread(): number | NothingEnum.NOTHING;
  set spread(value: number | never);
  /** If true, uses the global light angle. */
  get useGlobalLight(): boolean | NothingEnum.NOTHING;
  set useGlobalLight(value: boolean | never);
  /** If true, the layer will knock out the drop shadow. */
  get knockedOut(): boolean | NothingEnum.NOTHING;
  set knockedOut(value: boolean | never);
  /** If true, the drop shadow will take into account other non-shadow effects. */
  get honorOtherEffects(): boolean | NothingEnum.NOTHING;
  set honorOtherEffects(value: boolean | never);
}

/**
 * Drop shadow settings.
 */
export interface DropShadowSettingPlural<TParent = TransparencySetting | StrokeTransparencySetting | FillTransparencySetting | ContentTransparencySetting> extends InDesignPlugins.DropShadowSetting<'plural'> {
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
  readonly parent: (TParent)[];
  /**
   * A snapshot of every editable property on this object.
   *
   * Reads its full state in one call rather than property-by-property.
   */
  get properties(): (PropertiesGetter<DropShadowSettingPlural<TParent>, 'plural'>)[];
  /**
   * Sets multiple properties at once from an object literal, in a single call
   * to the native InDesign engine — much faster than assigning each property
   * individually.
   */
  set properties(value: PropertiesSetter<DropShadowSettingPlural<TParent>, 'plural'>);
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
  /** Resolves the proxy into the individual {@link DropShadowSetting} objects it stands for. */
  getElements(): DropShadowSetting<TParent>[];
  /**
   * The distance between the item and its shadow.
   *
   * **Crashes InDesign 21.6**: reading it on a FindChangeDropShadowSetting takes InDesign down (measured).
   */
  get distance(): (number | NothingEnum.NOTHING)[];
  set distance(value: MeasurementValue | never);
  /**
   * The angle at which the shadow is thrown.
   *
   * **Crashes InDesign 21.6**: reading it on a FindChangeDropShadowSetting takes InDesign down (measured).
   */
  get angle(): (number | NothingEnum.NOTHING)[];
  set angle(value: number | never);
  /** The shadow mode. */
  get mode(): (ShadowMode | NothingEnum.NOTHING)[];
  set mode(value: ShadowMode | never);
  /** The blending mode for the drop shadow effect. */
  get blendMode(): (BlendMode | NothingEnum.NOTHING)[];
  set blendMode(value: BlendMode | never);
  /** The opacity of the drop shadow (as a percentage). (Range: 0 to 100). */
  get opacity(): (number | NothingEnum.NOTHING)[];
  set opacity(value: number | never);
  /**
   * The horizontal offset of the drop shadow.
   *
   * Range depends on the unit type. For points: -1000 to 1000; for picas: -83p4 to 83p4; for
   * inches: -13.8889 to 13.8889; for mm: -352.778 to 352.778; for cm: -35.277 to 35.277; for
   * ciceros: -78c2.389 to 78c2.389.
   */
  get xOffset(): (number | NothingEnum.NOTHING)[];
  set xOffset(value: MeasurementValue | never);
  /**
   * The vertical offset of the drop shadow.
   *
   * (Range depends on the unit type. For points: -1000 to 1000; for picas: -83p4 to 83p4; for
   * inches: -13.8889 to 13.8889; for mm: -352.778 to 352.778; for cm: -35.277 to 35.277; for
   * ciceros: -78c2.389 to 78c2.389).
   */
  get yOffset(): (number | NothingEnum.NOTHING)[];
  set yOffset(value: MeasurementValue | never);
  /** The radius (in pixels) of the blur applied to the drop shadow. (Range depends on the unit type. For points: 0 to 144; for picas: 0p0 to 12p0; for inches: 0 to 2; for mm: 0 to 50.08; for cm: 0 to 5.08; for ciceros: 0c0 to 11c3.128.). */
  get size(): (number | NothingEnum.NOTHING)[];
  set size(value: MeasurementValue | never);
  /** The {@link Swatch} applied to the drop shadow. */
  get effectColor(): (Swatch | NothingEnum.NOTHING)[];
  set effectColor(value: Swatch | string | never);
  /** The amount (as a percentage) of noise applied to the shadow. (Range: 0 to 100). */
  get noise(): (number | NothingEnum.NOTHING)[];
  set noise(value: number | never);
  /** The amount (as a percentage of the blur width) to spread the footprint of the drop shadow and reduce the radius of the blur. (Range: 0 to 100). */
  get spread(): (number | NothingEnum.NOTHING)[];
  set spread(value: number | never);
  /** If true, uses the global light angle. */
  get useGlobalLight(): (boolean | NothingEnum.NOTHING)[];
  set useGlobalLight(value: boolean | never);
  /** If true, the layer will knock out the drop shadow. */
  get knockedOut(): (boolean | NothingEnum.NOTHING)[];
  set knockedOut(value: boolean | never);
  /** If true, the drop shadow will take into account other non-shadow effects. */
  get honorOtherEffects(): (boolean | NothingEnum.NOTHING)[];
  set honorOtherEffects(value: boolean | never);
}
