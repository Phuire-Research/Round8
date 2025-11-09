export const STRING_TO_ROUND8_ROTATION: Record<string, Uint8Array> = {
  '1': Uint8Array.from([0, 0, 0]), // Binary 000 → Display "1"
  '2': Uint8Array.from([0, 0, 1]), // Binary 001 → Display "2"
  '3': Uint8Array.from([0, 1, 0]), // Binary 010 → Display "3"
  '4': Uint8Array.from([0, 1, 1]), // Binary 011 → Display "4"
  '5': Uint8Array.from([1, 0, 0]), // Binary 100 → Display "5"
  '6': Uint8Array.from([1, 0, 1]), // Binary 101 → Display "6"
  '7': Uint8Array.from([1, 1, 0]), // Binary 110 → Display "7"
  '8': Uint8Array.from([1, 1, 1]), // Binary 111 → Display "8"
};

/**
 * Shifted Frame Rotation Mapping (Column 0 Topology)
 *
 * Column 0 uses shifted topology because leading zeros are pruned.
 * Display "0" (Marquee) must be represented, so entire topology shifts:
 * - [0,0,1] → Display "0" (Marquee, normally would be Display "2" in regular frame)
 * - [0,0,0] → Display "7" (External Carry, normally would be Display "1" in regular frame)
 */
export const STRING_TO_ROUND8_SHIFTED_ROTATION: Record<string, Uint8Array> = {
  '0': Uint8Array.from([0, 0, 1]), // Shifted Display 0 (Marquee - pruned leading zero)
  '1': Uint8Array.from([0, 1, 0]), // Shifted Display 1
  '2': Uint8Array.from([0, 1, 1]), // Shifted Display 2
  '3': Uint8Array.from([1, 0, 0]), // Shifted Display 3
  '4': Uint8Array.from([1, 0, 1]), // Shifted Display 4
  '5': Uint8Array.from([1, 1, 0]), // Shifted Display 5
  '6': Uint8Array.from([1, 1, 1]), // Shifted Display 6 (Maximum)
  '7': Uint8Array.from([0, 0, 0]), // Shifted Display 7 (External Carry)
};

/**
 * Regular Frame Inverse Mapping (Columns 1-20)
 */
export const ROUND8_TO_STRING_ROTATION: Record<string, string> = {
  '0,0,0': '1', // Display 1
  '0,0,1': '2', // Display 2
  '0,1,0': '3', // Display 3
  '0,1,1': '4', // Display 4
  '1,0,0': '5', // Display 5
  '1,0,1': '6', // Display 6
  '1,1,0': '7', // Display 7
  '1,1,1': '8', // Display 8
};

/**
 * Shifted Frame Inverse Mapping (Column 0)
 */
export const ROUND8_TO_STRING_SHIFTED_ROTATION: Record<string, string> = {
  '0,0,1': '0', // Shifted Display 0 (Marquee)
  '0,1,0': '1', // Shifted Display 1
  '0,1,1': '2', // Shifted Display 2
  '1,0,0': '3', // Shifted Display 3
  '1,0,1': '4', // Shifted Display 4
  '1,1,0': '5', // Shifted Display 5
  '1,1,1': '6', // Shifted Display 6
  '0,0,0': '7', // Shifted Display 7 (External Carry)
};

