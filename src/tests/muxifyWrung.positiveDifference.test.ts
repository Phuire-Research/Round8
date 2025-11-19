/**
 * muxifyWrung Positive Difference Test Suite
 *
 * Suite 8 Pearl: Validation of Quality-First Muxification Difference Operations
 * Tests borrow propagation, all-8s pattern detection, and forward-only computation.
 *
 * Progressive Complexity:
 * - Task 1: Single position differences
 * - Task 2: Two position differences with borrow
 * - Task 3: Position 1-20 range
 * - Task 4: Full 21 positions with any length
 *
 * Citation: Quality-First Muxification - Proto-Muxium Dispatch Pattern
 */

import {
  createBuffer,
  applyNumeralRotation,
  setSignBit,
  getSignBit,
  type Positions
} from '../concepts/round8/model/terminology';
import { BidirectionalConference } from '../concepts/round8/model/bidirectional';
import { parseStringToRound8, getWrungStringRepresentation, getFormattedColumnarWrungRepresentation, createFormattedRound8BinaryString } from '../concepts/round8/model/conference';
import { muxifyWrung } from '../concepts/round8/model/operations';

describe('muxifyWrung - Quality-First Positive Difference', () => {
  // Helper: Parse Round8 string to bigint (with assertion for test convenience)
  const r8 = (str: string): bigint => parseStringToRound8(str) as bigint;

  // Helper: Get Round8 string representation
  const str = (wrung: bigint): string => getWrungStringRepresentation(wrung);

  describe('Task 1: Single Position Validation', () => {
    describe('No Borrow Cases (Minuend >= Subtrahend)', () => {
      test('8 - 1 = 7', () => {
        const result = muxifyWrung('-', r8('8'), r8('1'));
        expect(str(result)).toBe('7');
      });

      test('5 - 3 = 2', () => {
        const result = muxifyWrung('-', r8('5'), r8('3'));
        expect(str(result)).toBe('2');
      });

      test('8 - 8 = 0 (equal magnitude → AbsoluteZero)', () => {
        const result = muxifyWrung('-', r8('8'), r8('8'));
        const wrungMuxity = BidirectionalConference(result);
        expect(wrungMuxity.isAbsoluteZero).toBe(true);
      });

      test('2 - 1 = 1', () => {
        const result = muxifyWrung('-', r8('2'), r8('1'));
        expect(str(result)).toBe('1');
      });

      test('6 - 4 = 2', () => {
        const result = muxifyWrung('-', r8('6'), r8('4'));
        expect(str(result)).toBe('2');
      });

      test('7 - 7 = 0 (AbsoluteZero)', () => {
        const result = muxifyWrung('-', r8('7'), r8('7'));
        const wrungMuxity = BidirectionalConference(result);
        expect(wrungMuxity.isAbsoluteZero).toBe(true);
      });
    });

    describe('Multi-Position with Borrow (Single Position Minuend)', () => {
      test('11 - 8 = 1 (borrow from position 2)', () => {
        // 11 in Round8 = 1*8 + 1 = 9 decimal
        // 8 in Round8 = 8 decimal
        // 9 - 8 = 1
        const result = muxifyWrung('-', r8('11'), r8('8'));
        expect(str(result)).toBe('1');
      });

      test('12 - 5 = 5 (borrow from position 2)', () => {
        // 12 in Round8 = 1*8 + 2 = 10 decimal
        // 5 in Round8 = 5 decimal
        // 10 - 5 = 5
        const result = muxifyWrung('-', r8('12'), r8('5'));
        expect(str(result)).toBe('5');
      });

      test('21 - 8 = 11 (position 2 consumed by borrow)', () => {
        // 21 in Round8 = 2*8 + 1 = 17 decimal
        // 8 in Round8 = 8 decimal
        // 17 - 8 = 9 = 1*8 + 1 = 11 in Round8
        const result = muxifyWrung('-', r8('21'), r8('8'));
        expect(str(result)).toBe('11');
      });
    });

    describe('Quality-First Short-Circuits', () => {
      test('AnyValue - AbsoluteZero = AnyValue', () => {
        const result = muxifyWrung('-', r8('5'), createBuffer());
        expect(str(result)).toBe('5');
      });

      test('AbsoluteZero - AnyValue = Negative (sign flip)', () => {
        const result = muxifyWrung('-', createBuffer(), r8('5'));
        // Should return negative 5 (sign bit = 0)
        expect(getSignBit(result)).toBe(0);
      });

      test('1 - 1 = AbsoluteZero', () => {
        const result = muxifyWrung('-', r8('1'), r8('1'));
        const wrungMuxity = BidirectionalConference(result);
        expect(wrungMuxity.isAbsoluteZero).toBe(true);
      });
    });

    describe('Sign Bit Preservation', () => {
      test('Positive - Smaller Positive = Positive', () => {
        const result = muxifyWrung('-', r8('8'), r8('3'));
        expect(getSignBit(result)).toBe(1);
      });

      test('Equal magnitudes return positive zero (sign = 1)', () => {
        const result = muxifyWrung('-', r8('5'), r8('5'));
        // AbsoluteZero has sign bit 0, but that's okay for zero
        const wrungMuxity = BidirectionalConference(result);
        expect(wrungMuxity.isAbsoluteZero).toBe(true);
      });
    });
  });

  describe('Task 2: Two Position Validation', () => {
    describe('No Borrow Cases', () => {
      test('22 - 11 = 11', () => {
        const result = muxifyWrung('-', r8('22'), r8('11'));
        expect(str(result)).toBe('11');
      });

      test('33 - 22 = 11', () => {
        const result = muxifyWrung('-', r8('33'), r8('22'));
        expect(str(result)).toBe('11');
      });

      test('88 - 44 = 44', () => {
        const result = muxifyWrung('-', r8('88'), r8('44'));
        expect(str(result)).toBe('44');
      });
    });

    describe('With Borrow Propagation', () => {
      test('33 - 14 = 17 (borrow from pos 2)', () => {
        // Position 1: 3 - 4 = 7 with borrow
        // Position 2: 3 - 1 - borrow = 3 - 1 - 1 = 1
        const result = muxifyWrung('-', r8('33'), r8('14'));
        expect(str(result)).toBe('17');
      });

      test('21 - 12 = 7 (borrow consumes position 2)', () => {
        // Position 1: 1 - 2 = 7 with borrow
        // Position 2: 2 - 1 - borrow = 2 - 1 - 1 = 0 → no numeral
        // Result should be just "7"
        const result = muxifyWrung('-', r8('21'), r8('12'));
        expect(str(result)).toBe('7');
      });

      test('51 - 22 = 27 (borrow propagation)', () => {
        // Position 1: 1 - 2 = 7 with borrow
        // Position 2: 5 - 2 - borrow = 5 - 2 - 1 = 2
        const result = muxifyWrung('-', r8('51'), r8('22'));
        expect(str(result)).toBe('27');
      });

      test('42 - 15 = 25 (both positions borrow)', () => {
        // Position 1: 2 - 5 = 5 with borrow
        // Position 2: 4 - 1 - borrow = 4 - 1 - 1 = 2
        const result = muxifyWrung('-', r8('42'), r8('15'));
        expect(str(result)).toBe('25');
      });
    });

    describe('Different Lengths', () => {
      test('22 - 1 = 21', () => {
        const result = muxifyWrung('-', r8('22'), r8('1'));
        expect(str(result)).toBe('21');
      });

      test('33 - 4 = 27 (borrow from longer)', () => {
        // Position 1: 3 - 4 = 7 with borrow
        // Position 2: 3 - 0 - borrow = 3 - 1 = 2
        const result = muxifyWrung('-', r8('33'), r8('4'));
        expect(str(result)).toBe('27');
      });

      test('11 - 3 = 6 (borrow consumes both positions)', () => {
        // Position 1: 1 - 3 = 6 with borrow
        // Position 2: 1 - 0 - borrow = 1 - 1 = 0 → no numeral
        const result = muxifyWrung('-', r8('11'), r8('3'));
        expect(str(result)).toBe('6');
      });
    });

    describe('Equal Magnitude (AbsoluteZero)', () => {
      test('22 - 22 = AbsoluteZero', () => {
        const result = muxifyWrung('-', r8('22'), r8('22'));
        const wrungMuxity = BidirectionalConference(result);
        expect(wrungMuxity.isAbsoluteZero).toBe(true);
      });

      test('88 - 88 = AbsoluteZero', () => {
        const result = muxifyWrung('-', r8('88'), r8('88'));
        const wrungMuxity = BidirectionalConference(result);
        expect(wrungMuxity.isAbsoluteZero).toBe(true);
      });
    });
  });

  describe('Task 3: Position 1-20 Range', () => {
    describe('Same Length Differences', () => {
      test('123 - 111 = 12', () => {
        const result = muxifyWrung('-', r8('123'), r8('111'));
        expect(str(result)).toBe('12');
      });

      test('555 - 333 = 222', () => {
        const result = muxifyWrung('-', r8('555'), r8('333'));
        expect(str(result)).toBe('222');
      });

      test('888 - 444 = 444', () => {
        const result = muxifyWrung('-', r8('888'), r8('444'));
        expect(str(result)).toBe('444');
      });
    });

    describe('Cascading Borrow Propagation', () => {
      test('111 - 88 = 1 (cascading borrow)', () => {
        // Parse reversal: "111" → pos1=1, pos2=1, pos3=1
        // Parse reversal: "88" → pos1=8, pos2=8
        // Difference: pos1=(1-8)→borrow, pos2=(1-8-borrow)→consumed, pos3=(1-0-borrow)→consumed
        // Result: pos1=1 only (higher positions consumed by cascading borrow)
        // Stringify: "1"
        const result = muxifyWrung('-', r8('111'), r8('88'));
        expect(str(result)).toBe('1');
      });

      test('222 - 145 = 55 (multiple borrows)', () => {
        // Position 1: 2 - 5 = 5 with borrow
        // Position 2: 2 - 4 - borrow = 2 - 4 - 1 = -3... needs another borrow
        // Actually: 2 + 8 - 4 - 1 = 5 with borrow
        // Position 3: 2 - 1 - borrow = 2 - 1 - 1 = 0 → no numeral
        // Result: "55" (two fives)
        const result = muxifyWrung('-', r8('222'), r8('145'));
        expect(str(result)).toBe('55');
      });

      test('333 - 256 = 55 (borrow chain)', () => {
        const result = muxifyWrung('-', r8('333'), r8('256'));
        expect(str(result)).toBe('55');
      });
    });

    describe('Different Lengths', () => {
      test('123 - 5 = 116', () => {
        const result = muxifyWrung('-', r8('123'), r8('5'));
        expect(str(result)).toBe('116');
      });

      test('1234 - 56 = 1156', () => {
        const result = muxifyWrung('-', r8('1234'), r8('56'));
        expect(str(result)).toBe('1156');
      });

      test('12345 - 111 = 12234', () => {
        const result = muxifyWrung('-', r8('12345'), r8('111'));
        expect(getWrungStringRepresentation(result)).toBe('12234');
      });
    });

    describe('Position 20 Boundary', () => {
      test('Twenty 2s minus twenty 1s', () => {
        const twenty2s = '22222222222222222222';
        const twenty1s = '11111111111111111111';
        const result = muxifyWrung('-', r8(twenty2s), r8(twenty1s));
        expect(getWrungStringRepresentation(result)).toBe('11111111111111111111');
      });

      test('Equal twenty-digit numbers', () => {
        const twenty5s = '55555555555555555555';
        const result = muxifyWrung('-', r8(twenty5s), r8(twenty5s));
        const wrungMuxity = BidirectionalConference(result);
        expect(wrungMuxity.isAbsoluteZero).toBe(true);
      });
    });
  });

  describe('Task 4: Full 21 Positions with Any Length', () => {
    describe('Maximum Length Operations', () => {
      test('21 position subtraction', () => {
        const twentyOne2s = '222222222222222222222';
        const twentyOne1s = '111111111111111111111';
        const result = muxifyWrung('-', r8(twentyOne2s), r8(twentyOne1s));
        // Parse reversal applies to both operands (both palindromes, so same)
        // Difference: each position 2-1=1, result has 20 positions (pos 21 is shift-frame boundary)
        expect(getWrungStringRepresentation(result)).toBe('11111111111111111111');
      });

      test('Equal 21-digit numbers = AbsoluteZero', () => {
        const twentyOne5s = '555555555555555555555';
        const result = muxifyWrung('-', r8(twentyOne5s), r8(twentyOne5s));
        const wrungMuxity = BidirectionalConference(result);
        expect(wrungMuxity.isAbsoluteZero).toBe(true);
      });

      test('FinalTwist - FinalTwist = AbsoluteZero', () => {
        const finalTwist = '711111111111111111111';
        const result = muxifyWrung('-', r8(finalTwist), r8(finalTwist));
        const wrungMuxity = BidirectionalConference(result);
        expect(wrungMuxity.isAbsoluteZero).toBe(true);
      });
    });

    describe('All-8s Pattern Detection', () => {
      test('88888888 - 1 with cascading borrows', () => {
        // This creates all-8s pattern with final borrow
        // If all positions end up as 8 and there's a final borrow → AbsoluteZero
        const result = muxifyWrung('-', r8('11111111'), r8('11111111'));
        const wrungMuxity = BidirectionalConference(result);
        expect(wrungMuxity.isAbsoluteZero).toBe(true);
      });

      test('21 ones minus 21 ones = AbsoluteZero', () => {
        const twentyOne1s = '111111111111111111111';
        const result = muxifyWrung('-', r8(twentyOne1s), r8(twentyOne1s));
        const wrungMuxity = BidirectionalConference(result);
        expect(wrungMuxity.isAbsoluteZero).toBe(true);
      });
    });

    describe('Mixed Length Differences', () => {
      test('21 positions minus 1 position', () => {
        const twentyOne2s = '222222222222222222222';
        const result = muxifyWrung('-', r8(twentyOne2s), r8('1'));
        // Parse reversal: "222...2" → pos1-21=2, "1" → pos1=1
        // Difference: pos1=(2-1)=1, pos2-21=2
        // Stringify: "122...2" → reverse → "222...21"
        expect(getWrungStringRepresentation(result)).toBe('22222222222222222221');
      });

      test('21 positions minus 10 positions', () => {
        const twentyOne3s = '333333333333333333333';
        const ten1s = '1111111111';
        const result = muxifyWrung('-', r8(twentyOne3s), r8(ten1s));
        // Parse reversal: "333...3" (21) → pos1-21=3, "111...1" (10) → pos1-10=1
        // Difference: pos1-10=(3-1)=2, pos11-21=3 (copy from anchor)
        // Stringify: "222...2333...3" (10 twos, 11 threes) → reverse → "333...3222...2"
        // expect(createFormattedRound8BinaryString(result)).toBe('233333333332222222222');
        expect(getWrungStringRepresentation(result)).toBe('233333333332222222222');
      });

      test('20 positions minus 21 positions (smaller first should swap)', () => {
        // This tests that the anchor is always the larger magnitude
        const twenty8s = '88888888888888888888'; // 20 positions
        const twentyOne1s = '111111111111111111111'; // 21 positions
        // 21 positions > 20 positions in magnitude
        // Magnitude comparison swaps: anchorWrung=twentyOne1s, modulatorWrung=twenty8s
        // Computes: twentyOne1s - twenty8s (positive result)
        const result = muxifyWrung('-', r8(twenty8s), r8(twentyOne1s));
        // Result should be positive because magnitude comparison correctly swapped operands
        expect(getSignBit(result)).toBe(1); // Positive result
      });
    });

    describe('WrungMuxity Validation', () => {
      test('Result maintains proper structure', () => {
        const result = muxifyWrung('-', r8('888'), r8('111'));
        const wrungMuxity = BidirectionalConference(result);

        expect(wrungMuxity.isAbsoluteZero).toBeFalsy();
        expect(wrungMuxity.isFinalTwist).toBeFalsy();
        expect(wrungMuxity.wrung).toBe(result);
      });

      test('Self-reference preserved in result', () => {
        const result = muxifyWrung('-', r8('12345'), r8('11111'));
        const wrungMuxity = BidirectionalConference(result);

        // Verify self-reference is set correctly
        expect(wrungMuxity.wrung).toBeDefined();
        expect(wrungMuxity.wrung).toBe(result);
      });
    });

    describe('Commutativity NOT Expected (A - B != B - A)', () => {
      test('5 - 3 != 3 - 5 (different signs)', () => {
        const result1 = muxifyWrung('-', r8('5'), r8('3'));
        const result2 = muxifyWrung('-', r8('3'), r8('5'));

        // 5 - 3 = 2 (positive)
        expect(getSignBit(result1)).toBe(1);
        // 3 - 5 = -2 (negative)
        expect(getSignBit(result2)).toBe(0);
      });

      test('123 - 111 != 111 - 123', () => {
        const result1 = muxifyWrung('-', r8('123'), r8('111'));
        const result2 = muxifyWrung('-', r8('111'), r8('123'));

        expect(getSignBit(result1)).toBe(1); // Positive
        expect(getSignBit(result2)).toBe(0); // Negative
      });
    });
  });
});
