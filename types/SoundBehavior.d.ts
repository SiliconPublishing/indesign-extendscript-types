/**
 * SoundBehavior.d.ts — indesign-uxp-types
 * Adobe InDesign 2026 (21.x) ExtendScript DOM declarations,
 * converted from indesign-uxp-types by tools/codemod.
 * Version: 1.0.0 · Updated: 2026-09-29
 * Author: Vlad Vladila (Krommatine Systems) · https://github.com/vamitul/indesign-uxp-types
 */
import type { Mode, Read } from './_base/Types';
import type { Behavior } from './Behavior';
import type { Sound } from './Sound';
import type { PlayOperations } from './Enums/PlayOperations';
import type { BehaviorEvents } from './Enums/BehaviorEvents';


/**
 * A behavior that controls playback of a {@link Sound} page item.
 */
export interface SoundBehavior<M extends Mode = 'single'> extends Behavior<M>, InDesignPlugins.SoundBehavior<M>{
  /** Resolves the proxy into the individual {@link SoundBehavior} objects it stands for. */
  getElements(): SoundBehavior<'single'>[];

  /** The {@link Sound} page item to control. */
  get soundItem(): Read<M, Sound>;
  set soundItem(value: Sound);

  /** The playback mode. */
  get operation(): Read<M, PlayOperations>;
  set operation(value: PlayOperations);

}
