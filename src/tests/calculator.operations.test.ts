/**
 * Calculator Operations Test Suite - v0.0.14 Increment/Decrement Validation
 *
 * Tests composing functions that orchestrate muxifyWrung:
 * - handleIncrement() - Adds 1 to active input
 * - handleDecrement() - Subtracts 1 from active input
 *
 * Pattern Validation:
 * - Composing functions properly orchestrate r8_.operations.increment/decrement
 * - increment/decrement properly orchestrate muxifyWrung with ±1
 * - State updates correctly (buffer, binary, value)
 *
 * @version 0.0.14
 */

import { r8_ } from '../index';

describe('Calculator Operations - Increment/Decrement', () => {
  describe('handleIncrement - Composing Function Orchestration', () => {
    test('increments zero to 1', () => {
      const calc = r8_.createCalculator();

      // Start with zero (AbsoluteZero)
      expect(calc.state.input1.value).toBe('');
      expect(calc.state.input1.buffer).toBe(0n);

      // Increment
      calc.handleIncrement();

      // Verify: 0 + 1 = 1
      expect(calc.state.input1.buffer).toBe(r8_.parseStringToBuffer('1'));
      expect(calc.state.input1.value).toBe('1');
    });

    test('increments 1 to 2', () => {
      const calc = r8_.createCalculator();

      // Set input to 1
      calc.handleDigitEntry(1);
      const buffer1 = calc.state.input1.buffer;

      // Increment
      calc.handleIncrement();

      // Verify: 1 + 1 = 2
      const expected = r8_.parseStringToBuffer('2');
      expect(calc.state.input1.buffer).toBe(expected);
      expect(calc.state.input1.value).toBe('2');

      // Verify buffer actually changed
      expect(calc.state.input1.buffer).not.toBe(buffer1);
    });

    test('increments 8 to 11', () => {
      const calc = r8_.createCalculator();

      // Set input to 8
      calc.handleDigitEntry(8);

      // Increment
      calc.handleIncrement();

      // Verify: 8 + 1 = 11 (two-digit Round8 number)
      const expected = r8_.parseStringToBuffer('11');
      expect(calc.state.input1.buffer).toBe(expected);
      expect(calc.state.input1.value).toBe('11');
    });

    test('increments negative value: -5 to -4', () => {
      const calc = r8_.createCalculator();

      // Set input to 5
      calc.handleDigitEntry(5);
      // Flip sign to -5
      calc.handleSigned();

      // Increment
      calc.handleIncrement();

      // Verify: -5 + 1 = -4
      const expected = r8_.parseStringToBuffer('-4');
      expect(calc.state.input1.buffer).toBe(expected);
      expect(calc.state.input1.value).toBe('-4');
    });

    test('increments -1 to 0 (AbsoluteZero)', () => {
      const calc = r8_.createCalculator();

      // Set input to 1
      calc.handleDigitEntry(1);
      // Flip sign to -1
      calc.handleSigned();

      // Increment
      calc.handleIncrement();

      // Verify: -1 + 1 = 0 (AbsoluteZero)
      expect(calc.state.input1.buffer).toBe(0n);
      expect(calc.state.input1.value).toBe('0');
    });

    test('operates on activeInput (input2)', () => {
      const calc = r8_.createCalculator();

      // Set input1 to 5
      calc.handleDigitEntry(5);
      const input1Buffer = calc.state.input1.buffer;

      // Switch to input2
      calc.handleInputSwitch();
      expect(calc.state.activeInput).toBe('input2');

      // Set input2 to 3
      calc.handleDigitEntry(3);

      // Increment input2
      calc.handleIncrement();

      // Verify: input1 unchanged, input2 incremented 3 → 4
      expect(calc.state.input1.buffer).toBe(input1Buffer);
      expect(calc.state.input1.value).toBe('5');

      const expected = r8_.parseStringToBuffer('4');
      expect(calc.state.input2.buffer).toBe(expected);
      expect(calc.state.input2.value).toBe('4');
    });
  });

  describe('handleDecrement - Composing Function Orchestration', () => {
    test('decrements 1 to zero (AbsoluteZero)', () => {
      const calc = r8_.createCalculator();

      // Set input to 1
      calc.handleDigitEntry(1);

      // Decrement
      calc.handleDecrement();

      // Verify: 1 - 1 = 0
      expect(calc.state.input1.buffer).toBe(0n);
      expect(calc.state.input1.value).toBe('0');
    });

    test('decrements 2 to 1', () => {
      const calc = r8_.createCalculator();

      // Set input to 2
      calc.handleDigitEntry(2);
      const buffer2 = calc.state.input1.buffer;

      // Decrement
      calc.handleDecrement();

      // Verify: 2 - 1 = 1
      const expected = r8_.parseStringToBuffer('1');
      expect(calc.state.input1.buffer).toBe(expected);
      expect(calc.state.input1.value).toBe('1');

      // Verify buffer actually changed
      expect(calc.state.input1.buffer).not.toBe(buffer2);
    });

    test('decrements 11 to 8', () => {
      const calc = r8_.createCalculator();

      // Set input to 11 (two digits: 1, 1)
      calc.handleDigitEntry(1);
      calc.handleDigitEntry(1);

      // Decrement
      calc.handleDecrement();

      // Verify: 11 - 1 = 8
      const expected = r8_.parseStringToBuffer('8');
      expect(calc.state.input1.buffer).toBe(expected);
      expect(calc.state.input1.value).toBe('8');
    });

    test('decrements positive to negative: 0 to -1', () => {
      const calc = r8_.createCalculator();

      // Start with zero (AbsoluteZero)
      expect(calc.state.input1.buffer).toBe(0n);

      // Decrement
      calc.handleDecrement();

      // Verify: 0 - 1 = -1
      const expected = r8_.parseStringToBuffer('-1');
      expect(calc.state.input1.buffer).toBe(expected);
      expect(calc.state.input1.value).toBe('-1');
    });

    test('decrements -4 to -5', () => {
      const calc = r8_.createCalculator();

      // Set input to 4
      calc.handleDigitEntry(4);
      // Flip sign to -4
      calc.handleSigned();

      // Decrement
      calc.handleDecrement();

      // Verify: -4 - 1 = -5
      const expected = r8_.parseStringToBuffer('-5');
      expect(calc.state.input1.buffer).toBe(expected);
      expect(calc.state.input1.value).toBe('-5');
    });

    test('operates on activeInput (input2)', () => {
      const calc = r8_.createCalculator();

      // Set input1 to 7
      calc.handleDigitEntry(7);
      const input1Buffer = calc.state.input1.buffer;

      // Switch to input2
      calc.handleInputSwitch();
      expect(calc.state.activeInput).toBe('input2');

      // Set input2 to 5
      calc.handleDigitEntry(5);

      // Decrement input2
      calc.handleDecrement();

      // Verify: input1 unchanged, input2 decremented 5 → 4
      expect(calc.state.input1.buffer).toBe(input1Buffer);
      expect(calc.state.input1.value).toBe('7');

      const expected = r8_.parseStringToBuffer('4');
      expect(calc.state.input2.buffer).toBe(expected);
      expect(calc.state.input2.value).toBe('4');
    });
  });

  describe('Increment/Decrement Cycle - Roundtrip Validation', () => {
    test('increment then decrement returns to original value', () => {
      const calc = r8_.createCalculator();

      // Set input to 42
      calc.handleDigitEntry(4);
      calc.handleDigitEntry(2);
      const originalBuffer = calc.state.input1.buffer;
      const originalValue = calc.state.input1.value;

      // Increment
      calc.handleIncrement();

      // Verify changed
      expect(calc.state.input1.buffer).not.toBe(originalBuffer);

      // Decrement
      calc.handleDecrement();

      // Verify back to original
      expect(calc.state.input1.buffer).toBe(originalBuffer);
      expect(calc.state.input1.value).toBe(originalValue);
    });

    test('decrement then increment returns to original value', () => {
      const calc = r8_.createCalculator();

      // Set input to 123
      calc.handleDigitEntry(1);
      calc.handleDigitEntry(2);
      calc.handleDigitEntry(3);
      const originalBuffer = calc.state.input1.buffer;
      const originalValue = calc.state.input1.value;

      // Decrement
      calc.handleDecrement();

      // Verify changed
      expect(calc.state.input1.buffer).not.toBe(originalBuffer);

      // Increment
      calc.handleIncrement();

      // Verify back to original
      expect(calc.state.input1.buffer).toBe(originalBuffer);
      expect(calc.state.input1.value).toBe(originalValue);
    });

    test('multiple increments work correctly', () => {
      const calc = r8_.createCalculator();

      // Start at 5
      calc.handleDigitEntry(5);

      // Increment 3 times: 5 → 6 → 7 → 8
      calc.handleIncrement();
      calc.handleIncrement();
      calc.handleIncrement();

      // Verify: 5 + 3 = 8
      const expected = r8_.parseStringToBuffer('8');
      expect(calc.state.input1.buffer).toBe(expected);
      expect(calc.state.input1.value).toBe('8');
    });

    test('multiple decrements work correctly', () => {
      const calc = r8_.createCalculator();

      // Start at 8
      calc.handleDigitEntry(8);

      // Decrement 3 times: 8 → 7 → 6 → 5
      calc.handleDecrement();
      calc.handleDecrement();
      calc.handleDecrement();

      // Verify: 8 - 3 = 5
      const expected = r8_.parseStringToBuffer('5');
      expect(calc.state.input1.buffer).toBe(expected);
      expect(calc.state.input1.value).toBe('5');
    });
  });
});
