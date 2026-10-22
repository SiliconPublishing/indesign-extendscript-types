/**
 * GotoPreviousStateBehavior.d.ts — indesign-uxp-types
 * Adobe InDesign 2026 (21.x) ExtendScript DOM declarations,
 * converted from indesign-uxp-types by tools/codemod.
 * Version: 1.0.0 · Updated: 2026-09-29
 * Author: Vlad Vladila (Krommatine Systems) · https://github.com/vamitul/indesign-uxp-types
 */
import type { Mode, Read } from './_base/Types';
import type { Behavior } from './Behavior';
import type { MultiStateObject } from './MultiStateObject';
import type { BehaviorEvents } from './Enums/BehaviorEvents';


/**
 * A behavior that moves the associated {@link MultiStateObject} to its previous state.
 */
export interface GotoPreviousStateBehavior<M extends Mode = 'single'> extends Behavior<M>, InDesignPlugins.GotoPreviousStateBehavior<M>{
  /** Resolves the proxy into the individual {@link GotoPreviousStateBehavior} objects it stands for. */
  getElements(): GotoPreviousStateBehavior<'single'>[];

  /** The associated {@link MultiStateObject}. */
  get associatedMultiStateObject(): Read<M, MultiStateObject>;
  set associatedMultiStateObject(value: MultiStateObject | string);

  /** Whether moving before the first state loops around to the last. */
  get loopsToNextOrPrevious(): Read<M, boolean>;
  set loopsToNextOrPrevious(value: boolean);

}
