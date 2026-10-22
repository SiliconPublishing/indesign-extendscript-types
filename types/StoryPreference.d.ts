/**
 * StoryPreference.d.ts — indesign-uxp-types
 * Adobe InDesign 2026 (21.x) ExtendScript DOM declarations,
 * converted from indesign-uxp-types by tools/codemod.
 * Version: 1.0.0 · Updated: 2026-09-29
 * Author: Vlad Vladila (Krommatine Systems) · https://github.com/vamitul/indesign-uxp-types
 */
import type { Mode, Read } from './_base/Types';
import type { EventTargetDOMObject } from './_base/DomObjects';
import type { MeasurementValue } from './_base/Types';
import type { Application } from './Application';
import type { Document } from './Document';
import type { ObjectStyle } from './ObjectStyle';
import type { Story } from './Story';
import type { XmlStory } from './XmlStory';
import type { StoryDirectionOptions } from './Enums/StoryDirectionOptions';
import type { EditionPart } from "./_base/Editions";
import type { FrameTypes } from "./Enums/FrameTypes";
import type { StoryHorizontalOrVertical } from "./Enums/StoryHorizontalOrVertical";

/**
 * Story preferences.
 */
export interface StoryPreference<M extends Mode = 'single'> extends EventTargetDOMObject<XmlStory | Application | Document | Story | ObjectStyle, M>, InDesignEdition.StoryPreference<M>, InDesignPlugins.StoryPreference<M> {
  /** Resolves the proxy into the individual {@link StoryPreference} objects it stands for. */
  getElements(): StoryPreference<'single'>[];

  /** If true, adjust the position of characters at the edges of the frame to provide a better appearance. */
  get opticalMarginAlignment(): Read<M, boolean>;
  set opticalMarginAlignment(value: boolean);

  /** The point size used as the basis for calculating optical margin alignment. (Range: 0.1 to 1296). */
  get opticalMarginSize(): Read<M, number>;
  set opticalMarginSize(value: MeasurementValue);

  /** The direction of the story. */
  get storyDirection(): Read<M, StoryDirectionOptions>;
  set storyDirection(value: StoryDirectionOptions);
}
/** StoryPreference's members only InDesign desktop has, or has differently (tools/codemod/editions.mjs). */
export interface StoryPreferenceDesktop<M extends Mode = 'single'> extends EditionPart {}

/** StoryPreference's members only InDesign Server has, or has differently (tools/codemod/editions.mjs). */
export interface StoryPreferenceServer<M extends Mode = 'single'> extends EditionPart {
  /**
   * The type of text frame.
   * Generated from the InDesign Server 21.6 scripting dictionary.
   * InDesign Server only.
   */
  get frameType(): Read<M, FrameTypes>;
  set frameType(value: FrameTypes);

  /**
   * The orientation of the text in the story.
   * Generated from the InDesign Server 21.6 scripting dictionary.
   * InDesign Server only.
   */
  get storyOrientation(): Read<M, StoryHorizontalOrVertical>;
  set storyOrientation(value: StoryHorizontalOrVertical);
}

/** StoryPreference's members as both InDesign desktop and InDesign Server have them (tools/codemod/editions.mjs). */
export interface StoryPreferencePortable<M extends Mode = 'single'> extends EditionPart {}
