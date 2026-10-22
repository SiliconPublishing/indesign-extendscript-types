import type { Read } from "./_base/Types";
import type { Application } from "./Application";
import type { Mode } from "./_base/Types";
import type { EventTargetDOMObject } from "./_base/DomObjects";

/**
 * ErrorListError.d.ts — generated from the InDesign Server 21.6 scripting dictionary by tools/codemod/fill.mjs.
 */

/**
 * An error list error.
 */
export interface ErrorListError<M extends Mode = 'single'> extends EventTargetDOMObject<Application, M>, InDesignEdition.ErrorListError<M>, InDesignPlugins.ErrorListError<M> {
  /**
   * The error code.
   * Generated from the InDesign Server 21.6 scripting dictionary.
   */
  readonly listErrorCode: Read<M, number>;

  /**
   * The error level.
   * Generated from the InDesign Server 21.6 scripting dictionary.
   */
  readonly listErrorLevel: Read<M, number>;

  /**
   * The error message.
   * Generated from the InDesign Server 21.6 scripting dictionary.
   */
  readonly listErrorMessage: Read<M, string>;

  /**
   * The time the error occurred.
   * Generated from the InDesign Server 21.6 scripting dictionary.
   */
  readonly listErrorTime: Read<M, string>;

  /**
   * The index of the ErrorListError within its containing object.
   * Generated from the InDesign Server 21.6 scripting dictionary.
   */
  readonly index: Read<M, number>;

  /**
   * Deletes the ErrorListError.
   * Generated from the InDesign Server 21.6 scripting dictionary.
   */
  remove(): Read<M, void>;

  /** Resolves the proxy into the individual objects it stands for. */
  getElements(): ErrorListError<'single'>[];
}
