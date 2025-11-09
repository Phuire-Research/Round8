/**
 * Negative One Special Case - SHIFTED Sum Operations (Column 0 Manifold)
 *
 * SPOOL 6: Shifted Topology X + (-1) and (-1) + X Cases
 *
 * Context: Column 0 uses 7-POSITION SYSTEM (not 8-position):
 * - Position 0: [0,0,1] = Marquee (delimiter/reset point)
 * - Position 1: [0,1,0] = Shifted Display 1
 * - Position 2: [0,1,1] = Shifted Display 2
 * - Position 3: [1,0,0] = Shifted Display 3
 * - Position 4: [1,0,1] = Shifted Display 4
 * - Position 5: [1,1,0] = Shifted Display 5
 * - Position 6: [1,1,1] = Shifted Display 6 (maximum counting position)
 * - Position 7: [0,0,0] = External carry arrival point
 *
 * Negative One in Shifted Topology:
 * - Represented as Shifted Display 6 [1,1,1] (maximum magnitude)
 * - With negative sign, this is -1 in Column 0 context
 *
 * Pattern: X + (-1) decrements in shifted topology
 * Pattern: (-1) + X can cross zero boundary
 *
 * 7D MANIFOLD TOPOLOGY:
 * The tuple's first index is the final bit for 6D array inference,
 * with the tuple itself creating the 7th dimension.
 * This prevents Shor factorization attacks during multiplication.
 */

import { getShiftedBitRotation, getRegularBitRotation, getRound8Case, Round8Cases } from './Round8.terminology';

type SomeSeries = Record<string, ((number)[] | number)[]>;

export const ShiftedSomeNumberPlusNegativeOneSeries: SomeSeries = {
  // SHIFTED SPOOL: X + (-1) in Column 0 manifold (7-position decrement)

  // Shifted Display 1 + (-1) = Marquee (boundary case)
  ShiftedDisplay1PlusNegativeOne: (() => {
    const x = getShiftedBitRotation(1);  // Shifted Display 1 = 010
    const negOne = getRegularBitRotation(8);  // Negative One = 111 (Shifted Display 6)
    const result = getShiftedBitRotation(0);  // Result: Marquee [001] (delimiter)
    return [x[0], x[1], x[2], negOne[0], negOne[1], [negOne[2], result]];
  })(),

  // Shifted Display 2 + (-1) = Shifted Display 1
  ShiftedDisplay2PlusNegativeOne: (() => {
    const x = getShiftedBitRotation(2);  // Shifted Display 2 = 011
    const negOne = getRegularBitRotation(8);  // Negative One = 111
    const result = getShiftedBitRotation(1);  // Result: Shifted Display 1 [010]
    return [x[0], x[1], x[2], negOne[0], negOne[1], [negOne[2], result]];
  })(),

  // Shifted Display 3 + (-1) = Shifted Display 2
  ShiftedDisplay3PlusNegativeOne: (() => {
    const x = getShiftedBitRotation(3);  // Shifted Display 3 = 100
    const negOne = getRegularBitRotation(8);  // Negative One = 111
    const result = getShiftedBitRotation(2);  // Result: Shifted Display 2 [011]
    return [x[0], x[1], x[2], negOne[0], negOne[1], [negOne[2], result]];
  })(),

  // Shifted Display 4 + (-1) = Shifted Display 3
  ShiftedDisplay4PlusNegativeOne: (() => {
    const x = getShiftedBitRotation(4);  // Shifted Display 4 = 101
    const negOne = getRegularBitRotation(8);  // Negative One = 111
    const result = getShiftedBitRotation(3);  // Result: Shifted Display 3 [100]
    return [x[0], x[1], x[2], negOne[0], negOne[1], [negOne[2], result]];
  })(),

  // Shifted Display 5 + (-1) = Shifted Display 4
  ShiftedDisplay5PlusNegativeOne: (() => {
    const x = getShiftedBitRotation(5);  // Shifted Display 5 = 110
    const negOne = getRegularBitRotation(8);  // Negative One = 111
    const result = getShiftedBitRotation(4);  // Result: Shifted Display 4 [101]
    return [x[0], x[1], x[2], negOne[0], negOne[1], [negOne[2], result]];
  })(),

  // Shifted Display 6 + (-1) = Shifted Display 5
  ShiftedDisplay6PlusNegativeOne: (() => {
    const x = getShiftedBitRotation(6);  // Shifted Display 6 = 111
    const negOne = getRegularBitRotation(8);  // Negative One = 111
    const result = getShiftedBitRotation(5);  // Result: Shifted Display 5 [110]
    return [x[0], x[1], x[2], negOne[0], negOne[1], [negOne[2], result]];
  })(),

  // External Carry + (-1) = Shifted Display 6 (carry decrements to max position)
  ShiftedCarryPlusNegativeOne: (() => {
    const x = getShiftedBitRotation(7);  // External carry = 000 (position 7)
    const negOne = getRegularBitRotation(8);  // Negative One = 111
    const result = getShiftedBitRotation(6);  // Result: Shifted Display 6 [111]
    return [x[0], x[1], x[2], negOne[0], negOne[1], [negOne[2], result]];
  })(),
};

export const ShiftedNegativeOnePlusSomeNumberSeries: SomeSeries = {
  // SHIFTED SPOOL: (-1) + X in Column 0 manifold (zero-crossing behavior)

  // (-1) + (-1) = Double negative (increases magnitude to -2)
  ShiftedNegativeOnePlusNegativeOne: (() => {
    const negOne = getRegularBitRotation(8);  // Negative One (Shifted Display 6) = 111
    const y = getRegularBitRotation(8);  // Negative One = 111
    const result = getShiftedBitRotation(5);  // Result: Shifted Display 5 [110] = -2 magnitude
    return [negOne[0], negOne[1], negOne[2], y[0], y[1], [y[2], result]];
  })(),

  // (-1) + Marquee = Boundary case (delimiter behavior)
  ShiftedNegativeOnePlusMarquee: (() => {
    const negOne = getRegularBitRotation(8);  // Negative One = 111
    const y = getShiftedBitRotation(0);  // Marquee = 001
    const result = getShiftedBitRotation(4);  // Result: Shifted Display 4 [101]
    return [negOne[0], negOne[1], negOne[2], y[0], y[1], [y[2], result]];
  })(),

  // (-1) + Shifted Display 1 = Zero crossing
  ShiftedNegativeOnePlusDisplay1: (() => {
    const negOne = getRegularBitRotation(8);  // Negative One = 111
    const y = getShiftedBitRotation(1);  // Shifted Display 1 = 010
    const result = getRound8Case(Round8Cases.ZERO_CASE);  // Result: Absolute Zero (negative + positive cancel)
    return [negOne[0], negOne[1], negOne[2], y[0], y[1], [y[2], result]];
  })(),

  // (-1) + Shifted Display 2 = +1 (sign flip)
  ShiftedNegativeOnePlusDisplay2: (() => {
    const negOne = getRegularBitRotation(8);  // Negative One = 111
    const y = getShiftedBitRotation(2);  // Shifted Display 2 = 011
    const result = getShiftedBitRotation(1);  // Result: Shifted Display 1 [010] positive
    return [negOne[0], negOne[1], negOne[2], y[0], y[1], [y[2], result]];
  })(),

  // (-1) + Shifted Display 3 = +2 (positive result)
  ShiftedNegativeOnePlusDisplay3: (() => {
    const negOne = getRegularBitRotation(8);  // Negative One = 111
    const y = getShiftedBitRotation(3);  // Shifted Display 3 = 100
    const result = getShiftedBitRotation(2);  // Result: Shifted Display 2 [011] positive
    return [negOne[0], negOne[1], negOne[2], y[0], y[1], [y[2], result]];
  })(),

  // (-1) + Shifted Display 4 = +3 (positive result)
  ShiftedNegativeOnePlusDisplay4: (() => {
    const negOne = getRegularBitRotation(8);  // Negative One = 111
    const y = getShiftedBitRotation(4);  // Shifted Display 4 = 101
    const result = getShiftedBitRotation(3);  // Result: Shifted Display 3 [100] positive
    return [negOne[0], negOne[1], negOne[2], y[0], y[1], [y[2], result]];
  })(),

  // (-1) + Shifted Display 5 = +4 (positive result)
  ShiftedNegativeOnePlusDisplay5: (() => {
    const negOne = getRegularBitRotation(8);  // Negative One = 111
    const y = getShiftedBitRotation(5);  // Shifted Display 5 = 110
    const result = getShiftedBitRotation(4);  // Result: Shifted Display 4 [101] positive
    return [negOne[0], negOne[1], negOne[2], y[0], y[1], [y[2], result]];
  })(),

  // (-1) + Shifted Display 6 = +5 (positive result)
  ShiftedNegativeOnePlusDisplay6: (() => {
    const negOne = getRegularBitRotation(8);  // Negative One = 111
    const y = getShiftedBitRotation(6);  // Shifted Display 6 = 111
    const result = getShiftedBitRotation(5);  // Result: Shifted Display 5 [110] positive
    return [negOne[0], negOne[1], negOne[2], y[0], y[1], [y[2], result]];
  })(),

  // (-1) + External Carry = +6 (positive result, max position)
  ShiftedNegativeOnePlusCarry: (() => {
    const negOne = getRegularBitRotation(8);  // Negative One = 111
    const y = getShiftedBitRotation(7);  // External carry = 000
    const result = getShiftedBitRotation(6);  // Result: Shifted Display 6 [111] positive
    return [negOne[0], negOne[1], negOne[2], y[0], y[1], [y[2], result]];
  })(),
};
