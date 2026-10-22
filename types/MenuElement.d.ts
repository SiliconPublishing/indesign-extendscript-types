/**
 * MenuElement.d.ts — indesign-uxp-types
 * Adobe InDesign 2026 (21.x) ExtendScript DOM declarations,
 * converted from indesign-uxp-types by tools/codemod.
 * Version: 1.0.0 · Updated: 2026-09-29
 * Author: Vlad Vladila (Krommatine Systems) · https://github.com/vamitul/indesign-uxp-types
 */
import type { Mode, Read } from './_base/Types';
import type { EventTargetDOMObject, IndexedDOMObject } from './_base/DomObjects';
import type { MenuElementParent } from './_base/Parents';
import type { Menu } from './Menu';
import type { MenuItem } from './MenuItem';
import type { MenuSeparator } from './MenuSeparator';
import type { Submenu } from './Submenu';

/**
 * The base of every object that can appear inside a {@link Menu} or
 * {@link Submenu} — a {@link MenuItem}, a {@link MenuSeparator}, or a nested
 * {@link Submenu}.
 */
export interface MenuElement<M extends Mode = 'single'>
  extends EventTargetDOMObject<MenuElementParent, M>,
    IndexedDOMObject<MenuElementParent, M>, InDesignEdition.MenuElement<M>, InDesignPlugins.MenuElement<M> {
  /** Resolves the proxy into the individual {@link MenuElement} objects it stands for. */
  getElements(): MenuElement<'single'>[];

  /** Deletes the menu element. */
  remove(): Read<M, void>;
}
