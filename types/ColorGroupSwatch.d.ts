/**
 * ColorGroupSwatch.d.ts — indesign-uxp-types
 * Adobe InDesign 2026 (21.x) ExtendScript DOM declarations,
 * converted from indesign-uxp-types by tools/codemod.
 * Version: 1.0.0 · Updated: 2026-09-29
 * Author: Vlad Vladila (Krommatine Systems) · https://github.com/vamitul/indesign-uxp-types
 */
import type { Mode, Read } from './_base/Types';
import type { EventTargetDOMObject, IndexedDOMObject } from './_base/DomObjects';
import type { ColorGroup } from './ColorGroup';
import type { Swatch } from './Swatch';

/**
 * A reference to a {@link Swatch} as a member of a {@link ColorGroup}.
 */
export interface ColorGroupSwatch<M extends Mode = 'single'>
  extends EventTargetDOMObject<ColorGroup, M>,
    IndexedDOMObject<ColorGroup, M>, InDesignEdition.ColorGroupSwatch<M>, InDesignPlugins.ColorGroupSwatch<M> {
  /** Resolves the proxy into the individual {@link ColorGroupSwatch} objects it stands for. */
  getElements(): ColorGroupSwatch<'single'>[];

  /** The unique ID of the color group swatch, stable across saves and reopens. */
  readonly id: Read<M, number>;

  /** The underlying swatch this member references. */
  readonly swatchItemRef: Read<M, Swatch>;
}
