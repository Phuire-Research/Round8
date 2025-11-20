// ============================================================================
// ROUND8 STRATIMUX CONCEPT - MUXIFICATION EXPORTS
// Selective exports - Concept contains full API via Deck
// ============================================================================

// Concept Creator - Primary export
export { createRound8Concept } from './round8.concept';

// Essential Types only
export type { Round8State, Round8Deck, Round8Qualities } from './qualities/types';

// Export Concept type for type safety
import type { Concept } from 'stratimux';
import { Round8State } from './qualities/types';
import { Round8Qualities } from './round8.qualities';

export type Round8Concept = Concept<Round8State, Round8Qualities>;