/**
 * GENERATED - Column 0 Shifted Manifold Sum Series - All 64 Addition Cases (8x8)
 * GENERATION 2: N+1 Rotation with Marquee Position Handling
 *
 * Context: Column 0 Manifold Topology - Shifted Reference Frame
 *
 * CRITICAL: Column 0 uses SHIFTED DISPLAY MAPPING due to manifold boundary:
 * - [0,0,0] = Invalid placeholder (OR Final Twist if all others [1,1,1])
 * - [0,0,1] = Marquee marker (reserved for delimiter, NOT counting value)
 * - [0,1,0] = Display 1 (first valid counting position) ← SHIFTED
 * - [0,1,1] = Display 2
 * - [1,0,0] = Display 3
 * - [1,0,1] = Display 4
 * - [1,1,0] = Display 5
 * - [1,1,1] = Display 6 (maximum before wrap)
 *
 * Wrapping Behavior:
 * - Display 6 + Display 1 → Wraps to Display 1 + Carry
 * - Result landing on [0,0,1] → Marquee rotates in place to [0,1,0]
 *
 * N+1 Rotation Principle:
 * When carry [0,0,0] propagates from regular column to Column 0:
 * - Carry must be converted to [0,1,0] (Display 1 in shifted topology)
 * - When [0,1,0] (carry) + [0,0,1] (marquee) → marquee rotates to [0,1,0]
 * - This represents rotating the reserve marquee placement (0) to become true 1
 *
 * Physical Correspondence:
 * This shifted spool corresponds to the leftmost column of a rotating cylinder,
 * where [0,0,1] serves as the boundary delimiter marker. When summation would
 * land on the delimiter position, the system explicitly terminates at maximum
 * representational boundary (72^11).
 *
 * Future Expansion:
 * When overflow twist-off occurs (landing on [0,0,1]):
 * - Current: Return Final Twist indicator
 * - Future: Could expand into second 64-byte buffer for extended range (72^22)
 * - This provides growth path without requiring immediate implementation
 *
 * Pattern: ShiftedSumOfXAndY represents X + Y in Column 0 manifold
 * Array structure: [bit2_X, bit1_X, bit0_X, bit2_Y, bit1_Y, [bit0_Y, result, carry?]]
 */

type SomeSeries = Record<string, ((Uint8Array<ArrayBuffer> | number)[] | number)[]>;

export const ShiftedSumSeries: SomeSeries = {
  // INVALID/RESERVED OPERAND A CASES: [0,0,0] and [0,0,1]
  // [0,0,0] = Invalid placeholder at Column 0 (unless Final Twist context)
  // [0,0,1] = Marquee marker (reserved for delimiter, cannot be operand)
  // These cases are included for complete 512-case lookup coverage,
  // but should not occur in valid summation operations.
  // Returning error indicators or treating as Display 1 for graceful handling.

  // [0,0,0] as operand A - Treating as invalid/error
  ShiftedSumOfInvalidAndInvalid: [
    0, 0, 0,  // Invalid = 000
    0, 0,     // Invalid high bits
    [0, new Uint8Array([1, 1, 1]), new Uint8Array([1, 1, 1])]  // Error indicator: [111, 111]
  ],
  ShiftedSumOfInvalidAndMarquee: [
    0, 0, 0,  // Invalid = 000
    0, 0,     // Marquee high bits
    [1, new Uint8Array([1, 1, 1]), new Uint8Array([1, 1, 1])]  // Error indicator
  ],
  ShiftedSumOfInvalidAndOne: [
    0, 0, 0,  // Invalid = 000
    0, 1,     // 1 high bits (shifted Display 1 = 010)
    [0, new Uint8Array([1, 1, 1]), new Uint8Array([1, 1, 1])]  // Error indicator
  ],
  ShiftedSumOfInvalidAndTwo: [
    0, 0, 0,  // Invalid = 000
    0, 1,     // 2 high bits (shifted Display 2 = 011)
    [1, new Uint8Array([1, 1, 1]), new Uint8Array([1, 1, 1])]  // Error indicator
  ],
  ShiftedSumOfInvalidAndThree: [
    0, 0, 0,  // Invalid = 000
    1, 0,     // 3 high bits (shifted Display 3 = 100)
    [0, new Uint8Array([1, 1, 1]), new Uint8Array([1, 1, 1])]  // Error indicator
  ],
  ShiftedSumOfInvalidAndFour: [
    0, 0, 0,  // Invalid = 000
    1, 0,     // 4 high bits (shifted Display 4 = 101)
    [1, new Uint8Array([1, 1, 1]), new Uint8Array([1, 1, 1])]  // Error indicator
  ],
  ShiftedSumOfInvalidAndFive: [
    0, 0, 0,  // Invalid = 000
    1, 1,     // 5 high bits (shifted Display 5 = 110)
    [0, new Uint8Array([1, 1, 1]), new Uint8Array([1, 1, 1])]  // Error indicator
  ],
  ShiftedSumOfInvalidAndSix: [
    0, 0, 0,  // Invalid = 000
    1, 1,     // 6 high bits (shifted Display 6 = 111)
    [1, new Uint8Array([1, 1, 1]), new Uint8Array([1, 1, 1])]  // Error indicator
  ],

  // [0,0,1] as operand A - Marquee marker (N+1 rotation cases)
  // When [0,0,1] marquee receives addition, it rotates in place
  ShiftedSumOfMarqueeAndInvalid: [
    0, 0, 1,  // Marquee = 001
    0, 0,     // Invalid high bits
    [0, new Uint8Array([1, 1, 1]), new Uint8Array([1, 1, 1])]  // Error indicator
  ],
  ShiftedSumOfMarqueeAndMarquee: [
    0, 0, 1,  // Marquee = 001
    0, 0,     // Marquee high bits
    [1, new Uint8Array([1, 1, 1]), new Uint8Array([1, 1, 1])]  // Error indicator
  ],
  ShiftedSumOfMarqueeAndOne: [
    0, 0, 1,  // Marquee = 001
    0, 1,     // 1 high bits (Display 1 = 010)
    [0, new Uint8Array([0, 1, 0])]  // Marquee + Display 1 → Rotates to Display 1 [010]
  ],
  ShiftedSumOfMarqueeAndTwo: [
    0, 0, 1,  // Marquee = 001
    0, 1,     // 2 high bits (Display 2 = 011)
    [1, new Uint8Array([0, 1, 1])]  // Marquee + Display 2 → Rotates to Display 2 [011]
  ],
  ShiftedSumOfMarqueeAndThree: [
    0, 0, 1,  // Marquee = 001
    1, 0,     // 3 high bits (Display 3 = 100)
    [0, new Uint8Array([1, 0, 0])]  // Marquee + Display 3 → Rotates to Display 3 [100]
  ],
  ShiftedSumOfMarqueeAndFour: [
    0, 0, 1,  // Marquee = 001
    1, 0,     // 4 high bits (Display 4 = 101)
    [1, new Uint8Array([1, 0, 1])]  // Marquee + Display 4 → Rotates to Display 4 [101]
  ],
  ShiftedSumOfMarqueeAndFive: [
    0, 0, 1,  // Marquee = 001
    1, 1,     // 5 high bits (Display 5 = 110)
    [0, new Uint8Array([1, 1, 0])]  // Marquee + Display 5 → Rotates to Display 5 [110]
  ],
  ShiftedSumOfMarqueeAndSix: [
    0, 0, 1,  // Marquee = 001
    1, 1,     // 6 high bits (Display 6 = 111)
    [1, new Uint8Array([1, 1, 1])]  // Marquee + Display 6 → Rotates to Display 6 [111]
  ],

  // VALID SHIFTED CASES: Display 1-6 (Binary 010-111)

  // Display 1 [0,1,0] + N
  ShiftedSumOfOneAndInvalid: [
    0, 1, 0,  // 1 = 010 (shifted)
    0, 0,     // Invalid high bits
    [0, new Uint8Array([1, 1, 1]), new Uint8Array([1, 1, 1])]  // Error indicator
  ],
  ShiftedSumOfOneAndMarquee: [
    0, 1, 0,  // 1 = 010
    0, 0,     // Marquee high bits
    [1, new Uint8Array([0, 1, 0])]  // Display 1 + Marquee → Rotates to Display 1 [010]
  ],
  ShiftedSumOfOneAndOne: [
    0, 1, 0,  // 1 = 010
    0, 1,     // 1 high bits
    [0, new Uint8Array([0, 1, 1])]  // 1+1=2 (011 = Display 2 in shifted)
  ],
  ShiftedSumOfOneAndTwo: [
    0, 1, 0,  // 1 = 010
    0, 1,     // 2 high bits
    [1, new Uint8Array([1, 0, 0])]  // 1+2=3 (100 = Display 3 in shifted)
  ],
  ShiftedSumOfOneAndThree: [
    0, 1, 0,  // 1 = 010
    1, 0,     // 3 high bits
    [0, new Uint8Array([1, 0, 1])]  // 1+3=4 (101 = Display 4 in shifted)
  ],
  ShiftedSumOfOneAndFour: [
    0, 1, 0,  // 1 = 010
    1, 0,     // 4 high bits
    [1, new Uint8Array([1, 1, 0])]  // 1+4=5 (110 = Display 5 in shifted)
  ],
  ShiftedSumOfOneAndFive: [
    0, 1, 0,  // 1 = 010
    1, 1,     // 5 high bits
    [0, new Uint8Array([1, 1, 1])]  // 1+5=6 (111 = Display 6 in shifted)
  ],
  ShiftedSumOfOneAndSix: [
    0, 1, 0,  // 1 = 010
    1, 1,     // 6 high bits
    [1, new Uint8Array([0, 1, 0]), new Uint8Array([0, 1, 0])]  // 1+6=7 → wraps to Display 1 [010] + carry [010]
  ],

  // Display 2 [0,1,1] + N
  ShiftedSumOfTwoAndInvalid: [
    0, 1, 1,  // 2 = 011
    0, 0,     // Invalid high bits
    [0, new Uint8Array([1, 1, 1]), new Uint8Array([1, 1, 1])]  // Error indicator
  ],
  ShiftedSumOfTwoAndMarquee: [
    0, 1, 1,  // 2 = 011
    0, 0,     // Marquee high bits
    [1, new Uint8Array([0, 1, 1])]  // Display 2 + Marquee → Rotates to Display 2 [011]
  ],
  ShiftedSumOfTwoAndOne: [
    0, 1, 1,  // 2 = 011
    0, 1,     // 1 high bits
    [0, new Uint8Array([1, 0, 0])]  // 2+1=3 (100 = Display 3)
  ],
  ShiftedSumOfTwoAndTwo: [
    0, 1, 1,  // 2 = 011
    0, 1,     // 2 high bits
    [1, new Uint8Array([1, 0, 1])]  // 2+2=4 (101 = Display 4)
  ],
  ShiftedSumOfTwoAndThree: [
    0, 1, 1,  // 2 = 011
    1, 0,     // 3 high bits
    [0, new Uint8Array([1, 1, 0])]  // 2+3=5 (110 = Display 5)
  ],
  ShiftedSumOfTwoAndFour: [
    0, 1, 1,  // 2 = 011
    1, 0,     // 4 high bits
    [1, new Uint8Array([1, 1, 1])]  // 2+4=6 (111 = Display 6)
  ],
  ShiftedSumOfTwoAndFive: [
    0, 1, 1,  // 2 = 011
    1, 1,     // 5 high bits
    [0, new Uint8Array([0, 1, 0]), new Uint8Array([0, 1, 0])]  // 2+5=7 → wraps to Display 1 [010] + carry [010]
  ],
  ShiftedSumOfTwoAndSix: [
    0, 1, 1,  // 2 = 011
    1, 1,     // 6 high bits
    [1, new Uint8Array([0, 1, 1]), new Uint8Array([0, 1, 0])]  // 2+6=8 → wraps to Display 2 [011] + carry [010]
  ],

  // Display 3 [1,0,0] + N
  ShiftedSumOfThreeAndInvalid: [
    1, 0, 0,  // 3 = 100
    0, 0,     // Invalid high bits
    [0, new Uint8Array([1, 1, 1]), new Uint8Array([1, 1, 1])]  // Error indicator
  ],
  ShiftedSumOfThreeAndMarquee: [
    1, 0, 0,  // 3 = 100
    0, 0,     // Marquee high bits
    [1, new Uint8Array([1, 0, 0])]  // Display 3 + Marquee → Rotates to Display 3 [100]
  ],
  ShiftedSumOfThreeAndOne: [
    1, 0, 0,  // 3 = 100
    0, 1,     // 1 high bits
    [0, new Uint8Array([1, 0, 1])]  // 3+1=4 (101 = Display 4)
  ],
  ShiftedSumOfThreeAndTwo: [
    1, 0, 0,  // 3 = 100
    0, 1,     // 2 high bits
    [1, new Uint8Array([1, 1, 0])]  // 3+2=5 (110 = Display 5)
  ],
  ShiftedSumOfThreeAndThree: [
    1, 0, 0,  // 3 = 100
    1, 0,     // 3 high bits
    [0, new Uint8Array([1, 1, 1])]  // 3+3=6 (111 = Display 6)
  ],
  ShiftedSumOfThreeAndFour: [
    1, 0, 0,  // 3 = 100
    1, 0,     // 4 high bits
    [1, new Uint8Array([0, 1, 0]), new Uint8Array([0, 1, 0])]  // 3+4=7 → wraps to Display 1 [010] + carry [010]
  ],
  ShiftedSumOfThreeAndFive: [
    1, 0, 0,  // 3 = 100
    1, 1,     // 5 high bits
    [0, new Uint8Array([0, 1, 1]), new Uint8Array([0, 1, 0])]  // 3+5=8 → wraps to Display 2 [011] + carry [010]
  ],
  ShiftedSumOfThreeAndSix: [
    1, 0, 0,  // 3 = 100
    1, 1,     // 6 high bits
    [1, new Uint8Array([1, 0, 0]), new Uint8Array([0, 1, 0])]  // 3+6=9 → wraps to Display 3 [100] + carry [010]
  ],

  // Display 4 [1,0,1] + N
  ShiftedSumOfFourAndInvalid: [
    1, 0, 1,  // 4 = 101
    0, 0,     // Invalid high bits
    [0, new Uint8Array([1, 1, 1]), new Uint8Array([1, 1, 1])]  // Error indicator
  ],
  ShiftedSumOfFourAndMarquee: [
    1, 0, 1,  // 4 = 101
    0, 0,     // Marquee high bits
    [1, new Uint8Array([1, 0, 1])]  // Display 4 + Marquee → Rotates to Display 4 [101]
  ],
  ShiftedSumOfFourAndOne: [
    1, 0, 1,  // 4 = 101
    0, 1,     // 1 high bits
    [0, new Uint8Array([1, 1, 0])]  // 4+1=5 (110 = Display 5)
  ],
  ShiftedSumOfFourAndTwo: [
    1, 0, 1,  // 4 = 101
    0, 1,     // 2 high bits
    [1, new Uint8Array([1, 1, 1])]  // 4+2=6 (111 = Display 6)
  ],
  ShiftedSumOfFourAndThree: [
    1, 0, 1,  // 4 = 101
    1, 0,     // 3 high bits
    [0, new Uint8Array([0, 1, 0]), new Uint8Array([0, 1, 0])]  // 4+3=7 → wraps to Display 1 [010] + carry [010]
  ],
  ShiftedSumOfFourAndFour: [
    1, 0, 1,  // 4 = 101
    1, 0,     // 4 high bits
    [1, new Uint8Array([0, 1, 1]), new Uint8Array([0, 1, 0])]  // 4+4=8 → wraps to Display 2 [011] + carry [010]
  ],
  ShiftedSumOfFourAndFive: [
    1, 0, 1,  // 4 = 101
    1, 1,     // 5 high bits
    [0, new Uint8Array([1, 0, 0]), new Uint8Array([0, 1, 0])]  // 4+5=9 → wraps to Display 3 [100] + carry [010]
  ],
  ShiftedSumOfFourAndSix: [
    1, 0, 1,  // 4 = 101
    1, 1,     // 6 high bits
    [1, new Uint8Array([1, 0, 1]), new Uint8Array([0, 1, 0])]  // 4+6=10 → wraps to Display 4 [101] + carry [010]
  ],

  // Display 5 [1,1,0] + N
  ShiftedSumOfFiveAndInvalid: [
    1, 1, 0,  // 5 = 110
    0, 0,     // Invalid high bits
    [0, new Uint8Array([1, 1, 1]), new Uint8Array([1, 1, 1])]  // Error indicator
  ],
  ShiftedSumOfFiveAndMarquee: [
    1, 1, 0,  // 5 = 110
    0, 0,     // Marquee high bits
    [1, new Uint8Array([1, 1, 0])]  // Display 5 + Marquee → Rotates to Display 5 [110]
  ],
  ShiftedSumOfFiveAndOne: [
    1, 1, 0,  // 5 = 110
    0, 1,     // 1 high bits
    [0, new Uint8Array([1, 1, 1])]  // 5+1=6 (111 = Display 6)
  ],
  ShiftedSumOfFiveAndTwo: [
    1, 1, 0,  // 5 = 110
    0, 1,     // 2 high bits
    [1, new Uint8Array([0, 1, 0]), new Uint8Array([0, 1, 0])]  // 5+2=7 → wraps to Display 1 [010] + carry [010]
  ],
  ShiftedSumOfFiveAndThree: [
    1, 1, 0,  // 5 = 110
    1, 0,     // 3 high bits
    [0, new Uint8Array([0, 1, 1]), new Uint8Array([0, 1, 0])]  // 5+3=8 → wraps to Display 2 [011] + carry [010]
  ],
  ShiftedSumOfFiveAndFour: [
    1, 1, 0,  // 5 = 110
    1, 0,     // 4 high bits
    [1, new Uint8Array([1, 0, 0]), new Uint8Array([0, 1, 0])]  // 5+4=9 → wraps to Display 3 [100] + carry [010]
  ],
  ShiftedSumOfFiveAndFive: [
    1, 1, 0,  // 5 = 110
    1, 1,     // 5 high bits
    [0, new Uint8Array([1, 0, 1]), new Uint8Array([0, 1, 0])]  // 5+5=10 → wraps to Display 4 [101] + carry [010]
  ],
  ShiftedSumOfFiveAndSix: [
    1, 1, 0,  // 5 = 110
    1, 1,     // 6 high bits
    [1, new Uint8Array([1, 1, 0]), new Uint8Array([0, 1, 0])]  // 5+6=11 → wraps to Display 5 [110] + carry [010]
  ],

  // Display 6 [1,1,1] + N (maximum position before wrap)
  ShiftedSumOfSixAndInvalid: [
    1, 1, 1,  // 6 = 111
    0, 0,     // Invalid high bits
    [0, new Uint8Array([1, 1, 1]), new Uint8Array([1, 1, 1])]  // Error indicator
  ],
  ShiftedSumOfSixAndMarquee: [
    1, 1, 1,  // 6 = 111
    0, 0,     // Marquee high bits
    [1, new Uint8Array([1, 1, 1])]  // Display 6 + Marquee → Rotates to Display 6 [111]
  ],
  ShiftedSumOfSixAndOne: [
    1, 1, 1,  // 6 = 111
    0, 1,     // 1 high bits
    [0, new Uint8Array([0, 1, 0]), new Uint8Array([0, 1, 0])]  // 6+1=7 → wraps to Display 1 [010] + carry [010]
  ],
  ShiftedSumOfSixAndTwo: [
    1, 1, 1,  // 6 = 111
    0, 1,     // 2 high bits
    [1, new Uint8Array([0, 1, 1]), new Uint8Array([0, 1, 0])]  // 6+2=8 → wraps to Display 2 [011] + carry [010]
  ],
  ShiftedSumOfSixAndThree: [
    1, 1, 1,  // 6 = 111
    1, 0,     // 3 high bits
    [0, new Uint8Array([1, 0, 0]), new Uint8Array([0, 1, 0])]  // 6+3=9 → wraps to Display 3 [100] + carry [010]
  ],
  ShiftedSumOfSixAndFour: [
    1, 1, 1,  // 6 = 111
    1, 0,     // 4 high bits
    [1, new Uint8Array([1, 0, 1]), new Uint8Array([0, 1, 0])]  // 6+4=10 → wraps to Display 4 [101] + carry [010]
  ],
  ShiftedSumOfSixAndFive: [
    1, 1, 1,  // 6 = 111
    1, 1,     // 5 high bits
    [0, new Uint8Array([1, 1, 0]), new Uint8Array([0, 1, 0])]  // 6+5=11 → wraps to Display 5 [110] + carry [010]
  ],
  ShiftedSumOfSixAndSix: [
    1, 1, 1,  // 6 = 111
    1, 1,     // 6 high bits
    [1, new Uint8Array([1, 1, 1]), new Uint8Array([0, 1, 0])]  // 6+6=12 → wraps to Display 6 [111] + carry [010]
  ],
};
