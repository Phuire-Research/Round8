// ============================================================================
// ROUND8 SWITCH INPUT QUALITY
// Switches between input1 and input2 for specific calculator
// ============================================================================

import { createQualityCardWithPayload } from 'stratimux';
import { Round8State, Round8SwitchInputPayload } from './types';

/**
 * Switch active input between input1 and input2 for specific calculator
 */
export const round8SwitchInput = createQualityCardWithPayload<Round8State, Round8SwitchInputPayload>({
  type: 'Round8 Switch Input',  // Verbose split naming convention
  reducer: (state, action) => {
    const { calculatorId } = action.payload;

    // Find calculator by ID
    const calcIndex = state.calculators.findIndex(c => c.id === calculatorId);
    if (calcIndex === -1) {return {};}  // Calculator not found

    const calculator = state.calculators[calcIndex];

    // Toggle active input
    const updatedCalculator = {
      ...calculator,
      activeInput: calculator.activeInput === 'input1' ? 'input2' as const : 'input1' as const
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