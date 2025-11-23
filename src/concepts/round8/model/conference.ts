/* eslint-disable complexity */
/**
 * Round8 Conference Layer - Marquee-Aware Parsing Functions
 *
 * This layer coordinates between BidirectionalConference (Marquee detection)
 * and Terminology (scan/extraction functions) to provide parsing with delimiter awareness.
 *
 * Key Principle: Marquee positions (000 holding states) are DELIMITERS, not content.
 * - downwardScan (BidirectionalConference) establishes boundary
 * - upwardScan respects that boundary for content extraction
 *
 * Functions moved from Round8.terminology.ts and renewed with Marquee awareness:
 * - getWrungStringRepresentation: Parse buffer to string (excludes Marquee delimiters)
 * - getWrungNumberRepresentation: Parse buffer to decimal number
 * - getFormattedColumnarWrungRepresentation: Format buffer as columnar display
 */

import {
  BidirectionalConference,
  type WrungMuxity
} from './bidirectional';

import {
  scanUpward,
  getRotationString,
  type Positions,
  getSignBit,
  applyMarqueeAtPosition,
  getShiftedRotationString,
  extractBitTuple,
  applyShiftedNumeralRotation
} from './terminology';

/**
 * getWrungStringRepresentation - Bidirectional Display Generator [Muxity: 7]
 *
 * Converts binary buffer to Round8 string representation
 *
 * ALGORITHM PHASES:
 * 1. BidirectionalConference determines boundaries
 * 2. Scan positions, apply frame-specific lookups
 * 3. Position 21: Use shifted spool (identity)
 * 4. Positions 1-20: Use regular spool (bias)
 *
 * TESTABLE: Parse(Display(X)) = X for all valid X
 */
export const getWrungStringRepresentation = (buffer: bigint): string => {
  // Step 1: Determine Marquee delimiter via BidirectionalConference
  const marqueeState = BidirectionalConference(buffer);

  // Special case: Absolute Zero (all positions 000)
  if (marqueeState.isAbsoluteZero) {
    return '0';
  }
  if (marqueeState.isFinalTwist) {
    if (marqueeState.isNegative) {
      return '-711111111111111111111';
    } else {
      return '711111111111111111111';
    }
  }

  // Normal case: Scan from Position 1 up to Marquee delimiter
  const firstValid = marqueeState.firstValidRotation ?? 1;
  let result = '';
  // Step 2: Scan upward from Position 1, halt at Marquee delimiter
  scanUpward(buffer, (buf, pos) => {
    // Halt at Marquee delimiter (don't include Marquee holding position)
    if (pos > firstValid) {
      return false; // Stop scanning
    }
    // Accumulate string representation for valid position
    if (pos !== 21) {
      const rotationString = getRotationString(buf, pos);
      result += rotationString;
    } else {
      const rotationString = getShiftedRotationString(buf, pos);
      result += rotationString;
    }
    return true; // Continue scanning
  });
  return (marqueeState.isNegative ? '-' : '') + result.split('').reverse().join('');
};

/**
 * getWrungNumberRepresentation - Parse buffer to decimal number representation
 *
 * Composes on Marquee-aware getWrungStringRepresentation.
 * Marquee awareness inherited through composition.
 *
 * Note: Decimal count differs from Round8 count due to base conversion.
 * Structure reflects Round8 base even though decimal representation.
 *
 * @param buffer - BigInt buffer to parse
 * @returns Decimal number representation
 */
export const getWrungNumberRepresentation = (buffer: bigint): number => {
  // Compositional: Get Marquee-aware string representation
  const stringRep = getWrungStringRepresentation(buffer);
  // Convert to decimal number
  return Number(stringRep);
};

/**
 * getFormattedColumnarWrungRepresentation - Format buffer as columnar display
 *
 * Composes on Marquee-aware getWrungStringRepresentation.
 * Marquee awareness inherited through composition.
 *
 * Groups rotations into columns (pairs) separated by commas.
 * Visual metaphor: Reading left-to-right descends from expansion toward origin.
 *
 * Examples:
 *   1 rotation:  "8"        (single rotation, no column)
 *   2 rotations: "88"       (one column, no comma needed)
 *   3 rotations: "8,88"     (newest rotation + column, 1 comma)
 *   4 rotations: "88,88"    (two columns, 1 comma)
 *   5 rotations: "8,88,88"  (newest rotation + two columns, 2 commas)
 *  21 rotations: "8,88,88,88,88,88,88,88,88,88,88" (capstone + ten columns)
 *
 * @param buffer - BigInt buffer to format
 * @returns Comma-separated columnar representation (expansion→origin, left→right)
 */
export const getFormattedColumnarWrungRepresentation = (buffer: bigint): string => {
  // Compositional: Get Marquee-aware base string
  const beforeString = getWrungStringRepresentation(buffer);

  // Handle special cases (empty or single character)
  if (beforeString.length === 0) {
    return '0';
  }
  if (beforeString.length === 1) {
    return beforeString;
  }
  const isNegative = beforeString.charAt(0) === '-';  // Group into pairs, handling odd-length strings
  const afterString = isNegative ?
    beforeString.slice(1)
    :
    beforeString;

  // If odd length, the FIRST (oldest) digit gets its own column
  const columns: string[] = [];
  const isOdd = afterString.length % 2 === 1;
  let startIndex = 0;

  // If odd length, first column is single digit
  if (isOdd) {
    columns.push(afterString[0]);
    startIndex = 1;
  }

  // Group remaining digits into pairs
  for (let i = startIndex; i < afterString.length; i += 2) {
    const column = afterString.slice(i, i + 2);
    columns.push(column);
  }

  // Join with commas to separate columnar tiers
  const result = columns.join(',');
  return (isNegative ? '-' : '') + result;
};

/**
 * createFormattedRound8BinaryString - Display Round8 buffer as formatted binary string
 *
 * Formats bigint buffer into human-readable binary representation for debugging/display.
 *
 * **Orientation**: Left (Upward/Expansion) → Right (Downward/Origin)
 * ```
 * Sign | Position 21 | Position 20 | ... | Position 2 | Position 1
 *  ^      ^upward (expansion)          ^downward      ^origin
 * ```
 *
 * **Display Structure**:
 * - Sign bit: 1 (positive) or 0 (negative) - leftmost
 * - Each position: 3 bits (MSB to LSB: b2 b1 b0)
 * - Separator: ' | ' between each segment
 *
 * **Examples**:
 * - Positive One (17n): `1 | 000 | 000 | ... | 001 | 000`
 *   - Sign=1, Position 2 has Marquee (001), Position 1 has Symbol '1' (000)
 * - Negative One (16n): `0 | 000 | 000 | ... | 001 | 000`
 *   - Sign=0, Position 2 has Marquee (001), Position 1 has Symbol '1' (000)
 * - Absolute Zero (0n): `0 | 000 | 000 | ... | 000 | 000`
 *   - Sign=0, all positions 000
 * - Positive Twist: `1 | 000 | 111 | ... | 111 | 111`
 *   - Sign=1, Position 21=000 (Final Twist), Positions 1-20 all 111
 *
 * **Display Only**: NOT for parsing back to BigInt
 * **Zero-Allocation**: Uses extractBitTuple with pre-computed masks
 *
 * @param buffer - Round8 BigInt buffer (Sign-at-Origin)
 * @returns Formatted binary string with '|' separators (22 segments: sign + 21 positions)
 *
 * @example
 * const buffer = parseStringToRound8("1");
 * const binaryDisplay = createFormattedRound8BinaryString(buffer);
 * // Returns: "1 | 000 | 000 | 000 | ... | 001 | 000"
 * // (Sign=1, Position 2 Marquee, Position 1 Symbol '1')
 */
export const createFormattedRound8BinaryString = (buffer: bigint): string => {
  // Extract sign bit (bit 0)
  const signBit = getSignBit(buffer);

  // Build position strings from 21 (expansion) down to 1 (origin)
  // Left to Right: High position → Low position
  const positionStrings: string[] = [];

  for (let pos = 21; pos >= 1; pos--) {
    const [b0, b1, b2] = extractBitTuple(buffer, pos as Positions);

    // Display as MSB to LSB: b2 b1 b0
    // Example: Marquee (001) = b0=1, b1=0, b2=0 → displays as "001"
    const binaryString = `${b2}${b1}${b0}`;
    positionStrings.push(binaryString);
  }

  // Combine: Sign | P21 | P20 | ... | P2 | P1
  return `${positionStrings.join(' | ')} | ${signBit} S`;
};

/**
 * ═══════════════════════════════════════════════════════════════════════════
 * STRING-TO-ROUND8 CONVERSION FUNCTIONS (Bidirectional Transformation)
 * ═══════════════════════════════════════════════════════════════════════════
 *
 * Completes bidirectional transformation: buffer ↔ string
 *
 * Key Principles:
 * - Special case early returns (switch statement routing)
 * - Format normalization (columnar → linear, sign prefix handling)
 * - Length-based Marquee placement
 * - Binary Operand Bias: Symbol - 1 = Rotation Value (1→0, 2→1, ..., 8→7)
 * - Position 21 shifted terminology (excludes 8 at boundary)
 * - Round-trip validation: parseStringToRound8(getWrungStringRepresentation(x)) === x
 *
 * Error Handling Pattern:
 * - Invalid inputs return undefined (not throw)
 * - Comments document invalidated cases
 * - Frontend guarding functions reserved for B Series
 *
 * Round8 Symbol Reality:
 * - Valid counting numerals: 1-8 (not 0-7)
 * - 0 ONLY valid as True Zero special case ("0" input)
 * - 0 appearing in any position is INVALID (undefined return)
 *
 * Implementation informed by Suite 6 Amethyst Strategic Document:
 * A.6.3 String-to-Round8 Conversion Strategy
 */

import {
  applyNumeralRotation,
  clearSignBit,
  setSignBit,
  getRound8Case,
  Round8Cases
} from './terminology';

/**
 * isValidRound8Numeral - Validate Round8 counting numeral (1-8)
 *
 * Round8 uses symbols 1-8 for counting positions.
 * 0 is ONLY valid as special case "0" (True Zero), not in positions.
 *
 * Binary Operand Bias: Symbol - 1 = Rotation Value
 * '1' → rotation 0, '2' → rotation 1, ..., '8' → rotation 7
 *
 * @param char - Character to validate
 * @returns true if char is '1'-'8', false otherwise
 */
const isValidRound8Numeral = (char: string): boolean => {
  return /^[1-8]$/.test(char);
};

/**
 * round8NumeralToRotation - Binary Operand Bias Converter [Muxity: 2]
 * Positions 1-20: Symbol '1'-'8' → Rotation 0-7
 * Formula: rotation = symbol - 1
 * Testable: '1'→0, '2'→1, ..., '8'→7
 */
const round8NumeralToRotation = (numeral: string): number | undefined => {
  const symbolValue = parseInt(numeral, 10);

  // Invalid case: symbol out of range (1-8)
  // Returns undefined to signal invalidated input
  if (symbolValue < 1 || symbolValue > 8) {
    return undefined;
  }

  // Apply Binary Operand Bias offset: symbol - 1 = rotation value
  return symbolValue - 1;
};

/**
 * round8NumeralToShiftedRotation - Position 21 Identity Converter [Muxity: 21]
 *
 * Position 21 ONLY - Identity mapping for shifted frame boundary.
 * Symbol values map directly to rotation values (no offset).
 *
 * MAPPING TABLE:
 * - Symbol '1' → rotation 1 (binary 001)
 * - Symbol '2' → rotation 2 (binary 010)
 * - Symbol '3' → rotation 3 (binary 011)
 * - Symbol '4' → rotation 4 (binary 100)
 * - Symbol '5' → rotation 5 (binary 101)
 * - Symbol '6' → rotation 6 (binary 110)
 * - Symbol '7' → rotation 7 (binary 111)
 * - Symbol '8' → INVALID (boundary limitation)
 *
 * BIDIRECTIONAL INTEGRITY:
 * Parse: Symbol '1' → Rotation 1 → Binary 001
 * Display: Binary 001 → Rotation 1 → Symbol '1'
 * Test verification: parser-position21-trace.test.ts
 *
 * @param numeral - Single character '1'-'7'
 * @returns Rotation value 1-7, or undefined if invalid
 */
const round8NumeralToShiftedRotation = (numeral: string): number | undefined => {
  const symbolValue = parseInt(numeral, 10);

  if (symbolValue < 1 || symbolValue > 7) {
    return undefined;
  }

  return symbolValue;
};

/**
 * handleLengthOne - Single position, no Marquee activation
 *
 * Rule: Only Position 1 set, no Marquee.
 * 2nd Column Activation Rule not yet engaged.
 *
 * Returns undefined if numeral invalid.
 *
 * @param preparedString - Unsigned numeral string (length 1)
 * @param isNegative - Sign determination
 * @returns Round8 bigint buffer, or undefined if invalid
 */
const handleLengthOne = (
  preparedString: string,
  isNegative: boolean
): bigint | undefined => {
  const numeral = preparedString[0];
  // Invalid case: numeral not in valid range (1-8)
  // Returns undefined
  if (!isValidRound8Numeral(numeral)) {
    return undefined;
  }

  // Start with clean buffer (all zeros)
  let buffer = 0n;

  // Set sign bit (Sign-at-Origin: bit 0)
  // Negative = 0, Positive = 1

  buffer = isNegative ? clearSignBit(buffer) : setSignBit(buffer);
  // Apply rotation at Position 1 using terminology
  const rotationValue = round8NumeralToRotation(numeral);

  // Invalid case: rotation mapping failed
  // Returns undefined
  if (rotationValue === undefined) {
    return undefined;
  }
  buffer = applyNumeralRotation(rotationValue, buffer, 1 as Positions);
  buffer = applyMarqueeAtPosition(buffer, 2 as Positions);
  return buffer;
};

/**
 * handleLengthTwo - Activates 2nd Position, Marquee at 3rd
 *
 * Rule: Length 2 activates Positions 1-2, Marquee placement begins at Position 3.
 * 2nd Column Activation Rule: Marquee implicitly at Position 3 (000 default).
 *
 * Returns undefined if any numeral invalid.
 *
 * @param preparedString - Unsigned numeral string (length 2)
 * @param isNegative - Sign determination
 * @returns Round8 bigint buffer, or undefined if invalid
 */
// const handleLengthTwo = (
//   preparedString: string,
//   isNegative: boolean
// ): bigint | undefined => {
//   let buffer = 0n;

//   // Set sign bit
//   buffer = isNegative ? clearSignBit(buffer) : setSignBit(buffer);

//   // Apply Position 1
//   const numeral1 = preparedString[0];

//   // Invalid case: numeral1 not valid Round8 symbol
//   // Returns undefined
//   if (!isValidRound8Numeral(numeral1)) {
//     return undefined;
//   }

//   const rotation1 = round8NumeralToRotation(numeral1);

//   // Invalid case: rotation mapping failed
//   // Returns undefined
//   if (rotation1 === undefined) {
//     return undefined;
//   }

//   buffer = applyNumeralRotation(rotation1, buffer, 1 as Positions);

//   // Apply Position 2
//   const numeral2 = preparedString[1];

//   // Invalid case: numeral2 not valid Round8 symbol
//   // Returns undefined
//   if (!isValidRound8Numeral(numeral2)) {
//     return undefined;
//   }

//   const rotation2 = round8NumeralToRotation(numeral2);

//   // Invalid case: rotation mapping failed
//   // Returns undefined
//   if (rotation2 === undefined) {
//     return undefined;
//   }

//   buffer = applyNumeralRotation(rotation2, buffer, 2 as Positions);

//   // EXPLICITLY set Marquee at Position 3 using NumeralStore.Marquee
//   // 2nd Column Activation Rule: Length 2 activates Position 3 as Marquee delimiter
//   buffer = applyMarqueeAtPosition(buffer, 3 as Positions);

//   return buffer;
// };

/**
 * handleLengthThreeToTwenty - Standard Marquee placement
 *
 * Rule: Marquee placed at next upward position (length + 1).
 * Set each position's rotation value from string numerals.
 *
 * Returns undefined if any numeral invalid.
 *
 * @param preparedString - Unsigned numeral string (length 3-20)
 * @param isNegative - Sign determination
 * @returns Round8 bigint buffer, or undefined if invalid
 */
const handleLengthTwoToTwenty = (
  preparedString: string,
  isNegative: boolean
): bigint | undefined => {
  let buffer = 0n;
  const length = preparedString.length;
  // Set sign bit
  buffer = isNegative ? clearSignBit(buffer) : setSignBit(buffer);

  // Apply rotations for each position
  for (let i = 0; i < length; i++) {
    const numeral = preparedString[i];

    // Invalid case: numeral not valid Round8 symbol (1-8)
    // Returns undefined
    if (!isValidRound8Numeral(numeral)) {
      return undefined;
    }

    const rotation = round8NumeralToRotation(numeral);

    // Invalid case: rotation mapping failed
    // Returns undefined
    if (rotation === undefined) {
      return undefined;
    }

    const position = (i + 1) as Positions; // String index 0 = Position 1

    buffer = applyNumeralRotation(rotation, buffer, position);
  }

  // EXPLICITLY set Marquee at Position (length + 1) using NumeralStore.Marquee
  // Example: Length 5 → Positions 1-5 set, Marquee at Position 6
  const marqueePosition = (length + 1) as Positions;
  buffer = applyMarqueeAtPosition(buffer, marqueePosition);

  return buffer;
};

/**
 * handleLengthTwentyOne - Boundary Frame Parser [Muxity: 21]
 *
 * Special handling for maximum 21-position strings.
 * Positions 1-20 use regular frame, Position 21 uses shifted frame.
 *
 * FRAME DISTRIBUTION:
 * - Positions 1-20: Binary Operand Bias (symbol - 1 = rotation)
 * - Position 21: Identity mapping (symbol = rotation)
 *
 * BOUNDARY CONSTRAINTS:
 * - No Marquee at Position 22 (system boundary)
 * - Symbol '8' invalid at Position 21 (would overflow)
 * - Shifted frame prevents period-finding attacks
 *
 * CRITICAL IMPLEMENTATION:
 * - Line 551: applyShiftedNumeralRotation for position 21
 * - Ensures bidirectional string interchange integrity
 * - Test: parser-position21-trace.test.ts verifies 1-to-1 mapping
 *
 * @param preparedString - Unsigned numeral string (exactly 21 chars)
 * @param isNegative - Sign determination
 * @returns Round8 bigint buffer, or undefined if invalid
 */
const handleLengthTwentyOne = (
  preparedString: string,
  isNegative: boolean
): bigint | undefined => {
  let buffer = 0n;

  // Set sign bit
  buffer = isNegative ? clearSignBit(buffer) : setSignBit(buffer);

  // Apply Positions 1-20 (standard terminology)
  for (let i = 0; i < 20; i++) {
    const numeral = preparedString[i];

    // Invalid case: numeral not valid Round8 symbol
    // Returns undefined
    if (!isValidRound8Numeral(numeral)) {
      return undefined;
    }

    const rotation = round8NumeralToRotation(numeral);

    // Invalid case: rotation mapping failed
    // Returns undefined
    if (rotation === undefined) {
      return undefined;
    }

    const position = (i + 1) as Positions;
    buffer = applyNumeralRotation(rotation, buffer, position);
  }

  // Position 21: Special handling (shifted terminology)
  const position21Numeral = preparedString[20]; // Index 20 = Position 21

  // Invalid case: Position 21 shows '8'
  // Should have been caught in Phase 3 as Full Twist case
  // Returns undefined
  if (position21Numeral === '8') {
    return undefined;
  }

  // Apply shifted frame mapping for Position 21
  // This uses identity mapping (symbol value = rotation value)
  // to ensure correct bidirectional string interchange
  const rotation21 = round8NumeralToShiftedRotation(position21Numeral);

  // Invalid case: shifted rotation mapping failed (symbol out of range 1-7)
  // Returns undefined
  if (rotation21 === undefined) {
    return undefined;
  }

  buffer = applyShiftedNumeralRotation(rotation21, buffer, 21 as Positions);
  // No Marquee at Position 22 (system boundary)
  return buffer;
};

/**
 * parseStringToRound8 - Convert string representation to Round8 bigint buffer
 *
 * Implements bidirectional transformation completing Round8.conference layer.
 *
 * Algorithm Phases:
 * 1. Special Case Early Returns (switch statement routing)
 * 2. Format Normalization (columnar → linear, sign prefix)
 * 3. Length-Based Routing (Marquee placement determination)
 * 4. Position Assignment (apply rotations via terminology)
 * 5. Position 21 Special Handling (shifted terminology)
 *
 * Special Cases:
 * - "0" → ZERO_CASE (Absolute Zero - True Zero)
 * - "-1" → NEGATIVE_1_CASE (Negative One)
 * - Length 21 with '8' at front → POSITIVE_TWIST_CASE or NEGATIVE_TWIST_CASE
 *
 * Invalid Cases (returns undefined):
 * - Empty string
 * - '0' appearing in any position (only valid as standalone "0")
 * - Any character not in range 1-8
 * - Length > 21
 * - Position 21 showing '8' (without Full Twist detection)
 *
 * Round8 Symbol Reality:
 * - Valid counting numerals: 1-8 (Binary Operand Bias: symbol - 1 = rotation)
 * - 0 ONLY valid as True Zero ("0" input), NOT in counting positions
 *
 * @param input - String representation (may include commas, sign prefix)
 * @returns Round8 bigint buffer (Sign-at-Origin), or undefined if invalid
 *
 * @example
 * parseStringToRound8("0") → ZERO_CASE
 * parseStringToRound8("-1") → NEGATIVE_1_CASE
 * parseStringToRound8("12345") → Buffer with Positions 1-5 set, Marquee at 6
 * parseStringToRound8("8,88,88") → Same as "88888" (normalized)
 * parseStringToRound8("102") → undefined (0 invalid in positions)
 * parseStringToRound8("abc") → undefined (non-numeric characters)
 */
export const parseStringToRound8 = (input: string): bigint | undefined => {
  // Phase 1: Special Case Early Returns (switch statement)
  // Special Case 1: Absolute Zero (True Zero)
  if (input === '0') {
    return getRound8Case(Round8Cases.ZERO_CASE);
  }

  // Phase 2: Format Normalization
  let preparedString = input;
  let isNegative = false;

  // Step 2.1: Normalize columnar format (if commas present)
  if (preparedString.includes(',')) {
    // Split by comma
    const parts = preparedString.split(',');

    // Reverse parts (display format expansion→origin becomes origin→expansion)
    // parts.reverse();

    // Rejoin without commas for processing
    preparedString = parts.join('');
  }

  // Step 2.2: Check for negative sign prefix
  if (preparedString.startsWith('-')) {
    isNegative = true;
    // Splice off '-' prefix
    preparedString = preparedString.slice(1);
  }

  if (preparedString === '711111111111111111111') {
    return getRound8Case(
      isNegative ?
        Round8Cases.NEGATIVE_TWIST_CASE
        :
        Round8Cases.POSITIVE_TWIST_CASE
    );
  } else if (preparedString.length === 21 && preparedString.charAt(0) === '7') {
    return getRound8Case(
      isNegative ?
        Round8Cases.NEGATIVE_TWIST_CASE
        :
        Round8Cases.POSITIVE_TWIST_CASE
    );
  }

  // Invalid case: empty string after normalization
  // Returns undefined
  if (preparedString.length === 0) {
    return undefined;
  }

  // Validate that remaining string contains only valid numerals (1-8)
  // Special guard: '0' is invalid in positions (only valid as True Zero "0")
  for (let i = 0; i < preparedString.length; i++) {
    const char = preparedString[i];

    // Invalid case: '0' appearing in any position
    // 0 is ONLY valid as True Zero special case ("0" input)
    // Returns undefined
    if (char === '0') {
      return undefined;
    }

    // Invalid case: character not in valid Round8 numeral range (1-8)
    // Returns undefined
    if (!isValidRound8Numeral(char)) {
      return undefined;
    }
  }

  // NOTE: NO reversal needed here!
  // User types "123" → preparedString stays "123"
  // handleLengthTwoToTwenty applies digits origin→expansion (position 1←'1', 2←'2', 3←'3')
  // getFormattedColumnarWrungRepresentation reverses for display (shows "123")
  // Input order = Display order (both left-to-right)

  // Phase 3: Length-Based Routing
  const length = preparedString.length;

  // Special Case 3: Full Twist (Length 21 with '8' at front)
  if (length === 21 && preparedString[0] === '8') {
    // Full Twist case - early return based on sign
    if (isNegative) {
      return getRound8Case(Round8Cases.NEGATIVE_TWIST_CASE);
    } else {
      return getRound8Case(Round8Cases.POSITIVE_TWIST_CASE);
    }
  }

  // Invalid case: length exceeds maximum (21 positions)
  // Returns undefined
  if (length > 21) {
    if (isNegative) {
      return getRound8Case(Round8Cases.NEGATIVE_TWIST_CASE);
    } else {
      return getRound8Case(Round8Cases.POSITIVE_TWIST_CASE);
    }
  }
  // Route to length-specific handling
  preparedString = preparedString.split('').reverse().join('');
  if (length === 1) {
    return handleLengthOne(preparedString, isNegative);
  } else if (length >= 2 && length <= 20) {
    return handleLengthTwoToTwenty(preparedString, isNegative);
  } else if (length === 21) {
    return handleLengthTwentyOne(preparedString, isNegative);
  }
  // Fallback: should never reach here due to prior guards
  // Returns undefined for safety
  return undefined;
};

/**
 * parseNumberToRound8 - Convert decimal number to Round8 bigint buffer
 *
 * Compositional: Builds on parseStringToRound8.
 * Converts number → string → Round8 buffer.
 *
 * Note: Decimal representation differs from Round8 count.
 * This function preserves the structural representation.
 *
 * Returns undefined if string representation contains invalid numerals.
 *
 * @param num - Decimal number to convert
 * @returns Round8 bigint buffer, or undefined if invalid
 *
 * @example
 * parseNumberToRound8(0) → ZERO_CASE
 * parseNumberToRound8(-1) → NEGATIVE_1_CASE
 * parseNumberToRound8(12345) → Same as parseStringToRound8("12345")
 * parseNumberToRound8(102) → undefined (0 invalid in positions)
 */
export const parseNumberToRound8 = (num: number): bigint | undefined => {
  // Compositional: Convert to string, then parse
  return parseStringToRound8(String(num));
};
