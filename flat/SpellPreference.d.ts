/**
 * SpellPreference.d.ts — indesign-uxp-types
 * Adobe InDesign 2026 (21.x) ExtendScript DOM declarations,
 * converted from indesign-uxp-types by tools/codemod.
 * Version: 1.0.0 · Updated: 2026-09-29
 * Author: Vlad Vladila (Krommatine Systems) · https://github.com/vamitul/indesign-uxp-types
 */
import type { Mode, Read } from './_base/Types';
import type { EventTargetDOMObject } from './_base/DomObjects';
import type { Application } from './Application';
import type { UIColors } from './Enums/UIColors';
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
 * Spell-check preferences.
 */
export interface SpellPreference extends InDesignEdition.SpellPreference, InDesignPlugins.SpellPreference<'single'> {
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
  get properties(): PropertiesGetter<SpellPreference, 'single'>;
  /**
   * Sets multiple properties at once from an object literal, in a single call
   * to the native InDesign engine — much faster than assigning each property
   * individually.
   */
  set properties(value: PropertiesSetter<SpellPreference, 'single'>);
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
  /** Resolves the proxy into the individual {@link SpellPreference} objects it stands for. */
  getElements(): SpellPreference[];
  /**
   * If true, underlines misspelled and repeated words, uncapitalized proper
   * nouns, and uncapitalized first words in sentences.
   *
   * Only underlines a given category if its own check is also enabled:
   * {@link checkMisspelledWords}, {@link checkRepeatedWords}, {@link checkCapitalizedWords},
   * and {@link checkCapitalizedSentences}.
   */
  get dynamicSpellCheck(): boolean;
  set dynamicSpellCheck(value: boolean);
  /**
   * The underline color for misspelled words, specified either as an array of three doubles,
   * each in the range 0 to 255 and representing R, G, and B values, or as a UI color.
   *
   * Applies only when both {@link dynamicSpellCheck} and {@link checkMisspelledWords} are `true`.
   */
  get misspelledWordColor(): number[] | UIColors;
  set misspelledWordColor(value: number[] | UIColors);
  /**
   * The underline color for repeated words, specified either as an array of three doubles,
   * each in the range 0 to 255 and representing R, G, and B values, or as a UI color.
   *
   * Applies only when both {@link dynamicSpellCheck} and {@link checkRepeatedWords} are `true`.
   */
  get repeatedWordColor(): number[] | UIColors;
  set repeatedWordColor(value: number[] | UIColors);
  /**
   * The underline color for uncapitalized proper nouns, specified either as an array of three
   * doubles, each in the range 0 to 255 and representing R, G, and B values, or as a UI
   * color.
   *
   * Applies only when both {@link dynamicSpellCheck} and {@link checkCapitalizedWords} are `true`.
   */
  get uncapitalizedWordColor(): number[] | UIColors;
  set uncapitalizedWordColor(value: number[] | UIColors);
  /**
   * The underline color for the first word in sentences that do not begin with a capital
   * letter, specified either as an array of three doubles, each in the range 0 to 255 and
   * representing R, G, and B values, or as a UI color.
   *
   * Applies only when both {@link dynamicSpellCheck} and {@link checkCapitalizedSentences} are `true`.
   */
  get uncapitalizedSentenceColor(): number[] | UIColors;
  set uncapitalizedSentenceColor(value: number[] | UIColors);
  /** If true, checks for misspelled words. */
  get checkMisspelledWords(): boolean;
  set checkMisspelledWords(value: boolean);
  /** If true, checks for repeated words. */
  get checkRepeatedWords(): boolean;
  set checkRepeatedWords(value: boolean);
  /** If true, checks for uncapitalized proper nouns. */
  get checkCapitalizedWords(): boolean;
  set checkCapitalizedWords(value: boolean);
  /** If true, checks for uncapitalized first words in sentences. */
  get checkCapitalizedSentences(): boolean;
  set checkCapitalizedSentences(value: boolean);
}

/**
 * Spell-check preferences.
 */
export interface SpellPreferencePlural extends InDesignEdition.SpellPreferencePlural, InDesignPlugins.SpellPreference<'plural'> {
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
  get properties(): (PropertiesGetter<SpellPreferencePlural, 'plural'>)[];
  /**
   * Sets multiple properties at once from an object literal, in a single call
   * to the native InDesign engine — much faster than assigning each property
   * individually.
   */
  set properties(value: PropertiesSetter<SpellPreferencePlural, 'plural'>);
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
  /** Resolves the proxy into the individual {@link SpellPreference} objects it stands for. */
  getElements(): SpellPreference[];
  /**
   * If true, underlines misspelled and repeated words, uncapitalized proper
   * nouns, and uncapitalized first words in sentences.
   *
   * Only underlines a given category if its own check is also enabled:
   * {@link checkMisspelledWords}, {@link checkRepeatedWords}, {@link checkCapitalizedWords},
   * and {@link checkCapitalizedSentences}.
   */
  get dynamicSpellCheck(): (boolean)[];
  set dynamicSpellCheck(value: boolean);
  /**
   * The underline color for misspelled words, specified either as an array of three doubles,
   * each in the range 0 to 255 and representing R, G, and B values, or as a UI color.
   *
   * Applies only when both {@link dynamicSpellCheck} and {@link checkMisspelledWords} are `true`.
   */
  get misspelledWordColor(): (number[] | UIColors)[];
  set misspelledWordColor(value: number[] | UIColors);
  /**
   * The underline color for repeated words, specified either as an array of three doubles,
   * each in the range 0 to 255 and representing R, G, and B values, or as a UI color.
   *
   * Applies only when both {@link dynamicSpellCheck} and {@link checkRepeatedWords} are `true`.
   */
  get repeatedWordColor(): (number[] | UIColors)[];
  set repeatedWordColor(value: number[] | UIColors);
  /**
   * The underline color for uncapitalized proper nouns, specified either as an array of three
   * doubles, each in the range 0 to 255 and representing R, G, and B values, or as a UI
   * color.
   *
   * Applies only when both {@link dynamicSpellCheck} and {@link checkCapitalizedWords} are `true`.
   */
  get uncapitalizedWordColor(): (number[] | UIColors)[];
  set uncapitalizedWordColor(value: number[] | UIColors);
  /**
   * The underline color for the first word in sentences that do not begin with a capital
   * letter, specified either as an array of three doubles, each in the range 0 to 255 and
   * representing R, G, and B values, or as a UI color.
   *
   * Applies only when both {@link dynamicSpellCheck} and {@link checkCapitalizedSentences} are `true`.
   */
  get uncapitalizedSentenceColor(): (number[] | UIColors)[];
  set uncapitalizedSentenceColor(value: number[] | UIColors);
  /** If true, checks for misspelled words. */
  get checkMisspelledWords(): (boolean)[];
  set checkMisspelledWords(value: boolean);
  /** If true, checks for repeated words. */
  get checkRepeatedWords(): (boolean)[];
  set checkRepeatedWords(value: boolean);
  /** If true, checks for uncapitalized proper nouns. */
  get checkCapitalizedWords(): (boolean)[];
  set checkCapitalizedWords(value: boolean);
  /** If true, checks for uncapitalized first words in sentences. */
  get checkCapitalizedSentences(): (boolean)[];
  set checkCapitalizedSentences(value: boolean);
}
