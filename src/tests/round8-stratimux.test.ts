/**
 * Round8 Stratimux Concept Test Suite - v0.0.15
 *
 * Tests Round8 concept with Stratimux Muxium:
 * - Flat array calculator architecture
 * - Calculator routing via unique IDs
 * - Quality dispatch patterns
 * - State management through muxified concept
 *
 * Following 🧪 Stratimux Testing Patterns & Asynchronous State Management
 * @version 0.0.15
 */

import { muxification, MuxiumDeck } from 'stratimux';
import { createRound8Concept } from '../index';
import type { Round8Deck } from '../index';

describe('Round8 Stratimux Concept - Flat Array Architecture', () => {
  describe('Calculator Management', () => {
    test('creates calculator with unique ID', (done) => {
      const muxium = muxification('Round8 Test Muxium', {
        round8: createRound8Concept()
      });

      muxium.plan<MuxiumDeck & Round8Deck>('Create Calculator Test', ({ stage, conclude }) => [
        // Stage 0: Create calculator
        stage(({ dispatch, d, stagePlanner }) => {
          try {
            dispatch(d.round8.e.round8CreateCalculator({ name: 'Test Calc 1' }), {
              iterateStage: true
            });
          } catch (error) {
            console.error('Create calculator failed:', error);
            expect(false).toBe(true);
            stagePlanner.conclude();
            done();
          }
        }),

        // Stage 1: Validate calculator was created
        stage(({ d, stagePlanner }) => {
          try {
            const calculators = d.round8.k.calculators.select();

            expect(calculators.length).toBe(1);
            expect(calculators[0].id).toBeDefined();
            expect(calculators[0].name).toBe('Test Calc 1');
            expect(calculators[0].input1.value).toBe('0');
            expect(calculators[0].input2.value).toBe('0');

            stagePlanner.conclude();
            setTimeout(() => {
              muxium.close();
              done();
            }, 100);
          } catch (error) {
            console.error('Validation failed:', error);
            expect(false).toBe(true);
            done();
          }
        }),

        conclude()
      ]);
    });

    test('creates multiple calculators in flat array', (done) => {
      const muxium = muxification('Round8 Multi Calculator Test', {
        round8: createRound8Concept()
      });

      muxium.plan<MuxiumDeck & Round8Deck>('Multiple Calculators Test', ({ stage, conclude }) => [
        // Stage 0: Create first calculator
        stage(({ dispatch, d, stagePlanner }) => {
          try {
            dispatch(d.round8.e.round8CreateCalculator({ name: 'Calculator A' }), {
              iterateStage: true
            });
          } catch (error) {
            console.error('Create first calculator failed:', error);
            expect(false).toBe(true);
            stagePlanner.conclude();
            done();
          }
        }),

        // Stage 1: Create second calculator
        stage(({ dispatch, d, stagePlanner }) => {
          try {
            dispatch(d.round8.e.round8CreateCalculator({ name: 'Calculator B' }), {
              iterateStage: true
            });
          } catch (error) {
            console.error('Create second calculator failed:', error);
            expect(false).toBe(true);
            stagePlanner.conclude();
            done();
          }
        }),

        // Stage 2: Create third calculator
        stage(({ dispatch, d, stagePlanner }) => {
          try {
            dispatch(d.round8.e.round8CreateCalculator({ name: 'Calculator C' }), {
              iterateStage: true
            });
          } catch (error) {
            console.error('Create third calculator failed:', error);
            expect(false).toBe(true);
            stagePlanner.conclude();
            done();
          }
        }),

        // Stage 3: Validate all calculators exist with unique IDs
        stage(({ d, stagePlanner }) => {
          try {
            const calculators = d.round8.k.calculators.select();

            expect(calculators.length).toBe(3);

            const ids = calculators.map(c => c.id);
            const uniqueIds = new Set(ids);
            expect(uniqueIds.size).toBe(3); // All IDs are unique

            expect(calculators[0].name).toBe('Calculator A');
            expect(calculators[1].name).toBe('Calculator B');
            expect(calculators[2].name).toBe('Calculator C');

            stagePlanner.conclude();
            setTimeout(() => {
              muxium.close();
              done();
            }, 100);
          } catch (error) {
            console.error('Multi-calculator validation failed:', error);
            expect(false).toBe(true);
            done();
          }
        }),

        conclude()
      ]);
    });
  });

  describe('Calculator Operations via ID Routing', () => {
    test('routes input to specific calculator by ID', (done) => {
      let calculatorId: string;

      const muxium = muxification('Round8 ID Routing Test', {
        round8: createRound8Concept()
      });

      muxium.plan<MuxiumDeck & Round8Deck>('ID Routing Test', ({ stage, conclude }) => [
        // Stage 0: Create calculator
        stage(({ dispatch, d, stagePlanner }) => {
          try {
            dispatch(d.round8.e.round8CreateCalculator({ name: 'Input Test' }), {
              iterateStage: true
            });
          } catch (error) {
            console.error('Create calculator failed:', error);
            expect(false).toBe(true);
            stagePlanner.conclude();
            done();
          }
        }),

        // Stage 1: Store ID and input first digit
        stage(({ dispatch, d, stagePlanner }) => {
          try {
            const calculators = d.round8.k.calculators.select();
            calculatorId = calculators[0].id;

            dispatch(d.round8.e.round8InputDigit({ calculatorId, digit: 7 }), {
              iterateStage: true
            });
          } catch (error) {
            console.error('First digit input failed:', error);
            expect(false).toBe(true);
            stagePlanner.conclude();
            done();
          }
        }),

        // Stage 2: Input second digit
        stage(({ dispatch, d, stagePlanner }) => {
          try {
            dispatch(d.round8.e.round8InputDigit({ calculatorId, digit: 5 }), {
              iterateStage: true
            });
          } catch (error) {
            console.error('Second digit input failed:', error);
            expect(false).toBe(true);
            stagePlanner.conclude();
            done();
          }
        }),

        // Stage 3: Validate input was routed correctly
        stage(({ d, stagePlanner }) => {
          try {
            const calculators = d.round8.k.calculators.select();
            const targetCalc = calculators.find(c => c.id === calculatorId);

            expect(targetCalc).toBeDefined();
            expect(targetCalc!.input1.value).toBe('75'); // Round8 display

            stagePlanner.conclude();
            setTimeout(() => {
              muxium.close();
              done();
            }, 100);
          } catch (error) {
            console.error('Input validation failed:', error);
            expect(false).toBe(true);
            done();
          }
        }),

        conclude()
      ]);
    });

    test('performs calculation on specific calculator', (done) => {
      let calculatorId: string;

      const muxium = muxification('Round8 Calculation Test', {
        round8: createRound8Concept()
      });

      muxium.plan<MuxiumDeck & Round8Deck>('Calculation Test', ({ stage, conclude }) => [
        // Stage 0: Create calculator
        stage(({ dispatch, d, stagePlanner }) => {
          try {
            dispatch(d.round8.e.round8CreateCalculator({ name: 'Calc Test' }), {
              iterateStage: true
            });
          } catch (error) {
            console.error('Create calculator failed:', error);
            expect(false).toBe(true);
            stagePlanner.conclude();
            done();
          }
        }),

        // Stage 1: Input first number
        stage(({ dispatch, d, stagePlanner }) => {
          try {
            const calculators = d.round8.k.calculators.select();
            calculatorId = calculators[0].id;

            dispatch(d.round8.e.round8InputDigit({ calculatorId, digit: 3 }), {
              iterateStage: true
            });
          } catch (error) {
            console.error('Input first number failed:', error);
            expect(false).toBe(true);
            stagePlanner.conclude();
            done();
          }
        }),

        // Stage 2: Switch to input2
        stage(({ dispatch, d, stagePlanner }) => {
          try {
            dispatch(d.round8.e.round8SwitchInput({ calculatorId }), {
              iterateStage: true
            });
          } catch (error) {
            console.error('Switch input failed:', error);
            expect(false).toBe(true);
            stagePlanner.conclude();
            done();
          }
        }),

        // Stage 3: Input second number
        stage(({ dispatch, d, stagePlanner }) => {
          try {
            dispatch(d.round8.e.round8InputDigit({ calculatorId, digit: 4 }), {
              iterateStage: true
            });
          } catch (error) {
            console.error('Input second number failed:', error);
            expect(false).toBe(true);
            stagePlanner.conclude();
            done();
          }
        }),

        // Stage 4: Set operation
        stage(({ dispatch, d, stagePlanner }) => {
          try {
            dispatch(d.round8.e.round8SetOperation({ calculatorId, operation: '+' }), {
              iterateStage: true
            });
          } catch (error) {
            console.error('Set operation failed:', error);
            expect(false).toBe(true);
            stagePlanner.conclude();
            done();
          }
        }),

        // Stage 5: Calculate
        stage(({ dispatch, d, stagePlanner }) => {
          try {
            dispatch(d.round8.e.round8Calculate({ calculatorId }), {
              iterateStage: true
            });
          } catch (error) {
            console.error('Calculate failed:', error);
            expect(false).toBe(true);
            stagePlanner.conclude();
            done();
          }
        }),

        // Stage 6: Validate calculation result
        stage(({ d, stagePlanner }) => {
          try {
            const calculators = d.round8.k.calculators.select();
            const calc = calculators.find(c => c.id === calculatorId);

            expect(calc).toBeDefined();
            expect(calc!.input1.value).toBe('3');
            expect(calc!.input2.value).toBe('4');
            expect(calc!.output.value).toBe('7'); // 3 + 4 = 7

            stagePlanner.conclude();
            setTimeout(() => {
              muxium.close();
              done();
            }, 100);
          } catch (error) {
            console.error('Calculation validation failed:', error);
            expect(false).toBe(true);
            done();
          }
        }),

        conclude()
      ]);
    });
  });

  describe('Flat Array - No Active Calculator Management', () => {
    test('all calculators operate independently', (done) => {
      let calcA: string;
      let calcB: string;

      const muxium = muxification('Round8 Independent Calculators', {
        round8: createRound8Concept()
      });

      muxium.plan<MuxiumDeck & Round8Deck>('Independent Operations', ({ stage, conclude }) => [
        // Stage 0: Create first calculator
        stage(({ dispatch, d, stagePlanner }) => {
          try {
            dispatch(d.round8.e.round8CreateCalculator({ name: 'Calc A' }), {
              iterateStage: true
            });
          } catch (error) {
            console.error('Create Calc A failed:', error);
            expect(false).toBe(true);
            stagePlanner.conclude();
            done();
          }
        }),

        // Stage 1: Create second calculator
        stage(({ dispatch, d, stagePlanner }) => {
          try {
            dispatch(d.round8.e.round8CreateCalculator({ name: 'Calc B' }), {
              iterateStage: true
            });
          } catch (error) {
            console.error('Create Calc B failed:', error);
            expect(false).toBe(true);
            stagePlanner.conclude();
            done();
          }
        }),

        // Stage 2: Store IDs and input to Calc A
        stage(({ dispatch, d, stagePlanner }) => {
          try {
            const calculators = d.round8.k.calculators.select();
            calcA = calculators.find(c => c.name === 'Calc A')!.id;
            calcB = calculators.find(c => c.name === 'Calc B')!.id;

            dispatch(d.round8.e.round8InputDigit({ calculatorId: calcA, digit: 2 }), {
              iterateStage: true
            });
          } catch (error) {
            console.error('Input to Calc A failed:', error);
            expect(false).toBe(true);
            stagePlanner.conclude();
            done();
          }
        }),

        // Stage 3: Input to Calc B
        stage(({ dispatch, d, stagePlanner }) => {
          try {
            dispatch(d.round8.e.round8InputDigit({ calculatorId: calcB, digit: 5 }), {
              iterateStage: true
            });
          } catch (error) {
            console.error('Input to Calc B failed:', error);
            expect(false).toBe(true);
            stagePlanner.conclude();
            done();
          }
        }),

        // Stage 4: Increment Calc A
        stage(({ dispatch, d, stagePlanner }) => {
          try {
            dispatch(d.round8.e.round8Increment({ calculatorId: calcA }), {
              iterateStage: true
            });
          } catch (error) {
            console.error('Increment Calc A failed:', error);
            expect(false).toBe(true);
            stagePlanner.conclude();
            done();
          }
        }),

        // Stage 5: Decrement Calc B
        stage(({ dispatch, d, stagePlanner }) => {
          try {
            dispatch(d.round8.e.round8Decrement({ calculatorId: calcB }), {
              iterateStage: true
            });
          } catch (error) {
            console.error('Decrement Calc B failed:', error);
            expect(false).toBe(true);
            stagePlanner.conclude();
            done();
          }
        }),

        // Stage 6: Validate independent operations
        stage(({ d, stagePlanner, concepts }) => {
          try {
            const calculators = d.round8.k.calculators.select();
            const a = calculators.find(c => c.id === calcA);
            const b = calculators.find(c => c.id === calcB);

            expect(a!.input1.value).toBe('3'); // 2 + 1 = 3
            expect(b!.input1.value).toBe('4'); // 5 - 1 = 4

            // No active calculator in state
            const state = d.round8.k.getState(concepts);
            expect((state as any).activeCalculatorId).toBeUndefined();

            stagePlanner.conclude();
            setTimeout(() => {
              muxium.close();
              done();
            }, 100);
          } catch (error) {
            console.error('Independent operations validation failed:', error);
            expect(false).toBe(true);
            done();
          }
        }),

        conclude()
      ]);
    });
  });
});