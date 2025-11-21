// ============================================================================
// ROUND8 SET OPERATION QUALITY
// Sets the operation for specific calculator via ID routing
// ============================================================================

import { createQualityCardWithPayload, defaultMethodCreator } from 'stratimux';
import { Round8SetOperationPayload, Round8State } from './types';

/**
 * Set the operation (+, -, >, <, >=, <=, ==, !=) for specific calculator
 */
export const round8SetOperation = createQualityCardWithPayload<Round8State, Round8SetOperationPayload>({
  type: 'Round8 Set Operation',  // Verbose split naming convention
  reducer: (state, action) => {
    const { calculatorId, operation } = action.payload;

    // Find calculator by ID
    const calcIndex = state.calculators.findIndex(c => c.id === calculatorId);
    if (calcIndex === -1) {return {};}  // Calculator not found

    const calculator = state.calculators[calcIndex];

    // Update calculator with new operation
    const updatedCalculator = {
      ...calculator,
      operation
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