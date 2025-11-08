/**
 * Round8 Bidirectional Conference - Marquee Position Validity Detection
 *
 * Determines the first valid counting position and Marquee state for Round8 buffers.
 * Implements the Bidirectional Marquee Approach with position holding logic.
 */

export type MarqueeState = {
  /** First valid column for counting (0-20), or -1 for absolute zero */
  firstValidRotation?: number;

  /** Whether column 0 is in shifted holding state (001) */
  marqueeRotation?: number;

  /** Whether column 0 is the final twist case (000 with all others 111) */
  isFinalTwist?: boolean;

  /** Whether this buffer represents absolute zero (all positions 000) */
  isAbsoluteZero?: boolean;

  /** Whether this buffer represents negative one (maximum negative magnitude - all columns [1,1,1]) */
  isNegativeOne?: boolean;
};

/**
 * BidirectionalConference - Determines Marquee validity for a Round8 buffer
 *
 * Rules for Column 0 (leftmost after sign):
 * 1. If 001: Valid as shifted holding position, count starts here
 * 2. If 000 AND all columns 1-20 are 111: Valid as final twist (maximum boundary)
 * 3. If 000 AND any column 1-20 is NOT 111: Invalid placeholder, skip to next column
 * 4. If 010-111: Valid, count starts here
 *
 * Rules for Columns 1-20:
 * - First non-000 column found (scanning left→right) is the Marquee
 * - All columns from Marquee rightward are valid counting positions
 * - All columns before Marquee are invalid placeholders
 *
 * Position Count Limitation:
 * - We miss ONE positional count to enable this Bidirectional Marquee Approach
 * - Column 0 at 000 is ONLY valid when ALL other columns are 111 (final twist)
 * - Otherwise, column 0 must be 001 or greater to be valid
 *
 * @param buffer - 64-position Uint8Array (sign + 21 columns × 3 bits)
 * @returns MarqueeState describing validity and counting boundaries
 */
// [x] When we Scan from the Front and Sign = 1. The only Possible Valid 000 in First Position is if the Remained are All
//  1 for our Final Twist Case (Noting we have an early return while iterating through the array and if a 0 is found at
//  any time we break and it's not the Twist Case). From there if Such is 001 it is the Marquee Position for the Rest
// of the Count. Otherwise if it is not the Final Twist Case while being 000, it is Invalid. If there is Any Count in
// 1st Position we Mark it as Valid and Each Remaining Position.

// [x] While still Scanning for Sign at 1, After 1st Position the Rules are Simplier. 000 it is Invalid, if 001 it is a
// Marquee Case and is the Bounding Position for the Rest of the Count. With the rest of the Rows Valid. Noting that
// our Marquees at this Point are a Two Step Validation. Once we find our Marquee we have our Delimiter.

// [x] Our Final Case when Iterating through the Array and do not Find a Marquee, is our Last Position that would be
// Counted Valid Regardless. As our Sign = 1 Marks a 000 as Valid in Last Position. So be Default we will Always be
// Inferring the Last Positions Spool, so long as the Sign = 1.

const GetColumns = {
  sign: (buffer: Uint8Array<ArrayBuffer>): Uint8Array<ArrayBuffer> => buffer.slice(0, 1),
  first: (buffer: Uint8Array<ArrayBuffer>): Uint8Array<ArrayBuffer> => buffer.slice(1, 4),
  second: (buffer: Uint8Array<ArrayBuffer>): Uint8Array<ArrayBuffer> => buffer.slice(4, 7),
  third: (buffer: Uint8Array<ArrayBuffer>): Uint8Array<ArrayBuffer> => buffer.slice(7, 10),
  fourth: (buffer: Uint8Array<ArrayBuffer>): Uint8Array<ArrayBuffer> => buffer.slice(10, 13),
  fifth: (buffer: Uint8Array<ArrayBuffer>): Uint8Array<ArrayBuffer> => buffer.slice(13, 16),
  sixth: (buffer: Uint8Array<ArrayBuffer>): Uint8Array<ArrayBuffer> => buffer.slice(16, 19),
  seventh: (buffer: Uint8Array<ArrayBuffer>): Uint8Array<ArrayBuffer> => buffer.slice(19, 22),
  eighth: (buffer: Uint8Array<ArrayBuffer>): Uint8Array<ArrayBuffer> => buffer.slice(22, 25),
  ninth: (buffer: Uint8Array<ArrayBuffer>): Uint8Array<ArrayBuffer> => buffer.slice(25, 28),
  tenth: (buffer: Uint8Array<ArrayBuffer>): Uint8Array<ArrayBuffer> => buffer.slice(28, 31),
  eleventh: (buffer: Uint8Array<ArrayBuffer>): Uint8Array<ArrayBuffer> => buffer.slice(31, 34),
  twelfth: (buffer: Uint8Array<ArrayBuffer>): Uint8Array<ArrayBuffer> => buffer.slice(34, 37),
  thirteenth: (buffer: Uint8Array<ArrayBuffer>): Uint8Array<ArrayBuffer> => buffer.slice(37, 40),
  fourteenth: (buffer: Uint8Array<ArrayBuffer>): Uint8Array<ArrayBuffer> => buffer.slice(40, 43),
  fifteenth: (buffer: Uint8Array<ArrayBuffer>): Uint8Array<ArrayBuffer> => buffer.slice(43, 46),
  sixteenth: (buffer: Uint8Array<ArrayBuffer>): Uint8Array<ArrayBuffer> => buffer.slice(46, 49),
  seventeenth: (buffer: Uint8Array<ArrayBuffer>): Uint8Array<ArrayBuffer> => buffer.slice(49, 52),
  eighteenth: (buffer: Uint8Array<ArrayBuffer>): Uint8Array<ArrayBuffer> => buffer.slice(52, 55),
  nineteenth: (buffer: Uint8Array<ArrayBuffer>): Uint8Array<ArrayBuffer> => buffer.slice(55, 58),
  twentieth: (buffer: Uint8Array<ArrayBuffer>): Uint8Array<ArrayBuffer> => buffer.slice(58, 61),
  twentyFirst: (buffer: Uint8Array<ArrayBuffer>): Uint8Array<ArrayBuffer> => buffer.slice(61, 64),
};

const IterativeGetColumns = [
  GetColumns.second,
  GetColumns.third,
  GetColumns.fourth,
  GetColumns.fifth,
  GetColumns.sixth,
  GetColumns.seventh,
  GetColumns.eighth,
  GetColumns.ninth,
  GetColumns.tenth,
  GetColumns.eleventh,
  GetColumns.twelfth,
  GetColumns.thirteenth,
  GetColumns.fourteenth,
  GetColumns.fifteenth,
  GetColumns.sixteenth,
  GetColumns.seventeenth,
  GetColumns.eighteenth,
  GetColumns.nineteenth,
  GetColumns.twentieth,
  GetColumns.twentyFirst,
];

const countZeroFirstColumn = (buffer: Uint8Array<ArrayBuffer>) => {
  // Count zeros in column 0 (positions 1, 2, 3)
  let zeros = 0;
  if (buffer[1] === 0) {
    zeros += 1;
  }
  if (buffer[2] === 0) {
    zeros += 1;
  }
  if (buffer[3] === 0) {
    zeros += 1;
  }
  return zeros;
};

const firstColumStringProspection = (str: string): MarqueeState => {
  console.log('HITTING SINGLE ROTATION CHECK');
  let base = str;
  if (str.length >= 21) {
    if (str.startsWith('-')) {
      base = str.slice(1);
    } else if (str.length >= 22) {
      return {isFinalTwist: true};
    }
    if (base.startsWith('7')) {
      let isFinalTwist = false;
      const informative = base.slice(1);
      for (let char of [
        '1',
        '2',
        '3',
        '4',
        '5',
        '6',
        '7'
      ]) {
        if (informative.includes(char)) {
          isFinalTwist = false;
          break;
        }
      }
      if (isFinalTwist) {
        return {isFinalTwist};
      }
      return {
        firstValidRotation: 0
      };
    }
  }
  return {};
};

const firstColumnSignedProspection = (buffer: Uint8Array<ArrayBuffer>): MarqueeState => {
  console.log('CHECK', buffer, buffer[63], buffer[62], buffer[61]);
  if (
    // 000 Case 1st Position, Check Next Index for 1
    buffer[63] === 0 &&
    buffer[62] === 0 &&
    buffer[61] === 0
    && buffer.length >= 4 ) {
    if (buffer[60] === 1) {
      for (let i = 60; i > -1; i--) {
        if (buffer[i] !== 1) {
          return {
            firstValidRotation: 0
          };
        }
      }
      return {
        isFinalTwist: true
      };
    } else {
      return {};
    }
    // Noting why this should be valid is that 000 should only ever exist as valid if there is a 1 next to such not a 001
  } else if (
    buffer[1] === 0 &&
    buffer[2] === 0 &&
    buffer[3] === 1
  ) {
    return {
      firstValidRotation: 1,
      marqueeRotation: 0
    };
  } else if (
    countZeroFirstColumn(buffer) !== 3
  ) {
    return {
      firstValidRotation: 0
    };
  } else {
    return {};
  }
};
// eslint-disable-next-line complexity
// Note this is only Handling our Positive Sign
export const BidirectionalConference = (buffer: Uint8Array<ArrayBuffer>): MarqueeState => {
  // FIRST: Check for negative one (maximum negative magnitude)
  const signedPositive = buffer[0] === 1;
  if (!signedPositive) {
    if (detectNegativeOne(buffer)) {
      return { isNegativeOne: true };
    }
  }

  // SECOND: Check for absolute zero (all positions 1-63 are 000)
  let isAbsoluteZero = true;
  if (!signedPositive) {
    for (let i = 1; i < 64; i++) {
      if (buffer[i] !== 0) {
        isAbsoluteZero = false;
        break;
      }
    }
  } else {
    isAbsoluteZero = false;
  }
  if (isAbsoluteZero) {
    return {
      isAbsoluteZero: true,
    };
  }

  // Handle First Column
  const firstCasing = firstColumnSignedProspection(buffer);

  // If column 0 is 001: Valid shifted holding position
  if (Object.keys(firstCasing).length > 0) {
    return firstCasing;
  }
  for (const [i, getCol] of IterativeGetColumns.entries()) {
    const col = getCol(buffer);
    if (i !== 19) {
      if (
        col[0] === 0 &&
        col[1] === 0 &&
        col[2] === 1
      ) {
        return {
          firstValidRotation: i + 2,
          marqueeRotation: i + 1
        };
      }
    } else {
      return {
        firstValidRotation: 20
      };
    }
  }
  // Error State
  return {};
};

export type ConferredMarqueeState = {
  wrungAMarquee: MarqueeState;
  wrungBMarquee: MarqueeState;
  sharedValidColumn: number;
  exactEven: boolean;
};

// eslint-disable-next-line complexity
// Note this is only Handling our Positive Sign
export const BidirectionalStringConference = (str: string): MarqueeState => {
  // FIRST: Check for negative one (maximum negative magnitude)
  const isNegative = str.startsWith('-');
  if (!isNegative) {
    if (str.length === 2 && str === '1') {
      return { isNegativeOne: true };
    }
  }

  if (!isNegative) {
    if (str === '0') {
      return {
        isAbsoluteZero: true,
      };
    }
  }

  // Handle First Column
  const firstCasing = firstColumStringProspection(str);

  // If column 0 is 001: Valid shifted holding position
  if (Object.keys(firstCasing).length > 0) {
    return firstCasing;
  }
  if ((isNegative && str.length > 2) || (!isNegative && str.length > 1)) {
    return {
      marqueeRotation: str.length + 3,
    };
  }
  return {};
};

/**
 * ConferBidirectionally - Conferences TWO buffers to find combined Marquee states
 *
 * Returns both marquee positions separately to enable intelligent backward propagation:
 * - exactEven: true → Both marquees aligned, clean summation to delimiter
 * - exactEven: false → Marquees shifted, exclusive zones require carry-only propagation
 *
 * @param wrungA - First operand buffer
 * @param wrungB - Second operand buffer
 * @returns ConferredMarqueeState with both marquees and shared valid zone
 */
export const ConferBidirectionally = (
  wrungA: Uint8Array<ArrayBuffer>,
  wrungB: Uint8Array<ArrayBuffer>
): ConferredMarqueeState => {
  const wrungAMarquee = BidirectionalConference(wrungA);
  const wrungBMarquee = BidirectionalConference(wrungB);

  // Handle absolute zero cases
  if (wrungAMarquee.isAbsoluteZero && wrungBMarquee.isAbsoluteZero) {
    return {
      wrungAMarquee,
      wrungBMarquee,
      sharedValidColumn: -1,
      exactEven: true,
    };
  }
  if (wrungAMarquee.isAbsoluteZero) {
    return {
      wrungAMarquee,
      wrungBMarquee,
      sharedValidColumn: wrungBMarquee.firstValidRotation ?? 20,
      exactEven: false,
    };
  }
  if (wrungBMarquee.isAbsoluteZero) {
    return {
      wrungAMarquee,
      wrungBMarquee,
      sharedValidColumn: wrungAMarquee.firstValidRotation ?? 20,
      exactEven: false,
    };
  }

  // Both non-zero: shared valid zone is the RIGHTMOST (maximum) firstValidRotation
  const firstValidA = wrungAMarquee.firstValidRotation ?? 20;
  const firstValidB = wrungBMarquee.firstValidRotation ?? 20;
  const sharedValidColumn = Math.max(firstValidA, firstValidB);

  // Marquees are exactEven if firstValidRotations match
  const exactEven = wrungAMarquee.firstValidRotation === wrungBMarquee.firstValidRotation;

  return {
    wrungAMarquee,
    wrungBMarquee,
    sharedValidColumn,
    exactEven,
  };
};

/**
 * detectNegativeOne - Detect maximum negative magnitude (all columns [1,1,1])
 *
 * Uses 21-strike column sweep for shortest path detection:
 * - Strike 1: Sign + Column 20 (rightmost - highest variation probability)
 * - Strike 2: Column 19 (absurdly large range check)
 * - Strike 3: Column 10 (middle bisection)
 * - Strikes 4-21: Outward sweep from middle (11, 9, 12, 8, 13, 7...)
 *
 * Returns true ONLY if ALL 21 columns are [1,1,1] with sign = 0 (negative)
 *
 * @param buffer - 64-position Uint8Array (sign + 21 columns × 3 bits)
 * @returns boolean - true if buffer represents Negative One (-1)
 */
// eslint-disable-next-line complexity
export const detectNegativeOne = (buffer: Uint8Array<ArrayBuffer>): boolean => {
  // Strike 1: Initial validation (sign + Column 20)
  if (buffer[0] !== 0) {return false;} // Sign must be negative
  if (buffer[61] !== 1 || buffer[62] !== 1 || buffer[63] !== 1) {return false;}

  // Strike 2: Absurdly large range (Column 19)
  if (buffer[58] !== 1 || buffer[59] !== 1 || buffer[60] !== 1) {return false;}

  // Strike 3: Middle column (Column 10)
  if (buffer[31] !== 1 || buffer[32] !== 1 || buffer[33] !== 1) {return false;}

  // Strikes 4-21: Outward sweep from middle (predetermined order)
  // Column 11
  if (buffer[34] !== 1 || buffer[35] !== 1 || buffer[36] !== 1) {return false;}
  // Column 9
  if (buffer[28] !== 1 || buffer[29] !== 1 || buffer[30] !== 1) {return false;}
  // Column 12
  if (buffer[37] !== 1 || buffer[38] !== 1 || buffer[39] !== 1) {return false;}
  // Column 8
  if (buffer[25] !== 1 || buffer[26] !== 1 || buffer[27] !== 1) {return false;}
  // Column 13
  if (buffer[40] !== 1 || buffer[41] !== 1 || buffer[42] !== 1) {return false;}
  // Column 7
  if (buffer[22] !== 1 || buffer[23] !== 1 || buffer[24] !== 1) {return false;}
  // Column 14
  if (buffer[43] !== 1 || buffer[44] !== 1 || buffer[45] !== 1) {return false;}
  // Column 6
  if (buffer[19] !== 1 || buffer[20] !== 1 || buffer[21] !== 1) {return false;}
  // Column 15
  if (buffer[46] !== 1 || buffer[47] !== 1 || buffer[48] !== 1) {return false;}
  // Column 5
  if (buffer[16] !== 1 || buffer[17] !== 1 || buffer[18] !== 1) {return false;}
  // Column 16
  if (buffer[49] !== 1 || buffer[50] !== 1 || buffer[51] !== 1) {return false;}
  // Column 4
  if (buffer[13] !== 1 || buffer[14] !== 1 || buffer[15] !== 1) {return false;}
  // Column 17
  if (buffer[52] !== 1 || buffer[53] !== 1 || buffer[54] !== 1) {return false;}
  // Column 3
  if (buffer[10] !== 1 || buffer[11] !== 1 || buffer[12] !== 1) {return false;}
  // Column 18
  if (buffer[55] !== 1 || buffer[56] !== 1 || buffer[57] !== 1) {return false;}
  // Column 2
  if (buffer[7] !== 1 || buffer[8] !== 1 || buffer[9] !== 1) {return false;}
  // Column 1
  if (buffer[4] !== 1 || buffer[5] !== 1 || buffer[6] !== 1) {return false;}
  // Column 0 (shifted topology - final check)
  if (buffer[1] !== 1 || buffer[2] !== 1 || buffer[3] !== 1) {return false;}

  // All 21 columns are [1,1,1] → This is negative one
  return true;
};
