/**
 * DifferenceWrung Column Zero (Shifted Topology) Tests
 *
 * Tests the leftmost column subtraction with shifted topology including:
 * - Shifted topology subtraction (displays 0-6, external carry at 7)
 * - Shifted Negative One operations
 * - External borrow placeholder handling
 * - Shifted spool selection (SpooledShiftedDifferenceSeries)
 * - Borrow propagation from column 1 to column 0
 */

import { DifferenceWrung } from '../concepts/round8/model/Round8.cases';
import { BidirectionalConference } from '../concepts/round8/model/Round8.bidirectional';
import { detectNegativeOne } from '../concepts/round8/model/Round8.bidirectional';

describe('DifferenceWrung - Column Zero (Shifted Topology)', () => {
  /**
   * Helper: Create buffer with only column 0 set (positions 1-3)
   * Uses SHIFTED TOPOLOGY encoding where leading zeros are pruned
   * All other positions are 0
   */
  const createColumnZeroBuffer = (shiftedDisplay: number, isPositive = true): Uint8Array<ArrayBuffer> => {
    const buffer = new Uint8Array(64) as Uint8Array<ArrayBuffer>;
    buffer[0] = isPositive ? 1 : 0;

    // Shifted topology encoding (Display 0-7)
    // Display 0 (Marquee): [0,0,1], Display 1: [0,1,0], Display 2: [0,1,1],
    // Display 3: [1,0,0], Display 4: [1,0,1], Display 5: [1,1,0],
    // Display 6 (Max): [1,1,1], Display 7 (External Carry): [0,0,0]
    const shiftedEncoding: Record<number, [number, number, number]> = {
      0: [0, 0, 1], // Marquee (pruned leading zero)
      1: [0, 1, 0],
      2: [0, 1, 1],
      3: [1, 0, 0],
      4: [1, 0, 1],
      5: [1, 1, 0],
      6: [1, 1, 1], // Maximum
      7: [0, 0, 0], // External Carry
    };

    const [bit2, bit1, bit0] = shiftedEncoding[shiftedDisplay];
    buffer[1] = bit2; // Column 0 bit2 at position 1
    buffer[2] = bit1; // Column 0 bit1 at position 2
    buffer[3] = bit0; // Column 0 bit0 at position 3

    return buffer;
  };

  /**
   * Helper: Extract column 0 shifted display value from buffer
   */
  const extractColumnZero = (buffer: Uint8Array): number => {
    const bit2 = buffer[1];
    const bit1 = buffer[2];
    const bit0 = buffer[3];

    // Reverse lookup for shifted topology
    const binaryKey = `${bit2},${bit1},${bit0}`;
    const shiftedDecoding: Record<string, number> = {
      '0,0,1': 0, // Marquee
      '0,1,0': 1,
      '0,1,1': 2,
      '1,0,0': 3,
      '1,0,1': 4,
      '1,1,0': 5,
      '1,1,1': 6, // Maximum
      '0,0,0': 7, // External Carry
    };

    return shiftedDecoding[binaryKey];
  };

  /**
   * Helper: Check if column 1 (positions 4-6) has borrow
   */
  const hasBorrowToColumnOne = (buffer: Uint8Array): boolean => {
    return buffer[4] !== 0 || buffer[5] !== 0 || buffer[6] !== 0;
  };

  /**
   * Helper: Extract column 1 value if borrow exists
   */
  const extractColumnOne = (buffer: Uint8Array): number => {
    const bit2 = buffer[4];
    const bit1 = buffer[5];
    const bit0 = buffer[6];

    const internalValue = (bit2 << 2) | (bit1 << 1) | bit0;
    return internalValue + 1; // Regular topology for column 1
  };

  /**
   * Helper: Extract raw binary at column 1 (positions 4-6)
   */
  const getColumn1Binary = (buffer: Uint8Array): [number, number, number] => {
    return [buffer[4], buffer[5], buffer[6]];
  };

  /**
   * Helper: Extract raw binary at column 0 (positions 1-3)
   */
  const getColumn0Binary = (buffer: Uint8Array): [number, number, number] => {
    return [buffer[1], buffer[2], buffer[3]];
  };

  /**
   * Helper: Create Negative One buffer (all columns [1,1,1], sign = 0)
   */
  const createNegativeOneBuffer = (): Uint8Array<ArrayBuffer> => {
    const buffer = new Uint8Array(64) as Uint8Array<ArrayBuffer>;
    buffer[0] = 0; // Negative sign

    for (let i = 1; i < 64; i++) {
      buffer[i] = 1;
    }

    return buffer;
  };

  describe('Helper Functions Validation', () => {
    test('createColumnZeroBuffer sets correct shifted positions for Display 0 (Marquee)', () => {
      const buffer = createColumnZeroBuffer(0);
      expect(buffer[0]).toBe(1); // Sign = positive
      expect(getColumn0Binary(buffer)).toEqual([0, 0, 1]); // Shifted encoding for Display 0
    });

    test('createColumnZeroBuffer sets correct shifted positions for Display 3', () => {
      const buffer = createColumnZeroBuffer(3);
      expect(buffer[0]).toBe(1); // Sign = positive
      expect(getColumn0Binary(buffer)).toEqual([1, 0, 0]); // Shifted encoding for Display 3
    });

    test('createColumnZeroBuffer sets correct shifted positions for Display 6 (Maximum)', () => {
      const buffer = createColumnZeroBuffer(6);
      expect(buffer[0]).toBe(1); // Sign = positive
      expect(getColumn0Binary(buffer)).toEqual([1, 1, 1]); // Shifted encoding for Display 6
    });

    test('createColumnZeroBuffer sets correct shifted positions for Display 7 (External Carry)', () => {
      const buffer = createColumnZeroBuffer(7);
      expect(buffer[0]).toBe(1); // Sign = positive
      expect(getColumn0Binary(buffer)).toEqual([0, 0, 0]); // Shifted encoding for Display 7
    });

    test('extractColumnZero reads correct value from shifted encoding (Display 0)', () => {
      const buffer = createColumnZeroBuffer(0);
      expect(extractColumnZero(buffer)).toBe(0);
    });

    test('extractColumnZero reads correct value from shifted encoding (Display 5)', () => {
      const buffer = createColumnZeroBuffer(5);
      expect(extractColumnZero(buffer)).toBe(5);
    });

    test('hasBorrowToColumnOne detects borrow presence', () => {
      const buffer = new Uint8Array(64) as Uint8Array<ArrayBuffer>;
      buffer[4] = 0;
      buffer[5] = 0;
      buffer[6] = 1; // Borrow present at column 1
      expect(hasBorrowToColumnOne(buffer)).toBe(true);
    });

    test('hasBorrowToColumnOne detects no borrow', () => {
      const buffer = new Uint8Array(64) as Uint8Array<ArrayBuffer>;
      expect(hasBorrowToColumnOne(buffer)).toBe(false);
    });

    test('createNegativeOneBuffer creates all-ones negative buffer', () => {
      const negOne = createNegativeOneBuffer();
      expect(negOne[0]).toBe(0); // Sign = negative
      expect(detectNegativeOne(negOne)).toBe(true);
    });
  });

  describe('Shifted Topology Regular Subtraction', () => {
    test('5 - 3 = 2 (no borrow)', () => {
      const bufferA = createColumnZeroBuffer(5);
      const bufferB = createColumnZeroBuffer(3);
      const result = DifferenceWrung(bufferA, bufferB);

      expect(extractColumnZero(result)).toBe(2);
      expect(hasBorrowToColumnOne(result)).toBe(false);
    });

    test('6 - 4 = 2 (no borrow)', () => {
      const bufferA = createColumnZeroBuffer(6);
      const bufferB = createColumnZeroBuffer(4);
      const result = DifferenceWrung(bufferA, bufferB);

      expect(extractColumnZero(result)).toBe(2);
      expect(hasBorrowToColumnOne(result)).toBe(false);
    });

    test('7 - 1 = 6 (no borrow, external carry position minus display)', () => {
      const bufferA = createColumnZeroBuffer(7);
      const bufferB = createColumnZeroBuffer(1);
      const result = DifferenceWrung(bufferA, bufferB);

      expect(extractColumnZero(result)).toBe(6);
      expect(hasBorrowToColumnOne(result)).toBe(false);
    });

    test('4 - 4 = 0 (subtracting from self, result is Marquee)', () => {
      const bufferA = createColumnZeroBuffer(4);
      const bufferB = createColumnZeroBuffer(4);
      const result = DifferenceWrung(bufferA, bufferB);

      expect(extractColumnZero(result)).toBe(0);
      expect(hasBorrowToColumnOne(result)).toBe(false);
    });

    test('2 - 5 = requires borrow (negative result in column 0)', () => {
      const bufferA = createColumnZeroBuffer(2);
      const bufferB = createColumnZeroBuffer(5);
      const result = DifferenceWrung(bufferA, bufferB);

      expect(hasBorrowToColumnOne(result)).toBe(true);
    });

    test('1 - 6 = maximum borrow to column 1', () => {
      const bufferA = createColumnZeroBuffer(1);
      const bufferB = createColumnZeroBuffer(6);
      const result = DifferenceWrung(bufferA, bufferB);

      expect(hasBorrowToColumnOne(result)).toBe(true);
    });
  });

  describe('Shifted Topology Negative One Subtraction', () => {
    // Column 0 with Negative One operands
  });

  describe('External Borrow Placeholder [0,0,0]', () => {
    // Column 0 receiving borrow from column 1 (external carry case)
  });

  describe('Marquee Position [0,0,1]', () => {
    // Column 0 as marquee (shifted holding position)
  });

  describe('Shifted Spool Selection Validation', () => {
    // Verify correct shifted spool usage
  });

  describe('Multi-Column with Column Zero', () => {
    // Subtraction involving both column 0 and other columns
  });
});
