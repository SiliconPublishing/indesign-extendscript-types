/**
 * Graphics.d.ts — indesign-uxp-types
 * Adobe InDesign 2026 (21.x) ExtendScript DOM declarations,
 * converted from indesign-uxp-types by tools/codemod.
 * Version: 1.0.0 · Updated: 2026-09-29
 * Author: Vlad Vladila (Krommatine Systems) · https://github.com/vamitul/indesign-uxp-types
 */
import type {
  NamedCollection,
  IdCollection,
  BaseCollection,
} from './_base/Collections';
import type { Graphic } from './Graphic';
import type { AnyGraphicOf } from './_base/Unions';
import type { PageItemParent } from './_base/Parents';
import type { AnimationSetting } from './AnimationSetting';
import type { Article } from './Article';
import type { BackgroundTask } from './BackgroundTask';
import type { ContentTransparencySetting } from './ContentTransparencySetting';
import type { FitOptions } from './Enums/FitOptions';
import type { FillTransparencySetting } from './FillTransparencySetting';
import type { FlexObjects } from './FlexObjects';
import type { Layer } from './Layer';
import type { Library } from './Library';
import type { Link } from './Link';
import type { LinkedPageItemOption } from './LinkedPageItemOption';
import type { ObjectStyle } from './ObjectStyle';
import type { PDF } from './PDF';
import type { Page } from './Page';
import type { PageItem } from './PageItem';
import type { PageItems } from './PageItems';
import type { Preferences } from './Preferences';
import type { SVGs } from './SVGs';
import type { StrokeTransparencySetting } from './StrokeTransparencySetting';
import type { TextWrapPreference } from './TextWrapPreference';
import type { TimingSetting } from './TimingSetting';
import type { TransparencySetting } from './TransparencySetting';
import type { XMLElement } from './XMLElement';
import type { NamableDOMObject } from './_base/DomObjects';
import type { GraphicAttributes } from './_base/GraphicAttributes';
import type { GraphicDesktop } from "./Graphic";
import type { GraphicServer } from "./Graphic";
import type { GraphicPortable } from "./Graphic";
import type { EditionPart } from "./_base/Editions";

/**
 * A collection of imported {@link Graphic} objects in any supported vector,
 * metafile, or bitmap format (including AI, PSD, PDF, TIFF, JPEG).
 *
 * @collection Graphic
 */
export interface Graphics<TParent = PageItemParent>
  extends
    BaseCollection<AnyGraphicOf<TParent>, Graphic, GraphicsPlural<TParent>>,
    IdCollection<AnyGraphicOf<TParent>>,
    NamedCollection<AnyGraphicOf<TParent>>, InDesignEdition.Graphics<TParent>, InDesignPlugins.Graphics {
}

/**
 * The plural proxy {@link Graphics.everyItem} hands back.
 *
 * Reading or writing a property on the proxy applies it to every graphic at once, using only
 * the members every placed graphic has. `getElements()` resolves it into the individual
 * graphics, each reported as its own specific kind.
 */
export interface GraphicsPlural<TParent = PageItemParent>
  extends Graphic<TParent, 'plural'> {
  /** Resolves the proxy into the individual graphics, each at its concrete class. */
  getElements(): AnyGraphicOf<TParent>[];
}
/** GraphicsPlural's members only InDesign desktop has, or has differently (tools/codemod/editions.mjs). */
export interface GraphicsPluralDesktop<TParent = PageItemParent> extends EditionPart, GraphicDesktop<TParent, 'plural'> {}

/** GraphicsPlural's members only InDesign Server has, or has differently (tools/codemod/editions.mjs). */
export interface GraphicsPluralServer<TParent = PageItemParent> extends EditionPart, GraphicServer<TParent, 'plural'> {}

/** GraphicsPlural's members as both InDesign desktop and InDesign Server have them (tools/codemod/editions.mjs). */
export interface GraphicsPluralPortable<TParent = PageItemParent> extends EditionPart, GraphicPortable<TParent, 'plural'> {}

