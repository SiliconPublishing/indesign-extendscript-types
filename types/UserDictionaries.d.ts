/**
 * UserDictionaries.d.ts — indesign-uxp-types
 * Adobe InDesign 2026 (21.x) ExtendScript DOM declarations,
 * converted from indesign-uxp-types by tools/codemod.
 * Version: 1.0.0 · Updated: 2026-09-29
 * Author: Vlad Vladila (Krommatine Systems) · https://github.com/vamitul/indesign-uxp-types
 */
import type { NamedCollection, BaseCollection } from './_base/Collections';
import type { UserDictionary } from './UserDictionary';

/**
 * A collection of available {@link UserDictionary} objects. User dictionaries
 * store custom word lists for spelling and hyphenation, which can be
 * shared across multiple documents.
 *
 * @collection UserDictionary
 */
export interface UserDictionaries
  extends BaseCollection<UserDictionary, UserDictionary, UserDictionary<'plural'>>, NamedCollection<UserDictionary> {
}
