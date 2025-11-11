/**
 * GENERATED - Shifted Greater Than Comparison Spool - Column 0 Logical Operations
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
 *
 * 7D MANIFOLD TOPOLOGY:
 * The tuple's first index is the final bit for 6D array inference,
 * with the tuple itself creating the 7th dimension.
 * This prevents Shor factorization attacks during multiplication.
 */

import { getShiftedBitRotation } from '../terminology';

type SomeSeries = Record<string, ((number)[] | number)[]>;

export const ShiftedGreaterThanSeries: SomeSeries = {
  // Display 0 [0,0,1] > N (N = 0-7)
  // Display 0 is MINIMUM (Marquee), so 0 > X is always False
  ShiftedGreaterThanZeroAndZero: (() => {
    const x = getShiftedBitRotation(0);  // Display 0 = [0,0,1] (Marquee)
    const y = getShiftedBitRotation(0);  // Display 0 = [0,0,1] (Marquee)
    return [x[0], x[1], x[2], y[0], y[1], [y[2], 0]];  // False: 0 is NOT > 0
  })(),

  ShiftedGreaterThanZeroAndOne: (() => {
    const x = getShiftedBitRotation(0);  // Display 0 = [0,0,1]
    const y = getShiftedBitRotation(1);  // Display 1 = [0,1,0]
    return [x[0], x[1], x[2], y[0], y[1], [y[2], 0]];  // False: 0 is NOT > 1
  })(),

  ShiftedGreaterThanZeroAndTwo: (() => {
    const x = getShiftedBitRotation(0);  // Display 0 = [0,0,1]
    const y = getShiftedBitRotation(2);  // Display 2 = [0,1,1]
    return [x[0], x[1], x[2], y[0], y[1], [y[2], 0]];  // False: 0 is NOT > 2
  })(),

  ShiftedGreaterThanZeroAndThree: (() => {
    const x = getShiftedBitRotation(0);  // Display 0 = [0,0,1]
    const y = getShiftedBitRotation(3);  // Display 3 = [1,0,0]
    return [x[0], x[1], x[2], y[0], y[1], [y[2], 0]];  // False: 0 is NOT > 3
  })(),

  ShiftedGreaterThanZeroAndFour: (() => {
    const x = getShiftedBitRotation(0);  // Display 0 = [0,0,1]
    const y = getShiftedBitRotation(4);  // Display 4 = [1,0,1]
    return [x[0], x[1], x[2], y[0], y[1], [y[2], 0]];  // False: 0 is NOT > 4
  })(),

  ShiftedGreaterThanZeroAndFive: (() => {
    const x = getShiftedBitRotation(0);  // Display 0 = [0,0,1]
    const y = getShiftedBitRotation(5);  // Display 5 = [1,1,0]
    return [x[0], x[1], x[2], y[0], y[1], [y[2], 0]];  // False: 0 is NOT > 5
  })(),

  ShiftedGreaterThanZeroAndSix: (() => {
    const x = getShiftedBitRotation(0);  // Display 0 = [0,0,1]
    const y = getShiftedBitRotation(6);  // Display 6 = [1,1,1]
    return [x[0], x[1], x[2], y[0], y[1], [y[2], 0]];  // False: 0 is NOT > 6
  })(),

  ShiftedGreaterThanZeroAndSeven: (() => {
    const x = getShiftedBitRotation(0);  // Display 0 = [0,0,1]
    const y = getShiftedBitRotation(7);  // Display 7 = [0,0,0] (Full Twist)
    return [x[0], x[1], x[2], y[0], y[1], [y[2], 0]];  // False: 0 is NOT > 7 (Marquee < Full Twist)
  })(),

  // Display 1 [0,1,0] > N (N = 0-7)
  ShiftedGreaterThanOneAndZero: (() => {
    const x = getShiftedBitRotation(1);  // Display 1 = [0,1,0]
    const y = getShiftedBitRotation(0);  // Display 0 = [0,0,1]
    return [x[0], x[1], x[2], y[0], y[1], [y[2], 1]];  // True: 1 > 0
  })(),

  ShiftedGreaterThanOneAndOne: (() => {
    const x = getShiftedBitRotation(1);  // Display 1 = [0,1,0]
    const y = getShiftedBitRotation(1);  // Display 1 = [0,1,0]
    return [x[0], x[1], x[2], y[0], y[1], [y[2], 0]];  // False: 1 is NOT > 1
  })(),

  ShiftedGreaterThanOneAndTwo: (() => {
    const x = getShiftedBitRotation(1);  // Display 1 = [0,1,0]
    const y = getShiftedBitRotation(2);  // Display 2 = [0,1,1]
    return [x[0], x[1], x[2], y[0], y[1], [y[2], 0]];  // False: 1 is NOT > 2
  })(),

  ShiftedGreaterThanOneAndThree: (() => {
    const x = getShiftedBitRotation(1);  // Display 1 = [0,1,0]
    const y = getShiftedBitRotation(3);  // Display 3 = [1,0,0]
    return [x[0], x[1], x[2], y[0], y[1], [y[2], 0]];  // False: 1 is NOT > 3
  })(),

  ShiftedGreaterThanOneAndFour: (() => {
    const x = getShiftedBitRotation(1);  // Display 1 = [0,1,0]
    const y = getShiftedBitRotation(4);  // Display 4 = [1,0,1]
    return [x[0], x[1], x[2], y[0], y[1], [y[2], 0]];  // False: 1 is NOT > 4
  })(),

  ShiftedGreaterThanOneAndFive: (() => {
    const x = getShiftedBitRotation(1);  // Display 1 = [0,1,0]
    const y = getShiftedBitRotation(5);  // Display 5 = [1,1,0]
    return [x[0], x[1], x[2], y[0], y[1], [y[2], 0]];  // False: 1 is NOT > 5
  })(),

  ShiftedGreaterThanOneAndSix: (() => {
    const x = getShiftedBitRotation(1);  // Display 1 = [0,1,0]
    const y = getShiftedBitRotation(6);  // Display 6 = [1,1,1]
    return [x[0], x[1], x[2], y[0], y[1], [y[2], 0]];  // False: 1 is NOT > 6
  })(),

  ShiftedGreaterThanOneAndSeven: (() => {
    const x = getShiftedBitRotation(1);  // Display 1 = [0,1,0]
    const y = getShiftedBitRotation(7);  // Display 7 = [0,0,0]
    return [x[0], x[1], x[2], y[0], y[1], [y[2], 0]];  // False: 1 is NOT > 7 (Full Twist is maximum)
  })(),

  // Display 2 [0,1,1] > N (N = 0-7)
  ShiftedGreaterThanTwoAndZero: (() => {
    const x = getShiftedBitRotation(2);  // Display 2 = [0,1,1]
    const y = getShiftedBitRotation(0);  // Display 0 = [0,0,1]
    return [x[0], x[1], x[2], y[0], y[1], [y[2], 1]];  // True: 2 > 0
  })(),

  ShiftedGreaterThanTwoAndOne: (() => {
    const x = getShiftedBitRotation(2);  // Display 2 = [0,1,1]
    const y = getShiftedBitRotation(1);  // Display 1 = [0,1,0]
    return [x[0], x[1], x[2], y[0], y[1], [y[2], 1]];  // True: 2 > 1
  })(),

  ShiftedGreaterThanTwoAndTwo: (() => {
    const x = getShiftedBitRotation(2);  // Display 2 = [0,1,1]
    const y = getShiftedBitRotation(2);  // Display 2 = [0,1,1]
    return [x[0], x[1], x[2], y[0], y[1], [y[2], 0]];  // False: 2 is NOT > 2
  })(),

  ShiftedGreaterThanTwoAndThree: (() => {
    const x = getShiftedBitRotation(2);  // Display 2 = [0,1,1]
    const y = getShiftedBitRotation(3);  // Display 3 = [1,0,0]
    return [x[0], x[1], x[2], y[0], y[1], [y[2], 0]];  // False: 2 is NOT > 3
  })(),

  ShiftedGreaterThanTwoAndFour: (() => {
    const x = getShiftedBitRotation(2);  // Display 2 = [0,1,1]
    const y = getShiftedBitRotation(4);  // Display 4 = [1,0,1]
    return [x[0], x[1], x[2], y[0], y[1], [y[2], 0]];  // False: 2 is NOT > 4
  })(),

  ShiftedGreaterThanTwoAndFive: (() => {
    const x = getShiftedBitRotation(2);  // Display 2 = [0,1,1]
    const y = getShiftedBitRotation(5);  // Display 5 = [1,1,0]
    return [x[0], x[1], x[2], y[0], y[1], [y[2], 0]];  // False: 2 is NOT > 5
  })(),

  ShiftedGreaterThanTwoAndSix: (() => {
    const x = getShiftedBitRotation(2);  // Display 2 = [0,1,1]
    const y = getShiftedBitRotation(6);  // Display 6 = [1,1,1]
    return [x[0], x[1], x[2], y[0], y[1], [y[2], 0]];  // False: 2 is NOT > 6
  })(),

  ShiftedGreaterThanTwoAndSeven: (() => {
    const x = getShiftedBitRotation(2);  // Display 2 = [0,1,1]
    const y = getShiftedBitRotation(7);  // Display 7 = [0,0,0]
    return [x[0], x[1], x[2], y[0], y[1], [y[2], 0]];  // False: 2 is NOT > 7 (Full Twist is maximum)
  })(),

  // Display 3 [1,0,0] > N (N = 0-7)
  ShiftedGreaterThanThreeAndZero: (() => {
    const x = getShiftedBitRotation(3);  // Display 3 = [1,0,0]
    const y = getShiftedBitRotation(0);  // Display 0 = [0,0,1]
    return [x[0], x[1], x[2], y[0], y[1], [y[2], 1]];  // True: 3 > 0
  })(),

  ShiftedGreaterThanThreeAndOne: (() => {
    const x = getShiftedBitRotation(3);  // Display 3 = [1,0,0]
    const y = getShiftedBitRotation(1);  // Display 1 = [0,1,0]
    return [x[0], x[1], x[2], y[0], y[1], [y[2], 1]];  // True: 3 > 1
  })(),

  ShiftedGreaterThanThreeAndTwo: (() => {
    const x = getShiftedBitRotation(3);  // Display 3 = [1,0,0]
    const y = getShiftedBitRotation(2);  // Display 2 = [0,1,1]
    return [x[0], x[1], x[2], y[0], y[1], [y[2], 1]];  // True: 3 > 2
  })(),

  ShiftedGreaterThanThreeAndThree: (() => {
    const x = getShiftedBitRotation(3);  // Display 3 = [1,0,0]
    const y = getShiftedBitRotation(3);  // Display 3 = [1,0,0]
    return [x[0], x[1], x[2], y[0], y[1], [y[2], 0]];  // False: 3 is NOT > 3
  })(),

  ShiftedGreaterThanThreeAndFour: (() => {
    const x = getShiftedBitRotation(3);  // Display 3 = [1,0,0]
    const y = getShiftedBitRotation(4);  // Display 4 = [1,0,1]
    return [x[0], x[1], x[2], y[0], y[1], [y[2], 0]];  // False: 3 is NOT > 4
  })(),

  ShiftedGreaterThanThreeAndFive: (() => {
    const x = getShiftedBitRotation(3);  // Display 3 = [1,0,0]
    const y = getShiftedBitRotation(5);  // Display 5 = [1,1,0]
    return [x[0], x[1], x[2], y[0], y[1], [y[2], 0]];  // False: 3 is NOT > 5
  })(),

  ShiftedGreaterThanThreeAndSix: (() => {
    const x = getShiftedBitRotation(3);  // Display 3 = [1,0,0]
    const y = getShiftedBitRotation(6);  // Display 6 = [1,1,1]
    return [x[0], x[1], x[2], y[0], y[1], [y[2], 0]];  // False: 3 is NOT > 6
  })(),

  ShiftedGreaterThanThreeAndSeven: (() => {
    const x = getShiftedBitRotation(3);  // Display 3 = [1,0,0]
    const y = getShiftedBitRotation(7);  // Display 7 = [0,0,0]
    return [x[0], x[1], x[2], y[0], y[1], [y[2], 0]];  // False: 3 is NOT > 7 (Full Twist is maximum)
  })(),

  // Display 4 [1,0,1] > N (N = 0-7)
  ShiftedGreaterThanFourAndZero: (() => {
    const x = getShiftedBitRotation(4);  // Display 4 = [1,0,1]
    const y = getShiftedBitRotation(0);  // Display 0 = [0,0,1]
    return [x[0], x[1], x[2], y[0], y[1], [y[2], 1]];  // True: 4 > 0
  })(),

  ShiftedGreaterThanFourAndOne: (() => {
    const x = getShiftedBitRotation(4);  // Display 4 = [1,0,1]
    const y = getShiftedBitRotation(1);  // Display 1 = [0,1,0]
    return [x[0], x[1], x[2], y[0], y[1], [y[2], 1]];  // True: 4 > 1
  })(),

  ShiftedGreaterThanFourAndTwo: (() => {
    const x = getShiftedBitRotation(4);  // Display 4 = [1,0,1]
    const y = getShiftedBitRotation(2);  // Display 2 = [0,1,1]
    return [x[0], x[1], x[2], y[0], y[1], [y[2], 1]];  // True: 4 > 2
  })(),

  ShiftedGreaterThanFourAndThree: (() => {
    const x = getShiftedBitRotation(4);  // Display 4 = [1,0,1]
    const y = getShiftedBitRotation(3);  // Display 3 = [1,0,0]
    return [x[0], x[1], x[2], y[0], y[1], [y[2], 1]];  // True: 4 > 3
  })(),

  ShiftedGreaterThanFourAndFour: (() => {
    const x = getShiftedBitRotation(4);  // Display 4 = [1,0,1]
    const y = getShiftedBitRotation(4);  // Display 4 = [1,0,1]
    return [x[0], x[1], x[2], y[0], y[1], [y[2], 0]];  // False: 4 is NOT > 4
  })(),

  ShiftedGreaterThanFourAndFive: (() => {
    const x = getShiftedBitRotation(4);  // Display 4 = [1,0,1]
    const y = getShiftedBitRotation(5);  // Display 5 = [1,1,0]
    return [x[0], x[1], x[2], y[0], y[1], [y[2], 0]];  // False: 4 is NOT > 5
  })(),

  ShiftedGreaterThanFourAndSix: (() => {
    const x = getShiftedBitRotation(4);  // Display 4 = [1,0,1]
    const y = getShiftedBitRotation(6);  // Display 6 = [1,1,1]
    return [x[0], x[1], x[2], y[0], y[1], [y[2], 0]];  // False: 4 is NOT > 6
  })(),

  ShiftedGreaterThanFourAndSeven: (() => {
    const x = getShiftedBitRotation(4);  // Display 4 = [1,0,1]
    const y = getShiftedBitRotation(7);  // Display 7 = [0,0,0]
    return [x[0], x[1], x[2], y[0], y[1], [y[2], 0]];  // False: 4 is NOT > 7 (Full Twist is maximum)
  })(),

  // Display 5 [1,1,0] > N (N = 0-7)
  ShiftedGreaterThanFiveAndZero: (() => {
    const x = getShiftedBitRotation(5);  // Display 5 = [1,1,0]
    const y = getShiftedBitRotation(0);  // Display 0 = [0,0,1]
    return [x[0], x[1], x[2], y[0], y[1], [y[2], 1]];  // True: 5 > 0
  })(),

  ShiftedGreaterThanFiveAndOne: (() => {
    const x = getShiftedBitRotation(5);  // Display 5 = [1,1,0]
    const y = getShiftedBitRotation(1);  // Display 1 = [0,1,0]
    return [x[0], x[1], x[2], y[0], y[1], [y[2], 1]];  // True: 5 > 1
  })(),

  ShiftedGreaterThanFiveAndTwo: (() => {
    const x = getShiftedBitRotation(5);  // Display 5 = [1,1,0]
    const y = getShiftedBitRotation(2);  // Display 2 = [0,1,1]
    return [x[0], x[1], x[2], y[0], y[1], [y[2], 1]];  // True: 5 > 2
  })(),

  ShiftedGreaterThanFiveAndThree: (() => {
    const x = getShiftedBitRotation(5);  // Display 5 = [1,1,0]
    const y = getShiftedBitRotation(3);  // Display 3 = [1,0,0]
    return [x[0], x[1], x[2], y[0], y[1], [y[2], 1]];  // True: 5 > 3
  })(),

  ShiftedGreaterThanFiveAndFour: (() => {
    const x = getShiftedBitRotation(5);  // Display 5 = [1,1,0]
    const y = getShiftedBitRotation(4);  // Display 4 = [1,0,1]
    return [x[0], x[1], x[2], y[0], y[1], [y[2], 1]];  // True: 5 > 4
  })(),

  ShiftedGreaterThanFiveAndFive: (() => {
    const x = getShiftedBitRotation(5);  // Display 5 = [1,1,0]
    const y = getShiftedBitRotation(5);  // Display 5 = [1,1,0]
    return [x[0], x[1], x[2], y[0], y[1], [y[2], 0]];  // False: 5 is NOT > 5
  })(),

  ShiftedGreaterThanFiveAndSix: (() => {
    const x = getShiftedBitRotation(5);  // Display 5 = [1,1,0]
    const y = getShiftedBitRotation(6);  // Display 6 = [1,1,1]
    return [x[0], x[1], x[2], y[0], y[1], [y[2], 0]];  // False: 5 is NOT > 6
  })(),

  ShiftedGreaterThanFiveAndSeven: (() => {
    const x = getShiftedBitRotation(5);  // Display 5 = [1,1,0]
    const y = getShiftedBitRotation(7);  // Display 7 = [0,0,0]
    return [x[0], x[1], x[2], y[0], y[1], [y[2], 0]];  // False: 5 is NOT > 7 (Full Twist is maximum)
  })(),

  // Display 6 [1,1,1] > N (N = 0-7)
  ShiftedGreaterThanSixAndZero: (() => {
    const x = getShiftedBitRotation(6);  // Display 6 = [1,1,1]
    const y = getShiftedBitRotation(0);  // Display 0 = [0,0,1]
    return [x[0], x[1], x[2], y[0], y[1], [y[2], 1]];  // True: 6 > 0
  })(),

  ShiftedGreaterThanSixAndOne: (() => {
    const x = getShiftedBitRotation(6);  // Display 6 = [1,1,1]
    const y = getShiftedBitRotation(1);  // Display 1 = [0,1,0]
    return [x[0], x[1], x[2], y[0], y[1], [y[2], 1]];  // True: 6 > 1
  })(),

  ShiftedGreaterThanSixAndTwo: (() => {
    const x = getShiftedBitRotation(6);  // Display 6 = [1,1,1]
    const y = getShiftedBitRotation(2);  // Display 2 = [0,1,1]
    return [x[0], x[1], x[2], y[0], y[1], [y[2], 1]];  // True: 6 > 2
  })(),

  ShiftedGreaterThanSixAndThree: (() => {
    const x = getShiftedBitRotation(6);  // Display 6 = [1,1,1]
    const y = getShiftedBitRotation(3);  // Display 3 = [1,0,0]
    return [x[0], x[1], x[2], y[0], y[1], [y[2], 1]];  // True: 6 > 3
  })(),

  ShiftedGreaterThanSixAndFour: (() => {
    const x = getShiftedBitRotation(6);  // Display 6 = [1,1,1]
    const y = getShiftedBitRotation(4);  // Display 4 = [1,0,1]
    return [x[0], x[1], x[2], y[0], y[1], [y[2], 1]];  // True: 6 > 4
  })(),

  ShiftedGreaterThanSixAndFive: (() => {
    const x = getShiftedBitRotation(6);  // Display 6 = [1,1,1]
    const y = getShiftedBitRotation(5);  // Display 5 = [1,1,0]
    return [x[0], x[1], x[2], y[0], y[1], [y[2], 1]];  // True: 6 > 5
  })(),

  ShiftedGreaterThanSixAndSix: (() => {
    const x = getShiftedBitRotation(6);  // Display 6 = [1,1,1]
    const y = getShiftedBitRotation(6);  // Display 6 = [1,1,1]
    return [x[0], x[1], x[2], y[0], y[1], [y[2], 0]];  // False: 6 is NOT > 6
  })(),

  ShiftedGreaterThanSixAndSeven: (() => {
    const x = getShiftedBitRotation(6);  // Display 6 = [1,1,1]
    const y = getShiftedBitRotation(7);  // Display 7 = [0,0,0]
    return [x[0], x[1], x[2], y[0], y[1], [y[2], 0]];  // False: 6 is NOT > 7 (Full Twist is maximum)
  })(),

  // Display 7 [0,0,0] > N (N = 0-7)
  // Display 7 is MAXIMUM (Full Twist), so 7 > X is True except when X = 7
  ShiftedGreaterThanSevenAndZero: (() => {
    const x = getShiftedBitRotation(7);  // Display 7 = [0,0,0] (Full Twist - MAXIMUM)
    const y = getShiftedBitRotation(0);  // Display 0 = [0,0,1] (Marquee)
    return [x[0], x[1], x[2], y[0], y[1], [y[2], 1]];  // True: 7 > 0 (Full Twist > Marquee)
  })(),

  ShiftedGreaterThanSevenAndOne: (() => {
    const x = getShiftedBitRotation(7);  // Display 7 = [0,0,0]
    const y = getShiftedBitRotation(1);  // Display 1 = [0,1,0]
    return [x[0], x[1], x[2], y[0], y[1], [y[2], 1]];  // True: 7 > 1
  })(),

  ShiftedGreaterThanSevenAndTwo: (() => {
    const x = getShiftedBitRotation(7);  // Display 7 = [0,0,0]
    const y = getShiftedBitRotation(2);  // Display 2 = [0,1,1]
    return [x[0], x[1], x[2], y[0], y[1], [y[2], 1]];  // True: 7 > 2
  })(),

  ShiftedGreaterThanSevenAndThree: (() => {
    const x = getShiftedBitRotation(7);  // Display 7 = [0,0,0]
    const y = getShiftedBitRotation(3);  // Display 3 = [1,0,0]
    return [x[0], x[1], x[2], y[0], y[1], [y[2], 1]];  // True: 7 > 3
  })(),

  ShiftedGreaterThanSevenAndFour: (() => {
    const x = getShiftedBitRotation(7);  // Display 7 = [0,0,0]
    const y = getShiftedBitRotation(4);  // Display 4 = [1,0,1]
    return [x[0], x[1], x[2], y[0], y[1], [y[2], 1]];  // True: 7 > 4
  })(),

  ShiftedGreaterThanSevenAndFive: (() => {
    const x = getShiftedBitRotation(7);  // Display 7 = [0,0,0]
    const y = getShiftedBitRotation(5);  // Display 5 = [1,1,0]
    return [x[0], x[1], x[2], y[0], y[1], [y[2], 1]];  // True: 7 > 5
  })(),

  ShiftedGreaterThanSevenAndSix: (() => {
    const x = getShiftedBitRotation(7);  // Display 7 = [0,0,0]
    const y = getShiftedBitRotation(6);  // Display 6 = [1,1,1]
    return [x[0], x[1], x[2], y[0], y[1], [y[2], 1]];  // True: 7 > 6 (Full Twist > all others)
  })(),

  ShiftedGreaterThanSevenAndSeven: (() => {
    const x = getShiftedBitRotation(7);  // Display 7 = [0,0,0]
    const y = getShiftedBitRotation(7);  // Display 7 = [0,0,0]
    return [x[0], x[1], x[2], y[0], y[1], [y[2], 0]];  // False: 7 is NOT > 7
  })(),
};

export const ShiftedSpooledGreaterThanSeries = () => ShiftedGreaterThanSeries;
