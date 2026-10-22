/// <reference path="JavaScript.d.ts" />

/**
 * BridgeTalk: messages between Adobe applications (and between engines of one application).
 * Members are those ExtendScript's reflection lists (snapshots/<ver>/corejs.json); the callback
 * properties, which reflection lists only once set, follow Adobe's JavaScript Tools Guide.
 *
 * ```js
 * var bt = new BridgeTalk();
 * bt.target = 'photoshop';
 * bt.body = 'app.documents.length';
 * bt.onResult = function (reply) { $.writeln(reply.body); };
 * bt.send();
 * ```
 */
interface BridgeTalk {
    /** The specifier of the application that sent the message, such as "indesign-21.064". */
    sender: string;

    /** The specifier of the application to send to, such as "photoshop" or "illustrator-29". */
    target: string;

    /** Seconds before the message expires unprocessed; 0 means it never expires. */
    timeout: number;

    /** The message type. "ExtendScript" (the default) runs `body` as a script in the target. */
    type: string;

    /** The message content: for type "ExtendScript", the script the target runs. */
    body: string;

    /** Custom headers, as an object of string properties. */
    readonly headers: { [name: string]: string };

    /**
     * Sends the message. Returns true when it was sent (not when it was processed).
     * @param timeout Seconds to wait for the reply, processing messages meanwhile; 0 (default) returns at once.
     * @param launchParams Launch parameters for a target application that is not running.
     */
    send(timeout?: number, launchParams?: string): boolean;

    /**
     * Replies to a received message: the result reaches the sender's {@link onResult}.
     * @param result The result to send back.
     */
    sendResult(result: any): boolean;

    /** Processes pending messages for this message object. */
    pump(): boolean;

    /** Called in the target when the message arrives, with the message; returns the result. */
    onReceived: ((message: BridgeTalk) => any) | null;

    /** Called in the sender with each result: a BridgeTalk message whose `body` is the result. */
    onResult: ((reply: BridgeTalk) => void) | null;

    /** Called in the sender when the target reports an error; the reply's `body` holds the message. */
    onError: ((reply: BridgeTalk) => void) | null;

    /** Called in the sender when `timeout` expires before the message is processed. */
    onTimeout: ((message: BridgeTalk) => void) | null;
}

interface BridgeTalkConstructor {
    readonly prototype: BridgeTalk;

    /** Creates a new message. */
    new (): BridgeTalk;

    /** This application's specifier, such as "indesign-21.064". Settable for an engine's own specifier. */
    appSpecifier: string;

    /** This application's name, such as "indesign". */
    readonly appName: string;

    /** This application's version. */
    readonly appVersion: string;

    /** This application's locale. */
    readonly appLocale: string;

    /** Information about this application, for applications that set it. */
    readonly appInfo: string;

    /** This application's instance name, for applications that run several instances. */
    readonly appInstance: string;

    /** This application's status, such as "ISNOTRUNNING", "BUSY" or "IDLE". */
    readonly appStatus: string;

    /**
     * Launches an application.
     * @param target The application's specifier.
     * @param where Launch in the background ("background") or bring to the front (default).
     */
    launch(target: string, where?: string): void;

    /**
     * Whether an application is running.
     * @param target The application's specifier.
     */
    isRunning(target: string): boolean;

    /** Processes pending messages for this application. */
    pump(): boolean;

    /**
     * Loads an application's startup script, so that its BridgeTalk functions are available.
     * @param target The application's specifier.
     */
    loadAppScript(target: string): boolean;

    /**
     * The full specifier of an installed application, or null.
     * @param app The application name, such as "photoshop".
     * @param version The version, or a negative number for the newest; omitted for any.
     * @param locale The locale; omitted for any.
     */
    getSpecifier(app: string, version?: number | string, locale?: string): string | null;

    /**
     * The specifiers of the installed applications that can receive messages.
     * @param version Restrict to this version.
     * @param locale Restrict to this locale.
     */
    getTargets(version?: number | string, locale?: string): string[];

    /**
     * An application's localized display name, such as "Adobe Photoshop 2026".
     * @param target The application's specifier.
     */
    getDisplayName(target: string): string;

    /**
     * Brings an application to the front.
     * @param target The application's specifier.
     */
    bringToFront(target: string): void;

    /**
     * An application's status: "ISNOTRUNNING", "ISNOTINSTALLED", "BUSY", "IDLE", ...
     * @param target The application's specifier.
     */
    getStatus(target: string): string;

    /**
     * Sends a ping to an application.
     * @param target The application's specifier.
     * @param key What to ask: "STATUS", "DIAGNOSTICS", "ECHO_REQUEST" or "ECHO_RESPONSE".
     */
    ping(target: string, key: string): string;

    /**
     * Whether an application is installed.
     * @param target The application's specifier.
     */
    isInstalled(target: string): boolean;

    /**
     * Refreshes the list of applications that can receive messages.
     * @param scanRunningApps Also scan the running applications.
     */
    updateConnectorCache(scanRunningApps?: boolean): boolean;

    /**
     * Assign a function to handle messages sent to this application that are not of type
     * "ExtendScript"; its return value is the result sent back.
     */
    onReceive: ((message: BridgeTalk) => any) | null;
}

/** BridgeTalk: messages between Adobe applications. */
declare const BridgeTalk: BridgeTalkConstructor;
