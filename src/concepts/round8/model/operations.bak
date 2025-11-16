/**
 * SumWrung - Columnar Long Addition using SpooledSumSeries lookup tables
 *
 * Takes two 64-position BitRotationTuple buffers and performs columnar addition
 * from right to left (column 20 → column 0), handling carries forward.
 *
 * @param wrungA - First operand buffer (64 positions)
 * @param wrungB - Second operand buffer (64 positions)
 * @returns Result buffer (64 positions)
 */
// export const SumWrung = (wrungA: BitRotationTuple<ArrayBuffer>, wrungB: BitRotationTuple<ArrayBuffer>): BitRotationTuple<ArrayBuffer> => {
//   console.log(
//     `SUMWRUNG START: wrungA[61-63]=[${wrungA[61]},${wrungA[62]},${wrungA[63]}] wrungB[61-63]=[${wrungB[61]},${wrungB[62]},${wrungB[63]}]`
//   );

//   // PHASE 1: SIGN ROUTING
//   const signA = wrungA[0] as 0 | 1;
//   const signB = wrungB[0] as 0 | 1;
//   console.log(
//     `SIGN ROUTING: signA=${signA} (${signA === 1 ? 'Positive' : 'Unsigned'}), ` +
//     `signB=${signB} (${signB === 1 ? 'Positive' : 'Unsigned'}), operation='+'`
//   );

//   // CASE 2: Both negative → normal sum, apply negative sign
//   if (signA === 0 && signB === 0) {
//     console.log('CASE 2: Both negative → negative sum (signs ignored during operation)');

//     // Create positive temps for magnitude summation
//     const tempA = new BitRotationTuple(wrungA);
//     tempA[0] = 1; // Make positive
//     const tempB = new BitRotationTuple(wrungB);
//     tempB[0] = 1; // Make positive

//     // Recursive call → hits Case 1 logic (both positive)
//     const result = SumWrung(tempA, tempB);

//     // Apply negative sign as metadata
//     result[0] = 0; // Unsigned = Negative
//     console.log('CASE 2 COMPLETE: Applied negative sign to result');

//     return result;
//   }

//   // CASE 3: (+A) + (-B) → A - B with magnitude-based sign
//   if (signA === 1 && signB === 0) {
//     console.log('CASE 3: (+A) + (-B) → Difference Spool (A - abs(B))');

//     // Create positive temps for magnitude operation
//     const tempA = new BitRotationTuple(wrungA);
//     tempA[0] = 1;
//     const tempB = new BitRotationTuple(wrungB);
//     tempB[0] = 1;

//     // Conference for marquee detection
//     const case3Conf = ConferBidirectional(tempA, tempB);

//     // Special case: both zero
//     if (case3Conf.wrungAMarquee.isAbsoluteZero && case3Conf.wrungBMarquee.isAbsoluteZero) {
//       return SPECIAL_CASE_STORE.ZERO_CASE;
//     }

//     // Create result buffer
//     const result = new BitRotationTuple(64);
//     result[0] = 1; // Temporary positive (will be corrected below)

//     // Borrow accumulator (NOT carry - this is subtraction)
//     const borrows: BitRotationTuple<ArrayBuffer>[] = [];

//     // EXACT EVEN PATH
//     if (case3Conf.exactEven) {
//       console.log(`CASE 3 EXACT EVEN: Marquees at ${case3Conf.sharedValidColumn}`);

//       for (let column = 20; column >= case3Conf.sharedValidColumn; column--) {
//         const pos = 1 + column * 3;
//         const activeSpool = column === 0 ? SpooledShiftedDifferenceSeries : SpooledDifferenceSeries;

//         // Deplete borrows into tempA
//         let intermediate = new BitRotationTuple([tempA[pos], tempA[pos + 1], tempA[pos + 2]]);
//         while (borrows.length > 0) {
//           const borrow = borrows.pop()!;
//           const borrowTuple = activeSpool[intermediate[0]][intermediate[1]][intermediate[2]][borrow[0]][borrow[1]][borrow[2]] as (
//             | BitRotationTuple
//             | number
//           )[];
//           if (borrowTuple.length === 1) {
//             intermediate = borrowTuple[0] as BitRotationTuple<ArrayBuffer>;
//           } else {
//             intermediate = borrowTuple[0] as BitRotationTuple<ArrayBuffer>;
//             const newBorrow = borrowTuple[1] as BitRotationTuple<ArrayBuffer>;
//             borrows.push(newBorrow);
//           }
//         }

//         // Subtract tempB from intermediate
//         const finalTuple = activeSpool[intermediate[0]][intermediate[1]][intermediate[2]][tempB[pos]][tempB[pos + 1]][tempB[pos + 2]] as (
//           | BitRotationTuple<ArrayBuffer>
//           | number
//         )[];
//         const finalResult = finalTuple[0] as BitRotationTuple;

//         // Write result
//         result[pos] = finalResult[0];
//         result[pos + 1] = finalResult[1];
//         result[pos + 2] = finalResult[2];

//         // Push borrow if exists
//         if (finalTuple.length === 2) {
//           const finalBorrow = finalTuple[1] as BitRotationTuple<ArrayBuffer>;
//           borrows.push(finalBorrow);
//         }
//       }
//     } else {
//       // SHIFTED PATH
//       const wrungAFirst = case3Conf.wrungAMarquee.firstValidRotation ?? 20;
//       const wrungBFirst = case3Conf.wrungBMarquee.firstValidRotation ?? 20;
//       const earlierMarquee = Math.min(wrungAFirst, wrungBFirst);
//       console.log(`CASE 3 SHIFTED: tempA first=${wrungAFirst}, tempB first=${wrungBFirst}`);

//       // SHARED ZONE (sharedValidColumn → 20)
//       for (let column = 20; column >= case3Conf.sharedValidColumn; column--) {
//         const pos = 1 + column * 3;
//         const activeSpool = column === 0 ? SpooledShiftedDifferenceSeries : SpooledDifferenceSeries;

//         // Deplete borrows
//         let intermediate = new BitRotationTuple([tempA[pos], tempA[pos + 1], tempA[pos + 2]]);
//         while (borrows.length > 0) {
//           const borrow = borrows.pop()!;
//           const borrowTuple = activeSpool[intermediate[0]][intermediate[1]][intermediate[2]][borrow[0]][borrow[1]][borrow[2]] as (
//             | BitRotationTuple
//             | number
//           )[];
//           if (borrowTuple.length === 1) {
//             intermediate = borrowTuple[0] as BitRotationTuple<ArrayBuffer>;
//           } else {
//             intermediate = borrowTuple[0] as BitRotationTuple<ArrayBuffer>;
//             const newBorrow = borrowTuple[1] as BitRotationTuple<ArrayBuffer>;
//             borrows.push(newBorrow);
//           }
//         }

//         // Subtract tempB
//         const finalTuple = activeSpool[intermediate[0]][intermediate[1]][intermediate[2]][tempB[pos]][tempB[pos + 1]][tempB[pos + 2]] as (
//           | BitRotationTuple<ArrayBuffer>
//           | number
//         )[];
//         const finalResult = finalTuple[0] as BitRotationTuple;

//         result[pos] = finalResult[0];
//         result[pos + 1] = finalResult[1];
//         result[pos + 2] = finalResult[2];

//         if (finalTuple.length === 2) {
//           const finalBorrow = finalTuple[1] as BitRotationTuple<ArrayBuffer>;
//           borrows.push(finalBorrow);
//         }
//       }

//       // EXCLUSIVE ZONE
//       if (case3Conf.sharedValidColumn > earlierMarquee) {
//         const exclusiveOperand = wrungAFirst < wrungBFirst ? tempA : tempB;
//         console.log(`CASE 3 EXCLUSIVE ZONE: columns ${case3Conf.sharedValidColumn - 1} to ${earlierMarquee}`);

//         for (let column = case3Conf.sharedValidColumn - 1; column >= earlierMarquee; column--) {
//           const pos = 1 + column * 3;
//           const activeSpool = column === 0 ? SpooledShiftedDifferenceSeries : SpooledDifferenceSeries;

//           let intermediate = new BitRotationTuple([exclusiveOperand[pos], exclusiveOperand[pos + 1], exclusiveOperand[pos + 2]]);
//           while (borrows.length > 0) {
//             const borrow = borrows.pop()!;
//             const borrowTuple = activeSpool[intermediate[0]][intermediate[1]][intermediate[2]][borrow[0]][borrow[1]][borrow[2]] as (
//               | BitRotationTuple
//               | number
//             )[];
//             // eslint-disable-next-line max-depth
//             if (borrowTuple.length === 1) {
//               intermediate = borrowTuple[0] as BitRotationTuple<ArrayBuffer>;
//             } else {
//               intermediate = borrowTuple[0] as BitRotationTuple<ArrayBuffer>;
//               const newBorrow = borrowTuple[1] as BitRotationTuple<ArrayBuffer>;
//               borrows.push(newBorrow);
//             }
//           }

//           result[pos] = intermediate[0];
//           result[pos + 1] = intermediate[1];
//           result[pos + 2] = intermediate[2];
//         }
//       }
//     }

//     // PLACEHOLDER ZONE (if borrows remain)
//     if (borrows.length > 0) {
//       console.log(`CASE 3 PLACEHOLDER: ${borrows.length} borrows remaining`);
//       const earliestColumn = Math.min(
//         case3Conf.wrungAMarquee.firstValidRotation ?? 20,
//         case3Conf.wrungBMarquee.firstValidRotation ?? 20
//       );

//       for (let column = earliestColumn - 1; column >= 0; column--) {
//         const pos = 1 + column * 3;
//         let intermediate = new BitRotationTuple([0, 0, 0]);

//         while (borrows.length > 0) {
//           const borrow = borrows.pop()!;
//           const borrowTuple = SpooledDifferenceSeries[intermediate[0]][intermediate[1]][intermediate[2]][borrow[0]][borrow[1]][borrow[2]] as (
//             | BitRotationTuple
//             | number
//           )[];
//           if (borrowTuple.length === 1) {
//             intermediate = borrowTuple[0] as BitRotationTuple<ArrayBuffer>;
//           } else {
//             intermediate = borrowTuple[0] as BitRotationTuple<ArrayBuffer>;
//             const newBorrow = borrowTuple[1] as BitRotationTuple<ArrayBuffer>;
//             borrows.push(newBorrow);
//           }
//         }

//         result[pos] = intermediate[0];
//         result[pos + 1] = intermediate[1];
//         result[pos + 2] = intermediate[2];

//         if (borrows.length === 0) {break;}
//       }
//     }

//     // Column 0 Normalization
//     const col0Binary = [result[1], result[2], result[3]];
//     const col1Binary = [result[4], result[5], result[6]];
//     const isExternalCarry = col0Binary[0] === 0 && col0Binary[1] === 0 && col0Binary[2] === 0;

//     if (isExternalCarry) {
//       const hasCarryToColumn1 = col1Binary[0] !== 0 || col1Binary[1] !== 0 || col1Binary[2] !== 0;
//       if (!hasCarryToColumn1) {
//         result[3] = 1; // Normalize to marquee
//         console.log('CASE 3: Normalized column 0 to marquee [0,0,1]');
//       }
//     }

//     // Magnitude comparison for sign determination
//     // compareMagnitude returns true if A > B, false if B >= A
//     const aGreaterThanB = compareMagnitude(
//       tempA,
//       tempB,
//       case3Conf.wrungAMarquee.firstValidRotation ?? 20,
//       case3Conf.wrungBMarquee.firstValidRotation ?? 20
//     );

//     if (!aGreaterThanB) {
//       // B >= A: Result negative
//       result[0] = 0; // Unsigned = Negative
//       console.log('CASE 3: B >= A → Result sign flips to Unsigned (negative)');
//     } else {
//       // A > B: Result positive
//       result[0] = 1;
//       console.log('CASE 3: A > B → Result sign positive');
//     }

//     return result;
//   }

//   // CASE 4: (-A) + (+B) → B - A with magnitude-based sign
//   if (signA === 0 && signB === 1) {
//     console.log('CASE 4: (-A) + (+B) → Difference Spool (B - abs(A))');

//     // Create positive temps for magnitude operation
//     const tempA = new BitRotationTuple(wrungA);
//     tempA[0] = 1;
//     const tempB = new BitRotationTuple(wrungB);
//     tempB[0] = 1;

//     // Conference for marquee detection
//     const case4Conf = ConferBidirectional(tempA, tempB);

//     // Special case: both zero
//     if (case4Conf.wrungAMarquee.isAbsoluteZero && case4Conf.wrungBMarquee.isAbsoluteZero) {
//       return SPECIAL_CASE_STORE.ZERO_CASE;
//     }

//     // Create result buffer
//     const result = new BitRotationTuple(64);
//     result[0] = 1; // Temporary positive (will be corrected below)

//     // Borrow accumulator (NOT carry - this is subtraction)
//     const borrows: BitRotationTuple<ArrayBuffer>[] = [];

//     // EXACT EVEN PATH
//     if (case4Conf.exactEven) {
//       console.log(`CASE 4 EXACT EVEN: Marquees at ${case4Conf.sharedValidColumn}`);

//       for (let column = 20; column >= case4Conf.sharedValidColumn; column--) {
//         const pos = 1 + column * 3;
//         const activeSpool = column === 0 ? SpooledShiftedDifferenceSeries : SpooledDifferenceSeries;

//         // Deplete borrows into tempB (minuend in Case 4)
//         let intermediate = new BitRotationTuple([tempB[pos], tempB[pos + 1], tempB[pos + 2]]);
//         while (borrows.length > 0) {
//           const borrow = borrows.pop()!;
//           const borrowTuple = activeSpool[intermediate[0]][intermediate[1]][intermediate[2]][borrow[0]][borrow[1]][borrow[2]] as (
//             | BitRotationTuple
//             | number
//           )[];
//           if (borrowTuple.length === 1) {
//             intermediate = borrowTuple[0] as BitRotationTuple<ArrayBuffer>;
//           } else {
//             intermediate = borrowTuple[0] as BitRotationTuple<ArrayBuffer>;
//             const newBorrow = borrowTuple[1] as BitRotationTuple<ArrayBuffer>;
//             borrows.push(newBorrow);
//           }
//         }

//         // Subtract tempA from intermediate (B - A)
//         const finalTuple = activeSpool[intermediate[0]][intermediate[1]][intermediate[2]][tempA[pos]][tempA[pos + 1]][tempA[pos + 2]] as (
//           | BitRotationTuple<ArrayBuffer>
//           | number
//         )[];
//         const finalResult = finalTuple[0] as BitRotationTuple;

//         // Write result
//         result[pos] = finalResult[0];
//         result[pos + 1] = finalResult[1];
//         result[pos + 2] = finalResult[2];

//         // Push borrow if exists
//         if (finalTuple.length === 2) {
//           const finalBorrow = finalTuple[1] as BitRotationTuple<ArrayBuffer>;
//           borrows.push(finalBorrow);
//         }
//       }
//     } else {
//       // SHIFTED PATH
//       const wrungAFirst = case4Conf.wrungAMarquee.firstValidRotation ?? 20;
//       const wrungBFirst = case4Conf.wrungBMarquee.firstValidRotation ?? 20;
//       const earlierMarquee = Math.min(wrungAFirst, wrungBFirst);
//       console.log(`CASE 4 SHIFTED: tempA first=${wrungAFirst}, tempB first=${wrungBFirst}`);

//       // SHARED ZONE (sharedValidColumn → 20)
//       for (let column = 20; column >= case4Conf.sharedValidColumn; column--) {
//         const pos = 1 + column * 3;
//         const activeSpool = column === 0 ? SpooledShiftedDifferenceSeries : SpooledDifferenceSeries;

//         // Deplete borrows into tempB
//         let intermediate = new BitRotationTuple([tempB[pos], tempB[pos + 1], tempB[pos + 2]]);
//         while (borrows.length > 0) {
//           const borrow = borrows.pop()!;
//           const borrowTuple = activeSpool[intermediate[0]][intermediate[1]][intermediate[2]][borrow[0]][borrow[1]][borrow[2]] as (
//             | BitRotationTuple
//             | number
//           )[];
//           if (borrowTuple.length === 1) {
//             intermediate = borrowTuple[0] as BitRotationTuple<ArrayBuffer>;
//           } else {
//             intermediate = borrowTuple[0] as BitRotationTuple<ArrayBuffer>;
//             const newBorrow = borrowTuple[1] as BitRotationTuple<ArrayBuffer>;
//             borrows.push(newBorrow);
//           }
//         }

//         // Subtract tempA (B - A)
//         const finalTuple = activeSpool[intermediate[0]][intermediate[1]][intermediate[2]][tempA[pos]][tempA[pos + 1]][tempA[pos + 2]] as (
//           | BitRotationTuple<ArrayBuffer>
//           | number
//         )[];
//         const finalResult = finalTuple[0] as BitRotationTuple;

//         result[pos] = finalResult[0];
//         result[pos + 1] = finalResult[1];
//         result[pos + 2] = finalResult[2];

//         if (finalTuple.length === 2) {
//           const finalBorrow = finalTuple[1] as BitRotationTuple<ArrayBuffer>;
//           borrows.push(finalBorrow);
//         }
//       }

//       // EXCLUSIVE ZONE
//       if (case4Conf.sharedValidColumn > earlierMarquee) {
//         const exclusiveOperand = wrungAFirst < wrungBFirst ? tempA : tempB;
//         console.log(`CASE 4 EXCLUSIVE ZONE: columns ${case4Conf.sharedValidColumn - 1} to ${earlierMarquee}`);

//         for (let column = case4Conf.sharedValidColumn - 1; column >= earlierMarquee; column--) {
//           const pos = 1 + column * 3;
//           const activeSpool = column === 0 ? SpooledShiftedDifferenceSeries : SpooledDifferenceSeries;

//           let intermediate = new BitRotationTuple([exclusiveOperand[pos], exclusiveOperand[pos + 1], exclusiveOperand[pos + 2]]);
//           while (borrows.length > 0) {
//             const borrow = borrows.pop()!;
//             const borrowTuple = activeSpool[intermediate[0]][intermediate[1]][intermediate[2]][borrow[0]][borrow[1]][borrow[2]] as (
//               | BitRotationTuple
//               | number
//             )[];
//             // eslint-disable-next-line max-depth
//             if (borrowTuple.length === 1) {
//               intermediate = borrowTuple[0] as BitRotationTuple<ArrayBuffer>;
//             } else {
//               intermediate = borrowTuple[0] as BitRotationTuple<ArrayBuffer>;
//               const newBorrow = borrowTuple[1] as BitRotationTuple<ArrayBuffer>;
//               borrows.push(newBorrow);
//             }
//           }

//           result[pos] = intermediate[0];
//           result[pos + 1] = intermediate[1];
//           result[pos + 2] = intermediate[2];
//         }
//       }
//     }

//     // PLACEHOLDER ZONE (if borrows remain)
//     if (borrows.length > 0) {
//       console.log(`CASE 4 PLACEHOLDER: ${borrows.length} borrows remaining`);
//       const earliestColumn = Math.min(
//         case4Conf.wrungAMarquee.firstValidRotation ?? 20,
//         case4Conf.wrungBMarquee.firstValidRotation ?? 20
//       );

//       for (let column = earliestColumn - 1; column >= 0; column--) {
//         const pos = 1 + column * 3;
//         let intermediate = new BitRotationTuple([0, 0, 0]);

//         while (borrows.length > 0) {
//           const borrow = borrows.pop()!;
//           const borrowTuple = SpooledDifferenceSeries[intermediate[0]][intermediate[1]][intermediate[2]][borrow[0]][borrow[1]][borrow[2]] as (
//             | BitRotationTuple
//             | number
//           )[];
//           if (borrowTuple.length === 1) {
//             intermediate = borrowTuple[0] as BitRotationTuple<ArrayBuffer>;
//           } else {
//             intermediate = borrowTuple[0] as BitRotationTuple<ArrayBuffer>;
//             const newBorrow = borrowTuple[1] as BitRotationTuple<ArrayBuffer>;
//             borrows.push(newBorrow);
//           }
//         }

//         result[pos] = intermediate[0];
//         result[pos + 1] = intermediate[1];
//         result[pos + 2] = intermediate[2];

//         if (borrows.length === 0) {
//           break;
//         }
//       }
//     }

//     // Column 0 Normalization
//     const col0Binary = [result[1], result[2], result[3]];
//     const col1Binary = [result[4], result[5], result[6]];
//     const isExternalCarry = col0Binary[0] === 0 && col0Binary[1] === 0 && col0Binary[2] === 0;

//     if (isExternalCarry) {
//       const hasCarryToColumn1 = col1Binary[0] !== 0 || col1Binary[1] !== 0 || col1Binary[2] !== 0;
//       if (!hasCarryToColumn1) {
//         result[3] = 1; // Normalize to marquee
//         console.log('CASE 4: Normalized column 0 to marquee [0,0,1]');
//       }
//     }

//     // Magnitude comparison for sign determination
//     // compareMagnitude returns true if first arg > second arg
//     const bGreaterThanA = compareMagnitude(
//       tempB,
//       tempA,
//       case4Conf.wrungBMarquee.firstValidRotation ?? 20,
//       case4Conf.wrungAMarquee.firstValidRotation ?? 20
//     );

//     if (bGreaterThanA) {
//       // B > A: Result positive
//       result[0] = 1; // Positive
//       console.log('CASE 4: B > A → Result Signed as Positive');
//     } else {
//       // A >= B: Result negative
//       result[0] = 0; // Unsigned = Negative
//       console.log('CASE 4: A >= B → Result negative');
//     }

//     return result;
//   }

//   // CASE 1: Both positive → existing SumWrung logic (unchanged)
//   console.log('CASE 1: Both positive → normal sum');

//   // Phase 2: Conference both operands to determine Marquee states
//   const conferredState = ConferBidirectional(wrungA, wrungB);
//   // Special case: Both absolute zero
//   if (conferredState.wrungAMarquee.isAbsoluteZero && conferredState.wrungBMarquee.isAbsoluteZero) {
//     return SPECIAL_CASE_STORE.ZERO_CASE;
//   }
//   // Create output buffer
//   const result = new BitRotationTuple(64);
//   // Copy sign from wrungA (position 0) - for now, assume same sign
//   result[0] = wrungA[0];
//   // Carry accumulator - array of BitRotationTuple[3] carries
//   const carries: BitRotationTuple<ArrayBuffer>[] = [];

//   // SPECIAL CASE: Sign = 1, No Marquee Present (all 000)
//   // Only column 20 valid, no backward propagation allowed
//   const hasMarqueeA = conferredState.wrungAMarquee.marqueeRotation !== undefined;
//   const hasMarqueeB = conferredState.wrungBMarquee.marqueeRotation !== undefined;
//   const noMarqueePresent = !hasMarqueeA && !hasMarqueeB && conferredState.sharedValidColumn === 20;
//   if (noMarqueePresent) {
//     console.log('SPECIAL CASE: No marquee, Sign=1, processing column 20');
//     // Process column 20 (index 20, positions 61-63)
//     const pos20 = 1 + 20 * 3;
//     // Add wrungA[20] + wrungB[20]
//     const finalTuple = SpooledSumSeries[wrungA[pos20]][wrungA[pos20 + 1]][wrungA[pos20 + 2]][wrungB[pos20]][wrungB[pos20 + 1]][
//       wrungB[pos20 + 2]
//     ] as (BitRotationTuple<ArrayBuffer> | number)[];
//     const finalResult = finalTuple[0] as BitRotationTuple;
//     result[pos20] = finalResult[0];
//     result[pos20 + 1] = finalResult[1];
//     result[pos20 + 2] = finalResult[2];
//     // If carry generated, SET marquee at column 19 (no addition)
//     if (finalTuple.length === 2) {
//       console.log('SPECIAL CASE: Carry generated, SETTING marquee');
//       // SET column 19 to 001 (marquee marker) - this is a SET, not an ADD
//       const pos19 = 1 + 19 * 3;
//       result[pos19] = 0;
//       result[pos19 + 1] = 0;
//       result[pos19 + 2] = 1;
//       console.log('SPECIAL CASE: Marquee SET at column 19, result at column 20');
//     }
//     return result;
//   }
//   // Phase 3: Branch based on exactEven
//   if (conferredState.exactEven) {
//     // EXACT EVEN PATH: Both marquees aligned, clean summation
//     console.log(`EXACT EVEN: Both marquees at ${conferredState.sharedValidColumn}`);
//     for (let column = 20; column >= conferredState.sharedValidColumn; column--) {
//       const pos = 1 + column * 3;
//       // FIRST WRUNG: Deplete accumulated carries into wrungA
//       let intermediate = new BitRotationTuple([wrungA[pos], wrungA[pos + 1], wrungA[pos + 2]]);
//       while (carries.length > 0) {
//         const carry = carries.pop()!;
//         const activeSpool = column === 0 ? ShiftedSpooledSumSeries : SpooledSumSeries;
//         const carryTuple = activeSpool[intermediate[0]][intermediate[1]][intermediate[2]][carry[0]][carry[1]][carry[2]] as (
//           | BitRotationTuple
//           | number
//         )[];
//         if (carryTuple.length === 1) {
//           intermediate = carryTuple[0] as BitRotationTuple<ArrayBuffer>;
//         } else {
//           intermediate = carryTuple[0] as BitRotationTuple<ArrayBuffer>;
//           const newCarry = carryTuple[1] as BitRotationTuple<ArrayBuffer>;
//           carries.push(newCarry);
//         }
//       }
//       // SECOND WRUNG: Add wrungB to intermediate
//       console.log(
//         `Column ${column}: intermediate=[${intermediate[0]},${intermediate[1]},${intermediate[2]}] wrungB=[${wrungB[pos]},${
//           wrungB[pos + 1]
//         },${wrungB[pos + 2]}]`
//       );
//       const activeSpool2 = column === 0 ? ShiftedSpooledSumSeries : SpooledSumSeries;
//       const finalTuple = activeSpool2[intermediate[0]][intermediate[1]][intermediate[2]][wrungB[pos]][wrungB[pos + 1]][wrungB[pos + 2]] as (
//         | BitRotationTuple<ArrayBuffer>
//         | number
//       )[];
//       const finalResult = finalTuple[0] as BitRotationTuple;
//       console.log(`Column ${column}: finalResult=[${finalResult[0]},${finalResult[1]},${finalResult[2]}]`);
//       // Write result
//       result[pos] = finalResult[0];
//       result[pos + 1] = finalResult[1];
//       result[pos + 2] = finalResult[2];
//       // Push carry if exists
//       if (finalTuple.length === 2) {
//         const finalCarry = finalTuple[1] as BitRotationTuple<ArrayBuffer>;
//         carries.push(finalCarry);
//       }
//     }
//   } else {
//     // SHIFTED PATH: Marquees at different positions, handle exclusive zones
//     const wrungAFirst = conferredState.wrungAMarquee.firstValidRotation ?? 20;
//     const wrungBFirst = conferredState.wrungBMarquee.firstValidRotation ?? 20;
//     const earlierMarquee = Math.min(wrungAFirst, wrungBFirst);
//     console.log(`SHIFTED: wrungA first=${wrungAFirst}, wrungB first=${wrungBFirst}, shared=${conferredState.sharedValidColumn}`);
//     // SHARED ZONE: Both operands participate (sharedValidColumn → 20)
//     for (let column = 20; column >= conferredState.sharedValidColumn; column--) {
//       const pos = 1 + column * 3;
//       // Deplete carries into wrungA
//       let intermediate = new BitRotationTuple([wrungA[pos], wrungA[pos + 1], wrungA[pos + 2]]);
//       while (carries.length > 0) {
//         const carry = carries.pop()!;
//         const activeSpool = column === 0 ? ShiftedSpooledSumSeries : SpooledSumSeries;
//         const carryTuple = activeSpool[intermediate[0]][intermediate[1]][intermediate[2]][carry[0]][carry[1]][carry[2]] as (
//           | BitRotationTuple
//           | number
//         )[];
//         if (carryTuple.length === 1) {
//           intermediate = carryTuple[0] as BitRotationTuple<ArrayBuffer>;
//         } else {
//           intermediate = carryTuple[0] as BitRotationTuple<ArrayBuffer>;
//           const newCarry = carryTuple[1] as BitRotationTuple<ArrayBuffer>;
//           carries.push(newCarry);
//         }
//       }
//       // Add wrungB
//       const activeSpool2 = column === 0 ? ShiftedSpooledSumSeries : SpooledSumSeries;
//       const finalTuple = activeSpool2[intermediate[0]][intermediate[1]][intermediate[2]][wrungB[pos]][wrungB[pos + 1]][wrungB[pos + 2]] as (
//         | BitRotationTuple<ArrayBuffer>
//         | number
//       )[];
//       const finalResult = finalTuple[0] as BitRotationTuple;
//       result[pos] = finalResult[0];
//       result[pos + 1] = finalResult[1];
//       result[pos + 2] = finalResult[2];
//       if (finalTuple.length === 2) {
//         const finalCarry = finalTuple[1] as BitRotationTuple<ArrayBuffer>;
//         carries.push(finalCarry);
//       }
//     }
//     // EXCLUSIVE ZONE: Only earlier marquee's operand participates
//     if (conferredState.sharedValidColumn > earlierMarquee) {
//       const exclusiveOperand = wrungAFirst < wrungBFirst ? wrungA : wrungB;
//       console.log(`EXCLUSIVE ZONE: columns ${conferredState.sharedValidColumn - 1} to ${earlierMarquee}`);
//       for (let column = conferredState.sharedValidColumn - 1; column >= earlierMarquee; column--) {
//         const pos = 1 + column * 3;
//         // Deplete carries into the exclusive operand
//         let intermediate = new BitRotationTuple([exclusiveOperand[pos], exclusiveOperand[pos + 1], exclusiveOperand[pos + 2]]);
//         while (carries.length > 0) {
//           const carry = carries.pop()!;
//           const activeSpool = column === 0 ? ShiftedSpooledSumSeries : SpooledSumSeries;
//           const carryTuple = activeSpool[intermediate[0]][intermediate[1]][intermediate[2]][carry[0]][carry[1]][carry[2]] as (
//             | BitRotationTuple
//             | number
//           )[];
//           if (carryTuple.length === 1) {
//             intermediate = carryTuple[0] as BitRotationTuple<ArrayBuffer>;
//           } else {
//             intermediate = carryTuple[0] as BitRotationTuple<ArrayBuffer>;
//             const newCarry = carryTuple[1] as BitRotationTuple<ArrayBuffer>;
//             carries.push(newCarry);
//           }
//         }
//         // Write result (no second operand addition in exclusive zone)
//         result[pos] = intermediate[0];
//         result[pos + 1] = intermediate[1];
//         result[pos + 2] = intermediate[2];
//       }
//     }
//   }

//   // PLACEHOLDER ZONE: Deplete remaining carries into placeholder columns
//   if (carries.length > 0) {
//     const earliestColumn = Math.min(
//       conferredState.wrungAMarquee.firstValidRotation ?? 20,
//       conferredState.wrungBMarquee.firstValidRotation ?? 20
//     );
//     console.log(`PLACEHOLDER ZONE: columns ${earliestColumn - 1} to 0, ${carries.length} carries remaining`);
//     for (let column = earliestColumn - 1; column >= 0; column--) {
//       const pos = 1 + column * 3;
//       // Start with placeholder 000
//       let intermediate = new BitRotationTuple([0, 0, 0]);
//       while (carries.length > 0) {
//         const carry = carries.pop()!;
//         const carryTuple = SpooledSumSeries[intermediate[0]][intermediate[1]][intermediate[2]][carry[0]][carry[1]][carry[2]] as (
//           | BitRotationTuple
//           | number
//         )[];
//         if (carryTuple.length === 1) {
//           intermediate = carryTuple[0] as BitRotationTuple<ArrayBuffer>;
//         } else {
//           intermediate = carryTuple[0] as BitRotationTuple<ArrayBuffer>;
//           const newCarry = carryTuple[1] as BitRotationTuple<ArrayBuffer>;
//           carries.push(newCarry);
//         }
//       }
//       // Write result
//       result[pos] = intermediate[0];
//       result[pos + 1] = intermediate[1];
//       result[pos + 2] = intermediate[2];
//       // If no more carries, we're done
//       if (carries.length === 0) {
//         break;
//       }
//     }
//   }
//   // If carries STILL remain after column 0, overflow occurred
//   if (carries.length > 0) {
//     console.log('Some Carries', carries);
//     return result[0] === 1 ?
//       SPECIAL_CASE_STORE.POSITIVE_1_CASE
//       :
//       SPECIAL_CASE_STORE.NEGATIVE_TWIST_CASE;
//   }
//   return result;
// };

// export const DifferenceWrung = (
//   wrungA: BitRotationTuple<ArrayBuffer>,
//   wrungB: BitRotationTuple<ArrayBuffer>
// ): BitRotationTuple<ArrayBuffer> => {
//   console.log(
//     'DIFFERENCEWRUNG START: ' +
//       `wrungA col0=[${wrungA[1]},${wrungA[2]},${wrungA[3]}] col20=[${wrungA[61]},${wrungA[62]},${wrungA[63]}] ` +
//       `wrungB col0=[${wrungB[1]},${wrungB[2]},${wrungB[3]}] col20=[${wrungB[61]},${wrungB[62]},${wrungB[63]}]`
//   );
//   // Phase 1: Conference both operands to determine Marquee states
//   const conferredState = ConferBidirectional(wrungA, wrungB);
//   console.log(
//     'CONFERENCE RESULT: ' +
//     `wrungAMarquee.marqueeRotation=${conferredState.wrungAMarquee.marqueeRotation}, ` +
//     `wrungBMarquee.marqueeRotation=${conferredState.wrungBMarquee.marqueeRotation}, ` +
//     `sharedValidColumn=${conferredState.sharedValidColumn}`
//   );
//   // Phase 1.5: Sign routing - Determine effective operation based on signs
//   const signA = wrungA[0] as 0 | 1;
//   const signB = wrungB[0] as 0 | 1;
//   console.log(`SIGN ROUTING: signA=${signA} (${signA === 1 ? '+' : '-'}), signB=${signB} (${signB === 1 ? '-' : '+'}), operation='-'`);

//   const routing = determineEffectiveOperation(
//     '-', // DifferenceWrung always performs subtraction
//     signA,
//     signB,
//     wrungA,
//     wrungB,
//     conferredState.wrungAMarquee.firstValidRotation ?? 20,
//     conferredState.wrungBMarquee.firstValidRotation ?? 20
//   );

//   // Log routing decision with operand information
//   const minuendName = routing.minuend === wrungA ? 'wrungA' : 'wrungB';
//   const subtrahendName = routing.subtrahend === wrungA ? 'wrungA' : 'wrungB';
//   console.log(
//     `ROUTING RESULT: effectiveOp=${routing.effectiveOp}, ` +
//     `minuend=${minuendName}, subtrahend=${subtrahendName}, ` +
//     `resultSign=${routing.resultSign} (${routing.resultSign === 1 ? '+' : '-'})`
//   );

//   // Phase 1.6: If routing to SUM, delegate to SumWrung with routing operands
//   if (routing.effectiveOp === 'sum') {
//     console.log('SIGN ROUTING: Delegating to SumWrung (subtracting negative = adding)');
//     console.log(`  minuend col0=[${routing.minuend[1]},${routing.minuend[2]},${routing.minuend[3]}]`);
//     console.log(`  subtrahend col0=[${routing.subtrahend[1]},${routing.subtrahend[2]},${routing.subtrahend[3]}]`);
//     const sumResult = SumWrung(routing.minuend, routing.subtrahend);
//     console.log(`SUMWRUNG RETURNED: col0=[${sumResult[1]},${sumResult[2]},${sumResult[3]}], col1=[${sumResult[4]},${sumResult[5]},${sumResult[6]}]`);
//     // Apply routing result sign
//     sumResult[0] = routing.resultSign;
//     console.log(`SUM DELEGATION COMPLETE: resultSign=${routing.resultSign} applied`);

//     // CRITICAL: Apply normalization before returning
//     // SumWrung can return ZERO_CASE which needs column 0 normalization
//     const col0Binary = [sumResult[1], sumResult[2], sumResult[3]];
//     const col1Binary = [sumResult[4], sumResult[5], sumResult[6]];
//     console.log(`SUM DELEGATION NORMALIZATION CHECK: col0=[${col0Binary}], col1=[${col1Binary}]`);
//     const isExternalCarry = col0Binary[0] === 0 && col0Binary[1] === 0 && col0Binary[2] === 0;

//     if (isExternalCarry) {
//       const hasCarryToColumn1 = col1Binary[0] !== 0 || col1Binary[1] !== 0 || col1Binary[2] !== 0;
//       console.log(`  isExternalCarry=true, hasCarryToColumn1=${hasCarryToColumn1}`);
//       if (!hasCarryToColumn1) {
//         console.log('SUM DELEGATION NORMALIZATION: Column 0 [0,0,0] → [0,0,1] (zero result → marquee display)');
//         sumResult[3] = 1;
//       }
//     }

//     return sumResult;
//   }

//   // Phase 1.7: For DIFFERENCE operations, use routing operands for all spool lookups
//   // routing.minuend and routing.subtrahend determine the correct operand order
//   // CRITICAL: Use routing.minuend/subtrahend for ALL spool lookups, not wrungA/wrungB
//   console.log(`SIGN ROUTING: Using DIFFERENCE spool with routing operands, will apply resultSign=${routing.resultSign} at end`);

//   // Assign routing operands to working variables for the rest of the function
//   const minuend = routing.minuend;
//   const subtrahend = routing.subtrahend;

//   // Track which operand is A vs B for negative one detection
//   const minuendIsA = (minuend === wrungA);
//   const aIsNegativeOne = conferredState.wrungAMarquee.isNegativeOne ?? false;
//   const bIsNegativeOne = conferredState.wrungBMarquee.isNegativeOne ?? false;
//   const minuendIsNegativeOne = minuendIsA ? aIsNegativeOne : bIsNegativeOne;
//   const subtrahendIsNegativeOne = minuendIsA ? bIsNegativeOne : aIsNegativeOne;

//   // Phase 2: Special case - both absolute zero
//   if (conferredState.wrungAMarquee.isAbsoluteZero && conferredState.wrungBMarquee.isAbsoluteZero) {
//     return SPECIAL_CASE_STORE.ZERO_CASE;
//   }
//   // Phase 3: Create result buffer
//   const result = new BitRotationTuple(64);
//   // Temporarily copy sign from minuend (will be replaced with routing.resultSign at end)
//   result[0] = routing.resultSign;
//   // Phase 4: Borrow accumulator - array of BitRotationTuple[3] borrows
//   const borrows: BitRotationTuple<ArrayBuffer>[] = [];

//   // Phase 6: SPECIAL CASE - No Marquee Present (Sign = 1, all 000)
//   // Only column 20 valid, no backward propagation allowed
//   const hasMarqueeA = conferredState.wrungAMarquee.marqueeRotation !== undefined;
//   const hasMarqueeB = conferredState.wrungBMarquee.marqueeRotation !== undefined;
//   const noMarqueePresent = !hasMarqueeA && !hasMarqueeB && conferredState.sharedValidColumn === 20;
//   if (noMarqueePresent) {
//     console.log('SPECIAL CASE: No marquee, processing column 20');
//     // Process column 20 (index 20, positions 61-63)
//     const pos20 = 1 + 20 * 3;
//     // SPOOL SELECTION: Negative One detection for column 20
//     let activeSpool: SpooledWrung;
//     if (minuendIsNegativeOne && !subtrahendIsNegativeOne) {
//       activeSpool = SpooledNegativeOneMinusSomeNumberSeries; // (-1) - X
//     } else if (!minuendIsNegativeOne && subtrahendIsNegativeOne) {
//       activeSpool = SpooledSomeNumberMinusNegativeOneSeries; // X - (-1)
//     } else {
//       activeSpool = SpooledDifferenceSeries; // Regular difference
//     }
//     // Subtract minuend[20] - subtrahend[20]
//     const finalTuple = activeSpool[minuend[pos20]][minuend[pos20 + 1]][minuend[pos20 + 2]][subtrahend[pos20]][subtrahend[pos20 + 1]][
//       subtrahend[pos20 + 2]
//     ] as (BitRotationTuple<ArrayBuffer> | number)[];
//     const finalResult = finalTuple[0] as BitRotationTuple;
//     result[pos20] = finalResult[0];
//     result[pos20 + 1] = finalResult[1];
//     result[pos20 + 2] = finalResult[2];
//     // If borrow generated, SET marquee at column 19 (no subtraction)
//     if (finalTuple.length === 2) {
//       console.log('SPECIAL CASE: Borrow generated, SETTING marquee');
//       // SET column 19 to 001 (marquee marker) - this is a SET, not a SUBTRACT
//       const pos19 = 1 + 19 * 3;
//       result[pos19] = 0;
//       result[pos19 + 1] = 0;
//       result[pos19 + 2] = 1;
//       console.log('SPECIAL CASE: Marquee SET at column 19, result at column 20');
//     }

//     // CRITICAL: Apply normalization before returning
//     // The "no marquee" case can return ZERO_CASE which needs column 0 normalization
//     // Check column 0 and normalize if needed
//     const col0Binary = [result[1], result[2], result[3]];
//     const col1Binary = [result[4], result[5], result[6]];
//     const isExternalCarry = col0Binary[0] === 0 && col0Binary[1] === 0 && col0Binary[2] === 0;

//     if (isExternalCarry) {
//       const hasCarryToColumn1 = col1Binary[0] !== 0 || col1Binary[1] !== 0 || col1Binary[2] !== 0;
//       if (!hasCarryToColumn1) {
//         console.log('SPECIAL CASE NORMALIZATION: Column 0 [0,0,0] → [0,0,1] (zero result → marquee display)');
//         result[3] = 1;
//       }
//     }

//     return result;
//   }
//   // Phase 7: Branch based on exactEven
//   if (conferredState.exactEven) {
//     // EXACT EVEN PATH: Both marquees aligned, clean subtraction
//     console.log(`EXACT EVEN: Both marquees at ${conferredState.sharedValidColumn}`);
//     for (let column = 20; column >= conferredState.sharedValidColumn; column--) {
//       const pos = 1 + column * 3;
//       // SPOOL SELECTION: Column 20 Negative One detection + Column 0 shifted topology
//       let activeSpool: SpooledWrung;
//       if (column === 20 && minuendIsNegativeOne && !subtrahendIsNegativeOne) {
//         activeSpool = SpooledNegativeOneMinusSomeNumberSeries; // (-1) - X
//       } else if (column === 20 && !minuendIsNegativeOne && subtrahendIsNegativeOne) {
//         activeSpool = SpooledSomeNumberMinusNegativeOneSeries; // X - (-1)
//       } else if (column === 0) {
//         activeSpool = SpooledShiftedDifferenceSeries; // Column 0 shifted topology
//       } else {
//         activeSpool = SpooledDifferenceSeries; // Regular difference
//       }
//       // FIRST WRUNG: Deplete accumulated borrows into minuend
//       let intermediate = new BitRotationTuple([minuend[pos], minuend[pos + 1], minuend[pos + 2]]);
//       while (borrows.length > 0) {
//         const borrow = borrows.pop()!;
//         const borrowTuple = activeSpool[intermediate[0]][intermediate[1]][intermediate[2]][borrow[0]][borrow[1]][borrow[2]] as (
//           | BitRotationTuple
//           | number
//         )[];
//         if (borrowTuple.length === 1) {
//           intermediate = borrowTuple[0] as BitRotationTuple<ArrayBuffer>;
//         } else {
//           intermediate = borrowTuple[0] as BitRotationTuple<ArrayBuffer>;
//           const newBorrow = borrowTuple[1] as BitRotationTuple<ArrayBuffer>;
//           borrows.push(newBorrow);
//         }
//       }
//       // SECOND WRUNG: Subtract subtrahend from intermediate
//       console.log(
//         `Column ${column}: intermediate=[${intermediate[0]},${intermediate[1]},${intermediate[2]}] ` +
//           `subtrahend=[${subtrahend[pos]},${subtrahend[pos + 1]},${subtrahend[pos + 2]}]`
//       );
//       const finalTuple = activeSpool[intermediate[0]][intermediate[1]][intermediate[2]][subtrahend[pos]][subtrahend[pos + 1]][subtrahend[pos + 2]] as ( // Same spool as First Wrung
//         | BitRotationTuple<ArrayBuffer>
//         | number
//       )[];
//       const finalResult = finalTuple[0] as BitRotationTuple;
//       console.log(`Column ${column}: finalResult=[${finalResult[0]},${finalResult[1]},${finalResult[2]}]`);
//       // Write result
//       result[pos] = finalResult[0];
//       result[pos + 1] = finalResult[1];
//       result[pos + 2] = finalResult[2];
//       // Push borrow if exists
//       if (finalTuple.length === 2) {
//         const finalBorrow = finalTuple[1] as BitRotationTuple<ArrayBuffer>;
//         borrows.push(finalBorrow);
//       }
//     }
//   } else {
//     // SHIFTED PATH: Marquees at different positions, handle exclusive zones
//     const wrungAFirst = conferredState.wrungAMarquee.firstValidRotation ?? 20;
//     const wrungBFirst = conferredState.wrungBMarquee.firstValidRotation ?? 20;
//     const earlierMarquee = Math.min(wrungAFirst, wrungBFirst);
//     console.log(`SHIFTED: wrungA first=${wrungAFirst}, wrungB first=${wrungBFirst}, shared=${conferredState.sharedValidColumn}`);
//     // SHARED ZONE: Both operands participate (sharedValidColumn → 20)
//     for (let column = 20; column >= conferredState.sharedValidColumn; column--) {
//       const pos = 1 + column * 3;
//       // SPOOL SELECTION: Column 20 Negative One detection + Column 0 shifted topology
//       let activeSpool: SpooledWrung;
//       if (column === 20 && minuendIsNegativeOne && !subtrahendIsNegativeOne) {
//         activeSpool = SpooledNegativeOneMinusSomeNumberSeries; // (-1) - X
//       } else if (column === 20 && !minuendIsNegativeOne && subtrahendIsNegativeOne) {
//         activeSpool = SpooledSomeNumberMinusNegativeOneSeries; // X - (-1)
//       } else if (column === 0) {
//         activeSpool = SpooledShiftedDifferenceSeries; // Column 0 shifted topology
//       } else {
//         activeSpool = SpooledDifferenceSeries; // Regular difference
//       }
//       // Deplete borrows into minuend
//       let intermediate = new BitRotationTuple([minuend[pos], minuend[pos + 1], minuend[pos + 2]]);
//       while (borrows.length > 0) {
//         const borrow = borrows.pop()!;
//         const borrowTuple = activeSpool[intermediate[0]][intermediate[1]][intermediate[2]][borrow[0]][borrow[1]][borrow[2]] as (
//           | BitRotationTuple
//           | number
//         )[];
//         if (borrowTuple.length === 1) {
//           intermediate = borrowTuple[0] as BitRotationTuple<ArrayBuffer>;
//         } else {
//           intermediate = borrowTuple[0] as BitRotationTuple<ArrayBuffer>;
//           const newBorrow = borrowTuple[1] as BitRotationTuple<ArrayBuffer>;
//           borrows.push(newBorrow);
//         }
//       }
//       // Subtract subtrahend
//       const finalTuple = activeSpool[intermediate[0]][intermediate[1]][intermediate[2]][subtrahend[pos]][subtrahend[pos + 1]][subtrahend[pos + 2]] as ( // Same spool as First Wrung
//         | BitRotationTuple<ArrayBuffer>
//         | number
//       )[];
//       const finalResult = finalTuple[0] as BitRotationTuple;
//       result[pos] = finalResult[0];
//       result[pos + 1] = finalResult[1];
//       result[pos + 2] = finalResult[2];
//       if (finalTuple.length === 2) {
//         const finalBorrow = finalTuple[1] as BitRotationTuple<ArrayBuffer>;
//         borrows.push(finalBorrow);
//       }
//     }
//     // EXCLUSIVE ZONE: Only earlier marquee's operand participates
//     if (conferredState.sharedValidColumn > earlierMarquee) {
//       const exclusiveOperand = wrungAFirst < wrungBFirst ? wrungA : wrungB;
//       console.log(`EXCLUSIVE ZONE: columns ${conferredState.sharedValidColumn - 1} to ${earlierMarquee}`);
//       for (let column = conferredState.sharedValidColumn - 1; column >= earlierMarquee; column--) {
//         const pos = 1 + column * 3;
//         // SPOOL SELECTION: Column 20 Negative One detection + Column 0 shifted topology
//         let activeSpool: SpooledWrung;
//         if (column === 20 && aIsNegativeOne && !bIsNegativeOne) {
//           activeSpool = SpooledNegativeOneMinusSomeNumberSeries; // (-1) - X
//         } else if (column === 20 && !aIsNegativeOne && bIsNegativeOne) {
//           activeSpool = SpooledSomeNumberMinusNegativeOneSeries; // X - (-1)
//         } else if (column === 0) {
//           activeSpool = SpooledShiftedDifferenceSeries; // Column 0 shifted topology
//         } else {
//           activeSpool = SpooledDifferenceSeries; // Regular difference
//         }
//         // Deplete borrows into the exclusive operand
//         let intermediate = new BitRotationTuple([exclusiveOperand[pos], exclusiveOperand[pos + 1], exclusiveOperand[pos + 2]]);
//         while (borrows.length > 0) {
//           const borrow = borrows.pop()!;
//           const borrowTuple = activeSpool[intermediate[0]][intermediate[1]][intermediate[2]][borrow[0]][borrow[1]][borrow[2]] as (
//             | BitRotationTuple
//             | number
//           )[];
//           if (borrowTuple.length === 1) {
//             intermediate = borrowTuple[0] as BitRotationTuple<ArrayBuffer>;
//           } else {
//             intermediate = borrowTuple[0] as BitRotationTuple<ArrayBuffer>;
//             const newBorrow = borrowTuple[1] as BitRotationTuple<ArrayBuffer>;
//             borrows.push(newBorrow);
//           }
//         }
//         // Write result (no second operand subtraction in exclusive zone)
//         result[pos] = intermediate[0];
//         result[pos + 1] = intermediate[1];
//         result[pos + 2] = intermediate[2];
//       }
//     }
//   }

//   // Phase 8: PLACEHOLDER ZONE - Deplete remaining borrows into placeholder columns
//   if (borrows.length > 0) {
//     const earliestColumn = Math.min(
//       conferredState.wrungAMarquee.firstValidRotation ?? 20,
//       conferredState.wrungBMarquee.firstValidRotation ?? 20
//     );
//     console.log(`PLACEHOLDER ZONE: columns ${earliestColumn - 1} to 0, ${borrows.length} borrows remaining`);
//     for (let column = earliestColumn - 1; column >= 0; column--) {
//       const pos = 1 + column * 3;
//       // Start with placeholder 000
//       let intermediate = new BitRotationTuple([0, 0, 0]);
//       while (borrows.length > 0) {
//         const borrow = borrows.pop()!;
//         const borrowTuple = SpooledDifferenceSeries[intermediate[0]][intermediate[1]][intermediate[2]][borrow[0]][borrow[1]][borrow[2]] as (
//           | BitRotationTuple
//           | number
//         )[];
//         if (borrowTuple.length === 1) {
//           intermediate = borrowTuple[0] as BitRotationTuple<ArrayBuffer>;
//         } else {
//           intermediate = borrowTuple[0] as BitRotationTuple<ArrayBuffer>;
//           const newBorrow = borrowTuple[1] as BitRotationTuple<ArrayBuffer>;
//           borrows.push(newBorrow);
//         }
//       }
//       // Write result
//       result[pos] = intermediate[0];
//       result[pos + 1] = intermediate[1];
//       result[pos + 2] = intermediate[2];
//       // If no more borrows, we're done
//       if (borrows.length === 0) {
//         break;
//       }
//     }
//   }
//   // If borrows STILL remain after column 0, underflow occurred
//   if (borrows.length > 0) {
//     throw new Error('DifferenceWrung underflow: borrow beyond column 0');
//   }
//   // Phase 9: Apply routing result sign (from sign routing logic)
//   result[0] = routing.resultSign;

//   // Phase 9.5: PRE-NORMALIZATION - Shifted Topology Column 0 Zero Representation
//   // When spool returns ZERO_CASE (64-bit product, greater than 3 bits input)
//   // Column 0 must be normalized to marquee [0,0,1] (Display "0"), not [0,0,0] (External Carry)
//   // Exception: Full Twist (real carry to column 1) keeps [0,0,0]
//   const col0Binary = [result[1], result[2], result[3]];
//   const col1Binary = [result[4], result[5], result[6]];

//   console.log(`NORMALIZATION CHECK: col0=[${col0Binary}], col1=[${col1Binary}]`);

//   // If column 0 shows [0,0,0] (external carry encoding)
//   const isExternalCarry = col0Binary[0] === 0 && col0Binary[1] === 0 && col0Binary[2] === 0;

//   if (isExternalCarry) {
//     // Check if column 1 is empty (no actual carry present)
//     const hasCarryToColumn1 = col1Binary[0] !== 0 || col1Binary[1] !== 0 || col1Binary[2] !== 0;

//     console.log(`  isExternalCarry=true, hasCarryToColumn1=${hasCarryToColumn1}`);

//     // If NO actual carry, normalize to marquee [0,0,1]
//     // This applies to ZERO_CASE (64-bit product from spool) and computed zeros
//     // Does NOT apply to Full Twist (real external carry to column 1)
//     if (!hasCarryToColumn1) {
//       console.log('PRE-NORMALIZATION: Column 0 [0,0,0] → [0,0,1] (zero product → marquee display)');
//       result[3] = 1; // Set bit0 to 1, creating [0,0,1] (Display "0" shifted topology)
//     }
//   }

//   // Phase 9.6: RESULT CONFERENCE - Continuous Bidirectional Method
//   // Re-conference the result buffer to discover actual marquee position after all operations
//   const resultMarquee = BidirectionalConference(result);
//   console.log(
//     `RESULT CONFERENCE: marqueeRotation=${resultMarquee.marqueeRotation}, ` +
//     `isAbsoluteZero=${resultMarquee.isAbsoluteZero}`
//   );

//   // Phase 9.7: STATE TRANSITION DETECTION (if normalization occurred)
//   // Re-conference only if we normalized - detects marquee shift
//   if (isExternalCarry && col1Binary[0] === 0 && col1Binary[1] === 0 && col1Binary[2] === 0) {
//     const postNormalizationMarquee = BidirectionalConference(result);

//     // Detect state transition with Object.is()
//     if (!Object.is(resultMarquee, postNormalizationMarquee)) {
//       console.log(
//         'MARQUEE STATE TRANSITION: Post-normalization conference detected shift'
//       );
//       // State transition detected - enables recursive shift tracking
//       // Future enhancement: return { result, marqueeState } tuple
//     }
//   }

//   console.log(`DIFFERENCEWRUNG COMPLETE: Applied routing.resultSign=${routing.resultSign}`);
//   return result;
// };
