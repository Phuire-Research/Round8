import {
  createFormattedRound8BinaryString,
  getFormattedColumnarWrungRepresentation,
  getWrungStringRepresentation,
  parseStringToRound8
} from './conference';
import type {
  Positions,
} from './terminology';
import {
  applyNumeralRotation,
  BitOffsetStore,
  ClearMaskStore,
  clearSignBit,
  createBuffer,
  extractBitTuple,
  flipSignBit,
  getBitOffsetForPosition,
  getBitWiseMaskForPosition,
  getClearMaskForPosition,
  getMarqueeBitRotation,
  getRegularBitRotation,
  getRegularRotation,
  getRotationString,
  getRotationValue,
  getRound8Case,
  getShiftedBitRotation,
  getShiftedRotation,
  getSignBit,
  MARQUEE_TUPLE,
  MaskStore,
  Round8Cases,
  scanDownward,
  scanUpward,
  setSignBit
} from './terminology';
import { muxifyWrung, determineEffectiveOperation } from './operations';
import {
  anor,
  anorWrung,
  compareMagnitude,
  equals,
  greaterThan,
  greaterThanOrEqual,
  lessThan,
  lessThanOrEqual,
  notEquals
} from './cases';

/**
 * Round8 Public API - Breadboard Access
 *
 * Organized into functional categories:
 * - conference: Display formatting and parsing
 * - operations: Arithmetic operations (muxifyWrung orchestration)
 * - logical: Comparison operators
 * - anor: Magnitude analysis and operation routing
 * - terminology: Low-level primitives and spools
 *
 * @version 0.0.14
 */
export const r8_ = {
  // ============================================================
  // Conference - Display Formatting & Parsing
  // ============================================================
  createRoundDisplay: getFormattedColumnarWrungRepresentation,
  createRoundString: getWrungStringRepresentation,
  parseStringToBuffer: parseStringToRound8,
  createBufferDisplay: createFormattedRound8BinaryString,

  // ============================================================
  // Operations - Arithmetic (Orchestration Layer)
  // ============================================================
  operations: {
    muxifyWrung,

    // Convenience wrappers - composing functions orchestrating muxifyWrung
    add: (a: bigint, b: bigint): bigint => muxifyWrung('+', a, b),
    subtract: (a: bigint, b: bigint): bigint => muxifyWrung('-', a, b),

    increment: (value: bigint): bigint => {
      const one = parseStringToRound8('1');
      return one ? muxifyWrung('+', value, one) : value;
    },

    decrement: (value: bigint): bigint => {
      const one = parseStringToRound8('1');
      return one ? muxifyWrung('-', value, one) : value;
    },
  },

  // ============================================================
  // Logical - Comparison Operators
  // ============================================================
  logical: {
    equals,
    notEquals,
    greaterThan,
    lessThan,
    greaterThanOrEqual,
    lessThanOrEqual,
  },

  // ============================================================
  // ANOR - Magnitude Analysis & Operation Routing
  // ============================================================
  anor: {
    anor,
    anorWrung,
    compareMagnitude,
    determineEffectiveOperation,
  },

  // ============================================================
  // Terminology - Low-Level Primitives
  // ============================================================
  terminology: {
    getSignBit,
    clearSignBit,
    setSignBit,
    flipSignBit,
    createBuffer,
    getRound8Case,
    Round8Cases,
    MaskStore,
    ClearMaskStore,
    BitOffsetStore,
    getBitOffsetForPosition,
    getBitWiseMaskForPosition,
    extractBitTuple,
    getClearMaskForPosition,
    MARQUEE_TUPLE,
    getRegularBitRotation,
    getShiftedBitRotation,
    getRegularRotation,
    getShiftedRotation,
    getMarqueeBitRotation,
    getRotationValue,
    getRotationString,
    applyNumeralRotation,
    scanDownward,
    scanUpward,
  }
};

export type {
  Positions,
};