/**
 * DocumentEvent.d.ts — indesign-uxp-types
 * Adobe InDesign 2026 (21.x) ExtendScript DOM declarations,
 * converted from indesign-uxp-types by tools/codemod.
 * Version: 1.0.0 · Updated: 2026-09-29
 * Author: Vlad Vladila (Krommatine Systems) · https://github.com/vamitul/indesign-uxp-types
 */
import type { Mode, Read } from './_base/Types';
import type { Event } from './Event';
import type { DocumentOrApplication } from './_base/Parents';
import type { File } from './_base/Types';
import type { UserInteractionLevels } from './Enums/UserInteractionLevels';
import type { Document } from './Document';
import type { LayoutWindow } from './LayoutWindow';
import type { EditionPart } from "./_base/Editions";

/**
 * An event dispatched during a document lifecycle transition — creation,
 * opening, saving, reverting, or closing.
 */
export interface DocumentEvent<M extends Mode = 'single'> extends Event<M>, InDesignEdition.DocumentEvent<M>, InDesignPlugins.DocumentEvent<M>{
  /** Resolves the proxy into the individual {@link DocumentEvent} objects it stands for. */
  getElements(): DocumentEvent<'single'>[];

  readonly parent: Read<M, DocumentOrApplication>;

  /** The full path to the document, including its name. */
  readonly fullName: Read<M, File>;
}
/** DocumentEvent's members only InDesign desktop has, or has differently (tools/codemod/editions.mjs). */
export interface DocumentEventDesktop<M extends Mode = 'single'> extends EditionPart {
  /** Controls the display of dialogs and alerts while this event's handler runs.
   * Desktop only: InDesign Server 21.6 does not have it. */
  get userInteractionLevel(): Read<M, UserInteractionLevels>;

  /**
   * Desktop only: InDesign Server 21.6 does not have it.
   */
  set userInteractionLevel(value: UserInteractionLevels);
}

/** DocumentEvent's members only InDesign Server has, or has differently (tools/codemod/editions.mjs). */
export interface DocumentEventServer<M extends Mode = 'single'> extends EditionPart {}

/** DocumentEvent's members as both InDesign desktop and InDesign Server have them (tools/codemod/editions.mjs). */
export interface DocumentEventPortable<M extends Mode = 'single'> extends EditionPart {}
