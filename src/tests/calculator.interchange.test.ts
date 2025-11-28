/**
 * Calculator Interchange Test Suite - v0.0.168
 *
 * Tests interchange functionality for the Round8 Calculator:
 * - displayMode: 'R8' | 'DEC' - controls output format
 * - interchange: boolean - controls decimal caching
 *
 * Interchange Behavior:
 * - Setting displayMode to 'DEC' automatically activates interchange
 * - Decimal values are cached when interchange is active
 * - Cache persists until explicit handleInterchangeOff()
 * - handleClear() does NOT reset interchange
 *
 * @version 0.0.168
 */

import { r8_ } from '../index';

describe('Calculator Interchange System - v0.0.168', () => {
  describe('Initial State', () => {
    test('calculator starts with interchange disabled', () => {
      const calc = r8_.createCalculator();

      expect(calc.state.displayMode).toBe('R8');
      expect(calc.state.interchange).toBe(false);
      expect(calc.state.input1.decimal).toBeNull();
      expect(calc.state.input2.decimal).toBeNull();
      expect(calc.state.output.decimal).toBeNull();
    });
  });

  describe('handleDisplayMode - Display Mode Control', () => {
    test('setting displayMode to DEC activates interchange', () => {
      const calc = r8_.createCalculator();

      calc.handleDisplayMode('DEC');

      expect(calc.state.displayMode).toBe('DEC');
      expect(calc.state.interchange).toBe(true);
    });

    test('setting displayMode to DEC caches decimal values', () => {
      const calc = r8_.createCalculator();

      // Enter some values
      calc.handleDigitEntry(4);
      calc.handleDigitEntry(2);
      calc.handleInputSwitch();
      calc.handleDigitEntry(1);
      calc.handleDigitEntry(3);

      // Activate DEC mode
      calc.handleDisplayMode('DEC');

      // Verify decimal caches populated
      expect(calc.state.input1.decimal).not.toBeNull();
      expect(calc.state.input2.decimal).not.toBeNull();
    });

    test('toggling back to R8 preserves interchange cache', () => {
      const calc = r8_.createCalculator();

      // Enter value and activate DEC
      calc.handleDigitEntry(8);
      calc.handleDisplayMode('DEC');

      // Toggle back to R8
      calc.handleDisplayMode('R8');

      // Interchange still active, cache preserved
      expect(calc.state.displayMode).toBe('R8');
      expect(calc.state.interchange).toBe(true);
      expect(calc.state.input1.decimal).not.toBeNull();
    });
  });

  describe('handleDecimalInput - Decimal Input Acceptance', () => {
    test('accepts decimal input and converts to Round8', () => {
      const calc = r8_.createCalculator();

      // Input decimal 72 (should be Round8 "88")
      calc.handleDecimalInput(72);

      // Verify conversion
      expect(calc.state.input1.value).toBe('88');
      expect(calc.state.input1.decimal).toBe(72);
    });

    test('decimal input activates interchange', () => {
      const calc = r8_.createCalculator();

      expect(calc.state.interchange).toBe(false);

      calc.handleDecimalInput(42);

      expect(calc.state.interchange).toBe(true);
    });

    test('decimal input operates on active input', () => {
      const calc = r8_.createCalculator();

      // Set input1
      calc.handleDigitEntry(5);

      // Switch to input2 and enter decimal
      calc.handleInputSwitch();
      calc.handleDecimalInput(100);

      // Verify input1 unchanged, input2 updated
      expect(calc.state.input1.value).toBe('5');
      expect(calc.state.input2.decimal).toBe(100);
    });
  });

  describe('handleInterchangeOff - Reset Interchange', () => {
    test('turns off interchange and resets displayMode', () => {
      const calc = r8_.createCalculator();

      // Activate interchange
      calc.handleDisplayMode('DEC');
      expect(calc.state.interchange).toBe(true);

      // Turn off
      calc.handleInterchangeOff();

      expect(calc.state.interchange).toBe(false);
      expect(calc.state.displayMode).toBe('R8');
    });

    test('clears all decimal caches', () => {
      const calc = r8_.createCalculator();

      // Enter values and activate DEC
      calc.handleDigitEntry(4);
      calc.handleInputSwitch();
      calc.handleDigitEntry(2);
      calc.handleDisplayMode('DEC');

      // Verify caches populated
      expect(calc.state.input1.decimal).not.toBeNull();
      expect(calc.state.input2.decimal).not.toBeNull();

      // Turn off interchange
      calc.handleInterchangeOff();

      // Verify caches cleared
      expect(calc.state.input1.decimal).toBeNull();
      expect(calc.state.input2.decimal).toBeNull();
      expect(calc.state.output.decimal).toBeNull();
    });
  });

  describe('handleClear - Clear vs Interchange', () => {
    test('clear does NOT reset interchange', () => {
      const calc = r8_.createCalculator();

      // Activate interchange
      calc.handleDigitEntry(5);
      calc.handleDisplayMode('DEC');
      expect(calc.state.interchange).toBe(true);

      // Clear
      calc.handleClear();

      // Interchange still active
      expect(calc.state.interchange).toBe(true);
      expect(calc.state.displayMode).toBe('DEC');
    });

    test('clear resets decimal caches to null', () => {
      const calc = r8_.createCalculator();

      // Enter value with DEC mode
      calc.handleDigitEntry(5);
      calc.handleDisplayMode('DEC');
      expect(calc.state.input1.decimal).not.toBeNull();

      // Clear
      calc.handleClear();

      // Decimal caches cleared
      expect(calc.state.input1.decimal).toBeNull();
    });
  });

  describe('getDisplayValue - Mode-Aware Display', () => {
    test('returns Round8 value in R8 mode', () => {
      const calc = r8_.createCalculator();

      calc.handleDigitEntry(4);
      calc.handleDigitEntry(2);

      expect(calc.getDisplayValue('input1')).toBe('42');
    });

    test('returns decimal value in DEC mode with interchange', () => {
      const calc = r8_.createCalculator();

      // Input 42 in Round8 (= 34 decimal)
      calc.handleDigitEntry(4);
      calc.handleDigitEntry(2);
      calc.handleDisplayMode('DEC');

      const decimalValue = calc.getDisplayValue('input1');
      expect(decimalValue).toBe('34'); // 4*8 + 2 = 34
    });

    test('returns 0 for empty input in DEC mode', () => {
      const calc = r8_.createCalculator();

      calc.handleDisplayMode('DEC');

      expect(calc.getDisplayValue('input1')).toBe('0');
      expect(calc.getDisplayValue('input2')).toBe('0');
      expect(calc.getDisplayValue('output')).toBe('0');
    });
  });

  describe('Decimal Cache Updates', () => {
    test('digit entry updates decimal cache when interchange active', () => {
      const calc = r8_.createCalculator();

      // Activate interchange first
      calc.handleDisplayMode('DEC');
      const initialDecimal = calc.state.input1.decimal;

      // Enter digit
      calc.handleDigitEntry(5);

      // Decimal cache updated
      expect(calc.state.input1.decimal).not.toBe(initialDecimal);
      expect(calc.state.input1.decimal).toBe(5);
    });

    test('calculation updates output decimal cache', () => {
      const calc = r8_.createCalculator();

      // Setup: 5 + 3 with interchange
      calc.handleDigitEntry(5);
      calc.handleInputSwitch();
      calc.handleDigitEntry(3);
      calc.handleOperation('+');
      calc.handleDisplayMode('DEC');

      // Calculate
      calc.handleCalculate();

      // Output decimal cache should be 8
      expect(calc.state.output.decimal).toBe(8);
    });

    test('increment updates decimal cache when interchange active', () => {
      const calc = r8_.createCalculator();

      calc.handleDigitEntry(5);
      calc.handleDisplayMode('DEC');

      const beforeIncrement = calc.state.input1.decimal;
      calc.handleIncrement();

      expect(calc.state.input1.decimal).toBe((beforeIncrement as number) + 1);
    });

    test('decrement updates decimal cache when interchange active', () => {
      const calc = r8_.createCalculator();

      calc.handleDigitEntry(5);
      calc.handleDisplayMode('DEC');

      const beforeDecrement = calc.state.input1.decimal;
      calc.handleDecrement();

      expect(calc.state.input1.decimal).toBe((beforeDecrement as number) - 1);
    });
  });

  describe('Bidirectional Interchange Validation', () => {
    test('Round8 → Decimal → Round8 roundtrip', () => {
      const calc = r8_.createCalculator();

      // Enter Round8 value "123" (= 83 decimal)
      calc.handleDigitEntry(1);
      calc.handleDigitEntry(2);
      calc.handleDigitEntry(3);
      const originalValue = calc.state.input1.value;

      // Get decimal
      calc.handleDisplayMode('DEC');
      const decimalValue = calc.state.input1.decimal;

      // Clear and re-enter via decimal
      calc.handleClear();
      calc.handleDecimalInput(decimalValue as number);

      // Should match original Round8
      expect(calc.state.input1.value).toBe(originalValue);
    });

    test('Decimal → Round8 → Decimal roundtrip', () => {
      const calc = r8_.createCalculator();

      // Enter decimal 100
      calc.handleDecimalInput(100);
      const round8Value = calc.state.input1.value;

      // Clear and re-enter via Round8 digits
      calc.handleClear();
      for (const digit of round8Value) {
        calc.handleDigitEntry(parseInt(digit));
      }

      // Get decimal
      calc.handleDisplayMode('DEC');

      // Should match original decimal
      expect(calc.state.input1.decimal).toBe(100);
    });
  });
});
