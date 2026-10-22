import type { Read } from "./_base/Types";
import type { HTTPLinkResolution } from "./Enums/HTTPLinkResolution";
import type { Application } from "./Application";
import type { Mode } from "./_base/Types";
import type { EventTargetDOMObject } from "./_base/DomObjects";

/**
 * HTTPLinkPreferences.d.ts — generated from the InDesign 21.6 scripting dictionary by tools/codemod/fill.mjs.
 */

/**
 * HTTP link preferences.
 */
export interface HTTPLinkPreferences<M extends Mode = 'single'> extends EventTargetDOMObject<Application, M> {
  /**
   * HTTP link resolution to use.
   * Generated from the InDesign 21.6 scripting dictionary.
   */
  get linkResolution(): Read<M, HTTPLinkResolution>;
  set linkResolution(value: HTTPLinkResolution);

  /** Resolves the proxy into the individual objects it stands for. */
  getElements(): HTTPLinkPreferences<'single'>[];
}
