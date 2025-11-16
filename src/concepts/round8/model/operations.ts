import { BidirectionalConference, MarqueeState } from './bidirectional';
import { compareMagnitude, SpooledDifferenceSeries, SpooledSumSeries } from './cases';
import {
  applyNumeralRotation,
  createBuffer,
  extractBitTuple,
  getSignBit,
  Positions,
  scanUpwards,
  setSignBit,
  SpooledWrung
} from './terminology';

/**
 * Operation Routing Result - Structured data for sign routing
 */
type OperationRouting = {
  effectiveOp: 'sum' | 'difference';
  minuend: bigint;
  subtrahend: bigint;
  resultSign: 0 | 1;
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
 * Updated to use MarqueeState (Quality-First Muxification Pattern).
 *
 * @param operation - Operation type ('+' for addition, '-' for subtraction)
 * @param signA - Sign of wrungA (0 = negative, 1 = positive)
 * @param signB - Sign of wrungB (0 = negative, 1 = positive)
 * @param wrungA - First operand buffer (64 positions)
 * @param wrungB - Second operand buffer (64 positions)
 * @param marqueeStateA - MarqueeState (Quality Container) for wrungA
 * @param marqueeStateB - MarqueeState (Quality Container) for wrungB
 * @returns Routing object with effectiveOp, operand order, and result sign
 */
// eslint-disable-next-line complexity
export const determineEffectiveOperation = (
  operation: Operations,
  signA: 0 | 1,
  signB: 0 | 1,
  wrungA: bigint,
  wrungB: bigint,
  marqueeStateA: MarqueeState,
  marqueeStateB: MarqueeState
): OperationRouting => {
  // ADDITION OPERATIONS (operation === '+')
  if (operation === '+') {
    // Case 1: (+A) + (+B) → Sum, result positive
    if (signA === 1 && signB === 1) {
      return {
        effectiveOp: 'sum',
        minuend: wrungA,
        subtrahend: wrungB,
        resultSign: 1,
      };
    }

    // Case 2: (-A) + (-B) → Sum, result negative
    if (signA === 0 && signB === 0) {
      return {
        effectiveOp: 'sum',
        minuend: wrungA,
        subtrahend: wrungB,
        resultSign: 0,
      };
    }

    // Case 3: (+A) + (-B) → Difference (A - B), sign depends on magnitude
    if (signA === 1 && signB === 0) {
      const aGreater = compareMagnitude(wrungA, wrungB, marqueeStateA, marqueeStateB);
      return {
        effectiveOp: 'difference',
        minuend: aGreater ? wrungA : wrungB,
        subtrahend: aGreater ? wrungB : wrungA,
        resultSign: aGreater ? 1 : 0,
      };
    }

    // Case 4: (-A) + (+B) → Difference (B - A), sign depends on magnitude
    if (signA === 0 && signB === 1) {
      const bGreater = compareMagnitude(wrungB, wrungA, marqueeStateB, marqueeStateA);
      return {
        effectiveOp: 'difference',
        minuend: bGreater ? wrungB : wrungA,
        subtrahend: bGreater ? wrungA : wrungB,
        resultSign: bGreater ? 1 : 0,
      };
    }
  }

  // SUBTRACTION OPERATIONS (operation === '-')
  if (operation === '-') {
    // Case 5: (+A) - (+B) → Difference (A - B), sign depends on magnitude
    if (signA === 1 && signB === 1) {
      const aGreater = compareMagnitude(wrungA, wrungB, marqueeStateA, marqueeStateB);
      return {
        effectiveOp: 'difference',
        minuend: aGreater ? wrungA : wrungB,
        subtrahend: aGreater ? wrungB : wrungA,
        resultSign: aGreater ? 1 : 0,
      };
    }

    // Case 6: (-A) - (-B) → Difference (B - A), sign FLIPPED
    if (signA === 0 && signB === 0) {
      const aGreater = compareMagnitude(wrungA, wrungB, marqueeStateA, marqueeStateB);
      return {
        effectiveOp: 'difference',
        minuend: aGreater ? wrungA : wrungB,
        subtrahend: aGreater ? wrungB : wrungA,
        resultSign: aGreater ? 0 : 1,
      };
    }

    // Case 7: (+A) - (-B) → Sum (A + B), result positive
    if (signA === 1 && signB === 0) {
      return {
        effectiveOp: 'sum',
        minuend: wrungA,
        subtrahend: wrungB,
        resultSign: 1,
      };
    }

    // Case 8: (-A) - (+B) → Sum (A + B), result negative
    if (signA === 0 && signB === 1) {
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

const getChosenSpool = (effective: OperationRouting): SpooledWrung => {
  return effective.effectiveOp === 'sum' ? SpooledSumSeries : SpooledDifferenceSeries;
};

export const muxifyWrung = (operation: Operations, wrungA: bigint, wrungB: bigint): bigint => {
  const signA = getSignBit(wrungA);
  const signB = getSignBit(wrungB);
  const marqueeStateA = BidirectionalConference(wrungA);
  const marqueeStateB = BidirectionalConference(wrungB);

  // QUALITY-FIRST SHORT-CIRCUITS (Muxification Pattern)

  // Case 1: Both AbsoluteZero → Return AbsoluteZero
  if (marqueeStateA.isAbsoluteZero && marqueeStateB.isAbsoluteZero) {
    return createBuffer();
  }

  // Case 2: A is AbsoluteZero → Return B (with appropriate sign)
  if (marqueeStateA.isAbsoluteZero) {
    if (operation === '+') {
      return wrungB;
    } else {
      return signB === 1 ? (wrungB & ~1n) : setSignBit(wrungB);
    }
  }

  // Case 3: B is AbsoluteZero → Return A
  if (marqueeStateB.isAbsoluteZero) {
    return wrungA;
  }

  // OPERATION ROUTING (Quality-First with MarqueeState)
  const effectiveOperation = determineEffectiveOperation(
    operation,
    signA,
    signB,
    wrungA,
    wrungB,
    marqueeStateA,
    marqueeStateB
  );

  // QUALITY-FIRST: FinalTwist Overflow Check
  if (effectiveOperation.effectiveOp === 'sum') {
    if (marqueeStateA.isFinalTwist || marqueeStateB.isFinalTwist) {
      throw new Error('Overflow: Cannot add to FinalTwist');
    }
  }

  const chosenSpool = getChosenSpool(effectiveOperation);

  // QUANTITATIVE SPOOL OPERATIONS (Provably Halting Complete via scanUpwards)
  let result = createBuffer();
  if (effectiveOperation.resultSign === 1) {
    result = setSignBit(result);
  }

  const maxPosition = Math.max(
    marqueeStateA.firstValidRotation ?? 1,
    marqueeStateB.firstValidRotation ?? 1
  );

  let pendingCarry = false;

  // Provably Halting Complete Scan - Stratimuxian Computing Foundation
  scanUpwards(wrungA, wrungB, (a: bigint, b: bigint, pos: Positions) => {
    // Halt when beyond maxPosition (provable termination)
    if (pos > maxPosition) {
      return false;
    }

    const [rtA0, rtA1, rtA2] = extractBitTuple(a, pos);
    const [rtB0, rtB1, rtB2] = extractBitTuple(b, pos);

    // Spool indexing: [bit0_A][bit1_A][bit2_A][bit0_B][bit1_B][bit2_B]
    const spoolResult = chosenSpool[rtA0][rtA1][rtA2][rtB0][rtB1][rtB2];
    let resultIndex = spoolResult[0] as number;
    let hasNewCarry = spoolResult.length > 1;

    if (pendingCarry) {
      resultIndex += 1;
      if (resultIndex > 7) {
        resultIndex = 0;
        hasNewCarry = true;
      }
      pendingCarry = false;
    }

    if (hasNewCarry) {
      pendingCarry = true;
    }

    result = applyNumeralRotation(resultIndex, result, pos);
    return true;
  });

  // Handle final carry (extends marquee by one position)
  if (pendingCarry) {
    if (maxPosition < 21) {
      const nextPosition = (maxPosition + 1) as Positions;
      result = applyNumeralRotation(0, result, nextPosition);
    } else {
      throw new Error('Overflow: Carry beyond position 21');
    }
  }

  return result;
};