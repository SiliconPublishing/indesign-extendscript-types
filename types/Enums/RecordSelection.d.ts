/**
 * RecordSelection.d.ts — indesign-uxp-types
 * Adobe InDesign 2026 (21.x) ExtendScript DOM declarations,
 * converted from indesign-uxp-types by tools/codemod.
 * Version: 1.0.0 · Updated: 2026-09-29
 * Author: Vlad Vladila (Krommatine Systems) · https://github.com/vamitul/indesign-uxp-types
 */
import type { Enumeration, Enumerator, __val} from "../_base/Enums";



declare const __RecordSelection: unique symbol;


/*----------------------------------------/
/   Internal enumerator interfaces        /
/       -- Not exported --                /
/----------------------------------------*/


interface RecordSelection extends Enumerator {
  /**
   * @internal **WARNING:** `__RecordSelection` is a phantom type for compiler strictness only. 
   * It DOES NOT exist at runtime. Do not evaluate it in your logic.
   */
  readonly [__RecordSelection]: never;
}


/**
 * Merges all records.
 */
interface RecordSelection_ALL_RECORDS extends RecordSelection {
  /**
   * @internal **WARNING:** `__val` is a phantom type for compiler strictness only. 
   * It DOES NOT exist at runtime. Do not evaluate it in your logic.
   */
  readonly [__val]: 1684881778;
}

/**
 * Merges the specified record. 
 */
interface RecordSelection_ONE_RECORD extends RecordSelection {
  /**
   * @internal **WARNING:** `__val` is a phantom type for compiler strictness only. 
   * It DOES NOT exist at runtime. Do not evaluate it in your logic.
   */
  readonly [__val]: 1684885362;
}

/**
 * Merges all records in the specified range. 
 */
interface RecordSelection_RANGE extends RecordSelection {
  /**
   * @internal **WARNING:** `__val` is a phantom type for compiler strictness only. 
   * It DOES NOT exist at runtime. Do not evaluate it in your logic.
   */
  readonly [__val]: 1684886130;
}



/*----------------------------------------/
/                Exports                  /
/----------------------------------------*/

/**
 * The records to merge.
 */
export declare namespace RecordSelection {
/**
 * Merges all records.
 */
type ALL_RECORDS = RecordSelection_ALL_RECORDS;

/**
 * Merges the specified record. 
 */
type ONE_RECORD = RecordSelection_ONE_RECORD;

/**
 * Merges all records in the specified range. 
 */
type RANGE = RecordSelection_RANGE;

}
/**
 * The records to merge.
 */
export declare const RecordSelection: typeof Enumeration & {

  /**
   * Merges all records.
   */
  readonly ALL_RECORDS: RecordSelection_ALL_RECORDS;
  /**
   * Merges all records.
   */
  readonly allRecords: RecordSelection_ALL_RECORDS;
  /**
   * Merges the specified record. 
   */
  readonly ONE_RECORD: RecordSelection_ONE_RECORD;
  /**
   * Merges the specified record. 
   */
  readonly oneRecord: RecordSelection_ONE_RECORD;
  /**
   * Merges all records in the specified range. 
   */
  readonly RANGE: RecordSelection_RANGE;
  /**
   * Merges all records in the specified range. 
   */
  readonly range: RecordSelection_RANGE;

}
