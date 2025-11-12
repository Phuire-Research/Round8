"use strict";
var Round8Calculator = (() => {
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __export = (target, all) => {
    for (var name in all)
      __defProp(target, name, { get: all[name], enumerable: true });
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

  // demo/calculator.ts
  var calculator_exports = {};
  __export(calculator_exports, {
    initializeCalculator: () => initializeCalculator
  });

  // src/concepts/round8/model/terminology.ts
  var Round8Cases = /* @__PURE__ */ ((Round8Cases2) => {
    Round8Cases2[Round8Cases2["ZERO_CASE"] = 0] = "ZERO_CASE";
    Round8Cases2[Round8Cases2["POSITIVE_TWIST_CASE"] = 1] = "POSITIVE_TWIST_CASE";
    Round8Cases2[Round8Cases2["NEGATIVE_TWIST_CASE"] = 2] = "NEGATIVE_TWIST_CASE";
    return Round8Cases2;
  })(Round8Cases || {});
  var Round8CasesArray = [
    BigInt(0) * 64n,
    BigInt(1) * 64n,
    BigInt(2) * 64n
  ];
  var getSignBit = (buffer) => {
    return (buffer & MaskStore.SIGN) === 1n ? 1 : 0;
  };
  var clearSignBit = (buffer) => {
    return buffer & ClearMaskStore.SIGN;
  };
  var setSignBit = (buffer) => {
    return buffer | MaskStore.SIGN;
  };
  var flipSignBit = (buffer) => {
    return buffer ^ MaskStore.SIGN;
  };
  var createBuffer = () => {
    return 0n;
  };
  var Round8CaseStore = (() => {
    let store = 0n;
    const zeroCase = 0n;
    const positiveTwistCase = 0x1fffffffffffffffn;
    const negativeTwistCase = 0x0n;
    store |= zeroCase;
    store |= positiveTwistCase << 64n;
    store |= negativeTwistCase << 128n;
    return store;
  })();
  var Round8Numerals = Uint8Array.from([
    1,
    // [0] Marquee: Displays as 1
    0,
    // [1] Round8 1: Regular value 0
    1,
    // [2] Round8 2: Regular value 1
    2,
    // [3] Round8 3: Regular value 2
    3,
    // [4] Round8 4: Regular value 3
    4,
    // [5] Round8 5: Regular value 4
    5,
    // [6] Round8 6: Regular value 5
    6,
    // [7] Round8 7: Regular value 6
    7
    // [8] Round8 8: Regular value 7
  ]);
  var WorkingBigIntBucket = { content: 0n };
  var getRound8Case = (caseType) => {
    const offset = Round8CasesArray[caseType];
    return Round8CaseStore >> offset & (1n << 64n) - 1n;
  };
  var MaskStore = {
    SIGN: 1n << 0n,
    // Sign bit: bit 0 (ORIGIN ANCHOR - NEVER MOVES)
    P1: 0b111n << 1n,
    // Position 1: bits 1-3
    P2: 0b111n << 4n,
    // Position 2: bits 4-6
    P3: 0b111n << 7n,
    // Position 3: bits 7-9
    P4: 0b111n << 10n,
    // Position 4: bits 10-12
    P5: 0b111n << 13n,
    // Position 5: bits 13-15
    P6: 0b111n << 16n,
    // Position 6: bits 16-18
    P7: 0b111n << 19n,
    // Position 7: bits 19-21
    P8: 0b111n << 22n,
    // Position 8: bits 22-24
    P9: 0b111n << 25n,
    // Position 9: bits 25-27
    P10: 0b111n << 28n,
    // Position 10: bits 28-30
    P11: 0b111n << 31n,
    // Position 11: bits 31-33
    P12: 0b111n << 34n,
    // Position 12: bits 34-36
    P13: 0b111n << 37n,
    // Position 13: bits 37-39
    P14: 0b111n << 40n,
    // Position 14: bits 40-42
    P15: 0b111n << 43n,
    // Position 15: bits 43-45
    P16: 0b111n << 46n,
    // Position 16: bits 46-48
    P17: 0b111n << 49n,
    // Position 17: bits 49-51
    P18: 0b111n << 52n,
    // Position 18: bits 52-54
    P19: 0b111n << 55n,
    // Position 19: bits 55-57
    P20: 0b111n << 58n,
    // Position 20: bits 58-60
    P21: 0b111n << 61n
    // Position 21: bits 61-63 (64-bit boundary)
    // EXPANSION READY - Positions 22+ continue upward infinitely
  };
  var ClearMaskStore = {
    SIGN: ~(1n << 0n),
    // Clear sign bit
    P1: ~(0b111n << 1n),
    // Clear position 1
    P2: ~(0b111n << 4n),
    // Clear position 2
    P3: ~(0b111n << 7n),
    // Clear position 3
    P4: ~(0b111n << 10n),
    // Clear position 4
    P5: ~(0b111n << 13n),
    // Clear position 5
    P6: ~(0b111n << 16n),
    // Clear position 6
    P7: ~(0b111n << 19n),
    // Clear position 7
    P8: ~(0b111n << 22n),
    // Clear position 8
    P9: ~(0b111n << 25n),
    // Clear position 9
    P10: ~(0b111n << 28n),
    // Clear position 10
    P11: ~(0b111n << 31n),
    // Clear position 11
    P12: ~(0b111n << 34n),
    // Clear position 12
    P13: ~(0b111n << 37n),
    // Clear position 13
    P14: ~(0b111n << 40n),
    // Clear position 14
    P15: ~(0b111n << 43n),
    // Clear position 15
    P16: ~(0b111n << 46n),
    // Clear position 16
    P17: ~(0b111n << 49n),
    // Clear position 17
    P18: ~(0b111n << 52n),
    // Clear position 18
    P19: ~(0b111n << 55n),
    // Clear position 19
    P20: ~(0b111n << 58n),
    // Clear position 20
    P21: ~(0b111n << 61n)
    // Clear position 21
  };
  var BitOffsetStore = {
    P1: 1n,
    // Position 1 starts at bit 1
    P2: 4n,
    // Position 2 starts at bit 4
    P3: 7n,
    // Position 3 starts at bit 7
    P4: 10n,
    // Position 4 starts at bit 10
    P5: 13n,
    // Position 5 starts at bit 13
    P6: 16n,
    // Position 6 starts at bit 16
    P7: 19n,
    // Position 7 starts at bit 19
    P8: 22n,
    // Position 8 starts at bit 22
    P9: 25n,
    // Position 9 starts at bit 25
    P10: 28n,
    // Position 10 starts at bit 28
    P11: 31n,
    // Position 11 starts at bit 31
    P12: 34n,
    // Position 12 starts at bit 34
    P13: 37n,
    // Position 13 starts at bit 37
    P14: 40n,
    // Position 14 starts at bit 40
    P15: 43n,
    // Position 15 starts at bit 43
    P16: 46n,
    // Position 16 starts at bit 46
    P17: 49n,
    // Position 17 starts at bit 49
    P18: 52n,
    // Position 18 starts at bit 52
    P19: 55n,
    // Position 19 starts at bit 55
    P20: 58n,
    // Position 20 starts at bit 58
    P21: 61n
    // Position 21 starts at bit 61
  };
  var getBitOffsetForPosition = (position) => {
    switch (position) {
      case 1:
        return BitOffsetStore.P1;
      case 2:
        return BitOffsetStore.P2;
      case 3:
        return BitOffsetStore.P3;
      case 4:
        return BitOffsetStore.P4;
      case 5:
        return BitOffsetStore.P5;
      case 6:
        return BitOffsetStore.P6;
      case 7:
        return BitOffsetStore.P7;
      case 8:
        return BitOffsetStore.P8;
      case 9:
        return BitOffsetStore.P9;
      case 10:
        return BitOffsetStore.P10;
      case 11:
        return BitOffsetStore.P11;
      case 12:
        return BitOffsetStore.P12;
      case 13:
        return BitOffsetStore.P13;
      case 14:
        return BitOffsetStore.P14;
      case 15:
        return BitOffsetStore.P15;
      case 16:
        return BitOffsetStore.P16;
      case 17:
        return BitOffsetStore.P17;
      case 18:
        return BitOffsetStore.P18;
      case 19:
        return BitOffsetStore.P19;
      case 20:
        return BitOffsetStore.P20;
      case 21:
        return BitOffsetStore.P21;
      default:
        return BitOffsetStore.P1;
    }
  };
  var getBitWiseMaskForPosition = (position) => {
    switch (position) {
      case 1:
        return MaskStore.P1;
      case 2:
        return MaskStore.P2;
      case 3:
        return MaskStore.P3;
      case 4:
        return MaskStore.P4;
      case 5:
        return MaskStore.P5;
      case 6:
        return MaskStore.P6;
      case 7:
        return MaskStore.P7;
      case 8:
        return MaskStore.P8;
      case 9:
        return MaskStore.P9;
      case 10:
        return MaskStore.P10;
      case 11:
        return MaskStore.P11;
      case 12:
        return MaskStore.P12;
      case 13:
        return MaskStore.P13;
      case 14:
        return MaskStore.P14;
      case 15:
        return MaskStore.P15;
      case 16:
        return MaskStore.P16;
      case 17:
        return MaskStore.P17;
      case 18:
        return MaskStore.P18;
      case 19:
        return MaskStore.P19;
      case 20:
        return MaskStore.P20;
      case 21:
        return MaskStore.P21;
      default:
        return MaskStore.P1;
    }
  };
  var extractBitTuple = (buffer, position) => {
    const mask = getBitWiseMaskForPosition(position);
    const bitOffset = getBitOffsetForPosition(position);
    const threeBits = Number((buffer & mask) >> bitOffset);
    return [
      threeBits & 1,
      // Bit 0 (LSB of 3-bit group)
      threeBits >> 1 & 1,
      // Bit 1
      threeBits >> 2 & 1
      // Bit 2 (MSB of 3-bit group)
    ];
  };
  var getClearMaskForPosition = (position) => {
    switch (position) {
      case 1:
        return ClearMaskStore.P1;
      case 2:
        return ClearMaskStore.P2;
      case 3:
        return ClearMaskStore.P3;
      case 4:
        return ClearMaskStore.P4;
      case 5:
        return ClearMaskStore.P5;
      case 6:
        return ClearMaskStore.P6;
      case 7:
        return ClearMaskStore.P7;
      case 8:
        return ClearMaskStore.P8;
      case 9:
        return ClearMaskStore.P9;
      case 10:
        return ClearMaskStore.P10;
      case 11:
        return ClearMaskStore.P11;
      case 12:
        return ClearMaskStore.P12;
      case 13:
        return ClearMaskStore.P13;
      case 14:
        return ClearMaskStore.P14;
      case 15:
        return ClearMaskStore.P15;
      case 16:
        return ClearMaskStore.P16;
      case 17:
        return ClearMaskStore.P17;
      case 18:
        return ClearMaskStore.P18;
      case 19:
        return ClearMaskStore.P19;
      case 20:
        return ClearMaskStore.P20;
      case 21:
        return ClearMaskStore.P21;
      default:
        return ~0n;
    }
  };
  var setNumeralProperty = (number) => {
    switch (number) {
      case 0:
        return 0n;
      case 1:
        return 1n;
      case 2:
        return 2n;
      case 3:
        return 3n;
      case 4:
        return 4n;
      case 5:
        return 5n;
      case 6:
        return 6n;
      case 7:
        return 7n;
      default: {
        throw "CRITICAL RANGE SET NUMBER ERROR";
      }
    }
  };
  var extractValueTuple = (value) => {
    const bits = Number(value & 0b111n);
    return [
      bits & 1,
      // Bit 0 (LSB)
      bits >> 1 & 1,
      // Bit 1
      bits >> 2 & 1
      // Bit 2 (MSB)
    ];
  };
  var MARQUEE_TUPLE = extractValueTuple(setNumeralProperty(1));
  var NumeralStore = {
    Marquee: setNumeralProperty(Round8Numerals[0]),
    One: setNumeralProperty(Round8Numerals[1]),
    Two: setNumeralProperty(Round8Numerals[2]),
    Three: setNumeralProperty(Round8Numerals[3]),
    Four: setNumeralProperty(Round8Numerals[4]),
    Five: setNumeralProperty(Round8Numerals[5]),
    Six: setNumeralProperty(Round8Numerals[6]),
    Seven: setNumeralProperty(Round8Numerals[7]),
    Eight: setNumeralProperty(Round8Numerals[8])
  };
  var ShiftedNumeralStore = {
    Marquee: setNumeralProperty(Round8Numerals[0]),
    One: setNumeralProperty(Round8Numerals[2]),
    Two: setNumeralProperty(Round8Numerals[3]),
    Three: setNumeralProperty(Round8Numerals[4]),
    Four: setNumeralProperty(Round8Numerals[5]),
    Five: setNumeralProperty(Round8Numerals[6]),
    Six: setNumeralProperty(Round8Numerals[7]),
    Seven: setNumeralProperty(Round8Numerals[8]),
    // Should Invalidate to Full Twist in Shifted Position
    Eight: setNumeralProperty(Round8Numerals[8])
  };
  var NumeralSeries = [
    extractValueTuple(NumeralStore.One),
    // Binary 0n → [0,0,0]
    extractValueTuple(NumeralStore.Two),
    // Binary 1n → [1,0,0]
    extractValueTuple(NumeralStore.Three),
    // Binary 2n → [0,1,0]
    extractValueTuple(NumeralStore.Four),
    // Binary 3n → [1,1,0]
    extractValueTuple(NumeralStore.Five),
    // Binary 4n → [0,0,1]
    extractValueTuple(NumeralStore.Six),
    // Binary 5n → [1,0,1]
    extractValueTuple(NumeralStore.Seven),
    // Binary 6n → [0,1,1]
    extractValueTuple(NumeralStore.Eight)
    // Binary 7n → [1,1,1]
  ];
  var ShiftedNumeralSeries = [
    extractValueTuple(NumeralStore.Marquee),
    extractValueTuple(NumeralStore.Three),
    extractValueTuple(NumeralStore.Four),
    extractValueTuple(NumeralStore.Five),
    extractValueTuple(NumeralStore.Six),
    extractValueTuple(NumeralStore.Seven),
    extractValueTuple(NumeralStore.Eight),
    extractValueTuple(NumeralStore.One)
  ];
  var Numerals = [
    1,
    2,
    3,
    4,
    5,
    6,
    7,
    8
  ];
  var ShiftedNumerals = [
    0,
    1,
    2,
    3,
    4,
    5,
    6,
    7,
    0
    // Marquee Position and Error as Logic Should Guard Against this Case
  ];
  var StringNumerals = [
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8"
  ];
  var ShiftedStringNumerals = [
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "0"
    // Marquee Position and Error as Logic Should Guard Against this Case
  ];
  var initializeSpooledWrung = () => {
    const arr = [];
    for (let i = 0; i < 2; i++) {
      arr[i] = [];
      for (let j = 0; j < 2; j++) {
        arr[i][j] = [];
      }
    }
    return arr;
  };
  var spooledNumerals = initializeSpooledWrung();
  var spooledShiftedNumerals = initializeSpooledWrung();
  var spooledStringNumerals = initializeSpooledWrung();
  var spooledShiftedStringNumerals = initializeSpooledWrung();
  var spool = (informativeSeries, baseSeries, spooled) => {
    informativeSeries.forEach((informative, i) => {
      const one = informative[0];
      const two = informative[1];
      const three = informative[2];
      const value = baseSeries[i];
      spooled[one][two][three] = value;
    });
  };
  spool(NumeralSeries, Numerals, spooledNumerals);
  spool(ShiftedNumeralSeries, ShiftedNumerals, spooledShiftedNumerals);
  spool(NumeralSeries, StringNumerals, spooledStringNumerals);
  spool(ShiftedNumeralSeries, ShiftedStringNumerals, spooledShiftedStringNumerals);
  var getRegularBitRotation = (position) => {
    return NumeralSeries[position - 1];
  };
  var getRegularRotation = (position) => {
    return Round8Numerals[position];
  };
  var getShiftedBitRotation = (position) => {
    return ShiftedNumeralSeries[position];
  };
  var getShiftedRotation = (position) => {
    const index = position === 7 ? 1 : position + 2;
    return Round8Numerals[index];
  };
  var getMarqueeBitRotation = () => {
    return extractValueTuple(NumeralStore.Two);
  };
  var MarqueeRotation = Round8Numerals[0];
  var getRotationValue = (buffer, position) => {
    const [b0, b1, b2] = extractBitTuple(buffer, position);
    return spooledNumerals[b0][b1][b2];
  };
  var getRotationString = (buffer, position) => {
    const [b0, b1, b2] = extractBitTuple(buffer, position);
    return spooledStringNumerals[b0][b1][b2];
  };
  var applyNumeralRotation = (value, buffer, position) => {
    let finalValue;
    switch (value) {
      case 0: {
        finalValue = NumeralStore.One;
        break;
      }
      case 1: {
        finalValue = NumeralStore.Two;
        break;
      }
      case 2: {
        finalValue = NumeralStore.Three;
        break;
      }
      case 3: {
        finalValue = NumeralStore.Four;
        break;
      }
      case 4: {
        finalValue = NumeralStore.Five;
        break;
      }
      case 5: {
        finalValue = NumeralStore.Six;
        break;
      }
      case 6: {
        finalValue = NumeralStore.Seven;
        break;
      }
      case 7: {
        finalValue = NumeralStore.Eight;
        break;
      }
      default: {
        throw "CRITICAL";
      }
    }
    WorkingBigIntBucket.content = finalValue;
    const clearMask = getClearMaskForPosition(position);
    const bitOffset = getBitOffsetForPosition(position);
    WorkingBigIntBucket.content <<= bitOffset;
    return buffer & clearMask | WorkingBigIntBucket.content;
  };
  var scanUpward = (buffer, callback, position = 1) => {
    const shouldContinue = callback(buffer, position);
    if (!shouldContinue) {
      return position;
    }
    if (position === 21) {
      return 0;
    }
    return scanUpward(buffer, callback, position + 1);
  };
  var scanDownward = (buffer, callback, position = 21) => {
    const shouldContinue = callback(buffer, position);
    if (!shouldContinue) {
      return position;
    }
    if (position === 1) {
      return 0;
    }
    return scanDownward(buffer, callback, position - 1);
  };

  // src/concepts/round8/model/bidirectional.ts
  var NEGATIVE_ONE_STRIKE_SWEEP = [
    21,
    // Strike 1: Highest position (expansion bound, most variation)
    20,
    1,
    // Strike 2: Lowest position (near origin)
    11,
    // Strike 3: Middle bisection
    12,
    10,
    // Strikes 4-5: Alternating outward from middle
    13,
    9,
    // Strikes 6-7
    14,
    8,
    // Strikes 8-9
    15,
    7,
    // Strikes 10-11
    16,
    6,
    // Strikes 12-13
    17,
    5,
    // Strikes 14-15
    18,
    4,
    // Strikes 16-17
    19,
    3,
    // Strikes 18-19
    2
    // Strikes 20-21
  ];
  var zeroAnorOne = (buffer) => {
    const signBit = getSignBit(buffer);
    let between = false;
    let same = false;
    let aim = -1;
    const composition = [
      {
        order: [],
        congruent: false
      },
      {
        order: [],
        congruent: false
      },
      {
        order: [],
        congruent: false
      }
    ];
    NEGATIVE_ONE_STRIKE_SWEEP.forEach((position, i) => {
      if (between) {
        return;
      }
      const [b0, b1, b2] = extractBitTuple(buffer, position);
      if (b0 === 0 && b1 === 0 && b2 === 0) {
        if (!same) {
          composition[0].order.push(position);
          composition[0].congruent = true;
          same = true;
          aim = 0;
        } else if (same && aim !== 0) {
          composition[0].congruent = false;
          composition[1].congruent = false;
          between = true;
          return;
        } else if (same) {
          composition[0].order.push(position);
        }
      } else if (b0 === 1 && b1 === 1 && b2 === 1) {
        if (!same) {
          composition[1].order.push(position);
          composition[1].congruent = true;
          aim = 1;
        } else if (same && aim !== 1) {
          composition[0].congruent = false;
          composition[1].order.push(position);
          composition[1].congruent = false;
          between = true;
          composition[2].order = [...NEGATIVE_ONE_STRIKE_SWEEP].splice(i + 1);
          return;
        } else if (same) {
          composition[1].order.push(position);
        }
      }
    });
    return [
      signBit === 0,
      composition[0].order.length === 21 && signBit === 0,
      composition
    ];
  };
  var BidirectionalConference = (buffer) => {
    const [m0, m1, m2] = MARQUEE_TUPLE;
    const [isNegative, isOrigin, composition] = zeroAnorOne(buffer);
    if (isOrigin) {
      return {
        isAbsoluteZero: true,
        firstValidRotation: 1
      };
    }
    let marqueePosition;
    let firstValidPosition = -1;
    const startTwist = composition[0].order[0] === 21;
    if (startTwist && composition[1].order.length >= 1) {
      composition[2].order.forEach((position) => {
        const [b0, b1, b2] = extractBitTuple(buffer, position);
        if (!(b0 === 1 && b1 === 1 && b2 === 1)) {
          composition[1].congruent = false;
          return;
        } else {
          composition[1].congruent = true;
          composition[1].order.push(position);
        }
      });
    }
    const isFinalTwist = composition[0].congruent === false && composition[1].congruent && composition[1].order.length === 20;
    if (isFinalTwist) {
      return {
        isNegative,
        isFinalTwist,
        marqueeRotation: 22,
        firstValidRotation: 21
      };
    }
    scanDownward(buffer, (buf, pos) => {
      const [b0, b1, b2] = extractBitTuple(buf, pos);
      if (pos === 21) {
        if (b0 === m0 && b1 === m1 && b2 === m2) {
          marqueePosition = 21;
          firstValidPosition = 20;
          return false;
        } else if (spooledShiftedNumerals[b1][b1][b2] !== 7) {
          marqueePosition = 22;
          firstValidPosition = 21;
          return false;
        }
      } else if (b0 === m0 && b1 === m1 && b2 === m2) {
        marqueePosition = pos;
        firstValidPosition = pos - 1;
        return false;
      }
      return true;
    });
    return {
      isNegative,
      firstValidRotation: firstValidPosition === -1 || firstValidPosition === 0 ? 1 : firstValidPosition,
      marqueeRotation: marqueePosition,
      isFinalTwist
    };
  };

  // src/concepts/round8/model/conference.ts
  var applyMarqueeAtPosition = (buffer, position, useShifted = false) => {
    const marqueeValue = useShifted ? ShiftedNumeralStore.Marquee : NumeralStore.Marquee;
    WorkingBigIntBucket.content = marqueeValue;
    const clearMask = getClearMaskForPosition(position);
    const bitOffset = getBitOffsetForPosition(position);
    WorkingBigIntBucket.content <<= bitOffset;
    const result = buffer & clearMask | WorkingBigIntBucket.content;
    WorkingBigIntBucket.content = 0n;
    return result;
  };
  var getWrungStringRepresentation = (buffer) => {
    const marqueeState = BidirectionalConference(buffer);
    if (marqueeState.isAbsoluteZero) {
      return "0";
    }
    const firstValid = marqueeState.firstValidRotation ?? 1;
    let result = "";
    scanUpward(buffer, (buf, pos) => {
      if (pos > firstValid) {
        return false;
      }
      result += getRotationString(buf, pos);
      return true;
    });
    return result;
  };
  var getFormattedColumnarWrungRepresentation = (buffer) => {
    const fullString = getWrungStringRepresentation(buffer);
    if (fullString.length === 0) {
      return "0";
    }
    if (fullString.length === 1) {
      return fullString;
    }
    const columns = [];
    for (let i = 0; i < fullString.length; i += 2) {
      const column = fullString.slice(i, i + 2);
      columns.push(column);
    }
    columns.reverse();
    return columns.join(",");
  };
  var createFormattedRound8BinaryString = (buffer) => {
    const signBit = getSignBit(buffer);
    const positionStrings = [];
    for (let pos = 21; pos >= 1; pos--) {
      const [b0, b1, b2] = extractBitTuple(buffer, pos);
      const binaryString = `${b2}${b1}${b0}`;
      positionStrings.push(binaryString);
    }
    return `${signBit} | ${positionStrings.join(" | ")}`;
  };
  var isValidRound8Numeral = (char) => {
    return /^[1-8]$/.test(char);
  };
  var round8NumeralToRotation = (numeral) => {
    const symbolValue = parseInt(numeral, 10);
    if (symbolValue < 1 || symbolValue > 8) {
      return void 0;
    }
    return symbolValue - 1;
  };
  var round8NumeralToShiftedRotation = (numeral) => {
    const symbolValue = parseInt(numeral, 10);
    if (symbolValue < 1 || symbolValue > 7) {
      return void 0;
    }
    return symbolValue - 1;
  };
  var handleLengthOne = (preparedString, isNegative) => {
    const numeral = preparedString[0];
    if (!isValidRound8Numeral(numeral)) {
      return void 0;
    }
    let buffer = 0n;
    buffer = isNegative ? clearSignBit(buffer) : setSignBit(buffer);
    const rotationValue = round8NumeralToRotation(numeral);
    if (rotationValue === void 0) {
      return void 0;
    }
    buffer = applyNumeralRotation(rotationValue, buffer, 1);
    buffer = applyMarqueeAtPosition(buffer, 2);
    return buffer;
  };
  var handleLengthTwoToTwenty = (preparedString, isNegative) => {
    let buffer = 0n;
    const length = preparedString.length;
    buffer = isNegative ? clearSignBit(buffer) : setSignBit(buffer);
    for (let i = 0; i < length; i++) {
      const numeral = preparedString[i];
      if (!isValidRound8Numeral(numeral)) {
        return void 0;
      }
      const rotation = round8NumeralToRotation(numeral);
      if (rotation === void 0) {
        return void 0;
      }
      const position = i + 1;
      buffer = applyNumeralRotation(rotation, buffer, position);
    }
    const marqueePosition = length + 1;
    buffer = applyMarqueeAtPosition(buffer, marqueePosition);
    return buffer;
  };
  var handleLengthTwentyOne = (preparedString, isNegative) => {
    let buffer = 0n;
    buffer = isNegative ? clearSignBit(buffer) : setSignBit(buffer);
    for (let i = 0; i < 20; i++) {
      const numeral = preparedString[i];
      if (!isValidRound8Numeral(numeral)) {
        return void 0;
      }
      const rotation = round8NumeralToRotation(numeral);
      if (rotation === void 0) {
        return void 0;
      }
      const position = i + 1;
      buffer = applyNumeralRotation(rotation, buffer, position);
    }
    const position21Numeral = preparedString[20];
    if (position21Numeral === "8") {
      return void 0;
    }
    const rotation21 = round8NumeralToShiftedRotation(position21Numeral);
    if (rotation21 === void 0) {
      return void 0;
    }
    buffer = applyNumeralRotation(rotation21, buffer, 21);
    return buffer;
  };
  var parseStringToRound8 = (input) => {
    if (input === "0") {
      return getRound8Case(0 /* ZERO_CASE */);
    }
    let preparedString = input;
    let isNegative = false;
    if (preparedString.includes(",")) {
      const parts = preparedString.split(",");
      parts.reverse();
      preparedString = parts.join("");
    }
    if (preparedString.startsWith("-")) {
      isNegative = true;
      preparedString = preparedString.slice(1);
    }
    if (preparedString.length === 0) {
      return void 0;
    }
    for (let i = 0; i < preparedString.length; i++) {
      const char = preparedString[i];
      if (char === "0") {
        return void 0;
      }
      if (!isValidRound8Numeral(char)) {
        return void 0;
      }
    }
    const length = preparedString.length;
    if (length === 21 && preparedString[0] === "8") {
      if (isNegative) {
        return getRound8Case(2 /* NEGATIVE_TWIST_CASE */);
      } else {
        return getRound8Case(1 /* POSITIVE_TWIST_CASE */);
      }
    }
    if (length > 21) {
      if (isNegative) {
        return getRound8Case(2 /* NEGATIVE_TWIST_CASE */);
      } else {
        return getRound8Case(1 /* POSITIVE_TWIST_CASE */);
      }
    }
    if (length === 1) {
      return handleLengthOne(preparedString, isNegative);
    } else if (length >= 2 && length <= 20) {
      return handleLengthTwoToTwenty(preparedString, isNegative);
    } else if (length === 21) {
      return handleLengthTwentyOne(preparedString, isNegative);
    }
    return void 0;
  };

  // src/concepts/round8/model/r8.ts
  var r8_ = {
    // Conference
    createRoundDisplay: getFormattedColumnarWrungRepresentation,
    createRoundString: getWrungStringRepresentation,
    parseStringToBuffer: parseStringToRound8,
    createBufferDisplay: createFormattedRound8BinaryString,
    // Terminology
    terminology: {
      getSignBit,
      clearSignBit,
      setSignBit,
      flipSignBit,
      createBuffer,
      getRound8Case,
      Round8Cases,
      MaskStore,
      ClearMaskStore,
      BitOffsetStore,
      getBitOffsetForPosition,
      getBitWiseMaskForPosition,
      extractBitTuple,
      getClearMaskForPosition,
      MARQUEE_TUPLE,
      getRegularBitRotation,
      getShiftedBitRotation,
      getRegularRotation,
      getShiftedRotation,
      getMarqueeBitRotation,
      getRotationValue,
      getRotationString,
      applyNumeralRotation,
      scanDownward,
      scanUpward
    }
  };

  // src/concepts/round8/model/calculator.ts
  function createCalculator() {
    const state = {
      input1: {
        value: "",
        buffer: 0n,
        binary: ""
      },
      input2: {
        value: "",
        buffer: 0n,
        binary: ""
      },
      output: {
        value: "",
        buffer: 0n,
        binary: ""
      },
      operation: null,
      activeInput: "input1",
      darkMode: true
    };
    function handleDigitEntry(digit) {
      console.log("HITTING", digit);
      const inputState = state[state.activeInput];
      const currentValue = inputState.value;
      const newValue = currentValue ? `${currentValue}${digit}` : `${digit}`;
      const buffer = r8_.parseStringToBuffer(newValue);
      if (buffer) {
        const binary = r8_.createBufferDisplay(buffer);
        const displayValue = r8_.createRoundDisplay(buffer);
        inputState.buffer = buffer;
        inputState.binary = binary;
        inputState.value = displayValue;
      }
    }
    function handleBackspace() {
      const inputState = state[state.activeInput];
      const currentValue = inputState.value;
      if (!currentValue) {
        return;
      }
      const rawDigits = currentValue.replace(/,/g, "");
      const newDigits = rawDigits.slice(0, -1);
      if (newDigits === "") {
        inputState.value = "0";
        inputState.buffer = 0n;
        inputState.binary = inputState.buffer.toLocaleString();
      } else {
        const buffer = r8_.parseStringToBuffer(newDigits);
        const binary = buffer?.toString();
        inputState.buffer = buffer ? buffer : 0n;
        const displayValue = r8_.createRoundDisplay(inputState.buffer);
        inputState.value = displayValue ? displayValue : "0";
        inputState.binary = binary ? binary : r8_.createBufferDisplay(0n);
      }
    }
    function handleZero() {
      const inputState = state[state.activeInput];
      inputState.value = r8_.createRoundDisplay(0n);
      inputState.buffer = 0n;
      inputState.binary = r8_.createBufferDisplay(0n);
    }
    function handleOperation(operation) {
      state.operation = operation;
    }
    function handleClear() {
      state.input1.value = "";
      state.input1.buffer = 0n;
      state.input1.binary = "";
      state.input2.value = "";
      state.input2.buffer = 0n;
      state.input2.binary = "";
      state.output.value = "";
      state.output.buffer = 0n;
      state.output.binary = "";
      state.operation = null;
      state.activeInput = "input1";
      state.operation = null;
    }
    function handleInputSwitch() {
      state.activeInput = state.activeInput === "input1" ? "input2" : "input1";
    }
    function handleSigned() {
      const inputState = state[state.activeInput];
      const flipped = r8_.terminology.flipSignBit(inputState.buffer);
      inputState.buffer = flipped;
      inputState.binary = r8_.createBufferDisplay(flipped);
      inputState.value = r8_.createRoundDisplay(flipped);
    }
    return {
      // State access
      state,
      // Calculator operations
      handleDigitEntry,
      handleBackspace,
      handleZero,
      handleOperation,
      // handleCalculate,
      handleSigned,
      handleClear,
      handleInputSwitch
    };
  }
  var r8Calculator = createCalculator;

  // src/index.ts
  var r8_2 = {
    ...r8_,
    createCalculator: r8Calculator
  };

  // demo/calculator.ts
  function updateInputDisplay(calc, inputNumber) {
    const inputState = inputNumber === 1 ? calc.state.input1 : calc.state.input2;
    const valueElement = document.getElementById(`input${inputNumber}Value`);
    if (valueElement) {
      valueElement.textContent = inputState.value || "";
    }
    const binaryElement = document.getElementById(`input${inputNumber}Binary`);
    if (binaryElement) {
      binaryElement.textContent = inputState.binary || "";
    }
  }
  function updateActiveInputHighlight(calc) {
    document.querySelectorAll(".input-row").forEach((row) => {
      row.classList.remove("input-row-active");
      const cursor = row.querySelector(".input-cursor");
      if (cursor) {
        cursor.style.opacity = "0";
      }
    });
    const activeRow = document.querySelector(`[data-input="${calc.state.activeInput}"]`);
    if (activeRow) {
      activeRow.classList.add("input-row-active");
      const cursor = activeRow.querySelector(".input-cursor");
      if (cursor) {
        cursor.style.opacity = "1";
      }
    }
  }
  function initializeCalculator() {
    const calc = r8_2.createCalculator();
    for (let i = 1; i <= 8; i++) {
      const button = document.querySelector(`[data-position="${i}"]`);
      if (button) {
        button.addEventListener("click", () => {
          calc.handleDigitEntry(i);
          const inputNum = calc.state.activeInput === "input1" ? 1 : 2;
          updateInputDisplay(calc, inputNum);
        });
      }
    }
    const backspaceBtn = document.getElementById("backspaceBtn");
    if (backspaceBtn) {
      backspaceBtn.addEventListener("click", () => {
        calc.handleBackspace();
        const inputNum = calc.state.activeInput === "input1" ? 1 : 2;
        updateInputDisplay(calc, inputNum);
      });
    }
    const zeroBtn = document.getElementById("zeroBtn");
    if (zeroBtn) {
      zeroBtn.addEventListener("click", () => {
        calc.handleZero();
        const inputNum = calc.state.activeInput === "input1" ? 1 : 2;
        updateInputDisplay(calc, inputNum);
      });
    }
    const signedBtn = document.getElementById("signedBtn");
    if (signedBtn) {
      signedBtn.addEventListener("click", () => {
        calc.handleSigned();
        const inputNum = calc.state.activeInput === "input1" ? 1 : 2;
        updateInputDisplay(calc, inputNum);
      });
    }
    const addBtn = document.getElementById("addBtn");
    if (addBtn) {
      addBtn.addEventListener("click", () => calc.handleOperation("+"));
    }
    const subtractBtn = document.getElementById("subtractBtn");
    if (subtractBtn) {
      subtractBtn.addEventListener("click", () => calc.handleOperation("-"));
    }
    const clearBtn = document.getElementById("clearBtn");
    if (clearBtn) {
      clearBtn.addEventListener("click", () => {
        calc.handleClear();
        updateInputDisplay(calc, 1);
        updateInputDisplay(calc, 2);
      });
    }
    const flipBtn = document.getElementById("flipBtn");
    if (flipBtn) {
      flipBtn.addEventListener("click", () => {
        calc.handleInputSwitch();
        updateActiveInputHighlight(calc);
      });
    }
    const input1Row = document.getElementById("input1Row");
    if (input1Row) {
      input1Row.addEventListener("click", () => {
        if (calc.state.activeInput !== "input1") {
          calc.handleInputSwitch();
          updateActiveInputHighlight(calc);
        }
      });
    }
    const input2Row = document.getElementById("input2Row");
    if (input2Row) {
      input2Row.addEventListener("click", () => {
        if (calc.state.activeInput !== "input2") {
          calc.handleInputSwitch();
          updateActiveInputHighlight(calc);
        }
      });
    }
    updateActiveInputHighlight(calc);
    console.log("Calculator UI bindings initialized");
    console.log("Round8 Calculator v0.0.11 - Display reactivity enabled");
  }
  if (typeof window !== "undefined") {
    if (document.readyState === "complete" || document.readyState === "interactive") {
      initializeCalculator();
    } else {
      document.addEventListener("DOMContentLoaded", initializeCalculator);
    }
  }
  return __toCommonJS(calculator_exports);
})();
/**
 * Round8 v0.0.11 - Pure Round8 Binary Calculator
 *
 * Pure binary operations using spool-based indexed lookups.
 * NO binary operand calculations (shifts/OR/AND).
 * Dual display: Round8 string + Binary representation.
 *
 * @module round8
 * @version 0.0.11
 * @license GPL-3.0
 */
