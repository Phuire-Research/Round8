import { BidirectionalConference } from '../concepts/round8/model/bidirectional';
import {
  createFormattedRound8BinaryString,
  getFormattedColumnarWrungRepresentation,
  getWrungStringRepresentation,
  parseStringToRound8
} from '../concepts/round8/model/conference';
import { muxifyWrung } from '../concepts/round8/model/operations';
import {
  getRotationValue,
  getShiftedBitRotation,
  getShiftedRotation,
  getShiftedRotationString,
  getSignBit
} from '../concepts/round8/model/terminology';

const r8 = (value: string): bigint => {
  const result = parseStringToRound8(value);
  if (result === undefined) {
    throw new Error(`Invalid Round8 string: ${value}`);
  }
  return result;
};
// test('Position 21 numeral accumulation', () => {
//   const wrungA = r8('111111111111111111111');
//   const wrungB = r8('111111111111111111111');
//   const result = muxifyWrung('+', wrungA, wrungB);
//   const resultStr = getWrungStringRepresentation(result);
//   const resultBinary = createFormattedRound8BinaryString(result);
//   console.log('REFERENCE OVERVIEW 8', getShiftedBitRotation(8));
//   console.log('REFERENCE OVERVIEW 1', getShiftedBitRotation(1));
//   console.log('REFERENCE OVERVIEW 2', getShiftedBitRotation(2));
//   console.log('REFERENCE OVERVIEW 3', getShiftedBitRotation(3));
//   console.log('REFERENCE OVERVIEW 4', getShiftedBitRotation(4));
//   console.log('REFERENCE OVERVIEW 5', getShiftedBitRotation(5));
//   console.log('REFERENCE OVERVIEW 6', getShiftedBitRotation(6));
//   console.log('REFERENCE OVERVIEW 7', getShiftedBitRotation(7));
//   // expect(resultBinary).toBe('222222222222222222222');
//   expect(resultStr).toBe('222222222222222222222');
// });

// test('1 + 1 = 2', () => {
//   const result = muxifyWrung('+', r8('1'), r8('1'));
//   expect(getWrungStringRepresentation(result)).toBe('2');
// });

// test('8181 + 1818 = 11221 (inverse alternating)', () => {
//   const result = muxifyWrung('+', r8('8181'), r8('1818'));
//   expect(getWrungStringRepresentation(result)).toBe('12221');
// });

// test('5 + 123 = 128 (1 position + 3 positions)', () => {
//   const wrungA = r8('5');
//   const wrungB = r8('123');
//   const result = muxifyWrung('+', wrungA, wrungB);

//   // Parse reversal: "123" → pos1=3, pos2=2, pos3=1
//   // Sum: pos1=(5+3)=8, pos2=2, pos3=1
//   // Stringify: "821" → reverse → "128"
//   expect(getWrungStringRepresentation(result)).toBe('128');
// });

// test('1818 + 1818 = 3636 (alternating low-high)', () => {
//   const result = muxifyWrung('+', r8('1818'), r8('1818'));
//   expect(getWrungStringRepresentation(result)).toBe('3838');
// });

// test('8 + 11 = 21 (carry extends shorter operand)', () => {
//   const wrungA = r8('8');
//   const wrungB = r8('11');
//   const result = muxifyWrung('+', wrungA, wrungB);

//   // Parse reversal: "11" → pos1=1, pos2=1
//   // Sum: pos1=(8+1)=9→1 carry1, pos2=(0+1+1)=2
//   // Stringify: "12" → reverse → "21"
//   expect(getWrungStringRepresentation(result)).toBe('21');
// });
// test('21 - 8 = 11 (position 2 consumed by borrow)', () => {
//   // 21 in Round8 = 2*8 + 1 = 17 decimal
//   // 8 in Round8 = 8 decimal
//   // 17 - 8 = 9 = 1*8 + 1 = 11 in Round8
//   const result = muxifyWrung('-', r8('21'), r8('8'));
//   expect(getWrungStringRepresentation(result)).toBe('11');
// });

// test('11 - 8 = 1 (borrow from position 2)', () => {
//   // 11 in Round8 = 1*8 + 1 = 9 decimal
//   // 8 in Round8 = 8 decimal
//   // 9 - 8 = 1
//   const result = muxifyWrung('-', r8('11'), r8('8'));
//   expect(getWrungStringRepresentation(result)).toBe('1');
// });

// test('33 - 14 = 17 (borrow from pos 2)', () => {
//   // Position 1: 3 - 4 = 7 with borrow
//   // Position 2: 3 - 1 - borrow = 3 - 1 - 1 = 1
//   const result = muxifyWrung('-', r8('33'), r8('14'));
//   expect(getWrungStringRepresentation(result)).toBe('17');
// });

// test('1234 - 56 = 1156', () => {
//   const result = muxifyWrung('-', r8('1234'), r8('56'));
//   expect(getWrungStringRepresentation(result)).toBe('1156');
// });

// test('111 - 88 = 1 (cascading borrow)', () => {
//   // Parse reversal: "111" → pos1=1, pos2=1, pos3=1
//   // Parse reversal: "88" → pos1=8, pos2=8
//   // Difference: pos1=(1-8)→borrow, pos2=(1-8-borrow)→consumed, pos3=(1-0-borrow)→consumed
//   // Result: pos1=1 only (higher positions consumed by cascading borrow)
//   // Stringify: "1"
//   const result = muxifyWrung('-', r8('111'), r8('88'));
//   expect(getWrungStringRepresentation(result)).toBe('1');
// });

// // Note applyShiftedNumeralRotation(resultIndex - 1, buffer, pos)
// // This is apply an Offset, but is not regular
// test('21 position subtraction', () => {
//   const twentyOne2s = '222222222222222222222';
//   const twentyOne1s = '111111111111111111111';
//   const result = muxifyWrung('-', r8(twentyOne2s), r8(twentyOne1s));
//   // Parse reversal applies to both operands (both palindromes, so same)
//   // Difference: each position 2-1=1, result has 20 positions (pos 21 is shift-frame boundary)

//   // expect(getRotationValue(result, 21)).toBe('11111111111111111111');
//   expect(getWrungStringRepresentation(result)).toBe('11111111111111111111');
// });

// test('20 positions minus 21 positions (smaller first should swap)', () => {
//   // This tests that the anchor is always the larger magnitude
//   console.log('REFERENCE OVERVIEW 8', getShiftedBitRotation(8));
//   console.log('REFERENCE OVERVIEW 1', getShiftedBitRotation(1));
//   console.log('REFERENCE OVERVIEW 2', getShiftedBitRotation(2));
//   console.log('REFERENCE OVERVIEW 3', getShiftedBitRotation(3));
//   console.log('REFERENCE OVERVIEW 4', getShiftedBitRotation(4));
//   console.log('REFERENCE OVERVIEW 5', getShiftedBitRotation(5));
//   console.log('REFERENCE OVERVIEW 6', getShiftedBitRotation(6));
//   console.log('REFERENCE OVERVIEW 7', getShiftedBitRotation(7));
//   const twenty8s = '88888888888888888888'; // 20 positions
//   const twentyOne1s = '111111111111111111111'; // 21 positions
//   const a20_8s = createFormattedRound8BinaryString(r8(twenty8s));
//   const a21_1s = createFormattedRound8BinaryString(r8(twentyOne1s));
//   console.log(a20_8s, twenty8s);
//   console.log(BidirectionalConference(r8(twenty8s)));
//   console.log(a21_1s, twentyOne1s);
//   console.log(BidirectionalConference(r8(twentyOne1s)));
//   // 21 positions > 20 positions in magnitude
//   // Magnitude comparison swaps: anchorWrung=twentyOne1s, modulatorWrung=twenty8s
//   // Computes: twentyOne1s - twenty8s (positive result)
//   const result = muxifyWrung('-', r8(twenty8s), r8(twentyOne1s));
//   // Result should be positive because magnitude comparison correctly swapped operands
//   expect(getSignBit(result)).toBe(0);
// });

// test('Mixed length edge case (1 position + 21 positions)', () => {
//   const wrungA = r8('8');
//   const wrungB = r8('111111111111111111111'); // 21 ones
//   const result = muxifyWrung('+', wrungA, wrungB);

//   // 8+1=9>8 → carry propagates through all 21 positions
//   const resultStr = getWrungStringRepresentation(result);
//   expect(resultStr).toBe('111111111111111111121'); // Least significant = 1
//   expect(resultStr.length).toBe(21);
// });

// test('Was Full Twist', () => {
//   const wrungA = r8('711111111111111111111');
//   const wrungB = r8('1'); // 21 ones
//   const result = muxifyWrung('-', wrungA, wrungB);

//   const resultStr = getWrungStringRepresentation(result);
//   expect(resultStr).toBe('688888888888888888888'); // Least significant = 1
// });

test('Was Full Twist', () => {
  const wrungA = r8('711111111111111111111');
  const wrungB = r8('688888888888888888888'); // 21 ones
  const result = muxifyWrung('-', wrungA, wrungB);

  const resultStr = getWrungStringRepresentation(result);
  expect(resultStr).toBe('1'); // Least significant = 1
});

// test('Was Full Twist', () => {
//   const wrungA = r8('6888');
//   const wrungB = r8('6887'); // 21 ones
//   const result = muxifyWrung('-', wrungA, wrungB);

//   const resultStr = getWrungStringRepresentation(result);
//   expect(resultStr).toBe('1'); // Least significant = 1
// });

// test('Is Near Max', () => {
//   const wrungA = r8('688888888888888888888');

//   const resultStr = getWrungStringRepresentation(wrungA);
//   expect(resultStr).toBe('688888888888888888888'); // Least significant = 1
// });

// test('21 positions minus 10 positions', () => {
//   const twentyOne3s = '333333333333333333333';
//   const ten1s = '1111111111';
//   const result = muxifyWrung('-', r8(twentyOne3s), r8(ten1s));
//   // Parse reversal: "333...3" (21) → pos1-21=3, "111...1" (10) → pos1-10=1
//   // Difference: pos1-10=(3-1)=2, pos11-21=3 (copy from anchor)
//   // Stringify: "222...2333...3" (10 twos, 11 threes) → reverse → "333...3222...2"
//   // expect(createFormattedRound8BinaryString(result)).toBe('233333333332222222222');
//   expect(getWrungStringRepresentation(result)).toBe('233333333332222222222');
// });
