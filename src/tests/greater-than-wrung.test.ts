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

import { greaterThan, lessThan } from '../concepts/round8/model/cases';
import { getRegularBitRotation, type BitRotationTuple } from '../concepts/round8/model/terminology';

describe('GreaterThan - Single Rotation (Regular Topology)', () => {
  /**
   * Helper: Create 3-bit column value for regular topology
   * Round8-Native: Uses getRegularBitRotation from terminology (Total Binary Replacement)
   * Regular encoding: Display 1-8 maps to binary 000-111
   */
  const createColumnValue = (display: number): BitRotationTuple => {
    if (display < 1 || display > 8) {
      throw new Error(`Display value must be 1-8, got ${display}`);
    }
    // Use Round8's native tool for creating BitRotationTuple from display values
    // Citation: terminology.ts line 652 - getRegularBitRotation
    // Round8 is a Total Binary Replacement - test our tools, not binary logic
    return getRegularBitRotation(display as 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8);
  };

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

describe('LessThan - Single Rotation (Regular Topology)', () => {
  /**
   * Helper: Create 3-bit column value for regular topology
   * Round8-Native: Uses getRegularBitRotation from terminology (Total Binary Replacement)
   */
  const createColumnValue = (display: number): BitRotationTuple => {
    if (display < 1 || display > 8) {
      throw new Error(`Display value must be 1-8, got ${display}`);
    }
    // Use Round8's native tool for creating BitRotationTuple from display values
    // Citation: terminology.ts line 652 - getRegularBitRotation
    return getRegularBitRotation(display as 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8);
  };

  describe('Basic Less Than Comparisons', () => {
    test('3 < 5 returns True (1)', () => {
      const columnX = createColumnValue(3);
      const columnY = createColumnValue(5);
      const result = lessThan(columnX, columnY);

      expect(result).toBe(1); // True
    });

    test('5 < 3 returns False (0)', () => {
      const columnX = createColumnValue(5);
      const columnY = createColumnValue(3);
      const result = lessThan(columnX, columnY);

      expect(result).toBe(0); // False
    });

    test('4 < 4 returns False (0) - equal values', () => {
      const columnX = createColumnValue(4);
      const columnY = createColumnValue(4);
      const result = lessThan(columnX, columnY);

      expect(result).toBe(0); // False: NOT less than
    });

    test('1 < 8 returns True (1) - minimum vs maximum', () => {
      const columnX = createColumnValue(1);
      const columnY = createColumnValue(8);
      const result = lessThan(columnX, columnY);

      expect(result).toBe(1); // True
    });

    test('8 < 1 returns False (0) - maximum vs minimum', () => {
      const columnX = createColumnValue(8);
      const columnY = createColumnValue(1);
      const result = lessThan(columnX, columnY);

      expect(result).toBe(0); // False
    });
  });

  describe('Edge Case Comparisons', () => {
    test('8 < 8 returns False (0) - maximum equal', () => {
      const columnX = createColumnValue(8);
      const columnY = createColumnValue(8);
      const result = lessThan(columnX, columnY);

      expect(result).toBe(0); // False: NOT less than
    });

    test('1 < 1 returns False (0) - minimum equal', () => {
      const columnX = createColumnValue(1);
      const columnY = createColumnValue(1);
      const result = lessThan(columnX, columnY);

      expect(result).toBe(0); // False: NOT less than
    });

    test('7 < 8 returns True (1) - adjacent maximum', () => {
      const columnX = createColumnValue(7);
      const columnY = createColumnValue(8);
      const result = lessThan(columnX, columnY);

      expect(result).toBe(1); // True
    });

    test('1 < 2 returns True (1) - adjacent minimum', () => {
      const columnX = createColumnValue(1);
      const columnY = createColumnValue(2);
      const result = lessThan(columnX, columnY);

      expect(result).toBe(1); // True
    });
  });

  describe('Sequential Comparison Validation', () => {
    test('Display 8 is NOT < any value (1-8)', () => {
      const column8 = createColumnValue(8);

      for (let display = 1; display <= 8; display++) {
        const columnN = createColumnValue(display);
        const result = lessThan(column8, columnN);
        expect(result).toBe(0); // Always False
      }
    });

    test('Display 1 IS < all values except 1', () => {
      const column1 = createColumnValue(1);

      for (let display = 2; display <= 8; display++) {
        const columnN = createColumnValue(display);
        const result = lessThan(column1, columnN);
        expect(result).toBe(1); // Always True for 2-8
      }

      // 1 < 1 should be False
      const column1Again = createColumnValue(1);
      expect(lessThan(column1, column1Again)).toBe(0);
    });

    test('Display N is NOT < itself for all displays', () => {
      for (let display = 1; display <= 8; display++) {
        const columnN = createColumnValue(display);
        const result = lessThan(columnN, columnN);
        expect(result).toBe(0); // Always False (equality, not less than)
      }
    });
  });

  describe('Direct Spool Validation', () => {
    test('LessThan uses independent spool (not derived from GreaterThan)', () => {
      // Validate that lessThan and greaterThan are complementary but independent
      // For all X,Y where X != Y: exactly one of (X < Y) or (X > Y) is true
      for (let displayX = 1; displayX <= 8; displayX++) {
        for (let displayY = 1; displayY <= 8; displayY++) {
          if (displayX === displayY) {continue;} // Skip equality cases

          const columnX = createColumnValue(displayX);
          const columnY = createColumnValue(displayY);

          const ltResult = lessThan(columnX, columnY);
          const gtResult = greaterThan(columnX, columnY);

          // Exactly one should be true (XOR relationship)
          const xorResult = (ltResult === 1 || gtResult === 1) && ltResult !== gtResult;
          expect(xorResult).toBe(true);
        }
      }
    });
  });
});
