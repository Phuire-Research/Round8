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

import { getShiftedBitRotation, SomeSeries, getRegularRotation, getShiftedRotation } from '../terminology';

export const ShiftedDifferenceSeries: SomeSeries = {
  // This would be 8, but instead Truncates the Rotation
  ShiftedDifferenceOfOneAndOne: (() => {
    const x = getShiftedBitRotation(1);  // Display 1 = 010 (position 1)
    const y = getShiftedBitRotation(1);  // Display 1 = 010 (position 1)
    const result = getShiftedRotation(8);  // Marquee
    const carry = getRegularRotation(1);
    return [x[0], x[1], x[2], y[0], y[1], [y[2], result, carry]];
  })(),

  ShiftedDifferenceOfOneAndTwo: (() => {
    const x = getShiftedBitRotation(1);  // Display 1 = 010 (position 1)
    const y = getShiftedBitRotation(2);  // Display 2 = 011 (position 2)
    const result = getShiftedRotation(7);
    const borrow = getRegularRotation(1);  // Borrow: External carry [000]
    return [x[0], x[1], x[2], y[0], y[1], [y[2], result, borrow]];
  })(),

  ShiftedDifferenceOfOneAndThree: (() => {
    const x = getShiftedBitRotation(1);  // Display 1 = 010 (position 1)
    const y = getShiftedBitRotation(3);  // Display 3 = 100 (position 3)
    const result = getShiftedRotation(6);
    const borrow = getRegularRotation(1);  // Borrow: External carry [000]
    return [x[0], x[1], x[2], y[0], y[1], [y[2], result, borrow]];
  })(),

  ShiftedDifferenceOfOneAndFour: (() => {
    const x = getShiftedBitRotation(1);  // Display 1 = 010 (position 1)
    const y = getShiftedBitRotation(4);  // Display 4 = 101 (position 4)
    const result = getShiftedRotation(5);
    const borrow = getRegularRotation(1);  // Borrow: External carry [000]
    return [x[0], x[1], x[2], y[0], y[1], [y[2], result, borrow]];
  })(),

  ShiftedDifferenceOfOneAndFive: (() => {
    const x = getShiftedBitRotation(1);  // Display 1 = 010 (position 1)
    const y = getShiftedBitRotation(5);  // Display 5 = 110 (position 5)
    const result = getShiftedRotation(4);
    const borrow = getRegularRotation(1);  // Borrow: External carry [000]
    return [x[0], x[1], x[2], y[0], y[1], [y[2], result, borrow]];
  })(),

  ShiftedDifferenceOfOneAndSix: (() => {
    const x = getShiftedBitRotation(1);  // Display 1 = 010 (position 1)
    const y = getShiftedBitRotation(6);  // Display 6 = 111 (position 6)
    const result = getShiftedRotation(3);
    const borrow = getRegularRotation(1);  // Borrow: External carry [000]
    return [x[0], x[1], x[2], y[0], y[1], [y[2], result, borrow]];
  })(),

  ShiftedDifferenceOfOneAndSeven: (() => {
    const x = getShiftedBitRotation(1);  // Display 1 = 010 (position 1)
    const y = getShiftedBitRotation(7);  // Display 7 = 000 (position 6)
    const result = getShiftedRotation(2);
    const borrow = getRegularRotation(1);  // Borrow: External carry [000]
    return [x[0], x[1], x[2], y[0], y[1], [y[2], result, borrow]];
  })(),

  ShiftedDifferenceOfTwoAndOne: (() => {
    const x = getShiftedBitRotation(2);  // Display 2 = 011 (position 2)
    const y = getShiftedBitRotation(1);  // Display 1 = 010 (position 1)
    const result = getShiftedRotation(1);
    return [x[0], x[1], x[2], y[0], y[1], [y[2], result]];
  })(),

  // Would be 8, Truncates Position
  ShiftedDifferenceOfTwoAndTwo: (() => {
    const x = getShiftedBitRotation(2);  // Display 2 = 011 (position 2)
    const y = getShiftedBitRotation(2);  // Display 2 = 011 (position 2)
    const result = getShiftedRotation(8); // Marquee
    const borrow = getRegularRotation(1);  // Borrow: External carry [000]
    return [x[0], x[1], x[2], y[0], y[1], [y[2], result, borrow]];
  })(),

  ShiftedDifferenceOfTwoAndThree: (() => {
    const x = getShiftedBitRotation(2);  // Display 2 = 011 (position 2)
    const y = getShiftedBitRotation(3);  // Display 3 = 100 (position 3)
    const result = getShiftedRotation(7);  // Display 2 - 3 = Borrow [000] (with borrow)
    const borrow = getRegularRotation(1);  // Borrow: External carry [000]
    return [x[0], x[1], x[2], y[0], y[1], [y[2], result, borrow]];
  })(),

  ShiftedDifferenceOfTwoAndFour: (() => {
    const x = getShiftedBitRotation(2);  // Display 2 = 011 (position 2)
    const y = getShiftedBitRotation(4);  // Display 4 = 101 (position 4)
    const result = getShiftedRotation(6);
    const borrow = getRegularRotation(1);  // Borrow: External carry [000]
    return [x[0], x[1], x[2], y[0], y[1], [y[2], result, borrow]];
  })(),

  ShiftedDifferenceOfTwoAndFive: (() => {
    const x = getShiftedBitRotation(2);  // Display 2 = 011 (position 2)
    const y = getShiftedBitRotation(5);  // Display 5 = 110 (position 5)
    const result = getShiftedRotation(5);
    const borrow = getRegularRotation(1);  // Borrow: External carry [000]
    return [x[0], x[1], x[2], y[0], y[1], [y[2], result, borrow]];
  })(),

  ShiftedDifferenceOfTwoAndSix: (() => {
    const x = getShiftedBitRotation(2);  // Display 2 = 011 (position 2)
    const y = getShiftedBitRotation(6);  // Display 6 = 111 (position 6)
    const result = getShiftedRotation(4);
    const borrow = getRegularRotation(1);  // Borrow: External carry [000]
    return [x[0], x[1], x[2], y[0], y[1], [y[2], result, borrow]];
  })(),

  ShiftedDifferenceOfTwoAndSeven: (() => {
    const x = getShiftedBitRotation(2);  // Display 2 = 011 (position 2)
    const y = getShiftedBitRotation(7);  // Display 6 = 111 (position 6)
    const result = getShiftedRotation(3);
    const borrow = getRegularRotation(1);  // Borrow: External carry [000]
    return [x[0], x[1], x[2], y[0], y[1], [y[2], result, borrow]];
  })(),

  ShiftedDifferenceOfThreeAndOne: (() => {
    const x = getShiftedBitRotation(3);  // Display 3 = 100 (position 3)
    const y = getShiftedBitRotation(1);  // Display 1 = 010 (position 1)
    const result = getShiftedRotation(2);  // Display 3 - 1 = Marquee [001]
    return [x[0], x[1], x[2], y[0], y[1], [y[2], result]];
  })(),

  ShiftedDifferenceOfThreeAndTwo: (() => {
    const x = getShiftedBitRotation(3);  // Display 3 = 100 (position 3)
    const y = getShiftedBitRotation(2);  // Display 2 = 011 (position 2)
    const result = getShiftedRotation(1);  // Display 3 - 2 = Borrow [000]
    return [x[0], x[1], x[2], y[0], y[1], [y[2], result]];
  })(),

  ShiftedDifferenceOfThreeAndThree: (() => {
    const x = getShiftedBitRotation(3);  // Display 3 = 100 (position 3)
    const y = getShiftedBitRotation(3);  // Display 3 = 100 (position 3)
    const result = getShiftedRotation(8);  // Marquee
    const borrow = getRegularRotation(1);  // Borrow: External carry [000]
    return [x[0], x[1], x[2], y[0], y[1], [y[2], result, borrow]];
  })(),

  ShiftedDifferenceOfThreeAndFour: (() => {
    const x = getShiftedBitRotation(3);  // Display 3 = 100 (position 3)
    const y = getShiftedBitRotation(4);  // Display 4 = 101 (position 4)
    const result = getShiftedRotation(7);
    const borrow = getRegularRotation(1);  // Borrow: External carry [000]
    return [x[0], x[1], x[2], y[0], y[1], [y[2], result, borrow]];
  })(),

  ShiftedDifferenceOfThreeAndFive: (() => {
    const x = getShiftedBitRotation(3);  // Display 3 = 100 (position 3)
    const y = getShiftedBitRotation(5);  // Display 5 = 110 (position 5)
    const result = getShiftedRotation(6);
    const borrow = getRegularRotation(1);  // Borrow: External carry [000]
    return [x[0], x[1], x[2], y[0], y[1], [y[2], result, borrow]];
  })(),

  ShiftedDifferenceOfThreeAndSix: (() => {
    const x = getShiftedBitRotation(3);  // Display 3 = 100 (position 3)
    const y = getShiftedBitRotation(6);  // Display 6 = 111 (position 6)
    const result = getShiftedRotation(5);
    const borrow = getRegularRotation(1);  // Borrow: External carry [000]
    return [x[0], x[1], x[2], y[0], y[1], [y[2], result, borrow]];
  })(),

  ShiftedDifferenceOfThreeAndSeven: (() => {
    const x = getShiftedBitRotation(3);  // Display 3 = 100 (position 3)
    const y = getShiftedBitRotation(7);
    const result = getShiftedRotation(4);
    const borrow = getRegularRotation(1);  // Borrow: External carry [000]
    return [x[0], x[1], x[2], y[0], y[1], [y[2], result, borrow]];
  })(),

  ShiftedDifferenceOfFourAndOne: (() => {
    const x = getShiftedBitRotation(4);  // Display 4 = 101 (position 4)
    const y = getShiftedBitRotation(1);  // Display 1 = 010 (position 1)
    const result = getShiftedRotation(3);  // Display 4 - 1 = Display 1 [010]
    return [x[0], x[1], x[2], y[0], y[1], [y[2], result]];
  })(),

  ShiftedDifferenceOfFourAndTwo: (() => {
    const x = getShiftedBitRotation(4);  // Display 4 = 101 (position 4)
    const y = getShiftedBitRotation(2);  // Display 2 = 011 (position 2)
    const result = getShiftedRotation(2);
    return [x[0], x[1], x[2], y[0], y[1], [y[2], result]];
  })(),

  ShiftedDifferenceOfFourAndThree: (() => {
    const x = getShiftedBitRotation(4);  // Display 4 = 101 (position 4)
    const y = getShiftedBitRotation(3);  // Display 3 = 100 (position 3)
    const result = getShiftedRotation(1);  // Display 4 - 3 = Borrow [000]
    return [x[0], x[1], x[2], y[0], y[1], [y[2], result]];
  })(),

  ShiftedDifferenceOfFourAndFour: (() => {
    const x = getShiftedBitRotation(4);  // Display 4 = 101 (position 4)
    const y = getShiftedBitRotation(4);  // Display 4 = 101 (position 4)
    const result = getShiftedRotation(8);  // Marquee
    const borrow = getRegularRotation(1);  // Borrow
    return [x[0], x[1], x[2], y[0], y[1], [y[2], result, borrow]];
  })(),

  ShiftedDifferenceOfFourAndFive: (() => {
    const x = getShiftedBitRotation(4);  // Display 4 = 101 (position 4)
    const y = getShiftedBitRotation(5);  // Display 5 = 110 (position 5)
    const result = getShiftedRotation(7);
    const borrow = getRegularRotation(1);  // Borrow: External carry [000]
    return [x[0], x[1], x[2], y[0], y[1], [y[2], result, borrow]];
  })(),

  ShiftedDifferenceOfFourAndSix: (() => {
    const x = getShiftedBitRotation(4);  // Display 4 = 101 (position 4)
    const y = getShiftedBitRotation(6);  // Display 6 = 111 (position 6)
    const result = getShiftedRotation(6);
    const borrow = getRegularRotation(1);  // Borrow: External carry [000]
    return [x[0], x[1], x[2], y[0], y[1], [y[2], result, borrow]];
  })(),
  ShiftedDifferenceOfFourAndSeven: (() => {
    const x = getShiftedBitRotation(4);  // Display 4 = 101 (position 4)
    const y = getShiftedBitRotation(7);  // Display 6 = 111 (position 6)
    const result = getShiftedRotation(5);
    const borrow = getRegularRotation(1);  // Borrow: External carry [000]
    return [x[0], x[1], x[2], y[0], y[1], [y[2], result, borrow]];
  })(),

  ShiftedDifferenceOfFiveAndOne: (() => {
    const x = getShiftedBitRotation(5);  // Display 5 = 110 (position 5)
    const y = getShiftedBitRotation(1);  // Display 1 = 010 (position 1)
    const result = getShiftedRotation(4);
    return [x[0], x[1], x[2], y[0], y[1], [y[2], result]];
  })(),

  ShiftedDifferenceOfFiveAndTwo: (() => {
    const x = getShiftedBitRotation(5);  // Display 5 = 110 (position 5)
    const y = getShiftedBitRotation(2);  // Display 2 = 011 (position 2)
    const result = getShiftedRotation(3);
    return [x[0], x[1], x[2], y[0], y[1], [y[2], result]];
  })(),

  ShiftedDifferenceOfFiveAndThree: (() => {
    const x = getShiftedBitRotation(5);  // Display 5 = 110 (position 5)
    const y = getShiftedBitRotation(3);  // Display 3 = 100 (position 3)
    const result = getShiftedRotation(2);
    return [x[0], x[1], x[2], y[0], y[1], [y[2], result]];
  })(),

  ShiftedDifferenceOfFiveAndFour: (() => {
    const x = getShiftedBitRotation(5);  // Display 5 = 110 (position 5)
    const y = getShiftedBitRotation(4);  // Display 4 = 101 (position 4)
    const result = getShiftedRotation(1);
    return [x[0], x[1], x[2], y[0], y[1], [y[2], result]];
  })(),

  ShiftedDifferenceOfFiveAndFive: (() => {
    const x = getShiftedBitRotation(5);  // Display 5 = 110 (position 5)
    const y = getShiftedBitRotation(5);  // Display 5 = 110 (position 5)
    const result = getShiftedRotation(8);  // Marquee
    const borrow = getRegularRotation(1);  // Borrow: External carry [000]
    return [x[0], x[1], x[2], y[0], y[1], [y[2], result, borrow]];
  })(),

  ShiftedDifferenceOfFiveAndSix: (() => {
    const x = getShiftedBitRotation(5);  // Display 5 = 110 (position 5)
    const y = getShiftedBitRotation(6);  // Display 6 = 111 (position 6)
    const result = getShiftedRotation(7);
    const borrow = getRegularRotation(1);  // Borrow: External carry [000]
    return [x[0], x[1], x[2], y[0], y[1], [y[2], result, borrow]];
  })(),

  ShiftedDifferenceOfFiveAndSeven: (() => {
    const x = getShiftedBitRotation(5);  // Display 5 = 110 (position 5)
    const y = getShiftedBitRotation(7);  // Display 6 = 111 (position 6)
    const result = getShiftedRotation(6);
    const borrow = getRegularRotation(1);  // Borrow: External carry [000]
    return [x[0], x[1], x[2], y[0], y[1], [y[2], result, borrow]];
  })(),

  ShiftedDifferenceOfSixAndOne: (() => {
    const x = getShiftedBitRotation(6);  // Display 6 = 111 (position 6)
    const y = getShiftedBitRotation(1);  // Display 1 = 010 (position 1)
    const result = getShiftedRotation(5);
    return [x[0], x[1], x[2], y[0], y[1], [y[2], result]];
  })(),

  ShiftedDifferenceOfSixAndTwo: (() => {
    const x = getShiftedBitRotation(6);  // Display 6 = 111 (position 6)
    const y = getShiftedBitRotation(2);  // Display 2 = 011 (position 2)
    const result = getShiftedRotation(4);
    return [x[0], x[1], x[2], y[0], y[1], [y[2], result]];
  })(),

  ShiftedDifferenceOfSixAndThree: (() => {
    const x = getShiftedBitRotation(6);  // Display 6 = 111 (position 6)
    const y = getShiftedBitRotation(3);  // Display 3 = 100 (position 3)
    const result = getShiftedRotation(3);
    return [x[0], x[1], x[2], y[0], y[1], [y[2], result]];
  })(),

  ShiftedDifferenceOfSixAndFour: (() => {
    const x = getShiftedBitRotation(6);  // Display 6 = 111 (position 6)
    const y = getShiftedBitRotation(4);  // Display 4 = 101 (position 4)
    const result = getShiftedRotation(2);
    return [x[0], x[1], x[2], y[0], y[1], [y[2], result]];
  })(),

  ShiftedDifferenceOfSixAndFive: (() => {
    const x = getShiftedBitRotation(6);  // Display 6 = 111 (position 6)
    const y = getShiftedBitRotation(5);  // Display 5 = 110 (position 5)
    const result = getShiftedRotation(1);
    return [x[0], x[1], x[2], y[0], y[1], [y[2], result]];
  })(),

  ShiftedDifferenceOfSixAndSix: (() => {
    const x = getShiftedBitRotation(6);  // Display 6 = 111 (position 6)
    const y = getShiftedBitRotation(6);  // Display 6 = 111 (position 6)
    const result = getShiftedRotation(8);  // Marquee
    const borrow = getRegularRotation(1);
    return [x[0], x[1], x[2], y[0], y[1], [y[2], result, borrow]];
  })(),

  ShiftedDifferenceOfSixAndSeven: (() => {
    const x = getShiftedBitRotation(6);  // Display 6 = 111 (position 6)
    const y = getShiftedBitRotation(7);  // Display 6 = 111 (position 6)
    const result = getShiftedRotation(7);
    const borrow = getRegularRotation(1);
    return [x[0], x[1], x[2], y[0], y[1], [y[2], result, borrow]];
  })(),
  ShiftedDifferenceOfSevenAndOne: (() => {
    const x = getShiftedBitRotation(7);  // Display 6 = 111 (position 6)
    const y = getShiftedBitRotation(1);  // Display 1 = 010 (position 1)
    const result = getShiftedRotation(6);
    return [x[0], x[1], x[2], y[0], y[1], [y[2], result]];
  })(),

  ShiftedDifferenceOfSevenAndTwo: (() => {
    const x = getShiftedBitRotation(7);  // Display 6 = 111 (position 6)
    const y = getShiftedBitRotation(2);  // Display 2 = 011 (position 2)
    const result = getShiftedRotation(5);
    return [x[0], x[1], x[2], y[0], y[1], [y[2], result]];
  })(),

  ShiftedDifferenceOfSevenAndThree: (() => {
    const x = getShiftedBitRotation(7);  // Display 6 = 111 (position 6)
    const y = getShiftedBitRotation(3);  // Display 3 = 100 (position 3)
    const result = getShiftedRotation(4);
    return [x[0], x[1], x[2], y[0], y[1], [y[2], result]];
  })(),

  ShiftedDifferenceOfSevenAndFour: (() => {
    const x = getShiftedBitRotation(7);  // Display 6 = 111 (position 6)
    const y = getShiftedBitRotation(4);  // Display 4 = 101 (position 4)
    const result = getShiftedRotation(3);
    return [x[0], x[1], x[2], y[0], y[1], [y[2], result]];
  })(),

  ShiftedDifferenceOfSevenAndFive: (() => {
    const x = getShiftedBitRotation(7);  // Display 6 = 111 (position 6)
    const y = getShiftedBitRotation(5);  // Display 5 = 110 (position 5)
    const result = getShiftedRotation(2);
    return [x[0], x[1], x[2], y[0], y[1], [y[2], result]];
  })(),

  ShiftedDifferenceOfSevenAndSix: (() => {
    const x = getShiftedBitRotation(7);  // Display 6 = 111 (position 6)
    const y = getShiftedBitRotation(6);  // Display 6 = 111 (position 6)
    const result = getShiftedRotation(1);
    return [x[0], x[1], x[2], y[0], y[1], [y[2], result]];
  })(),

  ShiftedDifferenceOfSevenAndSeven: (() => {
    const x = getShiftedBitRotation(7);  // Display 6 = 111 (position 6)
    const y = getShiftedBitRotation(7);  // Display 6 = 111 (position 6)
    const result = getShiftedRotation(8); // Marquee
    const borrow = getRegularRotation(1); // Borrow
    return [x[0], x[1], x[2], y[0], y[1], [y[2], result, borrow]];
  })(),
};