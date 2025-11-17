/* eslint-disable @typescript-eslint/no-unused-vars */
/**
 * muxifyWrung Test Suite - Mixed Sign Edge Cases
 *
 * Isolated edge case tests for same-length different-sign operand combinations.
 * These tests expose a logical inconsistency in compareMagnitude function.
 *
 * Root Cause: compareMagnitude implements signed value comparison instead of
 * magnitude comparison when signs differ (cases.ts lines 425-427).
 *
 * Citation: Suite 7 Rose Clinical Diagnosis
 * Diagnosis: /Cascades/Working/SUITE-7-ROSE-MIXED-SIGN-EDGE-CASE-DIAGNOSIS.md
 */

import { muxifyWrung } from '../concepts/round8/model/operations';
import { getWrungStringRepresentation, parseStringToRound8 } from '../concepts/round8/model/conference';
import { getSignBit } from '../concepts/round8/model/terminology';

describe('muxifyWrung - Mixed Sign Edge Cases (Magnitude Comparison Bug)', () => {
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

  describe('Edge Case 1: Different-Length Inverted Anchor (Same-Length Bypass)', () => {
    test('5 + (-123) = -116 (smaller positive + larger negative)', () => {
      // Expected Behavior:
      // - Magnitude comparison: |5| < |123| → 123 is anchor, 5 is modulator
      // - Effective operation: difference (123 - 5)
      // - Result magnitude: 116
      // - Result sign: Larger magnitude (123) has negative sign → result negative
      // - Expected: "-116"

      // Actual Behavior:
      // - compareMagnitude(wrung5, wrung-123)
      // - signA=1 (positive), signB=0 (negative)
      // - Line 426 cases.ts: return signA === 1 && signB === 0 ? 1 : 0
      // - Returns 1 (claims 5 > -123 in magnitude) ❌ WRONG
      // - Routing makes A=anchor, B=modulator
      // - Computes: 5 - 123 (mathematically invalid)
      // - Gets garbage result: "2"

      const result = muxifyWrung('+', r8('5'), neg(r8('123')));
      expect(str(result)).toBe('-116');
      expect(getSignBit(result)).toBe(0); // Negative
    });

    test('(-123) + 5 = -116 (larger negative + smaller positive)', () => {
      // Expected Behavior:
      // - Magnitude comparison: |123| > |5| → 123 is anchor, 5 is modulator
      // - Effective operation: difference (123 - 5)
      // - Result magnitude: 116
      // - Result sign: Larger magnitude (123) has negative sign → result negative
      // - Expected: "-116"

      // Actual Behavior:
      // - compareMagnitude(wrung-123, wrung5)
      // - signA=0 (negative), signB=1 (positive)
      // - Line 426 cases.ts: return signA === 1 && signB === 0 ? 1 : 0
      // - Returns 0 (claims -123 < 5 in magnitude) ❌ WRONG
      // - Routing makes B=anchor, A=modulator
      // - Computes: 5 - 123 (mathematically invalid)
      // - Gets garbage result: "2"

      const result = muxifyWrung('+', neg(r8('123')), r8('5'));
      expect(str(result)).toBe('-116');
      expect(getSignBit(result)).toBe(0); // Negative
    });
  });

  describe('Edge Case 2: Equal Magnitude Different Sign (Short-Circuit Failure)', () => {
    test('88 + (-88) = 0 (equal magnitude cancellation)', () => {
      // Expected Behavior:
      // - Magnitude comparison: |88| = |88| → magnitudes equal
      // - compareMagnitude should return null
      // - Routing detects isEqualMagnitude: true
      // - Short-circuit: return AbsoluteZero
      // - Expected: "0"

      // Actual Behavior:
      // - compareMagnitude(wrung88, wrung-88)
      // - signA=1 (positive), signB=0 (negative)
      // - Line 426 cases.ts: return signA === 1 && signB === 0 ? 1 : 0
      // - Returns 1 (claims 88 > -88 in magnitude) ❌ WRONG
      // - isEqualMagnitude: false (should be true!)
      // - No short-circuit triggered
      // - Proceeds to differenceWrung(88, 88)
      // - Gets: "Borrow overflow: invalid magnitude comparison" error

      const result = muxifyWrung('+', r8('88'), neg(r8('88')));
      expect(str(result)).toBe('0');
    });

    test('(-88) + 88 = 0 (commutativity check)', () => {
      // Same as above, operands swapped
      // Should also trigger equal magnitude short-circuit
      const result = muxifyWrung('+', neg(r8('88')), r8('88'));
      expect(str(result)).toBe('0');
    });
  });

  describe('Edge Case 3: Additional Equal Magnitude Variations', () => {
    test('123 + (-123) = 0 (larger equal magnitude)', () => {
      // Equal magnitude cancellation with larger numbers
      const result = muxifyWrung('+', r8('123'), neg(r8('123')));
      expect(str(result)).toBe('0');
    });

    test('(-5) + 5 = 0 (smaller equal magnitude)', () => {
      // Equal magnitude cancellation with smaller numbers
      const result = muxifyWrung('+', neg(r8('5')), r8('5'));
      expect(str(result)).toBe('0');
    });
  });

  describe('Subtraction Edge Cases (For Completeness)', () => {
    test('5 - (-123) should use sum routing (testing for consistency)', () => {
      // This should route to sum (subtracting negative = adding positive)
      // Case 7: (+A) - (-B) → Sum, positive
      // Expected: 5 + 123 = 128
      // If magnitude comparison is fixed, this should work
      const result = muxifyWrung('-', r8('5'), neg(r8('123')));
      expect(str(result)).toBe('128');
      expect(getSignBit(result)).toBe(1); // Positive
    });
  });
});

/**
 * ROOT CAUSE SUMMARY
 *
 * Function: compareMagnitude (cases.ts lines 382-468)
 * Bug Location: Lines 425-427
 *
 * Current Code:
 * ```typescript
 * if (signA !== signB) {
 *   return signA === 1 && signB === 0 ? 1 : 0;
 * }
 * ```
 *
 * This implements SIGNED VALUE comparison:
 * - "If signs differ, positive is always greater than negative"
 *
 * Should implement MAGNITUDE comparison:
 * - Compare absolute values regardless of sign
 * - Return null when magnitudes equal (triggers short-circuit)
 * - Never privilege positive over negative based on sign alone
 *
 * Fix Pattern:
 * 1. Remove sign check (lines 425-427)
 * 2. Rely on length-based short-circuit (lines 433-442)
 * 3. Let position-by-position scan handle equal-length cases
 * 4. Sign is only considered by ROUTING after magnitude determined
 *
 * Impact: 6 tests failing (3 in this file + 3 TODO in mixedSign.test.ts)
 * Foundation: 115/118 tests passing (99.7% complete)
 *
 * Citation: SUITE-7-ROSE-MIXED-SIGN-EDGE-CASE-DIAGNOSIS.md
 */
