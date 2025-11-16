/* eslint-disable max-len */
/* eslint-disable complexity */

import { SumSeries } from './series/sum.cases';
import { ShiftedSumSeries } from './series/shiftedSum.cases';
import { DifferenceSeries } from './series/difference.cases';
import { GreaterThanSeries } from './series/greaterThan.cases';
import { LessThanSeries } from './series/lessThan.cases';
import { ShiftedGreaterThanSeries } from './series/shiftedGreaterThan.cases';
import { BitRotationTuple, extractBitTuple, getSignBit, Positions, scanDownward, scanDownwards, SomeSeries, SpooledWrung } from './terminology';
import { ShiftedDifferenceSeries } from './series/shiftedDifference.cases';
import { BidirectionalConference, MarqueeState } from './bidirectional';

// Initialize 6-dimensional array structure for SpooledSumSeries
export const initializeSpooledWrung = <T>(): SpooledWrung<T> => {
  const arr: SpooledWrung<T> = [];
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

// Logical Comparison Spools (return boolean 0 or 1)
const SpooledGreaterThanSeries: SpooledWrung<TrueFalse> = initializeSpooledWrung<TrueFalse>();
const SpooledLessThanSeries: SpooledWrung<TrueFalse> = initializeSpooledWrung<TrueFalse>();
const SpooledShiftedGreaterThanSeries: SpooledWrung<TrueFalse> = initializeSpooledWrung<TrueFalse>();

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
    const tuple = caseArray[5] as number[];
    const six = tuple[0] as number; // bit0_Y
    const sixValue = tuple.slice(1) as unknown as number[]; // [result, carry?]
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

// Spool Logical Comparisons
spool(GreaterThanSeries, SpooledGreaterThanSeries);
spool(LessThanSeries, SpooledLessThanSeries);
spool(ShiftedGreaterThanSeries, SpooledShiftedGreaterThanSeries);

export {
  SpooledSumSeries,
  ShiftedSpooledSumSeries,
  SpooledDifferenceSeries,
  SpooledShiftedDifferenceSeries,
  // Logical Comparison Spools
  SpooledGreaterThanSeries,
  SpooledLessThanSeries,
  SpooledShiftedGreaterThanSeries,
};

// ANOR Types and Functions are exported via their declarations:
// - TrueFalse (type)
// - OrientableRotationIndices (type)
// - OrientableWrungIndices (type)
// - AnorState (type)
// - AnorWrungState (type)
// - anor (function)
// - anorWrung (function)

/**
 * Logical Comparison Helper Functions - Column-Level Boolean Operations
 *
 * These functions perform logical comparisons on 3-bit column values using
 * SpooledGreaterThanSeries for Greater Than, and derive other operations.
 *
 * Return Values: 0 (False) or 1 (True)
 */

export type TrueFalse = 1 | 0;

/**
 * OrientableRotationIndices - Enhanced Array with Lazy Evaluation Method
 *
 * Maintains closure over source rotations for on-demand resolution.
 * Stores indices (cheap) + resolves to full BitRotationTuples only when .orientate() called.
 */
export type OrientableRotationIndices = number[] & {
  orientate(): BitRotationTuple[];
};

/**
 * OrientableWrungIndices - Enhanced Array with Lazy Evaluation Method
 *
 * Maintains closure over source wrungs for on-demand resolution.
 * Stores indices (cheap) + resolves to full bigints only when .orientate() called.
 */
export type OrientableWrungIndices = number[] & {
  orientate(): bigint[];
};

/**
 * AnorState - Rotation-Level Range Membership + Relational Analysis
 *
 * For each rotation in input array:
 * - anor: Is this rotation within bounds [A, B]?
 * - equal/greater/lesser: How does it relate to OTHER in-range rotations?
 *
 * Self-Referencing Higher-Order Bidirectional Data Structure
 */
export type AnorState = {
  rotation: BitRotationTuple;
  anor: boolean;
  equal: OrientableRotationIndices | null;
  greater: OrientableRotationIndices | null;
  lesser: OrientableRotationIndices | null;
};

/**
 * AnorWrungState - Wrung-Level Magnitude Range Membership + Relational Analysis
 *
 * Superset operating on full wrungs (bigint) instead of rotations.
 * Uses compareMagnitude for topology-aware comparison.
 *
 * Self-Referencing Higher-Order Bidirectional Data Structure
 */
export type AnorWrungState = {
  wrung: bigint;
  marqueeState: MarqueeState;
  anor: boolean;
  equal: OrientableWrungIndices | null;
  greater: OrientableWrungIndices | null;
  lesser: OrientableWrungIndices | null;
};

/**
 * Greater Than (X > Y) - Direct spool lookup
 * @param rotationA - 3-bit column value [bit2, bit1, bit0]
 * @param rotationB - 3-bit column value [bit2, bit1, bit0]
 * @returns 1 if X > Y, 0 otherwise
 */
export const greaterThan = (rotationA: BitRotationTuple, rotationB: BitRotationTuple): TrueFalse => {
  // bit2_X // bit1_X // bit0_X // bit2_Y // bit1_Y // bit0_Y
  const result =
    SpooledGreaterThanSeries[rotationA[0]][rotationA[1]][rotationA[2]][rotationB[0]][rotationB[1]][rotationB[2]];
  // Result is [bit0_result, result_copy] - return first element
  return result[0];
};

/**
 * Less Than (X < Y) - Direct Spool Lookup
 * @param rotationA - 3-bit column value
 * @param rotationB - 3-bit column value
 * @returns 1 if X < Y, 0 otherwise
 */
export const lessThan = (rotationA: BitRotationTuple, rotationB: BitRotationTuple): TrueFalse => {
  // bit2_X // bit1_X // bit0_X // bit2_Y // bit1_Y // bit0_Y
  const result =
    SpooledLessThanSeries[rotationA[0]][rotationA[1]][rotationA[2]][rotationB[0]][rotationB[1]][rotationB[2]];
  // Result is [bit0_result, result_copy] - return first element
  return result[0];
};

/**
 * Equals (X == Y) - Direct bit comparison
 * @param rotationA - 3-bit column value
 * @param rotationB - 3-bit column value
 * @returns 1 if X == Y, 0 otherwise
 */
export const equals = (rotationA: BitRotationTuple, rotationB: BitRotationTuple): TrueFalse => {
  return rotationA[0] === rotationB[0] && rotationA[1] === rotationB[1] && rotationA[2] === rotationB[2] ? 1 : 0;
};

/**
 * Greater Than or Equal (X >= Y) - Equals OR Greater Than
 * @param rotationA - 3-bit column value
 * @param rotationB - 3-bit column value
 * @returns 1 if X >= Y, 0 otherwise
 */
export const greaterThanOrEqual = (rotationA: BitRotationTuple, rotationB: BitRotationTuple): TrueFalse => {
  return equals(rotationA, rotationB) === 1 || greaterThan(rotationA, rotationB) === 1 ? 1 : 0;
};

/**
 * Less Than or Equal (X <= Y) - Equals OR Less Than
 * @param rotationA - 3-bit column value
 * @param rotationB - 3-bit column value
 * @returns 1 if X <= Y, 0 otherwise
 */
export const lessThanOrEqual = (rotationA: BitRotationTuple, rotationB: BitRotationTuple): TrueFalse => {
  return equals(rotationA, rotationB) === 1 || lessThan(rotationA, rotationB) === 1 ? 1 : 0;
};

/**
 * Not Equals (X != Y) - Inverted Equals
 * @param rotationA - 3-bit column value
 * @param rotationB - 3-bit column value
 * @returns 1 if X != Y, 0 otherwise
 */
export const notEquals = (rotationA: BitRotationTuple, rotationB: BitRotationTuple): TrueFalse => {
  return equals(rotationA, rotationB) === 1 ? 0 : 1;
};

/**
 * Shifted Greater Than (X > Y) - Column 0 Shifted Topology Comparison
 *
 * Uses shifted topology ordering where Display 7 [0,0,0] is MAXIMUM (Full Twist)
 * and Display 0 [0,0,1] is MINIMUM (Marquee position).
 *
 * Shifted Ordering: 001 < 010 < 011 < 100 < 101 < 110 < 111 < 000
 *
 * @param rotationA - 3-bit column value in shifted topology
 * @param rotationB - 3-bit column value in shifted topology
 * @returns 1 if X > Y in shifted topology, 0 otherwise
 */
export const shiftedGreaterThan = (rotationA: BitRotationTuple, rotationB: BitRotationTuple): TrueFalse => {
  const result =
    SpooledShiftedGreaterThanSeries[rotationA[0]][rotationA[1]][rotationA[2]][rotationB[0]][rotationB[1]][rotationB[2]];
  return result[0];
};

/**
 * Shifted Less Than (X < Y) - Derived from shiftedGreaterThan
 *
 * X < Y is equivalent to Y > X in shifted topology.
 *
 * @param rotationA - 3-bit column value in shifted topology
 * @param rotationB - 3-bit column value in shifted topology
 * @returns 1 if X < Y in shifted topology, 0 otherwise
 */
export const shiftedLessThan = (rotationA: BitRotationTuple, rotationB: BitRotationTuple): TrueFalse => {
  return shiftedGreaterThan(rotationB, rotationA);
};

/**
 * Shifted Equals (X == Y) - Direct bit comparison
 *
 * Equality is topology-agnostic: same bits = equal regardless of topology.
 *
 * @param rotationA - 3-bit column value
 * @param rotationB - 3-bit column value
 * @returns 1 if X == Y, 0 otherwise
 */
export const shiftedEquals = (rotationA: BitRotationTuple, rotationB: BitRotationTuple): TrueFalse => {
  return rotationA[0] === rotationB[0] && rotationA[1] === rotationB[1] && rotationA[2] === rotationB[2] ? 1 : 0;
};

/**
 * Logical AND - Universal Boolean Operator
 * @param a - Boolean value (0 or 1)
 * @param b - Boolean value (0 or 1)
 * @returns 1 if both a AND b are 1, otherwise 0
 */
export const and = (a: TrueFalse, b: TrueFalse): TrueFalse => {
  return a === 1 && b === 1 ? 1 : 0;
};

/**
 * Logical OR - Universal Boolean Operator
 * @param a - Boolean value (0 or 1)
 * @param b - Boolean value (0 or 1)
 * @returns 1 if a OR b (or both) are 1, otherwise 0
 */
export const or = (a: TrueFalse, b: TrueFalse): TrueFalse => {
  return a === 1 || b === 1 ? 1 : 0;
};

/**
 * Logical XOR - Universal Boolean Operator
 * @param a - Boolean value (0 or 1)
 * @param b - Boolean value (0 or 1)
 * @returns 1 if exactly one of a or b is 1, otherwise 0
 */
export const xor = (a: TrueFalse, b: TrueFalse): TrueFalse => {
  return (a === 1 || b === 1) && a !== b ? 1 : 0;
};

/**
 * Logical NOT - Universal Boolean Operator
 * @param a - Boolean value (0 or 1)
 * @returns 1 if a is 0, otherwise 0
 */
export const inversion = (a: TrueFalse): TrueFalse => {
  return a === 1 ? 0 : 1;
};

/**
 * Create OrientableRotationIndices - Factory for Lazy Evaluation Pattern
 *
 * Creates an enhanced number array that maintains closure over source rotations.
 * The .orientate() method resolves indices to BitRotationTuples on-demand.
 *
 * @param indices - Array of indices into source rotations
 * @param sourceRotations - Original rotation array (captured in closure)
 * @returns OrientableRotationIndices with .orientate() method
 */
const createOrientableRotation = (
  indices: number[],
  sourceRotations: BitRotationTuple[]
): OrientableRotationIndices => {
  const orientable = indices as OrientableRotationIndices;

  orientable.orientate = function (): BitRotationTuple[] {
    return this.map((idx) => sourceRotations[idx]);
  };

  return orientable;
};

/**
 * Create OrientableWrungIndices - Factory for Lazy Evaluation Pattern
 *
 * Creates an enhanced number array that maintains closure over source wrungs.
 * The .orientate() method resolves indices to bigints on-demand.
 *
 * @param indices - Array of indices into source wrungs
 * @param sourceWrungs - Original wrung array (captured in closure)
 * @returns OrientableWrungIndices with .orientate() method
 */
const createOrientableWrung = (indices: number[], sourceWrungs: bigint[]): OrientableWrungIndices => {
  const orientable = indices as OrientableWrungIndices;

  orientable.orientate = function (): bigint[] {
    return this.map((idx) => sourceWrungs[idx]);
  };

  return orientable;
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
 * @returns true as 1 if |wrungA| > |wrungB|, false as 0 if |wrungB| > |wrungA| and null if wrungA and wrungB are equal
 */
export const compareMagnitude = (
  wrungA: bigint,
  wrungB: bigint,
  marqueeAPosition: number,
  marqueeBPosition: number
): TrueFalse | null => {
  // Extract 3-bit column values
  const signA = getSignBit(wrungA);
  const signB = getSignBit(wrungB);
  let greater: TrueFalse | null = null;
  if (signA !== signB) {return signA === 1 && signB === 0 ? 1 : 0;}

  // Start from the higher marquee position (most significant column)
  // marqueePosition indicates the column index (1-21), we scan FROM that column downward
  const startPosition = marqueeAPosition > marqueeBPosition ?
    marqueeAPosition
    :
    marqueeBPosition;

  // If startPosition is beyond valid range (e.g., 21 when no valid rotations), both are zero
  if (startPosition > 21 || startPosition < 1) {
    return null;
  }

  scanDownwards(wrungA, wrungB, (rotationsA, rotationsB, pos) => {
    const tupleA = extractBitTuple(rotationsA, pos);
    const tupleB = extractBitTuple(rotationsB, pos);
    const areEqual = equals(tupleA, tupleB);
    if (areEqual) {return true;}
    // CRITICAL: Column 0 uses shifted topology, columns 1-20 use regular topology
    const greaterThanSpool = (pos === 21) ? shiftedGreaterThan : greaterThan;

    // Return TrueFalse (0 | 1), not boolean
    greater = greaterThanSpool(tupleA, tupleB) ? 1 : 0;
    if (greater === 1) {
      // A is greater, stop scanning
      return false;
    }
    // A is less than B, stop scanning
    return false;
  }, startPosition as Positions);
  return greater;
};

/**
 * Anor - Rotation-Level Range Membership and Relational Analysis
 *
 * Self-Referencing Higher-Order Bidirectional Data Structure with Lazy Evaluation.
 *
 * For each rotation in the input array:
 * 1. Tests if rotation is within [A, B] inclusive range
 * 2. If in range, analyzes relationships to ALL OTHER in-range rotations
 * 3. Returns indices with .orientate() method for on-demand resolution
 *
 * Returns null if NO rotations are within the specified range.
 *
 * @param rotationA - First boundary of range (3-bit column value)
 * @param rotationB - Second boundary of range (3-bit column value)
 * @param rotations - Array of rotations to test
 * @returns AnorState[] if any rotations in range, null otherwise
 */
export const anor = (
  rotationA: BitRotationTuple,
  rotationB: BitRotationTuple,
  rotations: BitRotationTuple[]
): AnorState[] | null => {
  if (rotations.length === 0) {
    return null;
  }

  const [lower, upper] =
    greaterThan(rotationA, rotationB) === 1 ? [rotationB, rotationA] : [rotationA, rotationB];

  const inRangeIndices: number[] = [];
  rotations.forEach((rot, idx) => {
    const isGreaterOrEqualLower = greaterThanOrEqual(rot, lower) === 1;
    const isLessOrEqualUpper = lessThanOrEqual(rot, upper) === 1;

    if (isGreaterOrEqualLower && isLessOrEqualUpper) {
      inRangeIndices.push(idx);
    }
  });

  if (inRangeIndices.length === 0) {
    return null;
  }

  const states: AnorState[] = [];

  rotations.forEach((rot, idx) => {
    const isInRange = inRangeIndices.includes(idx);

    if (!isInRange) {
      states.push({
        rotation: rot,
        anor: false,
        equal: null,
        greater: null,
        lesser: null,
      });
    } else {
      const equalIndices: number[] = [];
      const greaterIndices: number[] = [];
      const lesserIndices: number[] = [];

      inRangeIndices.forEach((otherIdx) => {
        if (idx === otherIdx) {
          return;
        }

        const otherRot = rotations[otherIdx];
        const isEqual = equals(rot, otherRot) === 1;

        if (isEqual) {
          equalIndices.push(otherIdx);
        } else {
          const isGreater = greaterThan(otherRot, rot) === 1;
          if (isGreater) {
            greaterIndices.push(otherIdx);
          } else {
            lesserIndices.push(otherIdx);
          }
        }
      });

      states.push({
        rotation: rot,
        anor: true,
        equal: createOrientableRotation(equalIndices, rotations),
        greater: createOrientableRotation(greaterIndices, rotations),
        lesser: createOrientableRotation(lesserIndices, rotations),
      });
    }
  });

  return states;
};

/**
 * AnorWrung - Wrung-Level Magnitude Range Membership and Relational Analysis
 *
 * Self-Referencing Higher-Order Bidirectional Data Structure with Lazy Evaluation.
 * Superset of Anor operating on full wrungs (bigint) instead of rotations.
 *
 * For each wrung in the input array:
 * 1. Discovers marquee position via BidirectionalConference (or uses pre-computed)
 * 2. Tests if wrung magnitude is within [A, B] inclusive range
 * 3. If in range, analyzes magnitude relationships to ALL OTHER in-range wrungs
 * 4. Returns indices with .orientate() method for on-demand resolution
 * 5. Preserves MarqueeState in output to avoid information loss
 *
 * Uses compareMagnitude for topology-aware comparison (shifted column 0, regular columns 1-20).
 * Returns null if NO wrungs are within the specified magnitude range.
 *
 * Optional MarqueeState parameters allow developers to avoid redundant BidirectionalConference calls
 * when they have already computed the states. The MarqueeState is preserved in the output.
 *
 * @param wrungA - First boundary of magnitude range (bigint)
 * @param wrungB - Second boundary of magnitude range (bigint)
 * @param wrungs - Array of wrungs to test
 * @param marqueeStateA - Optional pre-computed MarqueeState for wrungA
 * @param marqueeStateB - Optional pre-computed MarqueeState for wrungB
 * @param wrungMarqueeStates - Optional pre-computed MarqueeStates for wrungs array (parallel)
 * @returns AnorWrungState[] if any wrungs in range, null otherwise
 */
export const anorWrung = (
  wrungA: bigint,
  wrungB: bigint,
  wrungs: bigint[],
  marqueeStateA?: MarqueeState,
  marqueeStateB?: MarqueeState,
  wrungMarqueeStates?: MarqueeState[]
): AnorWrungState[] | null => {
  if (wrungs.length === 0) {
    return null;
  }

  // Self-referencing marquee discovery via BidirectionalConference (or use pre-computed)
  const resolvedMarqueeStateA = marqueeStateA ?? BidirectionalConference(wrungA);
  const resolvedMarqueeStateB = marqueeStateB ?? BidirectionalConference(wrungB);

  // Extract marquee positions (firstValidRotation indicates column position)
  const marqueeA = resolvedMarqueeStateA.firstValidRotation ?? 21;
  const marqueeB = resolvedMarqueeStateB.firstValidRotation ?? 21;

  // Discover marquee states for all wrungs (or use pre-computed)
  const resolvedWrungMarqueeStates: MarqueeState[] = wrungMarqueeStates
    ? wrungMarqueeStates
    : wrungs.map((wrung) => BidirectionalConference(wrung));

  const marqueePositions: number[] = resolvedWrungMarqueeStates.map(
    (state) => state.firstValidRotation ?? 21
  );

  const aGreaterThanB = compareMagnitude(wrungA, wrungB, marqueeA, marqueeB);
  const [lower, upper, lowerMarquee, upperMarquee] =
    aGreaterThanB === 1 ? [wrungB, wrungA, marqueeB, marqueeA] : [wrungA, wrungB, marqueeA, marqueeB];

  const inRangeIndices: number[] = [];
  wrungs.forEach((wrung, idx) => {
    const wrungMarquee = marqueePositions[idx];

    const lowerComparison = compareMagnitude(wrung, lower, wrungMarquee, lowerMarquee);
    const upperComparison = compareMagnitude(wrung, upper, wrungMarquee, upperMarquee);

    const isGreaterOrEqualLower = lowerComparison === 1 || lowerComparison === null;
    const isLessOrEqualUpper = upperComparison === 0 || upperComparison === null;

    if (isGreaterOrEqualLower && isLessOrEqualUpper) {
      inRangeIndices.push(idx);
    }
  });

  if (inRangeIndices.length === 0) {
    return null;
  }

  const states: AnorWrungState[] = [];

  wrungs.forEach((wrung, idx) => {
    const isInRange = inRangeIndices.includes(idx);
    const wrungMarqueeState = resolvedWrungMarqueeStates[idx];

    if (!isInRange) {
      states.push({
        wrung: wrung,
        marqueeState: wrungMarqueeState,
        anor: false,
        equal: null,
        greater: null,
        lesser: null,
      });
    } else {
      const equalIndices: number[] = [];
      const greaterIndices: number[] = [];
      const lesserIndices: number[] = [];
      const wrungMarquee = marqueePositions[idx];

      inRangeIndices.forEach((otherIdx) => {
        if (idx === otherIdx) {
          return;
        }

        const otherWrung = wrungs[otherIdx];
        const otherMarquee = marqueePositions[otherIdx];
        const comparison = compareMagnitude(otherWrung, wrung, otherMarquee, wrungMarquee);

        if (comparison === null) {
          equalIndices.push(otherIdx);
        } else if (comparison === 1) {
          greaterIndices.push(otherIdx);
        } else {
          lesserIndices.push(otherIdx);
        }
      });

      states.push({
        wrung: wrung,
        marqueeState: wrungMarqueeState,
        anor: true,
        equal: createOrientableWrung(equalIndices, wrungs),
        greater: createOrientableWrung(greaterIndices, wrungs),
        lesser: createOrientableWrung(lesserIndices, wrungs),
      });
    }
  });

  return states;
};

/**
 * Operation Routing Result - Structured data for sign routing
 */
type OperationRouting = {
  effectiveOp: 'sum' | 'difference';
  minuend: bigint;
  subtrahend: bigint;
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
  wrungA: bigint,
  wrungB: bigint,
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