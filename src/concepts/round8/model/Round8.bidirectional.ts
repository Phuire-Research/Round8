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
  getRotationValue,
  type Positions,
  MARQUEE_TUPLE
} from './Round8.terminology';

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
  isNegativeOne?: boolean;
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
  20, 2,  // Strikes 20-21
];

/**
 * detectNegativeOne - Detect maximum negative magnitude with strike-through sweep
 *
 * Returns tuple to avoid redundant sign checks in caller:
 * - [false, false]: Positive sign (not negative)
 * - [true, false]: Negative sign but has at least one 0 bit (not Negative One)
 * - [true, true]: Negative sign AND all positions 111 (IS Negative One)
 *
 * Uses configurable strike-through sweep for early termination.
 * Stops immediately when any 0 bit found (average-case optimization).
 *
 * Zero-allocation: Uses extractBitTuple with pre-computed masks/offsets.
 * Compositional: Builds on validated extraction terminology.
 *
 * @param buffer - BigInt buffer to check (Sign-at-Origin architecture)
 * @returns [isNegative, isNegativeOne] tuple
 */
export const detectNegativeOne = (buffer: bigint): [boolean | undefined, boolean] => {
  // Single sign check (Sign-at-Origin, bit 0)
  const signBit = getSignBit(buffer);

  // If positive sign, cannot be negative or Negative One
  if (signBit === 1) {
    return [undefined, false];
  }

  // Sign is negative (0) - now check if ALL positions are 111
  let foundZeroBit = false;

  // Strike-through sweep: Early termination when any 0 found
  NEGATIVE_ONE_STRIKE_SWEEP.forEach((position) => {
    if (foundZeroBit) {return;} // Early exit from forEach (no further checks)

    // Zero-allocation: Use extractBitTuple
    const [b0, b1, b2] = extractBitTuple(buffer, position);

    // Check if any bit is 0
    if (b0 === 0 || b1 === 0 || b2 === 0) {
      foundZeroBit = true;
      // eslint-disable-next-line consistent-return
      return; // Early termination (exit current iteration)
    }
  });

  // If we found any 0 bit: Negative but not Negative One
  if (foundZeroBit) {
    return [true, false]; // isNegative=true, isNegativeOne=false
  }

  // All positions are 111 with negative sign: IS Negative One
  return [true, true]; // isNegative=true, isNegativeOne=true
};

/**
 * detectAbsoluteZero - Detect if all positions are 000
 *
 * Uses scanDownward for compositional building on validated terminology.
 * Early termination when any non-zero bit found.
 *
 * Zero-allocation: Uses extractBitTuple and scanDownward recursion.
 * Provable halting: Scan terminates at Position 1 or when non-zero found.
 *
 * @param buffer - BigInt buffer to check (Sign-at-Origin architecture)
 * @returns true if all 21 positions are 000, false otherwise
 */
export const detectAbsoluteZero = (buffer: bigint): boolean => {
  let allZeros = true;

  // Compositional: Build on validated scanDownward (provable halting recursion)
  scanDownward(buffer, (buf, pos) => {
    // Zero-allocation: Use extractBitTuple
    const [b0, b1, b2] = extractBitTuple(buf, pos);

    // If any bit is non-zero, not absolute zero
    if (b0 !== 0 || b1 !== 0 || b2 !== 0) {
      allZeros = false;
      return false; // Stop scanning (early termination)
    }

    return true; // Continue scanning downward
  });

  return allZeros;
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
  // Special case: Absolute Zero (all positions 000)
  if (detectAbsoluteZero(buffer)) {
    return {
      isAbsoluteZero: true,
      firstValidRotation: 1
    };
  }

  // Special case: Negative One (all positions 111, sign 0)
  // Uses optimized tuple return (single sign check)
  const [isNegative, isNegativeOne] = detectNegativeOne(buffer);
  if (isNegativeOne) {
    return {
      isNegativeOne: true,
      // First Position is the Delimiter. No Additional Positions After.
      // No Marquee due to our 2nd Column Activation Rule for our Marquee System.
      firstValidRotation: 1,
      isNegative
    };
  }

  // Normal case: Scan downward from Position 21 toward origin to find Marquee
  let marqueePosition: number | undefined;
  let firstValidPosition = -1;
  let isFinalTwist = false;

  scanDownward(buffer, (buf, pos) => {
    const [b0, b1, b2] = extractBitTuple(buf, pos);

    if (pos === 21) {
      // Position 21 special handling (expansion bound)
      if (b0 === 0 && b1 === 0 && b2 === 0) {
        // 000 at Position 21: Check if Final Twist (all others 111)
        let allOthersAre111 = true;

        // Inner scan to verify all other positions are 111
        scanDownward(buf, (innerBuf, innerPos) => {
          if (innerPos === 21) {
            return true; // Skip Position 21 itself
          }

          const [ib0, ib1, ib2] = extractBitTuple(innerBuf, innerPos);
          if (!(ib0 === 1 && ib1 === 1 && ib2 === 1)) {
            allOthersAre111 = false;
            return false; // Stop inner scan (found non-111)
          }
          return true; // Continue inner scan
        });

        if (allOthersAre111) {
          // Final Twist case: Position 21 = 000, all others = 111
          isFinalTwist = true;
          marqueePosition = 22;
          firstValidPosition = 21;
          return false; // Stop outer scan
        } else {
          return false; // Stop scanning (Position 21 is not a valid counting position)
        }
      } else if (b0 === m0 && b1 === m1 && b2 === m2) {
        // 001 at Position 21: Shifted Holding (valid Marquee delimiter)
        marqueePosition = 21;
        firstValidPosition = 20;
        return false; // Stop scanning (found Marquee)
      } else {
        // Position 21 has valid counting value (010-111)
        marqueePosition = 22;
        firstValidPosition = 21;
        return false; // Stop scanning (found Marquee)
      }
    } else {
      // Positions 1-20: Marquee detection with 2nd Column Activation Rule
      if (!(b0 === 0 && b1 === 0 && b2 === 0)) {
        // Found non-000 content (this is the first content position, Marquee is conceptually one position up)

        if (pos === 1) {
          // Position 1 only: No Marquee (single position counting)
          marqueePosition = undefined;
          firstValidPosition = 1;
          return false; // Stop scanning
        }

        if (pos === 3 && b0 === m0 && b1 === m1 && b2 === m2) {
          // Position 3 IS Marquee [1,0,0]: 2nd Column Activation Rule
          // (Position 2 is ALWAYS valid when Position 3 is Marquee, including 000 as Round8 '1')
          marqueePosition = 3;
          firstValidPosition = 2;
          return false; // Stop scanning
        }

        // All other positions (2-20): First non-000 found IS Marquee delimiter
        marqueePosition = pos;
        firstValidPosition = pos - 1;  // Everything below Marquee is valid content
        return false; // Stop scanning
      }
      return true; // Continue scanning downward
    }
  });

  return {
    firstValidRotation: firstValidPosition,
    marqueeRotation: marqueePosition,
    isFinalTwist
  };
};

/**
 * ═══════════════════════════════════════════════════════════════════════════
 * DUAL-BUFFER MARQUEE COORDINATION (ConferBidirectionally)
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
 * ConferBidirectionally - Conference TWO buffers to find combined Marquee states
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
 * const conferredState = ConferBidirectionally(bufferA, bufferB);
 * // conferredState.sharedValidRotation = 8 (rightmost Marquee position)
 * // conferredState.exactEven = false (5 ≠ 8, marquees shifted)
 * // Positions 1-5: Both buffers valid (shared zone)
 * // Positions 6-8: Only Buffer B valid (exclusive zone)
 */
export const ConferBidirectionally = (
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
