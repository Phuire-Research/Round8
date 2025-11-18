/**
 * r8 API Integration Test Suite - v0.0.14 Public API Validation
 *
 * Tests the organized r8_ breadboard API structure:
 * - conference: Display formatting and parsing
 * - operations: Arithmetic operations (muxifyWrung orchestration)
 * - logical: Comparison operators
 * - anor: Magnitude analysis and operation routing
 * - terminology: Low-level primitives
 *
 * Validates that all categories are properly exported and accessible.
 *
 * @version 0.0.14
 */

import { r8_ } from '../index';
import type {
  BitRotationTuple,
  WrungMuxity,
  ResultMuxity
} from '../index';

describe('r8 API - Public Exports', () => {
  test('r8_ is exported and accessible', () => {
    expect(r8_).toBeDefined();
    expect(typeof r8_).toBe('object');
  });

  test('r8_.createCalculator factory is accessible', () => {
    expect(r8_.createCalculator).toBeDefined();
    expect(typeof r8_.createCalculator).toBe('function');

    // Verify it creates calculator instances
    const calc = r8_.createCalculator();
    expect(calc).toBeDefined();
    expect(calc.state).toBeDefined();
    expect(calc.handleIncrement).toBeDefined();
    expect(calc.handleDecrement).toBeDefined();
  });

  test('Critical types are exported', () => {
    // These should be importable without error
    // Type-level validation happens at compile time
    const rotation: BitRotationTuple = [0, 1, 0];
    expect(rotation.length).toBe(3);
  });
});

describe('r8 API - Conference Category', () => {
  test('createRoundDisplay formats buffer to Round8 string', () => {
    const buffer = r8_.parseStringToBuffer('123');
    expect(buffer).not.toBeNull();

    const display = r8_.createRoundDisplay(buffer!);
    // Round8 display format: consecutive digits without commas until columnar separation
    expect(display).toBe('1,23');
  });

  test('createRoundString creates unformatted Round8 string', () => {
    const buffer = r8_.parseStringToBuffer('456');
    expect(buffer).not.toBeNull();

    const str = r8_.createRoundString(buffer!);
    expect(str).toBeTruthy();
  });

  test('parseStringToBuffer converts Round8 string to buffer', () => {
    const buffer = r8_.parseStringToBuffer('78');
    expect(buffer).not.toBeNull();
    expect(typeof buffer).toBe('bigint');
  });

  test('createBufferDisplay formats buffer to binary string', () => {
    const buffer = r8_.parseStringToBuffer('5');
    expect(buffer).not.toBeNull();

    const binary = r8_.createBufferDisplay(buffer!);
    expect(typeof binary).toBe('string');
    expect(binary.length).toBeGreaterThan(0);
  });
});

describe('r8 API - Operations Category', () => {
  test('muxifyWrung is accessible', () => {
    expect(r8_.operations.muxifyWrung).toBeDefined();
    expect(typeof r8_.operations.muxifyWrung).toBe('function');
  });

  test('add operation orchestrates muxifyWrung correctly', () => {
    const a = r8_.parseStringToBuffer('5');
    const b = r8_.parseStringToBuffer('3');
    expect(a).not.toBeNull();
    expect(b).not.toBeNull();

    const result = r8_.operations.add(a!, b!);
    const display = r8_.createRoundDisplay(result);

    expect(display).toBe('8');
  });

  test('subtract operation orchestrates muxifyWrung correctly', () => {
    const a = r8_.parseStringToBuffer('8');
    const b = r8_.parseStringToBuffer('3');
    expect(a).not.toBeNull();
    expect(b).not.toBeNull();

    const result = r8_.operations.subtract(a!, b!);
    const display = r8_.createRoundDisplay(result);

    expect(display).toBe('5');
  });

  test('increment operation adds 1', () => {
    const value = r8_.parseStringToBuffer('7');
    expect(value).not.toBeNull();

    const result = r8_.operations.increment(value!);
    const display = r8_.createRoundDisplay(result);

    expect(display).toBe('8');
  });

  test('decrement operation subtracts 1', () => {
    const value = r8_.parseStringToBuffer('4');
    expect(value).not.toBeNull();

    const result = r8_.operations.decrement(value!);
    const display = r8_.createRoundDisplay(result);

    expect(display).toBe('3');
  });

  test('increment handles AbsoluteZero correctly', () => {
    const zero = r8_.terminology.createBuffer();  // AbsoluteZero
    const result = r8_.operations.increment(zero);
    const display = r8_.createRoundDisplay(result);

    expect(display).toBe('1');
  });

  test('decrement handles AbsoluteZero correctly', () => {
    const zero = r8_.terminology.createBuffer();  // AbsoluteZero
    const result = r8_.operations.decrement(zero);
    const display = r8_.createRoundDisplay(result);

    expect(display).toBe('-1');
  });
});

describe('r8 API - Logical Category', () => {
  test('All comparison operators are accessible', () => {
    expect(r8_.logical.equals).toBeDefined();
    expect(r8_.logical.notEquals).toBeDefined();
    expect(r8_.logical.greaterThan).toBeDefined();
    expect(r8_.logical.lessThan).toBeDefined();
    expect(r8_.logical.greaterThanOrEqual).toBeDefined();
    expect(r8_.logical.lessThanOrEqual).toBeDefined();
  });

  test('equals comparison works correctly', () => {
    const rot1: BitRotationTuple = [1, 0, 1];
    const rot2: BitRotationTuple = [1, 0, 1];
    const rot3: BitRotationTuple = [0, 1, 0];

    expect(r8_.logical.equals(rot1, rot2)).toBe(1);
    expect(r8_.logical.equals(rot1, rot3)).toBe(0);
  });

  test('greaterThan comparison works correctly', () => {
    // Use terminology to get correct bit rotations
    const rot5 = r8_.terminology.getRegularBitRotation(5);
    const rot3 = r8_.terminology.getRegularBitRotation(3);

    expect(r8_.logical.greaterThan(rot5, rot3)).toBe(1);
    expect(r8_.logical.greaterThan(rot3, rot5)).toBe(0);
  });

  test('lessThan comparison works correctly', () => {
    // Use terminology to get correct bit rotations
    const rot2 = r8_.terminology.getRegularBitRotation(2);
    const rot6 = r8_.terminology.getRegularBitRotation(6);

    expect(r8_.logical.lessThan(rot2, rot6)).toBe(1);
    expect(r8_.logical.lessThan(rot6, rot2)).toBe(0);
  });
});

describe('r8 API - ANOR Category', () => {
  test('All ANOR operations are accessible', () => {
    expect(r8_.anor.anor).toBeDefined();
    expect(r8_.anor.anorWrung).toBeDefined();
    expect(r8_.anor.compareMagnitude).toBeDefined();
    expect(r8_.anor.determineEffectiveOperation).toBeDefined();
  });

  test('anor (rotation-level range membership) is accessible', () => {
    expect(typeof r8_.anor.anor).toBe('function');
  });

  test('anorWrung (wrung-level range membership) is accessible', () => {
    expect(typeof r8_.anor.anorWrung).toBe('function');
  });

  test('compareMagnitude is accessible', () => {
    expect(typeof r8_.anor.compareMagnitude).toBe('function');
  });

  test('determineEffectiveOperation is accessible', () => {
    expect(typeof r8_.anor.determineEffectiveOperation).toBe('function');
  });
});

describe('r8 API - Terminology Category', () => {
  test('Sign bit operations are accessible', () => {
    expect(r8_.terminology.getSignBit).toBeDefined();
    expect(r8_.terminology.setSignBit).toBeDefined();
    expect(r8_.terminology.clearSignBit).toBeDefined();
    expect(r8_.terminology.flipSignBit).toBeDefined();
  });

  test('Buffer operations are accessible', () => {
    expect(r8_.terminology.createBuffer).toBeDefined();
    expect(r8_.terminology.getRound8Case).toBeDefined();
    expect(r8_.terminology.extractBitTuple).toBeDefined();
  });

  test('Bit rotation operations are accessible', () => {
    expect(r8_.terminology.getRegularBitRotation).toBeDefined();
    expect(r8_.terminology.getShiftedBitRotation).toBeDefined();
    expect(r8_.terminology.getRegularRotation).toBeDefined();
    expect(r8_.terminology.getShiftedRotation).toBeDefined();
    expect(r8_.terminology.getMarqueeBitRotation).toBeDefined();
  });

  test('Spool stores are accessible', () => {
    expect(r8_.terminology.MaskStore).toBeDefined();
    expect(r8_.terminology.ClearMaskStore).toBeDefined();
    expect(r8_.terminology.BitOffsetStore).toBeDefined();
  });

  test('Scan operations are accessible', () => {
    expect(r8_.terminology.scanUpward).toBeDefined();
    expect(r8_.terminology.scanDownward).toBeDefined();
  });

  test('createBuffer creates AbsoluteZero', () => {
    const buffer = r8_.terminology.createBuffer();
    expect(buffer).toBe(0n);
  });

  test('getRegularBitRotation creates correct tuple', () => {
    const rotation = r8_.terminology.getRegularBitRotation(5);
    expect(rotation.length).toBe(3);
    expect(Array.isArray(rotation)).toBe(true);
  });
});

describe('r8 API - Integration Tests (Cross-Category)', () => {
  test('Conference → Operations → Conference roundtrip', () => {
    // Parse string → buffer
    const buffer1 = r8_.parseStringToBuffer('7');
    expect(buffer1).not.toBeNull();

    // Operate: add 3
    const buffer2 = r8_.parseStringToBuffer('3');
    expect(buffer2).not.toBeNull();

    const result = r8_.operations.add(buffer1!, buffer2!);

    // Format back to Round8 string
    const display = r8_.createRoundDisplay(result);
    expect(display).toBe('12');  // 7 + 3 = 12 (base-10: 10)
  });

  test('Operations can be chained', () => {
    // Start with 10
    const initial = r8_.parseStringToBuffer('10');
    expect(initial).not.toBeNull();
    if (!initial) return;  // Type guard

    // Chain: increment → increment → decrement
    const step1 = r8_.operations.increment(initial);
    const step2 = r8_.operations.increment(step1);
    const final = r8_.operations.decrement(step2);

    // Should be back to 11 (10 + 1 + 1 - 1 = 11)
    const display = r8_.createRoundDisplay(final);
    expect(display).toBe('11');
  });

  test('Terminology → Logical integration', () => {
    // Create rotations using terminology
    const rot3 = r8_.terminology.getRegularBitRotation(3);
    const rot7 = r8_.terminology.getRegularBitRotation(7);

    // Use logical comparison
    expect(r8_.logical.lessThan(rot3, rot7)).toBe(1);
    expect(r8_.logical.greaterThan(rot3, rot7)).toBe(0);
  });
});
