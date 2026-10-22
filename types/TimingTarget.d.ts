/**
 * TimingTarget.d.ts — indesign-uxp-types
 * Adobe InDesign 2026 (21.x) ExtendScript DOM declarations,
 * converted from indesign-uxp-types by tools/codemod.
 * Version: 1.0.0 · Updated: 2026-09-29
 * Author: Vlad Vladila (Krommatine Systems) · https://github.com/vamitul/indesign-uxp-types
 */
import type { DynamicTarget } from './_base/Unions';
import type { Mode, Read } from './_base/Types';
import type { EventTargetDOMObject, IndexedDOMObject } from './_base/DomObjects';
import type { TimingGroup } from './TimingGroup';
import type { LocationOptions } from './Enums/LocationOptions';
import type { TimingList } from './TimingList';
import type { Spread } from "./Spread";

/**
 * A single animated, media, or button-behavior target within a
 * {@link TimingGroup}, optionally delayed relative to the group's start.
 */
export interface TimingTarget<M extends Mode = 'single'>
  extends EventTargetDOMObject<TimingGroup | Spread, M>,
    IndexedDOMObject<TimingGroup | Spread, M>, InDesignPlugins.TimingTarget<M> {
  /** Resolves the proxy into the individual {@link TimingTarget} objects it stands for. */
  getElements(): TimingTarget<'single'>[];

  /**
   * The interactive page item this target times: an object with an
   * animation applied (where `animationSettings.hasCustomSettings` is
   * `true`), a button behavior, or a media clip.
   */
  get dynamicTarget(): Read<M, DynamicTarget | undefined>;
  set dynamicTarget(value: DynamicTarget);

  /** The delay in seconds before this target starts, measured from when the previous group finishes. Range `0`–`60`. */
  get delaySeconds(): Read<M, number | undefined>;
  set delaySeconds(value: number);

  /** Whether the animation reverses on roll-off. Only meaningful when the trigger event is self roll-off. */
  get reverseAnimation(): Read<M, boolean | undefined>;
  set reverseAnimation(value: boolean);

  /** Deletes the timing target. */
  remove(): Read<M, void>;

  /** Unlinks this target from its group and appends it to the end of the parent {@link TimingList}. */
  unlink(): Read<M, void>;

  /**
   * Moves the timing target to a new location.
   * @param to The location relative to `reference`, or within the containing object.
   * @param reference The reference object. Required when `to` is {@link LocationOptions.BEFORE} or {@link LocationOptions.AFTER}.
   */
  move(to: LocationOptions, reference?: TimingGroup | TimingTarget | TimingList): Read<M, TimingTarget>;
}
