/**
 * ClipboardPreference.d.ts — indesign-uxp-types
 * Adobe InDesign 2026 (21.x) ExtendScript DOM declarations,
 * converted from indesign-uxp-types by tools/codemod.
 * Version: 1.0.0 · Updated: 2026-09-29
 * Author: Vlad Vladila (Krommatine Systems) · https://github.com/vamitul/indesign-uxp-types
 */
import type { Mode, Read } from './_base/Types';
import type { EventTargetDOMObject } from './_base/DomObjects';
import type { Application } from './Application';
import type { EditionPart } from "./_base/Editions";

/**
 * Settings controlling what format content copies and pastes in, and whether
 * PDF data placed on the system clipboard survives quitting the application.
 */
export interface ClipboardPreference<M extends Mode = 'single'> extends EventTargetDOMObject<Application, M>, InDesignEdition.ClipboardPreference<M>, InDesignPlugins.ClipboardPreference<M> {
  /** Resolves the proxy into the individual {@link ClipboardPreference} objects it stands for. */
  getElements(): ClipboardPreference<'single'>[];

  /** If true, includes text attributes when pasting text. */
  get preferStyledTextWhenPasting(): Read<M, boolean>;
  set preferStyledTextWhenPasting(value: boolean);
  /** If true, objects cut or copied from different layers retain their layer assignment when pasted. */
  get pasteRemembersLayers(): Read<M, boolean>;
  set pasteRemembersLayers(value: boolean);

  /** If true, preserves PDF data on the system clipboard when the application exits. */
  get preservePdfClipboardAtQuit(): Read<M, boolean>;
  set preservePdfClipboardAtQuit(value: boolean);
}
/** ClipboardPreference's members only InDesign desktop has, or has differently (tools/codemod/editions.mjs). */
export interface ClipboardPreferenceDesktop<M extends Mode = 'single'> extends EditionPart {
  /** If true, pastes PDF if available.
   * Desktop only: InDesign Server 21.6 does not have it. */
  get preferPDFWhenPasting(): Read<M, boolean>;

  /**
   * Desktop only: InDesign Server 21.6 does not have it.
   */
  set preferPDFWhenPasting(value: boolean);

  /** If true, copies PDF to the clipboard.
   * Desktop only: InDesign Server 21.6 does not have it. */
  get copyPDFToClipboard(): Read<M, boolean>;

  /**
   * Desktop only: InDesign Server 21.6 does not have it.
   */
  set copyPDFToClipboard(value: boolean);

  /** If true, shows the Auto Style option.
   * Desktop only: InDesign Server 21.6 does not have it. */
  get showAutoStyleOption(): Read<M, boolean>;

  /**
   * Desktop only: InDesign Server 21.6 does not have it.
   */
  set showAutoStyleOption(value: boolean);

  /** If true, shows paste options when pasting.
   * Desktop only: InDesign Server 21.6 does not have it. */
  get showPasteOptions(): Read<M, boolean>;

  /**
   * Desktop only: InDesign Server 21.6 does not have it.
   */
  set showPasteOptions(value: boolean);
}

/** ClipboardPreference's members only InDesign Server has, or has differently (tools/codemod/editions.mjs). */
export interface ClipboardPreferenceServer<M extends Mode = 'single'> extends EditionPart {}

/** ClipboardPreference's members as both InDesign desktop and InDesign Server have them (tools/codemod/editions.mjs). */
export interface ClipboardPreferencePortable<M extends Mode = 'single'> extends EditionPart {}
