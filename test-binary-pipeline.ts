/**
 * Suite 7 Rose: Binary Pipeline Clinical Diagnostic
 *
 * Purpose: Trace the exact transformation from buffer → binary display
 * Focus: POSITIVE_TWIST_CASE with 000 at position 21 (Marquee shifted frame)
 */

import { round8BufferToBinaryString, round8StringToBuffer } from './src/concepts/round8/model/Round8Binary.model';

// Import the POSITIVE_TWIST_CASE buffer
const POSITIVE_TWIST_CASE = Uint8Array.from([
  1,              // Sign bit (positive)
  0, 0, 0,        // Rotation 0 (position 1): "000"
  1, 1, 1,        // Rotation 1 (position 2): "111"
  1, 1, 1,        // Rotation 2 (position 3): "111"
  1, 1, 1,        // Rotation 3 (position 4): "111"
  1, 1, 1,        // Rotation 4 (position 5): "111"
  1, 1, 1,        // Rotation 5 (position 6): "111"
  1, 1, 1,        // Rotation 6 (position 7): "111"
  1, 1, 1,        // Rotation 7 (position 8): "111"
  1, 1, 1,        // Rotation 8 (position 9): "111"
  1, 1, 1,        // Rotation 9 (position 10): "111"
  1, 1, 1,        // Rotation 10 (position 11): "111"
  1, 1, 1,        // Rotation 11 (position 12): "111"
  1, 1, 1,        // Rotation 12 (position 13): "111"
  1, 1, 1,        // Rotation 13 (position 14): "111"
  1, 1, 1,        // Rotation 14 (position 15): "111"
  1, 1, 1,        // Rotation 15 (position 16): "111"
  1, 1, 1,        // Rotation 16 (position 17): "111"
  1, 1, 1,        // Rotation 17 (position 18): "111"
  1, 1, 1,        // Rotation 18 (position 19): "111"
  1, 1, 1,        // Rotation 19 (position 20): "111"
  1, 1, 1,        // Rotation 20 (position 21): "111"
]);

console.log('\n=== Suite 7 Rose: Binary Pipeline Diagnostic ===\n');

// Step 1: Inspect buffer structure
console.log('Step 1: POSITIVE_TWIST_CASE Buffer Inspection');
console.log('-----------------------------------------------');
console.log('Sign bit (index 0):', POSITIVE_TWIST_CASE[0]);
console.log('\nRotation-by-Rotation (buffer order):');
for (let rotation = 0; rotation < 21; rotation++) {
  const startPos = 1 + (rotation * 3);
  const bit2 = POSITIVE_TWIST_CASE[startPos];
  const bit1 = POSITIVE_TWIST_CASE[startPos + 1];
  const bit0 = POSITIVE_TWIST_CASE[startPos + 2];
  const positionNumber = rotation + 1;
  console.log(
    `  Rotation ${rotation.toString().padStart(2)} (Position ${positionNumber.toString().padStart(2)}): ` +
    `bits[${startPos}-${startPos + 2}] = ${bit2}${bit1}${bit0}`
  );
}

// Step 2: Generate binary display string using current pipeline
console.log('\n\nStep 2: Binary Display String (using round8BufferToBinaryString)');
console.log('----------------------------------------------------------------');
const binaryDisplay = round8BufferToBinaryString(POSITIVE_TWIST_CASE);
console.log('Display String:', binaryDisplay);
console.log('\nParsed Display (left to right):');
const parts = binaryDisplay.split('|');
parts.forEach((part, index) => {
  if (index === 0) {
    console.log(`  Sign: ${part}`);
  } else {
    console.log(`  Display Position ${index}: ${part}`);
  }
});

// Step 3: Expected vs Actual Analysis
console.log('\n\nStep 3: Expected vs Actual (Full Twist Case)');
console.log('---------------------------------------------');
console.log('Expected for Full Twist:');
console.log('  Position 21 (Marquee shifted frame): digit "7" = 000 binary');
console.log('  Positions 1-20 (regular frame): digit "8" = 111 binary');
console.log('\nDisplay String Should Show (left to right after sign):');
console.log('  Position 21 FIRST (leftmost): 000');
console.log('  Positions 20-1 (right to left): all 111');
console.log('  Position 1 LAST (rightmost): 111');
console.log('\nActual Display String Parsing:');
console.log('  First triplet after sign:', parts[1]);
console.log('  Last triplet:', parts[parts.length - 1]);

// Step 4: Buffer Bit Position Correspondence
console.log('\n\nStep 4: Buffer Bit Position → Display Position Mapping');
console.log('-------------------------------------------------------');
console.log('Current round8BufferToBinaryString loop (BACKWARD: 20→0):');
for (let rotationIndex = 20; rotationIndex >= 0; rotationIndex--) {
  const startPos = 1 + (rotationIndex * 3);
  const displayIndex = 20 - rotationIndex + 1; // Display position (1-21)
  const bufferPosition = rotationIndex + 1;     // Position number in buffer
  console.log(
    `  Loop iteration ${20 - rotationIndex}: ` +
    `rotation ${rotationIndex} → ` +
    `buffer bits[${startPos}-${startPos + 2}] → ` +
    `display position ${displayIndex}`
  );
  if (rotationIndex === 20 || rotationIndex === 0) {
    // Show values for critical positions
    const bit2 = POSITIVE_TWIST_CASE[startPos];
    const bit1 = POSITIVE_TWIST_CASE[startPos + 1];
    const bit0 = POSITIVE_TWIST_CASE[startPos + 2];
    console.log(`    → bits = ${bit2}${bit1}${bit0}`);
  }
}

// Step 5: Hypothesis Testing
console.log('\n\nStep 5: Hypothesis - Is Buffer Definition Correct?');
console.log('---------------------------------------------------');
console.log('Question: Should POSITIVE_TWIST_CASE have 000 at rotation 20 (not rotation 0)?');
console.log('\nIf Full Twist means:');
console.log('  - Position 21: digit "7" (shifted frame) = 000 binary');
console.log('  - Positions 1-20: digit "8" (regular frame) = 111 binary');
console.log('\nThen buffer should be:');
console.log('  - Rotation 20 (position 21): 000  ← Currently shows 111');
console.log('  - Rotation 0 (position 1): 111   ← Currently shows 000');
console.log('\nBuffer Definition Issue: 000 is at wrong rotation!');

console.log('\n=== End Diagnostic ===\n');
