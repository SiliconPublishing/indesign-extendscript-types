/**
 * Bookmark.d.ts — indesign-uxp-types
 * Adobe InDesign 2026 (21.x) ExtendScript DOM declarations,
 * converted from indesign-uxp-types by tools/codemod.
 * Version: 1.0.0 · Updated: 2026-09-29
 * Author: Vlad Vladila (Krommatine Systems) · https://github.com/vamitul/indesign-uxp-types
 */
import type { Mode, Read } from './_base/Types';
import type { LabelableEventDOMObject, IndexedDOMObject, NamableDOMObject } from './_base/DomObjects';
import type { Document } from './Document';
import type { Bookmarks } from './Bookmarks';
import type { HyperlinkTextDestination } from './HyperlinkTextDestination';
import type { HyperlinkPageDestination } from './HyperlinkPageDestination';
import type { HyperlinkExternalPageDestination } from './HyperlinkExternalPageDestination';
import type { Page } from './Page';
import type { LocationOptions } from './Enums/LocationOptions';
import type { EditionPart } from "./_base/Editions";

/**
 * An entry in the document's bookmark tree, providing hierarchical PDF
 * navigation to a page, text location, or external page. Bookmarks can
 * nest arbitrarily deep via their own {@link bookmarks} collection.
 */
export interface Bookmark<M extends Mode = 'single'>
  extends LabelableEventDOMObject<Document | Bookmark, M>,
    IndexedDOMObject<Document | Bookmark, M>,
    NamableDOMObject<Document | Bookmark, M>, InDesignEdition.Bookmark<M>, InDesignPlugins.Bookmark<M> {
  /** Resolves the proxy into the individual {@link Bookmark} objects it stands for. */
  getElements(): Bookmark<'single'>[];

  /** The nesting depth of the bookmark within the bookmark tree. */
  readonly indent: Read<M, number>;

  /** The location that the bookmark points to. */
  readonly destination: Read<
    M,
    | HyperlinkTextDestination
    | HyperlinkPageDestination
    | HyperlinkExternalPageDestination
    | Page
  >;

  /** The unique ID of the bookmark, stable across saves and reopens. */
  readonly id: Read<M, number>;

  /** The child bookmarks nested under this bookmark. */
  readonly bookmarks: Bookmarks;

  /**
   * Moves the bookmark within the bookmark tree.
   * @param to The location relative to `reference`, or within the containing object if `reference` is omitted. Defaults to {@link LocationOptions.AT_END}.
   * @param reference The reference bookmark or document. Required when `to` is {@link LocationOptions.BEFORE} or {@link LocationOptions.AFTER}.
   */
  move(to?: LocationOptions, reference?: Bookmark | Document): Read<M, Bookmark>;
  /** Deletes the bookmark. */
  remove(): Read<M, void>;
}
/** Bookmark's members only InDesign desktop has, or has differently (tools/codemod/editions.mjs). */
export interface BookmarkDesktop<M extends Mode = 'single'> extends EditionPart {
  /** Navigates to the bookmark's destination.
   * Desktop only: InDesign Server 21.6 does not have it. */
  showBookmark(): Read<M, void>;
}

/** Bookmark's members only InDesign Server has, or has differently (tools/codemod/editions.mjs). */
export interface BookmarkServer<M extends Mode = 'single'> extends EditionPart {}

/** Bookmark's members as both InDesign desktop and InDesign Server have them (tools/codemod/editions.mjs). */
export interface BookmarkPortable<M extends Mode = 'single'> extends EditionPart {}
