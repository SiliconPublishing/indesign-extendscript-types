/**
 * PreflightRuleInstances.d.ts — indesign-uxp-types
 * Adobe InDesign 2026 (21.x) ExtendScript DOM declarations,
 * converted from indesign-uxp-types by tools/codemod.
 * Version: 1.0.0 · Updated: 2026-09-29
 * Author: Vlad Vladila (Krommatine Systems) · https://github.com/vamitul/indesign-uxp-types
 */
import type { PropertiesSetter } from './_base/Properties';
import type {
  NamedCollection,
  IdCollection,
  BaseCollection,
} from './_base/Collections';
import type { PreflightRuleInstance } from './PreflightRuleInstance';
import type { PreflightProfile } from './PreflightProfile';
import type { PreflightRuleInstancePlural } from './PreflightRuleInstance';

/**
 * A collection of {@link PreflightRuleInstance} objects configured within a {@link PreflightProfile}.
 *
 * Each instance represents a specific check (such as font usage, image resolution, or color
 * space) performed by the preflight engine, along with its assigned severity and
 * configuration parameters.
 * @collection PreflightRuleInstance
 */
export interface PreflightRuleInstances extends InDesignEdition.PreflightRuleInstances, InDesignPlugins.PreflightRuleInstances {
  /**
   * The number of objects in the collection. Reading it throws once the collection's parent is gone
   * (probe "collection length throws once its parent is gone").
   */
  readonly length: number;
  /**
   * The object at the given position: `doc.pages[0]`. Out of range gives an invalid object, not
   * `undefined` (check `isValid`).
   */
  readonly [index: number]: PreflightRuleInstance;
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
  item(index: number | string): PreflightRuleInstance;
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
  itemByRange(from: number | string | PreflightRuleInstance, to: number | string | PreflightRuleInstance): PreflightRuleInstancePlural;
  /**
   * Returns the first object in the collection.
   * * This method tends to be slower than accessing the first item directly via `.item(0)`.
   * * If the collection is empty, it returns an unresolved proxy (check `.isValid`).
   */
  firstItem(): PreflightRuleInstance;
  /**
   * Returns the last object in the collection.
   * * This method tends to be slower than accessing the last item directly via `.item(-1)`.
   * * If the collection is empty, it returns an unresolved proxy (check `.isValid`).
   */
  lastItem(): PreflightRuleInstance;
  /**
   * Returns the middle object in the collection.
   * * If the collection is empty, it returns an unresolved proxy (check `.isValid`).
   */
  middleItem(): PreflightRuleInstance;
  /** * Returns any random object in the collection.
   * * If the collection is empty, it returns an unresolved proxy (check `.isValid`).
   */
  anyItem(): PreflightRuleInstance;
  /**
   * Returns the object prior to the specified object.
   *
   * * Using this method tends to incur massive performance penalties within the C++ engine. Consider alternatives, such as retrieving the collection as an array via `.everyItem().getElements()` and determining adjacent items in JavaScript.
   * * If the specified object is the first item, or if the collection is empty, it returns an unresolved proxy (check `.isValid`).
   * @param obj The reference object.
   */
  previousItem(obj: PreflightRuleInstance): PreflightRuleInstance;
  /**
   * Returns the object following the specified object.
   *
   * * Using this method tends to incur massive performance penalties within the C++ engine. Consider alternatives, such as retrieving the collection as an array via `.everyItem().getElements()` and determining adjacent items in JavaScript.
   * * If the specified object is the last item, or if the collection is empty, it returns an unresolved proxy (check `.isValid`).
   * @param obj The reference object.
   */
  nextItem(obj: PreflightRuleInstance): PreflightRuleInstance;
  /**
   * Returns a vectorized plural proxy containing every object in the collection.
   *
   * * A plural proxy allows you to read or write properties, or invoke methods, on all items in the collection simultaneously.
   * * Because this broadcasts the operation directly within the native C++ engine, using `everyItem().propertyName = value` is massively faster than iterating through the collection with a standard JavaScript loop.
   * * To convert this proxy into a standard JavaScript array of individual objects, call `.getElements()` on the result.
   * * @returns A plural proxy representing all items in the collection.
   */
  everyItem(): PreflightRuleInstancePlural;
  /** Generates a string which, if executed, will return the Collection. */
  toSource(): string;
  /** `"[object CollectionName]"`, such as `"[object Pages]"`. */
    toString(): string;
  /** * Returns the object with the specified ID.
   * * If the item does not exist, it returns an unresolved proxy (check `.isValid`).
   * @param id The unique ID.
   */
  itemByID(id: number): PreflightRuleInstance;
  /** * Returns the object with the specified name.
   * * If the item does not exist, it returns an unresolved proxy (check `.isValid`).
   * @param name The name of the item.
   */
  itemByName(name: string): PreflightRuleInstance;
  /**
   * Adds a specific preflight rule to the parent profile.
   *
   * @param id The unique string identifier of the preflight rule to add (e.g., "ADBE_ImageResolution", "ADBE_MissingFont").
   * @param withProperties Initial configuration for the rule instance, including its `flag` (severity) and rule-specific data.
   */
  add(
    id: string,
    withProperties?: PropertiesSetter<PreflightRuleInstance>,
  ): PreflightRuleInstance;
}
