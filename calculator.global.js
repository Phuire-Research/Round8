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
    One: setNumeralProperty(Round8Numerals[3]),
    Two: setNumeralProperty(Round8Numerals[4]),
    Three: setNumeralProperty(Round8Numerals[5]),
    Four: setNumeralProperty(Round8Numerals[6]),
    Five: setNumeralProperty(Round8Numerals[7]),
    Six: setNumeralProperty(Round8Numerals[8]),
    Seven: setNumeralProperty(Round8Numerals[1]),
    // Should Invalidate to Full Twist in Shifted Position
    Eight: setNumeralProperty(Round8Numerals[2])
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
    extractValueTuple(ShiftedNumeralStore.Eight),
    extractValueTuple(ShiftedNumeralStore.One),
    extractValueTuple(ShiftedNumeralStore.Two),
    extractValueTuple(ShiftedNumeralStore.Three),
    extractValueTuple(ShiftedNumeralStore.Four),
    extractValueTuple(ShiftedNumeralStore.Five),
    extractValueTuple(ShiftedNumeralStore.Six),
    extractValueTuple(ShiftedNumeralStore.Seven),
    extractValueTuple(ShiftedNumeralStore.Eight)
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
    8
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
    "0",
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
  var spooledRegularShiftedBridge = initializeSpooledWrung();
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
  spool(NumeralSeries, ShiftedNumeralSeries, spooledRegularShiftedBridge);
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
    switch (position - 1) {
      case 1: {
        return Round8Numerals[3];
      }
      case 2: {
        return Round8Numerals[4];
      }
      case 3: {
        return Round8Numerals[5];
      }
      case 4: {
        return Round8Numerals[6];
      }
      case 5: {
        return Round8Numerals[7];
      }
      case 6: {
        return Round8Numerals[8];
      }
      case 7: {
        return Round8Numerals[1];
      }
      case 8: {
        return Round8Numerals[2];
      }
      default: {
        return Round8Numerals[0];
      }
    }
  };
  var getMarqueeBitRotation = () => {
    return extractValueTuple(NumeralStore.Two);
  };
  var MarqueeRotation = Round8Numerals[0];
  var getRotationValue = (buffer, position) => {
    const [b0, b1, b2] = extractBitTuple(buffer, position);
    if (position === 21) {
      return spooledShiftedNumerals[b0][b1][b2];
    }
    return spooledNumerals[b0][b1][b2];
  };
  var getRotationString = (buffer, position) => {
    const [b0, b1, b2] = extractBitTuple(buffer, position);
    return spooledStringNumerals[b0][b1][b2];
  };
  var getShiftedRotationString = (buffer, position) => {
    const [b0, b1, b2] = extractBitTuple(buffer, position);
    return spooledShiftedStringNumerals[b0][b1][b2];
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
  var applyShiftedNumeralRotation = (value, buffer, position) => {
    let finalValue;
    switch (value) {
      case 0: {
        finalValue = ShiftedNumeralStore.Eight;
        break;
      }
      case 1: {
        finalValue = ShiftedNumeralStore.One;
        break;
      }
      case 2: {
        finalValue = ShiftedNumeralStore.Two;
        break;
      }
      case 3: {
        finalValue = ShiftedNumeralStore.Three;
        break;
      }
      case 4: {
        finalValue = ShiftedNumeralStore.Four;
        break;
      }
      case 5: {
        finalValue = ShiftedNumeralStore.Five;
        break;
      }
      case 6: {
        finalValue = ShiftedNumeralStore.Six;
        break;
      }
      case 7: {
        finalValue = ShiftedNumeralStore.Seven;
        break;
      }
      default: {
        throw "CRITICAL Apply Shifted Value " + value;
      }
    }
    WorkingBigIntBucket.content = finalValue;
    const clearMask = getClearMaskForPosition(position);
    const bitOffset = getBitOffsetForPosition(position);
    WorkingBigIntBucket.content <<= bitOffset;
    return buffer & clearMask | WorkingBigIntBucket.content;
  };
  var applyMarqueeAtPosition = (buffer, position, useShifted = false) => {
    const marqueeValue = useShifted ? ShiftedNumeralStore.Eight : NumeralStore.Two;
    WorkingBigIntBucket.content = marqueeValue;
    const clearMask = getClearMaskForPosition(position);
    const bitOffset = getBitOffsetForPosition(position);
    WorkingBigIntBucket.content <<= bitOffset;
    const result = buffer & clearMask | WorkingBigIntBucket.content;
    WorkingBigIntBucket.content = 0n;
    return result;
  };
  var createResultMuxity = (resultSign = 1) => ({
    positions: [],
    // Empty array, push sequentially
    consecutiveEightsFromStart: 0,
    pendingPropagation: false,
    resultSign
  });
  var scanUpward = (wrung, callback, position = 1) => {
    const shouldContinue = callback(wrung, position);
    if (!shouldContinue) {
      return position;
    }
    if (position === 21) {
      return 0;
    }
    return scanUpward(wrung, callback, position + 1);
  };
  var scanUpwards = (wrungA, wrungB, callback, position = 1) => {
    const shouldContinue = callback(wrungA, wrungB, position);
    if (!shouldContinue) {
      return position;
    }
    if (position === 21) {
      return 0;
    }
    return scanUpwards(wrungA, wrungB, callback, position + 1);
  };
  var scanDownward = (wrung, callback, position = 21) => {
    const shouldContinue = callback(wrung, position);
    if (!shouldContinue) {
      return position;
    }
    if (position === 1) {
      return 0;
    }
    return scanDownward(wrung, callback, position - 1);
  };
  var scanDownwards = (wrungA, wrungB, callback, position = 21) => {
    const shouldContinue = callback(wrungA, wrungB, position);
    if (!shouldContinue) {
      return position;
    }
    if (position === 1) {
      return 0;
    }
    return scanDownwards(wrungA, wrungB, callback, position - 1);
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
        wrung: buffer,
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
    const isFinalTwist = composition[0].congruent === false && composition[1].congruent && composition[1].order.length === 20 && composition[0].order.length === 1;
    if (isFinalTwist) {
      return {
        wrung: buffer,
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
        } else if (spooledShiftedNumerals[b0][b1][b2] !== 7 && spooledShiftedNumerals[b0][b1][b2] !== 8) {
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
      wrung: buffer,
      isNegative,
      firstValidRotation: firstValidPosition === -1 || firstValidPosition === 0 ? 1 : firstValidPosition,
      marqueeRotation: marqueePosition,
      isFinalTwist
    };
  };

  // src/concepts/round8/model/conference.ts
  var getWrungStringRepresentation = (buffer) => {
    const marqueeState = BidirectionalConference(buffer);
    if (marqueeState.isAbsoluteZero) {
      return "0";
    }
    if (marqueeState.isFinalTwist) {
      if (marqueeState.isNegative) {
        return "-711111111111111111111";
      } else {
        return "711111111111111111111";
      }
    }
    const firstValid = marqueeState.firstValidRotation ?? 1;
    let result = "";
    scanUpward(buffer, (buf, pos) => {
      if (pos > firstValid) {
        return false;
      }
      if (pos !== 21) {
        const rotationString = getRotationString(buf, pos);
        result += rotationString;
      } else {
        const rotationString = getShiftedRotationString(buf, pos);
        result += rotationString;
      }
      return true;
    });
    return (marqueeState.isNegative ? "-" : "") + result.split("").reverse().join("");
  };
  var getFormattedColumnarWrungRepresentation = (buffer) => {
    const beforeString = getWrungStringRepresentation(buffer);
    if (beforeString.length === 0) {
      return "0";
    }
    if (beforeString.length === 1) {
      return beforeString;
    }
    const isNegative = beforeString.charAt(0) === "-";
    const afterString = isNegative ? beforeString.slice(1) : beforeString;
    const columns = [];
    const isOdd = afterString.length % 2 === 1;
    let startIndex = 0;
    if (isOdd) {
      columns.push(afterString[0]);
      startIndex = 1;
    }
    for (let i = startIndex; i < afterString.length; i += 2) {
      const column = afterString.slice(i, i + 2);
      columns.push(column);
    }
    const result = columns.join(",");
    return (isNegative ? "-" : "") + result;
  };
  var createFormattedRound8BinaryString = (buffer) => {
    const signBit = getSignBit(buffer);
    const positionStrings = [];
    for (let pos = 21; pos >= 1; pos--) {
      const [b0, b1, b2] = extractBitTuple(buffer, pos);
      const binaryString = `${b2}${b1}${b0}`;
      positionStrings.push(binaryString);
    }
    return `${positionStrings.join(" | ")} | ${signBit} S`;
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
    return symbolValue;
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
    console.log("REllEK", 7, position21Numeral);
    if (position21Numeral === "8") {
      return void 0;
    }
    const rotation21 = round8NumeralToShiftedRotation(position21Numeral);
    if (rotation21 === void 0) {
      return void 0;
    }
    console.log("REllEK", 8, rotation21, createFormattedRound8BinaryString(buffer));
    buffer = applyShiftedNumeralRotation(rotation21, buffer, 21);
    console.log("REllEK", 9, createFormattedRound8BinaryString(buffer));
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
      preparedString = parts.join("");
    }
    if (preparedString.startsWith("-")) {
      isNegative = true;
      preparedString = preparedString.slice(1);
    }
    if (preparedString === "711111111111111111111") {
      return getRound8Case(
        isNegative ? 2 /* NEGATIVE_TWIST_CASE */ : 1 /* POSITIVE_TWIST_CASE */
      );
    } else if (preparedString.length === 21 && preparedString.charAt(0) === "7") {
      return getRound8Case(
        isNegative ? 2 /* NEGATIVE_TWIST_CASE */ : 1 /* POSITIVE_TWIST_CASE */
      );
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
    console.log("REllEK", 1);
    preparedString = preparedString.split("").reverse().join("");
    if (length === 1) {
      console.log("REllEK", 2);
      return handleLengthOne(preparedString, isNegative);
    } else if (length >= 2 && length <= 20) {
      console.log("REllEK", 3);
      return handleLengthTwoToTwenty(preparedString, isNegative);
    } else if (length === 21) {
      console.log("REllEK", 4);
      return handleLengthTwentyOne(preparedString, isNegative);
    }
    return void 0;
  };

  // src/concepts/round8/model/series/sum.cases.ts
  var SumSeries = {
    // 1 + N (N = 1-8)
    SumOfOneAndOne: (() => {
      const x = getRegularBitRotation(1);
      const y = getRegularBitRotation(1);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], getRegularRotation(2)]];
    })(),
    SumOfOneAndTwo: (() => {
      const x = getRegularBitRotation(1);
      const y = getRegularBitRotation(2);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], getRegularRotation(3)]];
    })(),
    SumOfOneAndThree: (() => {
      const x = getRegularBitRotation(1);
      const y = getRegularBitRotation(3);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], getRegularRotation(4)]];
    })(),
    SumOfOneAndFour: (() => {
      const x = getRegularBitRotation(1);
      const y = getRegularBitRotation(4);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], getRegularRotation(5)]];
    })(),
    SumOfOneAndFive: (() => {
      const x = getRegularBitRotation(1);
      const y = getRegularBitRotation(5);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], getRegularRotation(6)]];
    })(),
    SumOfOneAndSix: (() => {
      const x = getRegularBitRotation(1);
      const y = getRegularBitRotation(6);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], getRegularRotation(7)]];
    })(),
    SumOfOneAndSeven: (() => {
      const x = getRegularBitRotation(1);
      const y = getRegularBitRotation(7);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], getRegularRotation(8)]];
    })(),
    SumOfOneAndEight: (() => {
      const x = getRegularBitRotation(1);
      const y = getRegularBitRotation(8);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], getRegularRotation(1), getRegularBitRotation(1)]];
    })(),
    // 2 + N (N = 1-8)
    SumOfTwoAndOne: (() => {
      const x = getRegularBitRotation(2);
      const y = getRegularBitRotation(1);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], getRegularRotation(3)]];
    })(),
    SumOfTwoAndTwo: (() => {
      const x = getRegularBitRotation(2);
      const y = getRegularBitRotation(2);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], getRegularRotation(4)]];
    })(),
    SumOfTwoAndThree: (() => {
      const x = getRegularBitRotation(2);
      const y = getRegularBitRotation(3);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], getRegularRotation(5)]];
    })(),
    SumOfTwoAndFour: (() => {
      const x = getRegularBitRotation(2);
      const y = getRegularBitRotation(4);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], getRegularRotation(6)]];
    })(),
    SumOfTwoAndFive: (() => {
      const x = getRegularBitRotation(2);
      const y = getRegularBitRotation(5);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], getRegularRotation(7)]];
    })(),
    SumOfTwoAndSix: (() => {
      const x = getRegularBitRotation(2);
      const y = getRegularBitRotation(6);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], getRegularRotation(8)]];
    })(),
    SumOfTwoAndSeven: (() => {
      const x = getRegularBitRotation(2);
      const y = getRegularBitRotation(7);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], getRegularRotation(1), getRegularBitRotation(1)]];
    })(),
    SumOfTwoAndEight: (() => {
      const x = getRegularBitRotation(2);
      const y = getRegularBitRotation(8);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], getRegularRotation(2), getRegularBitRotation(1)]];
    })(),
    // 3 + N (N = 1-8)
    SumOfThreeAndOne: (() => {
      const x = getRegularBitRotation(3);
      const y = getRegularBitRotation(1);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], getRegularRotation(4)]];
    })(),
    SumOfThreeAndTwo: (() => {
      const x = getRegularBitRotation(3);
      const y = getRegularBitRotation(2);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], getRegularRotation(5)]];
    })(),
    SumOfThreeAndThree: (() => {
      const x = getRegularBitRotation(3);
      const y = getRegularBitRotation(3);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], getRegularRotation(6)]];
    })(),
    SumOfThreeAndFour: (() => {
      const x = getRegularBitRotation(3);
      const y = getRegularBitRotation(4);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], getRegularRotation(7)]];
    })(),
    SumOfThreeAndFive: (() => {
      const x = getRegularBitRotation(3);
      const y = getRegularBitRotation(5);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], getRegularRotation(8)]];
    })(),
    SumOfThreeAndSix: (() => {
      const x = getRegularBitRotation(3);
      const y = getRegularBitRotation(6);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], getRegularRotation(1), getRegularBitRotation(1)]];
    })(),
    SumOfThreeAndSeven: (() => {
      const x = getRegularBitRotation(3);
      const y = getRegularBitRotation(7);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], getRegularRotation(2), getRegularBitRotation(1)]];
    })(),
    SumOfThreeAndEight: (() => {
      const x = getRegularBitRotation(3);
      const y = getRegularBitRotation(8);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], getRegularRotation(3), getRegularBitRotation(1)]];
    })(),
    // 4 + N (N = 1-8)
    SumOfFourAndOne: (() => {
      const x = getRegularBitRotation(4);
      const y = getRegularBitRotation(1);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], getRegularRotation(5)]];
    })(),
    SumOfFourAndTwo: (() => {
      const x = getRegularBitRotation(4);
      const y = getRegularBitRotation(2);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], getRegularRotation(6)]];
    })(),
    SumOfFourAndThree: (() => {
      const x = getRegularBitRotation(4);
      const y = getRegularBitRotation(3);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], getRegularRotation(7)]];
    })(),
    SumOfFourAndFour: (() => {
      const x = getRegularBitRotation(4);
      const y = getRegularBitRotation(4);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], getRegularRotation(8)]];
    })(),
    SumOfFourAndFive: (() => {
      const x = getRegularBitRotation(4);
      const y = getRegularBitRotation(5);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], getRegularRotation(1), getRegularBitRotation(1)]];
    })(),
    SumOfFourAndSix: (() => {
      const x = getRegularBitRotation(4);
      const y = getRegularBitRotation(6);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], getRegularRotation(2), getRegularBitRotation(1)]];
    })(),
    SumOfFourAndSeven: (() => {
      const x = getRegularBitRotation(4);
      const y = getRegularBitRotation(7);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], getRegularRotation(3), getRegularBitRotation(1)]];
    })(),
    SumOfFourAndEight: (() => {
      const x = getRegularBitRotation(4);
      const y = getRegularBitRotation(8);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], getRegularRotation(4), getRegularBitRotation(1)]];
    })(),
    // 5 + N (N = 1-8)
    SumOfFiveAndOne: (() => {
      const x = getRegularBitRotation(5);
      const y = getRegularBitRotation(1);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], getRegularRotation(6)]];
    })(),
    SumOfFiveAndTwo: (() => {
      const x = getRegularBitRotation(5);
      const y = getRegularBitRotation(2);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], getRegularRotation(7)]];
    })(),
    SumOfFiveAndThree: (() => {
      const x = getRegularBitRotation(5);
      const y = getRegularBitRotation(3);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], getRegularRotation(8)]];
    })(),
    SumOfFiveAndFour: (() => {
      const x = getRegularBitRotation(5);
      const y = getRegularBitRotation(4);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], getRegularRotation(1), getRegularBitRotation(1)]];
    })(),
    SumOfFiveAndFive: (() => {
      const x = getRegularBitRotation(5);
      const y = getRegularBitRotation(5);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], getRegularRotation(2), getRegularBitRotation(1)]];
    })(),
    SumOfFiveAndSix: (() => {
      const x = getRegularBitRotation(5);
      const y = getRegularBitRotation(6);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], getRegularRotation(3), getRegularBitRotation(1)]];
    })(),
    SumOfFiveAndSeven: (() => {
      const x = getRegularBitRotation(5);
      const y = getRegularBitRotation(7);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], getRegularRotation(4), getRegularBitRotation(1)]];
    })(),
    SumOfFiveAndEight: (() => {
      const x = getRegularBitRotation(5);
      const y = getRegularBitRotation(8);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], getRegularRotation(5), getRegularBitRotation(1)]];
    })(),
    // 6 + N (N = 1-8)
    SumOfSixAndOne: (() => {
      const x = getRegularBitRotation(6);
      const y = getRegularBitRotation(1);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], getRegularRotation(7)]];
    })(),
    SumOfSixAndTwo: (() => {
      const x = getRegularBitRotation(6);
      const y = getRegularBitRotation(2);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], getRegularRotation(8)]];
    })(),
    SumOfSixAndThree: (() => {
      const x = getRegularBitRotation(6);
      const y = getRegularBitRotation(3);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], getRegularRotation(1), getRegularBitRotation(1)]];
    })(),
    SumOfSixAndFour: (() => {
      const x = getRegularBitRotation(6);
      const y = getRegularBitRotation(4);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], getRegularRotation(2), getRegularBitRotation(1)]];
    })(),
    SumOfSixAndFive: (() => {
      const x = getRegularBitRotation(6);
      const y = getRegularBitRotation(5);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], getRegularRotation(3), getRegularBitRotation(1)]];
    })(),
    SumOfSixAndSix: (() => {
      const x = getRegularBitRotation(6);
      const y = getRegularBitRotation(6);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], getRegularRotation(4), getRegularBitRotation(1)]];
    })(),
    SumOfSixAndSeven: (() => {
      const x = getRegularBitRotation(6);
      const y = getRegularBitRotation(7);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], getRegularRotation(5), getRegularBitRotation(1)]];
    })(),
    SumOfSixAndEight: (() => {
      const x = getRegularBitRotation(6);
      const y = getRegularBitRotation(8);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], getRegularRotation(6), getRegularBitRotation(1)]];
    })(),
    // 7 + N (N = 1-8)
    SumOfSevenAndOne: (() => {
      const x = getRegularBitRotation(7);
      const y = getRegularBitRotation(1);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], getRegularRotation(8)]];
    })(),
    SumOfSevenAndTwo: (() => {
      const x = getRegularBitRotation(7);
      const y = getRegularBitRotation(2);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], getRegularRotation(1), getRegularBitRotation(1)]];
    })(),
    SumOfSevenAndThree: (() => {
      const x = getRegularBitRotation(7);
      const y = getRegularBitRotation(3);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], getRegularRotation(2), getRegularBitRotation(1)]];
    })(),
    SumOfSevenAndFour: (() => {
      const x = getRegularBitRotation(7);
      const y = getRegularBitRotation(4);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], getRegularRotation(3), getRegularBitRotation(1)]];
    })(),
    SumOfSevenAndFive: (() => {
      const x = getRegularBitRotation(7);
      const y = getRegularBitRotation(5);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], getRegularRotation(4), getRegularBitRotation(1)]];
    })(),
    SumOfSevenAndSix: (() => {
      const x = getRegularBitRotation(7);
      const y = getRegularBitRotation(6);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], getRegularRotation(5), getRegularBitRotation(1)]];
    })(),
    SumOfSevenAndSeven: (() => {
      const x = getRegularBitRotation(7);
      const y = getRegularBitRotation(7);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], getRegularRotation(6), getRegularBitRotation(1)]];
    })(),
    SumOfSevenAndEight: (() => {
      const x = getRegularBitRotation(7);
      const y = getRegularBitRotation(8);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], getRegularRotation(7), getRegularBitRotation(1)]];
    })(),
    // 8 + N (N = 1-8)
    SumOfEightAndOne: (() => {
      const x = getRegularBitRotation(8);
      const y = getRegularBitRotation(1);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], getRegularRotation(1), getRegularBitRotation(1)]];
    })(),
    SumOfEightAndTwo: (() => {
      const x = getRegularBitRotation(8);
      const y = getRegularBitRotation(2);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], getRegularRotation(2), getRegularBitRotation(1)]];
    })(),
    SumOfEightAndThree: (() => {
      const x = getRegularBitRotation(8);
      const y = getRegularBitRotation(3);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], getRegularRotation(3), getRegularBitRotation(1)]];
    })(),
    SumOfEightAndFour: (() => {
      const x = getRegularBitRotation(8);
      const y = getRegularBitRotation(4);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], getRegularRotation(4), getRegularBitRotation(1)]];
    })(),
    SumOfEightAndFive: (() => {
      const x = getRegularBitRotation(8);
      const y = getRegularBitRotation(5);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], getRegularRotation(5), getRegularBitRotation(1)]];
    })(),
    SumOfEightAndSix: (() => {
      const x = getRegularBitRotation(8);
      const y = getRegularBitRotation(6);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], getRegularRotation(6), getRegularBitRotation(1)]];
    })(),
    SumOfEightAndSeven: (() => {
      const x = getRegularBitRotation(8);
      const y = getRegularBitRotation(7);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], getRegularRotation(7), getRegularBitRotation(1)]];
    })(),
    SumOfEightAndEight: (() => {
      const x = getRegularBitRotation(8);
      const y = getRegularBitRotation(8);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], getRegularRotation(8), getRegularBitRotation(1)]];
    })()
  };

  // src/concepts/round8/model/series/shiftedSum.cases.ts
  var ShiftedSumSeries = {
    // EXTERNAL CARRY OPERAND A CASES: [0,0,0] arriving from column 1
    // [0,0,0] = External carry from column 1 (position 7 in 7-position system)
    // Represents carry propagating leftward into Column 0 shifted manifold
    // System has 6 counting positions (Display 1-6) + marquee [0,0,1] + placeholder [0,0,0]
    // Maximum value: 7,88,88,88,88,88,88,88,88,88,88 (position 7 at column 0, position 8 at columns 1-20)
    // Display 1 [0,1,0] + N
    ShiftedSumOfOneAndOne: (() => {
      const x = getShiftedBitRotation(1);
      const y = getShiftedBitRotation(1);
      const result = getShiftedRotation(2);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], result]];
    })(),
    ShiftedSumOfOneAndTwo: (() => {
      const x = getShiftedBitRotation(1);
      const y = getShiftedBitRotation(2);
      const result = getShiftedRotation(3);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], result]];
    })(),
    ShiftedSumOfOneAndThree: (() => {
      const x = getShiftedBitRotation(1);
      const y = getShiftedBitRotation(3);
      const result = getShiftedRotation(4);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], result]];
    })(),
    ShiftedSumOfOneAndFour: (() => {
      const x = getShiftedBitRotation(1);
      const y = getShiftedBitRotation(4);
      const result = getShiftedRotation(5);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], result]];
    })(),
    ShiftedSumOfOneAndFive: (() => {
      const x = getShiftedBitRotation(1);
      const y = getShiftedBitRotation(5);
      const result = getShiftedRotation(6);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], result]];
    })(),
    ShiftedSumOfOneAndSix: (() => {
      const x = getShiftedBitRotation(1);
      const y = getShiftedBitRotation(6);
      const result = getShiftedRotation(7);
      const carry = getRegularBitRotation(1);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], result, carry]];
    })(),
    ShiftedSumOfOneAndSeven: (() => {
      const x = getShiftedBitRotation(1);
      const y = getShiftedBitRotation(7);
      const result = getShiftedRotation(7);
      const carry = getRegularBitRotation(1);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], result, carry]];
    })(),
    ShiftedSumOfOneAndMarqueeAsCarry: (() => {
      const x = getShiftedBitRotation(1);
      const y = getShiftedBitRotation(8);
      const result = getShiftedRotation(2);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], result]];
    })(),
    ShiftedSumOfTwoAndOne: (() => {
      const x = getShiftedBitRotation(2);
      const y = getShiftedBitRotation(1);
      const result = getShiftedRotation(3);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], result]];
    })(),
    ShiftedSumOfTwoAndTwo: (() => {
      const x = getShiftedBitRotation(2);
      const y = getShiftedBitRotation(2);
      const result = getShiftedRotation(4);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], result]];
    })(),
    ShiftedSumOfTwoAndThree: (() => {
      const x = getShiftedBitRotation(2);
      const y = getShiftedBitRotation(3);
      const result = getShiftedRotation(5);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], result]];
    })(),
    ShiftedSumOfTwoAndFour: (() => {
      const x = getShiftedBitRotation(2);
      const y = getShiftedBitRotation(4);
      const result = getShiftedRotation(6);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], result]];
    })(),
    ShiftedSumOfTwoAndFive: (() => {
      const x = getShiftedBitRotation(2);
      const y = getShiftedBitRotation(5);
      const result = getShiftedRotation(7);
      const carry = getRegularBitRotation(1);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], result, carry]];
    })(),
    ShiftedSumOfTwoAndSix: (() => {
      const x = getShiftedBitRotation(2);
      const y = getShiftedBitRotation(6);
      const result = getShiftedRotation(7);
      const carry = getRegularBitRotation(1);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], result, carry]];
    })(),
    ShiftedSumOfTwoAndSeven: (() => {
      const x = getShiftedBitRotation(2);
      const y = getShiftedBitRotation(7);
      const result = getShiftedRotation(7);
      const carry = getRegularBitRotation(1);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], result, carry]];
    })(),
    ShiftedSumOfTwoAndMarqueeAsCarry: (() => {
      const x = getShiftedBitRotation(2);
      const y = getShiftedBitRotation(8);
      const result = getShiftedRotation(3);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], result]];
    })(),
    ShiftedSumOfThreeAndOne: (() => {
      const x = getShiftedBitRotation(3);
      const y = getShiftedBitRotation(1);
      const result = getShiftedRotation(4);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], result]];
    })(),
    ShiftedSumOfThreeAndTwo: (() => {
      const x = getShiftedBitRotation(3);
      const y = getShiftedBitRotation(2);
      const result = getShiftedRotation(5);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], result]];
    })(),
    ShiftedSumOfThreeAndThree: (() => {
      const x = getShiftedBitRotation(3);
      const y = getShiftedBitRotation(3);
      const result = getShiftedRotation(6);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], result]];
    })(),
    ShiftedSumOfThreeAndFour: (() => {
      const x = getShiftedBitRotation(3);
      const y = getShiftedBitRotation(4);
      const result = getShiftedRotation(7);
      const carry = getRegularBitRotation(1);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], result, carry]];
    })(),
    ShiftedSumOfThreeAndFive: (() => {
      const x = getShiftedBitRotation(3);
      const y = getShiftedBitRotation(5);
      const result = getShiftedRotation(7);
      const carry = getRegularBitRotation(1);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], result, carry]];
    })(),
    ShiftedSumOfThreeAndSix: (() => {
      const x = getShiftedBitRotation(3);
      const y = getShiftedBitRotation(6);
      const result = getShiftedRotation(7);
      const carry = getRegularBitRotation(1);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], result, carry]];
    })(),
    ShiftedSumOfThreeAndSeven: (() => {
      const x = getShiftedBitRotation(3);
      const y = getShiftedBitRotation(7);
      const result = getShiftedRotation(7);
      const carry = getRegularBitRotation(1);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], result, carry]];
    })(),
    ShiftedSumOfThreeAndMarqueeAsCarry: (() => {
      const x = getShiftedBitRotation(3);
      const y = getShiftedBitRotation(8);
      const result = getShiftedRotation(4);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], result]];
    })(),
    ShiftedSumOfFourAndOne: (() => {
      const x = getShiftedBitRotation(4);
      const y = getShiftedBitRotation(1);
      const result = getShiftedRotation(5);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], result]];
    })(),
    ShiftedSumOfFourAndTwo: (() => {
      const x = getShiftedBitRotation(4);
      const y = getShiftedBitRotation(2);
      const result = getShiftedRotation(6);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], result]];
    })(),
    ShiftedSumOfFourAndThree: (() => {
      const x = getShiftedBitRotation(4);
      const y = getShiftedBitRotation(3);
      const result = getShiftedRotation(7);
      const carry = getRegularBitRotation(1);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], result, carry]];
    })(),
    ShiftedSumOfFourAndFour: (() => {
      const x = getShiftedBitRotation(4);
      const y = getShiftedBitRotation(4);
      const result = getShiftedRotation(7);
      const carry = getRegularBitRotation(1);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], result, carry]];
    })(),
    ShiftedSumOfFourAndFive: (() => {
      const x = getShiftedBitRotation(4);
      const y = getShiftedBitRotation(5);
      const result = getShiftedRotation(7);
      const carry = getRegularBitRotation(1);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], result, carry]];
    })(),
    ShiftedSumOfFourAndSix: (() => {
      const x = getShiftedBitRotation(4);
      const y = getShiftedBitRotation(6);
      const result = getShiftedRotation(7);
      const carry = getRegularBitRotation(1);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], result, carry]];
    })(),
    ShiftedSumOfFourAndSeven: (() => {
      const x = getShiftedBitRotation(4);
      const y = getShiftedBitRotation(7);
      const result = getShiftedRotation(7);
      const carry = getRegularBitRotation(1);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], result, carry]];
    })(),
    ShiftedSumOfFiveAndOne: (() => {
      const x = getShiftedBitRotation(5);
      const y = getShiftedBitRotation(1);
      const result = getShiftedRotation(6);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], result]];
    })(),
    ShiftedSumOfFiveAndTwo: (() => {
      const x = getShiftedBitRotation(5);
      const y = getShiftedBitRotation(2);
      const result = getShiftedRotation(7);
      const carry = getRegularBitRotation(1);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], result, carry]];
    })(),
    ShiftedSumOfFiveAndThree: (() => {
      const x = getShiftedBitRotation(5);
      const y = getShiftedBitRotation(3);
      const result = getShiftedRotation(7);
      const carry = getRegularBitRotation(1);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], result, carry]];
    })(),
    ShiftedSumOfFiveAndFour: (() => {
      const x = getShiftedBitRotation(5);
      const y = getShiftedBitRotation(4);
      const result = getShiftedRotation(7);
      const carry = getRegularBitRotation(1);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], result, carry]];
    })(),
    ShiftedSumOfFiveAndFive: (() => {
      const x = getShiftedBitRotation(5);
      const y = getShiftedBitRotation(5);
      const result = getShiftedRotation(7);
      const carry = getShiftedRotation(1);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], result, carry]];
    })(),
    ShiftedSumOfFiveAndSix: (() => {
      const x = getShiftedBitRotation(5);
      const y = getShiftedBitRotation(6);
      const result = getShiftedRotation(7);
      const carry = getRegularBitRotation(1);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], result, carry]];
    })(),
    ShiftedSumOfFiveAndSeven: (() => {
      const x = getShiftedBitRotation(5);
      const y = getShiftedBitRotation(7);
      const result = getShiftedRotation(7);
      const carry = getRegularBitRotation(1);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], result, carry]];
    })(),
    ShiftedSumOfFourAndMarqueeAsCarry: (() => {
      const x = getShiftedBitRotation(4);
      const y = getShiftedBitRotation(8);
      const result = getShiftedRotation(5);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], result]];
    })(),
    // Display 6 [1,1,1] + N (maximum position before wrap)
    ShiftedSumOfSixAndOne: (() => {
      const x = getShiftedBitRotation(6);
      const y = getShiftedBitRotation(1);
      const result = getShiftedRotation(7);
      const carry = getRegularBitRotation(1);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], result, carry]];
    })(),
    ShiftedSumOfSixAndTwo: (() => {
      const x = getShiftedBitRotation(6);
      const y = getShiftedBitRotation(2);
      const result = getShiftedRotation(7);
      const carry = getShiftedRotation(1);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], result, carry]];
    })(),
    ShiftedSumOfSixAndThree: (() => {
      const x = getShiftedBitRotation(6);
      const y = getShiftedBitRotation(3);
      const result = getShiftedRotation(7);
      const carry = getRegularBitRotation(1);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], result, carry]];
    })(),
    ShiftedSumOfSixAndFour: (() => {
      const x = getShiftedBitRotation(6);
      const y = getShiftedBitRotation(4);
      const result = getShiftedRotation(7);
      const carry = getShiftedRotation(1);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], result, carry]];
    })(),
    ShiftedSumOfSixAndFive: (() => {
      const x = getShiftedBitRotation(6);
      const y = getShiftedBitRotation(5);
      const result = getShiftedRotation(7);
      const carry = getRegularBitRotation(1);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], result, carry]];
    })(),
    ShiftedSumOfSixAndSix: (() => {
      const x = getShiftedBitRotation(6);
      const y = getShiftedBitRotation(6);
      const result = getShiftedRotation(7);
      const carry = getRegularBitRotation(1);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], result, carry]];
    })(),
    ShiftedSumOfSixAndSeven: (() => {
      const x = getShiftedBitRotation(6);
      const y = getShiftedBitRotation(7);
      const result = getShiftedRotation(7);
      const carry = getRegularBitRotation(1);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], result, carry]];
    })(),
    ShiftedSumOfSixAndMarqueeAsCarry: (() => {
      const x = getShiftedBitRotation(6);
      const y = getShiftedBitRotation(8);
      const result = getShiftedRotation(7);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], result]];
    })(),
    ShiftedSumOfSevenAndOne: (() => {
      const x = getShiftedBitRotation(7);
      const y = getShiftedBitRotation(1);
      const result = getShiftedRotation(7);
      const carry = getRegularBitRotation(1);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], result, carry]];
    })(),
    ShiftedSumOfSevenAndTwo: (() => {
      const x = getShiftedBitRotation(7);
      const y = getShiftedBitRotation(2);
      const result = getShiftedRotation(7);
      const carry = getShiftedRotation(1);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], result, carry]];
    })(),
    ShiftedSumOfSevenAndThree: (() => {
      const x = getShiftedBitRotation(7);
      const y = getShiftedBitRotation(3);
      const result = getShiftedRotation(7);
      const carry = getRegularBitRotation(1);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], result, carry]];
    })(),
    ShiftedSumOfSevenAndFour: (() => {
      const x = getShiftedBitRotation(7);
      const y = getShiftedBitRotation(4);
      const result = getShiftedRotation(7);
      const carry = getShiftedRotation(1);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], result, carry]];
    })(),
    ShiftedSumOfSevenAndFive: (() => {
      const x = getShiftedBitRotation(7);
      const y = getShiftedBitRotation(5);
      const result = getShiftedRotation(7);
      const carry = getRegularBitRotation(1);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], result, carry]];
    })(),
    ShiftedSumOfSevenAndSix: (() => {
      const x = getShiftedBitRotation(7);
      const y = getShiftedBitRotation(6);
      const result = getShiftedRotation(7);
      const carry = getRegularBitRotation(1);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], result, carry]];
    })(),
    ShiftedSumOfSevenAndSeven: (() => {
      const x = getShiftedBitRotation(7);
      const y = getShiftedBitRotation(7);
      const result = getShiftedRotation(7);
      const carry = getRegularBitRotation(1);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], result, carry]];
    })(),
    ShiftedSumOfSevenAndMarqueeAsCarry: (() => {
      const x = getShiftedBitRotation(7);
      const y = getShiftedBitRotation(8);
      const result = getShiftedRotation(7);
      const carry = getRegularBitRotation(1);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], result, carry]];
    })(),
    ShiftedSumOfMarqueeAsCarryAndOne: (() => {
      const x = getShiftedBitRotation(8);
      const y = getShiftedBitRotation(1);
      const result = getShiftedRotation(2);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], result]];
    })(),
    ShiftedSumOfMarqueeAsCarryAndTwo: (() => {
      const x = getShiftedBitRotation(8);
      const y = getShiftedBitRotation(2);
      const result = getShiftedRotation(3);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], result]];
    })(),
    ShiftedSumOfMarqueeAsCarryAndThree: (() => {
      const x = getShiftedBitRotation(8);
      const y = getShiftedBitRotation(3);
      const result = getShiftedRotation(4);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], result]];
    })(),
    ShiftedSumOfMarqueeAsCarryAndFour: (() => {
      const x = getShiftedBitRotation(8);
      const y = getShiftedBitRotation(4);
      const result = getShiftedRotation(5);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], result]];
    })(),
    ShiftedSumOfMarqueeAsCarryAndFive: (() => {
      const x = getShiftedBitRotation(8);
      const y = getShiftedBitRotation(5);
      const result = getShiftedRotation(6);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], result]];
    })(),
    ShiftedSumOfMarqueeAsCarryAndSix: (() => {
      const x = getShiftedBitRotation(8);
      const y = getShiftedBitRotation(6);
      const result = getShiftedRotation(7);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], result]];
    })(),
    ShiftedSumOfMarqueeAsCarryAndSeven: (() => {
      const x = getShiftedBitRotation(8);
      const y = getShiftedBitRotation(7);
      const result = getShiftedRotation(7);
      const carry = getRegularBitRotation(1);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], result, carry]];
    })()
  };

  // src/concepts/round8/model/series/difference.cases.ts
  var DifferenceSeries = {
    // Display 1 - N (N = 1-8)
    DifferenceOfOneAndOne: (() => {
      const x = getRegularBitRotation(1);
      const y = getRegularBitRotation(1);
      const result = getRegularRotation(8);
      const borrow = getRegularBitRotation(1);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], result, borrow]];
    })(),
    DifferenceOfOneAndTwo: (() => {
      const x = getRegularBitRotation(1);
      const y = getRegularBitRotation(2);
      const result = getRegularRotation(7);
      const borrow = getRegularBitRotation(1);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], result, borrow]];
    })(),
    DifferenceOfOneAndThree: (() => {
      const x = getRegularBitRotation(1);
      const y = getRegularBitRotation(3);
      const result = getRegularRotation(6);
      const borrow = getRegularBitRotation(1);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], result, borrow]];
    })(),
    DifferenceOfOneAndFour: (() => {
      const x = getRegularBitRotation(1);
      const y = getRegularBitRotation(4);
      const result = getRegularRotation(5);
      const borrow = getRegularBitRotation(1);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], result, borrow]];
    })(),
    DifferenceOfOneAndFive: (() => {
      const x = getRegularBitRotation(1);
      const y = getRegularBitRotation(5);
      const result = getRegularRotation(4);
      const borrow = getRegularBitRotation(1);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], result, borrow]];
    })(),
    DifferenceOfOneAndSix: (() => {
      const x = getRegularBitRotation(1);
      const y = getRegularBitRotation(6);
      const result = getRegularRotation(3);
      const borrow = getRegularBitRotation(1);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], result, borrow]];
    })(),
    DifferenceOfOneAndSeven: (() => {
      const x = getRegularBitRotation(1);
      const y = getRegularBitRotation(7);
      const result = getRegularRotation(2);
      const borrow = getRegularBitRotation(1);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], result, borrow]];
    })(),
    DifferenceOfOneAndEight: (() => {
      const x = getRegularBitRotation(1);
      const y = getRegularBitRotation(8);
      const result = getRegularRotation(1);
      const borrow = getRegularBitRotation(1);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], result, borrow]];
    })(),
    // Display 2 - N (N = 1-8)
    DifferenceOfTwoAndOne: (() => {
      const x = getRegularBitRotation(2);
      const y = getRegularBitRotation(1);
      const result = getRegularRotation(1);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], result]];
    })(),
    DifferenceOfTwoAndTwo: (() => {
      const x = getRegularBitRotation(2);
      const y = getRegularBitRotation(2);
      const result = getRegularRotation(8);
      const borrow = getRegularBitRotation(1);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], result, borrow]];
    })(),
    DifferenceOfTwoAndThree: (() => {
      const x = getRegularBitRotation(2);
      const y = getRegularBitRotation(3);
      const result = getRegularRotation(7);
      const borrow = getRegularBitRotation(1);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], result, borrow]];
    })(),
    DifferenceOfTwoAndFour: (() => {
      const x = getRegularBitRotation(2);
      const y = getRegularBitRotation(4);
      const result = getRegularRotation(6);
      const borrow = getRegularBitRotation(1);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], result, borrow]];
    })(),
    DifferenceOfTwoAndFive: (() => {
      const x = getRegularBitRotation(2);
      const y = getRegularBitRotation(5);
      const result = getRegularRotation(5);
      const borrow = getRegularBitRotation(1);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], result, borrow]];
    })(),
    DifferenceOfTwoAndSix: (() => {
      const x = getRegularBitRotation(2);
      const y = getRegularBitRotation(6);
      const result = getRegularRotation(4);
      const borrow = getRegularBitRotation(1);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], result, borrow]];
    })(),
    DifferenceOfTwoAndSeven: (() => {
      const x = getRegularBitRotation(2);
      const y = getRegularBitRotation(7);
      const result = getRegularRotation(3);
      const borrow = getRegularBitRotation(1);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], result, borrow]];
    })(),
    DifferenceOfTwoAndEight: (() => {
      const x = getRegularBitRotation(2);
      const y = getRegularBitRotation(8);
      const result = getRegularRotation(2);
      const borrow = getRegularBitRotation(1);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], result, borrow]];
    })(),
    // Display 3 - N (N = 1-8)
    DifferenceOfThreeAndOne: (() => {
      const x = getRegularBitRotation(3);
      const y = getRegularBitRotation(1);
      const result = getRegularRotation(2);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], result]];
    })(),
    DifferenceOfThreeAndTwo: (() => {
      const x = getRegularBitRotation(3);
      const y = getRegularBitRotation(2);
      const result = getRegularRotation(1);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], result]];
    })(),
    DifferenceOfThreeAndThree: (() => {
      const x = getRegularBitRotation(3);
      const y = getRegularBitRotation(3);
      const result = getRegularRotation(8);
      const borrow = getRegularBitRotation(1);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], result, borrow]];
    })(),
    DifferenceOfThreeAndFour: (() => {
      const x = getRegularBitRotation(3);
      const y = getRegularBitRotation(4);
      const result = getRegularRotation(7);
      const borrow = getRegularBitRotation(1);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], result, borrow]];
    })(),
    DifferenceOfThreeAndFive: (() => {
      const x = getRegularBitRotation(3);
      const y = getRegularBitRotation(5);
      const result = getRegularRotation(6);
      const borrow = getRegularBitRotation(1);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], result, borrow]];
    })(),
    DifferenceOfThreeAndSix: (() => {
      const x = getRegularBitRotation(3);
      const y = getRegularBitRotation(6);
      const result = getRegularRotation(5);
      const borrow = getRegularBitRotation(1);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], result, borrow]];
    })(),
    DifferenceOfThreeAndSeven: (() => {
      const x = getRegularBitRotation(3);
      const y = getRegularBitRotation(7);
      const result = getRegularRotation(4);
      const borrow = getRegularBitRotation(1);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], result, borrow]];
    })(),
    DifferenceOfThreeAndEight: (() => {
      const x = getRegularBitRotation(3);
      const y = getRegularBitRotation(8);
      const result = getRegularRotation(3);
      const borrow = getRegularBitRotation(1);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], result, borrow]];
    })(),
    // Display 4 - N (N = 1-8)
    DifferenceOfFourAndOne: (() => {
      const x = getRegularBitRotation(4);
      const y = getRegularBitRotation(1);
      const result = getRegularRotation(3);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], result]];
    })(),
    DifferenceOfFourAndTwo: (() => {
      const x = getRegularBitRotation(4);
      const y = getRegularBitRotation(2);
      const result = getRegularRotation(2);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], result]];
    })(),
    DifferenceOfFourAndThree: (() => {
      const x = getRegularBitRotation(4);
      const y = getRegularBitRotation(3);
      const result = getRegularRotation(1);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], result]];
    })(),
    DifferenceOfFourAndFour: (() => {
      const x = getRegularBitRotation(4);
      const y = getRegularBitRotation(4);
      const result = getRegularRotation(8);
      const borrow = getRegularBitRotation(1);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], result, borrow]];
    })(),
    DifferenceOfFourAndFive: (() => {
      const x = getRegularBitRotation(4);
      const y = getRegularBitRotation(5);
      const result = getRegularRotation(7);
      const borrow = getRegularBitRotation(1);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], result, borrow]];
    })(),
    DifferenceOfFourAndSix: (() => {
      const x = getRegularBitRotation(4);
      const y = getRegularBitRotation(6);
      const result = getRegularRotation(6);
      const borrow = getRegularBitRotation(1);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], result, borrow]];
    })(),
    DifferenceOfFourAndSeven: (() => {
      const x = getRegularBitRotation(4);
      const y = getRegularBitRotation(7);
      const result = getRegularRotation(5);
      const borrow = getRegularBitRotation(1);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], result, borrow]];
    })(),
    DifferenceOfFourAndEight: (() => {
      const x = getRegularBitRotation(4);
      const y = getRegularBitRotation(8);
      const result = getRegularRotation(4);
      const borrow = getRegularBitRotation(1);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], result, borrow]];
    })(),
    // Display 5 - N (N = 1-8)
    DifferenceOfFiveAndOne: (() => {
      const x = getRegularBitRotation(5);
      const y = getRegularBitRotation(1);
      const result = getRegularRotation(4);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], result]];
    })(),
    DifferenceOfFiveAndTwo: (() => {
      const x = getRegularBitRotation(5);
      const y = getRegularBitRotation(2);
      const result = getRegularRotation(3);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], result]];
    })(),
    DifferenceOfFiveAndThree: (() => {
      const x = getRegularBitRotation(5);
      const y = getRegularBitRotation(3);
      const result = getRegularRotation(2);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], result]];
    })(),
    DifferenceOfFiveAndFour: (() => {
      const x = getRegularBitRotation(5);
      const y = getRegularBitRotation(4);
      const result = getRegularRotation(1);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], result]];
    })(),
    DifferenceOfFiveAndFive: (() => {
      const x = getRegularBitRotation(5);
      const y = getRegularBitRotation(5);
      const result = getRegularRotation(8);
      const borrow = getRegularBitRotation(1);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], result, borrow]];
    })(),
    DifferenceOfFiveAndSix: (() => {
      const x = getRegularBitRotation(5);
      const y = getRegularBitRotation(6);
      const result = getRegularRotation(7);
      const borrow = getRegularBitRotation(1);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], result, borrow]];
    })(),
    DifferenceOfFiveAndSeven: (() => {
      const x = getRegularBitRotation(5);
      const y = getRegularBitRotation(7);
      const result = getRegularRotation(6);
      const borrow = getRegularBitRotation(1);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], result, borrow]];
    })(),
    DifferenceOfFiveAndEight: (() => {
      const x = getRegularBitRotation(5);
      const y = getRegularBitRotation(8);
      const result = getRegularRotation(5);
      const borrow = getRegularBitRotation(1);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], result, borrow]];
    })(),
    // Display 6 - N (N = 1-8)
    DifferenceOfSixAndOne: (() => {
      const x = getRegularBitRotation(6);
      const y = getRegularBitRotation(1);
      const result = getRegularRotation(5);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], result]];
    })(),
    DifferenceOfSixAndTwo: (() => {
      const x = getRegularBitRotation(6);
      const y = getRegularBitRotation(2);
      const result = getRegularRotation(4);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], result]];
    })(),
    DifferenceOfSixAndThree: (() => {
      const x = getRegularBitRotation(6);
      const y = getRegularBitRotation(3);
      const result = getRegularRotation(3);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], result]];
    })(),
    DifferenceOfSixAndFour: (() => {
      const x = getRegularBitRotation(6);
      const y = getRegularBitRotation(4);
      const result = getRegularRotation(2);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], result]];
    })(),
    DifferenceOfSixAndFive: (() => {
      const x = getRegularBitRotation(6);
      const y = getRegularBitRotation(5);
      const result = getRegularRotation(1);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], result]];
    })(),
    DifferenceOfSixAndSix: (() => {
      const x = getRegularBitRotation(6);
      const y = getRegularBitRotation(6);
      const result = getRegularRotation(8);
      const borrow = getRegularBitRotation(1);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], result, borrow]];
    })(),
    DifferenceOfSixAndSeven: (() => {
      const x = getRegularBitRotation(6);
      const y = getRegularBitRotation(7);
      const result = getRegularRotation(7);
      const borrow = getRegularBitRotation(1);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], result, borrow]];
    })(),
    DifferenceOfSixAndEight: (() => {
      const x = getRegularBitRotation(6);
      const y = getRegularBitRotation(8);
      const result = getRegularRotation(6);
      const borrow = getRegularBitRotation(1);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], result, borrow]];
    })(),
    // Display 7 - N (N = 1-8)
    DifferenceOfSevenAndOne: (() => {
      const x = getRegularBitRotation(7);
      const y = getRegularBitRotation(1);
      const result = getRegularRotation(6);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], result]];
    })(),
    DifferenceOfSevenAndTwo: (() => {
      const x = getRegularBitRotation(7);
      const y = getRegularBitRotation(2);
      const result = getRegularRotation(5);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], result]];
    })(),
    DifferenceOfSevenAndThree: (() => {
      const x = getRegularBitRotation(7);
      const y = getRegularBitRotation(3);
      const result = getRegularRotation(4);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], result]];
    })(),
    DifferenceOfSevenAndFour: (() => {
      const x = getRegularBitRotation(7);
      const y = getRegularBitRotation(4);
      const result = getRegularRotation(3);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], result]];
    })(),
    DifferenceOfSevenAndFive: (() => {
      const x = getRegularBitRotation(7);
      const y = getRegularBitRotation(5);
      const result = getRegularRotation(2);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], result]];
    })(),
    DifferenceOfSevenAndSix: (() => {
      const x = getRegularBitRotation(7);
      const y = getRegularBitRotation(6);
      const result = getRegularRotation(1);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], result]];
    })(),
    DifferenceOfSevenAndSeven: (() => {
      const x = getRegularBitRotation(7);
      const y = getRegularBitRotation(7);
      const result = getRegularRotation(8);
      const borrow = getRegularRotation(8);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], result, borrow]];
    })(),
    DifferenceOfSevenAndEight: (() => {
      const x = getRegularBitRotation(7);
      const y = getRegularBitRotation(8);
      const result = getRegularRotation(7);
      const borrow = getRegularBitRotation(1);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], result, borrow]];
    })(),
    // Display 8 - N (N = 1-8)
    DifferenceOfEightAndOne: (() => {
      const x = getRegularBitRotation(8);
      const y = getRegularBitRotation(1);
      const result = getRegularRotation(7);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], result]];
    })(),
    DifferenceOfEightAndTwo: (() => {
      const x = getRegularBitRotation(8);
      const y = getRegularBitRotation(2);
      const result = getRegularRotation(6);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], result]];
    })(),
    DifferenceOfEightAndThree: (() => {
      const x = getRegularBitRotation(8);
      const y = getRegularBitRotation(3);
      const result = getRegularRotation(5);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], result]];
    })(),
    DifferenceOfEightAndFour: (() => {
      const x = getRegularBitRotation(8);
      const y = getRegularBitRotation(4);
      const result = getRegularRotation(4);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], result]];
    })(),
    DifferenceOfEightAndFive: (() => {
      const x = getRegularBitRotation(8);
      const y = getRegularBitRotation(5);
      const result = getRegularRotation(3);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], result]];
    })(),
    DifferenceOfEightAndSix: (() => {
      const x = getRegularBitRotation(8);
      const y = getRegularBitRotation(6);
      const result = getRegularRotation(3);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], result]];
    })(),
    DifferenceOfEightAndSeven: (() => {
      const x = getRegularBitRotation(8);
      const y = getRegularBitRotation(7);
      const result = getRegularRotation(1);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], result]];
    })(),
    DifferenceOfEightAndEight: (() => {
      const x = getRegularBitRotation(8);
      const y = getRegularBitRotation(8);
      const result = getRegularRotation(8);
      const borrow = getRegularBitRotation(1);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], result, borrow]];
    })()
  };

  // src/concepts/round8/model/series/greaterThan.cases.ts
  var GreaterThanSeries = {
    // Display 1 > N (N = 1-8)
    // 1 is smallest, so 1 > X is always False except 1 == 1
    GreaterThanOneAndOne: (() => {
      const x = getRegularBitRotation(1);
      const y = getRegularBitRotation(1);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], 0]];
    })(),
    GreaterThanOneAndTwo: (() => {
      const x = getRegularBitRotation(1);
      const y = getRegularBitRotation(2);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], 0]];
    })(),
    GreaterThanOneAndThree: (() => {
      const x = getRegularBitRotation(1);
      const y = getRegularBitRotation(3);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], 0]];
    })(),
    GreaterThanOneAndFour: (() => {
      const x = getRegularBitRotation(1);
      const y = getRegularBitRotation(4);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], 0]];
    })(),
    GreaterThanOneAndFive: (() => {
      const x = getRegularBitRotation(1);
      const y = getRegularBitRotation(5);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], 0]];
    })(),
    GreaterThanOneAndSix: (() => {
      const x = getRegularBitRotation(1);
      const y = getRegularBitRotation(6);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], 0]];
    })(),
    GreaterThanOneAndSeven: (() => {
      const x = getRegularBitRotation(1);
      const y = getRegularBitRotation(7);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], 0]];
    })(),
    GreaterThanOneAndEight: (() => {
      const x = getRegularBitRotation(1);
      const y = getRegularBitRotation(8);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], 0]];
    })(),
    // Display 2 > N (N = 1-8)
    GreaterThanTwoAndOne: (() => {
      const x = getRegularBitRotation(2);
      const y = getRegularBitRotation(1);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], 1]];
    })(),
    GreaterThanTwoAndTwo: (() => {
      const x = getRegularBitRotation(2);
      const y = getRegularBitRotation(2);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], 0]];
    })(),
    GreaterThanTwoAndThree: (() => {
      const x = getRegularBitRotation(2);
      const y = getRegularBitRotation(3);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], 0]];
    })(),
    GreaterThanTwoAndFour: (() => {
      const x = getRegularBitRotation(2);
      const y = getRegularBitRotation(4);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], 0]];
    })(),
    GreaterThanTwoAndFive: (() => {
      const x = getRegularBitRotation(2);
      const y = getRegularBitRotation(5);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], 0]];
    })(),
    GreaterThanTwoAndSix: (() => {
      const x = getRegularBitRotation(2);
      const y = getRegularBitRotation(6);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], 0]];
    })(),
    GreaterThanTwoAndSeven: (() => {
      const x = getRegularBitRotation(2);
      const y = getRegularBitRotation(7);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], 0]];
    })(),
    GreaterThanTwoAndEight: (() => {
      const x = getRegularBitRotation(2);
      const y = getRegularBitRotation(8);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], 0]];
    })(),
    // Display 3 > N (N = 1-8)
    GreaterThanThreeAndOne: (() => {
      const x = getRegularBitRotation(3);
      const y = getRegularBitRotation(1);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], 1]];
    })(),
    GreaterThanThreeAndTwo: (() => {
      const x = getRegularBitRotation(3);
      const y = getRegularBitRotation(2);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], 1]];
    })(),
    GreaterThanThreeAndThree: (() => {
      const x = getRegularBitRotation(3);
      const y = getRegularBitRotation(3);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], 0]];
    })(),
    GreaterThanThreeAndFour: (() => {
      const x = getRegularBitRotation(3);
      const y = getRegularBitRotation(4);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], 0]];
    })(),
    GreaterThanThreeAndFive: (() => {
      const x = getRegularBitRotation(3);
      const y = getRegularBitRotation(5);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], 0]];
    })(),
    GreaterThanThreeAndSix: (() => {
      const x = getRegularBitRotation(3);
      const y = getRegularBitRotation(6);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], 0]];
    })(),
    GreaterThanThreeAndSeven: (() => {
      const x = getRegularBitRotation(3);
      const y = getRegularBitRotation(7);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], 0]];
    })(),
    GreaterThanThreeAndEight: (() => {
      const x = getRegularBitRotation(3);
      const y = getRegularBitRotation(8);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], 0]];
    })(),
    // Display 4 > N (N = 1-8)
    GreaterThanFourAndOne: (() => {
      const x = getRegularBitRotation(4);
      const y = getRegularBitRotation(1);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], 1]];
    })(),
    GreaterThanFourAndTwo: (() => {
      const x = getRegularBitRotation(4);
      const y = getRegularBitRotation(2);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], 1]];
    })(),
    GreaterThanFourAndThree: (() => {
      const x = getRegularBitRotation(4);
      const y = getRegularBitRotation(3);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], 1]];
    })(),
    GreaterThanFourAndFour: (() => {
      const x = getRegularBitRotation(4);
      const y = getRegularBitRotation(4);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], 0]];
    })(),
    GreaterThanFourAndFive: (() => {
      const x = getRegularBitRotation(4);
      const y = getRegularBitRotation(5);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], 0]];
    })(),
    GreaterThanFourAndSix: (() => {
      const x = getRegularBitRotation(4);
      const y = getRegularBitRotation(6);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], 0]];
    })(),
    GreaterThanFourAndSeven: (() => {
      const x = getRegularBitRotation(4);
      const y = getRegularBitRotation(7);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], 0]];
    })(),
    GreaterThanFourAndEight: (() => {
      const x = getRegularBitRotation(4);
      const y = getRegularBitRotation(8);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], 0]];
    })(),
    // Display 5 > N (N = 1-8)
    GreaterThanFiveAndOne: (() => {
      const x = getRegularBitRotation(5);
      const y = getRegularBitRotation(1);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], 1]];
    })(),
    GreaterThanFiveAndTwo: (() => {
      const x = getRegularBitRotation(5);
      const y = getRegularBitRotation(2);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], 1]];
    })(),
    GreaterThanFiveAndThree: (() => {
      const x = getRegularBitRotation(5);
      const y = getRegularBitRotation(3);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], 1]];
    })(),
    GreaterThanFiveAndFour: (() => {
      const x = getRegularBitRotation(5);
      const y = getRegularBitRotation(4);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], 1]];
    })(),
    GreaterThanFiveAndFive: (() => {
      const x = getRegularBitRotation(5);
      const y = getRegularBitRotation(5);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], 0]];
    })(),
    GreaterThanFiveAndSix: (() => {
      const x = getRegularBitRotation(5);
      const y = getRegularBitRotation(6);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], 0]];
    })(),
    GreaterThanFiveAndSeven: (() => {
      const x = getRegularBitRotation(5);
      const y = getRegularBitRotation(7);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], 0]];
    })(),
    GreaterThanFiveAndEight: (() => {
      const x = getRegularBitRotation(5);
      const y = getRegularBitRotation(8);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], 0]];
    })(),
    // Display 6 > N (N = 1-8)
    GreaterThanSixAndOne: (() => {
      const x = getRegularBitRotation(6);
      const y = getRegularBitRotation(1);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], 1]];
    })(),
    GreaterThanSixAndTwo: (() => {
      const x = getRegularBitRotation(6);
      const y = getRegularBitRotation(2);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], 1]];
    })(),
    GreaterThanSixAndThree: (() => {
      const x = getRegularBitRotation(6);
      const y = getRegularBitRotation(3);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], 1]];
    })(),
    GreaterThanSixAndFour: (() => {
      const x = getRegularBitRotation(6);
      const y = getRegularBitRotation(4);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], 1]];
    })(),
    GreaterThanSixAndFive: (() => {
      const x = getRegularBitRotation(6);
      const y = getRegularBitRotation(5);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], 1]];
    })(),
    GreaterThanSixAndSix: (() => {
      const x = getRegularBitRotation(6);
      const y = getRegularBitRotation(6);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], 0]];
    })(),
    GreaterThanSixAndSeven: (() => {
      const x = getRegularBitRotation(6);
      const y = getRegularBitRotation(7);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], 0]];
    })(),
    GreaterThanSixAndEight: (() => {
      const x = getRegularBitRotation(6);
      const y = getRegularBitRotation(8);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], 0]];
    })(),
    // Display 7 > N (N = 1-8)
    GreaterThanSevenAndOne: (() => {
      const x = getRegularBitRotation(7);
      const y = getRegularBitRotation(1);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], 1]];
    })(),
    GreaterThanSevenAndTwo: (() => {
      const x = getRegularBitRotation(7);
      const y = getRegularBitRotation(2);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], 1]];
    })(),
    GreaterThanSevenAndThree: (() => {
      const x = getRegularBitRotation(7);
      const y = getRegularBitRotation(3);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], 1]];
    })(),
    GreaterThanSevenAndFour: (() => {
      const x = getRegularBitRotation(7);
      const y = getRegularBitRotation(4);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], 1]];
    })(),
    GreaterThanSevenAndFive: (() => {
      const x = getRegularBitRotation(7);
      const y = getRegularBitRotation(5);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], 1]];
    })(),
    GreaterThanSevenAndSix: (() => {
      const x = getRegularBitRotation(7);
      const y = getRegularBitRotation(6);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], 1]];
    })(),
    GreaterThanSevenAndSeven: (() => {
      const x = getRegularBitRotation(7);
      const y = getRegularBitRotation(7);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], 0]];
    })(),
    GreaterThanSevenAndEight: (() => {
      const x = getRegularBitRotation(7);
      const y = getRegularBitRotation(8);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], 0]];
    })(),
    // Display 8 > N (N = 1-8)
    // 8 is largest, so 8 > X is True except when X = 8
    GreaterThanEightAndOne: (() => {
      const x = getRegularBitRotation(8);
      const y = getRegularBitRotation(1);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], 1]];
    })(),
    GreaterThanEightAndTwo: (() => {
      const x = getRegularBitRotation(8);
      const y = getRegularBitRotation(2);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], 1]];
    })(),
    GreaterThanEightAndThree: (() => {
      const x = getRegularBitRotation(8);
      const y = getRegularBitRotation(3);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], 1]];
    })(),
    GreaterThanEightAndFour: (() => {
      const x = getRegularBitRotation(8);
      const y = getRegularBitRotation(4);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], 1]];
    })(),
    GreaterThanEightAndFive: (() => {
      const x = getRegularBitRotation(8);
      const y = getRegularBitRotation(5);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], 1]];
    })(),
    GreaterThanEightAndSix: (() => {
      const x = getRegularBitRotation(8);
      const y = getRegularBitRotation(6);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], 1]];
    })(),
    GreaterThanEightAndSeven: (() => {
      const x = getRegularBitRotation(8);
      const y = getRegularBitRotation(7);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], 1]];
    })(),
    GreaterThanEightAndEight: (() => {
      const x = getRegularBitRotation(8);
      const y = getRegularBitRotation(8);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], 0]];
    })()
  };

  // src/concepts/round8/model/series/lessThan.cases.ts
  var LessThanSeries = {
    // Display 1 < N (N = 1-8)
    // 1 is smallest, so 1 < X is True for X > 1
    LessThanOneAndOne: (() => {
      const x = getRegularBitRotation(1);
      const y = getRegularBitRotation(1);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], 0]];
    })(),
    LessThanOneAndTwo: (() => {
      const x = getRegularBitRotation(1);
      const y = getRegularBitRotation(2);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], 1]];
    })(),
    LessThanOneAndThree: (() => {
      const x = getRegularBitRotation(1);
      const y = getRegularBitRotation(3);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], 1]];
    })(),
    LessThanOneAndFour: (() => {
      const x = getRegularBitRotation(1);
      const y = getRegularBitRotation(4);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], 1]];
    })(),
    LessThanOneAndFive: (() => {
      const x = getRegularBitRotation(1);
      const y = getRegularBitRotation(5);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], 1]];
    })(),
    LessThanOneAndSix: (() => {
      const x = getRegularBitRotation(1);
      const y = getRegularBitRotation(6);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], 1]];
    })(),
    LessThanOneAndSeven: (() => {
      const x = getRegularBitRotation(1);
      const y = getRegularBitRotation(7);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], 1]];
    })(),
    LessThanOneAndEight: (() => {
      const x = getRegularBitRotation(1);
      const y = getRegularBitRotation(8);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], 1]];
    })(),
    // Display 2 < N (N = 1-8)
    LessThanTwoAndOne: (() => {
      const x = getRegularBitRotation(2);
      const y = getRegularBitRotation(1);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], 0]];
    })(),
    LessThanTwoAndTwo: (() => {
      const x = getRegularBitRotation(2);
      const y = getRegularBitRotation(2);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], 0]];
    })(),
    LessThanTwoAndThree: (() => {
      const x = getRegularBitRotation(2);
      const y = getRegularBitRotation(3);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], 1]];
    })(),
    LessThanTwoAndFour: (() => {
      const x = getRegularBitRotation(2);
      const y = getRegularBitRotation(4);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], 1]];
    })(),
    LessThanTwoAndFive: (() => {
      const x = getRegularBitRotation(2);
      const y = getRegularBitRotation(5);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], 1]];
    })(),
    LessThanTwoAndSix: (() => {
      const x = getRegularBitRotation(2);
      const y = getRegularBitRotation(6);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], 1]];
    })(),
    LessThanTwoAndSeven: (() => {
      const x = getRegularBitRotation(2);
      const y = getRegularBitRotation(7);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], 1]];
    })(),
    LessThanTwoAndEight: (() => {
      const x = getRegularBitRotation(2);
      const y = getRegularBitRotation(8);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], 1]];
    })(),
    // Display 3 < N (N = 1-8)
    LessThanThreeAndOne: (() => {
      const x = getRegularBitRotation(3);
      const y = getRegularBitRotation(1);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], 0]];
    })(),
    LessThanThreeAndTwo: (() => {
      const x = getRegularBitRotation(3);
      const y = getRegularBitRotation(2);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], 0]];
    })(),
    LessThanThreeAndThree: (() => {
      const x = getRegularBitRotation(3);
      const y = getRegularBitRotation(3);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], 0]];
    })(),
    LessThanThreeAndFour: (() => {
      const x = getRegularBitRotation(3);
      const y = getRegularBitRotation(4);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], 1]];
    })(),
    LessThanThreeAndFive: (() => {
      const x = getRegularBitRotation(3);
      const y = getRegularBitRotation(5);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], 1]];
    })(),
    LessThanThreeAndSix: (() => {
      const x = getRegularBitRotation(3);
      const y = getRegularBitRotation(6);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], 1]];
    })(),
    LessThanThreeAndSeven: (() => {
      const x = getRegularBitRotation(3);
      const y = getRegularBitRotation(7);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], 1]];
    })(),
    LessThanThreeAndEight: (() => {
      const x = getRegularBitRotation(3);
      const y = getRegularBitRotation(8);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], 1]];
    })(),
    // Display 4 < N (N = 1-8)
    LessThanFourAndOne: (() => {
      const x = getRegularBitRotation(4);
      const y = getRegularBitRotation(1);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], 0]];
    })(),
    LessThanFourAndTwo: (() => {
      const x = getRegularBitRotation(4);
      const y = getRegularBitRotation(2);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], 0]];
    })(),
    LessThanFourAndThree: (() => {
      const x = getRegularBitRotation(4);
      const y = getRegularBitRotation(3);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], 0]];
    })(),
    LessThanFourAndFour: (() => {
      const x = getRegularBitRotation(4);
      const y = getRegularBitRotation(4);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], 0]];
    })(),
    LessThanFourAndFive: (() => {
      const x = getRegularBitRotation(4);
      const y = getRegularBitRotation(5);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], 1]];
    })(),
    LessThanFourAndSix: (() => {
      const x = getRegularBitRotation(4);
      const y = getRegularBitRotation(6);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], 1]];
    })(),
    LessThanFourAndSeven: (() => {
      const x = getRegularBitRotation(4);
      const y = getRegularBitRotation(7);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], 1]];
    })(),
    LessThanFourAndEight: (() => {
      const x = getRegularBitRotation(4);
      const y = getRegularBitRotation(8);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], 1]];
    })(),
    // Display 5 < N (N = 1-8)
    LessThanFiveAndOne: (() => {
      const x = getRegularBitRotation(5);
      const y = getRegularBitRotation(1);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], 0]];
    })(),
    LessThanFiveAndTwo: (() => {
      const x = getRegularBitRotation(5);
      const y = getRegularBitRotation(2);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], 0]];
    })(),
    LessThanFiveAndThree: (() => {
      const x = getRegularBitRotation(5);
      const y = getRegularBitRotation(3);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], 0]];
    })(),
    LessThanFiveAndFour: (() => {
      const x = getRegularBitRotation(5);
      const y = getRegularBitRotation(4);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], 0]];
    })(),
    LessThanFiveAndFive: (() => {
      const x = getRegularBitRotation(5);
      const y = getRegularBitRotation(5);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], 0]];
    })(),
    LessThanFiveAndSix: (() => {
      const x = getRegularBitRotation(5);
      const y = getRegularBitRotation(6);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], 1]];
    })(),
    LessThanFiveAndSeven: (() => {
      const x = getRegularBitRotation(5);
      const y = getRegularBitRotation(7);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], 1]];
    })(),
    LessThanFiveAndEight: (() => {
      const x = getRegularBitRotation(5);
      const y = getRegularBitRotation(8);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], 1]];
    })(),
    // Display 6 < N (N = 1-8)
    LessThanSixAndOne: (() => {
      const x = getRegularBitRotation(6);
      const y = getRegularBitRotation(1);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], 0]];
    })(),
    LessThanSixAndTwo: (() => {
      const x = getRegularBitRotation(6);
      const y = getRegularBitRotation(2);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], 0]];
    })(),
    LessThanSixAndThree: (() => {
      const x = getRegularBitRotation(6);
      const y = getRegularBitRotation(3);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], 0]];
    })(),
    LessThanSixAndFour: (() => {
      const x = getRegularBitRotation(6);
      const y = getRegularBitRotation(4);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], 0]];
    })(),
    LessThanSixAndFive: (() => {
      const x = getRegularBitRotation(6);
      const y = getRegularBitRotation(5);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], 0]];
    })(),
    LessThanSixAndSix: (() => {
      const x = getRegularBitRotation(6);
      const y = getRegularBitRotation(6);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], 0]];
    })(),
    LessThanSixAndSeven: (() => {
      const x = getRegularBitRotation(6);
      const y = getRegularBitRotation(7);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], 1]];
    })(),
    LessThanSixAndEight: (() => {
      const x = getRegularBitRotation(6);
      const y = getRegularBitRotation(8);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], 1]];
    })(),
    // Display 7 < N (N = 1-8)
    LessThanSevenAndOne: (() => {
      const x = getRegularBitRotation(7);
      const y = getRegularBitRotation(1);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], 0]];
    })(),
    LessThanSevenAndTwo: (() => {
      const x = getRegularBitRotation(7);
      const y = getRegularBitRotation(2);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], 0]];
    })(),
    LessThanSevenAndThree: (() => {
      const x = getRegularBitRotation(7);
      const y = getRegularBitRotation(3);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], 0]];
    })(),
    LessThanSevenAndFour: (() => {
      const x = getRegularBitRotation(7);
      const y = getRegularBitRotation(4);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], 0]];
    })(),
    LessThanSevenAndFive: (() => {
      const x = getRegularBitRotation(7);
      const y = getRegularBitRotation(5);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], 0]];
    })(),
    LessThanSevenAndSix: (() => {
      const x = getRegularBitRotation(7);
      const y = getRegularBitRotation(6);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], 0]];
    })(),
    LessThanSevenAndSeven: (() => {
      const x = getRegularBitRotation(7);
      const y = getRegularBitRotation(7);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], 0]];
    })(),
    LessThanSevenAndEight: (() => {
      const x = getRegularBitRotation(7);
      const y = getRegularBitRotation(8);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], 1]];
    })(),
    // Display 8 < N (N = 1-8)
    // 8 is largest, so 8 < X is always False
    LessThanEightAndOne: (() => {
      const x = getRegularBitRotation(8);
      const y = getRegularBitRotation(1);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], 0]];
    })(),
    LessThanEightAndTwo: (() => {
      const x = getRegularBitRotation(8);
      const y = getRegularBitRotation(2);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], 0]];
    })(),
    LessThanEightAndThree: (() => {
      const x = getRegularBitRotation(8);
      const y = getRegularBitRotation(3);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], 0]];
    })(),
    LessThanEightAndFour: (() => {
      const x = getRegularBitRotation(8);
      const y = getRegularBitRotation(4);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], 0]];
    })(),
    LessThanEightAndFive: (() => {
      const x = getRegularBitRotation(8);
      const y = getRegularBitRotation(5);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], 0]];
    })(),
    LessThanEightAndSix: (() => {
      const x = getRegularBitRotation(8);
      const y = getRegularBitRotation(6);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], 0]];
    })(),
    LessThanEightAndSeven: (() => {
      const x = getRegularBitRotation(8);
      const y = getRegularBitRotation(7);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], 0]];
    })(),
    LessThanEightAndEight: (() => {
      const x = getRegularBitRotation(8);
      const y = getRegularBitRotation(8);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], 0]];
    })()
  };

  // src/concepts/round8/model/series/shiftedGreaterThan.cases.ts
  var ShiftedGreaterThanSeries = {
    // Display 0 [0,0,1] > N (N = 0-7)
    // Display 0 is MINIMUM (Marquee), so 0 > X is always False
    ShiftedGreaterThanZeroAndZero: (() => {
      const x = getShiftedBitRotation(8);
      const y = getShiftedBitRotation(8);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], 0]];
    })(),
    ShiftedGreaterThanZeroAndOne: (() => {
      const x = getShiftedBitRotation(8);
      const y = getShiftedBitRotation(1);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], 0]];
    })(),
    ShiftedGreaterThanZeroAndTwo: (() => {
      const x = getShiftedBitRotation(8);
      const y = getShiftedBitRotation(2);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], 0]];
    })(),
    ShiftedGreaterThanZeroAndThree: (() => {
      const x = getShiftedBitRotation(8);
      const y = getShiftedBitRotation(3);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], 0]];
    })(),
    ShiftedGreaterThanZeroAndFour: (() => {
      const x = getShiftedBitRotation(8);
      const y = getShiftedBitRotation(4);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], 0]];
    })(),
    ShiftedGreaterThanZeroAndFive: (() => {
      const x = getShiftedBitRotation(8);
      const y = getShiftedBitRotation(5);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], 0]];
    })(),
    ShiftedGreaterThanZeroAndSix: (() => {
      const x = getShiftedBitRotation(8);
      const y = getShiftedBitRotation(6);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], 0]];
    })(),
    ShiftedGreaterThanZeroAndSeven: (() => {
      const x = getShiftedBitRotation(8);
      const y = getShiftedBitRotation(7);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], 0]];
    })(),
    // Display 1 [0,1,0] > N (N = 0-7)
    ShiftedGreaterThanOneAndZero: (() => {
      const x = getShiftedBitRotation(1);
      const y = getShiftedBitRotation(8);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], 1]];
    })(),
    ShiftedGreaterThanOneAndOne: (() => {
      const x = getShiftedBitRotation(1);
      const y = getShiftedBitRotation(1);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], 0]];
    })(),
    ShiftedGreaterThanOneAndTwo: (() => {
      const x = getShiftedBitRotation(1);
      const y = getShiftedBitRotation(2);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], 0]];
    })(),
    ShiftedGreaterThanOneAndThree: (() => {
      const x = getShiftedBitRotation(1);
      const y = getShiftedBitRotation(3);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], 0]];
    })(),
    ShiftedGreaterThanOneAndFour: (() => {
      const x = getShiftedBitRotation(1);
      const y = getShiftedBitRotation(4);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], 0]];
    })(),
    ShiftedGreaterThanOneAndFive: (() => {
      const x = getShiftedBitRotation(1);
      const y = getShiftedBitRotation(5);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], 0]];
    })(),
    ShiftedGreaterThanOneAndSix: (() => {
      const x = getShiftedBitRotation(1);
      const y = getShiftedBitRotation(6);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], 0]];
    })(),
    ShiftedGreaterThanOneAndSeven: (() => {
      const x = getShiftedBitRotation(1);
      const y = getShiftedBitRotation(7);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], 0]];
    })(),
    // Display 2 [0,1,1] > N (N = 0-7)
    ShiftedGreaterThanTwoAndZero: (() => {
      const x = getShiftedBitRotation(2);
      const y = getShiftedBitRotation(8);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], 1]];
    })(),
    ShiftedGreaterThanTwoAndOne: (() => {
      const x = getShiftedBitRotation(2);
      const y = getShiftedBitRotation(1);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], 1]];
    })(),
    ShiftedGreaterThanTwoAndTwo: (() => {
      const x = getShiftedBitRotation(2);
      const y = getShiftedBitRotation(2);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], 0]];
    })(),
    ShiftedGreaterThanTwoAndThree: (() => {
      const x = getShiftedBitRotation(2);
      const y = getShiftedBitRotation(3);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], 0]];
    })(),
    ShiftedGreaterThanTwoAndFour: (() => {
      const x = getShiftedBitRotation(2);
      const y = getShiftedBitRotation(4);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], 0]];
    })(),
    ShiftedGreaterThanTwoAndFive: (() => {
      const x = getShiftedBitRotation(2);
      const y = getShiftedBitRotation(5);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], 0]];
    })(),
    ShiftedGreaterThanTwoAndSix: (() => {
      const x = getShiftedBitRotation(2);
      const y = getShiftedBitRotation(6);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], 0]];
    })(),
    ShiftedGreaterThanTwoAndSeven: (() => {
      const x = getShiftedBitRotation(2);
      const y = getShiftedBitRotation(7);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], 0]];
    })(),
    // Display 3 [1,0,0] > N (N = 0-7)
    ShiftedGreaterThanThreeAndZero: (() => {
      const x = getShiftedBitRotation(3);
      const y = getShiftedBitRotation(8);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], 1]];
    })(),
    ShiftedGreaterThanThreeAndOne: (() => {
      const x = getShiftedBitRotation(3);
      const y = getShiftedBitRotation(1);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], 1]];
    })(),
    ShiftedGreaterThanThreeAndTwo: (() => {
      const x = getShiftedBitRotation(3);
      const y = getShiftedBitRotation(2);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], 1]];
    })(),
    ShiftedGreaterThanThreeAndThree: (() => {
      const x = getShiftedBitRotation(3);
      const y = getShiftedBitRotation(3);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], 0]];
    })(),
    ShiftedGreaterThanThreeAndFour: (() => {
      const x = getShiftedBitRotation(3);
      const y = getShiftedBitRotation(4);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], 0]];
    })(),
    ShiftedGreaterThanThreeAndFive: (() => {
      const x = getShiftedBitRotation(3);
      const y = getShiftedBitRotation(5);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], 0]];
    })(),
    ShiftedGreaterThanThreeAndSix: (() => {
      const x = getShiftedBitRotation(3);
      const y = getShiftedBitRotation(6);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], 0]];
    })(),
    ShiftedGreaterThanThreeAndSeven: (() => {
      const x = getShiftedBitRotation(3);
      const y = getShiftedBitRotation(7);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], 0]];
    })(),
    // Display 4 [1,0,1] > N (N = 0-7)
    ShiftedGreaterThanFourAndZero: (() => {
      const x = getShiftedBitRotation(4);
      const y = getShiftedBitRotation(8);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], 1]];
    })(),
    ShiftedGreaterThanFourAndOne: (() => {
      const x = getShiftedBitRotation(4);
      const y = getShiftedBitRotation(1);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], 1]];
    })(),
    ShiftedGreaterThanFourAndTwo: (() => {
      const x = getShiftedBitRotation(4);
      const y = getShiftedBitRotation(2);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], 1]];
    })(),
    ShiftedGreaterThanFourAndThree: (() => {
      const x = getShiftedBitRotation(4);
      const y = getShiftedBitRotation(3);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], 1]];
    })(),
    ShiftedGreaterThanFourAndFour: (() => {
      const x = getShiftedBitRotation(4);
      const y = getShiftedBitRotation(4);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], 0]];
    })(),
    ShiftedGreaterThanFourAndFive: (() => {
      const x = getShiftedBitRotation(4);
      const y = getShiftedBitRotation(5);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], 0]];
    })(),
    ShiftedGreaterThanFourAndSix: (() => {
      const x = getShiftedBitRotation(4);
      const y = getShiftedBitRotation(6);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], 0]];
    })(),
    ShiftedGreaterThanFourAndSeven: (() => {
      const x = getShiftedBitRotation(4);
      const y = getShiftedBitRotation(7);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], 0]];
    })(),
    // Display 5 [1,1,0] > N (N = 0-7)
    ShiftedGreaterThanFiveAndZero: (() => {
      const x = getShiftedBitRotation(5);
      const y = getShiftedBitRotation(8);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], 1]];
    })(),
    ShiftedGreaterThanFiveAndOne: (() => {
      const x = getShiftedBitRotation(5);
      const y = getShiftedBitRotation(1);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], 1]];
    })(),
    ShiftedGreaterThanFiveAndTwo: (() => {
      const x = getShiftedBitRotation(5);
      const y = getShiftedBitRotation(2);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], 1]];
    })(),
    ShiftedGreaterThanFiveAndThree: (() => {
      const x = getShiftedBitRotation(5);
      const y = getShiftedBitRotation(3);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], 1]];
    })(),
    ShiftedGreaterThanFiveAndFour: (() => {
      const x = getShiftedBitRotation(5);
      const y = getShiftedBitRotation(4);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], 1]];
    })(),
    ShiftedGreaterThanFiveAndFive: (() => {
      const x = getShiftedBitRotation(5);
      const y = getShiftedBitRotation(5);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], 0]];
    })(),
    ShiftedGreaterThanFiveAndSix: (() => {
      const x = getShiftedBitRotation(5);
      const y = getShiftedBitRotation(6);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], 0]];
    })(),
    ShiftedGreaterThanFiveAndSeven: (() => {
      const x = getShiftedBitRotation(5);
      const y = getShiftedBitRotation(7);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], 0]];
    })(),
    // Display 6 [1,1,1] > N (N = 0-7)
    ShiftedGreaterThanSixAndZero: (() => {
      const x = getShiftedBitRotation(6);
      const y = getShiftedBitRotation(8);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], 1]];
    })(),
    ShiftedGreaterThanSixAndOne: (() => {
      const x = getShiftedBitRotation(6);
      const y = getShiftedBitRotation(1);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], 1]];
    })(),
    ShiftedGreaterThanSixAndTwo: (() => {
      const x = getShiftedBitRotation(6);
      const y = getShiftedBitRotation(2);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], 1]];
    })(),
    ShiftedGreaterThanSixAndThree: (() => {
      const x = getShiftedBitRotation(6);
      const y = getShiftedBitRotation(3);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], 1]];
    })(),
    ShiftedGreaterThanSixAndFour: (() => {
      const x = getShiftedBitRotation(6);
      const y = getShiftedBitRotation(4);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], 1]];
    })(),
    ShiftedGreaterThanSixAndFive: (() => {
      const x = getShiftedBitRotation(6);
      const y = getShiftedBitRotation(5);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], 1]];
    })(),
    ShiftedGreaterThanSixAndSix: (() => {
      const x = getShiftedBitRotation(6);
      const y = getShiftedBitRotation(6);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], 0]];
    })(),
    ShiftedGreaterThanSixAndSeven: (() => {
      const x = getShiftedBitRotation(6);
      const y = getShiftedBitRotation(7);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], 0]];
    })(),
    // Display 7 [0,0,0] > N (N = 0-7)
    // Display 7 is MAXIMUM (Full Twist), so 7 > X is True except when X = 7
    ShiftedGreaterThanSevenAndZero: (() => {
      const x = getShiftedBitRotation(7);
      const y = getShiftedBitRotation(8);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], 1]];
    })(),
    ShiftedGreaterThanSevenAndOne: (() => {
      const x = getShiftedBitRotation(7);
      const y = getShiftedBitRotation(1);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], 1]];
    })(),
    ShiftedGreaterThanSevenAndTwo: (() => {
      const x = getShiftedBitRotation(7);
      const y = getShiftedBitRotation(2);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], 1]];
    })(),
    ShiftedGreaterThanSevenAndThree: (() => {
      const x = getShiftedBitRotation(7);
      const y = getShiftedBitRotation(3);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], 1]];
    })(),
    ShiftedGreaterThanSevenAndFour: (() => {
      const x = getShiftedBitRotation(7);
      const y = getShiftedBitRotation(4);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], 1]];
    })(),
    ShiftedGreaterThanSevenAndFive: (() => {
      const x = getShiftedBitRotation(7);
      const y = getShiftedBitRotation(5);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], 1]];
    })(),
    ShiftedGreaterThanSevenAndSix: (() => {
      const x = getShiftedBitRotation(7);
      const y = getShiftedBitRotation(6);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], 1]];
    })(),
    ShiftedGreaterThanSevenAndSeven: (() => {
      const x = getShiftedBitRotation(7);
      const y = getShiftedBitRotation(7);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], 0]];
    })()
  };

  // src/concepts/round8/model/series/shiftedDifference.cases.ts
  var ShiftedDifferenceSeries = {
    // This would be 8, but instead Truncates the Rotation
    ShiftedDifferenceOfOneAndOne: (() => {
      const x = getShiftedBitRotation(1);
      const y = getShiftedBitRotation(1);
      const result = getShiftedRotation(8);
      const borrow = getRegularRotation(1);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], result, borrow]];
    })(),
    ShiftedDifferenceOfOneAndTwo: (() => {
      const x = getShiftedBitRotation(1);
      const y = getShiftedBitRotation(2);
      const result = getShiftedRotation(7);
      const borrow = getRegularBitRotation(1);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], result, borrow]];
    })(),
    ShiftedDifferenceOfOneAndThree: (() => {
      const x = getShiftedBitRotation(1);
      const y = getShiftedBitRotation(3);
      const result = getShiftedRotation(6);
      const borrow = getRegularBitRotation(1);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], result, borrow]];
    })(),
    ShiftedDifferenceOfOneAndFour: (() => {
      const x = getShiftedBitRotation(1);
      const y = getShiftedBitRotation(4);
      const result = getShiftedRotation(5);
      const borrow = getRegularBitRotation(1);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], result, borrow]];
    })(),
    ShiftedDifferenceOfOneAndFive: (() => {
      const x = getShiftedBitRotation(1);
      const y = getShiftedBitRotation(5);
      const result = getShiftedRotation(4);
      const borrow = getRegularBitRotation(1);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], result, borrow]];
    })(),
    ShiftedDifferenceOfOneAndSix: (() => {
      const x = getShiftedBitRotation(1);
      const y = getShiftedBitRotation(6);
      const result = getShiftedRotation(3);
      const borrow = getRegularBitRotation(1);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], result, borrow]];
    })(),
    ShiftedDifferenceOfOneAndSeven: (() => {
      const x = getShiftedBitRotation(1);
      const y = getShiftedBitRotation(7);
      const result = getShiftedRotation(2);
      const borrow = getRegularBitRotation(1);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], result, borrow]];
    })(),
    ShiftedDifferenceOfOneAndMarqueeAsBorrow: (() => {
      const x = getShiftedBitRotation(1);
      const y = getShiftedBitRotation(8);
      const result = getShiftedRotation(7);
      const carry = getRegularBitRotation(1);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], result, carry]];
    })(),
    ShiftedDifferenceOfTwoAndOne: (() => {
      const x = getShiftedBitRotation(2);
      const y = getShiftedBitRotation(1);
      const result = getShiftedRotation(1);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], result]];
    })(),
    // Would be 8, Truncates Position
    ShiftedDifferenceOfTwoAndTwo: (() => {
      const x = getShiftedBitRotation(2);
      const y = getShiftedBitRotation(2);
      const result = getShiftedRotation(8);
      const borrow = getRegularBitRotation(1);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], result, borrow]];
    })(),
    ShiftedDifferenceOfTwoAndThree: (() => {
      const x = getShiftedBitRotation(2);
      const y = getShiftedBitRotation(3);
      const result = getShiftedRotation(7);
      const borrow = getRegularBitRotation(1);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], result, borrow]];
    })(),
    ShiftedDifferenceOfTwoAndFour: (() => {
      const x = getShiftedBitRotation(2);
      const y = getShiftedBitRotation(4);
      const result = getShiftedRotation(6);
      const borrow = getRegularBitRotation(1);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], result, borrow]];
    })(),
    ShiftedDifferenceOfTwoAndFive: (() => {
      const x = getShiftedBitRotation(2);
      const y = getShiftedBitRotation(5);
      const result = getShiftedRotation(5);
      const borrow = getRegularBitRotation(1);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], result, borrow]];
    })(),
    ShiftedDifferenceOfTwoAndSix: (() => {
      const x = getShiftedBitRotation(2);
      const y = getShiftedBitRotation(6);
      const result = getShiftedRotation(4);
      const borrow = getRegularBitRotation(1);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], result, borrow]];
    })(),
    ShiftedDifferenceOfTwoAndSeven: (() => {
      const x = getShiftedBitRotation(2);
      const y = getShiftedBitRotation(7);
      const result = getShiftedRotation(3);
      const borrow = getRegularBitRotation(1);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], result, borrow]];
    })(),
    ShiftedDifferenceOfTwoAndMarqueeAsBorrow: (() => {
      const x = getShiftedBitRotation(2);
      const y = getShiftedBitRotation(8);
      const result = getShiftedRotation(1);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], result]];
    })(),
    ShiftedDifferenceOfThreeAndOne: (() => {
      const x = getShiftedBitRotation(3);
      const y = getShiftedBitRotation(1);
      const result = getShiftedRotation(2);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], result]];
    })(),
    ShiftedDifferenceOfThreeAndTwo: (() => {
      const x = getShiftedBitRotation(3);
      const y = getShiftedBitRotation(2);
      const result = getShiftedRotation(1);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], result]];
    })(),
    ShiftedDifferenceOfThreeAndThree: (() => {
      const x = getShiftedBitRotation(3);
      const y = getShiftedBitRotation(3);
      const result = getShiftedRotation(8);
      const borrow = getRegularBitRotation(1);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], result, borrow]];
    })(),
    ShiftedDifferenceOfThreeAndFour: (() => {
      const x = getShiftedBitRotation(3);
      const y = getShiftedBitRotation(4);
      const result = getShiftedRotation(7);
      const borrow = getRegularBitRotation(1);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], result, borrow]];
    })(),
    ShiftedDifferenceOfThreeAndFive: (() => {
      const x = getShiftedBitRotation(3);
      const y = getShiftedBitRotation(5);
      const result = getShiftedRotation(6);
      const borrow = getRegularBitRotation(1);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], result, borrow]];
    })(),
    ShiftedDifferenceOfThreeAndSix: (() => {
      const x = getShiftedBitRotation(3);
      const y = getShiftedBitRotation(6);
      const result = getShiftedRotation(5);
      const borrow = getRegularBitRotation(1);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], result, borrow]];
    })(),
    ShiftedDifferenceOfThreeAndSeven: (() => {
      const x = getShiftedBitRotation(3);
      const y = getShiftedBitRotation(7);
      const result = getShiftedRotation(4);
      const borrow = getRegularBitRotation(1);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], result, borrow]];
    })(),
    ShiftedDifferenceOfThreeAndMarqueeAsBorrow: (() => {
      const x = getShiftedBitRotation(3);
      const y = getShiftedBitRotation(8);
      const result = getShiftedRotation(2);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], result]];
    })(),
    ShiftedDifferenceOfFourAndOne: (() => {
      const x = getShiftedBitRotation(4);
      const y = getShiftedBitRotation(1);
      const result = getShiftedRotation(3);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], result]];
    })(),
    ShiftedDifferenceOfFourAndTwo: (() => {
      const x = getShiftedBitRotation(4);
      const y = getShiftedBitRotation(2);
      const result = getShiftedRotation(2);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], result]];
    })(),
    ShiftedDifferenceOfFourAndThree: (() => {
      const x = getShiftedBitRotation(4);
      const y = getShiftedBitRotation(3);
      const result = getShiftedRotation(1);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], result]];
    })(),
    ShiftedDifferenceOfFourAndFour: (() => {
      const x = getShiftedBitRotation(4);
      const y = getShiftedBitRotation(4);
      const result = getShiftedRotation(8);
      const borrow = getRegularBitRotation(1);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], result, borrow]];
    })(),
    ShiftedDifferenceOfFourAndFive: (() => {
      const x = getShiftedBitRotation(4);
      const y = getShiftedBitRotation(5);
      const result = getShiftedRotation(7);
      const borrow = getRegularBitRotation(1);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], result, borrow]];
    })(),
    ShiftedDifferenceOfFourAndSix: (() => {
      const x = getShiftedBitRotation(4);
      const y = getShiftedBitRotation(6);
      const result = getShiftedRotation(6);
      const borrow = getRegularBitRotation(1);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], result, borrow]];
    })(),
    ShiftedDifferenceOfFourAndSeven: (() => {
      const x = getShiftedBitRotation(4);
      const y = getShiftedBitRotation(7);
      const result = getShiftedRotation(5);
      const borrow = getRegularBitRotation(1);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], result, borrow]];
    })(),
    ShiftedDifferenceOfFourAndMarqueeAsBorrow: (() => {
      const x = getShiftedBitRotation(4);
      const y = getShiftedBitRotation(8);
      const result = getShiftedRotation(3);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], result]];
    })(),
    ShiftedDifferenceOfFiveAndOne: (() => {
      const x = getShiftedBitRotation(5);
      const y = getShiftedBitRotation(1);
      const result = getShiftedRotation(4);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], result]];
    })(),
    ShiftedDifferenceOfFiveAndTwo: (() => {
      const x = getShiftedBitRotation(5);
      const y = getShiftedBitRotation(2);
      const result = getShiftedRotation(3);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], result]];
    })(),
    ShiftedDifferenceOfFiveAndThree: (() => {
      const x = getShiftedBitRotation(5);
      const y = getShiftedBitRotation(3);
      const result = getShiftedRotation(2);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], result]];
    })(),
    ShiftedDifferenceOfFiveAndFour: (() => {
      const x = getShiftedBitRotation(5);
      const y = getShiftedBitRotation(4);
      const result = getShiftedRotation(1);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], result]];
    })(),
    ShiftedDifferenceOfFiveAndFive: (() => {
      const x = getShiftedBitRotation(5);
      const y = getShiftedBitRotation(5);
      const result = getShiftedRotation(8);
      const borrow = getRegularBitRotation(1);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], result, borrow]];
    })(),
    ShiftedDifferenceOfFiveAndSix: (() => {
      const x = getShiftedBitRotation(5);
      const y = getShiftedBitRotation(6);
      const result = getShiftedRotation(7);
      const borrow = getRegularBitRotation(1);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], result, borrow]];
    })(),
    ShiftedDifferenceOfFiveAndSeven: (() => {
      const x = getShiftedBitRotation(5);
      const y = getShiftedBitRotation(7);
      const result = getShiftedRotation(6);
      const borrow = getRegularBitRotation(1);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], result, borrow]];
    })(),
    ShiftedDifferenceOfFiveAndMarqueeAsBorrow: (() => {
      const x = getShiftedBitRotation(5);
      const y = getShiftedBitRotation(8);
      const result = getShiftedRotation(4);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], result]];
    })(),
    ShiftedDifferenceOfSixAndOne: (() => {
      const x = getShiftedBitRotation(6);
      const y = getShiftedBitRotation(1);
      const result = getShiftedRotation(5);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], result]];
    })(),
    ShiftedDifferenceOfSixAndTwo: (() => {
      const x = getShiftedBitRotation(6);
      const y = getShiftedBitRotation(2);
      const result = getShiftedRotation(4);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], result]];
    })(),
    ShiftedDifferenceOfSixAndThree: (() => {
      const x = getShiftedBitRotation(6);
      const y = getShiftedBitRotation(3);
      const result = getShiftedRotation(3);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], result]];
    })(),
    ShiftedDifferenceOfSixAndFour: (() => {
      const x = getShiftedBitRotation(6);
      const y = getShiftedBitRotation(4);
      const result = getShiftedRotation(2);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], result]];
    })(),
    ShiftedDifferenceOfSixAndFive: (() => {
      const x = getShiftedBitRotation(6);
      const y = getShiftedBitRotation(5);
      const result = getShiftedRotation(1);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], result]];
    })(),
    ShiftedDifferenceOfSixAndSix: (() => {
      const x = getShiftedBitRotation(6);
      const y = getShiftedBitRotation(6);
      const result = getShiftedRotation(8);
      const borrow = getRegularBitRotation(1);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], result, borrow]];
    })(),
    ShiftedDifferenceOfSixAndSeven: (() => {
      const x = getShiftedBitRotation(6);
      const y = getShiftedBitRotation(7);
      const result = getShiftedRotation(7);
      const borrow = getRegularBitRotation(1);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], result, borrow]];
    })(),
    ShiftedDifferenceOfSixAndMarqueeAsBorrow: (() => {
      const x = getShiftedBitRotation(6);
      const y = getShiftedBitRotation(8);
      const result = getShiftedRotation(5);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], result]];
    })(),
    ShiftedDifferenceOfSevenAndOne: (() => {
      const x = getShiftedBitRotation(7);
      const y = getShiftedBitRotation(1);
      const result = getShiftedRotation(6);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], result]];
    })(),
    ShiftedDifferenceOfSevenAndTwo: (() => {
      const x = getShiftedBitRotation(7);
      const y = getShiftedBitRotation(2);
      const result = getShiftedRotation(5);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], result]];
    })(),
    ShiftedDifferenceOfSevenAndThree: (() => {
      const x = getShiftedBitRotation(7);
      const y = getShiftedBitRotation(3);
      const result = getShiftedRotation(4);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], result]];
    })(),
    ShiftedDifferenceOfSevenAndFour: (() => {
      const x = getShiftedBitRotation(7);
      const y = getShiftedBitRotation(4);
      const result = getShiftedRotation(3);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], result]];
    })(),
    ShiftedDifferenceOfSevenAndFive: (() => {
      const x = getShiftedBitRotation(7);
      const y = getShiftedBitRotation(5);
      const result = getShiftedRotation(2);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], result]];
    })(),
    ShiftedDifferenceOfSevenAndSix: (() => {
      const x = getShiftedBitRotation(7);
      const y = getShiftedBitRotation(6);
      const result = getShiftedRotation(1);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], result]];
    })(),
    ShiftedDifferenceOfSevenAndSeven: (() => {
      const x = getShiftedBitRotation(7);
      const y = getShiftedBitRotation(7);
      const result = getShiftedRotation(8);
      const borrow = getRegularBitRotation(1);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], result, borrow]];
    })(),
    ShiftedDifferenceOfSevenAndMarqueeAsBorrow: (() => {
      const x = getShiftedBitRotation(7);
      const y = getShiftedBitRotation(8);
      const result = getShiftedRotation(6);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], result]];
    })(),
    ShiftedDifferenceOfMarqueeAsBorrowAndOne: (() => {
      const x = getShiftedBitRotation(8);
      const y = getShiftedBitRotation(1);
      const result = getShiftedRotation(7);
      const borrow = getRegularBitRotation(1);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], result, borrow]];
    })(),
    ShiftedDifferenceOfMarqueeAsBorrowAndTwo: (() => {
      const x = getShiftedBitRotation(8);
      const y = getShiftedBitRotation(2);
      const result = getShiftedRotation(7);
      const borrow = getRegularBitRotation(1);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], result, borrow]];
    })(),
    ShiftedDifferenceOfMarqueeAsBorrowAndThree: (() => {
      const x = getShiftedBitRotation(8);
      const y = getShiftedBitRotation(3);
      const result = getShiftedRotation(6);
      const borrow = getRegularBitRotation(1);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], result, borrow]];
    })(),
    ShiftedDifferenceOfMarqueeAsBorrowAndFour: (() => {
      const x = getShiftedBitRotation(8);
      const y = getShiftedBitRotation(4);
      const result = getShiftedRotation(5);
      const borrow = getRegularBitRotation(1);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], result, borrow]];
    })(),
    ShiftedDifferenceOfMarqueeAsBorrowAndFive: (() => {
      const x = getShiftedBitRotation(8);
      const y = getShiftedBitRotation(5);
      const result = getShiftedRotation(4);
      const borrow = getRegularBitRotation(1);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], result, borrow]];
    })(),
    ShiftedDifferenceOfMarqueeAsBorrowAndSix: (() => {
      const x = getShiftedBitRotation(8);
      const y = getShiftedBitRotation(6);
      const result = getShiftedRotation(3);
      const borrow = getRegularBitRotation(1);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], result, borrow]];
    })(),
    ShiftedDifferenceOfMarqueeAsBorrowAndSeven: (() => {
      const x = getShiftedBitRotation(8);
      const y = getShiftedBitRotation(7);
      const result = getShiftedRotation(2);
      const borrow = getRegularBitRotation(1);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], result, borrow]];
    })(),
    ShiftedDifferenceOfMarqueeAsBorrowAndMarqueeAsBorrow: (() => {
      const x = getShiftedBitRotation(8);
      const y = getShiftedBitRotation(8);
      const result = getShiftedRotation(1);
      const borrow = getRegularBitRotation(1);
      return [x[0], x[1], x[2], y[0], y[1], [y[2], result, borrow]];
    })()
  };

  // src/concepts/round8/model/cases.ts
  var initializeSpooledWrung2 = () => {
    const arr = [];
    for (let i = 0; i < 2; i++) {
      arr[i] = [];
      for (let j = 0; j < 2; j++) {
        arr[i][j] = [];
        for (let k = 0; k < 2; k++) {
          arr[i][j][k] = [];
          for (let l = 0; l < 2; l++) {
            arr[i][j][k][l] = [];
            for (let m = 0; m < 2; m++) {
              arr[i][j][k][l][m] = [];
            }
          }
        }
      }
    }
    return arr;
  };
  var SpooledSumSeries = initializeSpooledWrung2();
  var ShiftedSpooledSumSeries = initializeSpooledWrung2();
  var SpooledDifferenceSeries = initializeSpooledWrung2();
  var SpooledShiftedDifferenceSeries = initializeSpooledWrung2();
  var SpooledGreaterThanSeries = initializeSpooledWrung2();
  var SpooledLessThanSeries = initializeSpooledWrung2();
  var SpooledShiftedGreaterThanSeries = initializeSpooledWrung2();
  var spool2 = (someSeries, spooled) => {
    let count = 0;
    Object.keys(someSeries).forEach((sum) => {
      count++;
      const caseArray = someSeries[sum];
      const one = caseArray[0];
      const two = caseArray[1];
      const three = caseArray[2];
      const four = caseArray[3];
      const five = caseArray[4];
      const tuple = caseArray[5];
      const six = tuple[0];
      const sixValue = tuple.slice(1);
      spooled[one][two][three][four][five][six] = sixValue;
    });
  };
  spool2(SumSeries, SpooledSumSeries);
  spool2(ShiftedSumSeries, ShiftedSpooledSumSeries);
  spool2(DifferenceSeries, SpooledDifferenceSeries);
  spool2(ShiftedDifferenceSeries, SpooledShiftedDifferenceSeries);
  spool2(GreaterThanSeries, SpooledGreaterThanSeries);
  spool2(LessThanSeries, SpooledLessThanSeries);
  spool2(ShiftedGreaterThanSeries, SpooledShiftedGreaterThanSeries);
  var greaterThan = (rotationA, rotationB) => {
    const result = SpooledGreaterThanSeries[rotationA[0]][rotationA[1]][rotationA[2]][rotationB[0]][rotationB[1]][rotationB[2]];
    return result[0];
  };
  var lessThan = (rotationA, rotationB) => {
    const result = SpooledLessThanSeries[rotationA[0]][rotationA[1]][rotationA[2]][rotationB[0]][rotationB[1]][rotationB[2]];
    return result[0];
  };
  var equals = (rotationA, rotationB) => {
    return rotationA[0] === rotationB[0] && rotationA[1] === rotationB[1] && rotationA[2] === rotationB[2] ? 1 : 0;
  };
  var greaterThanOrEqual = (rotationA, rotationB) => {
    return equals(rotationA, rotationB) === 1 || greaterThan(rotationA, rotationB) === 1 ? 1 : 0;
  };
  var lessThanOrEqual = (rotationA, rotationB) => {
    return equals(rotationA, rotationB) === 1 || lessThan(rotationA, rotationB) === 1 ? 1 : 0;
  };
  var notEquals = (rotationA, rotationB) => {
    return equals(rotationA, rotationB) === 1 ? 0 : 1;
  };
  var shiftedGreaterThan = (rotationA, rotationB) => {
    const result = SpooledShiftedGreaterThanSeries[rotationA[0]][rotationA[1]][rotationA[2]][rotationB[0]][rotationB[1]][rotationB[2]];
    return result[0];
  };
  var createOrientableRotation = (indices, sourceRotations) => {
    const orientable = indices;
    orientable.orientate = function() {
      return this.map((idx) => sourceRotations[idx]);
    };
    return orientable;
  };
  var createOrientableWrung = (indices, sourceWrungs) => {
    const orientable = indices;
    orientable.orientate = function() {
      return this.map((idx) => sourceWrungs[idx]);
    };
    return orientable;
  };
  var compareMagnitude = (wrungA, wrungB, marqueeStateA, marqueeStateB) => {
    if (marqueeStateA.isAbsoluteZero && marqueeStateB.isAbsoluteZero) {
      return null;
    }
    if (marqueeStateA.isFinalTwist && marqueeStateB.isFinalTwist) {
      return null;
    }
    if (marqueeStateA.isAbsoluteZero) {
      return 0;
    }
    if (marqueeStateB.isAbsoluteZero) {
      return 1;
    }
    if (marqueeStateA.isFinalTwist) {
      return 1;
    }
    if (marqueeStateB.isFinalTwist) {
      return 0;
    }
    const signA = getSignBit(wrungA);
    const signB = getSignBit(wrungB);
    let greater = null;
    const marqueeAPosition = marqueeStateA.firstValidRotation ?? 21;
    const marqueeBPosition = marqueeStateB.firstValidRotation ?? 21;
    if (marqueeAPosition > marqueeBPosition) {
      return 1;
    }
    if (marqueeBPosition > marqueeAPosition) {
      return 0;
    }
    const startPosition = marqueeAPosition;
    if (startPosition > 21 || startPosition < 1) {
      return null;
    }
    scanDownwards(wrungA, wrungB, (rotationsA, rotationsB, pos) => {
      const tupleA = extractBitTuple(rotationsA, pos);
      const tupleB = extractBitTuple(rotationsB, pos);
      const areEqual = equals(tupleA, tupleB);
      if (areEqual) {
        return true;
      }
      const greaterThanSpool = pos === 21 ? shiftedGreaterThan : greaterThan;
      greater = greaterThanSpool(tupleA, tupleB) ? 1 : 0;
      if (greater === 1) {
        return false;
      }
      return false;
    }, startPosition);
    return greater;
  };
  var anor = (rotationA, rotationB, rotations) => {
    if (rotations.length === 0) {
      return null;
    }
    const [lower, upper] = greaterThan(rotationA, rotationB) === 1 ? [rotationB, rotationA] : [rotationA, rotationB];
    const inRangeIndices = [];
    rotations.forEach((rot, idx) => {
      const isGreaterOrEqualLower = greaterThanOrEqual(rot, lower) === 1;
      const isLessOrEqualUpper = lessThanOrEqual(rot, upper) === 1;
      if (isGreaterOrEqualLower && isLessOrEqualUpper) {
        inRangeIndices.push(idx);
      }
    });
    if (inRangeIndices.length === 0) {
      return null;
    }
    const states = [];
    rotations.forEach((rot, idx) => {
      const isInRange = inRangeIndices.includes(idx);
      if (!isInRange) {
        states.push({
          rotation: rot,
          anor: false,
          equal: null,
          greater: null,
          lesser: null
        });
      } else {
        const equalIndices = [];
        const greaterIndices = [];
        const lesserIndices = [];
        inRangeIndices.forEach((otherIdx) => {
          if (idx === otherIdx) {
            return;
          }
          const otherRot = rotations[otherIdx];
          const isEqual = equals(rot, otherRot) === 1;
          if (isEqual) {
            equalIndices.push(otherIdx);
          } else {
            const isGreater = greaterThan(otherRot, rot) === 1;
            if (isGreater) {
              greaterIndices.push(otherIdx);
            } else {
              lesserIndices.push(otherIdx);
            }
          }
        });
        states.push({
          rotation: rot,
          anor: true,
          equal: createOrientableRotation(equalIndices, rotations),
          greater: createOrientableRotation(greaterIndices, rotations),
          lesser: createOrientableRotation(lesserIndices, rotations)
        });
      }
    });
    return states;
  };
  var anorWrung = (wrungA, wrungB, wrungs, _marqueeStateA, _marqueeStateB, wrungWrungMuxitys) => {
    if (wrungs.length === 0) {
      return null;
    }
    const marqueeStateA = _marqueeStateA ?? BidirectionalConference(wrungA);
    const marqueeStateB = _marqueeStateB ?? BidirectionalConference(wrungB);
    const resolvedWrungWrungMuxitys = wrungWrungMuxitys ? wrungWrungMuxitys : wrungs.map((wrung) => BidirectionalConference(wrung));
    const aGreaterThanB = compareMagnitude(wrungA, wrungB, marqueeStateA, marqueeStateB);
    const [lower, upper, lowerWrungMuxity, upperWrungMuxity] = aGreaterThanB === 1 ? [wrungB, wrungA, marqueeStateB, marqueeStateA] : [wrungA, wrungB, marqueeStateA, marqueeStateB];
    const inRangeIndices = [];
    wrungs.forEach((wrung, idx) => {
      const wrungWrungMuxity = resolvedWrungWrungMuxitys[idx];
      const lowerComparison = compareMagnitude(wrung, lower, wrungWrungMuxity, lowerWrungMuxity);
      const upperComparison = compareMagnitude(wrung, upper, wrungWrungMuxity, upperWrungMuxity);
      const isGreaterOrEqualLower = lowerComparison === 1 || lowerComparison === null;
      const isLessOrEqualUpper = upperComparison === 0 || upperComparison === null;
      if (isGreaterOrEqualLower && isLessOrEqualUpper) {
        inRangeIndices.push(idx);
      }
    });
    if (inRangeIndices.length === 0) {
      return null;
    }
    const states = [];
    wrungs.forEach((wrung, idx) => {
      const isInRange = inRangeIndices.includes(idx);
      const wrungWrungMuxity = resolvedWrungWrungMuxitys[idx];
      if (!isInRange) {
        states.push({
          wrung,
          marqueeState: wrungWrungMuxity,
          anor: false,
          equal: null,
          greater: null,
          lesser: null
        });
      } else {
        const equalIndices = [];
        const greaterIndices = [];
        const lesserIndices = [];
        inRangeIndices.forEach((otherIdx) => {
          if (idx === otherIdx) {
            return;
          }
          const otherWrung = wrungs[otherIdx];
          const otherWrungMuxity = resolvedWrungWrungMuxitys[otherIdx];
          const comparison = compareMagnitude(otherWrung, wrung, otherWrungMuxity, wrungWrungMuxity);
          if (comparison === null) {
            equalIndices.push(otherIdx);
          } else if (comparison === 1) {
            greaterIndices.push(otherIdx);
          } else {
            lesserIndices.push(otherIdx);
          }
        });
        states.push({
          wrung,
          marqueeState: wrungWrungMuxity,
          anor: true,
          equal: createOrientableWrung(equalIndices, wrungs),
          greater: createOrientableWrung(greaterIndices, wrungs),
          lesser: createOrientableWrung(lesserIndices, wrungs)
        });
      }
    });
    return states;
  };

  // src/concepts/round8/model/operations.ts
  var determineEffectiveOperation = (operation, signA, signB, wrungA, wrungB, wrungMuxityA, wrungMuxityB) => {
    if (operation === "+") {
      if (signA === 1 && signB === 1) {
        return {
          effectiveOp: "sum",
          anchorWrung: wrungA,
          anchorWrungWas: "A",
          modulatorWrung: wrungB,
          resultSign: 1
        };
      }
      if (signA === 0 && signB === 0) {
        return {
          effectiveOp: "sum",
          anchorWrung: wrungA,
          anchorWrungWas: "A",
          modulatorWrung: wrungB,
          resultSign: 0
        };
      }
      if (signA === 1 && signB === 0) {
        const magnitudeComparison = compareMagnitude(wrungA, wrungB, wrungMuxityA, wrungMuxityB);
        if (magnitudeComparison === null) {
          return {
            effectiveOp: "difference",
            anchorWrung: wrungA,
            anchorWrungWas: "A",
            modulatorWrung: wrungB,
            resultSign: 1,
            // Positive zero
            isEqualMagnitude: true
          };
        }
        return {
          effectiveOp: "difference",
          anchorWrung: magnitudeComparison === 1 ? wrungA : wrungB,
          anchorWrungWas: magnitudeComparison === 1 ? "A" : "B",
          modulatorWrung: magnitudeComparison === 1 ? wrungB : wrungA,
          resultSign: magnitudeComparison === 1 ? 1 : 0,
          isEqualMagnitude: false
        };
      }
      if (signA === 0 && signB === 1) {
        const magnitudeComparison = compareMagnitude(wrungB, wrungA, wrungMuxityB, wrungMuxityA);
        if (magnitudeComparison === null) {
          return {
            effectiveOp: "difference",
            anchorWrung: wrungB,
            anchorWrungWas: "B",
            modulatorWrung: wrungA,
            resultSign: 1,
            // Positive zero
            isEqualMagnitude: true
          };
        }
        return {
          effectiveOp: "difference",
          anchorWrung: magnitudeComparison === 1 ? wrungB : wrungA,
          anchorWrungWas: magnitudeComparison === 1 ? "B" : "A",
          modulatorWrung: magnitudeComparison === 1 ? wrungA : wrungB,
          resultSign: magnitudeComparison === 1 ? 1 : 0,
          isEqualMagnitude: false
        };
      }
    }
    if (operation === "-") {
      if (signA === 1 && signB === 1) {
        const magnitudeComparison = compareMagnitude(wrungA, wrungB, wrungMuxityA, wrungMuxityB);
        if (magnitudeComparison === null) {
          return {
            effectiveOp: "difference",
            anchorWrung: wrungA,
            anchorWrungWas: "A",
            modulatorWrung: wrungB,
            resultSign: 1,
            // Positive zero
            isEqualMagnitude: true
          };
        }
        return {
          effectiveOp: "difference",
          anchorWrung: magnitudeComparison === 1 ? wrungA : wrungB,
          anchorWrungWas: magnitudeComparison === 1 ? "A" : "B",
          modulatorWrung: magnitudeComparison === 1 ? wrungB : wrungA,
          resultSign: magnitudeComparison === 1 ? 1 : 0,
          isEqualMagnitude: false
        };
      }
      if (signA === 0 && signB === 0) {
        const magnitudeComparison = compareMagnitude(wrungA, wrungB, wrungMuxityA, wrungMuxityB);
        if (magnitudeComparison === null) {
          return {
            effectiveOp: "difference",
            anchorWrung: wrungA,
            anchorWrungWas: "A",
            modulatorWrung: wrungB,
            resultSign: 1,
            // Positive zero (sign doesn't matter for zero)
            isEqualMagnitude: true
          };
        }
        return {
          effectiveOp: "difference",
          anchorWrung: magnitudeComparison === 1 ? wrungA : wrungB,
          anchorWrungWas: magnitudeComparison === 1 ? "A" : "B",
          modulatorWrung: magnitudeComparison === 1 ? wrungB : wrungA,
          resultSign: magnitudeComparison === 1 ? 0 : 1,
          isEqualMagnitude: false
        };
      }
      if (signA === 1 && signB === 0) {
        return {
          effectiveOp: "sum",
          anchorWrung: wrungA,
          anchorWrungWas: "A",
          modulatorWrung: wrungB,
          resultSign: 1
        };
      }
      if (signA === 0 && signB === 1) {
        return {
          effectiveOp: "sum",
          anchorWrung: wrungA,
          anchorWrungWas: "A",
          modulatorWrung: wrungB,
          resultSign: 0
        };
      }
    }
    throw new Error(
      `determineEffectiveOperation: Unhandled combination - operation=${operation}, signA=${signA}, signB=${signB}`
    );
  };
  var assembleBufferFromResultMuxity = (muxity, isFinalTwistDetected, operation, wasFinalTwist) => {
    if (isFinalTwistDetected) {
      return muxity.resultSign === 1 ? getRound8Case(1 /* POSITIVE_TWIST_CASE */) : getRound8Case(2 /* NEGATIVE_TWIST_CASE */);
    }
    if (muxity.pendingPropagation && operation === "sum") {
      if (muxity.positions.length < 21) {
        muxity.positions.push(0);
      } else {
        return muxity.resultSign === 1 ? getRound8Case(1 /* POSITIVE_TWIST_CASE */) : getRound8Case(2 /* NEGATIVE_TWIST_CASE */);
      }
    }
    if (muxity.pendingPropagation && operation === "difference") {
      if (muxity.consecutiveEightsFromStart === muxity.positions.length) {
        return createBuffer();
      }
      let trailingEightsCount = 0;
      for (let i = muxity.positions.length - 1; i >= 0; i--) {
        if (muxity.positions[i] === 7) {
          trailingEightsCount++;
        } else {
          break;
        }
      }
      if (trailingEightsCount > 0) {
        muxity.positions.length -= trailingEightsCount;
        muxity.pendingPropagation = false;
        if (muxity.positions.length === 0) {
          return createBuffer();
        }
      } else {
        throw new Error("Borrow overflow: invalid magnitude comparison");
      }
    }
    let buffer = createBuffer();
    if (muxity.resultSign === 1) {
      buffer = setSignBit(buffer);
    }
    muxity.positions.forEach((resultIndex, index) => {
      const pos = index + 1;
      if (pos === 21) {
        if (resultIndex === 0) {
          buffer = applyShiftedNumeralRotation(resultIndex + 1, buffer, pos);
        } else {
          buffer = applyShiftedNumeralRotation(resultIndex, buffer, pos);
        }
      } else {
        buffer = applyNumeralRotation(resultIndex, buffer, pos);
      }
    });
    const marqueePosition = muxity.positions.length + 1;
    if (marqueePosition <= 21) {
      buffer = applyMarqueeAtPosition(buffer, marqueePosition);
    }
    if (wasFinalTwist) {
      return muxifyWrung("+", buffer, parseStringToRound8("1"));
    }
    return buffer;
  };
  var sumWrung = (routing, wrungMuxityA, wrungMuxityB) => {
    const result = createResultMuxity(routing.resultSign);
    const lengthA = wrungMuxityA.marqueeRotation ? wrungMuxityA.marqueeRotation - 1 : 21;
    const lengthB = wrungMuxityB.marqueeRotation ? wrungMuxityB.marqueeRotation - 1 : 21;
    const maxPosition = Math.max(lengthA, lengthB);
    const minPosition = Math.min(lengthA, lengthB);
    const longerWrung = lengthA > lengthB ? routing.anchorWrung : routing.modulatorWrung;
    let isFinalTwistDetected = false;
    const carries = [];
    scanUpwards(routing.anchorWrung, routing.modulatorWrung, (a, b, pos) => {
      if (pos > maxPosition) {
        return false;
      }
      const chosenSpool = pos === 21 ? ShiftedSpooledSumSeries : SpooledSumSeries;
      const carry = carries.pop();
      let resultIndex = 0;
      if (pos > minPosition && lengthA !== lengthB) {
        const [b0, b1, b2] = extractBitTuple(longerWrung, pos);
        if (carry) {
          const [c0, c1, c2] = carry;
          const tuple = chosenSpool[b0][b1][b2][c0][c1][c2];
          if (pos === 21 && tuple.length > 1) {
            isFinalTwistDetected = true;
            return false;
          } else if (tuple.length > 1) {
            carries.push(tuple[1]);
          }
          resultIndex += tuple[0];
        } else {
          const some = resultIndex += pos === 21 ? spooledShiftedNumerals[b0][b1][b2] - 1 : spooledNumerals[b0][b1][b2] - 1;
        }
      } else {
        const [rtA0, rtA1, rtA2] = extractBitTuple(a, pos);
        const [rtB0, rtB1, rtB2] = extractBitTuple(b, pos);
        if (carry) {
          const [c0, c1, c2] = carry;
          const tuple = chosenSpool[rtA0][rtA1][rtA2][c0][c1][c2];
          if (pos === 21 && tuple.length > 1) {
            isFinalTwistDetected = true;
            return false;
          } else if (tuple.length > 1) {
            carries.push(tuple[1]);
          }
          const [i0, i1, i2] = pos === 21 ? getShiftedBitRotation(tuple[0] + 1) : getRegularBitRotation(tuple[0] + 1);
          const nextTuple = chosenSpool[i0][i1][i2][rtB0][rtB1][rtB2];
          if (nextTuple.length > 1) {
            carries.push(nextTuple[1]);
          }
          resultIndex += nextTuple[0];
        } else {
          const spoolResult = pos === 21 ? ShiftedSpooledSumSeries[rtA0][rtA1][rtA2][rtB0][rtB1][rtB2] : SpooledSumSeries[rtA0][rtA1][rtA2][rtB0][rtB1][rtB2];
          if (pos === 21 && spoolResult.length > 1) {
            isFinalTwistDetected = true;
            return false;
          } else if (spoolResult.length > 1) {
            carries.push(spoolResult[1]);
          }
          resultIndex = spoolResult[0];
        }
      }
      result.positions.push(resultIndex);
      return true;
    });
    if (carries.length > 0) {
      const carry = carries.pop();
      const carryAsNumeral = spooledNumerals[carry[0]][carry[1]][carry[2]];
      result.positions.push(carryAsNumeral - 1);
    }
    return assembleBufferFromResultMuxity(result, isFinalTwistDetected, "sum");
  };
  var differenceWrung = (routing, muxityA, muxityB) => {
    const result = createResultMuxity(routing.resultSign);
    let wrungMuxityA = muxityA;
    let wrungMuxityB = muxityB;
    let wasFullTwist = false;
    if (wrungMuxityA.isFinalTwist) {
      wasFullTwist = true;
      wrungMuxityA = BidirectionalConference(parseStringToRound8("688888888888888888888"));
    } else if (wrungMuxityB.isFinalTwist) {
      wrungMuxityB = BidirectionalConference(parseStringToRound8("688888888888888888888"));
      wasFullTwist = true;
    }
    const anchorMuxity = routing.anchorWrungWas === "A" ? wrungMuxityA : wrungMuxityB;
    const modulatorMuxity = routing.anchorWrungWas === "B" ? wrungMuxityA : wrungMuxityB;
    const lengthAnchor = anchorMuxity.marqueeRotation ? anchorMuxity.marqueeRotation - 1 : 21;
    const lengthModulator = modulatorMuxity.marqueeRotation ? modulatorMuxity.marqueeRotation - 1 : 21;
    const maxPosition = lengthAnchor;
    const minPosition = lengthModulator;
    const borrows = [];
    scanUpwards(routing.anchorWrung, routing.modulatorWrung, (a, b, pos) => {
      if (pos > maxPosition) {
        return false;
      }
      const chosenSpool = pos === 21 ? SpooledShiftedDifferenceSeries : SpooledDifferenceSeries;
      let resultIndex = -1;
      if (pos > minPosition) {
        const [b0, b1, b2] = extractBitTuple(a, pos);
        if (borrows.length > 0) {
          const borrow = borrows.pop();
          if (borrow && pos === 21) {
            const someNumber = spooledNumerals[borrow[0]][borrow[1]][borrow[2]];
            const [t0, t1, t2] = getShiftedBitRotation(someNumber);
            const borrowTuple = spooledRegularShiftedBridge[t0][t1][t2];
            const spoolResult = chosenSpool[b0][b1][b2][borrowTuple[0]][borrowTuple[1]][borrowTuple[2]];
            if (spoolResult) {
              resultIndex = spoolResult[0];
              if (spoolResult.length > 1) {
                borrows.push(spoolResult[1]);
                return false;
              }
            }
          } else if (borrow !== void 0) {
            const spoolResult = chosenSpool[b0][b1][b2][borrow[0]][borrow[1]][borrow[2]];
            resultIndex = spoolResult[0];
            if (spoolResult.length > 1) {
              borrows.push(spoolResult[1]);
            }
          }
        } else {
          const some = pos === 21 ? spooledShiftedNumerals[b0][b1][b2] : spooledNumerals[b0][b1][b2] - 1;
          resultIndex = some;
        }
      } else {
        const [rtA0, rtA1, rtA2] = extractBitTuple(a, pos);
        const [rtB0, rtB1, rtB2] = extractBitTuple(b, pos);
        if (borrows.length > 0) {
          const borrow = borrows.pop();
          if (borrow && pos === 21) {
            const borrowTuple = spooledRegularShiftedBridge[borrow[0]][borrow[1]][borrow[2]];
            const spoolResult = chosenSpool[rtA0][rtA1][rtA2][borrowTuple[0]][borrowTuple[1]][borrowTuple[2]];
            resultIndex = spoolResult[0];
            if (spoolResult.length > 1) {
              borrows.push(spoolResult[1]);
            }
            const [i0, i1, i2] = getShiftedBitRotation(resultIndex);
            const nextResult = chosenSpool[i0][i1][i2][rtB0][rtB1][rtB2];
            resultIndex = nextResult[0];
            if (nextResult.length > 1) {
              borrows.push(nextResult[1]);
            }
          } else if (borrow) {
            const borrowTuple = borrow;
            const spoolResult = chosenSpool[rtA0][rtA1][rtA2][borrowTuple[0]][borrowTuple[1]][borrowTuple[2]];
            resultIndex = spoolResult[0];
            if (spoolResult.length > 1) {
              borrows.push(spoolResult[1]);
            }
            const [i0, i1, i2] = getRegularBitRotation(resultIndex + 1);
            const nextResult = chosenSpool[i0][i1][i2][rtB0][rtB1][rtB2];
            resultIndex = nextResult[0];
            if (nextResult.length > 1) {
              borrows.push(nextResult[1]);
            }
          }
        } else {
          const spoolResult = chosenSpool[rtA0][rtA1][rtA2][rtB0][rtB1][rtB2];
          resultIndex = spoolResult[0];
          if (pos === 21 && spoolResult.length > 1) {
            borrows.push(spoolResult[1]);
          } else if (spoolResult.length > 1) {
            borrows.push(spoolResult[1]);
          }
        }
      }
      if (resultIndex >= 0) {
        if (resultIndex === 7 && result.positions.length === result.consecutiveEightsFromStart) {
          result.consecutiveEightsFromStart = result.positions.length + 1;
        }
        result.positions.push(resultIndex);
      }
      return true;
    });
    if (borrows.length !== result.positions.length && borrows.length > 0) {
      borrows.forEach((_) => {
        if (result.positions.length === 21) {
          if (result.positions[20] === getShiftedRotation(8)) {
            result.positions.pop();
          }
        } else if (result.positions[result.positions.length - 1] === getRegularRotation(8)) {
          result.positions.pop();
        } else {
          return;
        }
      });
    } else if (borrows.length === result.positions.length) {
      result.positions = result.positions.slice(0, 1);
    }
    return assembleBufferFromResultMuxity(result, false, "difference", wasFullTwist);
  };
  var muxifyWrung = (operation, wrungA, wrungB) => {
    const signA = getSignBit(wrungA);
    const signB = getSignBit(wrungB);
    const wrungMuxityA = BidirectionalConference(wrungA);
    const wrungMuxityB = BidirectionalConference(wrungB);
    if (wrungMuxityA.isAbsoluteZero && wrungMuxityB.isAbsoluteZero) {
      return createBuffer();
    }
    if (wrungMuxityA.isAbsoluteZero) {
      if (operation === "+") {
        return wrungB;
      } else {
        return signB === 1 ? wrungB & ~1n : setSignBit(wrungB);
      }
    }
    if (wrungMuxityB.isAbsoluteZero) {
      return wrungA;
    }
    const effectiveOperation = determineEffectiveOperation(
      operation,
      signA,
      signB,
      wrungA,
      wrungB,
      wrungMuxityA,
      wrungMuxityB
    );
    if (effectiveOperation.isEqualMagnitude && effectiveOperation.effectiveOp === "difference") {
      return createBuffer();
    }
    if (effectiveOperation.effectiveOp === "sum") {
      if (wrungMuxityA.isFinalTwist || wrungMuxityB.isFinalTwist) {
        return effectiveOperation.resultSign === 1 ? getRound8Case(1 /* POSITIVE_TWIST_CASE */) : getRound8Case(2 /* NEGATIVE_TWIST_CASE */);
      }
    }
    if (effectiveOperation.effectiveOp === "sum") {
      return sumWrung(effectiveOperation, wrungMuxityA, wrungMuxityB);
    } else {
      return differenceWrung(effectiveOperation, wrungMuxityA, wrungMuxityB);
    }
  };

  // src/concepts/round8/model/r8.ts
  var r8_ = {
    // ============================================================
    // Conference - Display Formatting & Parsing
    // ============================================================
    createRoundDisplay: getFormattedColumnarWrungRepresentation,
    createRoundString: getWrungStringRepresentation,
    parseStringToBuffer: parseStringToRound8,
    createBufferDisplay: createFormattedRound8BinaryString,
    // ============================================================
    // Operations - Arithmetic (Orchestration Layer)
    // ============================================================
    operations: {
      muxifyWrung,
      // Convenience wrappers - composing functions orchestrating muxifyWrung
      add: (a, b) => muxifyWrung("+", a, b),
      subtract: (a, b) => muxifyWrung("-", a, b),
      increment: (value) => {
        const one = parseStringToRound8("1");
        return one ? muxifyWrung("+", value, one) : value;
      },
      decrement: (value) => {
        const one = parseStringToRound8("1");
        return one ? muxifyWrung("-", value, one) : value;
      }
    },
    // ============================================================
    // Logical - Comparison Operators
    // ============================================================
    logical: {
      equals,
      notEquals,
      greaterThan,
      lessThan,
      greaterThanOrEqual,
      lessThanOrEqual
    },
    // ============================================================
    // ANOR - Magnitude Analysis & Operation Routing
    // ============================================================
    anor: {
      anor,
      anorWrung,
      compareMagnitude,
      determineEffectiveOperation
    },
    // ============================================================
    // Terminology - Low-Level Primitives
    // ============================================================
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
      const inputState = state[state.activeInput];
      const currentSequence = inputState.value;
      const isZeroState = !currentSequence || currentSequence === "0" || currentSequence === "" || currentSequence === "-0";
      const newSequence = isZeroState ? `${digit}` : `${currentSequence}${digit}`;
      const buffer = r8_.parseStringToBuffer(newSequence);
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
      const currentSequence = inputState.value;
      if (!currentSequence) {
        return;
      }
      const newSequence = currentSequence.slice(0, -1);
      if (newSequence === "") {
        inputState.value = "0";
        inputState.buffer = 0n;
        inputState.binary = r8_.createBufferDisplay(0n);
      } else {
        const buffer = r8_.parseStringToBuffer(newSequence);
        const binary = buffer ? r8_.createBufferDisplay(buffer) : r8_.createBufferDisplay(0n);
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
      if (operation === null) {
        return;
      }
      state.operation = operation;
    }
    function handleCalculate() {
      const buffer1 = state.input1.buffer;
      const buffer2 = state.input2.buffer;
      const operation = state.operation;
      if (!operation) {
        console.warn("Round8 Calculator: No operation selected");
        return;
      }
      let result = 0n;
      if (operation === "+") {
        result = r8_.operations.add(buffer1, buffer2);
      } else if (operation === "-") {
        result = r8_.operations.subtract(buffer1, buffer2);
      } else if (operation === ">") {
        result = buffer1 > buffer2 ? 1n : 0n;
      } else if (operation === "<") {
        result = buffer1 < buffer2 ? 1n : 0n;
      } else if (operation === ">=") {
        result = buffer1 >= buffer2 ? 1n : 0n;
      } else if (operation === "<=") {
        result = buffer1 <= buffer2 ? 1n : 0n;
      } else if (operation === "==") {
        result = buffer1 === buffer2 ? 1n : 0n;
      } else if (operation === "!=") {
        result = buffer1 !== buffer2 ? 1n : 0n;
      } else {
        console.warn(`Round8 Calculator: Operation not yet implemented: ${operation}`);
        return;
      }
      state.output.buffer = result;
      state.output.binary = r8_.createBufferDisplay(result);
      state.output.value = r8_.createRoundDisplay(result);
    }
    function handleClear() {
      state.input1.value = "0";
      state.input1.buffer = 0n;
      state.input1.binary = r8_.createBufferDisplay(0n);
      state.input2.value = "0";
      state.input2.buffer = 0n;
      state.input2.binary = r8_.createBufferDisplay(0n);
      state.output.value = "0";
      state.output.buffer = 0n;
      state.output.binary = r8_.createBufferDisplay(0n);
      state.operation = null;
      state.activeInput = "input1";
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
    function handleIncrement() {
      const inputState = state[state.activeInput];
      const incremented = r8_.operations.increment(inputState.buffer);
      inputState.buffer = incremented;
      inputState.binary = r8_.createBufferDisplay(incremented);
      inputState.value = r8_.createRoundDisplay(incremented);
    }
    function handleDecrement() {
      const inputState = state[state.activeInput];
      const decremented = r8_.operations.decrement(inputState.buffer);
      inputState.buffer = decremented;
      inputState.binary = r8_.createBufferDisplay(decremented);
      inputState.value = r8_.createRoundDisplay(decremented);
    }
    return {
      // State access
      state,
      // Calculator operations
      handleDigitEntry,
      handleBackspace,
      handleZero,
      handleOperation,
      handleCalculate,
      handleSigned,
      handleIncrement,
      handleDecrement,
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
  function updateOutputDisplay(calc) {
    const outputState = calc.state.output;
    const valueElement = document.getElementById("outputValue");
    if (valueElement) {
      valueElement.textContent = outputState.value || "";
    }
    const binaryElement = document.getElementById("outputBinary");
    if (binaryElement) {
      binaryElement.textContent = outputState.binary || "";
    }
  }
  function updateOperationDisplay(calc) {
    const operation = calc.state.operation;
    const symbolElement = document.getElementById("operandSymbol");
    const buttonElement = document.getElementById("operandButton");
    const operandRow = document.getElementById("operandRow");
    if (!operation) {
      if (symbolElement) {
        symbolElement.textContent = "\u25CB";
      }
      if (buttonElement) {
        buttonElement.className = "hifi-btn-obsidian";
        buttonElement.setAttribute("disabled", "true");
        buttonElement.setAttribute("title", "Suite 0: Obsidian - Foundational State");
      }
      if (operandRow) {
        operandRow.removeAttribute("data-operation");
      }
      return;
    }
    const operationMap = {
      "+": { symbol: "+", btnClass: "hifi-btn-add", title: "Addition - Rust: Prospection" },
      "-": { symbol: "\u2212", btnClass: "hifi-btn-subtract", title: "Subtraction - Rose: Healing" },
      ">": { symbol: ">", btnClass: "hifi-btn-compare", title: "Greater Than - Amethyst: Operations" },
      "<": { symbol: "<", btnClass: "hifi-btn-compare", title: "Less Than - Amethyst: Operations" },
      ">=": { symbol: "\u2265", btnClass: "hifi-btn-compare", title: "Greater or Equal - Amethyst: Operations" },
      "<=": { symbol: "\u2264", btnClass: "hifi-btn-compare", title: "Less or Equal - Amethyst: Operations" },
      "==": { symbol: "=", btnClass: "hifi-btn-compare", title: "Equals - Amethyst: Operations" },
      "!=": { symbol: "\u2260", btnClass: "hifi-btn-compare", title: "Not Equal - Amethyst: Operations" }
    };
    const display = operationMap[operation];
    if (symbolElement) {
      symbolElement.textContent = display.symbol;
    }
    if (buttonElement) {
      buttonElement.className = display.btnClass;
      buttonElement.removeAttribute("disabled");
      buttonElement.setAttribute("title", display.title);
    }
    if (operandRow) {
      operandRow.setAttribute("data-operation", operation);
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
  function bindRotationButton(buttonId, handler, updateDisplay) {
    const button = document.getElementById(buttonId);
    if (button) {
      button.addEventListener("click", () => {
        handler();
        updateDisplay();
      });
    }
  }
  function initializeCalculator() {
    const calc = r8_2.createCalculator();
    if (typeof window !== "undefined") {
      if (!window.r8) {
        window.r8 = r8_2;
        console.log("\u{1F527} Round8 Breadboard API exposed to console");
        console.log("   Access via: window.r8");
        console.log("   Example: window.r8.operations.add(5n, 3n)");
      } else {
        console.warn("\u26A0\uFE0F  window.r8 already exists - skipping Round8 API exposure");
      }
      if (!window.calculator) {
        window.calculator = calc;
        console.log("\u{1F4CA} Calculator Instance exposed to console");
        console.log("   Access via: window.calculator");
        console.log("   Example: window.calculator.state.input1.buffer");
      } else {
        console.warn("\u26A0\uFE0F  window.calculator already exists - skipping calculator exposure");
      }
    }
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
    bindRotationButton(
      "incrementInput1Btn",
      () => {
        calc.state.activeInput = "input1";
        calc.handleIncrement();
      },
      () => updateInputDisplay(calc, 1)
    );
    bindRotationButton(
      "decrementInput1Btn",
      () => {
        calc.state.activeInput = "input1";
        calc.handleDecrement();
      },
      () => updateInputDisplay(calc, 1)
    );
    bindRotationButton(
      "incrementInput2Btn",
      () => {
        calc.state.activeInput = "input2";
        calc.handleIncrement();
      },
      () => updateInputDisplay(calc, 2)
    );
    bindRotationButton(
      "decrementInput2Btn",
      () => {
        calc.state.activeInput = "input2";
        calc.handleDecrement();
      },
      () => updateInputDisplay(calc, 2)
    );
    const addBtn = document.getElementById("addBtn");
    if (addBtn) {
      addBtn.addEventListener("click", () => {
        calc.handleOperation("+");
        updateOperationDisplay(calc);
      });
    }
    const subtractBtn = document.getElementById("subtractBtn");
    if (subtractBtn) {
      subtractBtn.addEventListener("click", () => {
        calc.handleOperation("-");
        updateOperationDisplay(calc);
      });
    }
    const greaterBtn = document.getElementById("greaterBtn");
    if (greaterBtn) {
      greaterBtn.addEventListener("click", () => {
        calc.handleOperation(">");
        updateOperationDisplay(calc);
      });
    }
    const greaterEqualBtn = document.getElementById("greaterEqualBtn");
    if (greaterEqualBtn) {
      greaterEqualBtn.addEventListener("click", () => {
        calc.handleOperation(">=");
        updateOperationDisplay(calc);
      });
    }
    const lessBtn = document.getElementById("lessBtn");
    if (lessBtn) {
      lessBtn.addEventListener("click", () => {
        calc.handleOperation("<");
        updateOperationDisplay(calc);
      });
    }
    const lessEqualBtn = document.getElementById("lessEqualBtn");
    if (lessEqualBtn) {
      lessEqualBtn.addEventListener("click", () => {
        calc.handleOperation("<=");
        updateOperationDisplay(calc);
      });
    }
    const equalsBtn = document.getElementById("equalsBtn");
    if (equalsBtn) {
      equalsBtn.addEventListener("click", () => {
        calc.handleOperation("==");
        updateOperationDisplay(calc);
      });
    }
    const calculateBtn = document.getElementById("calculateBtn");
    if (calculateBtn) {
      calculateBtn.addEventListener("click", () => {
        calc.handleCalculate();
        updateOutputDisplay(calc);
        const outputRow = document.getElementById("outputRow");
        if (outputRow) {
          outputRow.classList.add("output-row-active");
        }
      });
    }
    const clearBtn = document.getElementById("clearBtn");
    if (clearBtn) {
      clearBtn.addEventListener("click", () => {
        calc.handleClear();
        updateInputDisplay(calc, 1);
        updateInputDisplay(calc, 2);
        updateOutputDisplay(calc);
        updateOperationDisplay(calc);
        const outputRow = document.getElementById("outputRow");
        if (outputRow) {
          outputRow.classList.remove("output-row-active");
        }
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
    calc.state.activeInput = "input1";
    calc.handleZero();
    updateInputDisplay(calc, 1);
    calc.state.activeInput = "input2";
    calc.handleZero();
    updateInputDisplay(calc, 2);
    calc.state.output.value = "0";
    calc.state.output.buffer = 0n;
    calc.state.output.binary = r8_2.createBufferDisplay(0n);
    updateOutputDisplay(calc);
    calc.state.activeInput = "input1";
    updateActiveInputHighlight(calc);
    console.log("Calculator UI bindings initialized");
    console.log("Round8 Calculator v0.0.14 - Display reactivity enabled");
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
 * Round8 v0.0.14 - Pure Round8 Binary Calculator
 *
 * Pure binary operations using spool-based indexed lookups.
 * NO binary operand calculations (shifts/OR/AND).
 * Dual display: Round8 string + Binary representation.
 *
 * New in v0.0.14:
 * - Increment/Decrement operations (composing functions)
 * - Organized API: operations, logical, anor, conference, terminology
 * - Critical developer types exported (BitRotationTuple, WrungMuxity, ResultMuxity)
 *
 * @module round8
 * @version 0.0.14
 * @license GPL-3.0
 */
