/**
 * MediaItem.d.ts — indesign-uxp-types
 * Adobe InDesign 2026 (21.x) ExtendScript DOM declarations,
 * converted from indesign-uxp-types by tools/codemod.
 * Version: 1.0.0 · Updated: 2026-09-29
 * Author: Vlad Vladila (Krommatine Systems) · https://github.com/vamitul/indesign-uxp-types
 */
import type { Mode, Read } from './_base/Types';
import type { PageItem } from './PageItem';
import type { Paths } from './Paths';
import type { PageItemParent } from './_base/Parents';
import type { Movie } from './Movie';
import type { Sound } from './Sound';
import type { AnimationSetting } from './AnimationSetting';
import type { Article } from './Article';
import type { BackgroundTask } from './BackgroundTask';
import type { ContentTransparencySetting } from './ContentTransparencySetting';
import type { FitOptions } from './Enums/FitOptions';
import type { FillTransparencySetting } from './FillTransparencySetting';
import type { FlexObjects } from './FlexObjects';
import type { Graphic } from './Graphic';
import type { Graphics } from './Graphics';
import type { Layer } from './Layer';
import type { Library } from './Library';
import type { LinkedPageItemOption } from './LinkedPageItemOption';
import type { ObjectStyle } from './ObjectStyle';
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
 * A media object (movie or sound clip) placed on a page. The abstract base of
 * {@link Movie} and {@link Sound}.
 */
export interface MediaItem<TParent = PageItemParent, M extends Mode = 'single'> extends PageItem<TParent, PageItemParent, M>, InDesignEdition.MediaItem<TParent, M>, InDesignPlugins.MediaItem<M> {
  /** Resolves the proxy into the individual {@link MediaItem} objects it stands for. */
  getElements(): MediaItem<TParent, 'single'>[];

  /** A collection of the paths making up the media item's poster-frame outline. */
  readonly paths: Paths;
}
/** MediaItem's members only InDesign desktop has, or has differently (tools/codemod/editions.mjs). */
export interface MediaItemDesktop<TParent = PageItemParent, M extends Mode = 'single'> extends EditionPart, PageItemDesktop<TParent, PageItemParent, M> {}

/** MediaItem's members only InDesign Server has, or has differently (tools/codemod/editions.mjs). */
export interface MediaItemServer<TParent = PageItemParent, M extends Mode = 'single'> extends EditionPart, PageItemServer<TParent, PageItemParent, M> {}

/** MediaItem's members as both InDesign desktop and InDesign Server have them (tools/codemod/editions.mjs). */
export interface MediaItemPortable<TParent = PageItemParent, M extends Mode = 'single'> extends EditionPart, PageItemPortable<TParent, PageItemParent, M> {}

/**
 * A media object InDesign reports as a plain {@link MediaItem} rather than as a movie or a
 * sound.
 *
 * Handle it in the `'MediaItem'` branch of an `instanceof` check. Only the members every
 * media object has — its poster frame and its paths — are available on it.
 */
export interface PlainMediaItem<
  TParent = PageItemParent,
  M extends Mode = 'single',
> extends MediaItem<TParent, M> {
}
/** PlainMediaItem's members only InDesign desktop has, or has differently (tools/codemod/editions.mjs). */
export interface PlainMediaItemDesktop<TParent = PageItemParent, M extends Mode = 'single'> extends EditionPart, MediaItemDesktop<TParent, M> {}

/** PlainMediaItem's members only InDesign Server has, or has differently (tools/codemod/editions.mjs). */
export interface PlainMediaItemServer<TParent = PageItemParent, M extends Mode = 'single'> extends EditionPart, MediaItemServer<TParent, M> {}

/** PlainMediaItem's members as both InDesign desktop and InDesign Server have them (tools/codemod/editions.mjs). */
export interface PlainMediaItemPortable<TParent = PageItemParent, M extends Mode = 'single'> extends EditionPart, MediaItemPortable<TParent, M> {}
