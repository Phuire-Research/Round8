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
 */

type SomeSeries = Record<string, ((number)[] | number)[]>;

export const GreaterThanSeries: SomeSeries = {
  // Display 1 > N (N = 1-8)
  // 1 is smallest, so 1 > X is always False
  GreaterThanOneAndOne: [
    0, 0, 0,  // 1 = 000
    0, 0,     // 1 high bits
    [0, 0]    // False: 1 is NOT > 1
  ],
  GreaterThanOneAndTwo: [
    0, 0, 0,  // 1 = 000
    0, 0,     // 2 high bits
    [1, 0]    // False: 1 is NOT > 2
  ],
  GreaterThanOneAndThree: [
    0, 0, 0,  // 1 = 000
    0, 1,     // 3 high bits
    [0, 0]    // False: 1 is NOT > 3
  ],
  GreaterThanOneAndFour: [
    0, 0, 0,  // 1 = 000
    0, 1,     // 4 high bits
    [1, 0]    // False: 1 is NOT > 4
  ],
  GreaterThanOneAndFive: [
    0, 0, 0,  // 1 = 000
    1, 0,     // 5 high bits
    [0, 0]    // False: 1 is NOT > 5
  ],
  GreaterThanOneAndSix: [
    0, 0, 0,  // 1 = 000
    1, 0,     // 6 high bits
    [1, 0]    // False: 1 is NOT > 6
  ],
  GreaterThanOneAndSeven: [
    0, 0, 0,  // 1 = 000
    1, 1,     // 7 high bits
    [0, 0]    // False: 1 is NOT > 7
  ],
  GreaterThanOneAndEight: [
    0, 0, 0,  // 1 = 000
    1, 1,     // 8 high bits
    [1, 0]    // False: 1 is NOT > 8
  ],

  // Display 2 > N (N = 1-8)
  GreaterThanTwoAndOne: [
    0, 0, 1,  // 2 = 001
    0, 0,     // 1 high bits
    [0, 1]    // True: 2 > 1
  ],
  GreaterThanTwoAndTwo: [
    0, 0, 1,  // 2 = 001
    0, 0,     // 2 high bits
    [1, 0]    // False: 2 is NOT > 2
  ],
  GreaterThanTwoAndThree: [
    0, 0, 1,  // 2 = 001
    0, 1,     // 3 high bits
    [0, 0]    // False: 2 is NOT > 3
  ],
  GreaterThanTwoAndFour: [
    0, 0, 1,  // 2 = 001
    0, 1,     // 4 high bits
    [1, 0]    // False: 2 is NOT > 4
  ],
  GreaterThanTwoAndFive: [
    0, 0, 1,  // 2 = 001
    1, 0,     // 5 high bits
    [0, 0]    // False: 2 is NOT > 5
  ],
  GreaterThanTwoAndSix: [
    0, 0, 1,  // 2 = 001
    1, 0,     // 6 high bits
    [1, 0]    // False: 2 is NOT > 6
  ],
  GreaterThanTwoAndSeven: [
    0, 0, 1,  // 2 = 001
    1, 1,     // 7 high bits
    [0, 0]    // False: 2 is NOT > 7
  ],
  GreaterThanTwoAndEight: [
    0, 0, 1,  // 2 = 001
    1, 1,     // 8 high bits
    [1, 0]    // False: 2 is NOT > 8
  ],

  // Display 3 > N (N = 1-8)
  GreaterThanThreeAndOne: [
    0, 1, 0,  // 3 = 010
    0, 0,     // 1 high bits
    [0, 1]    // True: 3 > 1
  ],
  GreaterThanThreeAndTwo: [
    0, 1, 0,  // 3 = 010
    0, 0,     // 2 high bits
    [1, 1]    // True: 3 > 2
  ],
  GreaterThanThreeAndThree: [
    0, 1, 0,  // 3 = 010
    0, 1,     // 3 high bits
    [0, 0]    // False: 3 is NOT > 3
  ],
  GreaterThanThreeAndFour: [
    0, 1, 0,  // 3 = 010
    0, 1,     // 4 high bits
    [1, 0]    // False: 3 is NOT > 4
  ],
  GreaterThanThreeAndFive: [
    0, 1, 0,  // 3 = 010
    1, 0,     // 5 high bits
    [0, 0]    // False: 3 is NOT > 5
  ],
  GreaterThanThreeAndSix: [
    0, 1, 0,  // 3 = 010
    1, 0,     // 6 high bits
    [1, 0]    // False: 3 is NOT > 6
  ],
  GreaterThanThreeAndSeven: [
    0, 1, 0,  // 3 = 010
    1, 1,     // 7 high bits
    [0, 0]    // False: 3 is NOT > 7
  ],
  GreaterThanThreeAndEight: [
    0, 1, 0,  // 3 = 010
    1, 1,     // 8 high bits
    [1, 0]    // False: 3 is NOT > 8
  ],

  // Display 4 > N (N = 1-8)
  GreaterThanFourAndOne: [
    0, 1, 1,  // 4 = 011
    0, 0,     // 1 high bits
    [0, 1]    // True: 4 > 1
  ],
  GreaterThanFourAndTwo: [
    0, 1, 1,  // 4 = 011
    0, 0,     // 2 high bits
    [1, 1]    // True: 4 > 2
  ],
  GreaterThanFourAndThree: [
    0, 1, 1,  // 4 = 011
    0, 1,     // 3 high bits
    [0, 1]    // True: 4 > 3
  ],
  GreaterThanFourAndFour: [
    0, 1, 1,  // 4 = 011
    0, 1,     // 4 high bits
    [1, 0]    // False: 4 is NOT > 4
  ],
  GreaterThanFourAndFive: [
    0, 1, 1,  // 4 = 011
    1, 0,     // 5 high bits
    [0, 0]    // False: 4 is NOT > 5
  ],
  GreaterThanFourAndSix: [
    0, 1, 1,  // 4 = 011
    1, 0,     // 6 high bits
    [1, 0]    // False: 4 is NOT > 6
  ],
  GreaterThanFourAndSeven: [
    0, 1, 1,  // 4 = 011
    1, 1,     // 7 high bits
    [0, 0]    // False: 4 is NOT > 7
  ],
  GreaterThanFourAndEight: [
    0, 1, 1,  // 4 = 011
    1, 1,     // 8 high bits
    [1, 0]    // False: 4 is NOT > 8
  ],

  // Display 5 > N (N = 1-8)
  GreaterThanFiveAndOne: [
    1, 0, 0,  // 5 = 100
    0, 0,     // 1 high bits
    [0, 1]    // True: 5 > 1
  ],
  GreaterThanFiveAndTwo: [
    1, 0, 0,  // 5 = 100
    0, 0,     // 2 high bits
    [1, 1]    // True: 5 > 2
  ],
  GreaterThanFiveAndThree: [
    1, 0, 0,  // 5 = 100
    0, 1,     // 3 high bits
    [0, 1]    // True: 5 > 3
  ],
  GreaterThanFiveAndFour: [
    1, 0, 0,  // 5 = 100
    0, 1,     // 4 high bits
    [1, 1]    // True: 5 > 4
  ],
  GreaterThanFiveAndFive: [
    1, 0, 0,  // 5 = 100
    1, 0,     // 5 high bits
    [0, 0]    // False: 5 is NOT > 5
  ],
  GreaterThanFiveAndSix: [
    1, 0, 0,  // 5 = 100
    1, 0,     // 6 high bits
    [1, 0]    // False: 5 is NOT > 6
  ],
  GreaterThanFiveAndSeven: [
    1, 0, 0,  // 5 = 100
    1, 1,     // 7 high bits
    [0, 0]    // False: 5 is NOT > 7
  ],
  GreaterThanFiveAndEight: [
    1, 0, 0,  // 5 = 100
    1, 1,     // 8 high bits
    [1, 0]    // False: 5 is NOT > 8
  ],

  // Display 6 > N (N = 1-8)
  GreaterThanSixAndOne: [
    1, 0, 1,  // 6 = 101
    0, 0,     // 1 high bits
    [0, 1]    // True: 6 > 1
  ],
  GreaterThanSixAndTwo: [
    1, 0, 1,  // 6 = 101
    0, 0,     // 2 high bits
    [1, 1]    // True: 6 > 2
  ],
  GreaterThanSixAndThree: [
    1, 0, 1,  // 6 = 101
    0, 1,     // 3 high bits
    [0, 1]    // True: 6 > 3
  ],
  GreaterThanSixAndFour: [
    1, 0, 1,  // 6 = 101
    0, 1,     // 4 high bits
    [1, 1]    // True: 6 > 4
  ],
  GreaterThanSixAndFive: [
    1, 0, 1,  // 6 = 101
    1, 0,     // 5 high bits
    [0, 1]    // True: 6 > 5
  ],
  GreaterThanSixAndSix: [
    1, 0, 1,  // 6 = 101
    1, 0,     // 6 high bits
    [1, 0]    // False: 6 is NOT > 6
  ],
  GreaterThanSixAndSeven: [
    1, 0, 1,  // 6 = 101
    1, 1,     // 7 high bits
    [0, 0]    // False: 6 is NOT > 7
  ],
  GreaterThanSixAndEight: [
    1, 0, 1,  // 6 = 101
    1, 1,     // 8 high bits
    [1, 0]    // False: 6 is NOT > 8
  ],

  // Display 7 > N (N = 1-8)
  GreaterThanSevenAndOne: [
    1, 1, 0,  // 7 = 110
    0, 0,     // 1 high bits
    [0, 1]    // True: 7 > 1
  ],
  GreaterThanSevenAndTwo: [
    1, 1, 0,  // 7 = 110
    0, 0,     // 2 high bits
    [1, 1]    // True: 7 > 2
  ],
  GreaterThanSevenAndThree: [
    1, 1, 0,  // 7 = 110
    0, 1,     // 3 high bits
    [0, 1]    // True: 7 > 3
  ],
  GreaterThanSevenAndFour: [
    1, 1, 0,  // 7 = 110
    0, 1,     // 4 high bits
    [1, 1]    // True: 7 > 4
  ],
  GreaterThanSevenAndFive: [
    1, 1, 0,  // 7 = 110
    1, 0,     // 5 high bits
    [0, 1]    // True: 7 > 5
  ],
  GreaterThanSevenAndSix: [
    1, 1, 0,  // 7 = 110
    1, 0,     // 6 high bits
    [1, 1]    // True: 7 > 6
  ],
  GreaterThanSevenAndSeven: [
    1, 1, 0,  // 7 = 110
    1, 1,     // 7 high bits
    [0, 0]    // False: 7 is NOT > 7
  ],
  GreaterThanSevenAndEight: [
    1, 1, 0,  // 7 = 110
    1, 1,     // 8 high bits
    [1, 0]    // False: 7 is NOT > 8
  ],

  // Display 8 > N (N = 1-8)
  // 8 is largest, so 8 > X is True except when X = 8
  GreaterThanEightAndOne: [
    1, 1, 1,  // 8 = 111
    0, 0,     // 1 high bits
    [0, 1]    // True: 8 > 1
  ],
  GreaterThanEightAndTwo: [
    1, 1, 1,  // 8 = 111
    0, 0,     // 2 high bits
    [1, 1]    // True: 8 > 2
  ],
  GreaterThanEightAndThree: [
    1, 1, 1,  // 8 = 111
    0, 1,     // 3 high bits
    [0, 1]    // True: 8 > 3
  ],
  GreaterThanEightAndFour: [
    1, 1, 1,  // 8 = 111
    0, 1,     // 4 high bits
    [1, 1]    // True: 8 > 4
  ],
  GreaterThanEightAndFive: [
    1, 1, 1,  // 8 = 111
    1, 0,     // 5 high bits
    [0, 1]    // True: 8 > 5
  ],
  GreaterThanEightAndSix: [
    1, 1, 1,  // 8 = 111
    1, 0,     // 6 high bits
    [1, 1]    // True: 8 > 6
  ],
  GreaterThanEightAndSeven: [
    1, 1, 1,  // 8 = 111
    1, 1,     // 7 high bits
    [0, 1]    // True: 8 > 7
  ],
  GreaterThanEightAndEight: [
    1, 1, 1,  // 8 = 111
    1, 1,     // 8 high bits
    [1, 0]    // False: 8 is NOT > 8
  ],
};
