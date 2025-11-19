/**
 * Trace the parser to see if position 21 is handled correctly
 */

import { r8_ } from '../concepts/round8/model/r8';

describe('Trace Parser Position 21 Handling', () => {
  test('Trace parsing of 21 ones', () => {
    console.log('\n=== PARSING "1,11,11,11,11,11,11,11,11,11,11" ===');

    // This should:
    // 1. Remove commas → "111111111111111111111"
    // 2. Reverse for processing → "111111111111111111111"
    // 3. Call handleLengthTwentyOne (length = 21)
    // 4. Apply regular rotation (0) for positions 1-20
    // 5. Apply SHIFTED rotation (1) for position 21

    const input = '1,11,11,11,11,11,11,11,11,11,11';
    const buffer = r8_.parseStringToBuffer(input);

    console.log('Input:', input);
    console.log('Buffer (raw):', buffer);

    if (buffer) {
      console.log('Buffer (hex):', `0x${buffer.toString(16)}`);
      console.log('Binary Display:', r8_.createBufferDisplay(buffer));
      console.log('Round Display:', r8_.createRoundDisplay(buffer));
      console.log('Round String:', r8_.createRoundString(buffer));

      if (buffer === 1n) {
        console.log('\n❌ PROBLEM: Buffer is 0x1 (only sign bit)');
        console.log('This means position 21 got rotation 0 instead of shifted rotation 1');
        console.log('The handleLengthTwentyOne function is NOT applying shifted mapping correctly');
      }
    }

    // What we expect:
    // - Positions 1-20: rotation 0 (binary 000)
    // - Position 21: rotation 1 (binary 001) via shifted mapping
    // - Buffer should NOT be just 0x1

    const expected21Value = 1; // Shifted: symbol '1' → rotation 1
    console.log('\nExpected position 21 rotation value:', expected21Value);
    console.log('This would make buffer distinguishable from all-zeros case');
  });

  test('Test each digit at position 21', () => {
    // Expected at position 21: Symbol '1' → Rotation 1 (shifted frame)
    // Actual before fix: Symbol '1' → Rotation 0 (used regular frame)
    // Fix: conference.ts line 325 now returns symbolValue directly
    console.log('\n=== TESTING EACH DIGIT AT POSITION 21 ===');

    for (let digit = 1; digit <= 7; digit++) {
      const input = `${digit},11,11,11,11,11,11,11,11,11,11`;
      const buffer = r8_.parseStringToBuffer(input);

      console.log(`\n--- Position 21 = '${digit}' ---`);
      console.log('Input:', input);

      if (buffer) {
        console.log('Buffer (raw):', buffer);
        console.log('Buffer (hex):', `0x${buffer.toString(16)}`);
        console.log('Binary Display:', r8_.createBufferDisplay(buffer));
        console.log('Round Display:', r8_.createRoundDisplay(buffer));
        console.log('Round String:', r8_.createRoundString(buffer));

        // Test round-trip: Input string → Buffer → Output string
        const outputString = r8_.createRoundDisplay(buffer);
        const reparsed = r8_.parseStringToBuffer(outputString);

        if (reparsed !== buffer) {
          console.log('❌ BUFFER ROUND-TRIP FAILED');
        }

        // The critical test: Does output string match input string?
        console.log('Input string:  ', input);
        console.log('Output string: ', outputString);

        if (input !== outputString) {
          console.log('❌ STRING INTERCHANGE FAILED - NOT 1-to-1');
        } else {
          console.log('✅ String interchange successful');
        }
      }
      // Expected shifted mappings:
      // Symbol '1' → rotation 1 (ShiftedNumeralStore[2] = 1)
      // Symbol '2' → rotation 2 (ShiftedNumeralStore[3] = 2)
      // Symbol '3' → rotation 3 (ShiftedNumeralStore[4] = 3)
      // ...
      // Symbol '7' → rotation 7 (ShiftedNumeralStore[8] = 7)
    }
  });
});