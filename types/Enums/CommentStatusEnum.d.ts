/**
 * CommentStatusEnum.d.ts — indesign-uxp-types
 * Adobe InDesign 2026 (21.x) ExtendScript DOM declarations,
 * converted from indesign-uxp-types by tools/codemod.
 * Version: 1.0.0 · Updated: 2026-09-29
 * Author: Vlad Vladila (Krommatine Systems) · https://github.com/vamitul/indesign-uxp-types
 */
import type { Enumeration, Enumerator, __val} from "../_base/Enums";



declare const __CommentStatusEnum: unique symbol;


/*----------------------------------------/
/   Internal enumerator interfaces        /
/       -- Not exported --                /
/----------------------------------------*/


interface CommentStatusEnum extends Enumerator {
  /**
   * @internal **WARNING:** `__CommentStatusEnum` is a phantom type for compiler strictness only. 
   * It DOES NOT exist at runtime. Do not evaluate it in your logic.
   */
  readonly [__CommentStatusEnum]: never;
}


/**
 * The comment is still open.
 */
interface CommentStatusEnum_OPEN_STATUS extends CommentStatusEnum {
  /**
   * @internal **WARNING:** `__val` is a phantom type for compiler strictness only. 
   * It DOES NOT exist at runtime. Do not evaluate it in your logic.
   */
  readonly [__val]: 1634955120;
}

/**
 * The comment has been resolved.
 */
interface CommentStatusEnum_RESOLVED_STATUS extends CommentStatusEnum {
  /**
   * @internal **WARNING:** `__val` is a phantom type for compiler strictness only. 
   * It DOES NOT exist at runtime. Do not evaluate it in your logic.
   */
  readonly [__val]: 1634955877;
}



/*----------------------------------------/
/                Exports                  /
/----------------------------------------*/

/**
 * Whether a PDF comment is still open or has been resolved.
 */
export declare namespace CommentStatusEnum {
/**
 * Status is open
 */
type OPEN_STATUS = CommentStatusEnum_OPEN_STATUS;

/**
 * Status is resolved
 */
type RESOLVED_STATUS = CommentStatusEnum_RESOLVED_STATUS;

}
/**
 * Whether a PDF comment is still open or has been resolved.
 */
export declare const CommentStatusEnum: typeof Enumeration & {

  /**
   * The comment is still open.
   */
  readonly OPEN_STATUS: CommentStatusEnum_OPEN_STATUS;
  /**
   * The comment is still open.
   */
  readonly openStatus: CommentStatusEnum_OPEN_STATUS;
  /**
   * The comment has been resolved.
   */
  readonly RESOLVED_STATUS: CommentStatusEnum_RESOLVED_STATUS;
  /**
   * The comment has been resolved.
   */
  readonly resolvedStatus: CommentStatusEnum_RESOLVED_STATUS;
}
