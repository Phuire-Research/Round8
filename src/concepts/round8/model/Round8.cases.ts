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
import { BidirectionalConference, ConferBidirectionally, MarqueeState, ConferredMarqueeState } from './Round8.bidirectional';

export const SPECIAL_CASE_STORE = {
  ZERO_CASE: Uint8Array.from([
    0,
    0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0,
    0, 0, 0,
  ]),
  POSITIVE_1_CASE: Uint8Array.from([
    1,
    0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0,
    0, 0, 0,
  ]),
  POSITIVE_TWIST_CASE: Uint8Array.from([
    1,
    0, 0, 0, 1, 1, 1,
    1, 1, 1, 1, 1, 1,
    1, 1, 1, 1, 1, 1,
    1, 1, 1, 1, 1, 1,
    1, 1, 1, 1, 1, 1,
    1, 1, 1, 1, 1, 1,
    1, 1, 1, 1, 1, 1,
    1, 1, 1, 1, 1, 1,
    1, 1, 1, 1, 1, 1,
    1, 1, 1, 1, 1, 1,
    1, 1, 1,
  ]),
  // First Position 0
  NEGATIVE_1_CASE: Uint8Array.from([
    0,
    1, 1, 1, 1, 1, 1,
    1, 1, 1, 1, 1, 1,
    1, 1, 1, 1, 1, 1,
    1, 1, 1, 1, 1, 1,
    1, 1, 1, 1, 1, 1,
    1, 1, 1, 1, 1, 1,
    1, 1, 1, 1, 1, 1,
    1, 1, 1, 1, 1, 1,
    1, 1, 1, 1, 1, 1,
    1, 1, 1, 1, 1, 1,
    1, 1, 1,
  ]),
};

type SomeSeries = Record<string, ((Uint8Array<ArrayBuffer> | number)[] | number)[]>;

type SpooledWrung = Uint8Array<ArrayBuffer>[][][][][][][];

// Initialize 6-dimensional array structure for SpooledSumSeries
const initializeSpooledWrung = (): SpooledWrung => {
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

const spool = (someSeries: SomeSeries, spooled: SpooledWrung) => {
  let count = 0;
  Object.keys(someSeries).forEach((sum) => {
    count++;
    console.log(`Spooling case ${count}: ${sum}`);
    const caseArray = someSeries[sum];
    // caseArray structure: [bit2_X, bit1_X, bit0_X, bit2_Y, bit1_Y, [bit0_Y, result, carry?]]
    const one = caseArray[0] as number; // bit2_X
    const two = caseArray[1] as number; // bit1_X
    const three = caseArray[2] as number; // bit0_X
    const four = caseArray[3] as number; // bit2_Y
    const five = caseArray[4] as number; // bit1_Y
    const tuple = caseArray[5] as (number | Uint8Array<ArrayBuffer>)[];
    const six = tuple[0] as number; // bit0_Y
    const sixValue = tuple.slice(1) as unknown as Uint8Array<ArrayBuffer>[]; // [result, carry?]
    console.log(`  Storing at [${one}][${two}][${three}][${four}][${five}][${six}]:`, sixValue);
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
};

export const DIFFERENCE_MAP = {
  ZERO_CASE: Uint8Array.from([0, 0, 0]),
  POSITIVE_1_CASE: Uint8Array.from([0, 0, 0]),
  // First Position 0
  NEGATIVE_1_CASE: Uint8Array.from([1, 1, 1]),
};

export const STRING_TO_ROUND8_ROTATION: Record<string, Uint8Array> = {
  '1': Uint8Array.from([0, 0, 0]), // Binary 000 → Display "1"
  '2': Uint8Array.from([0, 0, 1]), // Binary 001 → Display "2"
  '3': Uint8Array.from([0, 1, 0]), // Binary 010 → Display "3"
  '4': Uint8Array.from([0, 1, 1]), // Binary 011 → Display "4"
  '5': Uint8Array.from([1, 0, 0]), // Binary 100 → Display "5"
  '6': Uint8Array.from([1, 0, 1]), // Binary 101 → Display "6"
  '7': Uint8Array.from([1, 1, 0]), // Binary 110 → Display "7"
  '8': Uint8Array.from([1, 1, 1]), // Binary 111 → Display "8"
};

/**
 * Shifted Frame Rotation Mapping (Column 0 Topology)
 *
 * Column 0 uses shifted topology because leading zeros are pruned.
 * Display "0" (Marquee) must be represented, so entire topology shifts:
 * - [0,0,1] → Display "0" (Marquee, normally would be Display "2" in regular frame)
 * - [0,0,0] → Display "7" (External Carry, normally would be Display "1" in regular frame)
 */
export const STRING_TO_ROUND8_SHIFTED_ROTATION: Record<string, Uint8Array> = {
  '0': Uint8Array.from([0, 0, 1]), // Shifted Display 0 (Marquee - pruned leading zero)
  '1': Uint8Array.from([0, 1, 0]), // Shifted Display 1
  '2': Uint8Array.from([0, 1, 1]), // Shifted Display 2
  '3': Uint8Array.from([1, 0, 0]), // Shifted Display 3
  '4': Uint8Array.from([1, 0, 1]), // Shifted Display 4
  '5': Uint8Array.from([1, 1, 0]), // Shifted Display 5
  '6': Uint8Array.from([1, 1, 1]), // Shifted Display 6 (Maximum)
  '7': Uint8Array.from([0, 0, 0]), // Shifted Display 7 (External Carry)
};

/**
 * Inverse Rotation Mappings (Uint8Array → String Display)
 *
 * Helper function to convert Uint8Array to lookup key
 */
const uint8ArrayToKey = (arr: Uint8Array): string => {
  return `${arr[0]},${arr[1]},${arr[2]}`;
};

/**
 * Regular Frame Inverse Mapping (Columns 1-20)
 */
export const ROUND8_TO_STRING_ROTATION: Record<string, string> = {
  '0,0,0': '1', // Display 1
  '0,0,1': '2', // Display 2
  '0,1,0': '3', // Display 3
  '0,1,1': '4', // Display 4
  '1,0,0': '5', // Display 5
  '1,0,1': '6', // Display 6
  '1,1,0': '7', // Display 7
  '1,1,1': '8', // Display 8
};

/**
 * Shifted Frame Inverse Mapping (Column 0)
 */
export const ROUND8_TO_STRING_SHIFTED_ROTATION: Record<string, string> = {
  '0,0,1': '0', // Shifted Display 0 (Marquee)
  '0,1,0': '1', // Shifted Display 1
  '0,1,1': '2', // Shifted Display 2
  '1,0,0': '3', // Shifted Display 3
  '1,0,1': '4', // Shifted Display 4
  '1,1,0': '5', // Shifted Display 5
  '1,1,1': '6', // Shifted Display 6
  '0,0,0': '7', // Shifted Display 7 (External Carry)
};

export const createShiftedColumnValue = (shiftedDisplay: number): Uint8Array => {
  switch (shiftedDisplay) {
  case 0:
    return Uint8Array.from([0, 0, 1]); // Marquee (position 0)
  case 1:
    return Uint8Array.from([0, 1, 0]); // Shifted Display 1 (position 1)
  case 2:
    return Uint8Array.from([0, 1, 1]); // Shifted Display 2 (position 2)
  case 3:
    return Uint8Array.from([1, 0, 0]); // Shifted Display 3 (position 3)
  case 4:
    return Uint8Array.from([1, 0, 1]); // Shifted Display 4 (position 4)
  case 5:
    return Uint8Array.from([1, 1, 0]); // Shifted Display 5 (position 5)
  case 6:
    return Uint8Array.from([1, 1, 1]); // Shifted Display 6 (position 6, maximum)
  case 7:
    return Uint8Array.from([0, 0, 0]); // External carry placeholder (position 7)
  default:
    throw new Error('Invalid shifted display: ' + shiftedDisplay + '. Must be 0-7.');
  }
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
 * Compare Magnitudes - Column-by-column comparison using validated greaterThan()
 *
 * Compares absolute values of two wrungs from most significant to least significant column.
 * Uses validated greaterThan() operator for each column comparison.
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

    // Compare using validated greaterThan operator
    const aGreater = greaterThan(columnA, columnB);
    if (aGreater === 1) {
      // A has greater magnitude at this column
      return true;
    }

    const bGreater = greaterThan(columnB, columnA);
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
  // Phase 2: Conference both operands to determine Marquee states
  const conferredState = ConferBidirectionally(wrungA, wrungB);
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
  const hasMarqueeA = conferredState.wrungAMarquee.marqueeColumn !== undefined;
  const hasMarqueeB = conferredState.wrungBMarquee.marqueeColumn !== undefined;
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
    const wrungAFirst = conferredState.wrungAMarquee.firstValidColumn ?? 20;
    const wrungBFirst = conferredState.wrungBMarquee.firstValidColumn ?? 20;
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
      conferredState.wrungAMarquee.firstValidColumn ?? 20,
      conferredState.wrungBMarquee.firstValidColumn ?? 20
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
    throw new Error('SumWrung overflow: carry beyond column 0');
  }
  return result;
};

export const DifferenceWrung = (
  wrungA: Uint8Array<ArrayBuffer>,
  wrungB: Uint8Array<ArrayBuffer>
): Uint8Array<ArrayBuffer> => {
  console.log(
    `DIFFERENCEWRUNG START: wrungA[61-63]=[${wrungA[61]},${wrungA[62]},${wrungA[63]}] ` +
      `wrungB[61-63]=[${wrungB[61]},${wrungB[62]},${wrungB[63]}]`
  );
  // Phase 1: Conference both operands to determine Marquee states
  const conferredState = ConferBidirectionally(wrungA, wrungB);
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
    conferredState.wrungAMarquee.firstValidColumn ?? 20,
    conferredState.wrungBMarquee.firstValidColumn ?? 20
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
    const sumResult = SumWrung(routing.minuend, routing.subtrahend);
    // Apply routing result sign
    sumResult[0] = routing.resultSign;
    console.log(`SUM DELEGATION COMPLETE: resultSign=${routing.resultSign} applied`);
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
  const hasMarqueeA = conferredState.wrungAMarquee.marqueeColumn !== undefined;
  const hasMarqueeB = conferredState.wrungBMarquee.marqueeColumn !== undefined;
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
    const wrungAFirst = conferredState.wrungAMarquee.firstValidColumn ?? 20;
    const wrungBFirst = conferredState.wrungBMarquee.firstValidColumn ?? 20;
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
      conferredState.wrungAMarquee.firstValidColumn ?? 20,
      conferredState.wrungBMarquee.firstValidColumn ?? 20
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

  // Phase 9.5: PRE-NORMALIZATION - Check for computed zero at column 0
  // Round8 Principle: No Zero in natural counting (1→2→3→4→5→6→7→8→1...)
  // Computed zeros (6-6=0, 7-7=0) must show marquee [0,0,1], not external carry [0,0,0]
  const col0Binary = [result[1], result[2], result[3]];
  const col1Binary = [result[4], result[5], result[6]];

  // If column 0 shows [0,0,0] (external carry encoding)
  const isExternalCarry = col0Binary[0] === 0 && col0Binary[1] === 0 && col0Binary[2] === 0;

  if (isExternalCarry) {
    // Check if column 1 is empty (no actual carry present)
    const hasCarryToColumn1 = col1Binary[0] !== 0 || col1Binary[1] !== 0 || col1Binary[2] !== 0;

    // If NO actual carry, normalize to marquee [0,0,1] BEFORE conferencing
    // This prevents BidirectionalConference from detecting as "absolute zero"
    if (!hasCarryToColumn1) {
      console.log('PRE-NORMALIZATION: Column 0 [0,0,0] → [0,0,1] (computed zero → marquee display)');
      result[3] = 1; // Set bit0 to 1
    }
  }

  // Phase 9.6: RESULT CONFERENCE - Continuous Bidirectional Method
  // Re-conference the result buffer to discover actual marquee position after all operations
  const resultMarquee = BidirectionalConference(result);
  console.log(
    `RESULT CONFERENCE: marqueeColumn=${resultMarquee.marqueeColumn}, ` +
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
