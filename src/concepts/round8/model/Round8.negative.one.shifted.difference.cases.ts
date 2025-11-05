/**
 * Negative One Special Case - SHIFTED Difference Operations (Column 0 Manifold)
 *
 * SPOOL 7: Shifted X - (-1) Cases (Increment via Subtraction)
 * SPOOL 8: Shifted (-1) - X Cases (Increasing Negative Magnitude)
 *
 * Context: Column 0 uses 7-POSITION SYSTEM:
 * - Position 0: [0,0,1] = Marquee (delimiter)
 * - Positions 1-6: Shifted Displays 1-6
 * - Position 7: [0,0,0] = External carry arrival
 *
 * Negative One Behavior:
 * - X - (-1) = X + 1 (subtracting negative is addition)
 * - (-1) - X = Increasing negative magnitude or borrow
 *
 * Shifted Topology Constraints:
 * - Maximum position is Shifted Display 6 [1,1,1]
 * - Overflow past position 6 leads to carry handling
 * - Marquee acts as boundary delimiter
 */

type SomeSeries = Record<string, ((Uint8Array<ArrayBuffer> | number)[] | number)[]>;

// Zero case inlined
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

// POSITIVE_TWIST_CASE - Overflow boundary marker for Column 0
const POSITIVE_TWIST_CASE = Uint8Array.from([
  1,
  0, 0, 0, 1, 1, 1,
  1, 1, 1, 1, 1, 1,
  1, 1, 1, 1, 1, 1,
  1, 1, 1, 1, 1, 1,
  1, 1, 1, 1, 1, 1,
  1, 1, 1, 1, 1, 1,
  1, 1, 1, 1, 1, 1,
  1, 1, 1, 1, 1, 1,
  1, 1, 1, 1, 1, 1,
  1, 1, 1, 1, 1, 1,
  1, 1, 1,
]);

export const ShiftedSomeNumberMinusNegativeOneSeries: SomeSeries = {
  // SHIFTED SPOOL 7: X - (-1) = X + 1 in Column 0 manifold

  // Marquee - (-1) = Shifted Display 1 (delimiter increments)
  ShiftedMarqueeMinusNegativeOne: [
    0, 0, 1,  // Marquee = 001
    1, 1,     // Negative One [11_]
    [1, new Uint8Array([0, 1, 0])]  // Result: Shifted Display 1 [010]
  ],

  // Shifted Display 1 - (-1) = Shifted Display 2
  ShiftedDisplay1MinusNegativeOne: [
    0, 1, 0,  // Shifted Display 1 = 010
    1, 1,     // Negative One [11_]
    [0, new Uint8Array([0, 1, 1])]  // Result: Shifted Display 2 [011]
  ],

  // Shifted Display 2 - (-1) = Shifted Display 3
  ShiftedDisplay2MinusNegativeOne: [
    0, 1, 1,  // Shifted Display 2 = 011
    1, 1,     // Negative One [11_]
    [1, new Uint8Array([1, 0, 0])]  // Result: Shifted Display 3 [100]
  ],

  // Shifted Display 3 - (-1) = Shifted Display 4
  ShiftedDisplay3MinusNegativeOne: [
    1, 0, 0,  // Shifted Display 3 = 100
    1, 1,     // Negative One [11_]
    [0, new Uint8Array([1, 0, 1])]  // Result: Shifted Display 4 [101]
  ],

  // Shifted Display 4 - (-1) = Shifted Display 5
  ShiftedDisplay4MinusNegativeOne: [
    1, 0, 1,  // Shifted Display 4 = 101
    1, 1,     // Negative One [11_]
    [1, new Uint8Array([1, 1, 0])]  // Result: Shifted Display 5 [110]
  ],

  // Shifted Display 5 - (-1) = Shifted Display 6 (maximum position)
  ShiftedDisplay5MinusNegativeOne: [
    1, 1, 0,  // Shifted Display 5 = 110
    1, 1,     // Negative One [11_]
    [0, new Uint8Array([1, 1, 1])]  // Result: Shifted Display 6 [111]
  ],

  // Shifted Display 6 - (-1) = External Carry (overflow to position 7)
  ShiftedDisplay6MinusNegativeOne: [
    1, 1, 1,  // Shifted Display 6 = 111
    1, 1,     // Negative One [11_]
    [1, new Uint8Array([0, 0, 0])]  // Result: External carry [000] (position 7)
  ],

  // External Carry - (-1) = POSITIVE_TWIST_CASE (system overflow)
  ShiftedCarryMinusNegativeOne: [
    0, 0, 0,  // External carry = 000 (position 7)
    1, 1,     // Negative One [11_]
    [0, POSITIVE_TWIST_CASE]  // Result: POSITIVE_TWIST_CASE (overflow twist-off)
  ],
};

export const ShiftedNegativeOneMinusSomeNumberSeries: SomeSeries = {
  // SHIFTED SPOOL 8: (-1) - X in Column 0 manifold (increasing negative magnitude)

  // (-1) - (-1) = 0 (double negative cancellation)
  ShiftedNegativeOneMinusNegativeOne: [
    1, 1, 1,  // Negative One = 111
    1, 1,     // Negative One high bits [11_]
    [1, ZERO_CASE]  // Result: Absolute Zero
  ],

  // (-1) - Marquee = Boundary behavior (delimiter subtraction)
  ShiftedNegativeOneMinusMarquee: [
    1, 1, 1,  // Negative One = 111
    0, 0,     // Marquee high bits [00_]
    [1, new Uint8Array([1, 1, 0])]  // Result: Shifted Display 5 [110] = -2 magnitude
  ],

  // (-1) - Shifted Display 1 = -2 (increasing negative magnitude)
  ShiftedNegativeOneMinusDisplay1: [
    1, 1, 1,  // Negative One = 111
    0, 1,     // Shifted Display 1 high bits [01_]
    [0, new Uint8Array([1, 0, 1])]  // Result: Shifted Display 4 [101] = -3 magnitude
  ],

  // (-1) - Shifted Display 2 = -3 (increasing negative magnitude)
  ShiftedNegativeOneMinusDisplay2: [
    1, 1, 1,  // Negative One = 111
    0, 1,     // Shifted Display 2 high bits [01_]
    [1, new Uint8Array([1, 0, 0])]  // Result: Shifted Display 3 [100] = -4 magnitude
  ],

  // (-1) - Shifted Display 3 = -4 (increasing negative magnitude)
  ShiftedNegativeOneMinusDisplay3: [
    1, 1, 1,  // Negative One = 111
    1, 0,     // Shifted Display 3 high bits [10_]
    [0, new Uint8Array([0, 1, 1])]  // Result: Shifted Display 2 [011] = -5 magnitude
  ],

  // (-1) - Shifted Display 4 = -5 (increasing negative magnitude)
  ShiftedNegativeOneMinusDisplay4: [
    1, 1, 1,  // Negative One = 111
    1, 0,     // Shifted Display 4 high bits [10_]
    [1, new Uint8Array([0, 1, 0])]  // Result: Shifted Display 1 [010] = -6 magnitude
  ],

  // (-1) - Shifted Display 5 = -6 (approaching delimiter)
  ShiftedNegativeOneMinusDisplay5: [
    1, 1, 1,  // Negative One = 111
    1, 1,     // Shifted Display 5 high bits [11_]
    [0, new Uint8Array([0, 0, 1])]  // Result: Marquee [001] = boundary
  ],

  // (-1) - Shifted Display 6 = Borrow (underflow, wraps)
  ShiftedNegativeOneMinusDisplay6: [
    1, 1, 1,  // Negative One = 111
    1, 1,     // Shifted Display 6 high bits [11_]
    [1, new Uint8Array([0, 0, 0]), new Uint8Array([0, 0, 0])]
    // Borrow flag=1, wrapped result External carry [000], borrow Display 1
  ],

  // (-1) - External Carry = Maximum borrow (system boundary)
  ShiftedNegativeOneMinusCarry: [
    1, 1, 1,  // Negative One = 111
    0, 0,     // External carry high bits [00_]
    [0, new Uint8Array([1, 1, 1]), new Uint8Array([0, 0, 0])]
    // Wrapped result Shifted Display 6 [111], borrow Display 1
  ],
};
