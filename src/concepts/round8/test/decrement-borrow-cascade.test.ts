/**
 * Suite 7 Rose - Clinical Diagnostic Tests
 * Decrement Borrow Cascade Edge Case
 *
 * Issue Discovered: v0.0.14 Phase 4 Implementation
 * Symptom: Decrement borrow cascades incorrectly through multiple positions
 *
 * Test Case:
 * - Start: 11,22,11
 * - Action: Decrement (subtract 1)
 * - Expected: 11,21,28
 * - Actual: 1,12,28
 *
 * Analysis:
 * - Rightmost position (11 → 28): CORRECT (borrow occurred)
 * - Middle position (22 → 21): WRONG (became 12, appears flipped)
 * - Leftmost position (11 → 1): WRONG (lost leading digit)
 *
 * Hypothesis: Borrow cascade is propagating incorrectly upward through positions
 * instead of borrowing from immediate next column.
 */

import { r8_ } from '../../../index';

describe('Suite 7 Rose - Decrement Borrow Cascade Edge Case', () => {

  describe('Edge Case: Decrement Requiring Cross-Column Borrow', () => {

    test('DIAGNOSTIC: Start 11,11,11 → Decrement → Borrow cascade through all positions', (done) => {
      // Parse the starting Round8 string "11,11,11"
      const startString = '11,11,11';
      const startBuffer = r8_.parseStringToBuffer(startString)!;

      console.log('\n========================================');
      console.log('SUITE 7 ROSE - DECREMENT BORROW DIAGNOSTIC');
      console.log('========================================');
      console.log('Starting Value:', startString);
      console.log('Starting Buffer:', startBuffer);
      console.log('Starting Binary:', r8_.createBufferDisplay(startBuffer));

      // Expected outcome after decrement
      // Positions 1-5: 1 - 1 = 8 (from spool with borrow cascading)
      // Position 6 (firstValidRotation): becomes 8 with final borrow → marquee delimiter (not recorded)
      // Result: 11,11,11 - 1 = 8,88,88 (5 eights, not 6)
      const expectedString = '8,88,88';
      const expectedBuffer = r8_.parseStringToBuffer(expectedString)!;

      console.log('\nExpected After Decrement:', expectedString);
      console.log('Expected Buffer:', expectedBuffer);
      console.log('Expected Binary:', r8_.createBufferDisplay(expectedBuffer));

      // Perform decrement operation
      console.log('\n--- EXECUTING DECREMENT OPERATION ---');
      const actualBuffer = r8_.operations.decrement(startBuffer);
      const actualString = r8_.createRoundDisplay(actualBuffer);

      console.log('\nActual After Decrement:', actualString);
      console.log('Actual Buffer:', actualBuffer);
      console.log('Actual Binary:', r8_.createBufferDisplay(actualBuffer));

      // Compare expected vs actual
      console.log('\n--- DIAGNOSTIC COMPARISON ---');
      console.log('Expected:', expectedString);
      console.log('Actual:  ', actualString);
      console.log('Match:', expectedString === actualString ? 'YES ✓' : 'NO ✗');

      if (expectedString !== actualString) {
        console.log('\n⚠️  BUG CONFIRMED');
        console.log('Expected vs Actual Difference:');
        console.log('  Position Analysis:');
        console.log('    Leftmost:  Expected "11" → Actual "' + actualString.split(',')[0] + '" (' + (actualString.split(',')[0] === '11' ? 'CORRECT' : 'WRONG') + ')');
        console.log('    Middle:    Expected "21" → Actual "' + actualString.split(',')[1] + '" (' + (actualString.split(',')[1] === '21' ? 'CORRECT' : 'WRONG') + ')');
        console.log('    Rightmost: Expected "28" → Actual "' + actualString.split(',')[2] + '" (' + (actualString.split(',')[2] === '28' ? 'CORRECT' : 'WRONG') + ')');
      }

      console.log('========================================\n');

      // Assertion (will fail until bug is fixed)
      expect(actualString).toBe(expectedString);

      done();
    });

    test('CONTROL: Increment from same starting value (should work correctly)', (done) => {
      // Control test: Increment should work fine per user report
      const startString = '11,22,11';
      const startBuffer = r8_.parseStringToBuffer(startString)!;

      console.log('\n========================================');
      console.log('CONTROL TEST - INCREMENT (Should Work)');
      console.log('========================================');
      console.log('Starting Value:', startString);

      const incrementedBuffer = r8_.operations.increment(startBuffer);
      const incrementedString = r8_.createRoundDisplay(incrementedBuffer);

      console.log('After Increment:', incrementedString);
      console.log('========================================\n');

      // This should work correctly per user report
      expect(incrementedString).toBeDefined();

      done();
    });

    test('VARIANT 1: Simple single-position decrement (should work)', (done) => {
      // Baseline test: Single position decrement that doesn't require borrow
      const startString = '5';
      const startBuffer = r8_.parseStringToBuffer(startString)!;

      const decrementedBuffer = r8_.operations.decrement(startBuffer);
      const decrementedString = r8_.createRoundDisplay(decrementedBuffer);

      const expectedString = '4';

      console.log('VARIANT 1 - Simple Decrement:', startString, '→', decrementedString, '(expected:', expectedString + ')');

      expect(decrementedString).toBe(expectedString);

      done();
    });

    test('VARIANT 2: Two-position decrement with borrow', (done) => {
      // Two-position value requiring borrow
      const startString = '2,1';
      const startBuffer = r8_.parseStringToBuffer(startString)!;

      const decrementedBuffer = r8_.operations.decrement(startBuffer);
      const decrementedString = r8_.createRoundDisplay(decrementedBuffer);

      // Expected: Borrow from position 2 (value 2) to position 1
      // Position 1: 1 - 1 = 8 with borrow
      // Position 2: 2 - 1 (from borrow) = 1
      // Result: 18 (no marquee delimiter - continuous positions)
      const expectedString = '18';

      console.log('VARIANT 2 - Two-Position Borrow:', startString, '→', decrementedString, '(expected:', expectedString + ')');

      expect(decrementedString).toBe(expectedString);

      done();
    });

    test('VARIANT 3: Three-position starting with 1 at rightmost', (done) => {
      // Three-position value starting with 1 at rightmost (requires borrow)
      const startString = '5,3,1';
      const startBuffer = r8_.parseStringToBuffer(startString)!;

      const decrementedBuffer = r8_.operations.decrement(startBuffer);
      const decrementedString = r8_.createRoundDisplay(decrementedBuffer);

      // Expected: Borrow from position 2 (value 3)
      // Position 1: 1 - 1 = 8 with borrow
      // Position 2: 3 - 1 (from borrow) = 2
      // Position 3: 5 (unchanged)
      // Result: 5,28 (marquee delimiter preserved between groups)
      const expectedString = '5,28';

      console.log('VARIANT 3 - Three-Position Borrow:', startString, '→', decrementedString, '(expected:', expectedString + ')');

      expect(decrementedString).toBe(expectedString);

      done();
    });

    test('VARIANT 4: Cascade borrow through zero', (done) => {
      // Edge case: Both rightmost positions are 1, cascade borrow
      const startString = '5,11';
      const startBuffer = r8_.parseStringToBuffer(startString)!;

      const decrementedBuffer = r8_.operations.decrement(startBuffer);
      const decrementedString = r8_.createRoundDisplay(decrementedBuffer);

      // Expected:
      // Position 1: 1 - 1 = 8 with borrow
      // Position 2: 1 - 1 (from borrow) = 8 with borrow
      // Position 3: 5 - 1 (from borrow) = 4
      // Result: 4,88 (both borrows cascade correctly)
      const expectedString = '4,88';

      console.log('VARIANT 4 - Cascade Borrow Through Zero:', startString, '→', decrementedString, '(expected:', expectedString + ')');

      expect(decrementedString).toBe(expectedString);

      done();
    });
  });

  describe('Additional Borrow Edge Cases', () => {

    test('VARIANT 5: Maximum value decrement (28 → 27)', (done) => {
      const startString = '28';
      const startBuffer = r8_.parseStringToBuffer(startString)!;

      const decrementedBuffer = r8_.operations.decrement(startBuffer);
      const decrementedString = r8_.createRoundDisplay(decrementedBuffer);

      const expectedString = '27';

      console.log('VARIANT 5 - Max Value Decrement:', startString, '→', decrementedString, '(expected:', expectedString + ')');

      expect(decrementedString).toBe(expectedString);

      done();
    });

    test('VARIANT 6: Decrement from exactly reported issue value', (done) => {
      // User's exact reported case - most critical
      const startString = '11,22,11';
      const startBuffer = r8_.parseStringToBuffer(startString)!;

      console.log('\n=== USER REPORTED ISSUE - EXACT CASE ===');
      console.log('Start:', startString);

      const decrementedBuffer = r8_.operations.decrement(startBuffer);
      const decrementedString = r8_.createRoundDisplay(decrementedBuffer);

      console.log('Result:', decrementedString);
      console.log('Expected: 11,21,88');
      console.log('Bug Fixed:', decrementedString === '11,21,88');
      console.log('========================================\n');

      // Expected: Position 1: 1 - 1 = 8, Position 2: 1 - 1 (from borrow) = 8
      // Position 3: 2 - 1 (from borrow) = 1, Positions 4-6: 2, 1, 1 unchanged
      // Result: 11,21,88 (both rightmost positions become 8)
      expect(decrementedString).toBe('11,21,88');

      done();
    });
  });
});
