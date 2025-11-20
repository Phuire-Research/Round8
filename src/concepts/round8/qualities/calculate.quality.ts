// ============================================================================
// ROUND8 CALCULATE QUALITY
// Executes calculation for specific calculator using r8_ manifold
// ============================================================================

import { createQualityCardWithPayload } from 'stratimux';
import { Round8CalculatePayload, Round8HistoryEntry, Round8State } from './types';
import { r8_ } from '../model';

/**
 * Execute calculation for specific calculator
 * Uses r8_ manifold for all operations
 */
export const round8Calculate = createQualityCardWithPayload<Round8State, Round8CalculatePayload>({
  type: 'Round8 Calculate',  // Verbose split naming convention
  reducer: (state, action) => {
    const { calculatorId } = action.payload;

    // Find calculator by ID
    const calcIndex = state.calculators.findIndex(c => c.id === calculatorId);
    if (calcIndex === -1) {return {};}  // Calculator not found

    const calculator = state.calculators[calcIndex];

    if (!calculator.operation) {
      console.warn('Round8 Calculator: No operation selected');
      return {};
    }

    const buffer1 = calculator.input1.buffer;
    const buffer2 = calculator.input2.buffer;
    const operation = calculator.operation;

    let result = 0n;

    // Perform operation using r8_ manifold or native BigInt for comparisons
    if (operation === '+') {
      result = r8_.operations.add(buffer1, buffer2);
    } else if (operation === '-') {
      result = r8_.operations.subtract(buffer1, buffer2);
    } else if (operation === '>') {
      // Native BigInt comparison for full precision
      result = buffer1 > buffer2 ? 1n : 0n;
    } else if (operation === '<') {
      result = buffer1 < buffer2 ? 1n : 0n;
    } else if (operation === '>=') {
      result = buffer1 >= buffer2 ? 1n : 0n;
    } else if (operation === '<=') {
      result = buffer1 <= buffer2 ? 1n : 0n;
    } else if (operation === '==') {
      result = buffer1 === buffer2 ? 1n : 0n;
    } else if (operation === '!=') {
      result = buffer1 !== buffer2 ? 1n : 0n;
    } else {
      console.warn(`Round8 Calculator: Operation not yet implemented: ${operation}`);
      return {};
    }

    // Create history entry
    const historyEntry: Round8HistoryEntry = {
      timestamp: Date.now(),
      operation,
      input1: calculator.input1.value,
      input2: calculator.input2.value,
      result: r8_.createRoundDisplay(result)
    };

    // Update calculator with result
    const updatedCalculator = {
      ...calculator,
      output: {
        buffer: result,
        binary: r8_.createBufferDisplay(result),
        value: r8_.createRoundDisplay(result)
      },
      history: [...calculator.history, historyEntry]
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