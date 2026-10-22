/**
 * GeneralPreference.d.ts — indesign-uxp-types
 * Adobe InDesign 2026 (21.x) ExtendScript DOM declarations,
 * converted from indesign-uxp-types by tools/codemod.
 * Version: 1.0.0 · Updated: 2026-09-29
 * Author: Vlad Vladila (Krommatine Systems) · https://github.com/vamitul/indesign-uxp-types
 */
import type { Mode, Read } from './_base/Types';
import type { EventTargetDOMObject } from './_base/DomObjects';
import type { FolderPath, File, Folder } from './_base/Types';
import type { Application } from './Application';
import type { PageNumberingOptions } from './Enums/PageNumberingOptions';
import type { PreviewPagesOptions } from './Enums/PreviewPagesOptions';
import type { PreviewSizeOptions } from './Enums/PreviewSizeOptions';
import type { ToolTipOptions } from './Enums/ToolTipOptions';
import type { ToolsPanelOptions } from './Enums/ToolsPanelOptions';
import type { EditionPart } from "./_base/Editions";

/**
 * Application-wide general UI and behavior preferences.
 */
export interface GeneralPreference<M extends Mode = 'single'> extends EventTargetDOMObject<Application, M>, InDesignEdition.GeneralPreference<M>, InDesignPlugins.GeneralPreference<M> {
  /** Resolves the proxy into the individual {@link GeneralPreference} objects it stands for. */
  getElements(): GeneralPreference<'single'>[];
  /** If true, enable content-aware fit as default while placing items */
  get enableContentAwareFit(): Read<M, boolean>;
  set enableContentAwareFit(value: boolean);

  /** The pages to create preview images for. Note: Valid when include preview is true. */
  get previewPages(): Read<M, PreviewPagesOptions>;
  set previewPages(value: PreviewPagesOptions);

  /** The location in which to store temporary files. */
  get temporaryFolder(): Read<M, Folder>;
  set temporaryFolder(value: FolderPath);

  /** Whether page numbers follow the section's numbering or count every page sequentially through the document — see {@link PageNumberingOptions}. */
  get pageNumbering(): Read<M, PageNumberingOptions>;
  set pageNumbering(value: PageNumberingOptions);

  /** The threshold at which to trigger font subsetting based on the number of glyphs the font contains. */
  get completeFontDownloadGlyphLimit(): Read<M, number>;
  set completeFontDownloadGlyphLimit(value: number);

  /** If true, includes a preview in saved documents. */
  get includePreview(): Read<M, boolean>;
  set includePreview(value: boolean);
  /** If true, objects after ungrouping go back to their original layers. */
  get ungroupRemembersLayers(): Read<M, boolean>;
  set ungroupRemembersLayers(value: boolean);

  /** The preview size. Note: Valid when include preview is true. */
  get previewSize(): Read<M, PreviewSizeOptions>;
  set previewSize(value: PreviewSizeOptions);
}
/** GeneralPreference's members only InDesign desktop has, or has differently (tools/codemod/editions.mjs). */
export interface GeneralPreferenceDesktop<M extends Mode = 'single'> extends EditionPart {
  /** The value of the system reported main monitor resolution
   * Desktop only: InDesign Server 21.6 does not have it. */
  readonly mainMonitorPpi: Read<M, number>;

  /** If true, application bar is shown.
   * Desktop only: InDesign Server 21.6 does not have it. */
  readonly applicationBarShown: Read<M, boolean>;

  /** Whether and how quickly tool tips appear: normal, off, or fast — see {@link ToolTipOptions}.
   * Desktop only: InDesign Server 21.6 does not have it. */
  get toolTips(): Read<M, ToolTipOptions>;

  /**
   * Desktop only: InDesign Server 21.6 does not have it.
   */
  set toolTips(value: ToolTipOptions);

  /** Controls whether or not the content grabber adornment is shown.
   * Desktop only: InDesign Server 21.6 does not have it. */
  get showContentGrabber(): Read<M, boolean>;

  /**
   * Desktop only: InDesign Server 21.6 does not have it.
   */
  set showContentGrabber(value: boolean);

  /** Controls whether or not the live corners grabber adornment is shown.
   * Desktop only: InDesign Server 21.6 does not have it. */
  get showLiveCorners(): Read<M, boolean>;

  /**
   * Desktop only: InDesign Server 21.6 does not have it.
   */
  set showLiveCorners(value: boolean);

  /** Controls whether or not to show the master page overlay when a page is selected using the Page Tool.
   * Desktop only: InDesign Server 21.6 does not have it. */
  get showMasterPageOverlay(): Read<M, boolean>;

  /**
   * Desktop only: InDesign Server 21.6 does not have it.
   */
  set showMasterPageOverlay(value: boolean);

  /** Controls whether page items move when a page is repositioned from the UI. The option/alt key temporarily reverses this property
   * Desktop only: InDesign Server 21.6 does not have it. */
  get objectsMoveWithPage(): Read<M, boolean>;

  /**
   * Desktop only: InDesign Server 21.6 does not have it.
   */
  set objectsMoveWithPage(value: boolean);

  /** Controls whether or not you can select and interact with a locked item. When this is off, only position is locked.
   * Desktop only: InDesign Server 21.6 does not have it. */
  get preventSelectingLockedItems(): Read<M, boolean>;

  /**
   * Desktop only: InDesign Server 21.6 does not have it.
   */
  set preventSelectingLockedItems(value: boolean);

  /** Controls whether or not multi-touch gestures are enabled.
   * Desktop only: InDesign Server 21.6 does not have it. */
  get enableMultiTouchGestures(): Read<M, boolean>;

  /**
   * Desktop only: InDesign Server 21.6 does not have it.
   */
  set enableMultiTouchGestures(value: boolean);

  /** Controls whether or not the anchor object adornment is shown.
   * Desktop only: InDesign Server 21.6 does not have it. */
  get showAnchorObjectAdornment(): Read<M, boolean>;

  /**
   * Desktop only: InDesign Server 21.6 does not have it.
   */
  set showAnchorObjectAdornment(value: boolean);

  /** Controls whether or not to highlight object under selection tool.
   * Desktop only: InDesign Server 21.6 does not have it. */
  get highlightObjectUnderSelectionTool(): Read<M, boolean>;

  /**
   * Desktop only: InDesign Server 21.6 does not have it.
   */
  set highlightObjectUnderSelectionTool(value: boolean);

  /** Controls whether or not to greek vector graphics when dragging at high quality.
   * Desktop only: InDesign Server 21.6 does not have it. */
  get greekVectorGraphicsOnDrag(): Read<M, boolean>;

  /**
   * Desktop only: InDesign Server 21.6 does not have it.
   */
  set greekVectorGraphicsOnDrag(value: boolean);

  /** Show the conveyor on content collector or content placer tool activation
   * Desktop only: InDesign Server 21.6 does not have it. */
  get showConveyor(): Read<M, boolean>;

  /**
   * Desktop only: InDesign Server 21.6 does not have it.
   */
  set showConveyor(value: boolean);

  /** Enable the creation of links on content place
   * Desktop only: InDesign Server 21.6 does not have it. */
  get createLinksOnContentPlace(): Read<M, boolean>;

  /**
   * Desktop only: InDesign Server 21.6 does not have it.
   */
  set createLinksOnContentPlace(value: boolean);

  /** Enable the mapping of styles on content place
   * Desktop only: InDesign Server 21.6 does not have it. */
  get mapStylesOnContentPlace(): Read<M, boolean>;

  /**
   * Desktop only: InDesign Server 21.6 does not have it.
   */
  set mapStylesOnContentPlace(value: boolean);

  /** Enable the use of a custom monitor resolution in pixels per inch as opposed to querying the system settings
   * Desktop only: InDesign Server 21.6 does not have it. */
  get useCustomMonitorResolution(): Read<M, boolean>;

  /**
   * Desktop only: InDesign Server 21.6 does not have it.
   */
  set useCustomMonitorResolution(value: boolean);

  /** When using a custom monitor resolution, what is the value of that resolution in pixels per inch
   * Desktop only: InDesign Server 21.6 does not have it. */
  get customMonitorPpi(): Read<M, number>;

  /**
   * Desktop only: InDesign Server 21.6 does not have it.
   */
  set customMonitorPpi(value: number);

  /** Whether the contextual control bar is shown above the document window.
   * Desktop only: InDesign Server 21.6 does not have it. */
  get contextBarVisible(): Read<M, boolean>;

  /**
   * Desktop only: InDesign Server 21.6 does not have it.
   */
  set contextBarVisible(value: boolean);

  /**
   * Specify the Application User Interface brightness preference (from 0.0 to 1.0).
   *
   * To use color theme brightness preset values, specify 0.0 for Dark, 0.50 for Medium Dark,
   * 0.51 for Medium Bright, and 1.0 for Bright. Any value between 0.0 and 1.0 will
   * automatically be mapped to closest preset.
   * Desktop only: InDesign Server 21.6 does not have it.
   */
  get uiBrightnessPreference(): Read<M, number>;

  /**
   * Desktop only: InDesign Server 21.6 does not have it.
   */
  set uiBrightnessPreference(value: number);

  /** Specify the Pasteboard color preference (0 or 1). Specify 0 to set preference to Default White, and 1 to set preference to Match with Theme Color.
   * Desktop only: InDesign Server 21.6 does not have it. */
  get pasteboardColorPreference(): Read<M, number>;

  /**
   * Desktop only: InDesign Server 21.6 does not have it.
   */
  set pasteboardColorPreference(value: number);

  /** If true, show What's New dialog on startup.
   * Desktop only: InDesign Server 21.6 does not have it. */
  get showWhatsNewOnStartup(): Read<M, boolean>;

  /**
   * Desktop only: InDesign Server 21.6 does not have it.
   */
  set showWhatsNewOnStartup(value: boolean);

  /** If true, on creating new swatch through the new swatch dialog, it will be exported to CC Libraries as well
   * Desktop only: InDesign Server 21.6 does not have it. */
  get autoAddSwatchToCCLibraries(): Read<M, boolean>;

  /**
   * Desktop only: InDesign Server 21.6 does not have it.
   */
  set autoAddSwatchToCCLibraries(value: boolean);

  /** If true, on creating new char style through the new char style dialog, it will be exported to CC Libraries as well
   * Desktop only: InDesign Server 21.6 does not have it. */
  get autoAddCharStyleToCCLibraries(): Read<M, boolean>;

  /**
   * Desktop only: InDesign Server 21.6 does not have it.
   */
  set autoAddCharStyleToCCLibraries(value: boolean);

  /** If true, on creating new para style through the new para style dialog, it will be exported to CC Libraries as well
   * Desktop only: InDesign Server 21.6 does not have it. */
  get autoAddParaStyleToCCLibraries(): Read<M, boolean>;

  /**
   * Desktop only: InDesign Server 21.6 does not have it.
   */
  set autoAddParaStyleToCCLibraries(value: boolean);

  /** If true, show start workspace when no documents are open
   * Desktop only: InDesign Server 21.6 does not have it. */
  get showStartWorkspace(): Read<M, boolean>;

  /**
   * Desktop only: InDesign Server 21.6 does not have it.
   */
  set showStartWorkspace(value: boolean);

  /** If true, show stock cart adornment on unlicensed stock images
   * Desktop only: InDesign Server 21.6 does not have it. */
  get showStockPurchaseAdornment(): Read<M, boolean>;

  /**
   * Desktop only: InDesign Server 21.6 does not have it.
   */
  set showStockPurchaseAdornment(value: boolean);

  /** Controls the appearance of the Tools panel.
   * Desktop only: InDesign Server 21.6 does not have it. */
  get toolsPanel(): Read<M, ToolsPanelOptions>;

  /**
   * Desktop only: InDesign Server 21.6 does not have it.
   */
  set toolsPanel(value: ToolsPanelOptions);

  /** If true, panel drawers close automatically.
   * Desktop only: InDesign Server 21.6 does not have it. */
  get autoCollapseIconPanels(): Read<M, boolean>;

  /**
   * Desktop only: InDesign Server 21.6 does not have it.
   */
  set autoCollapseIconPanels(value: boolean);

  /** Controls whether or not to show thumbnails of imported files in the Place icon.
   * Desktop only: InDesign Server 21.6 does not have it. */
  get placeCursorUsesThumbnails(): Read<M, boolean>;

  /**
   * Desktop only: InDesign Server 21.6 does not have it.
   */
  set placeCursorUsesThumbnails(value: boolean);

  /** If true, Large Tabs are shown for panels else Smaller tabs are shown
   * Desktop only: InDesign Server 21.6 does not have it. */
  get panelTabHeightPreference(): Read<M, boolean>;

  /**
   * Desktop only: InDesign Server 21.6 does not have it.
   */
  set panelTabHeightPreference(value: boolean);

  /** If true, legacy new document dialog will be shown when Ctrl/Cmd + N are pressed.
   * Desktop only: InDesign Server 21.6 does not have it. */
  get showLegacyNewDocumentDialog(): Read<M, boolean>;

  /**
   * Desktop only: InDesign Server 21.6 does not have it.
   */
  set showLegacyNewDocumentDialog(value: boolean);

  /** If true, vertical reveal strips appear when palette UI is hidden.
   * Desktop only: InDesign Server 21.6 does not have it. */
  get autoShowHiddenPanels(): Read<M, boolean>;

  /**
   * Desktop only: InDesign Server 21.6 does not have it.
   */
  set autoShowHiddenPanels(value: boolean);

  /** If true, application lives in a frame.
   * Desktop only: InDesign Server 21.6 does not have it. */
  get useApplicationFrame(): Read<M, boolean>;

  /**
   * Desktop only: InDesign Server 21.6 does not have it.
   */
  set useApplicationFrame(value: boolean);

  /** If true, documents open as tabs.
   * Desktop only: InDesign Server 21.6 does not have it. */
  get openDocumentsAsTabs(): Read<M, boolean>;

  /**
   * Desktop only: InDesign Server 21.6 does not have it.
   */
  set openDocumentsAsTabs(value: boolean);

  /** If true, floating windows can be docked by user as tabs.
   * Desktop only: InDesign Server 21.6 does not have it. */
  get enableFloatingWindowDocking(): Read<M, boolean>;

  /**
   * Desktop only: InDesign Server 21.6 does not have it.
   */
  set enableFloatingWindowDocking(value: boolean);

  /** Number of items to show in the Open Recent menu list. Range: 0 to 30
   * Desktop only: InDesign Server 21.6 does not have it. */
  get openRecentLength(): Read<M, number>;

  /**
   * Desktop only: InDesign Server 21.6 does not have it.
   */
  set openRecentLength(value: number);

  /** Controls whether or not to dynamically display transformation information as part of the cursor while manipulating page items.
   * Desktop only: InDesign Server 21.6 does not have it. */
  get showTransformationValues(): Read<M, boolean>;

  /**
   * Desktop only: InDesign Server 21.6 does not have it.
   */
  set showTransformationValues(value: boolean);

  /** The name of the active workspace.
   * Desktop only: InDesign Server 21.6 does not have it. */
  get setActiveWorkspace(): Read<M, string>;

  /**
   * Desktop only: InDesign Server 21.6 does not have it.
   */
  set setActiveWorkspace(value: string);

  /** The name of the active keyboard shortcut set.
   * Desktop only: InDesign Server 21.6 does not have it. */
  get keyboardShortcutSet(): Read<M, string>;

  /**
   * Desktop only: InDesign Server 21.6 does not have it.
   */
  set keyboardShortcutSet(value: string);

  /** If true, alt text for images are auto generated when imported.
   * Desktop only: InDesign Server 21.6 does not have it. */
  get autoGenerateAltText(): Read<M, boolean>;

  /**
   * Desktop only: InDesign Server 21.6 does not have it.
   */
  set autoGenerateAltText(value: boolean);

  /** If true, alt text for images are appended with generated by AI tag.
   * Desktop only: InDesign Server 21.6 does not have it. */
  get addAITagToAltText(): Read<M, boolean>;

  /**
   * Desktop only: InDesign Server 21.6 does not have it.
   */
  set addAITagToAltText(value: boolean);

  /** If true, use incoming spot color definition in case of conflict, when placing or pasting content
   * Desktop only: InDesign Server 21.6 does not have it. */
  get useIncomingSpotUponConflict(): Read<M, boolean>;

  /**
   * Desktop only: InDesign Server 21.6 does not have it.
   */
  set useIncomingSpotUponConflict(value: boolean);
}

/** GeneralPreference's members only InDesign Server has, or has differently (tools/codemod/editions.mjs). */
export interface GeneralPreferenceServer<M extends Mode = 'single'> extends EditionPart {}

/** GeneralPreference's members as both InDesign desktop and InDesign Server have them (tools/codemod/editions.mjs). */
export interface GeneralPreferencePortable<M extends Mode = 'single'> extends EditionPart {}
