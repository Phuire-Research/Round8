/**
 * Round8 Bidirectional Conference - Marquee Position Validity Detection
 *
 * Determines the first valid counting position and Marquee state for Round8 buffers.
 * Implements the Bidirectional Marquee Approach with position holding logic.
 */

export type MarqueeState = {
  /** First valid column for counting (0-20), or -1 for absolute zero */
  firstValidColumn: number;

  /** Whether column 0 is in shifted holding state (001) */
  isShiftedHolding: boolean;

  /** Whether column 0 is the final twist case (000 with all others 111) */
  isFinalTwist: boolean;

  /** Whether this buffer represents absolute zero (all positions 000) */
  isAbsoluteZero: boolean;
};

/**
 * BidirectionalConference - Determines Marquee validity for a Round8 buffer
 *
 * Rules for Column 0 (leftmost after sign):
 * 1. If 001: Valid as shifted holding position, count starts here
 * 2. If 000 AND all columns 1-20 are 111: Valid as final twist (maximum boundary)
 * 3. If 000 AND any column 1-20 is NOT 111: Invalid placeholder, skip to next column
 * 4. If 010-111: Valid, count starts here
 *
 * Rules for Columns 1-20:
 * - First non-000 column found (scanning left→right) is the Marquee
 * - All columns from Marquee rightward are valid counting positions
 * - All columns before Marquee are invalid placeholders
 *
 * Position Count Limitation:
 * - We miss ONE positional count to enable this Bidirectional Marquee Approach
 * - Column 0 at 000 is ONLY valid when ALL other columns are 111 (final twist)
 * - Otherwise, column 0 must be 001 or greater to be valid
 *
 * @param buffer - 64-position Uint8Array (sign + 21 columns × 3 bits)
 * @returns MarqueeState describing validity and counting boundaries
 */
export const BidirectionalConference = (buffer: Uint8Array<ArrayBuffer>): MarqueeState => {
  // Check for absolute zero (all positions 1-63 are 000)
  let isAbsoluteZero = true;
  for (let i = 1; i < 64; i++) {
    if (buffer[i] !== 0) {
      isAbsoluteZero = false;
      break;
    }
  }

  if (isAbsoluteZero) {
    return {
      firstValidColumn: -1,
      isShiftedHolding: false,
      isFinalTwist: false,
      isAbsoluteZero: true,
    };
  }

  // Extract column 0 (positions 1, 2, 3)
  const col0_bit2 = buffer[1];
  const col0_bit1 = buffer[2];
  const col0_bit0 = buffer[3];

  // Check if column 0 is 001 (shifted holding position)
  const isCol0_001 = (col0_bit2 === 0 && col0_bit1 === 0 && col0_bit0 === 1);

  // Check if column 0 is 000
  const isCol0_000 = (col0_bit2 === 0 && col0_bit1 === 0 && col0_bit0 === 0);

  // If column 0 is 001: Valid shifted holding position
  if (isCol0_001) {
    return {
      firstValidColumn: 0,
      isShiftedHolding: true,
      isFinalTwist: false,
      isAbsoluteZero: false,
    };
  }

  // If column 0 is 000: Check for final twist case (all columns 1-20 must be 111)
  if (isCol0_000) {
    let allOthers111 = true;

    for (let col = 1; col <= 20; col++) {
      const pos = 1 + (col * 3);
      const bit2 = buffer[pos];
      const bit1 = buffer[pos + 1];
      const bit0 = buffer[pos + 2];

      if (!(bit2 === 1 && bit1 === 1 && bit0 === 1)) {
        allOthers111 = false;
        break;
      }
    }

    if (allOthers111) {
      // Final twist case: 000 111 111 ... 111
      // This is the final 7 we can add to the stack (maximum boundary with 000 wrap)
      return {
        firstValidColumn: 0,
        isShiftedHolding: false,
        isFinalTwist: true,
        isAbsoluteZero: false,
      };
    } else {
      // Column 0 is 000 but not all others are 111
      // This means column 0 is an INVALID placeholder
      // Continue scanning to find first valid column
    }
  }

  // If column 0 is 010-111: Valid counting position
  if (!isCol0_000 && !isCol0_001) {
    return {
      firstValidColumn: 0,
      isShiftedHolding: false,
      isFinalTwist: false,
      isAbsoluteZero: false,
    };
  }

  // Column 0 was invalid placeholder (000 without all 111s)
  // Scan columns 1-20 for first non-000 column
  for (let col = 1; col <= 20; col++) {
    const pos = 1 + (col * 3);
    const bit2 = buffer[pos];
    const bit1 = buffer[pos + 1];
    const bit0 = buffer[pos + 2];

    if (!(bit2 === 0 && bit1 === 0 && bit0 === 0)) {
      // Found first non-000 column
      return {
        firstValidColumn: col,
        isShiftedHolding: false,
        isFinalTwist: false,
        isAbsoluteZero: false,
      };
    }
  }

  // Should never reach here (would have been caught by absolute zero check)
  // But if we do, treat as absolute zero
  return {
    firstValidColumn: -1,
    isShiftedHolding: false,
    isFinalTwist: false,
    isAbsoluteZero: true,
  };
};

/**
 * ConferBidirectionally - Conferences TWO buffers to find combined Marquee state
 *
 * For addition/subtraction, we need to know the leftmost valid position
 * across BOTH operands to determine the processing range.
 *
 * @param wrungA - First operand buffer
 * @param wrungB - Second operand buffer
 * @returns Combined MarqueeState for both operands
 */
export const ConferBidirectionally = (
  wrungA: Uint8Array<ArrayBuffer>,
  wrungB: Uint8Array<ArrayBuffer>
): MarqueeState => {
  const stateA = BidirectionalConference(wrungA);
  const stateB = BidirectionalConference(wrungB);

  // If either is absolute zero, return the other's state
  if (stateA.isAbsoluteZero && stateB.isAbsoluteZero) {
    return stateA; // Both zero
  }
  if (stateA.isAbsoluteZero) {
    return stateB;
  }
  if (stateB.isAbsoluteZero) {
    return stateA;
  }

  // Take the LEFTMOST valid column (minimum of the two)
  const firstValidColumn = Math.min(stateA.firstValidColumn, stateB.firstValidColumn);

  // Shifted holding and final twist only apply if BOTH have same state at column 0
  const isShiftedHolding = (
    firstValidColumn === 0 &&
    stateA.isShiftedHolding &&
    stateB.isShiftedHolding
  );

  const isFinalTwist = (
    firstValidColumn === 0 &&
    stateA.isFinalTwist &&
    stateB.isFinalTwist
  );

  return {
    firstValidColumn,
    isShiftedHolding,
    isFinalTwist,
    isAbsoluteZero: false,
  };
};
