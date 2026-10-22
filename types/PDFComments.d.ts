/**
 * PDFComments.d.ts — indesign-uxp-types
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
import type { PDFComment } from './PDFComment';

/**
 * A collection of {@link PDFComment} objects. These represent comments and
 * annotations imported from a PDF file for collaborative review within InDesign.
 *
 * @collection PDFComment
 */
export interface PDFComments
  extends
    BaseCollection<PDFComment, PDFComment, PDFComment<'plural'>>,
    IdCollection<PDFComment>,
    NamedCollection<PDFComment>, InDesignPlugins.PDFComments {
}
