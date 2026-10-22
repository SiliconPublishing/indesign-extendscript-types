/**
 * MenuElements.d.ts — indesign-uxp-types
 * Adobe InDesign 2026 (21.x) ExtendScript DOM declarations,
 * converted from indesign-uxp-types by tools/codemod.
 * Version: 1.0.0 · Updated: 2026-09-29
 * Author: Vlad Vladila (Krommatine Systems) · https://github.com/vamitul/indesign-uxp-types
 */
import type { BaseCollection } from './_base/Collections';
import type { MenuElement } from './MenuElement';

/**
 * A collection of {@link MenuElement} objects. Menu elements are the abstract
 * components of an InDesign menu, including menu items, separators, and submenus.
 *
 * @collection MenuElement
 */
export interface MenuElements extends BaseCollection<MenuElement, MenuElement, MenuElement<'plural'>> {
}
