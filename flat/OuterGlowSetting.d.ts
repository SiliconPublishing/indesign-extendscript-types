/**
 * OuterGlowSetting.d.ts — indesign-uxp-types
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
import type { GlowTechnique } from './Enums/GlowTechnique';
import type { FindChangeOuterGlowSetting } from './FindChangeOuterGlowSetting';
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
 * Settings for the outer-glow effect — a glow that radiates outward from the
 * edges of the object or text it's applied to.
 */
export interface OuterGlowSetting<TParent = TransparencySetting | StrokeTransparencySetting | FillTransparencySetting | ContentTransparencySetting> extends InDesignEdition.OuterGlowSetting<TParent>, InDesignPlugins.OuterGlowSetting<'single'> {
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
  get properties(): PropertiesGetter<OuterGlowSetting<TParent>, 'single'>;
  /**
   * Sets multiple properties at once from an object literal, in a single call
   * to the native InDesign engine — much faster than assigning each property
   * individually.
   */
  set properties(value: PropertiesSetter<OuterGlowSetting<TParent>, 'single'>);
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
  /** Resolves the proxy into the individual {@link OuterGlowSetting} objects it stands for. */
  getElements(): OuterGlowSetting<TParent>[];
  /** If true, the outer glow effect is applied. */
  get applied(): boolean | NothingEnum.NOTHING;
  set applied(value: boolean | never);
  /** The blending mode for the outer glow effect. */
  get blendMode(): BlendMode | NothingEnum.NOTHING;
  set blendMode(value: BlendMode | never);
  /** The opacity of the outer glow (as a percentage). (Range: 0 to 100). */
  get opacity(): number | NothingEnum.NOTHING;
  set opacity(value: number | never);
  /** The amount (as a percentage) of noise applied to the outer glow. (Range: 0 to 100). */
  get noise(): number | NothingEnum.NOTHING;
  set noise(value: number | never);
  /**
   * The color applied to the outer glow, specified as a swatch (color, gradient, tint, or
   * mixed ink), or an array of color values.
   *
   * The color mode dictates the array values: for RGB, specify three values, each in the
   * range 0 to 255, in the format [R,G,B]; for CMYK, specify four values, each as a
   * percentage and each in the range 0 to 100, in the format [C,M,Y,K]; for LAB, specify
   * three values in the format [L,A,B], with L in the range 0 to 100 and A and B in the range
   * -128 to 127.
   */
  get effectColor(): Swatch | NothingEnum.NOTHING;
  set effectColor(value: Swatch | string | never);
  /** Whether the glow's edge is soft or precise. See {@link GlowTechnique}. */
  get technique(): GlowTechnique | NothingEnum.NOTHING;
  set technique(value: GlowTechnique | never);
  /** The amount of spread (as a percentage of the outer glow size). (Range: 0 to 100). */
  get spread(): number | NothingEnum.NOTHING;
  set spread(value: number | never);
  /** The size of the outer glow. */
  get size(): number | NothingEnum.NOTHING;
  set size(value: MeasurementValue | never);
}

/**
 * Settings for the outer-glow effect — a glow that radiates outward from the
 * edges of the object or text it's applied to.
 */
export interface OuterGlowSettingPlural<TParent = TransparencySetting | StrokeTransparencySetting | FillTransparencySetting | ContentTransparencySetting> extends InDesignEdition.OuterGlowSettingPlural<TParent>, InDesignPlugins.OuterGlowSetting<'plural'> {
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
  get properties(): (PropertiesGetter<OuterGlowSettingPlural<TParent>, 'plural'>)[];
  /**
   * Sets multiple properties at once from an object literal, in a single call
   * to the native InDesign engine — much faster than assigning each property
   * individually.
   */
  set properties(value: PropertiesSetter<OuterGlowSettingPlural<TParent>, 'plural'>);
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
  /** Resolves the proxy into the individual {@link OuterGlowSetting} objects it stands for. */
  getElements(): OuterGlowSetting<TParent>[];
  /** If true, the outer glow effect is applied. */
  get applied(): (boolean | NothingEnum.NOTHING)[];
  set applied(value: boolean | never);
  /** The blending mode for the outer glow effect. */
  get blendMode(): (BlendMode | NothingEnum.NOTHING)[];
  set blendMode(value: BlendMode | never);
  /** The opacity of the outer glow (as a percentage). (Range: 0 to 100). */
  get opacity(): (number | NothingEnum.NOTHING)[];
  set opacity(value: number | never);
  /** The amount (as a percentage) of noise applied to the outer glow. (Range: 0 to 100). */
  get noise(): (number | NothingEnum.NOTHING)[];
  set noise(value: number | never);
  /**
   * The color applied to the outer glow, specified as a swatch (color, gradient, tint, or
   * mixed ink), or an array of color values.
   *
   * The color mode dictates the array values: for RGB, specify three values, each in the
   * range 0 to 255, in the format [R,G,B]; for CMYK, specify four values, each as a
   * percentage and each in the range 0 to 100, in the format [C,M,Y,K]; for LAB, specify
   * three values in the format [L,A,B], with L in the range 0 to 100 and A and B in the range
   * -128 to 127.
   */
  get effectColor(): (Swatch | NothingEnum.NOTHING)[];
  set effectColor(value: Swatch | string | never);
  /** Whether the glow's edge is soft or precise. See {@link GlowTechnique}. */
  get technique(): (GlowTechnique | NothingEnum.NOTHING)[];
  set technique(value: GlowTechnique | never);
  /** The amount of spread (as a percentage of the outer glow size). (Range: 0 to 100). */
  get spread(): (number | NothingEnum.NOTHING)[];
  set spread(value: number | never);
  /** The size of the outer glow. */
  get size(): (number | NothingEnum.NOTHING)[];
  set size(value: MeasurementValue | never);
}
