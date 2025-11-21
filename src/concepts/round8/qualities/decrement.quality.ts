// ============================================================================
// ROUND8 DECREMENT QUALITY
// Decrements active input using r8_ manifold operations
// ============================================================================

import { createQualityCardWithPayload, defaultMethodCreator } from 'stratimux';
import { r8_ } from '../model';
import { Round8DecrementPayload, Round8State } from './types';

/**
 * Decrement active input of specific calculator
 * Uses r8_ manifold operations.decrement
 */
export const round8Decrement = createQualityCardWithPayload<Round8State, Round8DecrementPayload>({
  type: 'Round8 Decrement',  // Verbose split naming convention
  reducer: (state, action) => {
    const { calculatorId } = action.payload;

    // Find calculator by ID
    const calcIndex = state.calculators.findIndex(c => c.id === calculatorId);
    if (calcIndex === -1) {return {};}  // Calculator not found

    const calculator = state.calculators[calcIndex];
    const inputState = calculator[calculator.activeInput];

    // Decrement using r8_ manifold
    const decremented = r8_.operations.decrement(inputState.buffer);
    const binary = r8_.createBufferDisplay(decremented);
    const displayValue = r8_.createRoundDisplay(decremented);

    // Update calculator with decremented input
    const updatedCalculator = {
      ...calculator,
      [calculator.activeInput]: {
        value: displayValue,
        buffer: decremented,
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