// ============================================================================
// ROUND8 INCREMENT QUALITY
// Increments active input using r8_ manifold operations
// ============================================================================

import { createQualityCardWithPayload, defaultMethodCreator } from 'stratimux';
import { r8_ } from '../model';
import { Round8IncrementPayload, Round8State } from './types';

/**
 * Increment active input of specific calculator
 * Uses r8_ manifold operations.increment
 */
export const round8Increment = createQualityCardWithPayload<Round8State, Round8IncrementPayload>({
  type: 'Round8 Increment',  // Verbose split naming convention
  reducer: (state, action) => {
    const { calculatorId } = action.payload;

    // Find calculator by ID
    const calcIndex = state.calculators.findIndex(c => c.id === calculatorId);
    if (calcIndex === -1) {return {};}  // Calculator not found

    const calculator = state.calculators[calcIndex];
    const inputState = calculator[calculator.activeInput];

    // Increment using r8_ manifold
    const incremented = r8_.operations.increment(inputState.buffer);
    const binary = r8_.createBufferDisplay(incremented);
    const displayValue = r8_.createRoundDisplay(incremented);

    // Update calculator with incremented input
    const updatedCalculator = {
      ...calculator,
      [calculator.activeInput]: {
        value: displayValue,
        buffer: incremented,
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