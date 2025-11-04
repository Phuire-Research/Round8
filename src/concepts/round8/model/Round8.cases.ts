
import { SumSeries } from './Round8.sum.cases';
import { DifferenceSeries } from './Round8.difference.cases';

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
const SpooledDifferenceSeries: SpooledWrung = initializeSpooledWrung();

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
spool(DifferenceSeries, SpooledDifferenceSeries);

export { SpooledSumSeries };

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

  // TODO: Special case logic for zero origin (all positions 000 = absolute zero, not display "1")
  // For now, we're only implementing the Ideal Case where 000 = display "1"

  // Create output buffer
  const result = new Uint8Array(64);

  // Copy sign from wrungA (position 0) - for now, assume same sign
  result[0] = wrungA[0];

  // Carry accumulator - array of Uint8Array[3] carries
  const carries: Uint8Array<ArrayBuffer>[] = [];

  // Process 21 columns from right to left (column 20 down to column 0)
  for (let column = 20; column >= 0; column--) {
    // Calculate starting position for this column
    const pos = 1 + (column * 3);

    // FIRST WRUNG: Deplete accumulated carries
    let intermediate = new Uint8Array([wrungA[pos], wrungA[pos + 1], wrungA[pos + 2]]);

    while (carries.length > 0) {
      const carry = carries.pop()!;

      // Lookup: intermediate + carry
      const carryTuple = SpooledSumSeries
        [intermediate[0]][intermediate[1]][intermediate[2]]
        [carry[0]][carry[1]]
        [carry[2]] as (Uint8Array | number)[];

      if (carryTuple.length === 1) {
        // No new carry - tuple is [result]
        intermediate = carryTuple[0] as Uint8Array<ArrayBuffer>;
      } else {
        // Has new carry - tuple is [result, carry]
        intermediate = carryTuple[0] as Uint8Array<ArrayBuffer>;
        const newCarry = carryTuple[1] as Uint8Array<ArrayBuffer>;
        carries.push(newCarry);
      }
    }

    // SECOND WRUNG: Add wrungB column to intermediate
    console.log(`Column ${column}: intermediate=[${intermediate[0]},${intermediate[1]},${intermediate[2]}] wrungB=[${wrungB[pos]},${wrungB[pos+1]},${wrungB[pos+2]}]`);

    const finalTuple = SpooledSumSeries
      [intermediate[0]][intermediate[1]][intermediate[2]]
      [wrungB[pos]][wrungB[pos + 1]]
      [wrungB[pos + 2]] as (Uint8Array<ArrayBuffer> | number)[];

    console.log(`Column ${column}: finalTuple=`, finalTuple);

    // Extract result - now at index 0
    const finalResult = finalTuple[0] as Uint8Array;
    console.log(`Column ${column}: finalResult=[${finalResult[0]},${finalResult[1]},${finalResult[2]}]`);

    // Write result to output buffer at this column's positions
    result[pos] = finalResult[0];
    result[pos + 1] = finalResult[1];
    result[pos + 2] = finalResult[2];

    // If has carry, push to carries array for next column (leftward)
    if (finalTuple.length === 2) {
      const finalCarry = finalTuple[1] as Uint8Array<ArrayBuffer>;
      carries.push(finalCarry);
    }
  }

  // If carries remain after all columns, overflow occurred
  if (carries.length > 0) {
    throw new Error('SumWrung overflow: carry beyond column 0');
  }

  return result;
};