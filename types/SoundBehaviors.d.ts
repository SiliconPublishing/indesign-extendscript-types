/**
 * SoundBehaviors.d.ts — indesign-uxp-types
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
import type { SoundBehavior } from './SoundBehavior';
import type { Button } from './Button';
import type { FormField } from './FormField';

/**
 * A collection of {@link SoundBehavior} objects. This behavior is applied to
 * an interactive {@link Button} or {@link FormField} to control audio playback
 * — play, stop, pause, or resume — in interactive exports.
 * @collection SoundBehavior
 */
export interface SoundBehaviors
  extends
    BaseCollection<SoundBehavior, SoundBehavior, SoundBehavior<'plural'>>,
    IdCollection<SoundBehavior>,
    NamedCollection<SoundBehavior>, InDesignPlugins.SoundBehaviors {
  /**
   * Creates a new {@link SoundBehavior} and adds it to the collection.
   * @param withProperties Initial values for properties of the new {@link SoundBehavior},
   * such as the operation to perform and the target audio file.
   */
  add(withProperties?: PropertiesSetter<SoundBehavior>): SoundBehavior;
}
