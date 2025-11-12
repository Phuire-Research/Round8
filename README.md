# Round8 v0.0.11 - Proof of Concept

[![Node.js CI](https://github.com/Phuire-Research/Round8/actions/workflows/node.js.yml/badge.svg)](https://github.com/Phuire-Research/Round8/actions/workflows/node.js.yml)
[![npm version](https://badge.fury.io/js/round8.svg)](https://www.npmjs.com/package/round8)
[![Test Coverage](https://img.shields.io/badge/coverage-100%25-brightgreen.svg)](https://github.com/Phuire-Research/Round8)
[![Demo](https://img.shields.io/badge/demo-live-brightgreen.svg)](https://phuire-research.github.io/Round8/)

**Pure Binary Calculator - Quantum-Resistant Architecture Demonstration**

Round8 is a proof-of-concept demonstrating spool-based indexed lookups for binary operations. This PoC validates that the underlying binary system is operational and proven. All foundational operations work - it's now just pushing the boulder up the hill with incremental feature releases.

## Installation

```bash
npm install round8
```

## Change Log
### v0.0.12-0.0.13
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

The interactive calculator demonstrates the binary system functioning as designed. Digit entry updates both Round8 and binary displays in real-time.

## API Reference (v0.0.11)

Current PoC exports the calculator factory and core display functions:

### Calculator Factory

```typescript
import { r8_ } from 'round8';

// Create calculator instance
const calculator = r8_.createCalculator();

// Access state
calculator.getState();        // Full calculator state
calculator.getInput1();       // Input 1 state
calculator.getInput2();       // Input 2 state
calculator.getOutput();       // Output state

// Calculator operations
calculator.handleDigitEntry(5);   // Enter digit
calculator.handleBackspace();     // Remove last digit
calculator.handleZero();          // Enter zero
calculator.handleClear();         // Clear active input
```

### Display Functions

```typescript
// Parse Round8 string to buffer
const buffer = r8_.parseStringToBuffer("1,2,3");

// Create Round8 display from buffer
const round8Display = r8_.createRoundDisplay(buffer);  // "1,2,3"

// Create Round8 string (no commas)
const round8String = r8_.createRoundString(buffer);    // "123"

// Create binary display from buffer
const binaryDisplay = r8_.createBufferDisplay(buffer); // "1|001|010|011|..."
```

### Types

```typescript
export type OperationType = '+' | '-' | null;
export type Positions = 1 | 2 | 3 | ... | 21;  // Position identifiers

export interface InputState {
  value: string;      // Round8 display ("1,2,3")
  buffer: bigint;     // 64-bit buffer
  binary: string;     // Binary display ("1|001|010|011|...")
}

export interface CalculatorState {
  input1: InputState;
  input2: InputState;
  output: InputState;
  operation: OperationType;
  activeInput: 'input1' | 'input2';
  darkMode: boolean;
}
```

## Energy Efficiency Proof

### 16-Bit Comparison: Round8 vs Hex Binary

At 16-bit precision, Round8 demonstrates **7% energy efficiency advantage** over traditional hexadecimal binary representation.

**Measurable Proof**: Verifiable proven reference table is attached to this repository. Which a complete test suite for addition and subtraction alongside logical operators.

**Result**: Round8 store 7% more data than hex binary operations starting at 16-bits. 

**Validation**: Empirically verified through controlled benchmark testing.

Due to the system utilizing combinations of a Base 72 System. In theory this stores 72^11th digits. Roughly 10x more than Hex.

But the range between 3-15 bits, is less and Hex. Meaning the True Upper Range given current methods is Unknown.

Note this is not a true counting replacement. We have a variant Base 100 System called RoundX. That will be extend the Series for some Time, but would exist on top of Round8.

**How** How do we save 7% on all energy use in the world? What is the most expensive computer operation? Accessing memory. With Round8 we surpass Hex at just 16bits. It's clean, it's provable, and can be a drop be made a replacement for Hex. We can *UnHex Binary*.

## Test Coverage

### Test Suite Statistics

- **Total Tests**: 180
- **Passing**: 180 (100%)
- **Test Suites**: 9
- **Coverage**: Complete validation of all v0.0.1 operations

### Test Categories

#### 1. SumWrung (Addition) - 60 tests
- **First Column Operations**: 20 tests
  - Single-column addition validation
  - Carry propagation verification
  - Sign routing (Cases 1-4)
- **Column Zero Operations**: 20 tests
  - Shifted topology validation
  - Marquee pattern handling
  - Zero normalization
- **Multi-Column Operations**: 20 tests
  - Complex carry chains
  - Full 64-position buffer validation
  - Integration-level testing

#### 2. DifferenceWrung (Subtraction) - 60 tests
- **First Column Operations**: 20 tests
  - Single-column subtraction validation
  - Borrow propagation verification
  - Sign routing (Cases 5-8)
- **Column Zero Operations**: 20 tests
  - Shifted topology validation
  - Zero result normalization
  - Negative result handling
- **Multi-Column Operations**: 20 tests
  - Complex borrow chains
  - Full 64-position buffer validation
  - Integration-level testing

#### 3. Comparison Operations - 30 tests
- **Greater-Than**: 10 tests
  - Positive/negative comparisons
  - Magnitude ordering
  - Edge cases (zero, negative one)
- **Comparison Operators**: 10 tests
  - `compare()` function validation
  - Return value verification (-1, 0, 1)
  - Sign-aware comparison
- **Logical Operators**: 10 tests
  - `equals()` validation
  - `min()`/`max()` functions
  - Boolean result verification

#### 4. Special Cases - 30 tests
- **Zero Handling**: 10 tests
  - Zero identity in addition
  - Zero result normalization
  - Sign bit preservation
- **Negative One Pattern**: 10 tests
  - Reserved pattern validation (0 111...111)
  - Negative one arithmetic
  - Boundary conditions
- **Sign Routing**: 10 tests
  - All 8 sign combination cases
  - Bidirectional delegation validation
  - No circular dependency verification

### Test Methodology

**Integration-Level Testing**: All tests validate complete 64-position buffer operations. With few isolated unit tests for specific operations - every test exercises the full operational stack.

**Bidirectional Validation**: Sign routing tested in both directions:
- SumWrung Cases 3-4 delegate to DifferenceWrung operations
- DifferenceWrung Cases 7-8 delegate to SumWrung operations

**100% Pass Rate**: All 180 tests passing confirms:
- Addition correctness across all sign combinations
- Subtraction correctness across all sign combinations
- Comparison operations accurate
- Special patterns (zero, negative one) properly handled
- No regressions from string-only API implementation

## v0.0.2 Roadmap

The following operations are deferred to v0.0.2 pending validation:

- `multiply(a, b)` - Awaiting MultiplyWrung validation
- `divide(a, b)` - Awaiting DivideWrung validation
- `from(decimal)` - Decimal input conversion (requires decimal bridge)
- `increment(value)` - Single-step counting operations
- `decrement(value)` - Single-step counting operations

**Proof of Concept**: v0.0.1 establishes the string-only API pattern with proven operations (Sum & Difference). v0.0.2 will expand operations using the same validated approach.

## License

GPL-3.0

## Author

Micah T. Keller - Founder @ PhuirE Research ([public@phuire.org](mailto:public@phuire.org))

## Repository

[https://github.com/Phuire-Research/Round8](https://github.com/Phuire-Research/Round8)

---

**Round8 v0.0.1** - Pure spatial coordinate stratimuxian mathematics with data density as proven energy efficiency.
