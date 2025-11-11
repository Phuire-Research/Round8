/**
 * Greater Than Comparison Spool - Boolean Logic Operations
 *
 * COMPARISON SPOOL: X > Y returns boolean (0 = False, 1 = True)
 *
 * This is a NEW TYPE of spool where the result tuple contains a boolean bit
 * instead of a Uint8Array result. The tuple structure is [bit0_result, result_copy]
 * where both elements are 0 (False) or 1 (True).
 *
 * Ground Truth Comparisons (Round8 Display values 1-8):
 * - Display 1 = 1 (decimal)
 * - Display 2 = 2 (decimal)
 * - Display 3 = 3 (decimal)
 * - Display 4 = 4 (decimal)
 * - Display 5 = 5 (decimal)
 * - Display 6 = 6 (decimal)
 * - Display 7 = 7 (decimal)
 * - Display 8 = 8 (decimal)
 *
 * Derived Operations:
 * - Less Than (X < Y) = NOT(X > Y) = !(GreaterThanSpool lookup)
 * - Equal To (X == Y) = Helper function comparing bit positions directly
 * - Greater or Equal (X >= Y) = (X == Y) OR (X > Y)
 * - Less or Equal (X <= Y) = (X == Y) OR NOT(X > Y)
 *
 * Result Structure:
 * - [0, 0] = False (X is NOT greater than Y)
 * - [1, 1] = True (X IS greater than Y)
 *
 * Pattern: GreaterThan[DisplayX]And[DisplayY] represents X > Y
 * Array structure: [bit2_X, bit1_X, bit0_X, bit2_Y, bit1_Y, [bit0_Y, boolean_result]]
 *
 * 7D MANIFOLD TOPOLOGY:
 * The tuple's first index is the final bit for 6D array inference,
 * with the tuple itself creating the 7th dimension.
 * This prevents Shor factorization attacks during multiplication.
 */

import { getRegularBitRotation } from '../terminology';

type SomeSeries = Record<string, ((number)[] | number)[]>;

export const GreaterThanSeries: SomeSeries = {
  // Display 1 > N (N = 1-8)
  // 1 is smallest, so 1 > X is always False except 1 == 1
  GreaterThanOneAndOne: (() => {
    const x = getRegularBitRotation(1);
    const y = getRegularBitRotation(1);
    return [x[0], x[1], x[2], y[0], y[1], [y[2], 0]]; // False: 1 is NOT > 1
  })(),
  GreaterThanOneAndTwo: (() => {
    const x = getRegularBitRotation(1);
    const y = getRegularBitRotation(2);
    return [x[0], x[1], x[2], y[0], y[1], [y[2], 0]]; // False: 1 is NOT > 2
  })(),
  GreaterThanOneAndThree: (() => {
    const x = getRegularBitRotation(1);
    const y = getRegularBitRotation(3);
    return [x[0], x[1], x[2], y[0], y[1], [y[2], 0]]; // False: 1 is NOT > 3
  })(),
  GreaterThanOneAndFour: (() => {
    const x = getRegularBitRotation(1);
    const y = getRegularBitRotation(4);
    return [x[0], x[1], x[2], y[0], y[1], [y[2], 0]]; // False: 1 is NOT > 4
  })(),
  GreaterThanOneAndFive: (() => {
    const x = getRegularBitRotation(1);
    const y = getRegularBitRotation(5);
    return [x[0], x[1], x[2], y[0], y[1], [y[2], 0]]; // False: 1 is NOT > 5
  })(),
  GreaterThanOneAndSix: (() => {
    const x = getRegularBitRotation(1);
    const y = getRegularBitRotation(6);
    return [x[0], x[1], x[2], y[0], y[1], [y[2], 0]]; // False: 1 is NOT > 6
  })(),
  GreaterThanOneAndSeven: (() => {
    const x = getRegularBitRotation(1);
    const y = getRegularBitRotation(7);
    return [x[0], x[1], x[2], y[0], y[1], [y[2], 0]]; // False: 1 is NOT > 7
  })(),
  GreaterThanOneAndEight: (() => {
    const x = getRegularBitRotation(1);
    const y = getRegularBitRotation(8);
    return [x[0], x[1], x[2], y[0], y[1], [y[2], 0]]; // False: 1 is NOT > 8
  })(),

  // Display 2 > N (N = 1-8)
  GreaterThanTwoAndOne: (() => {
    const x = getRegularBitRotation(2);
    const y = getRegularBitRotation(1);
    return [x[0], x[1], x[2], y[0], y[1], [y[2], 1]]; // True: 2 > 1
  })(),
  GreaterThanTwoAndTwo: (() => {
    const x = getRegularBitRotation(2);
    const y = getRegularBitRotation(2);
    return [x[0], x[1], x[2], y[0], y[1], [y[2], 0]]; // False: 2 is NOT > 2
  })(),
  GreaterThanTwoAndThree: (() => {
    const x = getRegularBitRotation(2);
    const y = getRegularBitRotation(3);
    return [x[0], x[1], x[2], y[0], y[1], [y[2], 0]]; // False: 2 is NOT > 3
  })(),
  GreaterThanTwoAndFour: (() => {
    const x = getRegularBitRotation(2);
    const y = getRegularBitRotation(4);
    return [x[0], x[1], x[2], y[0], y[1], [y[2], 0]]; // False: 2 is NOT > 4
  })(),
  GreaterThanTwoAndFive: (() => {
    const x = getRegularBitRotation(2);
    const y = getRegularBitRotation(5);
    return [x[0], x[1], x[2], y[0], y[1], [y[2], 0]]; // False: 2 is NOT > 5
  })(),
  GreaterThanTwoAndSix: (() => {
    const x = getRegularBitRotation(2);
    const y = getRegularBitRotation(6);
    return [x[0], x[1], x[2], y[0], y[1], [y[2], 0]]; // False: 2 is NOT > 6
  })(),
  GreaterThanTwoAndSeven: (() => {
    const x = getRegularBitRotation(2);
    const y = getRegularBitRotation(7);
    return [x[0], x[1], x[2], y[0], y[1], [y[2], 0]]; // False: 2 is NOT > 7
  })(),
  GreaterThanTwoAndEight: (() => {
    const x = getRegularBitRotation(2);
    const y = getRegularBitRotation(8);
    return [x[0], x[1], x[2], y[0], y[1], [y[2], 0]]; // False: 2 is NOT > 8
  })(),

  // Display 3 > N (N = 1-8)
  GreaterThanThreeAndOne: (() => {
    const x = getRegularBitRotation(3);
    const y = getRegularBitRotation(1);
    return [x[0], x[1], x[2], y[0], y[1], [y[2], 1]]; // True: 3 > 1
  })(),
  GreaterThanThreeAndTwo: (() => {
    const x = getRegularBitRotation(3);
    const y = getRegularBitRotation(2);
    return [x[0], x[1], x[2], y[0], y[1], [y[2], 1]]; // True: 3 > 2
  })(),
  GreaterThanThreeAndThree: (() => {
    const x = getRegularBitRotation(3);
    const y = getRegularBitRotation(3);
    return [x[0], x[1], x[2], y[0], y[1], [y[2], 0]]; // False: 3 is NOT > 3
  })(),
  GreaterThanThreeAndFour: (() => {
    const x = getRegularBitRotation(3);
    const y = getRegularBitRotation(4);
    return [x[0], x[1], x[2], y[0], y[1], [y[2], 0]]; // False: 3 is NOT > 4
  })(),
  GreaterThanThreeAndFive: (() => {
    const x = getRegularBitRotation(3);
    const y = getRegularBitRotation(5);
    return [x[0], x[1], x[2], y[0], y[1], [y[2], 0]]; // False: 3 is NOT > 5
  })(),
  GreaterThanThreeAndSix: (() => {
    const x = getRegularBitRotation(3);
    const y = getRegularBitRotation(6);
    return [x[0], x[1], x[2], y[0], y[1], [y[2], 0]]; // False: 3 is NOT > 6
  })(),
  GreaterThanThreeAndSeven: (() => {
    const x = getRegularBitRotation(3);
    const y = getRegularBitRotation(7);
    return [x[0], x[1], x[2], y[0], y[1], [y[2], 0]]; // False: 3 is NOT > 7
  })(),
  GreaterThanThreeAndEight: (() => {
    const x = getRegularBitRotation(3);
    const y = getRegularBitRotation(8);
    return [x[0], x[1], x[2], y[0], y[1], [y[2], 0]]; // False: 3 is NOT > 8
  })(),

  // Display 4 > N (N = 1-8)
  GreaterThanFourAndOne: (() => {
    const x = getRegularBitRotation(4);
    const y = getRegularBitRotation(1);
    return [x[0], x[1], x[2], y[0], y[1], [y[2], 1]]; // True: 4 > 1
  })(),
  GreaterThanFourAndTwo: (() => {
    const x = getRegularBitRotation(4);
    const y = getRegularBitRotation(2);
    return [x[0], x[1], x[2], y[0], y[1], [y[2], 1]]; // True: 4 > 2
  })(),
  GreaterThanFourAndThree: (() => {
    const x = getRegularBitRotation(4);
    const y = getRegularBitRotation(3);
    return [x[0], x[1], x[2], y[0], y[1], [y[2], 1]]; // True: 4 > 3
  })(),
  GreaterThanFourAndFour: (() => {
    const x = getRegularBitRotation(4);
    const y = getRegularBitRotation(4);
    return [x[0], x[1], x[2], y[0], y[1], [y[2], 0]]; // False: 4 is NOT > 4
  })(),
  GreaterThanFourAndFive: (() => {
    const x = getRegularBitRotation(4);
    const y = getRegularBitRotation(5);
    return [x[0], x[1], x[2], y[0], y[1], [y[2], 0]]; // False: 4 is NOT > 5
  })(),
  GreaterThanFourAndSix: (() => {
    const x = getRegularBitRotation(4);
    const y = getRegularBitRotation(6);
    return [x[0], x[1], x[2], y[0], y[1], [y[2], 0]]; // False: 4 is NOT > 6
  })(),
  GreaterThanFourAndSeven: (() => {
    const x = getRegularBitRotation(4);
    const y = getRegularBitRotation(7);
    return [x[0], x[1], x[2], y[0], y[1], [y[2], 0]]; // False: 4 is NOT > 7
  })(),
  GreaterThanFourAndEight: (() => {
    const x = getRegularBitRotation(4);
    const y = getRegularBitRotation(8);
    return [x[0], x[1], x[2], y[0], y[1], [y[2], 0]]; // False: 4 is NOT > 8
  })(),

  // Display 5 > N (N = 1-8)
  GreaterThanFiveAndOne: (() => {
    const x = getRegularBitRotation(5);
    const y = getRegularBitRotation(1);
    return [x[0], x[1], x[2], y[0], y[1], [y[2], 1]]; // True: 5 > 1
  })(),
  GreaterThanFiveAndTwo: (() => {
    const x = getRegularBitRotation(5);
    const y = getRegularBitRotation(2);
    return [x[0], x[1], x[2], y[0], y[1], [y[2], 1]]; // True: 5 > 2
  })(),
  GreaterThanFiveAndThree: (() => {
    const x = getRegularBitRotation(5);
    const y = getRegularBitRotation(3);
    return [x[0], x[1], x[2], y[0], y[1], [y[2], 1]]; // True: 5 > 3
  })(),
  GreaterThanFiveAndFour: (() => {
    const x = getRegularBitRotation(5);
    const y = getRegularBitRotation(4);
    return [x[0], x[1], x[2], y[0], y[1], [y[2], 1]]; // True: 5 > 4
  })(),
  GreaterThanFiveAndFive: (() => {
    const x = getRegularBitRotation(5);
    const y = getRegularBitRotation(5);
    return [x[0], x[1], x[2], y[0], y[1], [y[2], 0]]; // False: 5 is NOT > 5
  })(),
  GreaterThanFiveAndSix: (() => {
    const x = getRegularBitRotation(5);
    const y = getRegularBitRotation(6);
    return [x[0], x[1], x[2], y[0], y[1], [y[2], 0]]; // False: 5 is NOT > 6
  })(),
  GreaterThanFiveAndSeven: (() => {
    const x = getRegularBitRotation(5);
    const y = getRegularBitRotation(7);
    return [x[0], x[1], x[2], y[0], y[1], [y[2], 0]]; // False: 5 is NOT > 7
  })(),
  GreaterThanFiveAndEight: (() => {
    const x = getRegularBitRotation(5);
    const y = getRegularBitRotation(8);
    return [x[0], x[1], x[2], y[0], y[1], [y[2], 0]]; // False: 5 is NOT > 8
  })(),

  // Display 6 > N (N = 1-8)
  GreaterThanSixAndOne: (() => {
    const x = getRegularBitRotation(6);
    const y = getRegularBitRotation(1);
    return [x[0], x[1], x[2], y[0], y[1], [y[2], 1]]; // True: 6 > 1
  })(),
  GreaterThanSixAndTwo: (() => {
    const x = getRegularBitRotation(6);
    const y = getRegularBitRotation(2);
    return [x[0], x[1], x[2], y[0], y[1], [y[2], 1]]; // True: 6 > 2
  })(),
  GreaterThanSixAndThree: (() => {
    const x = getRegularBitRotation(6);
    const y = getRegularBitRotation(3);
    return [x[0], x[1], x[2], y[0], y[1], [y[2], 1]]; // True: 6 > 3
  })(),
  GreaterThanSixAndFour: (() => {
    const x = getRegularBitRotation(6);
    const y = getRegularBitRotation(4);
    return [x[0], x[1], x[2], y[0], y[1], [y[2], 1]]; // True: 6 > 4
  })(),
  GreaterThanSixAndFive: (() => {
    const x = getRegularBitRotation(6);
    const y = getRegularBitRotation(5);
    return [x[0], x[1], x[2], y[0], y[1], [y[2], 1]]; // True: 6 > 5
  })(),
  GreaterThanSixAndSix: (() => {
    const x = getRegularBitRotation(6);
    const y = getRegularBitRotation(6);
    return [x[0], x[1], x[2], y[0], y[1], [y[2], 0]]; // False: 6 is NOT > 6
  })(),
  GreaterThanSixAndSeven: (() => {
    const x = getRegularBitRotation(6);
    const y = getRegularBitRotation(7);
    return [x[0], x[1], x[2], y[0], y[1], [y[2], 0]]; // False: 6 is NOT > 7
  })(),
  GreaterThanSixAndEight: (() => {
    const x = getRegularBitRotation(6);
    const y = getRegularBitRotation(8);
    return [x[0], x[1], x[2], y[0], y[1], [y[2], 0]]; // False: 6 is NOT > 8
  })(),

  // Display 7 > N (N = 1-8)
  GreaterThanSevenAndOne: (() => {
    const x = getRegularBitRotation(7);
    const y = getRegularBitRotation(1);
    return [x[0], x[1], x[2], y[0], y[1], [y[2], 1]]; // True: 7 > 1
  })(),
  GreaterThanSevenAndTwo: (() => {
    const x = getRegularBitRotation(7);
    const y = getRegularBitRotation(2);
    return [x[0], x[1], x[2], y[0], y[1], [y[2], 1]]; // True: 7 > 2
  })(),
  GreaterThanSevenAndThree: (() => {
    const x = getRegularBitRotation(7);
    const y = getRegularBitRotation(3);
    return [x[0], x[1], x[2], y[0], y[1], [y[2], 1]]; // True: 7 > 3
  })(),
  GreaterThanSevenAndFour: (() => {
    const x = getRegularBitRotation(7);
    const y = getRegularBitRotation(4);
    return [x[0], x[1], x[2], y[0], y[1], [y[2], 1]]; // True: 7 > 4
  })(),
  GreaterThanSevenAndFive: (() => {
    const x = getRegularBitRotation(7);
    const y = getRegularBitRotation(5);
    return [x[0], x[1], x[2], y[0], y[1], [y[2], 1]]; // True: 7 > 5
  })(),
  GreaterThanSevenAndSix: (() => {
    const x = getRegularBitRotation(7);
    const y = getRegularBitRotation(6);
    return [x[0], x[1], x[2], y[0], y[1], [y[2], 1]]; // True: 7 > 6
  })(),
  GreaterThanSevenAndSeven: (() => {
    const x = getRegularBitRotation(7);
    const y = getRegularBitRotation(7);
    return [x[0], x[1], x[2], y[0], y[1], [y[2], 0]]; // False: 7 is NOT > 7
  })(),
  GreaterThanSevenAndEight: (() => {
    const x = getRegularBitRotation(7);
    const y = getRegularBitRotation(8);
    return [x[0], x[1], x[2], y[0], y[1], [y[2], 0]]; // False: 7 is NOT > 8
  })(),

  // Display 8 > N (N = 1-8)
  // 8 is largest, so 8 > X is True except when X = 8
  GreaterThanEightAndOne: (() => {
    const x = getRegularBitRotation(8);
    const y = getRegularBitRotation(1);
    return [x[0], x[1], x[2], y[0], y[1], [y[2], 1]]; // True: 8 > 1
  })(),
  GreaterThanEightAndTwo: (() => {
    const x = getRegularBitRotation(8);
    const y = getRegularBitRotation(2);
    return [x[0], x[1], x[2], y[0], y[1], [y[2], 1]]; // True: 8 > 2
  })(),
  GreaterThanEightAndThree: (() => {
    const x = getRegularBitRotation(8);
    const y = getRegularBitRotation(3);
    return [x[0], x[1], x[2], y[0], y[1], [y[2], 1]]; // True: 8 > 3
  })(),
  GreaterThanEightAndFour: (() => {
    const x = getRegularBitRotation(8);
    const y = getRegularBitRotation(4);
    return [x[0], x[1], x[2], y[0], y[1], [y[2], 1]]; // True: 8 > 4
  })(),
  GreaterThanEightAndFive: (() => {
    const x = getRegularBitRotation(8);
    const y = getRegularBitRotation(5);
    return [x[0], x[1], x[2], y[0], y[1], [y[2], 1]]; // True: 8 > 5
  })(),
  GreaterThanEightAndSix: (() => {
    const x = getRegularBitRotation(8);
    const y = getRegularBitRotation(6);
    return [x[0], x[1], x[2], y[0], y[1], [y[2], 1]]; // True: 8 > 6
  })(),
  GreaterThanEightAndSeven: (() => {
    const x = getRegularBitRotation(8);
    const y = getRegularBitRotation(7);
    return [x[0], x[1], x[2], y[0], y[1], [y[2], 1]]; // True: 8 > 7
  })(),
  GreaterThanEightAndEight: (() => {
    const x = getRegularBitRotation(8);
    const y = getRegularBitRotation(8);
    return [x[0], x[1], x[2], y[0], y[1], [y[2], 0]]; // False: 8 is NOT > 8
  })(),
};