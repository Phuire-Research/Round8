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
 */

type SomeSeries = Record<string, ((number)[] | number)[]>;

export const LessThanSeries: SomeSeries = {
  // Display 1 < N (N = 1-8)
  // 1 is smallest, so 1 < X is True for X > 1
  LessThanOneAndOne: [
    0, 0, 0,  // 1 = 000
    0, 0,     // 1 high bits
    [0, 0]    // False: 1 is NOT < 1
  ],
  LessThanOneAndTwo: [
    0, 0, 0,  // 1 = 000
    0, 0,     // 2 high bits
    [1, 1]    // True: 1 < 2
  ],
  LessThanOneAndThree: [
    0, 0, 0,  // 1 = 000
    0, 1,     // 3 high bits
    [0, 1]    // True: 1 < 3
  ],
  LessThanOneAndFour: [
    0, 0, 0,  // 1 = 000
    0, 1,     // 4 high bits
    [1, 1]    // True: 1 < 4
  ],
  LessThanOneAndFive: [
    0, 0, 0,  // 1 = 000
    1, 0,     // 5 high bits
    [0, 1]    // True: 1 < 5
  ],
  LessThanOneAndSix: [
    0, 0, 0,  // 1 = 000
    1, 0,     // 6 high bits
    [1, 1]    // True: 1 < 6
  ],
  LessThanOneAndSeven: [
    0, 0, 0,  // 1 = 000
    1, 1,     // 7 high bits
    [0, 1]    // True: 1 < 7
  ],
  LessThanOneAndEight: [
    0, 0, 0,  // 1 = 000
    1, 1,     // 8 high bits
    [1, 1]    // True: 1 < 8
  ],

  // Display 2 < N (N = 1-8)
  LessThanTwoAndOne: [
    0, 0, 1,  // 2 = 001
    0, 0,     // 1 high bits
    [0, 0]    // False: 2 is NOT < 1
  ],
  LessThanTwoAndTwo: [
    0, 0, 1,  // 2 = 001
    0, 0,     // 2 high bits
    [1, 0]    // False: 2 is NOT < 2
  ],
  LessThanTwoAndThree: [
    0, 0, 1,  // 2 = 001
    0, 1,     // 3 high bits
    [0, 1]    // True: 2 < 3
  ],
  LessThanTwoAndFour: [
    0, 0, 1,  // 2 = 001
    0, 1,     // 4 high bits
    [1, 1]    // True: 2 < 4
  ],
  LessThanTwoAndFive: [
    0, 0, 1,  // 2 = 001
    1, 0,     // 5 high bits
    [0, 1]    // True: 2 < 5
  ],
  LessThanTwoAndSix: [
    0, 0, 1,  // 2 = 001
    1, 0,     // 6 high bits
    [1, 1]    // True: 2 < 6
  ],
  LessThanTwoAndSeven: [
    0, 0, 1,  // 2 = 001
    1, 1,     // 7 high bits
    [0, 1]    // True: 2 < 7
  ],
  LessThanTwoAndEight: [
    0, 0, 1,  // 2 = 001
    1, 1,     // 8 high bits
    [1, 1]    // True: 2 < 8
  ],

  // Display 3 < N (N = 1-8)
  LessThanThreeAndOne: [
    0, 1, 0,  // 3 = 010
    0, 0,     // 1 high bits
    [0, 0]    // False: 3 is NOT < 1
  ],
  LessThanThreeAndTwo: [
    0, 1, 0,  // 3 = 010
    0, 0,     // 2 high bits
    [1, 0]    // False: 3 is NOT < 2
  ],
  LessThanThreeAndThree: [
    0, 1, 0,  // 3 = 010
    0, 1,     // 3 high bits
    [0, 0]    // False: 3 is NOT < 3
  ],
  LessThanThreeAndFour: [
    0, 1, 0,  // 3 = 010
    0, 1,     // 4 high bits
    [1, 1]    // True: 3 < 4
  ],
  LessThanThreeAndFive: [
    0, 1, 0,  // 3 = 010
    1, 0,     // 5 high bits
    [0, 1]    // True: 3 < 5
  ],
  LessThanThreeAndSix: [
    0, 1, 0,  // 3 = 010
    1, 0,     // 6 high bits
    [1, 1]    // True: 3 < 6
  ],
  LessThanThreeAndSeven: [
    0, 1, 0,  // 3 = 010
    1, 1,     // 7 high bits
    [0, 1]    // True: 3 < 7
  ],
  LessThanThreeAndEight: [
    0, 1, 0,  // 3 = 010
    1, 1,     // 8 high bits
    [1, 1]    // True: 3 < 8
  ],

  // Display 4 < N (N = 1-8)
  LessThanFourAndOne: [
    0, 1, 1,  // 4 = 011
    0, 0,     // 1 high bits
    [0, 0]    // False: 4 is NOT < 1
  ],
  LessThanFourAndTwo: [
    0, 1, 1,  // 4 = 011
    0, 0,     // 2 high bits
    [1, 0]    // False: 4 is NOT < 2
  ],
  LessThanFourAndThree: [
    0, 1, 1,  // 4 = 011
    0, 1,     // 3 high bits
    [0, 0]    // False: 4 is NOT < 3
  ],
  LessThanFourAndFour: [
    0, 1, 1,  // 4 = 011
    0, 1,     // 4 high bits
    [1, 0]    // False: 4 is NOT < 4
  ],
  LessThanFourAndFive: [
    0, 1, 1,  // 4 = 011
    1, 0,     // 5 high bits
    [0, 1]    // True: 4 < 5
  ],
  LessThanFourAndSix: [
    0, 1, 1,  // 4 = 011
    1, 0,     // 6 high bits
    [1, 1]    // True: 4 < 6
  ],
  LessThanFourAndSeven: [
    0, 1, 1,  // 4 = 011
    1, 1,     // 7 high bits
    [0, 1]    // True: 4 < 7
  ],
  LessThanFourAndEight: [
    0, 1, 1,  // 4 = 011
    1, 1,     // 8 high bits
    [1, 1]    // True: 4 < 8
  ],

  // Display 5 < N (N = 1-8)
  LessThanFiveAndOne: [
    1, 0, 0,  // 5 = 100
    0, 0,     // 1 high bits
    [0, 0]    // False: 5 is NOT < 1
  ],
  LessThanFiveAndTwo: [
    1, 0, 0,  // 5 = 100
    0, 0,     // 2 high bits
    [1, 0]    // False: 5 is NOT < 2
  ],
  LessThanFiveAndThree: [
    1, 0, 0,  // 5 = 100
    0, 1,     // 3 high bits
    [0, 0]    // False: 5 is NOT < 3
  ],
  LessThanFiveAndFour: [
    1, 0, 0,  // 5 = 100
    0, 1,     // 4 high bits
    [1, 0]    // False: 5 is NOT < 4
  ],
  LessThanFiveAndFive: [
    1, 0, 0,  // 5 = 100
    1, 0,     // 5 high bits
    [0, 0]    // False: 5 is NOT < 5
  ],
  LessThanFiveAndSix: [
    1, 0, 0,  // 5 = 100
    1, 0,     // 6 high bits
    [1, 1]    // True: 5 < 6
  ],
  LessThanFiveAndSeven: [
    1, 0, 0,  // 5 = 100
    1, 1,     // 7 high bits
    [0, 1]    // True: 5 < 7
  ],
  LessThanFiveAndEight: [
    1, 0, 0,  // 5 = 100
    1, 1,     // 8 high bits
    [1, 1]    // True: 5 < 8
  ],

  // Display 6 < N (N = 1-8)
  LessThanSixAndOne: [
    1, 0, 1,  // 6 = 101
    0, 0,     // 1 high bits
    [0, 0]    // False: 6 is NOT < 1
  ],
  LessThanSixAndTwo: [
    1, 0, 1,  // 6 = 101
    0, 0,     // 2 high bits
    [1, 0]    // False: 6 is NOT < 2
  ],
  LessThanSixAndThree: [
    1, 0, 1,  // 6 = 101
    0, 1,     // 3 high bits
    [0, 0]    // False: 6 is NOT < 3
  ],
  LessThanSixAndFour: [
    1, 0, 1,  // 6 = 101
    0, 1,     // 4 high bits
    [1, 0]    // False: 6 is NOT < 4
  ],
  LessThanSixAndFive: [
    1, 0, 1,  // 6 = 101
    1, 0,     // 5 high bits
    [0, 0]    // False: 6 is NOT < 5
  ],
  LessThanSixAndSix: [
    1, 0, 1,  // 6 = 101
    1, 0,     // 6 high bits
    [1, 0]    // False: 6 is NOT < 6
  ],
  LessThanSixAndSeven: [
    1, 0, 1,  // 6 = 101
    1, 1,     // 7 high bits
    [0, 1]    // True: 6 < 7
  ],
  LessThanSixAndEight: [
    1, 0, 1,  // 6 = 101
    1, 1,     // 8 high bits
    [1, 1]    // True: 6 < 8
  ],

  // Display 7 < N (N = 1-8)
  LessThanSevenAndOne: [
    1, 1, 0,  // 7 = 110
    0, 0,     // 1 high bits
    [0, 0]    // False: 7 is NOT < 1
  ],
  LessThanSevenAndTwo: [
    1, 1, 0,  // 7 = 110
    0, 0,     // 2 high bits
    [1, 0]    // False: 7 is NOT < 2
  ],
  LessThanSevenAndThree: [
    1, 1, 0,  // 7 = 110
    0, 1,     // 3 high bits
    [0, 0]    // False: 7 is NOT < 3
  ],
  LessThanSevenAndFour: [
    1, 1, 0,  // 7 = 110
    0, 1,     // 4 high bits
    [1, 0]    // False: 7 is NOT < 4
  ],
  LessThanSevenAndFive: [
    1, 1, 0,  // 7 = 110
    1, 0,     // 5 high bits
    [0, 0]    // False: 7 is NOT < 5
  ],
  LessThanSevenAndSix: [
    1, 1, 0,  // 7 = 110
    1, 0,     // 6 high bits
    [1, 0]    // False: 7 is NOT < 6
  ],
  LessThanSevenAndSeven: [
    1, 1, 0,  // 7 = 110
    1, 1,     // 7 high bits
    [0, 0]    // False: 7 is NOT < 7
  ],
  LessThanSevenAndEight: [
    1, 1, 0,  // 7 = 110
    1, 1,     // 8 high bits
    [1, 1]    // True: 7 < 8
  ],

  // Display 8 < N (N = 1-8)
  // 8 is largest, so 8 < X is always False
  LessThanEightAndOne: [
    1, 1, 1,  // 8 = 111
    0, 0,     // 1 high bits
    [0, 0]    // False: 8 is NOT < 1
  ],
  LessThanEightAndTwo: [
    1, 1, 1,  // 8 = 111
    0, 0,     // 2 high bits
    [1, 0]    // False: 8 is NOT < 2
  ],
  LessThanEightAndThree: [
    1, 1, 1,  // 8 = 111
    0, 1,     // 3 high bits
    [0, 0]    // False: 8 is NOT < 3
  ],
  LessThanEightAndFour: [
    1, 1, 1,  // 8 = 111
    0, 1,     // 4 high bits
    [1, 0]    // False: 8 is NOT < 4
  ],
  LessThanEightAndFive: [
    1, 1, 1,  // 8 = 111
    1, 0,     // 5 high bits
    [0, 0]    // False: 8 is NOT < 5
  ],
  LessThanEightAndSix: [
    1, 1, 1,  // 8 = 111
    1, 0,     // 6 high bits
    [1, 0]    // False: 8 is NOT < 6
  ],
  LessThanEightAndSeven: [
    1, 1, 1,  // 8 = 111
    1, 1,     // 7 high bits
    [0, 0]    // False: 8 is NOT < 7
  ],
  LessThanEightAndEight: [
    1, 1, 1,  // 8 = 111
    1, 1,     // 8 high bits
    [1, 0]    // False: 8 is NOT < 8
  ],
};
