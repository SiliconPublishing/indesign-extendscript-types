/**
 * DataMerge.d.ts — indesign-uxp-types
 * Adobe InDesign 2026 (21.x) ExtendScript DOM declarations,
 * converted from indesign-uxp-types by tools/codemod.
 * Version: 1.0.0 · Updated: 2026-09-29
 * Author: Vlad Vladila (Krommatine Systems) · https://github.com/vamitul/indesign-uxp-types
 */
import type { Mode, Read } from './_base/Types';
import type { EventTargetDOMObject } from './_base/DomObjects';
import type { Document } from './Document';
import type { DataMergePreference } from './DataMergePreference';
import type { Preferences } from './Preferences';
import type { DataMergeFields } from './DataMergeFields';
import type { PDFExportPreset } from './PDFExportPreset';
import type { FilePath } from './_base/Types';
import type { PropertiesGetter } from './_base/Properties';
import type { PropertiesSetter } from './_base/Properties';
import type { Events } from './Events';
import type { EventListeners } from './EventListeners';
import type { InDesignEventMap } from './_base/Events';
import type { EventHandler } from './_base/Events';
import type { EventListener } from './EventListener';
import type { EventString } from './_base/Events';
import type { Event } from './Event';

/**
 * The document's data merge engine: tracks the selected data source, the
 * fields read from it, and drives merging records into the layout or
 * exporting the merged result directly to PDF.
 */
export interface DataMerge extends InDesignEdition.DataMerge, InDesignPlugins.DataMerge<'single'> {
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
  get properties(): PropertiesGetter<DataMerge, 'single'>;
  /**
   * Sets multiple properties at once from an object literal, in a single call
   * to the native InDesign engine — much faster than assigning each property
   * individually.
   */
  set properties(value: PropertiesSetter<DataMerge, 'single'>);
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
  /** Resolves the proxy into the individual {@link DataMerge} objects it stands for. */
  getElements(): DataMerge[];
  /** The layout and content preferences applied to each merged target page. */
  readonly dataMergePreferences: DataMergePreference;
  /** The document's preferences objects. */
  readonly preferences: Preferences;
  /** The fields read from the current data source. */
  readonly dataMergeFields: DataMergeFields;
  /** Sets the file used as the data source. */
  selectDataSource(dataSourceFile: FilePath): void;
  /** Re-reads the data source file, refreshing {@link dataMergeFields} with its current content. */
  updateDataSource(): void;
  /** Clears the selected data source. */
  removeDataSource(): void;
  /**
   * Merges every record from the data source into the document, generating
   * one target page (or page range) per record.
   * @param outputOversetReportFile The file to write an overset-text report to.
   */
  mergeRecords(outputOversetReportFile?: FilePath): void;
  /**
   * Merges every record and exports the result directly to a PDF file,
   * without generating merged pages in the document.
   * @param to The destination PDF file.
   * @param using The PDF export preset to use.
   * @param outputOversetReportFile The file to write an overset-text report to.
   */
  exportFile(to: FilePath, using?: PDFExportPreset, outputOversetReportFile?: FilePath): void;
}

/**
 * The document's data merge engine: tracks the selected data source, the
 * fields read from it, and drives merging records into the layout or
 * exporting the merged result directly to PDF.
 */
export interface DataMergePlural extends InDesignEdition.DataMergePlural, InDesignPlugins.DataMerge<'plural'> {
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
  get properties(): (PropertiesGetter<DataMergePlural, 'plural'>)[];
  /**
   * Sets multiple properties at once from an object literal, in a single call
   * to the native InDesign engine — much faster than assigning each property
   * individually.
   */
  set properties(value: PropertiesSetter<DataMergePlural, 'plural'>);
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
  /** Resolves the proxy into the individual {@link DataMerge} objects it stands for. */
  getElements(): DataMerge[];
  /** The layout and content preferences applied to each merged target page. */
  readonly dataMergePreferences: (DataMergePreference)[];
  /** The document's preferences objects. */
  readonly preferences: Preferences;
  /** The fields read from the current data source. */
  readonly dataMergeFields: DataMergeFields;
  /** Sets the file used as the data source. */
  selectDataSource(dataSourceFile: FilePath): (void)[];
  /** Re-reads the data source file, refreshing {@link dataMergeFields} with its current content. */
  updateDataSource(): (void)[];
  /** Clears the selected data source. */
  removeDataSource(): (void)[];
  /**
   * Merges every record from the data source into the document, generating
   * one target page (or page range) per record.
   * @param outputOversetReportFile The file to write an overset-text report to.
   */
  mergeRecords(outputOversetReportFile?: FilePath): (void)[];
  /**
   * Merges every record and exports the result directly to a PDF file,
   * without generating merged pages in the document.
   * @param to The destination PDF file.
   * @param using The PDF export preset to use.
   * @param outputOversetReportFile The file to write an overset-text report to.
   */
  exportFile(to: FilePath, using?: PDFExportPreset, outputOversetReportFile?: FilePath): (void)[];
}
