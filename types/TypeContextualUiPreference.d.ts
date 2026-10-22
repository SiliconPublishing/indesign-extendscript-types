/**
 * TypeContextualUiPreference.d.ts — indesign-uxp-types
 * Adobe InDesign 2026 (21.x) ExtendScript DOM declarations,
 * converted from indesign-uxp-types by tools/codemod.
 * Version: 1.0.0 · Updated: 2026-09-29
 * Author: Vlad Vladila (Krommatine Systems) · https://github.com/vamitul/indesign-uxp-types
 */
import type { Mode, Read } from './_base/Types';
import type { EventTargetDOMObject } from './_base/DomObjects';
import type { Application } from './Application';

/**
 * Contextual UI preferences shown while editing text, such as prompts for
 * alternates and fractions.
 */
export interface TypeContextualUiPreference<M extends Mode = 'single'> extends EventTargetDOMObject<Application, M>, InDesignEdition.TypeContextualUiPreference<M>, InDesignPlugins.TypeContextualUiPreference<M> {
  /** Resolves the proxy into the individual {@link TypeContextualUiPreference} objects it stands for. */
  getElements(): TypeContextualUiPreference<'single'>[];

  /** Whether to show the contextual UI offering character alternates while typing. */
  get showAlternatesUi(): Read<M, boolean>;
  set showAlternatesUi(value: boolean);

  /** Whether to show the contextual UI offering fraction formatting while typing. */
  get showFractionsUi(): Read<M, boolean>;
  set showFractionsUi(value: boolean);
}
