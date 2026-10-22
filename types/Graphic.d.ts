/**
 * Graphic.d.ts — indesign-uxp-types
 * Adobe InDesign 2026 (21.x) ExtendScript DOM declarations,
 * converted from indesign-uxp-types by tools/codemod.
 * Version: 1.0.0 · Updated: 2026-09-29
 * Author: Vlad Vladila (Krommatine Systems) · https://github.com/vamitul/indesign-uxp-types
 */
import type { Mode, Read } from './_base/Types';
import type { PageItem } from './PageItem';
import type { FilePath } from './_base/Types';
import type { Link } from './Link';
import type { PageItemParent } from './_base/Parents';
import type { AnimationSetting } from './AnimationSetting';
import type { Article } from './Article';
import type { BackgroundTask } from './BackgroundTask';
import type { ContentTransparencySetting } from './ContentTransparencySetting';
import type { FitOptions } from './Enums/FitOptions';
import type { FillTransparencySetting } from './FillTransparencySetting';
import type { FlexObjects } from './FlexObjects';
import type { Graphics } from './Graphics';
import type { Layer } from './Layer';
import type { Library } from './Library';
import type { LinkedPageItemOption } from './LinkedPageItemOption';
import type { ObjectStyle } from './ObjectStyle';
import type { PDF } from './PDF';
import type { Page } from './Page';
import type { PageItems } from './PageItems';
import type { Preferences } from './Preferences';
import type { SVGs } from './SVGs';
import type { StrokeTransparencySetting } from './StrokeTransparencySetting';
import type { TextWrapPreference } from './TextWrapPreference';
import type { TimingSetting } from './TimingSetting';
import type { TransparencySetting } from './TransparencySetting';
import type { XMLElement } from './XMLElement';
import type { NamableDOMObject } from './_base/DomObjects';
import type { GraphicAttributes } from './_base/GraphicAttributes';
import type { PageItemDesktop } from "./PageItem";
import type { PageItemServer } from "./PageItem";
import type { PageItemPortable } from "./PageItem";
import type { EditionPart } from "./_base/Editions";

/**
 * An imported graphic in any graphic file format (including vector, metafile,
 * and bitmap formats).
 */
export interface Graphic<TParent = PageItemParent, M extends Mode = 'single'> extends PageItem<TParent, PageItemParent, M>, InDesignEdition.Graphic<TParent, M>, InDesignPlugins.Graphic<M> {
  /** Resolves the proxy into the individual {@link Graphic} objects it stands for. */
  getElements(): Graphic<TParent, 'single'>[];

  /** The {@link Link} to the source file this graphic was placed from. */
  readonly itemLink: Read<M, Link>;

  /** The graphic file format name (e.g. `"JPEG"`, `"Photoshop"`, `"Illustrator"`). */
  readonly imageTypeName: Read<M, string>;

  /**
   * Exports the graphic as a web-optimized raster image.
   * @param to Destination file path.
   */
  exportForWeb(to: FilePath): Read<M, string[]>;
}
/** Graphic's members only InDesign desktop has, or has differently (tools/codemod/editions.mjs). */
export interface GraphicDesktop<TParent = PageItemParent, M extends Mode = 'single'> extends EditionPart, PageItemDesktop<TParent, PageItemParent, M> {}

/** Graphic's members only InDesign Server has, or has differently (tools/codemod/editions.mjs). */
export interface GraphicServer<TParent = PageItemParent, M extends Mode = 'single'> extends EditionPart, PageItemServer<TParent, PageItemParent, M> {}

/** Graphic's members as both InDesign desktop and InDesign Server have them (tools/codemod/editions.mjs). */
export interface GraphicPortable<TParent = PageItemParent, M extends Mode = 'single'> extends EditionPart, PageItemPortable<TParent, PageItemParent, M> {}

/**
 * A placed graphic InDesign reports as a plain {@link Graphic} rather than as an image, EPS,
 * PDF, SVG or imported page.
 *
 * Handle it in the `'Graphic'` branch of an `instanceof` check. Only the members every placed
 * graphic has — its link, its image type name, and export-for-web — are available on it.
 */
export interface PlainGraphic<
  TParent = PageItemParent,
  M extends Mode = 'single',
> extends Graphic<TParent, M> {
}
/** PlainGraphic's members only InDesign desktop has, or has differently (tools/codemod/editions.mjs). */
export interface PlainGraphicDesktop<TParent = PageItemParent, M extends Mode = 'single'> extends EditionPart, GraphicDesktop<TParent, M> {}

/** PlainGraphic's members only InDesign Server has, or has differently (tools/codemod/editions.mjs). */
export interface PlainGraphicServer<TParent = PageItemParent, M extends Mode = 'single'> extends EditionPart, GraphicServer<TParent, M> {}

/** PlainGraphic's members as both InDesign desktop and InDesign Server have them (tools/codemod/editions.mjs). */
export interface PlainGraphicPortable<TParent = PageItemParent, M extends Mode = 'single'> extends EditionPart, GraphicPortable<TParent, M> {}

