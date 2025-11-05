/**
 * Negative One Special Case - Sum Operations
 *
 * SPOOL 2: Some Number Plus Negative One (X + (-1) = X - 1)
 *
 * Pattern: [operandA] + [Negative One column value 111]
 *
 * Negative One column representation: [1,1,1] (Display 8 equivalent value)
 * But with sign 0 (negative), this represents maximum negative magnitude
 *
 * At column level: X + (-1) behaves as X - 1 (decrement operation)
 *
 * Cases:
 * Display 8 [111] + (-1) = Display 7 [110]
 * Display 7 [110] + (-1) = Display 6 [101]
 * ...
 * Display 2 [001] + (-1) = Display 1 [000]
 * Display 1 [000] + (-1) = Absolute Zero [ZERO_CASE] (special boundary)
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

export const SomeNumberPlusNegativeOneSeries: SomeSeries = {
  // SPOOL 2: X + (-1) = X - 1

  // Display 1 + (-1) = Absolute Zero (boundary case)
  Display1PlusNegativeOne: [
    0, 0, 0,  // Display 1 = 000
    1, 1,     // Negative One [11_] in opposing slot
    [0, ZERO_CASE]  // Result: Absolute Zero (Display 1 - 1 = 0)
  ],

  // Display 2 + (-1) = Display 1
  Display2PlusNegativeOne: [
    0, 0, 1,  // Display 2 = 001
    1, 1,     // Negative One [11_]
    [0, new Uint8Array([0, 0, 0])]  // Result: Display 1 [000]
  ],

  // Display 3 + (-1) = Display 2
  Display3PlusNegativeOne: [
    0, 1, 0,  // Display 3 = 010
    1, 1,     // Negative One [11_]
    [0, new Uint8Array([0, 0, 1])]  // Result: Display 2 [001]
  ],

  // Display 4 + (-1) = Display 3
  Display4PlusNegativeOne: [
    0, 1, 1,  // Display 4 = 011
    1, 1,     // Negative One [11_]
    [0, new Uint8Array([0, 1, 0])]  // Result: Display 3 [010]
  ],

  // Display 5 + (-1) = Display 4
  Display5PlusNegativeOne: [
    1, 0, 0,  // Display 5 = 100
    1, 1,     // Negative One [11_]
    [0, new Uint8Array([0, 1, 1])]  // Result: Display 4 [011]
  ],

  // Display 6 + (-1) = Display 5
  Display6PlusNegativeOne: [
    1, 0, 1,  // Display 6 = 101
    1, 1,     // Negative One [11_]
    [0, new Uint8Array([1, 0, 0])]  // Result: Display 5 [100]
  ],

  // Display 7 + (-1) = Display 6
  Display7PlusNegativeOne: [
    1, 1, 0,  // Display 7 = 110
    1, 1,     // Negative One [11_]
    [0, new Uint8Array([1, 0, 1])]  // Result: Display 6 [101]
  ],

  // Display 8 + (-1) = Display 7
  Display8PlusNegativeOne: [
    1, 1, 1,  // Display 8 = 111
    1, 1,     // Negative One [11_]
    [0, new Uint8Array([1, 1, 0])]  // Result: Display 7 [110]
  ],
};
