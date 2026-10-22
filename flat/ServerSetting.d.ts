import type { Read } from "./_base/Types";
import type { File } from "./_base/Types";
import type { Application } from "./Application";
import type { Mode } from "./_base/Types";
import type { EventTargetDOMObject } from "./_base/DomObjects";
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
 * ServerSetting.d.ts — generated from the InDesign Server 21.6 scripting dictionary by tools/codemod/fill.mjs.
 */

/**
 * Server specific runtime settings.
 */
export interface ServerSetting extends InDesignEdition.ServerSetting, InDesignPlugins.ServerSetting<'single'> {
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
  get properties(): PropertiesGetter<ServerSetting, 'single'>;
  /**
   * Sets multiple properties at once from an object literal, in a single call
   * to the native InDesign engine — much faster than assigning each property
   * individually.
   */
  set properties(value: PropertiesSetter<ServerSetting, 'single'>);
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
  /**
   * If true, output is going to a console window.
   * Generated from the InDesign Server 21.6 scripting dictionary.
   */
  readonly useConsole: boolean;
  /**
   * If true, install structured event handler.
   * Generated from the InDesign Server 21.6 scripting dictionary.
   */
  readonly useStructuredEventHandler: boolean;
  /**
   * If true, send crash log data to Adobe.
   * Generated from the InDesign Server 21.6 scripting dictionary.
   */
  readonly sendCrashLogs: boolean;
  /**
   * If true, output is redirected to the system event log.
   * Generated from the InDesign Server 21.6 scripting dictionary.
   */
  readonly useEventLog: boolean;
  /**
   * Location to write the IOR file for CORBA.
   * Generated from the InDesign Server 21.6 scripting dictionary.
   */
  readonly iorFile: File;
  /**
   * Additional paths from which to load plugins.
   * Generated from the InDesign Server 21.6 scripting dictionary.
   */
  readonly pluginPaths: File[];
  /**
   * The socket the server uses to service SOAP requests.
   * Generated from the InDesign Server 21.6 scripting dictionary.
   */
  readonly port: number;
  /**
   * The configuration name for this instance of the server.
   * Generated from the InDesign Server 21.6 scripting dictionary.
   */
  readonly configuration: string;
  /**
   * If true, client requests are executed on main thread only.
   * Generated from the InDesign Server 21.6 scripting dictionary.
   */
  readonly onMainThreadOnly: boolean;
  /**
   * If true, session support logging is enabled.
   * Generated from the InDesign Server 21.6 scripting dictionary.
   */
  readonly sessionSupportLoggingEnabled: boolean;
  /**
   * The session timeout (in seconds) for soap sessions.
   * Generated from the InDesign Server 21.6 scripting dictionary.
   */
  readonly sessionTimeout: number;
  /**
   * The socket the server uses to service administrative requests.
   * Generated from the InDesign Server 21.6 scripting dictionary.
   */
  readonly adminPort: number;
  /**
   * The name of the machine InDesignServer is running on; either symbolic (host.corp.com) or IP address (123.345.678.90).
   * Generated from the InDesign Server 21.6 scripting dictionary.
   */
  readonly hostName: string;
  /**
   * The time interval (in seconds) at which last active timestamp of IDS is updated to IDS console app.
   * Generated from the InDesign Server 21.6 scripting dictionary.
   */
  readonly heartbeatUpdateInterval: number;
  /**
   * If true, errors are saved in the error list.
   * Generated from the InDesign Server 21.6 scripting dictionary.
   */
  get useErrorList(): boolean;
  set useErrorList(value: boolean);
  /**
   * Maximum number of errors to save.
   * Generated from the InDesign Server 21.6 scripting dictionary.
   */
  get maximumErrors(): number;
  set maximumErrors(value: number);
  /**
   * If true, generates image previews.
   * Generated from the InDesign Server 21.6 scripting dictionary.
   */
  get imagePreview(): boolean;
  set imagePreview(value: boolean);
  /**
   * If true, makes the native JavaScript user interface available.
   * Generated from the InDesign Server 21.6 scripting dictionary.
   */
  get javascriptUi(): boolean;
  set javascriptUi(value: boolean);
  /**
   * If true, BeginSession requests are not blocked if no new session can be started currently (for cases when server is busy).
   * Generated from the InDesign Server 21.6 scripting dictionary.
   */
  get nonBlockingSessionSupport(): boolean;
  set nonBlockingSessionSupport(value: boolean);
  /**
   * The maximum time (in seconds) for which client wants to wait for BeginSession request to be serviced.
   * Generated from the InDesign Server 21.6 scripting dictionary.
   */
  get sessionSupportMaxWait(): number;
  set sessionSupportMaxWait(value: number);
  /** Resolves the proxy into the individual objects it stands for. */
  getElements(): ServerSetting[];
}

/**
 * ServerSetting.d.ts — generated from the InDesign Server 21.6 scripting dictionary by tools/codemod/fill.mjs.
 */
/**
 * Server specific runtime settings.
 */
export interface ServerSettingPlural extends InDesignEdition.ServerSettingPlural, InDesignPlugins.ServerSetting<'plural'> {
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
  get properties(): (PropertiesGetter<ServerSettingPlural, 'plural'>)[];
  /**
   * Sets multiple properties at once from an object literal, in a single call
   * to the native InDesign engine — much faster than assigning each property
   * individually.
   */
  set properties(value: PropertiesSetter<ServerSettingPlural, 'plural'>);
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
  /**
   * If true, output is going to a console window.
   * Generated from the InDesign Server 21.6 scripting dictionary.
   */
  readonly useConsole: (boolean)[];
  /**
   * If true, install structured event handler.
   * Generated from the InDesign Server 21.6 scripting dictionary.
   */
  readonly useStructuredEventHandler: (boolean)[];
  /**
   * If true, send crash log data to Adobe.
   * Generated from the InDesign Server 21.6 scripting dictionary.
   */
  readonly sendCrashLogs: (boolean)[];
  /**
   * If true, output is redirected to the system event log.
   * Generated from the InDesign Server 21.6 scripting dictionary.
   */
  readonly useEventLog: (boolean)[];
  /**
   * Location to write the IOR file for CORBA.
   * Generated from the InDesign Server 21.6 scripting dictionary.
   */
  readonly iorFile: (File)[];
  /**
   * Additional paths from which to load plugins.
   * Generated from the InDesign Server 21.6 scripting dictionary.
   */
  readonly pluginPaths: (File[])[];
  /**
   * The socket the server uses to service SOAP requests.
   * Generated from the InDesign Server 21.6 scripting dictionary.
   */
  readonly port: (number)[];
  /**
   * The configuration name for this instance of the server.
   * Generated from the InDesign Server 21.6 scripting dictionary.
   */
  readonly configuration: (string)[];
  /**
   * If true, client requests are executed on main thread only.
   * Generated from the InDesign Server 21.6 scripting dictionary.
   */
  readonly onMainThreadOnly: (boolean)[];
  /**
   * If true, session support logging is enabled.
   * Generated from the InDesign Server 21.6 scripting dictionary.
   */
  readonly sessionSupportLoggingEnabled: (boolean)[];
  /**
   * The session timeout (in seconds) for soap sessions.
   * Generated from the InDesign Server 21.6 scripting dictionary.
   */
  readonly sessionTimeout: (number)[];
  /**
   * The socket the server uses to service administrative requests.
   * Generated from the InDesign Server 21.6 scripting dictionary.
   */
  readonly adminPort: (number)[];
  /**
   * The name of the machine InDesignServer is running on; either symbolic (host.corp.com) or IP address (123.345.678.90).
   * Generated from the InDesign Server 21.6 scripting dictionary.
   */
  readonly hostName: (string)[];
  /**
   * The time interval (in seconds) at which last active timestamp of IDS is updated to IDS console app.
   * Generated from the InDesign Server 21.6 scripting dictionary.
   */
  readonly heartbeatUpdateInterval: (number)[];
  /**
   * If true, errors are saved in the error list.
   * Generated from the InDesign Server 21.6 scripting dictionary.
   */
  get useErrorList(): (boolean)[];
  set useErrorList(value: boolean);
  /**
   * Maximum number of errors to save.
   * Generated from the InDesign Server 21.6 scripting dictionary.
   */
  get maximumErrors(): (number)[];
  set maximumErrors(value: number);
  /**
   * If true, generates image previews.
   * Generated from the InDesign Server 21.6 scripting dictionary.
   */
  get imagePreview(): (boolean)[];
  set imagePreview(value: boolean);
  /**
   * If true, makes the native JavaScript user interface available.
   * Generated from the InDesign Server 21.6 scripting dictionary.
   */
  get javascriptUi(): (boolean)[];
  set javascriptUi(value: boolean);
  /**
   * If true, BeginSession requests are not blocked if no new session can be started currently (for cases when server is busy).
   * Generated from the InDesign Server 21.6 scripting dictionary.
   */
  get nonBlockingSessionSupport(): (boolean)[];
  set nonBlockingSessionSupport(value: boolean);
  /**
   * The maximum time (in seconds) for which client wants to wait for BeginSession request to be serviced.
   * Generated from the InDesign Server 21.6 scripting dictionary.
   */
  get sessionSupportMaxWait(): (number)[];
  set sessionSupportMaxWait(value: number);
  /** Resolves the proxy into the individual objects it stands for. */
  getElements(): ServerSetting[];
}
