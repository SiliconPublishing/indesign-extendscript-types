/**
 * FrameFittingOption.d.ts — indesign-uxp-types
 * Adobe InDesign 2026 (21.x) ExtendScript DOM declarations,
 * converted from indesign-uxp-types by tools/codemod.
 * Version: 1.0.0 · Updated: 2026-09-29
 * Author: Vlad Vladila (Krommatine Systems) · https://github.com/vamitul/indesign-uxp-types
 */
import type { Mode, Read } from './_base/Types';
import type { EventTargetDOMObject } from './_base/DomObjects';
import type { MeasurementValue } from './_base/Types';
import type { Application } from './Application';
import type { Document } from './Document';
import type { ObjectStyle } from './ObjectStyle';
import type { Oval } from './Oval';
import type { Polygon } from './Polygon';
import type { Rectangle } from './Rectangle';
import type { AnchorPoint } from './Enums/AnchorPoint';
import type { EmptyFrameFittingOptions } from './Enums/EmptyFrameFittingOptions';
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
 * Options for fitting placed or pasted content in a frame.
 */
export interface FrameFittingOption extends InDesignEdition.FrameFittingOption, InDesignPlugins.FrameFittingOption<'single'> {
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
  readonly parent: ObjectStyle | Oval | Rectangle | Polygon | Application | Document;
  /**
   * A snapshot of every editable property on this object.
   *
   * Reads its full state in one call rather than property-by-property.
   */
  get properties(): PropertiesGetter<FrameFittingOption, 'single'>;
  /**
   * Sets multiple properties at once from an object literal, in a single call
   * to the native InDesign engine — much faster than assigning each property
   * individually.
   */
  set properties(value: PropertiesSetter<FrameFittingOption, 'single'>);
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
  /** Resolves the proxy into the individual {@link FrameFittingOption} objects it stands for. */
  getElements(): FrameFittingOption[];
  /** If true, the last saved fitting options will be applied to the contents of a frame when it is resized. */
  get autoFit(): boolean;
  set autoFit(value: boolean);
  /** The amount in measurement units to crop the left edge of a graphic. */
  get leftCrop(): number;
  set leftCrop(value: MeasurementValue | NothingEnum.NOTHING);
  /** The amount in measurement units to crop the top edge of a graphic. */
  get topCrop(): number;
  set topCrop(value: MeasurementValue | NothingEnum.NOTHING);
  /** The amount in measurement units to crop the right edge of a graphic. */
  get rightCrop(): number;
  set rightCrop(value: MeasurementValue | NothingEnum.NOTHING);
  /** The amount in measurement units to crop the bottom edge of a graphic. */
  get bottomCrop(): number;
  set bottomCrop(value: MeasurementValue | NothingEnum.NOTHING);
  /** The frame fitting option to apply to placed or pasted content if the frame is empty. Can be applied to a frame, object style, or document or to the application. */
  get fittingOnEmptyFrame(): EmptyFrameFittingOptions;
  set fittingOnEmptyFrame(value: EmptyFrameFittingOptions);
  /** The anchor point content aligns to when fitted into the frame. */
  get fittingAlignment(): AnchorPoint;
  set fittingAlignment(value: AnchorPoint);
}

/**
 * Options for fitting placed or pasted content in a frame.
 */
export interface FrameFittingOptionPlural extends InDesignEdition.FrameFittingOptionPlural, InDesignPlugins.FrameFittingOption<'plural'> {
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
  readonly parent: (ObjectStyle | Oval | Rectangle | Polygon | Application | Document)[];
  /**
   * A snapshot of every editable property on this object.
   *
   * Reads its full state in one call rather than property-by-property.
   */
  get properties(): (PropertiesGetter<FrameFittingOptionPlural, 'plural'>)[];
  /**
   * Sets multiple properties at once from an object literal, in a single call
   * to the native InDesign engine — much faster than assigning each property
   * individually.
   */
  set properties(value: PropertiesSetter<FrameFittingOptionPlural, 'plural'>);
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
  /** Resolves the proxy into the individual {@link FrameFittingOption} objects it stands for. */
  getElements(): FrameFittingOption[];
  /** If true, the last saved fitting options will be applied to the contents of a frame when it is resized. */
  get autoFit(): (boolean)[];
  set autoFit(value: boolean);
  /** The amount in measurement units to crop the left edge of a graphic. */
  get leftCrop(): (number)[];
  set leftCrop(value: MeasurementValue | NothingEnum.NOTHING);
  /** The amount in measurement units to crop the top edge of a graphic. */
  get topCrop(): (number)[];
  set topCrop(value: MeasurementValue | NothingEnum.NOTHING);
  /** The amount in measurement units to crop the right edge of a graphic. */
  get rightCrop(): (number)[];
  set rightCrop(value: MeasurementValue | NothingEnum.NOTHING);
  /** The amount in measurement units to crop the bottom edge of a graphic. */
  get bottomCrop(): (number)[];
  set bottomCrop(value: MeasurementValue | NothingEnum.NOTHING);
  /** The frame fitting option to apply to placed or pasted content if the frame is empty. Can be applied to a frame, object style, or document or to the application. */
  get fittingOnEmptyFrame(): (EmptyFrameFittingOptions)[];
  set fittingOnEmptyFrame(value: EmptyFrameFittingOptions);
  /** The anchor point content aligns to when fitted into the frame. */
  get fittingAlignment(): (AnchorPoint)[];
  set fittingAlignment(value: AnchorPoint);
}
