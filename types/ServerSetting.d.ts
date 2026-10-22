import type { Read } from "./_base/Types";
import type { File } from "./_base/Types";
import type { Application } from "./Application";
import type { Mode } from "./_base/Types";
import type { EventTargetDOMObject } from "./_base/DomObjects";

/**
 * ServerSetting.d.ts — generated from the InDesign Server 21.6 scripting dictionary by tools/codemod/fill.mjs.
 */

/**
 * Server specific runtime settings.
 */
export interface ServerSetting<M extends Mode = 'single'> extends EventTargetDOMObject<Application, M>, InDesignEdition.ServerSetting<M>, InDesignPlugins.ServerSetting<M> {
  /**
   * If true, output is going to a console window.
   * Generated from the InDesign Server 21.6 scripting dictionary.
   */
  readonly useConsole: Read<M, boolean>;

  /**
   * If true, install structured event handler.
   * Generated from the InDesign Server 21.6 scripting dictionary.
   */
  readonly useStructuredEventHandler: Read<M, boolean>;

  /**
   * If true, send crash log data to Adobe.
   * Generated from the InDesign Server 21.6 scripting dictionary.
   */
  readonly sendCrashLogs: Read<M, boolean>;

  /**
   * If true, output is redirected to the system event log.
   * Generated from the InDesign Server 21.6 scripting dictionary.
   */
  readonly useEventLog: Read<M, boolean>;

  /**
   * Location to write the IOR file for CORBA.
   * Generated from the InDesign Server 21.6 scripting dictionary.
   */
  readonly iorFile: Read<M, File>;

  /**
   * Additional paths from which to load plugins.
   * Generated from the InDesign Server 21.6 scripting dictionary.
   */
  readonly pluginPaths: Read<M, File[]>;

  /**
   * The socket the server uses to service SOAP requests.
   * Generated from the InDesign Server 21.6 scripting dictionary.
   */
  readonly port: Read<M, number>;

  /**
   * The configuration name for this instance of the server.
   * Generated from the InDesign Server 21.6 scripting dictionary.
   */
  readonly configuration: Read<M, string>;

  /**
   * If true, client requests are executed on main thread only.
   * Generated from the InDesign Server 21.6 scripting dictionary.
   */
  readonly onMainThreadOnly: Read<M, boolean>;

  /**
   * If true, session support logging is enabled.
   * Generated from the InDesign Server 21.6 scripting dictionary.
   */
  readonly sessionSupportLoggingEnabled: Read<M, boolean>;

  /**
   * The session timeout (in seconds) for soap sessions.
   * Generated from the InDesign Server 21.6 scripting dictionary.
   */
  readonly sessionTimeout: Read<M, number>;

  /**
   * The socket the server uses to service administrative requests.
   * Generated from the InDesign Server 21.6 scripting dictionary.
   */
  readonly adminPort: Read<M, number>;

  /**
   * The name of the machine InDesignServer is running on; either symbolic (host.corp.com) or IP address (123.345.678.90).
   * Generated from the InDesign Server 21.6 scripting dictionary.
   */
  readonly hostName: Read<M, string>;

  /**
   * The time interval (in seconds) at which last active timestamp of IDS is updated to IDS console app.
   * Generated from the InDesign Server 21.6 scripting dictionary.
   */
  readonly heartbeatUpdateInterval: Read<M, number>;

  /**
   * If true, errors are saved in the error list.
   * Generated from the InDesign Server 21.6 scripting dictionary.
   */
  get useErrorList(): Read<M, boolean>;
  set useErrorList(value: boolean);

  /**
   * Maximum number of errors to save.
   * Generated from the InDesign Server 21.6 scripting dictionary.
   */
  get maximumErrors(): Read<M, number>;
  set maximumErrors(value: number);

  /**
   * If true, generates image previews.
   * Generated from the InDesign Server 21.6 scripting dictionary.
   */
  get imagePreview(): Read<M, boolean>;
  set imagePreview(value: boolean);

  /**
   * If true, makes the native JavaScript user interface available.
   * Generated from the InDesign Server 21.6 scripting dictionary.
   */
  get javascriptUi(): Read<M, boolean>;
  set javascriptUi(value: boolean);

  /**
   * If true, BeginSession requests are not blocked if no new session can be started currently (for cases when server is busy).
   * Generated from the InDesign Server 21.6 scripting dictionary.
   */
  get nonBlockingSessionSupport(): Read<M, boolean>;
  set nonBlockingSessionSupport(value: boolean);

  /**
   * The maximum time (in seconds) for which client wants to wait for BeginSession request to be serviced.
   * Generated from the InDesign Server 21.6 scripting dictionary.
   */
  get sessionSupportMaxWait(): Read<M, number>;
  set sessionSupportMaxWait(value: number);

  /** Resolves the proxy into the individual objects it stands for. */
  getElements(): ServerSetting<'single'>[];
}
