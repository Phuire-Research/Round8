export type Positions = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 16 | 17 | 18 | 19 | 20 | 21;

/**
 * Round8 Special Cases Enum
 */
// eslint-disable-next-line no-shadow
export enum Round8Cases {
  ZERO_CASE = 0,
  POSITIVE_1_CASE = 1,
  POSITIVE_TWIST_CASE = 2,
  NEGATIVE_TWIST_CASE = 3,
  NEGATIVE_1_CASE = 4
}

export const getRotationRange = (position: Positions): [number, number] => {
  const offSet = 64 - (position * 3) + 3;
  return [
    offSet - 3,
    offSet
  ];
};

/**
 * getRotation will Provide a Tuple of the Range
 * @param position
 */

export const getRotation = (buffer: Uint8Array<ArrayBuffer>, position: Positions): Uint8Array<ArrayBuffer> =>  {
  const range = getRotationRange(position);
  return buffer.slice(range[0], range[1]);
};

/**
 * True64BitBuffer - Creates actual 64-bit binary storage using BigInt
 * This represents true binary (0 or 1 per bit position)
 */

export const createTrue64BitBuffer = (): bigint => {
  // 512 bit BigInt initialized to 0 (Still Stores in 64bit chunks)
  return 0n;
};

/**
 * Mask64Bit - Returns only the lower 64 bits from any BigInt buffer
 * Ensures binary operations stay within 64-bit boundary
 * @param buffer - BigInt of any size
 * @returns BigInt masked to 64 bits
 */

export const mask64Bit = (buffer: bigint): bigint => {
  // 64 bits of all 1s: 0xFFFFFFFFFFFFFFFF
  const MASK_64 = (1n << 64n) - 1n;
  return buffer & MASK_64;
};

/**
 * getBinaryRotationRange - Get bit position range for a rotation
 * Position 1 = signed bit (bit 63), then 20 rotations of 3 bits each
 * @param position - Rotation position (1-21)
 * @returns [startBit, endBit] for the rotation
 */

export const getBinaryRotationRange = (position: Positions): [number, number] => {
  // Position 1 starts at bit 61 (bits 61, 62, 63 = highest 3 bits)
  // Position 2 starts at bit 58, etc.
  const startBit = 64 - (position * 3) - 1;
  return [startBit, startBit + 3];
};

/**
 * setBinaryRotation - Set 3 bits at a specific rotation position
 * @param buffer - 64-bit BigInt buffer
 * @param position - Rotation position (1-21)
 * @param bits - 3-bit BigInt value (e.g. 0b111n)
 * @returns Updated 64-bit buffer
 */

export const setBinaryRotation = (buffer: bigint, position: Positions, bits: bigint): bigint => {
  const [startBit] = getBinaryRotationRange(position);
  // Clear the 3 bits at position
  const clearMask = ~(0b111n << BigInt(startBit));
  const clearedBuffer = buffer & clearMask;

  // Set the new 3 bits (mask input to ensure only 3 bits)
  const setBits = ((bits & 0b111n) << BigInt(startBit));
  return mask64Bit(clearedBuffer | setBits);
};

/**
 * getBinaryRotation - Get 3 bits from a specific rotation position as tuple
 * @param buffer - 64-bit BigInt buffer
 * @param position - Rotation position (1-21)
 * @returns Tuple of 3 individual bits [bit0, bit1, bit2]
 */

export const getBinaryRotation = (buffer: bigint, position: Positions): [0 | 1, 0 | 1, 0 | 1] => {
  const [startBit] = getBinaryRotationRange(position);

  // Extract the 3 bits
  const threeBits = Number((buffer >> BigInt(startBit)) & 0b111n);

  // Return as tuple of individual bits
  return [
    (threeBits & 0b001) as 0 | 1,
    ((threeBits >> 1) & 0b001) as 0 | 1,
    ((threeBits >> 2) & 0b001) as 0 | 1
  ];
};

/**
 * Round8CaseStore - 320-bit BigInt storing all 5 special cases
 * Each case occupies 64 bits:
 * - Bits 0-63: ZERO_CASE (all zeros)
 * - Bits 64-127: POSITIVE_1_CASE (first bit 1, rest 0)
 * - Bits 128-191: POSITIVE_TWIST_CASE (first bit 1, next 60 bits 1, last 3 bits 0)
 * - Bits 192-255: NEGATIVE_TWIST_CASE (first bit 0, next 60 bits 1, last 3 bits 0)
 * - Bits 256-319: NEGATIVE_1_CASE (first bit 0, rest 1s)
 */

const Round8CaseStore = ((): bigint => {
  let store = 0n;
  // ZERO_CASE at bits 0-63: all zeros
  const zeroCase = 0n;

  // POSITIVE_1_CASE at bits 64-127: MSB=1, rest 0
  const positive1Case = 0x8000000000000000n;

  // POSITIVE_TWIST_CASE at bits 128-191: MSB=1, next 60 bits=1, last 3 bits=0
  const positiveTwistCase = 0xFFFFFFFFFFFFFFF8n;

  // NEGATIVE_TWIST_CASE at bits 192-255: MSB=0, next 60 bits=1, last 3 bits=0
  const negativeTwistCase = 0x7FFFFFFFFFFFFFF8n;

  // NEGATIVE_1_CASE at bits 256-319: MSB=0, rest all 1s
  const negative1Case = 0x7FFFFFFFFFFFFFFFn;

  // Stack them into the 320-bit store
  store |= zeroCase;                    // Bits 0-63
  store |= positive1Case << 64n;        // Bits 64-127
  store |= positiveTwistCase << 128n;   // Bits 128-191
  store |= negativeTwistCase << 192n;   // Bits 192-255
  store |= negative1Case << 256n;       // Bits 256-319

  return store;
})();

/**

 * getRound8Case - Extract a specific 64-bit case from the 320-bit store
 * @param caseType - Which special case to retrieve
 * @returns 64-bit BigInt of the requested case
 */

export const getRound8Case = (caseType: Round8Cases): bigint => {
  // Calculate bit offset (each case is 64 bits)
  const offset = BigInt(caseType) * 64n;

  // Shift and mask to extract the 64-bit case
  return (Round8CaseStore >> offset) & ((1n << 64n) - 1n);
};
/**
 * Round8DisplayStore - 64-bit BigInt storing display mappings
 * Bits 40-63: Regular Display (positions 1-8)
 * Bits 16-39: Shifted Display (positions 0-7)
 * Bits 0-15: Padding zeros
 */
const Round8DisplayStore = ((): bigint => {
  let store = 0n;

  // Regular Display mappings (positions 1-8) at bits 40-63
  // Position 1 → Display 1 → '0,0,0' → 0b000
  store |= 0b000n << 61n;
  // Position 2 → Display 2 → '0,0,1' → 0b001
  store |= 0b001n << 58n;
  // Position 3 → Display 3 → '0,1,0' → 0b010
  store |= 0b010n << 55n;
  // Position 4 → Display 4 → '0,1,1' → 0b011
  store |= 0b011n << 52n;
  // Position 5 → Display 5 → '1,0,0' → 0b100
  store |= 0b100n << 49n;
  // Position 6 → Display 6 → '1,0,1' → 0b101
  store |= 0b101n << 46n;
  // Position 7 → Display 7 → '1,1,0' → 0b110
  store |= 0b110n << 43n;
  // Position 8 → Display 8 → '1,1,1' → 0b111
  store |= 0b111n << 40n;

  // Shifted Display mappings (positions 0-7) at bits 16-39
  // Position 0 → Display 0 → '0,0,1' → 0b001
  store |= 0b001n << 37n;
  // Position 1 → Display 1 → '0,1,0' → 0b010
  store |= 0b010n << 34n;
  // Position 2 → Display 2 → '0,1,1' → 0b011
  store |= 0b011n << 31n;
  // Position 3 → Display 3 → '1,0,0' → 0b100
  store |= 0b100n << 28n;
  // Position 4 → Display 4 → '1,0,1' → 0b101
  store |= 0b101n << 25n;
  // Position 5 → Display 5 → '1,1,0' → 0b110
  store |= 0b110n << 22n;
  // Position 6 → Display 6 → '1,1,1' → 0b111
  store |= 0b111n << 19n;
  // Position 7 → Display 7 → '0,0,0' → 0b000
  store |= 0b000n << 16n;

  // Bits 0-15 remain as padding zeros
  return store;
})();

// Position constraints
export type RegularPosition = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;
export type ShiftedPosition = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7;

/**
 * getRegularDisplay - Get 3-bit display pattern for regular position (1-8)
 * @param position - Display position 1-8
 * @returns 3-bit tuple representing the display pattern
 */
export const getRegularDisplay = (position: RegularPosition): [0 | 1, 0 | 1, 0 | 1] => {
  // Calculate bit position: position 1 starts at bit 61, position 8 at bit 40
  const startBit = 64 - 3 - ((position - 1) * 3);

  // Extract 3 bits
  const threeBits = Number((Round8DisplayStore >> BigInt(startBit)) & 0b111n);

  return [
    (threeBits & 0b001) as 0 | 1,
    ((threeBits >> 1) & 0b001) as 0 | 1,
    ((threeBits >> 2) & 0b001) as 0 | 1
  ];
};

/**
 * getShiftedDisplay - Get 3-bit display pattern for shifted position (0-7)
 * @param position - Display position 0-7
 * @returns 3-bit tuple representing the display pattern
 */
export const getShiftedDisplay = (position: ShiftedPosition): [0 | 1, 0 | 1, 0 | 1] => {
  // Calculate bit position: position 0 starts at bit 37, position 7 at bit 16
  const startBit = 40 - 3 - (position * 3);

  // Extract 3 bits
  const threeBits = Number((Round8DisplayStore >> BigInt(startBit)) & 0b111n);

  return [
    (threeBits & 0b001) as 0 | 1,
    ((threeBits >> 1) & 0b001) as 0 | 1,
    ((threeBits >> 2) & 0b001) as 0 | 1
  ];
};
