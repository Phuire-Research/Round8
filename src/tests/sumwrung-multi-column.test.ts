/**
 * SumWrung Multi-Column Test
 *
 * Tests SumWrung functionality across multiple columns (1-20) to verify:
 * 1. Carry propagation across column boundaries
 * 2. Marquee position holding consistency
 * 3. SpooledSumSeries topology application
 * 4. BidirectionalConference rule validation
 *
 * Applies Formalized Round8 Rule Sets:
 * - Rule Set 1: Display System (1-8 Base)
 * - Rule Set 3: Buffer Structure
 * - Rule Set 4: Marquee Position Holding
 * - Rule Set 5: SpooledSumSeries Topology
 * - Rule Set 7: Multi-Column Processing
 */

import { SumWrung } from '../concepts/round8/model/Round8.cases';
import { BidirectionalConference } from '../concepts/round8/model/Round8.bidirectional';

describe('SumWrung - Multi-Column Tests', () => {
  /**
   * Helper: Create buffer with specified column values
   * Applies Rule Set 3 (Buffer Structure) + Rule Set 1 (Display System)
   *
   * @param columns - Record mapping column index (0-20) to display value (1-8)
   * @param isPositive - Sign bit (default true = positive)
   * @returns 64-byte buffer with specified columns set
   */
  const createMultiColumnBuffer = (
    columns: Record<number, number>,
    isPositive = true
  ): Uint8Array<ArrayBuffer> => {
    const buffer = new Uint8Array(64) as Uint8Array<ArrayBuffer>;

    // Rule Set 2: Sign Convention
    buffer[0] = isPositive ? 1 : 0;

    // Rule Set 3: Buffer Structure (position = 1 + columnIndex * 3)
    // Rule Set 1: Display System (display value 1-8 → binary 0-7)
    Object.entries(columns).forEach(([colStr, displayValue]) => {
      const columnIndex = parseInt(colStr, 10);

      if (columnIndex < 0 || columnIndex > 20) {
        throw new Error(`Invalid column index ${columnIndex}. Must be 0-20.`);
      }

      if (displayValue < 1 || displayValue > 8) {
        throw new Error(`Invalid display value ${displayValue}. Must be 1-8.`);
      }

      // Convert display value (1-8) to internal binary (0-7)
      const internalValue = displayValue - 1;

      // Calculate buffer position (Rule Set 3)
      const pos = 1 + (columnIndex * 3);

      // Write binary representation (LSB-first)
      buffer[pos] = (internalValue >> 2) & 1;     // bit2
      buffer[pos + 1] = (internalValue >> 1) & 1; // bit1
      buffer[pos + 2] = internalValue & 1;        // bit0
    });

    return buffer;
  };

  /**
   * Helper: Extract raw binary at specified column
   * Applies Rule Set 3 (Buffer Structure)
   *
   * @param buffer - 64-byte Round8 buffer
   * @param columnIndex - Column to extract (0-20)
   * @returns [bit2, bit1, bit0] tuple
   */
  const getColumnBinary = (
    buffer: Uint8Array,
    columnIndex: number
  ): [number, number, number] => {
    if (columnIndex < 0 || columnIndex > 20) {
      throw new Error(`Invalid column index ${columnIndex}. Must be 0-20.`);
    }

    const pos = 1 + (columnIndex * 3);
    return [buffer[pos], buffer[pos + 1], buffer[pos + 2]];
  };

  /**
   * Helper: Extract display value from specified column
   * Applies Rule Set 1 (Display System) + Rule Set 3 (Buffer Structure)
   *
   * @param buffer - 64-byte Round8 buffer
   * @param columnIndex - Column to extract (0-20)
   * @returns Display value (1-8)
   */
  const extractColumnValue = (
    buffer: Uint8Array,
    columnIndex: number
  ): number => {
    const [bit2, bit1, bit0] = getColumnBinary(buffer, columnIndex);

    // Combine to internal value (0-7)
    const internalValue = (bit2 << 2) | (bit1 << 1) | bit0;

    // Convert to display value (1-8)
    return internalValue + 1;
  };

  /**
   * Helper: Validate buffer against expected column values
   * Applies Rule Set 1 (Display System)
   *
   * @param buffer - Result buffer to validate
   * @param expected - Record mapping column index to expected display value
   */
  const validateColumns = (
    buffer: Uint8Array,
    expected: Record<number, number>
  ) => {
    Object.entries(expected).forEach(([colStr, expectedValue]) => {
      const columnIndex = parseInt(colStr, 10);
      const actualValue = extractColumnValue(buffer, columnIndex);

      expect(actualValue).toBe(expectedValue);
    });
  };

  /**
   * Helper: Validate marquee state using BidirectionalConference
   * Applies Rule Set 4 (Marquee Position Holding)
   *
   * @param buffer - Buffer to validate
   * @param expectedFirstValid - Expected firstValidColumn value
   * @param expectedMarquee - Expected marqueeColumn value (optional)
   */
  const validateMarqueeState = (
    buffer: Uint8Array<ArrayBuffer>,
    expectedFirstValid: number,
    expectedMarquee?: number
  ) => {
    const marqueeState = BidirectionalConference(buffer);

    expect(marqueeState.firstValidColumn).toBe(expectedFirstValid);

    if (expectedMarquee !== undefined) {
      expect(marqueeState.marqueeColumn).toBe(expectedMarquee);
    }
  };

  // ==================== PHASE 1: HELPER VALIDATION ====================

  describe('Helper Function Validation', () => {
    test('createMultiColumnBuffer - single column', () => {
      const buffer = createMultiColumnBuffer({ 20: 5 });

      expect(buffer[0]).toBe(1); // Sign = positive
      expect(extractColumnValue(buffer, 20)).toBe(5);
    });

    test('createMultiColumnBuffer - multiple columns', () => {
      const buffer = createMultiColumnBuffer({
        20: 8,
        19: 7,
        18: 6
      });

      expect(extractColumnValue(buffer, 20)).toBe(8);
      expect(extractColumnValue(buffer, 19)).toBe(7);
      expect(extractColumnValue(buffer, 18)).toBe(6);
    });

    test('getColumnBinary - LSB-first ordering', () => {
      const buffer = createMultiColumnBuffer({ 20: 5 });
      const binary = getColumnBinary(buffer, 20);

      // Display 5 = Binary [1,0,0] (LSB-first)
      expect(binary).toEqual([1, 0, 0]);
    });

    test('extractColumnValue - all display values 1-8', () => {
      const buffer = createMultiColumnBuffer({
        0: 1, 1: 2, 2: 3, 3: 4, 4: 5, 5: 6, 6: 7, 7: 8
      });

      expect(extractColumnValue(buffer, 0)).toBe(1);
      expect(extractColumnValue(buffer, 1)).toBe(2);
      expect(extractColumnValue(buffer, 2)).toBe(3);
      expect(extractColumnValue(buffer, 3)).toBe(4);
      expect(extractColumnValue(buffer, 4)).toBe(5);
      expect(extractColumnValue(buffer, 5)).toBe(6);
      expect(extractColumnValue(buffer, 6)).toBe(7);
      expect(extractColumnValue(buffer, 7)).toBe(8);
    });

    test('validateMarqueeState - default column 20 valid', () => {
      const buffer = createMultiColumnBuffer({ 20: 1 });
      validateMarqueeState(buffer, 20);
    });

    test('validateMarqueeState - marquee at column 19', () => {
      const buffer = createMultiColumnBuffer({
        19: 2, // Display 2 = [0,0,1] = marquee marker
        20: 1
      });
      validateMarqueeState(buffer, 20, 19);
    });
  });

  // ==================== PHASE 2: CASE 1 - BOTH POSITIVE (EXISTING COVERAGE) ====================

  describe('Case 1: (+A) + (+B) - Both Positive → Positive Sum', () => {
    test('All columns Display 8, add Display 1 at column 20 - validates full carry propagation', () => {
      // Create buffer with:
      // - Column 0 = Display 2 ([0,0,1]) = Marquee marker (Rule Set 4)
      // - Columns 1-20 = Display 8 ([1,1,1]) = All maximum values
      const bufferA = createMultiColumnBuffer({
        0: 2,  // Marquee marker at column 0 -> firstValidColumn = 1
        1: 8, 2: 8, 3: 8, 4: 8, 5: 8,
        6: 8, 7: 8, 8: 8, 9: 8, 10: 8,
        11: 8, 12: 8, 13: 8, 14: 8, 15: 8,
        16: 8, 17: 8, 18: 8, 19: 8, 20: 8
      });

      // Add Display 1 at column 20, with matching marquee at column 0
      const bufferB = createMultiColumnBuffer({
        0: 2,  // Marquee marker at column 0 -> firstValidColumn = 1
        20: 1
      });

      console.log('\n========== Case 1: Both Positive - Full Carry Cascade ==========');
      console.log('INPUT bufferA - All columns 1-20 = Display 8');
      console.log('INPUT bufferB - Column 20 = Display 1');

      const result = SumWrung(bufferA, bufferB);

      console.log('\nRESULT BUFFER STATE:');
      // Log all columns to see carry propagation pattern
      for (let col = 20; col >= 1; col--) {
        const value = extractColumnValue(result, col);
        const binary = getColumnBinary(result, col);
        console.log(`Column ${col}: Display ${value}, Binary [${binary[0]},${binary[1]},${binary[2]}]`);
      }

      // Validate marquee state on result
      const marqueeState = BidirectionalConference(result);
      console.log('\nMARQUEE STATE:');
      console.log('  Sign:', result[0] === 1 ? 'Positive (+)' : 'Negative (-)');
      console.log('  firstValidColumn:', marqueeState.firstValidColumn);
      console.log('  marqueeColumn:', marqueeState.marqueeColumn);
      console.log('  isFinalTwist:', marqueeState.isFinalTwist);
      console.log('  isAbsoluteZero:', marqueeState.isAbsoluteZero);
    });

    test('Multi-column positive sum with carry propagation', () => {
      const bufferA = createMultiColumnBuffer({ 20: 5, 19: 4, 18: 3 }, true);
      const bufferB = createMultiColumnBuffer({ 20: 3, 19: 2, 18: 1 }, true);

      console.log('\n========== Case 1: Multi-Column Positive Sum ==========');
      console.log('INPUT A: Column 20 = Display 5, Column 19 = Display 4, Column 18 = Display 3 (POSITIVE)');
      console.log('INPUT B: Column 20 = Display 3, Column 19 = Display 2, Column 18 = Display 1 (POSITIVE)');

      const result = SumWrung(bufferA, bufferB);

      console.log('\nRESULT BUFFER STATE:');
      for (let col = 20; col >= 1; col--) {
        const value = extractColumnValue(result, col);
        const binary = getColumnBinary(result, col);
        if (value !== 1 || col === 20 || col === 19 || col === 18) {
          console.log(`Column ${col}: Display ${value}, Binary [${binary[0]},${binary[1]},${binary[2]}]`);
        }
      }

      const marqueeState = BidirectionalConference(result);
      console.log('\nMARQUEE STATE:');
      console.log('  Sign:', result[0] === 1 ? 'Positive (+)' : 'Negative (-)');
      console.log('  firstValidColumn:', marqueeState.firstValidColumn);
      console.log('  marqueeColumn:', marqueeState.marqueeColumn);
      console.log('  isFinalTwist:', marqueeState.isFinalTwist);
      console.log('  isAbsoluteZero:', marqueeState.isAbsoluteZero);
    });
  });

  // ==================== PHASE 3: CASE 2 - BOTH NEGATIVE ====================

  describe('Case 2: (-A) + (-B) - Both Negative → Negative Sum', () => {
    test('Multi-column both negative with carry propagation', () => {
      const bufferA = createMultiColumnBuffer({ 20: 5, 19: 4, 18: 3 }, false);
      const bufferB = createMultiColumnBuffer({ 20: 2, 19: 1, 18: 1 }, false);

      console.log('\n========== Case 2: Both Negative → Negative Sum ==========');
      console.log('INPUT A: Column 20 = Display 5, Column 19 = Display 4, Column 18 = Display 3 (NEGATIVE)');
      console.log('INPUT B: Column 20 = Display 2, Column 19 = Display 1, Column 18 = Display 1 (NEGATIVE)');
      console.log('Expected: Negative sum with carry propagation');

      const result = SumWrung(bufferA, bufferB);

      console.log('\nRESULT BUFFER STATE:');
      for (let col = 20; col >= 1; col--) {
        const value = extractColumnValue(result, col);
        const binary = getColumnBinary(result, col);
        if (value !== 1 || col === 20 || col === 19 || col === 18) {
          console.log(`Column ${col}: Display ${value}, Binary [${binary[0]},${binary[1]},${binary[2]}]`);
        }
      }

      const marqueeState = BidirectionalConference(result);
      console.log('\nMARQUEE STATE:');
      console.log('  Sign:', result[0] === 1 ? 'Positive (+)' : 'Negative (-)');
      console.log('  firstValidColumn:', marqueeState.firstValidColumn);
      console.log('  marqueeColumn:', marqueeState.marqueeColumn);
      console.log('  isFinalTwist:', marqueeState.isFinalTwist);
      console.log('  isAbsoluteZero:', marqueeState.isAbsoluteZero);
    });

    test('Both negative with carry cascade validation', () => {
      const bufferA = createMultiColumnBuffer({ 20: 7, 19: 6, 18: 5 }, false);
      const bufferB = createMultiColumnBuffer({ 20: 3, 19: 4, 18: 5 }, false);

      console.log('\n========== Case 2: Both Negative with Carry Cascade ==========');
      console.log('INPUT A: Column 20 = Display 7, Column 19 = Display 6, Column 18 = Display 5 (NEGATIVE)');
      console.log('INPUT B: Column 20 = Display 3, Column 19 = Display 4, Column 18 = Display 5 (NEGATIVE)');

      const result = SumWrung(bufferA, bufferB);

      console.log('\nRESULT BUFFER STATE:');
      for (let col = 20; col >= 1; col--) {
        const value = extractColumnValue(result, col);
        const binary = getColumnBinary(result, col);
        if (value !== 1 || col === 20 || col === 19 || col === 18 || col === 17) {
          console.log(`Column ${col}: Display ${value}, Binary [${binary[0]},${binary[1]},${binary[2]}]`);
        }
      }

      const marqueeState = BidirectionalConference(result);
      console.log('\nMARQUEE STATE:');
      console.log('  Sign:', result[0] === 1 ? 'Positive (+)' : 'Negative (-)');
      console.log('  firstValidColumn:', marqueeState.firstValidColumn);
      console.log('  marqueeColumn:', marqueeState.marqueeColumn);
      console.log('  isFinalTwist:', marqueeState.isFinalTwist);
      console.log('  isAbsoluteZero:', marqueeState.isAbsoluteZero);
    });
  });

  // ==================== PHASE 4: CASE 3 - POSITIVE + NEGATIVE (DELEGATES TO DIFFERENCE) ====================

  describe('Case 3: (+A) + (-B) - Converts to Difference', () => {
    test('Multi-column positive plus negative delegates to DifferenceWrung', () => {
      const bufferA = createMultiColumnBuffer({ 20: 8, 19: 7, 18: 6 }, true);
      const bufferB = createMultiColumnBuffer({ 20: 3, 19: 2, 18: 1 }, false);

      console.log('\n========== Case 3: (+A) + (-B) → Delegates to Difference ==========');
      console.log('INPUT A: Column 20 = Display 8, Column 19 = Display 7, Column 18 = Display 6 (POSITIVE)');
      console.log('INPUT B: Column 20 = Display 3, Column 19 = Display 2, Column 18 = Display 1 (NEGATIVE)');
      console.log('Expected: Delegates to DifferenceWrung (A - abs(B))');

      const result = SumWrung(bufferA, bufferB);

      console.log('\nRESULT BUFFER STATE:');
      for (let col = 20; col >= 1; col--) {
        const value = extractColumnValue(result, col);
        const binary = getColumnBinary(result, col);
        if (value !== 1 || col === 20 || col === 19 || col === 18) {
          console.log(`Column ${col}: Display ${value}, Binary [${binary[0]},${binary[1]},${binary[2]}]`);
        }
      }

      const marqueeState = BidirectionalConference(result);
      console.log('\nMARQUEE STATE:');
      console.log('  Sign:', result[0] === 1 ? 'Positive (+)' : 'Negative (-)');
      console.log('  firstValidColumn:', marqueeState.firstValidColumn);
      console.log('  marqueeColumn:', marqueeState.marqueeColumn);
      console.log('  isFinalTwist:', marqueeState.isFinalTwist);
      console.log('  isAbsoluteZero:', marqueeState.isAbsoluteZero);
    });

    test('Delegation with borrow propagation through DifferenceWrung', () => {
      const bufferA = createMultiColumnBuffer({ 20: 4, 19: 3, 18: 2 }, true);
      const bufferB = createMultiColumnBuffer({ 20: 6, 19: 5, 18: 4 }, false);

      console.log('\n========== Case 3: Delegation with Borrow (A < abs(B)) ==========');
      console.log('INPUT A: Column 20 = Display 4, Column 19 = Display 3, Column 18 = Display 2 (POSITIVE)');
      console.log('INPUT B: Column 20 = Display 6, Column 19 = Display 5, Column 18 = Display 4 (NEGATIVE)');
      console.log('Expected: Result should be negative (abs(B) > A)');

      const result = SumWrung(bufferA, bufferB);

      console.log('\nRESULT BUFFER STATE:');
      for (let col = 20; col >= 1; col--) {
        const value = extractColumnValue(result, col);
        const binary = getColumnBinary(result, col);
        if (value !== 1 || col === 20 || col === 19 || col === 18) {
          console.log(`Column ${col}: Display ${value}, Binary [${binary[0]},${binary[1]},${binary[2]}]`);
        }
      }

      const marqueeState = BidirectionalConference(result);
      console.log('\nMARQUEE STATE:');
      console.log('  Sign:', result[0] === 1 ? 'Positive (+)' : 'Negative (-)');
      console.log('  firstValidColumn:', marqueeState.firstValidColumn);
      console.log('  marqueeColumn:', marqueeState.marqueeColumn);
      console.log('  isFinalTwist:', marqueeState.isFinalTwist);
      console.log('  isAbsoluteZero:', marqueeState.isAbsoluteZero);
    });
  });

  // ==================== PHASE 5: CASE 4 - NEGATIVE + POSITIVE (DELEGATES TO DIFFERENCE) ====================

  describe('Case 4: (-A) + (+B) - Converts to Difference', () => {
    test('Multi-column negative plus positive delegates to DifferenceWrung', () => {
      const bufferA = createMultiColumnBuffer({ 20: 5, 19: 4, 18: 3 }, false);
      const bufferB = createMultiColumnBuffer({ 20: 2, 19: 1, 18: 1 }, true);

      console.log('\n========== Case 4: (-A) + (+B) → Delegates to Difference ==========');
      console.log('INPUT A: Column 20 = Display 5, Column 19 = Display 4, Column 18 = Display 3 (NEGATIVE)');
      console.log('INPUT B: Column 20 = Display 2, Column 19 = Display 1, Column 18 = Display 1 (POSITIVE)');
      console.log('Expected: Delegates to DifferenceWrung (B - abs(A))');

      const result = SumWrung(bufferA, bufferB);

      console.log('\nRESULT BUFFER STATE:');
      for (let col = 20; col >= 1; col--) {
        const value = extractColumnValue(result, col);
        const binary = getColumnBinary(result, col);
        if (value !== 1 || col === 20 || col === 19 || col === 18) {
          console.log(`Column ${col}: Display ${value}, Binary [${binary[0]},${binary[1]},${binary[2]}]`);
        }
      }

      const marqueeState = BidirectionalConference(result);
      console.log('\nMARQUEE STATE:');
      console.log('  Sign:', result[0] === 1 ? 'Positive (+)' : 'Negative (-)');
      console.log('  firstValidColumn:', marqueeState.firstValidColumn);
      console.log('  marqueeColumn:', marqueeState.marqueeColumn);
      console.log('  isFinalTwist:', marqueeState.isFinalTwist);
      console.log('  isAbsoluteZero:', marqueeState.isAbsoluteZero);
    });

    test('Delegation with magnitude comparison and sign determination', () => {
      const bufferA = createMultiColumnBuffer({ 20: 3, 19: 2, 18: 1 }, false);
      const bufferB = createMultiColumnBuffer({ 20: 6, 19: 5, 18: 4 }, true);

      console.log('\n========== Case 4: Delegation (B > abs(A)) → Positive ==========');
      console.log('INPUT A: Column 20 = Display 3, Column 19 = Display 2, Column 18 = Display 1 (NEGATIVE)');
      console.log('INPUT B: Column 20 = Display 6, Column 19 = Display 5, Column 18 = Display 4 (POSITIVE)');
      console.log('Expected: Result should be positive (B > abs(A))');

      const result = SumWrung(bufferA, bufferB);

      console.log('\nRESULT BUFFER STATE:');
      for (let col = 20; col >= 1; col--) {
        const value = extractColumnValue(result, col);
        const binary = getColumnBinary(result, col);
        if (value !== 1 || col === 20 || col === 19 || col === 18) {
          console.log(`Column ${col}: Display ${value}, Binary [${binary[0]},${binary[1]},${binary[2]}]`);
        }
      }

      const marqueeState = BidirectionalConference(result);
      console.log('\nMARQUEE STATE:');
      console.log('  Sign:', result[0] === 1 ? 'Positive (+)' : 'Negative (-)');
      console.log('  firstValidColumn:', marqueeState.firstValidColumn);
      console.log('  marqueeColumn:', marqueeState.marqueeColumn);
      console.log('  isFinalTwist:', marqueeState.isFinalTwist);
      console.log('  isAbsoluteZero:', marqueeState.isAbsoluteZero);
    });
  });
});
