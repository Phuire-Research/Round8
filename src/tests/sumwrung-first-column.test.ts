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

  /**
   * Helper: Extract raw binary at column 19 (positions 58-60)
   */
  const getColumn19Binary = (buffer: Uint8Array): [number, number, number] => {
    return [buffer[58], buffer[59], buffer[60]];
  };

  /**
   * Helper: Extract raw binary at column 20 (positions 61-63)
   */
  const getColumn20Binary = (buffer: Uint8Array): [number, number, number] => {
    return [buffer[61], buffer[62], buffer[63]];
  };

  // Random sample test cases covering different carry scenarios
  const testCases = [
    // No carry cases - Column 19 should remain [0,0,0] (no marquee SET)
    {
      a: 1, b: 1,
      expectedFirst: 2,
      expectedCarry: false,
      expectedCol19Binary: [0, 0, 0] as [number, number, number],
      expectedCol20Binary: [0, 0, 1] as [number, number, number], // Display 2 = Binary 001 (LSB-first)
      description: '1 + 1 = 2 (no carry)'
    },
    {
      a: 2, b: 3,
      expectedFirst: 5,
      expectedCarry: false,
      expectedCol19Binary: [0, 0, 0] as [number, number, number],
      expectedCol20Binary: [1, 0, 0] as [number, number, number], // Display 5 = Binary 100 (LSB-first)
      description: '2 + 3 = 5 (no carry)'
    },
    {
      a: 4, b: 3,
      expectedFirst: 7,
      expectedCarry: false,
      expectedCol19Binary: [0, 0, 0] as [number, number, number],
      expectedCol20Binary: [1, 1, 0] as [number, number, number], // Display 7 = Binary 110
      description: '4 + 3 = 7 (no carry)'
    },

    // Carry cases - Column 19 should be [0,0,1] (marquee SET marker = Display 2)
    // Column 20 values reflect SpooledSumSeries topology wrapping
    {
      a: 8, b: 1,
      expectedFirst: 1, // SpooledSumSeries wrapped result
      expectedCarry: true,
      expectedCarryValue: 2, // Marquee [0,0,1] = Display 2 in LSB-first
      expectedCol19Binary: [0, 0, 1] as [number, number, number], // Marquee SET marker (Display 2)
      expectedCol20Binary: [0, 0, 0] as [number, number, number], // Display 1 (wrapped from topology)
      description: '8 + 1 = 9 → "21" (marquee=2, wrapped=1)'
    },
    {
      a: 5, b: 4,
      expectedFirst: 1, // SpooledSumSeries wrapped result
      expectedCarry: true,
      expectedCarryValue: 2, // Marquee [0,0,1] = Display 2 in LSB-first
      expectedCol19Binary: [0, 0, 1] as [number, number, number], // Marquee SET marker (Display 2)
      expectedCol20Binary: [0, 0, 0] as [number, number, number], // Display 1 (wrapped from topology)
      description: '5 + 4 = 9 → "21" (marquee=2, wrapped=1)'
    },
    {
      a: 7, b: 3,
      expectedFirst: 2, // SpooledSumSeries wrapped result
      expectedCarry: true,
      expectedCarryValue: 2, // Marquee [0,0,1] = Display 2 in LSB-first
      expectedCol19Binary: [0, 0, 1] as [number, number, number], // Marquee SET marker (Display 2)
      expectedCol20Binary: [0, 0, 1] as [number, number, number], // Display 2 (wrapped from topology)
      description: '7 + 3 = 10 → "22" (marquee=2, wrapped=2)'
    },
    {
      a: 8, b: 8,
      expectedFirst: 8, // SpooledSumSeries wrapped result
      expectedCarry: true,
      expectedCarryValue: 2, // Marquee [0,0,1] = Display 2 in LSB-first
      expectedCol19Binary: [0, 0, 1] as [number, number, number], // Marquee SET marker (Display 2)
      expectedCol20Binary: [1, 1, 1] as [number, number, number], // Display 8 (wrapped from topology)
      description: '8 + 8 = 16 → "28" (marquee=2, wrapped=8)'
    },
    {
      a: 6, b: 7,
      expectedFirst: 5, // SpooledSumSeries wrapped result
      expectedCarry: true,
      expectedCarryValue: 2, // Marquee [0,0,1] = Display 2 in LSB-first
      expectedCol19Binary: [0, 0, 1] as [number, number, number], // Marquee SET marker (Display 2)
      expectedCol20Binary: [1, 0, 0] as [number, number, number], // Display 5 (wrapped from topology)
      description: '6 + 7 = 13 → "25" (marquee=2, wrapped=5)'
    },
  ];

  testCases.forEach(({
    a, b,
    expectedFirst,
    expectedCarry,
    expectedCarryValue,
    expectedCol19Binary,
    expectedCol20Binary,
    description
  }) => {
    test(description, () => {
      // Create buffers with only first column set
      const bufferA = createFirstColumnBuffer(a);
      const bufferB = createFirstColumnBuffer(b);

      console.log(`TEST: ${description}`);
      console.log(`  bufferA[61-63]: [${bufferA[61]},${bufferA[62]},${bufferA[63]}]`);
      console.log(`  bufferB[61-63]: [${bufferB[61]},${bufferB[62]},${bufferB[63]}]`);

      // Perform addition
      const result = SumWrung(bufferA, bufferB);

      // Verify first column result (display value)
      const firstColumnResult = extractFirstColumn(result);
      expect(firstColumnResult).toBe(expectedFirst);

      // Verify carry (boolean)
      const hasCarry = hasCarryToSecondColumn(result);
      expect(hasCarry).toBe(expectedCarry);

      // If carry expected, verify carry value (display value)
      if (expectedCarry && expectedCarryValue !== undefined) {
        const carryValue = extractSecondColumn(result);
        expect(carryValue).toBe(expectedCarryValue);
      }

      // NEW: Verify raw binary at column 19 (positions 58-60)
      const col19Binary = getColumn19Binary(result);
      console.log(`  result[58-60] (col19): [${col19Binary[0]},${col19Binary[1]},${col19Binary[2]}]`);
      expect(col19Binary).toEqual(expectedCol19Binary);

      // NEW: Verify raw binary at column 20 (positions 61-63)
      const col20Binary = getColumn20Binary(result);
      console.log(`  result[61-63] (col20): [${col20Binary[0]},${col20Binary[1]},${col20Binary[2]}]`);
      expect(col20Binary).toEqual(expectedCol20Binary);
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
