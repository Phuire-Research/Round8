/**
 * BidirectionalConference Validation Clinical Trial
 *
 * Comprehensive testing for Round8 zero-allocation architecture:
 * - Round8.terminology.ts: Core primitives (Sign-at-Origin, position operations)
 * - Round8.bidirectional.ts: Marquee detection (BidirectionalConference, ConferBidirectional)
 * - Round8.conference.ts: Bidirectional transformation (buffer ↔ string)
 *
 * Clinical Trial Structure (Rose Prescription):
 * - Phase 1: Special Cases (MANDATORY FIRST)
 * - Phase 2: Standard Cases
 * - Phase 3: Error Handling
 * - Phase 4: Advanced Features
 *
 * Reference: SUITE-7-ROSE-BIDIRECTIONAL-CONFERENCE-VALIDATION-CLINICAL-TRIAL.md
 */

import {
  getSignBit,
  getRotationValue,
  getRound8Case,
  Round8Cases,
  type Positions
} from '../concepts/round8/model/Round8.terminology';

import {
  BidirectionalConference,
  ConferBidirectional,
  zeroAnorOne
} from '../concepts/round8/model/Round8.bidirectional';

import {
  getWrungStringRepresentation,
  getFormattedColumnarWrungRepresentation,
  parseStringToRound8,
} from '../concepts/round8/model/Round8.conference';

/**
 * ═══════════════════════════════════════════════════════════════════════════
 * PHASE 1: SPECIAL CASES (MANDATORY FIRST)
 * ═══════════════════════════════════════════════════════════════════════════
 *
 * Why Special Cases First?
 * - Early validation of edge cases prevents cascading failures
 * - Special case handling is most complex (ZERO_CASE, NEGATIVE_1_CASE, TWIST cases)
 * - Once special cases pass, standard cases become straightforward validation
 */

describe('Phase 1: Special Cases - BidirectionalConference Validation', () => {
  test('5.4: Round-Trip Validation - All symbols', () => {
    const symbols = ['1', '2', '3', '4', '5', '6', '7', '8'];

    symbols.forEach((symbol) => {
      const buffer = parseStringToRound8(symbol);
      if (buffer) {
        const output = getWrungStringRepresentation(buffer);
        expect(output).toBe(symbol);
      }
    });
  });
  test('3.2: BidirectionalConference - Final Twist detection', () => {
    const buffer = getRound8Case(Round8Cases.POSITIVE_TWIST_CASE);
    const marqueeState = BidirectionalConference(buffer);

    expect(marqueeState.isFinalTwist).toBe(true);
    expect(marqueeState.firstValidRotation).toBe(21);
    // Position 21 = 000, all others = 111 (Final Twist definition)
  });
  test('6.2: Marquee at Position 3 - 2nd Column Activation Rule', () => {
    const buffer = parseStringToRound8('88')!;
    const marqueeState = BidirectionalConference(buffer);

    expect(marqueeState.firstValidRotation).toBe(2);
    // Marquee implicitly at Position 3 (next upward)
  });
});
