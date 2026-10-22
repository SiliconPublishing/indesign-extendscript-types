import type { ErrorListError } from "./ErrorListError";
import type { BaseCollection } from "./_base/Collections";

/**
 * ErrorListErrors.d.ts — generated from the InDesign Server 21.6 scripting dictionary by tools/codemod/fill.mjs.
 */

/**
 * A collection of error list errors.
 */
export interface ErrorListErrors extends BaseCollection<ErrorListError, ErrorListError, ErrorListError<'plural'>>, InDesignEdition.ErrorListErrors, InDesignPlugins.ErrorListErrors {

}
