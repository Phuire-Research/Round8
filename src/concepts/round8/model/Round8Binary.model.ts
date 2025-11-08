/**
 * Round8Binary - Pure Binary Operations Module
 *
 * This module provides pure binary operations for Round8 arithmetic
 * without any decimal conversion contamination.
 *
 * ALL operations in this module:
 * - Accept Uint8Array<ArrayBuffer> buffers as input
 * - Return Uint8Array<ArrayBuffer> buffers as output
 * - Use ONLY spool-based lookups (no binary operand calculations)
 * - Validate against Round8.cases.ts SpooledSeries at 100%
 *
 * CRITICAL: Round8 spools are bidirectional operands for 64-bit range.
 * We do NOT use traditional binary operands (shifts, OR) to calculate values.
 * Spools ARE the truth - we index them directly with bit patterns.
 *
 * @version v0.0.11
 * @purpose Binary-First Calculator Implementation
 * @cascade Round8 Strategic Clinical RoadMap (Suites 5-6-7 Full Conference)
 */

import {
  STRING_TO_ROUND8_ROTATION,
  STRING_TO_ROUND8_SHIFTED_ROTATION,
  SPECIAL_CASE_STORE,
  SumWrung,
  DifferenceWrung,
  SpooledRegularStringLookup,
  SpooledShiftedStringLookup
} from './Round8.cases';

// Destructure Twist Cases from SPECIAL_CASE_STORE for convenient access
const { POSITIVE_TWIST_CASE, NEGATIVE_TWIST_CASE } = SPECIAL_CASE_STORE;

import {
  BidirectionalConference,
  ConferBidirectionally,
  MarqueeState,
  ConferredMarqueeState,
  BidirectionalStringConference
} from './Round8.bidirectional';

// ============================================================
// SECTION 0: Local Error Types
// ============================================================

export class Round8Error extends Error {
  code: string;
  constructor(code: string, message: string) {
    super(message);
    this.code = code;
    this.name = 'Round8Error';
  }
}

export const Round8ErrorCode = {
  INVALID_POSITION: 'INVALID_POSITION',
  INVALID_MARQUEE_PLACEMENT: 'INVALID_MARQUEE_PLACEMENT',
  OUT_OF_SAFE_INTEGER_RANGE: 'OUT_OF_SAFE_INTEGER_RANGE'
} as const;

// ============================================================
// SECTION 1: Validation API Exposure (Re-export)
// ============================================================

/**
 * Export BidirectionalConference for developer validation
 *
 * This enables developers to validate Round8 buffers using the same
 * Marquee detection and validation logic we use internally.
 *
 * Key validation capabilities:
 * - Marquee placement validation (position 8)
 * - Full Twist detection
 * - Count maxing verification
 *
 * @see Round8.bidirectional.ts for implementation details
 */
export {
  BidirectionalConference,
  ConferBidirectionally,
  MarqueeState,
  ConferredMarqueeState
};

// ============================================================
// SECTION 2: Display Operations
// ============================================================

/**
 * Display options for binary string formatting
 */
export interface BinaryStringOptions {
  separator?: string;        // Default: "|"
  includeSign?: boolean;     // Default: true
  groupBy?: number;          // Default: 3 (one rotation)
}

/**
 * Convert Round8 buffer to binary string representation (for display only)
 *
 * This function shows raw binary for visualization purposes.
 * It does NOT use binary operands for calculation - just displays bits.
 *
 * @example
 * // Buffer with sign=1, first rotation=[0,0,1], second=[0,1,0]
 * round8BufferToBinaryString(buffer)
 * // Returns: "1|001|010|000|000|..." (sign + 21 rotations)
 *
 * @param buffer - Round8 buffer (64-position Uint8Array)
 * @param options - Display formatting options
 * @returns Binary string representation
 */
export function round8BufferToBinaryString(
  buffer: Uint8Array<ArrayBuffer>,
  options?: BinaryStringOptions
): string {
  const separator = options?.separator ?? '|';
  const includeSign = options?.includeSign ?? true;

  const parts: string[] = [];

  // Extract sign bit (position 0) - display only
  if (includeSign) {
    parts.push(buffer[0].toString());
  }

  // Extract 21 rotations (each 3 bits) - display BACKWARD to match Round8 string order
  // Position 21 (rotation 20) displays FIRST (leftmost/most significant)
  // Position 1 (rotation 0) displays LAST (rightmost/least significant)
  for (let rotationIndex = 20; rotationIndex >= 0; rotationIndex-- ) {
    const startPos = 1 + (rotationIndex * 3);
    const bit2 = buffer[startPos];
    const bit1 = buffer[startPos + 1];
    const bit0 = buffer[startPos + 2];

    // Just display the bits as string, no operand calculation
    parts.push(`${bit2}${bit1}${bit0}`);
  }

  return parts.join(separator);
}

/**
 * Convert Round8 display position (1-8) to 3-bit binary representation
 *
 * @example
 * round8PositionToBinary(1) // Returns: Uint8Array([0,0,0]) - Binary 000
 * round8PositionToBinary(5) // Returns: Uint8Array([1,0,0]) - Binary 100
 * round8PositionToBinary(8) // Returns: Uint8Array([1,1,1]) - Binary 111 (Marquee)
 *
 * @param position - Display position (1-8)
 * @returns 3-bit binary representation
 * @throws Round8Error if position is invalid
 */
export function round8PositionToBinary(position: number): Uint8Array {
  // Validate position
  if (!Number.isInteger(position) || position < 1 || position > 8) {
    throw new Round8Error(
      Round8ErrorCode.INVALID_POSITION,
      `Position must be integer 1-8, got: ${position}`
    );
  }

  // Lookup from STRING_TO_ROUND8_ROTATION
  const positionString = position.toString();
  const binary = STRING_TO_ROUND8_ROTATION[positionString];

  if (!binary) {
    throw new Round8Error(
      Round8ErrorCode.INVALID_POSITION,
      `No binary mapping for position: ${position}`
    );
  }

  // Return copy (immutability)
  return Uint8Array.from(binary);
}

/**
 * Convert Round8 buffer to Round8 string (display format) using String Lookup Spools
 *
 * Pure indexed lookup using SpooledRegularStringLookup and SpooledShiftedStringLookup
 * NO binary operands used for calculation - spools ARE the truth
 *
 * @param buffer - Round8 buffer (64-position Uint8Array)
 * @param includeCommas - Whether to include comma separators
 * @returns Round8 string (e.g., "1,2,3" or "123")
 */
// eslint-disable-next-line complexity
export function round8BufferToString(buffer: Uint8Array<ArrayBuffer>, includeCommas = true): string {
  // Check for special cases via BidirectionalConference
  const marqueeState = BidirectionalConference(buffer);

  if (marqueeState.isAbsoluteZero) {
    return '0';
  }

  // Find range of non-zero rotations
  let lowestRotation = -1;
  let highestRotation = -1;

  for (let rotationIndex = 0; rotationIndex <= 20; rotationIndex++) {
    // INVERTED: Match input function - Rotation 0 at buffer[61-63], Rotation 20 at buffer[1-3]
    const startPos = 1 + ((20 - rotationIndex) * 3);
    const bit2 = buffer[startPos];
    const bit1 = buffer[startPos + 1];
    const bit0 = buffer[startPos + 2];

    if (bit2 !== 0 || bit1 !== 0 || bit0 !== 0) {
      if (lowestRotation === -1) {
        lowestRotation = rotationIndex;
      }
      highestRotation = rotationIndex;
    }
  }

  if (highestRotation === -1) {
    return '0';
  }

  const parts: string[] = [];

  // Count total non-zero positions to determine if we're at 21 positions
  const totalPositions = highestRotation - lowestRotation + 1;

  // Output from HIGHEST to LOWEST rotation (Position 1→21, right to left build)
  // This gives us the correct display order: Position 21 leftmost, Position 1 rightmost
  for (let rotationIndex = highestRotation; rotationIndex >= lowestRotation; rotationIndex--) {
    // INVERTED: Match input function - Rotation 0 at buffer[61-63], Rotation 20 at buffer[1-3]
    const startPos = 1 + ((20 - rotationIndex) * 3);
    const bit2 = buffer[startPos];
    const bit1 = buffer[startPos + 1];
    const bit0 = buffer[startPos + 2];

    // Use appropriate spool based on position
    // Only use shifted frame at rotation 0 when we have 21 positions
    if (rotationIndex === 0 && totalPositions === 21) {
      // Position 21 uses shifted frame
      const value = SpooledShiftedStringLookup[bit2][bit1][bit0];
      console.log(`DEBUG OUTPUT: rot=${rotationIndex}, bits=[${bit2},${bit1},${bit0}], SHIFTED lookup='${value}'`);
      parts.push(value);
    } else {
      // All other positions use regular frame
      const value = SpooledRegularStringLookup[bit2][bit1][bit0];
      console.log(`DEBUG OUTPUT: rot=${rotationIndex}, bits=[${bit2},${bit1},${bit0}], REGULAR lookup='${value}'`);
      parts.push(value);
    }
  }

  // Handle Marquee placement (binary-only concept, affects output structure)
  if (marqueeState.marqueeRotation !== undefined && marqueeState.marqueeRotation !== null) {
    const marqueeRot = marqueeState.marqueeRotation;

    // Check if Marquee overlaps with existing positions
    if (marqueeRot >= lowestRotation && marqueeRot <= highestRotation) {
      console.log(`DEBUG: Marquee at rotation ${marqueeRot} overlaps with existing content`);
      // Marquee overlaps - this indicates a special state
      // For now, log it - actual handling depends on Round8 spec
    } else {
      console.log(`DEBUG: Marquee at rotation ${marqueeRot} in gap`);
      // Marquee is in a gap - this affects the output structure
      // Binary-only indicator, doesn't appear in string
    }
  }

  // Format with column separators (comma every 2 digits from the right)
  let result = '';
  if (includeCommas && parts.length > 0) {
    // Join all parts first (no commas)
    const fullString = parts.join('');

    // Insert commas every 2 digits from the right
    const chars = fullString.split('');
    result = '';

    for (let i = chars.length - 1; i >= 0; i--) {
      // Add character to front of result
      result = chars[i] + result;

      // Add comma if:
      // - Not at the beginning (i > 0)
      // - We've added 2 digits from the right
      // - And the position from right is divisible by 2
      const positionFromRight = chars.length - i;
      if (i > 0 && positionFromRight % 2 === 0) {
        result = ',' + result;
      }
    }
  } else {
    result = parts.join('');
  }

  // Add sign
  const isNegative = buffer[0] === 0;
  return isNegative ? `-${result}` : result;
}

// ============================================================
// SECTION 3: Buffer Manipulation Operations
// ============================================================

/**
 * Create immutable deep copy of Round8 buffer
 *
 * @param buffer - Source buffer
 * @returns New buffer with copied data
 */
export function cloneRound8Buffer(
  buffer: Uint8Array<ArrayBuffer>
): Uint8Array<ArrayBuffer> {
  const cloned = new Uint8Array(64) as Uint8Array<ArrayBuffer>;
  cloned.set(buffer);
  return cloned;
}

/**
 * Check if two Round8 buffers are equal (byte-by-byte comparison)
 *
 * @param a - First buffer
 * @param b - Second buffer
 * @returns true if buffers are equal, false otherwise
 */
export function areRound8BuffersEqual(
  a: Uint8Array<ArrayBuffer>,
  b: Uint8Array<ArrayBuffer>
): boolean {
  // Quick length check
  if (a.length !== 64 || b.length !== 64) {
    return false;
  }

  // Byte-by-byte comparison
  for (let i = 0; i < 64; i++) {
    if (a[i] !== b[i]) {
      return false;
    }
  }

  return true;
}

/**
 * Parse Round8 string to buffer with Marquee validation
 *
 * Maps display string to buffer using STRING_TO_ROUND8_ROTATION lookup
 * NO operand calculation - pure lookup
 *
 * @param round8String - Round8 formatted string (e.g., "1,2,3" or "-123")
 * @returns Round8 buffer
 * @throws Round8Error if string is invalid or Marquee placement incorrect
 */
// eslint-disable-next-line complexity
export function round8StringToBuffer(
  round8String: string
): Uint8Array<ArrayBuffer> {
  // Initialize buffer with all zeros
  const buffer = new Uint8Array(64) as Uint8Array<ArrayBuffer>;
  const marqueeState = BidirectionalStringConference(round8String);
  // Handle empty or "0"
  if (!round8String || round8String === '0') {
    return buffer;
  }
  // Extract sign
  const isNegative = round8String.startsWith('-');
  const numericString = isNegative ? round8String.slice(1) : round8String;

  // Set sign bit (1 = positive, 0 = negative)
  buffer[0] = isNegative ? 0 : 1;

  // Parse digits (remove commas, split into array)
  const digits = numericString.replace(/,/g, '').split('');

  // Validate digit count (maximum 21 positions)
  if (marqueeState.isFinalTwist) {
    // Return CLONED Twist Case based on sign (already extracted above)
    const twistCase = isNegative ? NEGATIVE_TWIST_CASE : POSITIVE_TWIST_CASE;
    console.log('HITTING MAX DIGITS', digits);
    return twistCase.slice() as Uint8Array<ArrayBuffer>;
  }

  // Fill buffer RIGHT to LEFT (Position 1 toward Position 21)
  // Read string left to right, place in positions from high rotation down
  for (let i = 0; i < digits.length; i++) {
    const digit = digits[i];  // Read string left to right
    // Map to rotations: first digit gets rotation (21-length), last gets rotation 20
    const rotationIndex = 20 - (digits.length - 1 - i);
    // Rotation 0 (Position 21) uses SHIFTED FRAME only when we have 21 digits
    if (rotationIndex === 0 && digits.length === 21) {
      // Validate shifted frame digit (0-7)
      const num = parseInt(digit, 10);
      if (isNaN(num) || num < 0) {
        throw new Round8Error(
          Round8ErrorCode.INVALID_POSITION,
          `Invalid digit at position 21 (rotation 0): "${digit}". Must be 0-7 (shifted frame)`
        );
      }

      // FULL TWIST SPECIAL CASE: digit > 7 at position 21 converts to Full Twist
      // Instead of throwing error, present maximum representable value
      if (rotationIndex === 0 && num > 7) {
        // Return CLONED pre-computed Twist Case based on sign
        // CRITICAL: Clone to prevent mutation of reference constants
        const twistCase = isNegative ? NEGATIVE_TWIST_CASE : POSITIVE_TWIST_CASE;
        return twistCase.slice() as Uint8Array<ArrayBuffer>;
      }

      // Normal shifted frame lookup (0-7)
      const binaryPattern = STRING_TO_ROUND8_SHIFTED_ROTATION[digit];

      if (!binaryPattern) {
        throw new Round8Error(
          Round8ErrorCode.INVALID_POSITION,
          `No shifted frame mapping for Marquee digit: ${digit}`
        );
      }

      // Set the 3 bits directly from shifted lookup
      // INVERTED: Rotation 0 goes to buffer[61-63], Rotation 20 to buffer[1-3]
      const startPos = 1 + ((20 - rotationIndex) * 3);
      buffer[startPos] = binaryPattern[0];
      buffer[startPos + 1] = binaryPattern[1];
      buffer[startPos + 2] = binaryPattern[2];
    } else {
      // All other cases use REGULAR FRAME (Positions 1-20, or rotation 0 with <21 digits)
      // Validate regular frame digit (1-8)
      const num = parseInt(digit, 10);
      if (isNaN(num) || num < 1 || num > 8) {
        throw new Round8Error(
          Round8ErrorCode.INVALID_POSITION,
          `Invalid Round8 digit at position ${i + 1} (rotation ${rotationIndex}): "${digit}". Must be 1-8 (regular frame)`
        );
      }

      // Lookup binary pattern from REGULAR FRAME
      const binaryPattern = STRING_TO_ROUND8_ROTATION[digit];

      console.log(
        `DEBUG INPUT: digit='${digit}', rotation=${rotationIndex}, ` +
        `REGULAR lookup=[${binaryPattern ? binaryPattern.join(',') : 'undefined'}]`
      );

      if (!binaryPattern) {
        throw new Round8Error(
          Round8ErrorCode.INVALID_POSITION,
          `No binary mapping for digit: ${digit}`
        );
      }

      // Set the 3 bits directly from regular lookup
      // INVERTED: Rotation 0 goes to buffer[61-63], Rotation 20 to buffer[1-3]
      const startPos = 1 + ((20 - rotationIndex) * 3);
      buffer[startPos] = binaryPattern[0];
      buffer[startPos + 1] = binaryPattern[1];
      buffer[startPos + 2] = binaryPattern[2];
    }
  }

  console.log('HITTING MARQUEE', marqueeState, round8String, buffer[63]);
  if (marqueeState.marqueeRotation) {
    if (marqueeState.marqueeRotation < 64) {
      buffer[marqueeState.marqueeRotation] = 1;
    }
  }
  return buffer;
}

/**
 * Append Round8 position to buffer at specified column (progressive input)
 *
 * Uses STRING_TO_ROUND8_ROTATION lookup - NO operand calculation
 *
 * @param buffer - Current buffer state
 * @param position - Position to append (1-8)
 * @param columnIndex - Column index (0-20, right to left)
 * @returns New buffer with position appended
 * @throws Round8Error if invalid position or column
 */
export function appendRound8Position(
  buffer: Uint8Array<ArrayBuffer>,
  position: number,
  columnIndex: number
): Uint8Array<ArrayBuffer> {
  // Validate columnIndex
  if (!Number.isInteger(columnIndex) || columnIndex < 0 || columnIndex > 20) {
    throw new Round8Error(
      Round8ErrorCode.INVALID_POSITION,
      `Column index must be 0-20, got: ${columnIndex}`
    );
  }

  // Validate position
  if (!Number.isInteger(position) || position < 1 || position > 8) {
    throw new Round8Error(
      Round8ErrorCode.INVALID_POSITION,
      `Position must be 1-8, got: ${position}`
    );
  }

  // Clone buffer (immutability)
  const result = cloneRound8Buffer(buffer);

  // Lookup binary pattern from STRING_TO_ROUND8_ROTATION - NO operand calculation
  const binaryPattern = STRING_TO_ROUND8_ROTATION[position.toString()];

  if (!binaryPattern) {
    throw new Round8Error(
      Round8ErrorCode.INVALID_POSITION,
      `No binary mapping for position: ${position}`
    );
  }

  // Set the 3 bits directly from the lookup
  const startPos = 1 + (columnIndex * 3);
  result[startPos] = binaryPattern[0];
  result[startPos + 1] = binaryPattern[1];
  result[startPos + 2] = binaryPattern[2];

  return result;
}

// ============================================================
// SECTION 4: Binary Arithmetic Operations (Full Option B)
// ============================================================

/**
 * Add two Round8 buffers using validated SumWrung arithmetic
 *
 * Routes to Round8.cases.ts SumWrung() which has been validated by 180 tests.
 *
 * Full Option B Implementation (via SumWrung):
 * - Sign handling (4 cases: pos+pos, pos+neg, neg+pos, neg+neg)
 * - 3-bit columnar addition with carry propagation
 * - Round8 carry rule: sum >= 8 → carry 1, store (sum - 7)
 * - BidirectionalConference for Marquee validation
 * - Overflow detection (carry exceeds 21 rotations)
 * - Edge cases (zero, negative one)
 *
 * @param a - First operand (wrung = 64-position Uint8Array<ArrayBuffer>)
 * @param b - Second operand (wrung = 64-position Uint8Array<ArrayBuffer>)
 * @returns Sum buffer (validated by Round8.cases.ts)
 * @throws Round8Error on overflow or invalid input
 */
export function addRound8BuffersBinary(
  a: Uint8Array<ArrayBuffer>,
  b: Uint8Array<ArrayBuffer>
): Uint8Array<ArrayBuffer> {
  // Route to validated SumWrung operation
  // SumWrung handles all sign cases, carry propagation, and edge cases
  return SumWrung(a, b);
}

/**
 * Subtract two Round8 buffers using validated DifferenceWrung arithmetic
 *
 * Routes to Round8.cases.ts DifferenceWrung() which has been validated by 180 tests.
 *
 * Full Option B Implementation (via DifferenceWrung):
 * - Sign handling (5 cases: pos-pos, pos-neg, neg-pos, neg-neg, equal)
 * - 3-bit columnar subtraction with borrow propagation
 * - Round8 borrow rule: diff < 0 → borrow 1, store (diff + 7)
 * - BidirectionalConference for Marquee validation
 * - Underflow detection (borrow exceeds 21 rotations)
 * - Edge cases (zero, negative one, equality)
 *
 * @param a - Minuend (wrung = 64-position Uint8Array<ArrayBuffer>)
 * @param b - Subtrahend (wrung = 64-position Uint8Array<ArrayBuffer>)
 * @returns Difference buffer (validated by Round8.cases.ts)
 * @throws Round8Error on underflow or invalid input
 */
export function subtractRound8BuffersBinary(
  a: Uint8Array<ArrayBuffer>,
  b: Uint8Array<ArrayBuffer>
): Uint8Array<ArrayBuffer> {
  // Route to validated DifferenceWrung operation
  // DifferenceWrung handles all sign cases, borrow propagation, and edge cases
  return DifferenceWrung(a, b);
}
