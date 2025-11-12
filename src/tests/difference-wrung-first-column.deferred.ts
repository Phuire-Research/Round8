// /**
//  * DifferenceWrung First Column (Column 20) Tests
//  *
//  * Tests the rightmost column subtraction operations including:
//  * - Regular subtraction (no Negative One involvement)
//  * - Negative One subtraction: X - (-1) and (-1) - X
//  * - Borrow propagation to column 19
//  * - Sign bit handling
//  * - Marquee state validation
//  */

// import { DifferenceWrung } from '../concepts/round8/model/cases';
// import { BidirectionalConference } from '../concepts/round8/model/bidirectional';
// import { detectNegativeOne } from '../concepts/round8/model/bidirectional';

// describe('DifferenceWrung - First Column (Column 20)', () => {
//   /**
//    * Helper: Create buffer with only first column set (positions 61-63)
//    * All other positions are 0
//    */
//   const createFirstColumnBuffer = (value: number, isPositive = true): Uint8Array<ArrayBuffer> => {
//     const buffer = new Uint8Array(64) as Uint8Array<ArrayBuffer>;
//     buffer[0] = isPositive ? 1 : 0;

//     const internalValue = value - 1;

//     buffer[61] = (internalValue >> 2) & 1;
//     buffer[62] = (internalValue >> 1) & 1;
//     buffer[63] = internalValue & 1;

//     return buffer;
//   };

//   /**
//    * Helper: Extract first column value from buffer
//    */
//   const extractFirstColumn = (buffer: Uint8Array): number => {
//     const bit2 = buffer[61];
//     const bit1 = buffer[62];
//     const bit0 = buffer[63];

//     const internalValue = (bit2 << 2) | (bit1 << 1) | bit0;

//     return internalValue + 1;
//   };

//   /**
//    * Helper: Check if second column (positions 58-60) has borrow
//    */
//   const hasBorrowToSecondColumn = (buffer: Uint8Array): boolean => {
//     return buffer[58] !== 0 || buffer[59] !== 0 || buffer[60] !== 0;
//   };

//   /**
//    * Helper: Extract second column value if borrow exists
//    */
//   const extractSecondColumn = (buffer: Uint8Array): number => {
//     const bit2 = buffer[58];
//     const bit1 = buffer[59];
//     const bit0 = buffer[60];

//     const internalValue = (bit2 << 2) | (bit1 << 1) | bit0;
//     return internalValue + 1;
//   };

//   /**
//    * Helper: Extract raw binary at column 19 (positions 58-60)
//    */
//   const getColumn19Binary = (buffer: Uint8Array): [number, number, number] => {
//     return [buffer[58], buffer[59], buffer[60]];
//   };

//   /**
//    * Helper: Extract raw binary at column 20 (positions 61-63)
//    */
//   const getColumn20Binary = (buffer: Uint8Array): [number, number, number] => {
//     return [buffer[61], buffer[62], buffer[63]];
//   };

//   /**
//    * Helper: Validate basic subtraction result
//    */
//   const validateBasicSubtraction = (
//     minuend: number,
//     subtrahend: number,
//     expected: number,
//     expectBorrow: boolean
//   ): void => {
//     const bufferA = createFirstColumnBuffer(minuend);
//     const bufferB = createFirstColumnBuffer(subtrahend);
//     const result = DifferenceWrung(bufferA, bufferB);

//     expect(extractFirstColumn(result)).toBe(expected);
//     expect(hasBorrowToSecondColumn(result)).toBe(expectBorrow);
//   };

//   /**
//    * Helper: Create Negative One buffer (all columns [1,1,1], sign = 0)
//    */
//   const createNegativeOneBuffer = (): Uint8Array<ArrayBuffer> => {
//     const buffer = new Uint8Array(64) as Uint8Array<ArrayBuffer>;
//     buffer[0] = 0;

//     for (let i = 1; i < 64; i++) {
//       buffer[i] = 1;
//     }

//     return buffer;
//   };

//   describe('Helper Functions Validation', () => {
//     test('createFirstColumnBuffer sets correct positions', () => {
//       const buffer = createFirstColumnBuffer(5);
//       expect(buffer[0]).toBe(1);
//       expect(getColumn20Binary(buffer)).toEqual([1, 0, 0]);
//     });

//     test('extractFirstColumn reads correct value', () => {
//       const buffer = createFirstColumnBuffer(3);
//       expect(extractFirstColumn(buffer)).toBe(3);
//     });
//   });

//   describe('Regular Subtraction (No Negative One)', () => {
//     test('5 - 3 = 2 (no borrow)', () => {
//       validateBasicSubtraction(5, 3, 2, false);
//     });

//     test('8 - 6 = 2 (no borrow)', () => {
//       validateBasicSubtraction(8, 6, 2, false);
//     });

//     test('7 - 1 = 6 (no borrow)', () => {
//       validateBasicSubtraction(7, 1, 6, false);
//     });

//     test('4 - 4 = 0 (subtracting from self)', () => {
//       const bufferA = createFirstColumnBuffer(4);
//       const bufferB = createFirstColumnBuffer(4);
//       const result = DifferenceWrung(bufferA, bufferB);

//       expect(extractFirstColumn(result)).toBe(0 + 1);
//       expect(hasBorrowToSecondColumn(result)).toBe(false);
//     });
//   });

//   describe('Sign and Marquee Validation', () => {
//     test('Result sign matches minuend sign (positive)', () => {
//       const bufferA = createFirstColumnBuffer(7, true);
//       const bufferB = createFirstColumnBuffer(3, true);
//       const result = DifferenceWrung(bufferA, bufferB);

//       expect(result[0]).toBe(1);
//     });

//     test('Result sign matches minuend sign (negative)', () => {
//       const bufferA = createFirstColumnBuffer(7, false);
//       const bufferB = createFirstColumnBuffer(3, false);
//       const result = DifferenceWrung(bufferA, bufferB);

//       expect(result[0]).toBe(0);
//     });

//     test('Marquee state validation for simple subtraction', () => {
//       const buffer = createFirstColumnBuffer(5);
//       const marqueeState = BidirectionalConference(buffer);

//       expect(marqueeState.firstValidColumn).toBe(20);
//     });
//   });
// });
