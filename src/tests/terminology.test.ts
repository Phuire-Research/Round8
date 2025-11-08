import {
  getRound8Case,
  Round8Cases,
  getBinaryRotation,
  getRegularBitRotation,
  getShiftedBitRotation,
  getMarqueeBitRotation,
  getRegularRotation,
  getShiftedRotation,
  getMarqueeRotation
} from '../concepts/round8/model/Round8.terminology';

describe('Round8 Terminology Proof', () => {
  test('Prove the Accuracy of Mask and Clear Operations for Non Factorized Bit Packing', () => {
    // Sanity check - verify NEGATIVE_TWIST_CASE exists
    const negativeFullTwist = getRound8Case(Round8Cases.NEGATIVE_TWIST_CASE);
    expect(negativeFullTwist).toBeDefined();
    expect(negativeFullTwist).toBe(0x7FFFFFFFFFFFFFF8n);
    console.log('Sanity Check - NEGATIVE_TWIST_CASE:', negativeFullTwist.toString(16));

    // PROOF 1: Compose functions to access the 3-bit zero range in POSITIVE_TWIST_CASE
    const positiveFullTwistCase = getRound8Case(Round8Cases.POSITIVE_TWIST_CASE);
    expect(positiveFullTwistCase).toBe(0xFFFFFFFFFFFFFFF8n);

    // POSITIVE_TWIST_CASE has last 3 bits as zeros (position 21 = bits 0-2)
    const lastThreeBits = getBinaryRotation(positiveFullTwistCase, 21);

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

    // Test Regular rotations
    console.log('Regular Rotation Values:');
    const reg1 = getRegularRotation(1);
    console.log('Position 1:', reg1, '→ Expected 0b000n (0n)');
    expect(reg1).toBe(0n);

    const reg2 = getRegularRotation(2);
    console.log('Position 2:', reg2, '→ Expected 0b001n (1n)');
    expect(reg2).toBe(1n);

    const reg5 = getRegularRotation(5);
    console.log('Position 5:', reg5, '→ Expected 0b100n (4n)');
    expect(reg5).toBe(4n);

    const reg8 = getRegularRotation(8);
    console.log('Position 8:', reg8, '→ Expected 0b111n (7n)');
    expect(reg8).toBe(7n);

    // Test Shifted rotations
    console.log('\nShifted Rotation Values:');
    const shift0 = getShiftedRotation(0);
    console.log('Position 0:', shift0, '→ Expected 0b001n (1n)');
    expect(shift0).toBe(1n);

    const shift3 = getShiftedRotation(3);
    console.log('Position 3:', shift3, '→ Expected 0b100n (4n)');
    expect(shift3).toBe(4n);

    const shift7 = getShiftedRotation(7);
    console.log('Position 7:', shift7, '→ Expected 0b000n (0n)');
    expect(shift7).toBe(0n);

    // Test Marquee rotation
    console.log('\nMarquee Rotation Value:');
    const marqueeValue = getMarqueeRotation();
    console.log('Marquee:', marqueeValue, '→ Expected 0b001n (1n)');
    expect(marqueeValue).toBe(1n);

    // PROOF 4: Verify all Special Cases are accessible
    console.log('\n=== Special Cases Validation ===');

    const zeroCase = getRound8Case(Round8Cases.ZERO_CASE);
    console.log('ZERO_CASE:', zeroCase.toString(16));
    expect(zeroCase).toBe(0n);

    const positive1Case = getRound8Case(Round8Cases.POSITIVE_1_CASE);
    console.log('POSITIVE_1_CASE:', positive1Case.toString(16));
    expect(positive1Case).toBe(0x8000000000000000n);

    const positiveTwist = getRound8Case(Round8Cases.POSITIVE_TWIST_CASE);
    console.log('POSITIVE_TWIST_CASE:', positiveTwist.toString(16));
    expect(positiveTwist).toBe(0xFFFFFFFFFFFFFFF8n);

    const negativeTwist = getRound8Case(Round8Cases.NEGATIVE_TWIST_CASE);
    console.log('NEGATIVE_TWIST_CASE:', negativeTwist.toString(16));
    expect(negativeTwist).toBe(0x7FFFFFFFFFFFFFF8n);

    const negative1Case = getRound8Case(Round8Cases.NEGATIVE_1_CASE);
    console.log('NEGATIVE_1_CASE:', negative1Case.toString(16));
    expect(negative1Case).toBe(0x7FFFFFFFFFFFFFFFn);

    const displayStore = getRound8Case(Round8Cases.DISPLAY_STORE);
    console.log('DISPLAY_STORE (raw):', displayStore.toString(16));
    expect(displayStore).toBeDefined();
    expect(displayStore & 0b111n).toBe(0n); // Bottom 3 bits should be padding zeros
    expect((displayStore >> 13n) & 0b111n).toBe(1n); // Marquee bits should be 001

    console.log('\n✓ All Round8 Terminology proofs validated - Gold found, not snake oil!');
  });
});
