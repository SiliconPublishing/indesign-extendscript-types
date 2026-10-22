/**
 * NotePreference.d.ts — indesign-uxp-types
 * Adobe InDesign 2026 (21.x) ExtendScript DOM declarations,
 * converted from indesign-uxp-types by tools/codemod.
 * Version: 1.0.0 · Updated: 2026-09-29
 * Author: Vlad Vladila (Krommatine Systems) · https://github.com/vamitul/indesign-uxp-types
 */
import type { Mode, Read } from './_base/Types';
import type { EventTargetDOMObject } from './_base/DomObjects';
import type { Application } from './Application';
import type { InCopyUIColors } from './Enums/InCopyUIColors';
import type { NoteBackgrounds } from './Enums/NoteBackgrounds';
import type { NoteColorChoices } from './Enums/NoteColorChoices';
import type { PropertiesGetter } from './_base/Properties';
import type { PropertiesSetter } from './_base/Properties';
import type { Events } from './Events';
import type { EventListeners } from './EventListeners';
import type { InDesignEventMap } from './_base/Events';
import type { EventHandler } from './_base/Events';
import type { EventListener } from './EventListener';
import type { EventString } from './_base/Events';
import type { Event } from './Event';
import type { FilePath } from './_base/Types';

/**
 * Settings for how notes are colored, and how their content is treated by
 * Find/Change and Spell Check.
 */
export interface NotePreference {
  /**
       * Indicates whether the underlying InDesign DOM object still exists and is valid.
       * Returns `false` if the object has been deleted, closed, or invalidated.
       */
      readonly isValid: boolean;
      /**
       * Reflection on this object: its class name and its properties and methods, as the scripting
       * dictionary describes them.
       */
      readonly reflect: Reflection;
  /**
   * The immediate parent object of this element in the InDesign DOM hierarchy.
   */
  readonly parent: Application;
  /**
   * A snapshot of every editable property on this object.
   *
   * Reads its full state in one call rather than property-by-property.
   */
  get properties(): PropertiesGetter<NotePreference, 'single'>;
  /**
   * Sets multiple properties at once from an object literal, in a single call
   * to the native InDesign engine — much faster than assigning each property
   * individually.
   */
  set properties(value: PropertiesSetter<NotePreference, 'single'>);
  /**
   * Generates a string which, if executed, will return the InDesign object referenced.
   */
  toSource(): string;
  /**
   * Generates the specifier string stringently mapping the path
   * to this object within the InDesign DOM hierarchy (e.g., `/document[@id=1]/rectangle[@id=242]`).
   */
  toSpecifier(): string;
  /**
       * `"[object ClassName]"`, such as `"[object Page]"`. Use {@link toSpecifier} for the object's path.
       */
      toString(): string;
  /**
   * A collection of events
   */
  readonly events: Events;
  /**
   * A collection of event listeners
   */
  readonly eventListeners: EventListeners;
  /**
   * Adds an event listener.
   * @param eventType The event to listen for, such as `beforeSave` or `afterOpen`.
   * @param handler Invoked when the event fires. Either a JavaScript function or a {@link FilePath} referencing an external script.
   * @param captures Obsolete and ignored. Defaults to `false`.
   */
  addEventListener<K extends keyof InDesignEventMap>(
    eventType: K,
    handler: EventHandler<K>,
    captures?: boolean,
  ): EventListener;
  addEventListener(
    eventType: EventString,
    handler: ((event: Event) => void) | FilePath,
    captures?: boolean,
  ): EventListener;
  /**
   * Removes a previously registered event listener. The `eventType`, `handler`,
   * and `captures` must match those passed to {@link addEventListener}.
   * @param captures Obsolete and ignored. Defaults to `false`.
   * @returns `true` if a matching listener was found and removed.
   */
  removeEventListener<K extends keyof InDesignEventMap>(
    eventType: K,
    handler: EventHandler<K>,
    captures?: boolean,
  ): boolean;
  removeEventListener(
    eventType: EventString,
    handler: ((event: Event) => void) | FilePath,
    captures?: boolean,
  ): boolean;
  /** Resolves the proxy into the individual {@link NotePreference} objects it stands for. */
  getElements(): NotePreference[];
  /** Whether a note's background uses the story-galley background color or its own {@link noteColor}. */
  get noteBackgroundColor(): NoteBackgrounds;
  set noteBackgroundColor(value: NoteBackgrounds);
  /** The note color, specified either as an array of three doubles, each in the range 0 to 255 and representing R, G, and B values, or as an InCopy UI color. */
  get noteColor(): number[] | InCopyUIColors;
  set noteColor(value: number[] | InCopyUIColors);
  /** If true, displays note information and some note content when the mouse pointer hovers over a note anchor in layout view or a note bookend in galley or story view. */
  get showNoteTips(): boolean;
  set showNoteTips(value: boolean);
  /** If true, includes inline notes content when using Find/Change commands (in Galley and Story views only). */
  get findAndReplaceNoteContents(): boolean;
  set findAndReplaceNoteContents(value: boolean);
  /** If true, includes inline notes content when using Spell Check (in Galley and Story views only). */
  get spellCheckNotes(): boolean;
  set spellCheckNotes(value: boolean);
  /** Whether a note uses the color assigned to the user, or the fixed {@link noteColor}. */
  get noteColorChoices(): NoteColorChoices;
  set noteColorChoices(value: NoteColorChoices);
}

/**
 * Settings for how notes are colored, and how their content is treated by
 * Find/Change and Spell Check.
 */
export interface NotePreferencePlural {
  /**
       * Indicates whether the underlying InDesign DOM object still exists and is valid.
       * Returns `false` if the object has been deleted, closed, or invalidated.
       */
      readonly isValid: boolean;
      /**
       * Reflection on this object: its class name and its properties and methods, as the scripting
       * dictionary describes them.
       */
      readonly reflect: Reflection;
  /**
   * The immediate parent object of this element in the InDesign DOM hierarchy.
   */
  readonly parent: (Application)[];
  /**
   * A snapshot of every editable property on this object.
   *
   * Reads its full state in one call rather than property-by-property.
   */
  get properties(): (PropertiesGetter<NotePreferencePlural, 'plural'>)[];
  /**
   * Sets multiple properties at once from an object literal, in a single call
   * to the native InDesign engine — much faster than assigning each property
   * individually.
   */
  set properties(value: PropertiesSetter<NotePreferencePlural, 'plural'>);
  /**
   * Generates a string which, if executed, will return the InDesign object referenced.
   */
  toSource(): string;
  /**
   * Generates the specifier string stringently mapping the path
   * to this object within the InDesign DOM hierarchy (e.g., `/document[@id=1]/rectangle[@id=242]`).
   */
  toSpecifier(): string;
  /**
       * `"[object ClassName]"`, such as `"[object Page]"`. Use {@link toSpecifier} for the object's path.
       */
      toString(): string;
  /**
   * A collection of events
   */
  readonly events: Events;
  /**
   * A collection of event listeners
   */
  readonly eventListeners: EventListeners;
  /**
   * Adds an event listener.
   * @param eventType The event to listen for, such as `beforeSave` or `afterOpen`.
   * @param handler Invoked when the event fires. Either a JavaScript function or a {@link FilePath} referencing an external script.
   * @param captures Obsolete and ignored. Defaults to `false`.
   */
  addEventListener<K extends keyof InDesignEventMap>(
    eventType: K,
    handler: EventHandler<K>,
    captures?: boolean,
  ): EventListener;
  addEventListener(
    eventType: EventString,
    handler: ((event: Event) => void) | FilePath,
    captures?: boolean,
  ): EventListener;
  /**
   * Removes a previously registered event listener. The `eventType`, `handler`,
   * and `captures` must match those passed to {@link addEventListener}.
   * @param captures Obsolete and ignored. Defaults to `false`.
   * @returns `true` if a matching listener was found and removed.
   */
  removeEventListener<K extends keyof InDesignEventMap>(
    eventType: K,
    handler: EventHandler<K>,
    captures?: boolean,
  ): boolean;
  removeEventListener(
    eventType: EventString,
    handler: ((event: Event) => void) | FilePath,
    captures?: boolean,
  ): boolean;
  /** Resolves the proxy into the individual {@link NotePreference} objects it stands for. */
  getElements(): NotePreference[];
  /** Whether a note's background uses the story-galley background color or its own {@link noteColor}. */
  get noteBackgroundColor(): (NoteBackgrounds)[];
  set noteBackgroundColor(value: NoteBackgrounds);
  /** The note color, specified either as an array of three doubles, each in the range 0 to 255 and representing R, G, and B values, or as an InCopy UI color. */
  get noteColor(): (number[] | InCopyUIColors)[];
  set noteColor(value: number[] | InCopyUIColors);
  /** If true, displays note information and some note content when the mouse pointer hovers over a note anchor in layout view or a note bookend in galley or story view. */
  get showNoteTips(): (boolean)[];
  set showNoteTips(value: boolean);
  /** If true, includes inline notes content when using Find/Change commands (in Galley and Story views only). */
  get findAndReplaceNoteContents(): (boolean)[];
  set findAndReplaceNoteContents(value: boolean);
  /** If true, includes inline notes content when using Spell Check (in Galley and Story views only). */
  get spellCheckNotes(): (boolean)[];
  set spellCheckNotes(value: boolean);
  /** Whether a note uses the color assigned to the user, or the fixed {@link noteColor}. */
  get noteColorChoices(): (NoteColorChoices)[];
  set noteColorChoices(value: NoteColorChoices);
}
