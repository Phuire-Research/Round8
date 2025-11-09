/**
 * Negative One Special Case - UNIQUE Sum Operations
 *
 * SPOOL 3: Negative One Plus Some Number ((-1) + X)
 *
 * Pattern: [Negative One column value 111] + [operandB]
 *
 * This spool is UNIQUE because the order matters for Negative One operations.
 * (-1) + X has different behavior than X + (-1) due to zero-crossing semantics.
 *
 * At column level: (-1) + X can cross zero boundary:
 * - (-1) + 1 = 0 (zero crossing)
 * - (-1) + 2 = +1 (becomes positive)
 * - (-1) + 8 = +7 (positive result)
 *
 * Special Cases:
 * - Double Negative: (-1) + (-1) = -2 (both operands negative, sum magnitudes)
 * - Zero Crossing: (-1) + 1 = 0 (ZERO_CASE)
 * - Sign Flip: (-1) + X where X > 1 results in positive number
 *
 * 7D MANIFOLD TOPOLOGY:
 * The tuple's first index is the final bit for 6D array inference,
 * with the tuple itself creating the 7th dimension.
 * This prevents Shor factorization attacks during multiplication.
 */

import { getRegularBitRotation, getRound8Case, Round8Cases } from './Round8.terminology';

type SomeSeries = Record<string, ((number)[] | number)[]>;

export const NegativeOnePlusSomeNumberSeries: SomeSeries = {
  // SPOOL 3: (-1) + X with zero-crossing and sign flip semantics

  // (-1) + (-1) = -2 (DOUBLE NEGATIVE - both operands negative, sum magnitudes)
  // At column level: 111 + 111 with both negative signs
  // Result: Magnitude increases (becomes -2)
  NegativeOnePlusNegativeOne: (() => {
    const negOne = getRegularBitRotation(8);  // Negative One = 111 (operandA)
    const y = getRegularBitRotation(8);  // Negative One = 111 (operandB)
    const result = getRegularBitRotation(7);  // Result: Display 7 [110] = -2 magnitude
    const carry = getRegularBitRotation(1);  // Carry: Display 1 [000]
    return [negOne[0], negOne[1], negOne[2], y[0], y[1], [y[2], result, carry]];
  })(),

  // (-1) + 1 = 0 (ZERO CROSSING)
  NegativeOnePlusDisplay1: (() => {
    const negOne = getRegularBitRotation(8);  // Negative One = 111
    const y = getRegularBitRotation(1);  // Display 1 = 000
    const result = getRound8Case(Round8Cases.ZERO_CASE);  // Result: Absolute Zero (negative + positive cancel)
    return [negOne[0], negOne[1], negOne[2], y[0], y[1], [y[2], result]];
  })(),

  // (-1) + 2 = +1 (SIGN FLIP - becomes positive)
  NegativeOnePlusDisplay2: (() => {
    const negOne = getRegularBitRotation(8);  // Negative One = 111
    const y = getRegularBitRotation(2);  // Display 2 = 001
    const result = getRegularBitRotation(1);  // Result: Display 1 [000] positive
    return [negOne[0], negOne[1], negOne[2], y[0], y[1], [y[2], result]];
  })(),

  // (-1) + 3 = +2 (positive result)
  NegativeOnePlusDisplay3: (() => {
    const negOne = getRegularBitRotation(8);  // Negative One = 111
    const y = getRegularBitRotation(3);  // Display 3 = 010
    const result = getRegularBitRotation(2);  // Result: Display 2 [001] positive
    return [negOne[0], negOne[1], negOne[2], y[0], y[1], [y[2], result]];
  })(),

  // (-1) + 4 = +3 (positive result)
  NegativeOnePlusDisplay4: (() => {
    const negOne = getRegularBitRotation(8);  // Negative One = 111
    const y = getRegularBitRotation(4);  // Display 4 = 011
    const result = getRegularBitRotation(3);  // Result: Display 3 [010] positive
    return [negOne[0], negOne[1], negOne[2], y[0], y[1], [y[2], result]];
  })(),

  // (-1) + 5 = +4 (positive result)
  NegativeOnePlusDisplay5: (() => {
    const negOne = getRegularBitRotation(8);  // Negative One = 111
    const y = getRegularBitRotation(5);  // Display 5 = 100
    const result = getRegularBitRotation(4);  // Result: Display 4 [011] positive
    return [negOne[0], negOne[1], negOne[2], y[0], y[1], [y[2], result]];
  })(),

  // (-1) + 6 = +5 (positive result)
  NegativeOnePlusDisplay6: (() => {
    const negOne = getRegularBitRotation(8);  // Negative One = 111
    const y = getRegularBitRotation(6);  // Display 6 = 101
    const result = getRegularBitRotation(5);  // Result: Display 5 [100] positive
    return [negOne[0], negOne[1], negOne[2], y[0], y[1], [y[2], result]];
  })(),

  // (-1) + 7 = +6 (positive result)
  NegativeOnePlusDisplay7: (() => {
    const negOne = getRegularBitRotation(8);  // Negative One = 111
    const y = getRegularBitRotation(7);  // Display 7 = 110
    const result = getRegularBitRotation(6);  // Result: Display 6 [101] positive
    return [negOne[0], negOne[1], negOne[2], y[0], y[1], [y[2], result]];
  })(),

  // (-1) + 8 = +7 (positive result)
  NegativeOnePlusDisplay8: (() => {
    const negOne = getRegularBitRotation(8);  // Negative One = 111
    const y = getRegularBitRotation(8);  // Display 8 = 111
    const result = getRegularBitRotation(7);  // Result: Display 7 [110] positive
    return [negOne[0], negOne[1], negOne[2], y[0], y[1], [y[2], result]];
  })(),
};