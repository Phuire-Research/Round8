// ============================================================================
// ROUND8 BACKSPACE QUALITY
// Removes last digit from active input using r8_ manifold
// ============================================================================

import { createQualityCardWithPayload, defaultMethodCreator } from 'stratimux';
import { Round8BackspacePayload, Round8State } from './types';
import { r8_ } from '../model';

/**
 * Backspace on active input of specific calculator
 * Removes last digit from sequence
 */
export const round8Backspace = createQualityCardWithPayload<Round8State, Round8BackspacePayload>({
  type: 'Round8 Backspace',  // Verbose split naming convention
  reducer: (state, action) => {
    const { calculatorId } = action.payload;

    // Find calculator by ID
    const calcIndex = state.calculators.findIndex(c => c.id === calculatorId);
    if (calcIndex === -1) {return {};}  // Calculator not found

    const calculator = state.calculators[calcIndex];
    const inputState = calculator[calculator.activeInput];
    const currentSequence = inputState.value;

    if (!currentSequence) {return {};}  // Nothing to backspace

    // Remove last digit from raw sequence
    const newSequence = currentSequence.slice(0, -1);

    let buffer: bigint;
    let binary: string;
    let displayValue: string;

    if (newSequence === '' || newSequence === '-') {
      // Return to zero state
      buffer = r8_.terminology.createBuffer();
      binary = r8_.createBufferDisplay(buffer);
      displayValue = r8_.createRoundDisplay(buffer);
    } else {
      // Parse new sequence
      const parsedBuffer = r8_.parseStringToBuffer(newSequence);
      buffer = parsedBuffer || r8_.terminology.createBuffer();
      binary = r8_.createBufferDisplay(buffer);
      displayValue = r8_.createRoundDisplay(buffer);
    }

    // Update calculator with backspaced input
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
  },
  methodCreator: defaultMethodCreator
});