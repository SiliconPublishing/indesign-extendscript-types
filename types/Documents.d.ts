/**
 * Documents.d.ts — indesign-uxp-types
 * Adobe InDesign 2026 (21.x) ExtendScript DOM declarations,
 * converted from indesign-uxp-types by tools/codemod.
 * Version: 1.0.0 · Updated: 2026-09-29
 * Author: Vlad Vladila (Krommatine Systems) · https://github.com/vamitul/indesign-uxp-types
 */
import type { PropertiesSetter } from './_base/Properties';
import type { DocumentPreset } from './DocumentPreset';
import type {
  NamedCollection,
  IdCollection,
  BaseCollection,
} from './_base/Collections';
import type { Document } from './Document';
import type { EditionPart } from "./_base/Editions";

/**
 * A collection of open {@link Document} objects in the current InDesign application session.
 * Indexed documents correspond to open InDesign files; adding to this collection
 * creates and opens a new document.
 *
 * @collection Document
 */
export interface Documents
  extends
    BaseCollection<Document, Document, Document<'plural'>>,
    IdCollection<Document>,
    NamedCollection<Document>, InDesignEdition.Documents, InDesignPlugins.Documents {
}
/** Documents's members only InDesign desktop has, or has differently (tools/codemod/editions.mjs). */
export interface DocumentsDesktop extends EditionPart {
  /**
   * Creates a new document from a properties bag alone.
   * InDesign Server 21.6 takes `add(documentPreset?, withProperties?)` instead.
   * @param withProperties Initial values for properties of the new {@link Document}.
   */
  add(withProperties: PropertiesSetter<Document>): Document;

  /**
   * Creates and optionally displays a new InDesign document.
   *
   * If a `documentPreset` is supplied, the new document is initialized with the preset's page
   * size, margins, columns, and other settings. Without a preset, InDesign applies the
   * current application defaults.
   * InDesign Server 21.6 takes `add(documentPreset?, withProperties?)` instead.
   * @param showingWindow If `true`, the new document window is displayed immediately. If `false`, the document is created in the background for faster processing. Defaults to `true`.
   * @param documentPreset The {@link DocumentPreset} to apply to the new document.
   * @param withProperties Initial values for properties of the new Document.
   */
  add(
    showingWindow?: boolean,
    documentPreset?: DocumentPreset,
    withProperties?: PropertiesSetter<Document>,
  ): Document;
}

/** Documents's members only InDesign Server has, or has differently (tools/codemod/editions.mjs). */
export interface DocumentsServer extends EditionPart {
  /**
   * Creates a new document from a properties bag alone.
   * InDesign desktop 21.6 takes `add(showingWindow?, documentPreset?, withProperties?)` instead.
   * @param documentPreset The document preset to use. (Optional)
   * @param withProperties Initial values for properties of the new Document (Optional)
   */
  add(documentPreset?: DocumentPreset, withProperties?: object): Document;

  /**
   * Creates and optionally displays a new InDesign document.
   * If a `documentPreset` is supplied, the new document is initialized with the preset's page
   * size, margins, columns, and other settings. Without a preset, InDesign applies the
   * current application defaults.
   * InDesign desktop 21.6 takes `add(showingWindow?, documentPreset?, withProperties?)` instead.
   * @param documentPreset The {@link DocumentPreset} to apply to the new document.
   * @param withProperties Initial values for properties of the new Document.
   */
  add(documentPreset?: DocumentPreset, withProperties?: PropertiesSetter<Document>): Document;
}

/** Documents's members as both InDesign desktop and InDesign Server have them (tools/codemod/editions.mjs). */
export interface DocumentsPortable extends EditionPart {
  /**
   * Creates a new document from a properties bag alone.
   * Portable form: the editions' parameters differ after these (desktop `add(showingWindow?, documentPreset?, withProperties?)`, InDesign Server `add(documentPreset?, withProperties?)`). Cast to `InDesignDesktop` or `InDesignServer` types for the rest.
   */
  add(): Document;

  /**
   * Creates and optionally displays a new InDesign document.
   * If a `documentPreset` is supplied, the new document is initialized with the preset's page
   * size, margins, columns, and other settings. Without a preset, InDesign applies the
   * current application defaults.
   * Portable form: the editions' parameters differ after these (desktop `add(showingWindow?, documentPreset?, withProperties?)`, InDesign Server `add(documentPreset?, withProperties?)`). Cast to `InDesignDesktop` or `InDesignServer` types for the rest.
   */
  add(): Document;
}
