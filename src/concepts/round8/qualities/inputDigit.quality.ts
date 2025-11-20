// ============================================================================
// ROUND8 INPUT DIGIT QUALITY
// Calculator routing via ID, traversing r8_ manifold for parsing
// ============================================================================

import { createQualityCardWithPayload } from 'stratimux';
import { r8_ } from '../model';
import { Round8InputDigitPayload, Round8State } from './types';

/**
 * Input a digit (0-7) to the active input of specific calculator
 * Uses r8_ manifold for parsing and display
 */
export const round8InputDigit = createQualityCardWithPayload<Round8State, Round8InputDigitPayload>({
  type: 'Round8 Input Digit',  // Verbose split naming convention
  reducer: (state, action) => {
    const { calculatorId, digit } = action.payload;

    // Find calculator by ID
    const calcIndex = state.calculators.findIndex(c => c.id === calculatorId);
    if (calcIndex === -1) {return {};}  // Calculator not found

    const calculator = state.calculators[calcIndex];
    const inputState = calculator[calculator.activeInput];

    // Build sequence in typed order (oldest first)
    const currentSequence = inputState.value;

    // Check if in zero state (should replace, not append)
    const isZeroState = !currentSequence ||
                        currentSequence === '0' ||
                        currentSequence === '' ||
                        currentSequence === '-0';

    // Append new digit to end (typed order), or replace if zero state
    const newSequence = isZeroState ? `${digit}` : `${currentSequence}${digit}`;

    // Parse using r8_ manifold
    const buffer = r8_.parseStringToBuffer(newSequence);
    if (!buffer) {return {};}  // Invalid input

    const binary = r8_.createBufferDisplay(buffer);
    const displayValue = r8_.createRoundDisplay(buffer);

    // Update calculator with new input state
    const updatedCalculator = {
      ...calculator,
      [calculator.activeInput]: {
        value: displayValue,
        buffer: buffer,
        binary: binary
      }
    };

    // Return only changed properties
    return {
      calculators: [
        ...state.calculators.slice(0, calcIndex),
        updatedCalculator,
        ...state.calculators.slice(calcIndex + 1)
      ]
    };
  }
});