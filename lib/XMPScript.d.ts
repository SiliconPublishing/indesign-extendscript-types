/// <reference path="./PlugPlugExternalObject.d.ts" />

/*
 * The XMP scripting library (AdobeXMPScript). Its classes exist only once the library is loaded:
 *
 *     if (ExternalObject.AdobeXMPScript == undefined)
 *         ExternalObject.AdobeXMPScript = new ExternalObject('lib:AdobeXMPScript');
 *
 * so the globals are typed `| undefined` until then. Members are those ExtendScript's reflection
 * lists (snapshots/<ver>/corejs.json); parameters follow Adobe's JavaScript Tools Guide, and
 * return types the measured values (test/probes/quirks.jsx, tools/dump/corejs.jsx): setters
 * return null, a missing property reads null, iteration ends with null.
 */

// A commonly used construct for loading XMPScript into ExtendScript contexts.
interface ExternalObjectConstructor {
    AdobeXMPScript: ExternalObject | undefined;
}

/** A property's value and identity, as XMPMeta returns it. */
interface XMPProperty {
    /** The namespace URI of the property. */
    readonly namespace: string;
    /** The property's path, including its namespace prefix. */
    readonly path: string;
    /** The language of an alternative-text item, such as "x-default". */
    readonly locale: string;
    /** The value, as a string unless a value type was requested. */
    readonly value: any;
    /** The property's option flags (XMPConst.PROP_*). */
    readonly options: number;
}

interface XMPMetaConstructor {
    readonly prototype: XMPMeta;
    /** Creates an empty object. */
    new (): XMPMeta;
    /** @param packet A string holding an XML file or an XMP packet. */
    new (packet: string): XMPMeta;
    /** @param buffer The UTF-8 or UTF-16 bytes of an XML file or XMP packet, as serializeToArray() gives them. */
    new (buffer: number[]): XMPMeta;
    /** The version of the XMP library. */
    readonly version: string;
    /**
     * Registers a namespace and returns its prefix, with a colon ("ex:").
     * @param namespaceURI The namespace URI.
     * @param suggestedPrefix The prefix to use if it is free.
     */
    registerNamespace(namespaceURI: string, suggestedPrefix: string): string;
    /**
     * The prefix registered for a namespace, with a colon ("xmp:").
     * @param namespaceURI The namespace URI.
     */
    getNamespacePrefix(namespaceURI: string): string;
    /**
     * The namespace URI registered for a prefix.
     * @param prefix The prefix, such as "xmp".
     */
    getNamespaceURI(prefix: string): string;
    /**
     * Not implemented: throws "Unimplemented method XMPMeta::DeleteNamespace".
     * @param namespaceURI The namespace URI.
     */
    deleteNamespace(namespaceURI: string): never;
    /** All registered namespaces, as a string. */
    dumpNamespaces(): string;
}

/** An XMP metadata tree. */
interface XMPMeta {
    /**
     * Adds an item to an array, creating the array if needed.
     * @param arrayOptions When creating the array: XMPConst.ARRAY_IS_ORDERED, ARRAY_IS_UNORDERED, ...
     */
    appendArrayItem(schemaNS: string, arrayName: string, itemValue?: string, itemOptions?: number, arrayOptions?: number): null;
    /** The number of items in an array. */
    countArrayItems(schemaNS: string, arrayName: string): number;
    deleteArrayItem(schemaNS: string, arrayName: string, itemIndex: number): null;
    deleteProperty(schemaNS: string, propName: string): null;
    deleteQualifier(schemaNS: string, structName: string, qualNS: string, qualName: string): null;
    deleteStructField(schemaNS: string, structName: string, fieldNS: string, fieldName: string): null;
    doesArrayItemExist(schemaNS: string, arrayName: string, itemIndex: number): boolean;
    doesPropertyExist(schemaNS: string, propName: string): boolean;
    doesQualifierExist(schemaNS: string, structName: string, qualNS: string, qualName: string): boolean;
    doesStructFieldExist(schemaNS: string, structName: string, fieldNS: string, fieldName: string): boolean;
    /** The tree, as a string, for debugging. */
    dumpObject(): string;
    /** An array item; null when there is none. */
    getArrayItem(schemaNS: string, arrayName: string, itemIndex: number): XMPProperty | null;
    /** An item of an alternative-text array, by language; null when there is none. */
    getLocalizedText(schemaNS: string, altTextName: string, genericLang: string, specificLang: string): XMPProperty | null;
    /**
     * A property; null when it does not exist.
     * @param valueType Convert the value: XMPConst.STRING, INTEGER, NUMBER, BOOLEAN or XMPDATE.
     */
    getProperty(schemaNS: string, propName: string, valueType?: string): XMPProperty | null;
    getQualifier(schemaNS: string, structName: string, qualNS: string, qualName: string): XMPProperty | null;
    getStructField(schemaNS: string, structName: string, fieldNS: string, fieldName: string): XMPProperty | null;
    insertArrayItem(schemaNS: string, arrayName: string, itemIndex: number, itemValue: string, itemOptions?: number): null;
    /**
     * Iterates the tree, or a schema or property in it.
     * @param options XMPConst.ITERATOR_* flags.
     */
    iterator(options?: number, schemaNS?: string, propName?: string): XMPIterator;
    /**
     * The tree as an XMP packet.
     * @param options XMPConst.SERIALIZE_* flags.
     */
    serialize(options?: number, padding?: number, indent?: string, newline?: string, baseIndent?: number): string;
    /** The tree as the bytes of an XMP packet (UTF-8). */
    serializeToArray(options?: number, padding?: number, indent?: string, newline?: string, baseIndent?: number): number[];
    setArrayItem(schemaNS: string, arrayName: string, itemIndex: number, itemValue: string, itemOptions?: number): null;
    setLocalizedText(schemaNS: string, altTextName: string, genericLang: string, specificLang: string, itemValue: string, setOptions?: number): null;
    setProperty(schemaNS: string, propName: string, propValue: any, setOptions?: number, valueType?: string): null;
    setQualifier(schemaNS: string, propName: string, qualNS: string, qualName: string, qualValue: string, setOptions?: number): null;
    setStructField(schemaNS: string, structName: string, fieldNS: string, fieldName: string, fieldValue: string, setOptions?: number): null;
    /** Sorts the tree's schemas, properties and qualifiers. */
    sort(): null;
}

/** Walks an XMPMeta tree. */
interface XMPIterator {
    /** Whether next() has another property. */
    hasNext(): boolean;
    /** The next property; null at the end. */
    next(): XMPProperty | null;
    /** Skips the rest of the current node's siblings. */
    skipSiblings(): null;
    /** Skips the current node's children. */
    skipSubtree(): null;
}

interface XMPDateTimeConstructor {
    readonly prototype: XMPDateTime;
    /** Creates a date-time of zero. */
    new (): XMPDateTime;
    /** @param date A JavaScript Date. */
    new (date: Date): XMPDateTime;
    /** @param iso8601Date An ISO 8601 date-time string, such as "2026-10-22T10:00:00Z". */
    new (iso8601Date: string): XMPDateTime;
}

/** A date and time as XMP stores it. */
interface XMPDateTime {
    year: number;
    month: number;
    day: number;
    hour: number;
    minute: number;
    second: number;
    nanoSecond: number;
    /** -1 west of UTC, 0 UTC, 1 east (XMPConst.TIME_*). */
    tzSign: number;
    tzHour: number;
    tzMinute: number;
    /** -1, 0 or 1 as this is earlier than, equal to or later than another. */
    compareTo(xmpDateTime: XMPDateTime): number;
    convertToLocalTime(): null;
    convertToUTCTime(): null;
    /** As a JavaScript Date. */
    getDate(): Date;
    hasDate(): boolean;
    hasTime(): boolean;
    hasTimeZone(): boolean;
    setLocalTimeZone(): null;
}

interface XMPFileConstructor {
    readonly prototype: XMPFile;
    /**
     * Opens a file's XMP.
     * @param filePath The file's path.
     * @param format XMPConst.FILE_* (FILE_UNKNOWN to detect it).
     * @param openFlags XMPConst.OPEN_* flags.
     */
    new (filePath: string, format: number, openFlags: number): XMPFile;
    /** The version of the XMP file handlers. */
    readonly version: string;
    /**
     * A file format's handler capabilities, as XMPConst.HANDLER_* flags.
     * @param format XMPConst.FILE_*.
     */
    getFormatInfo(format: number): number;
}

/** A file's embedded XMP. */
interface XMPFile {
    /** Whether the metadata fits the file's space for it. */
    canPutXMP(xmp: XMPMeta | string | number[]): boolean;
    /**
     * Closes the file, writing pending updates.
     * @param closeFlags XMPConst.CLOSE_UPDATE_SAFELY or 0.
     */
    closeFile(closeFlags?: number): null;
    /** The file's metadata. */
    getXMP(): XMPMeta;
    /** Where and how the packet sits in the file. */
    getPacketInfo(): XMPPacketInfo;
    /** The file, its format and handler. */
    getFileInfo(): XMPFileInfo;
    /** Replaces the file's metadata (written on closeFile()). */
    putXMP(xmp: XMPMeta | string | number[]): null;
}

/** The XMP packet in a file. */
interface XMPPacketInfo {
    readonly packet: string;
    readonly offset: number;
    readonly padSize: number;
    /** The character encoding (XMPConst.ENCODE_*). */
    readonly charForm: number;
    readonly writeable: boolean;
}

/** An open XMPFile's file. */
interface XMPFileInfo {
    readonly filePath: string;
    /** The open flags (XMPConst.OPEN_*). */
    readonly openFlags: number;
    /** The format (XMPConst.FILE_*). */
    readonly format: number;
    /** The handler's capabilities (XMPConst.HANDLER_*). */
    readonly handlerFlags: number;
}

/** Path composition and array helpers. All static. */
interface XMPUtilsConstructor {
    composeArrayItemPath(schemaNS: string, arrayName: string, itemIndex: number): string;
    composeFieldSelector(schemaNS: string, arrayName: string, fieldNS: string, fieldName: string, fieldValue: string): string;
    composeLangSelector(schemaNS: string, arrayName: string, locale: string): string;
    composeQualifierPath(schemaNS: string, propName: string, qualNS: string, qualName: string): string;
    composeStructFieldPath(schemaNS: string, structName: string, fieldNS: string, fieldName: string): string;
    /** An array's items joined into one string. */
    catenateArrayItems(xmpObj: XMPMeta, schemaNS: string, arrayName: string, separator?: string, quotes?: string, options?: number): string;
    /** Splits a string into the items of an array. */
    separateArrayItems(xmpObj: XMPMeta, schemaNS: string, arrayName: string, arrayOptions: number, concatString: string): null;
    removeProperties(xmpObj: XMPMeta, schemaNS: string, propName: string, options?: number): null;
    appendProperties(source: XMPMeta, dest: XMPMeta, options?: number): null;
    duplicateSubtree(source: XMPMeta, dest: XMPMeta, sourceNS: string, sourceRoot: string, destNS?: string, destRoot?: string, options?: number): null;
}

/** Constants of the XMP library; not constructible. */
interface XMPConstConstructor {
    readonly TRUE: string;
    readonly FALSE: string;
    readonly STRING: string;
    readonly INTEGER: string;
    readonly NUMBER: string;
    readonly BOOLEAN: string;
    readonly XMPDATE: string;
    readonly NS_DC: string;
    readonly NS_IPTC_CORE: string;
    readonly NS_RDF: string;
    readonly NS_XML: string;
    readonly NS_EXIFEX: string;
    readonly NS_XMP: string;
    readonly NS_XMP_RIGHTS: string;
    readonly NS_XMP_MM: string;
    readonly NS_XMP_BJ: string;
    readonly NS_XMP_NOTE: string;
    readonly NS_PDF: string;
    readonly NS_PDFX: string;
    readonly NS_PDFX_ID: string;
    readonly NS_PHOTOSHOP: string;
    readonly NS_PS_ALBUM: string;
    readonly NS_EXIF: string;
    readonly NS_EXIF_AUX: string;
    readonly NS_TIFF: string;
    readonly NS_PNG: string;
    readonly NS_SWF: string;
    readonly NS_JPEG: string;
    readonly NS_JP2K: string;
    readonly NS_CAMERA_RAW: string;
    readonly NS_DM: string;
    readonly NS_ASF: string;
    readonly NS_WAV: string;
    readonly NS_ADOBE_STOCK_PHOTO: string;
    readonly TYPE_IDENTIFIER_QUAL: string;
    readonly TYPE_DIMENSIONS: string;
    readonly TYPE_TEXT: string;
    readonly TYPE_PAGEDFILE: string;
    readonly TYPE_GRAPHICS: string;
    readonly TYPE_IMAGE: string;
    readonly TYPE_FONT: string;
    readonly TYPE_RESOURCE_EVENT: string;
    readonly TYPE_RESOURCE_REF: string;
    readonly TYPE_ST_VERSION: string;
    readonly TYPE_ST_JOB: string;
    readonly TYPE_MANIFEST_ITEM: string;
    readonly TYPE_PDFA_SCHEMA: string;
    readonly TYPE_PDFA_PROPERTY: string;
    readonly TYPE_PDFA_TYPE: string;
    readonly TYPE_PDFA_FIELD: string;
    readonly TYPE_PDFA_ID: string;
    readonly TYPE_PDFA_EXTENSION: string;
    readonly NO_OPTIONS: number;
    readonly SCHEMA_NODE: number;
    readonly PROP_VALUE_IS_URI: number;
    readonly PROP_HAS_QUALIFIERS: number;
    readonly PROP_IS_QUALIFIER: number;
    readonly PROP_HAS_LANG: number;
    readonly PROP_HAS_TYPE: number;
    readonly PROP_IS_ALIAS: number;
    readonly PROP_HAS_ALIASES: number;
    readonly PROP_IS_INTERNAL: number;
    readonly PROP_IS_STABLE: number;
    readonly PROP_IS_DERIVED: number;
    readonly PROP_IS_STALE: number;
    readonly ALIAS_TO_SIMPLE_PROP: number;
    readonly ALIAS_TO_ARRAY: number;
    readonly ALIAS_TO_ORDERED_ARRAY: number;
    readonly ALIAS_TO_ALT_ARRAY: number;
    readonly ALIAS_TO_ALT_TEXT: number;
    readonly PROP_IS_STRUCT: number;
    readonly PROP_IS_ARRAY: number;
    readonly ARRAY_IS_UNORDERED: number;
    readonly ARRAY_IS_ORDERED: number;
    readonly ARRAY_IS_ALTERNATIVE: number;
    readonly ARRAY_IS_ALT_TEXT: number;
    readonly ARRAY_LAST_ITEM: number;
    readonly SERIALIZE_OMIT_PACKET_WRAPPER: number;
    readonly SERIALIZE_READ_ONLY_PACKET: number;
    readonly SERIALIZE_USE_COMPACT_FORMAT: number;
    readonly SERIALIZE_INCLUDE_THUMBNAIL_PAD: number;
    readonly SERIALIZE_EXACT_PACKET_LENGTH: number;
    readonly SERIALIZE_WRITE_ALIAS_COMMENTS: number;
    readonly SERIALIZE_OMIT_ALL_FORMATTING: number;
    readonly ENCODE_UTF8: number;
    readonly ENCODE_UTF16_BIG: number;
    readonly ENCODE_UTF16_LITTLE: number;
    readonly ENCODE_UTF32_BIG: number;
    readonly ENCODE_UTF32_LITTLE: number;
    readonly ITERATOR_JUST_CHILDREN: number;
    readonly ITERATOR_JUST_LEAFNODES: number;
    readonly ITERATOR_JUST_LEAFNAME: number;
    readonly ITERATOR_OMIT_QUALIFIERS: number;
    readonly REMOVE_ALL_PROPERTIES: number;
    readonly REMOVE_INCLUDE_ALIASES: number;
    readonly APPEND_ALL_PROPERTIES: number;
    readonly APPEND_REPLACE_OLD_VALUES: number;
    readonly APPEND_DELETE_EMPTY_VALUES: number;
    readonly SEPARATE_ALLOW_COMMAS: number;
    readonly TIME_WEST_OF_UTC: number;
    readonly TIME_UTC: number;
    readonly TIME_EAST_OF_UTC: number;
    readonly FILE_UNKNOWN: number;
    readonly FILE_PDF: number;
    readonly FILE_POSTSCRIPT: number;
    readonly FILE_EPS: number;
    readonly FILE_JPEG: number;
    readonly FILE_JPEG2K: number;
    readonly FILE_TIFF: number;
    readonly FILE_GIF: number;
    readonly FILE_PNG: number;
    readonly FILE_SWF: number;
    readonly FILE_FLA: number;
    readonly FILE_FLV: number;
    readonly FILE_MOV: number;
    readonly FILE_AVI: number;
    readonly FILE_CIN: number;
    readonly FILE_WAV: number;
    readonly FILE_MP3: number;
    readonly FILE_SES: number;
    readonly FILE_CEL: number;
    readonly FILE_MPEG: number;
    readonly FILE_MPEG2: number;
    readonly FILE_MPEG4: number;
    readonly FILE_WMAV: number;
    readonly FILE_AIFF: number;
    readonly FILE_HTML: number;
    readonly FILE_XML: number;
    readonly FILE_TEXT: number;
    readonly FILE_PHOTOSHOP: number;
    readonly FILE_ILLUSTRATOR: number;
    readonly FILE_INDESIGN: number;
    readonly FILE_AE_PROJECT: number;
    readonly FILE_AE_PROJECT_TEMPLATE: number;
    readonly FILE_AE_FILTER_PRESET: number;
    readonly FILE_ENCORE_PROJECT: number;
    readonly FILE_PREMIERE_PROJECT: number;
    readonly FILE_PREMIERE_TITLE: number;
    readonly FILE_WEBP: number;
    readonly OPEN_FOR_READ: number;
    readonly OPEN_FOR_UPDATE: number;
    readonly OPEN_ONLY_XMP: number;
    readonly OPEN_CACHE_TNAIL: number;
    readonly OPEN_STRICTLY: number;
    readonly OPEN_USE_SMART_HANDLER: number;
    readonly OPEN_USE_PACKET_SCANNING: number;
    readonly OPEN_LIMITED_SCANNING: number;
    readonly HANDLER_CAN_INJECT_XMP: number;
    readonly HANDLER_CAN_EXPAND: number;
    readonly HANDLER_CAN_REWRITE: number;
    readonly HANDLER_PPEFERS_IN_PLACE: number;
    readonly HANDLER_CAN_RECONCILE: number;
    readonly HANDLER_ALLOWS_ONLY_XMP: number;
    readonly HANDLER_RETURNS_RAW_PACKETS: number;
    readonly HANDLER_RETURNS_TNAIL: number;
    readonly HANDLER_OWNS_FILE: number;
    readonly HANDLER_ALLOWS_SAFE_UPDATE: number;
    readonly HANDLER_NEEDS_READONLY_PACKET: number;
    readonly HANDLER_USES_SIDECAR_XMP: number;
    readonly HANDLER_CAN_NOTIFY_PROGRESS: number;
    readonly CLOSE_UPDATE_SAFELY: number;
}

/** XMP metadata (after loading AdobeXMPScript). */
declare const XMPMeta: XMPMetaConstructor | undefined;
/** XMP constants (after loading AdobeXMPScript). */
declare const XMPConst: XMPConstConstructor | undefined;
/** XMP in files (after loading AdobeXMPScript). */
declare const XMPFile: XMPFileConstructor | undefined;
/** XMP date-times (after loading AdobeXMPScript). */
declare const XMPDateTime: XMPDateTimeConstructor | undefined;
/** XMP path and array helpers (after loading AdobeXMPScript). */
declare const XMPUtils: XMPUtilsConstructor | undefined;
