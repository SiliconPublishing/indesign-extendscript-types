/**
 * XMLInstruction.d.ts — indesign-uxp-types
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
 * An XML processing instruction (`<?target data?>`) in a document's underlying
 * XML structure.
 */
export interface XMLInstruction<M extends Mode = 'single'> extends XMLItem<M>, InDesignEdition.XMLInstruction<M>, InDesignPlugins.XMLInstruction<M>{
  /** Resolves the proxy into the individual {@link XMLInstruction} objects it stands for. */
  getElements(): XMLInstruction<'single'>[];

  /** The insertion point immediately before this instruction in its containing story. */
  readonly storyOffset: Read<M, InsertionPoint>;

  /** A name that identifies the processing instruction to an application reading the exported XML file. */
  get target(): Read<M, string>;
  set target(value: string);

  /** A value that tells the application reading the exported XML file what to do with the processing instruction. */
  get data(): Read<M, string>;
  set data(value: string);

  /**
   * Moves the instruction to the specified location.
   * @param to The location relative to `reference`, or within the containing object.
   * @param reference The reference object. Required when `to` is {@link LocationOptions.BEFORE} or {@link LocationOptions.AFTER}.
   */
  move(to: LocationOptions, reference?: XMLItem | Text): Read<M, XMLInstruction>;

  /** Duplicates the instruction. */
  duplicate(): Read<M, XMLInstruction>;
}
/** XMLInstruction's members only InDesign desktop has, or has differently (tools/codemod/editions.mjs). */
export interface XMLInstructionDesktop<M extends Mode = 'single'> extends EditionPart, XMLItemDesktop<M> {}

/** XMLInstruction's members only InDesign Server has, or has differently (tools/codemod/editions.mjs). */
export interface XMLInstructionServer<M extends Mode = 'single'> extends EditionPart, XMLItemServer<M> {}

/** XMLInstruction's members as both InDesign desktop and InDesign Server have them (tools/codemod/editions.mjs). */
export interface XMLInstructionPortable<M extends Mode = 'single'> extends EditionPart, XMLItemPortable<M> {}
