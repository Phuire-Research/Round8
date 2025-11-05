/**
 * Negative One Special Case - SHIFTED Sum Operations (Column 0 Manifold)
 *
 * SPOOL 6: Shifted Topology X + (-1) and (-1) + X Cases
 *
 * Context: Column 0 uses 7-POSITION SYSTEM (not 8-position):
 * - Position 0: [0,0,1] = Marquee (delimiter/reset point)
 * - Position 1: [0,1,0] = Shifted Display 1
 * - Position 2: [0,1,1] = Shifted Display 2
 * - Position 3: [1,0,0] = Shifted Display 3
 * - Position 4: [1,0,1] = Shifted Display 4
 * - Position 5: [1,1,0] = Shifted Display 5
 * - Position 6: [1,1,1] = Shifted Display 6 (maximum counting position)
 * - Position 7: [0,0,0] = External carry arrival point
 *
 * Negative One in Shifted Topology:
 * - Represented as Shifted Display 6 [1,1,1] (maximum magnitude)
 * - With negative sign, this is -1 in Column 0 context
 *
 * Pattern: X + (-1) decrements in shifted topology
 * Pattern: (-1) + X can cross zero boundary
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

export const ShiftedSomeNumberPlusNegativeOneSeries: SomeSeries = {
  // SHIFTED SPOOL: X + (-1) in Column 0 manifold (7-position decrement)

  // Shifted Display 1 + (-1) = Marquee (boundary case)
  ShiftedDisplay1PlusNegativeOne: [
    0, 1, 0,  // Shifted Display 1 = 010
    1, 1,     // Negative One [11_] (Shifted Display 6)
    [1, new Uint8Array([0, 0, 1])]  // Result: Marquee [001] (delimiter)
  ],

  // Shifted Display 2 + (-1) = Shifted Display 1
  ShiftedDisplay2PlusNegativeOne: [
    0, 1, 1,  // Shifted Display 2 = 011
    1, 1,     // Negative One [11_]
    [0, new Uint8Array([0, 1, 0])]  // Result: Shifted Display 1 [010]
  ],

  // Shifted Display 3 + (-1) = Shifted Display 2
  ShiftedDisplay3PlusNegativeOne: [
    1, 0, 0,  // Shifted Display 3 = 100
    1, 1,     // Negative One [11_]
    [1, new Uint8Array([0, 1, 1])]  // Result: Shifted Display 2 [011]
  ],

  // Shifted Display 4 + (-1) = Shifted Display 3
  ShiftedDisplay4PlusNegativeOne: [
    1, 0, 1,  // Shifted Display 4 = 101
    1, 1,     // Negative One [11_]
    [0, new Uint8Array([1, 0, 0])]  // Result: Shifted Display 3 [100]
  ],

  // Shifted Display 5 + (-1) = Shifted Display 4
  ShiftedDisplay5PlusNegativeOne: [
    1, 1, 0,  // Shifted Display 5 = 110
    1, 1,     // Negative One [11_]
    [1, new Uint8Array([1, 0, 1])]  // Result: Shifted Display 4 [101]
  ],

  // Shifted Display 6 + (-1) = Shifted Display 5
  ShiftedDisplay6PlusNegativeOne: [
    1, 1, 1,  // Shifted Display 6 = 111
    1, 1,     // Negative One [11_]
    [0, new Uint8Array([1, 1, 0])]  // Result: Shifted Display 5 [110]
  ],

  // External Carry + (-1) = Shifted Display 6 (carry decrements to max position)
  ShiftedCarryPlusNegativeOne: [
    0, 0, 0,  // External carry = 000 (position 7)
    1, 1,     // Negative One [11_]
    [1, new Uint8Array([1, 1, 1])]  // Result: Shifted Display 6 [111]
  ],
};

export const ShiftedNegativeOnePlusSomeNumberSeries: SomeSeries = {
  // SHIFTED SPOOL: (-1) + X in Column 0 manifold (zero-crossing behavior)

  // (-1) + (-1) = Double negative (increases magnitude to -2)
  ShiftedNegativeOnePlusNegativeOne: [
    1, 1, 1,  // Negative One (Shifted Display 6) = 111
    1, 1,     // Negative One high bits [11_]
    [0, new Uint8Array([1, 1, 0])]  // Result: Shifted Display 5 [110] = -2 magnitude
  ],

  // (-1) + Marquee = Boundary case (delimiter behavior)
  ShiftedNegativeOnePlusMarquee: [
    1, 1, 1,  // Negative One = 111
    0, 0,     // Marquee high bits [00_]
    [1, new Uint8Array([1, 0, 1])]  // Result: Shifted Display 4 [101]
  ],

  // (-1) + Shifted Display 1 = Zero crossing
  ShiftedNegativeOnePlusDisplay1: [
    1, 1, 1,  // Negative One = 111
    0, 1,     // Shifted Display 1 high bits [01_]
    [0, ZERO_CASE]  // Result: Absolute Zero (negative + positive cancel)
  ],

  // (-1) + Shifted Display 2 = +1 (sign flip)
  ShiftedNegativeOnePlusDisplay2: [
    1, 1, 1,  // Negative One = 111
    0, 1,     // Shifted Display 2 high bits [01_]
    [1, new Uint8Array([0, 1, 0])]  // Result: Shifted Display 1 [010] positive
  ],

  // (-1) + Shifted Display 3 = +2 (positive result)
  ShiftedNegativeOnePlusDisplay3: [
    1, 1, 1,  // Negative One = 111
    1, 0,     // Shifted Display 3 high bits [10_]
    [0, new Uint8Array([0, 1, 1])]  // Result: Shifted Display 2 [011] positive
  ],

  // (-1) + Shifted Display 4 = +3 (positive result)
  ShiftedNegativeOnePlusDisplay4: [
    1, 1, 1,  // Negative One = 111
    1, 0,     // Shifted Display 4 high bits [10_]
    [1, new Uint8Array([1, 0, 0])]  // Result: Shifted Display 3 [100] positive
  ],

  // (-1) + Shifted Display 5 = +4 (positive result)
  ShiftedNegativeOnePlusDisplay5: [
    1, 1, 1,  // Negative One = 111
    1, 1,     // Shifted Display 5 high bits [11_]
    [0, new Uint8Array([1, 0, 1])]  // Result: Shifted Display 4 [101] positive
  ],

  // (-1) + Shifted Display 6 = +5 (positive result)
  ShiftedNegativeOnePlusDisplay6: [
    1, 1, 1,  // Negative One = 111
    1, 1,     // Shifted Display 6 high bits [11_]
    [1, new Uint8Array([1, 1, 0])]  // Result: Shifted Display 5 [110] positive
  ],

  // (-1) + External Carry = +6 (positive result, max position)
  ShiftedNegativeOnePlusCarry: [
    1, 1, 1,  // Negative One = 111
    0, 0,     // External carry high bits [00_]
    [0, new Uint8Array([1, 1, 1])]  // Result: Shifted Display 6 [111] positive
  ],
};
