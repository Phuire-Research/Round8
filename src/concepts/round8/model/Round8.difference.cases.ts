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

import { getRegularBitRotation } from './Round8.terminology';

type SomeSeries = Record<string, ((number)[] | number)[]>;

export const DifferenceSeries: SomeSeries = {
  // Display 1 - N (N = 1-8)
  DifferenceOfOneAndOne: (() => {
    const x = getRegularBitRotation(1);
    const y = getRegularBitRotation(1);
    const result = getRegularBitRotation(1);  // 1-1=0 → Display 1 (000)
    return [x[0], x[1], x[2], y[0], y[1], [y[2], result]];  // No borrow
  })(),
  DifferenceOfOneAndTwo: (() => {
    const x = getRegularBitRotation(1);
    const y = getRegularBitRotation(2);
    const result = getRegularBitRotation(8);  // 1-2=-1 → wraps to 8 (111)
    const borrow = getRegularBitRotation(1);  // Borrow = Display 1 (000)
    return [x[0], x[1], x[2], y[0], y[1], [y[2], result, borrow]];
  })(),
  DifferenceOfOneAndThree: (() => {
    const x = getRegularBitRotation(1);
    const y = getRegularBitRotation(3);
    const result = getRegularBitRotation(7);  // 1-3=-2 → wraps to 7 (110)
    const borrow = getRegularBitRotation(1);  // Borrow = Display 1 (000)
    return [x[0], x[1], x[2], y[0], y[1], [y[2], result, borrow]];
  })(),
  DifferenceOfOneAndFour: (() => {
    const x = getRegularBitRotation(1);
    const y = getRegularBitRotation(4);
    const result = getRegularBitRotation(6);  // 1-4=-3 → wraps to 6 (101)
    const borrow = getRegularBitRotation(1);  // Borrow = Display 1 (000)
    return [x[0], x[1], x[2], y[0], y[1], [y[2], result, borrow]];
  })(),
  DifferenceOfOneAndFive: (() => {
    const x = getRegularBitRotation(1);
    const y = getRegularBitRotation(5);
    const result = getRegularBitRotation(5);  // 1-5=-4 → wraps to 5 (100)
    const borrow = getRegularBitRotation(1);  // Borrow = Display 1 (000)
    return [x[0], x[1], x[2], y[0], y[1], [y[2], result, borrow]];
  })(),
  DifferenceOfOneAndSix: (() => {
    const x = getRegularBitRotation(1);
    const y = getRegularBitRotation(6);
    const result = getRegularBitRotation(4);  // 1-6=-5 → wraps to 4 (011)
    const borrow = getRegularBitRotation(1);  // Borrow = Display 1 (000)
    return [x[0], x[1], x[2], y[0], y[1], [y[2], result, borrow]];
  })(),
  DifferenceOfOneAndSeven: (() => {
    const x = getRegularBitRotation(1);
    const y = getRegularBitRotation(7);
    const result = getRegularBitRotation(3);  // 1-7=-6 → wraps to 3 (010)
    const borrow = getRegularBitRotation(1);  // Borrow = Display 1 (000)
    return [x[0], x[1], x[2], y[0], y[1], [y[2], result, borrow]];
  })(),
  DifferenceOfOneAndEight: (() => {
    const x = getRegularBitRotation(1);
    const y = getRegularBitRotation(8);
    const result = getRegularBitRotation(2);  // 1-8=-7 → wraps to 2 (001)
    const borrow = getRegularBitRotation(1);  // Borrow = Display 1 (000)
    return [x[0], x[1], x[2], y[0], y[1], [y[2], result, borrow]];
  })(),

  // Display 2 - N (N = 1-8)
  DifferenceOfTwoAndOne: (() => {
    const x = getRegularBitRotation(2);
    const y = getRegularBitRotation(1);
    const result = getRegularBitRotation(2);  // 2-1=1 → Display 2 (001)
    return [x[0], x[1], x[2], y[0], y[1], [y[2], result]];  // No borrow
  })(),
  DifferenceOfTwoAndTwo: (() => {
    const x = getRegularBitRotation(2);
    const y = getRegularBitRotation(2);
    const result = getRegularBitRotation(1);  // 2-2=0 → Display 1 (000)
    return [x[0], x[1], x[2], y[0], y[1], [y[2], result]];  // No borrow
  })(),
  DifferenceOfTwoAndThree: (() => {
    const x = getRegularBitRotation(2);
    const y = getRegularBitRotation(3);
    const result = getRegularBitRotation(8);  // 2-3=-1 → wraps to 8 (111)
    const borrow = getRegularBitRotation(1);  // Borrow = Display 1 (000)
    return [x[0], x[1], x[2], y[0], y[1], [y[2], result, borrow]];
  })(),
  DifferenceOfTwoAndFour: (() => {
    const x = getRegularBitRotation(2);
    const y = getRegularBitRotation(4);
    const result = getRegularBitRotation(7);  // 2-4=-2 → wraps to 7 (110)
    const borrow = getRegularBitRotation(1);  // Borrow = Display 1 (000)
    return [x[0], x[1], x[2], y[0], y[1], [y[2], result, borrow]];
  })(),
  DifferenceOfTwoAndFive: (() => {
    const x = getRegularBitRotation(2);
    const y = getRegularBitRotation(5);
    const result = getRegularBitRotation(6);  // 2-5=-3 → wraps to 6 (101)
    const borrow = getRegularBitRotation(1);  // Borrow = Display 1 (000)
    return [x[0], x[1], x[2], y[0], y[1], [y[2], result, borrow]];
  })(),
  DifferenceOfTwoAndSix: (() => {
    const x = getRegularBitRotation(2);
    const y = getRegularBitRotation(6);
    const result = getRegularBitRotation(5);  // 2-6=-4 → wraps to 5 (100)
    const borrow = getRegularBitRotation(1);  // Borrow = Display 1 (000)
    return [x[0], x[1], x[2], y[0], y[1], [y[2], result, borrow]];
  })(),
  DifferenceOfTwoAndSeven: (() => {
    const x = getRegularBitRotation(2);
    const y = getRegularBitRotation(7);
    const result = getRegularBitRotation(4);  // 2-7=-5 → wraps to 4 (011)
    const borrow = getRegularBitRotation(1);  // Borrow = Display 1 (000)
    return [x[0], x[1], x[2], y[0], y[1], [y[2], result, borrow]];
  })(),
  DifferenceOfTwoAndEight: (() => {
    const x = getRegularBitRotation(2);
    const y = getRegularBitRotation(8);
    const result = getRegularBitRotation(3);  // 2-8=-6 → wraps to 3 (010)
    const borrow = getRegularBitRotation(1);  // Borrow = Display 1 (000)
    return [x[0], x[1], x[2], y[0], y[1], [y[2], result, borrow]];
  })(),

  // Display 3 - N (N = 1-8)
  DifferenceOfThreeAndOne: (() => {
    const x = getRegularBitRotation(3);
    const y = getRegularBitRotation(1);
    const result = getRegularBitRotation(3);  // 3-1=2 → Display 3 (010)
    return [x[0], x[1], x[2], y[0], y[1], [y[2], result]];  // No borrow
  })(),
  DifferenceOfThreeAndTwo: (() => {
    const x = getRegularBitRotation(3);
    const y = getRegularBitRotation(2);
    const result = getRegularBitRotation(2);  // 3-2=1 → Display 2 (001)
    return [x[0], x[1], x[2], y[0], y[1], [y[2], result]];  // No borrow
  })(),
  DifferenceOfThreeAndThree: (() => {
    const x = getRegularBitRotation(3);
    const y = getRegularBitRotation(3);
    const result = getRegularBitRotation(1);  // 3-3=0 → Display 1 (000)
    return [x[0], x[1], x[2], y[0], y[1], [y[2], result]];  // No borrow
  })(),
  DifferenceOfThreeAndFour: (() => {
    const x = getRegularBitRotation(3);
    const y = getRegularBitRotation(4);
    const result = getRegularBitRotation(8);  // 3-4=-1 → wraps to 8 (111)
    const borrow = getRegularBitRotation(1);  // Borrow = Display 1 (000)
    return [x[0], x[1], x[2], y[0], y[1], [y[2], result, borrow]];
  })(),
  DifferenceOfThreeAndFive: (() => {
    const x = getRegularBitRotation(3);
    const y = getRegularBitRotation(5);
    const result = getRegularBitRotation(7);  // 3-5=-2 → wraps to 7 (110)
    const borrow = getRegularBitRotation(1);  // Borrow = Display 1 (000)
    return [x[0], x[1], x[2], y[0], y[1], [y[2], result, borrow]];
  })(),
  DifferenceOfThreeAndSix: (() => {
    const x = getRegularBitRotation(3);
    const y = getRegularBitRotation(6);
    const result = getRegularBitRotation(6);  // 3-6=-3 → wraps to 6 (101)
    const borrow = getRegularBitRotation(1);  // Borrow = Display 1 (000)
    return [x[0], x[1], x[2], y[0], y[1], [y[2], result, borrow]];
  })(),
  DifferenceOfThreeAndSeven: (() => {
    const x = getRegularBitRotation(3);
    const y = getRegularBitRotation(7);
    const result = getRegularBitRotation(5);  // 3-7=-4 → wraps to 5 (100)
    const borrow = getRegularBitRotation(1);  // Borrow = Display 1 (000)
    return [x[0], x[1], x[2], y[0], y[1], [y[2], result, borrow]];
  })(),
  DifferenceOfThreeAndEight: (() => {
    const x = getRegularBitRotation(3);
    const y = getRegularBitRotation(8);
    const result = getRegularBitRotation(4);  // 3-8=-5 → wraps to 4 (011)
    const borrow = getRegularBitRotation(1);  // Borrow = Display 1 (000)
    return [x[0], x[1], x[2], y[0], y[1], [y[2], result, borrow]];
  })(),

  // Display 4 - N (N = 1-8)
  DifferenceOfFourAndOne: (() => {
    const x = getRegularBitRotation(4);
    const y = getRegularBitRotation(1);
    const result = getRegularBitRotation(4);  // 4-1=3 → Display 4 (011)
    return [x[0], x[1], x[2], y[0], y[1], [y[2], result]];  // No borrow
  })(),
  DifferenceOfFourAndTwo: (() => {
    const x = getRegularBitRotation(4);
    const y = getRegularBitRotation(2);
    const result = getRegularBitRotation(3);  // 4-2=2 → Display 3 (010)
    return [x[0], x[1], x[2], y[0], y[1], [y[2], result]];  // No borrow
  })(),
  DifferenceOfFourAndThree: (() => {
    const x = getRegularBitRotation(4);
    const y = getRegularBitRotation(3);
    const result = getRegularBitRotation(2);  // 4-3=1 → Display 2 (001)
    return [x[0], x[1], x[2], y[0], y[1], [y[2], result]];  // No borrow
  })(),
  DifferenceOfFourAndFour: (() => {
    const x = getRegularBitRotation(4);
    const y = getRegularBitRotation(4);
    const result = getRegularBitRotation(1);  // 4-4=0 → Display 1 (000)
    return [x[0], x[1], x[2], y[0], y[1], [y[2], result]];  // No borrow
  })(),
  DifferenceOfFourAndFive: (() => {
    const x = getRegularBitRotation(4);
    const y = getRegularBitRotation(5);
    const result = getRegularBitRotation(8);  // 4-5=-1 → wraps to 8 (111)
    const borrow = getRegularBitRotation(1);  // Borrow = Display 1 (000)
    return [x[0], x[1], x[2], y[0], y[1], [y[2], result, borrow]];
  })(),
  DifferenceOfFourAndSix: (() => {
    const x = getRegularBitRotation(4);
    const y = getRegularBitRotation(6);
    const result = getRegularBitRotation(7);  // 4-6=-2 → wraps to 7 (110)
    const borrow = getRegularBitRotation(1);  // Borrow = Display 1 (000)
    return [x[0], x[1], x[2], y[0], y[1], [y[2], result, borrow]];
  })(),
  DifferenceOfFourAndSeven: (() => {
    const x = getRegularBitRotation(4);
    const y = getRegularBitRotation(7);
    const result = getRegularBitRotation(6);  // 4-7=-3 → wraps to 6 (101)
    const borrow = getRegularBitRotation(1);  // Borrow = Display 1 (000)
    return [x[0], x[1], x[2], y[0], y[1], [y[2], result, borrow]];
  })(),
  DifferenceOfFourAndEight: (() => {
    const x = getRegularBitRotation(4);
    const y = getRegularBitRotation(8);
    const result = getRegularBitRotation(5);  // 4-8=-4 → wraps to 5 (100)
    const borrow = getRegularBitRotation(1);  // Borrow = Display 1 (000)
    return [x[0], x[1], x[2], y[0], y[1], [y[2], result, borrow]];
  })(),

  // Display 5 - N (N = 1-8)
  DifferenceOfFiveAndOne: (() => {
    const x = getRegularBitRotation(5);
    const y = getRegularBitRotation(1);
    const result = getRegularBitRotation(5);  // 5-1=4 → Display 5 (100)
    return [x[0], x[1], x[2], y[0], y[1], [y[2], result]];  // No borrow
  })(),
  DifferenceOfFiveAndTwo: (() => {
    const x = getRegularBitRotation(5);
    const y = getRegularBitRotation(2);
    const result = getRegularBitRotation(4);  // 5-2=3 → Display 4 (011)
    return [x[0], x[1], x[2], y[0], y[1], [y[2], result]];  // No borrow
  })(),
  DifferenceOfFiveAndThree: (() => {
    const x = getRegularBitRotation(5);
    const y = getRegularBitRotation(3);
    const result = getRegularBitRotation(3);  // 5-3=2 → Display 3 (010)
    return [x[0], x[1], x[2], y[0], y[1], [y[2], result]];  // No borrow
  })(),
  DifferenceOfFiveAndFour: (() => {
    const x = getRegularBitRotation(5);
    const y = getRegularBitRotation(4);
    const result = getRegularBitRotation(2);  // 5-4=1 → Display 2 (001)
    return [x[0], x[1], x[2], y[0], y[1], [y[2], result]];  // No borrow
  })(),
  DifferenceOfFiveAndFive: (() => {
    const x = getRegularBitRotation(5);
    const y = getRegularBitRotation(5);
    const result = getRegularBitRotation(1);  // 5-5=0 → Display 1 (000)
    return [x[0], x[1], x[2], y[0], y[1], [y[2], result]];  // No borrow
  })(),
  DifferenceOfFiveAndSix: (() => {
    const x = getRegularBitRotation(5);
    const y = getRegularBitRotation(6);
    const result = getRegularBitRotation(8);  // 5-6=-1 → wraps to 8 (111)
    const borrow = getRegularBitRotation(1);  // Borrow = Display 1 (000)
    return [x[0], x[1], x[2], y[0], y[1], [y[2], result, borrow]];
  })(),
  DifferenceOfFiveAndSeven: (() => {
    const x = getRegularBitRotation(5);
    const y = getRegularBitRotation(7);
    const result = getRegularBitRotation(7);  // 5-7=-2 → wraps to 7 (110)
    const borrow = getRegularBitRotation(1);  // Borrow = Display 1 (000)
    return [x[0], x[1], x[2], y[0], y[1], [y[2], result, borrow]];
  })(),
  DifferenceOfFiveAndEight: (() => {
    const x = getRegularBitRotation(5);
    const y = getRegularBitRotation(8);
    const result = getRegularBitRotation(6);  // 5-8=-3 → wraps to 6 (101)
    const borrow = getRegularBitRotation(1);  // Borrow = Display 1 (000)
    return [x[0], x[1], x[2], y[0], y[1], [y[2], result, borrow]];
  })(),

  // Display 6 - N (N = 1-8)
  DifferenceOfSixAndOne: (() => {
    const x = getRegularBitRotation(6);
    const y = getRegularBitRotation(1);
    const result = getRegularBitRotation(6);  // 6-1=5 → Display 6 (101)
    return [x[0], x[1], x[2], y[0], y[1], [y[2], result]];  // No borrow
  })(),
  DifferenceOfSixAndTwo: (() => {
    const x = getRegularBitRotation(6);
    const y = getRegularBitRotation(2);
    const result = getRegularBitRotation(5);  // 6-2=4 → Display 5 (100)
    return [x[0], x[1], x[2], y[0], y[1], [y[2], result]];  // No borrow
  })(),
  DifferenceOfSixAndThree: (() => {
    const x = getRegularBitRotation(6);
    const y = getRegularBitRotation(3);
    const result = getRegularBitRotation(4);  // 6-3=3 → Display 4 (011)
    return [x[0], x[1], x[2], y[0], y[1], [y[2], result]];  // No borrow
  })(),
  DifferenceOfSixAndFour: (() => {
    const x = getRegularBitRotation(6);
    const y = getRegularBitRotation(4);
    const result = getRegularBitRotation(3);  // 6-4=2 → Display 3 (010)
    return [x[0], x[1], x[2], y[0], y[1], [y[2], result]];  // No borrow
  })(),
  DifferenceOfSixAndFive: (() => {
    const x = getRegularBitRotation(6);
    const y = getRegularBitRotation(5);
    const result = getRegularBitRotation(2);  // 6-5=1 → Display 2 (001)
    return [x[0], x[1], x[2], y[0], y[1], [y[2], result]];  // No borrow
  })(),
  DifferenceOfSixAndSix: (() => {
    const x = getRegularBitRotation(6);
    const y = getRegularBitRotation(6);
    const result = getRegularBitRotation(1);  // 6-6=0 → Display 1 (000)
    return [x[0], x[1], x[2], y[0], y[1], [y[2], result]];  // No borrow
  })(),
  DifferenceOfSixAndSeven: (() => {
    const x = getRegularBitRotation(6);
    const y = getRegularBitRotation(7);
    const result = getRegularBitRotation(8);  // 6-7=-1 → wraps to 8 (111)
    const borrow = getRegularBitRotation(1);  // Borrow = Display 1 (000)
    return [x[0], x[1], x[2], y[0], y[1], [y[2], result, borrow]];
  })(),
  DifferenceOfSixAndEight: (() => {
    const x = getRegularBitRotation(6);
    const y = getRegularBitRotation(8);
    const result = getRegularBitRotation(7);  // 6-8=-2 → wraps to 7 (110)
    const borrow = getRegularBitRotation(1);  // Borrow = Display 1 (000)
    return [x[0], x[1], x[2], y[0], y[1], [y[2], result, borrow]];
  })(),

  // Display 7 - N (N = 1-8)
  DifferenceOfSevenAndOne: (() => {
    const x = getRegularBitRotation(7);
    const y = getRegularBitRotation(1);
    const result = getRegularBitRotation(7);  // 7-1=6 → Display 7 (110)
    return [x[0], x[1], x[2], y[0], y[1], [y[2], result]];  // No borrow
  })(),
  DifferenceOfSevenAndTwo: (() => {
    const x = getRegularBitRotation(7);
    const y = getRegularBitRotation(2);
    const result = getRegularBitRotation(6);  // 7-2=5 → Display 6 (101)
    return [x[0], x[1], x[2], y[0], y[1], [y[2], result]];  // No borrow
  })(),
  DifferenceOfSevenAndThree: (() => {
    const x = getRegularBitRotation(7);
    const y = getRegularBitRotation(3);
    const result = getRegularBitRotation(5);  // 7-3=4 → Display 5 (100)
    return [x[0], x[1], x[2], y[0], y[1], [y[2], result]];  // No borrow
  })(),
  DifferenceOfSevenAndFour: (() => {
    const x = getRegularBitRotation(7);
    const y = getRegularBitRotation(4);
    const result = getRegularBitRotation(4);  // 7-4=3 → Display 4 (011)
    return [x[0], x[1], x[2], y[0], y[1], [y[2], result]];  // No borrow
  })(),
  DifferenceOfSevenAndFive: (() => {
    const x = getRegularBitRotation(7);
    const y = getRegularBitRotation(5);
    const result = getRegularBitRotation(3);  // 7-5=2 → Display 3 (010)
    return [x[0], x[1], x[2], y[0], y[1], [y[2], result]];  // No borrow
  })(),
  DifferenceOfSevenAndSix: (() => {
    const x = getRegularBitRotation(7);
    const y = getRegularBitRotation(6);
    const result = getRegularBitRotation(2);  // 7-6=1 → Display 2 (001)
    return [x[0], x[1], x[2], y[0], y[1], [y[2], result]];  // No borrow
  })(),
  DifferenceOfSevenAndSeven: (() => {
    const x = getRegularBitRotation(7);
    const y = getRegularBitRotation(7);
    const result = getRegularBitRotation(1);  // 7-7=0 → Display 1 (000)
    return [x[0], x[1], x[2], y[0], y[1], [y[2], result]];  // No borrow
  })(),
  DifferenceOfSevenAndEight: (() => {
    const x = getRegularBitRotation(7);
    const y = getRegularBitRotation(8);
    const result = getRegularBitRotation(8);  // 7-8=-1 → wraps to 8 (111)
    const borrow = getRegularBitRotation(1);  // Borrow = Display 1 (000)
    return [x[0], x[1], x[2], y[0], y[1], [y[2], result, borrow]];
  })(),

  // Display 8 - N (N = 1-8)
  DifferenceOfEightAndOne: (() => {
    const x = getRegularBitRotation(8);
    const y = getRegularBitRotation(1);
    const result = getRegularBitRotation(8);  // 8-1=7 → Display 8 (111)
    return [x[0], x[1], x[2], y[0], y[1], [y[2], result]];  // No borrow
  })(),
  DifferenceOfEightAndTwo: (() => {
    const x = getRegularBitRotation(8);
    const y = getRegularBitRotation(2);
    const result = getRegularBitRotation(7);  // 8-2=6 → Display 7 (110)
    return [x[0], x[1], x[2], y[0], y[1], [y[2], result]];  // No borrow
  })(),
  DifferenceOfEightAndThree: (() => {
    const x = getRegularBitRotation(8);
    const y = getRegularBitRotation(3);
    const result = getRegularBitRotation(6);  // 8-3=5 → Display 6 (101)
    return [x[0], x[1], x[2], y[0], y[1], [y[2], result]];  // No borrow
  })(),
  DifferenceOfEightAndFour: (() => {
    const x = getRegularBitRotation(8);
    const y = getRegularBitRotation(4);
    const result = getRegularBitRotation(5);  // 8-4=4 → Display 5 (100)
    return [x[0], x[1], x[2], y[0], y[1], [y[2], result]];  // No borrow
  })(),
  DifferenceOfEightAndFive: (() => {
    const x = getRegularBitRotation(8);
    const y = getRegularBitRotation(5);
    const result = getRegularBitRotation(4);  // 8-5=3 → Display 4 (011)
    return [x[0], x[1], x[2], y[0], y[1], [y[2], result]];  // No borrow
  })(),
  DifferenceOfEightAndSix: (() => {
    const x = getRegularBitRotation(8);
    const y = getRegularBitRotation(6);
    const result = getRegularBitRotation(3);  // 8-6=2 → Display 3 (010)
    return [x[0], x[1], x[2], y[0], y[1], [y[2], result]];  // No borrow
  })(),
  DifferenceOfEightAndSeven: (() => {
    const x = getRegularBitRotation(8);
    const y = getRegularBitRotation(7);
    const result = getRegularBitRotation(2);  // 8-7=1 → Display 2 (001)
    return [x[0], x[1], x[2], y[0], y[1], [y[2], result]];  // No borrow
  })(),
  DifferenceOfEightAndEight: (() => {
    const x = getRegularBitRotation(8);
    const y = getRegularBitRotation(8);
    const result = getRegularBitRotation(1);  // 8-8=0 → Display 1 (000)
    return [x[0], x[1], x[2], y[0], y[1], [y[2], result]];  // No borrow
  })()
};
