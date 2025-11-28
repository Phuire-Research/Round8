// ============================================================================
// ROUND8 QUALITIES BUNDLE v0.0.168
// All qualities traversing the r8_ manifold for calculator operations
// Interchange Enhancement: setDisplayMode, decimalInput, interchangeOff
// ============================================================================

import { round8CreateCalculator } from './qualities/createCalculator.quality';
import { round8InputDigit } from './qualities/inputDigit.quality';
import { round8SetOperation } from './qualities/setOperation.quality';
import { round8Calculate } from './qualities/calculate.quality';
import { round8Clear } from './qualities/clear.quality';
import { round8SwitchInput } from './qualities/switchInput.quality';
import { round8ToggleSign } from './qualities/toggleSign.quality';
import { round8Increment } from './qualities/increment.quality';
import { round8Decrement } from './qualities/decrement.quality';
import { round8DeleteCalculator } from './qualities/deleteCalculator.quality';
import { round8Backspace } from './qualities/backspace.quality';
// Interchange Qualities (v0.0.168)
import { round8SetDisplayMode } from './qualities/setDisplayMode.quality';
import { round8DecimalInput } from './qualities/decimalInput.quality';
import { round8InterchangeOff } from './qualities/interchangeOff.quality';

/**
 * Bundle of all Round8 qualities
 * Each quality operates on specific calculator via ID routing
 * All computational operations traverse the r8_ manifold
 */
export const round8Qualities = {
  round8CreateCalculator,
  round8InputDigit,
  round8SetOperation,
  round8Calculate,
  round8Clear,
  round8SwitchInput,
  round8ToggleSign,
  round8Increment,
  round8Decrement,
  round8DeleteCalculator,
  round8Backspace,
  // Interchange Qualities (v0.0.168)
  round8SetDisplayMode,
  round8DecimalInput,
  round8InterchangeOff
};

// Export type for concept definition
export type Round8Qualities = typeof round8Qualities;