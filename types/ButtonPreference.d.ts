/**
 * ButtonPreference.d.ts — indesign-uxp-types
 * Adobe InDesign 2026 (21.x) ExtendScript DOM declarations,
 * converted from indesign-uxp-types by tools/codemod.
 * Version: 1.0.0 · Updated: 2026-09-29
 * Author: Vlad Vladila (Krommatine Systems) · https://github.com/vamitul/indesign-uxp-types
 */
import type { Mode, Read } from './_base/Types';
import type { EventTargetDOMObject, NamableDOMObject } from './_base/DomObjects';
import type { DocumentOrApplication } from './_base/Parents';

/**
 * Button preferences.
 */
export interface ButtonPreference<M extends Mode = 'single'> extends EventTargetDOMObject<DocumentOrApplication, M>, NamableDOMObject<DocumentOrApplication, M>, InDesignPlugins.ButtonPreference<M> {
  /** Resolves the proxy into the individual {@link ButtonPreference} objects it stands for. */
  getElements(): ButtonPreference<'single'>[];

}
