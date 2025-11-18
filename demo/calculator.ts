/**
 * Round8 Calculator v0.0.11 - UI Event Bindings
 *
 * Quantum-Resistant Architecture:
 * - Pure spool-based lookups (no binary operands)
 * - Dual display validation (Round8 ↔ Binary correspondence)
 * - Marquee system with shifted frame at position 21
 * - Full Twist special case handling
 *
 * @version 0.0.11
 * @purpose DOM event bindings for calculator instance
 */

import { r8_,  } from '../src/index';
import type { CalculatorState, OperationType, Positions, InputState } from '../src/index';

/**
 * Update display for specified input (Round8 value and binary)
 * Reads from calculator state and updates DOM elements
 *
 * @param calc - Calculator instance
 * @param inputNumber - Which input to update (1 or 2)
 */
function updateInputDisplay(
  calc: ReturnType<typeof r8_.createCalculator>,
  inputNumber: 1 | 2
): void {
  const inputState = inputNumber === 1 ? calc.state.input1 : calc.state.input2;

  // Update Round8 value display
  const valueElement = document.getElementById(`input${inputNumber}Value`);
  if (valueElement) {
    valueElement.textContent = inputState.value || '';
  }

  // Update binary display
  const binaryElement = document.getElementById(`input${inputNumber}Binary`);
  if (binaryElement) {
    binaryElement.textContent = inputState.binary || '';
  }
}

/**
 * Update output display (Round8 value and binary)
 * Reads from calculator output state and updates DOM elements
 *
 * @param calc - Calculator instance
 */
function updateOutputDisplay(
  calc: ReturnType<typeof r8_.createCalculator>
): void {
  const outputState = calc.state.output;

  // Update Round8 value display
  const valueElement = document.getElementById('outputValue');
  if (valueElement) {
    valueElement.textContent = outputState.value || '';
  }

  // Update binary display
  const binaryElement = document.getElementById('outputBinary');
  if (binaryElement) {
    binaryElement.textContent = outputState.binary || '';
  }
}

/**
 * Update operation display (symbol and name)
 * Reads from calculator operation state and updates DOM elements
 *
 * @param calc - Calculator instance
 */
function updateOperationDisplay(
  calc: ReturnType<typeof r8_.createCalculator>
): void {
  const operation = calc.state.operation;

  const symbolElement = document.getElementById('operandSymbol');
  const nameElement = document.getElementById('operandName');
  const operandRow = document.getElementById('operandRow');

  if (!operation) {
    if (symbolElement) symbolElement.textContent = '';
    if (nameElement) nameElement.textContent = '';
    if (operandRow) operandRow.removeAttribute('data-operation');
    return;
  }

  // Map operation to display values
  const operationMap: Record<Exclude<OperationType, null>, { symbol: string; name: string }> = {
    '+': { symbol: '+', name: 'Addition' },
    '-': { symbol: '−', name: 'Subtraction' },
    '>': { symbol: '>', name: 'Greater Than' },
    '<': { symbol: '<', name: 'Less Than' },
    '>=': { symbol: '≥', name: 'Greater or Equal' },
    '<=': { symbol: '≤', name: 'Less or Equal' },
    '==': { symbol: '=', name: 'Equals' },
    '!=': { symbol: '≠', name: 'Not Equal' }
  };

  const display = operationMap[operation];
  if (symbolElement) symbolElement.textContent = display.symbol;
  if (nameElement) nameElement.textContent = display.name;
  if (operandRow) operandRow.setAttribute('data-operation', operation);
}

/**
 * Update active input highlighting (cursor and row highlight)
 * Removes all active states, then applies to current activeInput
 *
 * @param calc - Calculator instance
 */
function updateActiveInputHighlight(
  calc: ReturnType<typeof r8_.createCalculator>
): void {
  // Remove all active states
  document.querySelectorAll('.input-row').forEach(row => {
    row.classList.remove('input-row-active');
    const cursor = row.querySelector('.input-cursor');
    if (cursor) {
      (cursor as HTMLElement).style.opacity = '0';
    }
  });

  // Add active state to current input
  const activeRow = document.querySelector(`[data-input="${calc.state.activeInput}"]`);
  if (activeRow) {
    activeRow.classList.add('input-row-active');
    const cursor = activeRow.querySelector('.input-cursor');
    if (cursor) {
      (cursor as HTMLElement).style.opacity = '1';
    }
  }
}

/**
 * Show error message with auto-hide timeout
 *
 * @param message - Error message to display
 */
function showError(message: string): void {
  const errorMessage = document.getElementById('errorMessage');
  const errorRow = document.getElementById('errorRow');

  if (errorMessage) {
    errorMessage.textContent = message;
  }
  if (errorRow) {
    errorRow.classList.remove('hidden');
  }

  // Auto-hide after 3 seconds
  setTimeout(() => {
    if (errorRow) {
      errorRow.classList.add('hidden');
    }
  }, 3000);
}

/**
 * Hide error message immediately
 */
function hideError(): void {
  const errorRow = document.getElementById('errorRow');
  if (errorRow) {
    errorRow.classList.add('hidden');
  }
}

/**
 * Bind rotation button (increment/decrement) to handler and display update
 * Helper to reduce code duplication for 4 rotation buttons
 *
 * @param buttonId - DOM element ID
 * @param handler - Click handler function
 * @param updateDisplay - Display update callback
 */
function bindRotationButton(
  buttonId: string,
  handler: () => void,
  updateDisplay: () => void
): void {
  const button = document.getElementById(buttonId);
  if (button) {
    button.addEventListener('click', () => {
      handler();
      updateDisplay();
    });
  }
}

/**
 * Initialize calculator UI with DOM event bindings
 * Creates a new calculator instance and binds to DOM elements
 */
function initializeCalculator(): void {
  // Create calculator instance (fresh state, not singleton)
  const calc = r8_.createCalculator();

  // ============================================================
  // Public API Exposure - Developer Console Access
  // ============================================================

  // Expose Round8 breadboard and calculator instance to console
  if (typeof window !== 'undefined') {
    // Check before overwriting to avoid namespace collision
    if (!(window as any).r8) {
      (window as any).r8 = r8_;
      console.log('🔧 Round8 Breadboard API exposed to console');
      console.log('   Access via: window.r8');
      console.log('   Example: window.r8.operations.add(5n, 3n)');
    } else {
      console.warn('⚠️  window.r8 already exists - skipping Round8 API exposure');
    }

    if (!(window as any).calculator) {
      (window as any).calculator = calc;
      console.log('📊 Calculator Instance exposed to console');
      console.log('   Access via: window.calculator');
      console.log('   Example: window.calculator.state.input1.buffer');
    } else {
      console.warn('⚠️  window.calculator already exists - skipping calculator exposure');
    }
  }

  // ============================================================
  // DOM Event Bindings
  // ============================================================

  // Digit buttons (1-8)
  for (let i = 1; i <= 8; i++) {
    const button = document.querySelector(`[data-position="${i}"]`);
    if (button) {
      button.addEventListener('click', () => {
        calc.handleDigitEntry(i);
        const inputNum = calc.state.activeInput === 'input1' ? 1 : 2;
        updateInputDisplay(calc, inputNum);
      });
    }
  }

  // Backspace button
  const backspaceBtn = document.getElementById('backspaceBtn');
  if (backspaceBtn) {
    backspaceBtn.addEventListener('click', () => {
      calc.handleBackspace();
      const inputNum = calc.state.activeInput === 'input1' ? 1 : 2;
      updateInputDisplay(calc, inputNum);
    });
  }

  // Zero/Reset button
  const zeroBtn = document.getElementById('zeroBtn');
  if (zeroBtn) {
    zeroBtn.addEventListener('click', () => {
      calc.handleZero();
      const inputNum = calc.state.activeInput === 'input1' ? 1 : 2;
      updateInputDisplay(calc, inputNum);
    });
  }

  // Signed button (flip sign bit)
  const signedBtn = document.getElementById('signedBtn');
  if (signedBtn) {
    signedBtn.addEventListener('click', () => {
      calc.handleSigned();
      const inputNum = calc.state.activeInput === 'input1' ? 1 : 2;
      updateInputDisplay(calc, inputNum);
    });
  }

  // Increment/Decrement rotation buttons
  bindRotationButton(
    'incrementInput1Btn',
    () => {
      calc.state.activeInput = 'input1';
      calc.handleIncrement();
    },
    () => updateInputDisplay(calc, 1)
  );

  bindRotationButton(
    'decrementInput1Btn',
    () => {
      calc.state.activeInput = 'input1';
      calc.handleDecrement();
    },
    () => updateInputDisplay(calc, 1)
  );

  bindRotationButton(
    'incrementInput2Btn',
    () => {
      calc.state.activeInput = 'input2';
      calc.handleIncrement();
    },
    () => updateInputDisplay(calc, 2)
  );

  bindRotationButton(
    'decrementInput2Btn',
    () => {
      calc.state.activeInput = 'input2';
      calc.handleDecrement();
    },
    () => updateInputDisplay(calc, 2)
  );

  // Operation buttons
  const addBtn = document.getElementById('addBtn');
  if (addBtn) {
    addBtn.addEventListener('click', () => {
      calc.handleOperation('+');
      updateOperationDisplay(calc);
    });
  }

  const subtractBtn = document.getElementById('subtractBtn');
  if (subtractBtn) {
    subtractBtn.addEventListener('click', () => {
      calc.handleOperation('-');
      updateOperationDisplay(calc);
    });
  }

  // Comparison operator buttons
  const greaterBtn = document.getElementById('greaterBtn');
  if (greaterBtn) {
    greaterBtn.addEventListener('click', () => {
      calc.handleOperation('>');
      updateOperationDisplay(calc);
    });
  }

  const greaterEqualBtn = document.getElementById('greaterEqualBtn');
  if (greaterEqualBtn) {
    greaterEqualBtn.addEventListener('click', () => {
      calc.handleOperation('>=');
      updateOperationDisplay(calc);
    });
  }

  const lessBtn = document.getElementById('lessBtn');
  if (lessBtn) {
    lessBtn.addEventListener('click', () => {
      calc.handleOperation('<');
      updateOperationDisplay(calc);
    });
  }

  const lessEqualBtn = document.getElementById('lessEqualBtn');
  if (lessEqualBtn) {
    lessEqualBtn.addEventListener('click', () => {
      calc.handleOperation('<=');
      updateOperationDisplay(calc);
    });
  }

  const equalsBtn = document.getElementById('equalsBtn');
  if (equalsBtn) {
    equalsBtn.addEventListener('click', () => {
      calc.handleOperation('==');
      updateOperationDisplay(calc);
    });
  }

  // Calculate button
  const calculateBtn = document.getElementById('calculateBtn');
  if (calculateBtn) {
    calculateBtn.addEventListener('click', () => {
      calc.handleCalculate();
      updateOutputDisplay(calc);
    });
  }

  // Clear button
  const clearBtn = document.getElementById('clearBtn');
  if (clearBtn) {
    clearBtn.addEventListener('click', () => {
      calc.handleClear();
      updateInputDisplay(calc, 1);
      updateInputDisplay(calc, 2);
      updateOperationDisplay(calc);
    });
  }

  // Flip/Switch input button
  const flipBtn = document.getElementById('flipBtn');
  if (flipBtn) {
    flipBtn.addEventListener('click', () => {
      calc.handleInputSwitch();
      updateActiveInputHighlight(calc);
    });
  }

  // // Dark mode toggle
  // const darkModeToggle = document.getElementById('darkModeToggle');
  // if (darkModeToggle) {
  //   darkModeToggle.addEventListener('change', () => calc.handleDarkModeToggle());
  // }

  // Input row click handlers
  const input1Row = document.getElementById('input1Row');
  if (input1Row) {
    input1Row.addEventListener('click', () => {
      if (calc.state.activeInput !== 'input1') {
        calc.handleInputSwitch();
        updateActiveInputHighlight(calc);
      }
    });
  }

  const input2Row = document.getElementById('input2Row');
  if (input2Row) {
    input2Row.addEventListener('click', () => {
      if (calc.state.activeInput !== 'input2') {
        calc.handleInputSwitch();
        updateActiveInputHighlight(calc);
      }
    });
  }

  // Initialize active input highlighting on load
  updateActiveInputHighlight(calc);

  // Initialize both inputs with absolute 0 and populate binary displays
  calc.state.activeInput = 'input1';
  calc.handleZero();
  updateInputDisplay(calc, 1);

  calc.state.activeInput = 'input2';
  calc.handleZero();
  updateInputDisplay(calc, 2);

  // Reset to input1 as active
  calc.state.activeInput = 'input1';
  updateActiveInputHighlight(calc);

  console.log('Calculator UI bindings initialized');
  console.log('Round8 Calculator v0.0.11 - Display reactivity enabled');
}

/**
 * Entry point execution
 * Check if document is ready, otherwise wait for DOMContentLoaded
 */
if (typeof window !== 'undefined') {
  if (document.readyState === 'complete' || document.readyState === 'interactive') {
    initializeCalculator();
  } else {
    document.addEventListener('DOMContentLoaded', initializeCalculator);
  }
}

export { initializeCalculator };