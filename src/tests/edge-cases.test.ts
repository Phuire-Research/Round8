import { r8_ } from '..';
import {
  getWrungStringRepresentation,
  parseStringToRound8
} from '../concepts/round8/model/conference';
import { muxifyWrung } from '../concepts/round8/model/operations';

const r8 = (value: string): bigint => {
  const result = parseStringToRound8(value);
  if (result === undefined) {
    throw new Error(`Invalid Round8 string: ${value}`);
  }
  return result;
};

// // <---------->
// test('Subtraction: 711111111111111111111 - 688888888888888888787 = 82 (position-3 borrow)', (done) => {
//   const wrungA = r8('711111111111111111111');
//   const wrungB = r8('688888888888888888787'); // 21 ones
//   const result = muxifyWrung('-', wrungA, wrungB);

//   const resultStr = getWrungStringRepresentation(result);
//   expect(resultStr).toBe('82'); // Least significant = 1
//   done();
// });

// test('Subtraction: 711111111111111111111 - 688888888888888888788 = 181 (three-digit result)', (done) => {
//   const wrungA = r8('711111111111111111111');
//   const wrungB = r8('688888888888888888788'); // 21 ones
//   const result = muxifyWrung('-', wrungA, wrungB);

//   const resultStr = getWrungStringRepresentation(result);
//   expect(resultStr).toBe('181'); // Least significant = 1
//   done();
// });

// test('Subtraction: 711111111111111111111 - 688888888888888888881 = 8 (trailing digit variance, collapse)', () => {
//   const wrungA = r8('711111111111111111111');
//   const wrungB = r8('688888888888888888881'); // 21 ones
//   const result = muxifyWrung('-', wrungA, wrungB);

//   const resultStr = getWrungStringRepresentation(result);
//   expect(resultStr).toBe('8'); // Least significant = 1
// });
// // <---------->

// test('21 - 12 = 7 (borrow consumes position 2)', () => {
//   console.log('21 - 12 = 7 (borrow consumes position 2');
//   // Position 1: 1 - 2 = 7 with borrow
//   // Position 2: 2 - 1 - borrow = 2 - 1 - 1 = 0 → no numeral
//   // Result should be just "7"
//   const result = muxifyWrung('-', r8('21'), r8('12'));
//   expect(getWrungStringRepresentation(result)).toBe('7');
// });

// test('21 - 12 = 7 (borrow consumes position 2)', () => {
//   console.log('21 - 12 = 7 (borrow consumes position 2');
//   // Position 1: 1 - 2 = 7 with borrow
//   // Position 2: 2 - 1 - borrow = 2 - 1 - 1 = 0 → no numeral
//   // Result should be just "7"
//   const result = muxifyWrung('-', r8('21'), r8('13'));
//   expect(getWrungStringRepresentation(result)).toBe('6');
// });

// test('21 - 12 = 7 (borrow consumes position 2)', () => {
//   console.log('21 - 12 = 7 (borrow consumes position 2');
//   // Position 1: 1 - 2 = 7 with borrow
//   // Position 2: 2 - 1 - borrow = 2 - 1 - 1 = 0 → no numeral
//   // Result should be just "7"
//   const result = muxifyWrung('-', r8('21'), r8('14'));
//   expect(getWrungStringRepresentation(result)).toBe('5');
// });

// test('333 - 256 = 55 (borrow chain)', () => {
//   const result = muxifyWrung('-', r8('333'), r8('256'));
//   expect(getWrungStringRepresentation(result)).toBe('55');
// });

// test('DIAGNOSTIC: Start 11,11,11 → Decrement → Borrow cascade through all positions', (done) => {
//   // Parse the starting Round8 string "11,11,11"
//   const startString = '11,11,11';
//   const startBuffer = parseStringToRound8(startString)!;

//   const expectedString = '8,88,88';

//   // Perform decrement operation
//   const actualBuffer = r8_.operations.decrement(startBuffer);
//   const actualString = r8_.createRoundDisplay(actualBuffer);

//   // Assertion (will fail until bug is fixed)
//   expect(actualString).toBe(expectedString);
//   done();
// });

test('subtraction: 511111111111111111111 - 288888888888888888888 = 288888888888888888881 (high position difference)', () => {
  const wrunga = r8('511111111111111111111');
  const wrungb = r8('288888888888888888888'); // 21 ones
  console.log(getWrungStringRepresentation(wrunga), getWrungStringRepresentation(wrungb));
  const result = muxifyWrung('-', wrunga, wrungb);

  const resultstr = getWrungStringRepresentation(result);
  expect(resultstr).toBe('288888888888888888881'); // least significant = 1
});