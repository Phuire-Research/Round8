/**
 * GENERATED - Column 0 Shifted Manifold Sum Series - All 64 Addition Cases (8x8)
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
 * - Result landing on [0,0,1] → FINAL TWIST (overflow twist-off)
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

  // [0,0,1] as operand A - Marquee marker (reserved, cannot be operand)
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
    0, 1,     // 1 high bits
    [0, new Uint8Array([1, 1, 1]), new Uint8Array([1, 1, 1])]  // Error indicator
  ],
  ShiftedSumOfMarqueeAndTwo: [
    0, 0, 1,  // Marquee = 001
    0, 1,     // 2 high bits
    [1, new Uint8Array([1, 1, 1]), new Uint8Array([1, 1, 1])]  // Error indicator
  ],
  ShiftedSumOfMarqueeAndThree: [
    0, 0, 1,  // Marquee = 001
    1, 0,     // 3 high bits
    [0, new Uint8Array([1, 1, 1]), new Uint8Array([1, 1, 1])]  // Error indicator
  ],
  ShiftedSumOfMarqueeAndFour: [
    0, 0, 1,  // Marquee = 001
    1, 0,     // 4 high bits
    [1, new Uint8Array([1, 1, 1]), new Uint8Array([1, 1, 1])]  // Error indicator
  ],
  ShiftedSumOfMarqueeAndFive: [
    0, 0, 1,  // Marquee = 001
    1, 1,     // 5 high bits
    [0, new Uint8Array([1, 1, 1]), new Uint8Array([1, 1, 1])]  // Error indicator
  ],
  ShiftedSumOfMarqueeAndSix: [
    0, 0, 1,  // Marquee = 001
    1, 1,     // 6 high bits
    [1, new Uint8Array([1, 1, 1]), new Uint8Array([1, 1, 1])]  // Error indicator
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
    [1, new Uint8Array([1, 1, 1]), new Uint8Array([1, 1, 1])]  // Error indicator
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
    [1, new Uint8Array([0, 1, 0]), new Uint8Array([0, 1, 0])]  // 1+6=7 → wraps to Display 1 [010] + carry Display 1 [010]
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
    [1, new Uint8Array([1, 1, 1]), new Uint8Array([1, 1, 1])]  // Error indicator
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
    [0, new Uint8Array([0, 1, 0]), new Uint8Array([0, 1, 0])]  // 2+5=7 → wraps to Display 1 [010] + carry Display 1
  ],
  ShiftedSumOfTwoAndSix: [
    0, 1, 1,  // 2 = 011
    1, 1,     // 6 high bits
    // 2+6=8 → 8-6=2 positions into next cycle → Display 2 [011] + carry Display 1
    [1, new Uint8Array([0, 1, 1]), new Uint8Array([0, 1, 0])]  // Wraps to Display 2 [011] + carry Display 1
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
    [1, new Uint8Array([1, 1, 1]), new Uint8Array([1, 1, 1])]  // Error indicator
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
    [1, new Uint8Array([0, 1, 0]), new Uint8Array([0, 1, 0])]  // 3+4=7 → wraps to Display 1 [010] + carry
  ],
  ShiftedSumOfThreeAndFive: [
    1, 0, 0,  // 3 = 100
    1, 1,     // 5 high bits
    // 3+5=8 → 8-6=2 positions into next cycle → Display 2 [011] + carry
    [0, new Uint8Array([0, 1, 1]), new Uint8Array([0, 1, 0])]  // Wraps to Display 2 + carry Display 1
  ],
  ShiftedSumOfThreeAndSix: [
    1, 0, 0,  // 3 = 100
    1, 1,     // 6 high bits
    // 3+6=9 → 9-6=3 positions into next cycle → Display 3 [100] + carry
    [1, new Uint8Array([1, 0, 0]), new Uint8Array([0, 1, 0])]  // Wraps to Display 3 + carry Display 1
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
    [1, new Uint8Array([1, 1, 1]), new Uint8Array([1, 1, 1])]  // Error indicator
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
    [0, new Uint8Array([0, 1, 0]), new Uint8Array([0, 1, 0])]  // 4+3=7 → wraps to Display 1 + carry
  ],
  ShiftedSumOfFourAndFour: [
    1, 0, 1,  // 4 = 101
    1, 0,     // 4 high bits
    // 4+4=8 → 8-6=2 → Display 2 [011] + carry
    [1, new Uint8Array([0, 1, 1]), new Uint8Array([0, 1, 0])]  // Wraps to Display 2 + carry
  ],
  ShiftedSumOfFourAndFive: [
    1, 0, 1,  // 4 = 101
    1, 1,     // 5 high bits
    // 4+5=9 → 9-6=3 → Display 3 [100] + carry
    [0, new Uint8Array([1, 0, 0]), new Uint8Array([0, 1, 0])]  // Wraps to Display 3 + carry
  ],
  ShiftedSumOfFourAndSix: [
    1, 0, 1,  // 4 = 101
    1, 1,     // 6 high bits
    // 4+6=10 → 10-6=4 → Display 4 [101] + carry
    [1, new Uint8Array([1, 0, 1]), new Uint8Array([0, 1, 0])]  // Wraps to Display 4 + carry
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
    [1, new Uint8Array([1, 1, 1]), new Uint8Array([1, 1, 1])]  // Error indicator
  ],
  ShiftedSumOfFiveAndOne: [
    1, 1, 0,  // 5 = 110
    0, 1,     // 1 high bits
    [0, new Uint8Array([1, 1, 1])]  // 5+1=6 (111 = Display 6)
  ],
  ShiftedSumOfFiveAndTwo: [
    1, 1, 0,  // 5 = 110
    0, 1,     // 2 high bits
    [1, new Uint8Array([0, 1, 0]), new Uint8Array([0, 1, 0])]  // 5+2=7 → wraps to Display 1 + carry
  ],
  ShiftedSumOfFiveAndThree: [
    1, 1, 0,  // 5 = 110
    1, 0,     // 3 high bits
    // 5+3=8 → 8-6=2 → Display 2 [011] + carry
    [0, new Uint8Array([0, 1, 1]), new Uint8Array([0, 1, 0])]  // Wraps to Display 2 + carry
  ],
  ShiftedSumOfFiveAndFour: [
    1, 1, 0,  // 5 = 110
    1, 0,     // 4 high bits
    // 5+4=9 → 9-6=3 → Display 3 [100] + carry
    [1, new Uint8Array([1, 0, 0]), new Uint8Array([0, 1, 0])]  // Wraps to Display 3 + carry
  ],
  ShiftedSumOfFiveAndFive: [
    1, 1, 0,  // 5 = 110
    1, 1,     // 5 high bits
    // 5+5=10 → 10-6=4 → Display 4 [101] + carry
    [0, new Uint8Array([1, 0, 1]), new Uint8Array([0, 1, 0])]  // Wraps to Display 4 + carry
  ],
  ShiftedSumOfFiveAndSix: [
    1, 1, 0,  // 5 = 110
    1, 1,     // 6 high bits
    // 5+6=11 → 11-6=5 → Display 5 [110] + carry
    [1, new Uint8Array([1, 1, 0]), new Uint8Array([0, 1, 0])]  // Wraps to Display 5 + carry
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
    [1, new Uint8Array([1, 1, 1]), new Uint8Array([1, 1, 1])]  // Error indicator
  ],
  ShiftedSumOfSixAndOne: [
    1, 1, 1,  // 6 = 111
    0, 1,     // 1 high bits
    [0, new Uint8Array([0, 1, 0]), new Uint8Array([0, 1, 0])]  // 6+1=7 → wraps to Display 1 [010] + carry Display 1
  ],
  ShiftedSumOfSixAndTwo: [
    1, 1, 1,  // 6 = 111
    0, 1,     // 2 high bits
    // 6+2=8 → 8-6=2 → Display 2 [011] + carry
    [1, new Uint8Array([0, 1, 1]), new Uint8Array([0, 1, 0])]  // Wraps to Display 2 + carry Display 1
  ],
  ShiftedSumOfSixAndThree: [
    1, 1, 1,  // 6 = 111
    1, 0,     // 3 high bits
    // 6+3=9 → 9-6=3 → Display 3 [100] + carry
    [0, new Uint8Array([1, 0, 0]), new Uint8Array([0, 1, 0])]  // Wraps to Display 3 + carry
  ],
  ShiftedSumOfSixAndFour: [
    1, 1, 1,  // 6 = 111
    1, 0,     // 4 high bits
    // 6+4=10 → 10-6=4 → Display 4 [101] + carry
    [1, new Uint8Array([1, 0, 1]), new Uint8Array([0, 1, 0])]  // Wraps to Display 4 + carry
  ],
  ShiftedSumOfSixAndFive: [
    1, 1, 1,  // 6 = 111
    1, 1,     // 5 high bits
    // 6+5=11 → 11-6=5 → Display 5 [110] + carry
    [0, new Uint8Array([1, 1, 0]), new Uint8Array([0, 1, 0])]  // Wraps to Display 5 + carry
  ],
  ShiftedSumOfSixAndSix: [
    1, 1, 1,  // 6 = 111
    1, 1,     // 6 high bits
    // 6+6=12 → 12-6=6 → Display 6 [111] + carry
    [1, new Uint8Array([1, 1, 1]), new Uint8Array([0, 1, 0])]  // Wraps to Display 6 + carry Display 1
  ],
};
