/**
 * Language.d.ts — indesign-uxp-types
 * Adobe InDesign 2026 (21.x) ExtendScript DOM declarations,
 * converted from indesign-uxp-types by tools/codemod.
 * Version: 1.0.0 · Updated: 2026-09-29
 * Author: Vlad Vladila (Krommatine Systems) · https://github.com/vamitul/indesign-uxp-types
 */
import type { Mode, Read } from './_base/Types';
import type { LabelableEventDOMObject, IndexedDOMObject, ReadonlyNamedDOMObject } from './_base/DomObjects';
import type { Document } from './Document';
import type { EditionPart } from "./_base/Editions";
import type { Events } from './Events';
import type { EventListeners } from './EventListeners';
import type { InDesignEventMap } from './_base/Events';
import type { EventHandler } from './_base/Events';
import type { EventListener } from './EventListener';
import type { EventString } from './_base/Events';
import type { Event } from './Event';
import type { FilePath } from './_base/Types';
import type { PropertiesGetter } from './_base/Properties';
import type { PropertiesSetter } from './_base/Properties';

/**
 * The language on which hyphenation rules and spell checking are based, as applied to a text
 * range through its `appliedLanguage`.
 */
export interface Language extends InDesignEdition.Language, InDesignPlugins.Language<'single'> {
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
  /**
   * A property that can be set to any string.
   * Note: In InDesign's UI this is user viewable and modifiable via the Script Label panel.
   */
  get label(): string;
  set label(value: string);
  /**
   * Sets the label to the value associated with the specified key.
   */
  insertLabel(key: string, value: string): void;
  /**
   * Gets the label value associated with the specified key.
   */
  extractLabel(key: string): string;
  /**
   * The index of the object within its containing parent.
   */
  readonly index: number;
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
  readonly parent: Document;
  /**
   * A snapshot of every editable property on this object.
   *
   * Reads its full state in one call rather than property-by-property.
   */
  get properties(): PropertiesGetter<Language, 'single'>;
  /**
   * Sets multiple properties at once from an object literal, in a single call
   * to the native InDesign engine — much faster than assigning each property
   * individually.
   */
  set properties(value: PropertiesSetter<Language, 'single'>);
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
  /** The object's name. Derived by InDesign and not assignable. */
  readonly name: string;
  /** Resolves the proxy into the individual {@link Language} objects it stands for. */
  getElements(): Language[];
  /** The unique numeric ID of the language within its document. */
  readonly id: number;
  /** The full name of the language's ICU locale, used by ICU-based text services. */
  readonly icuLocaleName: string;
  /** The single-quote pair used for this language, e.g. `'‘’'`. */
  get singleQuotes(): string;
  set singleQuotes(value: string);
  /** The double-quote pair used for this language, e.g. `'“”'`. */
  get doubleQuotes(): string;
  set doubleQuotes(value: string);
  /** The source of the hyphenation rules applied to text in this language. */
  get hyphenationVendor(): string;
  set hyphenationVendor(value: string);
  /** The source of the spell-checking dictionary applied to text in this language. */
  get spellingVendor(): string;
  set spellingVendor(value: string);
}

/**
 * The language on which hyphenation rules and spell checking are based, as applied to a text
 * range through its `appliedLanguage`.
 */
export interface LanguagePlural extends InDesignEdition.LanguagePlural, InDesignPlugins.Language<'plural'> {
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
  /**
   * A property that can be set to any string.
   * Note: In InDesign's UI this is user viewable and modifiable via the Script Label panel.
   */
  get label(): (string)[];
  set label(value: string);
  /**
   * Sets the label to the value associated with the specified key.
   */
  insertLabel(key: string, value: string): (void)[];
  /**
   * Gets the label value associated with the specified key.
   */
  extractLabel(key: string): (string)[];
  /**
   * The index of the object within its containing parent.
   */
  readonly index: (number)[];
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
  readonly parent: (Document)[];
  /**
   * A snapshot of every editable property on this object.
   *
   * Reads its full state in one call rather than property-by-property.
   */
  get properties(): (PropertiesGetter<LanguagePlural, 'plural'>)[];
  /**
   * Sets multiple properties at once from an object literal, in a single call
   * to the native InDesign engine — much faster than assigning each property
   * individually.
   */
  set properties(value: PropertiesSetter<LanguagePlural, 'plural'>);
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
  /** The object's name. Derived by InDesign and not assignable. */
  readonly name: (string)[];
  /** Resolves the proxy into the individual {@link Language} objects it stands for. */
  getElements(): Language[];
  /** The unique numeric ID of the language within its document. */
  readonly id: (number)[];
  /** The full name of the language's ICU locale, used by ICU-based text services. */
  readonly icuLocaleName: (string)[];
  /** The single-quote pair used for this language, e.g. `'‘’'`. */
  get singleQuotes(): (string)[];
  set singleQuotes(value: string);
  /** The double-quote pair used for this language, e.g. `'“”'`. */
  get doubleQuotes(): (string)[];
  set doubleQuotes(value: string);
  /** The source of the hyphenation rules applied to text in this language. */
  get hyphenationVendor(): (string)[];
  set hyphenationVendor(value: string);
  /** The source of the spell-checking dictionary applied to text in this language. */
  get spellingVendor(): (string)[];
  set spellingVendor(value: string);
}
/** Language's members only InDesign desktop has, or has differently (tools/codemod/editions.mjs). */
export interface LanguageDesktop {
  /** The untranslated (English) name of the language.
   * Desktop only: InDesign Server 21.6 does not have it. */
  readonly untranslatedName: string;
}

/** Language's members only InDesign desktop has, or has differently (tools/codemod/editions.mjs). */
export interface LanguageDesktopPlural {
  /** The untranslated (English) name of the language.
   * Desktop only: InDesign Server 21.6 does not have it. */
  readonly untranslatedName: (string)[];
}

/** Language's members only InDesign Server has, or has differently (tools/codemod/editions.mjs). */
export interface LanguageServer {
}

/** Language's members only InDesign Server has, or has differently (tools/codemod/editions.mjs). */
export interface LanguageServerPlural {
}

/** Language's members as both InDesign desktop and InDesign Server have them (tools/codemod/editions.mjs). */
export interface LanguagePortable {
}

/** Language's members as both InDesign desktop and InDesign Server have them (tools/codemod/editions.mjs). */
export interface LanguagePortablePlural {
}
