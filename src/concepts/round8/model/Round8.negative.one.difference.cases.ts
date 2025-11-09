/**
 * Negative One Special Case - Difference Operations
 *
 * SPOOL 4: Some Number Minus Negative One (X - (-1) = X + 1)
 * SPOOL 5: Negative One Minus Some Number ((-1) - X)
 *
 * Pattern: [operandA] - [Negative One column value 111]
 *
 * At column level:
 * - X - (-1) behaves as X + 1 (subtracting negative is addition)
 * - (-1) - X has varying behavior based on X magnitude
 *
 * Cases:
 * SPOOL 4 (X - (-1)):
 * Display 1 [000] - (-1) = Display 2 [001] (increment)
 * Display 7 [110] - (-1) = Display 8 [111]
 * Display 8 [111] - (-1) = Overflow with carry (becomes Display 1 + carry)
 *
 * SPOOL 5 ((-1) - X):
 * (-1) - 1 = -2 (increasing negative magnitude)
 * (-1) - 8 = Borrow case (magnitude wrap)
 * (-1) - (-1) = 0 (double negative cancellation)
 *
 * 7D MANIFOLD TOPOLOGY:
 * The tuple's first index is the final bit for 6D array inference,
 * with the tuple itself creating the 7th dimension.
 * This prevents Shor factorization attacks during multiplication.
 */

import { getRegularBitRotation } from './Round8.terminology';

type SomeSeries = Record<string, ((number)[] | number)[]>;

export const SomeNumberMinusNegativeOneSeries: SomeSeries = {
  // SPOOL 4: X - (-1) = X + 1 (subtracting negative is addition)

  // Display 1 - (-1) = Display 2 (increment)
  Display1MinusNegativeOne: (() => {
    const x = getRegularBitRotation(1);  // Display 1 = 000
    const negOne = getRegularBitRotation(8);  // Negative One = 111
    const result = getRegularBitRotation(2);  // Result: Display 2 [001]
    return [x[0], x[1], x[2], negOne[0], negOne[1], [negOne[2], result]];
  })(),

  // Display 2 - (-1) = Display 3
  Display2MinusNegativeOne: (() => {
    const x = getRegularBitRotation(2);  // Display 2 = 001
    const negOne = getRegularBitRotation(8);  // Negative One = 111
    const result = getRegularBitRotation(3);  // Result: Display 3 [010]
    return [x[0], x[1], x[2], negOne[0], negOne[1], [negOne[2], result]];
  })(),

  // Display 3 - (-1) = Display 4
  Display3MinusNegativeOne: (() => {
    const x = getRegularBitRotation(3);  // Display 3 = 010
    const negOne = getRegularBitRotation(8);  // Negative One = 111
    const result = getRegularBitRotation(4);  // Result: Display 4 [011]
    return [x[0], x[1], x[2], negOne[0], negOne[1], [negOne[2], result]];
  })(),

  // Display 4 - (-1) = Display 5
  Display4MinusNegativeOne: (() => {
    const x = getRegularBitRotation(4);  // Display 4 = 011
    const negOne = getRegularBitRotation(8);  // Negative One = 111
    const result = getRegularBitRotation(5);  // Result: Display 5 [100]
    return [x[0], x[1], x[2], negOne[0], negOne[1], [negOne[2], result]];
  })(),

  // Display 5 - (-1) = Display 6
  Display5MinusNegativeOne: (() => {
    const x = getRegularBitRotation(5);  // Display 5 = 100
    const negOne = getRegularBitRotation(8);  // Negative One = 111
    const result = getRegularBitRotation(6);  // Result: Display 6 [101]
    return [x[0], x[1], x[2], negOne[0], negOne[1], [negOne[2], result]];
  })(),

  // Display 6 - (-1) = Display 7
  Display6MinusNegativeOne: (() => {
    const x = getRegularBitRotation(6);  // Display 6 = 101
    const negOne = getRegularBitRotation(8);  // Negative One = 111
    const result = getRegularBitRotation(7);  // Result: Display 7 [110]
    return [x[0], x[1], x[2], negOne[0], negOne[1], [negOne[2], result]];
  })(),

  // Display 7 - (-1) = Display 8
  Display7MinusNegativeOne: (() => {
    const x = getRegularBitRotation(7);  // Display 7 = 110
    const negOne = getRegularBitRotation(8);  // Negative One = 111
    const result = getRegularBitRotation(8);  // Result: Display 8 [111]
    return [x[0], x[1], x[2], negOne[0], negOne[1], [negOne[2], result]];
  })(),

  // Display 8 - (-1) = Overflow (becomes Display 1 with carry)
  Display8MinusNegativeOne: (() => {
    const x = getRegularBitRotation(8);  // Display 8 = 111
    const negOne = getRegularBitRotation(8);  // Negative One = 111
    const result = getRegularBitRotation(1);  // Result: Display 1 [000]
    const carry = getRegularBitRotation(1);  // Carry: Display 1 [000]
    return [x[0], x[1], x[2], negOne[0], negOne[1], [negOne[2], result, carry]];
  })(),
};

export const NegativeOneMinusSomeNumberSeries: SomeSeries = {
  // SPOOL 5: (-1) - X (increasing negative magnitude or borrow cases)

  // (-1) - (-1) = 0 (DOUBLE NEGATIVE CANCELLATION)
  NegativeOneMinusNegativeOne: (() => {
    const negOne = getRegularBitRotation(8);  // Negative One = 111
    const y = getRegularBitRotation(8);  // Negative One = 111
    const result = getRegularBitRotation(1);  // Result: Absolute Zero (Display 1 = 000)
    return [negOne[0], negOne[1], negOne[2], y[0], y[1], [y[2], result]];
  })(),

  // (-1) - 1 = -2 (increasing negative magnitude)
  NegativeOneMinusDisplay1: (() => {
    const negOne = getRegularBitRotation(8);  // Negative One = 111
    const y = getRegularBitRotation(1);  // Display 1 = 000
    const result = getRegularBitRotation(7);  // Result: Display 7 [110] = -2 magnitude
    return [negOne[0], negOne[1], negOne[2], y[0], y[1], [y[2], result]];
  })(),

  // (-1) - 2 = -3 (increasing negative magnitude)
  NegativeOneMinusDisplay2: (() => {
    const negOne = getRegularBitRotation(8);  // Negative One = 111
    const y = getRegularBitRotation(2);  // Display 2 = 001
    const result = getRegularBitRotation(6);  // Result: Display 6 [101] = -3 magnitude
    return [negOne[0], negOne[1], negOne[2], y[0], y[1], [y[2], result]];
  })(),

  // (-1) - 3 = -4 (increasing negative magnitude)
  NegativeOneMinusDisplay3: (() => {
    const negOne = getRegularBitRotation(8);  // Negative One = 111
    const y = getRegularBitRotation(3);  // Display 3 = 010
    const result = getRegularBitRotation(5);  // Result: Display 5 [100] = -4 magnitude
    return [negOne[0], negOne[1], negOne[2], y[0], y[1], [y[2], result]];
  })(),

  // (-1) - 4 = -5 (increasing negative magnitude)
  NegativeOneMinusDisplay4: (() => {
    const negOne = getRegularBitRotation(8);  // Negative One = 111
    const y = getRegularBitRotation(4);  // Display 4 = 011
    const result = getRegularBitRotation(4);  // Result: Display 4 [011] = -5 magnitude
    return [negOne[0], negOne[1], negOne[2], y[0], y[1], [y[2], result]];
  })(),

  // (-1) - 5 = -6 (increasing negative magnitude)
  NegativeOneMinusDisplay5: (() => {
    const negOne = getRegularBitRotation(8);  // Negative One = 111
    const y = getRegularBitRotation(5);  // Display 5 = 100
    const result = getRegularBitRotation(3);  // Result: Display 3 [010] = -6 magnitude
    return [negOne[0], negOne[1], negOne[2], y[0], y[1], [y[2], result]];
  })(),

  // (-1) - 6 = -7 (increasing negative magnitude)
  NegativeOneMinusDisplay6: (() => {
    const negOne = getRegularBitRotation(8);  // Negative One = 111
    const y = getRegularBitRotation(6);  // Display 6 = 101
    const result = getRegularBitRotation(2);  // Result: Display 2 [001] = -7 magnitude
    return [negOne[0], negOne[1], negOne[2], y[0], y[1], [y[2], result]];
  })(),

  // (-1) - 7 = -8 (maximum negative magnitude, no borrow)
  NegativeOneMinusDisplay7: (() => {
    const negOne = getRegularBitRotation(8);  // Negative One = 111
    const y = getRegularBitRotation(7);  // Display 7 = 110
    const result = getRegularBitRotation(1);  // Result: Display 1 [000] = -8 magnitude
    return [negOne[0], negOne[1], negOne[2], y[0], y[1], [y[2], result]];
  })(),

  // (-1) - 8 = Borrow (underflow, wraps with borrow)
  NegativeOneMinusDisplay8: (() => {
    const negOne = getRegularBitRotation(8);  // Negative One = 111
    const y = getRegularBitRotation(8);  // Display 8 = 111
    const result = getRegularBitRotation(8);  // Wrapped result: Display 8 [111]
    const borrow = getRegularBitRotation(1);  // Borrow: Display 1 [000]
    return [negOne[0], negOne[1], negOne[2], y[0], y[1], [y[2], result, borrow]];
  })()
};
