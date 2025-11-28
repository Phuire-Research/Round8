/**
 * Round8 Calculator v0.0.168 - Interchange Enhancement
 *
 * Quantum-Resistant Architecture:
 * - Pure spool-based lookups (no binary operands)
 * - Dual display validation (Round8 ↔ Binary correspondence)
 * - Marquee system with shifted frame at position 21
 * - Full Twist special case handling
 * - Increment/Decrement operations (composing functions orchestrating muxifyWrung)
 *
 * Interchange System (v0.0.168):
 * - Display mode: 'R8' or 'DEC' for output format
 * - Interchange caching: Decimal values cached when active
 * - Decimal input: Accept decimal, convert to Round8
 * - Bidirectional: Round8 ↔ Decimal via r8_.interchange
 *
 * @version 0.0.168
 * @purpose Compositional calculator API - create multiple instances inline
 */

import { r8_ } from './r8';

// ============================================================
// Type Definitions
// ============================================================

type ActiveInputIdentifier = 'input1' | 'input2';
export type OperationType = '+' | '-' | '>' | '<' | '>=' | '<=' | '==' | '!=' | null;
export type DisplayMode = 'R8' | 'DEC';

export interface InputState {
  value: string;                        // Round8 string ("1,2,3") - DISPLAY value
  buffer: bigint;                       // 64-bit buffer
  binary: string;                       // Binary display ("1|001|010|011|...")
  decimal: number | null;               // Cached decimal value (when interchange active)
}

export interface CalculatorState {
  input1: InputState;
  input2: InputState;
  output: InputState;
  operation: OperationType;
  activeInput: ActiveInputIdentifier;
  darkMode: boolean;
  // Interchange System
  displayMode: DisplayMode;             // What to display: 'R8' or 'DEC'
  interchange: boolean;                 // Whether decimal caching is active
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
      binary: '',
      decimal: null,
    },
    input2: {
      value: '',
      buffer: 0n,
      binary: '',
      decimal: null,
    },
    output: {
      value: '',
      buffer: 0n,
      binary: '',
      decimal: null,
    },
    operation: null,
    activeInput: 'input1',
    darkMode: true,
    // Interchange defaults
    displayMode: 'R8',
    interchange: false,
  };

  // ============================================================
  // Interchange Helper - Cache decimal values when active
  // ============================================================

  function updateDecimalCache(): void {
    if (!state.interchange) return;

    // Cache all decimal values via interchange
    state.input1.decimal = state.input1.value
      ? r8_.interchange.round8ToDecimal(state.input1.value)
      : 0;
    state.input2.decimal = state.input2.value
      ? r8_.interchange.round8ToDecimal(state.input2.value)
      : 0;
    state.output.decimal = state.output.value
      ? r8_.interchange.round8ToDecimal(state.output.value)
      : 0;
  }

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
    updateDecimalCache();  // Guard built-in: no-op if interchange false
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
    updateDecimalCache();
  }

  function handleZero(): void {
    const inputState = state[state.activeInput];
    inputState.value = r8_.createRoundDisplay(0n);
    inputState.buffer = 0n;
    inputState.binary = r8_.createBufferDisplay(0n);
    updateDecimalCache();
  }

  function handleOperation(operation: OperationType): void {
    if (operation === null) {return;}
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

    let result = 0n;

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
    updateDecimalCache();
  }

  function handleClear(): void {
    // Set inputs to absolute 0
    state.input1.value = '0';
    state.input1.buffer = 0n;
    state.input1.binary = r8_.createBufferDisplay(0n);
    state.input1.decimal = null;

    state.input2.value = '0';
    state.input2.buffer = 0n;
    state.input2.binary = r8_.createBufferDisplay(0n);
    state.input2.decimal = null;

    // Set output to absolute 0
    state.output.value = '0';
    state.output.buffer = 0n;
    state.output.binary = r8_.createBufferDisplay(0n);
    state.output.decimal = null;

    state.operation = null;
    state.activeInput = 'input1';
    // Note: Does NOT reset interchange - user must explicitly call handleInterchangeOff()
  }

  function handleInputSwitch(): void {
    state.activeInput = state.activeInput === 'input1' ? 'input2' : 'input1';
  }

  function handleSigned(): void {
    const inputState = state[state.activeInput];
    const flipped = r8_.terminology.flipSignBit(inputState.buffer);
    inputState.buffer = flipped;
    inputState.binary = r8_.createBufferDisplay(flipped);
    inputState.value = r8_.createRoundDisplay(flipped);
    updateDecimalCache();
  }

  function handleIncrement(): void {
    const inputState = state[state.activeInput];
    const incremented = r8_.operations.increment(inputState.buffer);
    inputState.buffer = incremented;
    inputState.binary = r8_.createBufferDisplay(incremented);
    inputState.value = r8_.createRoundDisplay(incremented);
    updateDecimalCache();
  }

  function handleDecrement(): void {
    const inputState = state[state.activeInput];
    const decremented = r8_.operations.decrement(inputState.buffer);
    inputState.buffer = decremented;
    inputState.binary = r8_.createBufferDisplay(decremented);
    inputState.value = r8_.createRoundDisplay(decremented);
    updateDecimalCache();
  }

  // ============================================================
  // Interchange Operations
  // ============================================================

  function handleDisplayMode(mode: DisplayMode): void {
    state.displayMode = mode;

    // DEC display activates interchange
    if (mode === 'DEC') {
      state.interchange = true;
      updateDecimalCache();
    }
  }

  function handleDecimalInput(decimal: number): void {
    const inputState = state[state.activeInput];

    // Interchange: Decimal → Round8
    const round8String = r8_.interchange.decimalToRound8(decimal);
    const buffer = r8_.parseStringToBuffer(round8String);

    if (buffer) {
      inputState.buffer = buffer;
      inputState.binary = r8_.createBufferDisplay(buffer);
      inputState.value = r8_.createRoundDisplay(buffer);
      inputState.decimal = decimal;  // Direct cache
    }

    // Activate interchange and update all caches
    state.interchange = true;
    updateDecimalCache();
  }

  function handleInterchangeOff(): void {
    state.interchange = false;
    state.displayMode = 'R8';

    // Clear all decimal caches
    state.input1.decimal = null;
    state.input2.decimal = null;
    state.output.decimal = null;
  }

  function getDisplayValue(inputKey: 'input1' | 'input2' | 'output'): string {
    const inputState = state[inputKey];

    if (state.displayMode === 'DEC' && state.interchange) {
      if (inputState.decimal === null) return '0';
      // Format decimal with three-column comma ticks (e.g., 1,234,567)
      // Note: Round8 uses two-column ticks as base 72 system
      return inputState.decimal.toLocaleString('en-US');
    }

    return inputState.value || '0';
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
    handleCalculate,
    handleSigned,
    handleIncrement,
    handleDecrement,
    handleClear,
    handleInputSwitch,
    // Interchange operations
    handleDisplayMode,
    handleDecimalInput,
    handleInterchangeOff,
    getDisplayValue,
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
