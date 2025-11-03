/**
 * Round8 Counting Validation Test
 *
 * Suite 5 COBALT - Professional Validation
 * Test: Count to 5 positive and 5 negative
 *
 * This is the FIRST validation test for Round8 v0.0.1
 * Validates core operations: zero(), increment(), decrement(), from()
 */

import { Round8 } from '../concepts/round8/model/Round8.model';

describe('Round8 Counting Validation - Suite 5 COBALT', () => {

  describe('Positive Counting: Zero to +5', () => {

    test('Count from 0 to +5 using increment()', () => {
      // Start at zero
      let current = Round8.zero();

      // Verify zero
      expect(current.decimal).toBe(0);
      expect(current.isZero).toBe(true);
      expect(current.isPositive).toBe(false);
      expect(current.isNegative).toBe(false);
      console.log(`Zero: decimal=${current.decimal}, Round8="${current.value}"`);

      // Count to +1
      current = Round8.increment(current);
      expect(current.decimal).toBe(1);
      expect(current.isPositive).toBe(true);
      expect(current.isZero).toBe(false);
      console.log(`+1: decimal=${current.decimal}, Round8="${current.value}"`);

      // Count to +2
      current = Round8.increment(current);
      expect(current.decimal).toBe(2);
      expect(current.isPositive).toBe(true);
      console.log(`+2: decimal=${current.decimal}, Round8="${current.value}"`);

      // Count to +3
      current = Round8.increment(current);
      expect(current.decimal).toBe(3);
      expect(current.isPositive).toBe(true);
      console.log(`+3: decimal=${current.decimal}, Round8="${current.value}"`);

      // Count to +4
      current = Round8.increment(current);
      expect(current.decimal).toBe(4);
      expect(current.isPositive).toBe(true);
      console.log(`+4: decimal=${current.decimal}, Round8="${current.value}"`);

      // Count to +5
      current = Round8.increment(current);
      expect(current.decimal).toBe(5);
      expect(current.isPositive).toBe(true);
      console.log(`+5: decimal=${current.decimal}, Round8="${current.value}"`);
    });

    test('Verify positive values using from()', () => {
      const one = Round8.from(1);
      expect(one.decimal).toBe(1);
      expect(one.isPositive).toBe(true);
      console.log(`from(1): Round8="${one.value}"`);

      const two = Round8.from(2);
      expect(two.decimal).toBe(2);
      expect(two.isPositive).toBe(true);
      console.log(`from(2): Round8="${two.value}"`);

      const three = Round8.from(3);
      expect(three.decimal).toBe(3);
      expect(three.isPositive).toBe(true);
      console.log(`from(3): Round8="${three.value}"`);

      const four = Round8.from(4);
      expect(four.decimal).toBe(4);
      expect(four.isPositive).toBe(true);
      console.log(`from(4): Round8="${four.value}"`);

      const five = Round8.from(5);
      expect(five.decimal).toBe(5);
      expect(five.isPositive).toBe(true);
      console.log(`from(5): Round8="${five.value}"`);
    });

  });

  describe('Negative Counting: Zero to -5', () => {

    test('Count from 0 to -5 using decrement()', () => {
      // Start at zero
      let current = Round8.zero();

      // Verify zero
      expect(current.decimal).toBe(0);
      expect(current.isZero).toBe(true);
      console.log(`Zero: decimal=${current.decimal}, Round8="${current.value}"`);

      // Count to -1 (special case: negative one)
      current = Round8.decrement(current);
      expect(current.decimal).toBe(-1);
      expect(current.isNegativeOne).toBe(true);
      expect(current.isNegative).toBe(false); // NegativeOne is its own category
      console.log(`-1 (NegativeOne): decimal=${current.decimal}, Round8="${current.value}"`);

      // Count to -2
      current = Round8.decrement(current);
      expect(current.decimal).toBe(-2);
      expect(current.isNegative).toBe(true);
      expect(current.isNegativeOne).toBe(false);
      console.log(`-2: decimal=${current.decimal}, Round8="${current.value}"`);

      // Count to -3
      current = Round8.decrement(current);
      expect(current.decimal).toBe(-3);
      expect(current.isNegative).toBe(true);
      console.log(`-3: decimal=${current.decimal}, Round8="${current.value}"`);

      // Count to -4
      current = Round8.decrement(current);
      expect(current.decimal).toBe(-4);
      expect(current.isNegative).toBe(true);
      console.log(`-4: decimal=${current.decimal}, Round8="${current.value}"`);

      // Count to -5
      current = Round8.decrement(current);
      expect(current.decimal).toBe(-5);
      expect(current.isNegative).toBe(true);
      console.log(`-5: decimal=${current.decimal}, Round8="${current.value}"`);
    });

    test('Verify negative values using from()', () => {
      const negOne = Round8.from(-1);
      expect(negOne.decimal).toBe(-1);
      expect(negOne.isNegativeOne).toBe(true);
      console.log(`from(-1): Round8="${negOne.value}"`);

      const negTwo = Round8.from(-2);
      expect(negTwo.decimal).toBe(-2);
      expect(negTwo.isNegative).toBe(true);
      console.log(`from(-2): Round8="${negTwo.value}"`);

      const negThree = Round8.from(-3);
      expect(negThree.decimal).toBe(-3);
      expect(negThree.isNegative).toBe(true);
      console.log(`from(-3): Round8="${negThree.value}"`);

      const negFour = Round8.from(-4);
      expect(negFour.decimal).toBe(-4);
      expect(negFour.isNegative).toBe(true);
      console.log(`from(-4): Round8="${negFour.value}"`);

      const negFive = Round8.from(-5);
      expect(negFive.decimal).toBe(-5);
      expect(negFive.isNegative).toBe(true);
      console.log(`from(-5): Round8="${negFive.value}"`);
    });

  });

  describe('Bidirectional Counting Validation', () => {

    test('Count up from -5 to +5 (full range)', () => {
      let current = Round8.from(-5);
      expect(current.decimal).toBe(-5);
      console.log(`Starting at -5: Round8="${current.value}"`);

      // -5 → -4 → -3 → -2 → -1 → 0 → +1 → +2 → +3 → +4 → +5
      const expectedSequence = [-5, -4, -3, -2, -1, 0, 1, 2, 3, 4, 5];

      for (let i = 0; i < expectedSequence.length; i++) {
        expect(current.decimal).toBe(expectedSequence[i]);
        console.log(`Step ${i}: decimal=${current.decimal}, Round8="${current.value}"`);

        if (i < expectedSequence.length - 1) {
          current = Round8.increment(current);
        }
      }

      expect(current.decimal).toBe(5);
    });

    test('Count down from +5 to -5 (full range)', () => {
      let current = Round8.from(5);
      expect(current.decimal).toBe(5);
      console.log(`Starting at +5: Round8="${current.value}"`);

      // +5 → +4 → +3 → +2 → +1 → 0 → -1 → -2 → -3 → -4 → -5
      const expectedSequence = [5, 4, 3, 2, 1, 0, -1, -2, -3, -4, -5];

      for (let i = 0; i < expectedSequence.length; i++) {
        expect(current.decimal).toBe(expectedSequence[i]);
        console.log(`Step ${i}: decimal=${current.decimal}, Round8="${current.value}"`);

        if (i < expectedSequence.length - 1) {
          current = Round8.decrement(current);
        }
      }

      expect(current.decimal).toBe(-5);
    });

  });

  describe('Special Cases Validation', () => {

    test('Zero is neither positive nor negative', () => {
      const zero = Round8.zero();
      expect(zero.isZero).toBe(true);
      expect(zero.isPositive).toBe(false);
      expect(zero.isNegative).toBe(false);
      expect(zero.isNegativeOne).toBe(false);
      expect(zero.decimal).toBe(0);
    });

    test('NegativeOne is special category (not generic negative)', () => {
      const negOne = Round8.from(-1);
      expect(negOne.isNegativeOne).toBe(true);
      expect(negOne.isNegative).toBe(false); // NegativeOne is its own category
      expect(negOne.isPositive).toBe(false);
      expect(negOne.isZero).toBe(false);
      expect(negOne.decimal).toBe(-1);
    });

    test('Negative values (-2 and below) are isNegative', () => {
      const negTwo = Round8.from(-2);
      expect(negTwo.isNegative).toBe(true);
      expect(negTwo.isNegativeOne).toBe(false);
      expect(negTwo.isPositive).toBe(false);
      expect(negTwo.isZero).toBe(false);

      const negFive = Round8.from(-5);
      expect(negFive.isNegative).toBe(true);
      expect(negFive.isNegativeOne).toBe(false);
    });

    test('Positive values (1 and above) are isPositive', () => {
      const one = Round8.from(1);
      expect(one.isPositive).toBe(true);
      expect(one.isNegative).toBe(false);
      expect(one.isNegativeOne).toBe(false);
      expect(one.isZero).toBe(false);

      const five = Round8.from(5);
      expect(five.isPositive).toBe(true);
    });

  });

});
