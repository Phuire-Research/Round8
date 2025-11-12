/**
 * Round8 Calculator v0.0.11 - Binary-First Implementation
 *
 * Quantum-Resistant Architecture:
 * - Pure spool-based lookups (no binary operands)
 * - Dual display validation (Round8 ↔ Binary correspondence)
 * - Marquee system with shifted frame at position 21
 * - Full Twist special case handling
 *
 * @version 0.0.11
 * @purpose Compositional calculator API - create multiple instances inline
 */

import { r8_ } from './r8';

// ============================================================
// Type Definitions
// ============================================================

type ActiveInputIdentifier = 'input1' | 'input2';
export type OperationType = '+' | '-' | null;

export interface InputState {
  value: string;                        // Round8 string ("1,2,3")
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
    console.log('HITTING', digit);

    const inputState = state[state.activeInput];
    const currentValue = inputState.value;
    // Just concatenate digits - no commas during entry
    const newValue = currentValue ? `${currentValue}${digit}` : `${digit}`;

    const buffer = r8_.parseStringToBuffer(newValue);
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
    const currentValue = inputState.value;

    if (!currentValue) {return;}

    // Remove commas to get raw digits, then remove last digit
    const rawDigits = currentValue.replace(/,/g, '');
    const newDigits = rawDigits.slice(0, -1);

    if (newDigits === '') {
      inputState.value = '0';
      inputState.buffer = 0n;
      inputState.binary = inputState.buffer.toLocaleString();
    } else {
      const buffer = r8_.parseStringToBuffer(newDigits);
      const binary = buffer?.toString();

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

  function handleOperation(operation: '+' | '-'): void {
    state.operation = operation;
  }

  // function handleCalculate(): void {
  //   const buffer1 = state.input1.buffer;
  //   const buffer2 = state.input2.buffer;

  //   let resultBuffer = 0n;

  //   if (state.operation === '+') {
  //     // resultBuffer = addRound8BuffersBinary(buffer1, buffer2);
  //   } else if (state.operation === '-') {
  //     // resultBuffer = subtractRound8BuffersBinary(buffer1, buffer2);
  //   } else {
  //     // showError('Invalid operation');
  //     return;
  //   }

  //   // const resultString = round8BufferToString(resultBuffer, true);
  //   // const resultBinary = round8BufferToBinaryString(resultBuffer, {
  //   //   separator: '|',
  //   //   includeSign: true
  //   // });

  //   // state.output.value = resultString;
  //   state.output.buffer = resultBuffer;
  //   // state.output.binary = resultBinary;
  // }

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
    inputState.buffer = flipped;
    inputState.binary = r8_.createBufferDisplay(flipped);
    inputState.value = r8_.createRoundDisplay(flipped);
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
