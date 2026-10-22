/**
 * CellTypeEnum.d.ts — indesign-uxp-types
 * Adobe InDesign 2026 (21.x) ExtendScript DOM declarations,
 * converted from indesign-uxp-types by tools/codemod.
 * Version: 1.0.0 · Updated: 2026-09-29
 * Author: Vlad Vladila (Krommatine Systems) · https://github.com/vamitul/indesign-uxp-types
 */
import type { Enumeration, Enumerator, __val} from "../_base/Enums";



declare const __CellTypeEnum: unique symbol;


/*----------------------------------------/
/   Internal enumerator interfaces        /
/       -- Not exported --                /
/----------------------------------------*/


interface CellTypeEnum extends Enumerator {
  /**
   * @internal **WARNING:** `__CellTypeEnum` is a phantom type for compiler strictness only. 
   * It DOES NOT exist at runtime. Do not evaluate it in your logic.
   */
  readonly [__CellTypeEnum]: never;
}


/**
 * A cell that holds text.
 */
interface CellTypeEnum_TEXT_TYPE_CELL extends CellTypeEnum {
  /**
   * @internal **WARNING:** `__val` is a phantom type for compiler strictness only. 
   * It DOES NOT exist at runtime. Do not evaluate it in your logic.
   */
  readonly [__val]: 1701730388;
}

/**
 * A cell that holds a graphic or page item.
 */
interface CellTypeEnum_GRAPHIC_TYPE_CELL extends CellTypeEnum {
  /**
   * @internal **WARNING:** `__val` is a phantom type for compiler strictness only. 
   * It DOES NOT exist at runtime. Do not evaluate it in your logic.
   */
  readonly [__val]: 1701728329;
}



/*----------------------------------------/
/                Exports                  /
/----------------------------------------*/

/**
 * Specify the type of cell, either text or graphic.
 */
export declare namespace CellTypeEnum {
/**
 * Text cell.
 */
type TEXT_TYPE_CELL = CellTypeEnum_TEXT_TYPE_CELL;

/**
 * Graphic or Page item cell.
 */
type GRAPHIC_TYPE_CELL = CellTypeEnum_GRAPHIC_TYPE_CELL;

}
/**
 * Specify the type of cell, either text or graphic.
 */
export declare const CellTypeEnum: typeof Enumeration & {

  /**
   * A cell that holds text.
   */
  readonly TEXT_TYPE_CELL: CellTypeEnum_TEXT_TYPE_CELL;
  /**
   * A cell that holds text.
   */
  readonly textTypeCell: CellTypeEnum_TEXT_TYPE_CELL;
  /**
   * A cell that holds a graphic or page item.
   */
  readonly GRAPHIC_TYPE_CELL: CellTypeEnum_GRAPHIC_TYPE_CELL;
  /**
   * A cell that holds a graphic or page item.
   */
  readonly graphicTypeCell: CellTypeEnum_GRAPHIC_TYPE_CELL;
}
