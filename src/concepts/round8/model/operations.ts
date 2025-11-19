/* eslint-disable complexity */
import { BidirectionalConference, WrungMuxity } from './bidirectional';
import { compareMagnitude, ShiftedSpooledSumSeries, SpooledDifferenceSeries, SpooledShiftedDifferenceSeries, SpooledSumSeries } from './cases';
import { createFormattedRound8BinaryString } from './conference';
import {
  applyMarqueeAtPosition,
  applyNumeralRotation,
  applyShiftedNumeralRotation,
  BitRotationTuple,
  createBuffer,
  createResultMuxity,
  extractBitTuple,
  getRegularBitRotation,
  getRegularRotation,
  getRound8Case,
  getShiftedBitRotation,
  getShiftedRotation,
  getSignBit,
  Positions,
  ResultMuxity,
  Round8Cases,
  scanUpwards,
  setSignBit,
  spooledNumerals,
  spooledRegularShiftedBridge,
  spooledShiftedNumerals,
  spooledShiftedStringNumerals,
  SpooledWrung
} from './terminology';

/**
 * Operation Routing Result - Structured data for sign routing
 * Proto-Muxium quality selection structure
 */
type OperationRouting = {
  effectiveOp: 'sum' | 'difference';
  anchorWrung: bigint;      // Base magnitude reference (larger in difference, first in sum)
  modulatorWrung: bigint;   // Value that modulates anchor (adds to or subtracts from)
  resultSign: 0 | 1;
  isEqualMagnitude?: boolean;  // For difference zero-result short-circuit
};
export type Operations = '+' | '-';
/**
 * Determine Effective Operation - Route to Sum or Difference based on operation+sign combination
 *
 * Analyzes operation type and operand signs to determine which spool to use (Sum or Difference)
 * and what the result sign should be. Handles all 8 operation+sign combinations:
 * - Addition: 4 cases (++, --, +-, -+)
 * - Subtraction: 4 cases (++, --, +-, -+)
 *
 * Uses compareMagnitude() for cases where result sign depends on magnitude comparison.
 * Updated to use WrungMuxity (Quality-First Muxification Pattern).
 *
 * @param operation - Operation type ('+' for addition, '-' for subtraction)
 * @param signA - Sign of wrungA (0 = negative, 1 = positive)
 * @param signB - Sign of wrungB (0 = negative, 1 = positive)
 * @param wrungA - First operand buffer (64 positions)
 * @param wrungB - Second operand buffer (64 positions)
 * @param wrungMuxityA - WrungMuxity (Quality Container) for wrungA
 * @param wrungMuxityB - WrungMuxity (Quality Container) for wrungB
 * @returns Routing object with effectiveOp, operand order, and result sign
 */
// eslint-disable-next-line complexity
export const determineEffectiveOperation = (
  operation: Operations,
  signA: 0 | 1,
  signB: 0 | 1,
  wrungA: bigint,
  wrungB: bigint,
  wrungMuxityA: WrungMuxity,
  wrungMuxityB: WrungMuxity
): OperationRouting => {
  // ADDITION OPERATIONS (operation === '+')
  if (operation === '+') {
    // Case 1: (+A) + (+B) → Sum, result positive
    if (signA === 1 && signB === 1) {
      return {
        effectiveOp: 'sum',
        anchorWrung: wrungA,
        modulatorWrung: wrungB,
        resultSign: 1,
      };
    }

    // Case 2: (-A) + (-B) → Sum, result negative
    if (signA === 0 && signB === 0) {
      return {
        effectiveOp: 'sum',
        anchorWrung: wrungA,
        modulatorWrung: wrungB,
        resultSign: 0,
      };
    }

    // Case 3: (+A) + (-B) → Difference (A - B), sign depends on magnitude
    if (signA === 1 && signB === 0) {
      const magnitudeComparison = compareMagnitude(wrungA, wrungB, wrungMuxityA, wrungMuxityB);
      // QUALITY-FIRST: Handle null (equal magnitude) explicitly
      if (magnitudeComparison === null) {
        return {
          effectiveOp: 'difference',
          anchorWrung: wrungA,
          modulatorWrung: wrungB,
          resultSign: 1,  // Positive zero
          isEqualMagnitude: true,
        };
      }
      return {
        effectiveOp: 'difference',
        anchorWrung: magnitudeComparison === 1 ? wrungA : wrungB,
        modulatorWrung: magnitudeComparison === 1 ? wrungB : wrungA,
        resultSign: magnitudeComparison === 1 ? 1 : 0,
        isEqualMagnitude: false,
      };
    }

    // Case 4: (-A) + (+B) → Difference (B - A), sign depends on magnitude
    if (signA === 0 && signB === 1) {
      const magnitudeComparison = compareMagnitude(wrungB, wrungA, wrungMuxityB, wrungMuxityA);
      if (magnitudeComparison === null) {
        return {
          effectiveOp: 'difference',
          anchorWrung: wrungB,
          modulatorWrung: wrungA,
          resultSign: 1,  // Positive zero
          isEqualMagnitude: true,
        };
      }
      return {
        effectiveOp: 'difference',
        anchorWrung: magnitudeComparison === 1 ? wrungB : wrungA,
        modulatorWrung: magnitudeComparison === 1 ? wrungA : wrungB,
        resultSign: magnitudeComparison === 1 ? 1 : 0,
        isEqualMagnitude: false,
      };
    }
  }

  // SUBTRACTION OPERATIONS (operation === '-')
  if (operation === '-') {
    // Case 5: (+A) - (+B) → Difference (A - B), sign depends on magnitude
    if (signA === 1 && signB === 1) {
      const magnitudeComparison = compareMagnitude(wrungA, wrungB, wrungMuxityA, wrungMuxityB);
      if (magnitudeComparison === null) {
        return {
          effectiveOp: 'difference',
          anchorWrung: wrungA,
          modulatorWrung: wrungB,
          resultSign: 1,  // Positive zero
          isEqualMagnitude: true,
        };
      }
      return {
        effectiveOp: 'difference',
        anchorWrung: magnitudeComparison === 1 ? wrungA : wrungB,
        modulatorWrung: magnitudeComparison === 1 ? wrungB : wrungA,
        resultSign: magnitudeComparison === 1 ? 1 : 0,
        isEqualMagnitude: false,
      };
    }

    // Case 6: (-A) - (-B) → Difference (B - A), sign FLIPPED
    if (signA === 0 && signB === 0) {
      const magnitudeComparison = compareMagnitude(wrungA, wrungB, wrungMuxityA, wrungMuxityB);
      if (magnitudeComparison === null) {
        return {
          effectiveOp: 'difference',
          anchorWrung: wrungA,
          modulatorWrung: wrungB,
          resultSign: 1,  // Positive zero (sign doesn't matter for zero)
          isEqualMagnitude: true,
        };
      }
      return {
        effectiveOp: 'difference',
        anchorWrung: magnitudeComparison === 1 ? wrungA : wrungB,
        modulatorWrung: magnitudeComparison === 1 ? wrungB : wrungA,
        resultSign: magnitudeComparison === 1 ? 0 : 1,
        isEqualMagnitude: false,
      };
    }

    // Case 7: (+A) - (-B) → Sum (A + B), result positive
    if (signA === 1 && signB === 0) {
      return {
        effectiveOp: 'sum',
        anchorWrung: wrungA,
        modulatorWrung: wrungB,
        resultSign: 1,
      };
    }

    // Case 8: (-A) - (+B) → Sum (A + B), result negative
    if (signA === 0 && signB === 1) {
      return {
        effectiveOp: 'sum',
        anchorWrung: wrungA,
        modulatorWrung: wrungB,
        resultSign: 0,
      };
    }
  }

  // Fallback - should never reach if all cases covered
  throw new Error(
    `determineEffectiveOperation: Unhandled combination - operation=${operation}, signA=${signA}, signB=${signB}`
  );
};

const getChosenSpool = (effective: OperationRouting): SpooledWrung => {
  return effective.effectiveOp === 'sum' ? SpooledSumSeries : SpooledDifferenceSeries;
};

/**
 * UNIFIED BUFFER ASSEMBLY - Analyzes ResultMuxity, handles final propagation
 * Converts forward-only computation record into final buffer
 * Handles all-8s + final borrow = AbsoluteZero pattern
 */
const assembleBufferFromResultMuxity = (
  muxity: ResultMuxity,
  routing: OperationRouting,
  isFinalTwistDetected: boolean,
  operation: 'sum' | 'difference'
): bigint => {
  // Handle FinalTwist overflow (sum only)
  console.log('ASSEMBLE', isFinalTwistDetected, muxity);
  if (isFinalTwistDetected) {
    return muxity.resultSign === 1
      ? getRound8Case(Round8Cases.POSITIVE_TWIST_CASE)
      : getRound8Case(Round8Cases.NEGATIVE_TWIST_CASE);
  }

  // Handle final carry (sum) - extends marquee
  if (muxity.pendingPropagation && operation === 'sum') {
    if (muxity.positions.length < 21) {
      muxity.positions.push(0);  // Numeral 1 (index 0)
    } else {
      // Overflow at position 21
      return muxity.resultSign === 1
        ? getRound8Case(Round8Cases.POSITIVE_TWIST_CASE)
        : getRound8Case(Round8Cases.NEGATIVE_TWIST_CASE);
    }
  }

  // Handle final borrow (difference) - trailing 8s pattern
  if (muxity.pendingPropagation && operation === 'difference') {
    // Check if ALL computed positions are 8s (index 7)
    if (muxity.consecutiveEightsFromStart === muxity.positions.length) {
      // All positions are 8s + final borrow = AbsoluteZero
      return createBuffer();
    }
    // Trailing 8s with final borrow - consume positions from end
    let trailingEightsCount = 0;
    for (let i = muxity.positions.length - 1; i >= 0; i--) {
      if (muxity.positions[i] === 7) {
        trailingEightsCount++;
      } else {
        break;
      }
    }
    // Consume trailing 8s with final borrow
    if (trailingEightsCount > 0) {
      muxity.positions.length -= trailingEightsCount;  // Truncate array
      muxity.pendingPropagation = false;
      // If all positions consumed, result is AbsoluteZero
      if (muxity.positions.length === 0) {
        return createBuffer();
      }
    } else {
      // No trailing 8s but final borrow - this is a magnitude error
      throw new Error('Borrow overflow: invalid magnitude comparison');
    }
  }

  // ASSEMBLE BUFFER from ResultMuxity array
  let buffer = createBuffer();
  if (muxity.resultSign === 1) {
    buffer = setSignBit(buffer);
  }

  // Apply all recorded positions to buffer (index + 1 = position)
  muxity.positions.forEach((resultIndex, index) => {
    const pos = (index + 1) as Positions;
    if (pos === 21) {
      if (resultIndex === 0) {
        buffer = applyShiftedNumeralRotation(resultIndex + 1, buffer, pos);
      } else {
        buffer = applyShiftedNumeralRotation(resultIndex, buffer, pos);
      }
    } else {
      buffer = applyNumeralRotation(resultIndex, buffer, pos);
    }
    console.log('CHECK POSITION FOR EACH', pos, resultIndex);
  });

  // Apply marquee delimiter after last position
  const marqueePosition = muxity.positions.length + 1;
  if (marqueePosition <= 21) {
    buffer = applyMarqueeAtPosition(buffer, marqueePosition as Positions);
  }
  console.log('Final Binary', createFormattedRound8BinaryString(buffer));
  return buffer;
};

/**
 * PROTO-QUALITY: sumWrung - Complete sum operation with carry propagation
 * Self-contained recursive computation using ResultMuxity record
 */
const sumWrung = (
  routing: OperationRouting,
  wrungMuxityA: WrungMuxity,
  wrungMuxityB: WrungMuxity
): bigint => {
  const result = createResultMuxity(routing.resultSign);
  const lengthA = wrungMuxityA.marqueeRotation ? wrungMuxityA.marqueeRotation - 1 : 21;
  const lengthB = wrungMuxityB.marqueeRotation ? wrungMuxityB.marqueeRotation - 1 : 21;
  const maxPosition = Math.max(lengthA, lengthB);
  const minPosition = Math.min(lengthA, lengthB);
  const longerWrung = lengthA > lengthB ? routing.anchorWrung : routing.modulatorWrung;

  let isFinalTwistDetected = false;
  const carries: BitRotationTuple[] = [];
  console.log('conditions', result, lengthA, lengthB, maxPosition, minPosition, longerWrung, wrungMuxityA, wrungMuxityB)
  scanUpwards(routing.anchorWrung, routing.modulatorWrung, (a: bigint, b: bigint, pos: Positions) => {
    if (pos > maxPosition) {return false;}

    const chosenSpool = pos === 21 ? ShiftedSpooledSumSeries : SpooledSumSeries;
    const carry = carries.pop() as BitRotationTuple;
    let resultIndex = 0;
    // Beyond shorter operand - copy from longer
    if (pos > minPosition && lengthA !== lengthB) {
      const [b0, b1, b2] = extractBitTuple(longerWrung, pos);
      // spooledNumerals returns DISPLAY VALUE (1-8), need INDEX (0-7)
      if (carry) {
        const [c0, c1, c2] = carry;
        const tuple = chosenSpool[b0][b1][b2][c0][c1][c2];
        if (pos === 21 && tuple.length > 1) {
          isFinalTwistDetected = true;
          return false;
        } else if (tuple.length > 1) {
          carries.push(tuple[1] as BitRotationTuple);
        }
        resultIndex += tuple[0] as number;
      } else {
        const some =
        resultIndex += pos === 21
          ? spooledShiftedNumerals[b0][b1][b2] - 1  // Shifted returns index
          : spooledNumerals[b0][b1][b2] - 1;    // Convert display to index
      }
    } else {
      const [rtA0, rtA1, rtA2] = extractBitTuple(a, pos);
      const [rtB0, rtB1, rtB2] = extractBitTuple(b, pos);
      if (carry) {
        const [c0, c1, c2] = carry;
        const tuple = chosenSpool[rtA0][rtA1][rtA2][c0][c1][c2];
        console.log('With Carry', tuple);
        if (pos === 21 && tuple.length > 1) {
          isFinalTwistDetected = true;
          return false;
        } else if (tuple.length > 1) {
          carries.push(tuple[1] as BitRotationTuple);
        }
        const [i0, i1, i2] = pos === 21 ?
          getShiftedBitRotation((tuple[0] as number + 1) as 1 | 2 | 3 | 4 | 5 | 6 | 7)
          :
          getRegularBitRotation((tuple[0] as number + 1) as 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8)
          ;
        const nextTuple = chosenSpool[i0][i1][i2][rtB0][rtB1][rtB2];
        if (nextTuple.length > 1) {
          carries.push(nextTuple[1] as BitRotationTuple);
        }
        resultIndex += nextTuple[0] as number;
        // resultIndex += tuple[0] as number;
      } else {
        const spoolResult = pos === 21 ?
          ShiftedSpooledSumSeries[rtA0][rtA1][rtA2][rtB0][rtB1][rtB2]
          :
          SpooledSumSeries[rtA0][rtA1][rtA2][rtB0][rtB1][rtB2];
        if (pos === 21) {
          console.log(
            'Without Carry',
            spoolResult,
            spooledShiftedNumerals[rtA0][rtA1][rtA2],
            spooledShiftedNumerals[rtB0][rtB1][rtB2]
          );
          console.log(
            'Without Carry',
            spoolResult,
            [[rtA0],[rtA1],[rtA2]],
            [[rtB0],[rtB1],[rtB2]]
          );
        } else {
          console.log(
            'Without Carry',
            spoolResult,
            spooledNumerals[rtA0][rtA1][rtA2],
            spooledNumerals[rtB0][rtB1][rtB2]
          );
        }
        if (pos === 21 && spoolResult.length > 1) {
          isFinalTwistDetected = true;
          return false;
        } else if (spoolResult.length > 1) {
          carries.push(spoolResult[1] as BitRotationTuple);
        }
        resultIndex = spoolResult[0] as number;
      }
    }
    result.positions.push(resultIndex);  // Push sequentially (index = position - 1)
    return true;
  });
  if (carries.length > 0) {
    console.log('CHECK', result, carries, result.positions);
    const carry = carries.pop() as BitRotationTuple;
    const carryAsNumeral = spooledNumerals[carry[0]][carry[1]][carry[2]];
    result.positions.push(carryAsNumeral - 1);
  }
  return assembleBufferFromResultMuxity(result, routing, isFinalTwistDetected, 'sum');
};

/**
 * PROTO-QUALITY: differenceWrung - Complete difference operation with borrow propagation
 * Self-contained recursive computation using ResultMuxity record
 * Tracks consecutive 8s for all-8s + final borrow = AbsoluteZero pattern
 */
const differenceWrung = (
  routing: OperationRouting,
  wrungMuxityA: WrungMuxity,
  wrungMuxityB: WrungMuxity
): bigint => {
  const result = createResultMuxity(routing.resultSign);

  // Direct routing via self-reference (WrungMuxity pivot enhancement)
  const anchorMuxity = routing.anchorWrung === wrungMuxityA.wrung ? wrungMuxityA : wrungMuxityB;
  const modulatorMuxity = routing.modulatorWrung === wrungMuxityA.wrung ? wrungMuxityA : wrungMuxityB;

  const lengthAnchor = anchorMuxity.marqueeRotation ? anchorMuxity.marqueeRotation - 1 : 21;
  const lengthModulator = modulatorMuxity.marqueeRotation ? modulatorMuxity.marqueeRotation - 1 : 21;
  const maxPosition = lengthAnchor;  // Anchor is always longer or equal (in difference)
  const minPosition = lengthModulator;

  // SUITE 7 ROSE: Borrow array - depleting delimiter for halting completeness
  const borrows: BitRotationTuple[] = [];
  let isFullTwist = false;

  scanUpwards(routing.anchorWrung, routing.modulatorWrung, (a: bigint, b: bigint, pos: Positions) => {
    if (pos > maxPosition) {return false;}
    console.log('HIT!', 1);
    const chosenSpool = pos === 21 ? SpooledShiftedDifferenceSeries : SpooledDifferenceSeries;
    let resultIndex = -1;

    // Beyond modulator (shorter operand) - use anchor value OR spool if pending borrow
    if (pos > minPosition) {
      const [b0, b1, b2] = extractBitTuple(a, pos);  // a is anchor
      console.log('HIT!', 2);
      // SUITE 7 ROSE PATCH: Pop from borrow array (depleting delimiter)
      if (borrows.length > 0) {
        console.log('HIT!', 3);
        const borrow = borrows.pop();  // Deplete borrow from array
        if (borrow && pos === 21) {
          const someNumber = (spooledNumerals[borrow[0]][borrow[1]][borrow[2]]) as 1 | 2 | 3 | 4 | 5 | 6 | 7;
          // const someNumber = (spooledNumerals[borrow[0]][borrow[1]][borrow[2]] + 1) as 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7;
          const [t0, t1, t2] = getShiftedBitRotation(someNumber);
          const borrowTuple = spooledRegularShiftedBridge[t0][t1][t2];
          console.log('HIT!',
            someNumber,
            t0, t1, t2,
            someNumber,
            4,
            pos,
            borrow,
            borrowTuple,
            spooledShiftedNumerals[b0][b1][b2],
            spooledShiftedNumerals[borrowTuple[0]][borrowTuple[1]][borrowTuple[2]]
          );
          const spoolResult = chosenSpool[b0][b1][b2][borrowTuple[0]][borrowTuple[1]][borrowTuple[2]];
          console.log('HIT!', 4, spoolResult, spooledNumerals[borrow[0]][borrow[1]][borrow[2]]);
          if (spoolResult) {
            resultIndex = spoolResult[0] as number;
            if (spoolResult.length > 1) {
              borrows.push(spoolResult[1] as BitRotationTuple);
              return false;
            }
          }
        } else if (borrow !== undefined) {
          console.log('HIT!', 5, borrow);
          const spoolResult = chosenSpool[b0][b1][b2][borrow[0]][borrow[1]][borrow[2]];
          resultIndex = spoolResult[0] as number;
          if (spoolResult.length > 1) {
            borrows.push(spoolResult[1] as BitRotationTuple);
          }
        }
      } else {
        console.log('HIT!', 6);
        // No borrow - copy anchor value directly
        // spooledNumerals returns DISPLAY VALUE (1-8), need INDEX (0-7)
        const some = pos === 21 ? spooledShiftedNumerals[b0][b1][b2] // Shifted already returns index
          : spooledNumerals[b0][b1][b2] - 1;    // Convert display to index 
        console.log('CHECK THIS SOME', some);
        resultIndex = some;
      }
    } else {
      console.log('HIT!', 7);
      // const [i0, i1, i2] = getShiftedBitRotation(resultIndex as 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8);
      // const nextResult = chosenSpool[b0][b1][b2][borrowTuple[0]][borrowTuple[1]][borrowTuple[2]];
      // Both have values - use difference spool
      const [rtA0, rtA1, rtA2] = extractBitTuple(a, pos);
      const [rtB0, rtB1, rtB2] = extractBitTuple(b, pos);
      if (borrows.length > 0) {
        console.log('HIT!', 8);
        const borrow = borrows.pop();  // Deplete borrow from array
        if (borrow && pos === 21) {
          console.log('HIT!', 9);
          const borrowTuple = spooledRegularShiftedBridge[borrow[0]][borrow[1]][borrow[2]];
          const spoolResult = chosenSpool[rtA0][rtA1][rtA2][borrowTuple[0]][borrowTuple[1]][borrowTuple[2]];
          resultIndex = spoolResult[0] as number;
          if (spoolResult.length > 1) {
            borrows.push(spoolResult[1] as BitRotationTuple);
          }
          const [i0, i1, i2] = getShiftedBitRotation(resultIndex as 1 | 2 | 3 | 4 | 5 | 6 | 7);
          const nextResult = chosenSpool[i0][i1][i2][rtB0][rtB1][rtB2];
          resultIndex = nextResult[0] as number;
          if (nextResult.length > 1) {
            borrows.push(nextResult[1] as BitRotationTuple);
          }
        } else if (borrow) {
          const borrowTuple = borrow;
          const spoolResult = chosenSpool[rtA0][rtA1][rtA2][borrowTuple[0]][borrowTuple[1]][borrowTuple[2]];
          console.log('HIT!', 10, borrowTuple, spoolResult, spooledNumerals[rtA0][rtA1][rtA2]);
          resultIndex = spoolResult[0] as number;
          if (spoolResult.length > 1) {
            borrows.push(spoolResult[1] as BitRotationTuple);
          }
          const [i0, i1, i2] = getRegularBitRotation(resultIndex + 1 as 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8);
          const nextResult = chosenSpool[i0][i1][i2][rtB0][rtB1][rtB2];
          resultIndex = nextResult[0] as number;
          console.log('HIT!', 10.5, borrowTuple, nextResult, spooledNumerals[i0][i1][i2]);
          if (nextResult.length > 1) {
            borrows.push(nextResult[1] as BitRotationTuple);
          }
        }
      } else {
        const spoolResult = chosenSpool[rtA0][rtA1][rtA2][rtB0][rtB1][rtB2];
        // spoolResult[0] is index 0-7 (getRegularRotation pattern)
        console.log('CHECK SPOOL RESULT FOR UNDEFINED', spoolResult, [rtA0], [rtA1], [rtA2], [rtB0], [rtB1], [rtB2],
          pos, minPosition, maxPosition, wrungMuxityA, wrungMuxityB);
        resultIndex = spoolResult[0] as number;
        console.log('HIT!', 'Here A', resultIndex, spoolResult);
        if (pos === 21 && spoolResult.length > 1) {
          console.log('HIT!', 11);
          borrows.push(spoolResult[1] as BitRotationTuple);
          // isFullTwist = true;
          return false;
        } else if (spoolResult.length > 1) {
          console.log('HIT!', 12);
          borrows.push(spoolResult[1] as BitRotationTuple);
        }
      }
    }
    if (resultIndex >= 0) {
      console.log('HIT!', 13, result.positions);
      // Track consecutive 8s from start (for all-8s pattern)
      // Array length before push = number of positions already added
      // Position being added = array.length + 1
      // So if array.length === consecutiveEightsFromStart, next position is consecutiveEightsFromStart + 1
      if (resultIndex === 7 && result.positions.length === result.consecutiveEightsFromStart) {
        result.consecutiveEightsFromStart = result.positions.length + 1;
      }
      result.positions.push(resultIndex);  // Push sequentially (index = position - 1)
    }
    return true;
  });

  // SUITE 7 ROSE: Marquee delimiter logic
  // If there's a final borrow (borrowArray not empty), remove leading 8s equal to modulator length
  // The modulator length determines how many positions are "underflow" from borrow cascade
  console.log('Final Check', borrows, result, '\n', result.positions[result.positions.length - 1] === getRegularRotation(8));
  console.log('Final Check', borrows.length, result.positions.length);
  if (borrows.length !== result.positions.length && borrows.length > 0) {
    borrows.forEach(_ => {
      console.log('What\'s this?', result);
      if (result.positions.length === 21) {
        if (result.positions[20] === getShiftedRotation(8)) {
          result.positions.pop();
        }
      } else if (result.positions[result.positions.length - 1] === getRegularRotation(8)) {
        console.log('What\'s this?', result);
        result.positions.pop();
      } else {
        // May be a Sign Flip
        return;
      }
    });
  } else if (borrows.length === result.positions.length) {
    result.positions = result.positions.slice(0, 1);
    console.log('Check Check', result.positions, isFullTwist);
  }
  console.log('Final Final Check', borrows, result);
  return assembleBufferFromResultMuxity(result, routing, isFullTwist, 'difference');
};

export const muxifyWrung = (operation: Operations, wrungA: bigint, wrungB: bigint): bigint => {
  const signA = getSignBit(wrungA);
  const signB = getSignBit(wrungB);
  const wrungMuxityA = BidirectionalConference(wrungA);
  const wrungMuxityB = BidirectionalConference(wrungB);

  // QUALITY-FIRST SHORT-CIRCUITS (Muxification Pattern)

  // Case 1: Both AbsoluteZero → Return AbsoluteZero
  if (wrungMuxityA.isAbsoluteZero && wrungMuxityB.isAbsoluteZero) {
    return createBuffer();
  }

  // Case 2: A is AbsoluteZero → Return B (with appropriate sign)
  if (wrungMuxityA.isAbsoluteZero) {
    if (operation === '+') {
      return wrungB;
    } else {
      return signB === 1 ? (wrungB & ~1n) : setSignBit(wrungB);
    }
  }

  // Case 3: B is AbsoluteZero → Return A
  if (wrungMuxityB.isAbsoluteZero) {
    return wrungA;
  }

  // OPERATION ROUTING (Quality-First with WrungMuxity)
  const effectiveOperation = determineEffectiveOperation(
    operation,
    signA,
    signB,
    wrungA,
    wrungB,
    wrungMuxityA,
    wrungMuxityB
  );

  // QUALITY-FIRST: Equal magnitude difference → AbsoluteZero (immediate short-circuit)
  if (effectiveOperation.isEqualMagnitude && effectiveOperation.effectiveOp === 'difference') {
    return createBuffer();
  }

  // QUALITY-FIRST: FinalTwist Detection
  // FinalTwist is the maximum value - any addition to it causes overflow
  if (effectiveOperation.effectiveOp === 'sum') {
    if (wrungMuxityA.isFinalTwist || wrungMuxityB.isFinalTwist) {
      return effectiveOperation.resultSign === 1
        ? getRound8Case(Round8Cases.POSITIVE_TWIST_CASE)
        : getRound8Case(Round8Cases.NEGATIVE_TWIST_CASE);
    }
  }

  // PROTO-MUXIUM DISPATCH: Route to proto-quality functions
  // This mirrors exactly how a Muxium routes actions to qualities
  if (effectiveOperation.effectiveOp === 'sum') {
    return sumWrung(effectiveOperation, wrungMuxityA, wrungMuxityB);
  } else {
    return differenceWrung(effectiveOperation, wrungMuxityA, wrungMuxityB);
  }
};