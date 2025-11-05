/**
 * Negative One Special Case - UNIQUE Sum Operations
 *
 * SPOOL 3: Negative One Plus Some Number ((-1) + X)
 *
 * Pattern: [Negative One column value 111] + [operandB]
 *
 * This spool is UNIQUE because the order matters for Negative One operations.
 * (-1) + X has different behavior than X + (-1) due to zero-crossing semantics.
 *
 * At column level: (-1) + X can cross zero boundary:
 * - (-1) + 1 = 0 (zero crossing)
 * - (-1) + 2 = +1 (becomes positive)
 * - (-1) + 8 = +7 (positive result)
 *
 * Special Cases:
 * - Double Negative: (-1) + (-1) = -2 (both operands negative, sum magnitudes)
 * - Zero Crossing: (-1) + 1 = 0 (ZERO_CASE)
 * - Sign Flip: (-1) + X where X > 1 results in positive number
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

export const NegativeOnePlusSomeNumberSeries: SomeSeries = {
  // SPOOL 3: (-1) + X with zero-crossing and sign flip semantics

  // (-1) + (-1) = -2 (DOUBLE NEGATIVE - both operands negative, sum magnitudes)
  // At column level: 111 + 111 with both negative signs
  // Result: Magnitude increases (becomes -2)
  NegativeOnePlusNegativeOne: [
    1, 1, 1,  // Negative One = 111 (operandA)
    1, 1,     // Negative One high bits [11_] (operandB)
    [1, new Uint8Array([1, 1, 0]), new Uint8Array([0, 0, 0])]
    // Carry flag=1, result Display 7 [110] = -2 magnitude, carry Display 1
  ],

  // (-1) + 1 = 0 (ZERO CROSSING)
  NegativeOnePlusDisplay1: [
    1, 1, 1,  // Negative One = 111
    0, 0,     // Display 1 high bits [00_]
    [0, ZERO_CASE]  // Result: Absolute Zero (negative + positive cancel)
  ],

  // (-1) + 2 = +1 (SIGN FLIP - becomes positive)
  NegativeOnePlusDisplay2: [
    1, 1, 1,  // Negative One = 111
    0, 0,     // Display 2 high bits [00_]
    [1, new Uint8Array([0, 0, 0])]  // Result: Display 1 [000] positive
  ],

  // (-1) + 3 = +2 (positive result)
  NegativeOnePlusDisplay3: [
    1, 1, 1,  // Negative One = 111
    0, 1,     // Display 3 high bits [01_]
    [0, new Uint8Array([0, 0, 1])]  // Result: Display 2 [001] positive
  ],

  // (-1) + 4 = +3 (positive result)
  NegativeOnePlusDisplay4: [
    1, 1, 1,  // Negative One = 111
    0, 1,     // Display 4 high bits [01_]
    [1, new Uint8Array([0, 1, 0])]  // Result: Display 3 [010] positive
  ],

  // (-1) + 5 = +4 (positive result)
  NegativeOnePlusDisplay5: [
    1, 1, 1,  // Negative One = 111
    1, 0,     // Display 5 high bits [10_]
    [0, new Uint8Array([0, 1, 1])]  // Result: Display 4 [011] positive
  ],

  // (-1) + 6 = +5 (positive result)
  NegativeOnePlusDisplay6: [
    1, 1, 1,  // Negative One = 111
    1, 0,     // Display 6 high bits [10_]
    [1, new Uint8Array([1, 0, 0])]  // Result: Display 5 [100] positive
  ],

  // (-1) + 7 = +6 (positive result)
  NegativeOnePlusDisplay7: [
    1, 1, 1,  // Negative One = 111
    1, 1,     // Display 7 high bits [11_]
    [0, new Uint8Array([1, 0, 1])]  // Result: Display 6 [101] positive
  ],

  // (-1) + 8 = +7 (positive result)
  NegativeOnePlusDisplay8: [
    1, 1, 1,  // Negative One = 111
    1, 1,     // Display 8 high bits [11_]
    [1, new Uint8Array([1, 1, 0])]  // Result: Display 7 [110] positive
  ],
};
