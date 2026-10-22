/**
 * TimingGroup.d.ts — indesign-uxp-types
 * Adobe InDesign 2026 (21.x) ExtendScript DOM declarations,
 * converted from indesign-uxp-types by tools/codemod.
 * Version: 1.0.0 · Updated: 2026-09-29
 * Author: Vlad Vladila (Krommatine Systems) · https://github.com/vamitul/indesign-uxp-types
 */
import type { Mode, Read } from './_base/Types';
import type { EventTargetDOMObject, IndexedDOMObject } from './_base/DomObjects';
import type { TimingList } from './TimingList';
import type { TimingTargets } from './TimingTargets';
import type { TimingTarget } from './TimingTarget';
import type { LocationOptions } from './Enums/LocationOptions';
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

/**
 * An ordered group of {@link TimingTarget}s within a {@link TimingList} that
 * play together (simultaneously), optionally looping.
 */
export interface TimingGroup extends InDesignEdition.TimingGroup, InDesignPlugins.TimingGroup<'single'> {
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
  readonly parent: TimingList;
  /**
   * A snapshot of every editable property on this object.
   *
   * Reads its full state in one call rather than property-by-property.
   */
  get properties(): PropertiesGetter<TimingGroup, 'single'>;
  /**
   * Sets multiple properties at once from an object literal, in a single call
   * to the native InDesign engine — much faster than assigning each property
   * individually.
   */
  set properties(value: PropertiesSetter<TimingGroup, 'single'>);
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
   * The index of the object within its containing parent.
   */
  readonly index: number;
  /** Resolves the proxy into the individual {@link TimingGroup} objects it stands for. */
  getElements(): TimingGroup[];
  /** {@link TimingTargets} owned by this group. */
  readonly timingTargets: TimingTargets;
  /** This group's position within its parent {@link TimingList}. */
  get placement(): number;
  set placement(value: number);
  /** How many times this group plays. Range `1`–`100`. */
  get plays(): number;
  set plays(value: number);
  /** Whether this group loops indefinitely instead of stopping after {@link plays}. */
  get playsLoop(): boolean;
  set playsLoop(value: boolean);
  /** Deletes the timing group. */
  remove(): void;
  /** Unlinks every target in this group into separate single-target groups within the same {@link TimingList}. */
  unlink(): void;
  /**
   * Moves the timing group to a new location.
   * @param to The location relative to `reference`, or within the containing object.
   * @param reference The reference object. Required when `to` is {@link LocationOptions.BEFORE} or {@link LocationOptions.AFTER}.
   */
  move(to: LocationOptions, reference?: TimingGroup | TimingTarget | TimingList): TimingGroup;
}

/**
 * An ordered group of {@link TimingTarget}s within a {@link TimingList} that
 * play together (simultaneously), optionally looping.
 */
export interface TimingGroupPlural extends InDesignEdition.TimingGroupPlural, InDesignPlugins.TimingGroup<'plural'> {
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
  readonly parent: (TimingList)[];
  /**
   * A snapshot of every editable property on this object.
   *
   * Reads its full state in one call rather than property-by-property.
   */
  get properties(): (PropertiesGetter<TimingGroupPlural, 'plural'>)[];
  /**
   * Sets multiple properties at once from an object literal, in a single call
   * to the native InDesign engine — much faster than assigning each property
   * individually.
   */
  set properties(value: PropertiesSetter<TimingGroupPlural, 'plural'>);
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
   * The index of the object within its containing parent.
   */
  readonly index: (number)[];
  /** Resolves the proxy into the individual {@link TimingGroup} objects it stands for. */
  getElements(): TimingGroup[];
  /** {@link TimingTargets} owned by this group. */
  readonly timingTargets: TimingTargets;
  /** This group's position within its parent {@link TimingList}. */
  get placement(): (number)[];
  set placement(value: number);
  /** How many times this group plays. Range `1`–`100`. */
  get plays(): (number)[];
  set plays(value: number);
  /** Whether this group loops indefinitely instead of stopping after {@link plays}. */
  get playsLoop(): (boolean)[];
  set playsLoop(value: boolean);
  /** Deletes the timing group. */
  remove(): (void)[];
  /** Unlinks every target in this group into separate single-target groups within the same {@link TimingList}. */
  unlink(): (void)[];
  /**
   * Moves the timing group to a new location.
   * @param to The location relative to `reference`, or within the containing object.
   * @param reference The reference object. Required when `to` is {@link LocationOptions.BEFORE} or {@link LocationOptions.AFTER}.
   */
  move(to: LocationOptions, reference?: TimingGroup | TimingTarget | TimingList): (TimingGroup)[];
}
