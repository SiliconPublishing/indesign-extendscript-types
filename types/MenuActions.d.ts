/**
 * MenuActions.d.ts — indesign-uxp-types
 * Adobe InDesign 2026 (21.x) ExtendScript DOM declarations,
 * converted from indesign-uxp-types by tools/codemod.
 * Version: 1.0.0 · Updated: 2026-09-29
 * Author: Vlad Vladila (Krommatine Systems) · https://github.com/vamitul/indesign-uxp-types
 */
import type {
  NamedCollection,
  IdCollection,
  BaseCollection,
} from './_base/Collections';
import type { MenuAction } from './MenuAction';

/**
 * A collection of {@link MenuAction} objects. These represent the underlying
 * logic, labels, and shortcuts for all menu commands available in the InDesign application.
 *
 * @collection MenuAction
 */
export interface MenuActions
  extends
    BaseCollection<MenuAction, MenuAction, MenuAction<'plural'>>,
    IdCollection<MenuAction>,
    NamedCollection<MenuAction> {
}
