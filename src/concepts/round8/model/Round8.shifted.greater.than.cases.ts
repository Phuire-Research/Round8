/**
 * Shifted Greater Than Comparison Spool - Column 0 Logical Operations
 *
 * SHIFTED TOPOLOGY COMPARISON SPOOL: X > Y for Column 0 (Displays 0-7)
 *
 * This spool uses SHIFTED TOPOLOGY ordering where Display 7 [0,0,0] is MAXIMUM (Full Twist)
 * and Display 0 [0,0,1] is MINIMUM (Marquee position).
 *
 * Shifted Ordering: 001 < 010 < 011 < 100 < 101 < 110 < 111 < 000
 *                   (0)   (1)   (2)   (3)   (4)   (5)   (6)   (7)
 *
 * Ground Truth Comparisons (Round8 Shifted Column 0 Displays 0-7):
 * - Display 0 [0,0,1] = Marquee position (MINIMUM, represents zero display)
 * - Display 1 [0,1,0] = Position 2
 * - Display 2 [0,1,1] = Position 3
 * - Display 3 [1,0,0] = Position 4
 * - Display 4 [1,0,1] = Position 5
 * - Display 5 [1,1,0] = Position 6
 * - Display 6 [1,1,1] = Position 7
 * - Display 7 [0,0,0] = Full Twist position (MAXIMUM, overflow trim placeholder)
 *
 * Architectural Context:
 * - Column 0 uses shifted topology due to 64-bit buffer constraints
 * - No room for marquee beyond position 1 in 64-bit architecture
 * - Full Twist [0,0,0] trims overflow, intentional design not error
 *
 * Result Structure:
 * - [0, 0] = False (X is NOT greater than Y in shifted topology)
 * - [1, 1] = True (X IS greater than Y in shifted topology)
 *
 * Pattern: ShiftedGreaterThan[DisplayX]And[DisplayY] represents X > Y
 * Array structure: [bit2_X, bit1_X, bit0_X, bit2_Y, bit1_Y, [bit0_Y, boolean_result]]
 */

type SomeSeries = Record<string, ((number)[] | number)[]>;

export const ShiftedGreaterThanSeries: SomeSeries = {
  // Display 0 [0,0,1] > N (N = 0-7)
  // Display 0 is MINIMUM (Marquee), so 0 > X is always False
  ShiftedGreaterThanZeroAndZero: [
    0, 0, 1,  // Display 0 = [0,0,1] (Marquee)
    0, 0,     // Display 0 high bits
    [1, 0]    // False: 0 is NOT > 0
  ],
  ShiftedGreaterThanZeroAndOne: [
    0, 0, 1,  // Display 0 = [0,0,1]
    0, 1,     // Display 1 high bits
    [0, 0]    // False: 0 is NOT > 1
  ],
  ShiftedGreaterThanZeroAndTwo: [
    0, 0, 1,  // Display 0 = [0,0,1]
    0, 1,     // Display 2 high bits
    [1, 0]    // False: 0 is NOT > 2
  ],
  ShiftedGreaterThanZeroAndThree: [
    0, 0, 1,  // Display 0 = [0,0,1]
    1, 0,     // Display 3 high bits
    [0, 0]    // False: 0 is NOT > 3
  ],
  ShiftedGreaterThanZeroAndFour: [
    0, 0, 1,  // Display 0 = [0,0,1]
    1, 0,     // Display 4 high bits
    [1, 0]    // False: 0 is NOT > 4
  ],
  ShiftedGreaterThanZeroAndFive: [
    0, 0, 1,  // Display 0 = [0,0,1]
    1, 1,     // Display 5 high bits
    [0, 0]    // False: 0 is NOT > 5
  ],
  ShiftedGreaterThanZeroAndSix: [
    0, 0, 1,  // Display 0 = [0,0,1]
    1, 1,     // Display 6 high bits
    [1, 0]    // False: 0 is NOT > 6
  ],
  ShiftedGreaterThanZeroAndSeven: [
    0, 0, 1,  // Display 0 = [0,0,1]
    0, 0,     // Display 7 high bits
    [0, 0]    // False: 0 is NOT > 7 (Marquee < Full Twist)
  ],

  // Display 1 [0,1,0] > N (N = 0-7)
  ShiftedGreaterThanOneAndZero: [
    0, 1, 0,  // Display 1 = [0,1,0]
    0, 0,     // Display 0 high bits
    [1, 1]    // True: 1 > 0
  ],
  ShiftedGreaterThanOneAndOne: [
    0, 1, 0,  // Display 1 = [0,1,0]
    0, 1,     // Display 1 high bits
    [0, 0]    // False: 1 is NOT > 1
  ],
  ShiftedGreaterThanOneAndTwo: [
    0, 1, 0,  // Display 1 = [0,1,0]
    0, 1,     // Display 2 high bits
    [1, 0]    // False: 1 is NOT > 2
  ],
  ShiftedGreaterThanOneAndThree: [
    0, 1, 0,  // Display 1 = [0,1,0]
    1, 0,     // Display 3 high bits
    [0, 0]    // False: 1 is NOT > 3
  ],
  ShiftedGreaterThanOneAndFour: [
    0, 1, 0,  // Display 1 = [0,1,0]
    1, 0,     // Display 4 high bits
    [1, 0]    // False: 1 is NOT > 4
  ],
  ShiftedGreaterThanOneAndFive: [
    0, 1, 0,  // Display 1 = [0,1,0]
    1, 1,     // Display 5 high bits
    [0, 0]    // False: 1 is NOT > 5
  ],
  ShiftedGreaterThanOneAndSix: [
    0, 1, 0,  // Display 1 = [0,1,0]
    1, 1,     // Display 6 high bits
    [1, 0]    // False: 1 is NOT > 6
  ],
  ShiftedGreaterThanOneAndSeven: [
    0, 1, 0,  // Display 1 = [0,1,0]
    0, 0,     // Display 7 high bits
    [0, 0]    // False: 1 is NOT > 7 (Full Twist is maximum)
  ],

  // Display 2 [0,1,1] > N (N = 0-7)
  ShiftedGreaterThanTwoAndZero: [
    0, 1, 1,  // Display 2 = [0,1,1]
    0, 0,     // Display 0 high bits
    [1, 1]    // True: 2 > 0
  ],
  ShiftedGreaterThanTwoAndOne: [
    0, 1, 1,  // Display 2 = [0,1,1]
    0, 1,     // Display 1 high bits
    [0, 1]    // True: 2 > 1
  ],
  ShiftedGreaterThanTwoAndTwo: [
    0, 1, 1,  // Display 2 = [0,1,1]
    0, 1,     // Display 2 high bits
    [1, 0]    // False: 2 is NOT > 2
  ],
  ShiftedGreaterThanTwoAndThree: [
    0, 1, 1,  // Display 2 = [0,1,1]
    1, 0,     // Display 3 high bits
    [0, 0]    // False: 2 is NOT > 3
  ],
  ShiftedGreaterThanTwoAndFour: [
    0, 1, 1,  // Display 2 = [0,1,1]
    1, 0,     // Display 4 high bits
    [1, 0]    // False: 2 is NOT > 4
  ],
  ShiftedGreaterThanTwoAndFive: [
    0, 1, 1,  // Display 2 = [0,1,1]
    1, 1,     // Display 5 high bits
    [0, 0]    // False: 2 is NOT > 5
  ],
  ShiftedGreaterThanTwoAndSix: [
    0, 1, 1,  // Display 2 = [0,1,1]
    1, 1,     // Display 6 high bits
    [1, 0]    // False: 2 is NOT > 6
  ],
  ShiftedGreaterThanTwoAndSeven: [
    0, 1, 1,  // Display 2 = [0,1,1]
    0, 0,     // Display 7 high bits
    [0, 0]    // False: 2 is NOT > 7 (Full Twist is maximum)
  ],

  // Display 3 [1,0,0] > N (N = 0-7)
  ShiftedGreaterThanThreeAndZero: [
    1, 0, 0,  // Display 3 = [1,0,0]
    0, 0,     // Display 0 high bits
    [1, 1]    // True: 3 > 0
  ],
  ShiftedGreaterThanThreeAndOne: [
    1, 0, 0,  // Display 3 = [1,0,0]
    0, 1,     // Display 1 high bits
    [0, 1]    // True: 3 > 1
  ],
  ShiftedGreaterThanThreeAndTwo: [
    1, 0, 0,  // Display 3 = [1,0,0]
    0, 1,     // Display 2 high bits
    [1, 1]    // True: 3 > 2
  ],
  ShiftedGreaterThanThreeAndThree: [
    1, 0, 0,  // Display 3 = [1,0,0]
    1, 0,     // Display 3 high bits
    [0, 0]    // False: 3 is NOT > 3
  ],
  ShiftedGreaterThanThreeAndFour: [
    1, 0, 0,  // Display 3 = [1,0,0]
    1, 0,     // Display 4 high bits
    [1, 0]    // False: 3 is NOT > 4
  ],
  ShiftedGreaterThanThreeAndFive: [
    1, 0, 0,  // Display 3 = [1,0,0]
    1, 1,     // Display 5 high bits
    [0, 0]    // False: 3 is NOT > 5
  ],
  ShiftedGreaterThanThreeAndSix: [
    1, 0, 0,  // Display 3 = [1,0,0]
    1, 1,     // Display 6 high bits
    [1, 0]    // False: 3 is NOT > 6
  ],
  ShiftedGreaterThanThreeAndSeven: [
    1, 0, 0,  // Display 3 = [1,0,0]
    0, 0,     // Display 7 high bits
    [0, 0]    // False: 3 is NOT > 7 (Full Twist is maximum)
  ],

  // Display 4 [1,0,1] > N (N = 0-7)
  ShiftedGreaterThanFourAndZero: [
    1, 0, 1,  // Display 4 = [1,0,1]
    0, 0,     // Display 0 high bits
    [1, 1]    // True: 4 > 0
  ],
  ShiftedGreaterThanFourAndOne: [
    1, 0, 1,  // Display 4 = [1,0,1]
    0, 1,     // Display 1 high bits
    [0, 1]    // True: 4 > 1
  ],
  ShiftedGreaterThanFourAndTwo: [
    1, 0, 1,  // Display 4 = [1,0,1]
    0, 1,     // Display 2 high bits
    [1, 1]    // True: 4 > 2
  ],
  ShiftedGreaterThanFourAndThree: [
    1, 0, 1,  // Display 4 = [1,0,1]
    1, 0,     // Display 3 high bits
    [0, 1]    // True: 4 > 3
  ],
  ShiftedGreaterThanFourAndFour: [
    1, 0, 1,  // Display 4 = [1,0,1]
    1, 0,     // Display 4 high bits
    [1, 0]    // False: 4 is NOT > 4
  ],
  ShiftedGreaterThanFourAndFive: [
    1, 0, 1,  // Display 4 = [1,0,1]
    1, 1,     // Display 5 high bits
    [0, 0]    // False: 4 is NOT > 5
  ],
  ShiftedGreaterThanFourAndSix: [
    1, 0, 1,  // Display 4 = [1,0,1]
    1, 1,     // Display 6 high bits
    [1, 0]    // False: 4 is NOT > 6
  ],
  ShiftedGreaterThanFourAndSeven: [
    1, 0, 1,  // Display 4 = [1,0,1]
    0, 0,     // Display 7 high bits
    [0, 0]    // False: 4 is NOT > 7 (Full Twist is maximum)
  ],

  // Display 5 [1,1,0] > N (N = 0-7)
  ShiftedGreaterThanFiveAndZero: [
    1, 1, 0,  // Display 5 = [1,1,0]
    0, 0,     // Display 0 high bits
    [1, 1]    // True: 5 > 0
  ],
  ShiftedGreaterThanFiveAndOne: [
    1, 1, 0,  // Display 5 = [1,1,0]
    0, 1,     // Display 1 high bits
    [0, 1]    // True: 5 > 1
  ],
  ShiftedGreaterThanFiveAndTwo: [
    1, 1, 0,  // Display 5 = [1,1,0]
    0, 1,     // Display 2 high bits
    [1, 1]    // True: 5 > 2
  ],
  ShiftedGreaterThanFiveAndThree: [
    1, 1, 0,  // Display 5 = [1,1,0]
    1, 0,     // Display 3 high bits
    [0, 1]    // True: 5 > 3
  ],
  ShiftedGreaterThanFiveAndFour: [
    1, 1, 0,  // Display 5 = [1,1,0]
    1, 0,     // Display 4 high bits
    [1, 1]    // True: 5 > 4
  ],
  ShiftedGreaterThanFiveAndFive: [
    1, 1, 0,  // Display 5 = [1,1,0]
    1, 1,     // Display 5 high bits
    [0, 0]    // False: 5 is NOT > 5
  ],
  ShiftedGreaterThanFiveAndSix: [
    1, 1, 0,  // Display 5 = [1,1,0]
    1, 1,     // Display 6 high bits
    [1, 0]    // False: 5 is NOT > 6
  ],
  ShiftedGreaterThanFiveAndSeven: [
    1, 1, 0,  // Display 5 = [1,1,0]
    0, 0,     // Display 7 high bits
    [0, 0]    // False: 5 is NOT > 7 (Full Twist is maximum)
  ],

  // Display 6 [1,1,1] > N (N = 0-7)
  ShiftedGreaterThanSixAndZero: [
    1, 1, 1,  // Display 6 = [1,1,1]
    0, 0,     // Display 0 high bits
    [1, 1]    // True: 6 > 0
  ],
  ShiftedGreaterThanSixAndOne: [
    1, 1, 1,  // Display 6 = [1,1,1]
    0, 1,     // Display 1 high bits
    [0, 1]    // True: 6 > 1
  ],
  ShiftedGreaterThanSixAndTwo: [
    1, 1, 1,  // Display 6 = [1,1,1]
    0, 1,     // Display 2 high bits
    [1, 1]    // True: 6 > 2
  ],
  ShiftedGreaterThanSixAndThree: [
    1, 1, 1,  // Display 6 = [1,1,1]
    1, 0,     // Display 3 high bits
    [0, 1]    // True: 6 > 3
  ],
  ShiftedGreaterThanSixAndFour: [
    1, 1, 1,  // Display 6 = [1,1,1]
    1, 0,     // Display 4 high bits
    [1, 1]    // True: 6 > 4
  ],
  ShiftedGreaterThanSixAndFive: [
    1, 1, 1,  // Display 6 = [1,1,1]
    1, 1,     // Display 5 high bits
    [0, 1]    // True: 6 > 5
  ],
  ShiftedGreaterThanSixAndSix: [
    1, 1, 1,  // Display 6 = [1,1,1]
    1, 1,     // Display 6 high bits
    [1, 0]    // False: 6 is NOT > 6
  ],
  ShiftedGreaterThanSixAndSeven: [
    1, 1, 1,  // Display 6 = [1,1,1]
    0, 0,     // Display 7 high bits
    [0, 0]    // False: 6 is NOT > 7 (Full Twist is maximum)
  ],

  // Display 7 [0,0,0] > N (N = 0-7)
  // Display 7 is MAXIMUM (Full Twist), so 7 > X is True except when X = 7
  ShiftedGreaterThanSevenAndZero: [
    0, 0, 0,  // Display 7 = [0,0,0] (Full Twist - MAXIMUM)
    0, 0,     // Display 0 high bits
    [1, 1]    // True: 7 > 0 (Full Twist > Marquee)
  ],
  ShiftedGreaterThanSevenAndOne: [
    0, 0, 0,  // Display 7 = [0,0,0]
    0, 1,     // Display 1 high bits
    [0, 1]    // True: 7 > 1
  ],
  ShiftedGreaterThanSevenAndTwo: [
    0, 0, 0,  // Display 7 = [0,0,0]
    0, 1,     // Display 2 high bits
    [1, 1]    // True: 7 > 2
  ],
  ShiftedGreaterThanSevenAndThree: [
    0, 0, 0,  // Display 7 = [0,0,0]
    1, 0,     // Display 3 high bits
    [0, 1]    // True: 7 > 3
  ],
  ShiftedGreaterThanSevenAndFour: [
    0, 0, 0,  // Display 7 = [0,0,0]
    1, 0,     // Display 4 high bits
    [1, 1]    // True: 7 > 4
  ],
  ShiftedGreaterThanSevenAndFive: [
    0, 0, 0,  // Display 7 = [0,0,0]
    1, 1,     // Display 5 high bits
    [0, 1]    // True: 7 > 5
  ],
  ShiftedGreaterThanSevenAndSix: [
    0, 0, 0,  // Display 7 = [0,0,0]
    1, 1,     // Display 6 high bits
    [1, 1]    // True: 7 > 6 (Full Twist > all others)
  ],
  ShiftedGreaterThanSevenAndSeven: [
    0, 0, 0,  // Display 7 = [0,0,0]
    0, 0,     // Display 7 high bits
    [0, 0]    // False: 7 is NOT > 7
  ],
};

export const ShiftedSpooledGreaterThanSeries = () => ShiftedGreaterThanSeries;
