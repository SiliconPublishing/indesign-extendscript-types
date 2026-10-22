/**
 * Widgets.d.ts — indesign-uxp-types
 * Adobe InDesign 2026 (21.x) ExtendScript DOM declarations,
 * converted from indesign-uxp-types by tools/codemod.
 * Version: 1.0.0 · Updated: 2026-09-29
 * Author: Vlad Vladila (Krommatine Systems) · https://github.com/vamitul/indesign-uxp-types
 */
import type { IdCollection, BaseCollection } from './_base/Collections';
import type { Widget } from './Widget';
import type { Dialog } from './Dialog';

/**
 * A collection of {@link Widget} objects. Widgets are the base UI components—such
 * as labels, input fields, and containers—that make up an InDesign {@link Dialog}.
 *
 * @collection Widget
 */
export interface Widgets extends BaseCollection<Widget, Widget, Widget<'plural'>>, IdCollection<Widget> {
}
