/**
 * Type-level utilities TypeScript expects from its standard library. They exist only at compile
 * time and describe no ExtendScript runtime feature, so they are safe under `noLib`.
 */

/** Make all properties in T required */
type Required<T> = { [P in keyof T]-?: T[P] };

/** Exclude from T those types that are assignable to U */
type Exclude<T, U> = T extends U ? never : T;

/** Extract from T those types that are assignable to U */
type Extract<T, U> = T extends U ? T : never;

/** Construct a type with the properties of T except for those in type K. */
type Omit<T, K extends keyof any> = Pick<T, Exclude<keyof T, K>>;

/** Exclude null and undefined from T */
type NonNullable<T> = T & {};

/** Obtain the parameters of a function type in a tuple */
type Parameters<T extends (...args: any) => any> = T extends (...args: infer P) => any ? P : never;

/** Obtain the return type of a function type */
type ReturnType<T extends (...args: any) => any> = T extends (...args: any) => infer R ? R : any;

/** Obtain the return type of a constructor function type */
type InstanceType<T extends abstract new (...args: any) => any> = T extends abstract new (...args: any) => infer R ? R : any;

/** Marker for contextual 'this' type */
interface ThisType<T> {}

/** A key usable to index an object. */
type PropertyKey = string | number;

interface ReadonlyArray<T> {
    readonly length: number;
    readonly [n: number]: T;
}

interface TemplateStringsArray extends ReadonlyArray<string> {
    readonly raw: readonly string[];
}

type Uppercase<S extends string> = intrinsic;
type Lowercase<S extends string> = intrinsic;
type Capitalize<S extends string> = intrinsic;
type Uncapitalize<S extends string> = intrinsic;
