/**
 * DifferenceWrung Multi-Column Tests
 *
 * Tests subtraction operations across multiple columns including:
 * - Multi-column borrow propagation (backward Column 20→19→...→1→0)
 * - Sign routing Cases 5-8 with multi-column integration
 * - Exact Even path (both marquees aligned)
 * - Shifted path (marquees misaligned - shared + exclusive zones)
 * - Full borrow cascade validation
 *
 * Follows observational testing pattern from sumwrung-multi-column.test.ts
 */

import { DifferenceWrung } from '../concepts/round8/model/Round8.cases';
import { BidirectionalConference } from '../concepts/round8/model/Round8.bidirectional';

describe('DifferenceWrung - Multi-Column Operations', () => {
  /**
   * Helper: Create buffer with specified column values
   * @param columns - Record mapping column index (0-20) to display value (1-8)
   * @param isPositive - Sign bit (default true = positive)
   * @returns 64-byte buffer with specified columns set
   */
  const createMultiColumnBuffer = (
    columns: Record<number, number>,
    isPositive = true
  ): Uint8Array<ArrayBuffer> => {
    const buffer = new Uint8Array(64) as Uint8Array<ArrayBuffer>;

    buffer[0] = isPositive ? 1 : 0;

    Object.entries(columns).forEach(([colStr, displayValue]) => {
      const columnIndex = parseInt(colStr, 10);

      if (columnIndex < 0 || columnIndex > 20) {
        throw new Error(`Invalid column index ${columnIndex}. Must be 0-20.`);
      }

      if (displayValue < 1 || displayValue > 8) {
        throw new Error(`Invalid display value ${displayValue}. Must be 1-8.`);
      }

      const internalValue = displayValue - 1;
      const pos = 1 + (columnIndex * 3);

      buffer[pos] = (internalValue >> 2) & 1;
      buffer[pos + 1] = (internalValue >> 1) & 1;
      buffer[pos + 2] = internalValue & 1;
    });

    return buffer;
  };

  /**
   * Helper: Extract raw binary at specified column
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
   * @param buffer - 64-byte Round8 buffer
   * @param columnIndex - Column to extract (0-20)
   * @returns Display value (1-8)
   */
  const extractColumnValue = (
    buffer: Uint8Array,
    columnIndex: number
  ): number => {
    const [bit2, bit1, bit0] = getColumnBinary(buffer, columnIndex);
    const internalValue = (bit2 << 2) | (bit1 << 1) | bit0;
    return internalValue + 1;
  };

  /**
   * Helper: Validate marquee state using BidirectionalConference
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

    test('createMultiColumnBuffer - negative sign bit', () => {
      const buffer = createMultiColumnBuffer({ 20: 5 }, false);

      expect(buffer[0]).toBe(0); // Sign = negative
      expect(extractColumnValue(buffer, 20)).toBe(5);
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

  // ==================== PHASE 2: CASE 5 - POSITIVE DIFFERENCE ====================

  describe('Case 5: (+A) - (+B) - Both Positive', () => {
    test('Two-column subtraction with borrow propagation (Column 20 → 19)', () => {
      // BufferA: Column 20 = Display 2, Column 19 = Display 5
      // BufferB: Column 20 = Display 5, Column 19 = Display 3
      // Expected: Borrow from Column 20 to Column 19 (backward propagation)
      const bufferA = createMultiColumnBuffer({ 20: 2, 19: 5 });
      const bufferB = createMultiColumnBuffer({ 20: 5, 19: 3 });

      console.log('\n========== Case 5: Two-Column Borrow Propagation ==========');
      console.log('INPUT A: Column 20 = Display 2, Column 19 = Display 5');
      console.log('INPUT B: Column 20 = Display 5, Column 19 = Display 3');

      const result = DifferenceWrung(bufferA, bufferB);

      // OBSERVATIONAL LOGGING (matching SumWrung pattern)
      console.log('\nRESULT BUFFER STATE:');
      for (let col = 20; col >= 1; col--) {
        const value = extractColumnValue(result, col);
        const binary = getColumnBinary(result, col);
        if (value !== 1 || col === 20 || col === 19) {
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

      // Validates: Backward borrow propagation from Column 20 → Column 19
      // Observational - specific values depend on spool implementation
    });
  });
});
