/**
 * GENERATED - Complete Sum Series - All 64 Addition Cases (8x8)
 *
 * Pattern: SumOfXAndY represents X + Y
 * Array structure: [bit2_X, bit1_X, bit0_X, bit2_Y, bit1_Y, [bit0_Y, result, carry?]]
 *
 * Ground truth from Two-Columns-Varified.md:
 * 1+1=2, 1+2=3, ..., 1+8=11 (9 in decimal)
 * 2+1=3, 2+2=4, ..., 2+8=12 (10 in decimal)
 * ...
 * 8+8=18 (16 in decimal)
 */

import { SomeSeries, getRegularBitRotation, getRegularRotation } from '../terminology';

export const SumSeries: SomeSeries = {
  // 1 + N (N = 1-8)
  SumOfOneAndOne: (() => {
    const x = getRegularBitRotation(1); // 1
    const y = getRegularBitRotation(1); //
    return [x[0], x[1], x[2], y[0], y[1], [y[2], getRegularRotation(2)]]; // 2
  })(),
  SumOfOneAndTwo: (() => {
    const x = getRegularBitRotation(1); // 1
    const y = getRegularBitRotation(2); // 2
    return [x[0], x[1], x[2], y[0], y[1], [y[2], getRegularRotation(3)]]; // 3
  })(),
  SumOfOneAndThree: (() => {
    const x = getRegularBitRotation(1); // 1
    const y = getRegularBitRotation(3); // 4
    return [x[0], x[1], x[2], y[0], y[1], [y[2], getRegularRotation(4)]]; // 4
  })(),
  SumOfOneAndFour: (() => {
    const x = getRegularBitRotation(1); // 1
    const y = getRegularBitRotation(4); // 4
    return [x[0], x[1], x[2], y[0], y[1], [y[2], getRegularRotation(5)]]; // 5
  })(),
  SumOfOneAndFive: (() => {
    const x = getRegularBitRotation(1); // 1
    const y = getRegularBitRotation(5); // 5
    return [x[0], x[1], x[2], y[0], y[1], [y[2], getRegularRotation(6)]]; // 6
  })(),
  SumOfOneAndSix: (() => {
    const x = getRegularBitRotation(1); // 1
    const y = getRegularBitRotation(6); // 7
    return [x[0], x[1], x[2], y[0], y[1], [y[2], getRegularRotation(7)]]; // 7
  })(),
  SumOfOneAndSeven: (() => {
    const x = getRegularBitRotation(1); // 1
    const y = getRegularBitRotation(7); // 7
    return [x[0], x[1], x[2], y[0], y[1], [y[2], getRegularRotation(8)]]; // 8
  })(),
  SumOfOneAndEight: (() => {
    const x = getRegularBitRotation(1); // 1
    const y = getRegularBitRotation(8); // 8
    return [x[0], x[1], x[2], y[0], y[1], [y[2], getRegularRotation(1), getRegularRotation(1)]]; // 1 and Carry
  })(),

  // 2 + N (N = 1-8)
  SumOfTwoAndOne: (() => {
    const x = getRegularBitRotation(2); // 2
    const y = getRegularBitRotation(1); // 1
    return [x[0], x[1], x[2], y[0], y[1], [y[2], getRegularRotation(3)]];
  })(),
  SumOfTwoAndTwo: (() => {
    const x = getRegularBitRotation(2); // 2
    const y = getRegularBitRotation(2); // 2
    return [x[0], x[1], x[2], y[0], y[1], [y[2], getRegularRotation(4)]]; // 4
  })(),
  SumOfTwoAndThree: (() => {
    const x = getRegularBitRotation(2); // 2
    const y = getRegularBitRotation(3); // 3
    return [x[0], x[1], x[2], y[0], y[1], [y[2], getRegularRotation(5)]]; // 5
  })(),
  SumOfTwoAndFour: (() => {
    const x = getRegularBitRotation(2); // 2
    const y = getRegularBitRotation(4); // 4
    return [x[0], x[1], x[2], y[0], y[1], [y[2], getRegularRotation(6)]]; // 6
  })(),
  SumOfTwoAndFive: (() => {
    const x = getRegularBitRotation(2); // 2
    const y = getRegularBitRotation(5); // 5
    return [x[0], x[1], x[2], y[0], y[1], [y[2], getRegularRotation(7)]]; // 7
  })(),
  SumOfTwoAndSix: (() => {
    const x = getRegularBitRotation(2); // 2
    const y = getRegularBitRotation(6); // 6
    return [x[0], x[1], x[2], y[0], y[1], [y[2], getRegularRotation(8)]]; // 8
  })(),
  SumOfTwoAndSeven: (() => {
    const x = getRegularBitRotation(2); // 2
    const y = getRegularBitRotation(7); // 7
    return [x[0], x[1], x[2], y[0], y[1], [y[2], getRegularRotation(1), getRegularRotation(1)]]; // 1 and Carry
  })(),
  SumOfTwoAndEight: (() => {
    const x = getRegularBitRotation(2); // 2
    const y = getRegularBitRotation(8); // 8
    return [x[0], x[1], x[2], y[0], y[1], [y[2], getRegularRotation(2), getRegularRotation(1)]]; // 2 and Carry
  })(),

  // 3 + N (N = 1-8)
  SumOfThreeAndOne: (() => {
    const x = getRegularBitRotation(3); // 3
    const y = getRegularBitRotation(1); // 1
    return [x[0], x[1], x[2], y[0], y[1], [y[2], getRegularRotation(4)]]; // 4
  })(),
  SumOfThreeAndTwo: (() => {
    const x = getRegularBitRotation(3); // 3
    const y = getRegularBitRotation(2); // 2
    return [x[0], x[1], x[2], y[0], y[1], [y[2], getRegularRotation(5)]]; // 5
  })(),
  SumOfThreeAndThree: (() => {
    const x = getRegularBitRotation(3); // 3
    const y = getRegularBitRotation(3); // 3
    return [x[0], x[1], x[2], y[0], y[1], [y[2], getRegularRotation(6)]]; // 6
  })(),
  SumOfThreeAndFour: (() => {
    const x = getRegularBitRotation(3); // 3
    const y = getRegularBitRotation(4); // 4
    return [x[0], x[1], x[2], y[0], y[1], [y[2], getRegularRotation(7)]]; // 7
  })(),
  SumOfThreeAndFive: (() => {
    const x = getRegularBitRotation(3); // 3
    const y = getRegularBitRotation(5); // 5
    return [x[0], x[1], x[2], y[0], y[1], [y[2], getRegularRotation(8)]]; // 8
  })(),
  SumOfThreeAndSix: (() => {
    const x = getRegularBitRotation(3); // 3
    const y = getRegularBitRotation(6); // 6
    return [x[0], x[1], x[2], y[0], y[1], [y[2], getRegularRotation(1), getRegularRotation(1)]]; // 1 and Carry
  })(),
  SumOfThreeAndSeven: (() => {
    const x = getRegularBitRotation(3); // 3
    const y = getRegularBitRotation(7); // 7
    return [x[0], x[1], x[2], y[0], y[1], [y[2], getRegularRotation(2), getRegularRotation(1)]]; // 2 and 1
  })(),
  SumOfThreeAndEight: (() => {
    const x = getRegularBitRotation(3); // 3
    const y = getRegularBitRotation(8); // 8
    return [x[0], x[1], x[2], y[0], y[1], [y[2], getRegularRotation(3), getRegularRotation(1)]]; // 3 and 1
  })(),

  // 4 + N (N = 1-8)
  SumOfFourAndOne: (() => {
    const x = getRegularBitRotation(4); // 4
    const y = getRegularBitRotation(1); // 1
    return [x[0], x[1], x[2], y[0], y[1], [y[2], getRegularRotation(5)]]; // 5
  })(),
  SumOfFourAndTwo: (() => {
    const x = getRegularBitRotation(4); // 4
    const y = getRegularBitRotation(2); // 2
    return [x[0], x[1], x[2], y[0], y[1], [y[2], getRegularRotation(6)]]; // 6
  })(),
  SumOfFourAndThree: (() => {
    const x = getRegularBitRotation(4); // 4
    const y = getRegularBitRotation(3); // 3
    return [x[0], x[1], x[2], y[0], y[1], [y[2], getRegularRotation(7)]]; // 7
  })(),
  SumOfFourAndFour: (() => {
    const x = getRegularBitRotation(4); // 4
    const y = getRegularBitRotation(4); // 4
    return [x[0], x[1], x[2], y[0], y[1], [y[2], getRegularRotation(8)]]; // 8
  })(),
  SumOfFourAndFive: (() => {
    const x = getRegularBitRotation(4); // 4
    const y = getRegularBitRotation(5); // 5
    return [x[0], x[1], x[2], y[0], y[1], [y[2], getRegularRotation(1), getRegularRotation(1)]]; // 1 and Carry
  })(),
  SumOfFourAndSix: (() => {
    const x = getRegularBitRotation(4); // 4
    const y = getRegularBitRotation(6); // 6
    return [x[0], x[1], x[2], y[0], y[1], [y[2], getRegularRotation(2), getRegularRotation(1)]]; // 2 and Carry
  })(),
  SumOfFourAndSeven: (() => {
    const x = getRegularBitRotation(4); // 4
    const y = getRegularBitRotation(7); // 7
    return [x[0], x[1], x[2], y[0], y[1], [y[2], getRegularRotation(3), getRegularRotation(1)]]; // 3 and Carry
  })(),
  SumOfFourAndEight: (() => {
    const x = getRegularBitRotation(4); // 4
    const y = getRegularBitRotation(8); // 8
    return [x[0], x[1], x[2], y[0], y[1], [y[2], getRegularRotation(4), getRegularRotation(1)]]; // 4 and Carry
  })(),

  // 5 + N (N = 1-8)
  SumOfFiveAndOne: (() => {
    const x = getRegularBitRotation(5); // 5
    const y = getRegularBitRotation(1); // 1
    return [x[0], x[1], x[2], y[0], y[1], [y[2], getRegularRotation(6)]]; // 6
  })(),
  SumOfFiveAndTwo: (() => {
    const x = getRegularBitRotation(5); // 5
    const y = getRegularBitRotation(2); // 2
    return [x[0], x[1], x[2], y[0], y[1], [y[2], getRegularRotation(7)]]; // 7
  })(),
  SumOfFiveAndThree: (() => {
    const x = getRegularBitRotation(5); // 5
    const y = getRegularBitRotation(3); // 3
    return [x[0], x[1], x[2], y[0], y[1], [y[2], getRegularRotation(8)]]; // 8
  })(),
  SumOfFiveAndFour: (() => {
    const x = getRegularBitRotation(5); // 5
    const y = getRegularBitRotation(4); // 4
    return [x[0], x[1], x[2], y[0], y[1], [y[2], getRegularRotation(1), getRegularRotation(1)]]; // 1 and Carry
  })(),
  SumOfFiveAndFive: (() => {
    const x = getRegularBitRotation(5); // 5
    const y = getRegularBitRotation(5); // 5
    return [x[0], x[1], x[2], y[0], y[1], [y[2], getRegularRotation(2), getRegularRotation(1)]]; // 2 and Carry
  })(),
  SumOfFiveAndSix: (() => {
    const x = getRegularBitRotation(5); // 5
    const y = getRegularBitRotation(6); // 6
    return [x[0], x[1], x[2], y[0], y[1], [y[2], getRegularRotation(3), getRegularRotation(1)]]; // 3 and 1
  })(),
  SumOfFiveAndSeven: (() => {
    const x = getRegularBitRotation(5); // 5
    const y = getRegularBitRotation(7); // 7
    return [x[0], x[1], x[2], y[0], y[1], [y[2], getRegularRotation(4), getRegularRotation(1)]]; // 4 and Carry
  })(),
  SumOfFiveAndEight: (() => {
    const x = getRegularBitRotation(5); // 5
    const y = getRegularBitRotation(8); // 8
    return [x[0], x[1], x[2], y[0], y[1], [y[2], getRegularRotation(5), getRegularRotation(1)]]; // 5 and Carry
  })(),

  // 6 + N (N = 1-8)
  SumOfSixAndOne: (() => {
    const x = getRegularBitRotation(6); // 6
    const y = getRegularBitRotation(1); // 1
    return [x[0], x[1], x[2], y[0], y[1], [y[2], getRegularRotation(7)]]; // 7
  })(),
  SumOfSixAndTwo: (() => {
    const x = getRegularBitRotation(6); // 6
    const y = getRegularBitRotation(2); // 2
    return [x[0], x[1], x[2], y[0], y[1], [y[2], getRegularRotation(8)]]; // 8
  })(),
  SumOfSixAndThree: (() => {
    const x = getRegularBitRotation(6); // 6
    const y = getRegularBitRotation(3); // 3
    return [x[0], x[1], x[2], y[0], y[1], [y[2], getRegularRotation(1), getRegularRotation(1)]]; // 1 and Carry
  })(),
  SumOfSixAndFour: (() => {
    const x = getRegularBitRotation(6); // 6
    const y = getRegularBitRotation(4); // 4
    return [x[0], x[1], x[2], y[0], y[1], [y[2], getRegularRotation(2), getRegularRotation(1)]]; // 2 and Carry
  })(),
  SumOfSixAndFive: (() => {
    const x = getRegularBitRotation(6); // 6
    const y = getRegularBitRotation(5); // 5
    return [x[0], x[1], x[2], y[0], y[1], [y[2], getRegularRotation(3), getRegularRotation(1)]]; // 3 and Carry
  })(),
  SumOfSixAndSix: (() => {
    const x = getRegularBitRotation(6); // 6
    const y = getRegularBitRotation(6); // 6
    return [x[0], x[1], x[2], y[0], y[1], [y[2], getRegularRotation(4), getRegularRotation(1)]]; // 4 and Carry
  })(),
  SumOfSixAndSeven: (() => {
    const x = getRegularBitRotation(6); // 6
    const y = getRegularBitRotation(7); // 7
    return [x[0], x[1], x[2], y[0], y[1], [y[2], getRegularRotation(5), getRegularRotation(1)]]; // 5 and Carry
  })(),
  SumOfSixAndEight: (() => {
    const x = getRegularBitRotation(6); // 6
    const y = getRegularBitRotation(8); // 8
    return [x[0], x[1], x[2], y[0], y[1], [y[2], getRegularRotation(6), getRegularRotation(1)]]; // 6 and Carry
  })(),

  // 7 + N (N = 1-8)
  SumOfSevenAndOne: (() => {
    const x = getRegularBitRotation(7); // 7
    const y = getRegularBitRotation(1); // 1
    return [x[0], x[1], x[2], y[0], y[1], [y[2], getRegularRotation(8)]]; // 8
  })(),
  SumOfSevenAndTwo: (() => {
    const x = getRegularBitRotation(7); // 7
    const y = getRegularBitRotation(2); // 2
    return [x[0], x[1], x[2], y[0], y[1], [y[2], getRegularRotation(1), getRegularRotation(1)]]; // 1 and Carry
  })(),
  SumOfSevenAndThree: (() => {
    const x = getRegularBitRotation(7); // 7
    const y = getRegularBitRotation(3); // 3
    return [x[0], x[1], x[2], y[0], y[1], [y[2], getRegularRotation(2), getRegularRotation(1)]]; // 2 and Carry
  })(),
  SumOfSevenAndFour: (() => {
    const x = getRegularBitRotation(7); // 7
    const y = getRegularBitRotation(4); // 4
    return [x[0], x[1], x[2], y[0], y[1], [y[2], getRegularRotation(3), getRegularRotation(1)]]; // 3 and Carry
  })(),
  SumOfSevenAndFive: (() => {
    const x = getRegularBitRotation(7); // 7
    const y = getRegularBitRotation(5); // 5
    return [x[0], x[1], x[2], y[0], y[1], [y[2], getRegularRotation(4), getRegularRotation(1)]]; // 4 and Carry
  })(),
  SumOfSevenAndSix: (() => {
    const x = getRegularBitRotation(7); // 7
    const y = getRegularBitRotation(6); // 6
    return [x[0], x[1], x[2], y[0], y[1], [y[2], getRegularRotation(5), getRegularRotation(1)]]; // 5 and Carry
  })(),
  SumOfSevenAndSeven: (() => {
    const x = getRegularBitRotation(7); // 7
    const y = getRegularBitRotation(7); // 7
    return [x[0], x[1], x[2], y[0], y[1], [y[2], getRegularRotation(6), getRegularRotation(1)]]; // 6 and Carry
  })(),
  SumOfSevenAndEight: (() => {
    const x = getRegularBitRotation(7); // 7
    const y = getRegularBitRotation(8); // 8
    return [x[0], x[1], x[2], y[0], y[1], [y[2], getRegularRotation(7), getRegularRotation(1)]]; // 7 and Carry
  })(),

  // 8 + N (N = 1-8)
  SumOfEightAndOne: (() => {
    const x = getRegularBitRotation(8); // 8
    const y = getRegularBitRotation(1); // 1
    return [x[0], x[1], x[2], y[0], y[1], [y[2], getRegularRotation(1), getRegularRotation(1)]]; // 1 and Carry
  })(),
  SumOfEightAndTwo: (() => {
    const x = getRegularBitRotation(8); // 8
    const y = getRegularBitRotation(2); // 2
    return [x[0], x[1], x[2], y[0], y[1], [y[2], getRegularRotation(2), getRegularRotation(1)]]; // 2 and Carry
  })(),
  SumOfEightAndThree: (() => {
    const x = getRegularBitRotation(8); // 8
    const y = getRegularBitRotation(3); // 3
    return [x[0], x[1], x[2], y[0], y[1], [y[2], getRegularRotation(3), getRegularRotation(1)]]; // 3 and Carry
  })(),
  SumOfEightAndFour: (() => {
    const x = getRegularBitRotation(8); // 8
    const y = getRegularBitRotation(4); // 4
    return [x[0], x[1], x[2], y[0], y[1], [y[2], getRegularRotation(4), getRegularRotation(1)]]; // 4 and Carry
  })(),
  SumOfEightAndFive: (() => {
    const x = getRegularBitRotation(8); // 8
    const y = getRegularBitRotation(5); // 5
    return [x[0], x[1], x[2], y[0], y[1], [y[2], getRegularRotation(5), getRegularRotation(1)]]; // 5 and Carry
  })(),
  SumOfEightAndSix: (() => {
    const x = getRegularBitRotation(8); // 8
    const y = getRegularBitRotation(6); // 6
    return [x[0], x[1], x[2], y[0], y[1], [y[2], getRegularRotation(6), getRegularRotation(1)]]; // 6 and Carry
  })(),
  SumOfEightAndSeven: (() => {
    const x = getRegularBitRotation(8); // 8
    const y = getRegularBitRotation(7); // 7
    return [x[0], x[1], x[2], y[0], y[1], [y[2], getRegularRotation(7), getRegularRotation(1)]]; // 7 and Carry
  })(),
  SumOfEightAndEight: (() => {
    const x = getRegularBitRotation(8); // 8
    const y = getRegularBitRotation(8); // 8
    return [x[0], x[1], x[2], y[0], y[1], [y[2], getRegularRotation(8), getRegularRotation(1)]]; // 8 and Carry
  })(),
};
