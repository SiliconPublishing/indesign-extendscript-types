/**
 * Gradient.d.ts — indesign-uxp-types
 * Adobe InDesign 2026 (21.x) ExtendScript DOM declarations,
 * converted from indesign-uxp-types by tools/codemod.
 * Version: 1.0.0 · Updated: 2026-09-29
 * Author: Vlad Vladila (Krommatine Systems) · https://github.com/vamitul/indesign-uxp-types
 */
import type { Mode, Read } from './_base/Types';
import type { Swatch } from './Swatch';
import type { GradientStops } from './GradientStops';
import type { GradientType } from './Enums/GradientType';
import type { ColorGroup } from './ColorGroup';
import type { GradientStop } from './GradientStop';
import type { Events } from './Events';
import type { EventListeners } from './EventListeners';
import type { InDesignEventMap } from './_base/Events';
import type { EventHandler } from './_base/Events';
import type { EventListener } from './EventListener';
import type { EventString } from './_base/Events';
import type { Event } from './Event';
import type { FilePath } from './_base/Types';
import type { PropertiesGetter } from './_base/Properties';
import type { PropertiesSetter } from './_base/Properties';
import type { SwatchReference } from './_base/Unions';
import type { SwatchParent } from './_base/Parents';

/**
 * A gradient swatch, blending between the colors of its {@link gradientStops}.
 */
export interface Gradient extends InDesignEdition.Gradient, InDesignPlugins.Gradient<'single'> {
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
   * A property that can be set to any string.
   * Note: In InDesign's UI this is user viewable and modifiable via the Script Label panel.
   */
  get label(): string;
  set label(value: string);
  /**
   * Sets the label to the value associated with the specified key.
   */
  insertLabel(key: string, value: string): void;
  /**
   * Gets the label value associated with the specified key.
   */
  extractLabel(key: string): string;
  /**
   * The index of the object within its containing parent.
   */
  readonly index: number;
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
  readonly parent: SwatchParent;
  /**
   * A snapshot of every editable property on this object.
   *
   * Reads its full state in one call rather than property-by-property.
   */
  get properties(): PropertiesGetter<Gradient, 'single'>;
  /**
   * Sets multiple properties at once from an object literal, in a single call
   * to the native InDesign engine — much faster than assigning each property
   * individually.
   */
  set properties(value: PropertiesSetter<Gradient, 'single'>);
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
   * The name of the object, and what the containing collection's `itemByName` looks up.
   */
  get name(): string;
  set name(value: string);
  /** The unique ID of the swatch, stable across saves and reopens. */
  readonly id: number;
  /** The {@link ColorGroup} the swatch belongs to, if any. */
  readonly parentColorGroup: ColorGroup | null;
  /**
   * Deletes the swatch.
   * @param replacingWith The swatch to apply in place of the deleted swatch, wherever it was in use.
   */
  remove(replacingWith?: Swatch | string): void;
  /** Merges the given swatches into this one, deleting them and reassigning their usages. */
  merge(withSwatches: Swatch[] | SwatchReference): Swatch;
  /** Resolves the proxy into the individual {@link Gradient} objects it stands for. */
  getElements(): Gradient[];
  /** The {@link GradientStop} collection defining the gradient's colors and positions. */
  readonly gradientStops: GradientStops;
  /** Whether the gradient blends linearly or radially. */
  get type(): GradientType;
  set type(value: GradientType);
  /** Duplicates the gradient. */
  duplicate(): Gradient;
}

/**
 * A gradient swatch, blending between the colors of its {@link gradientStops}.
 */
export interface GradientPlural extends InDesignEdition.GradientPlural, InDesignPlugins.Gradient<'plural'> {
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
   * A property that can be set to any string.
   * Note: In InDesign's UI this is user viewable and modifiable via the Script Label panel.
   */
  get label(): (string)[];
  set label(value: string);
  /**
   * Sets the label to the value associated with the specified key.
   */
  insertLabel(key: string, value: string): (void)[];
  /**
   * Gets the label value associated with the specified key.
   */
  extractLabel(key: string): (string)[];
  /**
   * The index of the object within its containing parent.
   */
  readonly index: (number)[];
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
  readonly parent: (SwatchParent)[];
  /**
   * A snapshot of every editable property on this object.
   *
   * Reads its full state in one call rather than property-by-property.
   */
  get properties(): (PropertiesGetter<GradientPlural, 'plural'>)[];
  /**
   * Sets multiple properties at once from an object literal, in a single call
   * to the native InDesign engine — much faster than assigning each property
   * individually.
   */
  set properties(value: PropertiesSetter<GradientPlural, 'plural'>);
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
   * The name of the object, and what the containing collection's `itemByName` looks up.
   */
  get name(): (string)[];
  set name(value: string);
  /** The unique ID of the swatch, stable across saves and reopens. */
  readonly id: (number)[];
  /** The {@link ColorGroup} the swatch belongs to, if any. */
  readonly parentColorGroup: (ColorGroup | null)[];
  /**
   * Deletes the swatch.
   * @param replacingWith The swatch to apply in place of the deleted swatch, wherever it was in use.
   */
  remove(replacingWith?: Swatch | string): (void)[];
  /** Merges the given swatches into this one, deleting them and reassigning their usages. */
  merge(withSwatches: Swatch[] | SwatchReference): (Swatch)[];
  /** Resolves the proxy into the individual {@link Gradient} objects it stands for. */
  getElements(): Gradient[];
  /** The {@link GradientStop} collection defining the gradient's colors and positions. */
  readonly gradientStops: GradientStops;
  /** Whether the gradient blends linearly or radially. */
  get type(): (GradientType)[];
  set type(value: GradientType);
  /** Duplicates the gradient. */
  duplicate(): (Gradient)[];
}
