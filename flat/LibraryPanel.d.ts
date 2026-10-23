/**
 * LibraryPanel.d.ts — indesign-uxp-types
 * Adobe InDesign 2026 (21.x) ExtendScript DOM declarations,
 * converted from indesign-uxp-types by tools/codemod.
 * Version: 1.0.0 · Updated: 2026-09-29
 * Author: Vlad Vladila (Krommatine Systems) · https://github.com/vamitul/indesign-uxp-types
 */
import type { Mode, Read } from './_base/Types';
import type { Panel } from './Panel';
import type { Library } from './Library';
import type { Asset } from './Asset';
import type { LibraryPanelViews } from './Enums/LibraryPanelViews';
import type { SortAssets } from './Enums/SortAssets';
import type { NothingEnum } from './Enums/NothingEnum';
import type { SelectionOptions } from './Enums/SelectionOptions';
import type { SelectAll } from './Enums/SelectAll';
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
import type { Application } from './Application';

/**
 * The panel showing one open {@link Library} — its assets, their display mode,
 * and the current asset selection.
 *
 * A view onto the library, not the library itself: add and remove assets
 * through {@link associatedLibrary}, and use this panel only to control what the
 * user sees and has selected.
 */
export interface LibraryPanel extends InDesignEdition.LibraryPanel, InDesignPlugins.LibraryPanel<'single'> {
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
  get properties(): PropertiesGetter<LibraryPanel, 'single'>;
  /**
   * Sets multiple properties at once from an object literal, in a single call
   * to the native InDesign engine — much faster than assigning each property
   * individually.
   */
  set properties(value: PropertiesSetter<LibraryPanel, 'single'>);
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
  /** The name of the Panel. */
  readonly name: string;
  /** Whether the panel is visible. */
  get visible(): boolean;
  set visible(value: boolean);
  /** Resolves the proxy into the individual {@link LibraryPanel} objects it stands for. */
  getElements(): LibraryPanel[];
  /** The {@link Library} this panel is showing. */
  readonly associatedLibrary: Library;
  /** How assets are displayed — thumbnails, a list, or names only. */
  get view(): LibraryPanelViews;
  set view(value: LibraryPanelViews);
  /** The order assets are listed in. */
  get sortOrder(): SortAssets;
  set sortOrder(value: SortAssets);
  /**
   * The selected {@link Asset}(s). Assign a single asset, an array of them, or
   * {@link NothingEnum.NOTHING} to clear the selection.
   */
  get selection(): Asset[];
  set selection(value: Asset | Asset[] | NothingEnum);
  /** Clears any active filter so every asset in the library is listed. */
  showAll(): void;
  /**
   * Selects the given asset(s) in the panel.
   * @param selectableItems An {@link Asset}, an array of them, {@link SelectAll.ALL} for every
   * asset in the library, or {@link NothingEnum.NOTHING} to deselect everything.
   * @param existingSelection How this selection combines with the current one.
   * Defaults to {@link SelectionOptions.REPLACE_WITH}.
   */
  select(
    selectableItems: Asset | Asset[] | SelectAll | NothingEnum,
    existingSelection?: SelectionOptions,
  ): void;
}

/**
 * The panel showing one open {@link Library} — its assets, their display mode,
 * and the current asset selection.
 *
 * A view onto the library, not the library itself: add and remove assets
 * through {@link associatedLibrary}, and use this panel only to control what the
 * user sees and has selected.
 */
export interface LibraryPanelPlural extends InDesignEdition.LibraryPanelPlural, InDesignPlugins.LibraryPanel<'plural'> {
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
  get properties(): (PropertiesGetter<LibraryPanelPlural, 'plural'>)[];
  /**
   * Sets multiple properties at once from an object literal, in a single call
   * to the native InDesign engine — much faster than assigning each property
   * individually.
   */
  set properties(value: PropertiesSetter<LibraryPanelPlural, 'plural'>);
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
  /** The name of the Panel. */
  readonly name: (string)[];
  /** Whether the panel is visible. */
  get visible(): (boolean)[];
  set visible(value: boolean);
  /** Resolves the proxy into the individual {@link LibraryPanel} objects it stands for. */
  getElements(): LibraryPanel[];
  /** The {@link Library} this panel is showing. */
  readonly associatedLibrary: (Library)[];
  /** How assets are displayed — thumbnails, a list, or names only. */
  get view(): (LibraryPanelViews)[];
  set view(value: LibraryPanelViews);
  /** The order assets are listed in. */
  get sortOrder(): (SortAssets)[];
  set sortOrder(value: SortAssets);
  /**
   * The selected {@link Asset}(s). Assign a single asset, an array of them, or
   * {@link NothingEnum.NOTHING} to clear the selection.
   */
  get selection(): (Asset[])[];
  set selection(value: Asset | Asset[] | NothingEnum);
  /** Clears any active filter so every asset in the library is listed. */
  showAll(): (void)[];
  /**
   * Selects the given asset(s) in the panel.
   * @param selectableItems An {@link Asset}, an array of them, {@link SelectAll.ALL} for every
   * asset in the library, or {@link NothingEnum.NOTHING} to deselect everything.
   * @param existingSelection How this selection combines with the current one.
   * Defaults to {@link SelectionOptions.REPLACE_WITH}.
   */
  select(
    selectableItems: Asset | Asset[] | SelectAll | NothingEnum,
    existingSelection?: SelectionOptions,
  ): (void)[];
}
