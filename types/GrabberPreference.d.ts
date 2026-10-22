/**
 * GrabberPreference.d.ts — indesign-uxp-types
 * Adobe InDesign 2026 (21.x) ExtendScript DOM declarations,
 * converted from indesign-uxp-types by tools/codemod.
 * Version: 1.0.0 · Updated: 2026-09-29
 * Author: Vlad Vladila (Krommatine Systems) · https://github.com/vamitul/indesign-uxp-types
 */
import type { Mode, Read } from './_base/Types';
import type { EventTargetDOMObject } from './_base/DomObjects';
import type { Application } from './Application';
import type { PanningTypes } from './Enums/PanningTypes';

/**
 * Grabber preferences.
 */
export interface GrabberPreference<M extends Mode = 'single'> extends EventTargetDOMObject<Application, M>, InDesignEdition.GrabberPreference<M>, InDesignPlugins.GrabberPreference<M> {
  /** Resolves the proxy into the individual {@link GrabberPreference} objects it stands for. */
  getElements(): GrabberPreference<'single'>[];

  /** The display performance quality setting to use when scrolling. */
  get grabberPanning(): Read<M, PanningTypes>;
  set grabberPanning(value: PanningTypes);
}
