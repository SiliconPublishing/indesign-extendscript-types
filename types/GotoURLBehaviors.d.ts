/**
 * GotoURLBehaviors.d.ts — indesign-uxp-types
 * Adobe InDesign 2026 (21.x) ExtendScript DOM declarations,
 * converted from indesign-uxp-types by tools/codemod.
 * Version: 1.0.0 · Updated: 2026-09-29
 * Author: Vlad Vladila (Krommatine Systems) · https://github.com/vamitul/indesign-uxp-types
 */
import type { PropertiesSetter } from './_base/Properties';
import type {
  NamedCollection,
  IdCollection,
  BaseCollection,
} from './_base/Collections';
import type { GotoURLBehavior } from './GotoURLBehavior';

/**
 * A collection of {@link GotoURLBehavior} objects. This behavior is applied
 * to interactive elements (like buttons) to trigger the opening of a specified
 * web URL in a browser.
 *
 * @collection GotoURLBehavior
 */
export interface GotoURLBehaviors
  extends
    BaseCollection<GotoURLBehavior, GotoURLBehavior, GotoURLBehavior<'plural'>>,
    IdCollection<GotoURLBehavior>,
    NamedCollection<GotoURLBehavior>, InDesignPlugins.GotoURLBehaviors {
  /**
   * Creates a new goto URL behavior.
   * @param withProperties Initial values for properties of the new {@link GotoURLBehavior}.
   */
  add(withProperties?: PropertiesSetter<GotoURLBehavior>): GotoURLBehavior;
}
