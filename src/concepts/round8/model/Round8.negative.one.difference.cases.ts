/**
 * Negative One Special Case - Difference Operations
 *
 * SPOOL 4: Some Number Minus Negative One (X - (-1) = X + 1)
 * SPOOL 5: Negative One Minus Some Number ((-1) - X)
 *
 * Pattern: [operandA] - [Negative One column value 111]
 *
 * At column level:
 * - X - (-1) behaves as X + 1 (subtracting negative is addition)
 * - (-1) - X has varying behavior based on X magnitude
 *
 * Cases:
 * SPOOL 4 (X - (-1)):
 * Display 1 [000] - (-1) = Display 2 [001] (increment)
 * Display 7 [110] - (-1) = Display 8 [111]
 * Display 8 [111] - (-1) = Overflow with carry (becomes Display 1 + carry)
 *
 * SPOOL 5 ((-1) - X):
 * (-1) - 1 = -2 (increasing negative magnitude)
 * (-1) - 8 = Borrow case (magnitude wrap)
 * (-1) - (-1) = 0 (double negative cancellation)
 */

type SomeSeries = Record<string, ((Uint8Array<ArrayBuffer> | number)[] | number)[]>;

// Zero case inlined to avoid circular dependency
const ZERO_CASE = Uint8Array.from([
  0,
  0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0,
  0, 0, 0,
]);

export const SomeNumberMinusNegativeOneSeries: SomeSeries = {
  // SPOOL 4: X - (-1) = X + 1 (subtracting negative is addition)

  // Display 1 - (-1) = Display 2 (increment)
  Display1MinusNegativeOne: [
    0, 0, 0,  // Display 1 = 000
    1, 1,     // Negative One high bits [11_]
    [1, new Uint8Array([0, 0, 1])]  // Result: Display 2 [001]
  ],

  // Display 2 - (-1) = Display 3
  Display2MinusNegativeOne: [
    0, 0, 1,  // Display 2 = 001
    1, 1,     // Negative One [11_]
    [0, new Uint8Array([0, 1, 0])]  // Result: Display 3 [010]
  ],

  // Display 3 - (-1) = Display 4
  Display3MinusNegativeOne: [
    0, 1, 0,  // Display 3 = 010
    1, 1,     // Negative One [11_]
    [1, new Uint8Array([0, 1, 1])]  // Result: Display 4 [011]
  ],

  // Display 4 - (-1) = Display 5
  Display4MinusNegativeOne: [
    0, 1, 1,  // Display 4 = 011
    1, 1,     // Negative One [11_]
    [0, new Uint8Array([1, 0, 0])]  // Result: Display 5 [100]
  ],

  // Display 5 - (-1) = Display 6
  Display5MinusNegativeOne: [
    1, 0, 0,  // Display 5 = 100
    1, 1,     // Negative One [11_]
    [1, new Uint8Array([1, 0, 1])]  // Result: Display 6 [101]
  ],

  // Display 6 - (-1) = Display 7
  Display6MinusNegativeOne: [
    1, 0, 1,  // Display 6 = 101
    1, 1,     // Negative One [11_]
    [0, new Uint8Array([1, 1, 0])]  // Result: Display 7 [110]
  ],

  // Display 7 - (-1) = Display 8
  Display7MinusNegativeOne: [
    1, 1, 0,  // Display 7 = 110
    1, 1,     // Negative One [11_]
    [1, new Uint8Array([1, 1, 1])]  // Result: Display 8 [111]
  ],

  // Display 8 - (-1) = Overflow (becomes Display 1 with carry)
  Display8MinusNegativeOne: [
    1, 1, 1,  // Display 8 = 111
    1, 1,     // Negative One [11_]
    [0, new Uint8Array([0, 0, 0]), new Uint8Array([0, 0, 0])]
    // Overflow: Result Display 1 [000] with carry Display 1
  ],
};

export const NegativeOneMinusSomeNumberSeries: SomeSeries = {
  // SPOOL 5: (-1) - X (increasing negative magnitude or borrow cases)

  // (-1) - (-1) = 0 (DOUBLE NEGATIVE CANCELLATION)
  NegativeOneMinusNegativeOne: [
    1, 1, 1,  // Negative One = 111
    1, 1,     // Negative One high bits [11_]
    [1, ZERO_CASE]  // Result: Absolute Zero (negative - negative cancel)
  ],

  // (-1) - 1 = -2 (increasing negative magnitude)
  NegativeOneMinusDisplay1: [
    1, 1, 1,  // Negative One = 111
    0, 0,     // Display 1 high bits [00_]
    [0, new Uint8Array([1, 1, 0])]  // Result: Display 7 [110] = -2 magnitude
  ],

  // (-1) - 2 = -3 (increasing negative magnitude)
  NegativeOneMinusDisplay2: [
    1, 1, 1,  // Negative One = 111
    0, 0,     // Display 2 high bits [00_]
    [1, new Uint8Array([1, 0, 1])]  // Result: Display 6 [101] = -3 magnitude
  ],

  // (-1) - 3 = -4 (increasing negative magnitude)
  NegativeOneMinusDisplay3: [
    1, 1, 1,  // Negative One = 111
    0, 1,     // Display 3 high bits [01_]
    [0, new Uint8Array([1, 0, 0])]  // Result: Display 5 [100] = -4 magnitude
  ],

  // (-1) - 4 = -5 (increasing negative magnitude)
  NegativeOneMinusDisplay4: [
    1, 1, 1,  // Negative One = 111
    0, 1,     // Display 4 high bits [01_]
    [1, new Uint8Array([0, 1, 1])]  // Result: Display 4 [011] = -5 magnitude
  ],

  // (-1) - 5 = -6 (increasing negative magnitude)
  NegativeOneMinusDisplay5: [
    1, 1, 1,  // Negative One = 111
    1, 0,     // Display 5 high bits [10_]
    [0, new Uint8Array([0, 1, 0])]  // Result: Display 3 [010] = -6 magnitude
  ],

  // (-1) - 6 = -7 (increasing negative magnitude)
  NegativeOneMinusDisplay6: [
    1, 1, 1,  // Negative One = 111
    1, 0,     // Display 6 high bits [10_]
    [1, new Uint8Array([0, 0, 1])]  // Result: Display 2 [001] = -7 magnitude
  ],

  // (-1) - 7 = -8 (maximum negative magnitude, no borrow)
  NegativeOneMinusDisplay7: [
    1, 1, 1,  // Negative One = 111
    1, 1,     // Display 7 high bits [11_]
    [0, new Uint8Array([0, 0, 0])]  // Result: Display 1 [000] = -8 magnitude
  ],

  // (-1) - 8 = Borrow (underflow, wraps with borrow)
  NegativeOneMinusDisplay8: [
    1, 1, 1,  // Negative One = 111
    1, 1,     // Display 8 high bits [11_]
    [1, new Uint8Array([1, 1, 1]), new Uint8Array([0, 0, 0])]
    // Borrow flag=1, wrapped result Display 8 [111], borrow Display 1
  ],
};
