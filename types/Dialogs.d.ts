/**
 * Dialogs.d.ts — indesign-uxp-types
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
import type { Dialog } from './Dialog';

/**
 * A collection of {@link Dialog} objects. Dialogs are custom modal windows
 * created via scripting to gather user input or display information.
 *
 * @collection Dialog
 */
export interface Dialogs
  extends
    BaseCollection<Dialog, Dialog, Dialog<'plural'>>,
    IdCollection<Dialog>,
    NamedCollection<Dialog> {
  /**
   * Creates a new dialog.
   * @param withProperties Initial values for properties of the new {@link Dialog}.
   */
  add(withProperties?: PropertiesSetter<Dialog>): Dialog;
}
