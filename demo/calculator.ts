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

import { createCalculator } from './calculator-binary';

/**
 * Initialize calculator UI with DOM event bindings
 * Creates a new calculator instance and binds to DOM elements
 */
function initializeCalculator(): void {
  // Create calculator instance (fresh state, not singleton)
  const calc = createCalculator();

  // Initialize calculator state
  calc.initializeCalculatorState();

  // ============================================================
  // DOM Event Bindings
  // ============================================================

  // Digit buttons (1-8)
  for (let i = 1; i <= 8; i++) {
    const button = document.querySelector(`[data-position="${i}"]`);
    if (button) {
      button.addEventListener('click', () => calc.handleDigitEntry(i));
    }
  }

  // Backspace button
  const backspaceBtn = document.getElementById('backspaceBtn');
  if (backspaceBtn) {
    backspaceBtn.addEventListener('click', () => calc.handleBackspace());
  }

  // Zero/Reset button
  const zeroBtn = document.getElementById('zeroBtn');
  if (zeroBtn) {
    zeroBtn.addEventListener('click', () => calc.handleZero());
  }

  // Comma button (visual only)
  const commaBtn = document.getElementById('commaBtn');
  if (commaBtn) {
    commaBtn.addEventListener('click', () => calc.handleComma());
  }

  // Operation buttons
  const addBtn = document.getElementById('addBtn');
  if (addBtn) {
    addBtn.addEventListener('click', () => calc.handleOperation('+'));
  }

  const subtractBtn = document.getElementById('subtractBtn');
  if (subtractBtn) {
    subtractBtn.addEventListener('click', () => calc.handleOperation('-'));
  }

  // Calculate button
  const calculateBtn = document.getElementById('calculateBtn');
  if (calculateBtn) {
    calculateBtn.addEventListener('click', () => calc.handleCalculate());
  }

  // Clear button
  const clearBtn = document.getElementById('clearBtn');
  if (clearBtn) {
    clearBtn.addEventListener('click', () => calc.handleClear());
  }

  // Flip/Switch input button
  const flipBtn = document.getElementById('flipBtn');
  if (flipBtn) {
    flipBtn.addEventListener('click', () => calc.handleInputSwitch());
  }

  // Dark mode toggle
  const darkModeToggle = document.getElementById('darkModeToggle');
  if (darkModeToggle) {
    darkModeToggle.addEventListener('change', () => calc.handleDarkModeToggle());
  }

  // Input row click handlers
  const input1Row = document.getElementById('input1Row');
  if (input1Row) {
    input1Row.addEventListener('click', () => {
      calc.state.activeInput = 'input1';
      calc.updateActiveInputHighlight();
    });
  }

  const input2Row = document.getElementById('input2Row');
  if (input2Row) {
    input2Row.addEventListener('click', () => {
      calc.state.activeInput = 'input2';
      calc.updateActiveInputHighlight();
    });
  }

  console.log('Calculator UI bindings initialized');
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