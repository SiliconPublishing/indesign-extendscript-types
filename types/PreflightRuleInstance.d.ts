/**
 * PreflightRuleInstance.d.ts — indesign-uxp-types
 * Adobe InDesign 2026 (21.x) ExtendScript DOM declarations,
 * converted from indesign-uxp-types by tools/codemod.
 * Version: 1.0.0 · Updated: 2026-09-29
 * Author: Vlad Vladila (Krommatine Systems) · https://github.com/vamitul/indesign-uxp-types
 */
import type { Mode, Read } from './_base/Types';
import type { PreflightProfileRule } from './PreflightProfileRule';
import type { PreflightProfile } from './PreflightProfile';
import type { PreflightRule } from './PreflightRule';

/**
 * A {@link PreflightRule} instance added directly to a profile's
 * {@link PreflightProfile.preflightRuleInstances} collection (as opposed to
 * one enabled from the profile's built-in rule set).
 */
export interface PreflightRuleInstance<M extends Mode = 'single'> extends PreflightProfileRule<M>{
  /** Resolves the proxy into the individual {@link PreflightRuleInstance} objects it stands for. */
  getElements(): PreflightRuleInstance<'single'>[];
}
