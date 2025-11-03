/**
 * Round8 Model File - Universal Mathematical Foundation Library
 *
 * Base-72 counting system with 11 columns (72^11 theoretical range)
 * Inverted sign convention: Sign=0 (negative trajectory), Sign=1 (positive trajectory)
 *
 * Higher-Order Data Structure:
 *   - Lower Tier: Round8Buffer (method of interaction - buffer operations)
 *   - Higher Tier: Round8Value (utilization interface - immutable values)
 *
 * v0.0.1 Limitation: JavaScript safe integer range (±2^53 - 1)
 * Future: Full 72^11 range via BigInt (v0.2.0+)
 *
 * @module Round8
 * @version 0.0.1
 */

import {
  Round8Buffer,
  Round8Error,
  Round8ErrorCode,
  RotationOperations,
  SpecialPatterns,
  IncrementOperations,
  ConversionOperations,
  ArithmeticOperations,
  ComparisonOperations,
  ValidationOperations,
  Round8Constants,
} from './Round8Buffer.model';

/**
 * Round8Value - Immutable representation of a Round8 number
 *
 * Properties expose both Round8 string representation and decimal equivalent
 * for seamless JavaScript interop while maintaining mathematical precision.
 *
 * This is the Higher-Order tier - users interact with values, never buffers.
 */
export type Round8Value = {
  /** Round8 string representation with comma formatting (e.g., "88,88") */
  readonly value: string;

  /** Round8 string without commas (e.g., "8888") */
  readonly valueRaw: string;

  /** Decimal equivalent (JavaScript safe integer range: ±2^53-1) */
  readonly decimal: number;

  /** True if Sign=1 (positive trajectory) */
  readonly isPositive: boolean;

  /** True if Sign=0 AND not zero (negative trajectory) */
  readonly isNegative: boolean;

  /** True if value is zero (0 000...000) */
  readonly isZero: boolean;

  /** True if value is -1 (0 111...111 reserved pattern) */
  readonly isNegativeOne: boolean;
};

/**
 * Re-export types from Round8Buffer for external use
 */
export { Round8Error, Round8ErrorCode };

/**
 * Internal helper: Create Round8Value from Round8Buffer
 *
 * This is the BOUNDARY between buffer tier and value tier.
 * Users never call this - it's the bridge between tiers.
 *
 * @internal
 */
function createRound8ValueFromBuffer(buffer: Round8Buffer): Round8Value {
  // Extract decimal representation
  const decimal = ConversionOperations.round8BufferToDecimal(buffer);

  // Extract string representations
  const value = ConversionOperations.round8BufferToString(buffer, true);  // with commas
  const valueRaw = ConversionOperations.round8BufferToString(buffer, false); // without commas

  // Extract sign
  const sign = RotationOperations.getSignBit(buffer);

  // Determine special cases
  const isZero = SpecialPatterns.isBufferZero(buffer);
  const isNegativeOne = SpecialPatterns.isBufferNegativeOne(buffer);
  const isPositive = sign === 1 && !isZero;
  const isNegative = sign === 0 && !isZero && !isNegativeOne;

  return {
    value,
    valueRaw,
    decimal,
    isPositive,
    isNegative,
    isZero,
    isNegativeOne,
  };
}

/**
 * Round8 - Main namespace for Round8 operations
 *
 * All methods are static. No instance creation required.
 * All arithmetic operations are immutable (return new values).
 *
 * Higher-Order API: Users work with Round8Value, never with buffers.
 */
export const Round8 = {
  /**
   * Create Round8Value from decimal number
   *
   * @param decimal - JavaScript number (must be safe integer: ±2^53-1)
   * @returns Immutable Round8Value
   * @throws {Round8Error} OUT_OF_SAFE_INTEGER_RANGE if decimal exceeds safe range
   *
   * @example
   * const fourteen = Round8.from(14);
   * console.log(fourteen.value);     // "16"
   * console.log(fourteen.decimal);   // 14
   */
  from(decimal: number): Round8Value {
    // Validate at value boundary
    if (!Number.isSafeInteger(decimal)) {
      throw new Round8Error(
        Round8ErrorCode.OUT_OF_SAFE_INTEGER_RANGE,
        `Decimal value ${decimal} exceeds JavaScript safe integer range`,
        { decimal }
      );
    }

    // Create buffer (lower tier)
    const buffer = ConversionOperations.decimalToRound8Buffer(decimal);

    // Wrap in value (higher tier)
    return createRound8ValueFromBuffer(buffer);
  },

  /**
   * Parse Round8 string to Round8Value
   *
   * @param round8String - Round8 representation (with or without commas)
   * @returns Immutable Round8Value
   * @throws {Round8Error} INVALID_STRING if string doesn't match Round8 format
   *
   * @example
   * const value = Round8.parse('88,88');
   * console.log(value.decimal);  // 4680
   */
  parse(round8String: string): Round8Value {
    // Validate at value boundary
    if (!ValidationOperations.validateRound8String(round8String)) {
      throw new Round8Error(
        Round8ErrorCode.INVALID_STRING,
        `Invalid Round8 string format: "${round8String}"`,
        { input: round8String }
      );
    }

    // Create buffer (lower tier)
    const buffer = ConversionOperations.round8StringToBuffer(round8String);

    // Wrap in value (higher tier)
    return createRound8ValueFromBuffer(buffer);
  },

  /**
   * Zero constant (0 000...000)
   *
   * @returns Round8Value representing zero
   *
   * @example
   * const zero = Round8.zero();
   * console.log(zero.isZero);    // true
   * console.log(zero.value);     // "0"
   */
  zero(): Round8Value {
    const buffer = new Round8Buffer();
    SpecialPatterns.encodeZeroToBuffer(buffer);
    return createRound8ValueFromBuffer(buffer);
  },

  /**
   * Negative One constant (0 111...111 reserved pattern)
   *
   * Note: This is the maximum negative bit pattern, reserved for -1.
   * Negative counting proceeds: 0, -2, -3, ..., then -1 at maximum.
   *
   * @returns Round8Value representing -1
   *
   * @example
   * const negOne = Round8.negativeOne();
   * console.log(negOne.isNegativeOne);  // true
   * console.log(negOne.decimal);        // -1
   */
  negativeOne(): Round8Value {
    const buffer = new Round8Buffer();
    SpecialPatterns.encodeNegativeOneToBuffer(buffer);
    return createRound8ValueFromBuffer(buffer);
  },

  /**
   * Add two Round8 values
   *
   * @param a - First operand
   * @param b - Second operand
   * @returns New Round8Value (immutable operation)
   * @throws {Round8Error} OUT_OF_SAFE_INTEGER_RANGE if result exceeds safe range
   *
   * @example
   * const eight = Round8.from(8);
   * const one = Round8.from(1);
   * const result = Round8.add(eight, one);
   * console.log(result.value);    // "11" (carry to next position)
   * console.log(result.decimal);  // 9
   */
  add(a: Round8Value, b: Round8Value): Round8Value {
    // Create buffers from values
    const bufferA = ConversionOperations.decimalToRound8Buffer(a.decimal);
    const bufferB = ConversionOperations.decimalToRound8Buffer(b.decimal);

    // Perform buffer operation (lower tier)
    const resultBuffer = ArithmeticOperations.addRound8Buffers(bufferA, bufferB);

    // Wrap in new value (higher tier)
    return createRound8ValueFromBuffer(resultBuffer);
  },

  /**
   * Subtract b from a
   *
   * @param a - Minuend
   * @param b - Subtrahend
   * @returns New Round8Value (immutable operation)
   * @throws {Round8Error} OUT_OF_SAFE_INTEGER_RANGE if result exceeds safe range
   *
   * @example
   * const eightyEight = Round8.parse('88');
   * const eight = Round8.from(8);
   * const result = Round8.subtract(eightyEight, eight);
   * console.log(result.value);    // "78"
   * console.log(result.decimal);  // 64
   */
  subtract(a: Round8Value, b: Round8Value): Round8Value {
    const bufferA = ConversionOperations.decimalToRound8Buffer(a.decimal);
    const bufferB = ConversionOperations.decimalToRound8Buffer(b.decimal);

    const resultBuffer = ArithmeticOperations.subtractRound8Buffers(bufferA, bufferB);

    return createRound8ValueFromBuffer(resultBuffer);
  },

  /**
   * Multiply two Round8 values
   *
   * @param a - First factor
   * @param b - Second factor
   * @returns New Round8Value (immutable operation)
   * @throws {Round8Error} OUT_OF_SAFE_INTEGER_RANGE if result exceeds safe range
   *
   * @example
   * const seven = Round8.from(7);
   * const two = Round8.from(2);
   * const result = Round8.multiply(seven, two);
   * console.log(result.value);    // "16" (critical proof: 7×2=14 decimal)
   * console.log(result.decimal);  // 14
   */
  multiply(a: Round8Value, b: Round8Value): Round8Value {
    const bufferA = ConversionOperations.decimalToRound8Buffer(a.decimal);
    const bufferB = ConversionOperations.decimalToRound8Buffer(b.decimal);

    const resultBuffer = ArithmeticOperations.multiplyRound8Buffers(bufferA, bufferB);

    return createRound8ValueFromBuffer(resultBuffer);
  },

  /**
   * Divide a by b (floor division)
   *
   * @param dividend - Value to be divided
   * @param divisor - Value to divide by
   * @returns New Round8Value (immutable operation)
   * @throws {Round8Error} DIVISION_BY_ZERO if divisor is zero
   * @throws {Round8Error} OUT_OF_SAFE_INTEGER_RANGE if result exceeds safe range
   *
   * @example
   * const sixteen = Round8.parse('16');
   * const two = Round8.from(2);
   * const result = Round8.divide(sixteen, two);
   * console.log(result.value);    // "8"
   * console.log(result.decimal);  // 8
   */
  divide(dividend: Round8Value, divisor: Round8Value): Round8Value {
    // Check division by zero at value level
    if (divisor.isZero) {
      throw new Round8Error(
        Round8ErrorCode.DIVISION_BY_ZERO,
        'Cannot divide by zero',
        { dividend: dividend.value, divisor: divisor.value }
      );
    }

    const bufferDividend = ConversionOperations.decimalToRound8Buffer(dividend.decimal);
    const bufferDivisor = ConversionOperations.decimalToRound8Buffer(divisor.decimal);

    const resultBuffer = ArithmeticOperations.divideRound8Buffers(bufferDividend, bufferDivisor);

    return createRound8ValueFromBuffer(resultBuffer);
  },

  /**
   * Compare two Round8 values
   *
   * @param a - First value
   * @param b - Second value
   * @returns -1 if a < b, 0 if a === b, 1 if a > b
   *
   * @example
   * const ten = Round8.from(10);
   * const five = Round8.from(5);
   *
   * console.log(Round8.compare(ten, five));   // 1 (ten > five)
   * console.log(Round8.compare(five, ten));   // -1 (five < ten)
   * console.log(Round8.compare(ten, ten));    // 0 (ten === ten)
   */
  compare(a: Round8Value, b: Round8Value): -1 | 0 | 1 {
    const bufferA = ConversionOperations.decimalToRound8Buffer(a.decimal);
    const bufferB = ConversionOperations.decimalToRound8Buffer(b.decimal);

    return ComparisonOperations.compareRound8Buffers(bufferA, bufferB);
  },

  /**
   * Check equality of two Round8 values
   *
   * @param a - First value
   * @param b - Second value
   * @returns True if values are equal
   *
   * @example
   * const fourteenFromDecimal = Round8.from(14);
   * const fourteenFromString = Round8.parse('16');
   *
   * console.log(Round8.equals(fourteenFromDecimal, fourteenFromString));  // true
   */
  equals(a: Round8Value, b: Round8Value): boolean {
    return this.compare(a, b) === 0;
  },

  /**
   * Get minimum value (comparison utility)
   *
   * @param a - First value
   * @param b - Second value
   * @returns The smaller of the two values
   *
   * @example
   * const ten = Round8.from(10);
   * const five = Round8.from(5);
   * const min = Round8.min(ten, five);
   * console.log(min.decimal);  // 5
   */
  min(a: Round8Value, b: Round8Value): Round8Value {
    return this.compare(a, b) <= 0 ? a : b;
  },

  /**
   * Get maximum value (comparison utility)
   *
   * @param a - First value
   * @param b - Second value
   * @returns The larger of the two values
   *
   * @example
   * const ten = Round8.from(10);
   * const five = Round8.from(5);
   * const max = Round8.max(ten, five);
   * console.log(max.decimal);  // 10
   */
  max(a: Round8Value, b: Round8Value): Round8Value {
    return this.compare(a, b) >= 0 ? a : b;
  },

  /**
   * Absolute value (remove negative trajectory sign)
   *
   * @param value - Input value
   * @returns New Round8Value with positive trajectory
   *
   * @example
   * const negTwo = Round8.from(-2);
   * const absValue = Round8.abs(negTwo);
   * console.log(absValue.decimal);     // 2
   * console.log(absValue.isPositive);  // true
   */
  abs(value: Round8Value): Round8Value {
    // If already positive or zero, return same instance (immutability optimization)
    if (value.isPositive || value.isZero) {
      return value;
    }

    // Negate to make positive
    return this.negate(value);
  },

  /**
   * Negate value (flip trajectory sign)
   *
   * @param value - Input value
   * @returns New Round8Value with opposite trajectory
   *
   * @example
   * const five = Round8.from(5);
   * const negFive = Round8.negate(five);
   * console.log(negFive.decimal);     // -5
   * console.log(negFive.isNegative);  // true
   */
  negate(value: Round8Value): Round8Value {
    // Zero negates to zero, return same instance (immutability optimization)
    if (value.isZero) {
      return value;
    }

    // Negate decimal and create new value
    const negatedDecimal = -value.decimal;
    return this.from(negatedDecimal);
  },

  /**
   * Increment by 1
   *
   * @param value - Input value
   * @returns New Round8Value incremented by 1
   * @throws {Round8Error} NEGATIVE_ONE_ARITHMETIC if value is reserved -1 pattern
   * @throws {Round8Error} OUT_OF_SAFE_INTEGER_RANGE if result exceeds safe range
   *
   * @example
   * const eight = Round8.from(8);
   * const nine = Round8.increment(eight);
   * console.log(nine.value);    // "11" (carry occurs)
   * console.log(nine.decimal);  // 9
   */
  increment(value: Round8Value): Round8Value {
    // Check for negative one (reserved pattern)
    if (value.isNegativeOne) {
      throw new Round8Error(
        Round8ErrorCode.NEGATIVE_ONE_ARITHMETIC,
        'Cannot increment reserved negative one pattern',
        { value: value.value }
      );
    }

    // Create buffer and increment
    const buffer = ConversionOperations.decimalToRound8Buffer(value.decimal);
    IncrementOperations.incrementRound8Buffer(buffer); // Mutates buffer

    return createRound8ValueFromBuffer(buffer);
  },

  /**
   * Decrement by 1
   *
   * @param value - Input value
   * @returns New Round8Value decremented by 1
   * @throws {Round8Error} OUT_OF_SAFE_INTEGER_RANGE if result exceeds safe range
   *
   * @example
   * const eleven = Round8.parse('11');
   * const ten = Round8.decrement(eleven);
   * console.log(ten.value);    // "8" (borrow occurs)
   * console.log(ten.decimal);  // 8
   */
  decrement(value: Round8Value): Round8Value {
    // Check for zero
    if (value.isZero) {
      throw new Round8Error(
        Round8ErrorCode.OUT_OF_SAFE_INTEGER_RANGE,
        'Cannot decrement zero',
        { value: value.value }
      );
    }

    // Create buffer and decrement
    const buffer = ConversionOperations.decimalToRound8Buffer(value.decimal);
    IncrementOperations.decrementRound8Buffer(buffer); // Mutates buffer

    return createRound8ValueFromBuffer(buffer);
  },

  /**
   * Check if value is within JavaScript safe integer range
   *
   * @param decimal - Decimal value to check
   * @returns True if value is safe integer
   *
   * @example
   * console.log(Round8.isSafeInteger(100));                    // true
   * console.log(Round8.isSafeInteger(Number.MAX_SAFE_INTEGER)); // true
   * console.log(Round8.isSafeInteger(Number.MAX_SAFE_INTEGER + 1)); // false
   */
  isSafeInteger(decimal: number): boolean {
    return ValidationOperations.isDecimalSafeInteger(decimal);
  },

  /**
   * Get theoretical maximum Round8 value (72^11)
   *
   * Note: This exceeds JavaScript safe integer range.
   * Returned as BigInt for precision.
   *
   * @returns Theoretical maximum as BigInt
   *
   * @example
   * const max = Round8.getTheoreticalMax();
   * console.log(max);  // 269561249469362614528n
   */
  getTheoreticalMax(): bigint {
    return Round8Constants.THEORETICAL_MAX;
  },

  /**
   * Get implementation limit for v0.0.1 (JavaScript safe integer)
   *
   * @returns Maximum decimal value supported in v0.0.1
   *
   * @example
   * const limit = Round8.getImplementationLimit();
   * console.log(limit);  // 9007199254740991 (2^53 - 1)
   */
  getImplementationLimit(): number {
    return Round8Constants.IMPLEMENTATION_LIMIT;
  },
};

/**
 * Export type for the Round8 namespace
 * Enables type-safe usage in TypeScript projects
 */
export type Round8Type = typeof Round8;
