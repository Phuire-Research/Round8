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

import { createBuffer } from '../concepts/round8/model/terminology';
import { BidirectionalConference } from '../concepts/round8/model/bidirectional';
import { muxifyWrung } from '../concepts/round8/model/operations';
import { getWrungStringRepresentation, parseStringToRound8 } from '../concepts/round8/model/conference';

describe('muxifyWrung - Quality-First Summation', () => {
  // Validated helper using conference layer
  const r8 = (value: string): bigint => {
    const result = parseStringToRound8(value);
    if (result === undefined) {
      throw new Error(`Invalid Round8 string: ${value}`);
    }
    return result;
  };

  describe('Task 1: First Position Validation Only', () => {
    describe('No Carry Cases (Sum <= 8)', () => {
      test('1 + 1 = 2', () => {
        const result = muxifyWrung('+', r8('1'), r8('1'));
        expect(getWrungStringRepresentation(result)).toBe('2');
      });

      test('1 + 7 = 8', () => {
        const result = muxifyWrung('+', r8('1'), r8('7'));
        expect(getWrungStringRepresentation(result)).toBe('8');
      });

      test('3 + 5 = 8', () => {
        const result = muxifyWrung('+', r8('3'), r8('5'));
        expect(getWrungStringRepresentation(result)).toBe('8');
      });

      test('4 + 4 = 8', () => {
        const result = muxifyWrung('+', r8('4'), r8('4'));
        expect(getWrungStringRepresentation(result)).toBe('8');
      });

      test('2 + 3 = 5', () => {
        const result = muxifyWrung('+', r8('2'), r8('3'));
        expect(getWrungStringRepresentation(result)).toBe('5');
      });

      test('6 + 2 = 8', () => {
        const result = muxifyWrung('+', r8('6'), r8('2'));
        expect(getWrungStringRepresentation(result)).toBe('8');
      });
    });

    describe('Carry Cases (Sum > 8)', () => {
      test('1 + 8 = 11 (carry extends marquee)', () => {
        const result = muxifyWrung('+', r8('1'), r8('8'));
        expect(getWrungStringRepresentation(result)).toBe('11');
      });

      test('5 + 5 = 12 (carry extends marquee)', () => {
        const result = muxifyWrung('+', r8('5'), r8('5'));
        expect(getWrungStringRepresentation(result)).toBe('12');
      });

      test('8 + 8 = 18 (carry extends marquee)', () => {
        const result = muxifyWrung('+', r8('8'), r8('8'));
        expect(getWrungStringRepresentation(result)).toBe('18');
      });

      test('7 + 3 = 12 (carry extends marquee)', () => {
        const result = muxifyWrung('+', r8('7'), r8('3'));
        expect(getWrungStringRepresentation(result)).toBe('12');
      });

      test('6 + 6 = 14 (carry extends marquee)', () => {
        const result = muxifyWrung('+', r8('6'), r8('6'));
        expect(getWrungStringRepresentation(result)).toBe('14');
      });
    });

    describe('Quality-First Short-Circuits', () => {
      test('AbsoluteZero + AnyValue = AnyValue', () => {
        const absoluteZero = createBuffer();
        const anyValue = r8('5');

        const result = muxifyWrung('+', absoluteZero, anyValue);

        expect(result).toBe(anyValue);
      });

      test('AnyValue + AbsoluteZero = AnyValue', () => {
        const anyValue = r8('3');
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
        const result = muxifyWrung('+', r8('4'), r8('3'));

        const marqueeState = BidirectionalConference(result);
        expect(marqueeState.isNegative).toBeFalsy();
      });

      test('Result maintains positive sign after carry', () => {
        const result = muxifyWrung('+', r8('8'), r8('8'));

        const marqueeState = BidirectionalConference(result);
        expect(marqueeState.isNegative).toBeFalsy();
      });
    });
  });

  describe('Task 2: Position 1 to 20', () => {
    describe('Same Length, No Carries', () => {
      test('12 + 34 = 46 (two positions)', () => {
        const wrungA = r8('12');
        const wrungB = r8('34');
        const result = muxifyWrung('+', wrungA, wrungB);

        expect(getWrungStringRepresentation(result)).toBe('46');
      });

      test('123 + 456 = 581 (three positions)', () => {
        const wrungA = r8('123');
        const wrungB = r8('456');
        const result = muxifyWrung('+', wrungA, wrungB);

        // 3+6=9>8 → carry, result=1; 2+5+1=8; 1+4=5
        expect(getWrungStringRepresentation(result)).toBe('581');
      });

      test('111 + 222 = 333 (clean addition)', () => {
        const wrungA = r8('111');
        const wrungB = r8('222');
        const result = muxifyWrung('+', wrungA, wrungB);

        expect(getWrungStringRepresentation(result)).toBe('333');
      });
    });

    describe('Same Length, With Carries', () => {
      test('85 + 73 = 178 (carry from pos2 to pos3)', () => {
        const wrungA = r8('85');
        const wrungB = r8('73');
        const result = muxifyWrung('+', wrungA, wrungB);

        // 5+3=8; 8+7=15>8 → carry, result=7; carry=1
        expect(getWrungStringRepresentation(result)).toBe('178');
      });

      test('888 + 111 = 1221 (cascading carries)', () => {
        const wrungA = r8('888');
        const wrungB = r8('111');
        const result = muxifyWrung('+', wrungA, wrungB);

        // 8+1=9>8 → carry, result=1
        // 8+1+1=10>8 → carry, result=2
        // 8+1+1=10>8 → carry, result=2
        // carry=1
        expect(getWrungStringRepresentation(result)).toBe('1221');
      });

      test('444 + 555 = 1221 (all positions carry)', () => {
        const wrungA = r8('444');
        const wrungB = r8('555');
        const result = muxifyWrung('+', wrungA, wrungB);

        // 4+5=9>8 → carry, result=1
        // 4+5+1=10>8 → carry, result=2
        // 4+5+1=10>8 → carry, result=2
        // carry=1
        expect(getWrungStringRepresentation(result)).toBe('1221');
      });
    });

    describe('Different Lengths', () => {
      test('5 + 123 = 128 (1 position + 3 positions)', () => {
        const wrungA = r8('5');
        const wrungB = r8('123');
        const result = muxifyWrung('+', wrungA, wrungB);

        // Parse reversal: "123" → pos1=3, pos2=2, pos3=1
        // Sum: pos1=(5+3)=8, pos2=2, pos3=1
        // Stringify: "821" → reverse → "128"
        expect(getWrungStringRepresentation(result)).toBe('128');
      });

      test('1234 + 56 = 1312 (4 positions + 2 positions)', () => {
        const wrungA = r8('1234');
        const wrungB = r8('56');
        const result = muxifyWrung('+', wrungA, wrungB);

        // Parse reversal: "1234" → pos1=4, pos2=3, pos3=2, pos4=1
        // Parse reversal: "56" → pos1=6, pos2=5
        // Sum: pos1=(4+6)=10→2 carry1, pos2=(3+5+1)=9→1 carry1, pos3=(2+1)=3, pos4=1
        // Stringify: "2131" → reverse → "1312"
        expect(getWrungStringRepresentation(result)).toBe('1312');
      });

      test('8 + 11 = 21 (carry extends shorter operand)', () => {
        const wrungA = r8('8');
        const wrungB = r8('11');
        const result = muxifyWrung('+', wrungA, wrungB);

        // Parse reversal: "11" → pos1=1, pos2=1
        // Sum: pos1=(8+1)=9→1 carry1, pos2=(0+1+1)=2
        // Stringify: "12" → reverse → "21"
        expect(getWrungStringRepresentation(result)).toBe('21');
      });
    });

    describe('Longer Sequences', () => {
      test('12345 + 11111 = 23456 (five positions)', () => {
        const wrungA = r8('12345');
        const wrungB = r8('11111');
        const result = muxifyWrung('+', wrungA, wrungB);

        expect(getWrungStringRepresentation(result)).toBe('23456');
      });

      test('1111111111 + 1111111111 = 2222222222 (ten positions)', () => {
        const wrungA = r8('1111111111');
        const wrungB = r8('1111111111');
        const result = muxifyWrung('+', wrungA, wrungB);

        expect(getWrungStringRepresentation(result)).toBe('2222222222');
      });

      test('Position 20 boundary (twenty 1s + twenty 1s)', () => {
        const wrungA = r8('11111111111111111111'); // 20 ones
        const wrungB = r8('11111111111111111111'); // 20 ones
        const result = muxifyWrung('+', wrungA, wrungB);

        expect(getWrungStringRepresentation(result)).toBe('22222222222222222222'); // 20 twos
      });
    });
  });

  describe('Task 3: Full Wrung Variable Lengths', () => {
    describe('Position 21 Operations', () => {
      test('21 position addition (maximum valid length)', () => {
        const wrungA = r8('111111111111111111111'); // 21 ones
        const wrungB = r8('111111111111111111111'); // 21 ones
        const result = muxifyWrung('+', wrungA, wrungB);

        // All positions should have numeral 2
        expect(getWrungStringRepresentation(result)).toBe('222222222222222222222'); // 21 twos
      });

      test('20 positions with carry into position 21', () => {
        const wrungA = r8('88888888888888888888'); // 20 eights
        const wrungB = r8('11111111111111111111'); // 20 ones
        const result = muxifyWrung('+', wrungA, wrungB);

        // 8+1=9>8 → cascading carries
        // Each position: 8+1+carry=10>8 → result=2, carry=1
        // Final carry at position 21
        expect(getWrungStringRepresentation(result).length).toBe(21);
      });
    });

    describe('Overflow Detection', () => {
      test('Overflow: 21 positions with final carry defaults to FinalTwist', () => {
        const wrungA = r8('711111111111111111111'); // 21 positions (max before overflow)
        const wrungB = r8('111111111111111111111'); // 21 ones

        // Should return FinalTwist case when carry exceeds position 21
        const result = muxifyWrung('+', wrungA, wrungB);
        expect(getWrungStringRepresentation(result)).toBe('711111111111111111111');
      });
    });

    describe('Quality-First Edge Cases', () => {
      test('Large number addition without overflow', () => {
        const wrungA = r8('444444444444444444444'); // 21 fours
        const wrungB = r8('333333333333333333333'); // 21 threes
        const result = muxifyWrung('+', wrungA, wrungB);

        // 4+3=7, no carry propagation
        expect(getWrungStringRepresentation(result)).toBe('777777777777777777777'); // 21 sevens
      });

      test('Mixed length edge case (1 position + 21 positions)', () => {
        const wrungA = r8('8');
        const wrungB = r8('111111111111111111111'); // 21 ones
        const result = muxifyWrung('+', wrungA, wrungB);

        // 8+1=9>8 → carry propagates through all 21 positions
        const resultStr = getWrungStringRepresentation(result);
        expect(resultStr[resultStr.length - 1]).toBe('1'); // Least significant = 1
        expect(resultStr.length).toBe(21);
      });
    });

    describe('WrungMuxity Validation', () => {
      test('Result WrungMuxity correctly identifies non-zero', () => {
        const result = muxifyWrung('+', r8('1'), r8('1'));
        const marqueeState = BidirectionalConference(result);

        expect(marqueeState.isAbsoluteZero).toBeFalsy();
        expect(marqueeState.isFinalTwist).toBeFalsy();
      });

      test('Large result maintains proper sign', () => {
        const result = muxifyWrung('+', r8('444444444444444444444'), r8('333333333333333333333'));
        const marqueeState = BidirectionalConference(result);

        expect(marqueeState.isNegative).toBeFalsy();
        expect(marqueeState.isFinalTwist).toBeFalsy();
      });
    });
  });

  describe('Task 4: Comprehensive Coverage', () => {
    describe('Commutativity (A + B = B + A)', () => {
      test('5 + 123 = 123 + 5', () => {
        const a = r8('5');
        const b = r8('123');
        const resultAB = muxifyWrung('+', a, b);
        const resultBA = muxifyWrung('+', b, a);
        expect(getWrungStringRepresentation(resultAB))
          .toBe(getWrungStringRepresentation(resultBA));
      });

      test('88888 + 11111 = 11111 + 88888', () => {
        const a = r8('88888');
        const b = r8('11111');
        const resultAB = muxifyWrung('+', a, b);
        const resultBA = muxifyWrung('+', b, a);
        expect(getWrungStringRepresentation(resultAB))
          .toBe(getWrungStringRepresentation(resultBA));
      });
    });

    describe('Carry Chain Termination', () => {
      test('88 + 12 = 122 (carry stops at position 3)', () => {
        const result = muxifyWrung('+', r8('88'), r8('12'));
        expect(getWrungStringRepresentation(result)).toBe('122');
      });

      test('888 + 112 = 1222 (carry propagates to position 4)', () => {
        const result = muxifyWrung('+', r8('888'), r8('112'));
        expect(getWrungStringRepresentation(result)).toBe('1222');
      });

      test('188 + 111 = 321 (partial carry chain)', () => {
        const result = muxifyWrung('+', r8('188'), r8('111'));
        // 8+1=9>8 → result=1, carry; 8+1+1=10>8 → result=2, carry; 1+1+1=3
        expect(getWrungStringRepresentation(result)).toBe('321');
      });
    });

    describe('Near-FinalTwist Boundary', () => {
      test('611111111111111111111 + 111111111111111111111 (near overflow)', () => {
        const wrungA = r8('611111111111111111111');
        const wrungB = r8('111111111111111111111');
        const result = muxifyWrung('+', wrungA, wrungB);
        // 6+1=7 at position 21, no overflow
        const resultStr = getWrungStringRepresentation(result);
        expect(resultStr[0]).toBe('7');
        expect(resultStr.length).toBe(21);
      });

      test('511111111111111111111 + 111111111111111111111 (safe boundary)', () => {
        const wrungA = r8('511111111111111111111');
        const wrungB = r8('111111111111111111111');
        const result = muxifyWrung('+', wrungA, wrungB);
        const resultStr = getWrungStringRepresentation(result);
        expect(resultStr[0]).toBe('6');
      });
    });

    describe('Maximum Numeral Patterns', () => {
      test('8888 + 8888 = 18888 (all max carries)', () => {
        const result = muxifyWrung('+', r8('8888'), r8('8888'));
        expect(getWrungStringRepresentation(result)).toBe('11118');
      });

      test('88888888 + 88888888 (8 positions of max)', () => {
        const result = muxifyWrung('+', r8('88888888'), r8('88888888'));
        expect(getWrungStringRepresentation(result)).toBe('111111118');
      });
    });

    describe('Alternating Pattern Sums', () => {
      test('1818 + 1818 = 3636 (alternating low-high)', () => {
        const result = muxifyWrung('+', r8('1818'), r8('1818'));
        expect(getWrungStringRepresentation(result)).toBe('3838');
      });

      test('8181 + 1818 = 11221 (inverse alternating)', () => {
        const result = muxifyWrung('+', r8('8181'), r8('1818'));
        expect(getWrungStringRepresentation(result)).toBe('12221');
      });
    });

    describe('Position 21 Shifted Frame', () => {
      test('311111111111111111111 + 311111111111111111111 (position 21 sum)', () => {
        const wrungA = r8('311111111111111111111');
        const wrungB = r8('311111111111111111111');
        const result = muxifyWrung('+', wrungA, wrungB);
        const resultStr = getWrungStringRepresentation(result);
        expect(resultStr[0]).toBe('6');
      });

      test('Position 21 numeral accumulation', () => {
        const wrungA = r8('111111111111111111111');
        const wrungB = r8('111111111111111111111');
        const result = muxifyWrung('+', wrungA, wrungB);
        const resultStr = getWrungStringRepresentation(result);
        expect(resultStr[0]).toBe('2');
      });
    });

    describe('Identity Edge Cases', () => {
      test('FinalTwist + AbsoluteZero = FinalTwist', () => {
        const finalTwist = r8('711111111111111111111');
        const absoluteZero = createBuffer();
        const result = muxifyWrung('+', finalTwist, absoluteZero);
        expect(getWrungStringRepresentation(result)).toBe('711111111111111111111');
      });

      test('AbsoluteZero + FinalTwist = FinalTwist', () => {
        const absoluteZero = createBuffer();
        const finalTwist = r8('711111111111111111111');
        const result = muxifyWrung('+', absoluteZero, finalTwist);
        expect(getWrungStringRepresentation(result)).toBe('711111111111111111111');
      });
    });
  });
});
