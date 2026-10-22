/**
 * PrintFormBehavior.d.ts — indesign-uxp-types
 * Adobe InDesign 2026 (21.x) ExtendScript DOM declarations,
 * converted from indesign-uxp-types by tools/codemod.
 * Version: 1.0.0 · Updated: 2026-09-29
 * Author: Vlad Vladila (Krommatine Systems) · https://github.com/vamitul/indesign-uxp-types
 */
import type { Mode, Read } from './_base/Types';
import type { Behavior } from './Behavior';
import type { BehaviorEvents } from './Enums/BehaviorEvents';


/**
 * A behavior that prints the interactive PDF form.
 */
export interface PrintFormBehavior<M extends Mode = 'single'> extends Behavior<M>, InDesignEdition.PrintFormBehavior<M>, InDesignPlugins.PrintFormBehavior<M>{
  /** Resolves the proxy into the individual {@link PrintFormBehavior} objects it stands for. */
  getElements(): PrintFormBehavior<'single'>[];

}
