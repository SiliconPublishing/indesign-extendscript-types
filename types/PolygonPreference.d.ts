/**
 * PolygonPreference.d.ts — indesign-uxp-types
 * Adobe InDesign 2026 (21.x) ExtendScript DOM declarations,
 * converted from indesign-uxp-types by tools/codemod.
 * Version: 1.0.0 · Updated: 2026-09-29
 * Author: Vlad Vladila (Krommatine Systems) · https://github.com/vamitul/indesign-uxp-types
 */
import type { Mode, Read } from './_base/Types';
import type { EventTargetDOMObject } from './_base/DomObjects';
import type { Application } from './Application';

/**
 * Default settings to use when creating a polygon.
 */
export interface PolygonPreference<M extends Mode = 'single'> extends EventTargetDOMObject<Application, M>, InDesignPlugins.PolygonPreference<M> {
  /** Resolves the proxy into the individual {@link PolygonPreference} objects it stands for. */
  getElements(): PolygonPreference<'single'>[];

  /** The star inset percentage for the sides of a polygon. (Range: 0 to 100). */
  get insetPercentage(): Read<M, number>;
  set insetPercentage(value: number);

  /** The number of sides for a polygon. (Range: 3 to 100). */
  get numberOfSides(): Read<M, number>;
  set numberOfSides(value: number);
}
