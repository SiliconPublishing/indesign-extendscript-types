/**
 * MovieBehavior.d.ts — indesign-uxp-types
 * Adobe InDesign 2026 (21.x) ExtendScript DOM declarations,
 * converted from indesign-uxp-types by tools/codemod.
 * Version: 1.0.0 · Updated: 2026-09-29
 * Author: Vlad Vladila (Krommatine Systems) · https://github.com/vamitul/indesign-uxp-types
 */
import type { Mode, Read } from './_base/Types';
import type { Behavior } from './Behavior';
import type { Movie } from './Movie';
import type { MoviePlayOperations } from './Enums/MoviePlayOperations';
import type { BehaviorEvents } from './Enums/BehaviorEvents';


/**
 * A behavior that controls playback of a {@link Movie} page item.
 */
export interface MovieBehavior<M extends Mode = 'single'> extends Behavior<M>, InDesignPlugins.MovieBehavior<M>{
  /** Resolves the proxy into the individual {@link MovieBehavior} objects it stands for. */
  getElements(): MovieBehavior<'single'>[];

  /** The {@link Movie} page item to control. */
  get movieItem(): Read<M, Movie>;
  set movieItem(value: Movie | string);

  /**
   * The ID of the navigation point to play from.
   *
   * Ignored unless `operation` is set to play from a navigation point.
   */
  get navigationPointID(): Read<M, number>;
  set navigationPointID(value: number);

  /** The playback mode. */
  get operation(): Read<M, MoviePlayOperations>;
  set operation(value: MoviePlayOperations);

}
