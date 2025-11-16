/* eslint-disable @typescript-eslint/no-unused-vars */
/**
 * muxifyWrung Test Suite - Quality-First Summation Validation
 *
 * Task 1: First Position Validation Only
 * - Single position summation (8x8 = 64 cases)
 * - Carry propagation extending marquee
 * - Quality-First short-circuits
 *
 * Uses Provably Halting Complete computation via scanUpwards
 * Citation: Quality-First Muxification Pattern
 */

import {
  applyNumeralRotation,
  createBuffer,
  getRotationValue,
  Positions,
  setSignBit
} from '../concepts/round8/model/terminology';
import { BidirectionalConference } from '../concepts/round8/model/bidirectional';
import { muxifyWrung } from '../concepts/round8/model/operations';

describe('muxifyWrung - Quality-First Summation', () => {
  const createWrung = (values: number[], positive: boolean = true): bigint => {
    let buffer = createBuffer();
    if (positive) {
      buffer = setSignBit(buffer);
    }
    values.forEach((val, idx) => {
      if (idx < 21) {
        buffer = applyNumeralRotation(
          val,
          buffer,
          (idx + 1) as Positions
        );
      }
    });
    return buffer;
  };

  describe('Task 1: First Position Validation Only', () => {
    describe('No Carry Cases (Sum <= 8)', () => {
      test('1 + 1 = 2', () => {
        const wrungA = createWrung([0]); // numeral 1
        const wrungB = createWrung([0]); // numeral 1
        const result = muxifyWrung('+', wrungA, wrungB);
        const resultValue = getRotationValue(result, 1);
        expect(resultValue).toBe(2);
        const marqueeState = BidirectionalConference(result);
        expect(marqueeState.firstValidRotation).toBe(1);
      });

      test('1 + 7 = 8', () => {
        const wrungA = createWrung([0]); // numeral 1
        const wrungB = createWrung([6]); // numeral 7
        const result = muxifyWrung('+', wrungA, wrungB);
        const resultValue = getRotationValue(result, 1);
        expect(resultValue).toBe(8);
        const marqueeState = BidirectionalConference(result);
        expect(marqueeState.firstValidRotation).toBe(1);
      });

      test('3 + 5 = 8', () => {
        const wrungA = createWrung([2]); // numeral 3
        const wrungB = createWrung([4]); // numeral 5
        const result = muxifyWrung('+', wrungA, wrungB);
        const resultValue = getRotationValue(result, 1);
        expect(resultValue).toBe(8);
        const marqueeState = BidirectionalConference(result);
        expect(marqueeState.firstValidRotation).toBe(1);
      });

      test('4 + 4 = 8', () => {
        const wrungA = createWrung([3]); // numeral 4
        const wrungB = createWrung([3]); // numeral 4
        const result = muxifyWrung('+', wrungA, wrungB);
        const resultValue = getRotationValue(result, 1);
        expect(resultValue).toBe(8);
        const marqueeState = BidirectionalConference(result);
        expect(marqueeState.firstValidRotation).toBe(1);
      });

      test('2 + 3 = 5', () => {
        const wrungA = createWrung([1]); // numeral 2
        const wrungB = createWrung([2]); // numeral 3
        const result = muxifyWrung('+', wrungA, wrungB);
        const resultValue = getRotationValue(result, 1);
        expect(resultValue).toBe(5);
      });

      test('6 + 2 = 8', () => {
        const wrungA = createWrung([5]); // numeral 6
        const wrungB = createWrung([1]); // numeral 2
        const result = muxifyWrung('+', wrungA, wrungB);
        const resultValue = getRotationValue(result, 1);
        expect(resultValue).toBe(8);
      });
    });

    describe('Carry Cases (Sum > 8)', () => {
      test('1 + 8 = 11 (carry extends marquee)', () => {
        const wrungA = createWrung([0]); // numeral 1
        const wrungB = createWrung([7]); // numeral 8
        const result = muxifyWrung('+', wrungA, wrungB);

        // Position 1 should have numeral 1
        const pos1Value = getRotationValue(result, 1);
        expect(pos1Value).toBe(1);

        // Position 2 should have numeral 1 (carry)
        const pos2Value = getRotationValue(result, 2);
        expect(pos2Value).toBe(1);

        // firstValidRotation is FIRST (lowest) valid position, not highest
        const marqueeState = BidirectionalConference(result);
        expect(marqueeState.firstValidRotation).toBe(1);
        expect(marqueeState.isAbsoluteZero).toBeFalsy();
      });

      test('5 + 5 = 12 (carry extends marquee)', () => {
        const wrungA = createWrung([4]); // numeral 5
        const wrungB = createWrung([4]); // numeral 5
        const result = muxifyWrung('+', wrungA, wrungB);

        // Position 1 should have numeral 2
        const pos1Value = getRotationValue(result, 1);
        expect(pos1Value).toBe(2);

        // Position 2 should have numeral 1 (carry)
        const pos2Value = getRotationValue(result, 2);
        expect(pos2Value).toBe(1);

        const marqueeState = BidirectionalConference(result);
        expect(marqueeState.firstValidRotation).toBe(1);
        expect(marqueeState.isAbsoluteZero).toBeFalsy();
      });

      test('8 + 8 = 18 (carry extends marquee)', () => {
        const wrungA = createWrung([7]); // numeral 8
        const wrungB = createWrung([7]); // numeral 8
        const result = muxifyWrung('+', wrungA, wrungB);

        // Position 1 should have numeral 8
        const pos1Value = getRotationValue(result, 1);
        expect(pos1Value).toBe(8);

        // Position 2 should have numeral 1 (carry)
        const pos2Value = getRotationValue(result, 2);
        expect(pos2Value).toBe(1);

        const marqueeState = BidirectionalConference(result);
        expect(marqueeState.firstValidRotation).toBe(1);
        expect(marqueeState.isAbsoluteZero).toBeFalsy();
      });

      test('7 + 3 = 12 (carry extends marquee)', () => {
        const wrungA = createWrung([6]); // numeral 7
        const wrungB = createWrung([2]); // numeral 3
        const result = muxifyWrung('+', wrungA, wrungB);

        const pos1Value = getRotationValue(result, 1);
        expect(pos1Value).toBe(2);

        const pos2Value = getRotationValue(result, 2);
        expect(pos2Value).toBe(1);
      });

      test('6 + 6 = 14 (carry extends marquee)', () => {
        const wrungA = createWrung([5]); // numeral 6
        const wrungB = createWrung([5]); // numeral 6
        const result = muxifyWrung('+', wrungA, wrungB);

        const pos1Value = getRotationValue(result, 1);
        expect(pos1Value).toBe(4);

        const pos2Value = getRotationValue(result, 2);
        expect(pos2Value).toBe(1);
      });
    });

    describe('Quality-First Short-Circuits', () => {
      test('AbsoluteZero + AnyValue = AnyValue', () => {
        const absoluteZero = createBuffer(); // No sign bit, all zeros
        const anyValue = createWrung([4]); // numeral 5

        const result = muxifyWrung('+', absoluteZero, anyValue);

        expect(result).toBe(anyValue);
      });

      test('AnyValue + AbsoluteZero = AnyValue', () => {
        const anyValue = createWrung([2]); // numeral 3
        const absoluteZero = createBuffer();

        const result = muxifyWrung('+', anyValue, absoluteZero);

        expect(result).toBe(anyValue);
      });

      test('AbsoluteZero + AbsoluteZero = AbsoluteZero', () => {
        const zero1 = createBuffer();
        const zero2 = createBuffer();

        const result = muxifyWrung('+', zero1, zero2);

        const marqueeState = BidirectionalConference(result);
        expect(marqueeState.isAbsoluteZero).toBe(true);
      });
    });

    describe('Sign Bit Preservation', () => {
      test('Positive + Positive = Positive', () => {
        const wrungA = createWrung([3], true); // positive numeral 4
        const wrungB = createWrung([2], true); // positive numeral 3
        const result = muxifyWrung('+', wrungA, wrungB);

        const marqueeState = BidirectionalConference(result);
        expect(marqueeState.isNegative).toBeFalsy();
      });

      test('Result maintains positive sign after carry', () => {
        const wrungA = createWrung([7], true); // positive numeral 8
        const wrungB = createWrung([7], true); // positive numeral 8
        const result = muxifyWrung('+', wrungA, wrungB);

        const marqueeState = BidirectionalConference(result);
        expect(marqueeState.isNegative).toBeFalsy();
      });
    });
  });
});
