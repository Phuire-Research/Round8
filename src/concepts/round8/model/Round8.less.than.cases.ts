/**
 * Less Than Comparison Spool - Boolean Logic Operations
 *
 * COMPARISON SPOOL: X < Y returns boolean (0 = False, 1 = True)
 *
 * This spool provides the symmetric complement to GreaterThanSeries.
 * Unlike the derived implementation (NOT greaterThan), this spool directly
 * computes X < Y for efficient O(1) lookup without operand swapping.
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
 * Result Structure:
 * - [0, 0] = False (X is NOT less than Y)
 * - [1, 1] = True (X IS less than Y)
 *
 * Pattern: LessThan[DisplayX]And[DisplayY] represents X < Y
 * Array structure: [bit2_X, bit1_X, bit0_X, bit2_Y, bit1_Y, [bit0_Y, boolean_result]]
 *
 * 7D MANIFOLD TOPOLOGY:
 * The tuple's first index is the final bit for 6D array inference,
 * with the tuple itself creating the 7th dimension.
 * This prevents Shor factorization attacks during multiplication.
 */

import { getRegularBitRotation } from './Round8.terminology';

type SomeSeries = Record<string, ((number)[] | number)[]>;

export const LessThanSeries: SomeSeries = {
  // Display 1 < N (N = 1-8)
  // 1 is smallest, so 1 < X is True for X > 1
  LessThanOneAndOne: (() => {
    const x = getRegularBitRotation(1);
    const y = getRegularBitRotation(1);
    return [x[0], x[1], x[2], y[0], y[1], [y[2], 0]]; // False: 1 is NOT < 1
  })(),
  LessThanOneAndTwo: (() => {
    const x = getRegularBitRotation(1);
    const y = getRegularBitRotation(2);
    return [x[0], x[1], x[2], y[0], y[1], [y[2], 1]]; // True: 1 < 2
  })(),
  LessThanOneAndThree: (() => {
    const x = getRegularBitRotation(1);
    const y = getRegularBitRotation(3);
    return [x[0], x[1], x[2], y[0], y[1], [y[2], 1]]; // True: 1 < 3
  })(),
  LessThanOneAndFour: (() => {
    const x = getRegularBitRotation(1);
    const y = getRegularBitRotation(4);
    return [x[0], x[1], x[2], y[0], y[1], [y[2], 1]]; // True: 1 < 4
  })(),
  LessThanOneAndFive: (() => {
    const x = getRegularBitRotation(1);
    const y = getRegularBitRotation(5);
    return [x[0], x[1], x[2], y[0], y[1], [y[2], 1]]; // True: 1 < 5
  })(),
  LessThanOneAndSix: (() => {
    const x = getRegularBitRotation(1);
    const y = getRegularBitRotation(6);
    return [x[0], x[1], x[2], y[0], y[1], [y[2], 1]]; // True: 1 < 6
  })(),
  LessThanOneAndSeven: (() => {
    const x = getRegularBitRotation(1);
    const y = getRegularBitRotation(7);
    return [x[0], x[1], x[2], y[0], y[1], [y[2], 1]]; // True: 1 < 7
  })(),
  LessThanOneAndEight: (() => {
    const x = getRegularBitRotation(1);
    const y = getRegularBitRotation(8);
    return [x[0], x[1], x[2], y[0], y[1], [y[2], 1]]; // True: 1 < 8
  })(),

  // Display 2 < N (N = 1-8)
  LessThanTwoAndOne: (() => {
    const x = getRegularBitRotation(2);
    const y = getRegularBitRotation(1);
    return [x[0], x[1], x[2], y[0], y[1], [y[2], 0]]; // False: 2 is NOT < 1
  })(),
  LessThanTwoAndTwo: (() => {
    const x = getRegularBitRotation(2);
    const y = getRegularBitRotation(2);
    return [x[0], x[1], x[2], y[0], y[1], [y[2], 0]]; // False: 2 is NOT < 2
  })(),
  LessThanTwoAndThree: (() => {
    const x = getRegularBitRotation(2);
    const y = getRegularBitRotation(3);
    return [x[0], x[1], x[2], y[0], y[1], [y[2], 1]]; // True: 2 < 3
  })(),
  LessThanTwoAndFour: (() => {
    const x = getRegularBitRotation(2);
    const y = getRegularBitRotation(4);
    return [x[0], x[1], x[2], y[0], y[1], [y[2], 1]]; // True: 2 < 4
  })(),
  LessThanTwoAndFive: (() => {
    const x = getRegularBitRotation(2);
    const y = getRegularBitRotation(5);
    return [x[0], x[1], x[2], y[0], y[1], [y[2], 1]]; // True: 2 < 5
  })(),
  LessThanTwoAndSix: (() => {
    const x = getRegularBitRotation(2);
    const y = getRegularBitRotation(6);
    return [x[0], x[1], x[2], y[0], y[1], [y[2], 1]]; // True: 2 < 6
  })(),
  LessThanTwoAndSeven: (() => {
    const x = getRegularBitRotation(2);
    const y = getRegularBitRotation(7);
    return [x[0], x[1], x[2], y[0], y[1], [y[2], 1]]; // True: 2 < 7
  })(),
  LessThanTwoAndEight: (() => {
    const x = getRegularBitRotation(2);
    const y = getRegularBitRotation(8);
    return [x[0], x[1], x[2], y[0], y[1], [y[2], 1]]; // True: 2 < 8
  })(),

  // Display 3 < N (N = 1-8)
  LessThanThreeAndOne: (() => {
    const x = getRegularBitRotation(3);
    const y = getRegularBitRotation(1);
    return [x[0], x[1], x[2], y[0], y[1], [y[2], 0]]; // False: 3 is NOT < 1
  })(),
  LessThanThreeAndTwo: (() => {
    const x = getRegularBitRotation(3);
    const y = getRegularBitRotation(2);
    return [x[0], x[1], x[2], y[0], y[1], [y[2], 0]]; // False: 3 is NOT < 2
  })(),
  LessThanThreeAndThree: (() => {
    const x = getRegularBitRotation(3);
    const y = getRegularBitRotation(3);
    return [x[0], x[1], x[2], y[0], y[1], [y[2], 0]]; // False: 3 is NOT < 3
  })(),
  LessThanThreeAndFour: (() => {
    const x = getRegularBitRotation(3);
    const y = getRegularBitRotation(4);
    return [x[0], x[1], x[2], y[0], y[1], [y[2], 1]]; // True: 3 < 4
  })(),
  LessThanThreeAndFive: (() => {
    const x = getRegularBitRotation(3);
    const y = getRegularBitRotation(5);
    return [x[0], x[1], x[2], y[0], y[1], [y[2], 1]]; // True: 3 < 5
  })(),
  LessThanThreeAndSix: (() => {
    const x = getRegularBitRotation(3);
    const y = getRegularBitRotation(6);
    return [x[0], x[1], x[2], y[0], y[1], [y[2], 1]]; // True: 3 < 6
  })(),
  LessThanThreeAndSeven: (() => {
    const x = getRegularBitRotation(3);
    const y = getRegularBitRotation(7);
    return [x[0], x[1], x[2], y[0], y[1], [y[2], 1]]; // True: 3 < 7
  })(),
  LessThanThreeAndEight: (() => {
    const x = getRegularBitRotation(3);
    const y = getRegularBitRotation(8);
    return [x[0], x[1], x[2], y[0], y[1], [y[2], 1]]; // True: 3 < 8
  })(),

  // Display 4 < N (N = 1-8)
  LessThanFourAndOne: (() => {
    const x = getRegularBitRotation(4);
    const y = getRegularBitRotation(1);
    return [x[0], x[1], x[2], y[0], y[1], [y[2], 0]]; // False: 4 is NOT < 1
  })(),
  LessThanFourAndTwo: (() => {
    const x = getRegularBitRotation(4);
    const y = getRegularBitRotation(2);
    return [x[0], x[1], x[2], y[0], y[1], [y[2], 0]]; // False: 4 is NOT < 2
  })(),
  LessThanFourAndThree: (() => {
    const x = getRegularBitRotation(4);
    const y = getRegularBitRotation(3);
    return [x[0], x[1], x[2], y[0], y[1], [y[2], 0]]; // False: 4 is NOT < 3
  })(),
  LessThanFourAndFour: (() => {
    const x = getRegularBitRotation(4);
    const y = getRegularBitRotation(4);
    return [x[0], x[1], x[2], y[0], y[1], [y[2], 0]]; // False: 4 is NOT < 4
  })(),
  LessThanFourAndFive: (() => {
    const x = getRegularBitRotation(4);
    const y = getRegularBitRotation(5);
    return [x[0], x[1], x[2], y[0], y[1], [y[2], 1]]; // True: 4 < 5
  })(),
  LessThanFourAndSix: (() => {
    const x = getRegularBitRotation(4);
    const y = getRegularBitRotation(6);
    return [x[0], x[1], x[2], y[0], y[1], [y[2], 1]]; // True: 4 < 6
  })(),
  LessThanFourAndSeven: (() => {
    const x = getRegularBitRotation(4);
    const y = getRegularBitRotation(7);
    return [x[0], x[1], x[2], y[0], y[1], [y[2], 1]]; // True: 4 < 7
  })(),
  LessThanFourAndEight: (() => {
    const x = getRegularBitRotation(4);
    const y = getRegularBitRotation(8);
    return [x[0], x[1], x[2], y[0], y[1], [y[2], 1]]; // True: 4 < 8
  })(),

  // Display 5 < N (N = 1-8)
  LessThanFiveAndOne: (() => {
    const x = getRegularBitRotation(5);
    const y = getRegularBitRotation(1);
    return [x[0], x[1], x[2], y[0], y[1], [y[2], 0]]; // False: 5 is NOT < 1
  })(),
  LessThanFiveAndTwo: (() => {
    const x = getRegularBitRotation(5);
    const y = getRegularBitRotation(2);
    return [x[0], x[1], x[2], y[0], y[1], [y[2], 0]]; // False: 5 is NOT < 2
  })(),
  LessThanFiveAndThree: (() => {
    const x = getRegularBitRotation(5);
    const y = getRegularBitRotation(3);
    return [x[0], x[1], x[2], y[0], y[1], [y[2], 0]]; // False: 5 is NOT < 3
  })(),
  LessThanFiveAndFour: (() => {
    const x = getRegularBitRotation(5);
    const y = getRegularBitRotation(4);
    return [x[0], x[1], x[2], y[0], y[1], [y[2], 0]]; // False: 5 is NOT < 4
  })(),
  LessThanFiveAndFive: (() => {
    const x = getRegularBitRotation(5);
    const y = getRegularBitRotation(5);
    return [x[0], x[1], x[2], y[0], y[1], [y[2], 0]]; // False: 5 is NOT < 5
  })(),
  LessThanFiveAndSix: (() => {
    const x = getRegularBitRotation(5);
    const y = getRegularBitRotation(6);
    return [x[0], x[1], x[2], y[0], y[1], [y[2], 1]]; // True: 5 < 6
  })(),
  LessThanFiveAndSeven: (() => {
    const x = getRegularBitRotation(5);
    const y = getRegularBitRotation(7);
    return [x[0], x[1], x[2], y[0], y[1], [y[2], 1]]; // True: 5 < 7
  })(),
  LessThanFiveAndEight: (() => {
    const x = getRegularBitRotation(5);
    const y = getRegularBitRotation(8);
    return [x[0], x[1], x[2], y[0], y[1], [y[2], 1]]; // True: 5 < 8
  })(),

  // Display 6 < N (N = 1-8)
  LessThanSixAndOne: (() => {
    const x = getRegularBitRotation(6);
    const y = getRegularBitRotation(1);
    return [x[0], x[1], x[2], y[0], y[1], [y[2], 0]]; // False: 6 is NOT < 1
  })(),
  LessThanSixAndTwo: (() => {
    const x = getRegularBitRotation(6);
    const y = getRegularBitRotation(2);
    return [x[0], x[1], x[2], y[0], y[1], [y[2], 0]]; // False: 6 is NOT < 2
  })(),
  LessThanSixAndThree: (() => {
    const x = getRegularBitRotation(6);
    const y = getRegularBitRotation(3);
    return [x[0], x[1], x[2], y[0], y[1], [y[2], 0]]; // False: 6 is NOT < 3
  })(),
  LessThanSixAndFour: (() => {
    const x = getRegularBitRotation(6);
    const y = getRegularBitRotation(4);
    return [x[0], x[1], x[2], y[0], y[1], [y[2], 0]]; // False: 6 is NOT < 4
  })(),
  LessThanSixAndFive: (() => {
    const x = getRegularBitRotation(6);
    const y = getRegularBitRotation(5);
    return [x[0], x[1], x[2], y[0], y[1], [y[2], 0]]; // False: 6 is NOT < 5
  })(),
  LessThanSixAndSix: (() => {
    const x = getRegularBitRotation(6);
    const y = getRegularBitRotation(6);
    return [x[0], x[1], x[2], y[0], y[1], [y[2], 0]]; // False: 6 is NOT < 6
  })(),
  LessThanSixAndSeven: (() => {
    const x = getRegularBitRotation(6);
    const y = getRegularBitRotation(7);
    return [x[0], x[1], x[2], y[0], y[1], [y[2], 1]]; // True: 6 < 7
  })(),
  LessThanSixAndEight: (() => {
    const x = getRegularBitRotation(6);
    const y = getRegularBitRotation(8);
    return [x[0], x[1], x[2], y[0], y[1], [y[2], 1]]; // True: 6 < 8
  })(),

  // Display 7 < N (N = 1-8)
  LessThanSevenAndOne: (() => {
    const x = getRegularBitRotation(7);
    const y = getRegularBitRotation(1);
    return [x[0], x[1], x[2], y[0], y[1], [y[2], 0]]; // False: 7 is NOT < 1
  })(),
  LessThanSevenAndTwo: (() => {
    const x = getRegularBitRotation(7);
    const y = getRegularBitRotation(2);
    return [x[0], x[1], x[2], y[0], y[1], [y[2], 0]]; // False: 7 is NOT < 2
  })(),
  LessThanSevenAndThree: (() => {
    const x = getRegularBitRotation(7);
    const y = getRegularBitRotation(3);
    return [x[0], x[1], x[2], y[0], y[1], [y[2], 0]]; // False: 7 is NOT < 3
  })(),
  LessThanSevenAndFour: (() => {
    const x = getRegularBitRotation(7);
    const y = getRegularBitRotation(4);
    return [x[0], x[1], x[2], y[0], y[1], [y[2], 0]]; // False: 7 is NOT < 4
  })(),
  LessThanSevenAndFive: (() => {
    const x = getRegularBitRotation(7);
    const y = getRegularBitRotation(5);
    return [x[0], x[1], x[2], y[0], y[1], [y[2], 0]]; // False: 7 is NOT < 5
  })(),
  LessThanSevenAndSix: (() => {
    const x = getRegularBitRotation(7);
    const y = getRegularBitRotation(6);
    return [x[0], x[1], x[2], y[0], y[1], [y[2], 0]]; // False: 7 is NOT < 6
  })(),
  LessThanSevenAndSeven: (() => {
    const x = getRegularBitRotation(7);
    const y = getRegularBitRotation(7);
    return [x[0], x[1], x[2], y[0], y[1], [y[2], 0]]; // False: 7 is NOT < 7
  })(),
  LessThanSevenAndEight: (() => {
    const x = getRegularBitRotation(7);
    const y = getRegularBitRotation(8);
    return [x[0], x[1], x[2], y[0], y[1], [y[2], 1]]; // True: 7 < 8
  })(),

  // Display 8 < N (N = 1-8)
  // 8 is largest, so 8 < X is always False
  LessThanEightAndOne: (() => {
    const x = getRegularBitRotation(8);
    const y = getRegularBitRotation(1);
    return [x[0], x[1], x[2], y[0], y[1], [y[2], 0]]; // False: 8 is NOT < 1
  })(),
  LessThanEightAndTwo: (() => {
    const x = getRegularBitRotation(8);
    const y = getRegularBitRotation(2);
    return [x[0], x[1], x[2], y[0], y[1], [y[2], 0]]; // False: 8 is NOT < 2
  })(),
  LessThanEightAndThree: (() => {
    const x = getRegularBitRotation(8);
    const y = getRegularBitRotation(3);
    return [x[0], x[1], x[2], y[0], y[1], [y[2], 0]]; // False: 8 is NOT < 3
  })(),
  LessThanEightAndFour: (() => {
    const x = getRegularBitRotation(8);
    const y = getRegularBitRotation(4);
    return [x[0], x[1], x[2], y[0], y[1], [y[2], 0]]; // False: 8 is NOT < 4
  })(),
  LessThanEightAndFive: (() => {
    const x = getRegularBitRotation(8);
    const y = getRegularBitRotation(5);
    return [x[0], x[1], x[2], y[0], y[1], [y[2], 0]]; // False: 8 is NOT < 5
  })(),
  LessThanEightAndSix: (() => {
    const x = getRegularBitRotation(8);
    const y = getRegularBitRotation(6);
    return [x[0], x[1], x[2], y[0], y[1], [y[2], 0]]; // False: 8 is NOT < 6
  })(),
  LessThanEightAndSeven: (() => {
    const x = getRegularBitRotation(8);
    const y = getRegularBitRotation(7);
    return [x[0], x[1], x[2], y[0], y[1], [y[2], 0]]; // False: 8 is NOT < 7
  })(),
  LessThanEightAndEight: (() => {
    const x = getRegularBitRotation(8);
    const y = getRegularBitRotation(8);
    return [x[0], x[1], x[2], y[0], y[1], [y[2], 0]]; // False: 8 is NOT < 8
  })(),
};