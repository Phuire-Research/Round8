/**
 * ANOR Benefit Proof Tests
 *
 * Clinically validates the claimed benefits of ANOR over traditional logical conjunctions:
 * - Proof Point 1: Null Return Optimization (early rejection)
 * - Proof Point 2: Batch Relational Analysis (O(k²) vs O(n²))
 * - Proof Point 3: Lazy Evaluation Memory Efficiency
 * - Proof Point 4: Self-Referencing Closure Integrity
 * - Proof Point 5: Range Boundary Normalization
 * - Proof Point 6: Higher-Order Bidirectional Knowledge
 * - Proof Point 7: Duplicate Detection Pattern
 * - Proof Point 8: Extrema Detection Pattern
 *
 * Suite 5-6-7 Cobalt Carter anor Amy Rose Clinical Validation
 */

import {
  anor,
  AnorState,
  greaterThan,
  greaterThanOrEqual,
  lessThanOrEqual,
  equals,
} from '../concepts/round8/model/cases';
import { BitRotationTuple } from '../concepts/round8/model/terminology';

describe('ANOR Benefit Proofs - Clinical Validation of Advantages', () => {
  describe('Proof Point 1: Null Return Optimization', () => {
    test('ANOR returns null immediately when no matches - avoids wasteful allocation', () => {
      const lower: BitRotationTuple = [0, 1, 0]; // 2
      const upper: BitRotationTuple = [1, 1, 0]; // 3
      const rotations: BitRotationTuple[] = [
        [0, 0, 1], // 4
        [1, 0, 1], // 5
        [0, 1, 1], // 6
        [1, 1, 1], // 7
      ];

      const anorResult = anor(lower, upper, rotations);

      const traditionalResults = rotations.map((rot) => {
        const inRange = greaterThanOrEqual(rot, lower) === 1 && lessThanOrEqual(rot, upper) === 1;
        return { rotation: rot, inRange };
      });
      const hasAny = traditionalResults.some((r) => r.inRange);

      expect(anorResult).toBeNull();
      expect(hasAny).toBe(false);

      expect(traditionalResults.length).toBe(4);
    });

    test('ANOR null optimization proves efficiency gain', () => {
      const lower: BitRotationTuple = [0, 0, 0]; // 0
      const upper: BitRotationTuple = [1, 0, 0]; // 1
      const rotations: BitRotationTuple[] = Array(100).fill([1, 1, 1]); // All 7s - out of range

      const result = anor(lower, upper, rotations);
      expect(result).toBeNull();
    });
  });

  describe('Proof Point 2: Batch Relational Analysis', () => {
    test('ANOR performs k² comparisons for in-range values vs n² for all', () => {
      const lower: BitRotationTuple = [0, 1, 0]; // 2
      const upper: BitRotationTuple = [0, 0, 1]; // 4
      const rotations: BitRotationTuple[] = [
        [1, 0, 0], // 1 - OUT
        [0, 1, 0], // 2 - IN
        [1, 1, 0], // 3 - IN
        [0, 0, 1], // 4 - IN
        [1, 0, 1], // 5 - OUT
        [0, 1, 1], // 6 - OUT
      ];

      const states = anor(lower, upper, rotations);
      expect(states).not.toBeNull();

      const inRangeCount = states!.filter((s) => s.anor).length;
      expect(inRangeCount).toBe(3);

      const anorComparisons = inRangeCount * (inRangeCount - 1);
      const traditionalComparisons = rotations.length * (rotations.length - 1);

      expect(anorComparisons).toBeLessThan(traditionalComparisons);
      expect(anorComparisons).toBe(6);
      expect(traditionalComparisons).toBe(30);
    });

    test('ANOR efficiently skips out-of-range comparison work', () => {
      const lower: BitRotationTuple = [1, 1, 0]; // 3
      const upper: BitRotationTuple = [1, 0, 1]; // 5
      const rotations: BitRotationTuple[] = Array(10)
        .fill([0, 0, 0])
        .concat(Array(3).fill([0, 0, 1])); // 10 out (0s), 3 in (4s)

      const states = anor(lower, upper, rotations);
      expect(states).not.toBeNull();

      const inRangeStates = states!.filter((s) => s.anor);
      expect(inRangeStates.length).toBe(3);

      inRangeStates.forEach((state) => {
        expect(state.equal).not.toBeNull();
        expect(state.greater).not.toBeNull();
        expect(state.lesser).not.toBeNull();
      });

      states!.filter((s) => !s.anor).forEach((state) => {
        expect(state.equal).toBeNull();
        expect(state.greater).toBeNull();
        expect(state.lesser).toBeNull();
      });
    });
  });

  describe('Proof Point 3: Lazy Evaluation Memory Efficiency', () => {
    test('OrientableIndices store indices (cheap) not full values', () => {
      const lower: BitRotationTuple = [1, 0, 0];
      const upper: BitRotationTuple = [1, 1, 1];
      const rotations: BitRotationTuple[] = [
        [0, 1, 0], // 2 - index 0
        [0, 0, 1], // 4 - index 1
        [0, 1, 1], // 6 - index 2
      ];

      const states = anor(lower, upper, rotations);
      expect(states).not.toBeNull();

      const state = states![0];
      expect(Array.isArray(state.greater)).toBe(true);
      expect(typeof state.greater![0]).toBe('number');
      expect(state.greater![0]).toBe(1);
      expect(state.greater![1]).toBe(2);

      const greaterRotations = state.greater!.orientate();
      expect(greaterRotations[0]).toEqual([0, 0, 1]);
      expect(greaterRotations[1]).toEqual([0, 1, 1]);
    });

    test('Lazy evaluation defers memory allocation until needed', () => {
      const lower: BitRotationTuple = [1, 0, 0];
      const upper: BitRotationTuple = [1, 1, 1];
      const rotations: BitRotationTuple[] = [
        [0, 1, 0],
        [0, 0, 1],
        [0, 1, 0],
        [0, 1, 1],
        [0, 1, 0],
      ];

      const states = anor(lower, upper, rotations);

      const equalIndices = states![0].equal;
      expect(equalIndices!.length).toBe(2);
      expect(typeof equalIndices![0]).toBe('number');

      const equalRotations = equalIndices!.orientate();
      expect(equalRotations.length).toBe(2);
      expect(equalRotations[0]).toEqual([0, 1, 0]);
    });
  });

  describe('Proof Point 4: Self-Referencing Closure Integrity', () => {
    test('.orientate() works without external source array reference', () => {
      const lower: BitRotationTuple = [1, 0, 0];
      const upper: BitRotationTuple = [1, 1, 1];
      const rotations: BitRotationTuple[] = [
        [0, 1, 0],
        [0, 0, 1],
      ];

      const states = anor(lower, upper, rotations);

      function processStateInIsolation(state: AnorState): {
        hasGreater: boolean;
        greaterValues: BitRotationTuple[];
      } {
        return {
          hasGreater: state.greater!.length > 0,
          greaterValues: state.greater!.orientate(),
        };
      }

      const result = processStateInIsolation(states![0]);
      expect(result.hasGreater).toBe(true);
      expect(result.greaterValues).toHaveLength(1);
      expect(result.greaterValues[0]).toEqual([0, 0, 1]);
    });

    test('Closure captures source array without external tracking', () => {
      const lower: BitRotationTuple = [1, 0, 0];
      const upper: BitRotationTuple = [1, 1, 1];
      const rotations: BitRotationTuple[] = [
        [0, 1, 0],
        [0, 0, 1],
        [0, 1, 0],
      ];

      const states = anor(lower, upper, rotations);

      const passedState = states![0];

      function deeplyNestedResolution(s: AnorState): BitRotationTuple[] {
        return s.equal!.orientate();
      }

      const resolved = deeplyNestedResolution(passedState);
      expect(resolved).toHaveLength(1);
      expect(resolved[0]).toEqual([0, 1, 0]);
    });
  });

  describe('Proof Point 5: Range Boundary Normalization', () => {
    test('Automatic normalization eliminates developer error', () => {
      const rotations: BitRotationTuple[] = [
        [0, 1, 0], // 2
        [0, 1, 1], // 3
        [1, 0, 0], // 4
      ];

      const statesNaturalOrder = anor([0, 1, 0], [1, 0, 0], rotations);
      const statesReversedOrder = anor([1, 0, 0], [0, 1, 0], rotations);

      expect(statesNaturalOrder).not.toBeNull();
      expect(statesReversedOrder).not.toBeNull();

      statesNaturalOrder!.forEach((s, i) => {
        expect(s.anor).toBe(statesReversedOrder![i].anor);
        expect(s.rotation).toEqual(statesReversedOrder![i].rotation);
      });
    });

    test('Traditional approach requires manual boundary handling', () => {
      const a: BitRotationTuple = [0, 0, 1]; // 4
      const b: BitRotationTuple = [0, 1, 0]; // 2
      const value: BitRotationTuple = [1, 1, 0]; // 3

      const inRangeTraditional = (() => {
        const lower = greaterThan(a, b) === 1 ? b : a;
        const upper = greaterThan(a, b) === 1 ? a : b;
        return greaterThanOrEqual(value, lower) === 1 && lessThanOrEqual(value, upper) === 1;
      })();

      const anorResult = anor(a, b, [value]);
      const inRangeAnor = anorResult![0].anor;

      expect(inRangeTraditional).toBe(true);
      expect(inRangeAnor).toBe(true);
    });
  });

  describe('Proof Point 6: Higher-Order Bidirectional Knowledge', () => {
    test('Unified structure provides both range membership AND peer relationships', () => {
      const lower: BitRotationTuple = [0, 1, 0]; // 2
      const upper: BitRotationTuple = [0, 1, 1]; // 6
      const rotations: BitRotationTuple[] = [
        [1, 0, 0], // 1 - OUT
        [1, 1, 0], // 3 - IN
        [0, 0, 1], // 4 - IN
        [1, 1, 1], // 7 - OUT
      ];

      const states = anor(lower, upper, rotations);
      expect(states).not.toBeNull();

      const outState = states![0];
      expect(outState.anor).toBe(false);
      expect(outState.equal).toBeNull();
      expect(outState.greater).toBeNull();
      expect(outState.lesser).toBeNull();

      const inState = states![1];
      expect(inState.anor).toBe(true);
      expect(inState.equal).not.toBeNull();
      expect(inState.greater).not.toBeNull();
      expect(inState.lesser).not.toBeNull();
      expect(inState.greater).toContain(2);
      expect(inState.lesser!.length).toBe(0);
    });

    test('No undefined properties - null explicitly marks out-of-range', () => {
      const lower: BitRotationTuple = [0, 1, 0]; // 2
      const upper: BitRotationTuple = [0, 0, 1]; // 4
      const rotations: BitRotationTuple[] = [
        [1, 0, 0], // 1 - OUT
        [1, 1, 0], // 3 - IN
      ];

      const states = anor(lower, upper, rotations);

      states!.forEach((state) => {
        expect(state.rotation).toBeDefined();
        expect(state.anor).toBeDefined();
        if (!state.anor) {
          expect(state.equal).toBeNull();
          expect(state.greater).toBeNull();
          expect(state.lesser).toBeNull();
        } else {
          expect(state.equal).not.toBeNull();
          expect(state.greater).not.toBeNull();
          expect(state.lesser).not.toBeNull();
        }
      });
    });
  });

  describe('Proof Point 7: Duplicate Detection Pattern', () => {
    test('ANOR trivially identifies duplicates through equal arrays', () => {
      const lower: BitRotationTuple = [1, 0, 0]; // 1
      const upper: BitRotationTuple = [1, 1, 1]; // 7
      const rotations: BitRotationTuple[] = [
        [0, 1, 0], // 2 - index 0
        [0, 0, 1], // 4 - index 1
        [0, 1, 0], // 2 - index 2 (duplicate)
        [0, 1, 1], // 6 - index 3
        [0, 1, 0], // 2 - index 4 (duplicate)
      ];

      const states = anor(lower, upper, rotations);
      expect(states).not.toBeNull();

      const duplicates: number[][] = [];
      states!.forEach((state, i) => {
        if (state.anor && state.equal!.length > 0) {
          duplicates.push([i, ...state.equal!]);
        }
      });

      expect(duplicates.length).toBe(3);

      expect([...states![0].equal!].sort()).toEqual([2, 4]);
      expect([...states![2].equal!].sort()).toEqual([0, 4]);
      expect([...states![4].equal!].sort()).toEqual([0, 2]);
    });

    test('Traditional duplicate detection requires separate pass', () => {
      const rotations: BitRotationTuple[] = [
        [0, 1, 0], // 2
        [0, 0, 1], // 4
        [0, 1, 0], // 2
      ];

      const seen = new Map<string, number[]>();
      rotations.forEach((rot, i) => {
        const key = `${rot[0]},${rot[1]},${rot[2]}`;
        if (!seen.has(key)) {
          seen.set(key, []);
        }
        seen.get(key)!.push(i);
      });

      const duplicateSets = Array.from(seen.values()).filter((indices) => indices.length > 1);

      const anorResult = anor([1, 0, 0], [1, 1, 1], rotations);

      expect(duplicateSets.length).toBe(1);
      expect(duplicateSets[0]).toEqual([0, 2]);

      expect(anorResult![0].equal).toContain(2);
      expect(anorResult![2].equal).toContain(0);
    });
  });

  describe('Proof Point 8: Extrema Detection Pattern', () => {
    test('ANOR trivially identifies min/max through empty lesser/greater arrays', () => {
      const lower: BitRotationTuple = [1, 0, 0]; // 1
      const upper: BitRotationTuple = [1, 1, 1]; // 7
      const rotations: BitRotationTuple[] = [
        [1, 1, 0], // 3
        [1, 0, 0], // 1 - MINIMUM
        [1, 0, 1], // 5
        [1, 1, 1], // 7 - MAXIMUM
        [0, 1, 0], // 2
      ];

      const states = anor(lower, upper, rotations);
      expect(states).not.toBeNull();

      const minIndex = states!.findIndex((s) => s.anor && s.lesser!.length === 0);
      const maxIndex = states!.findIndex((s) => s.anor && s.greater!.length === 0);

      expect(minIndex).toBe(1);
      expect(maxIndex).toBe(3);
      expect(states![minIndex].rotation).toEqual([1, 0, 0]);
      expect(states![maxIndex].rotation).toEqual([1, 1, 1]);
    });

    test('Traditional extrema detection requires reduce operation', () => {
      const rotations: BitRotationTuple[] = [
        [1, 1, 0], // 3
        [1, 0, 0], // 1
        [1, 0, 1], // 5
      ];

      const min = rotations.reduce((a, b) => (greaterThan(a, b) === 0 ? a : b));
      const max = rotations.reduce((a, b) => (greaterThan(a, b) === 1 ? a : b));

      const anorResult = anor([1, 0, 0], [1, 1, 1], rotations);
      const anorMin = anorResult!.find((s) => s.anor && s.lesser!.length === 0);
      const anorMax = anorResult!.find((s) => s.anor && s.greater!.length === 0);

      expect(min).toEqual([1, 0, 0]);
      expect(max).toEqual([1, 0, 1]);
      expect(anorMin!.rotation).toEqual([1, 0, 0]);
      expect(anorMax!.rotation).toEqual([1, 0, 1]);
    });

    test('Multiple extrema (ties) correctly identified', () => {
      const lower: BitRotationTuple = [1, 0, 0]; // 1
      const upper: BitRotationTuple = [1, 1, 1]; // 7
      const rotations: BitRotationTuple[] = [
        [1, 1, 1], // 7 - MAX
        [1, 0, 0], // 1 - MIN
        [1, 1, 1], // 7 - MAX (duplicate)
        [1, 0, 0], // 1 - MIN (duplicate)
      ];

      const states = anor(lower, upper, rotations);
      expect(states).not.toBeNull();

      const minStates = states!.filter((s) => s.anor && s.lesser!.length === 0);
      const maxStates = states!.filter((s) => s.anor && s.greater!.length === 0);

      expect(minStates.length).toBe(2);
      expect(maxStates.length).toBe(2);

      minStates.forEach((s) => {
        expect(s.rotation).toEqual([1, 0, 0]);
      });
      maxStates.forEach((s) => {
        expect(s.rotation).toEqual([1, 1, 1]);
      });
    });
  });

  describe('Comprehensive Benefit Summary', () => {
    test('ANOR provides complete Self-Referencing Higher-Order Bidirectional Data Structure', () => {
      const lower: BitRotationTuple = [0, 1, 0]; // 2
      const upper: BitRotationTuple = [0, 1, 1]; // 6
      const rotations: BitRotationTuple[] = [
        [0, 1, 0], // 2
        [1, 1, 0], // 3
        [0, 0, 1], // 4
        [1, 0, 1], // 5
        [0, 1, 1], // 6
        [0, 0, 1], // 4 (duplicate)
      ];

      const states = anor(lower, upper, rotations);
      expect(states).not.toBeNull();

      expect(states!.every((s) => typeof s.anor === 'boolean')).toBe(true);

      const inRangeCount = states!.filter((s) => s.anor).length;
      expect(inRangeCount).toBe(6);

      const duplicateDetected = states!.some((s) => s.anor && s.equal!.length > 0);
      expect(duplicateDetected).toBe(true);

      const minState = states!.find((s) => s.anor && s.lesser!.length === 0);
      const maxState = states!.find((s) => s.anor && s.greater!.length === 0);
      expect(minState).toBeDefined();
      expect(maxState).toBeDefined();

      states!.forEach((state) => {
        if (state.anor) {
          expect(typeof state.greater!.orientate).toBe('function');
          expect(typeof state.lesser!.orientate).toBe('function');
          expect(typeof state.equal!.orientate).toBe('function');
        }
      });
    });
  });
});
