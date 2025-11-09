// Position 0 is Pruned and is our Signed Single Bit

// Each Position is 3 Bits as a Rotation

export type Positions = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 16 | 17 | 18 | 19 | 20 | 21;

export type SomeSeries = Record<string, ((bigint | number | string)[] | number)[]>;

export type SpooledWrung = bigint[][][][][][][];

/**
 * Round8 Special Cases Enum
 */
// eslint-disable-next-line no-shadow
export enum Round8Cases {
  ZERO_CASE = 0,
  POSITIVE_1_CASE = 1,
  POSITIVE_TWIST_CASE = 2,
  NEGATIVE_TWIST_CASE = 3,
  NEGATIVE_1_CASE = 4,
  DISPLAY_STORE = 5,
}

/**
 * getSignedBit - Get the signed bit (position 0) from a 64-bit buffer
 * @param buffer - 64-bit BigInt buffer
 * @returns The signed bit (0 or 1) at bit 63 (MSB)
 */
export const getSignedBit = (buffer: bigint): 0 | 1 => {
  // Position 0: The signed bit at bit 63 (MSB)
  // 0x7FFF... has MSB=0 (negative)
  // 0xFFFF... has MSB=1 (positive)
  return ((buffer >> 63n) & 1n) === 1n ? 1 : 0;
};

/**
 * flipSignedBit - Flip the signed bit with special case handling
 * @param buffer - 64-bit BigInt buffer
 * @returns Buffer with flipped signed bit, handling special cases
 */
export const flipSignedBit = (buffer: bigint): bigint => {
  // Special Case 1: POSITIVE_1_CASE (0x8000000000000000) → NEGATIVE_1_CASE (0x7FFFFFFFFFFFFFFF)
  if (buffer === 0x8000000000000000n) {
    return 0x7fffffffffffffffn;
  }
  // Special Case 2: NEGATIVE_1_CASE (0x7FFFFFFFFFFFFFFF) → POSITIVE_1_CASE (0x8000000000000000)
  if (buffer === 0x7fffffffffffffffn) {
    return 0x8000000000000000n;
  }
  // Standard case: Just flip the MSB (bit 63)
  return buffer ^ (1n << 63n);
};

/**
 * getRotationRange - Get bit position range for 3-bit rotations (positions 1-21)
 * Position 0 (signed bit) is pruned and handled by getSignedBit
 * @param position - Rotation position (1-21)
 * @returns [startBit, endBit) for the 3-bit rotation
 */
export const getRotationRange = (position: Positions): [number, number] => {
  // Position 1 starts at bit 60, position 2 at bit 57, etc.
  // Formula: startBit = 63 - (position * 3)
  const startBit = 63 - position * 3;
  return [startBit, startBit + 3];
};

/**
 * getRotationByPosition - Get rotation bits from a 64-bit buffer
 * @param buffer - 64-bit BigInt buffer
 * @param position - Rotation position (1-21)
 * @returns 3-bit BigInt value for the rotation
 */
export const getRotationByPosition = (buffer: bigint, position: Positions): bigint => {
  const range = getRotationRange(position);
  // Extract the 3-bit rotation
  return (buffer >> BigInt(range[0])) & 0b111n;
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
  const startBit = 64 - position * 3 - 1;
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
  const setBits = (bits & 0b111n) << BigInt(startBit);
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
  return [(threeBits & 0b001) as 0 | 1, ((threeBits >> 1) & 0b001) as 0 | 1, ((threeBits >> 2) & 0b001) as 0 | 1];
};

/**
 * Round8CaseStore - 384-bit BigInt storing all 6 slices
 * Each slice occupies 64 bits:
 * - Bits 0-63: ZERO_CASE (all zeros)
 * - Bits 64-127: POSITIVE_1_CASE (first bit 1, rest 0)
 * - Bits 128-191: POSITIVE_TWIST_CASE (first bit 1, next 60 bits 1, last 3 bits 0)
 * - Bits 192-255: NEGATIVE_TWIST_CASE (first bit 0, next 60 bits 1, last 3 bits 0)
 * - Bits 256-319: NEGATIVE_1_CASE (first bit 0, rest 1s)
 * - Bits 320-383: DISPLAY_STORE (display mappings + marquee)
 */
const Round8CaseStore = ((): bigint => {
  let store = 0n;
  // ZERO_CASE at bits 0-63: all zeros
  const zeroCase = 0n;
  // POSITIVE_1_CASE at bits 64-127: MSB=1, rest 0
  const positive1Case = 0x8000000000000000n;
  // POSITIVE_TWIST_CASE at bits 128-191: MSB=1, next 60 bits=1, last 3 bits=0
  const positiveTwistCase = 0xfffffffffffffff8n;
  // NEGATIVE_TWIST_CASE at bits 192-255: MSB=0, next 60 bits=1, last 3 bits=0
  const negativeTwistCase = 0x7ffffffffffffff8n;
  // NEGATIVE_1_CASE at bits 256-319: MSB=0, rest all 1s
  const negative1Case = 0x7fffffffffffffffn;
  // DISPLAY_STORE at bits 320-383: display mappings + marquee
  let displayStore = 0n;
  // Regular Display mappings (positions 1-8) at bits 40-63 of this 64-bit slice
  displayStore |= 0b000n << 61n; // Position 1 → '0,0,0'
  displayStore |= 0b001n << 58n; // Position 2 → '0,0,1'
  displayStore |= 0b010n << 55n; // Position 3 → '0,1,0'
  displayStore |= 0b011n << 52n; // Position 4 → '0,1,1'
  displayStore |= 0b100n << 49n; // Position 5 → '1,0,0'
  displayStore |= 0b101n << 46n; // Position 6 → '1,0,1'
  displayStore |= 0b110n << 43n; // Position 7 → '1,1,0'
  displayStore |= 0b111n << 40n; // Position 8 → '1,1,1'
  // Shifted Display mappings (positions 0-7) at bits 16-39
  displayStore |= 0b001n << 37n; // Position 0 → '0,0,1'
  displayStore |= 0b010n << 34n; // Position 1 → '0,1,0'
  displayStore |= 0b011n << 31n; // Position 2 → '0,1,1'
  displayStore |= 0b100n << 28n; // Position 3 → '1,0,0'
  displayStore |= 0b101n << 25n; // Position 4 → '1,0,1'
  displayStore |= 0b110n << 22n; // Position 5 → '1,1,0'
  displayStore |= 0b111n << 19n; // Position 6 → '1,1,1'
  displayStore |= 0b000n << 16n; // Position 7 → '0,0,0'
  // Marquee bit pattern at bits 13-15: '001'
  displayStore |= 0b001n << 13n;
  // Stack them into the 384-bit store
  store |= zeroCase; // Bits 0-63
  store |= positive1Case << 64n; // Bits 64-127
  store |= positiveTwistCase << 128n; // Bits 128-191
  store |= negativeTwistCase << 192n; // Bits 192-255
  store |= negative1Case << 256n; // Bits 256-319
  store |= displayStore << 320n; // Bits 320-383
  return store;
})();

/**
 * Round8Numerals - Singleton Uint8Array for memory-optimized value storage
 * Total: 9 bytes for all numeral values
 */
export const Round8Numerals = Uint8Array.from([
  1, // [0] Marquee: Displays as 1
  0, // [1] Round8 1: Regular value 0
  1, // [2] Round8 2: Regular value 1
  2, // [3] Round8 3: Regular value 2
  3, // [4] Round8 4: Regular value 3
  4, // [5] Round8 5: Regular value 4
  5, // [6] Round8 6: Regular value 5
  6, // [7] Round8 7: Regular value 6
  7, // [8] Round8 8: Regular value 7
]);

/**
 * WorkingBigIntBucket - Singleton BigInt container for operations
 * NO CLEARING NEEDED: Shift-and-mask ensures isolation
 */
export const WorkingBigIntBucket = { content: 0n };

/**
 * getRound8Case - Extract a specific 64-bit case from the 384-bit store
 * @param caseType - Which special case to retrieve
 * @returns 64-bit BigInt of the requested case
 */
export const getRound8Case = (caseType: Round8Cases): bigint => {
  // Calculate bit offset (each case is 64 bits)
  const offset = BigInt(caseType) * 64n;
  // Shift and mask to extract the 64-bit case
  return (Round8CaseStore >> offset) & ((1n << 64n) - 1n);
};

// Position constraints
export type RegularPosition = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;
export type ShiftedPosition = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7;

/**
 * getRegularDisplay - Get 3-bit display pattern for regular position (1-8)
 * @param position - Display position 1-8
 * @returns 3-bit tuple representing the display pattern
 */
export const getRegularBitRotation = (position: RegularPosition): [0 | 1, 0 | 1, 0 | 1] => {
  // Get the display store from unified memory
  const displayStore = getRound8Case(Round8Cases.DISPLAY_STORE);
  // Calculate bit position: position 1 starts at bit 61, position 8 at bit 40
  const startBit = 64 - 3 - (position - 1) * 3;
  // Extract 3 bits
  const threeBits = Number((displayStore >> BigInt(startBit)) & 0b111n);
  return [(threeBits & 0b001) as 0 | 1, ((threeBits >> 1) & 0b001) as 0 | 1, ((threeBits >> 2) & 0b001) as 0 | 1];
};

/**
 * getShiftedDisplay - Get 3-bit display pattern for shifted position (0-7)
 * @param position - Display position 0-7
 * @returns 3-bit tuple representing the display pattern
 */
export const getShiftedBitRotation = (position: ShiftedPosition): [0 | 1, 0 | 1, 0 | 1] => {
  // Get the display store from unified memory
  const displayStore = getRound8Case(Round8Cases.DISPLAY_STORE);
  // Calculate bit position: position 0 starts at bit 37, position 7 at bit 16
  const startBit = 40 - 3 - position * 3;
  // Extract 3 bits
  const threeBits = Number((displayStore >> BigInt(startBit)) & 0b111n);
  return [(threeBits & 0b001) as 0 | 1, ((threeBits >> 1) & 0b001) as 0 | 1, ((threeBits >> 2) & 0b001) as 0 | 1];
};

/**
 * getMarqueeDisplay - Get the marquee bit pattern
 * @returns 3-bit tuple [0,0,1] representing the marquee pattern
 */
export const getMarqueeBitRotation = (): [0 | 1, 0 | 1, 0 | 1] => {
  // Get the display store from unified memory
  const displayStore = getRound8Case(Round8Cases.DISPLAY_STORE);
  // Extract marquee bits at position 13-15
  const threeBits = Number((displayStore >> 13n) & 0b111n);
  return [(threeBits & 0b001) as 0 | 1, ((threeBits >> 1) & 0b001) as 0 | 1, ((threeBits >> 2) & 0b001) as 0 | 1];
};

/**
 * getRegularRotation - Get masked 3-bit value for regular position (1-8)
 * @param position - Display position 1-8
 * @returns 3-bit BigInt value (0n-7n)
 */
export const getRegularRotation = (position: RegularPosition): bigint => {
  // Get the display store from unified memory
  const displayStore = getRound8Case(Round8Cases.DISPLAY_STORE);
  // Calculate bit position: position 1 starts at bit 61, position 8 at bit 40
  const startBit = 64 - 3 - (position - 1) * 3;
  // Extract and return masked 3 bits
  return (displayStore >> BigInt(startBit)) & 0b111n;
};

/**
 * getShiftedRotation - Get masked 3-bit value for shifted position (0-7)
 * @param position - Display position 0-7
 * @returns 3-bit BigInt value (0n-7n)
 */
export const getShiftedRotation = (position: ShiftedPosition): bigint => {
  // Get the display store from unified memory
  const displayStore = getRound8Case(Round8Cases.DISPLAY_STORE);
  // Calculate bit position: position 0 starts at bit 37, position 7 at bit 16
  const startBit = 40 - 3 - position * 3;
  // Extract and return masked 3 bits
  return (displayStore >> BigInt(startBit)) & 0b111n;
};

/**
 * MarqueeRotation - Get is the 3 bit Marquee Value
 * @returns 3-bit BigInt value (should be 0b001n)
 */
export const MarqueeRotation = ((): bigint => {
  // Get the display store from unified memory
  const displayStore = getRound8Case(Round8Cases.DISPLAY_STORE);
  // Extract and return marquee bits at position 13-15
  return (displayStore >> 13n) & 0b111n;
})();

/**
 * MaskStore - Round8 Clear/Set Architecture
 * Sign bit FIXED at bit 0 (Origin Anchor)
 * Positions expand UPWARD without repositioning
 */
export const MaskStore = {
  SIGN: 1n << 0n, // Sign bit: bit 0 (ORIGIN ANCHOR - NEVER MOVES)
  P1: 0b111n << 1n, // Position 1: bits 1-3
  P2: 0b111n << 4n, // Position 2: bits 4-6
  P3: 0b111n << 7n, // Position 3: bits 7-9
  P4: 0b111n << 10n, // Position 4: bits 10-12
  P5: 0b111n << 13n, // Position 5: bits 13-15
  P6: 0b111n << 16n, // Position 6: bits 16-18
  P7: 0b111n << 19n, // Position 7: bits 19-21
  P8: 0b111n << 22n, // Position 8: bits 22-24
  P9: 0b111n << 25n, // Position 9: bits 25-27
  P10: 0b111n << 28n, // Position 10: bits 28-30
  P11: 0b111n << 31n, // Position 11: bits 31-33
  P12: 0b111n << 34n, // Position 12: bits 34-36
  P13: 0b111n << 37n, // Position 13: bits 37-39
  P14: 0b111n << 40n, // Position 14: bits 40-42
  P15: 0b111n << 43n, // Position 15: bits 43-45
  P16: 0b111n << 46n, // Position 16: bits 46-48
  P17: 0b111n << 49n, // Position 17: bits 49-51
  P18: 0b111n << 52n, // Position 18: bits 52-54
  P19: 0b111n << 55n, // Position 19: bits 55-57
  P20: 0b111n << 58n, // Position 20: bits 58-60
  P21: 0b111n << 61n, // Position 21: bits 61-63 (64-bit boundary)
  // EXPANSION READY - Positions 22+ continue upward infinitely
} as const;

/**
 * ClearMaskStore - Inverted masks for clearing positions
 * Each mask clears exactly 3 bits at the position
 */
export const ClearMaskStore = {
  SIGN: ~(1n << 0n), // Clear sign bit
  P1: ~(0b111n << 1n), // Clear position 1
  P2: ~(0b111n << 4n), // Clear position 2
  P3: ~(0b111n << 7n), // Clear position 3
  P4: ~(0b111n << 10n), // Clear position 4
  P5: ~(0b111n << 13n), // Clear position 5
  P6: ~(0b111n << 16n), // Clear position 6
  P7: ~(0b111n << 19n), // Clear position 7
  P8: ~(0b111n << 22n), // Clear position 8
  P9: ~(0b111n << 25n), // Clear position 9
  P10: ~(0b111n << 28n), // Clear position 10
  P11: ~(0b111n << 31n), // Clear position 11
  P12: ~(0b111n << 34n), // Clear position 12
  P13: ~(0b111n << 37n), // Clear position 13
  P14: ~(0b111n << 40n), // Clear position 14
  P15: ~(0b111n << 43n), // Clear position 15
  P16: ~(0b111n << 46n), // Clear position 16
  P17: ~(0b111n << 49n), // Clear position 17
  P18: ~(0b111n << 52n), // Clear position 18
  P19: ~(0b111n << 55n), // Clear position 19
  P20: ~(0b111n << 58n), // Clear position 20
  P21: ~(0b111n << 61n), // Clear position 21
} as const;

/**
 * BitOffsetStore - Pre-computed bit offsets as BigInt literals
 * Eliminates runtime BigInt creation for shift operations
 * Each offset = (position * 3 - 2) for Sign-at-Origin architecture
 */
export const BitOffsetStore = {
  P1: 1n, // Position 1 starts at bit 1
  P2: 4n, // Position 2 starts at bit 4
  P3: 7n, // Position 3 starts at bit 7
  P4: 10n, // Position 4 starts at bit 10
  P5: 13n, // Position 5 starts at bit 13
  P6: 16n, // Position 6 starts at bit 16
  P7: 19n, // Position 7 starts at bit 19
  P8: 22n, // Position 8 starts at bit 22
  P9: 25n, // Position 9 starts at bit 25
  P10: 28n, // Position 10 starts at bit 28
  P11: 31n, // Position 11 starts at bit 31
  P12: 34n, // Position 12 starts at bit 34
  P13: 37n, // Position 13 starts at bit 37
  P14: 40n, // Position 14 starts at bit 40
  P15: 43n, // Position 15 starts at bit 43
  P16: 46n, // Position 16 starts at bit 46
  P17: 49n, // Position 17 starts at bit 49
  P18: 52n, // Position 18 starts at bit 52
  P19: 55n, // Position 19 starts at bit 55
  P20: 58n, // Position 20 starts at bit 58
  P21: 61n, // Position 21 starts at bit 61
} as const;

/**
 * getBitOffsetForPosition - Return pre-computed bit offset
 * @param position - Position 1-21
 * @returns BigInt offset from BitOffsetStore (no runtime creation!)
 */
// eslint-disable-next-line complexity
export const getBitOffsetForPosition = (position: Positions): bigint => {
  switch (position) {
  case 1:
    return BitOffsetStore.P1;
  case 2:
    return BitOffsetStore.P2;
  case 3:
    return BitOffsetStore.P3;
  case 4:
    return BitOffsetStore.P4;
  case 5:
    return BitOffsetStore.P5;
  case 6:
    return BitOffsetStore.P6;
  case 7:
    return BitOffsetStore.P7;
  case 8:
    return BitOffsetStore.P8;
  case 9:
    return BitOffsetStore.P9;
  case 10:
    return BitOffsetStore.P10;
  case 11:
    return BitOffsetStore.P11;
  case 12:
    return BitOffsetStore.P12;
  case 13:
    return BitOffsetStore.P13;
  case 14:
    return BitOffsetStore.P14;
  case 15:
    return BitOffsetStore.P15;
  case 16:
    return BitOffsetStore.P16;
  case 17:
    return BitOffsetStore.P17;
  case 18:
    return BitOffsetStore.P18;
  case 19:
    return BitOffsetStore.P19;
  case 20:
    return BitOffsetStore.P20;
  case 21:
    return BitOffsetStore.P21;
  default:
    return BitOffsetStore.P1; // TypeScript exhaustiveness
  }
};

/**
 * getBitWiseMaskForPosition - Return pre-computed mask for position
 * @param position - Position 1-21
 * @returns 3-bit mask at correct position from MaskStore
 */
// eslint-disable-next-line complexity
export const getBitWiseMaskForPosition = (position: Positions): bigint => {
  // Use verbose position lookup
  switch (position) {
  case 1:
    return MaskStore.P1;
  case 2:
    return MaskStore.P2;
  case 3:
    return MaskStore.P3;
  case 4:
    return MaskStore.P4;
  case 5:
    return MaskStore.P5;
  case 6:
    return MaskStore.P6;
  case 7:
    return MaskStore.P7;
  case 8:
    return MaskStore.P8;
  case 9:
    return MaskStore.P9;
  case 10:
    return MaskStore.P10;
  case 11:
    return MaskStore.P11;
  case 12:
    return MaskStore.P12;
  case 13:
    return MaskStore.P13;
  case 14:
    return MaskStore.P14;
  case 15:
    return MaskStore.P15;
  case 16:
    return MaskStore.P16;
  case 17:
    return MaskStore.P17;
  case 18:
    return MaskStore.P18;
  case 19:
    return MaskStore.P19;
  case 20:
    return MaskStore.P20;
  case 21:
    return MaskStore.P21;
  default:
    return MaskStore.P1;
  }
};

/**
 * extractBitTuple - Extract 3 individual bits as tuple
 * TRULY ZERO runtime BigInt creation - uses pre-computed stores!
 * Sign-at-Origin: Position 1 at bits 1-3, Sign at bit 0
 * RAW bit extraction - interpretation happens at higher layer
 * @param buffer - The bigint buffer to extract from
 * @param position - Position (1-21) to extract bits from
 * @returns Tuple of three RAW bits (not Round8 interpreted values)
 */
export const extractBitTuple = (buffer: bigint, position: Positions): [0 | 1, 0 | 1, 0 | 1] => {
  // Get pre-computed mask and offset (no runtime BigInt creation!)
  const mask = getBitWiseMaskForPosition(position);
  const bitOffset = getBitOffsetForPosition(position);
  // Extract the 3 bits using mask and shift back to origin
  const threeBits = Number((buffer & mask) >> bitOffset);
  // Return as tuple of RAW bits (Layer 1: positional bits)
  // Layer 2 (Round8Numerals) or Layer 3 (ScrambleMap) handle interpretation
  return [
    (threeBits & 0b001) as 0 | 1, // Bit 0 (LSB of 3-bit group)
    ((threeBits >> 1) & 0b001) as 0 | 1, // Bit 1
    ((threeBits >> 2) & 0b001) as 0 | 1, // Bit 2 (MSB of 3-bit group)
  ];
};

/**
 * getClearMaskForPosition - Return pre-computed clear mask for position
 * @param position - Position 1-21
 * @returns Clear mask from ClearMaskStore (inverted position mask)
 */
// eslint-disable-next-line complexity
export const getClearMaskForPosition = (position: Positions): bigint => {
  switch (position) {
  case 1:
    return ClearMaskStore.P1;
  case 2:
    return ClearMaskStore.P2;
  case 3:
    return ClearMaskStore.P3;
  case 4:
    return ClearMaskStore.P4;
  case 5:
    return ClearMaskStore.P5;
  case 6:
    return ClearMaskStore.P6;
  case 7:
    return ClearMaskStore.P7;
  case 8:
    return ClearMaskStore.P8;
  case 9:
    return ClearMaskStore.P9;
  case 10:
    return ClearMaskStore.P10;
  case 11:
    return ClearMaskStore.P11;
  case 12:
    return ClearMaskStore.P12;
  case 13:
    return ClearMaskStore.P13;
  case 14:
    return ClearMaskStore.P14;
  case 15:
    return ClearMaskStore.P15;
  case 16:
    return ClearMaskStore.P16;
  case 17:
    return ClearMaskStore.P17;
  case 18:
    return ClearMaskStore.P18;
  case 19:
    return ClearMaskStore.P19;
  case 20:
    return ClearMaskStore.P20;
  case 21:
    return ClearMaskStore.P21;
  default:
    return ~0n; // TypeScript exhaustiveness
  }
};

export const NumeralStore = {
  One: 0n,
  Two: 1n,
  Three: 2n,
  Four: 3n,
  Five: 4n,
  Six: 5n,
  Seven: 6n,
  Eight: 7n,
} as const;

/**
 * applyNumeralRotation - Clear and Set function for applying numeral values
 * Uses WorkingBigIntBucket - ZERO allocation!
 * Sign-at-Origin: Position 1 at bits 1-3, Sign at bit 0
 * This REPLACES the old setBinaryRotation function (pruned for zero-allocation)
 * @param value - Number value (0-7) from Round8Numerals or elsewhere
 * @param buffer - The bigint buffer to modify
 * @param position - Position (1-21) to set value
 * @returns Updated buffer with value applied at position
 */
export const applyNumeralRotation = (value: number, buffer: bigint, position: Positions): bigint => {
  let finalValue: bigint;
  // PIN - REllEK [UNREASONABLE FIND] - Here is a major built in inefficiency that a Informative Base Relationship would benefit from.
  // Effectively because the Bits of Round8 are Relative. We would be Able to Shift 3 bits onto a Buffer of Some N Length.
  // There is no reason to not allow this outside of feat of lost precision, but here we have Greater Precision.
  switch (value) {
  case 0: {
    finalValue = NumeralStore.One;
    break;
  }
  case 1: {
    finalValue = NumeralStore.Two;
    break;
  }
  case 2: {
    finalValue = NumeralStore.Three;
    break;
  }
  case 3: {
    finalValue = NumeralStore.Four;
    break;
  }
  case 4: {
    finalValue = NumeralStore.Five;
    break;
  }
  case 5: {
    finalValue = NumeralStore.Six;
    break;
  }
  case 6: {
    finalValue = NumeralStore.Seven;
    break;
  }
  case 7: {
    finalValue = NumeralStore.Eight;
    break;
  }
  default: {
    throw 'CRITICAL';
  }
  }
  WorkingBigIntBucket.content = finalValue;
  // Get pre-computed clear mask and bit offset (no runtime BigInt!)
  const clearMask = getClearMaskForPosition(position);
  const bitOffset = getBitOffsetForPosition(position);
  // Shift value to position using pre-computed offset
  WorkingBigIntBucket.content <<= bitOffset;
  // Clear position bits, then apply new value (Clear and Set operation)
  return (buffer & clearMask) | WorkingBigIntBucket.content;
};

/**
 * ScanCallback - Callback function type for position scanning
 * @param buffer - The 64-bit bigint buffer being scanned
 * @param position - Current position (1-21)
 * @returns true to continue scanning, false to stop
 */
export type ScanCallback = (buffer: bigint, position: Positions) => boolean;

/**
 * scanForward - Recursively scan positions from front to back (1 → 21)
 * Stops when callback returns false or reaches end
 * @param buffer - 64-bit bigint buffer to scan
 * @param callback - Function to call for each position
 * @param position - Current position (defaults to 1 to start)
 * @returns The position where scanning stopped, or 0 if completed all positions
 */
export const scanForward = (
  buffer: bigint,
  callback: ScanCallback,
  position: Positions = 1
): Positions | 0 => {
  // Execute callback for current position
  const shouldContinue = callback(buffer, position);
  // If callback returns false, stop and return current position
  if (!shouldContinue) {
    return position;
  }
  // If we've reached the last position, return 0 (completed)
  if (position === 21) {
    return 0;
  }
  // Recursively continue to next position
  return scanForward(buffer, callback, (position + 1) as Positions);
};

/**
 * scanBackward - Recursively scan positions from back to front (21 → 1)
 * Stops when callback returns false or reaches beginning
 * @param buffer - 64-bit bigint buffer to scan
 * @param callback - Function to call for each position
 * @param position - Current position (defaults to 21 to start)
 * @returns The position where scanning stopped, or 0 if completed all positions
 */
export const scanBackward = (
  buffer: bigint,
  callback: ScanCallback,
  position: Positions = 21
): Positions | 0 => {
  // Execute callback for current position
  const shouldContinue = callback(buffer, position);
  // If callback returns false, stop and return current position
  if (!shouldContinue) {
    return position;
  }
  // If we've reached the first position, return 0 (completed)
  if (position === 1) {
    return 0;
  }
  // Recursively continue to previous position
  return scanBackward(buffer, callback, (position - 1) as Positions);
};
