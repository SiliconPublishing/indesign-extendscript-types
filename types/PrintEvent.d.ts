/**
 * PrintEvent.d.ts — indesign-uxp-types
 * Adobe InDesign 2026 (21.x) ExtendScript DOM declarations,
 * converted from indesign-uxp-types by tools/codemod.
 * Version: 1.0.0 · Updated: 2026-09-29
 * Author: Vlad Vladila (Krommatine Systems) · https://github.com/vamitul/indesign-uxp-types
 */
import type { Mode, Read } from './_base/Types';
import type { Event } from './Event';
import type { Document } from './Document';
import type { DocumentPrintUiOptions } from './Enums/DocumentPrintUiOptions';
import type { LayoutWindow } from './LayoutWindow';
import type { EditionPart } from "./_base/Editions";

/**
 * An event dispatched before or after a document is printed.
 */
export interface PrintEvent<M extends Mode = 'single'> extends Event<M>, InDesignEdition.PrintEvent<M>, InDesignPlugins.PrintEvent<M>{
  /** Resolves the proxy into the individual {@link PrintEvent} objects it stands for. */
  getElements(): PrintEvent<'single'>[];

  readonly parent: Read<M, Document>;
}
/** PrintEvent's members only InDesign desktop has, or has differently (tools/codemod/editions.mjs). */
export interface PrintEventDesktop<M extends Mode = 'single'> extends EditionPart {
  /** How much of the print dialog is suppressed — see {@link DocumentPrintUiOptions}.
   * Desktop only: InDesign Server 21.6 does not have it. */
  get documentPrintUiOption(): Read<M, DocumentPrintUiOptions | DocumentPrintUiOptions[]>;

  /**
   * Desktop only: InDesign Server 21.6 does not have it.
   */
  set documentPrintUiOption(value: DocumentPrintUiOptions | DocumentPrintUiOptions[]);
}

/** PrintEvent's members only InDesign Server has, or has differently (tools/codemod/editions.mjs). */
export interface PrintEventServer<M extends Mode = 'single'> extends EditionPart {}

/** PrintEvent's members as both InDesign desktop and InDesign Server have them (tools/codemod/editions.mjs). */
export interface PrintEventPortable<M extends Mode = 'single'> extends EditionPart {}
