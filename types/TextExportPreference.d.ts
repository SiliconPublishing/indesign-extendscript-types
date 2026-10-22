/**
 * TextExportPreference.d.ts — indesign-uxp-types
 * Adobe InDesign 2026 (21.x) ExtendScript DOM declarations,
 * converted from indesign-uxp-types by tools/codemod.
 * Version: 1.0.0 · Updated: 2026-09-29
 * Author: Vlad Vladila (Krommatine Systems) · https://github.com/vamitul/indesign-uxp-types
 */
import type { Mode, Read } from './_base/Types';
import type { EventTargetDOMObject } from './_base/DomObjects';
import type { Application } from './Application';
import type { ImportPlatform } from './Enums/ImportPlatform';
import type { TextExportCharacterSet } from './Enums/TextExportCharacterSet';

/**
 * Text export preferences.
 */
export interface TextExportPreference<M extends Mode = 'single'> extends EventTargetDOMObject<Application, M>, InDesignEdition.TextExportPreference<M>, InDesignPlugins.TextExportPreference<M> {
  /** Resolves the proxy into the individual {@link TextExportPreference} objects it stands for. */
  getElements(): TextExportPreference<'single'>[];

  /** The computer language character set the exported file is written in. */
  get characterSet(): Read<M, TextExportCharacterSet>;
  set characterSet(value: TextExportCharacterSet);

  /** The platform on which the text file will be used. */
  get platform(): Read<M, ImportPlatform>;
  set platform(value: ImportPlatform);
}
