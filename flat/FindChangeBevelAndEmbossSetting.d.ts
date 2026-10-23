/**
 * FindChangeBevelAndEmbossSetting.d.ts — indesign-uxp-types
 * Adobe InDesign 2026 (21.x) ExtendScript DOM declarations,
 * converted from indesign-uxp-types by tools/codemod.
 * Version: 1.0.0 · Updated: 2026-09-29
 * Author: Vlad Vladila (Krommatine Systems) · https://github.com/vamitul/indesign-uxp-types
 */
import type { Mode, Read } from './_base/Types';
import type { BevelAndEmbossSetting } from './BevelAndEmbossSetting';
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
import type { BevelAndEmbossStyle } from './Enums/BevelAndEmbossStyle';
import type { BevelAndEmbossTechnique } from './Enums/BevelAndEmbossTechnique';
import type { BevelAndEmbossDirection } from './Enums/BevelAndEmbossDirection';
import type { MeasurementValue } from './_base/Types';
import type { BlendMode } from './Enums/BlendMode';

/**
 * The same {@link BevelAndEmbossSetting} settings, applied as find/change criteria.
 */
export interface FindChangeBevelAndEmbossSetting extends InDesignEdition.FindChangeBevelAndEmbossSetting, InDesignPlugins.FindChangeBevelAndEmbossSetting<'single'> {
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
  get properties(): PropertiesGetter<FindChangeBevelAndEmbossSetting, 'single'>;
  /**
   * Sets multiple properties at once from an object literal, in a single call
   * to the native InDesign engine — much faster than assigning each property
   * individually.
   */
  set properties(value: PropertiesSetter<FindChangeBevelAndEmbossSetting, 'single'>);
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
  /** If true, the bevel or emboss effect is applied. */
  get applied(): boolean | NothingEnum.NOTHING;
  set applied(value: boolean | NothingEnum.NOTHING);
  /** The style of bevel or emboss. */
  get style(): BevelAndEmbossStyle | NothingEnum.NOTHING;
  set style(value: BevelAndEmbossStyle | NothingEnum.NOTHING);
  /** The edging technique of the bevel or emboss. */
  get technique(): BevelAndEmbossTechnique | NothingEnum.NOTHING;
  set technique(value: BevelAndEmbossTechnique | NothingEnum.NOTHING);
  /** The depth of the bevel or emboss (as a percentage). (Range: 0 to 1000). */
  get depth(): number | NothingEnum.NOTHING;
  set depth(value: number | NothingEnum.NOTHING);
  /** The direction of the bevel or emboss. */
  get direction(): BevelAndEmbossDirection | NothingEnum.NOTHING;
  set direction(value: BevelAndEmbossDirection | NothingEnum.NOTHING);
  /** The size of the bevel or emboss. */
  get size(): number | NothingEnum.NOTHING;
  set size(value: MeasurementValue | NothingEnum.NOTHING);
  /** The amount (in pixels) of softening. */
  get soften(): number | NothingEnum.NOTHING;
  set soften(value: MeasurementValue | NothingEnum.NOTHING);
  /** The angle of the light source. (Range: -180 to 180). */
  get angle(): number | NothingEnum.NOTHING;
  set angle(value: number | NothingEnum.NOTHING);
  /** The altitude of the light source. (Range: 0 to 90). */
  get altitude(): number | NothingEnum.NOTHING;
  set altitude(value: number | NothingEnum.NOTHING);
  /** If true, the global light source is used. */
  get useGlobalLight(): boolean | NothingEnum.NOTHING;
  set useGlobalLight(value: boolean | NothingEnum.NOTHING);
  /** The {@link Swatch} applied to the highlight portion of the effect. */
  get highlightColor(): Swatch | NothingEnum.NOTHING;
  set highlightColor(value: Swatch | string | NothingEnum.NOTHING);
  /** The blending mode for the highlight portion of the effect. */
  get highlightBlendMode(): BlendMode | NothingEnum.NOTHING;
  set highlightBlendMode(value: BlendMode | NothingEnum.NOTHING);
  /** The opacity of the highlight portion of the effect (as a percentage). (Range: 0 to 100). */
  get highlightOpacity(): number | NothingEnum.NOTHING;
  set highlightOpacity(value: number | NothingEnum.NOTHING);
  /** The {@link Swatch} applied to the shadow portion of the effect. */
  get shadowColor(): Swatch | NothingEnum.NOTHING;
  set shadowColor(value: Swatch | string | NothingEnum.NOTHING);
  /** The blending mode for the shadow portion of the effect. */
  get shadowBlendMode(): BlendMode | NothingEnum.NOTHING;
  set shadowBlendMode(value: BlendMode | NothingEnum.NOTHING);
  /** The opacity of the shadow portion of the effect (as a percentage). (Range: 0 to 100). */
  get shadowOpacity(): number | NothingEnum.NOTHING;
  set shadowOpacity(value: number | NothingEnum.NOTHING);
  /** Resolves the proxy into the individual {@link FindChangeBevelAndEmbossSetting} objects it stands for. */
  getElements(): FindChangeBevelAndEmbossSetting[];
}

/**
 * The same {@link BevelAndEmbossSetting} settings, applied as find/change criteria.
 */
export interface FindChangeBevelAndEmbossSettingPlural extends InDesignEdition.FindChangeBevelAndEmbossSettingPlural, InDesignPlugins.FindChangeBevelAndEmbossSetting<'plural'> {
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
  get properties(): (PropertiesGetter<FindChangeBevelAndEmbossSettingPlural, 'plural'>)[];
  /**
   * Sets multiple properties at once from an object literal, in a single call
   * to the native InDesign engine — much faster than assigning each property
   * individually.
   */
  set properties(value: PropertiesSetter<FindChangeBevelAndEmbossSettingPlural, 'plural'>);
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
  /** If true, the bevel or emboss effect is applied. */
  get applied(): (boolean | NothingEnum.NOTHING)[];
  set applied(value: boolean | NothingEnum.NOTHING);
  /** The style of bevel or emboss. */
  get style(): (BevelAndEmbossStyle | NothingEnum.NOTHING)[];
  set style(value: BevelAndEmbossStyle | NothingEnum.NOTHING);
  /** The edging technique of the bevel or emboss. */
  get technique(): (BevelAndEmbossTechnique | NothingEnum.NOTHING)[];
  set technique(value: BevelAndEmbossTechnique | NothingEnum.NOTHING);
  /** The depth of the bevel or emboss (as a percentage). (Range: 0 to 1000). */
  get depth(): (number | NothingEnum.NOTHING)[];
  set depth(value: number | NothingEnum.NOTHING);
  /** The direction of the bevel or emboss. */
  get direction(): (BevelAndEmbossDirection | NothingEnum.NOTHING)[];
  set direction(value: BevelAndEmbossDirection | NothingEnum.NOTHING);
  /** The size of the bevel or emboss. */
  get size(): (number | NothingEnum.NOTHING)[];
  set size(value: MeasurementValue | NothingEnum.NOTHING);
  /** The amount (in pixels) of softening. */
  get soften(): (number | NothingEnum.NOTHING)[];
  set soften(value: MeasurementValue | NothingEnum.NOTHING);
  /** The angle of the light source. (Range: -180 to 180). */
  get angle(): (number | NothingEnum.NOTHING)[];
  set angle(value: number | NothingEnum.NOTHING);
  /** The altitude of the light source. (Range: 0 to 90). */
  get altitude(): (number | NothingEnum.NOTHING)[];
  set altitude(value: number | NothingEnum.NOTHING);
  /** If true, the global light source is used. */
  get useGlobalLight(): (boolean | NothingEnum.NOTHING)[];
  set useGlobalLight(value: boolean | NothingEnum.NOTHING);
  /** The {@link Swatch} applied to the highlight portion of the effect. */
  get highlightColor(): (Swatch | NothingEnum.NOTHING)[];
  set highlightColor(value: Swatch | string | NothingEnum.NOTHING);
  /** The blending mode for the highlight portion of the effect. */
  get highlightBlendMode(): (BlendMode | NothingEnum.NOTHING)[];
  set highlightBlendMode(value: BlendMode | NothingEnum.NOTHING);
  /** The opacity of the highlight portion of the effect (as a percentage). (Range: 0 to 100). */
  get highlightOpacity(): (number | NothingEnum.NOTHING)[];
  set highlightOpacity(value: number | NothingEnum.NOTHING);
  /** The {@link Swatch} applied to the shadow portion of the effect. */
  get shadowColor(): (Swatch | NothingEnum.NOTHING)[];
  set shadowColor(value: Swatch | string | NothingEnum.NOTHING);
  /** The blending mode for the shadow portion of the effect. */
  get shadowBlendMode(): (BlendMode | NothingEnum.NOTHING)[];
  set shadowBlendMode(value: BlendMode | NothingEnum.NOTHING);
  /** The opacity of the shadow portion of the effect (as a percentage). (Range: 0 to 100). */
  get shadowOpacity(): (number | NothingEnum.NOTHING)[];
  set shadowOpacity(value: number | NothingEnum.NOTHING);
  /** Resolves the proxy into the individual {@link FindChangeBevelAndEmbossSetting} objects it stands for. */
  getElements(): FindChangeBevelAndEmbossSetting[];
}
