// ============================================================================
// ROUND8 MODEL - STANDALONE EXPORTS
// Base Round8 operations without Stratimux dependency
// ============================================================================

// Re-export everything from r8.ts (existing breadboard)
export { r8_ } from './r8';

// Direct operation exports for standalone use
export {
  muxifyWrung
} from './operations';

export {
  parseStringToRound8 as parseStringToBuffer
} from './conference';

export {
  createBuffer,
  applyNumeralRotation,
  applyShiftedNumeralRotation,
  getSignBit,
  setSignBit,
  extractBitTuple,
  getShiftedRotation
} from './terminology';

export {
  BidirectionalConference,
  type WrungMuxity,
} from './bidirectional';

// Calculator operations
export {
  type CalculatorState
} from './calculator';

// Type exports
export type {
  BitRotationTuple,
  Positions,
} from './terminology';

// Case exports for testing/verification
export {
  SpooledSumSeries,
  SpooledDifferenceSeries,
  SpooledGreaterThanSeries,
  SpooledLessThanSeries
} from './cases';