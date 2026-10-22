/**
 * PrintEvent.d.ts — indesign-uxp-types
 * Adobe InDesign 2026 (21.x) ExtendScript DOM declarations,
 * converted from indesign-uxp-types by tools/codemod.
 * Version: 1.0.0 · Updated: 2026-09-29
 * Author: Vlad Vladila (Krommatine Systems) · https://github.com/vamitul/indesign-uxp-types
 */
import type { Mode, Read } from './_base/Types';
import type { Event } from './Event';
import type { Document } from './Document';
import type { DocumentPrintUiOptions } from './Enums/DocumentPrintUiOptions';
import type { LayoutWindow } from './LayoutWindow';
import type { PropertiesGetter } from './_base/Properties';
import type { PropertiesSetter } from './_base/Properties';
import type { EventString } from './_base/DomObjects';
import type { EventPhases } from './Enums/EventPhases';

/**
 * An event dispatched before or after a document is printed.
 */
export interface PrintEvent extends InDesignPlugins.PrintEvent<'single'> {
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
   * A snapshot of every editable property on this object.
   *
   * Reads its full state in one call rather than property-by-property.
   */
  get properties(): PropertiesGetter<PrintEvent, 'single'>;
  /**
   * Sets multiple properties at once from an object literal, in a single call
   * to the native InDesign engine — much faster than assigning each property
   * individually.
   */
  set properties(value: PropertiesSetter<PrintEvent, 'single'>);
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
  /** The unique ID of the Event. */
  readonly id: number;
  /** The name of the event. Well-known names are typed; custom names also flow through. */
  readonly eventType: EventString;
  /**
   * The object the event was originally dispatched on.
   *
   * `unknown` because it varies by event: the document save and export events report the
   * {@link Document}, while `afterSelectionChanged` reports the {@link LayoutWindow}. Narrow it
   * before use — `instanceof` on the value, or a check against the object you expect.
   * The event names whose target has been measured say so in their own description.
   */
  readonly target: unknown;
  /** The object currently being visited during event propagation. */
  readonly currentTarget: unknown;
  /** The current propagation phase of the event. */
  readonly eventPhase: EventPhases;
  /** If `true`, the event supports the bubbling phase of propagation. */
  readonly bubbles: boolean;
  /** If `true`, {@link preventDefault} can cancel the event's default behavior on its target. */
  readonly cancelable: boolean;
  /** The time the event was initialized. */
  readonly timeStamp: Date;
  /** If `true`, propagation beyond the current target has been stopped via {@link stopPropagation}. */
  readonly propagationStopped: boolean;
  /** If `true`, the default behavior on the target has been canceled via {@link preventDefault}. */
  readonly defaultPrevented: boolean;
  /** Stops propagation of the event beyond the current target. */
  stopPropagation(): void;
  /** Cancels the default behavior of the event on its target. Only has an effect when {@link cancelable} is `true`. */
  preventDefault(): void;
  /** Resolves the proxy into the individual {@link PrintEvent} objects it stands for. */
  getElements(): PrintEvent[];
  readonly parent: Document;
  /** How much of the print dialog is suppressed — see {@link DocumentPrintUiOptions}. */
  get documentPrintUiOption(): DocumentPrintUiOptions | DocumentPrintUiOptions[];
  set documentPrintUiOption(value: DocumentPrintUiOptions | DocumentPrintUiOptions[]);
}

/**
 * An event dispatched before or after a document is printed.
 */
export interface PrintEventPlural extends InDesignPlugins.PrintEvent<'plural'> {
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
   * A snapshot of every editable property on this object.
   *
   * Reads its full state in one call rather than property-by-property.
   */
  get properties(): (PropertiesGetter<PrintEventPlural, 'plural'>)[];
  /**
   * Sets multiple properties at once from an object literal, in a single call
   * to the native InDesign engine — much faster than assigning each property
   * individually.
   */
  set properties(value: PropertiesSetter<PrintEventPlural, 'plural'>);
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
  /** The unique ID of the Event. */
  readonly id: (number)[];
  /** The name of the event. Well-known names are typed; custom names also flow through. */
  readonly eventType: (EventString)[];
  /**
   * The object the event was originally dispatched on.
   *
   * `unknown` because it varies by event: the document save and export events report the
   * {@link Document}, while `afterSelectionChanged` reports the {@link LayoutWindow}. Narrow it
   * before use — `instanceof` on the value, or a check against the object you expect.
   * The event names whose target has been measured say so in their own description.
   */
  readonly target: (unknown)[];
  /** The object currently being visited during event propagation. */
  readonly currentTarget: (unknown)[];
  /** The current propagation phase of the event. */
  readonly eventPhase: (EventPhases)[];
  /** If `true`, the event supports the bubbling phase of propagation. */
  readonly bubbles: (boolean)[];
  /** If `true`, {@link preventDefault} can cancel the event's default behavior on its target. */
  readonly cancelable: (boolean)[];
  /** The time the event was initialized. */
  readonly timeStamp: (Date)[];
  /** If `true`, propagation beyond the current target has been stopped via {@link stopPropagation}. */
  readonly propagationStopped: (boolean)[];
  /** If `true`, the default behavior on the target has been canceled via {@link preventDefault}. */
  readonly defaultPrevented: (boolean)[];
  /** Stops propagation of the event beyond the current target. */
  stopPropagation(): (void)[];
  /** Cancels the default behavior of the event on its target. Only has an effect when {@link cancelable} is `true`. */
  preventDefault(): (void)[];
  /** Resolves the proxy into the individual {@link PrintEvent} objects it stands for. */
  getElements(): PrintEvent[];
  readonly parent: (Document)[];
  /** How much of the print dialog is suppressed — see {@link DocumentPrintUiOptions}. */
  get documentPrintUiOption(): (DocumentPrintUiOptions | DocumentPrintUiOptions[])[];
  set documentPrintUiOption(value: DocumentPrintUiOptions | DocumentPrintUiOptions[]);
}
