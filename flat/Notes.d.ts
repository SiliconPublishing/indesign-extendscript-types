/**
 * Notes.d.ts — indesign-uxp-types
 * Adobe InDesign 2026 (21.x) ExtendScript DOM declarations,
 * converted from indesign-uxp-types by tools/codemod.
 * Version: 1.0.0 · Updated: 2026-09-29
 * Author: Vlad Vladila (Krommatine Systems) · https://github.com/vamitul/indesign-uxp-types
 */
import type { InsertionPoint } from './InsertionPoint';
import type {
  AddableTextElementCollection,
  NamedCollection,
  IdCollection,
  BaseCollection,
} from './_base/Collections';
import type { Note } from './Note';
import type { LocationOptions } from './Enums/LocationOptions';
import type { NotePlural } from './Note';
import type { PropertiesSetter } from './_base/Properties';

/**
 * A collection of {@link Note} objects within a story or text range. Notes are
 * non-printing annotations typically used for internal editorial comments
 * and feedback.
 *
 * @collection Note
 */
export interface Notes extends InDesignEdition.Notes, InDesignPlugins.Notes {
  /**
   * The number of objects in the collection. Reading it throws once the collection's parent is gone
   * (probe "collection length throws once its parent is gone").
   */
  readonly length: number;
  /**
   * The object at the given position: `doc.pages[0]`. Out of range gives an invalid object, not
   * `undefined` (check `isValid`).
   */
  readonly [index: number]: Note;
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
  item(index: number | string): Note;
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
   * as `cdef`), and `parentStory` → `[story]`: take `[0]`. `getElements()` resolves the whole range
   * to a single `Text` (`contents` a plain string), the form to pass on; its `characters` are the
   * individual characters.
   * Per-item members such as `parentTextFrames` give one array per item.
   * @param from The object or index at the beginning of the range.
   * @param to The object or index at the end of the range.
   * @returns A plural proxy representing the items in the resolved range.
   */
  itemByRange(from: number | string | Note, to: number | string | Note): NotePlural;
  /**
   * Returns the first object in the collection.
   * * This method tends to be slower than accessing the first item directly via `.item(0)`.
   * * If the collection is empty, it returns an unresolved proxy (check `.isValid`).
   */
  firstItem(): Note;
  /**
   * Returns the last object in the collection.
   * * This method tends to be slower than accessing the last item directly via `.item(-1)`.
   * * If the collection is empty, it returns an unresolved proxy (check `.isValid`).
   */
  lastItem(): Note;
  /**
   * Returns the middle object in the collection.
   * * If the collection is empty, it returns an unresolved proxy (check `.isValid`).
   */
  middleItem(): Note;
  /** * Returns any random object in the collection.
   * * If the collection is empty, it returns an unresolved proxy (check `.isValid`).
   */
  anyItem(): Note;
  /**
   * Returns the object prior to the specified object.
   *
   * * Using this method tends to incur massive performance penalties within the C++ engine. Consider alternatives, such as retrieving the collection as an array via `.everyItem().getElements()` and determining adjacent items in JavaScript.
   * * If the specified object is the first item, or if the collection is empty, it returns an unresolved proxy (check `.isValid`).
   * @param obj The reference object.
   */
  previousItem(obj: Note): Note;
  /**
   * Returns the object following the specified object.
   *
   * * Using this method tends to incur massive performance penalties within the C++ engine. Consider alternatives, such as retrieving the collection as an array via `.everyItem().getElements()` and determining adjacent items in JavaScript.
   * * If the specified object is the last item, or if the collection is empty, it returns an unresolved proxy (check `.isValid`).
   * @param obj The reference object.
   */
  nextItem(obj: Note): Note;
  /**
   * Returns a vectorized plural proxy containing every object in the collection.
   *
   * * A plural proxy allows you to read or write properties, or invoke methods, on all items in the collection simultaneously.
   * * Because this broadcasts the operation directly within the native C++ engine, using `everyItem().propertyName = value` is massively faster than iterating through the collection with a standard JavaScript loop.
   * * To convert this proxy into a standard JavaScript array of individual objects, call `.getElements()` on the result.
   * * @returns A plural proxy representing all items in the collection.
   */
  everyItem(): NotePlural;
  /** Generates a string which, if executed, will return the Collection. */
  toSource(): string;
  /** `"[object CollectionName]"`, such as `"[object Pages]"`. */
    toString(): string;
  /** * Returns the object with the specified ID.
   * * If the item does not exist, it returns an unresolved proxy (check `.isValid`).
   * @param id The unique ID.
   */
  itemByID(id: number): Note;
  /** * Returns the object with the specified name.
   * * If the item does not exist, it returns an unresolved proxy (check `.isValid`).
   * @param name The name of the item.
   */
  itemByName(name: string): Note;
  /**
   * Creates a new text element at the end of its container.
   * @param withProperties Initial values for properties of the new element.
   */
  add(withProperties: PropertiesSetter<Note>): Note;
  /**
   * Creates a new text element at a location within its container.
   * @param at The location within the container. Defaults to {@link LocationOptions.AT_END}.
   * @param withProperties Initial values for properties of the new element.
   */
  add(
    at: LocationOptions.AT_BEGINNING | LocationOptions.AT_END | LocationOptions.UNKNOWN,
    withProperties?: PropertiesSetter<Note>,
  ): Note;
  /**
   * Creates a new text element relative to a specific reference object.
   *
   * When `at` is {@link LocationOptions.BEFORE} or {@link LocationOptions.AFTER}, the
   * `reference` parameter is required and specifies the existing object (usually an
   * `InsertionPoint`) relative to which the new element is inserted.
   * @param at The location relative to the `reference` object. Required if `at` is `BEFORE` or `AFTER`.
   * @param reference The existing {@link TRef} object to position against.
   * @param withProperties Initial values for properties of the new element.
   */
  add(
    at: LocationOptions.BEFORE | LocationOptions.AFTER,
    reference: Note | InsertionPoint,
    withProperties?: PropertiesSetter<Note>,
  ): Note;
  /**
   * Creates a new text element within a container object.
   *
   * @param at The location within the text flow. Defaults to {@link LocationOptions.AT_END}.
   * @param reference Ignored for these `at` values.
   * @param withProperties Initial values for properties of the new element.
   */
  add(
    at?:
      | LocationOptions.AT_BEGINNING
      | LocationOptions.AT_END
      | LocationOptions.UNKNOWN,
    reference?: Note | InsertionPoint,
    withProperties?: PropertiesSetter<Note>,
  ): Note;
}
