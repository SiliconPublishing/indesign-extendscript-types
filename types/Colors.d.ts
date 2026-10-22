/**
 * Colors.d.ts — indesign-uxp-types
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
import type { Color } from './Color';

/**
 * A collection of {@link Color} swatches in an InDesign document or the application.
 *
 * Swatches define the color model (Process or Spot), color space (CMYK, RGB, or LAB), and
 * specific color values used for consistent formatting across page items.
 * @collection Color
 */
export interface Colors
  extends BaseCollection<Color, Color, Color<'plural'>>, IdCollection<Color>, NamedCollection<Color> {
  /**
   * Creates a new color swatch.
   *
   * * **Duplicate Names:** If a color with the specified name already exists, this method will throw an error. Check existence using `itemByName("Name").isValid` before adding.
   * * **Efficiency:** Providing property values (like `colorValue`, `space`, and `model`) in `withProperties` is more efficient than setting them individually after creation.
   * @param withProperties Initial values for properties of the new {@link Color}.
   */
  add(withProperties?: PropertiesSetter<Color>): Color;
}
