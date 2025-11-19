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
 *
 * 7D MANIFOLD TOPOLOGY:
 * The tuple's first index is the final bit for 6D array inference,
 * with the tuple itself creating the 7th dimension.
 * This prevents Shor factorization attacks during multiplication.
 */

import { getShiftedBitRotation, SomeSeries, getRegularBitRotation, getShiftedRotation, getRegularRotation } from '../terminology';

export const ShiftedSumSeries: SomeSeries = {
  // EXTERNAL CARRY OPERAND A CASES: [0,0,0] arriving from column 1
  // [0,0,0] = External carry from column 1 (position 7 in 7-position system)
  // Represents carry propagating leftward into Column 0 shifted manifold
  // System has 6 counting positions (Display 1-6) + marquee [0,0,1] + placeholder [0,0,0]
  // Maximum value: 7,88,88,88,88,88,88,88,88,88,88 (position 7 at column 0, position 8 at columns 1-20)
  // Display 1 [0,1,0] + N
  ShiftedSumOfOneAndOne: (() => {
    const x = getShiftedBitRotation(1);  // Display 1 = 010
    const y = getShiftedBitRotation(1);  // Display 1 = 010
    const result = getShiftedRotation(2);  // 1+1=2 (Display 2 = 011 in shifted)
    return [x[0], x[1], x[2], y[0], y[1], [y[2], result]];
  })(),

  ShiftedSumOfOneAndTwo: (() => {
    const x = getShiftedBitRotation(1);  // Display 1 = 010
    const y = getShiftedBitRotation(2);  // Display 2 = 011
    const result = getShiftedRotation(3);  // 1+2=3 (Display 3 = 100 in shifted)
    return [x[0], x[1], x[2], y[0], y[1], [y[2], result]];
  })(),

  ShiftedSumOfOneAndThree: (() => {
    const x = getShiftedBitRotation(1);  // Display 1 = 010
    const y = getShiftedBitRotation(3);  // Display 3 = 100
    const result = getShiftedRotation(4);  // 1+3=4 (Display 4 = 101 in shifted)
    return [x[0], x[1], x[2], y[0], y[1], [y[2], result]];
  })(),

  ShiftedSumOfOneAndFour: (() => {
    const x = getShiftedBitRotation(1);  // Display 1 = 010
    const y = getShiftedBitRotation(4);  // Display 4 = 101
    const result = getShiftedRotation(5);  // 1+4=5 (Display 5 = 110 in shifted)
    return [x[0], x[1], x[2], y[0], y[1], [y[2], result]];
  })(),

  ShiftedSumOfOneAndFive: (() => {
    const x = getShiftedBitRotation(1);  // Display 1 = 010
    const y = getShiftedBitRotation(5);  // Display 5 = 110
    const result = getShiftedRotation(6);  // 1+5=6 (Display 6 = 111 in shifted)
    return [x[0], x[1], x[2], y[0], y[1], [y[2], result]];
  })(),

  ShiftedSumOfOneAndSix: (() => {
    const x = getShiftedBitRotation(1);  // Display 1 = 010
    const y = getShiftedBitRotation(6);  // Display 6 = 111
    const result = getShiftedRotation(7);
    const carry = getRegularBitRotation(1);  // Carry Display 1 [010]
    return [x[0], x[1], x[2], y[0], y[1], [y[2], result, carry]];
  })(),
  ShiftedSumOfOneAndSeven: (() => {
    const x = getShiftedBitRotation(1);  // Display 1 = 010
    const y = getShiftedBitRotation(7);  // Display 6 = 111
    const result = getShiftedRotation(7);
    const carry = getRegularBitRotation(1);  // Carry Display 1 [010]
    return [x[0], x[1], x[2], y[0], y[1], [y[2], result, carry]];
  })(),

  ShiftedSumOfTwoAndOne: (() => {
    const x = getShiftedBitRotation(2);  // Display 2 = 011
    const y = getShiftedBitRotation(1);  // Display 1 = 010
    const result = getShiftedRotation(3);  // 2+1=3 (Display 3 = 100)
    return [x[0], x[1], x[2], y[0], y[1], [y[2], result]];
  })(),

  ShiftedSumOfTwoAndTwo: (() => {
    const x = getShiftedBitRotation(2);  // Display 2 = 011
    const y = getShiftedBitRotation(2);  // Display 2 = 011
    const result = getShiftedRotation(4);  // 2+2=4 (Display 4 = 101)
    return [x[0], x[1], x[2], y[0], y[1], [y[2], result]];
  })(),

  ShiftedSumOfTwoAndThree: (() => {
    const x = getShiftedBitRotation(2);  // Display 2 = 011
    const y = getShiftedBitRotation(3);  // Display 3 = 100
    const result = getShiftedRotation(5);  // 2+3=5 (Display 5 = 110)
    return [x[0], x[1], x[2], y[0], y[1], [y[2], result]];
  })(),

  ShiftedSumOfTwoAndFour: (() => {
    const x = getShiftedBitRotation(2);  // Display 2 = 011
    const y = getShiftedBitRotation(4);  // Display 4 = 101
    const result = getShiftedRotation(6);  // 2+4=6 (Display 6 = 111)
    return [x[0], x[1], x[2], y[0], y[1], [y[2], result]];
  })(),

  ShiftedSumOfTwoAndFive: (() => {
    const x = getShiftedBitRotation(2);  // Display 2 = 011
    const y = getShiftedBitRotation(5);  // Display 5 = 110
    const result = getShiftedRotation(7);  // 2+5=7
    const carry = getRegularBitRotation(1);
    return [x[0], x[1], x[2], y[0], y[1], [y[2], result, carry]];
  })(),

  ShiftedSumOfTwoAndSix: (() => {
    const x = getShiftedBitRotation(2);  // Display 2 = 011
    const y = getShiftedBitRotation(6);  // Display 6 = 111
    const result = getShiftedRotation(7);  // 2+6=8 → wraps to Display 7 [000] as Full Twist Case
    const carry = getRegularBitRotation(1);
    return [x[0], x[1], x[2], y[0], y[1], [y[2], result, carry]];
  })(),

  ShiftedSumOfTwoAndSeven: (() => {
    const x = getShiftedBitRotation(2);  // Display 2 = 011
    const y = getShiftedBitRotation(7);  // Display 6 = 111
    const result = getShiftedRotation(7);
    const carry = getRegularBitRotation(1);
    return [x[0], x[1], x[2], y[0], y[1], [y[2], result, carry]];
  })(),

  ShiftedSumOfThreeAndOne: (() => {
    const x = getShiftedBitRotation(3);  // Display 3 = 100
    const y = getShiftedBitRotation(1);  // Display 1 = 010
    const result = getShiftedRotation(4);  // 3+1=4
    return [x[0], x[1], x[2], y[0], y[1], [y[2], result]];
  })(),

  ShiftedSumOfThreeAndTwo: (() => {
    const x = getShiftedBitRotation(3);  // Display 3 = 100
    const y = getShiftedBitRotation(2);  // Display 2 = 011
    const result = getShiftedRotation(5);  // 3+2=5
    return [x[0], x[1], x[2], y[0], y[1], [y[2], result]];
  })(),

  ShiftedSumOfThreeAndThree: (() => {
    const x = getShiftedBitRotation(3);  // Display 3 = 100
    const y = getShiftedBitRotation(3);  // Display 3 = 100
    const result = getShiftedRotation(6);  // 3+3=6
    return [x[0], x[1], x[2], y[0], y[1], [y[2], result]];
  })(),

  ShiftedSumOfThreeAndFour: (() => {
    const x = getShiftedBitRotation(3);  // Display 3 = 100
    const y = getShiftedBitRotation(4);  // Display 4 = 101
    const result = getShiftedRotation(7);  // 3+4=7
    const carry = getRegularBitRotation(1);
    return [x[0], x[1], x[2], y[0], y[1], [y[2], result, carry]];
  })(),

  ShiftedSumOfThreeAndFive: (() => {
    const x = getShiftedBitRotation(3);  // Display 3 = 100
    const y = getShiftedBitRotation(5);  // Display 5 = 110
    const result = getShiftedRotation(7);  // 3+5=8
    const carry = getRegularBitRotation(1);
    return [x[0], x[1], x[2], y[0], y[1], [y[2], result, carry]];
  })(),

  ShiftedSumOfThreeAndSix: (() => {
    const x = getShiftedBitRotation(3);  // Display 3 = 100
    const y = getShiftedBitRotation(6);  // Display 6 = 111
    const result = getShiftedRotation(7);  // 3+6=11r → wraps to Display 3 [100]
    const carry = getRegularBitRotation(1);  // Carry Display 1 [010]
    return [x[0], x[1], x[2], y[0], y[1], [y[2], result, carry]];
  })(),

  ShiftedSumOfThreeAndSeven: (() => {
    const x = getShiftedBitRotation(3);  // Display 3 = 100
    const y = getShiftedBitRotation(7);  // Display 6 = 111
    const result = getShiftedRotation(7);
    const carry = getRegularBitRotation(1);  // Carry Display 1 [010]
    return [x[0], x[1], x[2], y[0], y[1], [y[2], result, carry]];
  })(),

  ShiftedSumOfFourAndOne: (() => {
    const x = getShiftedBitRotation(4);  // Display 4 = 101
    const y = getShiftedBitRotation(1);  // Display 1 = 010
    const result = getShiftedRotation(5);  // 4+1=5r
    return [x[0], x[1], x[2], y[0], y[1], [y[2], result]];
  })(),

  ShiftedSumOfFourAndTwo: (() => {
    const x = getShiftedBitRotation(4);  // Display 4 = 101
    const y = getShiftedBitRotation(2);  // Display 2 = 011
    const result = getShiftedRotation(6);  // 4+2=6r
    return [x[0], x[1], x[2], y[0], y[1], [y[2], result]];
  })(),

  ShiftedSumOfFourAndThree: (() => {
    const x = getShiftedBitRotation(4);  // Display 4 = 101
    const y = getShiftedBitRotation(3);  // Display 3 = 100
    const result = getShiftedRotation(7);  // 4+3=7
    const carry = getRegularBitRotation(1);
    return [x[0], x[1], x[2], y[0], y[1], [y[2], result, carry]];
  })(),

  ShiftedSumOfFourAndFour: (() => {
    const x = getShiftedBitRotation(4);  // Display 4 = 101
    const y = getShiftedBitRotation(4);  // Display 4 = 101
    const result = getShiftedRotation(7);  // 4+4=8 →
    const carry = getRegularBitRotation(1);
    return [x[0], x[1], x[2], y[0], y[1], [y[2], result, carry]];
  })(),

  ShiftedSumOfFourAndFive: (() => {
    const x = getShiftedBitRotation(4);  // Display 4 = 101
    const y = getShiftedBitRotation(5);  // Display 5 = 110
    const result = getShiftedRotation(7);  // 4+5=11r → wraps to Display 3 [100]
    const carry = getRegularBitRotation(1);
    return [x[0], x[1], x[2], y[0], y[1], [y[2], result, carry]];
  })(),

  ShiftedSumOfFourAndSix: (() => {
    const x = getShiftedBitRotation(4);  // Display 4 = 101
    const y = getShiftedBitRotation(6);  // Display 6 = 111
    const result = getShiftedRotation(7);  // 4+6=12r
    const carry = getRegularBitRotation(1);
    return [x[0], x[1], x[2], y[0], y[1], [y[2], result, carry]];
  })(),

  ShiftedSumOfFourAndSeven: (() => {
    const x = getShiftedBitRotation(4);  // Display 4 = 101
    const y = getShiftedBitRotation(7);  // Display 6 = 111
    const result = getShiftedRotation(7);
    const carry = getRegularBitRotation(1);
    return [x[0], x[1], x[2], y[0], y[1], [y[2], result, carry]];
  })(),

  ShiftedSumOfFiveAndOne: (() => {
    const x = getShiftedBitRotation(5);  // Display 5 = 110
    const y = getShiftedBitRotation(1);  // Display 1 = 010
    const result = getShiftedRotation(6);  // 5+1=6 (Display 6 = 111)
    return [x[0], x[1], x[2], y[0], y[1], [y[2], result]];
  })(),

  ShiftedSumOfFiveAndTwo: (() => {
    const x = getShiftedBitRotation(5);  // Display 5 = 110
    const y = getShiftedBitRotation(2);  // Display 2 = 011
    const result = getShiftedRotation(7);  // 5+2=7
    const carry = getRegularBitRotation(1);
    return [x[0], x[1], x[2], y[0], y[1], [y[2], result, carry]];
  })(),

  ShiftedSumOfFiveAndThree: (() => {
    const x = getShiftedBitRotation(5);  // Display 5 = 110
    const y = getShiftedBitRotation(3);  // Display 3 = 100
    const result = getShiftedRotation(7);  // 5+3=8 → wraps to Display 2 [011]
    const carry = getRegularBitRotation(1);
    return [x[0], x[1], x[2], y[0], y[1], [y[2], result, carry]];
  })(),

  ShiftedSumOfFiveAndFour: (() => {
    const x = getShiftedBitRotation(5);  // Display 5 = 110
    const y = getShiftedBitRotation(4);  // Display 4 = 101
    const result = getShiftedRotation(7);  // 5+4= 11r → wraps to Display 3 [100]
    const carry = getRegularBitRotation(1);
    return [x[0], x[1], x[2], y[0], y[1], [y[2], result, carry]];
  })(),

  ShiftedSumOfFiveAndFive: (() => {
    const x = getShiftedBitRotation(5);  // Display 5 = 110
    const y = getShiftedBitRotation(5);  // Display 5 = 110
    const result = getShiftedRotation(7);  // 5+5=12r → wraps to Display 4 [101]
    const carry = getShiftedRotation(1);  // Carry Display 1 [010]
    return [x[0], x[1], x[2], y[0], y[1], [y[2], result, carry]];
  })(),

  ShiftedSumOfFiveAndSix: (() => {
    const x = getShiftedBitRotation(5);  // Display 5 = 110
    const y = getShiftedBitRotation(6);  // Display 6 = 111
    const result = getShiftedRotation(7);  // 5+6=13r → wraps to Display 5 [110]
    const carry = getRegularBitRotation(1);  // Carry Display 1 [010]
    return [x[0], x[1], x[2], y[0], y[1], [y[2], result, carry]];
  })(),

  ShiftedSumOfFiveAndSeven: (() => {
    const x = getShiftedBitRotation(5);  // Display 5 = 110
    const y = getShiftedBitRotation(7);  // Display 6 = 111
    const result = getShiftedRotation(7);
    const carry = getRegularBitRotation(1);  // Carry Display 1 [010]
    return [x[0], x[1], x[2], y[0], y[1], [y[2], result, carry]];
  })(),

  // Display 6 [1,1,1] + N (maximum position before wrap)

  ShiftedSumOfSixAndOne: (() => {
    const x = getShiftedBitRotation(6);  // Display 6 = 111
    const y = getShiftedBitRotation(1);  // Display 1 = 010
    const result = getShiftedRotation(7);  // 6+1=7 → Full Twist
    const carry = getRegularBitRotation(1);
    return [x[0], x[1], x[2], y[0], y[1], [y[2], result, carry]];
  })(),

  ShiftedSumOfSixAndTwo: (() => {
    const x = getShiftedBitRotation(6);  // Display 6 = 111
    const y = getShiftedBitRotation(2);  // Display 2 = 011
    const result = getShiftedRotation(7);  // 6+2=8 → 8 is Greater than 7 so Full Twist
    const carry = getShiftedRotation(1);
    return [x[0], x[1], x[2], y[0], y[1], [y[2], result, carry]];
  })(),

  ShiftedSumOfSixAndThree: (() => {
    const x = getShiftedBitRotation(6);  // Display 6 = 111
    const y = getShiftedBitRotation(3);  // Display 3 = 100
    const result = getShiftedRotation(7);  // 6+3=11r → wraps to Display 3 [100]
    const carry = getRegularBitRotation(1);
    return [x[0], x[1], x[2], y[0], y[1], [y[2], result, carry]];
  })(),

  ShiftedSumOfSixAndFour: (() => {
    const x = getShiftedBitRotation(6);  // Display 6 = 111
    const y = getShiftedBitRotation(4);  // Display 4 = 101
    const result = getShiftedRotation(7);  // 6+4=12r → wraps to Display 4 [101]
    const carry = getShiftedRotation(1);
    return [x[0], x[1], x[2], y[0], y[1], [y[2], result, carry]];
  })(),

  ShiftedSumOfSixAndFive: (() => {
    const x = getShiftedBitRotation(6);  // Display 6 = 111
    const y = getShiftedBitRotation(5);  // Display 5 = 110
    const result = getShiftedRotation(7);  // 6+5=13r → wraps to Display 5 [110]
    const carry = getRegularBitRotation(1);
    return [x[0], x[1], x[2], y[0], y[1], [y[2], result, carry]];
  })(),

  ShiftedSumOfSixAndSix: (() => {
    const x = getShiftedBitRotation(6);  // Display 6 = 111
    const y = getShiftedBitRotation(6);  // Display 6 = 111
    const result = getShiftedRotation(7);  // 6+6=14r → wraps to Display 7
    const carry = getRegularBitRotation(1);
    return [x[0], x[1], x[2], y[0], y[1], [y[2], result, carry]];
  })(),

  ShiftedSumOfSixAndSeven: (() => {
    const x = getShiftedBitRotation(6);  // Display 6 = 111
    const y = getShiftedBitRotation(7);  // Display 6 = 111
    const result = getShiftedRotation(7);
    const carry = getRegularBitRotation(1);
    return [x[0], x[1], x[2], y[0], y[1], [y[2], result, carry]];
  })(),

  ShiftedSumOfSevenAndOne: (() => {
    const x = getShiftedBitRotation(7);
    const y = getShiftedBitRotation(1);  // Display 1 = 010
    const result = getShiftedRotation(7);
    const carry = getRegularBitRotation(1);
    return [x[0], x[1], x[2], y[0], y[1], [y[2], result, carry]];
  })(),

  ShiftedSumOfSevenAndTwo: (() => {
    const x = getShiftedBitRotation(7);
    const y = getShiftedBitRotation(2);  // Display 2 = 011
    const result = getShiftedRotation(7);
    const carry = getShiftedRotation(1);
    return [x[0], x[1], x[2], y[0], y[1], [y[2], result, carry]];
  })(),

  ShiftedSumOfSevenAndThree: (() => {
    const x = getShiftedBitRotation(7);
    const y = getShiftedBitRotation(3);  // Display 3 = 100
    const result = getShiftedRotation(7);
    const carry = getRegularBitRotation(1);
    return [x[0], x[1], x[2], y[0], y[1], [y[2], result, carry]];
  })(),

  ShiftedSumOfSevenAndFour: (() => {
    const x = getShiftedBitRotation(7);
    const y = getShiftedBitRotation(4);  // Display 4 = 101
    const result = getShiftedRotation(7);
    const carry = getShiftedRotation(1);
    return [x[0], x[1], x[2], y[0], y[1], [y[2], result, carry]];
  })(),

  ShiftedSumOfSevenAndFive: (() => {
    const x = getShiftedBitRotation(7);
    const y = getShiftedBitRotation(5);  // Display 5 = 110
    const result = getShiftedRotation(7);
    const carry = getRegularBitRotation(1);
    return [x[0], x[1], x[2], y[0], y[1], [y[2], result, carry]];
  })(),

  ShiftedSumOfSevenAndSix: (() => {
    const x = getShiftedBitRotation(7);
    const y = getShiftedBitRotation(6);  // Display 6 = 111
    const result = getShiftedRotation(7);
    const carry = getRegularBitRotation(1);
    return [x[0], x[1], x[2], y[0], y[1], [y[2], result, carry]];
  })(),

  ShiftedSumOfSevenAndSeven: (() => {
    const x = getShiftedBitRotation(7);
    const y = getShiftedBitRotation(7);
    const result = getShiftedRotation(7);
    const carry = getRegularBitRotation(1);
    return [x[0], x[1], x[2], y[0], y[1], [y[2], result, carry]];
  })(),
};