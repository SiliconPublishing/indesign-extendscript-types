/**
 * BookContents.d.ts — indesign-uxp-types
 * Adobe InDesign 2026 (21.x) ExtendScript DOM declarations,
 * converted from indesign-uxp-types by tools/codemod.
 * Version: 1.0.0 · Updated: 2026-09-29
 * Author: Vlad Vladila (Krommatine Systems) · https://github.com/vamitul/indesign-uxp-types
 */
import type { FilePath } from './_base/Types';
import type {
  NamedCollection,
  IdCollection,
  BaseCollection,
} from './_base/Collections';
import type { BookContent } from './BookContent';
import type { PropertiesSetter } from './_base/Properties';
import type { Book } from './Book';
import type { BookContentPlural } from './BookContent';
import type { NothingEnum } from './Enums/NothingEnum';

/**
 * A collection of {@link BookContent} objects within a {@link Book}. Each
 * content object represents an individual InDesign document (.indd) that is
 * part of the book's sequence.
 *
 * @collection BookContent
 */
export interface BookContents {
  /** The number of objects in the collection. */
      readonly length: number | NothingEnum.NOTHING;
      /**
       * The object at the given position: `doc.pages[0]`. Out of range gives an invalid object, not
       * `undefined` (check `isValid`).
       */
      readonly [index: number]: BookContent;
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
  item(index: number | string): BookContent;
  /**
   * Returns a vectorized plural proxy containing all objects between two specified bounds (inclusive).
   *
   * * The two bounds are resolved independently, so they can be of different kinds — an index
   * for one end and an object for the other, as in `itemByRange(0, lastRect)`.
   * * Names are accepted, as with {@link item}: `layers.itemByRange('Top', 'Bottom')`.
   * * Like `everyItem()`, this returns a plural proxy. Operations applied to this proxy are broadcast directly within the native engine for maximum performance.
   * * To convert this proxy into a standard JavaScript array of individual objects, call `.getElements()` on the result.
   * @param from The object or index at the beginning of the range.
   * @param to The object or index at the end of the range.
   * @returns A plural proxy representing the items in the resolved range.
   */
  itemByRange(from: number | string | BookContent, to: number | string | BookContent): BookContentPlural;
  /**
   * Returns the first object in the collection.
   * * This method tends to be slower than accessing the first item directly via `.item(0)`.
   * * If the collection is empty, it returns an unresolved proxy (check `.isValid`).
   */
  firstItem(): BookContent;
  /**
   * Returns the last object in the collection.
   * * This method tends to be slower than accessing the last item directly via `.item(-1)`.
   * * If the collection is empty, it returns an unresolved proxy (check `.isValid`).
   */
  lastItem(): BookContent;
  /**
   * Returns the middle object in the collection.
   * * If the collection is empty, it returns an unresolved proxy (check `.isValid`).
   */
  middleItem(): BookContent;
  /** * Returns any random object in the collection.
   * * If the collection is empty, it returns an unresolved proxy (check `.isValid`).
   */
  anyItem(): BookContent;
  /**
   * Returns the object prior to the specified object.
   *
   * * Using this method tends to incur massive performance penalties within the C++ engine. Consider alternatives, such as retrieving the collection as an array via `.everyItem().getElements()` and determining adjacent items in JavaScript.
   * * If the specified object is the first item, or if the collection is empty, it returns an unresolved proxy (check `.isValid`).
   * @param obj The reference object.
   */
  previousItem(obj: BookContent): BookContent;
  /**
   * Returns the object following the specified object.
   *
   * * Using this method tends to incur massive performance penalties within the C++ engine. Consider alternatives, such as retrieving the collection as an array via `.everyItem().getElements()` and determining adjacent items in JavaScript.
   * * If the specified object is the last item, or if the collection is empty, it returns an unresolved proxy (check `.isValid`).
   * @param obj The reference object.
   */
  nextItem(obj: BookContent): BookContent;
  /**
   * Returns a vectorized plural proxy containing every object in the collection.
   *
   * * A plural proxy allows you to read or write properties, or invoke methods, on all items in the collection simultaneously.
   * * Because this broadcasts the operation directly within the native C++ engine, using `everyItem().propertyName = value` is massively faster than iterating through the collection with a standard JavaScript loop.
   * * To convert this proxy into a standard JavaScript array of individual objects, call `.getElements()` on the result.
   * * @returns A plural proxy representing all items in the collection.
   */
  everyItem(): BookContentPlural;
  /** Generates a string which, if executed, will return the Collection. */
  toSource(): string;
  /** `"[object CollectionName]"`, such as `"[object Pages]"`. */
      toString(): string;
  /** * Returns the object with the specified ID.
   * * If the item does not exist, it returns an unresolved proxy (check `.isValid`).
   * @param id The unique ID.
   */
  itemByID(id: number): BookContent;
  /** * Returns the object with the specified name.
   * * If the item does not exist, it returns an unresolved proxy (check `.isValid`).
   * @param name The name of the item.
   */
  itemByName(name: string): BookContent;
  /**
   * Adds an InDesign document to the book.
   *
   * @param fullName The full file system path to the InDesign (.indd) file.
   * @param at The index at which to insert the document into the book's sequence. Defaults to `-1`, which appends it to the end.
   * @param withProperties Initial values for properties of the new BookContent.
   */
  add(
    fullName: FilePath,
    at?: number,
    withProperties?: PropertiesSetter<BookContent>,
  ): BookContent;
}
