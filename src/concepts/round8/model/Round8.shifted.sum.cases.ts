/**
 * GENERATED - Column 0 Shifted Manifold Sum Series - All 64 Addition Cases (8x8)
 * GENERATION 3: External Carry Handling with 7-Position System and Twist-Off
 *
 * Context: Column 0 Manifold Topology - Shifted Reference Frame
 *
 * CRITICAL: Column 0 uses 7-POSITION SYSTEM (not 8-position like regular columns):
 * - Position 0: [0,0,1] = Marquee (delimiter/reset point)
 * - Position 1: [0,1,0] = Display 1 (first counting position) ← SHIFTED
 * - Position 2: [0,1,1] = Display 2
 * - Position 3: [1,0,0] = Display 3
 * - Position 4: [1,0,1] = Display 4
 * - Position 5: [1,1,0] = Display 5
 * - Position 6: [1,1,1] = Display 6 (maximum counting position)
 * - Position 7: [0,0,0] = External carry arrival point (from column 1)
 * - Position 8: OVERFLOW → POSITIVE_TWIST_CASE (system boundary)
 *
 * Maximum System Value: 7,88,88,88,88,88,88,88,88,88,88
 * (Position 7 at column 0, position 8 at columns 1-20)
 *
 * External Carry Behavior:
 * - [0,0,0] arriving from column 1 = position 7 in 7-position system
 * - Acts as "advance by one position" in shifted manifold
 * - Carry + Carry = Marquee [0,0,1] (reset to delimiter)
 * - Carry + Display 6 = POSITIVE_TWIST_CASE (overflow twist-off)
 *
 * N+1 Rotation Principle (Maintained):
 * - When [0,0,0] (carry) + [0,0,1] (marquee) → marquee rotates to [0,1,0]
 * - Represents rotating reserve placement to true counting position
 *
 * Twist-Off Mechanism:
 * When overflow occurs (position 8):
 * - Returns POSITIVE_TWIST_CASE (Column 0: [0,0,0], All others: [1,1,1])
 * - ConferBidirectionally guards via buffer[4] === 1 check
 * - System detects Final Twist and restrains further operations
 *
 * Physical Correspondence:
 * This shifted spool corresponds to the leftmost column of a rotating cylinder,
 * where [0,0,1] serves as the boundary delimiter marker. The 7-position system
 * reflects the physical constraint of having both a delimiter and a carry arrival
 * point in the same symbol space.
 *
 * Pattern: ShiftedSumOfXAndY represents X + Y in Column 0 manifold
 * Array structure: [bit2_X, bit1_X, bit0_X, bit2_Y, bit1_Y, [bit0_Y, result, carry?]]
 */

type SomeSeries = Record<string, ((Uint8Array<ArrayBuffer> | number)[] | number)[]>;

// POSITIVE_TWIST_CASE - Final Twist overflow boundary marker
// Column 0: [0,0,0], All others (1-20): [1,1,1]
const POSITIVE_TWIST_CASE = Uint8Array.from([
  1,
  0, 0, 0, 1, 1, 1,
  1, 1, 1, 1, 1, 1,
  1, 1, 1, 1, 1, 1,
  1, 1, 1, 1, 1, 1,
  1, 1, 1, 1, 1, 1,
  1, 1, 1, 1, 1, 1,
  1, 1, 1, 1, 1, 1,
  1, 1, 1, 1, 1, 1,
  1, 1, 1, 1, 1, 1,
  1, 1, 1, 1, 1, 1,
  1, 1, 1,
]);

export const ShiftedSumSeries: SomeSeries = {
  // EXTERNAL CARRY OPERAND A CASES: [0,0,0] arriving from column 1
  // [0,0,0] = External carry from column 1 (position 7 in 7-position system)
  // Represents carry propagating leftward into Column 0 shifted manifold
  // System has 6 counting positions (Display 1-6) + marquee [0,0,1] + placeholder [0,0,0]
  // Maximum value: 7,88,88,88,88,88,88,88,88,88,88 (position 7 at column 0, position 8 at columns 1-20)

  // [0,0,0] as operand A - External carry from column 1
  ShiftedSumOfCarryAndCarry: [
    0, 0, 0,  // External carry = 000 (position 7)
    0, 0,     // External carry high bits
    [0, new Uint8Array([0, 0, 1])]  // Carry + Carry = Marquee [001] (two carries reset to delimiter)
  ],
  ShiftedSumOfCarryAndMarquee: [
    0, 0, 0,  // External carry = 000 (position 7)
    0, 0,     // Marquee high bits
    [1, new Uint8Array([0, 1, 0])]  // Carry + Marquee = Display 1 [010] (position 7 + position 0 = position 1)
  ],
  ShiftedSumOfCarryAndOne: [
    0, 0, 0,  // External carry = 000 (position 7)
    0, 1,     // Display 1 high bits (010)
    [0, new Uint8Array([0, 1, 1])]  // Carry + Display 1 = Display 2 [011] (position 7 + position 1 = position 2)
  ],
  ShiftedSumOfCarryAndTwo: [
    0, 0, 0,  // External carry = 000 (position 7)
    0, 1,     // Display 2 high bits (011)
    [1, new Uint8Array([1, 0, 0])]  // Carry + Display 2 = Display 3 [100] (position 7 + position 2 = position 3)
  ],
  ShiftedSumOfCarryAndThree: [
    0, 0, 0,  // External carry = 000 (position 7)
    1, 0,     // Display 3 high bits (100)
    [0, new Uint8Array([1, 0, 1])]  // Carry + Display 3 = Display 4 [101] (position 7 + position 3 = position 4)
  ],
  ShiftedSumOfCarryAndFour: [
    0, 0, 0,  // External carry = 000 (position 7)
    1, 0,     // Display 4 high bits (101)
    [1, new Uint8Array([1, 1, 0])]  // Carry + Display 4 = Display 5 [110] (position 7 + position 4 = position 5)
  ],
  ShiftedSumOfCarryAndFive: [
    0, 0, 0,  // External carry = 000 (position 7)
    1, 1,     // Display 5 high bits (110)
    [0, new Uint8Array([1, 1, 1])]  // Carry + Display 5 = Display 6 [111] (position 7 + position 5 = position 6, maximum)
  ],
  ShiftedSumOfCarryAndSix: [
    0, 0, 0,  // External carry = 000 (position 7)
    1, 1,     // Display 6 high bits (111)
    [1, POSITIVE_TWIST_CASE]  // Carry + Display 6 = OVERFLOW → TWIST-OFF (position 7 + position 6 = position 8, system boundary)
  ],

  // [0,0,1] as operand A - Marquee marker (N+1 rotation cases)
  // When [0,0,1] marquee receives addition, it rotates in place
  ShiftedSumOfMarqueeAndCarry: [
    0, 0, 1,  // Marquee = 001
    0, 0,     // External carry high bits
    [0, new Uint8Array([0, 1, 0])]  // Marquee + Carry = Display 1 [010] (position 0 + position 7 = position 1)
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
  ShiftedSumOfOneAndCarry: [
    0, 1, 0,  // Display 1 = 010
    0, 0,     // External carry high bits
    [0, new Uint8Array([0, 1, 1])]  // Display 1 + Carry = Display 2 [011] (position 1 + position 7 = position 2)
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
  ShiftedSumOfTwoAndCarry: [
    0, 1, 1,  // Display 2 = 011
    0, 0,     // External carry high bits
    [0, new Uint8Array([1, 0, 0])]  // Display 2 + Carry = Display 3 [100] (position 2 + position 7 = position 3)
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
  ShiftedSumOfThreeAndCarry: [
    1, 0, 0,  // Display 3 = 100
    0, 0,     // External carry high bits
    [0, new Uint8Array([1, 0, 1])]  // Display 3 + Carry = Display 4 [101] (position 3 + position 7 = position 4)
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
  ShiftedSumOfFourAndCarry: [
    1, 0, 1,  // Display 4 = 101
    0, 0,     // External carry high bits
    [0, new Uint8Array([1, 1, 0])]  // Display 4 + Carry = Display 5 [110] (position 4 + position 7 = position 5)
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
  ShiftedSumOfFiveAndCarry: [
    1, 1, 0,  // Display 5 = 110
    0, 0,     // External carry high bits
    [0, new Uint8Array([1, 1, 1])]  // Display 5 + Carry = Display 6 [111] (position 5 + position 7 = position 6, maximum)
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
  ShiftedSumOfSixAndCarry: [
    1, 1, 1,  // Display 6 = 111
    0, 0,     // External carry high bits
    [0, POSITIVE_TWIST_CASE]  // Display 6 + Carry = OVERFLOW → TWIST-OFF (position 6 + position 7 = position 8, system boundary)
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
