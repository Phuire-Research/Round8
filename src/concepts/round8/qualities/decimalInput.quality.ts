// ============================================================================
// ROUND8 DECIMAL INPUT QUALITY (v0.0.168)
// Accepts decimal input and converts to Round8, activates interchange
// ============================================================================

import { createQualityCardWithPayload, defaultMethodCreator } from 'stratimux';
import { r8_ } from '../model';
import { Round8DecimalInputPayload, Round8State } from './types';

/**
 * Inputs a decimal value to the active input of specific calculator
 * Converts decimal to Round8, activates interchange, and caches decimal values
 */
export const round8DecimalInput = createQualityCardWithPayload<Round8State, Round8DecimalInputPayload>({
  type: 'Round8 Decimal Input',
  reducer: (state, action) => {
    const { calculatorId, decimal } = action.payload;

    const calculatorIndex = state.calculators.findIndex(c => c.id === calculatorId);
    if (calculatorIndex === -1) {
      return {};
    }

    const calculator = state.calculators[calculatorIndex];
    const activeInputKey = calculator.activeInput;

    const round8String = r8_.interchange.decimalToRound8(decimal);
    const buffer = r8_.parseStringToBuffer(round8String);

    if (!buffer) {
      return {};
    }

    const updatedInput = {
      buffer,
      binary: r8_.createBufferDisplay(buffer),
      value: r8_.createRoundDisplay(buffer),
      decimal
    };

    const updatedCalculator = {
      ...calculator,
      [activeInputKey]: updatedInput,
      interchange: true,
      input1: {
        ...calculator.input1,
        decimal: activeInputKey === 'input1'
          ? decimal
          : (calculator.input1.value
              ? r8_.interchange.round8ToDecimal(calculator.input1.value)
              : 0)
      },
      input2: {
        ...calculator.input2,
        decimal: activeInputKey === 'input2'
          ? decimal
          : (calculator.input2.value
              ? r8_.interchange.round8ToDecimal(calculator.input2.value)
              : 0)
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
  },
  methodCreator: defaultMethodCreator
});
