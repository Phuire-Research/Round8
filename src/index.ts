/**
 * Round8 v0.0.11 - Pure Round8 Binary Calculator
 *
 * Pure binary operations using spool-based indexed lookups.
 * NO binary operand calculations (shifts/OR/AND).
 * Dual display: Round8 string + Binary representation.
 *
 * @module round8
 * @version 0.0.11
 * @license GPL-3.0
 */

// Export everything from Round8Binary model (v0.0.11 main API)
export * from './concepts/round8/model/Round8Binary.model';

// Export validated arithmetic operations and lookup tables
export {
  STRING_TO_ROUND8_ROTATION,
  ROUND8_TO_STRING_ROTATION,
  ROUND8_TO_STRING_SHIFTED_ROTATION,
  SpooledRegularStringLookup,
  SpooledShiftedStringLookup,
  SumWrung,
  DifferenceWrung
} from './concepts/round8/model/Round8.cases';

// Export BidirectionalConference (already re-exported by Round8Binary.model)
// Available as: import { BidirectionalConference, MarqueeState } from 'round8';
