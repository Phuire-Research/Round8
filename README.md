# Round8 v0.0.11 - Proof of Concept

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

## Change Log
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

**Why?** What can we save if we factor in all computation and communications it factors out to a rising 6% of a nation's energy use. What is the most expensive computer operation? Accessing memory. With Round8 we Hex across the board at a minimum of 7% **More Value** in the same Space. It's clean, it's provable, and can be a drop be made a replacement for Hex. We can *UnHex Binary*.

But 7% is only the beginning as the means of being Quantum resistant also brings another jaw breaking cost savings. That we cannot disclose. 

# Road Map
## v0.0.14
- `add(a, b)` - Awaiting MultiplyWrung validation
- `increment(value)` - Single-step counting operations
- All Logical Operations
- `subtract(a, b)` - Awaiting MultiplyWrung validation
- `decrement(value)` - Single-step counting operations
## v0.0.15
- `multiply(a, b)` - Awaiting MultiplyWrung validation
## v0.0.16
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

## License

GPL-3.0

## Author

Micah T. Keller - Founder @ PhuirE Research ([public@phuire.org](mailto:public@phuire.org))

## Repository

[https://github.com/Phuire-Research/Round8](https://github.com/Phuire-Research/Round8)

---

**Round8 v0.0.1** - Pure spatial coordinate stratimuxian mathematics with data density as proven energy efficiency.
