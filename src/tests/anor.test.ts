/* eslint-disable @typescript-eslint/no-non-null-assertion */
/**
 * ANOR Core Correctness Tests
 *
 * Validates the core anor() function behavior:
 * - Null return optimization
 * - Range membership determination
 * - Relational index computation
 * - Boundary normalization
 * - Lazy evaluation via OrientableIndices
 *
 */

import {
  anor,
  AnorState,
  OrientableRotationIndices,
} from '../concepts/round8/model/cases';
import { BitRotationTuple } from '../concepts/round8/model/terminology';

describe('ANOR Core Correctness - Range Membership and Relational Analysis', () => {
  describe('Null Return Optimization', () => {
    test('returns null when empty array provided', () => {
      const lower: BitRotationTuple = [0, 0, 1]; // 1
      const upper: BitRotationTuple = [1, 1, 1]; // 7
      const rotations: BitRotationTuple[] = [];

      const result = anor(lower, upper, rotations);
      expect(result).toBeNull();
    });

    test('returns null when no rotations in range', () => {
      const lower: BitRotationTuple = [0, 1, 0]; // 2
      const upper: BitRotationTuple = [1, 1, 0]; // 3
      const rotations: BitRotationTuple[] = [
        [0, 0, 1], // 4 - out
        [1, 0, 1], // 5 - out
        [0, 1, 1], // 6 - out
      ];

      const result = anor(lower, upper, rotations);
      expect(result).toBeNull();
    });

    test('returns null when rotations below range', () => {
      const lower: BitRotationTuple = [0, 0, 1]; // 4
      const upper: BitRotationTuple = [1, 1, 1]; // 7
      const rotations: BitRotationTuple[] = [
        [1, 0, 0], // 1
        [0, 1, 0], // 2
        [1, 1, 0], // 3
      ];

      const result = anor(lower, upper, rotations);
      expect(result).toBeNull();
    });

    test('returns null when rotations above range', () => {
      const lower: BitRotationTuple = [1, 0, 0]; // 1
      const upper: BitRotationTuple = [1, 1, 0]; // 3
      const rotations: BitRotationTuple[] = [
        [0, 0, 1], // 4
        [1, 0, 1], // 5
        [0, 1, 1], // 6
      ];

      const result = anor(lower, upper, rotations);
      expect(result).toBeNull();
    });
  });

  describe('Range Membership Determination', () => {
    test('single element in range returns valid state', () => {
      const lower: BitRotationTuple = [0, 1, 0]; // 2
      const upper: BitRotationTuple = [0, 0, 1]; // 4
      const rotations: BitRotationTuple[] = [
        [1, 1, 0], // 3 - IN RANGE
      ];

      const states = anor(lower, upper, rotations);
      expect(states).not.toBeNull();
      expect(states!.length).toBe(1);
      expect(states![0].anor).toBe(true);
      expect(states![0].rotation).toEqual([1, 1, 0]);
    });

    test('boundary values are inclusive', () => {
      const lower: BitRotationTuple = [0, 1, 0]; // 2
      const upper: BitRotationTuple = [0, 0, 1]; // 4
      const rotations: BitRotationTuple[] = [
        [0, 1, 0], // 2 - LOWER BOUNDARY
        [0, 0, 1], // 4 - UPPER BOUNDARY
      ];

      const states = anor(lower, upper, rotations);
      expect(states).not.toBeNull();
      expect(states!.length).toBe(2);
      expect(states![0].anor).toBe(true);
      expect(states![1].anor).toBe(true);
    });

    test('mixed in-range and out-of-range rotations', () => {
      const lower: BitRotationTuple = [0, 1, 0]; // 2
      const upper: BitRotationTuple = [0, 0, 1]; // 4
      const rotations: BitRotationTuple[] = [
        [1, 0, 0], // 1 - OUT
        [0, 1, 0], // 2 - IN
        [1, 1, 0], // 3 - IN
        [0, 0, 1], // 4 - IN
        [1, 0, 1], // 5 - OUT
      ];

      const states = anor(lower, upper, rotations);
      expect(states).not.toBeNull();
      expect(states!.length).toBe(5);
      expect(states![0].anor).toBe(false);
      expect(states![1].anor).toBe(true);
      expect(states![2].anor).toBe(true);
      expect(states![3].anor).toBe(true);
      expect(states![4].anor).toBe(false);
    });

    test('out-of-range states have null relational properties', () => {
      const lower: BitRotationTuple = [0, 1, 0]; // 2
      const upper: BitRotationTuple = [1, 1, 0]; // 3
      const rotations: BitRotationTuple[] = [
        [1, 0, 0], // 1 - OUT
        [0, 1, 0], // 2 - IN
      ];

      const states = anor(lower, upper, rotations);
      expect(states).not.toBeNull();

      const outState = states![0];
      expect(outState.anor).toBe(false);
      expect(outState.equal).toBeNull();
      expect(outState.greater).toBeNull();
      expect(outState.lesser).toBeNull();
    });
  });

  describe('Boundary Auto-Normalization', () => {
    test('produces identical results regardless of bound order', () => {
      const rotations: BitRotationTuple[] = [
        [0, 1, 0], // 2
        [0, 0, 1], // 4
        [1, 1, 0], // 3
      ];

      const states1 = anor([0, 1, 0], [0, 0, 1], rotations);
      const states2 = anor([0, 0, 1], [0, 1, 0], rotations);

      expect(states1).not.toBeNull();
      expect(states2).not.toBeNull();

      states1!.forEach((s, i) => {
        expect(s.anor).toBe(states2![i].anor);
      });
    });

    test('handles equal bounds as single-value range', () => {
      const singleValue: BitRotationTuple = [1, 1, 0]; // 3
      const rotations: BitRotationTuple[] = [
        [0, 1, 0], // 2
        [1, 1, 0], // 3
        [0, 0, 1], // 4
      ];

      const states = anor(singleValue, singleValue, rotations);
      expect(states).not.toBeNull();
      expect(states![0].anor).toBe(false);
      expect(states![1].anor).toBe(true);
      expect(states![2].anor).toBe(false);
    });
  });

  describe('Relational Index Computation', () => {
    test('correctly computes equal indices for duplicates', () => {
      const lower: BitRotationTuple = [1, 0, 0]; // 1
      const upper: BitRotationTuple = [1, 1, 1]; // 7
      const rotations: BitRotationTuple[] = [
        [0, 1, 0], // 2 - index 0
        [0, 0, 1], // 4 - index 1
        [0, 1, 0], // 2 - index 2 (duplicate of 0)
        [0, 1, 1], // 6 - index 3
        [0, 1, 0], // 2 - index 4 (duplicate of 0, 2)
      ];

      const states = anor(lower, upper, rotations);
      expect(states).not.toBeNull();

      expect(states![0].equal).toContain(2);
      expect(states![0].equal).toContain(4);
      expect(states![0].equal!.length).toBe(2);

      expect(states![2].equal).toContain(0);
      expect(states![2].equal).toContain(4);
      expect(states![2].equal!.length).toBe(2);

      expect(states![4].equal).toContain(0);
      expect(states![4].equal).toContain(2);
      expect(states![4].equal!.length).toBe(2);

      expect(states![1].equal!.length).toBe(0);
      expect(states![3].equal!.length).toBe(0);
    });

    test('correctly computes greater/lesser indices', () => {
      const lower: BitRotationTuple = [1, 0, 0]; // 1
      const upper: BitRotationTuple = [1, 1, 1]; // 7
      const rotations: BitRotationTuple[] = [
        [0, 1, 0], // 2 - index 0
        [0, 0, 1], // 4 - index 1
        [0, 1, 1], // 6 - index 2
      ];

      const states = anor(lower, upper, rotations);
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
      const lower: BitRotationTuple = [1, 0, 0]; // 1
      const upper: BitRotationTuple = [1, 1, 1]; // 7
      const rotations: BitRotationTuple[] = [
        [1, 1, 0], // 3 - index 0
        [1, 0, 0], // 1 - index 1 (MINIMUM)
        [1, 0, 1], // 5 - index 2
        [1, 1, 1], // 7 - index 3 (MAXIMUM)
        [0, 1, 0], // 2 - index 4
      ];

      const states = anor(lower, upper, rotations);
      expect(states).not.toBeNull();

      const minState = states!.find((s) => s.anor && s.lesser!.length === 0);
      expect(minState).toBeDefined();
      expect(minState!.rotation).toEqual([1, 0, 0]);

      const maxState = states!.find((s) => s.anor && s.greater!.length === 0);
      expect(maxState).toBeDefined();
      expect(maxState!.rotation).toEqual([1, 1, 1]);
    });
  });

  describe('Lazy Evaluation via OrientableIndices', () => {
    test('orientate() resolves indices to rotations on-demand', () => {
      const lower: BitRotationTuple = [1, 0, 0];
      const upper: BitRotationTuple = [1, 1, 1];
      const rotations: BitRotationTuple[] = [
        [0, 1, 0], // index 0
        [0, 0, 1], // index 1
        [0, 1, 0], // index 2 (duplicate of 0)
      ];

      const states = anor(lower, upper, rotations);
      expect(states).not.toBeNull();

      const equalIndices = states![0].equal;
      expect(equalIndices!.length).toBe(1);
      expect(equalIndices![0]).toBe(2);

      const equalRotations = equalIndices!.orientate();
      expect(equalRotations).toHaveLength(1);
      expect(equalRotations[0]).toEqual([0, 1, 0]);
    });

    test('greater indices resolve correctly', () => {
      const lower: BitRotationTuple = [1, 0, 0];
      const upper: BitRotationTuple = [1, 1, 1];
      const rotations: BitRotationTuple[] = [
        [0, 1, 0], // 2 - index 0
        [0, 0, 1], // 4 - index 1
        [0, 1, 1], // 6 - index 2
      ];

      const states = anor(lower, upper, rotations);
      const greaterRotations = states![0].greater!.orientate();

      expect(greaterRotations).toHaveLength(2);
      expect(greaterRotations).toContainEqual([0, 0, 1]);
      expect(greaterRotations).toContainEqual([0, 1, 1]);
    });

    test('lesser indices resolve correctly', () => {
      const lower: BitRotationTuple = [1, 0, 0];
      const upper: BitRotationTuple = [1, 1, 1];
      const rotations: BitRotationTuple[] = [
        [0, 1, 0], // 2 - index 0
        [0, 0, 1], // 4 - index 1
        [0, 1, 1], // 6 - index 2
      ];

      const states = anor(lower, upper, rotations);
      const lesserRotations = states![2].lesser!.orientate();

      expect(lesserRotations).toHaveLength(2);
      expect(lesserRotations).toContainEqual([0, 1, 0]);
      expect(lesserRotations).toContainEqual([0, 0, 1]);
    });

    test('empty arrays resolve to empty arrays', () => {
      const lower: BitRotationTuple = [1, 0, 0];
      const upper: BitRotationTuple = [1, 1, 1];
      const rotations: BitRotationTuple[] = [
        [0, 0, 1], // 4 - single value
      ];

      const states = anor(lower, upper, rotations);
      expect(states).not.toBeNull();

      const equalRotations = states![0].equal!.orientate();
      const greaterRotations = states![0].greater!.orientate();
      const lesserRotations = states![0].lesser!.orientate();

      expect(equalRotations).toHaveLength(0);
      expect(greaterRotations).toHaveLength(0);
      expect(lesserRotations).toHaveLength(0);
    });

    test('self-referencing closure maintains integrity across scope boundaries', () => {
      const lower: BitRotationTuple = [1, 0, 0];
      const upper: BitRotationTuple = [1, 1, 1];
      const rotations: BitRotationTuple[] = [
        [0, 1, 0],
        [0, 0, 1],
      ];

      const states = anor(lower, upper, rotations);

      function isolatedResolution(state: AnorState): BitRotationTuple[] {
        return state.greater!.orientate();
      }

      const greaterRots = isolatedResolution(states![0]);
      expect(greaterRots).toHaveLength(1);
      expect(greaterRots[0]).toEqual([0, 0, 1]);
    });
  });

  describe('Complete Rotation Space Coverage', () => {
    test('handles all 8 rotation values (0-7)', () => {
      const lower: BitRotationTuple = [0, 0, 0]; // 0
      const upper: BitRotationTuple = [1, 1, 1]; // 7
      const rotations: BitRotationTuple[] = [
        [0, 0, 0], // 0
        [1, 0, 0], // 1
        [0, 1, 0], // 2
        [1, 1, 0], // 3
        [0, 0, 1], // 4
        [1, 0, 1], // 5
        [0, 1, 1], // 6
        [1, 1, 1], // 7
      ];

      const states = anor(lower, upper, rotations);
      expect(states).not.toBeNull();
      expect(states!.length).toBe(8);

      states!.forEach((state) => {
        expect(state.anor).toBe(true);
      });

      expect(states![0].lesser!.length).toBe(0);
      expect(states![0].greater!.length).toBe(7);

      expect(states![7].greater!.length).toBe(0);
      expect(states![7].lesser!.length).toBe(7);
    });
  });
});
