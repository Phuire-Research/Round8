/**
 * Round8 Bidirectional Conference - Zero-Allocation Marquee Detection
 *
 * Renewed architecture using Sign-at-Origin with bigint buffers.
 * Determines first valid counting position and Marquee state for Round8 buffers.
 * Implements Bidirectional Marquee Approach with provable halting recursion.
 *
 * Key Innovations:
 * - Zero-allocation: Uses extractBitTuple and scanDownward composition
 * - Sign-at-Origin: Sign bit at bit 0, positions extend upward
 * - Strike-through sweep: Optimized detection with configurable array
 * - Tuple returns: Single sign check, dual information
 */

import {
  extractBitTuple,
  getSignBit,
  scanDownward,
  type Positions,
  MARQUEE_TUPLE,
  spooledShiftedNumerals
} from './terminology';

/**
 * MarqueeState - Result of BidirectionalConference Marquee detection
 */
export type MarqueeState = {
  /** First valid position for counting (1-21), or -1 for absolute zero */
  firstValidRotation?: number;
  /** Rotation value at Marquee position */
  marqueeRotation?: number;
  /** Whether Position 21 is Final Twist (000 with all others 111) */
  isFinalTwist?: boolean;
  /** Whether buffer represents absolute zero (all positions 000) */
  isAbsoluteZero?: boolean;
  /** Whether buffer represents negative one (all positions 111, sign 0) */
  isNegative?: boolean;
};

/**
 * NEGATIVE_ONE_STRIKE_SWEEP - Optimized position order for detecting any 0 bit
 *
 * Strike pattern finds most likely variance points first:
 * - Position 21: Expansion bound, highest complexity, most variation
 * - Position 1: Near origin, lowest counting position
 * - Position 11: Middle bisection
 * - Remaining: Alternating outward from middle (12,10,13,9,14,8...)
 *
 * Configurable array allows future optimization without logic rewrite.
 * Can be tuned based on real-world data to minimize average-case strikes.
 *
 * Average Case: 1-3 strikes (positions 21, 1, or 11 most likely to differ)
 * Worst Case: 21 strikes (all positions must be checked for all-111 confirmation)
 */
const NEGATIVE_ONE_STRIKE_SWEEP: Positions[] = [
  21, // Strike 1: Highest position (expansion bound, most variation)
  20,
  1,  // Strike 2: Lowest position (near origin)
  11, // Strike 3: Middle bisection
  12, 10, // Strikes 4-5: Alternating outward from middle
  13, 9,  // Strikes 6-7
  14, 8,  // Strikes 8-9
  15, 7,  // Strikes 10-11
  16, 6,  // Strikes 12-13
  17, 5,  // Strikes 14-15
  18, 4,  // Strikes 16-17
  19, 3,  // Strikes 18-19
  2,  // Strikes 20-21
];
type CongruentOrder = {order: number[], congruent: boolean};
/**
 * flipAnorFlop - Detects the Anor of All Zero or All 1s and early returns for And
 *
 * Returns tuple to avoid redundant sign checks in caller:
 * - [
 * 0 : isNegative,
 * 1 : isOrigin,
 * 2 : congruentOrder
 * ]
 * Uses configurable strike-through sweep for early termination.
 * Stops immediately when any Disjoined Anor Bit is Found (Unlimited Continuous Optimization Point).
 *
 * Zero-allocation: Uses extractBitTuple with pre-computed masks/offsets.
 * Compositional: Builds on validated formation terminology.
 *
 * @param buffer - BigInt buffer to check (Sign-at-Origin architecture)
 * @returns [isNegative, OneOrZero] tuple
 */
export const zeroAnorOne = (buffer: bigint): [boolean | undefined, boolean, CongruentOrder[]] => {
  // Single sign check (Sign-at-Origin, bit 0)
  const signBit = getSignBit(buffer);

  // If positive sign, cannot be negative or Negative One
  // Sign is negative (0) - now check if ALL positions are 111
  let between = false;
  let same = false;
  let aim = -1;
  const composition: CongruentOrder[] = [
    {
      order: [],
      congruent: false
    },
    {
      order: [],
      congruent: false
    },
    {
      order: [],
      congruent: false
    }
  ];
  // Strike-through sweep: Early termination when any 0 found
  NEGATIVE_ONE_STRIKE_SWEEP.forEach((position, i) => {
    if (between) {return;} // Early exit from forEach (no further checks)

    // Zero-allocation: Use extractBitTuple
    const [b0, b1, b2] = extractBitTuple(buffer, position);

    // Check if any bit is 0
    if (b0 === 0 && b1 === 0 && b2 === 0) {
      if (!same) {
        composition[0].order.push(position);
        composition[0].congruent = true;
        same = true;
        aim = 0;
      } else if (same && aim !== 0) {
        composition[0].congruent = false;
        composition[1].congruent = false;
        between = true;
        return;
      } else if (same) {
        composition[0].order.push(position);
      }
      // eslint-disable-next-line consistent-return
    } else if (b0 === 1 && b1 === 1 && b2 === 1) {
      if (!same) {
        composition[1].order.push(position);
        composition[1].congruent = true;
        aim = 1;
      } else if (same && aim !== 1) {
        composition[0].congruent = false;
        composition[1].order.push(position);
        composition[1].congruent = false;
        between = true;
        composition[2].order = [...NEGATIVE_ONE_STRIKE_SWEEP].splice(i + 1);
        return;
      } else if (same) {
        composition[1].order.push(position);
      }
    }
  });
  // If we found any 0 bit: Negative but not Negative One
  return [
    signBit === 0,
    composition[0].order.length === 21 && signBit === 0,
    composition
  ];
};

/**
 * BidirectionalConference - Determines Marquee validity for Round8 buffer
 *
 * Renewed architecture using zero-allocation with Sign-at-Origin.
 * Scans downward from Position 21 (expansion bound) toward Position 1 (near origin).
 *
 * Marquee Detection Rules:
 * 1. Position 21 (expansion bound) special handling:
 *    - 000: Valid ONLY if all other positions 111 (Final Twist case)
 *    - 001: Valid as Shifted Holding (Marquee delimiter)
 *    - 010-111: Valid counting position (regular value)
 *
 * 2. Positions 1-20: First non-000 found (scanning downward) is Marquee
 *    - All positions from Marquee downward to Position 1 are valid content
 *    - All positions above Marquee are invalid placeholders (000 holding states)
 *
 * Special Cases:
 * - Absolute Zero: All positions 000 (firstValidRotation: -1)
 * - Negative One: All positions 111, sign 0 (firstValidRotation: 1, all valid)
 * - Final Twist: Position 21 = 000, all others 111 (maximum boundary marker)
 *
 * Position Count Limitation:
 * - We miss ONE positional count to enable this Bidirectional Marquee Approach
 * - Position 21 at 000 is ONLY valid when ALL other positions are 111 (Final Twist)
 * - Otherwise, Position 21 must be 001 or greater to be valid
 *
 * @param buffer - BigInt buffer (Sign-at-Origin architecture)
 * @returns MarqueeState describing validity and counting boundaries
 */
export const BidirectionalConference = (buffer: bigint): MarqueeState => {
  const [m0, m1, m2] = MARQUEE_TUPLE;
  const [isNegative, isOrigin, composition] = zeroAnorOne(buffer);
  // Special case: Absolute Zero (all positions 000)
  if ((isOrigin)) {
    return {
      isAbsoluteZero: true,
      firstValidRotation: 1
    };
  }
  // Special case: Negative One (all positions 111, sign 0)
  // Uses optimized tuple return (single sign check)

  // Normal case: Scan downward from Position 21 toward origin to find Marquee
  let marqueePosition: number | undefined;
  let firstValidPosition = -1;
  const startTwist = composition[0].order[0] === 21;
  if (startTwist && composition[1].order.length >= 1) {
    composition[2].order.forEach(position => {
      const [b0, b1, b2] = extractBitTuple(buffer, position as Positions);
      if (!(b0 === 1 && b1 === 1 && b2 === 1)) {
        composition[1].congruent = false;
        return;
      } else {
        composition[1].congruent = true;
        composition[1].order.push(position);
      }
    });
  }
  const isFinalTwist = composition[0].congruent === false && composition[1].congruent && composition[1].order.length === 20;
  if (isFinalTwist) {
    return {
      isNegative,
      isFinalTwist,
      marqueeRotation: 22,
      firstValidRotation: 21
    };
  }
  scanDownward(buffer, (buf, pos) => {
    const [b0, b1, b2] = extractBitTuple(buf, pos);
    if (pos === 21) {
      if (b0 === m0 && b1 === m1 && b2 === m2) {
        // 001 at Position 21: Shifted Holding (valid Marquee delimiter)
        marqueePosition = 21;
        firstValidPosition = 20;
        return false; // Stop scanning (found Marquee)
      } else if (spooledShiftedNumerals[b1][b1][b2] !== 7) {
        // Position 21 has valid counting value (010-111)
        marqueePosition = 22;
        firstValidPosition = 21;
        return false; // Stop scanning (found Marquee)
      }
    } else if ((b0 === m0 && b1 === m1 && b2 === m2)) {
      // Position 1 only: No Marquee (single position counting)
      marqueePosition = pos;
      firstValidPosition = pos - 1;
      return false; // Stop scanning
    }
    return true; // Continue scanning downward
  });

  return {
    isNegative,
    firstValidRotation: firstValidPosition === -1 || firstValidPosition === 0 ? 1 : firstValidPosition,
    marqueeRotation: marqueePosition,
    isFinalTwist
  };
};

/**
 * ═══════════════════════════════════════════════════════════════════════════
 * DUAL-BUFFER MARQUEE COORDINATION (ConferBidirectional)
 * ═══════════════════════════════════════════════════════════════════════════
 *
 * Zero-allocation renewal for dual-operand operations (SumWrung, B Series).
 *
 * Confers TWO buffers to determine combined Marquee states, enabling:
 * - Shared valid rotation identification (rightmost Marquee boundary)
 * - Alignment detection (exactEven for clean vs carry-only propagation)
 * - Intelligent backward propagation in operations
 *
 * Renewed from Round8.bidirectional.prior.ts (lines 226-284):
 * - Uint8Array → bigint (zero-allocation)
 * - Column terminology → Rotation/Position terminology
 * - Array-indexed (0-20) → Position-indexed (1-21)
 * - Composes on renewed BidirectionalConference
 */

/**
 * ConferredMarqueeState - Result of dual-buffer Marquee conference
 *
 * Enables intelligent backward propagation in dual-operand operations:
 * - exactEven: true → Marquees aligned, clean summation to delimiter
 * - exactEven: false → Marquees shifted, exclusive zones require carry-only
 *
 * Shared Valid Rotation:
 * - Boundary position where both buffers have valid content
 * - Determined by rightmost (maximum) firstValidRotation
 * - Positions beyond this are exclusive to one operand
 */
export type ConferredMarqueeState = {
  /** Marquee state for first operand (wrungA) */
  wrungAMarquee: MarqueeState;
  /** Marquee state for second operand (wrungB) */
  wrungBMarquee: MarqueeState;
  /**
   * Shared valid rotation boundary (rightmost Marquee position)
   * - Positions 1 to sharedValidRotation are valid in BOTH buffers
   * - Positions beyond are exclusive to buffer with higher Marquee
   * - Position-indexed: 1-21 (not array-indexed 0-20)
   */
  sharedValidRotation: number;
  /**
   * Whether Marquees are exactly aligned
   * - true: firstValidRotation match → clean summation
   * - false: Marquees shifted → carry-only propagation in exclusive zone
   */
  exactEven: boolean;
};

/**
 * ConferBidirectional - Conference TWO buffers to find combined Marquee states
 *
 * Zero-allocation renewal: Uses bigint buffers (Sign-at-Origin architecture).
 *
 * Returns both Marquee positions separately to enable intelligent operations:
 * - exactEven: true → Both marquees aligned, clean summation to delimiter
 * - exactEven: false → Marquees shifted, exclusive zones require carry-only
 *
 * Shared Valid Rotation Logic:
 * - sharedValidRotation = Math.max(firstValidA, firstValidB)
 * - Positions 1 to sharedValidRotation: Both buffers have valid content
 * - Positions beyond: Exclusive to buffer with higher Marquee
 *
 * Special Cases:
 * - Both Absolute Zero: sharedValidRotation = -1, exactEven = true
 * - One Absolute Zero: sharedValidRotation = non-zero's firstValidRotation
 * - Both non-zero: sharedValidRotation = max of both firstValidRotations
 *
 * Terminology Update (Prior → Renewed):
 * - "Column" → "Rotation" (aligned with Position terminology)
 * - Array-indexed 0-20 → Position-indexed 1-21
 * - Default ?? 20 → Default ?? 21
 *
 * Application (B Series):
 * - SumWrung: Determines where summation can occur vs carry-only
 * - Dual-buffer operations: Identifies safe operation boundaries
 *
 * @param wrungA - First operand buffer (Sign-at-Origin bigint)
 * @param wrungB - Second operand buffer (Sign-at-Origin bigint)
 * @returns ConferredMarqueeState with both marquees and shared valid rotation
 *
 * @example
 * // Buffer A: 5 positions, Buffer B: 8 positions
 * const conferredState = ConferBidirectional(bufferA, bufferB);
 * // conferredState.sharedValidRotation = 8 (rightmost Marquee position)
 * // conferredState.exactEven = false (5 ≠ 8, marquees shifted)
 * // Positions 1-5: Both buffers valid (shared zone)
 * // Positions 6-8: Only Buffer B valid (exclusive zone)
 */
export const ConferBidirectional = (
  wrungA: bigint,
  wrungB: bigint
): ConferredMarqueeState => {
  // Zero-allocation: Compose on renewed BidirectionalConference
  const wrungAMarquee = BidirectionalConference(wrungA);
  const wrungBMarquee = BidirectionalConference(wrungB);

  // Special Case 1: Both Absolute Zero
  if (wrungAMarquee.isAbsoluteZero && wrungBMarquee.isAbsoluteZero) {
    return {
      wrungAMarquee,
      wrungBMarquee,
      sharedValidRotation: 1, // No valid content in either buffer
      exactEven: true, // Both marquees identically positioned (both absent)
    };
  }

  // Special Case 2: WrungA is Absolute Zero (only B has content)
  if (wrungAMarquee.isAbsoluteZero) {
    return {
      wrungAMarquee,
      wrungBMarquee,
      // Shared valid rotation = B's entire valid range
      // Position-indexed: 1-21 (default 21, not array-indexed 20)
      sharedValidRotation: wrungBMarquee.firstValidRotation ?? 21,
      exactEven: false, // Marquees not aligned (A = -1, B = some position)
    };
  }

  // Special Case 3: WrungB is Absolute Zero (only A has content)
  if (wrungBMarquee.isAbsoluteZero) {
    return {
      wrungAMarquee,
      wrungBMarquee,
      // Shared valid rotation = A's entire valid range
      // Position-indexed: 1-21 (default 21, not array-indexed 20)
      sharedValidRotation: wrungAMarquee.firstValidRotation ?? 21,
      exactEven: false, // Marquees not aligned (A = some position, B = -1)
    };
  }

  // Normal Case: Both buffers have content
  // Shared valid rotation = RIGHTMOST (maximum) firstValidRotation
  // Position-indexed: 1-21 (default 21, not array-indexed 20)
  const firstValidA = wrungAMarquee.firstValidRotation ?? 21;
  const firstValidB = wrungBMarquee.firstValidRotation ?? 21;
  const sharedValidRotation = Math.max(firstValidA, firstValidB);

  // Marquees are exactEven if firstValidRotations match exactly
  // - exactEven: true → Clean operation boundary (both end at same position)
  // - exactEven: false → Shifted boundary (one extends beyond the other)
  const exactEven = wrungAMarquee.firstValidRotation === wrungBMarquee.firstValidRotation;

  return {
    wrungAMarquee,
    wrungBMarquee,
    sharedValidRotation,
    exactEven,
  };
};
