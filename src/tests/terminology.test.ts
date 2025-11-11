import {
  getRound8Case,
  Round8Cases,
  extractBitTuple,
  getRegularBitRotation,
  getShiftedBitRotation,
  getMarqueeBitRotation,
  getRegularRotation,
  getShiftedRotation,
  MarqueeRotation,
  getSignBit,
  flipSignBit,
  type Positions
} from '../concepts/round8/model/terminology';

describe('Round8 Terminology Proof', () => {
  test('Prove the Accuracy of Mask and Clear Operations for Non Factorized Bit Packing', () => {
    // Sanity check - verify NEGATIVE_TWIST_CASE exists (Sign-at-Origin)
    const negativeFullTwist = getRound8Case(Round8Cases.NEGATIVE_TWIST_CASE);
    expect(negativeFullTwist).toBeDefined();
    expect(negativeFullTwist).toBe(0x0n); // Sign=0, all positions=000
    console.log('Sanity Check - NEGATIVE_TWIST_CASE:', negativeFullTwist.toString(16));

    // PROOF 1: Compose functions to access the 3-bit zero range in POSITIVE_TWIST_CASE
    const positiveFullTwistCase = getRound8Case(Round8Cases.POSITIVE_TWIST_CASE);
    expect(positiveFullTwistCase).toBe(0x1FFFFFFFFFFFFFFFn); // Sign=1, P1-P20 all 1s, P21=000

    // POSITIVE_TWIST_CASE has position 21 as zeros (bits 61-63)
    const lastThreeBits = extractBitTuple(positiveFullTwistCase, 21 as Positions);

    console.log('=== POSITIVE_TWIST_CASE Binary Proof ===');
    console.log('Full 64-bit representation:', positiveFullTwistCase.toString(2).padStart(64, '0'));
    console.log('Position 21 (last 3 bits):', lastThreeBits);

    // Validate the last 3 bits are [0, 0, 0]
    expect(lastThreeBits).toEqual([0, 0, 0]);
    expect(BigInt(`0b${lastThreeBits.join('')}`)).toBe(0n);

    // PROOF 2: Test Round8DisplayStore access functions
    console.log('\n=== Round8DisplayStore Proof ===');

    // Test Regular Display mappings
    console.log('Regular Display Tests:');
    const regular1 = getRegularBitRotation(1);
    console.log('Position 1 (Display 1):', regular1, '→ Expected [0,0,0]');
    expect(regular1).toEqual([0, 0, 0]);

    const regular2 = getRegularBitRotation(2);
    console.log('Position 2 (Display 2):', regular2, '→ Expected [0,0,1]');
    expect(regular2).toEqual([1, 0, 0]); // LSB first in tuple

    const regular5 = getRegularBitRotation(5);
    console.log('Position 5 (Display 5):', regular5, '→ Expected [1,0,0]');
    expect(regular5).toEqual([0, 0, 1]); // LSB first

    const regular8 = getRegularBitRotation(8);
    console.log('Position 8 (Display 8):', regular8, '→ Expected [1,1,1]');
    expect(regular8).toEqual([1, 1, 1]);

    // Test Shifted Display mappings
    console.log('\nShifted Display Tests:');
    const shifted0 = getShiftedBitRotation(0);
    console.log('Position 0 (Display 0):', shifted0, '→ Expected [0,0,1]');
    expect(shifted0).toEqual([1, 0, 0]); // LSB first

    const shifted1 = getShiftedBitRotation(1);
    console.log('Position 1 (Display 1):', shifted1, '→ Expected [0,1,0]');
    expect(shifted1).toEqual([0, 1, 0]);

    const shifted6 = getShiftedBitRotation(6);
    console.log('Position 6 (Display 6):', shifted6, '→ Expected [1,1,1]');
    expect(shifted6).toEqual([1, 1, 1]);

    const shifted7 = getShiftedBitRotation(7);
    console.log('Position 7 (Display 7):', shifted7, '→ Expected [0,0,0]');
    expect(shifted7).toEqual([0, 0, 0]);

    // Verify the mappings match
    const regularCheck = getRegularBitRotation(1);
    const shiftedCheck = getShiftedBitRotation(7);
    console.log('\nCross-check: Regular Display 1 [0,0,0] === Shifted Display 7 [0,0,0]?');
    expect(regularCheck).toEqual(shiftedCheck);
    expect(regularCheck).toEqual([0, 0, 0]);
    expect(shiftedCheck).toEqual([0, 0, 0]);

    // Test Marquee Display
    console.log('\n=== Marquee Display Proof ===');
    const marqueePattern = getMarqueeBitRotation();
    console.log('Marquee pattern:', marqueePattern, '→ Expected [0,0,1]');
    expect(marqueePattern).toEqual([1, 0, 0]); // LSB first, so 001 → [1,0,0]

    // PROOF 3: Test masked rotation value getters
    console.log('\n=== Masked Rotation Value Proof ===');

    // Test Regular rotations (now returning numbers, not BigInts)
    console.log('Regular Rotation Values:');
    const reg1 = getRegularRotation(1);
    console.log('Position 1:', reg1, '→ Expected 0 (byte value)');
    expect(reg1).toBe(0);

    const reg2 = getRegularRotation(2);
    console.log('Position 2:', reg2, '→ Expected 1 (byte value)');
    expect(reg2).toBe(1);

    const reg5 = getRegularRotation(5);
    console.log('Position 5:', reg5, '→ Expected 4 (byte value)');
    expect(reg5).toBe(4);

    const reg8 = getRegularRotation(8);
    console.log('Position 8:', reg8, '→ Expected 7 (byte value)');
    expect(reg8).toBe(7);

    // Test Shifted rotations (now returning numbers, not BigInts)
    console.log('\nShifted Rotation Values:');
    const shift0 = getShiftedRotation(0);
    console.log('Position 0:', shift0, '→ Expected 1 (byte value)');
    expect(shift0).toBe(1);

    const shift3 = getShiftedRotation(3);
    console.log('Position 3:', shift3, '→ Expected 4 (byte value)');
    expect(shift3).toBe(4);

    const shift7 = getShiftedRotation(7);
    console.log('Position 7:', shift7, '→ Expected 0 (byte value)');
    expect(shift7).toBe(0);

    // Test Marquee rotation (now a number constant)
    console.log('\nMarquee Rotation Value:');
    const marqueeValue = MarqueeRotation;
    console.log('Marquee:', marqueeValue, '→ Expected 1 (byte value)');
    expect(marqueeValue).toBe(1);

    // PROOF 4: Test Sign Bit Helper (Sign-at-Origin)
    console.log('\n=== Sign Bit Validation (Sign-at-Origin) ===');

    // Test POSITIVE_TWIST_CASE sign bit (bit 0 should be 1)
    const positiveTwist = getRound8Case(Round8Cases.POSITIVE_TWIST_CASE);
    const positiveSignBit = getSignBit(positiveTwist);
    console.log('POSITIVE_TWIST_CASE sign bit:', positiveSignBit, '→ Expected 1 (positive)');
    expect(positiveSignBit).toBe(1);

    // Test NEGATIVE_TWIST_CASE sign bit (bit 0 should be 0)
    const negativeTwist = getRound8Case(Round8Cases.NEGATIVE_TWIST_CASE);
    const negativeSignBit = getSignBit(negativeTwist);
    console.log('NEGATIVE_TWIST_CASE sign bit:', negativeSignBit, '→ Expected 0 (negative)');
    expect(negativeSignBit).toBe(0);

    // PROOF 5: Test flipSignBit with special cases (Sign-at-Origin)
    console.log('\n=== Flip Sign Bit Validation ===');

    // Test Standard Case: POSITIVE_TWIST_CASE → negative version
    const flippedPositiveTwist = flipSignBit(positiveTwist);
    console.log('POSITIVE_TWIST_CASE flipped:', flippedPositiveTwist.toString(16));
    expect(getSignBit(flippedPositiveTwist)).toBe(0); // Should now be negative
    expect(flippedPositiveTwist).toBe(0x1FFFFFFFFFFFFFFEn); // Sign flipped, positions unchanged

    // Test Standard Case: NEGATIVE_TWIST_CASE → positive version
    const flippedNegativeTwist = flipSignBit(negativeTwist);
    console.log('NEGATIVE_TWIST_CASE flipped:', flippedNegativeTwist.toString(16));
    expect(getSignBit(flippedNegativeTwist)).toBe(1); // Should now be positive
    expect(flippedNegativeTwist).toBe(0x1n); // 0x0 with sign bit flipped = 0x1

    // PROOF 6: Verify all Special Cases are accessible
    console.log('\n=== Special Cases Validation ===');

    const zeroCase = getRound8Case(Round8Cases.ZERO_CASE);
    console.log('ZERO_CASE:', zeroCase.toString(16));
    expect(zeroCase).toBe(0n);

    const anotherPositiveTwist = getRound8Case(Round8Cases.POSITIVE_TWIST_CASE);
    console.log('POSITIVE_TWIST_CASE:', anotherPositiveTwist.toString(16));
    expect(anotherPositiveTwist).toBe(0x1FFFFFFFFFFFFFFFn); // Sign=1, P1-P20 all 1s, P21=000

    const anotherNegativeTwist = getRound8Case(Round8Cases.NEGATIVE_TWIST_CASE);
    console.log('NEGATIVE_TWIST_CASE:', anotherNegativeTwist.toString(16));
    expect(anotherNegativeTwist).toBe(0x0n); // Sign=0, all positions=000

    console.log('\n✓ All Round8 Terminology proofs validated - Gold found, not snake oil!');
  });
});
