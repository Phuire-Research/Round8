/* eslint-disable complexity */

import { SumSeries } from './Round8.sum.cases';
import { ShiftedSumSeries } from './Round8.shifted.sum.cases';
import { DifferenceSeries } from './Round8.difference.cases';
import { ShiftedDifferenceSeries } from './Round8.shifted.difference.cases';
import { SomeNumberPlusNegativeOneSeries } from './Round8.negative.one.sum.cases';
import { NegativeOnePlusSomeNumberSeries } from './Round8.negative.one.unique.sum.cases';
import { SomeNumberMinusNegativeOneSeries, NegativeOneMinusSomeNumberSeries } from './Round8.negative.one.difference.cases';
import { ShiftedSomeNumberPlusNegativeOneSeries, ShiftedNegativeOnePlusSomeNumberSeries } from './Round8.negative.one.shifted.sum.cases';
import {
  ShiftedSomeNumberMinusNegativeOneSeries,
  ShiftedNegativeOneMinusSomeNumberSeries,
} from './Round8.negative.one.shifted.difference.cases';
import { GreaterThanSeries } from './Round8.greater.than.cases';
import { LessThanSeries } from './Round8.less.than.cases';
import { ShiftedGreaterThanSeries } from './Round8.shifted.greater.than.cases';
import { BidirectionalConference, ConferBidirectional, MarqueeState, ConferredMarqueeState } from './Round8.bidirectional';
import { SomeSeries, SpooledWrung } from './Round8.terminology';

// Initialize 6-dimensional array structure for SpooledSumSeries
export const initializeSpooledWrung = (): SpooledWrung => {
  const arr: SpooledWrung = [];
  for (let i = 0; i < 2; i++) {
    arr[i] = [];
    for (let j = 0; j < 2; j++) {
      arr[i][j] = [];
      for (let k = 0; k < 2; k++) {
        arr[i][j][k] = [];
        for (let l = 0; l < 2; l++) {
          arr[i][j][k][l] = [];
          for (let m = 0; m < 2; m++) {
            arr[i][j][k][l][m] = [];
          }
        }
      }
    }
  }
  return arr;
};

const SpooledSumSeries: SpooledWrung = initializeSpooledWrung();
const ShiftedSpooledSumSeries: SpooledWrung = initializeSpooledWrung();
const SpooledDifferenceSeries: SpooledWrung = initializeSpooledWrung();
const SpooledShiftedDifferenceSeries: SpooledWrung = initializeSpooledWrung();

// Negative One Special Case Spools
const SpooledSomeNumberPlusNegativeOneSeries: SpooledWrung = initializeSpooledWrung();
const SpooledNegativeOnePlusSomeNumberSeries: SpooledWrung = initializeSpooledWrung();
const SpooledSomeNumberMinusNegativeOneSeries: SpooledWrung = initializeSpooledWrung();
const SpooledNegativeOneMinusSomeNumberSeries: SpooledWrung = initializeSpooledWrung();
const SpooledShiftedSomeNumberPlusNegativeOneSeries: SpooledWrung = initializeSpooledWrung();
const SpooledShiftedNegativeOnePlusSomeNumberSeries: SpooledWrung = initializeSpooledWrung();
const SpooledShiftedSomeNumberMinusNegativeOneSeries: SpooledWrung = initializeSpooledWrung();
const SpooledShiftedNegativeOneMinusSomeNumberSeries: SpooledWrung = initializeSpooledWrung();

// Logical Comparison Spools (return boolean 0 or 1)
const SpooledGreaterThanSeries: SpooledWrung = initializeSpooledWrung();
const SpooledLessThanSeries: SpooledWrung = initializeSpooledWrung();
const SpooledShiftedGreaterThanSeries: SpooledWrung = initializeSpooledWrung();

const spool = (someSeries: SomeSeries, spooled: SpooledWrung) => {
  let count = 0;
  Object.keys(someSeries).forEach((sum) => {
    count++;
    // console.log(`Spooling case ${count}: ${sum}`);
    const caseArray = someSeries[sum];
    // caseArray structure: [bit2_X, bit1_X, bit0_X, bit2_Y, bit1_Y, [bit0_Y, result, carry?]]
    const one = caseArray[0] as number; // bit2_X
    const two = caseArray[1] as number; // bit1_X
    const three = caseArray[2] as number; // bit0_X
    const four = caseArray[3] as number; // bit2_Y
    const five = caseArray[4] as number; // bit1_Y
    const tuple = caseArray[5] as (number | bigint)[];
    const six = tuple[0] as number; // bit0_Y
    const sixValue = tuple.slice(1) as unknown as bigint[]; // [result, carry?]
    // console.log(`  Storing at [${one}][${two}][${three}][${four}][${five}][${six}]:`, sixValue);
    spooled[one][two][three][four][five][six] = sixValue;
    // Debug: Verify storage
    if (one === 0 && two === 0 && three === 0 && four === 0 && five === 0 && six === 0) {
      console.log('  VERIFY: Retrieved immediately:', spooled[0][0][0][0][0][0]);
    }
  });
};

spool(SumSeries, SpooledSumSeries);
spool(ShiftedSumSeries, ShiftedSpooledSumSeries);
spool(DifferenceSeries, SpooledDifferenceSeries);
spool(ShiftedDifferenceSeries, SpooledShiftedDifferenceSeries);

// Spool Negative One Special Cases
spool(SomeNumberPlusNegativeOneSeries, SpooledSomeNumberPlusNegativeOneSeries);
spool(NegativeOnePlusSomeNumberSeries, SpooledNegativeOnePlusSomeNumberSeries);
spool(SomeNumberMinusNegativeOneSeries, SpooledSomeNumberMinusNegativeOneSeries);
spool(NegativeOneMinusSomeNumberSeries, SpooledNegativeOneMinusSomeNumberSeries);
spool(ShiftedSomeNumberPlusNegativeOneSeries, SpooledShiftedSomeNumberPlusNegativeOneSeries);
spool(ShiftedNegativeOnePlusSomeNumberSeries, SpooledShiftedNegativeOnePlusSomeNumberSeries);
spool(ShiftedSomeNumberMinusNegativeOneSeries, SpooledShiftedSomeNumberMinusNegativeOneSeries);
spool(ShiftedNegativeOneMinusSomeNumberSeries, SpooledShiftedNegativeOneMinusSomeNumberSeries);

// Spool Logical Comparisons
spool(GreaterThanSeries, SpooledGreaterThanSeries);
spool(LessThanSeries, SpooledLessThanSeries);
spool(ShiftedGreaterThanSeries, SpooledShiftedGreaterThanSeries);

export {
  SpooledSumSeries,
  ShiftedSpooledSumSeries,
  SpooledDifferenceSeries,
  SpooledShiftedDifferenceSeries,
  // Negative One Special Case Spools
  SpooledSomeNumberPlusNegativeOneSeries,
  SpooledNegativeOnePlusSomeNumberSeries,
  SpooledSomeNumberMinusNegativeOneSeries,
  SpooledNegativeOneMinusSomeNumberSeries,
  SpooledShiftedSomeNumberPlusNegativeOneSeries,
  SpooledShiftedNegativeOnePlusSomeNumberSeries,
  SpooledShiftedSomeNumberMinusNegativeOneSeries,
  SpooledShiftedNegativeOneMinusSomeNumberSeries,
  // Logical Comparison Spools
  SpooledGreaterThanSeries,
  SpooledLessThanSeries,
  SpooledShiftedGreaterThanSeries,
};

export const DIFFERENCE_MAP = {
  ZERO_CASE: Uint8Array.from([0, 0, 0]),
  POSITIVE_1_CASE: Uint8Array.from([0, 0, 0]),
  // First Position 0
  NEGATIVE_1_CASE: Uint8Array.from([1, 1, 1]),
};

/**
 * Logical Comparison Helper Functions - Column-Level Boolean Operations
 *
 * These functions perform logical comparisons on 3-bit column values using
 * SpooledGreaterThanSeries for Greater Than, and derive other operations.
 *
 * Return Values: 0 (False) or 1 (True)
 */

/**
 * Greater Than (X > Y) - Direct spool lookup
 * @param columnX - 3-bit column value [bit2, bit1, bit0]
 * @param columnY - 3-bit column value [bit2, bit1, bit0]
 * @returns 1 if X > Y, 0 otherwise
 */
export const greaterThan = (columnX: Uint8Array, columnY: Uint8Array): number => {
  const result =
    SpooledGreaterThanSeries[columnX[0]][columnX[1]][columnX[2]][columnY[0]][columnY[1]][columnY[2]]; // bit2_X // bit1_X // bit0_X // bit2_Y // bit1_Y // bit0_Y
  // Result is [bit0_result, result_copy] - return first element
  return result[0] as unknown as number;
};

/**
 * Less Than (X < Y) - Direct Spool Lookup
 * @param columnX - 3-bit column value
 * @param columnY - 3-bit column value
 * @returns 1 if X < Y, 0 otherwise
 */
export const lessThan = (columnX: Uint8Array, columnY: Uint8Array): number => {
  const result =
    SpooledLessThanSeries[columnX[0]][columnX[1]][columnX[2]][columnY[0]][columnY[1]][columnY[2]]; // bit2_X // bit1_X // bit0_X // bit2_Y // bit1_Y // bit0_Y
  // Result is [bit0_result, result_copy] - return first element
  return result[0] as unknown as number;
};

/**
 * Equals (X == Y) - Direct bit comparison
 * @param columnX - 3-bit column value
 * @param columnY - 3-bit column value
 * @returns 1 if X == Y, 0 otherwise
 */
export const equals = (columnX: Uint8Array, columnY: Uint8Array): number => {
  return columnX[0] === columnY[0] && columnX[1] === columnY[1] && columnX[2] === columnY[2] ? 1 : 0;
};

/**
 * Greater Than or Equal (X >= Y) - Equals OR Greater Than
 * @param columnX - 3-bit column value
 * @param columnY - 3-bit column value
 * @returns 1 if X >= Y, 0 otherwise
 */
export const greaterThanOrEqual = (columnX: Uint8Array, columnY: Uint8Array): number => {
  return equals(columnX, columnY) === 1 || greaterThan(columnX, columnY) === 1 ? 1 : 0;
};

/**
 * Less Than or Equal (X <= Y) - Equals OR Less Than
 * @param columnX - 3-bit column value
 * @param columnY - 3-bit column value
 * @returns 1 if X <= Y, 0 otherwise
 */
export const lessThanOrEqual = (columnX: Uint8Array, columnY: Uint8Array): number => {
  return equals(columnX, columnY) === 1 || lessThan(columnX, columnY) === 1 ? 1 : 0;
};

/**
 * Not Equals (X != Y) - Inverted Equals
 * @param columnX - 3-bit column value
 * @param columnY - 3-bit column value
 * @returns 1 if X != Y, 0 otherwise
 */
export const notEquals = (columnX: Uint8Array, columnY: Uint8Array): number => {
  return equals(columnX, columnY) === 1 ? 0 : 1;
};

/**
 * Shifted Greater Than (X > Y) - Column 0 Shifted Topology Comparison
 *
 * Uses shifted topology ordering where Display 7 [0,0,0] is MAXIMUM (Full Twist)
 * and Display 0 [0,0,1] is MINIMUM (Marquee position).
 *
 * Shifted Ordering: 001 < 010 < 011 < 100 < 101 < 110 < 111 < 000
 *
 * @param columnX - 3-bit column value in shifted topology
 * @param columnY - 3-bit column value in shifted topology
 * @returns 1 if X > Y in shifted topology, 0 otherwise
 */
export const shiftedGreaterThan = (columnX: Uint8Array, columnY: Uint8Array): number => {
  const result =
    SpooledShiftedGreaterThanSeries[columnX[0]][columnX[1]][columnX[2]][columnY[0]][columnY[1]][columnY[2]];
  return result[0] as unknown as number;
};

/**
 * Shifted Less Than (X < Y) - Derived from shiftedGreaterThan
 *
 * X < Y is equivalent to Y > X in shifted topology.
 *
 * @param columnX - 3-bit column value in shifted topology
 * @param columnY - 3-bit column value in shifted topology
 * @returns 1 if X < Y in shifted topology, 0 otherwise
 */
export const shiftedLessThan = (columnX: Uint8Array, columnY: Uint8Array): number => {
  return shiftedGreaterThan(columnY, columnX);
};

/**
 * Shifted Equals (X == Y) - Direct bit comparison
 *
 * Equality is topology-agnostic: same bits = equal regardless of topology.
 *
 * @param columnX - 3-bit column value
 * @param columnY - 3-bit column value
 * @returns 1 if X == Y, 0 otherwise
 */
export const shiftedEquals = (columnX: Uint8Array, columnY: Uint8Array): number => {
  return columnX[0] === columnY[0] && columnX[1] === columnY[1] && columnX[2] === columnY[2] ? 1 : 0;
};

/**
 * Logical AND - Universal Boolean Operator
 * @param a - Boolean value (0 or 1)
 * @param b - Boolean value (0 or 1)
 * @returns 1 if both a AND b are 1, otherwise 0
 */
export const and = (a: number, b: number): number => {
  return a === 1 && b === 1 ? 1 : 0;
};

/**
 * Logical OR - Universal Boolean Operator
 * @param a - Boolean value (0 or 1)
 * @param b - Boolean value (0 or 1)
 * @returns 1 if a OR b (or both) are 1, otherwise 0
 */
export const or = (a: number, b: number): number => {
  return a === 1 || b === 1 ? 1 : 0;
};

/**
 * Logical XOR - Universal Boolean Operator
 * @param a - Boolean value (0 or 1)
 * @param b - Boolean value (0 or 1)
 * @returns 1 if exactly one of a or b is 1, otherwise 0
 */
export const xor = (a: number, b: number): number => {
  return (a === 1 || b === 1) && a !== b ? 1 : 0;
};

/**
 * Logical NOT - Universal Boolean Operator
 * @param a - Boolean value (0 or 1)
 * @returns 1 if a is 0, otherwise 0
 */
export const not = (a: number): number => {
  return a === 1 ? 0 : 1;
};

/**
 * Compare Magnitudes - Column-aware comparison using topology-appropriate operators
 *
 * Compares absolute values of two wrungs from most significant to least significant column.
 * Uses COLUMN-AWARE comparison:
 * - Column 0: shiftedGreaterThan() for shifted topology (Display 0-7, Full Twist maximum)
 * - Columns 1-20: greaterThan() for regular topology (Display 1-8)
 *
 * @param wrungA - First operand buffer (64 positions)
 * @param wrungB - Second operand buffer (64 positions)
 * @param marqueeA - First valid column index for wrungA (0-20)
 * @param marqueeB - First valid column index for wrungB (0-20)
 * @returns true if |wrungA| > |wrungB|, false if |wrungB| >= |wrungA|
 */
export const compareMagnitude = (
  wrungA: Uint8Array<ArrayBuffer>,
  wrungB: Uint8Array<ArrayBuffer>,
  marqueeA: number,
  marqueeB: number
): boolean => {
  // Start from most significant column (smallest marquee value)
  const startColumn = Math.min(marqueeA, marqueeB);

  // Compare column-by-column from most significant to least significant
  for (let col = startColumn; col <= 20; col++) {
    // Extract 3-bit column values
    const pos = 1 + col * 3;
    const columnA = new Uint8Array([wrungA[pos], wrungA[pos + 1], wrungA[pos + 2]]);
    const columnB = new Uint8Array([wrungB[pos], wrungB[pos + 1], wrungB[pos + 2]]);

    // CRITICAL: Column 0 uses shifted topology, columns 1-20 use regular topology
    const comparisonFunc = (col === 0) ? shiftedGreaterThan : greaterThan;

    const aGreater = comparisonFunc(columnA, columnB);
    if (aGreater === 1) {
      // A has greater magnitude at this column
      return true;
    }

    const bGreater = comparisonFunc(columnB, columnA);
    if (bGreater === 1) {
      // B has greater magnitude at this column
      return false;
    }

    // Columns equal, continue to next less significant column
  }

  // All columns equal - B "wins" tie (return false)
  // This ensures consistent behavior for equal magnitudes
  return false;
};

/**
 * Operation Routing Result - Structured data for sign routing
 */
type OperationRouting = {
  effectiveOp: 'sum' | 'difference';
  minuend: Uint8Array<ArrayBuffer>;
  subtrahend: Uint8Array<ArrayBuffer>;
  resultSign: 0 | 1;
};

/**
 * Determine Effective Operation - Route to Sum or Difference based on operation+sign combination
 *
 * Analyzes operation type and operand signs to determine which spool to use (Sum or Difference)
 * and what the result sign should be. Handles all 8 operation+sign combinations:
 * - Addition: 4 cases (++, --, +-, -+)
 * - Subtraction: 4 cases (++, --, +-, -+)
 *
 * Uses compareMagnitude() for cases where result sign depends on magnitude comparison.
 *
 * @param operation - Operation type ('+' for addition, '-' for subtraction)
 * @param signA - Sign of wrungA (0 = negative, 1 = positive)
 * @param signB - Sign of wrungB (0 = negative, 1 = positive)
 * @param wrungA - First operand buffer (64 positions)
 * @param wrungB - Second operand buffer (64 positions)
 * @param marqueeA - First valid column index for wrungA (0-20)
 * @param marqueeB - First valid column index for wrungB (0-20)
 * @returns Routing object with effectiveOp, operand order, and result sign
 */
export const determineEffectiveOperation = (
  operation: '+' | '-',
  signA: 0 | 1,
  signB: 0 | 1,
  wrungA: Uint8Array<ArrayBuffer>,
  wrungB: Uint8Array<ArrayBuffer>,
  marqueeA: number,
  marqueeB: number
): OperationRouting => {
  // ADDITION OPERATIONS (operation === '+')
  if (operation === '+') {
    // Case 1: (+A) + (+B) → Sum, result positive
    if (signA === 1 && signB === 1) {
      console.log('ROUTING CASE 1: (+A) + (+B) → Sum, result positive');
      return {
        effectiveOp: 'sum',
        minuend: wrungA,
        subtrahend: wrungB,
        resultSign: 1,
      };
    }

    // Case 2: (-A) + (-B) → Sum, result negative
    if (signA === 0 && signB === 0) {
      console.log('ROUTING CASE 2: (-A) + (-B) → Sum, result negative');
      return {
        effectiveOp: 'sum',
        minuend: wrungA,
        subtrahend: wrungB,
        resultSign: 0,
      };
    }

    // Case 3: (+A) + (-B) → Difference (A - B), sign depends on magnitude
    if (signA === 1 && signB === 0) {
      const aGreater = compareMagnitude(wrungA, wrungB, marqueeA, marqueeB);
      console.log(`ROUTING CASE 3: (+A) + (-B) → Difference, aGreater=${aGreater}, resultSign=${aGreater ? 1 : 0}`);
      return {
        effectiveOp: 'difference',
        minuend: aGreater ? wrungA : wrungB,
        subtrahend: aGreater ? wrungB : wrungA,
        resultSign: aGreater ? 1 : 0, // Positive if A > B, negative if B > A
      };
    }

    // Case 4: (-A) + (+B) → Difference (B - A), sign depends on magnitude
    if (signA === 0 && signB === 1) {
      const bGreater = compareMagnitude(wrungB, wrungA, marqueeB, marqueeA);
      console.log(`ROUTING CASE 4: (-A) + (+B) → Difference, bGreater=${bGreater}, resultSign=${bGreater ? 1 : 0}`);
      return {
        effectiveOp: 'difference',
        minuend: bGreater ? wrungB : wrungA,
        subtrahend: bGreater ? wrungA : wrungB,
        resultSign: bGreater ? 1 : 0, // Positive if B > A, negative if A > B
      };
    }
  }

  // SUBTRACTION OPERATIONS (operation === '-')
  if (operation === '-') {
    // Case 5: (+A) - (+B) → Difference (A - B), sign depends on magnitude
    if (signA === 1 && signB === 1) {
      const aGreater = compareMagnitude(wrungA, wrungB, marqueeA, marqueeB);
      console.log(`ROUTING CASE 5: (+A) - (+B) → Difference, aGreater=${aGreater}, resultSign=${aGreater ? 1 : 0}`);
      return {
        effectiveOp: 'difference',
        minuend: aGreater ? wrungA : wrungB,
        subtrahend: aGreater ? wrungB : wrungA,
        resultSign: aGreater ? 1 : 0, // Positive if A > B, negative if B > A
      };
    }

    // Case 6: (-A) - (-B) → Difference (B - A), sign FLIPPED
    if (signA === 0 && signB === 0) {
      const aGreater = compareMagnitude(wrungA, wrungB, marqueeA, marqueeB);
      console.log(`ROUTING CASE 6: (-A) - (-B) → Difference, aGreater=${aGreater}, resultSign=${aGreater ? 0 : 1} [SIGN FLIPPED]`);
      return {
        effectiveOp: 'difference',
        minuend: aGreater ? wrungA : wrungB,
        subtrahend: aGreater ? wrungB : wrungA,
        resultSign: aGreater ? 0 : 1, // FLIPPED: negative if |A| > |B|, positive if |B| > |A|
      };
    }

    // Case 7: (+A) - (-B) → Sum (A + B), result positive
    if (signA === 1 && signB === 0) {
      console.log('ROUTING CASE 7: (+A) - (-B) → Sum (subtracting negative = adding), result positive');
      return {
        effectiveOp: 'sum',
        minuend: wrungA,
        subtrahend: wrungB,
        resultSign: 1,
      };
    }

    // Case 8: (-A) - (+B) → Sum (A + B), result negative
    if (signA === 0 && signB === 1) {
      console.log('ROUTING CASE 8: (-A) - (+B) → Sum (adding negatives), result negative');
      return {
        effectiveOp: 'sum',
        minuend: wrungA,
        subtrahend: wrungB,
        resultSign: 0,
      };
    }
  }

  // Fallback - should never reach if all cases covered
  throw new Error(
    `determineEffectiveOperation: Unhandled combination - operation=${operation}, signA=${signA}, signB=${signB}`
  );
};

/**
 * SumWrung - Columnar Long Addition using SpooledSumSeries lookup tables
 *
 * Takes two 64-position Uint8Array buffers and performs columnar addition
 * from right to left (column 20 → column 0), handling carries forward.
 *
 * @param wrungA - First operand buffer (64 positions)
 * @param wrungB - Second operand buffer (64 positions)
 * @returns Result buffer (64 positions)
 */
export const SumWrung = (wrungA: Uint8Array<ArrayBuffer>, wrungB: Uint8Array<ArrayBuffer>): Uint8Array<ArrayBuffer> => {
  console.log(
    `SUMWRUNG START: wrungA[61-63]=[${wrungA[61]},${wrungA[62]},${wrungA[63]}] wrungB[61-63]=[${wrungB[61]},${wrungB[62]},${wrungB[63]}]`
  );

  // PHASE 1: SIGN ROUTING
  const signA = wrungA[0] as 0 | 1;
  const signB = wrungB[0] as 0 | 1;
  console.log(
    `SIGN ROUTING: signA=${signA} (${signA === 1 ? 'Positive' : 'Unsigned'}), ` +
    `signB=${signB} (${signB === 1 ? 'Positive' : 'Unsigned'}), operation='+'`
  );

  // CASE 2: Both negative → normal sum, apply negative sign
  if (signA === 0 && signB === 0) {
    console.log('CASE 2: Both negative → negative sum (signs ignored during operation)');

    // Create positive temps for magnitude summation
    const tempA = new Uint8Array(wrungA);
    tempA[0] = 1; // Make positive
    const tempB = new Uint8Array(wrungB);
    tempB[0] = 1; // Make positive

    // Recursive call → hits Case 1 logic (both positive)
    const result = SumWrung(tempA, tempB);

    // Apply negative sign as metadata
    result[0] = 0; // Unsigned = Negative
    console.log('CASE 2 COMPLETE: Applied negative sign to result');

    return result;
  }

  // CASE 3: (+A) + (-B) → A - B with magnitude-based sign
  if (signA === 1 && signB === 0) {
    console.log('CASE 3: (+A) + (-B) → Difference Spool (A - abs(B))');

    // Create positive temps for magnitude operation
    const tempA = new Uint8Array(wrungA);
    tempA[0] = 1;
    const tempB = new Uint8Array(wrungB);
    tempB[0] = 1;

    // Conference for marquee detection
    const case3Conf = ConferBidirectional(tempA, tempB);

    // Special case: both zero
    if (case3Conf.wrungAMarquee.isAbsoluteZero && case3Conf.wrungBMarquee.isAbsoluteZero) {
      return SPECIAL_CASE_STORE.ZERO_CASE;
    }

    // Create result buffer
    const result = new Uint8Array(64);
    result[0] = 1; // Temporary positive (will be corrected below)

    // Borrow accumulator (NOT carry - this is subtraction)
    const borrows: Uint8Array<ArrayBuffer>[] = [];

    // EXACT EVEN PATH
    if (case3Conf.exactEven) {
      console.log(`CASE 3 EXACT EVEN: Marquees at ${case3Conf.sharedValidColumn}`);

      for (let column = 20; column >= case3Conf.sharedValidColumn; column--) {
        const pos = 1 + column * 3;
        const activeSpool = column === 0 ? SpooledShiftedDifferenceSeries : SpooledDifferenceSeries;

        // Deplete borrows into tempA
        let intermediate = new Uint8Array([tempA[pos], tempA[pos + 1], tempA[pos + 2]]);
        while (borrows.length > 0) {
          const borrow = borrows.pop()!;
          const borrowTuple = activeSpool[intermediate[0]][intermediate[1]][intermediate[2]][borrow[0]][borrow[1]][borrow[2]] as (
            | Uint8Array
            | number
          )[];
          if (borrowTuple.length === 1) {
            intermediate = borrowTuple[0] as Uint8Array<ArrayBuffer>;
          } else {
            intermediate = borrowTuple[0] as Uint8Array<ArrayBuffer>;
            const newBorrow = borrowTuple[1] as Uint8Array<ArrayBuffer>;
            borrows.push(newBorrow);
          }
        }

        // Subtract tempB from intermediate
        const finalTuple = activeSpool[intermediate[0]][intermediate[1]][intermediate[2]][tempB[pos]][tempB[pos + 1]][tempB[pos + 2]] as (
          | Uint8Array<ArrayBuffer>
          | number
        )[];
        const finalResult = finalTuple[0] as Uint8Array;

        // Write result
        result[pos] = finalResult[0];
        result[pos + 1] = finalResult[1];
        result[pos + 2] = finalResult[2];

        // Push borrow if exists
        if (finalTuple.length === 2) {
          const finalBorrow = finalTuple[1] as Uint8Array<ArrayBuffer>;
          borrows.push(finalBorrow);
        }
      }
    } else {
      // SHIFTED PATH
      const wrungAFirst = case3Conf.wrungAMarquee.firstValidRotation ?? 20;
      const wrungBFirst = case3Conf.wrungBMarquee.firstValidRotation ?? 20;
      const earlierMarquee = Math.min(wrungAFirst, wrungBFirst);
      console.log(`CASE 3 SHIFTED: tempA first=${wrungAFirst}, tempB first=${wrungBFirst}`);

      // SHARED ZONE (sharedValidColumn → 20)
      for (let column = 20; column >= case3Conf.sharedValidColumn; column--) {
        const pos = 1 + column * 3;
        const activeSpool = column === 0 ? SpooledShiftedDifferenceSeries : SpooledDifferenceSeries;

        // Deplete borrows
        let intermediate = new Uint8Array([tempA[pos], tempA[pos + 1], tempA[pos + 2]]);
        while (borrows.length > 0) {
          const borrow = borrows.pop()!;
          const borrowTuple = activeSpool[intermediate[0]][intermediate[1]][intermediate[2]][borrow[0]][borrow[1]][borrow[2]] as (
            | Uint8Array
            | number
          )[];
          if (borrowTuple.length === 1) {
            intermediate = borrowTuple[0] as Uint8Array<ArrayBuffer>;
          } else {
            intermediate = borrowTuple[0] as Uint8Array<ArrayBuffer>;
            const newBorrow = borrowTuple[1] as Uint8Array<ArrayBuffer>;
            borrows.push(newBorrow);
          }
        }

        // Subtract tempB
        const finalTuple = activeSpool[intermediate[0]][intermediate[1]][intermediate[2]][tempB[pos]][tempB[pos + 1]][tempB[pos + 2]] as (
          | Uint8Array<ArrayBuffer>
          | number
        )[];
        const finalResult = finalTuple[0] as Uint8Array;

        result[pos] = finalResult[0];
        result[pos + 1] = finalResult[1];
        result[pos + 2] = finalResult[2];

        if (finalTuple.length === 2) {
          const finalBorrow = finalTuple[1] as Uint8Array<ArrayBuffer>;
          borrows.push(finalBorrow);
        }
      }

      // EXCLUSIVE ZONE
      if (case3Conf.sharedValidColumn > earlierMarquee) {
        const exclusiveOperand = wrungAFirst < wrungBFirst ? tempA : tempB;
        console.log(`CASE 3 EXCLUSIVE ZONE: columns ${case3Conf.sharedValidColumn - 1} to ${earlierMarquee}`);

        for (let column = case3Conf.sharedValidColumn - 1; column >= earlierMarquee; column--) {
          const pos = 1 + column * 3;
          const activeSpool = column === 0 ? SpooledShiftedDifferenceSeries : SpooledDifferenceSeries;

          let intermediate = new Uint8Array([exclusiveOperand[pos], exclusiveOperand[pos + 1], exclusiveOperand[pos + 2]]);
          while (borrows.length > 0) {
            const borrow = borrows.pop()!;
            const borrowTuple = activeSpool[intermediate[0]][intermediate[1]][intermediate[2]][borrow[0]][borrow[1]][borrow[2]] as (
              | Uint8Array
              | number
            )[];
            // eslint-disable-next-line max-depth
            if (borrowTuple.length === 1) {
              intermediate = borrowTuple[0] as Uint8Array<ArrayBuffer>;
            } else {
              intermediate = borrowTuple[0] as Uint8Array<ArrayBuffer>;
              const newBorrow = borrowTuple[1] as Uint8Array<ArrayBuffer>;
              borrows.push(newBorrow);
            }
          }

          result[pos] = intermediate[0];
          result[pos + 1] = intermediate[1];
          result[pos + 2] = intermediate[2];
        }
      }
    }

    // PLACEHOLDER ZONE (if borrows remain)
    if (borrows.length > 0) {
      console.log(`CASE 3 PLACEHOLDER: ${borrows.length} borrows remaining`);
      const earliestColumn = Math.min(
        case3Conf.wrungAMarquee.firstValidRotation ?? 20,
        case3Conf.wrungBMarquee.firstValidRotation ?? 20
      );

      for (let column = earliestColumn - 1; column >= 0; column--) {
        const pos = 1 + column * 3;
        let intermediate = new Uint8Array([0, 0, 0]);

        while (borrows.length > 0) {
          const borrow = borrows.pop()!;
          const borrowTuple = SpooledDifferenceSeries[intermediate[0]][intermediate[1]][intermediate[2]][borrow[0]][borrow[1]][borrow[2]] as (
            | Uint8Array
            | number
          )[];
          if (borrowTuple.length === 1) {
            intermediate = borrowTuple[0] as Uint8Array<ArrayBuffer>;
          } else {
            intermediate = borrowTuple[0] as Uint8Array<ArrayBuffer>;
            const newBorrow = borrowTuple[1] as Uint8Array<ArrayBuffer>;
            borrows.push(newBorrow);
          }
        }

        result[pos] = intermediate[0];
        result[pos + 1] = intermediate[1];
        result[pos + 2] = intermediate[2];

        if (borrows.length === 0) {break;}
      }
    }

    // Column 0 Normalization
    const col0Binary = [result[1], result[2], result[3]];
    const col1Binary = [result[4], result[5], result[6]];
    const isExternalCarry = col0Binary[0] === 0 && col0Binary[1] === 0 && col0Binary[2] === 0;

    if (isExternalCarry) {
      const hasCarryToColumn1 = col1Binary[0] !== 0 || col1Binary[1] !== 0 || col1Binary[2] !== 0;
      if (!hasCarryToColumn1) {
        result[3] = 1; // Normalize to marquee
        console.log('CASE 3: Normalized column 0 to marquee [0,0,1]');
      }
    }

    // Magnitude comparison for sign determination
    // compareMagnitude returns true if A > B, false if B >= A
    const aGreaterThanB = compareMagnitude(
      tempA,
      tempB,
      case3Conf.wrungAMarquee.firstValidRotation ?? 20,
      case3Conf.wrungBMarquee.firstValidRotation ?? 20
    );

    if (!aGreaterThanB) {
      // B >= A: Result negative
      result[0] = 0; // Unsigned = Negative
      console.log('CASE 3: B >= A → Result sign flips to Unsigned (negative)');
    } else {
      // A > B: Result positive
      result[0] = 1;
      console.log('CASE 3: A > B → Result sign positive');
    }

    return result;
  }

  // CASE 4: (-A) + (+B) → B - A with magnitude-based sign
  if (signA === 0 && signB === 1) {
    console.log('CASE 4: (-A) + (+B) → Difference Spool (B - abs(A))');

    // Create positive temps for magnitude operation
    const tempA = new Uint8Array(wrungA);
    tempA[0] = 1;
    const tempB = new Uint8Array(wrungB);
    tempB[0] = 1;

    // Conference for marquee detection
    const case4Conf = ConferBidirectional(tempA, tempB);

    // Special case: both zero
    if (case4Conf.wrungAMarquee.isAbsoluteZero && case4Conf.wrungBMarquee.isAbsoluteZero) {
      return SPECIAL_CASE_STORE.ZERO_CASE;
    }

    // Create result buffer
    const result = new Uint8Array(64);
    result[0] = 1; // Temporary positive (will be corrected below)

    // Borrow accumulator (NOT carry - this is subtraction)
    const borrows: Uint8Array<ArrayBuffer>[] = [];

    // EXACT EVEN PATH
    if (case4Conf.exactEven) {
      console.log(`CASE 4 EXACT EVEN: Marquees at ${case4Conf.sharedValidColumn}`);

      for (let column = 20; column >= case4Conf.sharedValidColumn; column--) {
        const pos = 1 + column * 3;
        const activeSpool = column === 0 ? SpooledShiftedDifferenceSeries : SpooledDifferenceSeries;

        // Deplete borrows into tempB (minuend in Case 4)
        let intermediate = new Uint8Array([tempB[pos], tempB[pos + 1], tempB[pos + 2]]);
        while (borrows.length > 0) {
          const borrow = borrows.pop()!;
          const borrowTuple = activeSpool[intermediate[0]][intermediate[1]][intermediate[2]][borrow[0]][borrow[1]][borrow[2]] as (
            | Uint8Array
            | number
          )[];
          if (borrowTuple.length === 1) {
            intermediate = borrowTuple[0] as Uint8Array<ArrayBuffer>;
          } else {
            intermediate = borrowTuple[0] as Uint8Array<ArrayBuffer>;
            const newBorrow = borrowTuple[1] as Uint8Array<ArrayBuffer>;
            borrows.push(newBorrow);
          }
        }

        // Subtract tempA from intermediate (B - A)
        const finalTuple = activeSpool[intermediate[0]][intermediate[1]][intermediate[2]][tempA[pos]][tempA[pos + 1]][tempA[pos + 2]] as (
          | Uint8Array<ArrayBuffer>
          | number
        )[];
        const finalResult = finalTuple[0] as Uint8Array;

        // Write result
        result[pos] = finalResult[0];
        result[pos + 1] = finalResult[1];
        result[pos + 2] = finalResult[2];

        // Push borrow if exists
        if (finalTuple.length === 2) {
          const finalBorrow = finalTuple[1] as Uint8Array<ArrayBuffer>;
          borrows.push(finalBorrow);
        }
      }
    } else {
      // SHIFTED PATH
      const wrungAFirst = case4Conf.wrungAMarquee.firstValidRotation ?? 20;
      const wrungBFirst = case4Conf.wrungBMarquee.firstValidRotation ?? 20;
      const earlierMarquee = Math.min(wrungAFirst, wrungBFirst);
      console.log(`CASE 4 SHIFTED: tempA first=${wrungAFirst}, tempB first=${wrungBFirst}`);

      // SHARED ZONE (sharedValidColumn → 20)
      for (let column = 20; column >= case4Conf.sharedValidColumn; column--) {
        const pos = 1 + column * 3;
        const activeSpool = column === 0 ? SpooledShiftedDifferenceSeries : SpooledDifferenceSeries;

        // Deplete borrows into tempB
        let intermediate = new Uint8Array([tempB[pos], tempB[pos + 1], tempB[pos + 2]]);
        while (borrows.length > 0) {
          const borrow = borrows.pop()!;
          const borrowTuple = activeSpool[intermediate[0]][intermediate[1]][intermediate[2]][borrow[0]][borrow[1]][borrow[2]] as (
            | Uint8Array
            | number
          )[];
          if (borrowTuple.length === 1) {
            intermediate = borrowTuple[0] as Uint8Array<ArrayBuffer>;
          } else {
            intermediate = borrowTuple[0] as Uint8Array<ArrayBuffer>;
            const newBorrow = borrowTuple[1] as Uint8Array<ArrayBuffer>;
            borrows.push(newBorrow);
          }
        }

        // Subtract tempA (B - A)
        const finalTuple = activeSpool[intermediate[0]][intermediate[1]][intermediate[2]][tempA[pos]][tempA[pos + 1]][tempA[pos + 2]] as (
          | Uint8Array<ArrayBuffer>
          | number
        )[];
        const finalResult = finalTuple[0] as Uint8Array;

        result[pos] = finalResult[0];
        result[pos + 1] = finalResult[1];
        result[pos + 2] = finalResult[2];

        if (finalTuple.length === 2) {
          const finalBorrow = finalTuple[1] as Uint8Array<ArrayBuffer>;
          borrows.push(finalBorrow);
        }
      }

      // EXCLUSIVE ZONE
      if (case4Conf.sharedValidColumn > earlierMarquee) {
        const exclusiveOperand = wrungAFirst < wrungBFirst ? tempA : tempB;
        console.log(`CASE 4 EXCLUSIVE ZONE: columns ${case4Conf.sharedValidColumn - 1} to ${earlierMarquee}`);

        for (let column = case4Conf.sharedValidColumn - 1; column >= earlierMarquee; column--) {
          const pos = 1 + column * 3;
          const activeSpool = column === 0 ? SpooledShiftedDifferenceSeries : SpooledDifferenceSeries;

          let intermediate = new Uint8Array([exclusiveOperand[pos], exclusiveOperand[pos + 1], exclusiveOperand[pos + 2]]);
          while (borrows.length > 0) {
            const borrow = borrows.pop()!;
            const borrowTuple = activeSpool[intermediate[0]][intermediate[1]][intermediate[2]][borrow[0]][borrow[1]][borrow[2]] as (
              | Uint8Array
              | number
            )[];
            // eslint-disable-next-line max-depth
            if (borrowTuple.length === 1) {
              intermediate = borrowTuple[0] as Uint8Array<ArrayBuffer>;
            } else {
              intermediate = borrowTuple[0] as Uint8Array<ArrayBuffer>;
              const newBorrow = borrowTuple[1] as Uint8Array<ArrayBuffer>;
              borrows.push(newBorrow);
            }
          }

          result[pos] = intermediate[0];
          result[pos + 1] = intermediate[1];
          result[pos + 2] = intermediate[2];
        }
      }
    }

    // PLACEHOLDER ZONE (if borrows remain)
    if (borrows.length > 0) {
      console.log(`CASE 4 PLACEHOLDER: ${borrows.length} borrows remaining`);
      const earliestColumn = Math.min(
        case4Conf.wrungAMarquee.firstValidRotation ?? 20,
        case4Conf.wrungBMarquee.firstValidRotation ?? 20
      );

      for (let column = earliestColumn - 1; column >= 0; column--) {
        const pos = 1 + column * 3;
        let intermediate = new Uint8Array([0, 0, 0]);

        while (borrows.length > 0) {
          const borrow = borrows.pop()!;
          const borrowTuple = SpooledDifferenceSeries[intermediate[0]][intermediate[1]][intermediate[2]][borrow[0]][borrow[1]][borrow[2]] as (
            | Uint8Array
            | number
          )[];
          if (borrowTuple.length === 1) {
            intermediate = borrowTuple[0] as Uint8Array<ArrayBuffer>;
          } else {
            intermediate = borrowTuple[0] as Uint8Array<ArrayBuffer>;
            const newBorrow = borrowTuple[1] as Uint8Array<ArrayBuffer>;
            borrows.push(newBorrow);
          }
        }

        result[pos] = intermediate[0];
        result[pos + 1] = intermediate[1];
        result[pos + 2] = intermediate[2];

        if (borrows.length === 0) {
          break;
        }
      }
    }

    // Column 0 Normalization
    const col0Binary = [result[1], result[2], result[3]];
    const col1Binary = [result[4], result[5], result[6]];
    const isExternalCarry = col0Binary[0] === 0 && col0Binary[1] === 0 && col0Binary[2] === 0;

    if (isExternalCarry) {
      const hasCarryToColumn1 = col1Binary[0] !== 0 || col1Binary[1] !== 0 || col1Binary[2] !== 0;
      if (!hasCarryToColumn1) {
        result[3] = 1; // Normalize to marquee
        console.log('CASE 4: Normalized column 0 to marquee [0,0,1]');
      }
    }

    // Magnitude comparison for sign determination
    // compareMagnitude returns true if first arg > second arg
    const bGreaterThanA = compareMagnitude(
      tempB,
      tempA,
      case4Conf.wrungBMarquee.firstValidRotation ?? 20,
      case4Conf.wrungAMarquee.firstValidRotation ?? 20
    );

    if (bGreaterThanA) {
      // B > A: Result positive
      result[0] = 1; // Positive
      console.log('CASE 4: B > A → Result Signed as Positive');
    } else {
      // A >= B: Result negative
      result[0] = 0; // Unsigned = Negative
      console.log('CASE 4: A >= B → Result negative');
    }

    return result;
  }

  // CASE 1: Both positive → existing SumWrung logic (unchanged)
  console.log('CASE 1: Both positive → normal sum');

  // Phase 2: Conference both operands to determine Marquee states
  const conferredState = ConferBidirectional(wrungA, wrungB);
  // Special case: Both absolute zero
  if (conferredState.wrungAMarquee.isAbsoluteZero && conferredState.wrungBMarquee.isAbsoluteZero) {
    return SPECIAL_CASE_STORE.ZERO_CASE;
  }
  // Create output buffer
  const result = new Uint8Array(64);
  // Copy sign from wrungA (position 0) - for now, assume same sign
  result[0] = wrungA[0];
  // Carry accumulator - array of Uint8Array[3] carries
  const carries: Uint8Array<ArrayBuffer>[] = [];

  // SPECIAL CASE: Sign = 1, No Marquee Present (all 000)
  // Only column 20 valid, no backward propagation allowed
  const hasMarqueeA = conferredState.wrungAMarquee.marqueeRotation !== undefined;
  const hasMarqueeB = conferredState.wrungBMarquee.marqueeRotation !== undefined;
  const noMarqueePresent = !hasMarqueeA && !hasMarqueeB && conferredState.sharedValidColumn === 20;
  if (noMarqueePresent) {
    console.log('SPECIAL CASE: No marquee, Sign=1, processing column 20');
    // Process column 20 (index 20, positions 61-63)
    const pos20 = 1 + 20 * 3;
    // Add wrungA[20] + wrungB[20]
    const finalTuple = SpooledSumSeries[wrungA[pos20]][wrungA[pos20 + 1]][wrungA[pos20 + 2]][wrungB[pos20]][wrungB[pos20 + 1]][
      wrungB[pos20 + 2]
    ] as (Uint8Array<ArrayBuffer> | number)[];
    const finalResult = finalTuple[0] as Uint8Array;
    result[pos20] = finalResult[0];
    result[pos20 + 1] = finalResult[1];
    result[pos20 + 2] = finalResult[2];
    // If carry generated, SET marquee at column 19 (no addition)
    if (finalTuple.length === 2) {
      console.log('SPECIAL CASE: Carry generated, SETTING marquee');
      // SET column 19 to 001 (marquee marker) - this is a SET, not an ADD
      const pos19 = 1 + 19 * 3;
      result[pos19] = 0;
      result[pos19 + 1] = 0;
      result[pos19 + 2] = 1;
      console.log('SPECIAL CASE: Marquee SET at column 19, result at column 20');
    }
    return result;
  }
  // Phase 3: Branch based on exactEven
  if (conferredState.exactEven) {
    // EXACT EVEN PATH: Both marquees aligned, clean summation
    console.log(`EXACT EVEN: Both marquees at ${conferredState.sharedValidColumn}`);
    for (let column = 20; column >= conferredState.sharedValidColumn; column--) {
      const pos = 1 + column * 3;
      // FIRST WRUNG: Deplete accumulated carries into wrungA
      let intermediate = new Uint8Array([wrungA[pos], wrungA[pos + 1], wrungA[pos + 2]]);
      while (carries.length > 0) {
        const carry = carries.pop()!;
        const activeSpool = column === 0 ? ShiftedSpooledSumSeries : SpooledSumSeries;
        const carryTuple = activeSpool[intermediate[0]][intermediate[1]][intermediate[2]][carry[0]][carry[1]][carry[2]] as (
          | Uint8Array
          | number
        )[];
        if (carryTuple.length === 1) {
          intermediate = carryTuple[0] as Uint8Array<ArrayBuffer>;
        } else {
          intermediate = carryTuple[0] as Uint8Array<ArrayBuffer>;
          const newCarry = carryTuple[1] as Uint8Array<ArrayBuffer>;
          carries.push(newCarry);
        }
      }
      // SECOND WRUNG: Add wrungB to intermediate
      console.log(
        `Column ${column}: intermediate=[${intermediate[0]},${intermediate[1]},${intermediate[2]}] wrungB=[${wrungB[pos]},${
          wrungB[pos + 1]
        },${wrungB[pos + 2]}]`
      );
      const activeSpool2 = column === 0 ? ShiftedSpooledSumSeries : SpooledSumSeries;
      const finalTuple = activeSpool2[intermediate[0]][intermediate[1]][intermediate[2]][wrungB[pos]][wrungB[pos + 1]][wrungB[pos + 2]] as (
        | Uint8Array<ArrayBuffer>
        | number
      )[];
      const finalResult = finalTuple[0] as Uint8Array;
      console.log(`Column ${column}: finalResult=[${finalResult[0]},${finalResult[1]},${finalResult[2]}]`);
      // Write result
      result[pos] = finalResult[0];
      result[pos + 1] = finalResult[1];
      result[pos + 2] = finalResult[2];
      // Push carry if exists
      if (finalTuple.length === 2) {
        const finalCarry = finalTuple[1] as Uint8Array<ArrayBuffer>;
        carries.push(finalCarry);
      }
    }
  } else {
    // SHIFTED PATH: Marquees at different positions, handle exclusive zones
    const wrungAFirst = conferredState.wrungAMarquee.firstValidRotation ?? 20;
    const wrungBFirst = conferredState.wrungBMarquee.firstValidRotation ?? 20;
    const earlierMarquee = Math.min(wrungAFirst, wrungBFirst);
    console.log(`SHIFTED: wrungA first=${wrungAFirst}, wrungB first=${wrungBFirst}, shared=${conferredState.sharedValidColumn}`);
    // SHARED ZONE: Both operands participate (sharedValidColumn → 20)
    for (let column = 20; column >= conferredState.sharedValidColumn; column--) {
      const pos = 1 + column * 3;
      // Deplete carries into wrungA
      let intermediate = new Uint8Array([wrungA[pos], wrungA[pos + 1], wrungA[pos + 2]]);
      while (carries.length > 0) {
        const carry = carries.pop()!;
        const activeSpool = column === 0 ? ShiftedSpooledSumSeries : SpooledSumSeries;
        const carryTuple = activeSpool[intermediate[0]][intermediate[1]][intermediate[2]][carry[0]][carry[1]][carry[2]] as (
          | Uint8Array
          | number
        )[];
        if (carryTuple.length === 1) {
          intermediate = carryTuple[0] as Uint8Array<ArrayBuffer>;
        } else {
          intermediate = carryTuple[0] as Uint8Array<ArrayBuffer>;
          const newCarry = carryTuple[1] as Uint8Array<ArrayBuffer>;
          carries.push(newCarry);
        }
      }
      // Add wrungB
      const activeSpool2 = column === 0 ? ShiftedSpooledSumSeries : SpooledSumSeries;
      const finalTuple = activeSpool2[intermediate[0]][intermediate[1]][intermediate[2]][wrungB[pos]][wrungB[pos + 1]][wrungB[pos + 2]] as (
        | Uint8Array<ArrayBuffer>
        | number
      )[];
      const finalResult = finalTuple[0] as Uint8Array;
      result[pos] = finalResult[0];
      result[pos + 1] = finalResult[1];
      result[pos + 2] = finalResult[2];
      if (finalTuple.length === 2) {
        const finalCarry = finalTuple[1] as Uint8Array<ArrayBuffer>;
        carries.push(finalCarry);
      }
    }
    // EXCLUSIVE ZONE: Only earlier marquee's operand participates
    if (conferredState.sharedValidColumn > earlierMarquee) {
      const exclusiveOperand = wrungAFirst < wrungBFirst ? wrungA : wrungB;
      console.log(`EXCLUSIVE ZONE: columns ${conferredState.sharedValidColumn - 1} to ${earlierMarquee}`);
      for (let column = conferredState.sharedValidColumn - 1; column >= earlierMarquee; column--) {
        const pos = 1 + column * 3;
        // Deplete carries into the exclusive operand
        let intermediate = new Uint8Array([exclusiveOperand[pos], exclusiveOperand[pos + 1], exclusiveOperand[pos + 2]]);
        while (carries.length > 0) {
          const carry = carries.pop()!;
          const activeSpool = column === 0 ? ShiftedSpooledSumSeries : SpooledSumSeries;
          const carryTuple = activeSpool[intermediate[0]][intermediate[1]][intermediate[2]][carry[0]][carry[1]][carry[2]] as (
            | Uint8Array
            | number
          )[];
          if (carryTuple.length === 1) {
            intermediate = carryTuple[0] as Uint8Array<ArrayBuffer>;
          } else {
            intermediate = carryTuple[0] as Uint8Array<ArrayBuffer>;
            const newCarry = carryTuple[1] as Uint8Array<ArrayBuffer>;
            carries.push(newCarry);
          }
        }
        // Write result (no second operand addition in exclusive zone)
        result[pos] = intermediate[0];
        result[pos + 1] = intermediate[1];
        result[pos + 2] = intermediate[2];
      }
    }
  }

  // PLACEHOLDER ZONE: Deplete remaining carries into placeholder columns
  if (carries.length > 0) {
    const earliestColumn = Math.min(
      conferredState.wrungAMarquee.firstValidRotation ?? 20,
      conferredState.wrungBMarquee.firstValidRotation ?? 20
    );
    console.log(`PLACEHOLDER ZONE: columns ${earliestColumn - 1} to 0, ${carries.length} carries remaining`);
    for (let column = earliestColumn - 1; column >= 0; column--) {
      const pos = 1 + column * 3;
      // Start with placeholder 000
      let intermediate = new Uint8Array([0, 0, 0]);
      while (carries.length > 0) {
        const carry = carries.pop()!;
        const carryTuple = SpooledSumSeries[intermediate[0]][intermediate[1]][intermediate[2]][carry[0]][carry[1]][carry[2]] as (
          | Uint8Array
          | number
        )[];
        if (carryTuple.length === 1) {
          intermediate = carryTuple[0] as Uint8Array<ArrayBuffer>;
        } else {
          intermediate = carryTuple[0] as Uint8Array<ArrayBuffer>;
          const newCarry = carryTuple[1] as Uint8Array<ArrayBuffer>;
          carries.push(newCarry);
        }
      }
      // Write result
      result[pos] = intermediate[0];
      result[pos + 1] = intermediate[1];
      result[pos + 2] = intermediate[2];
      // If no more carries, we're done
      if (carries.length === 0) {
        break;
      }
    }
  }
  // If carries STILL remain after column 0, overflow occurred
  if (carries.length > 0) {
    console.log('Some Carries', carries);
    return result[0] === 1 ?
      SPECIAL_CASE_STORE.POSITIVE_1_CASE
      :
      SPECIAL_CASE_STORE.NEGATIVE_TWIST_CASE;
  }
  return result;
};

export const DifferenceWrung = (
  wrungA: Uint8Array<ArrayBuffer>,
  wrungB: Uint8Array<ArrayBuffer>
): Uint8Array<ArrayBuffer> => {
  console.log(
    'DIFFERENCEWRUNG START: ' +
      `wrungA col0=[${wrungA[1]},${wrungA[2]},${wrungA[3]}] col20=[${wrungA[61]},${wrungA[62]},${wrungA[63]}] ` +
      `wrungB col0=[${wrungB[1]},${wrungB[2]},${wrungB[3]}] col20=[${wrungB[61]},${wrungB[62]},${wrungB[63]}]`
  );
  // Phase 1: Conference both operands to determine Marquee states
  const conferredState = ConferBidirectional(wrungA, wrungB);
  console.log(
    'CONFERENCE RESULT: ' +
    `wrungAMarquee.marqueeRotation=${conferredState.wrungAMarquee.marqueeRotation}, ` +
    `wrungBMarquee.marqueeRotation=${conferredState.wrungBMarquee.marqueeRotation}, ` +
    `sharedValidColumn=${conferredState.sharedValidColumn}`
  );
  // Phase 1.5: Sign routing - Determine effective operation based on signs
  const signA = wrungA[0] as 0 | 1;
  const signB = wrungB[0] as 0 | 1;
  console.log(`SIGN ROUTING: signA=${signA} (${signA === 1 ? '+' : '-'}), signB=${signB} (${signB === 1 ? '-' : '+'}), operation='-'`);

  const routing = determineEffectiveOperation(
    '-', // DifferenceWrung always performs subtraction
    signA,
    signB,
    wrungA,
    wrungB,
    conferredState.wrungAMarquee.firstValidRotation ?? 20,
    conferredState.wrungBMarquee.firstValidRotation ?? 20
  );

  // Log routing decision with operand information
  const minuendName = routing.minuend === wrungA ? 'wrungA' : 'wrungB';
  const subtrahendName = routing.subtrahend === wrungA ? 'wrungA' : 'wrungB';
  console.log(
    `ROUTING RESULT: effectiveOp=${routing.effectiveOp}, ` +
    `minuend=${minuendName}, subtrahend=${subtrahendName}, ` +
    `resultSign=${routing.resultSign} (${routing.resultSign === 1 ? '+' : '-'})`
  );

  // Phase 1.6: If routing to SUM, delegate to SumWrung with routing operands
  if (routing.effectiveOp === 'sum') {
    console.log('SIGN ROUTING: Delegating to SumWrung (subtracting negative = adding)');
    console.log(`  minuend col0=[${routing.minuend[1]},${routing.minuend[2]},${routing.minuend[3]}]`);
    console.log(`  subtrahend col0=[${routing.subtrahend[1]},${routing.subtrahend[2]},${routing.subtrahend[3]}]`);
    const sumResult = SumWrung(routing.minuend, routing.subtrahend);
    console.log(`SUMWRUNG RETURNED: col0=[${sumResult[1]},${sumResult[2]},${sumResult[3]}], col1=[${sumResult[4]},${sumResult[5]},${sumResult[6]}]`);
    // Apply routing result sign
    sumResult[0] = routing.resultSign;
    console.log(`SUM DELEGATION COMPLETE: resultSign=${routing.resultSign} applied`);

    // CRITICAL: Apply normalization before returning
    // SumWrung can return ZERO_CASE which needs column 0 normalization
    const col0Binary = [sumResult[1], sumResult[2], sumResult[3]];
    const col1Binary = [sumResult[4], sumResult[5], sumResult[6]];
    console.log(`SUM DELEGATION NORMALIZATION CHECK: col0=[${col0Binary}], col1=[${col1Binary}]`);
    const isExternalCarry = col0Binary[0] === 0 && col0Binary[1] === 0 && col0Binary[2] === 0;

    if (isExternalCarry) {
      const hasCarryToColumn1 = col1Binary[0] !== 0 || col1Binary[1] !== 0 || col1Binary[2] !== 0;
      console.log(`  isExternalCarry=true, hasCarryToColumn1=${hasCarryToColumn1}`);
      if (!hasCarryToColumn1) {
        console.log('SUM DELEGATION NORMALIZATION: Column 0 [0,0,0] → [0,0,1] (zero result → marquee display)');
        sumResult[3] = 1;
      }
    }

    return sumResult;
  }

  // Phase 1.7: For DIFFERENCE operations, use routing operands for all spool lookups
  // routing.minuend and routing.subtrahend determine the correct operand order
  // CRITICAL: Use routing.minuend/subtrahend for ALL spool lookups, not wrungA/wrungB
  console.log(`SIGN ROUTING: Using DIFFERENCE spool with routing operands, will apply resultSign=${routing.resultSign} at end`);

  // Assign routing operands to working variables for the rest of the function
  const minuend = routing.minuend;
  const subtrahend = routing.subtrahend;

  // Track which operand is A vs B for negative one detection
  const minuendIsA = (minuend === wrungA);
  const aIsNegativeOne = conferredState.wrungAMarquee.isNegativeOne ?? false;
  const bIsNegativeOne = conferredState.wrungBMarquee.isNegativeOne ?? false;
  const minuendIsNegativeOne = minuendIsA ? aIsNegativeOne : bIsNegativeOne;
  const subtrahendIsNegativeOne = minuendIsA ? bIsNegativeOne : aIsNegativeOne;

  // Phase 2: Special case - both absolute zero
  if (conferredState.wrungAMarquee.isAbsoluteZero && conferredState.wrungBMarquee.isAbsoluteZero) {
    return SPECIAL_CASE_STORE.ZERO_CASE;
  }
  // Phase 3: Create result buffer
  const result = new Uint8Array(64);
  // Temporarily copy sign from minuend (will be replaced with routing.resultSign at end)
  result[0] = routing.resultSign;
  // Phase 4: Borrow accumulator - array of Uint8Array[3] borrows
  const borrows: Uint8Array<ArrayBuffer>[] = [];

  // Phase 6: SPECIAL CASE - No Marquee Present (Sign = 1, all 000)
  // Only column 20 valid, no backward propagation allowed
  const hasMarqueeA = conferredState.wrungAMarquee.marqueeRotation !== undefined;
  const hasMarqueeB = conferredState.wrungBMarquee.marqueeRotation !== undefined;
  const noMarqueePresent = !hasMarqueeA && !hasMarqueeB && conferredState.sharedValidColumn === 20;
  if (noMarqueePresent) {
    console.log('SPECIAL CASE: No marquee, processing column 20');
    // Process column 20 (index 20, positions 61-63)
    const pos20 = 1 + 20 * 3;
    // SPOOL SELECTION: Negative One detection for column 20
    let activeSpool: SpooledWrung;
    if (minuendIsNegativeOne && !subtrahendIsNegativeOne) {
      activeSpool = SpooledNegativeOneMinusSomeNumberSeries; // (-1) - X
    } else if (!minuendIsNegativeOne && subtrahendIsNegativeOne) {
      activeSpool = SpooledSomeNumberMinusNegativeOneSeries; // X - (-1)
    } else {
      activeSpool = SpooledDifferenceSeries; // Regular difference
    }
    // Subtract minuend[20] - subtrahend[20]
    const finalTuple = activeSpool[minuend[pos20]][minuend[pos20 + 1]][minuend[pos20 + 2]][subtrahend[pos20]][subtrahend[pos20 + 1]][
      subtrahend[pos20 + 2]
    ] as (Uint8Array<ArrayBuffer> | number)[];
    const finalResult = finalTuple[0] as Uint8Array;
    result[pos20] = finalResult[0];
    result[pos20 + 1] = finalResult[1];
    result[pos20 + 2] = finalResult[2];
    // If borrow generated, SET marquee at column 19 (no subtraction)
    if (finalTuple.length === 2) {
      console.log('SPECIAL CASE: Borrow generated, SETTING marquee');
      // SET column 19 to 001 (marquee marker) - this is a SET, not a SUBTRACT
      const pos19 = 1 + 19 * 3;
      result[pos19] = 0;
      result[pos19 + 1] = 0;
      result[pos19 + 2] = 1;
      console.log('SPECIAL CASE: Marquee SET at column 19, result at column 20');
    }

    // CRITICAL: Apply normalization before returning
    // The "no marquee" case can return ZERO_CASE which needs column 0 normalization
    // Check column 0 and normalize if needed
    const col0Binary = [result[1], result[2], result[3]];
    const col1Binary = [result[4], result[5], result[6]];
    const isExternalCarry = col0Binary[0] === 0 && col0Binary[1] === 0 && col0Binary[2] === 0;

    if (isExternalCarry) {
      const hasCarryToColumn1 = col1Binary[0] !== 0 || col1Binary[1] !== 0 || col1Binary[2] !== 0;
      if (!hasCarryToColumn1) {
        console.log('SPECIAL CASE NORMALIZATION: Column 0 [0,0,0] → [0,0,1] (zero result → marquee display)');
        result[3] = 1;
      }
    }

    return result;
  }
  // Phase 7: Branch based on exactEven
  if (conferredState.exactEven) {
    // EXACT EVEN PATH: Both marquees aligned, clean subtraction
    console.log(`EXACT EVEN: Both marquees at ${conferredState.sharedValidColumn}`);
    for (let column = 20; column >= conferredState.sharedValidColumn; column--) {
      const pos = 1 + column * 3;
      // SPOOL SELECTION: Column 20 Negative One detection + Column 0 shifted topology
      let activeSpool: SpooledWrung;
      if (column === 20 && minuendIsNegativeOne && !subtrahendIsNegativeOne) {
        activeSpool = SpooledNegativeOneMinusSomeNumberSeries; // (-1) - X
      } else if (column === 20 && !minuendIsNegativeOne && subtrahendIsNegativeOne) {
        activeSpool = SpooledSomeNumberMinusNegativeOneSeries; // X - (-1)
      } else if (column === 0) {
        activeSpool = SpooledShiftedDifferenceSeries; // Column 0 shifted topology
      } else {
        activeSpool = SpooledDifferenceSeries; // Regular difference
      }
      // FIRST WRUNG: Deplete accumulated borrows into minuend
      let intermediate = new Uint8Array([minuend[pos], minuend[pos + 1], minuend[pos + 2]]);
      while (borrows.length > 0) {
        const borrow = borrows.pop()!;
        const borrowTuple = activeSpool[intermediate[0]][intermediate[1]][intermediate[2]][borrow[0]][borrow[1]][borrow[2]] as (
          | Uint8Array
          | number
        )[];
        if (borrowTuple.length === 1) {
          intermediate = borrowTuple[0] as Uint8Array<ArrayBuffer>;
        } else {
          intermediate = borrowTuple[0] as Uint8Array<ArrayBuffer>;
          const newBorrow = borrowTuple[1] as Uint8Array<ArrayBuffer>;
          borrows.push(newBorrow);
        }
      }
      // SECOND WRUNG: Subtract subtrahend from intermediate
      console.log(
        `Column ${column}: intermediate=[${intermediate[0]},${intermediate[1]},${intermediate[2]}] ` +
          `subtrahend=[${subtrahend[pos]},${subtrahend[pos + 1]},${subtrahend[pos + 2]}]`
      );
      const finalTuple = activeSpool[intermediate[0]][intermediate[1]][intermediate[2]][subtrahend[pos]][subtrahend[pos + 1]][subtrahend[pos + 2]] as ( // Same spool as First Wrung
        | Uint8Array<ArrayBuffer>
        | number
      )[];
      const finalResult = finalTuple[0] as Uint8Array;
      console.log(`Column ${column}: finalResult=[${finalResult[0]},${finalResult[1]},${finalResult[2]}]`);
      // Write result
      result[pos] = finalResult[0];
      result[pos + 1] = finalResult[1];
      result[pos + 2] = finalResult[2];
      // Push borrow if exists
      if (finalTuple.length === 2) {
        const finalBorrow = finalTuple[1] as Uint8Array<ArrayBuffer>;
        borrows.push(finalBorrow);
      }
    }
  } else {
    // SHIFTED PATH: Marquees at different positions, handle exclusive zones
    const wrungAFirst = conferredState.wrungAMarquee.firstValidRotation ?? 20;
    const wrungBFirst = conferredState.wrungBMarquee.firstValidRotation ?? 20;
    const earlierMarquee = Math.min(wrungAFirst, wrungBFirst);
    console.log(`SHIFTED: wrungA first=${wrungAFirst}, wrungB first=${wrungBFirst}, shared=${conferredState.sharedValidColumn}`);
    // SHARED ZONE: Both operands participate (sharedValidColumn → 20)
    for (let column = 20; column >= conferredState.sharedValidColumn; column--) {
      const pos = 1 + column * 3;
      // SPOOL SELECTION: Column 20 Negative One detection + Column 0 shifted topology
      let activeSpool: SpooledWrung;
      if (column === 20 && minuendIsNegativeOne && !subtrahendIsNegativeOne) {
        activeSpool = SpooledNegativeOneMinusSomeNumberSeries; // (-1) - X
      } else if (column === 20 && !minuendIsNegativeOne && subtrahendIsNegativeOne) {
        activeSpool = SpooledSomeNumberMinusNegativeOneSeries; // X - (-1)
      } else if (column === 0) {
        activeSpool = SpooledShiftedDifferenceSeries; // Column 0 shifted topology
      } else {
        activeSpool = SpooledDifferenceSeries; // Regular difference
      }
      // Deplete borrows into minuend
      let intermediate = new Uint8Array([minuend[pos], minuend[pos + 1], minuend[pos + 2]]);
      while (borrows.length > 0) {
        const borrow = borrows.pop()!;
        const borrowTuple = activeSpool[intermediate[0]][intermediate[1]][intermediate[2]][borrow[0]][borrow[1]][borrow[2]] as (
          | Uint8Array
          | number
        )[];
        if (borrowTuple.length === 1) {
          intermediate = borrowTuple[0] as Uint8Array<ArrayBuffer>;
        } else {
          intermediate = borrowTuple[0] as Uint8Array<ArrayBuffer>;
          const newBorrow = borrowTuple[1] as Uint8Array<ArrayBuffer>;
          borrows.push(newBorrow);
        }
      }
      // Subtract subtrahend
      const finalTuple = activeSpool[intermediate[0]][intermediate[1]][intermediate[2]][subtrahend[pos]][subtrahend[pos + 1]][subtrahend[pos + 2]] as ( // Same spool as First Wrung
        | Uint8Array<ArrayBuffer>
        | number
      )[];
      const finalResult = finalTuple[0] as Uint8Array;
      result[pos] = finalResult[0];
      result[pos + 1] = finalResult[1];
      result[pos + 2] = finalResult[2];
      if (finalTuple.length === 2) {
        const finalBorrow = finalTuple[1] as Uint8Array<ArrayBuffer>;
        borrows.push(finalBorrow);
      }
    }
    // EXCLUSIVE ZONE: Only earlier marquee's operand participates
    if (conferredState.sharedValidColumn > earlierMarquee) {
      const exclusiveOperand = wrungAFirst < wrungBFirst ? wrungA : wrungB;
      console.log(`EXCLUSIVE ZONE: columns ${conferredState.sharedValidColumn - 1} to ${earlierMarquee}`);
      for (let column = conferredState.sharedValidColumn - 1; column >= earlierMarquee; column--) {
        const pos = 1 + column * 3;
        // SPOOL SELECTION: Column 20 Negative One detection + Column 0 shifted topology
        let activeSpool: SpooledWrung;
        if (column === 20 && aIsNegativeOne && !bIsNegativeOne) {
          activeSpool = SpooledNegativeOneMinusSomeNumberSeries; // (-1) - X
        } else if (column === 20 && !aIsNegativeOne && bIsNegativeOne) {
          activeSpool = SpooledSomeNumberMinusNegativeOneSeries; // X - (-1)
        } else if (column === 0) {
          activeSpool = SpooledShiftedDifferenceSeries; // Column 0 shifted topology
        } else {
          activeSpool = SpooledDifferenceSeries; // Regular difference
        }
        // Deplete borrows into the exclusive operand
        let intermediate = new Uint8Array([exclusiveOperand[pos], exclusiveOperand[pos + 1], exclusiveOperand[pos + 2]]);
        while (borrows.length > 0) {
          const borrow = borrows.pop()!;
          const borrowTuple = activeSpool[intermediate[0]][intermediate[1]][intermediate[2]][borrow[0]][borrow[1]][borrow[2]] as (
            | Uint8Array
            | number
          )[];
          if (borrowTuple.length === 1) {
            intermediate = borrowTuple[0] as Uint8Array<ArrayBuffer>;
          } else {
            intermediate = borrowTuple[0] as Uint8Array<ArrayBuffer>;
            const newBorrow = borrowTuple[1] as Uint8Array<ArrayBuffer>;
            borrows.push(newBorrow);
          }
        }
        // Write result (no second operand subtraction in exclusive zone)
        result[pos] = intermediate[0];
        result[pos + 1] = intermediate[1];
        result[pos + 2] = intermediate[2];
      }
    }
  }

  // Phase 8: PLACEHOLDER ZONE - Deplete remaining borrows into placeholder columns
  if (borrows.length > 0) {
    const earliestColumn = Math.min(
      conferredState.wrungAMarquee.firstValidRotation ?? 20,
      conferredState.wrungBMarquee.firstValidRotation ?? 20
    );
    console.log(`PLACEHOLDER ZONE: columns ${earliestColumn - 1} to 0, ${borrows.length} borrows remaining`);
    for (let column = earliestColumn - 1; column >= 0; column--) {
      const pos = 1 + column * 3;
      // Start with placeholder 000
      let intermediate = new Uint8Array([0, 0, 0]);
      while (borrows.length > 0) {
        const borrow = borrows.pop()!;
        const borrowTuple = SpooledDifferenceSeries[intermediate[0]][intermediate[1]][intermediate[2]][borrow[0]][borrow[1]][borrow[2]] as (
          | Uint8Array
          | number
        )[];
        if (borrowTuple.length === 1) {
          intermediate = borrowTuple[0] as Uint8Array<ArrayBuffer>;
        } else {
          intermediate = borrowTuple[0] as Uint8Array<ArrayBuffer>;
          const newBorrow = borrowTuple[1] as Uint8Array<ArrayBuffer>;
          borrows.push(newBorrow);
        }
      }
      // Write result
      result[pos] = intermediate[0];
      result[pos + 1] = intermediate[1];
      result[pos + 2] = intermediate[2];
      // If no more borrows, we're done
      if (borrows.length === 0) {
        break;
      }
    }
  }
  // If borrows STILL remain after column 0, underflow occurred
  if (borrows.length > 0) {
    throw new Error('DifferenceWrung underflow: borrow beyond column 0');
  }
  // Phase 9: Apply routing result sign (from sign routing logic)
  result[0] = routing.resultSign;

  // Phase 9.5: PRE-NORMALIZATION - Shifted Topology Column 0 Zero Representation
  // When spool returns ZERO_CASE (64-bit product, greater than 3 bits input)
  // Column 0 must be normalized to marquee [0,0,1] (Display "0"), not [0,0,0] (External Carry)
  // Exception: Full Twist (real carry to column 1) keeps [0,0,0]
  const col0Binary = [result[1], result[2], result[3]];
  const col1Binary = [result[4], result[5], result[6]];

  console.log(`NORMALIZATION CHECK: col0=[${col0Binary}], col1=[${col1Binary}]`);

  // If column 0 shows [0,0,0] (external carry encoding)
  const isExternalCarry = col0Binary[0] === 0 && col0Binary[1] === 0 && col0Binary[2] === 0;

  if (isExternalCarry) {
    // Check if column 1 is empty (no actual carry present)
    const hasCarryToColumn1 = col1Binary[0] !== 0 || col1Binary[1] !== 0 || col1Binary[2] !== 0;

    console.log(`  isExternalCarry=true, hasCarryToColumn1=${hasCarryToColumn1}`);

    // If NO actual carry, normalize to marquee [0,0,1]
    // This applies to ZERO_CASE (64-bit product from spool) and computed zeros
    // Does NOT apply to Full Twist (real external carry to column 1)
    if (!hasCarryToColumn1) {
      console.log('PRE-NORMALIZATION: Column 0 [0,0,0] → [0,0,1] (zero product → marquee display)');
      result[3] = 1; // Set bit0 to 1, creating [0,0,1] (Display "0" shifted topology)
    }
  }

  // Phase 9.6: RESULT CONFERENCE - Continuous Bidirectional Method
  // Re-conference the result buffer to discover actual marquee position after all operations
  const resultMarquee = BidirectionalConference(result);
  console.log(
    `RESULT CONFERENCE: marqueeRotation=${resultMarquee.marqueeRotation}, ` +
    `isAbsoluteZero=${resultMarquee.isAbsoluteZero}`
  );

  // Phase 9.7: STATE TRANSITION DETECTION (if normalization occurred)
  // Re-conference only if we normalized - detects marquee shift
  if (isExternalCarry && col1Binary[0] === 0 && col1Binary[1] === 0 && col1Binary[2] === 0) {
    const postNormalizationMarquee = BidirectionalConference(result);

    // Detect state transition with Object.is()
    if (!Object.is(resultMarquee, postNormalizationMarquee)) {
      console.log(
        'MARQUEE STATE TRANSITION: Post-normalization conference detected shift'
      );
      // State transition detected - enables recursive shift tracking
      // Future enhancement: return { result, marqueeState } tuple
    }
  }

  console.log(`DIFFERENCEWRUNG COMPLETE: Applied routing.resultSign=${routing.resultSign}`);
  return result;
};
