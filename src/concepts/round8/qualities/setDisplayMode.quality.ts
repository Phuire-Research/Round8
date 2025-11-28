// ============================================================================
// ROUND8 SET DISPLAY MODE QUALITY (v0.0.168)
// Setting 'DEC' automatically activates interchange
// ============================================================================

import { createQualityCardWithPayload, defaultMethodCreator } from 'stratimux';
import { r8_ } from '../model';
import { Round8SetDisplayModePayload, Round8State } from './types';

/**
 * Sets display mode for specific calculator
 * Setting 'DEC' automatically activates interchange and updates decimal cache
 */
export const round8SetDisplayMode = createQualityCardWithPayload<Round8State, Round8SetDisplayModePayload>({
  type: 'Round8 Set Display Mode',
  reducer: (state, action) => {
    const { calculatorId, mode } = action.payload;

    const calculatorIndex = state.calculators.findIndex(c => c.id === calculatorId);
    if (calculatorIndex === -1) {
      return {};
    }

    const calculator = state.calculators[calculatorIndex];

    if (mode === 'DEC') {
      const updatedCalculator = {
        ...calculator,
        displayMode: mode,
        interchange: true,
        input1: {
          ...calculator.input1,
          decimal: calculator.input1.value
            ? r8_.interchange.round8ToDecimal(calculator.input1.value)
            : 0
        },
        input2: {
          ...calculator.input2,
          decimal: calculator.input2.value
            ? r8_.interchange.round8ToDecimal(calculator.input2.value)
            : 0
        },
        output: {
          ...calculator.output,
          decimal: calculator.output.value
            ? r8_.interchange.round8ToDecimal(calculator.output.value)
            : 0
        }
      };

      const updatedCalculators = [...state.calculators];
      updatedCalculators[calculatorIndex] = updatedCalculator;

      return { calculators: updatedCalculators };
    }

    const updatedCalculator = {
      ...calculator,
      displayMode: mode
    };

    const updatedCalculators = [...state.calculators];
    updatedCalculators[calculatorIndex] = updatedCalculator;

    return { calculators: updatedCalculators };
  },
  methodCreator: defaultMethodCreator
});
