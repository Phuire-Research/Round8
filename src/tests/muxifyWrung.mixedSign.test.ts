/* eslint-disable @typescript-eslint/no-unused-vars */
/**
 * muxifyWrung Test Suite - Mixed Sign Validation
 *
 * Validates signed arithmetic routing through all 8 operation+sign combinations:
 * - Addition: (+A)+(+B), (-A)+(-B), (+A)+(-B), (-A)+(+B)
 * - Subtraction: (+A)-(+B), (-A)-(-B), (+A)-(-B), (-A)-(+B)
 *
 * Tests magnitude-dependent routing where result sign depends on compareMagnitude.
 *
 * Citation: Quality-First Muxification Pattern with Sign Routing
 */

import { muxifyWrung } from '../concepts/round8/model/operations';
import { getWrungStringRepresentation, parseStringToRound8 } from '../concepts/round8/model/conference';
import { getSignBit, setSignBit } from '../concepts/round8/model/terminology';

describe('muxifyWrung - Mixed Sign Validation', () => {
  // Helper: Parse Round8 string
  const r8 = (value: string): bigint => {
    const result = parseStringToRound8(value);
    if (result === undefined) {
      throw new Error(`Invalid Round8 string: ${value}`);
    }
    return result;
  };

  // Helper: Apply negative sign to buffer
  const neg = (buffer: bigint): bigint => {
    return buffer & ~1n; // Clear sign bit (0 = negative)
  };

  // Helper: Get string representation
  const str = (wrung: bigint): string => getWrungStringRepresentation(wrung);

  describe('Addition with Mixed Signs', () => {
    describe('Case 1: (+A) + (+B) → Sum, Positive', () => {
      test('5 + 123 = 128', () => {
        const result = muxifyWrung('+', r8('5'), r8('123'));
        expect(str(result)).toBe('128');
        expect(getSignBit(result)).toBe(1); // Positive
      });
    });

    describe('Case 2: (-A) + (-B) → Sum, Negative', () => {
      test('(-5) + (-123) = -128', () => {
        const result = muxifyWrung('+', neg(r8('5')), neg(r8('123')));
        expect(str(result)).toBe('-128'); // Stringify includes sign prefix
        expect(getSignBit(result)).toBe(0); // Negative
      });
    });

    describe('Case 3: (+A) + (-B) → Difference, Sign by Magnitude', () => {
      test('123 + (-5) = 116 (A > B → positive)', () => {
        // A=123 (positive), B=5 (negative)
        // Routes to difference: 123 - 5
        const result = muxifyWrung('+', r8('123'), neg(r8('5')));
        expect(str(result)).toBe('116');
        expect(getSignBit(result)).toBe(1); // Positive (123 > 5)
      });

      test('5 + (-123) = -116 (A < B → negative)', () => {
        // FIXED: compareMagnitude now properly compares magnitudes, not signed values
        // Magnitude: |5| < |123| → 123 is anchor, result is negative
        const result = muxifyWrung('+', r8('5'), neg(r8('123')));
        expect(str(result)).toBe('-116'); // Stringify includes sign prefix
        expect(getSignBit(result)).toBe(0); // Negative (5 < 123)
      });

      test('88 + (-88) = 0 (equal magnitude)', () => {
        // FIXED: compareMagnitude now returns null for equal magnitudes
        // This triggers isEqualMagnitude short-circuit to AbsoluteZero
        const result = muxifyWrung('+', r8('88'), neg(r8('88')));
        expect(str(result)).toBe('0');
      });
    });

    describe('Case 4: (-A) + (+B) → Difference, Sign by Magnitude', () => {
      test('(-5) + 123 = 116 (B > A → positive)', () => {
        // A=5 (negative), B=123 (positive)
        // Routes to difference: 123 - 5
        const result = muxifyWrung('+', neg(r8('5')), r8('123'));
        expect(str(result)).toBe('116');
        expect(getSignBit(result)).toBe(1); // Positive (123 > 5)
      });

      test('(-123) + 5 = -116 (A > B → negative)', () => {
        // FIXED: compareMagnitude now properly compares magnitudes
        // A=123 (negative), B=5 (positive)
        // Magnitude: |123| > |5| → 123 is anchor, result is negative
        const result = muxifyWrung('+', neg(r8('123')), r8('5'));
        expect(str(result)).toBe('-116'); // Stringify includes sign prefix
        expect(getSignBit(result)).toBe(0); // Negative (123 > 5, A negative)
      });
    });
  });

  describe('Subtraction with Mixed Signs', () => {
    describe('Case 5: (+A) - (+B) → Difference, Sign by Magnitude', () => {
      test('123 - 5 = 116 (A > B → positive)', () => {
        const result = muxifyWrung('-', r8('123'), r8('5'));
        expect(str(result)).toBe('116');
        expect(getSignBit(result)).toBe(1); // Positive
      });

      test('5 - 123 = -116 (A < B → negative)', () => {
        const result = muxifyWrung('-', r8('5'), r8('123'));
        expect(str(result)).toBe('-116'); // Stringify includes sign prefix
        expect(getSignBit(result)).toBe(0); // Negative
      });
    });

    describe('Case 6: (-A) - (-B) → Difference, Sign FLIPPED', () => {
      test('(-123) - (-5) = -116 (A > B, flipped → negative)', () => {
        // A=123 (negative), B=5 (negative)
        // Routes to difference: A - B, sign FLIPPED
        // If A > B normally positive, flipped → negative
        const result = muxifyWrung('-', neg(r8('123')), neg(r8('5')));
        expect(str(result)).toBe('-116'); // Stringify includes sign prefix
        expect(getSignBit(result)).toBe(0); // Negative (flipped)
      });

      test('(-5) - (-123) = 116 (A < B, flipped → positive)', () => {
        // A=5 (negative), B=123 (negative)
        // Routes to difference: B - A (magnitude swap), sign FLIPPED
        // If B > A normally positive when swapped, flipped keeps positive
        const result = muxifyWrung('-', neg(r8('5')), neg(r8('123')));
        expect(str(result)).toBe('116');
        expect(getSignBit(result)).toBe(1); // Positive (flipped)
      });
    });

    describe('Case 7: (+A) - (-B) → Sum, Positive', () => {
      test('5 - (-123) = 128', () => {
        // Subtracting negative = adding positive
        const result = muxifyWrung('-', r8('5'), neg(r8('123')));
        expect(str(result)).toBe('128');
        expect(getSignBit(result)).toBe(1); // Positive
      });
    });

    describe('Case 8: (-A) - (+B) → Sum, Negative', () => {
      test('(-5) - 123 = -128', () => {
        // Negative minus positive = adding magnitudes, negative result
        const result = muxifyWrung('-', neg(r8('5')), r8('123'));
        expect(str(result)).toBe('-128'); // Stringify includes sign prefix
        expect(getSignBit(result)).toBe(0); // Negative
      });
    });
  });

  describe('Edge Cases with Signs', () => {
    test('AbsoluteZero + any signed value = that value', () => {
      const result = muxifyWrung('+', r8('0'), neg(r8('5')));
      expect(str(result)).toBe('-5'); // Stringify includes sign prefix
      expect(getSignBit(result)).toBe(0); // Negative
    });

    test('Any signed value + AbsoluteZero = that value', () => {
      const result = muxifyWrung('+', neg(r8('123')), r8('0'));
      expect(str(result)).toBe('-123'); // Stringify includes sign prefix
      expect(getSignBit(result)).toBe(0); // Negative
    });

    test('Signed subtraction with equal magnitude = AbsoluteZero', () => {
      const result = muxifyWrung('-', neg(r8('88')), neg(r8('88')));
      expect(str(result)).toBe('0');
    });
  });

  describe('Commutativity Verification (Sign-Aware)', () => {
    test('A + B = B + A (same signs)', () => {
      const resultAB = muxifyWrung('+', r8('5'), r8('123'));
      const resultBA = muxifyWrung('+', r8('123'), r8('5'));
      expect(str(resultAB)).toBe(str(resultBA));
      expect(getSignBit(resultAB)).toBe(getSignBit(resultBA));
    });

    test('A + B = B + A (mixed signs)', () => {
      const resultAB = muxifyWrung('+', r8('5'), neg(r8('123')));
      const resultBA = muxifyWrung('+', neg(r8('123')), r8('5'));
      expect(str(resultAB)).toBe(str(resultBA));
      expect(getSignBit(resultAB)).toBe(getSignBit(resultBA));
    });

    test('A - B != B - A (different signs expected)', () => {
      const resultAB = muxifyWrung('-', r8('123'), r8('5'));
      const resultBA = muxifyWrung('-', r8('5'), r8('123'));
      // Magnitude same but resultBA includes negative sign prefix
      expect(str(resultAB)).toBe('116'); // Positive
      expect(str(resultBA)).toBe('-116'); // Negative (includes sign prefix)
      expect(getSignBit(resultAB)).not.toBe(getSignBit(resultBA)); // Signs opposite
    });
  });
});
