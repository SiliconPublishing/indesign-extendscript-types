/**
 * ObjectStyleContentEffectsCategorySettings.d.ts — indesign-uxp-types
 * Adobe InDesign 2026 (21.x) ExtendScript DOM declarations,
 * converted from indesign-uxp-types by tools/codemod.
 * Version: 1.0.0 · Updated: 2026-09-29
 * Author: Vlad Vladila (Krommatine Systems) · https://github.com/vamitul/indesign-uxp-types
 */
import type { Mode, Read } from './_base/Types';
import type { EventTargetDOMObject } from './_base/DomObjects';
import type { ObjectStyle } from './ObjectStyle';
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
 * Which effect categories an {@link ObjectStyle} enables for an object's placed
 * content, independently of the object itself, its stroke, or its fill.
 */
export interface ObjectStyleContentEffectsCategorySettings {
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
  readonly parent: ObjectStyle;
  /**
   * A snapshot of every editable property on this object.
   *
   * Reads its full state in one call rather than property-by-property.
   */
  get properties(): PropertiesGetter<ObjectStyleContentEffectsCategorySettings, 'single'>;
  /**
   * Sets multiple properties at once from an object literal, in a single call
   * to the native InDesign engine — much faster than assigning each property
   * individually.
   */
  set properties(value: PropertiesSetter<ObjectStyleContentEffectsCategorySettings, 'single'>);
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
  /** Resolves the proxy into the individual {@link ObjectStyleContentEffectsCategorySettings} objects it stands for. */
  getElements(): ObjectStyleContentEffectsCategorySettings[];
  /** If true, the object style will apply transparency settings. */
  get enableTransparency(): boolean;
  set enableTransparency(value: boolean);
  /** If true, the object style will apply drop shadows. */
  get enableDropShadow(): boolean;
  set enableDropShadow(value: boolean);
  /** If true, the object style will apply feathering. */
  get enableFeather(): boolean;
  set enableFeather(value: boolean);
  /** If true, the object style will apply inner shadows. */
  get enableInnerShadow(): boolean;
  set enableInnerShadow(value: boolean);
  /** If true, the object style will apply outer glow. */
  get enableOuterGlow(): boolean;
  set enableOuterGlow(value: boolean);
  /** If true, the object style will apply inner glow. */
  get enableInnerGlow(): boolean;
  set enableInnerGlow(value: boolean);
  /** If true, the object style will apply bevel emboss. */
  get enableBevelEmboss(): boolean;
  set enableBevelEmboss(value: boolean);
  /** If true, the object style will apply satin. */
  get enableSatin(): boolean;
  set enableSatin(value: boolean);
  /** If true, the object style will apply directional feathering. */
  get enableDirectionalFeather(): boolean;
  set enableDirectionalFeather(value: boolean);
  /** If true, the object style will apply gradient feathering. */
  get enableGradientFeather(): boolean;
  set enableGradientFeather(value: boolean);
}

/**
 * Which effect categories an {@link ObjectStyle} enables for an object's placed
 * content, independently of the object itself, its stroke, or its fill.
 */
export interface ObjectStyleContentEffectsCategorySettingsPlural {
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
  readonly parent: (ObjectStyle)[];
  /**
   * A snapshot of every editable property on this object.
   *
   * Reads its full state in one call rather than property-by-property.
   */
  get properties(): (PropertiesGetter<ObjectStyleContentEffectsCategorySettingsPlural, 'plural'>)[];
  /**
   * Sets multiple properties at once from an object literal, in a single call
   * to the native InDesign engine — much faster than assigning each property
   * individually.
   */
  set properties(value: PropertiesSetter<ObjectStyleContentEffectsCategorySettingsPlural, 'plural'>);
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
  /** Resolves the proxy into the individual {@link ObjectStyleContentEffectsCategorySettings} objects it stands for. */
  getElements(): ObjectStyleContentEffectsCategorySettings[];
  /** If true, the object style will apply transparency settings. */
  get enableTransparency(): (boolean)[];
  set enableTransparency(value: boolean);
  /** If true, the object style will apply drop shadows. */
  get enableDropShadow(): (boolean)[];
  set enableDropShadow(value: boolean);
  /** If true, the object style will apply feathering. */
  get enableFeather(): (boolean)[];
  set enableFeather(value: boolean);
  /** If true, the object style will apply inner shadows. */
  get enableInnerShadow(): (boolean)[];
  set enableInnerShadow(value: boolean);
  /** If true, the object style will apply outer glow. */
  get enableOuterGlow(): (boolean)[];
  set enableOuterGlow(value: boolean);
  /** If true, the object style will apply inner glow. */
  get enableInnerGlow(): (boolean)[];
  set enableInnerGlow(value: boolean);
  /** If true, the object style will apply bevel emboss. */
  get enableBevelEmboss(): (boolean)[];
  set enableBevelEmboss(value: boolean);
  /** If true, the object style will apply satin. */
  get enableSatin(): (boolean)[];
  set enableSatin(value: boolean);
  /** If true, the object style will apply directional feathering. */
  get enableDirectionalFeather(): (boolean)[];
  set enableDirectionalFeather(value: boolean);
  /** If true, the object style will apply gradient feathering. */
  get enableGradientFeather(): (boolean)[];
  set enableGradientFeather(value: boolean);
}
