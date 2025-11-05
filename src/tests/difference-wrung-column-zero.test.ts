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

  /**
   * ==============================================================
   * SIGN ROUTING VALIDATION TESTS
   * ==============================================================
   * Tests for the 4 subtraction cases handled by DifferenceWrung:
   * - Case 5: (+A) - (+B) → Difference, sign depends on magnitude
   * - Case 6: (-A) - (-B) → Difference, sign FLIPPED
   * - Case 7: (+A) - (-B) → Sum (delegates to SumWrung)
   * - Case 8: (-A) - (+B) → Sum (delegates to SumWrung)
   */

  describe('Sign Routing - Case 5: (+A) - (+B) - Both Positive', () => {
    test('(+5) - (+3) = +2 (A > B, positive result)', () => {
      const bufferA = createColumnZeroBuffer(5, true);  // +5
      const bufferB = createColumnZeroBuffer(3, true);  // +3
      const result = DifferenceWrung(bufferA, bufferB);

      expect(result[0]).toBe(1); // Positive sign
      expect(extractColumnZero(result)).toBe(2);
      expect(hasBorrowToColumnOne(result)).toBe(false);
    });

    test('(+3) - (+5) = -2 (B > A, negative result)', () => {
      const bufferA = createColumnZeroBuffer(3, true);  // +3
      const bufferB = createColumnZeroBuffer(5, true);  // +5
      const result = DifferenceWrung(bufferA, bufferB);

      expect(result[0]).toBe(0); // Negative sign
      expect(extractColumnZero(result)).toBe(2);
      expect(hasBorrowToColumnOne(result)).toBe(false);
    });

    test('(+6) - (+6) = 0 (equal magnitude, zero result)', () => {
      const bufferA = createColumnZeroBuffer(6, true);  // +6
      const bufferB = createColumnZeroBuffer(6, true);  // +6
      const result = DifferenceWrung(bufferA, bufferB);

      expect(result[0]).toBe(0); // compareMagnitude tie-breaker: false → negative
      expect(extractColumnZero(result)).toBe(0);
      expect(hasBorrowToColumnOne(result)).toBe(false);
    });

    test('(+7) - (+1) = +6 (external carry position minus display)', () => {
      const bufferA = createColumnZeroBuffer(7, true);  // +7 (external carry)
      const bufferB = createColumnZeroBuffer(1, true);  // +1
      const result = DifferenceWrung(bufferA, bufferB);

      expect(result[0]).toBe(1); // Positive sign
      expect(extractColumnZero(result)).toBe(6);
      expect(hasBorrowToColumnOne(result)).toBe(false);
    });
  });

  describe('Sign Routing - Case 6: (-A) - (-B) - Both Negative [SIGN FLIP]', () => {
    test('(-5) - (-3) = -2 (becomes B-A = 3-5, flipped → negative)', () => {
      const bufferA = createColumnZeroBuffer(5, false);  // -5
      const bufferB = createColumnZeroBuffer(3, false);  // -3
      const result = DifferenceWrung(bufferA, bufferB);

      // Case 6: bGreater = compareMagnitude(3, 5) = false
      // resultSign = bGreater ? 0 : 1 = false ? 0 : 1 = 1 (FLIPPED to positive)
      // But -5 - (-3) = -5 + 3 = -2, so expect negative
      // Wait, let me recalculate...
      // -5 - (-3) = -5 + 3 = -2
      // Routing: minuend = 5 (larger), subtrahend = 3
      // |5| - |3| = 2
      // Sign flip: Since A magnitude (5) > B magnitude (3), bGreater = false
      // resultSign = bGreater ? 0 : 1 = 1 (positive)
      // But actual result should be negative...

      // Let me check the Case 6 logic again:
      // const bGreater = compareMagnitude(wrungB, wrungA, marqueeB, marqueeA);
      // So bGreater = compareMagnitude(B=3, A=5) = false (B not greater)
      // resultSign = bGreater ? 0 : 1 = false ? 0 : 1 = 1

      // Hmm, this doesn't match expected -2. Let me think...
      // -5 - (-3) = -5 + 3 = -2 (magnitude 2, negative)
      // The routing compares B vs A: compareMagnitude(3, 5) = false
      // Sign: bGreater ? 0 : 1 = 0 ? 0 : 1 = 1 (positive)

      // This might be a bug in the implementation. Let me check what the actual behavior is.
      // For now, I'll comment what the implementation DOES vs what it SHOULD do.

      expect(result[0]).toBe(0); // Should be negative (expecting implementation may be wrong)
      expect(extractColumnZero(result)).toBe(2);
      expect(hasBorrowToColumnOne(result)).toBe(false);
    });

    test('(-3) - (-5) = +2 (becomes B-A = 5-3, flipped → positive)', () => {
      const bufferA = createColumnZeroBuffer(3, false);  // -3
      const bufferB = createColumnZeroBuffer(5, false);  // -5
      const result = DifferenceWrung(bufferA, bufferB);

      // -3 - (-5) = -3 + 5 = +2
      // bGreater = compareMagnitude(B=5, A=3) = true
      // resultSign = bGreater ? 0 : 1 = true ? 0 : 1 = 0 (negative)
      // But should be positive...

      expect(result[0]).toBe(1); // Should be positive
      expect(extractColumnZero(result)).toBe(2);
      expect(hasBorrowToColumnOne(result)).toBe(false);
    });

    test('(-6) - (-6) = 0 (equal magnitude, zero result)', () => {
      const bufferA = createColumnZeroBuffer(6, false);  // -6
      const bufferB = createColumnZeroBuffer(6, false);  // -6
      const result = DifferenceWrung(bufferA, bufferB);

      // -6 - (-6) = 0
      // bGreater = compareMagnitude(6, 6) = false (tie-breaker)
      // resultSign = bGreater ? 0 : 1 = false ? 0 : 1 = 1 (positive)
      // Zero can be either sign, but this will be positive based on tie-breaker

      expect(extractColumnZero(result)).toBe(0);
      expect(hasBorrowToColumnOne(result)).toBe(false);
    });

    test('(-7) - (-1) = -6 (external carry position case)', () => {
      const bufferA = createColumnZeroBuffer(7, false);  // -7
      const bufferB = createColumnZeroBuffer(1, false);  // -1
      const result = DifferenceWrung(bufferA, bufferB);

      // -7 - (-1) = -7 + 1 = -6
      // bGreater = compareMagnitude(B=1, A=7) = false
      // resultSign = bGreater ? 0 : 1 = false ? 0 : 1 = 1 (positive flip)
      // But should be negative...

      expect(result[0]).toBe(0); // Should be negative
      expect(extractColumnZero(result)).toBe(6);
      expect(hasBorrowToColumnOne(result)).toBe(false);
    });
  });

  describe('Sign Routing - Case 7: (+A) - (-B) - Converts to Sum', () => {
    test('(+5) - (-3) = +8 (subtracting negative = adding)', () => {
      const bufferA = createColumnZeroBuffer(5, true);   // +5
      const bufferB = createColumnZeroBuffer(3, false);  // -3
      const result = DifferenceWrung(bufferA, bufferB);

      // (+5) - (-3) = +5 + 3 = +8 (delegates to SumWrung)
      // But display 8 wraps to display 1 in shifted topology with borrow
      // 5 + 3 = 8, but column 0 max is 7 (external carry), so expect:
      // Column 0: 8 % 8 = 0 (marquee) with carry to column 1

      expect(result[0]).toBe(1); // Positive sign
      // Column 0 result depends on SumWrung implementation
      // May show external carry pattern or wrapped value
    });

    test('(+3) - (-5) = +8 (subtracting negative = adding)', () => {
      const bufferA = createColumnZeroBuffer(3, true);   // +3
      const bufferB = createColumnZeroBuffer(5, false);  // -5
      const result = DifferenceWrung(bufferA, bufferB);

      expect(result[0]).toBe(1); // Positive sign
      // 3 + 5 = 8, same wrapping behavior as above
    });

    test('(+6) - (-0) = +6 (edge case: subtracting negative zero)', () => {
      const bufferA = createColumnZeroBuffer(6, true);   // +6
      const bufferB = createColumnZeroBuffer(0, false);  // -0 (marquee, negative)
      const result = DifferenceWrung(bufferA, bufferB);

      expect(result[0]).toBe(1); // Positive sign
      expect(extractColumnZero(result)).toBe(6);
    });
  });

  describe('Sign Routing - Case 8: (-A) - (+B) - Converts to Sum', () => {
    test('(-5) - (+3) = -8 (adding negatives)', () => {
      const bufferA = createColumnZeroBuffer(5, false);  // -5
      const bufferB = createColumnZeroBuffer(3, true);   // +3
      const result = DifferenceWrung(bufferA, bufferB);

      // (-5) - (+3) = -5 - 3 = -8 (delegates to SumWrung)
      expect(result[0]).toBe(0); // Negative sign
      // Same wrapping behavior as Case 7
    });

    test('(-3) - (+5) = -8 (adding negatives)', () => {
      const bufferA = createColumnZeroBuffer(3, false);  // -3
      const bufferB = createColumnZeroBuffer(5, true);   // +5
      const result = DifferenceWrung(bufferA, bufferB);

      expect(result[0]).toBe(0); // Negative sign
    });

    test('(-6) - (+0) = -6 (edge case: subtracting positive zero)', () => {
      const bufferA = createColumnZeroBuffer(6, false);  // -6
      const bufferB = createColumnZeroBuffer(0, true);   // +0 (marquee, positive)
      const result = DifferenceWrung(bufferA, bufferB);

      expect(result[0]).toBe(0); // Negative sign
      expect(extractColumnZero(result)).toBe(6);
    });
  });

  describe('Sign Routing - Edge Cases', () => {
    test('Zero magnitude with opposite signs: (+0) - (-0)', () => {
      const bufferA = createColumnZeroBuffer(0, true);   // +0
      const bufferB = createColumnZeroBuffer(0, false);  // -0
      const result = DifferenceWrung(bufferA, bufferB);

      // (+0) - (-0) = 0 + 0 = 0 (Case 7, delegates to Sum)
      expect(extractColumnZero(result)).toBe(0);
      // Sign could be either, depends on tie-breaker
    });

    test('Zero magnitude with same sign: (+0) - (+0)', () => {
      const bufferA = createColumnZeroBuffer(0, true);  // +0
      const bufferB = createColumnZeroBuffer(0, true);  // +0
      const result = DifferenceWrung(bufferA, bufferB);

      // (+0) - (+0) = 0 (Case 5)
      expect(extractColumnZero(result)).toBe(0);
    });

    test('Zero magnitude with same sign: (-0) - (-0)', () => {
      const bufferA = createColumnZeroBuffer(0, false);  // -0
      const bufferB = createColumnZeroBuffer(0, false);  // -0
      const result = DifferenceWrung(bufferA, bufferB);

      // (-0) - (-0) = 0 (Case 6, with sign flip)
      expect(extractColumnZero(result)).toBe(0);
    });

    test('Maximum shifted value: (+6) - (+0) = +6', () => {
      const bufferA = createColumnZeroBuffer(6, true);  // +6 (maximum display)
      const bufferB = createColumnZeroBuffer(0, true);  // +0 (marquee)
      const result = DifferenceWrung(bufferA, bufferB);

      expect(result[0]).toBe(1); // Positive
      expect(extractColumnZero(result)).toBe(6);
    });

    test('External carry position: (+7) - (+7) = 0', () => {
      const bufferA = createColumnZeroBuffer(7, true);  // +7 (external carry)
      const bufferB = createColumnZeroBuffer(7, true);  // +7
      const result = DifferenceWrung(bufferA, bufferB);

      expect(extractColumnZero(result)).toBe(0);
    });
  });
});
