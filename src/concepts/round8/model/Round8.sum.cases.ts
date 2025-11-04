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

type SomeSeries = Record<string, ((Uint8Array<ArrayBuffer> | number)[] | number)[]>;

export const SumSeries: SomeSeries = {
  // 1 + N (N = 1-8)
  SumOfOneAndOne: [
    0, 0, 0,  // 1 = 000
    0, 0,     // 1 high bits
    [0, new Uint8Array([0, 0, 1])]  // 1+1=2 (001)
  ],
  SumOfOneAndTwo: [
    0, 0, 0,  // 1 = 000
    0, 0,     // 2 high bits
    [1, new Uint8Array([0, 1, 0])]  // 1+2=3 (010)
  ],
  SumOfOneAndThree: [
    0, 0, 0,  // 1 = 000
    0, 1,     // 3 high bits
    [0, new Uint8Array([0, 1, 1])]  // 1+3=4 (011)
  ],
  SumOfOneAndFour: [
    0, 0, 0,  // 1 = 000
    0, 1,     // 4 high bits
    [1, new Uint8Array([1, 0, 0])]  // 1+4=5 (100)
  ],
  SumOfOneAndFive: [
    0, 0, 0,  // 1 = 000
    1, 0,     // 5 high bits
    [0, new Uint8Array([1, 0, 1])]  // 1+5=6 (101)
  ],
  SumOfOneAndSix: [
    0, 0, 0,  // 1 = 000
    1, 0,     // 6 high bits
    [1, new Uint8Array([1, 1, 0])]  // 1+6=7 (110)
  ],
  SumOfOneAndSeven: [
    0, 0, 0,  // 1 = 000
    1, 1,     // 7 high bits
    [0, new Uint8Array([1, 1, 1])]  // 1+7=8 (111)
  ],
  SumOfOneAndEight: [
    0, 0, 0,  // 1 = 000
    1, 1,     // 8 high bits
    [1, new Uint8Array([0, 0, 0]), new Uint8Array([0, 0, 0])]  // 1+8=9 → "11" (carry)
  ],

  // 2 + N (N = 1-8)
  SumOfTwoAndOne: [
    0, 0, 1,  // 2 = 001
    0, 0,     // 1 high bits
    [0, new Uint8Array([0, 1, 0])]  // 2+1=3 (010)
  ],
  SumOfTwoAndTwo: [
    0, 0, 1,  // 2 = 001
    0, 0,     // 2 high bits
    [1, new Uint8Array([0, 1, 1])]  // 2+2=4 (011)
  ],
  SumOfTwoAndThree: [
    0, 0, 1,  // 2 = 001
    0, 1,     // 3 high bits
    [0, new Uint8Array([1, 0, 0])]  // 2+3=5 (100)
  ],
  SumOfTwoAndFour: [
    0, 0, 1,  // 2 = 001
    0, 1,     // 4 high bits
    [1, new Uint8Array([1, 0, 1])]  // 2+4=6 (101)
  ],
  SumOfTwoAndFive: [
    0, 0, 1,  // 2 = 001
    1, 0,     // 5 high bits
    [0, new Uint8Array([1, 1, 0])]  // 2+5=7 (110)
  ],
  SumOfTwoAndSix: [
    0, 0, 1,  // 2 = 001
    1, 0,     // 6 high bits
    [1, new Uint8Array([1, 1, 1])]  // 2+6=8 (111)
  ],
  SumOfTwoAndSeven: [
    0, 0, 1,  // 2 = 001
    1, 1,     // 7 high bits
    [0, new Uint8Array([0, 0, 0]), new Uint8Array([0, 0, 0])]  // 2+7=9 → "11"
  ],
  SumOfTwoAndEight: [
    0, 0, 1,  // 2 = 001
    1, 1,     // 8 high bits
    [1, new Uint8Array([0, 0, 1]), new Uint8Array([0, 0, 0])]  // 2+8=10 → "12"
  ],

  // 3 + N (N = 1-8)
  SumOfThreeAndOne: [
    0, 1, 0,  // 3 = 010
    0, 0,     // 1 high bits
    [0, new Uint8Array([0, 1, 1])]  // 3+1=4 (011)
  ],
  SumOfThreeAndTwo: [
    0, 1, 0,  // 3 = 010
    0, 0,     // 2 high bits
    [1, new Uint8Array([1, 0, 0])]  // 3+2=5 (100)
  ],
  SumOfThreeAndThree: [
    0, 1, 0,  // 3 = 010
    0, 1,     // 3 high bits
    [0, new Uint8Array([1, 0, 1])]  // 3+3=6 (101)
  ],
  SumOfThreeAndFour: [
    0, 1, 0,  // 3 = 010
    0, 1,     // 4 high bits
    [1, new Uint8Array([1, 1, 0])]  // 3+4=7 (110)
  ],
  SumOfThreeAndFive: [
    0, 1, 0,  // 3 = 010
    1, 0,     // 5 high bits
    [0, new Uint8Array([1, 1, 1])]  // 3+5=8 (111)
  ],
  SumOfThreeAndSix: [
    0, 1, 0,  // 3 = 010
    1, 0,     // 6 high bits
    [1, new Uint8Array([0, 0, 0]), new Uint8Array([0, 0, 0])]  // 3+6=9 → "11"
  ],
  SumOfThreeAndSeven: [
    0, 1, 0,  // 3 = 010
    1, 1,     // 7 high bits
    [0, new Uint8Array([0, 0, 1]), new Uint8Array([0, 0, 0])]  // 3+7=10 → "12"
  ],
  SumOfThreeAndEight: [
    0, 1, 0,  // 3 = 010
    1, 1,     // 8 high bits
    [1, new Uint8Array([0, 1, 0]), new Uint8Array([0, 0, 0])]  // 3+8=11 → "13"
  ],

  // 4 + N (N = 1-8)
  SumOfFourAndOne: [
    0, 1, 1,  // 4 = 011
    0, 0,     // 1 high bits
    [0, new Uint8Array([1, 0, 0])]  // 4+1=5 (100)
  ],
  SumOfFourAndTwo: [
    0, 1, 1,  // 4 = 011
    0, 0,     // 2 high bits
    [1, new Uint8Array([1, 0, 1])]  // 4+2=6 (101)
  ],
  SumOfFourAndThree: [
    0, 1, 1,  // 4 = 011
    0, 1,     // 3 high bits
    [0, new Uint8Array([1, 1, 0])]  // 4+3=7 (110)
  ],
  SumOfFourAndFour: [
    0, 1, 1,  // 4 = 011
    0, 1,     // 4 high bits
    [1, new Uint8Array([1, 1, 1])]  // 4+4=8 (111)
  ],
  SumOfFourAndFive: [
    0, 1, 1,  // 4 = 011
    1, 0,     // 5 high bits
    [0, new Uint8Array([0, 0, 0]), new Uint8Array([0, 0, 0])]  // 4+5=9 → "11"
  ],
  SumOfFourAndSix: [
    0, 1, 1,  // 4 = 011
    1, 0,     // 6 high bits
    [1, new Uint8Array([0, 0, 1]), new Uint8Array([0, 0, 0])]  // 4+6=10 → "12"
  ],
  SumOfFourAndSeven: [
    0, 1, 1,  // 4 = 011
    1, 1,     // 7 high bits
    [0, new Uint8Array([0, 1, 0]), new Uint8Array([0, 0, 0])]  // 4+7=11 → "13"
  ],
  SumOfFourAndEight: [
    0, 1, 1,  // 4 = 011
    1, 1,     // 8 high bits
    [1, new Uint8Array([0, 1, 1]), new Uint8Array([0, 0, 0])]  // 4+8=12 → "14"
  ],

  // 5 + N (N = 1-8)
  SumOfFiveAndOne: [
    1, 0, 0,  // 5 = 100
    0, 0,     // 1 high bits
    [0, new Uint8Array([1, 0, 1])]  // 5+1=6 (101)
  ],
  SumOfFiveAndTwo: [
    1, 0, 0,  // 5 = 100
    0, 0,     // 2 high bits
    [1, new Uint8Array([1, 1, 0])]  // 5+2=7 (110)
  ],
  SumOfFiveAndThree: [
    1, 0, 0,  // 5 = 100
    0, 1,     // 3 high bits
    [0, new Uint8Array([1, 1, 1])]  // 5+3=8 (111)
  ],
  SumOfFiveAndFour: [
    1, 0, 0,  // 5 = 100
    0, 1,     // 4 high bits
    [1, new Uint8Array([0, 0, 0]), new Uint8Array([0, 0, 0])]  // 5+4=9 → "11"
  ],
  SumOfFiveAndFive: [
    1, 0, 0,  // 5 = 100
    1, 0,     // 5 high bits
    [0, new Uint8Array([0, 0, 1]), new Uint8Array([0, 0, 0])]  // 5+5=10 → "12"
  ],
  SumOfFiveAndSix: [
    1, 0, 0,  // 5 = 100
    1, 0,     // 6 high bits
    [1, new Uint8Array([0, 1, 0]), new Uint8Array([0, 0, 0])]  // 5+6=11 → "13"
  ],
  SumOfFiveAndSeven: [
    1, 0, 0,  // 5 = 100
    1, 1,     // 7 high bits
    [0, new Uint8Array([0, 1, 1]), new Uint8Array([0, 0, 0])]  // 5+7=12 → "14"
  ],
  SumOfFiveAndEight: [
    1, 0, 0,  // 5 = 100
    1, 1,     // 8 high bits
    [1, new Uint8Array([1, 0, 0]), new Uint8Array([0, 0, 0])]  // 5+8=13 → "15"
  ],

  // 6 + N (N = 1-8)
  SumOfSixAndOne: [
    1, 0, 1,  // 6 = 101
    0, 0,     // 1 high bits
    [0, new Uint8Array([1, 1, 0])]  // 6+1=7 (110)
  ],
  SumOfSixAndTwo: [
    1, 0, 1,  // 6 = 101
    0, 0,     // 2 high bits
    [1, new Uint8Array([1, 1, 1])]  // 6+2=8 (111)
  ],
  SumOfSixAndThree: [
    1, 0, 1,  // 6 = 101
    0, 1,     // 3 high bits
    [0, new Uint8Array([0, 0, 0]), new Uint8Array([0, 0, 0])]  // 6+3=9 → "11"
  ],
  SumOfSixAndFour: [
    1, 0, 1,  // 6 = 101
    0, 1,     // 4 high bits
    [1, new Uint8Array([0, 0, 1]), new Uint8Array([0, 0, 0])]  // 6+4=10 → "12"
  ],
  SumOfSixAndFive: [
    1, 0, 1,  // 6 = 101
    1, 0,     // 5 high bits
    [0, new Uint8Array([0, 1, 0]), new Uint8Array([0, 0, 0])]  // 6+5=11 → "13"
  ],
  SumOfSixAndSix: [
    1, 0, 1,  // 6 = 101
    1, 0,     // 6 high bits
    [1, new Uint8Array([0, 1, 1]), new Uint8Array([0, 0, 0])]  // 6+6=12 → "14"
  ],
  SumOfSixAndSeven: [
    1, 0, 1,  // 6 = 101
    1, 1,     // 7 high bits
    [0, new Uint8Array([1, 0, 0]), new Uint8Array([0, 0, 0])]  // 6+7=13 → "15"
  ],
  SumOfSixAndEight: [
    1, 0, 1,  // 6 = 101
    1, 1,     // 8 high bits
    [1, new Uint8Array([1, 0, 1]), new Uint8Array([0, 0, 0])]  // 6+8=14 → "16"
  ],

  // 7 + N (N = 1-8)
  SumOfSevenAndOne: [
    1, 1, 0,  // 7 = 110
    0, 0,     // 1 high bits
    [0, new Uint8Array([1, 1, 1])]  // 7+1=8 (111)
  ],
  SumOfSevenAndTwo: [
    1, 1, 0,  // 7 = 110
    0, 0,     // 2 high bits
    [1, new Uint8Array([0, 0, 0]), new Uint8Array([0, 0, 0])]  // 7+2=9 → "11"
  ],
  SumOfSevenAndThree: [
    1, 1, 0,  // 7 = 110
    0, 1,     // 3 high bits
    [0, new Uint8Array([0, 0, 1]), new Uint8Array([0, 0, 0])]  // 7+3=10 → "12"
  ],
  SumOfSevenAndFour: [
    1, 1, 0,  // 7 = 110
    0, 1,     // 4 high bits
    [1, new Uint8Array([0, 1, 0]), new Uint8Array([0, 0, 0])]  // 7+4=11 → "13"
  ],
  SumOfSevenAndFive: [
    1, 1, 0,  // 7 = 110
    1, 0,     // 5 high bits
    [0, new Uint8Array([0, 1, 1]), new Uint8Array([0, 0, 0])]  // 7+5=12 → "14"
  ],
  SumOfSevenAndSix: [
    1, 1, 0,  // 7 = 110
    1, 0,     // 6 high bits
    [1, new Uint8Array([1, 0, 0]), new Uint8Array([0, 0, 0])]  // 7+6=13 → "15"
  ],
  SumOfSevenAndSeven: [
    1, 1, 0,  // 7 = 110
    1, 1,     // 7 high bits
    [0, new Uint8Array([1, 0, 1]), new Uint8Array([0, 0, 0])]  // 7+7=14 → "16"
  ],
  SumOfSevenAndEight: [
    1, 1, 0,  // 7 = 110
    1, 1,     // 8 high bits
    [1, new Uint8Array([1, 1, 0]), new Uint8Array([0, 0, 0])]  // 7+8=15 → "17"
  ],

  // 8 + N (N = 1-8)
  SumOfEightAndOne: [
    1, 1, 1,  // 8 = 111
    0, 0,     // 1 high bits
    [0, new Uint8Array([0, 0, 0]), new Uint8Array([0, 0, 0])]  // 8+1=9 → "11"
  ],
  SumOfEightAndTwo: [
    1, 1, 1,  // 8 = 111
    0, 0,     // 2 high bits
    [1, new Uint8Array([0, 0, 1]), new Uint8Array([0, 0, 0])]  // 8+2=10 → "12"
  ],
  SumOfEightAndThree: [
    1, 1, 1,  // 8 = 111
    0, 1,     // 3 high bits
    [0, new Uint8Array([0, 1, 0]), new Uint8Array([0, 0, 0])]  // 8+3=11 → "13"
  ],
  SumOfEightAndFour: [
    1, 1, 1,  // 8 = 111
    0, 1,     // 4 high bits
    [1, new Uint8Array([0, 1, 1]), new Uint8Array([0, 0, 0])]  // 8+4=12 → "14"
  ],
  SumOfEightAndFive: [
    1, 1, 1,  // 8 = 111
    1, 0,     // 5 high bits
    [0, new Uint8Array([1, 0, 0]), new Uint8Array([0, 0, 0])]  // 8+5=13 → "15"
  ],
  SumOfEightAndSix: [
    1, 1, 1,  // 8 = 111
    1, 0,     // 6 high bits
    [1, new Uint8Array([1, 0, 1]), new Uint8Array([0, 0, 0])]  // 8+6=14 → "16"
  ],
  SumOfEightAndSeven: [
    1, 1, 1,  // 8 = 111
    1, 1,     // 7 high bits
    [0, new Uint8Array([1, 1, 0]), new Uint8Array([0, 0, 0])]  // 8+7=15 → "17"
  ],
  SumOfEightAndEight: [
    1, 1, 1,  // 8 = 111
    1, 1,     // 8 high bits
    [1, new Uint8Array([1, 1, 1]), new Uint8Array([0, 0, 0])]  // 8+8=16 → "18"
  ],
};
