
export const SPECIAL_CASE_STORE = {
  ZERO_CASE: Uint8Array.from([
    0,
    0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0,
  ]),
  POSITIVE_1_CASE: Uint8Array.from([
    1,
    0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0,
  ]),
  // First Position 0
  NEGATIVE_1_CASE: Uint8Array.from([
    0,
    1, 1, 1, 1, 1, 1,
    1, 1, 1, 1, 1, 1,
    1, 1, 1, 1, 1, 1,
    1, 1, 1, 1, 1, 1,
    1, 1, 1, 1, 1, 1,
    1, 1, 1, 1, 1, 1,
    1, 1, 1, 1, 1, 1,
    1, 1, 1, 1, 1, 1,
    1, 1, 1, 1, 1, 1,
    1, 1, 1, 1, 1, 1,
    1, 1, 1, 1, 1, 1,
  ]),
};

type SomeSeries = Record<string, ((Uint8Array<ArrayBuffer> | number)[] | number)[]>;

const SumSeries: SomeSeries  = {
  SumOfOneAndOne: [
    0, 0, 0, 0, 0, [0, new Uint8Array([0, 0, 1])]
  ], // 2
  SumOfTwoAndOne: [
    0, 0, 1, 0, 0, [0, new Uint8Array([0, 1, 0])]
  ], // 3
  SumOfThreeAndOne: [
    0, 1, 0, 0, 0, [0, new Uint8Array([0, 1, 1])]
  ], // 4
  SumOfFourAndOne: [
    0, 1, 1, 0, 0, [0, new Uint8Array([1, 0, 0])]
  ], // 5
  SumOfFiveAndOne: [
    1, 0, 0, 0, 0, [0, new Uint8Array([1, 0, 1])]
  ], // 6
  SumOfSixAndOne: [
    1, 0, 1, 0, 0, [0, new Uint8Array([1, 1, 0])]
  ], // 7
  SumOfSevenAndOne: [
    1, 1, 0, 0, 0, [0, new Uint8Array([1, 1, 1])]
  ], // 8
  SumOfEightAndOne: [
    1, 1, 1, 0, 0, [0, new Uint8Array([0, 0, 0]), new Uint8Array([0, 0, 0])]
  ], // 7
};

type SpooledWrung = ((((((Uint8Array<ArrayBuffer> | number)[])[])[])[])[])[];
const SpooledSumSeries: SpooledWrung = [];
const spool = (someSeries: SomeSeries, spooled: SpooledWrung) => {
  let one = 0;
  let two = 0;
  let three = 0;
  let four = 0;
  let five = 0;
  let six = 0;
  let sixValue: number[] | number = 0;
  Object.keys(SumSeries).forEach((sum) => {
    someSeries[sum].forEach((val, i) => {
      if (typeof val === 'number') {
        switch (val) {
        case 0: {
          one = val;
          break;
        }
        case 1: {
          two = val;
          break;
        }
        case 2: {
          three = val;
          break;
        }
        case 3: {
          four = val;
          break;
        }
        case 4: {
          five = val;
          break;
        }
        default: {
          //
        }
        }
      } else {
        const tuple = val as(number[] | number)[];
        six = tuple[0] as number;
        if (tuple.length === 2) {
          sixValue = tuple[1] as number[];
        } else {
          sixValue = [tuple[1], tuple[2]] as unknown as number[];
        }
      }
    });
    spooled[one][two][three][four][five][six] = sixValue as unknown as Uint8Array<ArrayBuffer> | number ;
  });
};

spool(SumSeries, SpooledSumSeries);

const DifferenceSeries: SomeSeries = {
  DifferenceOfOneAndOne: [
    0, 0, 0, 0, 0, [0, SPECIAL_CASE_STORE.ZERO_CASE]
  ], // 0
  DifferenceOfTwoAndOne: [
    0, 0, 1, 0, 0, [0, new Uint8Array([0, 0, 0])]
  ], // 1
  DifferenceOfThreeAndOne: [
    0, 1, 0, 0, 0, [0, new Uint8Array([0, 0, 1])]
  ], // 2
  DifferenceOfFourAndOne: [
    0, 1, 1, 0, 0, [0, new Uint8Array([0, 1, 0])]
  ], // 3
  DifferenceOfFiveAndOne: [
    1, 0, 0, 0, 0, [0, new Uint8Array([0, 1, 1])]
  ], // 4
  DifferenceOfSixAndOne: [
    1, 0, 1, 0, 0, [0, new Uint8Array([1, 0, 0])]
  ], // 5
  DifferenceOfSevenAndOne: [
    1, 1, 0, 0, 0, [0, new Uint8Array([1, 0, 1])]
  ], // 6
  DifferenceOfEightAndOne: [
    1, 1, 1, 0, 0, [0, new Uint8Array([1, 1, 0])]
  ], // 7
};

spool(DifferenceSeries, SpooledSumSeries);

export const DIFFERENCE_MAP = {
  ZERO_CASE: Uint8Array.from([
    0, 0, 0,
  ]),
  POSITIVE_1_CASE: Uint8Array.from([
    0, 0, 0,
  ]),
  // First Position 0
  NEGATIVE_1_CASE: Uint8Array.from([
    1, 1, 1,
  ]),
};

export const STRING_TO_ROUND8_ROTATION: Record<string, Uint8Array> = {
  '1': Uint8Array.from([0, 0, 0]),  // Binary 000 → Display "1"
  '2': Uint8Array.from([0, 0, 1]),  // Binary 001 → Display "2"
  '3': Uint8Array.from([0, 1, 0]),  // Binary 010 → Display "3"
  '4': Uint8Array.from([0, 1, 1]),  // Binary 011 → Display "4"
  '5': Uint8Array.from([1, 0, 0]),  // Binary 100 → Display "5"
  '6': Uint8Array.from([1, 0, 1]),  // Binary 101 → Display "6"
  '7': Uint8Array.from([1, 1, 0]),  // Binary 110 → Display "7"
  '8': Uint8Array.from([1, 1, 1]),  // Binary 111 → Display "8"
};

