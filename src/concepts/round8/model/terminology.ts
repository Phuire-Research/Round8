// Each Position is 3 Bits as a Rotation
export type Positions = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 16 | 17 | 18 | 19 | 20 | 21;

export type SomeSeries = Record<string, (([0 | 1, 0 | 1, 0 | 1] | number | string)[] | number)[]>;

export type SpooledWrung<T = void> = (T extends void ? [0 | 1, 0 | 1, 0 | 1] | number | string : T)[][][][][][][];

export type BitRotationTuple = [0 | 1, 0 | 1, 0 | 1];

/**
 * Round8 Special Cases Enum
 */
// eslint-disable-next-line no-shadow
export enum Round8Cases {
  ZERO_CASE = 0,
  POSITIVE_TWIST_CASE = 1,
  NEGATIVE_TWIST_CASE = 2,
}

export const Round8CasesArray = [
  BigInt(0) * 64n,
  BigInt(1) * 64n,
  BigInt(2) * 64n,
];

// PRUNED: getSignedBit, flipSignedBit
// These MSB-based sign functions are replaced by Sign-at-Origin architecture:
// - Sign bit now at bit 0 (Origin Anchor) instead of bit 63
// - Use MaskStore.SIGN for sign operations
// - See getSignBit, clearSignBit, setSignBit for new implementation

/**
 * getSignBit - Get the sign bit from position 0 (Origin Anchor)
 * Zero-allocation: uses pre-computed MaskStore.SIGN
 * @param buffer - BigInt buffer
 * @returns The sign bit (0 or 1) at bit 0
 */

export const getSignBit = (buffer: bigint): 0 | 1 => {
  // Sign at Origin (bit 0) - the eternal anchor
  return (buffer & MaskStore.SIGN) === 1n ? 1 : 0;
};

/**
 * clearSignBit - Clear the sign bit at position 0
 * Zero-allocation: uses pre-computed ClearMaskStore.SIGN
 * @param buffer - BigInt buffer
 * @returns Buffer with sign bit cleared (set to 0)
 */
export const clearSignBit = (buffer: bigint): bigint => {
  return buffer & ClearMaskStore.SIGN;
};

/**
 * setSignBit - Set the sign bit at position 0
 * Zero-allocation: uses pre-computed MaskStore.SIGN
 * @param buffer - BigInt buffer
 * @returns Buffer with sign bit set (set to 1)
 */
export const setSignBit = (buffer: bigint): bigint => {
  return buffer | MaskStore.SIGN;
};

/**
 * flipSignBit - Flip the sign bit at position 0
 * Zero-allocation: uses XOR with pre-computed MaskStore.SIGN
 * @param buffer - BigInt buffer
 * @returns Buffer with sign bit flipped
 */

export const flipSignBit = (buffer: bigint): bigint => {
  return buffer ^ MaskStore.SIGN;
};

// PRUNED: getRotationRange, getRotationByPosition
// These runtime calculation functions are replaced by pre-computed stores:
// - BitOffsetStore contains pre-computed bit offsets
// - MaskStore contains pre-computed position masks
// - extractBitTuple provides unified position access

/**
 * True64BitBuffer - Creates actual 64-bit binary storage using BigInt
 * This represents true binary (0 or 1 per bit position)
 */
export const createBuffer = (): bigint => {
  // 512 bit BigInt initialized to 0 (Still Stores in 64bit chunks)
  return 0n;
};

// PRUNED: mask64Bit
// This runtime mask creation is replaced by pre-computed masks:
// - MaskStore contains all position masks
// - ClearMaskStore contains inverted masks
// - No need for runtime mask generation

// PRUNED: getBinaryRotationRange, setBinaryRotation, getBinaryRotation
// These functions were replaced by Sign-at-Origin architecture:
// - extractBitTuple (replaces getBinaryRotation with zero-allocation)
// - applyNumeralRotation (replaces setBinaryRotation with Clear/Set pattern)
// - MaskStore/BitOffsetStore (replaces getBinaryRotationRange with pre-computed values)

/**
 * Round8CaseStore - 384-bit BigInt storing all 6 slices (Sign-at-Origin)
 * Each slice occupies 64 bits:
 * - Bits 0-63: ZERO_CASE (all zeros)
 * - Bits 64-127: POSITIVE_1_CASE (sign bit at origin = 1, all position bits = 0)
 * - Bits 128-191: POSITIVE_TWIST_CASE (sign = 1, positions 1-20 = all 111, position 21 = 000)
 * - Bits 192-255: NEGATIVE_TWIST_CASE (sign = 0, all positions = 000)
 * - Bits 256-319: NEGATIVE_1_CASE (sign bit at origin = 0, all position bits = 1)
 * - Bits 320-383: DISPLAY_STORE (display mappings + marquee)
 */
const Round8CaseStore = ((): bigint => {
  let store = 0n;
  // SIGN-AT-ORIGIN SPECIAL CASES
  // Sign bit is at bit 0 (origin), positions extend upward

  // ZERO_CASE at bits 0-63: all zeros
  const zeroCase = 0n;

  // POSITIVE_TWIST_CASE at bits 64-128:
  // Sign bit = 1, P21 (bits 61-63) = 000, P1-P20 (bits 1-60) = all 111
  const positiveTwistCase = 0x1fffffffffffffffn;  // Sign=1, positions 1-20 all 1s, position 21 = 000

  // NEGATIVE_TWIST_CASE at bits 128-191:
  // Sign bit = 0, P21 = 000, all other positions = 000
  const negativeTwistCase = 0x0n;  // All zeros (sign=0, all positions=000)

  store |= zeroCase; // Bits 0-63
  store |= positiveTwistCase << 64n; // Bits 64-128
  store |= negativeTwistCase << 128n; // Bits 128-191

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
  // Get pre-computed bit offset from Round8CasesArray (already in bits, not case numbers)
  const offset = Round8CasesArray[caseType];
  // Shift and mask to extract the 64-bit case
  return (Round8CaseStore >> offset) & ((1n << 64n) - 1n);
};

// Position constraints
export type RegularRotation = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;

export type ShiftedRotation = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7;

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

/**
 * setNumeralProperty - Maps Round8 display values (1-8) to binary values (0-7)
 * This enables the relative mapping: Round8 "1" = binary 0, Round8 "8" = binary 7
 * @param number - Round8 display value (1-8)
 * @returns BigInt binary value (0n-7n)
 */
const setNumeralProperty = (number: number): bigint => {
  // Round8 display values are shifted by 1 from binary
  // Round8 "1" (display) = 0 (binary value 0)
  // Round8 "2" (display) = 1 (binary value 1)
  // ... through Round8 "8" (display) = 7 (binary value 7)
  switch (number) {
  case 0: return 0n;
  case 1: return 1n;
  case 2: return 2n;
  case 3: return 3n;
  case 4: return 4n;
  case 5: return 5n;
  case 6: return 6n;
  case 7: return 7n;
  default: {
    throw 'CRITICAL RANGE SET NUMBER ERROR';
  }
  }
};

/**
 * extractValueTuple - Extract 3-bit tuple from a value itself (not from buffer position)
 * This enables spool creation from standalone BigInt values
 * @param value - BigInt value (0n-7n) to convert to tuple
 * @returns Tuple of three bits representing the value
 */
const extractValueTuple = (value: bigint): [0 | 1, 0 | 1, 0 | 1] => {
  // Direct extraction from value (no position needed)
  const bits = Number(value & 0b111n);
  return [
    (bits & 0b001) as 0 | 1,        // Bit 0 (LSB)
    ((bits >> 1) & 0b001) as 0 | 1, // Bit 1
    ((bits >> 2) & 0b001) as 0 | 1  // Bit 2 (MSB)
  ];
};

/**
 * MARQUEE_TUPLE - Bit pattern for Marquee delimiter detection
 * Binary 001 = [1,0,0] (Round8 symbol '2' bit pattern)
 * Used for detecting Marquee positions during BidirectionalConference
 */
export const MARQUEE_TUPLE: [0 | 1, 0 | 1, 0 | 1] = extractValueTuple(setNumeralProperty(1));

export const NumeralStore = {
  Marquee: setNumeralProperty(Round8Numerals[0]),
  One: setNumeralProperty(Round8Numerals[1]),
  Two: setNumeralProperty(Round8Numerals[2]),
  Three: setNumeralProperty(Round8Numerals[3]),
  Four: setNumeralProperty(Round8Numerals[4]),
  Five: setNumeralProperty(Round8Numerals[5]),
  Six: setNumeralProperty(Round8Numerals[6]),
  Seven: setNumeralProperty(Round8Numerals[7]),
  Eight: setNumeralProperty(Round8Numerals[8]),
} as const;

export const ShiftedNumeralStore = {
  Marquee: setNumeralProperty(Round8Numerals[0]),
  One: setNumeralProperty(Round8Numerals[2]),
  Two: setNumeralProperty(Round8Numerals[3]),
  Three: setNumeralProperty(Round8Numerals[4]),
  Four: setNumeralProperty(Round8Numerals[5]),
  Five: setNumeralProperty(Round8Numerals[6]),
  Six: setNumeralProperty(Round8Numerals[7]),
  Seven: setNumeralProperty(Round8Numerals[8]),
  // Should Invalidate to Full Twist in Shifted Position
  Eight: setNumeralProperty(Round8Numerals[8]),
} as const;

const NumeralSeries = [
  extractValueTuple(NumeralStore.One),   // Binary 0n → [0,0,0]
  extractValueTuple(NumeralStore.Two),   // Binary 1n → [1,0,0]
  extractValueTuple(NumeralStore.Three), // Binary 2n → [0,1,0]
  extractValueTuple(NumeralStore.Four),  // Binary 3n → [1,1,0]
  extractValueTuple(NumeralStore.Five),  // Binary 4n → [0,0,1]
  extractValueTuple(NumeralStore.Six),   // Binary 5n → [1,0,1]
  extractValueTuple(NumeralStore.Seven), // Binary 6n → [0,1,1]
  extractValueTuple(NumeralStore.Eight), // Binary 7n → [1,1,1]
];
const AlignedShiftedNumeralSeries = [
  extractValueTuple(NumeralStore.Three),
  extractValueTuple(NumeralStore.Four),
  extractValueTuple(NumeralStore.Five),
  extractValueTuple(NumeralStore.Six),
  extractValueTuple(NumeralStore.Seven),
  extractValueTuple(NumeralStore.Eight),
  extractValueTuple(NumeralStore.One),
  extractValueTuple(NumeralStore.Marquee),
];
const ShiftedNumeralSeries = [
  extractValueTuple(NumeralStore.Marquee),
  extractValueTuple(NumeralStore.Three),
  extractValueTuple(NumeralStore.Four),
  extractValueTuple(NumeralStore.Five),
  extractValueTuple(NumeralStore.Six),
  extractValueTuple(NumeralStore.Seven),
  extractValueTuple(NumeralStore.Eight),
  extractValueTuple(NumeralStore.One),
];
const Numerals = [
  1,
  2,
  3,
  4,
  5,
  6,
  7,
  8
];
const ShiftedNumerals = [
  0,
  1,
  2,
  3,
  4,
  5,
  6,
  7,
  0 // Marquee Position and Error as Logic Should Guard Against this Case
];

const StringNumerals = [
  '1',
  '2',
  '3',
  '4',
  '5',
  '6',
  '7',
  '8'
];
const ShiftedStringNumerals = [
  '1',
  '2',
  '3',
  '4',
  '5',
  '6',
  '7',
  '0' // Marquee Position and Error as Logic Should Guard Against this Case

];

export const initializeSpooledWrung = <T extends number | string | BitRotationTuple>() => {
  const arr:  T[][][] = [];
  for (let i = 0; i < 2; i++) {
    arr[i] = [];
    for (let j = 0; j < 2; j++) {
      arr[i][j] = [];
    }
  }
  return arr;
};

export const spooledNumerals = initializeSpooledWrung<number>();
export const spooledShiftedNumerals = initializeSpooledWrung<number>();
export const spooledStringNumerals = initializeSpooledWrung<string>();
export const spooledShiftedStringNumerals = initializeSpooledWrung<string>();
// Only One Needed as we only Handle a Twist Case Given Some Carry Output.
export const spooledRegularShiftedBridge = initializeSpooledWrung<BitRotationTuple>();

const spool = <T>(informativeSeries: [0 | 1, 0 | 1, 0 | 1][], baseSeries: T[], spooled: T[][][]) => {
  informativeSeries.forEach((informative, i) => {
    const one = informative[0];
    const two = informative[1];
    const three = informative[2];
    const value = baseSeries[i];
    spooled[one][two][three] = value;
  });
};

spool(NumeralSeries, Numerals, spooledNumerals);
spool(ShiftedNumeralSeries, ShiftedNumerals, spooledShiftedNumerals);
spool(NumeralSeries, StringNumerals, spooledStringNumerals);
spool(ShiftedNumeralSeries, ShiftedStringNumerals, spooledShiftedStringNumerals);
spool(NumeralSeries, AlignedShiftedNumeralSeries, spooledRegularShiftedBridge);

/**
 * getRegularBitRotation - Get the bit tuple for regular positions 1-8
 * Returns the tuple from NumeralSeries, offset by 1 for indexing
 * This provides the raw 3-bit tuple representation for regular display positions
 * @param position - Display position 1-8
 * @returns The 3-bit tuple [0|1, 0|1, 0|1] for the position
 */
export const getRegularBitRotation = (position: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8): [0 | 1, 0 | 1, 0 | 1] => {
  // Offset by 1: position 1 → index 0, position 2 → index 1, etc.
  return NumeralSeries[position - 1];
};

/**
 * getRegularRotation - Get the byte value for regular positions 1-8
 * Returns the value from Round8Numerals, offset by 1 for indexing
 * This provides the raw byte value used with applyNumeralRotation
 * @param position - Display position 1-8
 * @returns The byte value (0-7) for the position
 */
export const getRegularRotation = (position: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8): number => {
  // Offset by 1 and get from Round8Numerals
  // Position 1 → Round8Numerals[1] = 0, Position 2 → Round8Numerals[2] = 1, etc.
  return Round8Numerals[position];
};

/**
 * getShiftedBitRotation - Get the bit tuple for shifted positions 0-7
 * Returns the tuple from NumeralSeries with shifted mapping
 * @param position - Display position 0-7
 * @returns The 3-bit tuple [0|1, 0|1, 0|1] for the shifted position
 */
export const getShiftedBitRotation = (position: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8): [0 | 1, 0 | 1, 0 | 1] => {
  // Shifted mapping: position 7 wraps to index 0, others shift by +1
  return ShiftedNumeralSeries[position];
};

/**
 * getShiftedRotation - Get the byte value for shifted positions 0-7
 * Returns the value from Round8Numerals with shifted mapping
 * @param position - Display position 0-7
 * @returns The byte value (0-7) for the shifted position
 */
export const getShiftedRotation = (position: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7): number => {
  // Shifted mapping: position 7 → Round8Numerals[1], others → Round8Numerals[position + 2]
  const index = position === 7 ? 1 : position + 2;
  return Round8Numerals[index];
};

/**
 * getMarqueeBitRotation - Get the bit tuple for the marquee
 * Returns the marquee tuple from NumeralSeries
 * @returns The 3-bit tuple [0|1, 0|1, 0|1] for marquee (always [1,0,0])
 */
export const getMarqueeBitRotation = (): [0 | 1, 0 | 1, 0 | 1] => {
  // Marquee is always the value 1, which is at Round8Numerals[0]
  // This maps to binary 001 → tuple [1,0,0]
  return extractValueTuple(NumeralStore.Two); // Binary 1n → [1,0,0]
};

/**
 * MarqueeRotation - The marquee byte value
 * Returns the marquee value from Round8Numerals[0]
 * @returns The marquee value (always 1)
 */
export const MarqueeRotation = Round8Numerals[0]; // Always 1

/**
 * getRotationValue - Unified accessor for rotation values at any position
 * Zero-allocation: returns number using pre-spooled lookup
 * Two-layer separation: raw bits → interpreted value via spool
 * @param buffer - BigInt buffer to read from
 * @param position - Position (1-21) to extract value from
 * @returns Number value (1-8) from spooled Round8 interpretation
 */
export const getRotationValue = (buffer: bigint, position: Positions): number => {
  // Layer 1: Extract raw bits
  const [b0, b1, b2] = extractBitTuple(buffer, position);

  // Layer 2: Direct spool lookup (zero allocation!)
  // The 3-bit tuple directly indexes into our 3D spool
  return spooledNumerals[b0][b1][b2];
};

/**
 * getRotationString - Unified accessor for string rotation values
 * Zero-allocation: returns string using pre-spooled lookup
 * @param buffer - BigInt buffer to read from
 * @param position - Position (1-21) to extract value from
 * @returns String value ('1'-'8') from spooled Round8 interpretation
 */
export const getRotationString = (buffer: bigint, position: Positions): string => {
  // Layer 1: Extract raw bits
  const [b0, b1, b2] = extractBitTuple(buffer, position);

  // Layer 2: Direct spool lookup for strings
  return spooledStringNumerals[b0][b1][b2];
};

/**
 * getRotationString - Unified accessor for string rotation values
 * Zero-allocation: returns string using pre-spooled lookup
 * @param buffer - BigInt buffer to read from
 * @param position - Position (1-21) to extract value from
 * @returns String value ('1'-'8') from spooled Round8 interpretation
 */
export const getShiftedRotationString = (buffer: bigint, position: Positions): string => {
  // Layer 1: Extract raw bits
  const [b0, b1, b2] = extractBitTuple(buffer, position);

  // Layer 2: Direct spool lookup for strings
  return spooledShiftedStringNumerals[b0][b1][b2];
};

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
 * applyNumeralRotation - Clear and Set function for applying numeral values
 * Uses WorkingBigIntBucket - ZERO allocation!
 * Sign-at-Origin: Position 1 at bits 1-3, Sign at bit 0
 * This REPLACES the old setBinaryRotation function (pruned for zero-allocation)
 * @param value - Number value (0-7) from Round8Numerals or elsewhere
 * @param buffer - The bigint buffer to modify
 * @param position - Position (1-21) to set value
 * @returns Updated buffer with value applied at position
 */
export const applyShiftedNumeralRotation = (value: number, buffer: bigint, position: Positions): bigint => {
  let finalValue: bigint;
  // PIN - REllEK [UNREASONABLE FIND] - Here is a major built in inefficiency that a Informative Base Relationship would benefit from.
  // Effectively because the Bits of Round8 are Relative. We would be Able to Shift 3 bits onto a Buffer of Some N Length.
  // There is no reason to not allow this outside of feat of lost precision, but here we have Greater Precision.
  switch (value) {
  case 0: {
    finalValue = ShiftedNumeralStore.One;
    break;
  }
  case 1: {
    finalValue = ShiftedNumeralStore.Two;
    break;
  }
  case 2: {
    finalValue = ShiftedNumeralStore.Three;
    break;
  }
  case 3: {
    finalValue = ShiftedNumeralStore.Four;
    break;
  }
  case 4: {
    finalValue = ShiftedNumeralStore.Five;
    break;
  }
  case 5: {
    finalValue = ShiftedNumeralStore.Six;
    break;
  }
  case 6: {
    finalValue = ShiftedNumeralStore.Seven;
    break;
  }
  case 7: {
    finalValue = ShiftedNumeralStore.Eight;
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
 * applyMarqueeAtPosition - Directly apply Marquee value at specified position
 *
 * Uses NumeralStore.Marquee for regular positions, ShiftedNumeralStore.Marquee for Position 21.
 * Zero-allocation: Uses pre-computed masks and Working BigIntBucket.
 *
 * @param buffer - BigInt buffer to modify
 * @param position - Position to set Marquee (1-21)
 * @param useShifted - Whether to use ShiftedNumeralStore (for Position 21 conceptual Marquee)
 * @returns Modified buffer with Marquee set at position
 */
export const applyMarqueeAtPosition = (
  buffer: bigint,
  position: Positions,
  useShifted = false
): bigint => {
  // Get the Marquee value from appropriate store
  const marqueeValue = useShifted
    ? ShiftedNumeralStore.Marquee
    : NumeralStore.Marquee;

  // Use WorkingBigIntBucket for zero-allocation
  WorkingBigIntBucket.content = marqueeValue;

  // Get pre-computed clear mask and bit offset (no runtime BigInt!)
  const clearMask = getClearMaskForPosition(position);
  const bitOffset = getBitOffsetForPosition(position);

  // Shift value to position using pre-computed offset
  WorkingBigIntBucket.content <<= bitOffset;

  // Clear position bits, then apply Marquee value (Clear and Set operation)
  const result = (buffer & clearMask) | WorkingBigIntBucket.content;

  // Reset bucket for next operation (zero-allocation pattern)
  WorkingBigIntBucket.content = 0n;

  return result;
};

/**
 * ScanCallback - Callback function type for position scanning
 * @param buffer - The 64-bit bigint buffer being scanned
 * @param position - Current position (1-21)
 * @returns true to continue scanning, false to stop
 */
export type ScanCallback = (buffer: bigint, position: Positions) => boolean;
export type ScansCallback = (wrungA: bigint, wrungB: bigint, position: Positions) => boolean;

/**
 * ResultMuxity - Forward-only computation record for Quality-First Muxification
 * Records position results and metadata without backward scanning
 * Enables all-8s pattern detection and sign flip analysis before buffer assembly
 * Proto-Muxium foundation for SCS (Stratimuxian Computing System)
 */
export type ResultMuxity = {
  positions: number[];                // Sequential array: index = position - 1, value = resultIndex (0-7)
  consecutiveEightsFromStart: number; // Track all-8s pattern for difference operations
  pendingPropagation: boolean;        // Final carry (sum) or borrow (difference)
  resultSign: 0 | 1;                  // Sign bit for final assembly (1 = positive, 0 = negative)
};

export const createResultMuxity = (resultSign: 0 | 1 = 1): ResultMuxity => ({
  positions: [],                      // Empty array, push sequentially
  consecutiveEightsFromStart: 0,
  pendingPropagation: false,
  resultSign,
});

/**
 * scanUpward - Recursively scan positions upward from origin toward expansion (1 → 21)
 * Counter metaphor: Tick up increases count, moving toward higher complexity
 * Inverted Pyramid: Origin (simplest) → Upward (expanding possibility space)
 * Congruent with BigInt's upward expansion and Tier 0→1→2 increasing complexity
 * Stops when callback returns false or reaches end
 * @param wrung - 64-bit bigint buffer to scan
 * @param callback - (buffer: bigint, position: Positions) => boolean;
 * @param position - Current position (defaults to 1 to start from near-origin)
 * @returns The position where scanning stopped, or 0 if completed all positions
 */

export const scanUpward = (
  wrung: bigint,
  callback: ScanCallback,
  position: Positions = 1
): Positions | 0 => {
  // Execute callback for current position
  const shouldContinue = callback(wrung, position);
  // If callback returns false, stop and return current position
  if (!shouldContinue) {
    return position;
  }

  // If we've reached the highest position, return 0 (completed)
  if (position === 21) {
    return 0;
  }

  // Recursively continue to next higher position
  return scanUpward(wrung, callback, (position + 1) as Positions);
};

/**
 * scanUpwards - Recursively scan positions upward from origin toward expansion (1 → 21)
 * Counter metaphor: Tick up increases count, moving toward higher complexity
 * Inverted Pyramid: Origin (simplest) → Upward (expanding possibility space)
 * Congruent with BigInt's upward expansion and Tier 0→1→2 increasing complexity
 * Stops when callback returns false or reaches end
 * @param wrungA - 64-bit bigint buffer to scan
 * @param wrungB - 64-bit bigint buffer to scan
 * @param callback - (wrungA: bigint, wrungB: bigint, position: Positions) => boolean;
 * @param position - Current position (defaults to 1 to start from near-origin)
 * @returns The position where scanning stopped, or 0 if completed all positions
 */

export const scanUpwards = (
  wrungA: bigint,
  wrungB: bigint,
  callback: ScansCallback,
  position: Positions = 1
): Positions | 0 => {
  // Execute callback for current position
  const shouldContinue = callback(wrungA, wrungB, position);
  // If callback returns false, stop and return current position
  if (!shouldContinue) {
    return position;
  }

  // If we've reached the highest position, return 0 (completed)
  if (position === 21) {
    return 0;
  }

  // Recursively continue to next higher position
  return scanUpwards(wrungA, wrungB, callback, (position + 1) as Positions);
};
/**
 * scanDownward - Recursively scan positions downward from expansion toward origin (21 → 1)
 * Counter metaphor: Tick down decreases count, moving toward simpler state
 * Inverted Pyramid: Expansion (complex) → Downward (approaching origin simplicity)
 * Moves against BigInt's upward expansion, validating from highest complexity first
 * Stops when callback returns false or reaches beginning
 * @param wrung - 64-bit bigint buffer to scan
 * @param callback - (buffer: bigint, position: Positions) => boolean;
 * @param position - Current position (defaults to 21 to start from expansion bound)
 * @returns The position where scanning stopped, or 0 if completed all positions
 */

export const scanDownward = (
  wrung: bigint,
  callback: ScanCallback,
  position: Positions = 21
): Positions | 0 => {
  // Execute callback for current position
  const shouldContinue = callback(wrung, position);
  // If callback returns false, stop and return current position
  if (!shouldContinue) {
    return position;
  }

  // If we've reached the lowest position (near origin), return 0 (completed)
  if (position === 1) {
    return 0;
  }

  // Recursively continue to next lower position
  return scanDownward(wrung, callback, (position - 1) as Positions);
};

/**
 * scanDownwards - Recursively scan positions downward from expansion toward origin (21 → 1)
 * Counter metaphor: Tick down decreases count, moving toward simpler state
 * Inverted Pyramid: Expansion (complex) → Downward (approaching origin simplicity)
 * Moves against BigInt's upward expansion, validating from highest complexity first
 * Stops when callback returns false or reaches beginning
 * @param wrungA - 64-bit bigint buffer to scan
 * @param wrungB - 64-bit bigint buffer to scan
 * @param callback - (wrungA: bigint, wrungB: bigint, position: Positions) => boolean;
 * @param position - Current position (defaults to 21 to start from expansion bound)
 * @returns The position where scanning stopped, or 0 if completed all positions
 */

export const scanDownwards = (
  wrungA: bigint,
  wrungB: bigint,
  callback: ScansCallback,
  position: Positions = 21
): Positions | 0 => {
  // Execute callback for current position
  const shouldContinue = callback(wrungA, wrungB, position);
  // If callback returns false, stop and return current position
  if (!shouldContinue) {
    return position;
  }

  // If we've reached the lowest position (near origin), return 0 (completed)
  if (position === 1) {
    return 0;
  }

  // Recursively continue to next lower position
  return scanDownwards(wrungA, wrungB, callback, (position - 1) as Positions);
};

/**
 * extractRotationsUpward - Extract all rotation values moving upward (1 → 21)
 * Parsing infrastructure: Returns complete array of rotation values for string/number representation
 * Counter metaphor: Tick up through all positions from near-origin toward expansion bound
 * Uses scanUpward for provable halting recursion (compositional building)
 * @param buffer - 64-bit bigint buffer to extract from
 * @returns Array of rotation values [position 1, position 2, ..., position 21]
 */
export const extractRotationsUpward = (buffer: bigint): number[] => {
  const rotations: number[] = [];

  // Compositional: Build on validated scanUpward (provable halting recursion)
  scanUpward(buffer, (buf, pos) => {
    rotations.push(getRotationValue(buf, pos));
    return true; // Continue scanning to completion
  });

  return rotations;
};

/**
 * extractRotationsDownward - Extract all rotation values moving downward (21 → 1)
 * Parsing infrastructure: Returns complete array for validation from expansion toward origin
 * Counter metaphor: Tick down through all positions from expansion bound toward near-origin
 * Uses scanDownward for provable halting recursion (compositional building)
 * @param buffer - 64-bit bigint buffer to extract from
 * @returns Array of rotation values [position 21, position 20, ..., position 1]
 */
export const extractRotationsDownward = (buffer: bigint): number[] => {
  const rotations: number[] = [];

  // Compositional: Build on validated scanDownward (provable halting recursion)
  scanDownward(buffer, (buf, pos) => {
    rotations.push(getRotationValue(buf, pos));
    return true; // Continue scanning to completion
  });

  return rotations;
};
