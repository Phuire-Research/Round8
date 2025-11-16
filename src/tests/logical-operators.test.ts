/**
 * Logical Operators - Universal Boolean Operations
 *
 * Tests universal boolean operations:
 * - AND (boolean conjunction)
 * - OR (boolean disjunction)
 * - XOR (boolean exclusive or)
 * - inversion (boolean negation)
 *
 * All operators use 0 = False, 1 = True
 */

import {
  and,
  or,
  xor,
  inversion,
  TrueFalse
} from '../concepts/round8/model/cases';

describe('Logical Operators - Universal Boolean Operations', () => {
  describe('AND - Boolean Conjunction', () => {
    test('0 AND 0 = 0', () => {
      expect(and(0, 0)).toBe(0);
    });

    test('0 AND 1 = 0', () => {
      expect(and(0, 1)).toBe(0);
    });

    test('1 AND 0 = 0', () => {
      expect(and(1, 0)).toBe(0);
    });

    test('1 AND 1 = 1', () => {
      expect(and(1, 1)).toBe(1);
    });

    test('Commutative property: and(X,Y) === and(Y,X)', () => {
      const inputs: TrueFalse[] = [0, 1];
      for (const x of inputs) {
        for (const y of inputs) {
          const forward = and(x, y);
          const reverse = and(y, x);
          expect(forward).toBe(reverse);
        }
      }
    });

    test('Associative property: and(and(X,Y),Z) === and(X,and(Y,Z))', () => {
      const inputs: TrueFalse[] = [0, 1];
      for (const x of inputs) {
        for (const y of inputs) {
          for (const z of inputs) {
            const leftAssoc = and(and(x, y), z);
            const rightAssoc = and(x, and(y, z));
            expect(leftAssoc).toBe(rightAssoc);
          }
        }
      }
    });

    test('Identity element: and(X, 1) === X', () => {
      expect(and(0, 1)).toBe(0);
      expect(and(1, 1)).toBe(1);
    });

    test('Annihilator element: and(X, 0) === 0', () => {
      expect(and(0, 0)).toBe(0);
      expect(and(1, 0)).toBe(0);
    });
  });

  describe('OR - Boolean Disjunction', () => {
    test('0 OR 0 = 0', () => {
      expect(or(0, 0)).toBe(0);
    });

    test('0 OR 1 = 1', () => {
      expect(or(0, 1)).toBe(1);
    });

    test('1 OR 0 = 1', () => {
      expect(or(1, 0)).toBe(1);
    });

    test('1 OR 1 = 1', () => {
      expect(or(1, 1)).toBe(1);
    });

    test('Commutative property: or(X,Y) === or(Y,X)', () => {
      const inputs: TrueFalse[] = [0, 1];
      for (const x of inputs) {
        for (const y of inputs) {
          const forward = or(x, y);
          const reverse = or(y, x);
          expect(forward).toBe(reverse);
        }
      }
    });

    test('Associative property: or(or(X,Y),Z) === or(X,or(Y,Z))', () => {
      const inputs: TrueFalse[] = [0, 1];
      for (const x of inputs) {
        for (const y of inputs) {
          for (const z of inputs) {
            const leftAssoc = or(or(x, y), z);
            const rightAssoc = or(x, or(y, z));
            expect(leftAssoc).toBe(rightAssoc);
          }
        }
      }
    });

    test('Identity element: or(X, 0) === X', () => {
      expect(or(0, 0)).toBe(0);
      expect(or(1, 0)).toBe(1);
    });

    test('Annihilator element: or(X, 1) === 1', () => {
      expect(or(0, 1)).toBe(1);
      expect(or(1, 1)).toBe(1);
    });
  });

  describe('XOR - Boolean Exclusive OR', () => {
    test('0 XOR 0 = 0', () => {
      expect(xor(0, 0)).toBe(0);
    });

    test('0 XOR 1 = 1', () => {
      expect(xor(0, 1)).toBe(1);
    });

    test('1 XOR 0 = 1', () => {
      expect(xor(1, 0)).toBe(1);
    });

    test('1 XOR 1 = 0', () => {
      expect(xor(1, 1)).toBe(0);
    });

    test('Commutative property: xor(X,Y) === xor(Y,X)', () => {
      const inputs: TrueFalse[] = [0, 1];
      for (const x of inputs) {
        for (const y of inputs) {
          const forward = xor(x, y);
          const reverse = xor(y, x);
          expect(forward).toBe(reverse);
        }
      }
    });

    test('Associative property: xor(xor(X,Y),Z) === xor(X,xor(Y,Z))', () => {
      const inputs: TrueFalse[] = [0, 1];
      for (const x of inputs) {
        for (const y of inputs) {
          for (const z of inputs) {
            const leftAssoc = xor(xor(x, y), z);
            const rightAssoc = xor(x, xor(y, z));
            expect(leftAssoc).toBe(rightAssoc);
          }
        }
      }
    });

    test('Identity element: xor(X, 0) === X', () => {
      expect(xor(0, 0)).toBe(0);
      expect(xor(1, 0)).toBe(1);
    });

    test('Self-inverse: xor(X, X) === 0', () => {
      expect(xor(0, 0)).toBe(0);
      expect(xor(1, 1)).toBe(0);
    });
  });

  describe('inversion - Boolean Negation', () => {
    test('inversion 0 = 1', () => {
      expect(inversion(0)).toBe(1);
    });

    test('inversion 1 = 0', () => {
      expect(inversion(1)).toBe(0);
    });

    test('Double negation: inversion(inversion(X)) === X', () => {
      expect(inversion(inversion(0))).toBe(0);
      expect(inversion(inversion(1))).toBe(1);
    });

    test('inversion is involution: applying twice returns original', () => {
      const inputs: TrueFalse[] = [0, 1];
      for (const x of inputs) {
        const doubled = inversion(inversion(x));
        expect(doubled).toBe(x);
      }
    });
  });

  describe('Boolean Algebra Laws', () => {
    test('De Morgan\'s Law 1: inversion(and(X,Y)) === or(inversion(X),inversion(Y))', () => {
      const inputs: TrueFalse[] = [0, 1];
      for (const x of inputs) {
        for (const y of inputs) {
          const left = inversion(and(x, y));
          const right = or(inversion(x), inversion(y));
          expect(left).toBe(right);
        }
      }
    });

    test('De Morgan\'s Law 2: inversion(or(X,Y)) === and(inversion(X),inversion(Y))', () => {
      const inputs: TrueFalse[] = [0, 1];
      for (const x of inputs) {
        for (const y of inputs) {
          const left = inversion(or(x, y));
          const right = and(inversion(x), inversion(y));
          expect(left).toBe(right);
        }
      }
    });

    test('Distributive Law 1: and(X, or(Y,Z)) === or(and(X,Y), and(X,Z))', () => {
      const inputs: TrueFalse[] = [0, 1];
      for (const x of inputs) {
        for (const y of inputs) {
          for (const z of inputs) {
            const left = and(x, or(y, z));
            const right = or(and(x, y), and(x, z));
            expect(left).toBe(right);
          }
        }
      }
    });

    test('Distributive Law 2: or(X, and(Y,Z)) === and(or(X,Y), or(X,Z))', () => {
      const inputs: TrueFalse[] = [0, 1];
      for (const x of inputs) {
        for (const y of inputs) {
          for (const z of inputs) {
            const left = or(x, and(y, z));
            const right = and(or(x, y), or(x, z));
            expect(left).toBe(right);
          }
        }
      }
    });

    test('Absorption Law 1: and(X, or(X,Y)) === X', () => {
      const inputs: TrueFalse[] = [0, 1];
      for (const x of inputs) {
        for (const y of inputs) {
          const result = and(x, or(x, y));
          expect(result).toBe(x);
        }
      }
    });

    test('Absorption Law 2: or(X, and(X,Y)) === X', () => {
      const inputs: TrueFalse[] = [0, 1];
      for (const x of inputs) {
        for (const y of inputs) {
          const result = or(x, and(x, y));
          expect(result).toBe(x);
        }
      }
    });

    test('XOR definition: xor(X,Y) === and(or(X,Y), inversion(and(X,Y)))', () => {
      const inputs: TrueFalse[] = [0, 1];
      for (const x of inputs) {
        for (const y of inputs) {
          const xorResult = xor(x, y);
          const definition = and(or(x, y), inversion(and(x, y)));
          expect(xorResult).toBe(definition);
        }
      }
    });
  });
});
