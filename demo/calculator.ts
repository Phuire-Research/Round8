/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable complexity */
/**
 * Round8 Calculator v0.0.16 - UI Event Bindings
 *
 * Quantum-Resistant Architecture:
 * - Pure spool-based lookups (no binary operands)
 * - Dual display validation (Round8 ↔ Binary correspondence)
 * - Marquee system with shifted frame at position 21
 * - Full Twist special case handling
 *
 * Running Clock MVP:
 * - Single API fetch for seed value (not polling)
 * - Calculator-integrated arithmetic (Input1 + 1 = Output → hop → repeat)
 * - State retention on stop (user can continue manually)
 *
 * @version 0.0.16
 * @purpose DOM event bindings for calculator instance
 */

import { r8_,  } from '../src/index';
import type { CalculatorState, OperationType, Positions, InputState } from '../src/index';

// ============================================================
// Forever Clock Integration - MVP (Calculator Integrated)
// ============================================================

/**
 * Forever Clock API endpoint
 * Returns current Round8 value and metadata from the Running Clock service
 */
const FOREVER_CLOCK_ENDPOINT = 'https://api.unhex.dev/count';

/**
 * Clock seed data returned from Forever Clock API
 * Used to initialize calculator inputs on clock mode activation
 */
interface ClockSeedData {
  iteration: number;
  currentRound8: string;
  currentDecimal: string;
  running: boolean;
  startTime: number;
  lastIterationTime: number;
}

type Round8Calculator = {
  calc: ReturnType<typeof r8_.createCalculator>,
  count: number;
  clockRunning: boolean;
};

/**
 * Fetch clock seed value from Forever Clock API
 * Called ONCE on clock mode activation - not polled
 *
 * @returns Promise<ClockSeedData | null> - Full API response or null on failure
 */
async function fetchClockSeedValue(): Promise<ClockSeedData | null> {
  try {
    const response = await fetch(FOREVER_CLOCK_ENDPOINT);
    const data = await response.json();
    return data as ClockSeedData;
  } catch {
    // API unavailable - caller will use fallback seed of '0'
    return null;
  }
}

// ============================================================
// Running Clock MVP - Calculator Integration Functions
// ============================================================

/**
 * Initialize calculator inputs for Running Clock mode
 * Sets Input1 from API seed, Input2 = 1, Operation = +
 *
 * @param calc - Calculator instance
 * @param seedRound8 - Round8 string from API (e.g., "1,2,3")
 */
function initializeClockInputs(
  calculator: Round8Calculator,
  seedRound8: ClockSeedData
): void {
  const { iteration, currentRound8} = seedRound8;
  // Parse seed Round8 string to buffer (fallback to 0n)
  const seedBuffer = r8_.parseStringToBuffer(currentRound8) ?? r8_.parseStringToBuffer('0') as bigint;
  calculator.clockRunning = true;
  calculator.count = iteration;
  // Set Input1 to seed value from API
  calculator.calc.state.input1.buffer = seedBuffer;
  calculator.calc.state.input1.binary = r8_.createBufferDisplay(seedBuffer);
  calculator.calc.state.input1.value = r8_.createRoundDisplay(seedBuffer);

  // Set Input2 to constant 1
  calculator.calc.state.input2.buffer = r8_.parseStringToBuffer('1') as bigint;
  calculator.calc.state.input2.binary = r8_.createBufferDisplay(calculator.calc.state.input2.buffer);
  calculator.calc.state.input2.value = r8_.createRoundDisplay(calculator.calc.state.input2.buffer);

  // Set Operation to + (addition)
  calculator.calc.state.operation = '+';

  // Set active input to input1
  calculator.calc.state.activeInput = 'input1';
}

/**
 * Hop output result back to Input1
 * Core of the Running Clock calculation cycle - moves result for next iteration
 *
 * @param calc - Calculator instance
 */
function hopResultToInput1(
  calculator: Round8Calculator
): void {
  calculator.calc.state.input1.buffer = calculator.calc.state.output.buffer;
  calculator.calc.state.input1.binary = calculator.calc.state.output.binary;
  calculator.calc.state.input1.value = calculator.calc.state.output.value;
}

// ============================================================
// Running Clock Mode - Interval Management
// ============================================================

// Running Clock interval reference (module scope)
let runningClockIntervalId: ReturnType<typeof setInterval> | null = null;

/**
 * Update header clock display with Round8 value
 * Shows the current calculation result in clock mode
 *
 * @param round8Value - Round8 string to display (e.g., "1,2,3,4")
 */
function updateHeaderClockDisplay(round8Value: string): void {
  const display = document.getElementById('headerClockDisplay');
  if (display) {
    display.textContent = round8Value || '0';
  }
}

/**
 * Single calculation cycle: Calculate → Hop → Update Displays
 * Called by interval, performs NO API calls - pure local arithmetic
 *
 * @param calc - Calculator instance
 */
function runClockCalculationCycle(
  calculator: Round8Calculator
): void {
  // Perform calculation: Input1 + Input2 = Output
  calculator.calc.handleCalculate();
  calculator.count += 1;

  // Hop result back to Input1 for next cycle
  hopResultToInput1(calculator);

  // Update all displays synchronously
  updateInputDisplay(calculator, 1);
  updateInputDisplay(calculator, 2);
  updateOutputDisplay(calculator);
  updateOperationDisplay(calculator);

  // Update header clock display with Output value (the "tick")
  updateHeaderClockDisplay(calculator.calc.state.output.value);
}

/**
 * Start Running Clock with single API seed fetch
 * Initializes inputs from API, then starts pure calculation interval
 *
 * @param calc - Calculator instance
 */
async function startRunningClockCalculation(
  calculator: Round8Calculator
): Promise<void> {
  // Prevent duplicate intervals
  if (runningClockIntervalId !== null) {return;}

  // Add processing visual
  document.querySelector('.display-section')?.classList.add('processing-active');

  // SINGLE API FETCH for seed value
  const seedData = await fetchClockSeedValue();
  const seedRound8 = seedData?.currentRound8 ?? '0';

  console.log(`[RunningClock] Seed fetched: ${seedRound8}`);

  // Initialize calculator inputs from seed
  initializeClockInputs(calculator, seedData as ClockSeedData);

  // Update all displays with initial state
  updateInputDisplay(calculator, 1);
  updateInputDisplay(calculator, 2);
  updateOperationDisplay(calculator);
  updateActiveInputHighlight(calculator);

  // Perform initial calculation to populate output
  calculator.calc.handleCalculate();
  updateOutputDisplay(calculator);
  updateHeaderClockDisplay(calculator.calc.state.output.value);

  // Start 333ms calculation cycle (NO MORE API CALLS)
  runningClockIntervalId = setInterval(() => {
    runClockCalculationCycle(calculator);
  }, 333);

  console.log('[RunningClock] Started - 333ms calculation cycle (no API polling)');
}

/**
 * Stop Running Clock, retain calculator state
 * Clears interval and reverts visuals but PRESERVES Input1, Input2, Operation, Output
 * User can continue calculating manually from preserved values
 */
function stopRunningClockRetainState(): void {
  if (runningClockIntervalId !== null) {
    clearInterval(runningClockIntervalId);
    runningClockIntervalId = null;
    console.log('[RunningClock] Stopped - calculator state retained');
  }
  
  // Remove processing visual
  document.querySelector('.display-section')?.classList.remove('processing-active');

  // Revert header to CALC mode (VISUAL ONLY - calculator state preserved)
  const header = document.getElementById('calculatorHeader');
  const outputModeToggle = document.getElementById('outputModeToggle');
  const outputRow = document.getElementById('outputRow');

  if (header && header.getAttribute('data-mode') === 'clock') {
    header.setAttribute('data-mode', 'calc');
    header.setAttribute('aria-pressed', 'false');
    header.classList.remove('header-clock-mode');
  }

  // Revert output toggle visual to R8
  if (outputModeToggle) {
    outputModeToggle.setAttribute('aria-pressed', 'false');
  }
  if (outputRow) {
    outputRow.classList.remove('viridian');
  }

  // NOTE: Calculator state (Input1, Input2, Operation, Output) is INTENTIONALLY PRESERVED
  // User can continue calculating from these values manually
}

/**
 * Toggle between CALC and CLOCK header modes
 * Cascades state changes to output toggle and Running Clock
 *
 * @param calc - Calculator instance
 */
async function handleHeaderModeToggle(
  calculator: Round8Calculator
): Promise<void> {
  const header = document.getElementById('calculatorHeader');
  const outputModeToggle = document.getElementById('outputModeToggle');
  const outputRow = document.getElementById('outputRow');
  const calcSubtitle = document.getElementById('calcSubtitle');
  const clockSubtitle = document.getElementById('clockSubtitle');
  setTimeout(() => {
    updateOutputDisplay(calculator);
  }, 3);
  if (!header) {return;}

  const currentMode = header.getAttribute('data-mode');
  const newMode = currentMode === 'calc' ? 'clock' : 'calc';

  // Update header state
  header.setAttribute('data-mode', newMode);
  header.setAttribute('aria-pressed', newMode === 'clock' ? 'true' : 'false');
  header.classList.toggle('header-clock-mode', newMode === 'clock');

  // Toggle subtitle visibility
  if (newMode === 'clock') {
    calcSubtitle?.classList.add('inactive');
    clockSubtitle?.classList.remove('inactive');
  } else {
    calcSubtitle?.classList.remove('inactive');
    clockSubtitle?.classList.add('inactive');
  }

  if (newMode === 'clock') {
    // ENTERING CLOCK MODE - single fetch, then calculation
    await startRunningClockCalculation(calculator);

    // Sync output toggle to DEC (show decimal alongside Round8)
    if (outputModeToggle) {
      outputModeToggle.setAttribute('aria-pressed', 'true');
    }
    if (outputRow) {
      outputRow.classList.add('viridian');
    }
  } else {
    calculator.clockRunning = false;
    // ENTERING CALC MODE - stop but retain state
    stopRunningClockRetainState();
  }

  console.log(`[HeaderMode] Toggled to: ${newMode.toUpperCase()}`);
}

// ============================================================
// Display Update Functions
// ============================================================

/**
 * Update display for specified input (Round8 value and binary)
 * Reads from calculator state and updates DOM elements
 *
 * @param calc - Calculator instance
 * @param inputNumber - Which input to update (1 or 2)
 */
function updateInputDisplay(
  calculator: Round8Calculator,
  inputNumber: 1 | 2
): void {
  const inputState = inputNumber === 1 ? calculator.calc.state.input1 : calculator.calc.state.input2;

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
 * Checks output mode toggle for R8/DEC display
 *
 * @param calc - Calculator instance
 */
function updateOutputDisplay(
  calculator: Round8Calculator
): void {
  const outputState = calculator.calc.state.output;
  const outputModeToggle = document.getElementById('outputModeToggle');
  const isDecimalMode = outputModeToggle?.getAttribute('aria-pressed') === 'true';

  // Update value display based on mode
  const valueElement = document.getElementById('outputValue');
  if (valueElement) {
    if (isDecimalMode) {
      // DEC mode: show decimalOutput ("In Progress" or formatted decimal)
      valueElement.textContent = (calculator.count !== -1 && calculator.clockRunning) ? String(calculator.count) : 'In Progress';
    } else {
      // R8 mode: show Round8 formatted value
      valueElement.textContent = outputState.value || '0';
    }
  }

  // Update binary display (always shows binary regardless of mode)
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
  calculator: Round8Calculator
): void {
  const operation = calculator.calc.state.operation;

  const symbolElement = document.getElementById('operandSymbol');
  const buttonElement = document.getElementById('operandButton');
  const operandRow = document.getElementById('operandRow');

  if (!operation) {
    // Reset to Obsidian default state
    if (symbolElement) {symbolElement.textContent = '○';}
    if (buttonElement) {
      buttonElement.className = 'hifi-btn-obsidian';
      buttonElement.setAttribute('disabled', 'true');
      buttonElement.setAttribute('title', 'Suite 0: Obsidian - Foundational State');
    }
    if (operandRow) {operandRow.removeAttribute('data-operation');}
    return;
  }

  // Map operation to display values and HiFi button classes
  const operationMap: Record<Exclude<OperationType, null>, { symbol: string; btnClass: string; title: string }> = {
    '+': { symbol: '+', btnClass: 'hifi-btn-add', title: 'Addition - Rust: Prospection' },
    '-': { symbol: '−', btnClass: 'hifi-btn-subtract', title: 'Subtraction - Rose: Healing' },
    '>': { symbol: '>', btnClass: 'hifi-btn-compare', title: 'Greater Than - Amethyst: Operations' },
    '<': { symbol: '<', btnClass: 'hifi-btn-compare', title: 'Less Than - Amethyst: Operations' },
    '>=': { symbol: '≥', btnClass: 'hifi-btn-compare', title: 'Greater or Equal - Amethyst: Operations' },
    '<=': { symbol: '≤', btnClass: 'hifi-btn-compare', title: 'Less or Equal - Amethyst: Operations' },
    '==': { symbol: '=', btnClass: 'hifi-btn-compare', title: 'Equals - Amethyst: Operations' },
    '!=': { symbol: '≠', btnClass: 'hifi-btn-compare', title: 'Not Equal - Amethyst: Operations' }
  };

  const display = operationMap[operation];
  if (symbolElement) {symbolElement.textContent = display.symbol;}
  if (buttonElement) {
    buttonElement.className = display.btnClass;
    buttonElement.removeAttribute('disabled');
    buttonElement.setAttribute('title', display.title);
  }
  if (operandRow) {operandRow.setAttribute('data-operation', operation);}
}

/**
 * Update active input highlighting (cursor and row highlight)
 * Removes all active states, then applies to current activeInput
 *
 * @param calc - Calculator instance
 */
function updateActiveInputHighlight(
  calculator: Round8Calculator
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
  const activeRow = document.querySelector(`[data-input="${calculator.calc.state.activeInput}"]`);
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
  const calculator: Round8Calculator = {
    calc: r8_.createCalculator(),
    count: 0,
    clockRunning: false
  };

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
      (window as any).calculator = calculator.calc;
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
        calculator.calc.handleDigitEntry(i);
        const inputNum = calculator.calc.state.activeInput === 'input1' ? 1 : 2;
        updateInputDisplay(calculator, inputNum);
        stopRunningClockRetainState();
      });
    }
  }

  // Backspace button
  const backspaceBtn = document.getElementById('backspaceBtn');
  if (backspaceBtn) {
    backspaceBtn.addEventListener('click', () => {
      calculator.calc.handleBackspace();
      const inputNum = calculator.calc.state.activeInput === 'input1' ? 1 : 2;
      updateInputDisplay(calculator, inputNum);
      stopRunningClockRetainState();
    });
  }

  // Zero/Reset button
  const zeroBtn = document.getElementById('zeroBtn');
  if (zeroBtn) {
    zeroBtn.addEventListener('click', () => {
      calculator.calc.handleZero();
      const inputNum = calculator.calc.state.activeInput === 'input1' ? 1 : 2;
      updateInputDisplay(calculator, inputNum);
      stopRunningClockRetainState();
    });
  }

  // Signed button (flip sign bit)
  const signedBtn = document.getElementById('signedBtn');
  if (signedBtn) {
    signedBtn.addEventListener('click', () => {
      calculator.calc.handleSigned();
      const inputNum = calculator.calc.state.activeInput === 'input1' ? 1 : 2;
      updateInputDisplay(calculator, inputNum);
      stopRunningClockRetainState();
    });
  }

  // Increment/Decrement rotation buttons
  bindRotationButton(
    'incrementInput1Btn',
    () => {
      calculator.calc.state.activeInput = 'input1';
      calculator.calc.handleIncrement();
      stopRunningClockRetainState();
    },
    () => updateInputDisplay(calculator, 1)
  );

  bindRotationButton(
    'decrementInput1Btn',
    () => {
      calculator.calc.state.activeInput = 'input1';
      calculator.calc.handleDecrement();
      stopRunningClockRetainState();
    },
    () => updateInputDisplay(calculator, 1)
  );

  bindRotationButton(
    'incrementInput2Btn',
    () => {
      calculator.calc.state.activeInput = 'input2';
      calculator.calc.handleIncrement();
      stopRunningClockRetainState();
    },
    () => updateInputDisplay(calculator, 2)
  );

  bindRotationButton(
    'decrementInput2Btn',
    () => {
      calculator.calc.state.activeInput = 'input2';
      calculator.calc.handleDecrement();
      stopRunningClockRetainState();
    },
    () => updateInputDisplay(calculator, 2)
  );

  // Operation buttons
  const addBtn = document.getElementById('addBtn');
  if (addBtn) {
    addBtn.addEventListener('click', () => {
      calculator.calc.handleOperation('+');
      updateOperationDisplay(calculator);
      stopRunningClockRetainState();
    });
  }

  const subtractBtn = document.getElementById('subtractBtn');
  if (subtractBtn) {
    subtractBtn.addEventListener('click', () => {
      calculator.calc.handleOperation('-');
      updateOperationDisplay(calculator);
      stopRunningClockRetainState();
    });
  }

  // Comparison operator buttons
  const greaterBtn = document.getElementById('greaterBtn');
  if (greaterBtn) {
    greaterBtn.addEventListener('click', () => {
      calculator.calc.handleOperation('>');
      updateOperationDisplay(calculator);
      stopRunningClockRetainState();
    });
  }

  const greaterEqualBtn = document.getElementById('greaterEqualBtn');
  if (greaterEqualBtn) {
    greaterEqualBtn.addEventListener('click', () => {
      calculator.calc.handleOperation('>=');
      updateOperationDisplay(calculator);
      stopRunningClockRetainState();
    });
  }

  const lessBtn = document.getElementById('lessBtn');
  if (lessBtn) {
    lessBtn.addEventListener('click', () => {
      calculator.calc.handleOperation('<');
      updateOperationDisplay(calculator);
      stopRunningClockRetainState();
    });
  }

  const lessEqualBtn = document.getElementById('lessEqualBtn');
  if (lessEqualBtn) {
    lessEqualBtn.addEventListener('click', () => {
      calculator.calc.handleOperation('<=');
      updateOperationDisplay(calculator);
      stopRunningClockRetainState();
    });
  }

  const equalsBtn = document.getElementById('equalsBtn');
  if (equalsBtn) {
    equalsBtn.addEventListener('click', () => {
      calculator.calc.handleOperation('==');
      updateOperationDisplay(calculator);
      stopRunningClockRetainState();
    });
  }

  // Calculate button
  const calculateBtn = document.getElementById('calculateBtn');
  if (calculateBtn) {
    calculateBtn.addEventListener('click', () => {
      calculator.calc.handleCalculate();
      updateOutputDisplay(calculator);
      // Activate output display (restore saturation)
      const outputRow = document.getElementById('outputRow');
      if (outputRow) {
        outputRow.classList.add('output-row-active');
      }
      stopRunningClockRetainState();
    });
  }

  // Clear button
  const clearBtn = document.getElementById('clearBtn');
  if (clearBtn) {
    clearBtn.addEventListener('click', () => {
      calculator.calc.handleClear();
      updateInputDisplay(calculator, 1);
      updateInputDisplay(calculator, 2);
      updateOutputDisplay(calculator);
      updateOperationDisplay(calculator);
      calculator.calc.state.activeInput = 'input1';
      // Deactivate output display (restore desaturation)
      const outputRow = document.getElementById('outputRow');
      if (outputRow) {
        outputRow.classList.remove('output-row-active');
      }
      stopRunningClockRetainState();
    });
  }

  // Flip/Switch input button
  const flipBtn = document.getElementById('flipBtn');
  if (flipBtn) {
    flipBtn.addEventListener('click', () => {
      calculator.calc.handleInputSwitch();
      updateActiveInputHighlight(calculator);
      stopRunningClockRetainState();
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
      if (calculator.calc.state.activeInput !== 'input1') {
        calculator.calc.handleInputSwitch();
        updateActiveInputHighlight(calculator);
        stopRunningClockRetainState();
      }
    });
  }

  const input2Row = document.getElementById('input2Row');
  if (input2Row) {
    input2Row.addEventListener('click', () => {
      if (calculator.calc.state.activeInput !== 'input2') {
        calculator.calc.handleInputSwitch();
        updateActiveInputHighlight(calculator);
        stopRunningClockRetainState();
      }
    });
  }

  // Initialize active input highlighting on load
  updateActiveInputHighlight(calculator);

  // Initialize both inputs with absolute 0 and populate binary displays
  calculator.calc.state.activeInput = 'input1';
  calculator.calc.handleZero();
  updateInputDisplay(calculator, 1);

  calculator.calc.state.activeInput = 'input2';
  calculator.calc.handleZero();
  updateInputDisplay(calculator, 2);

  // Initialize output with absolute 0
  calculator.calc.state.output.value = '0';
  calculator.calc.state.output.buffer = 0n;
  calculator.calc.state.output.binary = r8_.createBufferDisplay(0n);
  updateOutputDisplay(calculator);

  // Reset to input1 as active
  calculator.calc.state.activeInput = 'input1';
  updateActiveInputHighlight(calculator);

  // Output Mode Toggle (R8/DEC) - Independent display toggle
  const outputModeToggle = document.getElementById('outputModeToggle');
  const outputRow = document.getElementById('outputRow');
  if (outputModeToggle) {
    outputModeToggle.addEventListener('click', () => {
      const isCurrentlyPressed = outputModeToggle.getAttribute('aria-pressed') === 'true';
      const newState = !isCurrentlyPressed;

      // Toggle button state
      outputModeToggle.setAttribute('aria-pressed', String(newState));

      // Toggle visual styling
      if (outputRow) {
        outputRow.classList.toggle('viridian', newState);
      }

      // Update display to reflect new mode
      updateOutputDisplay(calculator);
    });
  }

  // Header Mode Toggle (CALC/CLOCK) - Primary toggle
  const calculatorHeader = document.getElementById('calculatorHeader');
  if (calculatorHeader) {
    // Click handler (async for API fetch)
    calculatorHeader.addEventListener('click', async () => {
      await handleHeaderModeToggle(calculator);
    });

    // Keyboard handler (Enter/Space) - async
    calculatorHeader.addEventListener('keydown', async (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        await handleHeaderModeToggle(calculator);
      }
    });
  }

  console.log('Calculator UI bindings initialized');
  console.log('Round8 Calculator v0.0.16 - Running Clock MVP (Calculator Integrated)');
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