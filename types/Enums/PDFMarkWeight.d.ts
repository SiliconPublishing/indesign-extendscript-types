/**
 * PDFMarkWeight.d.ts — indesign-uxp-types
 * Adobe InDesign 2026 (21.x) ExtendScript DOM declarations,
 * converted from indesign-uxp-types by tools/codemod.
 * Version: 1.0.0 · Updated: 2026-09-29
 * Author: Vlad Vladila (Krommatine Systems) · https://github.com/vamitul/indesign-uxp-types
 */
import type { Enumeration, Enumerator, __val} from "../_base/Enums";



declare const __PDFMarkWeight: unique symbol;


/*----------------------------------------/
/   Internal enumerator interfaces        /
/       -- Not exported --                /
/----------------------------------------*/


interface PDFMarkWeight extends Enumerator {
  /**
   * @internal **WARNING:** `__PDFMarkWeight` is a phantom type for compiler strictness only. 
   * It DOES NOT exist at runtime. Do not evaluate it in your logic.
   */
  readonly [__PDFMarkWeight]: never;
}


/**
 * Printer mark line weight of 0.125 points.
 */
interface PDFMarkWeight_P125PT extends PDFMarkWeight {
  /**
   * @internal **WARNING:** `__val` is a phantom type for compiler strictness only. 
   * It DOES NOT exist at runtime. Do not evaluate it in your logic.
   */
  readonly [__val]: 825374064;
}

/**
 * Printer mark line weight of 0.25 points.
 */
interface PDFMarkWeight_P25PT extends PDFMarkWeight {
  /**
   * @internal **WARNING:** `__val` is a phantom type for compiler strictness only. 
   * It DOES NOT exist at runtime. Do not evaluate it in your logic.
   */
  readonly [__val]: 842346608;
}

/**
 * Printer mark line weight of 0.50 points.
 */
interface PDFMarkWeight_P50PT extends PDFMarkWeight {
  /**
   * @internal **WARNING:** `__val` is a phantom type for compiler strictness only. 
   * It DOES NOT exist at runtime. Do not evaluate it in your logic.
   */
  readonly [__val]: 892350576;
}

/** Generated from the InDesign Server 21.6 scripting dictionary. */
interface PDFMarkWeight_P05MM extends PDFMarkWeight {
  readonly [__val]: 808807789;
}

/** Generated from the InDesign Server 21.6 scripting dictionary. */
interface PDFMarkWeight_P07MM extends PDFMarkWeight {
  readonly [__val]: 808938861;
}

/** Generated from the InDesign Server 21.6 scripting dictionary. */
interface PDFMarkWeight_P10MM extends PDFMarkWeight {
  readonly [__val]: 825257325;
}

/** Generated from the InDesign Server 21.6 scripting dictionary. */
interface PDFMarkWeight_P15MM extends PDFMarkWeight {
  readonly [__val]: 825585005;
}

/** Generated from the InDesign Server 21.6 scripting dictionary. */
interface PDFMarkWeight_P20MM extends PDFMarkWeight {
  readonly [__val]: 842034541;
}

/** Generated from the InDesign Server 21.6 scripting dictionary. */
interface PDFMarkWeight_P30MM extends PDFMarkWeight {
  readonly [__val]: 858811757;
}

/*----------------------------------------/
/                Exports                  /
/----------------------------------------*/

/**
 * The stroke weight used to draw printer marks on the exported PDF.
 */
export declare namespace PDFMarkWeight {
/**
 * Printer mark line weight of 0.125 points.
 */
type P125PT = PDFMarkWeight_P125PT;

/**
 * Printer mark line weight of 0.25 points.
 */
type P25PT = PDFMarkWeight_P25PT;

/**
 * Printer mark line weight of 0.50 points.
 */
type P50PT = PDFMarkWeight_P50PT;
type P05MM = PDFMarkWeight_P05MM;
type P07MM = PDFMarkWeight_P07MM;
type P10MM = PDFMarkWeight_P10MM;
type P15MM = PDFMarkWeight_P15MM;
type P20MM = PDFMarkWeight_P20MM;
type P30MM = PDFMarkWeight_P30MM;
}
/**
 * The stroke weight used to draw printer marks on the exported PDF.
 */
export declare const PDFMarkWeight: typeof Enumeration & {

      /**
       * Printer mark line weight of 0.125 points.
       */
      readonly P125PT: PDFMarkWeight_P125PT;
      /**
       * Printer mark line weight of 0.125 points.
       */
      readonly p125pt: PDFMarkWeight_P125PT;

      /**
       * Printer mark line weight of 0.25 points.
       */
      readonly P25PT: PDFMarkWeight_P25PT;
      /**
       * Printer mark line weight of 0.25 points.
       */
      readonly p25pt: PDFMarkWeight_P25PT;

      /**
       * Printer mark line weight of 0.50 points.
       */
      readonly P50PT: PDFMarkWeight_P50PT;
      /**
       * Printer mark line weight of 0.50 points.
       */
      readonly p50pt: PDFMarkWeight_P50PT;

    } & InDesignEdition.PDFMarkWeight
