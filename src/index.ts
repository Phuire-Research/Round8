/**
 * Round8 v0.0.1 - Base-72 Numeral System Library
 *
 * Pure spatial coordinate mathematics with string-only API.
 * No decimal contamination in r8_ namespace.
 *
 * @module round8
 * @version 0.0.1
 * @license GPL-3.0
 */

// Export everything from Round8 model
export * from './concepts/round8/model/Round8.model';

// Explicit r8_ namespace export for clean imports
export { r8_ } from './concepts/round8/model/Round8.model';

// Explicit Round8 namespace export
// export { Round8 } from './concepts/round8/model/Round8.model';

// Explicit type exports
export type {
  r8Value,
  r8Type,
  Round8Value,
  Round8Type,
  Round8Error,
  Round8ErrorCode
} from './concepts/round8/model/Round8.model';
