// /**
//  * Comparison Operators - Comprehensive Validation Suite
//  *
//  * Tests derived and base comparison operations:
//  * - Equals (direct bit comparison)
//  * - GreaterThanOrEqual (derived: equals OR greaterThan)
//  * - LessThanOrEqual (derived: equals OR lessThan)
//  * - NotEquals (derived: NOT equals)
//  *
//  * Regular topology (Display 1-8, Columns 1-20)
//  */

// import {
//   equals,
//   greaterThanOrEqual,
//   lessThanOrEqual,
//   notEquals,
//   greaterThan,
//   lessThan
// } from '../concepts/round8/model/cases';

// describe('Comparison Operators - Regular Topology', () => {
//   /**
//    * Helper: Create 3-bit column value for regular topology
//    * Regular encoding: Display 1-8 maps to binary 000-111 (internal value - 1)
//    */
//   const createColumnValue = (display: number): Uint8Array => {
//     if (display < 1 || display > 8) {
//       throw new Error(`Display value must be 1-8, got ${display}`);
//     }

//     const internalValue = display - 1; // Display 1 = 000, Display 8 = 111
//     const column = new Uint8Array(3);

//     column[0] = (internalValue >> 2) & 1; // bit2
//     column[1] = (internalValue >> 1) & 1; // bit1
//     column[2] = internalValue & 1;        // bit0

//     return column;
//   };

//   describe('Equals (==) - Direct Bit Comparison', () => {
//     test('All displays equal to themselves', () => {
//       for (let display = 1; display <= 8; display++) {
//         const columnX = createColumnValue(display);
//         const columnY = createColumnValue(display);
//         const result = equals(columnX, columnY);
//         expect(result).toBe(1); // True: X == X
//       }
//     });

//     test('5 == 5 returns True (1)', () => {
//       const columnX = createColumnValue(5);
//       const columnY = createColumnValue(5);
//       expect(equals(columnX, columnY)).toBe(1);
//     });

//     test('3 == 7 returns False (0)', () => {
//       const columnX = createColumnValue(3);
//       const columnY = createColumnValue(7);
//       expect(equals(columnX, columnY)).toBe(0);
//     });

//     test('1 == 8 returns False (0)', () => {
//       const columnX = createColumnValue(1);
//       const columnY = createColumnValue(8);
//       expect(equals(columnX, columnY)).toBe(0);
//     });

//     test('Commutative property: equals(X,Y) === equals(Y,X)', () => {
//       for (let displayX = 1; displayX <= 8; displayX++) {
//         for (let displayY = 1; displayY <= 8; displayY++) {
//           const columnX = createColumnValue(displayX);
//           const columnY = createColumnValue(displayY);
//           const forward = equals(columnX, columnY);
//           const reverse = equals(columnY, columnX);
//           expect(forward).toBe(reverse);
//         }
//       }
//     });

//     test('All non-equal displays return False', () => {
//       for (let displayX = 1; displayX <= 8; displayX++) {
//         for (let displayY = 1; displayY <= 8; displayY++) {
//           if (displayX === displayY) continue;

//           const columnX = createColumnValue(displayX);
//           const columnY = createColumnValue(displayY);
//           expect(equals(columnX, columnY)).toBe(0);
//         }
//       }
//     });
//   });

//   describe('GreaterThanOrEqual (>=) - Derived Operation', () => {
//     test('All displays >= themselves (equality case)', () => {
//       for (let display = 1; display <= 8; display++) {
//         const columnX = createColumnValue(display);
//         const columnY = createColumnValue(display);
//         const result = greaterThanOrEqual(columnX, columnY);
//         expect(result).toBe(1); // True: X >= X
//       }
//     });

//     test('5 >= 3 returns True (1) - greater case', () => {
//       const columnX = createColumnValue(5);
//       const columnY = createColumnValue(3);
//       expect(greaterThanOrEqual(columnX, columnY)).toBe(1);
//     });

//     test('5 >= 5 returns True (1) - equal case', () => {
//       const columnX = createColumnValue(5);
//       const columnY = createColumnValue(5);
//       expect(greaterThanOrEqual(columnX, columnY)).toBe(1);
//     });

//     test('3 >= 5 returns False (0)', () => {
//       const columnX = createColumnValue(3);
//       const columnY = createColumnValue(5);
//       expect(greaterThanOrEqual(columnX, columnY)).toBe(0);
//     });

//     test('8 >= 1 returns True (1) - maximum >= minimum', () => {
//       const columnX = createColumnValue(8);
//       const columnY = createColumnValue(1);
//       expect(greaterThanOrEqual(columnX, columnY)).toBe(1);
//     });

//     test('1 >= 8 returns False (0) - minimum >= maximum', () => {
//       const columnX = createColumnValue(1);
//       const columnY = createColumnValue(8);
//       expect(greaterThanOrEqual(columnX, columnY)).toBe(0);
//     });

//     test('Derivation validation: X >= Y === (X == Y OR X > Y)', () => {
//       for (let displayX = 1; displayX <= 8; displayX++) {
//         for (let displayY = 1; displayY <= 8; displayY++) {
//           const columnX = createColumnValue(displayX);
//           const columnY = createColumnValue(displayY);

//           const gteResult = greaterThanOrEqual(columnX, columnY);
//           const eqResult = equals(columnX, columnY);
//           const gtResult = greaterThan(columnX, columnY);
//           const expected = (eqResult === 1 || gtResult === 1) ? 1 : 0;

//           expect(gteResult).toBe(expected);
//         }
//       }
//     });
//   });

//   describe('LessThanOrEqual (<=) - Derived Operation', () => {
//     test('All displays <= themselves (equality case)', () => {
//       for (let display = 1; display <= 8; display++) {
//         const columnX = createColumnValue(display);
//         const columnY = createColumnValue(display);
//         const result = lessThanOrEqual(columnX, columnY);
//         expect(result).toBe(1); // True: X <= X
//       }
//     });

//     test('3 <= 5 returns True (1) - less case', () => {
//       const columnX = createColumnValue(3);
//       const columnY = createColumnValue(5);
//       expect(lessThanOrEqual(columnX, columnY)).toBe(1);
//     });

//     test('5 <= 5 returns True (1) - equal case', () => {
//       const columnX = createColumnValue(5);
//       const columnY = createColumnValue(5);
//       expect(lessThanOrEqual(columnX, columnY)).toBe(1);
//     });

//     test('5 <= 3 returns False (0)', () => {
//       const columnX = createColumnValue(5);
//       const columnY = createColumnValue(3);
//       expect(lessThanOrEqual(columnX, columnY)).toBe(0);
//     });

//     test('1 <= 8 returns True (1) - minimum <= maximum', () => {
//       const columnX = createColumnValue(1);
//       const columnY = createColumnValue(8);
//       expect(lessThanOrEqual(columnX, columnY)).toBe(1);
//     });

//     test('8 <= 1 returns False (0) - maximum <= minimum', () => {
//       const columnX = createColumnValue(8);
//       const columnY = createColumnValue(1);
//       expect(lessThanOrEqual(columnX, columnY)).toBe(0);
//     });

//     test('Derivation validation: X <= Y === (X == Y OR X < Y)', () => {
//       for (let displayX = 1; displayX <= 8; displayX++) {
//         for (let displayY = 1; displayY <= 8; displayY++) {
//           const columnX = createColumnValue(displayX);
//           const columnY = createColumnValue(displayY);

//           const lteResult = lessThanOrEqual(columnX, columnY);
//           const eqResult = equals(columnX, columnY);
//           const ltResult = lessThan(columnX, columnY);
//           const expected = (eqResult === 1 || ltResult === 1) ? 1 : 0;

//           expect(lteResult).toBe(expected);
//         }
//       }
//     });
//   });

//   describe('NotEquals (!=) - Derived Operation', () => {
//     test('All displays != themselves returns False', () => {
//       for (let display = 1; display <= 8; display++) {
//         const columnX = createColumnValue(display);
//         const columnY = createColumnValue(display);
//         const result = notEquals(columnX, columnY);
//         expect(result).toBe(0); // False: NOT(X == X)
//       }
//     });

//     test('5 != 5 returns False (0)', () => {
//       const columnX = createColumnValue(5);
//       const columnY = createColumnValue(5);
//       expect(notEquals(columnX, columnY)).toBe(0);
//     });

//     test('3 != 7 returns True (1)', () => {
//       const columnX = createColumnValue(3);
//       const columnY = createColumnValue(7);
//       expect(notEquals(columnX, columnY)).toBe(1);
//     });

//     test('1 != 8 returns True (1)', () => {
//       const columnX = createColumnValue(1);
//       const columnY = createColumnValue(8);
//       expect(notEquals(columnX, columnY)).toBe(1);
//     });

//     test('Commutative property: notEquals(X,Y) === notEquals(Y,X)', () => {
//       for (let displayX = 1; displayX <= 8; displayX++) {
//         for (let displayY = 1; displayY <= 8; displayY++) {
//           const columnX = createColumnValue(displayX);
//           const columnY = createColumnValue(displayY);
//           const forward = notEquals(columnX, columnY);
//           const reverse = notEquals(columnY, columnX);
//           expect(forward).toBe(reverse);
//         }
//       }
//     });

//     test('All non-equal displays return True', () => {
//       for (let displayX = 1; displayX <= 8; displayX++) {
//         for (let displayY = 1; displayY <= 8; displayY++) {
//           if (displayX === displayY) continue;

//           const columnX = createColumnValue(displayX);
//           const columnY = createColumnValue(displayY);
//           expect(notEquals(columnX, columnY)).toBe(1);
//         }
//       }
//     });

//     test('Derivation validation: X != Y === NOT(X == Y)', () => {
//       for (let displayX = 1; displayX <= 8; displayX++) {
//         for (let displayY = 1; displayY <= 8; displayY++) {
//           const columnX = createColumnValue(displayX);
//           const columnY = createColumnValue(displayY);

//           const neResult = notEquals(columnX, columnY);
//           const eqResult = equals(columnX, columnY);
//           const expected = eqResult === 1 ? 0 : 1;

//           expect(neResult).toBe(expected);
//         }
//       }
//     });
//   });

//   describe('Comparative Relationships', () => {
//     test('For any X,Y: exactly one of (X < Y), (X == Y), (X > Y) is true', () => {
//       for (let displayX = 1; displayX <= 8; displayX++) {
//         for (let displayY = 1; displayY <= 8; displayY++) {
//           const columnX = createColumnValue(displayX);
//           const columnY = createColumnValue(displayY);

//           const ltResult = lessThan(columnX, columnY);
//           const eqResult = equals(columnX, columnY);
//           const gtResult = greaterThan(columnX, columnY);

//           const trueCount = [ltResult, eqResult, gtResult].filter(r => r === 1).length;
//           expect(trueCount).toBe(1); // Exactly one is true
//         }
//       }
//     });

//     test('For any X,Y: (X >= Y) OR (Y >= X) is always true', () => {
//       for (let displayX = 1; displayX <= 8; displayX++) {
//         for (let displayY = 1; displayY <= 8; displayY++) {
//           const columnX = createColumnValue(displayX);
//           const columnY = createColumnValue(displayY);

//           const xGteY = greaterThanOrEqual(columnX, columnY);
//           const yGteX = greaterThanOrEqual(columnY, columnX);

//           expect(xGteY === 1 || yGteX === 1).toBe(true);
//         }
//       }
//     });

//     test('For any X,Y: (X <= Y) OR (Y <= X) is always true', () => {
//       for (let displayX = 1; displayX <= 8; displayX++) {
//         for (let displayY = 1; displayY <= 8; displayY++) {
//           const columnX = createColumnValue(displayX);
//           const columnY = createColumnValue(displayY);

//           const xLteY = lessThanOrEqual(columnX, columnY);
//           const yLteX = lessThanOrEqual(columnY, columnX);

//           expect(xLteY === 1 || yLteX === 1).toBe(true);
//         }
//       }
//     });
//   });
// });
