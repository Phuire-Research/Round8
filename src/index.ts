/**
 * Round8 v0.0.15 - Stratimux Concept Integration
 *
 * Pure binary operations using spool-based indexed lookups.
 * NO binary operand calculations (shifts/OR/AND).
 * Dual display: Round8 string + Binary representation.
 *
 * New in v0.0.15:
 * - Stratimux Concept for muxified state management
 * - Flat array calculator architecture (unlimited instances)
 * - Calculator routing via unique ID system
 * - All qualities traverse shared r8_ manifold
 *
 * Previous v0.0.14:
 * - Increment/Decrement operations (composing functions)
 * - Organized API: operations, logical, anor, conference, terminology
 * - Critical developer types exported (BitRotationTuple, WrungMuxity, ResultMuxity)
 *
 * @module round8
 * @version 0.0.15
 * @license GPL-3.0
 */

import { r8Calculator } from './concepts/round8/model/calculator';
import { r8_ as r8 } from './concepts/round8/model/r8';
import type { Positions } from './concepts/round8/model/r8';
import type {
  CalculatorState,
  InputState,
  OperationType
} from './concepts/round8/model/calculator';
import type {
  BitRotationTuple,
  ResultMuxity
} from './concepts/round8/model/terminology';
import type { WrungMuxity } from './concepts/round8/model/bidirectional';
import {createRound8Concept, round8ConceptName} from './concepts/round8/round8.concept';
import type { Round8Deck, Round8Concept } from './concepts/round8/round8.concept';
import type { Round8State } from './concepts/round8/qualities/types';

/**
 * r8_ - The Round8 Computational Manifold
 *
 * Complete API for Round8 binary operations:
 * - operations: add, subtract, increment, decrement
 * - logical: greaterThan, lessThan, equals, notEquals
 * - anor: and, or, xor operations
 * - conference: parsing and display functions
 * - terminology: bit manipulation and rotation functions
 * - createCalculator: factory for calculator instances
 */
const r8_ = {
  ...r8,
  createCalculator: r8Calculator
};

export {
  /**
   * r8_ - Primary Round8 manifold containing all computational operations
   * All Stratimux qualities traverse this shared manifold for Round8 calculations
   */
  r8_,

  /**
   * createRound8Concept - Factory for creating Round8 Stratimux Concept
   *
   * Creates a muxified concept containing these qualities:
   * - round8CreateCalculator: Creates new calculator instance with unique ID
   * - round8InputDigit: Input digits 0-7 to active calculator input
   * - round8SetOperation: Set operation (+, -, >, <, >=, <=, ==, !=)
   * - round8Calculate: Execute calculation using selected operation
   * - round8Clear: Clear calculator to zero state
   * - round8SwitchInput: Toggle between input1 and input2
   * - round8ToggleSign: Flip sign bit of active input
   * - round8Increment: Increment active input by 1
   * - round8Decrement: Decrement active input by 1
   * - round8DeleteCalculator: Remove calculator from array
   * - round8Backspace: Remove last digit from active input
   *
   * All qualities use calculator ID routing to target specific instances
   */
  createRound8Concept,

  /**
   * round8ConceptName - Concept identifier string ('round8')
   * Used for muxified concept access patterns: d.round8.k.property
   */
  round8ConceptName
};

export type {
  // Calculator Model Types - Direct calculator operations
  /** Calculator instance state with two inputs and operation */
  CalculatorState,
  /** Single input state: value (display), buffer (64-bit), binary (formatted) */
  InputState,
  /** Supported operations: +, -, >, <, >=, <=, ==, !=, null */
  OperationType,

  // Round8 Foundation Types - Core computational structures
  /** 21 positions of Round8 (0-20) with position-specific rotation values */
  Positions,
  /** [rotation: bigint, position: bigint] tuple for bit operations */
  BitRotationTuple,
  /** Wrung operation result with binary display and carry state */
  WrungMuxity,
  /** Operation result with overflow and underflow flags */
  ResultMuxity,

  // Stratimux Concept Types
  /**
   * Round8Deck - Complete typed access to Round8 concept via muxified deck
   * Provides d.round8 access pattern with full quality and state typing
   */
  Round8Deck,

  /**
   * Round8Concept - The concept type for type-safe muxification
   * Use when composing Round8 with other concepts via muxifyConcepts()
   */
  Round8Concept,

  /**
   * Round8State - Stratimux concept state structure
   *
   * Properties:
   * - calculators: Round8Calculator[] - Flat array of calculator instances
   *   Each calculator maintains independent state with unique ID routing
   *   No active calculator management - display handled at implementation
   * - globalDarkMode: boolean - Theme preference for all calculators
   *
   * Calculator structure includes:
   * - id: unique identifier for quality routing
   * - name: display name for UI
   * - input1/input2: two separate inputs (Round8 two-input design)
   * - output: calculation result
   * - operation: selected mathematical/logical operation
   * - activeInput: which input receives digit entry
   * - history: array of past calculations
   */
  Round8State
};