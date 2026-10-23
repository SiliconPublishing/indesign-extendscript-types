/**
 * Documents.d.ts — indesign-uxp-types
 * Adobe InDesign 2026 (21.x) ExtendScript DOM declarations,
 * converted from indesign-uxp-types by tools/codemod.
 * Version: 1.0.0 · Updated: 2026-09-29
 * Author: Vlad Vladila (Krommatine Systems) · https://github.com/vamitul/indesign-uxp-types
 */
import type { PropertiesSetter } from './_base/Properties';
import type { DocumentPreset } from './DocumentPreset';
import type {
  NamedCollection,
  IdCollection,
  BaseCollection,
} from './_base/Collections';
import type { Document } from './Document';
import type { EditionPart } from "./_base/Editions";
import type { DocumentPlural } from './Document';

/**
 * A collection of open {@link Document} objects in the current InDesign application session.
 * Indexed documents correspond to open InDesign files; adding to this collection
 * creates and opens a new document.
 *
 * @collection Document
 */
export interface Documents extends InDesignEdition.Documents, InDesignPlugins.Documents {
  /**
   * The number of objects in the collection. Reading it throws once the collection's parent is gone
   * (probe "collection length throws once its parent is gone").
   */
  readonly length: number;
  /**
   * The object at the given position: `doc.pages[0]`. Out of range gives an invalid object, not
   * `undefined` (check `isValid`).
   */
  readonly [index: number]: Document;
  /** Reflection on the collection. */
  readonly reflect: Reflection;
  /** Displays the number of elements in the Collection. */
  count(): number;
  /**
   * Returns the object with the specified index or name.
   *
   * * You can use negative numbers to count backwards from the end of the collection
   * (e.g., `item(-1)` returns the last item, `item(-2)` returns the penultimate item).
   * * If the item does not exist, this method does not throw an error or return `undefined`.
   * It returns an unresolved object proxy. You must check the `.isValid` property to
   * confirm the item exists before interacting with it.
   * @param index The index, negative offset, or exact string name of the item.
   * @returns The requested object (check `.isValid` to ensure it exists).
   */
  item(index: number | string): Document;
  /**
   * Returns a vectorized plural proxy containing all objects between two specified bounds (inclusive).
   *
   * * The two bounds are resolved independently, so they can be of different kinds — an index
   * for one end and an object for the other, as in `itemByRange(0, lastRect)`.
   * * Names are accepted, as with {@link item}: `layers.itemByRange('Top', 'Bottom')`.
   * * Like `everyItem()`, this returns a plural proxy. Operations applied to this proxy are broadcast directly within the native engine for maximum performance.
   * * To convert this proxy into a standard JavaScript array of individual objects, call `.getElements()` on the result.
   * * A range of text (`characters`, `words`, ...) is one piece of text: its reads are
   * one-element arrays, `story.characters.itemByRange(2, 5).contents` → `['cdef']` (which prints
   * as `cdef`), and `parentStory` → `[story]`. Take `[0]`, or `getElements()` for the characters.
   * Per-item members such as `parentTextFrames` give one array per item.
   * @param from The object or index at the beginning of the range.
   * @param to The object or index at the end of the range.
   * @returns A plural proxy representing the items in the resolved range.
   */
  itemByRange(from: number | string | Document, to: number | string | Document): DocumentPlural;
  /**
   * Returns the first object in the collection.
   * * This method tends to be slower than accessing the first item directly via `.item(0)`.
   * * If the collection is empty, it returns an unresolved proxy (check `.isValid`).
   */
  firstItem(): Document;
  /**
   * Returns the last object in the collection.
   * * This method tends to be slower than accessing the last item directly via `.item(-1)`.
   * * If the collection is empty, it returns an unresolved proxy (check `.isValid`).
   */
  lastItem(): Document;
  /**
   * Returns the middle object in the collection.
   * * If the collection is empty, it returns an unresolved proxy (check `.isValid`).
   */
  middleItem(): Document;
  /** * Returns any random object in the collection.
   * * If the collection is empty, it returns an unresolved proxy (check `.isValid`).
   */
  anyItem(): Document;
  /**
   * Returns the object prior to the specified object.
   *
   * * Using this method tends to incur massive performance penalties within the C++ engine. Consider alternatives, such as retrieving the collection as an array via `.everyItem().getElements()` and determining adjacent items in JavaScript.
   * * If the specified object is the first item, or if the collection is empty, it returns an unresolved proxy (check `.isValid`).
   * @param obj The reference object.
   */
  previousItem(obj: Document): Document;
  /**
   * Returns the object following the specified object.
   *
   * * Using this method tends to incur massive performance penalties within the C++ engine. Consider alternatives, such as retrieving the collection as an array via `.everyItem().getElements()` and determining adjacent items in JavaScript.
   * * If the specified object is the last item, or if the collection is empty, it returns an unresolved proxy (check `.isValid`).
   * @param obj The reference object.
   */
  nextItem(obj: Document): Document;
  /**
   * Returns a vectorized plural proxy containing every object in the collection.
   *
   * * A plural proxy allows you to read or write properties, or invoke methods, on all items in the collection simultaneously.
   * * Because this broadcasts the operation directly within the native C++ engine, using `everyItem().propertyName = value` is massively faster than iterating through the collection with a standard JavaScript loop.
   * * To convert this proxy into a standard JavaScript array of individual objects, call `.getElements()` on the result.
   * * @returns A plural proxy representing all items in the collection.
   */
  everyItem(): DocumentPlural;
  /** Generates a string which, if executed, will return the Collection. */
  toSource(): string;
  /** `"[object CollectionName]"`, such as `"[object Pages]"`. */
    toString(): string;
  /** * Returns the object with the specified ID.
   * * If the item does not exist, it returns an unresolved proxy (check `.isValid`).
   * @param id The unique ID.
   */
  itemByID(id: number): Document;
  /** * Returns the object with the specified name.
   * * If the item does not exist, it returns an unresolved proxy (check `.isValid`).
   * @param name The name of the item.
   */
  itemByName(name: string): Document;
}
/** Documents's members only InDesign desktop has, or has differently (tools/codemod/editions.mjs). */
export interface DocumentsDesktop {
  /**
   * Creates a new document from a properties bag alone.
   * InDesign Server 21.6 takes `add(documentPreset?, withProperties?)` instead.
   * @param withProperties Initial values for properties of the new {@link Document}.
   */
  add(withProperties: PropertiesSetter<Document>): Document;
  /**
   * Creates and optionally displays a new InDesign document.
   *
   * If a `documentPreset` is supplied, the new document is initialized with the preset's page
   * size, margins, columns, and other settings. Without a preset, InDesign applies the
   * current application defaults.
   * InDesign Server 21.6 takes `add(documentPreset?, withProperties?)` instead.
   * @param showingWindow If `true`, the new document window is displayed immediately. If `false`, the document is created in the background for faster processing. Defaults to `true`.
   * @param documentPreset The {@link DocumentPreset} to apply to the new document.
   * @param withProperties Initial values for properties of the new Document.
   */
  add(
    showingWindow?: boolean,
    documentPreset?: DocumentPreset,
    withProperties?: PropertiesSetter<Document>,
  ): Document;
}

/** Documents's members only InDesign Server has, or has differently (tools/codemod/editions.mjs). */
export interface DocumentsServer {
  /**
   * Creates a new document from a properties bag alone.
   * InDesign desktop 21.6 takes `add(showingWindow?, documentPreset?, withProperties?)` instead.
   * @param documentPreset The document preset to use. (Optional)
   * @param withProperties Initial values for properties of the new Document (Optional)
   */
  add(documentPreset?: DocumentPreset, withProperties?: object): Document;
  /**
   * Creates and optionally displays a new InDesign document.
   * If a `documentPreset` is supplied, the new document is initialized with the preset's page
   * size, margins, columns, and other settings. Without a preset, InDesign applies the
   * current application defaults.
   * InDesign desktop 21.6 takes `add(showingWindow?, documentPreset?, withProperties?)` instead.
   * @param documentPreset The {@link DocumentPreset} to apply to the new document.
   * @param withProperties Initial values for properties of the new Document.
   */
  add(documentPreset?: DocumentPreset, withProperties?: PropertiesSetter<Document>): Document;
}

/** Documents's members as both InDesign desktop and InDesign Server have them (tools/codemod/editions.mjs). */
export interface DocumentsPortable {
  /**
   * Creates a new document from a properties bag alone.
   * Portable form: the editions' parameters differ after these (desktop `add(showingWindow?, documentPreset?, withProperties?)`, InDesign Server `add(documentPreset?, withProperties?)`). Cast to `InDesignDesktop` or `InDesignServer` types for the rest.
   */
  add(): Document;
  /**
   * Creates and optionally displays a new InDesign document.
   * If a `documentPreset` is supplied, the new document is initialized with the preset's page
   * size, margins, columns, and other settings. Without a preset, InDesign applies the
   * current application defaults.
   * Portable form: the editions' parameters differ after these (desktop `add(showingWindow?, documentPreset?, withProperties?)`, InDesign Server `add(documentPreset?, withProperties?)`). Cast to `InDesignDesktop` or `InDesignServer` types for the rest.
   */
  add(): Document;
}
