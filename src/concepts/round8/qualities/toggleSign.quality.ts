// ============================================================================
// ROUND8 TOGGLE SIGN QUALITY
// Flips sign bit for active input using r8_ manifold
// ============================================================================

import { createQualityCardWithPayload, defaultMethodCreator } from 'stratimux';
import { r8_ } from '../model';
import { Round8State, Round8ToggleSignPayload } from './types';

/**
 * Toggle sign for active input of specific calculator
 * Uses r8_ manifold terminology for sign bit manipulation
 */
export const round8ToggleSign = createQualityCardWithPayload<Round8State, Round8ToggleSignPayload>({
  type: 'Round8 Toggle Sign',  // Verbose split naming convention
  reducer: (state, action) => {
    const { calculatorId } = action.payload;

    // Find calculator by ID
    const calcIndex = state.calculators.findIndex(c => c.id === calculatorId);
    if (calcIndex === -1) {return {};}  // Calculator not found

    const calculator = state.calculators[calcIndex];
    const inputState = calculator[calculator.activeInput];

    // Flip sign bit using r8_ manifold
    const flipped = r8_.terminology.flipSignBit(inputState.buffer);
    const binary = r8_.createBufferDisplay(flipped);
    const displayValue = r8_.createRoundDisplay(flipped);

    // Update calculator with flipped input
    const updatedCalculator = {
      ...calculator,
      [calculator.activeInput]: {
        value: displayValue,
        buffer: flipped,
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
  },
  methodCreator: defaultMethodCreator
});