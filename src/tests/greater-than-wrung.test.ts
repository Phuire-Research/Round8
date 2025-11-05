/**
 * GreaterThan Single Rotation Strategy Tests
 *
 * Tests single column magnitude comparison using SpooledGreaterThanSeries:
 * - Regular topology (Display 1-8, Columns 1-20)
 * - Boolean return values: 0 (False) or 1 (True)
 * - Base spool validation (shifted spool future work)
 *
 * Clinical Rationale: GreaterThan enables proper routing for signed arithmetic
 * operations in DifferenceWrung by providing magnitude comparison capability.
 */

import { greaterThan } from '../concepts/round8/model/Round8.cases';

describe('GreaterThan - Single Rotation (Regular Topology)', () => {
  /**
   * Helper: Create 3-bit column value for regular topology
   * Regular encoding: Display 1-8 maps to binary 000-111 (internal value - 1)
   */
  const createColumnValue = (display: number): Uint8Array => {
    if (display < 1 || display > 8) {
      throw new Error(`Display value must be 1-8, got ${display}`);
    }

    const internalValue = display - 1; // Display 1 = 000, Display 8 = 111
    const column = new Uint8Array(3);

    column[0] = (internalValue >> 2) & 1; // bit2
    column[1] = (internalValue >> 1) & 1; // bit1
    column[2] = internalValue & 1;        // bit0

    return column;
  };

  describe('Helper Function Validation', () => {
    test('createColumnValue generates correct encoding for Display 1', () => {
      const column = createColumnValue(1);
      expect(column[0]).toBe(0); // bit2
      expect(column[1]).toBe(0); // bit1
      expect(column[2]).toBe(0); // bit0 - Display 1 = [0,0,0]
    });

    test('createColumnValue generates correct encoding for Display 5', () => {
      const column = createColumnValue(5);
      expect(column[0]).toBe(1); // bit2
      expect(column[1]).toBe(0); // bit1
      expect(column[2]).toBe(0); // bit0 - Display 5 = [1,0,0]
    });

    test('createColumnValue generates correct encoding for Display 8', () => {
      const column = createColumnValue(8);
      expect(column[0]).toBe(1); // bit2
      expect(column[1]).toBe(1); // bit1
      expect(column[2]).toBe(1); // bit0 - Display 8 = [1,1,1]
    });
  });

  describe('Basic Greater Than Comparisons', () => {
    test('5 > 3 returns True (1)', () => {
      const columnX = createColumnValue(5);
      const columnY = createColumnValue(3);
      const result = greaterThan(columnX, columnY);

      expect(result).toBe(1); // True
    });

    test('3 > 5 returns False (0)', () => {
      const columnX = createColumnValue(3);
      const columnY = createColumnValue(5);
      const result = greaterThan(columnX, columnY);

      expect(result).toBe(0); // False
    });

    test('4 > 4 returns False (0) - equal values', () => {
      const columnX = createColumnValue(4);
      const columnY = createColumnValue(4);
      const result = greaterThan(columnX, columnY);

      expect(result).toBe(0); // False: NOT greater than
    });

    test('8 > 1 returns True (1) - maximum vs minimum', () => {
      const columnX = createColumnValue(8);
      const columnY = createColumnValue(1);
      const result = greaterThan(columnX, columnY);

      expect(result).toBe(1); // True
    });

    test('1 > 8 returns False (0) - minimum vs maximum', () => {
      const columnX = createColumnValue(1);
      const columnY = createColumnValue(8);
      const result = greaterThan(columnX, columnY);

      expect(result).toBe(0); // False
    });
  });

  describe('Edge Case Comparisons', () => {
    test('8 > 8 returns False (0) - maximum equal', () => {
      const columnX = createColumnValue(8);
      const columnY = createColumnValue(8);
      const result = greaterThan(columnX, columnY);

      expect(result).toBe(0); // False: NOT greater than
    });

    test('1 > 1 returns False (0) - minimum equal', () => {
      const columnX = createColumnValue(1);
      const columnY = createColumnValue(1);
      const result = greaterThan(columnX, columnY);

      expect(result).toBe(0); // False: NOT greater than
    });

    test('8 > 7 returns True (1) - adjacent maximum', () => {
      const columnX = createColumnValue(8);
      const columnY = createColumnValue(7);
      const result = greaterThan(columnX, columnY);

      expect(result).toBe(1); // True
    });

    test('2 > 1 returns True (1) - adjacent minimum', () => {
      const columnX = createColumnValue(2);
      const columnY = createColumnValue(1);
      const result = greaterThan(columnX, columnY);

      expect(result).toBe(1); // True
    });
  });

  describe('Sequential Comparison Validation', () => {
    test('Display 1 is NOT > any value (1-8)', () => {
      const column1 = createColumnValue(1);

      for (let display = 1; display <= 8; display++) {
        const columnN = createColumnValue(display);
        const result = greaterThan(column1, columnN);
        expect(result).toBe(0); // Always False
      }
    });

    test('Display 8 IS > all values except 8', () => {
      const column8 = createColumnValue(8);

      for (let display = 1; display <= 7; display++) {
        const columnN = createColumnValue(display);
        const result = greaterThan(column8, columnN);
        expect(result).toBe(1); // Always True for 1-7
      }

      // 8 > 8 should be False
      const column8Again = createColumnValue(8);
      expect(greaterThan(column8, column8Again)).toBe(0);
    });

    test('Display N is NOT > itself for all displays', () => {
      for (let display = 1; display <= 8; display++) {
        const columnN = createColumnValue(display);
        const result = greaterThan(columnN, columnN);
        expect(result).toBe(0); // Always False (equality, not greater than)
      }
    });
  });
});
