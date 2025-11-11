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

export const r8_ = {
  // Conference
  createRoundDisplay: getFormattedColumnarWrungRepresentation,
  createRoundString: getWrungStringRepresentation,
  parseStringToBuffer: parseStringToRound8,
  createBufferDisplay: createFormattedRound8BinaryString,
  // Terminology
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