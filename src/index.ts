/**
 * Round8 v0.0.14 - Pure Round8 Binary Calculator
 *
 * Pure binary operations using spool-based indexed lookups.
 * NO binary operand calculations (shifts/OR/AND).
 * Dual display: Round8 string + Binary representation.
 *
 * New in v0.0.14:
 * - Increment/Decrement operations (composing functions)
 * - Organized API: operations, logical, anor, conference, terminology
 * - Critical developer types exported (BitRotationTuple, WrungMuxity, ResultMuxity)
 *
 * @module round8
 * @version 0.0.14
 * @license GPL-3.0
 */

import { r8Calculator } from './concepts/round8/model/calculator';
import { r8_ as r8 } from './concepts/round8/model/r8';
import type { Positions } from './concepts/round8/model/r8';
import type {
  CalculatorState,
  InputState,
  OperationType
} from './concepts/round8/model/calculator';
import type {
  BitRotationTuple,
  ResultMuxity
} from './concepts/round8/model/terminology';
import type { WrungMuxity } from './concepts/round8/model/bidirectional';

const r8_ = {
  ...r8,
  createCalculator: r8Calculator
};

export {
  r8_
};
export type {
  // Calculator Types
  CalculatorState,
  InputState,
  OperationType,

  // Round8 Foundation Types
  Positions,
  BitRotationTuple,
  WrungMuxity,
  ResultMuxity,
};