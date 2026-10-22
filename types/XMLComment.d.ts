/**
 * XMLComment.d.ts — indesign-uxp-types
 * Adobe InDesign 2026 (21.x) ExtendScript DOM declarations,
 * converted from indesign-uxp-types by tools/codemod.
 * Version: 1.0.0 · Updated: 2026-09-29
 * Author: Vlad Vladila (Krommatine Systems) · https://github.com/vamitul/indesign-uxp-types
 */
import type { Mode, Read } from './_base/Types';
import type { XMLItem } from './XMLItem';
import type { InsertionPoint } from './InsertionPoint';
import type { Text } from './Text';
import type { LocationOptions } from './Enums/LocationOptions';
import type { XMLItemDesktop } from "./XMLItem";
import type { XMLItemServer } from "./XMLItem";
import type { XMLItemPortable } from "./XMLItem";
import type { EditionPart } from "./_base/Editions";

/**
 * A comment (`<!-- ... -->`) in a document's underlying XML structure.
 */
export interface XMLComment<M extends Mode = 'single'> extends XMLItem<M>, InDesignEdition.XMLComment<M>, InDesignPlugins.XMLComment<M>{
  /** Resolves the proxy into the individual {@link XMLComment} objects it stands for. */
  getElements(): XMLComment<'single'>[];

  /** The insertion point immediately before this comment in its containing story. */
  readonly storyOffset: Read<M, InsertionPoint>;

  /** The text of the XML comment. */
  get value(): Read<M, string>;
  set value(value: string);

  /**
   * Moves the comment to the specified location.
   * @param to The location relative to `reference`, or within the containing object.
   * @param reference The reference object. Required when `to` is {@link LocationOptions.BEFORE} or {@link LocationOptions.AFTER}.
   */
  move(to: LocationOptions, reference?: XMLItem | Text): Read<M, XMLComment>;

  /** Duplicates the comment. */
  duplicate(): Read<M, XMLComment>;
}
/** XMLComment's members only InDesign desktop has, or has differently (tools/codemod/editions.mjs). */
export interface XMLCommentDesktop<M extends Mode = 'single'> extends EditionPart, XMLItemDesktop<M> {}

/** XMLComment's members only InDesign Server has, or has differently (tools/codemod/editions.mjs). */
export interface XMLCommentServer<M extends Mode = 'single'> extends EditionPart, XMLItemServer<M> {}

/** XMLComment's members as both InDesign desktop and InDesign Server have them (tools/codemod/editions.mjs). */
export interface XMLCommentPortable<M extends Mode = 'single'> extends EditionPart, XMLItemPortable<M> {}
