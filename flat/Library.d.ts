/**
 * Library.d.ts — indesign-uxp-types
 * Adobe InDesign 2026 (21.x) ExtendScript DOM declarations,
 * converted from indesign-uxp-types by tools/codemod.
 * Version: 1.0.0 · Updated: 2026-09-29
 * Author: Vlad Vladila (Krommatine Systems) · https://github.com/vamitul/indesign-uxp-types
 */
import type { Mode, Read } from './_base/Types';
import type { EventTargetDOMObject, IndexedDOMObject } from './_base/DomObjects';
import type { Application } from './Application';
import type { Assets } from './Assets';
import type { Asset } from './Asset';
import type { Panel } from './Panel';
import type { PageItem } from './PageItem';
import type { Movie } from './Movie';
import type { Sound } from './Sound';
import type { Graphic } from './Graphic';
import type { XMLElement } from './XMLElement';
import type { File, Folder } from './_base/Types';
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
 * An object library file (`.indl`) that stores reusable page items, graphics,
 * and text as {@link Asset}s for drag-and-drop reuse across documents.
 */
export interface Library extends InDesignEdition.Library, InDesignPlugins.Library<'single'> {
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
  get properties(): PropertiesGetter<Library, 'single'>;
  /**
   * Sets multiple properties at once from an object literal, in a single call
   * to the native InDesign engine — much faster than assigning each property
   * individually.
   */
  set properties(value: PropertiesSetter<Library, 'single'>);
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
   * The index of the object within its containing parent.
   */
  readonly index: number;
  /** Resolves the proxy into the individual {@link Library} objects it stands for. */
  getElements(): Library[];
  /** The name of the library. */
  readonly name: string;
  /** The full path to the library file, including its name. */
  readonly fullName: File;
  /** The full path to the library file. */
  readonly filePath: Folder;
  /** The library's assets. */
  readonly assets: Assets;
  /** Closes the library. */
  close(): void;
  /**
   * Stores the specified object(s) in the library as a new asset.
   * @param using The page item(s), or other content, to store.
   * @param withProperties Initial values for properties of the new asset.
   */
  store(
    using: Array<PageItem | Movie | Sound | Graphic | XMLElement>,
    withProperties?: Object,
  ): Asset;
}

/**
 * An object library file (`.indl`) that stores reusable page items, graphics,
 * and text as {@link Asset}s for drag-and-drop reuse across documents.
 */
export interface LibraryPlural extends InDesignEdition.LibraryPlural, InDesignPlugins.Library<'plural'> {
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
  get properties(): (PropertiesGetter<LibraryPlural, 'plural'>)[];
  /**
   * Sets multiple properties at once from an object literal, in a single call
   * to the native InDesign engine — much faster than assigning each property
   * individually.
   */
  set properties(value: PropertiesSetter<LibraryPlural, 'plural'>);
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
   * The index of the object within its containing parent.
   */
  readonly index: (number)[];
  /** Resolves the proxy into the individual {@link Library} objects it stands for. */
  getElements(): Library[];
  /** The name of the library. */
  readonly name: (string)[];
  /** The full path to the library file, including its name. */
  readonly fullName: (File)[];
  /** The full path to the library file. */
  readonly filePath: (Folder)[];
  /** The library's assets. */
  readonly assets: Assets;
  /** Closes the library. */
  close(): (void)[];
  /**
   * Stores the specified object(s) in the library as a new asset.
   * @param using The page item(s), or other content, to store.
   * @param withProperties Initial values for properties of the new asset.
   */
  store(
    using: Array<PageItem | Movie | Sound | Graphic | XMLElement>,
    withProperties?: Object,
  ): Asset;
}
/** Library's members only InDesign desktop has, or has differently (tools/codemod/editions.mjs). */
export interface LibraryDesktop {
  /** The panel associated with this library.
   * Desktop only: InDesign Server 21.6 does not have it. */
  readonly associatedPanel: Panel;
}

/** Library's members only InDesign desktop has, or has differently (tools/codemod/editions.mjs). */
export interface LibraryDesktopPlural {
  /** The panel associated with this library.
   * Desktop only: InDesign Server 21.6 does not have it. */
  readonly associatedPanel: (Panel)[];
}

/** Library's members only InDesign Server has, or has differently (tools/codemod/editions.mjs). */
export interface LibraryServer {
}

/** Library's members only InDesign Server has, or has differently (tools/codemod/editions.mjs). */
export interface LibraryServerPlural {
}

/** Library's members as both InDesign desktop and InDesign Server have them (tools/codemod/editions.mjs). */
export interface LibraryPortable {
}

/** Library's members as both InDesign desktop and InDesign Server have them (tools/codemod/editions.mjs). */
export interface LibraryPortablePlural {
}
