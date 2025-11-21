// ============================================================================
// ROUND8 CLEAR QUALITY
// Clears specific calculator to zero state using r8_ manifold
// ============================================================================

import { createQualityCardWithPayload, defaultMethodCreator } from 'stratimux';
import { r8_ } from '../model';
import { Round8ClearPayload, Round8State } from './types';

/**
 * Clear specific calculator to absolute zero state
 * Uses r8_ manifold for zero buffer creation
 */
export const round8Clear = createQualityCardWithPayload<Round8State, Round8ClearPayload>({
  type: 'Round8 Clear',  // Verbose split naming convention
  reducer: (state, action) => {
    const { calculatorId } = action.payload;

    // Find calculator by ID
    const calcIndex = state.calculators.findIndex(c => c.id === calculatorId);
    if (calcIndex === -1) {return {};}  // Calculator not found

    const calculator = state.calculators[calcIndex];

    // Create zero state using r8_ manifold
    const zeroBuffer = r8_.terminology.createBuffer();
    const zeroBinary = r8_.createBufferDisplay(zeroBuffer);
    const zeroDisplay = r8_.createRoundDisplay(zeroBuffer);

    // Reset calculator to zero state
    const updatedCalculator = {
      ...calculator,
      input1: {
        value: zeroDisplay,
        buffer: zeroBuffer,
        binary: zeroBinary
      },
      input2: {
        value: zeroDisplay,
        buffer: zeroBuffer,
        binary: zeroBinary
      },
      output: {
        value: zeroDisplay,
        buffer: zeroBuffer,
        binary: zeroBinary
      },
      operation: null,
      activeInput: 'input1' as const
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