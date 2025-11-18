# Changelog

All notable changes to Round8 will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.0.14] - 2025-11-17

### Added

**Public API - Organized Breadboard Access**
- `r8_.operations` category - Arithmetic operations with muxifyWrung orchestration
  - `add(a, b)` - Addition composing function
  - `subtract(a, b)` - Subtraction composing function
  - `increment(value)` - Single-step increment (value + 1)
  - `decrement(value)` - Single-step decrement (value - 1)
  - `muxifyWrung(op, a, b)` - Core operation router (exported for direct access)

- `r8_.logical` category - Comparison operators
  - `equals(a, b)` - Equality comparison (==)
  - `notEquals(a, b)` - Inequality comparison (!=)
  - `greaterThan(a, b)` - Greater than comparison (>)
  - `lessThan(a, b)` - Less than comparison (<)
  - `greaterThanOrEqual(a, b)` - Greater than or equal (>=)
  - `lessThanOrEqual(a, b)` - Less than or equal (<=)

- `r8_.anor` category - Magnitude analysis and operation routing
  - `anor()` - Rotation-level range membership analysis
  - `anorWrung()` - Wrung-level range membership analysis
  - `compareMagnitude()` - Sign-agnostic magnitude comparison
  - `determineEffectiveOperation()` - Operation routing based on operand signs

- `r8_.conference` category - Display formatting and parsing (existing, now categorized)
- `r8_.terminology` category - Low-level primitives (existing, now categorized)

**Calculator Enhancements**
- `handleIncrement()` - Increment active input by 1 (orchestrates r8_.operations.increment)
- `handleDecrement()` - Decrement active input by 1 (orchestrates r8_.operations.decrement)

**Developer Type Exports**
- `BitRotationTuple` - 3-bit column value tuple type `[0|1, 0|1, 0|1]`
- `WrungMuxity` - Quality-First self-referential wrung container
- `ResultMuxity` - Forward-only computation record with operation metadata

**Test Suites**
- `calculator.operations.test.ts` - 16 tests validating increment/decrement composing functions
- `r8.api.test.ts` - 33 tests validating all public API categories and cross-category integration

### Changed

- **API Organization**: Reorganized `r8_` object into functional categories (operations, logical, anor, conference, terminology)
- **Test Coverage**: Increased from 324 to 373 tests (+49 tests)
- **Test Suites**: Increased from 13 to 15 suites (+2 suites)
- **Calculator Version**: Updated from v0.0.11 to v0.0.14
- **Package Version**: Bumped from v0.0.13 to v0.0.14
- **README.md**: Updated Test Coverage section with v0.0.14 suites, roadmap status

### Architecture

**Composing Functions Pattern**
- `increment` and `decrement` are composing functions that orchestrate `muxifyWrung`
- Validates foundation: higher-level operations built from proven base operations
- Pattern: `r8_.operations.increment = (value) => muxifyWrung('+', value, parseStringToBuffer('1'))`

**Breadboard vs User Interface Design**
- **r8_** = Breadboard - Low-level access to all Round8 operations, direct buffer manipulation, terminology primitives
- **Calculator** = User-Friendly Interface - High-level composable operations, state management, multiple instances

**Quality-First Muxification**
- All operations maintain WrungMuxity self-referential containers
- ResultMuxity forward-only computation records
- ANOR magnitude comparison before operation routing

### Testing

- **373/373 tests passing** (100% coverage maintained)
- **Foundation tests**: 324 (unchanged - all passing)
- **NEW calculator.operations.test.ts**: 16 tests
  - Increment/decrement basic operations
  - Sign flip validation (positive ↔ negative)
  - ActiveInput targeting (input1 vs input2)
  - Roundtrip cycle validation
- **NEW r8.api.test.ts**: 33 tests
  - Public API export validation
  - Conference category (display formatting, parsing)
  - Operations category (add, subtract, increment, decrement)
  - Logical category (all comparison operators)
  - ANOR category (magnitude analysis)
  - Terminology category (low-level primitives)
  - Cross-category integration tests

### Documentation

- Updated README.md Test Coverage section (373 tests, 15 suites)
- Added v0.0.14 changelog entry in README.md
- Removed completed v0.0.14 items from Road Map
- Created CHANGELOG.md with detailed release notes

---

## [0.0.13] - 2025-11-16

### Fixed
- Hunted down hallucinated tests that reversed or did not prepare signed output properly
- All signed arithmetic tests now aligned with correct magnitude comparison behavior

### Testing
- 324/324 tests passing (100% coverage)
- 13 test suites validating complete foundation

---

## [0.0.1] - [0.0.12]

Initial proof-of-concept releases establishing:
- Spool-based indexed lookups (NumeralStore)
- Sign-at-Origin architecture
- Marquee delimiter system
- Dual display validation (Round8 ↔ Binary)
- Calculator interface foundation
