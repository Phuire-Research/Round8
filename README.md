# Round8 v0.0.165 - Proof of Concept

[![Node.js CI](https://github.com/Phuire-Research/Round8/actions/workflows/node.js.yml/badge.svg)](https://github.com/Phuire-Research/Round8/actions/workflows/node.js.yml)
[![npm version](https://badge.fury.io/js/round8.svg)](https://www.npmjs.com/package/round8)
[![Test Coverage](https://img.shields.io/badge/coverage-100%25-brightgreen.svg)](https://github.com/Phuire-Research/Round8)
[![Demo](https://img.shields.io/badge/demo-live-brightgreen.svg)](https://phuire-research.github.io/Round8/)
**Pure Binary Calculator - Quantum-Resistant Architecture Demonstration**

Round8 is a proof-of-concept demonstrating spool-based indexed lookups for binary operations. (Similar to Lattice Boltzmann Method or LBM) This PoC validates that the underlying binary system is operational and proven. All foundational operations work - it's now just pushing the boulder up the hill with incremental feature releases.

## Installation
```bash
npm install round8
```

### Concurrent Projects
1. [Stratimux](https://github.com/Phuire-Research/Stratimux) - Higher Ordered Graph Programming Framework
2. [SCS](https://youtu.be/tNsZyfANW8A) - Proof of Concept Bidirectional Higher Ordered Computation Paradigm.

## Change Log

### v0.0.165 **(HOTFIX)**
- Exported in r8_.anor the BidirectionalConference to be able to determine the associated Muxity of the Wrung.
- Exported the Round8Calculator Type for the Stratimux State Pairing of the Base Enhancement.
- Ensured the Stratimux Round8 Concept Qualities have a Method Creator for Usage in ActionStrategies.
- Enhanced differencing during a maximum difference case of equal length wrungs.

### v0.0.15
**Stratimux Concept Integration** - Muxified state management for Round8 operations.

**New Features:**
- `createRound8Concept()` - Factory for creating Round8 Stratimux Concept
- Flat array calculator architecture with unlimited instances
- Calculator routing via unique ID system
- 11 qualities for calculator operations (create, input, calculate, clear, etc.)
- All qualities traverse shared `r8_` manifold

**Architecture:**
- Muxified Singletons pattern - qualities share computational manifold
- Two-input calculator design preserved
- Independent state per calculator instance
- Foundation for compositional expansion

**Testing:**
- New `round8-stratimux.test.ts` suite with 5 tests
- Tests flat array architecture and ID routing
- 393 total tests (up from 388)

### v0.0.14
**Documentation Update** - Comment renewal based on working test suite.

**Documentation Changes:**
- Spool Manifolds documented with lookup table mechanics
- Position 21 shifted frame operations annotated
- Binary Operand Bias formulas clarified
- Test suite renamed to `mapping-display.test.ts`
- 388 tests passing

**v0.0.14 Features:**
**Public API Complete** - Round8 breadboard fully accessible with organized categories.

**New Operations:**
- `r8_.operations.add(a, b)` - Addition via muxifyWrung orchestration
- `r8_.operations.subtract(a, b)` - Subtraction via muxifyWrung orchestration
- `r8_.operations.increment(value)` - Single-step increment (value + 1)
- `r8_.operations.decrement(value)` - Single-step decrement (value - 1)
- `r8_.operations.muxifyWrung(op, a, b)` - Core arithmetic operation router

**Logical Operations:**
- `r8_.logical.equals(a, b)` - Equality comparison
- `r8_.logical.notEquals(a, b)` - Inequality comparison
- `r8_.logical.greaterThan(a, b)` - Greater than comparison
- `r8_.logical.lessThan(a, b)` - Less than comparison
- `r8_.logical.greaterThanOrEqual(a, b)` - Greater than or equal
- `r8_.logical.lessThanOrEqual(a, b)` - Less than or equal

**ANOR Operations:**
- `r8_.anor.anor()` - Rotation-level range membership analysis
- `r8_.anor.anorWrung()` - Wrung-level range membership analysis
- `r8_.anor.compareMagnitude()` - Sign-agnostic magnitude comparison
- `r8_.anor.determineEffectiveOperation()` - Operation routing based on signs

**Calculator Enhancements:**
- `handleIncrement()` - Increment active input by 1
- `handleDecrement()` - Decrement active input by 1

**Developer Types Exported:**
- `BitRotationTuple` - 3-bit column value type
- `WrungMuxity` - Quality-First self-referential container
- `ResultMuxity` - Forward-only computation record

**Testing:**
- 373 total tests (up from 324)
- 16 new calculator operation tests
- 33 new r8 API integration tests
- 100% test coverage maintained

### v0.0.1-0.0.13
Hunted down a hallucinated tests that reversed or did not prepare our signed output properly. Now Aligned.

## What This PoC Demonstrates
This proof-of-concept validates:
1. **Spool-Based Value Lookups** - All numeral values come from pre-computed indexed lookups (NumeralStore), not binary arithmetic
2. **Relative Position Addressing** - Bit shifts used exclusively for placing 3-bit values at correct buffer positions
3. **Dual Display Validation** - Round8 ↔ Binary correspondence proven operational
4. **Marquee Delimiter System** - Delimiter-aware parsing with shifted frame at position 21
5. **Calculator Interface** - Working digit entry, backspace, display rendering
**Critical Architectural Note**: Shifts (`<<`) are used for **relative position addressing only** - placing spooled values at their buffer positions. No binary operand calculations (shift/OR/AND for value computation). Values themselves come from indexed spool lookups.
**Try the Live Demo**: [https://phuire-research.github.io/Round8/](https://phuire-research.github.io/Round8/)

The interactive calculator demonstrates the binary system functioning as designed. Digit entry updates both Round8 and binary displays in real-time. Storing the Round8 Number only in Binary for all Operations.

## Energy Efficiency Proof
### 16-Bit Comparison: Round8 vs Hex Binary
At 16-bit precision, Round8 demonstrates **7% energy efficiency advantage** over traditional hexadecimal binary representation.

**Measurable Proof**: Verifiable proven reference table is attached to this repository. Which a complete test suite for addition and subtraction alongside logical operators.
**Result**: Round8 store 7% more data than hex binary at all bit ranges.
**Validation**: Empirically verified through controlled benchmark testing.

Note this is not a Number replacement. We have a variant Base 100 System called RoundX. That will be extend the Series for some Time, but would exist on top of Round8.

**Why?** What can we save if we factor in all computation and communications it factors out to a rising 6% of a nation's energy use. What is the most expensive computer operation? Accessing memory. With Round8 we Hex across the board at a minimum of 7% **More Value** in the same Space. It's clean, it's provable, and can be a drop be made a replacement for Hex. We can _UnHex Binary_.

But 7% is only the beginning as the means of being Quantum resistant also brings another jaw breaking cost savings. That we cannot disclose.

# Road Map

## v0.0.15 -> v0.0.16
Determining the most effective Round8 to Decimal Conversion without Look Up Table. Currently building out the initial dataset to validate potential algorithms. Already have the means for multiplication and the following lined up, but currently focusing on the most practical aspect of hex being able to convert to decimal. Where Round8 has friction due to fundamental differences in the design of the Number System.

## v0.0.17
- `multiply(a, b)` - Awaiting MultiplyWrung validation

## v0.0.18
- Round8 Decimals
- `divide(a, b)` - Awaiting DivideWrung validation

## v0.0.2+
- `from(decimal)` - Decimal input conversion (As of 0.0.14's progress have a method to handle the conversion)

# Stratimux Theorem's
1. Proportional Spherical Measurement and Round Framework
2. Interchangeable Thirds and Spatial Proportional Reality
3. Stratimuxian Manifolds - Complete Circular Reference Through Type System Delimitation

## Supporting Documents
1. [ANOR and Muxification: Foundation of Stratimuxian Mathematics](https://github.com/Phuire-Research/Round8/blob/master/ANOR-MUXIFICATION-STRATIMUXIAN-MATHEMATICS-FOUNDATION.md) - Quality-First mathematical foundation
2. [Three-Columns Verified](https://raw.githubusercontent.com/Phuire-Research/Round8/refs/heads/master/Three-Columns-Verified.md)
3. [Round8 by 11rds Multiplied to Max](https://github.com/Phuire-Research/Round8/blob/master/Round8%208%20by%2011rds%20Multiplied%20to%20Max.md)
4. [UnHex Binary](https://github.com/Phuire-Research/Round8/blob/master/UnHex%20Binary.md)

**Proof of Concept**: v0.0.1 establishes the string-only API pattern with proving our Spool Manifold Method. v0.0.14-17+ will expand operations using the same validated approach.

## Test Coverage
**Status**: 15/15 Test Suites ✅ | 373/373 Tests ✅ | 100% Coverage

Round8 v0.0.14 validates complete foundation architecture across three tiers, proving all core operations including public API and calculator enhancements.

### Architectural Validation (Foundation → Operations → Tests)
**Tier 0 - Foundation** (100% Validated ✅)
- Sign-at-Origin architecture (bit 0 anchor, upward expansion)
- Quality-First ANOR mathematics (magnitude before operations)
- Muxity pattern consistency (ResultMuxity forward-only, WrungMuxity self-referential)
**Tier 1 - Core Operations** (100% Validated ✅)
- Magnitude comparison (sign-agnostic via compareMagnitude)
- Sign routing (sign-aware via determineEffectiveOperation)
- Signed arithmetic (sum/difference with all sign combinations)
- Quality container pattern (WrungMuxity self-referential containers)

**Tier 2 - Test Infrastructure** (100% Validated ✅)
- Round8-native test tools (getRegularBitRotation, not binary reimplementation)
- Quality-First test patterns (validate tools, not binary logic)
- Complete coverage (all operations, all sign cases, all edge conditions)

### Test Suite Summary
| Suite | Tests | Purpose | Validates |
|-------|-------|---------|-----------|
| **muxifyWrung.test.ts** | 125 | Signed arithmetic routing | All 8 operation+sign combinations, WrungMuxity pattern |
| **anorWrung.test.ts** | 29 | ANOR magnitude comparison | Sign-agnostic compareMagnitude, Quality-First tier separation |
| **comparison-operators.test.ts** | 60 | Derived comparisons | >=, <=, != built from base operations |
| **greater-than-wrung.test.ts** | 60 | Base comparisons | >, < using independent spools |
| **calculator.operations.test.ts** | 16 | **v0.0.14** Calculator increment/decrement | Composing functions orchestrating muxifyWrung |
| **r8.api.test.ts** | 33 | **v0.0.14** Public API integration | All categories (conference, operations, logical, anor, terminology) |
| **bidirectionalConference.test.ts** | ~30 | String parsing | Round8 ↔ Buffer conversion, Marquee delimiters |
| **anorBenefits.test.ts** | ~20 | ANOR foundation | Quality-First mathematics principles |
| **+ 7 additional suites** | ~40 | Complete infrastructure | MaskStore, NumeralStore, Spools, terminology |

### Round8-Native Testing Philosophy
**Total Binary Replacement**: Tests use Round8's native tools (getRegularBitRotation, NumeralStore, Spools), not binary logic reimplementation. This proves Round8 tools validate Round8 operations using Round8's own infrastructure.

### Muxity Pattern Validation
Round8 validates **self-referential quality containers** across all operations:
- **ResultMuxity** - Forward-only computation record with operation metadata
- **WrungMuxity** - Quality knows its own wrung (eliminates undefined checks)
- **Pattern Consistency** - Enables compositional quality routing

### Run Tests
```bash
npm test
```

**Expected**: `Test Suites: 15 passed | Tests: 373 passed | Time: ~0.8s`

## License
GPL-3.0

## Author
Micah T. Keller - Founder @ PhuirE Research ([public@phuire.org](mailto:public@phuire.org))

## Repository
[https://github.com/Phuire-Research/Round8](https://github.com/Phuire-Research/Round8)

---

**Round8** - Pure spatial coordinate stratimuxian mathematics with data density as proven energy efficiency.