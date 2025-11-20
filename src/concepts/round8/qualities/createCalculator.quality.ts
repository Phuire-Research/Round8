// ============================================================================
// ROUND8 CREATE CALCULATOR QUALITY
// Following Pattern 2: Payload Quality from STRATIMUX-REFERENCE.md
// ============================================================================

import { createQualityCardWithPayload } from 'stratimux';
import { r8_ } from '../model';
import { Round8Calculator, Round8CreateCalculatorPayload, Round8State } from './types';

/**
 * Creates a new Round8 calculator instance
 * Traverses the r8_ manifold for buffer creation
 */
export const round8CreateCalculator = createQualityCardWithPayload<Round8State, Round8CreateCalculatorPayload>({
  type: 'Round8 Create Calculator',  // Verbose split naming convention
  reducer: (state, action) => {
    const { name = `Calculator ${state.calculators.length + 1}` } = action.payload;

    // Generate unique ID
    const id = `calc-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

    // Create fresh calculator using r8_ manifold
    const zeroBuffer = r8_.terminology.createBuffer();
    const zeroBinary = r8_.createBufferDisplay(zeroBuffer);
    const zeroDisplay = r8_.createRoundDisplay(zeroBuffer);

    const newCalculator: Round8Calculator = {
      id,
      name,
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
      activeInput: 'input1',
      darkMode: state.globalDarkMode,
      history: []
    };

    // Return only changed properties (performance optimization)
    return {
      calculators: [...state.calculators, newCalculator]
    };
  }
});