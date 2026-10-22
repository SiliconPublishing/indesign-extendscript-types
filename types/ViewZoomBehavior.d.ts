/**
 * ViewZoomBehavior.d.ts — indesign-uxp-types
 * Adobe InDesign 2026 (21.x) ExtendScript DOM declarations,
 * converted from indesign-uxp-types by tools/codemod.
 * Version: 1.0.0 · Updated: 2026-09-29
 * Author: Vlad Vladila (Krommatine Systems) · https://github.com/vamitul/indesign-uxp-types
 */
import type { Mode, Read } from './_base/Types';
import type { Behavior } from './Behavior';
import type { ViewZoomStyle } from './Enums/ViewZoomStyle';
import type { BehaviorEvents } from './Enums/BehaviorEvents';


/**
 * A behavior that changes the view zoom level.
 */
export interface ViewZoomBehavior<M extends Mode = 'single'> extends Behavior<M>{
  /** Resolves the proxy into the individual {@link ViewZoomBehavior} objects it stands for. */
  getElements(): ViewZoomBehavior<'single'>[];

  /** The view zoom style to apply. */
  get viewZoomStyle(): Read<M, ViewZoomStyle>;
  set viewZoomStyle(value: ViewZoomStyle);

}
