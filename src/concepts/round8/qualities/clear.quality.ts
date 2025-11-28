// ============================================================================
// ROUND8 CLEAR QUALITY (v0.0.168)
// Clears specific calculator to zero state using r8_ manifold
// Note: Does NOT reset interchange - use round8InterchangeOff for that
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

    // Reset calculator to zero state (preserves interchange, clears decimal caches)
    const updatedCalculator = {
      ...calculator,
      input1: {
        value: zeroDisplay,
        buffer: zeroBuffer,
        binary: zeroBinary,
        decimal: null
      },
      input2: {
        value: zeroDisplay,
        buffer: zeroBuffer,
        binary: zeroBinary,
        decimal: null
      },
      output: {
        value: zeroDisplay,
        buffer: zeroBuffer,
        binary: zeroBinary,
        decimal: null
      },
      operation: null,
      activeInput: 'input1' as const
      // Note: Does NOT reset displayMode or interchange
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