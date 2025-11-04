/**
 * Complete Difference Series - All 64 Subtraction Cases (8x8)
 *
 * Pattern: DifferenceOfXAndY represents X - Y
 * Array structure: [bit2_X, bit1_X, bit0_X, bit2_Y, bit1_Y, [bit0_Y, result, borrow?]]
 *
 * When X < Y: Need to borrow from next column
 * Borrow is always "1" = [0, 0, 0] (rotates down the front-most column)
 *
 * Ground truth from Two-Columns-Varified.md:
 * 1-1=0, 2-1=1, 3-1=2, ..., 8-1=7
 * For X < Y cases, we borrow and wrap around
 */

import { SPECIAL_CASE_STORE } from './Round8.cases';

type SomeSeries = Record<string, ((Uint8Array<ArrayBuffer> | number)[] | number)[]>;

export const DifferenceSeries: SomeSeries = {
  // 1 - N (N = 1-8)
  DifferenceOfOneAndOne: [
    0, 0, 0,  // 1 = 000
    0, 0,     // 1 high bits
    [0, SPECIAL_CASE_STORE.ZERO_CASE]  // 1-1=0 (special case)
  ],
  DifferenceOfOneAndTwo: [
    0, 0, 0,  // 1 = 000
    0, 0,     // 2 high bits
    [1, new Uint8Array([1, 1, 0]), new Uint8Array([0, 0, 0])]  // 1-2: borrow, result "7"
  ],
  DifferenceOfOneAndThree: [
    0, 0, 0,  // 1 = 000
    0, 1,     // 3 high bits
    [0, new Uint8Array([1, 0, 1]), new Uint8Array([0, 0, 0])]  // 1-3: borrow, result "6"
  ],
  DifferenceOfOneAndFour: [
    0, 0, 0,  // 1 = 000
    0, 1,     // 4 high bits
    [1, new Uint8Array([1, 0, 0]), new Uint8Array([0, 0, 0])]  // 1-4: borrow, result "5"
  ],
  DifferenceOfOneAndFive: [
    0, 0, 0,  // 1 = 000
    1, 0,     // 5 high bits
    [0, new Uint8Array([0, 1, 1]), new Uint8Array([0, 0, 0])]  // 1-5: borrow, result "4"
  ],
  DifferenceOfOneAndSix: [
    0, 0, 0,  // 1 = 000
    1, 0,     // 6 high bits
    [1, new Uint8Array([0, 1, 0]), new Uint8Array([0, 0, 0])]  // 1-6: borrow, result "3"
  ],
  DifferenceOfOneAndSeven: [
    0, 0, 0,  // 1 = 000
    1, 1,     // 7 high bits
    [0, new Uint8Array([0, 0, 1]), new Uint8Array([0, 0, 0])]  // 1-7: borrow, result "2"
  ],
  DifferenceOfOneAndEight: [
    0, 0, 0,  // 1 = 000
    1, 1,     // 8 high bits
    [1, new Uint8Array([0, 0, 0]), new Uint8Array([0, 0, 0])]  // 1-8: borrow, result "1"
  ],

  // 2 - N (N = 1-8)
  DifferenceOfTwoAndOne: [
    0, 0, 1,  // 2 = 001
    0, 0,     // 1 high bits
    [0, new Uint8Array([0, 0, 0])]  // 2-1=1 (000)
  ],
  DifferenceOfTwoAndTwo: [
    0, 0, 1,  // 2 = 001
    0, 0,     // 2 high bits
    [1, SPECIAL_CASE_STORE.ZERO_CASE]  // 2-2=0
  ],
  DifferenceOfTwoAndThree: [
    0, 0, 1,  // 2 = 001
    0, 1,     // 3 high bits
    [0, new Uint8Array([1, 1, 0]), new Uint8Array([0, 0, 0])]  // 2-3: borrow, result "7"
  ],
  DifferenceOfTwoAndFour: [
    0, 0, 1,  // 2 = 001
    0, 1,     // 4 high bits
    [1, new Uint8Array([1, 0, 1]), new Uint8Array([0, 0, 0])]  // 2-4: borrow, result "6"
  ],
  DifferenceOfTwoAndFive: [
    0, 0, 1,  // 2 = 001
    1, 0,     // 5 high bits
    [0, new Uint8Array([1, 0, 0]), new Uint8Array([0, 0, 0])]  // 2-5: borrow, result "5"
  ],
  DifferenceOfTwoAndSix: [
    0, 0, 1,  // 2 = 001
    1, 0,     // 6 high bits
    [1, new Uint8Array([0, 1, 1]), new Uint8Array([0, 0, 0])]  // 2-6: borrow, result "4"
  ],
  DifferenceOfTwoAndSeven: [
    0, 0, 1,  // 2 = 001
    1, 1,     // 7 high bits
    [0, new Uint8Array([0, 1, 0]), new Uint8Array([0, 0, 0])]  // 2-7: borrow, result "3"
  ],
  DifferenceOfTwoAndEight: [
    0, 0, 1,  // 2 = 001
    1, 1,     // 8 high bits
    [1, new Uint8Array([0, 0, 1]), new Uint8Array([0, 0, 0])]  // 2-8: borrow, result "2"
  ],

  // 3 - N (N = 1-8)
  DifferenceOfThreeAndOne: [
    0, 1, 0,  // 3 = 010
    0, 0,     // 1 high bits
    [0, new Uint8Array([0, 0, 1])]  // 3-1=2 (001)
  ],
  DifferenceOfThreeAndTwo: [
    0, 1, 0,  // 3 = 010
    0, 0,     // 2 high bits
    [1, new Uint8Array([0, 0, 0])]  // 3-2=1 (000)
  ],
  DifferenceOfThreeAndThree: [
    0, 1, 0,  // 3 = 010
    0, 1,     // 3 high bits
    [0, SPECIAL_CASE_STORE.ZERO_CASE]  // 3-3=0
  ],
  DifferenceOfThreeAndFour: [
    0, 1, 0,  // 3 = 010
    0, 1,     // 4 high bits
    [1, new Uint8Array([1, 1, 0]), new Uint8Array([0, 0, 0])]  // 3-4: borrow, result "7"
  ],
  DifferenceOfThreeAndFive: [
    0, 1, 0,  // 3 = 010
    1, 0,     // 5 high bits
    [0, new Uint8Array([1, 0, 1]), new Uint8Array([0, 0, 0])]  // 3-5: borrow, result "6"
  ],
  DifferenceOfThreeAndSix: [
    0, 1, 0,  // 3 = 010
    1, 0,     // 6 high bits
    [1, new Uint8Array([1, 0, 0]), new Uint8Array([0, 0, 0])]  // 3-6: borrow, result "5"
  ],
  DifferenceOfThreeAndSeven: [
    0, 1, 0,  // 3 = 010
    1, 1,     // 7 high bits
    [0, new Uint8Array([0, 1, 1]), new Uint8Array([0, 0, 0])]  // 3-7: borrow, result "4"
  ],
  DifferenceOfThreeAndEight: [
    0, 1, 0,  // 3 = 010
    1, 1,     // 8 high bits
    [1, new Uint8Array([0, 1, 0]), new Uint8Array([0, 0, 0])]  // 3-8: borrow, result "3"
  ],

  // 4 - N (N = 1-8)
  DifferenceOfFourAndOne: [
    0, 1, 1,  // 4 = 011
    0, 0,     // 1 high bits
    [0, new Uint8Array([0, 1, 0])]  // 4-1=3 (010)
  ],
  DifferenceOfFourAndTwo: [
    0, 1, 1,  // 4 = 011
    0, 0,     // 2 high bits
    [1, new Uint8Array([0, 0, 1])]  // 4-2=2 (001)
  ],
  DifferenceOfFourAndThree: [
    0, 1, 1,  // 4 = 011
    0, 1,     // 3 high bits
    [0, new Uint8Array([0, 0, 0])]  // 4-3=1 (000)
  ],
  DifferenceOfFourAndFour: [
    0, 1, 1,  // 4 = 011
    0, 1,     // 4 high bits
    [1, SPECIAL_CASE_STORE.ZERO_CASE]  // 4-4=0
  ],
  DifferenceOfFourAndFive: [
    0, 1, 1,  // 4 = 011
    1, 0,     // 5 high bits
    [0, new Uint8Array([1, 1, 0]), new Uint8Array([0, 0, 0])]  // 4-5: borrow, result "7"
  ],
  DifferenceOfFourAndSix: [
    0, 1, 1,  // 4 = 011
    1, 0,     // 6 high bits
    [1, new Uint8Array([1, 0, 1]), new Uint8Array([0, 0, 0])]  // 4-6: borrow, result "6"
  ],
  DifferenceOfFourAndSeven: [
    0, 1, 1,  // 4 = 011
    1, 1,     // 7 high bits
    [0, new Uint8Array([1, 0, 0]), new Uint8Array([0, 0, 0])]  // 4-7: borrow, result "5"
  ],
  DifferenceOfFourAndEight: [
    0, 1, 1,  // 4 = 011
    1, 1,     // 8 high bits
    [1, new Uint8Array([0, 1, 1]), new Uint8Array([0, 0, 0])]  // 4-8: borrow, result "4"
  ],

  // 5 - N (N = 1-8)
  DifferenceOfFiveAndOne: [
    1, 0, 0,  // 5 = 100
    0, 0,     // 1 high bits
    [0, new Uint8Array([0, 1, 1])]  // 5-1=4 (011)
  ],
  DifferenceOfFiveAndTwo: [
    1, 0, 0,  // 5 = 100
    0, 0,     // 2 high bits
    [1, new Uint8Array([0, 1, 0])]  // 5-2=3 (010)
  ],
  DifferenceOfFiveAndThree: [
    1, 0, 0,  // 5 = 100
    0, 1,     // 3 high bits
    [0, new Uint8Array([0, 0, 1])]  // 5-3=2 (001)
  ],
  DifferenceOfFiveAndFour: [
    1, 0, 0,  // 5 = 100
    0, 1,     // 4 high bits
    [1, new Uint8Array([0, 0, 0])]  // 5-4=1 (000)
  ],
  DifferenceOfFiveAndFive: [
    1, 0, 0,  // 5 = 100
    1, 0,     // 5 high bits
    [0, SPECIAL_CASE_STORE.ZERO_CASE]  // 5-5=0
  ],
  DifferenceOfFiveAndSix: [
    1, 0, 0,  // 5 = 100
    1, 0,     // 6 high bits
    [1, new Uint8Array([1, 1, 0]), new Uint8Array([0, 0, 0])]  // 5-6: borrow, result "7"
  ],
  DifferenceOfFiveAndSeven: [
    1, 0, 0,  // 5 = 100
    1, 1,     // 7 high bits
    [0, new Uint8Array([1, 0, 1]), new Uint8Array([0, 0, 0])]  // 5-7: borrow, result "6"
  ],
  DifferenceOfFiveAndEight: [
    1, 0, 0,  // 5 = 100
    1, 1,     // 8 high bits
    [1, new Uint8Array([1, 0, 0]), new Uint8Array([0, 0, 0])]  // 5-8: borrow, result "5"
  ],

  // 6 - N (N = 1-8)
  DifferenceOfSixAndOne: [
    1, 0, 1,  // 6 = 101
    0, 0,     // 1 high bits
    [0, new Uint8Array([1, 0, 0])]  // 6-1=5 (100)
  ],
  DifferenceOfSixAndTwo: [
    1, 0, 1,  // 6 = 101
    0, 0,     // 2 high bits
    [1, new Uint8Array([0, 1, 1])]  // 6-2=4 (011)
  ],
  DifferenceOfSixAndThree: [
    1, 0, 1,  // 6 = 101
    0, 1,     // 3 high bits
    [0, new Uint8Array([0, 1, 0])]  // 6-3=3 (010)
  ],
  DifferenceOfSixAndFour: [
    1, 0, 1,  // 6 = 101
    0, 1,     // 4 high bits
    [1, new Uint8Array([0, 0, 1])]  // 6-4=2 (001)
  ],
  DifferenceOfSixAndFive: [
    1, 0, 1,  // 6 = 101
    1, 0,     // 5 high bits
    [0, new Uint8Array([0, 0, 0])]  // 6-5=1 (000)
  ],
  DifferenceOfSixAndSix: [
    1, 0, 1,  // 6 = 101
    1, 0,     // 6 high bits
    [1, SPECIAL_CASE_STORE.ZERO_CASE]  // 6-6=0
  ],
  DifferenceOfSixAndSeven: [
    1, 0, 1,  // 6 = 101
    1, 1,     // 7 high bits
    [0, new Uint8Array([1, 1, 0]), new Uint8Array([0, 0, 0])]  // 6-7: borrow, result "7"
  ],
  DifferenceOfSixAndEight: [
    1, 0, 1,  // 6 = 101
    1, 1,     // 8 high bits
    [1, new Uint8Array([1, 0, 1]), new Uint8Array([0, 0, 0])]  // 6-8: borrow, result "6"
  ],

  // 7 - N (N = 1-8)
  DifferenceOfSevenAndOne: [
    1, 1, 0,  // 7 = 110
    0, 0,     // 1 high bits
    [0, new Uint8Array([1, 0, 1])]  // 7-1=6 (101)
  ],
  DifferenceOfSevenAndTwo: [
    1, 1, 0,  // 7 = 110
    0, 0,     // 2 high bits
    [1, new Uint8Array([1, 0, 0])]  // 7-2=5 (100)
  ],
  DifferenceOfSevenAndThree: [
    1, 1, 0,  // 7 = 110
    0, 1,     // 3 high bits
    [0, new Uint8Array([0, 1, 1])]  // 7-3=4 (011)
  ],
  DifferenceOfSevenAndFour: [
    1, 1, 0,  // 7 = 110
    0, 1,     // 4 high bits
    [1, new Uint8Array([0, 1, 0])]  // 7-4=3 (010)
  ],
  DifferenceOfSevenAndFive: [
    1, 1, 0,  // 7 = 110
    1, 0,     // 5 high bits
    [0, new Uint8Array([0, 0, 1])]  // 7-5=2 (001)
  ],
  DifferenceOfSevenAndSix: [
    1, 1, 0,  // 7 = 110
    1, 0,     // 6 high bits
    [1, new Uint8Array([0, 0, 0])]  // 7-6=1 (000)
  ],
  DifferenceOfSevenAndSeven: [
    1, 1, 0,  // 7 = 110
    1, 1,     // 7 high bits
    [0, SPECIAL_CASE_STORE.ZERO_CASE]  // 7-7=0
  ],
  DifferenceOfSevenAndEight: [
    1, 1, 0,  // 7 = 110
    1, 1,     // 8 high bits
    [1, new Uint8Array([1, 1, 0]), new Uint8Array([0, 0, 0])]  // 7-8: borrow, result "7"
  ],

  // 8 - N (N = 1-8)
  DifferenceOfEightAndOne: [
    1, 1, 1,  // 8 = 111
    0, 0,     // 1 high bits
    [0, new Uint8Array([1, 1, 0])]  // 8-1=7 (110)
  ],
  DifferenceOfEightAndTwo: [
    1, 1, 1,  // 8 = 111
    0, 0,     // 2 high bits
    [1, new Uint8Array([1, 0, 1])]  // 8-2=6 (101)
  ],
  DifferenceOfEightAndThree: [
    1, 1, 1,  // 8 = 111
    0, 1,     // 3 high bits
    [0, new Uint8Array([1, 0, 0])]  // 8-3=5 (100)
  ],
  DifferenceOfEightAndFour: [
    1, 1, 1,  // 8 = 111
    0, 1,     // 4 high bits
    [1, new Uint8Array([0, 1, 1])]  // 8-4=4 (011)
  ],
  DifferenceOfEightAndFive: [
    1, 1, 1,  // 8 = 111
    1, 0,     // 5 high bits
    [0, new Uint8Array([0, 1, 0])]  // 8-5=3 (010)
  ],
  DifferenceOfEightAndSix: [
    1, 1, 1,  // 8 = 111
    1, 0,     // 6 high bits
    [1, new Uint8Array([0, 0, 1])]  // 8-6=2 (001)
  ],
  DifferenceOfEightAndSeven: [
    1, 1, 1,  // 8 = 111
    1, 1,     // 7 high bits
    [0, new Uint8Array([0, 0, 0])]  // 8-7=1 (000)
  ],
  DifferenceOfEightAndEight: [
    1, 1, 1,  // 8 = 111
    1, 1,     // 8 high bits
    [1, SPECIAL_CASE_STORE.ZERO_CASE]  // 8-8=0
  ],
};
