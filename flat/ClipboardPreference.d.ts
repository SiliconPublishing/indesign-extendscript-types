/**
 * ClipboardPreference.d.ts — indesign-uxp-types
 * Adobe InDesign 2026 (21.x) ExtendScript DOM declarations,
 * converted from indesign-uxp-types by tools/codemod.
 * Version: 1.0.0 · Updated: 2026-09-29
 * Author: Vlad Vladila (Krommatine Systems) · https://github.com/vamitul/indesign-uxp-types
 */
import type { Mode, Read } from './_base/Types';
import type { EventTargetDOMObject } from './_base/DomObjects';
import type { Application } from './Application';
import type { EditionPart } from "./_base/Editions";
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
 * Settings controlling what format content copies and pastes in, and whether
 * PDF data placed on the system clipboard survives quitting the application.
 */
export interface ClipboardPreference extends InDesignEdition.ClipboardPreference, InDesignPlugins.ClipboardPreference<'single'> {
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
  get properties(): PropertiesGetter<ClipboardPreference, 'single'>;
  /**
   * Sets multiple properties at once from an object literal, in a single call
   * to the native InDesign engine — much faster than assigning each property
   * individually.
   */
  set properties(value: PropertiesSetter<ClipboardPreference, 'single'>);
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
  /** Resolves the proxy into the individual {@link ClipboardPreference} objects it stands for. */
  getElements(): ClipboardPreference[];
  /** If true, includes text attributes when pasting text. */
  get preferStyledTextWhenPasting(): boolean;
  set preferStyledTextWhenPasting(value: boolean);
  /** If true, objects cut or copied from different layers retain their layer assignment when pasted. */
  get pasteRemembersLayers(): boolean;
  set pasteRemembersLayers(value: boolean);
  /** If true, preserves PDF data on the system clipboard when the application exits. */
  get preservePdfClipboardAtQuit(): boolean;
  set preservePdfClipboardAtQuit(value: boolean);
}

/**
 * Settings controlling what format content copies and pastes in, and whether
 * PDF data placed on the system clipboard survives quitting the application.
 */
export interface ClipboardPreferencePlural extends InDesignEdition.ClipboardPreferencePlural, InDesignPlugins.ClipboardPreference<'plural'> {
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
  get properties(): (PropertiesGetter<ClipboardPreferencePlural, 'plural'>)[];
  /**
   * Sets multiple properties at once from an object literal, in a single call
   * to the native InDesign engine — much faster than assigning each property
   * individually.
   */
  set properties(value: PropertiesSetter<ClipboardPreferencePlural, 'plural'>);
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
  /** Resolves the proxy into the individual {@link ClipboardPreference} objects it stands for. */
  getElements(): ClipboardPreference[];
  /** If true, includes text attributes when pasting text. */
  get preferStyledTextWhenPasting(): (boolean)[];
  set preferStyledTextWhenPasting(value: boolean);
  /** If true, objects cut or copied from different layers retain their layer assignment when pasted. */
  get pasteRemembersLayers(): (boolean)[];
  set pasteRemembersLayers(value: boolean);
  /** If true, preserves PDF data on the system clipboard when the application exits. */
  get preservePdfClipboardAtQuit(): (boolean)[];
  set preservePdfClipboardAtQuit(value: boolean);
}
/** ClipboardPreference's members only InDesign desktop has, or has differently (tools/codemod/editions.mjs). */
export interface ClipboardPreferenceDesktop {
  /** If true, pastes PDF if available.
   * Desktop only: InDesign Server 21.6 does not have it. */
  get preferPDFWhenPasting(): boolean;
  /**
   * Desktop only: InDesign Server 21.6 does not have it.
   */
  set preferPDFWhenPasting(value: boolean);
  /** If true, copies PDF to the clipboard.
   * Desktop only: InDesign Server 21.6 does not have it. */
  get copyPDFToClipboard(): boolean;
  /**
   * Desktop only: InDesign Server 21.6 does not have it.
   */
  set copyPDFToClipboard(value: boolean);
  /** If true, shows the Auto Style option.
   * Desktop only: InDesign Server 21.6 does not have it. */
  get showAutoStyleOption(): boolean;
  /**
   * Desktop only: InDesign Server 21.6 does not have it.
   */
  set showAutoStyleOption(value: boolean);
  /** If true, shows paste options when pasting.
   * Desktop only: InDesign Server 21.6 does not have it. */
  get showPasteOptions(): boolean;
  /**
   * Desktop only: InDesign Server 21.6 does not have it.
   */
  set showPasteOptions(value: boolean);
}

/** ClipboardPreference's members only InDesign desktop has, or has differently (tools/codemod/editions.mjs). */
export interface ClipboardPreferenceDesktopPlural {
  /** If true, pastes PDF if available.
   * Desktop only: InDesign Server 21.6 does not have it. */
  get preferPDFWhenPasting(): (boolean)[];
  /**
   * Desktop only: InDesign Server 21.6 does not have it.
   */
  set preferPDFWhenPasting(value: boolean);
  /** If true, copies PDF to the clipboard.
   * Desktop only: InDesign Server 21.6 does not have it. */
  get copyPDFToClipboard(): (boolean)[];
  /**
   * Desktop only: InDesign Server 21.6 does not have it.
   */
  set copyPDFToClipboard(value: boolean);
  /** If true, shows the Auto Style option.
   * Desktop only: InDesign Server 21.6 does not have it. */
  get showAutoStyleOption(): (boolean)[];
  /**
   * Desktop only: InDesign Server 21.6 does not have it.
   */
  set showAutoStyleOption(value: boolean);
  /** If true, shows paste options when pasting.
   * Desktop only: InDesign Server 21.6 does not have it. */
  get showPasteOptions(): (boolean)[];
  /**
   * Desktop only: InDesign Server 21.6 does not have it.
   */
  set showPasteOptions(value: boolean);
}

/** ClipboardPreference's members only InDesign Server has, or has differently (tools/codemod/editions.mjs). */
export interface ClipboardPreferenceServer {
}

/** ClipboardPreference's members only InDesign Server has, or has differently (tools/codemod/editions.mjs). */
export interface ClipboardPreferenceServerPlural {
}

/** ClipboardPreference's members as both InDesign desktop and InDesign Server have them (tools/codemod/editions.mjs). */
export interface ClipboardPreferencePortable {
}

/** ClipboardPreference's members as both InDesign desktop and InDesign Server have them (tools/codemod/editions.mjs). */
export interface ClipboardPreferencePortablePlural {
}
