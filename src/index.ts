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

import { r8Calculator } from './concepts/round8/model/calculator';
import { r8_ as r8 } from './concepts/round8/model/r8';
import type { Positions } from './concepts/round8/model/r8';
import type {
  CalculatorState,
  InputState,
  OperationType
} from './concepts/round8/model/calculator';
const r8_ = {
  ...r8,
  createCalculator: r8Calculator
};

export {
  r8_
};
export type {
  CalculatorState,
  InputState,
  OperationType,
  Positions
};