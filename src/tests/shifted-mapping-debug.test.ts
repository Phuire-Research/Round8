/**
 * Debug the shifted numeral mapping to understand the issue
 */

import {
  NumeralStore,
  ShiftedNumeralStore,
  spooledShiftedStringNumerals
} from '../concepts/round8/model/terminology';

describe('Debug Shifted Numeral Mapping', () => {
  test('Understand shifted mapping', () => {
    console.log('\n=== Shifted Numeral Mapping ===');

    // ShiftedNumeralSeries uses these values:
    console.log('ShiftedNumeralSeries mapping:');
    console.log('  [1,0,0] (Marquee) → should be error/0');
    console.log('  [0,1,0] (Three=2) → should be symbol 1');
    console.log('  [1,1,0] (Four=3) → should be symbol 2');
    console.log('  [0,0,1] (Five=4) → should be symbol 3');
    console.log('  [1,0,1] (Six=5) → should be symbol 4');
    console.log('  [0,1,1] (Seven=6) → should be symbol 5');
    console.log('  [1,1,1] (Eight=7) → should be symbol 6');
    console.log('  [0,0,0] (One=0) → should be symbol 7');

    // Test actual spooled values
    console.log('\n=== Current spooled values ===');

    // When position 21 has binary value 001 (rotation 1), what symbol?
    console.log('Binary [1,0,0] (rotation 1) → spooled:', spooledShiftedStringNumerals[1][0][0]);
    console.log('Binary [0,1,0] (rotation 2) → spooled:', spooledShiftedStringNumerals[0][1][0]);
    console.log('Binary [1,1,0] (rotation 3) → spooled:', spooledShiftedStringNumerals[1][1][0]);
    console.log('Binary [0,0,1] (rotation 4) → spooled:', spooledShiftedStringNumerals[0][0][1]);
    console.log('Binary [1,0,1] (rotation 5) → spooled:', spooledShiftedStringNumerals[1][0][1]);
    console.log('Binary [0,1,1] (rotation 6) → spooled:', spooledShiftedStringNumerals[0][1][1]);
    console.log('Binary [0,0,0] (rotation 0) → spooled:', spooledShiftedStringNumerals[0][0][0]);

    console.log('\n=== Problem Identification ===');
    console.log('When we store rotation value 1 at position 21:');
    console.log('  Binary stored: [1,0,0]');
    console.log('  Current spool returns:', spooledShiftedStringNumerals[1][0][0]);
    console.log('  Should return: "2" (symbol 2 maps to rotation 1 in shifted)');
  });
});