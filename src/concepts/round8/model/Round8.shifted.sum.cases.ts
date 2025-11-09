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

import { getShiftedBitRotation, getRound8Case, Round8Cases } from './Round8.terminology';

type SomeSeries = Record<string, ((number)[] | number)[]>;

export const ShiftedSumSeries: SomeSeries = {
  // EXTERNAL CARRY OPERAND A CASES: [0,0,0] arriving from column 1
  // [0,0,0] = External carry from column 1 (position 7 in 7-position system)
  // Represents carry propagating leftward into Column 0 shifted manifold
  // System has 6 counting positions (Display 1-6) + marquee [0,0,1] + placeholder [0,0,0]
  // Maximum value: 7,88,88,88,88,88,88,88,88,88,88 (position 7 at column 0, position 8 at columns 1-20)

  // [0,0,0] as operand A - External carry from column 1
  ShiftedSumOfCarryAndCarry: (() => {
    const x = getShiftedBitRotation(7);  // External carry = 000 (position 7)
    const y = getShiftedBitRotation(7);  // External carry = 000
    const result = getShiftedBitRotation(0);  // Carry + Carry = Marquee [001] (two carries reset to delimiter)
    return [x[0], x[1], x[2], y[0], y[1], [y[2], result]];
  })(),

  ShiftedSumOfCarryAndMarquee: (() => {
    const x = getShiftedBitRotation(7);  // External carry = 000 (position 7)
    const y = getShiftedBitRotation(0);  // Marquee = 001
    const result = getShiftedBitRotation(1);  // Carry + Marquee = Display 1 [010] (position 7 + position 0 = position 1)
    return [x[0], x[1], x[2], y[0], y[1], [y[2], result]];
  })(),

  ShiftedSumOfCarryAndOne: (() => {
    const x = getShiftedBitRotation(7);  // External carry = 000 (position 7)
    const y = getShiftedBitRotation(1);  // Display 1 = 010
    const result = getShiftedBitRotation(2);  // Carry + Display 1 = Display 2 [011] (position 7 + position 1 = position 2)
    return [x[0], x[1], x[2], y[0], y[1], [y[2], result]];
  })(),

  ShiftedSumOfCarryAndTwo: (() => {
    const x = getShiftedBitRotation(7);  // External carry = 000 (position 7)
    const y = getShiftedBitRotation(2);  // Display 2 = 011
    const result = getShiftedBitRotation(3);  // Carry + Display 2 = Display 3 [100] (position 7 + position 2 = position 3)
    return [x[0], x[1], x[2], y[0], y[1], [y[2], result]];
  })(),

  ShiftedSumOfCarryAndThree: (() => {
    const x = getShiftedBitRotation(7);  // External carry = 000 (position 7)
    const y = getShiftedBitRotation(3);  // Display 3 = 100
    const result = getShiftedBitRotation(4);  // Carry + Display 3 = Display 4 [101] (position 7 + position 3 = position 4)
    return [x[0], x[1], x[2], y[0], y[1], [y[2], result]];
  })(),

  ShiftedSumOfCarryAndFour: (() => {
    const x = getShiftedBitRotation(7);  // External carry = 000 (position 7)
    const y = getShiftedBitRotation(4);  // Display 4 = 101
    const result = getShiftedBitRotation(5);  // Carry + Display 4 = Display 5 [110] (position 7 + position 4 = position 5)
    return [x[0], x[1], x[2], y[0], y[1], [y[2], result]];
  })(),

  ShiftedSumOfCarryAndFive: (() => {
    const x = getShiftedBitRotation(7);  // External carry = 000 (position 7)
    const y = getShiftedBitRotation(5);  // Display 5 = 110
    const result = getShiftedBitRotation(6);  // Carry + Display 5 = Display 6 [111] (position 7 + position 5 = position 6, maximum)
    return [x[0], x[1], x[2], y[0], y[1], [y[2], result]];
  })(),

  ShiftedSumOfCarryAndSix: (() => {
    const x = getShiftedBitRotation(7);  // External carry = 000 (position 7)
    const y = getShiftedBitRotation(6);  // Display 6 = 111
    const result = getRound8Case(Round8Cases.POSITIVE_TWIST_CASE);  // Carry + Display 6 = OVERFLOW → TWIST-OFF
    return [x[0], x[1], x[2], y[0], y[1], [y[2], result]];
  })(),

  // [0,0,1] as operand A - Marquee marker (N+1 rotation cases)
  // When [0,0,1] marquee receives addition, it rotates in place
  ShiftedSumOfMarqueeAndCarry: (() => {
    const x = getShiftedBitRotation(0);  // Marquee = 001
    const y = getShiftedBitRotation(7);  // External carry = 000
    const result = getShiftedBitRotation(1);  // Marquee + Carry = Display 1 [010] (position 0 + position 7 = position 1)
    return [x[0], x[1], x[2], y[0], y[1], [y[2], result]];
  })(),

  ShiftedSumOfMarqueeAndMarquee: (() => {
    const x = getShiftedBitRotation(0);  // Marquee = 001
    const y = getShiftedBitRotation(0);  // Marquee = 001
    const error1 = getShiftedBitRotation(6);  // Error [111]
    const error2 = getShiftedBitRotation(6);  // Error [111]
    return [x[0], x[1], x[2], y[0], y[1], [y[2], error1, error2]];
  })(),

  ShiftedSumOfMarqueeAndOne: (() => {
    const x = getShiftedBitRotation(0);  // Marquee = 001
    const y = getShiftedBitRotation(1);  // Display 1 = 010
    const result = getShiftedBitRotation(1);  // Marquee + Display 1 → Rotates to Display 1 [010]
    return [x[0], x[1], x[2], y[0], y[1], [y[2], result]];
  })(),

  ShiftedSumOfMarqueeAndTwo: (() => {
    const x = getShiftedBitRotation(0);  // Marquee = 001
    const y = getShiftedBitRotation(2);  // Display 2 = 011
    const result = getShiftedBitRotation(2);  // Marquee + Display 2 → Rotates to Display 2 [011]
    return [x[0], x[1], x[2], y[0], y[1], [y[2], result]];
  })(),

  ShiftedSumOfMarqueeAndThree: (() => {
    const x = getShiftedBitRotation(0);  // Marquee = 001
    const y = getShiftedBitRotation(3);  // Display 3 = 100
    const result = getShiftedBitRotation(3);  // Marquee + Display 3 → Rotates to Display 3 [100]
    return [x[0], x[1], x[2], y[0], y[1], [y[2], result]];
  })(),

  ShiftedSumOfMarqueeAndFour: (() => {
    const x = getShiftedBitRotation(0);  // Marquee = 001
    const y = getShiftedBitRotation(4);  // Display 4 = 101
    const result = getShiftedBitRotation(4);  // Marquee + Display 4 → Rotates to Display 4 [101]
    return [x[0], x[1], x[2], y[0], y[1], [y[2], result]];
  })(),

  ShiftedSumOfMarqueeAndFive: (() => {
    const x = getShiftedBitRotation(0);  // Marquee = 001
    const y = getShiftedBitRotation(5);  // Display 5 = 110
    const result = getShiftedBitRotation(5);  // Marquee + Display 5 → Rotates to Display 5 [110]
    return [x[0], x[1], x[2], y[0], y[1], [y[2], result]];
  })(),

  ShiftedSumOfMarqueeAndSix: (() => {
    const x = getShiftedBitRotation(0);  // Marquee = 001
    const y = getShiftedBitRotation(6);  // Display 6 = 111
    const result = getShiftedBitRotation(6);  // Marquee + Display 6 → Rotates to Display 6 [111]
    return [x[0], x[1], x[2], y[0], y[1], [y[2], result]];
  })(),

  // VALID SHIFTED CASES: Display 1-6 (Binary 010-111)

  // Display 1 [0,1,0] + N
  ShiftedSumOfOneAndCarry: (() => {
    const x = getShiftedBitRotation(1);  // Display 1 = 010
    const y = getShiftedBitRotation(7);  // External carry = 000
    const result = getShiftedBitRotation(2);  // Display 1 + Carry = Display 2 [011] (position 1 + position 7 = position 2)
    return [x[0], x[1], x[2], y[0], y[1], [y[2], result]];
  })(),

  ShiftedSumOfOneAndMarquee: (() => {
    const x = getShiftedBitRotation(1);  // Display 1 = 010
    const y = getShiftedBitRotation(0);  // Marquee = 001
    const result = getShiftedBitRotation(1);  // Display 1 + Marquee → Rotates to Display 1 [010]
    return [x[0], x[1], x[2], y[0], y[1], [y[2], result]];
  })(),

  ShiftedSumOfOneAndOne: (() => {
    const x = getShiftedBitRotation(1);  // Display 1 = 010
    const y = getShiftedBitRotation(1);  // Display 1 = 010
    const result = getShiftedBitRotation(2);  // 1+1=2 (Display 2 = 011 in shifted)
    return [x[0], x[1], x[2], y[0], y[1], [y[2], result]];
  })(),

  ShiftedSumOfOneAndTwo: (() => {
    const x = getShiftedBitRotation(1);  // Display 1 = 010
    const y = getShiftedBitRotation(2);  // Display 2 = 011
    const result = getShiftedBitRotation(3);  // 1+2=3 (Display 3 = 100 in shifted)
    return [x[0], x[1], x[2], y[0], y[1], [y[2], result]];
  })(),

  ShiftedSumOfOneAndThree: (() => {
    const x = getShiftedBitRotation(1);  // Display 1 = 010
    const y = getShiftedBitRotation(3);  // Display 3 = 100
    const result = getShiftedBitRotation(4);  // 1+3=4 (Display 4 = 101 in shifted)
    return [x[0], x[1], x[2], y[0], y[1], [y[2], result]];
  })(),

  ShiftedSumOfOneAndFour: (() => {
    const x = getShiftedBitRotation(1);  // Display 1 = 010
    const y = getShiftedBitRotation(4);  // Display 4 = 101
    const result = getShiftedBitRotation(5);  // 1+4=5 (Display 5 = 110 in shifted)
    return [x[0], x[1], x[2], y[0], y[1], [y[2], result]];
  })(),

  ShiftedSumOfOneAndFive: (() => {
    const x = getShiftedBitRotation(1);  // Display 1 = 010
    const y = getShiftedBitRotation(5);  // Display 5 = 110
    const result = getShiftedBitRotation(6);  // 1+5=6 (Display 6 = 111 in shifted)
    return [x[0], x[1], x[2], y[0], y[1], [y[2], result]];
  })(),

  ShiftedSumOfOneAndSix: (() => {
    const x = getShiftedBitRotation(1);  // Display 1 = 010
    const y = getShiftedBitRotation(6);  // Display 6 = 111
    const result = getShiftedBitRotation(1);  // Wraps to Display 1 [010]
    const carry = getShiftedBitRotation(1);  // Carry Display 1 [010]
    return [x[0], x[1], x[2], y[0], y[1], [y[2], result, carry]];
  })(),

  // Display 2 [0,1,1] + N
  ShiftedSumOfTwoAndCarry: (() => {
    const x = getShiftedBitRotation(2);  // Display 2 = 011
    const y = getShiftedBitRotation(7);  // External carry = 000
    const result = getShiftedBitRotation(3);  // Display 2 + Carry = Display 3 [100] (position 2 + position 7 = position 3)
    return [x[0], x[1], x[2], y[0], y[1], [y[2], result]];
  })(),

  ShiftedSumOfTwoAndMarquee: (() => {
    const x = getShiftedBitRotation(2);  // Display 2 = 011
    const y = getShiftedBitRotation(0);  // Marquee = 001
    const result = getShiftedBitRotation(2);  // Display 2 + Marquee → Rotates to Display 2 [011]
    return [x[0], x[1], x[2], y[0], y[1], [y[2], result]];
  })(),

  ShiftedSumOfTwoAndOne: (() => {
    const x = getShiftedBitRotation(2);  // Display 2 = 011
    const y = getShiftedBitRotation(1);  // Display 1 = 010
    const result = getShiftedBitRotation(3);  // 2+1=3 (Display 3 = 100)
    return [x[0], x[1], x[2], y[0], y[1], [y[2], result]];
  })(),

  ShiftedSumOfTwoAndTwo: (() => {
    const x = getShiftedBitRotation(2);  // Display 2 = 011
    const y = getShiftedBitRotation(2);  // Display 2 = 011
    const result = getShiftedBitRotation(4);  // 2+2=4 (Display 4 = 101)
    return [x[0], x[1], x[2], y[0], y[1], [y[2], result]];
  })(),

  ShiftedSumOfTwoAndThree: (() => {
    const x = getShiftedBitRotation(2);  // Display 2 = 011
    const y = getShiftedBitRotation(3);  // Display 3 = 100
    const result = getShiftedBitRotation(5);  // 2+3=5 (Display 5 = 110)
    return [x[0], x[1], x[2], y[0], y[1], [y[2], result]];
  })(),

  ShiftedSumOfTwoAndFour: (() => {
    const x = getShiftedBitRotation(2);  // Display 2 = 011
    const y = getShiftedBitRotation(4);  // Display 4 = 101
    const result = getShiftedBitRotation(6);  // 2+4=6 (Display 6 = 111)
    return [x[0], x[1], x[2], y[0], y[1], [y[2], result]];
  })(),

  ShiftedSumOfTwoAndFive: (() => {
    const x = getShiftedBitRotation(2);  // Display 2 = 011
    const y = getShiftedBitRotation(5);  // Display 5 = 110
    const result = getShiftedBitRotation(1);  // 2+5=7 → wraps to Display 1 [010]
    const carry = getShiftedBitRotation(1);  // Carry Display 1 [010]
    return [x[0], x[1], x[2], y[0], y[1], [y[2], result, carry]];
  })(),

  ShiftedSumOfTwoAndSix: (() => {
    const x = getShiftedBitRotation(2);  // Display 2 = 011
    const y = getShiftedBitRotation(6);  // Display 6 = 111
    const result = getShiftedBitRotation(2);  // 2+6=8 → wraps to Display 2 [011]
    const carry = getShiftedBitRotation(1);  // Carry Display 1 [010]
    return [x[0], x[1], x[2], y[0], y[1], [y[2], result, carry]];
  })(),

  // Display 3 [1,0,0] + N
  ShiftedSumOfThreeAndCarry: (() => {
    const x = getShiftedBitRotation(3);  // Display 3 = 100
    const y = getShiftedBitRotation(7);  // External carry = 000
    const result = getShiftedBitRotation(4);  // Display 3 + Carry = Display 4 [101] (position 3 + position 7 = position 4)
    return [x[0], x[1], x[2], y[0], y[1], [y[2], result]];
  })(),

  ShiftedSumOfThreeAndMarquee: (() => {
    const x = getShiftedBitRotation(3);  // Display 3 = 100
    const y = getShiftedBitRotation(0);  // Marquee = 001
    const result = getShiftedBitRotation(3);  // Display 3 + Marquee → Rotates to Display 3 [100]
    return [x[0], x[1], x[2], y[0], y[1], [y[2], result]];
  })(),

  ShiftedSumOfThreeAndOne: (() => {
    const x = getShiftedBitRotation(3);  // Display 3 = 100
    const y = getShiftedBitRotation(1);  // Display 1 = 010
    const result = getShiftedBitRotation(4);  // 3+1=4 (Display 4 = 101)
    return [x[0], x[1], x[2], y[0], y[1], [y[2], result]];
  })(),

  ShiftedSumOfThreeAndTwo: (() => {
    const x = getShiftedBitRotation(3);  // Display 3 = 100
    const y = getShiftedBitRotation(2);  // Display 2 = 011
    const result = getShiftedBitRotation(5);  // 3+2=5 (Display 5 = 110)
    return [x[0], x[1], x[2], y[0], y[1], [y[2], result]];
  })(),

  ShiftedSumOfThreeAndThree: (() => {
    const x = getShiftedBitRotation(3);  // Display 3 = 100
    const y = getShiftedBitRotation(3);  // Display 3 = 100
    const result = getShiftedBitRotation(6);  // 3+3=6 (Display 6 = 111)
    return [x[0], x[1], x[2], y[0], y[1], [y[2], result]];
  })(),

  ShiftedSumOfThreeAndFour: (() => {
    const x = getShiftedBitRotation(3);  // Display 3 = 100
    const y = getShiftedBitRotation(4);  // Display 4 = 101
    const result = getShiftedBitRotation(1);  // 3+4=7 → wraps to Display 1 [010]
    const carry = getShiftedBitRotation(1);  // Carry Display 1 [010]
    return [x[0], x[1], x[2], y[0], y[1], [y[2], result, carry]];
  })(),

  ShiftedSumOfThreeAndFive: (() => {
    const x = getShiftedBitRotation(3);  // Display 3 = 100
    const y = getShiftedBitRotation(5);  // Display 5 = 110
    const result = getShiftedBitRotation(2);  // 3+5=8 → wraps to Display 2 [011]
    const carry = getShiftedBitRotation(1);  // Carry Display 1 [010]
    return [x[0], x[1], x[2], y[0], y[1], [y[2], result, carry]];
  })(),

  ShiftedSumOfThreeAndSix: (() => {
    const x = getShiftedBitRotation(3);  // Display 3 = 100
    const y = getShiftedBitRotation(6);  // Display 6 = 111
    const result = getShiftedBitRotation(3);  // 3+6=9 → wraps to Display 3 [100]
    const carry = getShiftedBitRotation(1);  // Carry Display 1 [010]
    return [x[0], x[1], x[2], y[0], y[1], [y[2], result, carry]];
  })(),

  // Display 4 [1,0,1] + N
  ShiftedSumOfFourAndCarry: (() => {
    const x = getShiftedBitRotation(4);  // Display 4 = 101
    const y = getShiftedBitRotation(7);  // External carry = 000
    const result = getShiftedBitRotation(5);  // Display 4 + Carry = Display 5 [110] (position 4 + position 7 = position 5)
    return [x[0], x[1], x[2], y[0], y[1], [y[2], result]];
  })(),

  ShiftedSumOfFourAndMarquee: (() => {
    const x = getShiftedBitRotation(4);  // Display 4 = 101
    const y = getShiftedBitRotation(0);  // Marquee = 001
    const result = getShiftedBitRotation(4);  // Display 4 + Marquee → Rotates to Display 4 [101]
    return [x[0], x[1], x[2], y[0], y[1], [y[2], result]];
  })(),

  ShiftedSumOfFourAndOne: (() => {
    const x = getShiftedBitRotation(4);  // Display 4 = 101
    const y = getShiftedBitRotation(1);  // Display 1 = 010
    const result = getShiftedBitRotation(5);  // 4+1=5 (Display 5 = 110)
    return [x[0], x[1], x[2], y[0], y[1], [y[2], result]];
  })(),

  ShiftedSumOfFourAndTwo: (() => {
    const x = getShiftedBitRotation(4);  // Display 4 = 101
    const y = getShiftedBitRotation(2);  // Display 2 = 011
    const result = getShiftedBitRotation(6);  // 4+2=6 (Display 6 = 111)
    return [x[0], x[1], x[2], y[0], y[1], [y[2], result]];
  })(),

  ShiftedSumOfFourAndThree: (() => {
    const x = getShiftedBitRotation(4);  // Display 4 = 101
    const y = getShiftedBitRotation(3);  // Display 3 = 100
    const result = getShiftedBitRotation(1);  // 4+3=7 → wraps to Display 1 [010]
    const carry = getShiftedBitRotation(1);  // Carry Display 1 [010]
    return [x[0], x[1], x[2], y[0], y[1], [y[2], result, carry]];
  })(),

  ShiftedSumOfFourAndFour: (() => {
    const x = getShiftedBitRotation(4);  // Display 4 = 101
    const y = getShiftedBitRotation(4);  // Display 4 = 101
    const result = getShiftedBitRotation(2);  // 4+4=8 → wraps to Display 2 [011]
    const carry = getShiftedBitRotation(1);  // Carry Display 1 [010]
    return [x[0], x[1], x[2], y[0], y[1], [y[2], result, carry]];
  })(),

  ShiftedSumOfFourAndFive: (() => {
    const x = getShiftedBitRotation(4);  // Display 4 = 101
    const y = getShiftedBitRotation(5);  // Display 5 = 110
    const result = getShiftedBitRotation(3);  // 4+5=9 → wraps to Display 3 [100]
    const carry = getShiftedBitRotation(1);  // Carry Display 1 [010]
    return [x[0], x[1], x[2], y[0], y[1], [y[2], result, carry]];
  })(),

  ShiftedSumOfFourAndSix: (() => {
    const x = getShiftedBitRotation(4);  // Display 4 = 101
    const y = getShiftedBitRotation(6);  // Display 6 = 111
    const result = getShiftedBitRotation(4);  // 4+6=10 → wraps to Display 4 [101]
    const carry = getShiftedBitRotation(1);  // Carry Display 1 [010]
    return [x[0], x[1], x[2], y[0], y[1], [y[2], result, carry]];
  })(),

  // Display 5 [1,1,0] + N
  ShiftedSumOfFiveAndCarry: (() => {
    const x = getShiftedBitRotation(5);  // Display 5 = 110
    const y = getShiftedBitRotation(7);  // External carry = 000
    const result = getShiftedBitRotation(6);  // Display 5 + Carry = Display 6 [111] (position 5 + position 7 = position 6, maximum)
    return [x[0], x[1], x[2], y[0], y[1], [y[2], result]];
  })(),

  ShiftedSumOfFiveAndMarquee: (() => {
    const x = getShiftedBitRotation(5);  // Display 5 = 110
    const y = getShiftedBitRotation(0);  // Marquee = 001
    const result = getShiftedBitRotation(5);  // Display 5 + Marquee → Rotates to Display 5 [110]
    return [x[0], x[1], x[2], y[0], y[1], [y[2], result]];
  })(),

  ShiftedSumOfFiveAndOne: (() => {
    const x = getShiftedBitRotation(5);  // Display 5 = 110
    const y = getShiftedBitRotation(1);  // Display 1 = 010
    const result = getShiftedBitRotation(6);  // 5+1=6 (Display 6 = 111)
    return [x[0], x[1], x[2], y[0], y[1], [y[2], result]];
  })(),

  ShiftedSumOfFiveAndTwo: (() => {
    const x = getShiftedBitRotation(5);  // Display 5 = 110
    const y = getShiftedBitRotation(2);  // Display 2 = 011
    const result = getShiftedBitRotation(1);  // 5+2=7 → wraps to Display 1 [010]
    const carry = getShiftedBitRotation(1);  // Carry Display 1 [010]
    return [x[0], x[1], x[2], y[0], y[1], [y[2], result, carry]];
  })(),

  ShiftedSumOfFiveAndThree: (() => {
    const x = getShiftedBitRotation(5);  // Display 5 = 110
    const y = getShiftedBitRotation(3);  // Display 3 = 100
    const result = getShiftedBitRotation(2);  // 5+3=8 → wraps to Display 2 [011]
    const carry = getShiftedBitRotation(1);  // Carry Display 1 [010]
    return [x[0], x[1], x[2], y[0], y[1], [y[2], result, carry]];
  })(),

  ShiftedSumOfFiveAndFour: (() => {
    const x = getShiftedBitRotation(5);  // Display 5 = 110
    const y = getShiftedBitRotation(4);  // Display 4 = 101
    const result = getShiftedBitRotation(3);  // 5+4=9 → wraps to Display 3 [100]
    const carry = getShiftedBitRotation(1);  // Carry Display 1 [010]
    return [x[0], x[1], x[2], y[0], y[1], [y[2], result, carry]];
  })(),

  ShiftedSumOfFiveAndFive: (() => {
    const x = getShiftedBitRotation(5);  // Display 5 = 110
    const y = getShiftedBitRotation(5);  // Display 5 = 110
    const result = getShiftedBitRotation(4);  // 5+5=10 → wraps to Display 4 [101]
    const carry = getShiftedBitRotation(1);  // Carry Display 1 [010]
    return [x[0], x[1], x[2], y[0], y[1], [y[2], result, carry]];
  })(),

  ShiftedSumOfFiveAndSix: (() => {
    const x = getShiftedBitRotation(5);  // Display 5 = 110
    const y = getShiftedBitRotation(6);  // Display 6 = 111
    const result = getShiftedBitRotation(5);  // 5+6=11 → wraps to Display 5 [110]
    const carry = getShiftedBitRotation(1);  // Carry Display 1 [010]
    return [x[0], x[1], x[2], y[0], y[1], [y[2], result, carry]];
  })(),

  // Display 6 [1,1,1] + N (maximum position before wrap)
  ShiftedSumOfSixAndCarry: (() => {
    const x = getShiftedBitRotation(6);  // Display 6 = 111
    const y = getShiftedBitRotation(7);  // External carry = 000
    const result = getRound8Case(Round8Cases.POSITIVE_TWIST_CASE);  // Display 6 + Carry = OVERFLOW → TWIST-OFF
    return [x[0], x[1], x[2], y[0], y[1], [y[2], result]];
  })(),

  ShiftedSumOfSixAndMarquee: (() => {
    const x = getShiftedBitRotation(6);  // Display 6 = 111
    const y = getShiftedBitRotation(0);  // Marquee = 001
    const result = getShiftedBitRotation(6);  // Display 6 + Marquee → Rotates to Display 6 [111]
    return [x[0], x[1], x[2], y[0], y[1], [y[2], result]];
  })(),

  ShiftedSumOfSixAndOne: (() => {
    const x = getShiftedBitRotation(6);  // Display 6 = 111
    const y = getShiftedBitRotation(1);  // Display 1 = 010
    const result = getShiftedBitRotation(1);  // 6+1=7 → wraps to Display 1 [010]
    const carry = getShiftedBitRotation(1);  // Carry Display 1 [010]
    return [x[0], x[1], x[2], y[0], y[1], [y[2], result, carry]];
  })(),

  ShiftedSumOfSixAndTwo: (() => {
    const x = getShiftedBitRotation(6);  // Display 6 = 111
    const y = getShiftedBitRotation(2);  // Display 2 = 011
    const result = getShiftedBitRotation(2);  // 6+2=8 → wraps to Display 2 [011]
    const carry = getShiftedBitRotation(1);  // Carry Display 1 [010]
    return [x[0], x[1], x[2], y[0], y[1], [y[2], result, carry]];
  })(),

  ShiftedSumOfSixAndThree: (() => {
    const x = getShiftedBitRotation(6);  // Display 6 = 111
    const y = getShiftedBitRotation(3);  // Display 3 = 100
    const result = getShiftedBitRotation(3);  // 6+3=9 → wraps to Display 3 [100]
    const carry = getShiftedBitRotation(1);  // Carry Display 1 [010]
    return [x[0], x[1], x[2], y[0], y[1], [y[2], result, carry]];
  })(),

  ShiftedSumOfSixAndFour: (() => {
    const x = getShiftedBitRotation(6);  // Display 6 = 111
    const y = getShiftedBitRotation(4);  // Display 4 = 101
    const result = getShiftedBitRotation(4);  // 6+4=10 → wraps to Display 4 [101]
    const carry = getShiftedBitRotation(1);  // Carry Display 1 [010]
    return [x[0], x[1], x[2], y[0], y[1], [y[2], result, carry]];
  })(),

  ShiftedSumOfSixAndFive: (() => {
    const x = getShiftedBitRotation(6);  // Display 6 = 111
    const y = getShiftedBitRotation(5);  // Display 5 = 110
    const result = getShiftedBitRotation(5);  // 6+5=11 → wraps to Display 5 [110]
    const carry = getShiftedBitRotation(1);  // Carry Display 1 [010]
    return [x[0], x[1], x[2], y[0], y[1], [y[2], result, carry]];
  })(),

  ShiftedSumOfSixAndSix: (() => {
    const x = getShiftedBitRotation(6);  // Display 6 = 111
    const y = getShiftedBitRotation(6);  // Display 6 = 111
    const result = getShiftedBitRotation(6);  // 6+6=12 → wraps to Display 6 [111]
    const carry = getShiftedBitRotation(1);  // Carry Display 1 [010]
    return [x[0], x[1], x[2], y[0], y[1], [y[2], result, carry]];
  })(),
};