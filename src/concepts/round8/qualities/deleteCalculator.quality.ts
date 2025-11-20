// ============================================================================
// ROUND8 DELETE CALCULATOR QUALITY
// Removes specific calculator from array
// ============================================================================

import { createQualityCardWithPayload } from 'stratimux';
import { Round8DeleteCalculatorPayload, Round8State } from './types';

/**
 * Delete specific calculator by ID
 * Flat array design - no active calculator management
 */
export const round8DeleteCalculator = createQualityCardWithPayload<Round8State, Round8DeleteCalculatorPayload>({
  type: 'Round8 Delete Calculator',  // Verbose split naming convention
  reducer: (state, action) => {
    const { calculatorId } = action.payload;

    // Find calculator by ID
    const calcIndex = state.calculators.findIndex(c => c.id === calculatorId);
    if (calcIndex === -1) {return {};}  // Calculator not found

    // Remove calculator from array
    const updatedCalculators = [
      ...state.calculators.slice(0, calcIndex),
      ...state.calculators.slice(calcIndex + 1)
    ];

    // Return only changed properties
    return {
      calculators: updatedCalculators
    };
  }
});