/**
 * SumWrung First Column Test
 *
 * Tests SumWrung functionality with only the first column (rightmost, positions 61-63)
 * using random sample pairings from 1-8 to verify:
 * 1. Correct single-rotation addition results
 * 2. Proper carry detection and handling
 */

import { SumWrung } from '../concepts/round8/model/Round8.cases';

describe('SumWrung - First Column Addition Tests', () => {
  /**
   * Helper: Create buffer with only first column set (positions 61-63)
   * All other positions are 0
   */
  const createFirstColumnBuffer = (value: number, isPositive = true): Uint8Array<ArrayBuffer> => {
    const buffer = new Uint8Array(64) as Uint8Array<ArrayBuffer>;
    buffer[0] = isPositive ? 1 : 0; // Sign bit

    // Map display value (1-8) to internal binary (0-7)
    const internalValue = value - 1;

    // Write to first column (positions 61, 62, 63)
    buffer[61] = (internalValue >> 2) & 1; // High bit
    buffer[62] = (internalValue >> 1) & 1; // Mid bit
    buffer[63] = internalValue & 1;        // Low bit

    return buffer;
  };

  /**
   * Helper: Extract first column value from buffer
   */
  const extractFirstColumn = (buffer: Uint8Array): number => {
    const bit2 = buffer[61];
    const bit1 = buffer[62];
    const bit0 = buffer[63];

    // Combine to internal value (0-7)
    const internalValue = (bit2 << 2) | (bit1 << 1) | bit0;

    // Convert to display value (1-8)
    return internalValue + 1;
  };

  /**
   * Helper: Check if second column (positions 58-60) has carry
   */
  const hasCarryToSecondColumn = (buffer: Uint8Array): boolean => {
    // If any bit in second column is set, there was a carry
    return buffer[58] !== 0 || buffer[59] !== 0 || buffer[60] !== 0;
  };

  /**
   * Helper: Extract second column value if carry exists
   */
  const extractSecondColumn = (buffer: Uint8Array): number => {
    const bit2 = buffer[58];
    const bit1 = buffer[59];
    const bit0 = buffer[60];

    const internalValue = (bit2 << 2) | (bit1 << 1) | bit0;
    return internalValue + 1;
  };

  // Random sample test cases covering different carry scenarios
  const testCases = [
    // No carry cases
    { a: 1, b: 1, expectedFirst: 2, expectedCarry: false, description: '1 + 1 = 2 (no carry)' },
    { a: 2, b: 3, expectedFirst: 5, expectedCarry: false, description: '2 + 3 = 5 (no carry)' },
    { a: 4, b: 3, expectedFirst: 7, expectedCarry: false, description: '4 + 3 = 7 (no carry)' },

    // Carry cases
    { a: 8, b: 1, expectedFirst: 8, expectedCarry: true, expectedCarryValue: 1, description: '8 + 1 = 9 → "18" (carry 1)' },
    { a: 5, b: 4, expectedFirst: 8, expectedCarry: true, expectedCarryValue: 1, description: '5 + 4 = 9 → "18" (carry 1)' },
    { a: 7, b: 3, expectedFirst: 1, expectedCarry: true, expectedCarryValue: 1, description: '7 + 3 = 10 → "21" (carry 1)' },
    { a: 8, b: 8, expectedFirst: 8, expectedCarry: true, expectedCarryValue: 1, description: '8 + 8 = 16 → "18" (carry 1)' },
    { a: 6, b: 7, expectedFirst: 4, expectedCarry: true, expectedCarryValue: 1, description: '6 + 7 = 13 → "14" (carry 1)' },
  ];

  testCases.forEach(({ a, b, expectedFirst, expectedCarry, expectedCarryValue, description }) => {
    test(description, () => {
      // Create buffers with only first column set
      const bufferA = createFirstColumnBuffer(a);
      const bufferB = createFirstColumnBuffer(b);

      console.log(`TEST: ${description}`);
      console.log(`  bufferA[61-63]: [${bufferA[61]},${bufferA[62]},${bufferA[63]}]`);
      console.log(`  bufferB[61-63]: [${bufferB[61]},${bufferB[62]},${bufferB[63]}]`);

      // Perform addition
      const result = SumWrung(bufferA, bufferB);

      // Verify first column result
      const firstColumnResult = extractFirstColumn(result);
      expect(firstColumnResult).toBe(expectedFirst);

      // Verify carry
      const hasCarry = hasCarryToSecondColumn(result);
      expect(hasCarry).toBe(expectedCarry);

      // If carry expected, verify carry value
      if (expectedCarry && expectedCarryValue !== undefined) {
        const carryValue = extractSecondColumn(result);
        expect(carryValue).toBe(expectedCarryValue);
      }
    });
  });

  test('Verify sign preservation', () => {
    const bufferA = createFirstColumnBuffer(3, true);  // Positive
    const bufferB = createFirstColumnBuffer(4, true);  // Positive

    const result = SumWrung(bufferA, bufferB);

    // Sign should be preserved (position 0)
    expect(result[0]).toBe(1); // Positive
  });
});
