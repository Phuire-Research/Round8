/**
 * Negative One Special Case - Sum Operations
 *
 * SPOOL 2: Some Number Plus Negative One (X + (-1) = X - 1)
 *
 * Pattern: [operandA] + [Negative One column value 111]
 *
 * Negative One column representation: [1,1,1] (Display 8 equivalent value)
 * But with sign 0 (negative), this represents maximum negative magnitude
 *
 * At column level: X + (-1) behaves as X - 1 (decrement operation)
 *
 * Cases:
 * Display 8 [111] + (-1) = Display 7 [110]
 * Display 7 [110] + (-1) = Display 6 [101]
 * ...
 * Display 2 [001] + (-1) = Display 1 [000]
 * Display 1 [000] + (-1) = Absolute Zero [ZERO_CASE] (special boundary)
 *
 * 7D MANIFOLD TOPOLOGY:
 * The tuple's first index is the final bit for 6D array inference,
 * with the tuple itself creating the 7th dimension.
 * This prevents Shor factorization attacks during multiplication.
 */

import { getRegularBitRotation, getRound8Case, Round8Cases } from './Round8.terminology';

type SomeSeries = Record<string, ((number)[] | number)[]>;

export const SomeNumberPlusNegativeOneSeries: SomeSeries = {
  // SPOOL 2: X + (-1) = X - 1

  // Display 1 + (-1) = Absolute Zero (boundary case)
  Display1PlusNegativeOne: (() => {
    const x = getRegularBitRotation(1);  // Display 1 = 000
    const negOne = getRegularBitRotation(8);  // Negative One = 111
    const result = getRound8Case(Round8Cases.ZERO_CASE);  // Result: Absolute Zero (Display 1 - 1 = 0)
    return [x[0], x[1], x[2], negOne[0], negOne[1], [negOne[2], result]];
  })(),

  // Display 2 + (-1) = Display 1
  Display2PlusNegativeOne: (() => {
    const x = getRegularBitRotation(2);  // Display 2 = 001
    const negOne = getRegularBitRotation(8);  // Negative One = 111
    const result = getRegularBitRotation(1);  // Result: Display 1 [000]
    return [x[0], x[1], x[2], negOne[0], negOne[1], [negOne[2], result]];
  })(),

  // Display 3 + (-1) = Display 2
  Display3PlusNegativeOne: (() => {
    const x = getRegularBitRotation(3);  // Display 3 = 010
    const negOne = getRegularBitRotation(8);  // Negative One = 111
    const result = getRegularBitRotation(2);  // Result: Display 2 [001]
    return [x[0], x[1], x[2], negOne[0], negOne[1], [negOne[2], result]];
  })(),

  // Display 4 + (-1) = Display 3
  Display4PlusNegativeOne: (() => {
    const x = getRegularBitRotation(4);  // Display 4 = 011
    const negOne = getRegularBitRotation(8);  // Negative One = 111
    const result = getRegularBitRotation(3);  // Result: Display 3 [010]
    return [x[0], x[1], x[2], negOne[0], negOne[1], [negOne[2], result]];
  })(),

  // Display 5 + (-1) = Display 4
  Display5PlusNegativeOne: (() => {
    const x = getRegularBitRotation(5);  // Display 5 = 100
    const negOne = getRegularBitRotation(8);  // Negative One = 111
    const result = getRegularBitRotation(4);  // Result: Display 4 [011]
    return [x[0], x[1], x[2], negOne[0], negOne[1], [negOne[2], result]];
  })(),

  // Display 6 + (-1) = Display 5
  Display6PlusNegativeOne: (() => {
    const x = getRegularBitRotation(6);  // Display 6 = 101
    const negOne = getRegularBitRotation(8);  // Negative One = 111
    const result = getRegularBitRotation(5);  // Result: Display 5 [100]
    return [x[0], x[1], x[2], negOne[0], negOne[1], [negOne[2], result]];
  })(),

  // Display 7 + (-1) = Display 6
  Display7PlusNegativeOne: (() => {
    const x = getRegularBitRotation(7);  // Display 7 = 110
    const negOne = getRegularBitRotation(8);  // Negative One = 111
    const result = getRegularBitRotation(6);  // Result: Display 6 [101]
    return [x[0], x[1], x[2], negOne[0], negOne[1], [negOne[2], result]];
  })(),

  // Display 8 + (-1) = Display 7
  Display8PlusNegativeOne: (() => {
    const x = getRegularBitRotation(8);  // Display 8 = 111
    const negOne = getRegularBitRotation(8);  // Negative One = 111
    const result = getRegularBitRotation(7);  // Result: Display 7 [110]
    return [x[0], x[1], x[2], negOne[0], negOne[1], [negOne[2], result]];
  })(),
};