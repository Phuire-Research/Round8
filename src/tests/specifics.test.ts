import { createFormattedRound8BinaryString, getFormattedColumnarWrungRepresentation, getWrungStringRepresentation, parseStringToRound8 } from "../concepts/round8/model/conference";

test('10.2: Columnar Output Formatting - getFormattedColumnarWrungRepresentation', () => {
  const str = '12345';
  const buffer = parseStringToRound8(str)!;
  const interop = getWrungStringRepresentation(buffer);
  const columnar = getFormattedColumnarWrungRepresentation(buffer);
  console.log(createFormattedRound8BinaryString(buffer));
  expect(str).toBe(interop);
  expect(columnar).toBe('1,23,45');
});