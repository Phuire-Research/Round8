// ============================================================================
// ROUND8 STRATIMUX CONCEPT - TYPE DEFINITIONS
// Following Stratimux v0.3.2 patterns from counterCommandDeckInterface
// ============================================================================

import type { Quality, Concept, PrincipleFunction, MuxiumDeck } from 'stratimux';

// ============================================================
// CALCULATOR STATE - Mirrors calculator.ts structure
// ============================================================

/**
 * Input state for Round8 calculator
 * Mirrors calculator.ts InputState interface
 */
export interface Round8InputState extends Record<string, unknown> {
  value: string;      // Round8 string ("1,2,3") - DISPLAY value
  buffer: bigint;     // 64-bit buffer
  binary: string;     // Binary display ("1|001|010|011|...")
}

/**
 * Individual calculator instance state
 * Based on calculator.ts CalculatorState with ID for routing
 */
export interface Round8Calculator extends Record<string, unknown> {
  id: string;                           // Unique calculator ID for routing
  name: string;                         // Display name for calculator
  input1: Round8InputState;             // First input (two-input calculator)
  input2: Round8InputState;             // Second input (two-input calculator)
  output: Round8InputState;             // Calculation result
  operation: '+' | '-' | '>' | '<' | '>=' | '<=' | '==' | '!=' | null;
  activeInput: 'input1' | 'input2';    // Which input is active
  darkMode: boolean;                    // UI theme preference
  history: Round8HistoryEntry[];        // Calculation history
}

/**
 * History entry for tracking calculations
 */
export interface Round8HistoryEntry extends Record<string, unknown> {
  timestamp: number;
  operation: string;
  input1: string;
  input2: string;
  result: string;
}

// ============================================================
// CONCEPT STATE INTERFACE
// ============================================================

/**
 * Round8 Concept State
 * Manages multiple calculator instances via flat array pattern
 * No active calculator - display handled at implementation level
 */
export interface Round8State extends Record<string, unknown> {
  calculators: Round8Calculator[];      // Flat array - any can be referenced by ID
  globalDarkMode: boolean;              // Global theme preference
}

// ============================================================
// QUALITY PAYLOAD TYPES - Calculator routing via ID
// ============================================================

/**
 * Create new calculator instance
 */
export interface Round8CreateCalculatorPayload extends Record<string, unknown> {
  name?: string;  // Optional display name
}

/**
 * Input digit to specific calculator
 */
export interface Round8InputDigitPayload extends Record<string, unknown> {
  calculatorId: string;
  digit: number;  // 0-7 for Round8
}

/**
 * Set operation for specific calculator
 */
export interface Round8SetOperationPayload extends Record<string, unknown> {
  calculatorId: string;
  operation: '+' | '-' | '>' | '<' | '>=' | '<=' | '==' | '!=';
}

/**
 * Execute calculation for specific calculator
 */
export interface Round8CalculatePayload extends Record<string, unknown> {
  calculatorId: string;
}

/**
 * Clear specific calculator
 */
export interface Round8ClearPayload extends Record<string, unknown> {
  calculatorId: string;
}

/**
 * Switch active input for specific calculator
 */
export interface Round8SwitchInputPayload extends Record<string, unknown> {
  calculatorId: string;
}

/**
 * Toggle sign for active input of specific calculator
 */
export interface Round8ToggleSignPayload extends Record<string, unknown> {
  calculatorId: string;
}

/**
 * Increment active input of specific calculator
 */
export interface Round8IncrementPayload extends Record<string, unknown> {
  calculatorId: string;
}

/**
 * Decrement active input of specific calculator
 */
export interface Round8DecrementPayload extends Record<string, unknown> {
  calculatorId: string;
}

/**
 * Delete calculator instance
 */
export interface Round8DeleteCalculatorPayload extends Record<string, unknown> {
  calculatorId: string;
}

/**
 * Backspace on active input
 */
export interface Round8BackspacePayload extends Record<string, unknown> {
  calculatorId: string;
}

// ============================================================
// QUALITY TYPE DEFINITIONS
// Following explicit Quality type mapping (NOT typeof)
// ============================================================

export type Round8CreateCalculatorQuality = Quality<Round8State, Round8CreateCalculatorPayload>;
export type Round8InputDigitQuality = Quality<Round8State, Round8InputDigitPayload>;
export type Round8SetOperationQuality = Quality<Round8State, Round8SetOperationPayload>;
export type Round8CalculateQuality = Quality<Round8State, Round8CalculatePayload>;
export type Round8ClearQuality = Quality<Round8State, Round8ClearPayload>;
export type Round8SwitchInputQuality = Quality<Round8State, Round8SwitchInputPayload>;
export type Round8ToggleSignQuality = Quality<Round8State, Round8ToggleSignPayload>;
export type Round8IncrementQuality = Quality<Round8State, Round8IncrementPayload>;
export type Round8DecrementQuality = Quality<Round8State, Round8DecrementPayload>;
export type Round8DeleteCalculatorQuality = Quality<Round8State, Round8DeleteCalculatorPayload>;
export type Round8BackspaceQuality = Quality<Round8State, Round8BackspacePayload>;

// ============================================================
// CONCEPT QUALITIES MAPPING
// Explicit quality mapping following v0.3.2 patterns
// ============================================================

export type Round8Qualities = {
  round8CreateCalculator: Round8CreateCalculatorQuality;
  round8InputDigit: Round8InputDigitQuality;
  round8SetOperation: Round8SetOperationQuality;
  round8Calculate: Round8CalculateQuality;
  round8Clear: Round8ClearQuality;
  round8SwitchInput: Round8SwitchInputQuality;
  round8ToggleSign: Round8ToggleSignQuality;
  round8Increment: Round8IncrementQuality;
  round8Decrement: Round8DecrementQuality;
  round8DeleteCalculator: Round8DeleteCalculatorQuality;
  round8Backspace: Round8BackspaceQuality;
};

// ============================================================
// DECK TYPE DEFINITION
// ============================================================

export type Round8Deck = {
  round8: Concept<Round8State, Round8Qualities>;
} & MuxiumDeck;

// ============================================================
// PRINCIPLE TYPE
// ============================================================

export type Round8Principle = PrincipleFunction<
  Round8Qualities,
  Round8Deck,
  Round8State
>;