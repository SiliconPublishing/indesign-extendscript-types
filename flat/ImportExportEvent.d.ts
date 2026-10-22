/**
 * ImportExportEvent.d.ts — indesign-uxp-types
 * Adobe InDesign 2026 (21.x) ExtendScript DOM declarations,
 * converted from indesign-uxp-types by tools/codemod.
 * Version: 1.0.0 · Updated: 2026-09-29
 * Author: Vlad Vladila (Krommatine Systems) · https://github.com/vamitul/indesign-uxp-types
 */
import type { Mode, Read } from './_base/Types';
import type { Event } from './Event';
import type { DocumentOrApplication } from './_base/Parents';
import type { File } from './_base/Types';
import type { UserInteractionLevels } from './Enums/UserInteractionLevels';
import type { Document } from './Document';
import type { LayoutWindow } from './LayoutWindow';
import type { EditionPart } from "./_base/Editions";
import type { PropertiesGetter } from './_base/Properties';
import type { PropertiesSetter } from './_base/Properties';
import type { EventString } from './_base/DomObjects';
import type { EventPhases } from './Enums/EventPhases';

/**
 * An event dispatched before or after a file is imported into, or exported from, a document.
 */
export interface ImportExportEvent extends InDesignEdition.ImportExportEvent, InDesignPlugins.ImportExportEvent<'single'> {
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
  get properties(): PropertiesGetter<ImportExportEvent, 'single'>;
  /**
   * Sets multiple properties at once from an object literal, in a single call
   * to the native InDesign engine — much faster than assigning each property
   * individually.
   */
  set properties(value: PropertiesSetter<ImportExportEvent, 'single'>);
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
  /** Resolves the proxy into the individual {@link ImportExportEvent} objects it stands for. */
  getElements(): ImportExportEvent[];
  readonly parent: DocumentOrApplication;
  /** The full path to the imported or exported file, including its name. */
  readonly fullName: File;
  /** The import/export file format. */
  readonly format: string;
}

/**
 * An event dispatched before or after a file is imported into, or exported from, a document.
 */
export interface ImportExportEventPlural extends InDesignEdition.ImportExportEventPlural, InDesignPlugins.ImportExportEvent<'plural'> {
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
  get properties(): (PropertiesGetter<ImportExportEventPlural, 'plural'>)[];
  /**
   * Sets multiple properties at once from an object literal, in a single call
   * to the native InDesign engine — much faster than assigning each property
   * individually.
   */
  set properties(value: PropertiesSetter<ImportExportEventPlural, 'plural'>);
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
  /** Resolves the proxy into the individual {@link ImportExportEvent} objects it stands for. */
  getElements(): ImportExportEvent[];
  readonly parent: (DocumentOrApplication)[];
  /** The full path to the imported or exported file, including its name. */
  readonly fullName: (File)[];
  /** The import/export file format. */
  readonly format: (string)[];
}
/** ImportExportEvent's members only InDesign desktop has, or has differently (tools/codemod/editions.mjs). */
export interface ImportExportEventDesktop {
  /** Controls the display of dialogs and alerts while this event's handler runs.
   * Desktop only: InDesign Server 21.6 does not have it. */
  get userInteractionLevel(): UserInteractionLevels;
  /**
   * Desktop only: InDesign Server 21.6 does not have it.
   */
  set userInteractionLevel(value: UserInteractionLevels);
}

/** ImportExportEvent's members only InDesign desktop has, or has differently (tools/codemod/editions.mjs). */
export interface ImportExportEventDesktopPlural {
  /** Controls the display of dialogs and alerts while this event's handler runs.
   * Desktop only: InDesign Server 21.6 does not have it. */
  get userInteractionLevel(): (UserInteractionLevels)[];
  /**
   * Desktop only: InDesign Server 21.6 does not have it.
   */
  set userInteractionLevel(value: UserInteractionLevels);
}

/** ImportExportEvent's members only InDesign Server has, or has differently (tools/codemod/editions.mjs). */
export interface ImportExportEventServer {
}

/** ImportExportEvent's members only InDesign Server has, or has differently (tools/codemod/editions.mjs). */
export interface ImportExportEventServerPlural {
}

/** ImportExportEvent's members as both InDesign desktop and InDesign Server have them (tools/codemod/editions.mjs). */
export interface ImportExportEventPortable {
}

/** ImportExportEvent's members as both InDesign desktop and InDesign Server have them (tools/codemod/editions.mjs). */
export interface ImportExportEventPortablePlural {
}
