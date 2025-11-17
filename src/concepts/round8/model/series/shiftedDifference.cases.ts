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
 * (the pruned leading zero), and [0,0,0] represents Display "7" (External Borrow/Borrow).
 *
 * External Borrow Behavior:
 * - [0,0,0] arriving from column 1 = position 7 in 7-position system
 * - Acts as "retreat by one position" in shifted manifold
 * - Borrow - Borrow = Marquee [0,0,1] (reset to delimiter)
 * - Marquee - Borrow = NEGATIVE_TWIST_CASE (underflow twist-off)
 *
 * Twist-Off Mechanism:
 * When underflow occurs (borrow beyond column 0):
 * - Returns NEGATIVE_TWIST_CASE (Sign 0, Column 0: [0,0,0], All others: [1,1,1])
 * - ConferBidirectionally guards via sign bit check
 * - System detects Final Twist and restrains further operations
 *
 * Pattern: ShiftedDifferenceOfXAndY represents X - Y in Column 0 manifold
 * Array structure: [bit2_X, bit1_X, bit0_X, bit2_Y, bit1_Y, [bit0_Y, result, borrow?]]
 *
 * 7D MANIFOLD TOPOLOGY:
 * The tuple's first index is the final bit for 6D array inference,
 * with the tuple itself creating the 7th dimension.
 * This prevents Shor factorization attacks during multiplication.
 */

import { getShiftedBitRotation, getRound8Case, Round8Cases, SomeSeries, getRegularBitRotation } from '../terminology';


export const ShiftedDifferenceSeries: SomeSeries = {
  // EXTERNAL CARRY OPERAND A CASES: [0,0,0] arriving from column 1
  // [0,0,0] = External carry from column 1 (position 7 in 7-position system)

  // This should Never Happen
  ShiftedDifferenceOfBorrowAndBorrow: (() => {
    const x = getRegularBitRotation(1);  // External carry = 000 (position 7)
    const y = getRegularBitRotation(1);  // External carry = 000 (position 7)
    const result = getShiftedBitRotation(0);
    const borrow = getRegularBitRotation(1);
    return [x[0], x[1], x[2], y[0], y[1], [y[2], result, borrow]];
  })(),

  ShiftedDifferenceOfBorrowAndMarquee: (() => {
    const x = getRegularBitRotation(1);  // External carry = 000 (position 7)
    const y = getShiftedBitRotation(0);  // Marquee = 001 (position 0)
    const result = getShiftedBitRotation(1);
    const borrow = getRegularBitRotation(1);
    return [x[0], x[1], x[2], y[0], y[1], [y[2], result, borrow]];
  })(),

  ShiftedDifferenceOfBorrowAndOne: (() => {
    const x = getRegularBitRotation(1);  // External carry = 000 (position 7)
    const y = getShiftedBitRotation(1);  // Display 1 = 010 (position 1)
    const result = getShiftedBitRotation(0);
    const borrow = getRegularBitRotation(1);
    return [x[0], x[1], x[2], y[0], y[1], [y[2], result, borrow]];
  })(),

  ShiftedDifferenceOfBorrowAndTwo: (() => {
    const x = getRegularBitRotation(1);  // External carry = 000 (position 7)
    const y = getShiftedBitRotation(2);  // Display 2 = 011 (position 2)
    const result = getShiftedBitRotation(1);
    return [x[0], x[1], x[2], y[0], y[1], [y[2], result]];
  })(),

  ShiftedDifferenceOfBorrowAndThree: (() => {
    const x = getRegularBitRotation(1);  // External carry = 000 (position 7)
    const y = getShiftedBitRotation(3);  // Display 3 = 100 (position 3)
    const result = getShiftedBitRotation(2);
    return [x[0], x[1], x[2], y[0], y[1], [y[2], result]];
  })(),

  ShiftedDifferenceOfBorrowAndFour: (() => {
    const x = getRegularBitRotation(1);  // External carry = 000 (position 7)
    const y = getShiftedBitRotation(4);  // Display 4 = 101 (position 4)
    const result = getShiftedBitRotation(3);
    return [x[0], x[1], x[2], y[0], y[1], [y[2], result]];
  })(),

  ShiftedDifferenceOfBorrowAndFive: (() => {
    const x = getShiftedBitRotation(7);  // External carry = 000 (position 7)
    const y = getShiftedBitRotation(5);  // Display 5 = 110 (position 5)
    const result = getShiftedBitRotation(8);  // Borrow - 5 = Marquee [001]
    return [x[0], x[1], x[2], y[0], y[1], [y[2], result]];
  })(),

  ShiftedDifferenceOfBorrowAndSix: (() => {
    const x = getShiftedBitRotation(7);  // External carry = 000 (position 7)
    const y = getShiftedBitRotation(6);  // Display 6 = 111 (position 6)
    const result = getShiftedBitRotation(8);  // Underflow twist-off
    return [x[0], x[1], x[2], y[0], y[1], [y[2], result]];
  })(),

  // MARQUEE OPERAND A CASES: [0,0,1] delimiter/reset point
  // Marquee (001) - N cases
  ShiftedDifferenceOfMarqueeAndBorrow: (() => {
    const x = getShiftedBitRotation(0);  // Marquee = 001 (position 0)
    const y = getShiftedBitRotation(7);  // External carry = 000 (position 7)
    const result = getShiftedBitRotation(8);  // Marquee - Borrow = Underflow
    return [x[0], x[1], x[2], y[0], y[1], [y[2], result]];
  })(),

  ShiftedDifferenceOfMarqueeAndMarquee: (() => {
    const x = getShiftedBitRotation(0);  // Marquee = 001 (position 0)
    const y = getShiftedBitRotation(0);  // Marquee = 001 (position 0)
    const result = getShiftedBitRotation(8);  // Marquee - Marquee = Absolute Zero
    return [x[0], x[1], x[2], y[0], y[1], [y[2], result]];
  })(),

  ShiftedDifferenceOfMarqueeAndOne: (() => {
    const x = getShiftedBitRotation(0);  // Marquee = 001 (position 0)
    const y = getShiftedBitRotation(1);  // Display 1 = 010 (position 1)
    const result = getShiftedBitRotation(6);  // Result: Display 6 [111]
    const borrow = getShiftedBitRotation(7);  // Borrow: External carry [000]
    return [x[0], x[1], x[2], y[0], y[1], [y[2], result, borrow]];
  })(),

  ShiftedDifferenceOfMarqueeAndTwo: (() => {
    const x = getShiftedBitRotation(0);  // Marquee = 001 (position 0)
    const y = getShiftedBitRotation(2);  // Display 2 = 011 (position 2)
    const result = getShiftedBitRotation(5);  // Result: Display 5 [110]
    const borrow = getShiftedBitRotation(7);  // Borrow: External carry [000]
    return [x[0], x[1], x[2], y[0], y[1], [y[2], result, borrow]];
  })(),

  ShiftedDifferenceOfMarqueeAndThree: (() => {
    const x = getShiftedBitRotation(0);  // Marquee = 001 (position 0)
    const y = getShiftedBitRotation(3);  // Display 3 = 100 (position 3)
    const result = getShiftedBitRotation(4);  // Result: Display 4 [101]
    const borrow = getShiftedBitRotation(7);  // Borrow: External carry [000]
    return [x[0], x[1], x[2], y[0], y[1], [y[2], result, borrow]];
  })(),

  ShiftedDifferenceOfMarqueeAndFour: (() => {
    const x = getShiftedBitRotation(0);  // Marquee = 001 (position 0)
    const y = getShiftedBitRotation(4);  // Display 4 = 101 (position 4)
    const result = getShiftedBitRotation(3);  // Result: Display 3 [100]
    const borrow = getShiftedBitRotation(7);  // Borrow: External carry [000]
    return [x[0], x[1], x[2], y[0], y[1], [y[2], result, borrow]];
  })(),

  ShiftedDifferenceOfMarqueeAndFive: (() => {
    const x = getShiftedBitRotation(0);  // Marquee = 001 (position 0)
    const y = getShiftedBitRotation(5);  // Display 5 = 110 (position 5)
    const result = getShiftedBitRotation(2);  // Result: Display 2 [011]
    const borrow = getShiftedBitRotation(7);  // Borrow: External carry [000]
    return [x[0], x[1], x[2], y[0], y[1], [y[2], result, borrow]];
  })(),

  ShiftedDifferenceOfMarqueeAndSix: (() => {
    const x = getShiftedBitRotation(0);  // Marquee = 001 (position 0)
    const y = getShiftedBitRotation(6);  // Display 6 = 111 (position 6)
    const result = getShiftedBitRotation(1);  // Result: Display 1 [010]
    const borrow = getShiftedBitRotation(7);  // Borrow: External carry [000]
    return [x[0], x[1], x[2], y[0], y[1], [y[2], result, borrow]];
  })(),

  // Display 1 (010) - N cases
  ShiftedDifferenceOfOneAndBorrow: (() => {
    const x = getShiftedBitRotation(1);  // Display 1 = 010 (position 1)
    const y = getShiftedBitRotation(7);  // External carry = 000 (position 7)
    const result = getShiftedBitRotation(8);  // Display 1 - Borrow = Marquee [001]
    return [x[0], x[1], x[2], y[0], y[1], [y[2], result]];
  })(),

  ShiftedDifferenceOfOneAndMarquee: (() => {
    const x = getShiftedBitRotation(1);  // Display 1 = 010 (position 1)
    const y = getShiftedBitRotation(0);  // Marquee = 001 (position 0)
    const result = getShiftedBitRotation(7);  // Display 1 - Marquee = Borrow [000]
    return [x[0], x[1], x[2], y[0], y[1], [y[2], result]];
  })(),

  ShiftedDifferenceOfOneAndOne: (() => {
    const x = getShiftedBitRotation(1);  // Display 1 = 010 (position 1)
    const y = getShiftedBitRotation(1);  // Display 1 = 010 (position 1)
    const result = getShiftedBitRotation(0);  // Display 1 - Display 1 = Absolute Zero
    return [x[0], x[1], x[2], y[0], y[1], [y[2], result]];
  })(),

  ShiftedDifferenceOfOneAndTwo: (() => {
    const x = getShiftedBitRotation(1);  // Display 1 = 010 (position 1)
    const y = getShiftedBitRotation(2);  // Display 2 = 011 (position 2)
    const result = getShiftedBitRotation(6);  // Result: Display 6 [111]
    const borrow = getShiftedBitRotation(7);  // Borrow: External carry [000]
    return [x[0], x[1], x[2], y[0], y[1], [y[2], result, borrow]];
  })(),

  ShiftedDifferenceOfOneAndThree: (() => {
    const x = getShiftedBitRotation(1);  // Display 1 = 010 (position 1)
    const y = getShiftedBitRotation(3);  // Display 3 = 100 (position 3)
    const result = getShiftedBitRotation(5);  // Result: Display 5 [110]
    const borrow = getShiftedBitRotation(7);  // Borrow: External carry [000]
    return [x[0], x[1], x[2], y[0], y[1], [y[2], result, borrow]];
  })(),

  ShiftedDifferenceOfOneAndFour: (() => {
    const x = getShiftedBitRotation(1);  // Display 1 = 010 (position 1)
    const y = getShiftedBitRotation(4);  // Display 4 = 101 (position 4)
    const result = getShiftedBitRotation(4);  // Result: Display 4 [101]
    const borrow = getShiftedBitRotation(7);  // Borrow: External carry [000]
    return [x[0], x[1], x[2], y[0], y[1], [y[2], result, borrow]];
  })(),

  ShiftedDifferenceOfOneAndFive: (() => {
    const x = getShiftedBitRotation(1);  // Display 1 = 010 (position 1)
    const y = getShiftedBitRotation(5);  // Display 5 = 110 (position 5)
    const result = getShiftedBitRotation(3);  // Result: Display 3 [100]
    const borrow = getShiftedBitRotation(7);  // Borrow: External carry [000]
    return [x[0], x[1], x[2], y[0], y[1], [y[2], result, borrow]];
  })(),

  ShiftedDifferenceOfOneAndSix: (() => {
    const x = getShiftedBitRotation(1);  // Display 1 = 010 (position 1)
    const y = getShiftedBitRotation(6);  // Display 6 = 111 (position 6)
    const result = getShiftedBitRotation(2);  // Result: Display 2 [011]
    const borrow = getShiftedBitRotation(7);  // Borrow: External carry [000]
    return [x[0], x[1], x[2], y[0], y[1], [y[2], result, borrow]];
  })(),

  // Display 2 (011) - N cases
  ShiftedDifferenceOfTwoAndBorrow: (() => {
    const x = getShiftedBitRotation(2);  // Display 2 = 011 (position 2)
    const y = getShiftedBitRotation(7);  // External carry = 000 (position 7)
    const result = getShiftedBitRotation(1);  // Display 2 - Borrow = Display 1 [010]
    return [x[0], x[1], x[2], y[0], y[1], [y[2], result]];
  })(),

  ShiftedDifferenceOfTwoAndMarquee: (() => {
    const x = getShiftedBitRotation(2);  // Display 2 = 011 (position 2)
    const y = getShiftedBitRotation(0);  // Marquee = 001 (position 0)
    const result = getShiftedBitRotation(8);  // Display 2 - Marquee = Marquee [001]
    return [x[0], x[1], x[2], y[0], y[1], [y[2], result]];
  })(),

  ShiftedDifferenceOfTwoAndOne: (() => {
    const x = getShiftedBitRotation(2);  // Display 2 = 011 (position 2)
    const y = getShiftedBitRotation(1);  // Display 1 = 010 (position 1)
    const result = getShiftedBitRotation(7);  // Display 2 - 1 = Borrow [000]
    return [x[0], x[1], x[2], y[0], y[1], [y[2], result]];
  })(),

  ShiftedDifferenceOfTwoAndTwo: (() => {
    const x = getShiftedBitRotation(2);  // Display 2 = 011 (position 2)
    const y = getShiftedBitRotation(2);  // Display 2 = 011 (position 2)
    const result = getShiftedBitRotation(8);  // Display 2 - Display 2 = Absolute Zero
    return [x[0], x[1], x[2], y[0], y[1], [y[2], result]];
  })(),

  ShiftedDifferenceOfTwoAndThree: (() => {
    const x = getShiftedBitRotation(2);  // Display 2 = 011 (position 2)
    const y = getShiftedBitRotation(3);  // Display 3 = 100 (position 3)
    const result = getShiftedBitRotation(7);  // Display 2 - 3 = Borrow [000] (with borrow)
    const borrow = getShiftedBitRotation(7);  // Borrow: External carry [000]
    return [x[0], x[1], x[2], y[0], y[1], [y[2], result, borrow]];
  })(),

  ShiftedDifferenceOfTwoAndFour: (() => {
    const x = getShiftedBitRotation(2);  // Display 2 = 011 (position 2)
    const y = getShiftedBitRotation(4);  // Display 4 = 101 (position 4)
    const result = getShiftedBitRotation(5);  // Result: Display 5 [110]
    const borrow = getShiftedBitRotation(7);  // Borrow: External carry [000]
    return [x[0], x[1], x[2], y[0], y[1], [y[2], result, borrow]];
  })(),

  ShiftedDifferenceOfTwoAndFive: (() => {
    const x = getShiftedBitRotation(2);  // Display 2 = 011 (position 2)
    const y = getShiftedBitRotation(5);  // Display 5 = 110 (position 5)
    const result = getShiftedBitRotation(4);  // Display 2 - 5 = Display 4 [101]
    return [x[0], x[1], x[2], y[0], y[1], [y[2], result]];
  })(),

  ShiftedDifferenceOfTwoAndSix: (() => {
    const x = getShiftedBitRotation(2);  // Display 2 = 011 (position 2)
    const y = getShiftedBitRotation(6);  // Display 6 = 111 (position 6)
    const result = getShiftedBitRotation(3);  // Result: Display 3 [100]
    const borrow = getShiftedBitRotation(7);  // Borrow: External carry [000]
    return [x[0], x[1], x[2], y[0], y[1], [y[2], result, borrow]];
  })(),

  // Display 3 (100) - N cases
  ShiftedDifferenceOfThreeAndBorrow: (() => {
    const x = getShiftedBitRotation(3);  // Display 3 = 100 (position 3)
    const y = getShiftedBitRotation(7);  // External carry = 000 (position 7)
    const result = getShiftedBitRotation(2);  // Display 3 - Borrow = Display 2 [011]
    return [x[0], x[1], x[2], y[0], y[1], [y[2], result]];
  })(),

  ShiftedDifferenceOfThreeAndMarquee: (() => {
    const x = getShiftedBitRotation(3);  // Display 3 = 100 (position 3)
    const y = getShiftedBitRotation(0);  // Marquee = 001 (position 0)
    const result = getShiftedBitRotation(1);  // Display 3 - Marquee = Display 1 [010]
    return [x[0], x[1], x[2], y[0], y[1], [y[2], result]];
  })(),

  ShiftedDifferenceOfThreeAndOne: (() => {
    const x = getShiftedBitRotation(3);  // Display 3 = 100 (position 3)
    const y = getShiftedBitRotation(1);  // Display 1 = 010 (position 1)
    const result = getShiftedBitRotation(0);  // Display 3 - 1 = Marquee [001]
    return [x[0], x[1], x[2], y[0], y[1], [y[2], result]];
  })(),

  ShiftedDifferenceOfThreeAndTwo: (() => {
    const x = getShiftedBitRotation(3);  // Display 3 = 100 (position 3)
    const y = getShiftedBitRotation(2);  // Display 2 = 011 (position 2)
    const result = getShiftedBitRotation(7);  // Display 3 - 2 = Borrow [000]
    return [x[0], x[1], x[2], y[0], y[1], [y[2], result]];
  })(),

  ShiftedDifferenceOfThreeAndThree: (() => {
    const x = getShiftedBitRotation(3);  // Display 3 = 100 (position 3)
    const y = getShiftedBitRotation(3);  // Display 3 = 100 (position 3)
    const result = getShiftedBitRotation(8);  // Display 3 - Display 3 = Absolute Zero
    return [x[0], x[1], x[2], y[0], y[1], [y[2], result]];
  })(),

  ShiftedDifferenceOfThreeAndFour: (() => {
    const x = getShiftedBitRotation(3);  // Display 3 = 100 (position 3)
    const y = getShiftedBitRotation(4);  // Display 4 = 101 (position 4)
    const result = getShiftedBitRotation(6);  // Result: Display 6 [111]
    const borrow = getShiftedBitRotation(7);  // Borrow: External carry [000]
    return [x[0], x[1], x[2], y[0], y[1], [y[2], result, borrow]];
  })(),

  ShiftedDifferenceOfThreeAndFive: (() => {
    const x = getShiftedBitRotation(3);  // Display 3 = 100 (position 3)
    const y = getShiftedBitRotation(5);  // Display 5 = 110 (position 5)
    const result = getShiftedBitRotation(5);  // Display 3 - 5 = Display 5 [110]
    const borrow = getShiftedBitRotation(7);  // Borrow: External carry [000]
    return [x[0], x[1], x[2], y[0], y[1], [y[2], result, borrow]];
  })(),

  ShiftedDifferenceOfThreeAndSix: (() => {
    const x = getShiftedBitRotation(3);  // Display 3 = 100 (position 3)
    const y = getShiftedBitRotation(6);  // Display 6 = 111 (position 6)
    const result = getShiftedBitRotation(4);  // Result: Display 4 [101]
    const borrow = getShiftedBitRotation(7);  // Borrow: External carry [000]
    return [x[0], x[1], x[2], y[0], y[1], [y[2], result, borrow]];
  })(),

  // Display 4 (101) - N cases
  ShiftedDifferenceOfFourAndBorrow: (() => {
    const x = getShiftedBitRotation(4);  // Display 4 = 101 (position 4)
    const y = getShiftedBitRotation(7);  // External carry = 000 (position 7)
    const result = getShiftedBitRotation(3);  // Display 4 - Borrow = Display 3 [100]
    return [x[0], x[1], x[2], y[0], y[1], [y[2], result]];
  })(),

  ShiftedDifferenceOfFourAndMarquee: (() => {
    const x = getShiftedBitRotation(4);  // Display 4 = 101 (position 4)
    const y = getShiftedBitRotation(0);  // Marquee = 001 (position 0)
    const result = getShiftedBitRotation(2);  // Display 4 - Marquee = Display 2 [011]
    return [x[0], x[1], x[2], y[0], y[1], [y[2], result]];
  })(),

  ShiftedDifferenceOfFourAndOne: (() => {
    const x = getShiftedBitRotation(4);  // Display 4 = 101 (position 4)
    const y = getShiftedBitRotation(1);  // Display 1 = 010 (position 1)
    const result = getShiftedBitRotation(1);  // Display 4 - 1 = Display 1 [010]
    return [x[0], x[1], x[2], y[0], y[1], [y[2], result]];
  })(),

  ShiftedDifferenceOfFourAndTwo: (() => {
    const x = getShiftedBitRotation(4);  // Display 4 = 101 (position 4)
    const y = getShiftedBitRotation(2);  // Display 2 = 011 (position 2)
    const result = getShiftedBitRotation(0);  // Display 4 - 2 = Marquee [001]
    return [x[0], x[1], x[2], y[0], y[1], [y[2], result]];
  })(),

  ShiftedDifferenceOfFourAndThree: (() => {
    const x = getShiftedBitRotation(4);  // Display 4 = 101 (position 4)
    const y = getShiftedBitRotation(3);  // Display 3 = 100 (position 3)
    const result = getShiftedBitRotation(7);  // Display 4 - 3 = Borrow [000]
    return [x[0], x[1], x[2], y[0], y[1], [y[2], result]];
  })(),

  ShiftedDifferenceOfFourAndFour: (() => {
    const x = getShiftedBitRotation(4);  // Display 4 = 101 (position 4)
    const y = getShiftedBitRotation(4);  // Display 4 = 101 (position 4)
    const result = getShiftedBitRotation(0);  // Display 4 - Display 4 = Absolute Zero
    return [x[0], x[1], x[2], y[0], y[1], [y[2], result]];
  })(),

  ShiftedDifferenceOfFourAndFive: (() => {
    const x = getShiftedBitRotation(4);  // Display 4 = 101 (position 4)
    const y = getShiftedBitRotation(5);  // Display 5 = 110 (position 5)
    const result = getShiftedBitRotation(6);  // Result: Display 6 [111]
    const borrow = getShiftedBitRotation(7);  // Borrow: External carry [000]
    return [x[0], x[1], x[2], y[0], y[1], [y[2], result, borrow]];
  })(),

  ShiftedDifferenceOfFourAndSix: (() => {
    const x = getShiftedBitRotation(4);  // Display 4 = 101 (position 4)
    const y = getShiftedBitRotation(6);  // Display 6 = 111 (position 6)
    const result = getShiftedBitRotation(5);  // Result: Display 5 [110]
    const borrow = getShiftedBitRotation(7);  // Borrow: External carry [000]
    return [x[0], x[1], x[2], y[0], y[1], [y[2], result, borrow]];
  })(),

  // Display 5 (110) - N cases
  ShiftedDifferenceOfFiveAndBorrow: (() => {
    const x = getShiftedBitRotation(5);  // Display 5 = 110 (position 5)
    const y = getShiftedBitRotation(7);  // External carry = 000 (position 7)
    const result = getShiftedBitRotation(4);  // Display 5 - Borrow = Display 4 [101]
    return [x[0], x[1], x[2], y[0], y[1], [y[2], result]];
  })(),

  ShiftedDifferenceOfFiveAndMarquee: (() => {
    const x = getShiftedBitRotation(5);  // Display 5 = 110 (position 5)
    const y = getShiftedBitRotation(0);  // Marquee = 001 (position 0)
    const result = getShiftedBitRotation(3);  // Display 5 - Marquee = Display 3 [100]
    return [x[0], x[1], x[2], y[0], y[1], [y[2], result]];
  })(),

  ShiftedDifferenceOfFiveAndOne: (() => {
    const x = getShiftedBitRotation(5);  // Display 5 = 110 (position 5)
    const y = getShiftedBitRotation(1);  // Display 1 = 010 (position 1)
    const result = getShiftedBitRotation(2);  // Display 5 - 1 = Display 2 [011]
    return [x[0], x[1], x[2], y[0], y[1], [y[2], result]];
  })(),

  ShiftedDifferenceOfFiveAndTwo: (() => {
    const x = getShiftedBitRotation(5);  // Display 5 = 110 (position 5)
    const y = getShiftedBitRotation(2);  // Display 2 = 011 (position 2)
    const result = getShiftedBitRotation(1);  // Display 5 - 2 = Display 1 [010]
    return [x[0], x[1], x[2], y[0], y[1], [y[2], result]];
  })(),

  ShiftedDifferenceOfFiveAndThree: (() => {
    const x = getShiftedBitRotation(5);  // Display 5 = 110 (position 5)
    const y = getShiftedBitRotation(3);  // Display 3 = 100 (position 3)
    const result = getShiftedBitRotation(0);  // Display 5 - 3 = Marquee [001]
    return [x[0], x[1], x[2], y[0], y[1], [y[2], result]];
  })(),

  ShiftedDifferenceOfFiveAndFour: (() => {
    const x = getShiftedBitRotation(5);  // Display 5 = 110 (position 5)
    const y = getShiftedBitRotation(4);  // Display 4 = 101 (position 4)
    const result = getShiftedBitRotation(7);  // Display 5 - 4 = Borrow [000]
    return [x[0], x[1], x[2], y[0], y[1], [y[2], result]];
  })(),

  ShiftedDifferenceOfFiveAndFive: (() => {
    const x = getShiftedBitRotation(5);  // Display 5 = 110 (position 5)
    const y = getShiftedBitRotation(5);  // Display 5 = 110 (position 5)
    const result = getShiftedBitRotation(8);  // Display 5 - Display 5 = Absolute Zero
    return [x[0], x[1], x[2], y[0], y[1], [y[2], result]];
  })(),

  ShiftedDifferenceOfFiveAndSix: (() => {
    const x = getShiftedBitRotation(5);  // Display 5 = 110 (position 5)
    const y = getShiftedBitRotation(6);  // Display 6 = 111 (position 6)
    const result = getShiftedBitRotation(6);  // Result: Display 6 [111]
    const borrow = getShiftedBitRotation(7);  // Borrow: External carry [000]
    return [x[0], x[1], x[2], y[0], y[1], [y[2], result, borrow]];
  })(),

  // Display 6 (111) - N cases
  ShiftedDifferenceOfSixAndBorrow: (() => {
    const x = getShiftedBitRotation(6);  // Display 6 = 111 (position 6)
    const y = getShiftedBitRotation(7);  // External carry = 000 (position 7)
    const result = getShiftedBitRotation(5);  // Display 6 - Borrow = Display 5 [110]
    return [x[0], x[1], x[2], y[0], y[1], [y[2], result]];
  })(),

  ShiftedDifferenceOfSixAndMarquee: (() => {
    const x = getShiftedBitRotation(6);  // Display 6 = 111 (position 6)
    const y = getShiftedBitRotation(0);  // Marquee = 001 (position 0)
    const result = getShiftedBitRotation(4);  // Display 6 - Marquee = Display 4 [101]
    return [x[0], x[1], x[2], y[0], y[1], [y[2], result]];
  })(),

  ShiftedDifferenceOfSixAndOne: (() => {
    const x = getShiftedBitRotation(6);  // Display 6 = 111 (position 6)
    const y = getShiftedBitRotation(1);  // Display 1 = 010 (position 1)
    const result = getShiftedBitRotation(3);  // Display 6 - 1 = Display 3 [100]
    return [x[0], x[1], x[2], y[0], y[1], [y[2], result]];
  })(),

  ShiftedDifferenceOfSixAndTwo: (() => {
    const x = getShiftedBitRotation(6);  // Display 6 = 111 (position 6)
    const y = getShiftedBitRotation(2);  // Display 2 = 011 (position 2)
    const result = getShiftedBitRotation(2);  // Display 6 - 2 = Display 2 [011]
    return [x[0], x[1], x[2], y[0], y[1], [y[2], result]];
  })(),

  ShiftedDifferenceOfSixAndThree: (() => {
    const x = getShiftedBitRotation(6);  // Display 6 = 111 (position 6)
    const y = getShiftedBitRotation(3);  // Display 3 = 100 (position 3)
    const result = getShiftedBitRotation(1);  // Display 6 - 3 = Display 1 [010]
    return [x[0], x[1], x[2], y[0], y[1], [y[2], result]];
  })(),

  ShiftedDifferenceOfSixAndFour: (() => {
    const x = getShiftedBitRotation(6);  // Display 6 = 111 (position 6)
    const y = getShiftedBitRotation(4);  // Display 4 = 101 (position 4)
    const result = getShiftedBitRotation(2);  // Display 6 - 4 = Marquee [001]
    return [x[0], x[1], x[2], y[0], y[1], [y[2], result]];
  })(),

  ShiftedDifferenceOfSixAndFive: (() => {
    const x = getShiftedBitRotation(6);  // Display 6 = 111 (position 6)
    const y = getShiftedBitRotation(5);  // Display 5 = 110 (position 5)
    const result = getShiftedBitRotation(7);  // Display 6 - 5 = Borrow [000]
    return [x[0], x[1], x[2], y[0], y[1], [y[2], result]];
  })(),

  ShiftedDifferenceOfSixAndSix: (() => {
    const x = getShiftedBitRotation(6);  // Display 6 = 111 (position 6)
    const y = getShiftedBitRotation(6);  // Display 6 = 111 (position 6)
    const result = getShiftedBitRotation(8);  // Display 6 - Display 6 = Absolute Zero
    return [x[0], x[1], x[2], y[0], y[1], [y[2], result]];
  })(),
};