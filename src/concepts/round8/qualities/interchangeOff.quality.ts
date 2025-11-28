// ============================================================================
// ROUND8 INTERCHANGE OFF QUALITY (v0.0.168)
// Turns off interchange and clears decimal caches
// ============================================================================

import { createQualityCardWithPayload, defaultMethodCreator } from 'stratimux';
import { Round8InterchangeOffPayload, Round8State } from './types';

/**
 * Turns off interchange for specific calculator
 * Resets displayMode to 'R8' and clears all decimal caches
 */
export const round8InterchangeOff = createQualityCardWithPayload<Round8State, Round8InterchangeOffPayload>({
  type: 'Round8 Interchange Off',
  reducer: (state, action) => {
    const { calculatorId } = action.payload;

    const calculatorIndex = state.calculators.findIndex(c => c.id === calculatorId);
    if (calculatorIndex === -1) {
      return {};
    }

    const calculator = state.calculators[calculatorIndex];

    const updatedCalculator = {
      ...calculator,
      interchange: false,
      displayMode: 'R8' as const,
      input1: {
        ...calculator.input1,
        decimal: null
      },
      input2: {
        ...calculator.input2,
        decimal: null
      },
      output: {
        ...calculator.output,
        decimal: null
      }
    };

    const updatedCalculators = [...state.calculators];
    updatedCalculators[calculatorIndex] = updatedCalculator;

    return { calculators: updatedCalculators };
  },
  methodCreator: defaultMethodCreator
});
