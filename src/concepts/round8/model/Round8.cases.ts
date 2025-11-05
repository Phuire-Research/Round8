/* eslint-disable complexity */

import { SumSeries } from './Round8.sum.cases';
import { ShiftedSumSeries } from './Round8.shifted.sum.cases';
import { DifferenceSeries } from './Round8.difference.cases';
import { SomeNumberPlusNegativeOneSeries } from './Round8.negative.one.sum.cases';
import { NegativeOnePlusSomeNumberSeries } from './Round8.negative.one.unique.sum.cases';
import { SomeNumberMinusNegativeOneSeries, NegativeOneMinusSomeNumberSeries } from './Round8.negative.one.difference.cases';
import { ShiftedSomeNumberPlusNegativeOneSeries, ShiftedNegativeOnePlusSomeNumberSeries } from './Round8.negative.one.shifted.sum.cases';
import { ShiftedSomeNumberMinusNegativeOneSeries, ShiftedNegativeOneMinusSomeNumberSeries } from './Round8.negative.one.shifted.difference.cases';
import { GreaterThanSeries } from './Round8.greater.than.cases';
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

type SpooledWrung = ((((((Uint8Array<ArrayBuffer>[])[])[])[])[])[])[];

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

// Negative One Special Case Spools
const SpooledSomeNumberPlusNegativeOneSeries: SpooledWrung = initializeSpooledWrung();
const SpooledNegativeOnePlusSomeNumberSeries: SpooledWrung = initializeSpooledWrung();
const SpooledSomeNumberMinusNegativeOneSeries: SpooledWrung = initializeSpooledWrung();
const SpooledNegativeOneMinusSomeNumberSeries: SpooledWrung = initializeSpooledWrung();
const SpooledShiftedSomeNumberPlusNegativeOneSeries: SpooledWrung = initializeSpooledWrung();
const SpooledShiftedNegativeOnePlusSomeNumberSeries: SpooledWrung = initializeSpooledWrung();
const SpooledShiftedSomeNumberMinusNegativeOneSeries: SpooledWrung = initializeSpooledWrung();
const SpooledShiftedNegativeOneMinusSomeNumberSeries: SpooledWrung = initializeSpooledWrung();

// Logical Comparison Spool (returns boolean 0 or 1)
const SpooledGreaterThanSeries: SpooledWrung = initializeSpooledWrung();

const spool = (someSeries: SomeSeries, spooled: SpooledWrung) => {
  let count = 0;
  Object.keys(someSeries).forEach((sum) => {
    count++;
    console.log(`Spooling case ${count}: ${sum}`);

    const caseArray = someSeries[sum];
    // caseArray structure: [bit2_X, bit1_X, bit0_X, bit2_Y, bit1_Y, [bit0_Y, result, carry?]]

    const one = caseArray[0] as number;    // bit2_X
    const two = caseArray[1] as number;    // bit1_X
    const three = caseArray[2] as number;  // bit0_X
    const four = caseArray[3] as number;   // bit2_Y
    const five = caseArray[4] as number;   // bit1_Y

    const tuple = caseArray[5] as (number | Uint8Array<ArrayBuffer>)[];
    const six = tuple[0] as number;        // bit0_Y
    const sixValue = tuple.slice(1) as unknown as (Uint8Array<ArrayBuffer>)[];  // [result, carry?]

    console.log(`  Storing at [${one}][${two}][${three}][${four}][${five}][${six}]:`, sixValue);
    spooled[one][two][three][four][five][six] = sixValue;

    // Debug: Verify storage
    if (one === 0 && two === 0 && three === 0 && four === 0 && five === 0 && six === 0) {
      console.log(`  VERIFY: Retrieved immediately:`, spooled[0][0][0][0][0][0]);
    }
  });
};

spool(SumSeries, SpooledSumSeries);
spool(ShiftedSumSeries, ShiftedSpooledSumSeries);
spool(DifferenceSeries, SpooledDifferenceSeries);

// Spool Negative One Special Cases
spool(SomeNumberPlusNegativeOneSeries, SpooledSomeNumberPlusNegativeOneSeries);
spool(NegativeOnePlusSomeNumberSeries, SpooledNegativeOnePlusSomeNumberSeries);
spool(SomeNumberMinusNegativeOneSeries, SpooledSomeNumberMinusNegativeOneSeries);
spool(NegativeOneMinusSomeNumberSeries, SpooledNegativeOneMinusSomeNumberSeries);
spool(ShiftedSomeNumberPlusNegativeOneSeries, SpooledShiftedSomeNumberPlusNegativeOneSeries);
spool(ShiftedNegativeOnePlusSomeNumberSeries, SpooledShiftedNegativeOnePlusSomeNumberSeries);
spool(ShiftedSomeNumberMinusNegativeOneSeries, SpooledShiftedSomeNumberMinusNegativeOneSeries);
spool(ShiftedNegativeOneMinusSomeNumberSeries, SpooledShiftedNegativeOneMinusSomeNumberSeries);

// Spool Logical Comparison
spool(GreaterThanSeries, SpooledGreaterThanSeries);

export {
  SpooledSumSeries,
  ShiftedSpooledSumSeries,
  SpooledDifferenceSeries,
  // Negative One Special Case Spools
  SpooledSomeNumberPlusNegativeOneSeries,
  SpooledNegativeOnePlusSomeNumberSeries,
  SpooledSomeNumberMinusNegativeOneSeries,
  SpooledNegativeOneMinusSomeNumberSeries,
  SpooledShiftedSomeNumberPlusNegativeOneSeries,
  SpooledShiftedNegativeOnePlusSomeNumberSeries,
  SpooledShiftedSomeNumberMinusNegativeOneSeries,
  SpooledShiftedNegativeOneMinusSomeNumberSeries,
  // Logical Comparison Spool
  SpooledGreaterThanSeries,
};

export const DIFFERENCE_MAP = {
  ZERO_CASE: Uint8Array.from([
    0, 0, 0,
  ]),
  POSITIVE_1_CASE: Uint8Array.from([
    0, 0, 0,
  ]),
  // First Position 0
  NEGATIVE_1_CASE: Uint8Array.from([
    1, 1, 1,
  ]),
};

export const STRING_TO_ROUND8_ROTATION: Record<string, Uint8Array> = {
  '1': Uint8Array.from([0, 0, 0]),  // Binary 000 → Display "1"
  '2': Uint8Array.from([0, 0, 1]),  // Binary 001 → Display "2"
  '3': Uint8Array.from([0, 1, 0]),  // Binary 010 → Display "3"
  '4': Uint8Array.from([0, 1, 1]),  // Binary 011 → Display "4"
  '5': Uint8Array.from([1, 0, 0]),  // Binary 100 → Display "5"
  '6': Uint8Array.from([1, 0, 1]),  // Binary 101 → Display "6"
  '7': Uint8Array.from([1, 1, 0]),  // Binary 110 → Display "7"
  '8': Uint8Array.from([1, 1, 1]),  // Binary 111 → Display "8"
};

export const createShiftedColumnValue = (shiftedDisplay: number): Uint8Array => {
  switch (shiftedDisplay) {
  case 0: return Uint8Array.from([0, 0, 1]);  // Marquee (position 0)
  case 1: return Uint8Array.from([0, 1, 0]);  // Shifted Display 1 (position 1)
  case 2: return Uint8Array.from([0, 1, 1]);  // Shifted Display 2 (position 2)
  case 3: return Uint8Array.from([1, 0, 0]);  // Shifted Display 3 (position 3)
  case 4: return Uint8Array.from([1, 0, 1]);  // Shifted Display 4 (position 4)
  case 5: return Uint8Array.from([1, 1, 0]);  // Shifted Display 5 (position 5)
  case 6: return Uint8Array.from([1, 1, 1]);  // Shifted Display 6 (position 6, maximum)
  case 7: return Uint8Array.from([0, 0, 0]);  // External carry placeholder (position 7)
  default: throw new Error('Invalid shifted display: ' + shiftedDisplay + '. Must be 0-7.');
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
  const result = SpooledGreaterThanSeries
    [columnX[0]]  // bit2_X
    [columnX[1]]  // bit1_X
    [columnX[2]]  // bit0_X
    [columnY[0]]  // bit2_Y
    [columnY[1]]  // bit1_Y
    [columnY[2]]; // bit0_Y

  // Result is [bit0_result, result_copy] - return first element
  return (result[0] as unknown) as number;
};

/**
 * Less Than (X < Y) - Inverted Greater Than
 * @param columnX - 3-bit column value
 * @param columnY - 3-bit column value
 * @returns 1 if X < Y, 0 otherwise
 */
export const lessThan = (columnX: Uint8Array, columnY: Uint8Array): number => {
  return greaterThan(columnX, columnY) === 1 ? 0 : 1;
};

/**
 * Equals (X == Y) - Direct bit comparison
 * @param columnX - 3-bit column value
 * @param columnY - 3-bit column value
 * @returns 1 if X == Y, 0 otherwise
 */
export const equals = (columnX: Uint8Array, columnY: Uint8Array): number => {
  return (columnX[0] === columnY[0] &&
          columnX[1] === columnY[1] &&
          columnX[2] === columnY[2]) ? 1 : 0;
};

/**
 * Greater Than or Equal (X >= Y) - Equals OR Greater Than
 * @param columnX - 3-bit column value
 * @param columnY - 3-bit column value
 * @returns 1 if X >= Y, 0 otherwise
 */
export const greaterThanOrEqual = (columnX: Uint8Array, columnY: Uint8Array): number => {
  return (equals(columnX, columnY) === 1 || greaterThan(columnX, columnY) === 1) ? 1 : 0;
};

/**
 * Less Than or Equal (X <= Y) - Equals OR Less Than
 * @param columnX - 3-bit column value
 * @param columnY - 3-bit column value
 * @returns 1 if X <= Y, 0 otherwise
 */
export const lessThanOrEqual = (columnX: Uint8Array, columnY: Uint8Array): number => {
  return (equals(columnX, columnY) === 1 || lessThan(columnX, columnY) === 1) ? 1 : 0;
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
  console.log(`SUMWRUNG START: wrungA[61-63]=[${wrungA[61]},${wrungA[62]},${wrungA[63]}] wrungB[61-63]=[${wrungB[61]},${wrungB[62]},${wrungB[63]}]`);

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
    console.log(`SPECIAL CASE: No marquee, Sign=1, processing column 20`);

    // Process column 20 (index 20, positions 61-63)
    const pos20 = 1 + (20 * 3);

    // Add wrungA[20] + wrungB[20]
    const finalTuple = SpooledSumSeries
      [wrungA[pos20]][wrungA[pos20 + 1]][wrungA[pos20 + 2]]
      [wrungB[pos20]][wrungB[pos20 + 1]]
      [wrungB[pos20 + 2]] as (Uint8Array<ArrayBuffer> | number)[];

    const finalResult = finalTuple[0] as Uint8Array;

    result[pos20] = finalResult[0];
    result[pos20 + 1] = finalResult[1];
    result[pos20 + 2] = finalResult[2];

    // If carry generated, SET marquee at column 19 (no addition)
    if (finalTuple.length === 2) {
      console.log(`SPECIAL CASE: Carry generated, SETTING marquee`);

      // SET column 19 to 001 (marquee marker) - this is a SET, not an ADD
      const pos19 = 1 + (19 * 3);
      result[pos19] = 0;
      result[pos19 + 1] = 0;
      result[pos19 + 2] = 1;

      console.log(`SPECIAL CASE: Marquee SET at column 19, result at column 20`);
    }

    return result;
  }

  // Phase 3: Branch based on exactEven
  if (conferredState.exactEven) {
    // EXACT EVEN PATH: Both marquees aligned, clean summation
    console.log(`EXACT EVEN: Both marquees at ${conferredState.sharedValidColumn}`);

    for (let column = 20; column >= conferredState.sharedValidColumn; column--) {
      const pos = 1 + (column * 3);

      // FIRST WRUNG: Deplete accumulated carries into wrungA
      let intermediate = new Uint8Array([wrungA[pos], wrungA[pos + 1], wrungA[pos + 2]]);

      while (carries.length > 0) {
        const carry = carries.pop()!;

        const activeSpool = column === 0 ? ShiftedSpooledSumSeries : SpooledSumSeries;
        const carryTuple = activeSpool
          [intermediate[0]][intermediate[1]][intermediate[2]]
          [carry[0]][carry[1]]
          [carry[2]] as (Uint8Array | number)[];

        if (carryTuple.length === 1) {
          intermediate = carryTuple[0] as Uint8Array<ArrayBuffer>;
        } else {
          intermediate = carryTuple[0] as Uint8Array<ArrayBuffer>;
          const newCarry = carryTuple[1] as Uint8Array<ArrayBuffer>;
          carries.push(newCarry);
        }
      }

      // SECOND WRUNG: Add wrungB to intermediate
      console.log(`Column ${column}: intermediate=[${intermediate[0]},${intermediate[1]},${intermediate[2]}] wrungB=[${wrungB[pos]},${wrungB[pos+1]},${wrungB[pos+2]}]`);

      const activeSpool2 = column === 0 ? ShiftedSpooledSumSeries : SpooledSumSeries;
      const finalTuple = activeSpool2
        [intermediate[0]][intermediate[1]][intermediate[2]]
        [wrungB[pos]][wrungB[pos + 1]]
        [wrungB[pos + 2]] as (Uint8Array<ArrayBuffer> | number)[];

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
      const pos = 1 + (column * 3);

      // Deplete carries into wrungA
      let intermediate = new Uint8Array([wrungA[pos], wrungA[pos + 1], wrungA[pos + 2]]);

      while (carries.length > 0) {
        const carry = carries.pop()!;

        const activeSpool = column === 0 ? ShiftedSpooledSumSeries : SpooledSumSeries;
        const carryTuple = activeSpool
          [intermediate[0]][intermediate[1]][intermediate[2]]
          [carry[0]][carry[1]]
          [carry[2]] as (Uint8Array | number)[];

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
      const finalTuple = activeSpool2
        [intermediate[0]][intermediate[1]][intermediate[2]]
        [wrungB[pos]][wrungB[pos + 1]]
        [wrungB[pos + 2]] as (Uint8Array<ArrayBuffer> | number)[];

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
        const pos = 1 + (column * 3);

        // Deplete carries into the exclusive operand
        let intermediate = new Uint8Array([exclusiveOperand[pos], exclusiveOperand[pos + 1], exclusiveOperand[pos + 2]]);

        while (carries.length > 0) {
          const carry = carries.pop()!;

          const activeSpool = column === 0 ? ShiftedSpooledSumSeries : SpooledSumSeries;
          const carryTuple = activeSpool
            [intermediate[0]][intermediate[1]][intermediate[2]]
            [carry[0]][carry[1]]
            [carry[2]] as (Uint8Array | number)[];

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
      const pos = 1 + (column * 3);

      // Start with placeholder 000
      let intermediate = new Uint8Array([0, 0, 0]);

      while (carries.length > 0) {
        const carry = carries.pop()!;

        const carryTuple = SpooledSumSeries
          [intermediate[0]][intermediate[1]][intermediate[2]]
          [carry[0]][carry[1]]
          [carry[2]] as (Uint8Array | number)[];

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