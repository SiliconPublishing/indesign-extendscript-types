/**
 * OpenFileBehaviors.d.ts — indesign-uxp-types
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
import type { OpenFileBehavior } from './OpenFileBehavior';

/**
 * A collection of {@link OpenFileBehavior} objects. This behavior is applied
 * to interactive elements (like buttons) to trigger the opening of a specified
 * external file.
 *
 * @collection OpenFileBehavior
 */
export interface OpenFileBehaviors
  extends
    BaseCollection<OpenFileBehavior, OpenFileBehavior, OpenFileBehavior<'plural'>>,
    IdCollection<OpenFileBehavior>,
    NamedCollection<OpenFileBehavior>, InDesignEdition.OpenFileBehaviors, InDesignPlugins.OpenFileBehaviors {
  /**
   * Creates a new open file behavior.
   * @param withProperties Initial values for properties of the new {@link OpenFileBehavior}.
   */
  add(withProperties?: PropertiesSetter<OpenFileBehavior>): OpenFileBehavior;
}
