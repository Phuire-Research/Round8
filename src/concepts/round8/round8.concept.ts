// ============================================================================
// ROUND8 STRATIMUX CONCEPT
// Muxified calculator concept with flat array architecture
// ============================================================================

import { createConcept } from 'stratimux';
import type { Concept } from 'stratimux';
import { Round8State } from './qualities/types';
import { round8Qualities, Round8Qualities } from './round8.qualities';

// ====================================================
// CONCEPT CONFIGURATION
// ====================================================

export const round8ConceptName = 'round8';

/**
 * Initial state for Round8 Concept
 * Flat array of calculators - no active calculator management
 * Display and interaction handled at implementation level
 */
const initialRound8State = (): Round8State => {
  return {
    calculators: [],              // Start with empty array
    globalDarkMode: true          // Default theme preference
  };
};

// ====================================================
// DECK TYPE DEFINITION
// Following 🏗️ Muxified Concept Access Patterns
// ====================================================

export type Round8Deck = {
  round8: Concept<Round8State, Round8Qualities>;
};

export type Round8Concept = Concept<Round8State, Round8Qualities>;

// ====================================================
// CONCEPT CREATION
// Following Pattern from counterCommandDeckInterface research
// ====================================================

/**
 * Create Round8 concept
 * Flat array of calculators, each referenced by unique ID
 * All operations traverse r8_ manifold for Round8 computations
 *
 * @param state Optional partial state override
 * @returns Round8 concept ready for muxification
 */
export const createRound8Concept = (state?: Partial<Round8State>) => {
  return createConcept(
    round8ConceptName,
    state ? { ...initialRound8State(), ...state } : initialRound8State(),
    round8Qualities
  );
};