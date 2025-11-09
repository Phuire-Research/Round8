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

import { SomeSeries, getRegularBitRotation, getRegularRotation } from './Round8.terminology';

export const SumSeries: SomeSeries = {
  // 1 + N (N = 1-8)
  SumOfOneAndOne: (() => {
    const x = getRegularBitRotation(1);
    const y = getRegularBitRotation(1);
    return [x[0], x[1], x[2], y[0], y[1], [y[2], getRegularRotation(2)]];
  })(),
  SumOfOneAndTwo: (() => {
    const x = getRegularBitRotation(1);
    const y = getRegularBitRotation(2);
    return [x[0], x[1], x[2], y[0], y[1], [y[2], getRegularRotation(3)]];
  })(),
  SumOfOneAndThree: (() => {
    const x = getRegularBitRotation(1);
    const y = getRegularBitRotation(3);
    return [x[0], x[1], x[2], y[0], y[1], [y[2], getRegularRotation(4)]];
  })(),
  SumOfOneAndFour: (() => {
    const x = getRegularBitRotation(1);
    const y = getRegularBitRotation(4);
    return [x[0], x[1], x[2], y[0], y[1], [y[2], getRegularRotation(5)]];
  })(),
  SumOfOneAndFive: (() => {
    const x = getRegularBitRotation(1);
    const y = getRegularBitRotation(5);
    return [x[0], x[1], x[2], y[0], y[1], [y[2], getRegularRotation(6)]];
  })(),
  SumOfOneAndSix: (() => {
    const x = getRegularBitRotation(1);
    const y = getRegularBitRotation(6);
    return [x[0], x[1], x[2], y[0], y[1], [y[2], getRegularRotation(7)]];
  })(),
  SumOfOneAndSeven: (() => {
    const x = getRegularBitRotation(1);
    const y = getRegularBitRotation(7);
    return [x[0], x[1], x[2], y[0], y[1], [y[2], getRegularRotation(8)]];
  })(),
  SumOfOneAndEight: (() => {
    const x = getRegularBitRotation(1);
    const y = getRegularBitRotation(8);
    return [x[0], x[1], x[2], y[0], y[1], [y[2], getRegularRotation(1), getRegularRotation(1)]];
  })(),

  // 2 + N (N = 1-8)
  SumOfTwoAndOne: (() => {
    const x = getRegularBitRotation(2);
    const y = getRegularBitRotation(1);
    return [x[0], x[1], x[2], y[0], y[1], [y[2], getRegularRotation(3)]];
  })(),
  SumOfTwoAndTwo: (() => {
    const x = getRegularBitRotation(2);
    const y = getRegularBitRotation(2);
    return [x[0], x[1], x[2], y[0], y[1], [y[2], getRegularRotation(4)]];
  })(),
  SumOfTwoAndThree: (() => {
    const x = getRegularBitRotation(2);
    const y = getRegularBitRotation(3);
    return [x[0], x[1], x[2], y[0], y[1], [y[2], getRegularRotation(5)]];
  })(),
  SumOfTwoAndFour: (() => {
    const x = getRegularBitRotation(2);
    const y = getRegularBitRotation(4);
    return [x[0], x[1], x[2], y[0], y[1], [y[2], getRegularRotation(6)]];
  })(),
  SumOfTwoAndFive: (() => {
    const x = getRegularBitRotation(2);
    const y = getRegularBitRotation(5);
    return [x[0], x[1], x[2], y[0], y[1], [y[2], getRegularRotation(7)]];
  })(),
  SumOfTwoAndSix: (() => {
    const x = getRegularBitRotation(2);
    const y = getRegularBitRotation(6);
    return [x[0], x[1], x[2], y[0], y[1], [y[2], getRegularRotation(8)]];
  })(),
  SumOfTwoAndSeven: (() => {
    const x = getRegularBitRotation(2);
    const y = getRegularBitRotation(7);
    return [x[0], x[1], x[2], y[0], y[1], [y[2], getRegularRotation(1), getRegularRotation(1)]];
  })(),
  SumOfTwoAndEight: (() => {
    const x = getRegularBitRotation(2);
    const y = getRegularBitRotation(8);
    return [x[0], x[1], x[2], y[0], y[1], [y[2], getRegularRotation(2), getRegularRotation(1)]];
  })(),

  // 3 + N (N = 1-8)
  SumOfThreeAndOne: (() => {
    const x = getRegularBitRotation(3);
    const y = getRegularBitRotation(1);
    return [x[0], x[1], x[2], y[0], y[1], [y[2], getRegularRotation(4)]];
  })(),
  SumOfThreeAndTwo: (() => {
    const x = getRegularBitRotation(3);
    const y = getRegularBitRotation(2);
    return [x[0], x[1], x[2], y[0], y[1], [y[2], getRegularRotation(5)]];
  })(),
  SumOfThreeAndThree: (() => {
    const x = getRegularBitRotation(3);
    const y = getRegularBitRotation(3);
    return [x[0], x[1], x[2], y[0], y[1], [y[2], getRegularRotation(6)]];
  })(),
  SumOfThreeAndFour: (() => {
    const x = getRegularBitRotation(3);
    const y = getRegularBitRotation(4);
    return [x[0], x[1], x[2], y[0], y[1], [y[2], getRegularRotation(7)]];
  })(),
  SumOfThreeAndFive: (() => {
    const x = getRegularBitRotation(3);
    const y = getRegularBitRotation(5);
    return [x[0], x[1], x[2], y[0], y[1], [y[2], getRegularRotation(8)]];
  })(),
  SumOfThreeAndSix: (() => {
    const x = getRegularBitRotation(3);
    const y = getRegularBitRotation(6);
    return [x[0], x[1], x[2], y[0], y[1], [y[2], getRegularRotation(1), getRegularRotation(1)]];
  })(),
  SumOfThreeAndSeven: (() => {
    const x = getRegularBitRotation(3);
    const y = getRegularBitRotation(7);
    return [x[0], x[1], x[2], y[0], y[1], [y[2], getRegularRotation(2), getRegularRotation(1)]];
  })(),
  SumOfThreeAndEight: (() => {
    const x = getRegularBitRotation(3);
    const y = getRegularBitRotation(8);
    return [x[0], x[1], x[2], y[0], y[1], [y[2], getRegularRotation(3), getRegularRotation(1)]];
  })(),

  // 4 + N (N = 1-8)
  SumOfFourAndOne: (() => {
    const x = getRegularBitRotation(4);
    const y = getRegularBitRotation(1);
    return [x[0], x[1], x[2], y[0], y[1], [y[2], getRegularRotation(5)]];
  })(),
  SumOfFourAndTwo: (() => {
    const x = getRegularBitRotation(4);
    const y = getRegularBitRotation(2);
    return [x[0], x[1], x[2], y[0], y[1], [y[2], getRegularRotation(6)]];
  })(),
  SumOfFourAndThree: (() => {
    const x = getRegularBitRotation(4);
    const y = getRegularBitRotation(3);
    return [x[0], x[1], x[2], y[0], y[1], [y[2], getRegularRotation(7)]];
  })(),
  SumOfFourAndFour: (() => {
    const x = getRegularBitRotation(4);
    const y = getRegularBitRotation(4);
    return [x[0], x[1], x[2], y[0], y[1], [y[2], getRegularRotation(8)]];
  })(),
  SumOfFourAndFive: (() => {
    const x = getRegularBitRotation(4);
    const y = getRegularBitRotation(5);
    return [x[0], x[1], x[2], y[0], y[1], [y[2], getRegularRotation(1), getRegularRotation(1)]];
  })(),
  SumOfFourAndSix: (() => {
    const x = getRegularBitRotation(4);
    const y = getRegularBitRotation(6);
    return [x[0], x[1], x[2], y[0], y[1], [y[2], getRegularRotation(2), getRegularRotation(1)]];
  })(),
  SumOfFourAndSeven: (() => {
    const x = getRegularBitRotation(4);
    const y = getRegularBitRotation(7);
    return [x[0], x[1], x[2], y[0], y[1], [y[2], getRegularRotation(3), getRegularRotation(1)]];
  })(),
  SumOfFourAndEight: (() => {
    const x = getRegularBitRotation(4);
    const y = getRegularBitRotation(8);
    return [x[0], x[1], x[2], y[0], y[1], [y[2], getRegularRotation(4), getRegularRotation(1)]];
  })(),

  // 5 + N (N = 1-8)
  SumOfFiveAndOne: (() => {
    const x = getRegularBitRotation(5);
    const y = getRegularBitRotation(1);
    return [x[0], x[1], x[2], y[0], y[1], [y[2], getRegularRotation(6)]];
  })(),
  SumOfFiveAndTwo: (() => {
    const x = getRegularBitRotation(5);
    const y = getRegularBitRotation(2);
    return [x[0], x[1], x[2], y[0], y[1], [y[2], getRegularRotation(7)]];
  })(),
  SumOfFiveAndThree: (() => {
    const x = getRegularBitRotation(5);
    const y = getRegularBitRotation(3);
    return [x[0], x[1], x[2], y[0], y[1], [y[2], getRegularRotation(8)]];
  })(),
  SumOfFiveAndFour: (() => {
    const x = getRegularBitRotation(5);
    const y = getRegularBitRotation(4);
    return [x[0], x[1], x[2], y[0], y[1], [y[2], getRegularRotation(1), getRegularRotation(1)]];
  })(),
  SumOfFiveAndFive: (() => {
    const x = getRegularBitRotation(5);
    const y = getRegularBitRotation(5);
    return [x[0], x[1], x[2], y[0], y[1], [y[2], getRegularRotation(2), getRegularRotation(1)]];
  })(),
  SumOfFiveAndSix: (() => {
    const x = getRegularBitRotation(5);
    const y = getRegularBitRotation(6);
    return [x[0], x[1], x[2], y[0], y[1], [y[2], getRegularRotation(3), getRegularRotation(1)]];
  })(),
  SumOfFiveAndSeven: (() => {
    const x = getRegularBitRotation(5);
    const y = getRegularBitRotation(7);
    return [x[0], x[1], x[2], y[0], y[1], [y[2], getRegularRotation(4), getRegularRotation(1)]];
  })(),
  SumOfFiveAndEight: (() => {
    const x = getRegularBitRotation(5);
    const y = getRegularBitRotation(8);
    return [x[0], x[1], x[2], y[0], y[1], [y[2], getRegularRotation(5), getRegularRotation(1)]];
  })(),

  // 6 + N (N = 1-8)
  SumOfSixAndOne: (() => {
    const x = getRegularBitRotation(6);
    const y = getRegularBitRotation(1);
    return [x[0], x[1], x[2], y[0], y[1], [y[2], getRegularRotation(7)]];
  })(),
  SumOfSixAndTwo: (() => {
    const x = getRegularBitRotation(6);
    const y = getRegularBitRotation(2);
    return [x[0], x[1], x[2], y[0], y[1], [y[2], getRegularRotation(8)]];
  })(),
  SumOfSixAndThree: (() => {
    const x = getRegularBitRotation(6);
    const y = getRegularBitRotation(3);
    return [x[0], x[1], x[2], y[0], y[1], [y[2], getRegularRotation(1), getRegularRotation(1)]];
  })(),
  SumOfSixAndFour: (() => {
    const x = getRegularBitRotation(6);
    const y = getRegularBitRotation(4);
    return [x[0], x[1], x[2], y[0], y[1], [y[2], getRegularRotation(2), getRegularRotation(1)]];
  })(),
  SumOfSixAndFive: (() => {
    const x = getRegularBitRotation(6);
    const y = getRegularBitRotation(5);
    return [x[0], x[1], x[2], y[0], y[1], [y[2], getRegularRotation(3), getRegularRotation(1)]];
  })(),
  SumOfSixAndSix: (() => {
    const x = getRegularBitRotation(6);
    const y = getRegularBitRotation(6);
    return [x[0], x[1], x[2], y[0], y[1], [y[2], getRegularRotation(4), getRegularRotation(1)]];
  })(),
  SumOfSixAndSeven: (() => {
    const x = getRegularBitRotation(6);
    const y = getRegularBitRotation(7);
    return [x[0], x[1], x[2], y[0], y[1], [y[2], getRegularRotation(5), getRegularRotation(1)]];
  })(),
  SumOfSixAndEight: (() => {
    const x = getRegularBitRotation(6);
    const y = getRegularBitRotation(8);
    return [x[0], x[1], x[2], y[0], y[1], [y[2], getRegularRotation(6), getRegularRotation(1)]];
  })(),

  // 7 + N (N = 1-8)
  SumOfSevenAndOne: (() => {
    const x = getRegularBitRotation(7);
    const y = getRegularBitRotation(1);
    return [x[0], x[1], x[2], y[0], y[1], [y[2], getRegularRotation(8)]];
  })(),
  SumOfSevenAndTwo: (() => {
    const x = getRegularBitRotation(7);
    const y = getRegularBitRotation(2);
    return [x[0], x[1], x[2], y[0], y[1], [y[2], getRegularRotation(1), getRegularRotation(1)]];
  })(),
  SumOfSevenAndThree: (() => {
    const x = getRegularBitRotation(7);
    const y = getRegularBitRotation(3);
    return [x[0], x[1], x[2], y[0], y[1], [y[2], getRegularRotation(2), getRegularRotation(1)]];
  })(),
  SumOfSevenAndFour: (() => {
    const x = getRegularBitRotation(7);
    const y = getRegularBitRotation(4);
    return [x[0], x[1], x[2], y[0], y[1], [y[2], getRegularRotation(3), getRegularRotation(1)]];
  })(),
  SumOfSevenAndFive: (() => {
    const x = getRegularBitRotation(7);
    const y = getRegularBitRotation(5);
    return [x[0], x[1], x[2], y[0], y[1], [y[2], getRegularRotation(4), getRegularRotation(1)]];
  })(),
  SumOfSevenAndSix: (() => {
    const x = getRegularBitRotation(7);
    const y = getRegularBitRotation(6);
    return [x[0], x[1], x[2], y[0], y[1], [y[2], getRegularRotation(5), getRegularRotation(1)]];
  })(),
  SumOfSevenAndSeven: (() => {
    const x = getRegularBitRotation(7);
    const y = getRegularBitRotation(7);
    return [x[0], x[1], x[2], y[0], y[1], [y[2], getRegularRotation(6), getRegularRotation(1)]];
  })(),
  SumOfSevenAndEight: (() => {
    const x = getRegularBitRotation(7);
    const y = getRegularBitRotation(8);
    return [x[0], x[1], x[2], y[0], y[1], [y[2], getRegularRotation(7), getRegularRotation(1)]];
  })(),

  // 8 + N (N = 1-8)
  SumOfEightAndOne: (() => {
    const x = getRegularBitRotation(8);
    const y = getRegularBitRotation(1);
    return [x[0], x[1], x[2], y[0], y[1], [y[2], getRegularRotation(1), getRegularRotation(1)]];
  })(),
  SumOfEightAndTwo: (() => {
    const x = getRegularBitRotation(8);
    const y = getRegularBitRotation(2);
    return [x[0], x[1], x[2], y[0], y[1], [y[2], getRegularRotation(2), getRegularRotation(1)]];
  })(),
  SumOfEightAndThree: (() => {
    const x = getRegularBitRotation(8);
    const y = getRegularBitRotation(3);
    return [x[0], x[1], x[2], y[0], y[1], [y[2], getRegularRotation(3), getRegularRotation(1)]];
  })(),
  SumOfEightAndFour: (() => {
    const x = getRegularBitRotation(8);
    const y = getRegularBitRotation(4);
    return [x[0], x[1], x[2], y[0], y[1], [y[2], getRegularRotation(4), getRegularRotation(1)]];
  })(),
  SumOfEightAndFive: (() => {
    const x = getRegularBitRotation(8);
    const y = getRegularBitRotation(5);
    return [x[0], x[1], x[2], y[0], y[1], [y[2], getRegularRotation(5), getRegularRotation(1)]];
  })(),
  SumOfEightAndSix: (() => {
    const x = getRegularBitRotation(8);
    const y = getRegularBitRotation(6);
    return [x[0], x[1], x[2], y[0], y[1], [y[2], getRegularRotation(6), getRegularRotation(1)]];
  })(),
  SumOfEightAndSeven: (() => {
    const x = getRegularBitRotation(8);
    const y = getRegularBitRotation(7);
    return [x[0], x[1], x[2], y[0], y[1], [y[2], getRegularRotation(7), getRegularRotation(1)]];
  })(),
  SumOfEightAndEight: (() => {
    const x = getRegularBitRotation(8);
    const y = getRegularBitRotation(8);
    return [x[0], x[1], x[2], y[0], y[1], [y[2], getRegularRotation(8), getRegularRotation(1)]];
  })(),
};
