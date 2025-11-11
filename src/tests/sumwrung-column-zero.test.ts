/**
 * SumWrung Column 0 Test - Shifted Manifold Integration
 *
 * Tests Column 0 (shifted 7-position manifold) integration with ShiftedSpooledSumSeries.
 * Uses 3-column truncated buffers (columns 0, 1, 2) with 10-byte ArrayBuffer.
 *
 * Column 0: Shifted manifold (7-position system)
 *   - Position 0: [0,0,1] Marquee
 *   - Position 1-6: Displays 1-6
 *   - Position 7: [0,0,0] External carry placeholder
 *
 * Column 1-2: Regular topology (8-position system)
 *   - Displays 1-8 using [0,0,0] through [1,1,1]
 *
 * Applies Rule Set 4: Column 0 Shifted Manifold Topology
 */

import { SumWrung } from '../concepts/round8/model/Round8.cases';

describe('SumWrung - Column 0 Shifted Manifold Tests', () => {
  /**
   * Helper: Create 3-column focused buffer (full 64 bytes, but only columns 0-2 populated)
   * Column 0 (positions 1-3): Shifted topology
   * Column 1 (positions 4-6): Regular topology
   * Column 2 (positions 7-9): Regular topology
   *
   * @param col0 - Column 0 shifted display (0=Marquee, 1-6=Displays, 7=ExternalCarry)
   * @param col1 - Column 1 regular display (1-8)
   * @param col2 - Column 2 regular display (1-8)
   * @param isPositive - Sign bit (default true)
   * @returns Full 64-byte buffer with columns 0-2 set, rest zeros
   */
  const create3ColumnBuffer = (
    col0: number | null,
    col1: number | null,
    col2: number | null,
    isPositive = true
  ): Uint8Array<ArrayBuffer> => {
    const buffer = new Uint8Array(64) as Uint8Array<ArrayBuffer>;
    buffer[0] = isPositive ? 1 : 0;

    // Column 0: Shifted topology (positions 1-3)
    if (col0 !== null) {
      const col0Value = createShiftedColumnValue(col0);
      buffer[1] = col0Value[0];
      buffer[2] = col0Value[1];
      buffer[3] = col0Value[2];
    }

    // Column 1: Regular topology (positions 4-6)
    if (col1 !== null) {
      const internalValue = col1 - 1; // Display 1-8 → Binary 0-7
      buffer[4] = (internalValue >> 2) & 1;
      buffer[5] = (internalValue >> 1) & 1;
      buffer[6] = internalValue & 1;
    }

    // Column 2: Regular topology (positions 7-9)
    if (col2 !== null) {
      const internalValue = col2 - 1; // Display 1-8 → Binary 0-7
      buffer[7] = (internalValue >> 2) & 1;
      buffer[8] = (internalValue >> 1) & 1;
      buffer[9] = internalValue & 1;
    }

    return buffer;
  };

  /**
   * Helper: Extract Column 0 raw binary (shifted topology)
   * @returns [bit2, bit1, bit0] tuple
   */
  const getColumn0Binary = (buffer: Uint8Array): [number, number, number] => {
    return [buffer[1], buffer[2], buffer[3]];
  };

  /**
   * Helper: Extract Column 1 raw binary (regular topology)
   * @returns [bit2, bit1, bit0] tuple
   */
  const getColumn1Binary = (buffer: Uint8Array): [number, number, number] => {
    return [buffer[4], buffer[5], buffer[6]];
  };

  /**
   * Helper: Extract Column 2 raw binary (regular topology)
   * @returns [bit2, bit1, bit0] tuple
   */
  const getColumn2Binary = (buffer: Uint8Array): [number, number, number] => {
    return [buffer[7], buffer[8], buffer[9]];
  };

  /**
   * Helper: Interpret Column 0 binary as shifted display value
   * @returns 0=Marquee, 1-6=Display, 7=ExternalCarry
   */
  const interpretColumn0 = (buffer: Uint8Array): number => {
    const [bit2, bit1, bit0] = getColumn0Binary(buffer);

    // Marquee [0,0,1]
    if (bit2 === 0 && bit1 === 0 && bit0 === 1) return 0;

    // External carry placeholder [0,0,0]
    if (bit2 === 0 && bit1 === 0 && bit0 === 0) return 7;

    // Displays 1-6
    // Display 1: [0,1,0], Display 2: [0,1,1], Display 3: [1,0,0]
    // Display 4: [1,0,1], Display 5: [1,1,0], Display 6: [1,1,1]
    const mapping: Record<string, number> = {
      '010': 1, '011': 2, '100': 3, '101': 4, '110': 5, '111': 6
    };
    const key = `${bit2}${bit1}${bit0}`;
    return mapping[key] ?? -1; // -1 = invalid
  };

  /**
   * Helper: Extract Column 1 display value (regular topology)
   * @returns 1-8 display value
   */
  const extractColumn1Value = (buffer: Uint8Array): number => {
    const [bit2, bit1, bit0] = getColumn1Binary(buffer);
    const internalValue = (bit2 << 2) | (bit1 << 1) | bit0;
    return internalValue + 1;
  };

  // ==================== PHASE 1: Helper Function Validation ====================

  describe('Helper Function Validation', () => {
    test('createShiftedColumnValue - Marquee (0)', () => {
      const value = createShiftedColumnValue(0);
      expect(Array.from(value)).toEqual([0, 0, 1]);
    });

    test('createShiftedColumnValue - Display 1 (1)', () => {
      const value = createShiftedColumnValue(1);
      expect(Array.from(value)).toEqual([0, 1, 0]);
    });

    test('createShiftedColumnValue - Display 6 (6)', () => {
      const value = createShiftedColumnValue(6);
      expect(Array.from(value)).toEqual([1, 1, 1]);
    });

    test('createShiftedColumnValue - External carry placeholder (7)', () => {
      const value = createShiftedColumnValue(7);
      expect(Array.from(value)).toEqual([0, 0, 0]);
    });

    test('create3ColumnBuffer - Column 0 shifted Display 3', () => {
      const buffer = create3ColumnBuffer(3, null, null);
      const binary = getColumn0Binary(buffer);
      expect(binary).toEqual([1, 0, 0]); // Display 3 in shifted topology
    });

    test('create3ColumnBuffer - All three columns', () => {
      const buffer = create3ColumnBuffer(1, 5, 8);

      const col0 = getColumn0Binary(buffer);
      expect(col0).toEqual([0, 1, 0]); // Shifted Display 1

      const col1 = getColumn1Binary(buffer);
      expect(col1).toEqual([1, 0, 0]); // Regular Display 5 = Binary 100

      const col2 = getColumn2Binary(buffer);
      expect(col2).toEqual([1, 1, 1]); // Regular Display 8 = Binary 111
    });

    test('interpretColumn0 - Marquee', () => {
      const buffer = create3ColumnBuffer(0, null, null);
      expect(interpretColumn0(buffer)).toBe(0);
    });

    test('interpretColumn0 - Display 1-6', () => {
      for (let i = 1; i <= 6; i++) {
        const buffer = create3ColumnBuffer(i, null, null);
        expect(interpretColumn0(buffer)).toBe(i);
      }
    });

    test('interpretColumn0 - External carry placeholder', () => {
      const buffer = create3ColumnBuffer(7, null, null);
      expect(interpretColumn0(buffer)).toBe(7);
    });
  });

  // ==================== PHASE 2: Column 0 Direct Addition (No Carry) ====================

  describe('Column 0 Direct Addition - No External Carry', () => {
    test('Display 1 + Display 1 = Display 2', () => {
      const bufferA = create3ColumnBuffer(1, null, null); // [0,1,0]
      const bufferB = create3ColumnBuffer(1, null, null); // [0,1,0]

      console.log('TEST: Column 0 Display 1 + Display 1');
      console.log('  bufferA[1-3]:', getColumn0Binary(bufferA));
      console.log('  bufferB[1-3]:', getColumn0Binary(bufferB));

      const result = SumWrung(bufferA, bufferB);

      console.log('  result[1-3]:', getColumn0Binary(result));

      const col0Result = interpretColumn0(result);
      expect(col0Result).toBe(2); // Display 1 + Display 1 = Display 2
    });

    test('Display 2 + Display 3 = Display 5', () => {
      const bufferA = create3ColumnBuffer(2, null, null); // [0,1,1]
      const bufferB = create3ColumnBuffer(3, null, null); // [1,0,0]

      const result = SumWrung(bufferA, bufferB);

      const col0Result = interpretColumn0(result);
      expect(col0Result).toBe(5); // Display 2 + Display 3 = Display 5
    });

    test('Display 1 + Display 5 = Display 6 (maximum)', () => {
      const bufferA = create3ColumnBuffer(1, null, null); // [0,1,0]
      const bufferB = create3ColumnBuffer(5, null, null); // [1,1,0]

      const result = SumWrung(bufferA, bufferB);

      const col0Result = interpretColumn0(result);
      expect(col0Result).toBe(6); // Display 1 + Display 5 = Display 6 (max without overflow)
    });
  });

  // ==================== PHASE 3: External Carry Propagation (Column 1 → Column 0) ====================

  describe('External Carry Propagation - Column 1 to Column 0', () => {
    test('External Carry: Column 1 wrap generates carry to Column 0 Display 1 → Display 2', () => {
      // Test Configuration:
      // bufferA: Column 0 Display 1, Column 1 Display 8 (will wrap)
      // bufferB: Column 0 Marquee, Column 1 Display 1 (VALID because Column 0 is Marquee)
      //
      // Expected:
      // Column 1: 8 + 1 = 9 → wraps to Display 1 [0,0,0] + carry [0,0,0]
      // Column 0: Display 1 + Marquee + carry = Display 2
      //   Step 1: Display 1 [0,1,0] + Marquee [0,0,1] → Display 1 [0,1,0] (Marquee rotates in place)
      //   Step 2: Display 1 [0,1,0] + Carry [0,0,0] → Display 2 [0,1,1]

      const bufferA = create3ColumnBuffer(1, 8, null);
      const bufferB = create3ColumnBuffer(0, 1, null);

      const result = SumWrung(bufferA, bufferB);

      // Verify Column 0: Display 1 + Marquee + carry = Display 2
      const col0Result = interpretColumn0(result);
      expect(col0Result).toBe(2); // Display 2 [0,1,1]

      // Verify Column 1: Display 8 + Display 1 wrapped to Display 1
      const col1Result = extractColumn1Value(result);
      expect(col1Result).toBe(1); // Display 1 [0,0,0] (wrapped from 9)

      // Verify Column 2: Marquee delimiter validates entire counting range
      const col2Binary = getColumn2Binary(result);
      expect(col2Binary).toEqual([0, 0, 1]); // Marquee [0,0,1]
    });

    test('Marquee + Marquee + Carry: Guarded operation preserves Marquee state', () => {
      // Test Configuration:
      // bufferA: Column 0 Marquee, Column 1 Display 8 (will wrap)
      // bufferB: Column 0 Marquee, Column 1 Display 1 (VALID because Column 0 is Marquee)
      //
      // Expected:
      // Column 1: 8 + 1 = 9 → wraps to Display 1 [0,0,0] + carry [0,0,0]
      // Column 0: Marquee + Marquee + carry
      //   Marquee + Marquee would be error indicator [1,1,1]
      //   But system guards against this, preserving Marquee state [0,0,1]
      //
      // This demonstrates that the system protects against invalid Marquee + Marquee
      // operation even when external carry exists, maintaining stable Marquee delimiter.

      const bufferA = create3ColumnBuffer(0, 8, null);
      const bufferB = create3ColumnBuffer(0, 1, null);

      const result = SumWrung(bufferA, bufferB);

      // Verify Column 0: Marquee preserved (guarded against error indicator)
      const col0Result = interpretColumn0(result);
      expect(col0Result).toBe(0); // Marquee [0,0,1] preserved

      // Verify Column 1: Display 8 + Display 1 wrapped to Display 1
      const col1Result = extractColumn1Value(result);
      expect(col1Result).toBe(1); // Display 1 [0,0,0] (wrapped from 9)

      // Verify Column 2: Marquee delimiter validates entire counting range
      const col2Binary = getColumn2Binary(result);
      expect(col2Binary).toEqual([0, 0, 1]); // Marquee [0,0,1]
    });
  });

  // ==================== PHASE 4: Simplified External Carry Test (Future) ====================
  //
  // To properly test external carry propagation, need:
  // 1. Helper to create buffer where Column 0 is explicitly "not participating"
  // 2. Test Column 1 wraparound generating carry
  // 3. Verify Column 0 receives and processes external carry [0,0,0]
  //
  // Alternative approach: Test at SumWrung integration level where carries
  // are explicitly accumulated, rather than via ConferBidirectionally determination.
  //
});
