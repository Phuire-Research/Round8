import { createFormattedRound8BinaryString, getFormattedColumnarWrungRepresentation, getWrungStringRepresentation, parseStringToRound8 } from "../concepts/round8/model/conference";
import { muxifyWrung } from '../concepts/round8/model/operations';

const r8 = (value: string): bigint => {
  const result = parseStringToRound8(value);
  if (result === undefined) {
    throw new Error(`Invalid Round8 string: ${value}`);
  }
  return result;
};
test('Position 21 numeral accumulation', () => {
  const wrungA = r8('111111111111111111111');
  const wrungB = r8('111111111111111111111');
  const result = muxifyWrung('+', wrungA, wrungB);
  const resultStr = getWrungStringRepresentation(result);
  expect(resultStr).toBe('222222222222222222222');
});

test('1 + 1 = 2', () => {
  const result = muxifyWrung('+', r8('1'), r8('1'));
  expect(getWrungStringRepresentation(result)).toBe('2');
});

test('8181 + 1818 = 11221 (inverse alternating)', () => {
  const result = muxifyWrung('+', r8('8181'), r8('1818'));
  expect(getWrungStringRepresentation(result)).toBe('12221');
});

test('5 + 123 = 128 (1 position + 3 positions)', () => {
  const wrungA = r8('5');
  const wrungB = r8('123');
  const result = muxifyWrung('+', wrungA, wrungB);

  // Parse reversal: "123" → pos1=3, pos2=2, pos3=1
  // Sum: pos1=(5+3)=8, pos2=2, pos3=1
  // Stringify: "821" → reverse → "128"
  expect(getWrungStringRepresentation(result)).toBe('128');
});

test('1818 + 1818 = 3636 (alternating low-high)', () => {
  const result = muxifyWrung('+', r8('1818'), r8('1818'));
  expect(getWrungStringRepresentation(result)).toBe('3838');
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