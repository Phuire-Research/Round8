/**
 * GENERATED - Column 0 Shifted Manifold Difference Series - All 49 Subtraction Cases (7x7)
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
 * - Position 7: [0,0,0] = External borrow arrival point (from column 1)
 *
 * Why Shifted Frame Exists:
 * Leading zeros are pruned in regular notation, so [0,0,1] represents Display "0"
 * (the pruned leading zero), and [0,0,0] represents Display "7" (External Borrow/Carry).
 *
 * External Borrow Behavior:
 * - [0,0,0] arriving from column 1 = position 7 in 7-position system
 * - Acts as "retreat by one position" in shifted manifold
 * - Carry - Carry = Marquee [0,0,1] (reset to delimiter)
 * - Marquee - Carry = NEGATIVE_TWIST_CASE (underflow twist-off)
 *
 * Twist-Off Mechanism:
 * When underflow occurs (borrow beyond column 0):
 * - Returns NEGATIVE_TWIST_CASE (Sign 0, Column 0: [0,0,0], All others: [1,1,1])
 * - ConferBidirectionally guards via sign bit check
 * - System detects Final Twist and restrains further operations
 *
 * Pattern: ShiftedDifferenceOfXAndY represents X - Y in Column 0 manifold
 * Array structure: [bit2_X, bit1_X, bit0_X, bit2_Y, bit1_Y, [bit0_Y, result, borrow?]]
 */

type SomeSeries = Record<string, ((Uint8Array<ArrayBuffer> | number)[] | number)[]>;

// NEGATIVE_TWIST_CASE - Final Twist underflow boundary marker
// Sign 0 (negative), Column 0: [0,0,0], All others (1-20): [1,1,1]
const NEGATIVE_TWIST_CASE = Uint8Array.from([
  0,  // Sign bit 0 = negative
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

// ZERO_CASE - Absolute Zero result
const ZERO_CASE = Uint8Array.from([
  0,  // Sign bit for absolute zero
  0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0,
  0, 0, 0,
]);

export const ShiftedDifferenceSeries: SomeSeries = {
  // EXTERNAL CARRY OPERAND A CASES: [0,0,0] arriving from column 1
  // [0,0,0] = External carry from column 1 (position 7 in 7-position system)

  // Carry (000) - N cases
  ShiftedDifferenceOfCarryAndCarry: [
    0, 0, 0,  // External carry = 000 (position 7)
    0, 0,     // External carry high bits
    [0, ZERO_CASE]  // Carry - Carry = Absolute Zero
  ],
  ShiftedDifferenceOfCarryAndMarquee: [
    0, 0, 0,  // External carry = 000 (position 7)
    0, 0,     // Marquee high bits [001]
    [1, new Uint8Array([1, 1, 0]), new Uint8Array([0, 0, 0])]  // Borrow, result Display 5 [110]
  ],
  ShiftedDifferenceOfCarryAndOne: [
    0, 0, 0,  // External carry = 000 (position 7)
    0, 1,     // Display 1 high bits [010]
    [0, new Uint8Array([1, 1, 1])]  // Carry - 1 = Display 6 [111]
  ],
  ShiftedDifferenceOfCarryAndTwo: [
    0, 0, 0,  // External carry = 000 (position 7)
    0, 1,     // Display 2 high bits [011]
    [1, new Uint8Array([1, 0, 0])]  // Borrow, result Display 3 [100]
  ],
  ShiftedDifferenceOfCarryAndThree: [
    0, 0, 0,  // External carry = 000 (position 7)
    1, 0,     // Display 3 high bits [100]
    [0, new Uint8Array([0, 1, 1])]  // Carry - 3 = Display 2 [011]
  ],
  ShiftedDifferenceOfCarryAndFour: [
    0, 0, 0,  // External carry = 000 (position 7)
    1, 0,     // Display 4 high bits [101]
    [1, new Uint8Array([0, 1, 0])]  // Borrow, result Display 1 [010]
  ],
  ShiftedDifferenceOfCarryAndFive: [
    0, 0, 0,  // External carry = 000 (position 7)
    1, 1,     // Display 5 high bits [110]
    [0, new Uint8Array([0, 0, 1])]  // Carry - 5 = Marquee [001]
  ],
  ShiftedDifferenceOfCarryAndSix: [
    0, 0, 0,  // External carry = 000 (position 7)
    1, 1,     // Display 6 high bits [111]
    [1, NEGATIVE_TWIST_CASE]  // Underflow: Carry - 6 crosses boundary
  ],

  // Marquee (001) - N cases
  ShiftedDifferenceOfMarqueeAndCarry: [
    0, 0, 1,  // Marquee = 001 (position 0)
    0, 0,     // External carry high bits
    [0, NEGATIVE_TWIST_CASE]  // Underflow: Marquee - Carry crosses boundary
  ],
  ShiftedDifferenceOfMarqueeAndMarquee: [
    0, 0, 1,  // Marquee = 001 (position 0)
    0, 0,     // Marquee high bits [001]
    [1, ZERO_CASE]  // Marquee - Marquee = Absolute Zero
  ],
  ShiftedDifferenceOfMarqueeAndOne: [
    0, 0, 1,  // Marquee = 001 (position 0)
    0, 1,     // Display 1 high bits [010]
    [0, new Uint8Array([0, 0, 0])]  // Marquee - 1 = Carry [000] (retreat to position 7)
  ],
  ShiftedDifferenceOfMarqueeAndTwo: [
    0, 0, 1,  // Marquee = 001 (position 0)
    0, 1,     // Display 2 high bits [011]
    [1, new Uint8Array([1, 1, 0]), new Uint8Array([0, 0, 0])]  // Borrow, result Display 5 [110]
  ],
  ShiftedDifferenceOfMarqueeAndThree: [
    0, 0, 1,  // Marquee = 001 (position 0)
    1, 0,     // Display 3 high bits [100]
    [0, new Uint8Array([1, 0, 1])]  // Marquee - 3 = Display 4 [101]
  ],
  ShiftedDifferenceOfMarqueeAndFour: [
    0, 0, 1,  // Marquee = 001 (position 0)
    1, 0,     // Display 4 high bits [101]
    [1, new Uint8Array([1, 0, 0]), new Uint8Array([0, 0, 0])]  // Borrow, result Display 3 [100]
  ],
  ShiftedDifferenceOfMarqueeAndFive: [
    0, 0, 1,  // Marquee = 001 (position 0)
    1, 1,     // Display 5 high bits [110]
    [0, new Uint8Array([0, 1, 1])]  // Marquee - 5 = Display 2 [011]
  ],
  ShiftedDifferenceOfMarqueeAndSix: [
    0, 0, 1,  // Marquee = 001 (position 0)
    1, 1,     // Display 6 high bits [111]
    [1, new Uint8Array([0, 1, 0]), new Uint8Array([0, 0, 0])]  // Borrow, result Display 1 [010]
  ],

  // Display 1 (010) - N cases
  ShiftedDifferenceOfOneAndCarry: [
    0, 1, 0,  // Display 1 = 010 (position 1)
    0, 0,     // External carry high bits
    [0, new Uint8Array([0, 0, 1])]  // Display 1 - Carry = Marquee [001]
  ],
  ShiftedDifferenceOfOneAndMarquee: [
    0, 1, 0,  // Display 1 = 010 (position 1)
    0, 0,     // Marquee high bits [001]
    [1, new Uint8Array([0, 0, 0])]  // Display 1 - Marquee = Carry [000]
  ],
  ShiftedDifferenceOfOneAndOne: [
    0, 1, 0,  // Display 1 = 010 (position 1)
    0, 1,     // Display 1 high bits [010]
    [0, ZERO_CASE]  // Display 1 - Display 1 = Absolute Zero
  ],
  ShiftedDifferenceOfOneAndTwo: [
    0, 1, 0,  // Display 1 = 010 (position 1)
    0, 1,     // Display 2 high bits [011]
    [1, new Uint8Array([0, 0, 0]), new Uint8Array([0, 0, 0])]  // Borrow, result Carry [000]
  ],
  ShiftedDifferenceOfOneAndThree: [
    0, 1, 0,  // Display 1 = 010 (position 1)
    1, 0,     // Display 3 high bits [100]
    [0, new Uint8Array([1, 1, 0])]  // Display 1 - 3 = Display 5 [110]
  ],
  ShiftedDifferenceOfOneAndFour: [
    0, 1, 0,  // Display 1 = 010 (position 1)
    1, 0,     // Display 4 high bits [101]
    [1, new Uint8Array([1, 0, 1]), new Uint8Array([0, 0, 0])]  // Borrow, result Display 4 [101]
  ],
  ShiftedDifferenceOfOneAndFive: [
    0, 1, 0,  // Display 1 = 010 (position 1)
    1, 1,     // Display 5 high bits [110]
    [0, new Uint8Array([1, 0, 0])]  // Display 1 - 5 = Display 3 [100]
  ],
  ShiftedDifferenceOfOneAndSix: [
    0, 1, 0,  // Display 1 = 010 (position 1)
    1, 1,     // Display 6 high bits [111]
    [1, new Uint8Array([0, 1, 1]), new Uint8Array([0, 0, 0])]  // Borrow, result Display 2 [011]
  ],

  // Display 2 (011) - N cases
  ShiftedDifferenceOfTwoAndCarry: [
    0, 1, 1,  // Display 2 = 011 (position 2)
    0, 0,     // External carry high bits
    [0, new Uint8Array([0, 1, 0])]  // Display 2 - Carry = Display 1 [010]
  ],
  ShiftedDifferenceOfTwoAndMarquee: [
    0, 1, 1,  // Display 2 = 011 (position 2)
    0, 0,     // Marquee high bits [001]
    [1, new Uint8Array([0, 0, 1])]  // Display 2 - Marquee = Marquee [001]
  ],
  ShiftedDifferenceOfTwoAndOne: [
    0, 1, 1,  // Display 2 = 011 (position 2)
    0, 1,     // Display 1 high bits [010]
    [0, new Uint8Array([0, 0, 0])]  // Display 2 - 1 = Carry [000]
  ],
  ShiftedDifferenceOfTwoAndTwo: [
    0, 1, 1,  // Display 2 = 011 (position 2)
    0, 1,     // Display 2 high bits [011]
    [1, ZERO_CASE]  // Display 2 - Display 2 = Absolute Zero
  ],
  ShiftedDifferenceOfTwoAndThree: [
    0, 1, 1,  // Display 2 = 011 (position 2)
    1, 0,     // Display 3 high bits [100]
    [0, new Uint8Array([0, 0, 0])]  // Display 2 - 3 = Carry [000] (with borrow)
  ],
  ShiftedDifferenceOfTwoAndFour: [
    0, 1, 1,  // Display 2 = 011 (position 2)
    1, 0,     // Display 4 high bits [101]
    [1, new Uint8Array([1, 1, 0]), new Uint8Array([0, 0, 0])]  // Borrow, result Display 5 [110]
  ],
  ShiftedDifferenceOfTwoAndFive: [
    0, 1, 1,  // Display 2 = 011 (position 2)
    1, 1,     // Display 5 high bits [110]
    [0, new Uint8Array([1, 0, 1])]  // Display 2 - 5 = Display 4 [101]
  ],
  ShiftedDifferenceOfTwoAndSix: [
    0, 1, 1,  // Display 2 = 011 (position 2)
    1, 1,     // Display 6 high bits [111]
    [1, new Uint8Array([1, 0, 0]), new Uint8Array([0, 0, 0])]  // Borrow, result Display 3 [100]
  ],

  // Display 3 (100) - N cases
  ShiftedDifferenceOfThreeAndCarry: [
    1, 0, 0,  // Display 3 = 100 (position 3)
    0, 0,     // External carry high bits
    [0, new Uint8Array([0, 1, 1])]  // Display 3 - Carry = Display 2 [011]
  ],
  ShiftedDifferenceOfThreeAndMarquee: [
    1, 0, 0,  // Display 3 = 100 (position 3)
    0, 0,     // Marquee high bits [001]
    [1, new Uint8Array([0, 1, 0])]  // Display 3 - Marquee = Display 1 [010]
  ],
  ShiftedDifferenceOfThreeAndOne: [
    1, 0, 0,  // Display 3 = 100 (position 3)
    0, 1,     // Display 1 high bits [010]
    [0, new Uint8Array([0, 0, 1])]  // Display 3 - 1 = Marquee [001]
  ],
  ShiftedDifferenceOfThreeAndTwo: [
    1, 0, 0,  // Display 3 = 100 (position 3)
    0, 1,     // Display 2 high bits [011]
    [1, new Uint8Array([0, 0, 0])]  // Display 3 - 2 = Carry [000]
  ],
  ShiftedDifferenceOfThreeAndThree: [
    1, 0, 0,  // Display 3 = 100 (position 3)
    1, 0,     // Display 3 high bits [100]
    [0, ZERO_CASE]  // Display 3 - Display 3 = Absolute Zero
  ],
  ShiftedDifferenceOfThreeAndFour: [
    1, 0, 0,  // Display 3 = 100 (position 3)
    1, 0,     // Display 4 high bits [101]
    [1, new Uint8Array([0, 0, 0]), new Uint8Array([0, 0, 0])]  // Borrow, result Carry [000]
  ],
  ShiftedDifferenceOfThreeAndFive: [
    1, 0, 0,  // Display 3 = 100 (position 3)
    1, 1,     // Display 5 high bits [110]
    [0, new Uint8Array([1, 1, 0])]  // Display 3 - 5 = Display 5 [110] (with borrow)
  ],
  ShiftedDifferenceOfThreeAndSix: [
    1, 0, 0,  // Display 3 = 100 (position 3)
    1, 1,     // Display 6 high bits [111]
    [1, new Uint8Array([1, 0, 1]), new Uint8Array([0, 0, 0])]  // Borrow, result Display 4 [101]
  ],

  // Display 4 (101) - N cases
  ShiftedDifferenceOfFourAndCarry: [
    1, 0, 1,  // Display 4 = 101 (position 4)
    0, 0,     // External carry high bits
    [0, new Uint8Array([1, 0, 0])]  // Display 4 - Carry = Display 3 [100]
  ],
  ShiftedDifferenceOfFourAndMarquee: [
    1, 0, 1,  // Display 4 = 101 (position 4)
    0, 0,     // Marquee high bits [001]
    [1, new Uint8Array([0, 1, 1])]  // Display 4 - Marquee = Display 2 [011]
  ],
  ShiftedDifferenceOfFourAndOne: [
    1, 0, 1,  // Display 4 = 101 (position 4)
    0, 1,     // Display 1 high bits [010]
    [0, new Uint8Array([0, 1, 0])]  // Display 4 - 1 = Display 1 [010]
  ],
  ShiftedDifferenceOfFourAndTwo: [
    1, 0, 1,  // Display 4 = 101 (position 4)
    0, 1,     // Display 2 high bits [011]
    [1, new Uint8Array([0, 0, 1])]  // Display 4 - 2 = Marquee [001]
  ],
  ShiftedDifferenceOfFourAndThree: [
    1, 0, 1,  // Display 4 = 101 (position 4)
    1, 0,     // Display 3 high bits [100]
    [0, new Uint8Array([0, 0, 0])]  // Display 4 - 3 = Carry [000]
  ],
  ShiftedDifferenceOfFourAndFour: [
    1, 0, 1,  // Display 4 = 101 (position 4)
    1, 0,     // Display 4 high bits [101]
    [1, ZERO_CASE]  // Display 4 - Display 4 = Absolute Zero
  ],
  ShiftedDifferenceOfFourAndFive: [
    1, 0, 1,  // Display 4 = 101 (position 4)
    1, 1,     // Display 5 high bits [110]
    [0, new Uint8Array([0, 0, 0])]  // Display 4 - 5 = Carry [000] (with borrow)
  ],
  ShiftedDifferenceOfFourAndSix: [
    1, 0, 1,  // Display 4 = 101 (position 4)
    1, 1,     // Display 6 high bits [111]
    [1, new Uint8Array([1, 1, 0]), new Uint8Array([0, 0, 0])]  // Borrow, result Display 5 [110]
  ],

  // Display 5 (110) - N cases
  ShiftedDifferenceOfFiveAndCarry: [
    1, 1, 0,  // Display 5 = 110 (position 5)
    0, 0,     // External carry high bits
    [0, new Uint8Array([1, 0, 1])]  // Display 5 - Carry = Display 4 [101]
  ],
  ShiftedDifferenceOfFiveAndMarquee: [
    1, 1, 0,  // Display 5 = 110 (position 5)
    0, 0,     // Marquee high bits [001]
    [1, new Uint8Array([1, 0, 0])]  // Display 5 - Marquee = Display 3 [100]
  ],
  ShiftedDifferenceOfFiveAndOne: [
    1, 1, 0,  // Display 5 = 110 (position 5)
    0, 1,     // Display 1 high bits [010]
    [0, new Uint8Array([0, 1, 1])]  // Display 5 - 1 = Display 2 [011]
  ],
  ShiftedDifferenceOfFiveAndTwo: [
    1, 1, 0,  // Display 5 = 110 (position 5)
    0, 1,     // Display 2 high bits [011]
    [1, new Uint8Array([0, 1, 0])]  // Display 5 - 2 = Display 1 [010]
  ],
  ShiftedDifferenceOfFiveAndThree: [
    1, 1, 0,  // Display 5 = 110 (position 5)
    1, 0,     // Display 3 high bits [100]
    [0, new Uint8Array([0, 1, 1])]  // Display 5 - 3 = Display 2 [011]
  ],
  ShiftedDifferenceOfFiveAndFour: [
    1, 1, 0,  // Display 5 = 110 (position 5)
    1, 0,     // Display 4 high bits [101]
    [1, new Uint8Array([0, 0, 0])]  // Display 5 - 4 = Carry [000]
  ],
  ShiftedDifferenceOfFiveAndFive: [
    1, 1, 0,  // Display 5 = 110 (position 5)
    1, 1,     // Display 5 high bits [110]
    [0, ZERO_CASE]  // Display 5 - Display 5 = Absolute Zero
  ],
  ShiftedDifferenceOfFiveAndSix: [
    1, 1, 0,  // Display 5 = 110 (position 5)
    1, 1,     // Display 6 high bits [111]
    [1, new Uint8Array([0, 0, 0]), new Uint8Array([0, 0, 0])]  // Borrow, result Carry [000]
  ],

  // Display 6 (111) - N cases
  ShiftedDifferenceOfSixAndCarry: [
    1, 1, 1,  // Display 6 = 111 (position 6, maximum)
    0, 0,     // External carry high bits
    [0, new Uint8Array([1, 1, 0])]  // Display 6 - Carry = Display 5 [110]
  ],
  ShiftedDifferenceOfSixAndMarquee: [
    1, 1, 1,  // Display 6 = 111 (position 6, maximum)
    0, 0,     // Marquee high bits [001]
    [1, new Uint8Array([1, 0, 1])]  // Display 6 - Marquee = Display 4 [101]
  ],
  ShiftedDifferenceOfSixAndOne: [
    1, 1, 1,  // Display 6 = 111 (position 6, maximum)
    0, 1,     // Display 1 high bits [010]
    [0, new Uint8Array([1, 0, 0])]  // Display 6 - 1 = Display 3 [100]
  ],
  ShiftedDifferenceOfSixAndTwo: [
    1, 1, 1,  // Display 6 = 111 (position 6, maximum)
    0, 1,     // Display 2 high bits [011]
    [1, new Uint8Array([0, 1, 1])]  // Display 6 - 2 = Display 2 [011]
  ],
  ShiftedDifferenceOfSixAndThree: [
    1, 1, 1,  // Display 6 = 111 (position 6, maximum)
    1, 0,     // Display 3 high bits [100]
    [0, new Uint8Array([0, 1, 0])]  // Display 6 - 3 = Display 1 [010]
  ],
  ShiftedDifferenceOfSixAndFour: [
    1, 1, 1,  // Display 6 = 111 (position 6, maximum)
    1, 0,     // Display 4 high bits [101]
    [1, new Uint8Array([0, 1, 1])]  // Display 6 - 4 = Display 2 [011]
  ],
  ShiftedDifferenceOfSixAndFive: [
    1, 1, 1,  // Display 6 = 111 (position 6, maximum)
    1, 1,     // Display 5 high bits [110]
    [0, new Uint8Array([0, 0, 0])]  // Display 6 - 5 = Carry [000]
  ],
  ShiftedDifferenceOfSixAndSix: [
    1, 1, 1,  // Display 6 = 111 (position 6, maximum)
    1, 1,     // Display 6 high bits [111]
    [1, ZERO_CASE]  // Display 6 - Display 6 = Absolute Zero
  ],
};
