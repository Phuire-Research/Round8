/* eslint-disable complexity */
import { BidirectionalConference, WrungMuxity } from './bidirectional';
import { compareMagnitude, SpooledDifferenceSeries, SpooledSumSeries } from './cases';
import {
  applyMarqueeAtPosition,
  applyNumeralRotation,
  applyShiftedNumeralRotation,
  createBuffer,
  createResultMuxity,
  extractBitTuple,
  getRound8Case,
  getSignBit,
  Positions,
  ResultMuxity,
  Round8Cases,
  scanUpwards,
  setSignBit,
  spooledNumerals,
  spooledShiftedNumerals,
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
    buffer = pos === 21
      ? applyShiftedNumeralRotation(resultIndex, buffer, pos)
      : applyNumeralRotation(resultIndex, buffer, pos);
  });

  // Apply marquee delimiter after last position
  const marqueePosition = muxity.positions.length + 1;
  if (marqueePosition <= 21) {
    buffer = applyMarqueeAtPosition(buffer, marqueePosition as Positions);
  }

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

  scanUpwards(routing.anchorWrung, routing.modulatorWrung, (a: bigint, b: bigint, pos: Positions) => {
    if (pos > maxPosition) return false;

    let resultIndex: number;
    let hasCarry = false;

    // Beyond shorter operand - copy from longer
    if (pos > minPosition && lengthA !== lengthB) {
      const [b0, b1, b2] = extractBitTuple(longerWrung, pos);
      // spooledNumerals returns DISPLAY VALUE (1-8), need INDEX (0-7)
      resultIndex = pos === 21
        ? spooledShiftedNumerals[b0][b1][b2]  // Shifted returns index
        : spooledNumerals[b0][b1][b2] - 1;    // Convert display to index
    } else {
      // Both have values - use sum spool
      const [rtA0, rtA1, rtA2] = extractBitTuple(a, pos);
      const [rtB0, rtB1, rtB2] = extractBitTuple(b, pos);
      const spoolResult = SpooledSumSeries[rtA0][rtA1][rtA2][rtB0][rtB1][rtB2];

      if (pos === 21 && Array.isArray(spoolResult[0])) {
        isFinalTwistDetected = true;
        return false;
      }

      resultIndex = spoolResult[0] as number;
      hasCarry = spoolResult.length > 1;
    }

    // Apply pending carry
    if (result.pendingPropagation) {
      resultIndex += 1;
      const maxIndex = pos === 21 ? 6 : 7;
      if (resultIndex > maxIndex) {
        if (pos === 21) {
          isFinalTwistDetected = true;
          return false;
        }
        resultIndex = 0;
        hasCarry = true;
      }
      result.pendingPropagation = false;
    }

    // Position 21 carry means overflow
    if (pos === 21 && hasCarry) {
      isFinalTwistDetected = true;
      return false;
    }

    result.positions.push(resultIndex);  // Push sequentially (index = position - 1)
    if (hasCarry) result.pendingPropagation = true;

    return true;
  });

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

  scanUpwards(routing.anchorWrung, routing.modulatorWrung, (a: bigint, b: bigint, pos: Positions) => {
    if (pos > maxPosition) return false;

    let resultIndex: number;
    let hasBorrow = false;

    // Beyond modulator (shorter operand) - copy from anchor
    if (pos > minPosition) {
      const [b0, b1, b2] = extractBitTuple(a, pos);  // a is anchor
      // spooledNumerals returns DISPLAY VALUE (1-8), need INDEX (0-7)
      resultIndex = pos === 21
        ? spooledShiftedNumerals[b0][b1][b2]  // Shifted already returns index
        : spooledNumerals[b0][b1][b2] - 1;    // Convert display to index
    } else {
      // Both have values - use difference spool
      const [rtA0, rtA1, rtA2] = extractBitTuple(a, pos);
      const [rtB0, rtB1, rtB2] = extractBitTuple(b, pos);
      const spoolResult = SpooledDifferenceSeries[rtA0][rtA1][rtA2][rtB0][rtB1][rtB2];

      // spoolResult[0] is index 0-7 (getRegularRotation pattern)
      resultIndex = spoolResult[0] as number;
      hasBorrow = spoolResult.length > 1;
    }

    // Apply pending borrow (SUBTRACT from result)
    if (result.pendingPropagation) {
      resultIndex -= 1;
      if (resultIndex < 0) {
        // Position value consumed by borrow - becomes 0 (disappears)
        // This position should NOT be included in final result
        // Mark as -1 to indicate "skip this position"
        // The pending borrow is SATISFIED (absorbed), not propagated
        // Only the spool's own borrow (hasBorrow) continues
        resultIndex = -1;
        // hasBorrow stays as-is from spool computation
      }
      result.pendingPropagation = false;
    }

    // Only record position if it has a valid value (not consumed by borrow)
    if (resultIndex >= 0) {
      // Track consecutive 8s from start (for all-8s pattern)
      // Array length before push = number of positions already added
      // Position being added = array.length + 1
      // So if array.length === consecutiveEightsFromStart, next position is consecutiveEightsFromStart + 1
      if (resultIndex === 7 && result.positions.length === result.consecutiveEightsFromStart) {
        result.consecutiveEightsFromStart = result.positions.length + 1;
      }

      result.positions.push(resultIndex);  // Push sequentially (index = position - 1)
    }
    // If resultIndex is -1, position is skipped (consumed by borrow)

    if (hasBorrow) result.pendingPropagation = true;

    return true;
  });

  return assembleBufferFromResultMuxity(result, routing, false, 'difference');
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