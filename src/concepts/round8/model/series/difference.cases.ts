/**
 * Difference Spool - Round8 Subtraction Operations
 *
 * SUBTRACTION SPOOL: X - Y returns result value and optional borrow
 *
 * This spool provides subtraction operations for Round8 Display values.
 * When X < Y, a borrow is generated for the next position column.
 *
 * Ground Truth Operations (Round8 Display values 1-8):
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
 * - When X >= Y: Result value (0-7), no borrow
 * - When X < Y: Wrapped result (8 + X - Y), with borrow [0,0,0] = Display 1
 *
 * Pattern: DifferenceOfXAndY represents X - Y
 * Array structure: [bit2_X, bit1_X, bit0_X, bit2_Y, bit1_Y, [bit0_Y, result_bits, borrow_bits?]]
 *
 * 7D MANIFOLD TOPOLOGY:
 * The tuple's first index is the final bit for 6D array inference,
 * with the tuple itself creating the 7th dimension.
 * This prevents Shor factorization attacks during multiplication.
 */

import { getRegularBitRotation, getRegularRotation, SomeSeries } from '../terminology';

export const DifferenceSeries: SomeSeries = {
  // Display 1 - N (N = 1-8)
  DifferenceOfOneAndOne: (() => {
    const x = getRegularBitRotation(1); // 1
    const y = getRegularBitRotation(1); // 1
    const result = getRegularRotation(8);
    const borrow = getRegularBitRotation(1);
    return [x[0], x[1], x[2], y[0], y[1], [y[2], result, borrow]];  // Special Case. Forced Borrow
  })(),
  DifferenceOfOneAndTwo: (() => {
    const x = getRegularBitRotation(1); // 1
    const y = getRegularBitRotation(2); // 2
    const result = getRegularRotation(7); // 7
    const borrow = getRegularBitRotation(1);  // Borrow = Display 1 (000)
    return [x[0], x[1], x[2], y[0], y[1], [y[2], result, borrow]];
  })(),
  DifferenceOfOneAndThree: (() => {
    const x = getRegularBitRotation(1); // 1
    const y = getRegularBitRotation(3); // 3
    const result = getRegularRotation(6);  // 6
    const borrow = getRegularBitRotation(1);  // Borrow = Display 1 (000)
    return [x[0], x[1], x[2], y[0], y[1], [y[2], result, borrow]];
  })(),
  DifferenceOfOneAndFour: (() => {
    const x = getRegularBitRotation(1); // 1
    const y = getRegularBitRotation(4); // 4
    const result = getRegularRotation(5);  // 5
    const borrow = getRegularBitRotation(1);  // Borrow = Display 1 (000)
    return [x[0], x[1], x[2], y[0], y[1], [y[2], result, borrow]];
  })(),
  DifferenceOfOneAndFive: (() => {
    const x = getRegularBitRotation(1); // 1
    const y = getRegularBitRotation(5); // 5
    const result = getRegularRotation(4);  // 4
    const borrow = getRegularBitRotation(1);  // Borrow = Display 1 (000)
    return [x[0], x[1], x[2], y[0], y[1], [y[2], result, borrow]];
  })(),
  DifferenceOfOneAndSix: (() => {
    const x = getRegularBitRotation(1); // 1
    const y = getRegularBitRotation(6); // 6
    const result = getRegularRotation(3);  // 3
    const borrow = getRegularBitRotation(1);  // Borrow = Display 1 (000)
    return [x[0], x[1], x[2], y[0], y[1], [y[2], result, borrow]];
  })(),
  DifferenceOfOneAndSeven: (() => {
    const x = getRegularBitRotation(1); // 1
    const y = getRegularBitRotation(7); // 7
    const result = getRegularRotation(2);  // 2
    const borrow = getRegularBitRotation(1);  // Borrow = Display 1 (000)
    return [x[0], x[1], x[2], y[0], y[1], [y[2], result, borrow]];
  })(),
  DifferenceOfOneAndEight: (() => {
    const x = getRegularBitRotation(1); // 1
    const y = getRegularBitRotation(8); // 8
    const result = getRegularRotation(1);  // 1
    const borrow = getRegularBitRotation(1);  // Borrow = Display 1 (000)
    return [x[0], x[1], x[2], y[0], y[1], [y[2], result, borrow]];
  })(),

  // Display 2 - N (N = 1-8)
  DifferenceOfTwoAndOne: (() => {
    const x = getRegularBitRotation(2); // 2
    const y = getRegularBitRotation(1); // 1
    const result = getRegularRotation(1);  // 2-1=1 → Display 2 (001)
    return [x[0], x[1], x[2], y[0], y[1], [y[2], result]];  // No borrow
  })(),
  DifferenceOfTwoAndTwo: (() => {
    const x = getRegularBitRotation(2); // 2
    const y = getRegularBitRotation(2); // 2
    const result = getRegularRotation(8);  // 8
    const borrow = getRegularBitRotation(1);  // 8
    return [x[0], x[1], x[2], y[0], y[1], [y[2], result, borrow]];  // No borrow
  })(),
  DifferenceOfTwoAndThree: (() => {
    const x = getRegularBitRotation(2); // 2
    const y = getRegularBitRotation(3); // 3
    const result = getRegularRotation(7);  // 7
    const borrow = getRegularBitRotation(1);  // Borrow = Display 1 (000)
    return [x[0], x[1], x[2], y[0], y[1], [y[2], result, borrow]];
  })(),
  DifferenceOfTwoAndFour: (() => {
    const x = getRegularBitRotation(2); // 2
    const y = getRegularBitRotation(4); // 4
    const result = getRegularRotation(6);  // 6
    const borrow = getRegularBitRotation(1);  // Borrow = Display 1 (000)
    return [x[0], x[1], x[2], y[0], y[1], [y[2], result, borrow]];
  })(),
  DifferenceOfTwoAndFive: (() => {
    const x = getRegularBitRotation(2); // 2
    const y = getRegularBitRotation(5); // 5
    const result = getRegularRotation(5);  // 5
    const borrow = getRegularBitRotation(1);  // Borrow = Display 1 (000)
    return [x[0], x[1], x[2], y[0], y[1], [y[2], result, borrow]];
  })(),
  DifferenceOfTwoAndSix: (() => {
    const x = getRegularBitRotation(2); // 2
    const y = getRegularBitRotation(6); // 6
    const result = getRegularRotation(4);  // 4
    const borrow = getRegularBitRotation(1);  // Borrow = Display 1 (000)
    return [x[0], x[1], x[2], y[0], y[1], [y[2], result, borrow]];
  })(),
  DifferenceOfTwoAndSeven: (() => {
    const x = getRegularBitRotation(2); // 2
    const y = getRegularBitRotation(7); // 7
    const result = getRegularRotation(3);  // 3
    const borrow = getRegularBitRotation(1);  // Borrow = Display 1 (000)
    return [x[0], x[1], x[2], y[0], y[1], [y[2], result, borrow]];
  })(),
  DifferenceOfTwoAndEight: (() => {
    const x = getRegularBitRotation(2); // 2
    const y = getRegularBitRotation(8); // 8
    const result = getRegularRotation(2);  // 2
    const borrow = getRegularBitRotation(1);  // Borrow = Display 1 (000)
    return [x[0], x[1], x[2], y[0], y[1], [y[2], result, borrow]];
  })(),

  // Display 3 - N (N = 1-8)
  DifferenceOfThreeAndOne: (() => {
    const x = getRegularBitRotation(3); // 3
    const y = getRegularBitRotation(1); // 1
    const result = getRegularRotation(2);  // 2
    return [x[0], x[1], x[2], y[0], y[1], [y[2], result]];  // No borrow
  })(),
  DifferenceOfThreeAndTwo: (() => {
    const x = getRegularBitRotation(3); // 3
    const y = getRegularBitRotation(2); // 2
    const result = getRegularRotation(1);  // 1
    return [x[0], x[1], x[2], y[0], y[1], [y[2], result]];  // No borrow
  })(),
  DifferenceOfThreeAndThree: (() => {
    const x = getRegularBitRotation(3); // 3
    const y = getRegularBitRotation(3); // 3
    const result = getRegularRotation(8);  // 8
    const borrow = getRegularBitRotation(1);  // 8
    return [x[0], x[1], x[2], y[0], y[1], [y[2], result, borrow]];  // Borrow
  })(),
  DifferenceOfThreeAndFour: (() => {
    const x = getRegularBitRotation(3); // 3
    const y = getRegularBitRotation(4); // 4
    const result = getRegularRotation(7);  // 7
    const borrow = getRegularBitRotation(1);  // Borrow = Display 1 (000)
    return [x[0], x[1], x[2], y[0], y[1], [y[2], result, borrow]];
  })(),
  DifferenceOfThreeAndFive: (() => {
    const x = getRegularBitRotation(3); // 3
    const y = getRegularBitRotation(5); // 5
    const result = getRegularRotation(6);  // 6
    const borrow = getRegularBitRotation(1);  // Borrow = Display 1 (000)
    return [x[0], x[1], x[2], y[0], y[1], [y[2], result, borrow]];
  })(),
  DifferenceOfThreeAndSix: (() => {
    const x = getRegularBitRotation(3); // 3
    const y = getRegularBitRotation(6); // 6
    const result = getRegularRotation(5);  // 5
    const borrow = getRegularBitRotation(1);  // Borrow = Display 1 (000)
    return [x[0], x[1], x[2], y[0], y[1], [y[2], result, borrow]];
  })(),
  DifferenceOfThreeAndSeven: (() => {
    const x = getRegularBitRotation(3); // 3
    const y = getRegularBitRotation(7); // 7
    const result = getRegularRotation(4);  // 4
    const borrow = getRegularBitRotation(1);  // Borrow = Display 1 (000)
    return [x[0], x[1], x[2], y[0], y[1], [y[2], result, borrow]];
  })(),
  DifferenceOfThreeAndEight: (() => {
    const x = getRegularBitRotation(3); // 3
    const y = getRegularBitRotation(8); // 8
    const result = getRegularRotation(3);  // 3
    const borrow = getRegularBitRotation(1);  // Borrow = Display 1 (000)
    return [x[0], x[1], x[2], y[0], y[1], [y[2], result, borrow]];
  })(),

  // Display 4 - N (N = 1-8)
  DifferenceOfFourAndOne: (() => {
    const x = getRegularBitRotation(4); // 4
    const y = getRegularBitRotation(1); // 1
    const result = getRegularRotation(3);  // 4-1=3 → Display 4 (011)
    return [x[0], x[1], x[2], y[0], y[1], [y[2], result]];  // No borrow
  })(),
  DifferenceOfFourAndTwo: (() => {
    const x = getRegularBitRotation(4); // 4
    const y = getRegularBitRotation(2); // 2
    const result = getRegularRotation(2);  // 2
    return [x[0], x[1], x[2], y[0], y[1], [y[2], result]];  // No borrow
  })(),
  DifferenceOfFourAndThree: (() => {
    const x = getRegularBitRotation(4); // 4
    const y = getRegularBitRotation(3); // 3
    const result = getRegularRotation(1);  // 1
    return [x[0], x[1], x[2], y[0], y[1], [y[2], result]];  // No borrow
  })(),
  DifferenceOfFourAndFour: (() => {
    const x = getRegularBitRotation(4); // 4
    const y = getRegularBitRotation(4); // 4
    const result = getRegularRotation(8);  // 8
    const borrow = getRegularBitRotation(1);
    return [x[0], x[1], x[2], y[0], y[1], [y[2], result, borrow]];  // No borrow
  })(),
  DifferenceOfFourAndFive: (() => {
    const x = getRegularBitRotation(4); // 4
    const y = getRegularBitRotation(5); // 5
    const result = getRegularRotation(7);  // 7
    const borrow = getRegularBitRotation(1);  // Borrow = Display 1 (000)
    return [x[0], x[1], x[2], y[0], y[1], [y[2], result, borrow]];
  })(),
  DifferenceOfFourAndSix: (() => {
    const x = getRegularBitRotation(4); // 4
    const y = getRegularBitRotation(6); // 6
    const result = getRegularRotation(6);  // 6
    const borrow = getRegularBitRotation(1);  // Borrow = Display 1 (000)
    return [x[0], x[1], x[2], y[0], y[1], [y[2], result, borrow]];
  })(),
  DifferenceOfFourAndSeven: (() => {
    const x = getRegularBitRotation(4); // 4
    const y = getRegularBitRotation(7); // 7
    const result = getRegularRotation(5);  // 5
    const borrow = getRegularBitRotation(1);  // Borrow = Display 1 (000)
    return [x[0], x[1], x[2], y[0], y[1], [y[2], result, borrow]];
  })(),
  DifferenceOfFourAndEight: (() => {
    const x = getRegularBitRotation(4); // 4
    const y = getRegularBitRotation(8); // 8
    const result = getRegularRotation(4);  // 4
    const borrow = getRegularBitRotation(1);  // Borrow = Display 1 (000)
    return [x[0], x[1], x[2], y[0], y[1], [y[2], result, borrow]];
  })(),

  // Display 5 - N (N = 1-8)
  DifferenceOfFiveAndOne: (() => {
    const x = getRegularBitRotation(5); // 5
    const y = getRegularBitRotation(1); // 1
    const result = getRegularRotation(4);  // 4
    return [x[0], x[1], x[2], y[0], y[1], [y[2], result]];  // No borrow
  })(),
  DifferenceOfFiveAndTwo: (() => {
    const x = getRegularBitRotation(5); // 5
    const y = getRegularBitRotation(2); // 2
    const result = getRegularRotation(3);  // 3
    return [x[0], x[1], x[2], y[0], y[1], [y[2], result]];  // No borrow
  })(),
  DifferenceOfFiveAndThree: (() => {
    const x = getRegularBitRotation(5); // 5
    const y = getRegularBitRotation(3); // 3
    const result = getRegularRotation(2);  // 2
    return [x[0], x[1], x[2], y[0], y[1], [y[2], result]];  // No borrow
  })(),
  DifferenceOfFiveAndFour: (() => {
    const x = getRegularBitRotation(5); // 5
    const y = getRegularBitRotation(4); // 4
    const result = getRegularRotation(1);  // 1
    return [x[0], x[1], x[2], y[0], y[1], [y[2], result]];  // No borrow
  })(),
  DifferenceOfFiveAndFive: (() => {
    const x = getRegularBitRotation(5); // 5
    const y = getRegularBitRotation(5); // 5
    const result = getRegularRotation(8);  // 8
    const borrow = getRegularBitRotation(1);  // Borrow
    return [x[0], x[1], x[2], y[0], y[1], [y[2], result, borrow]];
  })(),
  DifferenceOfFiveAndSix: (() => {
    const x = getRegularBitRotation(5); // 5
    const y = getRegularBitRotation(6); // 6
    const result = getRegularRotation(7);  // 7
    const borrow = getRegularBitRotation(1);  // Borrow = Display 1 (000)
    return [x[0], x[1], x[2], y[0], y[1], [y[2], result, borrow]];
  })(),
  DifferenceOfFiveAndSeven: (() => {
    const x = getRegularBitRotation(5); // 5
    const y = getRegularBitRotation(7); // 7
    const result = getRegularRotation(6);  // 6
    const borrow = getRegularBitRotation(1);  // Borrow = Display 1 (000)
    return [x[0], x[1], x[2], y[0], y[1], [y[2], result, borrow]];
  })(),
  DifferenceOfFiveAndEight: (() => {
    const x = getRegularBitRotation(5); // 5
    const y = getRegularBitRotation(8); // 8
    const result = getRegularRotation(5);  // 5
    const borrow = getRegularBitRotation(1);  // Borrow = Display 1 (000)
    return [x[0], x[1], x[2], y[0], y[1], [y[2], result, borrow]];
  })(),

  // Display 6 - N (N = 1-8)
  DifferenceOfSixAndOne: (() => {
    const x = getRegularBitRotation(6); // 6
    const y = getRegularBitRotation(1); // 1
    const result = getRegularRotation(5);  // 5
    return [x[0], x[1], x[2], y[0], y[1], [y[2], result]];  // No borrow
  })(),
  DifferenceOfSixAndTwo: (() => {
    const x = getRegularBitRotation(6); // 6
    const y = getRegularBitRotation(2); // 2
    const result = getRegularRotation(4);  // 4
    return [x[0], x[1], x[2], y[0], y[1], [y[2], result]];  // No borrow
  })(),
  DifferenceOfSixAndThree: (() => {
    const x = getRegularBitRotation(6); // 6
    const y = getRegularBitRotation(3); // 3
    const result = getRegularRotation(3);  // 3
    return [x[0], x[1], x[2], y[0], y[1], [y[2], result]];  // No borrow
  })(),
  DifferenceOfSixAndFour: (() => {
    const x = getRegularBitRotation(6); // 6
    const y = getRegularBitRotation(4); // 4
    const result = getRegularRotation(2);  // 2
    return [x[0], x[1], x[2], y[0], y[1], [y[2], result]];  // No borrow
  })(),
  DifferenceOfSixAndFive: (() => {
    const x = getRegularBitRotation(6); // 6
    const y = getRegularBitRotation(5); // 5
    const result = getRegularRotation(1);  // 1
    return [x[0], x[1], x[2], y[0], y[1], [y[2], result]];  // No borrow
  })(),
  DifferenceOfSixAndSix: (() => {
    const x = getRegularBitRotation(6); // 6
    const y = getRegularBitRotation(6); // 6
    const result = getRegularRotation(8);  // 8
    const borrow = getRegularBitRotation(1);  // 8
    return [x[0], x[1], x[2], y[0], y[1], [y[2], result, borrow]];  // Borrow
  })(),
  DifferenceOfSixAndSeven: (() => {
    const x = getRegularBitRotation(6); // 6
    const y = getRegularBitRotation(7); // 7
    const result = getRegularRotation(7);  // 7
    const borrow = getRegularBitRotation(1);  // Borrow = Display 1 (000)
    return [x[0], x[1], x[2], y[0], y[1], [y[2], result, borrow]];
  })(),
  DifferenceOfSixAndEight: (() => {
    const x = getRegularBitRotation(6); // 6
    const y = getRegularBitRotation(8); // 8
    const result = getRegularRotation(6);  // 6
    const borrow = getRegularBitRotation(1);  // Borrow = Display 1 (000)
    return [x[0], x[1], x[2], y[0], y[1], [y[2], result, borrow]];
  })(),

  // Display 7 - N (N = 1-8)
  DifferenceOfSevenAndOne: (() => {
    const x = getRegularBitRotation(7); // 7
    const y = getRegularBitRotation(1); // 1
    const result = getRegularRotation(6);  // 6
    return [x[0], x[1], x[2], y[0], y[1], [y[2], result]];  // No borrow
  })(),
  DifferenceOfSevenAndTwo: (() => {
    const x = getRegularBitRotation(7); // 7
    const y = getRegularBitRotation(2); // 2
    const result = getRegularRotation(5);  // 5
    return [x[0], x[1], x[2], y[0], y[1], [y[2], result]];  // No borrow
  })(),
  DifferenceOfSevenAndThree: (() => {
    const x = getRegularBitRotation(7); // 7
    const y = getRegularBitRotation(3); // 3
    const result = getRegularRotation(4);  // 4
    return [x[0], x[1], x[2], y[0], y[1], [y[2], result]];  // No borrow
  })(),
  DifferenceOfSevenAndFour: (() => {
    const x = getRegularBitRotation(7); // 7
    const y = getRegularBitRotation(4); // 4
    const result = getRegularRotation(3);  // 3
    return [x[0], x[1], x[2], y[0], y[1], [y[2], result]];  // No borrow
  })(),
  DifferenceOfSevenAndFive: (() => {
    const x = getRegularBitRotation(7); // 7
    const y = getRegularBitRotation(5); // 5
    const result = getRegularRotation(2);  // 2
    return [x[0], x[1], x[2], y[0], y[1], [y[2], result]];  // No borrow
  })(),
  DifferenceOfSevenAndSix: (() => {
    const x = getRegularBitRotation(7); // 7
    const y = getRegularBitRotation(6); // 6
    const result = getRegularRotation(1);  // 1
    return [x[0], x[1], x[2], y[0], y[1], [y[2], result]];  // No borrow
  })(),
  DifferenceOfSevenAndSeven: (() => {
    const x = getRegularBitRotation(7); // 7
    const y = getRegularBitRotation(7); // 7
    const result = getRegularRotation(8);  // 8
    const borrow = getRegularRotation(8);
    return [x[0], x[1], x[2], y[0], y[1], [y[2], result, borrow]];  // Borrow
  })(),
  DifferenceOfSevenAndEight: (() => {
    const x = getRegularBitRotation(7); // 7
    const y = getRegularBitRotation(8); // 8
    const result = getRegularRotation(7);  // 7
    const borrow = getRegularBitRotation(1);  // Borrow = Display 1 (000)
    return [x[0], x[1], x[2], y[0], y[1], [y[2], result, borrow]];
  })(),

  // Display 8 - N (N = 1-8)
  DifferenceOfEightAndOne: (() => {
    const x = getRegularBitRotation(8); // 8
    const y = getRegularBitRotation(1); // 1
    const result = getRegularRotation(7);  // 7
    return [x[0], x[1], x[2], y[0], y[1], [y[2], result]];  // No borrow
  })(),
  DifferenceOfEightAndTwo: (() => {
    const x = getRegularBitRotation(8); // 8
    const y = getRegularBitRotation(2); // 2
    const result = getRegularRotation(6);  // 6
    return [x[0], x[1], x[2], y[0], y[1], [y[2], result]];  // No borrow
  })(),
  DifferenceOfEightAndThree: (() => {
    const x = getRegularBitRotation(8); // 8
    const y = getRegularBitRotation(3); // 3
    const result = getRegularRotation(5);  // 5
    return [x[0], x[1], x[2], y[0], y[1], [y[2], result]];  // No borrow
  })(),
  DifferenceOfEightAndFour: (() => {
    const x = getRegularBitRotation(8); // 8
    const y = getRegularBitRotation(4); // 4
    const result = getRegularRotation(4);  // 4
    return [x[0], x[1], x[2], y[0], y[1], [y[2], result]];  // No borrow
  })(),
  DifferenceOfEightAndFive: (() => {
    const x = getRegularBitRotation(8); // 8
    const y = getRegularBitRotation(5); // 5
    const result = getRegularRotation(3);  // 3
    return [x[0], x[1], x[2], y[0], y[1], [y[2], result]];  // No borrow
  })(),
  DifferenceOfEightAndSix: (() => {
    const x = getRegularBitRotation(8); // 8
    const y = getRegularBitRotation(6); // 6
    const result = getRegularRotation(3);  // 8-6=2 → Display 3 (010)
    return [x[0], x[1], x[2], y[0], y[1], [y[2], result]];  // No borrow
  })(),
  DifferenceOfEightAndSeven: (() => {
    const x = getRegularBitRotation(8); // 8
    const y = getRegularBitRotation(7); // 7
    const result = getRegularRotation(1);  // 1
    return [x[0], x[1], x[2], y[0], y[1], [y[2], result]];  // No borrow
  })(),
  DifferenceOfEightAndEight: (() => {
    const x = getRegularBitRotation(8); // 8
    const y = getRegularBitRotation(8); // 8
    const result = getRegularRotation(8);  // 8-8=0 → Display 1 (000)
    const borrow = getRegularBitRotation(1);  //
    return [x[0], x[1], x[2], y[0], y[1], [y[2], result, borrow]];  // Borrow
  })()
};
