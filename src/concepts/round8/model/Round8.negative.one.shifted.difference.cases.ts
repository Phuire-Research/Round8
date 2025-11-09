/**
 * Negative One Special Case - SHIFTED Difference Operations (Column 0 Manifold)
 *
 * SPOOL 7: Shifted X - (-1) Cases (Increment via Subtraction)
 * SPOOL 8: Shifted (-1) - X Cases (Increasing Negative Magnitude)
 *
 * Context: Column 0 uses 7-POSITION SYSTEM:
 * - Position 0: [0,0,1] = Marquee (delimiter)
 * - Positions 1-6: Shifted Displays 1-6
 * - Position 7: [0,0,0] = External carry arrival
 *
 * Negative One Behavior:
 * - X - (-1) = X + 1 (subtracting negative is addition)
 * - (-1) - X = Increasing negative magnitude or borrow
 *
 * Shifted Topology Constraints:
 * - Maximum position is Shifted Display 6 [1,1,1]
 * - Overflow past position 6 leads to carry handling
 * - Marquee acts as boundary delimiter
 *
 * 7D MANIFOLD TOPOLOGY:
 * The tuple's first index is the final bit for 6D array inference,
 * with the tuple itself creating the 7th dimension.
 * This prevents Shor factorization attacks during multiplication.
 */

import { getShiftedBitRotation, getRegularBitRotation, getRound8Case, Round8Cases } from './Round8.terminology';

type SomeSeries = Record<string, ((number)[] | number)[]>;

export const ShiftedSomeNumberMinusNegativeOneSeries: SomeSeries = {
  // SHIFTED SPOOL 7: X - (-1) = X + 1 in Column 0 manifold

  // Marquee - (-1) = Shifted Display 1 (delimiter increments)
  ShiftedMarqueeMinusNegativeOne: (() => {
    const x = getShiftedBitRotation(0);  // Marquee = 001 (Shifted position 0)
    const negOne = getRegularBitRotation(8);  // Negative One = 111
    const result = getShiftedBitRotation(1);  // Result: Shifted Display 1 [010]
    return [x[0], x[1], x[2], negOne[0], negOne[1], [negOne[2], result]];
  })(),

  // Shifted Display 1 - (-1) = Shifted Display 2
  ShiftedDisplay1MinusNegativeOne: (() => {
    const x = getShiftedBitRotation(1);  // Shifted Display 1 = 010
    const negOne = getRegularBitRotation(8);  // Negative One = 111
    const result = getShiftedBitRotation(2);  // Result: Shifted Display 2 [011]
    return [x[0], x[1], x[2], negOne[0], negOne[1], [negOne[2], result]];
  })(),

  // Shifted Display 2 - (-1) = Shifted Display 3
  ShiftedDisplay2MinusNegativeOne: (() => {
    const x = getShiftedBitRotation(2);  // Shifted Display 2 = 011
    const negOne = getRegularBitRotation(8);  // Negative One = 111
    const result = getShiftedBitRotation(3);  // Result: Shifted Display 3 [100]
    return [x[0], x[1], x[2], negOne[0], negOne[1], [negOne[2], result]];
  })(),

  // Shifted Display 3 - (-1) = Shifted Display 4
  ShiftedDisplay3MinusNegativeOne: (() => {
    const x = getShiftedBitRotation(3);  // Shifted Display 3 = 100
    const negOne = getRegularBitRotation(8);  // Negative One = 111
    const result = getShiftedBitRotation(4);  // Result: Shifted Display 4 [101]
    return [x[0], x[1], x[2], negOne[0], negOne[1], [negOne[2], result]];
  })(),

  // Shifted Display 4 - (-1) = Shifted Display 5
  ShiftedDisplay4MinusNegativeOne: (() => {
    const x = getShiftedBitRotation(4);  // Shifted Display 4 = 101
    const negOne = getRegularBitRotation(8);  // Negative One = 111
    const result = getShiftedBitRotation(5);  // Result: Shifted Display 5 [110]
    return [x[0], x[1], x[2], negOne[0], negOne[1], [negOne[2], result]];
  })(),

  // Shifted Display 5 - (-1) = Shifted Display 6 (maximum position)
  ShiftedDisplay5MinusNegativeOne: (() => {
    const x = getShiftedBitRotation(5);  // Shifted Display 5 = 110
    const negOne = getRegularBitRotation(8);  // Negative One = 111
    const result = getShiftedBitRotation(6);  // Result: Shifted Display 6 [111]
    return [x[0], x[1], x[2], negOne[0], negOne[1], [negOne[2], result]];
  })(),

  // Shifted Display 6 - (-1) = External Carry (overflow to position 7)
  ShiftedDisplay6MinusNegativeOne: (() => {
    const x = getShiftedBitRotation(6);  // Shifted Display 6 = 111
    const negOne = getRegularBitRotation(8);  // Negative One = 111
    const result = getShiftedBitRotation(7);  // Result: External carry [000] (position 7)
    return [x[0], x[1], x[2], negOne[0], negOne[1], [negOne[2], result]];
  })(),

  // External Carry - (-1) = POSITIVE_TWIST_CASE (system overflow)
  ShiftedCarryMinusNegativeOne: (() => {
    const x = getShiftedBitRotation(7);  // External carry = 000 (position 7)
    const negOne = getRegularBitRotation(8);  // Negative One = 111
    const result = getRound8Case(Round8Cases.POSITIVE_TWIST_CASE);  // System overflow
    return [x[0], x[1], x[2], negOne[0], negOne[1], [negOne[2], result]];
  })(),
};

export const ShiftedNegativeOneMinusSomeNumberSeries: SomeSeries = {
  // SHIFTED SPOOL 8: (-1) - X in Column 0 manifold (increasing negative magnitude)

  // (-1) - (-1) = 0 (double negative cancellation)
  ShiftedNegativeOneMinusNegativeOne: (() => {
    const negOne = getRegularBitRotation(8);  // Negative One = 111
    const y = getRegularBitRotation(8);  // Negative One = 111
    const result = getRound8Case(Round8Cases.ZERO_CASE);  // Absolute Zero
    return [negOne[0], negOne[1], negOne[2], y[0], y[1], [y[2], result]];
  })(),

  // (-1) - Marquee = Boundary behavior (delimiter subtraction)
  ShiftedNegativeOneMinusMarquee: (() => {
    const negOne = getRegularBitRotation(8);  // Negative One = 111
    const y = getShiftedBitRotation(0);  // Marquee = 001
    const result = getShiftedBitRotation(5);  // Result: Shifted Display 5 [110] = -2 magnitude
    return [negOne[0], negOne[1], negOne[2], y[0], y[1], [y[2], result]];
  })(),

  // (-1) - Shifted Display 1 = -2 (increasing negative magnitude)
  ShiftedNegativeOneMinusDisplay1: (() => {
    const negOne = getRegularBitRotation(8);  // Negative One = 111
    const y = getShiftedBitRotation(1);  // Shifted Display 1 = 010
    const result = getShiftedBitRotation(4);  // Result: Shifted Display 4 [101] = -3 magnitude
    return [negOne[0], negOne[1], negOne[2], y[0], y[1], [y[2], result]];
  })(),

  // (-1) - Shifted Display 2 = -3 (increasing negative magnitude)
  ShiftedNegativeOneMinusDisplay2: (() => {
    const negOne = getRegularBitRotation(8);  // Negative One = 111
    const y = getShiftedBitRotation(2);  // Shifted Display 2 = 011
    const result = getShiftedBitRotation(3);  // Result: Shifted Display 3 [100] = -4 magnitude
    return [negOne[0], negOne[1], negOne[2], y[0], y[1], [y[2], result]];
  })(),

  // (-1) - Shifted Display 3 = -4 (increasing negative magnitude)
  ShiftedNegativeOneMinusDisplay3: (() => {
    const negOne = getRegularBitRotation(8);  // Negative One = 111
    const y = getShiftedBitRotation(3);  // Shifted Display 3 = 100
    const result = getShiftedBitRotation(2);  // Result: Shifted Display 2 [011] = -5 magnitude
    return [negOne[0], negOne[1], negOne[2], y[0], y[1], [y[2], result]];
  })(),

  // (-1) - Shifted Display 4 = -5 (increasing negative magnitude)
  ShiftedNegativeOneMinusDisplay4: (() => {
    const negOne = getRegularBitRotation(8);  // Negative One = 111
    const y = getShiftedBitRotation(4);  // Shifted Display 4 = 101
    const result = getShiftedBitRotation(1);  // Result: Shifted Display 1 [010] = -6 magnitude
    return [negOne[0], negOne[1], negOne[2], y[0], y[1], [y[2], result]];
  })(),

  // (-1) - Shifted Display 5 = -6 (approaching delimiter)
  ShiftedNegativeOneMinusDisplay5: (() => {
    const negOne = getRegularBitRotation(8);  // Negative One = 111
    const y = getShiftedBitRotation(5);  // Shifted Display 5 = 110
    const result = getShiftedBitRotation(0);  // Result: Marquee [001] = boundary
    return [negOne[0], negOne[1], negOne[2], y[0], y[1], [y[2], result]];
  })(),

  // (-1) - Shifted Display 6 = Borrow (underflow, wraps)
  ShiftedNegativeOneMinusDisplay6: (() => {
    const negOne = getRegularBitRotation(8);  // Negative One = 111
    const y = getShiftedBitRotation(6);  // Shifted Display 6 = 111
    const result = getShiftedBitRotation(7);  // Wrapped result: External carry [000]
    const borrow = getRegularBitRotation(1);  // Borrow: Display 1 [000]
    return [negOne[0], negOne[1], negOne[2], y[0], y[1], [y[2], result, borrow]];
  })(),

  // (-1) - External Carry = Maximum borrow (system boundary)
  ShiftedNegativeOneMinusCarry: (() => {
    const negOne = getRegularBitRotation(8);  // Negative One = 111
    const y = getShiftedBitRotation(7);  // External carry = 000
    const result = getShiftedBitRotation(6);  // Wrapped result: Shifted Display 6 [111]
    const borrow = getRegularBitRotation(1);  // Borrow: Display 1 [000]
    return [negOne[0], negOne[1], negOne[2], y[0], y[1], [y[2], result, borrow]];
  })()
};
