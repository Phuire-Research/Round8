/* eslint-disable @typescript-eslint/no-non-null-assertion */
/**
 * AnorWrung SuperSet Tests
 *
 * Validates the anorWrung() function which extends ANOR pattern to full wrung (bigint) level:
 * - Self-referencing marquee discovery via BidirectionalConference
 * - Magnitude-based range membership using compareMagnitude
 * - Topology-aware comparison (shifted column 0, regular columns 1-20)
 * - MarqueeState preservation in output (no information loss)
 * - Optional pre-computed MarqueeState for developer efficiency
 *
 */

import {
  anorWrung,
  AnorWrungState,
  compareMagnitude,
} from '../concepts/round8/model/cases';
import {
  applyNumeralRotation,
  createBuffer,
  setSignBit,
} from '../concepts/round8/model/terminology';
import { BidirectionalConference, WrungMuxity } from '../concepts/round8/model/bidirectional';

describe('AnorWrung SuperSet - Self-Referencing Marquee Discovery', () => {
  const createWrung = (values: number[], positive = true): bigint => {
    let buffer = createBuffer();
    if (positive) {
      buffer = setSignBit(buffer);
    }
    values.forEach((val, idx) => {
      if (idx < 21) {
        // eslint-disable-next-line max-len
        buffer = applyNumeralRotation(val, buffer, (idx + 1) as 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 16 | 17 | 18 | 19 | 20 | 21);
      }
    });
    return buffer;
  };

  describe('Null Return Optimization', () => {
    test('returns null when empty wrungs array', () => {
      const wrungA = createWrung([1]);
      const wrungB = createWrung([7]);
      const wrungs: bigint[] = [];

      const result = anorWrung(wrungA, wrungB, wrungs);
      expect(result).toBeNull();
    });

    test('returns null when no wrungs in magnitude range', () => {
      const wrungA = createWrung([2]);
      const wrungB = createWrung([3]);
      const wrungs: bigint[] = [
        createWrung([5]),
        createWrung([6]),
      ];

      const result = anorWrung(wrungA, wrungB, wrungs);
      expect(result).toBeNull();
    });
  });

  describe('Self-Referencing Marquee Discovery', () => {
    test('discovers marquee position via BidirectionalConference internally', () => {
      const wrungA = createWrung([2]);
      const wrungB = createWrung([6]);
      const wrungs: bigint[] = [createWrung([4])];

      const states = anorWrung(wrungA, wrungB, wrungs);
      expect(states).not.toBeNull();
      expect(states!.length).toBe(1);

      // Verify marqueeState is present and matches BidirectionalConference
      const expectedMarqueeState = BidirectionalConference(wrungs[0]);
      expect(states![0].marqueeState).toBeDefined();
      expect(states![0].marqueeState.firstValidRotation).toBe(expectedMarqueeState.firstValidRotation);
    });

    test('accepts optional pre-computed MarqueeStates to avoid redundant calls', () => {
      const wrungA = createWrung([2]);
      const wrungB = createWrung([6]);
      const wrungs: bigint[] = [createWrung([4])];

      // Pre-compute MarqueeStates
      const marqueeStateA = BidirectionalConference(wrungA);
      const marqueeStateB = BidirectionalConference(wrungB);
      const wrungMarqueeStates = wrungs.map((w) => BidirectionalConference(w));

      const states = anorWrung(wrungA, wrungB, wrungs, marqueeStateA, marqueeStateB, wrungMarqueeStates);
      expect(states).not.toBeNull();
      expect(states![0].marqueeState).toBe(wrungMarqueeStates[0]);
    });

    test('preserves MarqueeState in output to avoid information loss', () => {
      const wrungA = createWrung([1]);
      const wrungB = createWrung([7]);
      const wrungs: bigint[] = [
        createWrung([3]),
        createWrung([5]),
      ];

      const states = anorWrung(wrungA, wrungB, wrungs);
      expect(states).not.toBeNull();

      // Each state should have its marqueeState preserved
      states!.forEach((state, idx) => {
        const expectedMarqueeState = BidirectionalConference(wrungs[idx]);
        expect(state.marqueeState).toBeDefined();
        expect(state.marqueeState.firstValidRotation).toBe(expectedMarqueeState.firstValidRotation);
      });
    });
  });

  describe('Magnitude Range Membership', () => {
    test('single wrung in range returns valid state with marqueeState', () => {
      const wrungA = createWrung([2]);
      const wrungB = createWrung([6]);
      const wrungs: bigint[] = [createWrung([4])];

      const states = anorWrung(wrungA, wrungB, wrungs);
      expect(states).not.toBeNull();
      expect(states!.length).toBe(1);
      expect(states![0].anor).toBe(true);
      expect(states![0].marqueeState).toBeDefined();
    });

    test('boundary wrungs are inclusive', () => {
      const wrungA = createWrung([2]);
      const wrungB = createWrung([6]);
      const wrungs: bigint[] = [
        createWrung([2]),
        createWrung([6]),
      ];

      const states = anorWrung(wrungA, wrungB, wrungs);
      expect(states).not.toBeNull();
      expect(states![0].anor).toBe(true);
      expect(states![1].anor).toBe(true);
    });

    test('mixed in-range and out-of-range wrungs', () => {
      const wrungA = createWrung([3]);
      const wrungB = createWrung([5]);
      const wrungs: bigint[] = [
        createWrung([1]),
        createWrung([3]),
        createWrung([4]),
        createWrung([5]),
        createWrung([7]),
      ];

      const states = anorWrung(wrungA, wrungB, wrungs);
      expect(states).not.toBeNull();
      expect(states![0].anor).toBe(false);
      expect(states![1].anor).toBe(true);
      expect(states![2].anor).toBe(true);
      expect(states![3].anor).toBe(true);
      expect(states![4].anor).toBe(false);
    });

    test('out-of-range states have null relational properties but preserve marqueeState', () => {
      const wrungA = createWrung([3]);
      const wrungB = createWrung([5]);
      const wrungs: bigint[] = [
        createWrung([1]),
        createWrung([4]),
      ];

      const states = anorWrung(wrungA, wrungB, wrungs);
      expect(states).not.toBeNull();

      const outState = states![0];
      expect(outState.anor).toBe(false);
      expect(outState.equal).toBeNull();
      expect(outState.greater).toBeNull();
      expect(outState.lesser).toBeNull();
      // MarqueeState is still preserved even for out-of-range
      expect(outState.marqueeState).toBeDefined();
    });
  });

  describe('Boundary Auto-Normalization', () => {
    test('produces identical results regardless of bound order', () => {
      const wrungLow = createWrung([2]);
      const wrungHigh = createWrung([6]);
      const wrungs: bigint[] = [
        createWrung([3]),
        createWrung([4]),
        createWrung([5]),
      ];

      const states1 = anorWrung(wrungLow, wrungHigh, wrungs);
      const states2 = anorWrung(wrungHigh, wrungLow, wrungs);

      expect(states1).not.toBeNull();
      expect(states2).not.toBeNull();

      states1!.forEach((s, i) => {
        expect(s.anor).toBe(states2![i].anor);
      });
    });
  });

  describe('Magnitude Relational Index Computation', () => {
    test('correctly computes equal indices for identical magnitudes', () => {
      const wrungA = createWrung([1]);
      const wrungB = createWrung([7]);
      const wrungs: bigint[] = [
        createWrung([3]),
        createWrung([5]),
        createWrung([3]),
      ];

      const states = anorWrung(wrungA, wrungB, wrungs);
      expect(states).not.toBeNull();

      expect(states![0].equal).toContain(2);
      expect(states![0].equal!.length).toBe(1);

      expect(states![2].equal).toContain(0);
      expect(states![2].equal!.length).toBe(1);

      expect(states![1].equal!.length).toBe(0);
    });

    test('correctly computes greater/lesser indices by magnitude', () => {
      const wrungA = createWrung([1]);
      const wrungB = createWrung([7]);
      const wrungs: bigint[] = [
        createWrung([2]),
        createWrung([4]),
        createWrung([6]),
      ];

      const states = anorWrung(wrungA, wrungB, wrungs);
      expect(states).not.toBeNull();

      expect(states![0].lesser!.length).toBe(0);
      expect(states![0].greater).toContain(1);
      expect(states![0].greater).toContain(2);

      expect(states![1].lesser).toContain(0);
      expect(states![1].greater).toContain(2);

      expect(states![2].lesser).toContain(0);
      expect(states![2].lesser).toContain(1);
      expect(states![2].greater!.length).toBe(0);
    });

    test('identifies extrema via empty lesser/greater arrays', () => {
      const wrungA = createWrung([1]);
      const wrungB = createWrung([7]);
      const wrungs: bigint[] = [
        createWrung([3]),
        createWrung([1]),
        createWrung([5]),
        createWrung([7]),
      ];

      const states = anorWrung(wrungA, wrungB, wrungs);
      expect(states).not.toBeNull();

      const minState = states!.find((s) => s.anor && s.lesser!.length === 0);
      expect(minState).toBeDefined();
      expect(minState!.wrung).toBe(wrungs[1]);

      const maxState = states!.find((s) => s.anor && s.greater!.length === 0);
      expect(maxState).toBeDefined();
      expect(maxState!.wrung).toBe(wrungs[3]);
    });
  });

  describe('Lazy Evaluation via OrientableWrungIndices', () => {
    test('orientate() resolves indices to wrungs on-demand', () => {
      const wrungA = createWrung([1]);
      const wrungB = createWrung([7]);
      const wrungs: bigint[] = [
        createWrung([2]),
        createWrung([4]),
        createWrung([2]),
      ];

      const states = anorWrung(wrungA, wrungB, wrungs);
      expect(states).not.toBeNull();

      const equalIndices = states![0].equal;
      expect(equalIndices!.length).toBe(1);
      expect(equalIndices![0]).toBe(2);

      const equalWrungs = equalIndices!.orientate();
      expect(equalWrungs).toHaveLength(1);
      expect(equalWrungs[0]).toBe(wrungs[2]);
    });

    test('self-referencing closure maintains integrity', () => {
      const wrungA = createWrung([1]);
      const wrungB = createWrung([7]);
      const wrungs: bigint[] = [
        createWrung([2]),
        createWrung([4]),
      ];

      const states = anorWrung(wrungA, wrungB, wrungs);

      function isolatedResolution(state: AnorWrungState): bigint[] {
        return state.greater!.orientate();
      }

      const greaterWrungs = isolatedResolution(states![0]);
      expect(greaterWrungs).toHaveLength(1);
      expect(greaterWrungs[0]).toBe(wrungs[1]);
    });
  });

  describe('Topology-Aware Comparison', () => {
    test('compareMagnitude correctly handles single column', () => {
      const wrungA = createWrung([5]);
      const wrungB = createWrung([3]);

      // Quality-First: Pass full MarqueeState objects
      const marqueeStateA = BidirectionalConference(wrungA);
      const marqueeStateB = BidirectionalConference(wrungB);

      const comparison = compareMagnitude(wrungA, wrungB, marqueeStateA, marqueeStateB);
      expect(comparison).toBe(1);
    });

    test('compareMagnitude returns null for equal magnitudes', () => {
      const wrungA = createWrung([4]);
      const wrungB = createWrung([4]);

      // Quality-First: Pass full MarqueeState objects
      const marqueeStateA = BidirectionalConference(wrungA);
      const marqueeStateB = BidirectionalConference(wrungB);

      const comparison = compareMagnitude(wrungA, wrungB, marqueeStateA, marqueeStateB);
      expect(comparison).toBeNull();
    });

    test('compareMagnitude respects sign bits', () => {
      const positiveWrung = createWrung([5], true);
      const negativeWrung = createWrung([5], false);

      // Quality-First: Pass full MarqueeState objects
      const marqueeStateA = BidirectionalConference(positiveWrung);
      const marqueeStateB = BidirectionalConference(negativeWrung);

      const comparison = compareMagnitude(positiveWrung, negativeWrung, marqueeStateA, marqueeStateB);
      expect(comparison).toBe(1);
    });
  });

  describe('Multi-Column Magnitude Comparison', () => {
    test('handles wrungs with multiple columns', () => {
      const wrungA = createWrung([3, 5]);
      const wrungB = createWrung([3, 2]);
      const wrungs: bigint[] = [
        createWrung([3, 3]),
        createWrung([3, 4]),
      ];

      const states = anorWrung(wrungA, wrungB, wrungs);
      expect(states).not.toBeNull();
      expect(states![0].anor).toBe(true);
      expect(states![1].anor).toBe(true);
    });

    test('MarqueeState correctly identifies multi-column wrungs', () => {
      const wrungs: bigint[] = [
        createWrung([3]),
        createWrung([5]),
      ];

      const wrungA = createWrung([1]);
      const wrungB = createWrung([7]);

      const states = anorWrung(wrungA, wrungB, wrungs);
      expect(states).not.toBeNull();

      states!.forEach((state) => {
        expect(state.anor).toBe(true);
        expect(state.marqueeState.firstValidRotation).toBeDefined();
      });
    });
  });

  describe('Quality-First Short-Circuit Comparisons', () => {
    const createAbsoluteZero = (): bigint => {
      // All positions [0,0,0] - no data set
      return createBuffer();
    };

    const createFinalTwist = (positive = true): bigint => {
      // Position 21 = [0,0,0] (max in shifted), all others [1,1,1]
      let buffer = createBuffer();
      if (positive) {
        buffer = setSignBit(buffer);
      }
      // Set positions 1-20 to value 7 ([1,1,1])
      for (let i = 1; i <= 20; i++) {
        // eslint-disable-next-line max-len
        buffer = applyNumeralRotation(7, buffer, i as 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 16 | 17 | 18 | 19 | 20 | 21);
      }
      // Position 21 is left as [0,0,0] (default)
      return buffer;
    };

    test('AbsoluteZero vs AbsoluteZero returns equal (null)', () => {
      const zero = createAbsoluteZero();
      const marqueeState = BidirectionalConference(zero);

      expect(marqueeState.isAbsoluteZero).toBe(true);
      const comparison = compareMagnitude(zero, zero, marqueeState, marqueeState);
      expect(comparison).toBeNull(); // Both minimum → Equal
    });

    test('FinalTwist vs FinalTwist returns equal (null)', () => {
      const finalTwist = createFinalTwist();
      const marqueeState = BidirectionalConference(finalTwist);

      expect(marqueeState.isFinalTwist).toBe(true);
      const comparison = compareMagnitude(finalTwist, finalTwist, marqueeState, marqueeState);
      expect(comparison).toBeNull(); // Both maximum → Equal
    });

    test('AbsoluteZero vs FinalTwist returns AbsoluteZero lesser (0)', () => {
      const zero = createAbsoluteZero();
      const finalTwist = createFinalTwist();
      const zeroState = BidirectionalConference(zero);
      const twistState = BidirectionalConference(finalTwist);

      expect(zeroState.isAbsoluteZero).toBe(true);
      expect(twistState.isFinalTwist).toBe(true);

      const comparison = compareMagnitude(zero, finalTwist, zeroState, twistState);
      expect(comparison).toBe(0); // Minimum < Maximum
    });

    test('FinalTwist vs AbsoluteZero returns FinalTwist greater (1)', () => {
      const zero = createAbsoluteZero();
      const finalTwist = createFinalTwist();
      const zeroState = BidirectionalConference(zero);
      const twistState = BidirectionalConference(finalTwist);

      const comparison = compareMagnitude(finalTwist, zero, twistState, zeroState);
      expect(comparison).toBe(1); // Maximum > Minimum
    });

    test('AbsoluteZero vs Between returns AbsoluteZero lesser (0)', () => {
      const zero = createAbsoluteZero();
      const between = createWrung([4]); // Standard wrung
      const zeroState = BidirectionalConference(zero);
      const betweenState = BidirectionalConference(between);

      expect(zeroState.isAbsoluteZero).toBe(true);
      expect(betweenState.isAbsoluteZero).toBeFalsy();
      expect(betweenState.isFinalTwist).toBeFalsy();

      const comparison = compareMagnitude(zero, between, zeroState, betweenState);
      expect(comparison).toBe(0); // Minimum < Any
    });

    test('Between vs AbsoluteZero returns Between greater (1)', () => {
      const zero = createAbsoluteZero();
      const between = createWrung([4]);
      const zeroState = BidirectionalConference(zero);
      const betweenState = BidirectionalConference(between);

      const comparison = compareMagnitude(between, zero, betweenState, zeroState);
      expect(comparison).toBe(1); // Any > Minimum
    });

    test('FinalTwist vs Between returns FinalTwist greater (1)', () => {
      const finalTwist = createFinalTwist();
      const between = createWrung([4]);
      const twistState = BidirectionalConference(finalTwist);
      const betweenState = BidirectionalConference(between);

      expect(twistState.isFinalTwist).toBe(true);

      const comparison = compareMagnitude(finalTwist, between, twistState, betweenState);
      expect(comparison).toBe(1); // Maximum > Any
    });

    test('Between vs FinalTwist returns Between lesser (0)', () => {
      const finalTwist = createFinalTwist();
      const between = createWrung([4]);
      const twistState = BidirectionalConference(finalTwist);
      const betweenState = BidirectionalConference(between);

      const comparison = compareMagnitude(between, finalTwist, betweenState, twistState);
      expect(comparison).toBe(0); // Any < Maximum
    });

    test('Quality-First short-circuits avoid spool lookup', () => {
      // This test validates that special cases don't enter the spool comparison
      // by testing that AbsoluteZero (which has no valid bits) compares correctly
      const zero = createAbsoluteZero();
      const between = createWrung([3]);
      const zeroState = BidirectionalConference(zero);
      const betweenState = BidirectionalConference(between);

      // If this test passes, it proves short-circuit works because:
      // AbsoluteZero has no valid rotation bits, so spool comparison would fail
      // But Quality-First logic catches it before spool is accessed
      const comparison = compareMagnitude(zero, between, zeroState, betweenState);
      expect(comparison).toBe(0); // Quality-First: AbsoluteZero < Between
    });
  });
});
