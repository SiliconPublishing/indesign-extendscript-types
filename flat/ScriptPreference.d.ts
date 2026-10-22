/**
 * ScriptPreference.d.ts — indesign-uxp-types
 * Adobe InDesign 2026 (21.x) ExtendScript DOM declarations,
 * converted from indesign-uxp-types by tools/codemod.
 * Version: 1.0.0 · Updated: 2026-09-29
 * Author: Vlad Vladila (Krommatine Systems) · https://github.com/vamitul/indesign-uxp-types
 */
import type { Mode, Read } from './_base/Types';
import type { EventTargetDOMObject } from './_base/DomObjects';
import type { FilePath, File, Folder } from './_base/Types';
import type { Application } from './Application';
import type { AutoEnum } from './Enums/AutoEnum';
import type { MeasurementUnits } from './Enums/MeasurementUnits';
import type { UserInteractionLevels } from './Enums/UserInteractionLevels';
import type { EditionPart } from "./_base/Editions";
import type { PropertiesGetter } from './_base/Properties';
import type { PropertiesSetter } from './_base/Properties';
import type { Events } from './Events';
import type { EventListeners } from './EventListeners';
import type { InDesignEventMap } from './_base/Events';
import type { EventHandler } from './_base/Events';
import type { EventListener } from './EventListener';
import type { EventString } from './_base/Events';
import type { Event } from './Event';

/**
 * Settings controlling how scripts run — dialog/alert interaction level,
 * measurement units, and whether the screen redraws during execution.
 */
export interface ScriptPreference extends InDesignEdition.ScriptPreference, InDesignPlugins.ScriptPreference<'single'> {
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
  readonly parent: Application;
  /**
   * A snapshot of every editable property on this object.
   *
   * Reads its full state in one call rather than property-by-property.
   */
  get properties(): PropertiesGetter<ScriptPreference, 'single'>;
  /**
   * Sets multiple properties at once from an object literal, in a single call
   * to the native InDesign engine — much faster than assigning each property
   * individually.
   */
  set properties(value: PropertiesSetter<ScriptPreference, 'single'>);
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
  /** Resolves the proxy into the individual {@link ScriptPreference} objects it stands for. */
  getElements(): ScriptPreference[];
  /** The path to the Scripts folder for the application. */
  readonly scriptsFolder: Folder;
  /**
   * Every script in the Scripts folder, as `[id, file]` pairs.
   *
   * The id is colon-delimited, e.g. `Application:Community:Scripts Panel:BreakTextThread.jsx`.
   * The second element is the {@link File}.
   */
  readonly scriptsList: [string, File][];
  /** The version of the scripting environment. */
  get version(): string;
  set version(value: string);
  /** The measurement unit used during script processing. */
  get measurementUnit(): AutoEnum | MeasurementUnits;
  set measurementUnit(value: AutoEnum | MeasurementUnits);
  /** If true, enables redraw during script execution. */
  get enableRedraw(): boolean;
  set enableRedraw(value: boolean);
}

/**
 * Settings controlling how scripts run — dialog/alert interaction level,
 * measurement units, and whether the screen redraws during execution.
 */
export interface ScriptPreferencePlural extends InDesignEdition.ScriptPreferencePlural, InDesignPlugins.ScriptPreference<'plural'> {
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
  readonly parent: (Application)[];
  /**
   * A snapshot of every editable property on this object.
   *
   * Reads its full state in one call rather than property-by-property.
   */
  get properties(): (PropertiesGetter<ScriptPreferencePlural, 'plural'>)[];
  /**
   * Sets multiple properties at once from an object literal, in a single call
   * to the native InDesign engine — much faster than assigning each property
   * individually.
   */
  set properties(value: PropertiesSetter<ScriptPreferencePlural, 'plural'>);
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
  /** Resolves the proxy into the individual {@link ScriptPreference} objects it stands for. */
  getElements(): ScriptPreference[];
  /** The path to the Scripts folder for the application. */
  readonly scriptsFolder: (Folder)[];
  /**
   * Every script in the Scripts folder, as `[id, file]` pairs.
   *
   * The id is colon-delimited, e.g. `Application:Community:Scripts Panel:BreakTextThread.jsx`.
   * The second element is the {@link File}.
   */
  readonly scriptsList: ([string, File][])[];
  /** The version of the scripting environment. */
  get version(): (string)[];
  set version(value: string);
  /** The measurement unit used during script processing. */
  get measurementUnit(): (AutoEnum | MeasurementUnits)[];
  set measurementUnit(value: AutoEnum | MeasurementUnits);
  /** If true, enables redraw during script execution. */
  get enableRedraw(): (boolean)[];
  set enableRedraw(value: boolean);
}
/** ScriptPreference's members only InDesign desktop has, or has differently (tools/codemod/editions.mjs). */
export interface ScriptPreferenceDesktop {
  /** Controls the display of dialogs and alerts during script processing.
   * Desktop only: InDesign Server 21.6 does not have it. */
  get userInteractionLevel(): UserInteractionLevels;
  /**
   * Desktop only: InDesign Server 21.6 does not have it.
   */
  set userInteractionLevel(value: UserInteractionLevels);
}

/** ScriptPreference's members only InDesign desktop has, or has differently (tools/codemod/editions.mjs). */
export interface ScriptPreferenceDesktopPlural {
  /** Controls the display of dialogs and alerts during script processing.
   * Desktop only: InDesign Server 21.6 does not have it. */
  get userInteractionLevel(): (UserInteractionLevels)[];
  /**
   * Desktop only: InDesign Server 21.6 does not have it.
   */
  set userInteractionLevel(value: UserInteractionLevels);
}

/** ScriptPreference's members only InDesign Server has, or has differently (tools/codemod/editions.mjs). */
export interface ScriptPreferenceServer {
}

/** ScriptPreference's members only InDesign Server has, or has differently (tools/codemod/editions.mjs). */
export interface ScriptPreferenceServerPlural {
}

/** ScriptPreference's members as both InDesign desktop and InDesign Server have them (tools/codemod/editions.mjs). */
export interface ScriptPreferencePortable {
}

/** ScriptPreference's members as both InDesign desktop and InDesign Server have them (tools/codemod/editions.mjs). */
export interface ScriptPreferencePortablePlural {
}
