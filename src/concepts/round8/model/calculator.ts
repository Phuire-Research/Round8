/**
 * Round8 Calculator v0.0.14 - Binary-First Implementation
 *
 * Quantum-Resistant Architecture:
 * - Pure spool-based lookups (no binary operands)
 * - Dual display validation (Round8 ↔ Binary correspondence)
 * - Marquee system with shifted frame at position 21
 * - Full Twist special case handling
 * - Increment/Decrement operations (composing functions orchestrating muxifyWrung)
 *
 * @version 0.0.14
 * @purpose Compositional calculator API - create multiple instances inline
 */

import { r8_ } from './r8';

// ============================================================
// Type Definitions
// ============================================================

type ActiveInputIdentifier = 'input1' | 'input2';
export type OperationType = '+' | '-' | '>' | '<' | '>=' | '<=' | '==' | '!=' | null;

export interface InputState {
  value: string;                        // Round8 string ("1,2,3") - DISPLAY value (reversed)
  buffer: bigint;      // 64-bit buffer
  binary: string;                       // Binary display ("1|001|010|011|...")
}

export interface CalculatorState {
  input1: InputState;
  input2: InputState;
  output: InputState;
  operation: OperationType;
  activeInput: ActiveInputIdentifier;
  darkMode: boolean;
}

// ============================================================
// Calculator Factory - Creates New Calculator Instances
// ============================================================

/**
 * Create a new Round8 calculator instance
 * Each instance maintains its own independent state
 * Enables multiple calculators inline on same page
 *
 * @returns Calculator interface with operations and state access
 */
function createCalculator() {
  // Fresh state for THIS calculator instance
  const state: CalculatorState = {
    input1: {
      value: '',
      buffer: 0n,
      binary: ''
    },
    input2: {
      value: '',
      buffer: 0n,
      binary: ''
    },
    output: {
      value: '',
      buffer: 0n,
      binary: ''
    },
    operation: null,
    activeInput: 'input1',
    darkMode: true
  };

  // ============================================================
  // Calculator Operations (closure over THIS state)
  // ============================================================

  function handleDigitEntry(digit: number): void {
    const inputState = state[state.activeInput];
    // Build sequence in typed order (oldest first)
    const currentSequence = inputState.value;
    // Check if in zero state (should replace, not append)
    const isZeroState = !currentSequence ||
                        currentSequence === '0' ||
                        currentSequence === '' ||
                        currentSequence === '-0';
    // Append new digit to end (typed order), or replace if zero state
    const newSequence = isZeroState ? `${digit}` : `${currentSequence}${digit}`;

    // Parse directly (in typed order)
    const buffer = r8_.parseStringToBuffer(newSequence);
    if (buffer) {
      const binary = r8_.createBufferDisplay(buffer);
      const displayValue = r8_.createRoundDisplay(buffer);
      inputState.buffer = buffer;
      inputState.binary = binary;
      inputState.value = displayValue;  // Store formatted value for display
    }
  }

  function handleBackspace(): void {
    const inputState = state[state.activeInput];
    const currentSequence = inputState.value;

    if (!currentSequence) {return;}

    // Remove last digit from raw sequence
    const newSequence = currentSequence.slice(0, -1);

    if (newSequence === '') {
      inputState.value = '0';
      inputState.buffer = 0n;
      inputState.binary = r8_.createBufferDisplay(0n);
    } else {
      // Parse directly (in typed order)
      const buffer = r8_.parseStringToBuffer(newSequence);
      const binary = buffer ? r8_.createBufferDisplay(buffer) : r8_.createBufferDisplay(0n);

      inputState.buffer = buffer ? buffer : 0n;
      // Format the display value with proper comma placement
      const displayValue = r8_.createRoundDisplay(inputState.buffer);

      inputState.value = displayValue ? displayValue : '0';
      inputState.binary = binary ? binary : r8_.createBufferDisplay(0n);
    }
  }

  function handleZero(): void {
    const inputState = state[state.activeInput];
    inputState.value = r8_.createRoundDisplay(0n);
    inputState.buffer = 0n;
    inputState.binary = r8_.createBufferDisplay(0n);
  }

  function handleOperation(operation: OperationType): void {
    if (operation === null) return;
    state.operation = operation;
  }

  function handleCalculate(): void {
    const buffer1 = state.input1.buffer;
    const buffer2 = state.input2.buffer;
    const operation = state.operation;

    if (!operation) {
      console.warn('Round8 Calculator: No operation selected');
      return;
    }

    let result: bigint = 0n;

    if (operation === '+') {
      result = r8_.operations.add(buffer1, buffer2);
    } else if (operation === '-') {
      result = r8_.operations.subtract(buffer1, buffer2);

    // VIRIDIAN CRITICAL FIX: Native BigInt comparison (no precision loss)
    // Using native BigInt operators instead of r8_.logical to maintain full 63-bit precision
    // r8_.logical designed for BitRotationTuple (small values), not full bigint buffers
    } else if (operation === '>') {
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
      return;
    }

    state.output.buffer = result;
    state.output.binary = r8_.createBufferDisplay(result);
    state.output.value = r8_.createRoundDisplay(result);
  }

  function handleClear(): void {
    state.input1.value = '';
    state.input1.buffer = 0n;
    state.input1.binary = '';

    state.input2.value = '';
    state.input2.buffer = 0n;
    state.input2.binary = '';

    state.output.value = '';
    state.output.buffer = 0n;
    state.output.binary = '';

    state.operation = null;
    state.activeInput = 'input1';

    state.operation = null;
  }

  function handleInputSwitch(): void {
    state.activeInput = state.activeInput === 'input1' ? 'input2' : 'input1';
  }

  function handleSigned(): void {
    const inputState = state[state.activeInput];
    const flipped = r8_.terminology.flipSignBit(inputState.buffer);
    console.log('DOES THIS FLIP', flipped);
    inputState.buffer = flipped;
    inputState.binary = r8_.createBufferDisplay(flipped);
    inputState.value = r8_.createRoundDisplay(flipped);
  }

  function handleIncrement(): void {
    const inputState = state[state.activeInput];
    const incremented = r8_.operations.increment(inputState.buffer);
    inputState.buffer = incremented;
    inputState.binary = r8_.createBufferDisplay(incremented);
    inputState.value = r8_.createRoundDisplay(incremented);
  }

  function handleDecrement(): void {
    const inputState = state[state.activeInput];
    const decremented = r8_.operations.decrement(inputState.buffer);
    inputState.buffer = decremented;
    inputState.binary = r8_.createBufferDisplay(decremented);
    inputState.value = r8_.createRoundDisplay(decremented);
  }

  // ============================================================
  // Return Calculator Interface
  // ============================================================

  return {
    // State access
    state,
    // Calculator operations
    handleDigitEntry,
    handleBackspace,
    handleZero,
    handleOperation,
    // handleCalculate,
    handleSigned,
    handleIncrement,
    handleDecrement,
    handleClear,
    handleInputSwitch,
  };
}

// ============================================================
// Convenience Export - Default Calculator Instance
// ============================================================

/**
 * Default calculator instance for single-calculator use
 * For multiple calculators, use createCalculator() factory
 */
export const r8Calculator = createCalculator;
