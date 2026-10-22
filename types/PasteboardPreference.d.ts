/**
 * PasteboardPreference.d.ts — indesign-uxp-types
 * Adobe InDesign 2026 (21.x) ExtendScript DOM declarations,
 * converted from indesign-uxp-types by tools/codemod.
 * Version: 1.0.0 · Updated: 2026-09-29
 * Author: Vlad Vladila (Krommatine Systems) · https://github.com/vamitul/indesign-uxp-types
 */
import type { Mode, Read } from './_base/Types';
import type { EventTargetDOMObject } from './_base/DomObjects';
import type { DocumentOrApplication } from './_base/Parents';
import type { MeasurementValue } from './_base/Types';
import type { UIColors } from './Enums/UIColors';
import type { EditionPart } from "./_base/Editions";

/**
 * Pasteboard preferences.
 */
export interface PasteboardPreference<M extends Mode = 'single'> extends EventTargetDOMObject<DocumentOrApplication, M>, InDesignEdition.PasteboardPreference<M>, InDesignPlugins.PasteboardPreference<M> {
  /** Resolves the proxy into the individual {@link PasteboardPreference} objects it stands for. */
  getElements(): PasteboardPreference<'single'>[];

  /** The minimum horizontal and vertical pasteboard margins. A horizontal margin of -1 means one document page width. */
  get pasteboardMargins(): Read<M, number[]>;
  set pasteboardMargins(value: MeasurementValue[]);

  /** The color of the preview background, specified either as an array of three doubles, each in the range 0 to 255, representing R, G, and B values, or as a UI color. */
  get previewBackgroundColor(): Read<M, number[] | UIColors>;
  set previewBackgroundColor(value: number[] | UIColors);

  /** The color of bleed guides, specified either as an array of three doubles, each in the range 0 to 255, representing R, G, and B values, or as a UI color. */
  get bleedGuideColor(): Read<M, number[] | UIColors>;
  set bleedGuideColor(value: number[] | UIColors);

  /** The color of slug guides, specified either as an array of three doubles, each in the range 0 to 255, representing R, G, and B values, or as a UI color. */
  get slugGuideColor(): Read<M, number[] | UIColors>;
  set slugGuideColor(value: number[] | UIColors);
}
/** PasteboardPreference's members only InDesign desktop has, or has differently (tools/codemod/editions.mjs). */
export interface PasteboardPreferenceDesktop<M extends Mode = 'single'> extends EditionPart {
  /** If true, match the Preview Background color to Theme Color, else use the color-value specified in Preview Background color drop down.
   * Desktop only: InDesign Server 21.6 does not have it. */
  get matchPreviewBackgroundToThemeColor(): Read<M, boolean>;

  /**
   * Desktop only: InDesign Server 21.6 does not have it.
   */
  set matchPreviewBackgroundToThemeColor(value: boolean);
}

/** PasteboardPreference's members only InDesign Server has, or has differently (tools/codemod/editions.mjs). */
export interface PasteboardPreferenceServer<M extends Mode = 'single'> extends EditionPart {}

/** PasteboardPreference's members as both InDesign desktop and InDesign Server have them (tools/codemod/editions.mjs). */
export interface PasteboardPreferencePortable<M extends Mode = 'single'> extends EditionPart {}
