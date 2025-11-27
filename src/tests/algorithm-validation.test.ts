/**
 * Algorithm Validation Test - Phase 3: Round8 ↔ Decimal Bijection Mapping
 *
 * Purpose: Prove the Round8 counting algorithm produces 1-to-1, onto, complete
 * mapping between Round8 strings and decimal iteration counts.
 *
 * Test Flow:
 * 1. GET /count → iteration (max range)
 * 2. Random decimal in [1, iteration]
 * 3. decimalToRound8(decimal) → round8String (scaffolded)
 * 4. round8String → formattedBinary
 * 5. GET /lookup?binary={formattedBinary}
 * 6. Assert: entry.decimalPairing === decimal
 *
 * Reference: /reference/Round8_Forever_Clock/Cascades/PHASE-3-ALGORITHM-VALIDATION-WORKGAMEBOARD.md
 */

import {
  decimalToRound8,
  round8ToDecimal,
  parseStringToRound8,
  createFormattedRound8BinaryString
} from '../concepts/round8/model/conference';

/**
 * Minimal fetch types for Node 18+ / Browser agnostic usage
 * Avoids dependency on DOM lib or newer @types/node
 */
interface FetchResponse {
  ok: boolean;
  status: number;
  json: () => Promise<unknown>;
}
declare function fetch(url: string): Promise<FetchResponse>;

/**
 * Cross-platform HTTP client
 * Uses native fetch (Node 18+ / Browser) with type safety
 */
const httpGet = async <T>(url: string): Promise<{ ok: boolean; status: number; data: T }> => {
  const response = await fetch(url);
  const data = await response.json() as T;
  return { ok: response.ok, status: response.status, data };
};

/**
 * ConversionEntry - Firestore document structure from Forever Clock
 * Document ID = formattedBinary (O(1) lookup)
 */
interface ConversionEntry {
  binary: string;               // BigInt serialized as string
  stringOutput: string;         // Unformatted Round8 (wrung representation)
  formattedString: string;      // Formatted Round8 display (human-readable)
  formattedBinary: string;      // Document key (formatted binary string)
  decimalPairing: number;       // Iteration count = decimal value
  countLength: number;
  timestamp: number;
  verificationStatus?: string;
}

/**
 * Forever Clock API Response Types
 */
interface CountResponse {
  iteration: number;
  currentRound8: string;
  currentDecimal: string;
  running: boolean;
  startTime: number;
  lastIterationTime: number;
}

interface LookupResponse {
  found: boolean;
  entry?: ConversionEntry;
  message?: string;
  error?: string;
}

/**
 * API Configuration
 * Production endpoint: api.unhex.dev
 * Local development: localhost:8080
 */
const API_BASE_URL = process.env.ROUND8_API_URL || 'https://api.unhex.dev';

/**
 * ═══════════════════════════════════════════════════════════════════════════
 * RANDOM ROUND8 STRING GENERATOR (Construction)
 * ═══════════════════════════════════════════════════════════════════════════
 *
 * String-based generator for bijective validation testing.
 * Uses Round8 string comparison - NO decimal conversion (avoids circular logic).
 *
 * Key Insight: JavaScript lexicographic comparison works for Round8 because:
 * - Round8 uses digits 1-8 only (Unicode 49-56, sequential)
 * - Same-length strings: lexicographic = numeric order ("18" < "81")
 * - Different-length strings: shorter = smaller in Round8 counting
 *
 * Reference: https://javascript.info/comparison
 */

/**
 * isRound8LessOrEqual - Compare two Round8 strings without decimal conversion
 *
 * For Round8 (digits 1-8, no zeros):
 * - Shorter string is always smaller value
 * - Same length: lexicographic comparison is valid
 *
 * CRITICAL: Both strings must be same format (both formatted OR both unformatted)
 */
const isRound8LessOrEqual = (a: string, b: string): boolean => {
  // Remove commas for length comparison (normalize to unformatted)
  const aNorm = a.replace(/,/g, '');
  const bNorm = b.replace(/,/g, '');

  if (aNorm.length !== bNorm.length) {
    return aNorm.length < bNorm.length;  // Shorter = smaller in Round8
  }
  return aNorm <= bNorm;  // Same length: lexicographic works for 1-8
};

/**
 * formatWithCommas - Format raw Round8 string with columnar commas
 *
 * Input:  "88881" (raw digits)
 * Output: "8,88,81" (columnar format)
 *
 * Columnar grouping: pairs from right, odd digit at left
 */
const formatWithCommas = (raw: string): string => {
  if (raw.length <= 2) {
    return raw;
  }

  const isOdd = raw.length % 2 === 1;
  const columns: string[] = [];
  let startIndex = 0;

  if (isOdd) {
    columns.push(raw[0]);
    startIndex = 1;
  }

  for (let i = startIndex; i < raw.length; i += 2) {
    columns.push(raw.slice(i, i + 2));
  }

  return columns.join(',');
};

/**
 * generateRandomRound8String - Generate valid Round8 string within max range
 *
 * Algorithm (NO decimal conversion - uses string comparison):
 * 1. Get maxRound8 string length
 * 2. Generate random length (1 to maxLength)
 * 3. If shorter than max: any digits 1-8 are valid
 * 4. If same length as max: ensure lexicographically <= max
 * 5. Validate using Round8 string comparison
 *
 * @param maxRound8 - Current Round8 from API (unformatted, e.g., "88881")
 * @returns Raw Round8 string (unformatted)
 */
const generateRandomRound8String = (maxRound8: string): string => {
  const maxNorm = maxRound8.replace(/,/g, '');  // Normalize to unformatted
  const maxLength = maxNorm.length;

  // Generate random length (1 to maxLength)
  const length = Math.floor(Math.random() * maxLength) + 1;

  // Generate random digits 1-8 for each position
  let result = '';
  for (let i = 0; i < length; i++) {
    const digit = Math.floor(Math.random() * 8) + 1; // 1-8
    result += String(digit);
  }

  // Validate using Round8 string comparison (not decimal)
  if (!isRound8LessOrEqual(result, maxNorm)) {
    return generateRandomRound8String(maxRound8); // Retry
  }

  return result;
};

/**
 * Known formattedBinary values for testing
 * Format: 21 positions (3-bit each) pipe-separated + sign suffix
 */
const FORMATTED_BINARY = {
  // Round8 "1" = decimal 1: Position 1: 000, Position 2: 001 (Marquee)
  ONE: [
    '000 | 000 | 000 | 000 | 000 | 000 | 000',
    '000 | 000 | 000 | 000 | 000 | 000 | 000',
    '000 | 000 | 000 | 000 | 001 | 000 | 1 S'
  ].join(' | '),

  // Round8 "8" = decimal 8: Position 1: 111, Position 2: 001 (Marquee)
  EIGHT: [
    '000 | 000 | 000 | 000 | 000 | 000 | 000',
    '000 | 000 | 000 | 000 | 000 | 000 | 000',
    '000 | 000 | 000 | 000 | 001 | 111 | 1 S'
  ].join(' | '),

  // Round8 "11" = decimal 9: Pos1: 000, Pos2: 000, Pos3: 001 (Marquee)
  ELEVEN: [
    '000 | 000 | 000 | 000 | 000 | 000 | 000',
    '000 | 000 | 000 | 000 | 000 | 000 | 000',
    '000 | 000 | 000 | 001 | 000 | 000 | 1 S'
  ].join(' | '),

  // Round8 "711842" = decimal 234530
  SAMPLE_LARGE: [
    '000 | 000 | 000 | 000 | 000 | 000 | 000',
    '000 | 000 | 000 | 000 | 000 | 000 | 000',
    '001 | 110 | 000 | 000 | 111 | 011 | 001 | 1 S'
  ].join(' | ')
};

/**
 * ═══════════════════════════════════════════════════════════════════════════
 * PHASE 1: ENDPOINT CONNECTIVITY
 * ═══════════════════════════════════════════════════════════════════════════
 *
 * Validate Forever Clock endpoints are accessible before testing algorithm
 */

describe('Phase 1: Endpoint Connectivity', () => {
  /**
   * Test Suite 1: /count Endpoint
   *
   * Validates Forever Clock is running and returning iteration data
   */
  describe('Test Suite 1: /count Endpoint Connectivity', () => {
    test('1.1: GET /count returns valid iteration data', async () => {
      const { ok, data } = await httpGet<CountResponse>(`${API_BASE_URL}/count`);
      expect(ok).toBe(true);

      expect(data.iteration).toBeDefined();
      expect(typeof data.iteration).toBe('number');
      expect(data.iteration).toBeGreaterThan(0);

      console.log('[Connectivity] /count iteration:', data.iteration);
      console.log('[Connectivity] /count currentRound8:', data.currentRound8);
    });

    test('1.2: /count iteration provides testable range', async () => {
      const { data } = await httpGet<CountResponse>(`${API_BASE_URL}/count`);

      // Need at least some iterations to test
      expect(data.iteration).toBeGreaterThanOrEqual(1);

      console.log('[Connectivity] Testable range: [1, ' + data.iteration + ']');
    });
  });

  /**
   * Test Suite 2: /lookup Endpoint
   *
   * Validates lookup endpoint is accessible and properly configured
   */
  describe('Test Suite 2: /lookup Endpoint Connectivity', () => {
    test('2.1: GET /lookup without binary param returns 400', async () => {
      const { status, data } = await httpGet<LookupResponse>(`${API_BASE_URL}/lookup`);

      // Should return 400 for missing parameter
      expect(status).toBe(400);
      expect(data.found).toBe(false);
      expect(data.error).toBeDefined();

      console.log('[Connectivity] /lookup error response:', data.error);
    });

    test('2.2: GET /lookup with invalid binary returns not found', async () => {
      const url = `${API_BASE_URL}/lookup?binary=INVALID_BINARY_VALUE`;
      const { ok, data } = await httpGet<LookupResponse>(url);

      expect(ok).toBe(true);
      expect(data.found).toBe(false);

      console.log('[Connectivity] /lookup not found response:', data.message);
    });

    test('2.3: GET /lookup with first iteration binary returns found', async () => {
      // Round8 "1" = decimal 1
      const url = `${API_BASE_URL}/lookup?binary=${encodeURIComponent(FORMATTED_BINARY.ONE)}`;
      const { ok, data } = await httpGet<LookupResponse>(url);

      expect(ok).toBe(true);

      if (data.found) {
        expect(data.entry).toBeDefined();
        expect(data.entry?.decimalPairing).toBe(1);
        expect(data.entry?.stringOutput).toBe('1');
        console.log('[Connectivity] First iteration found:', data.entry?.formattedString);
        console.log('[Connectivity] formattedBinary format confirmed');
      } else {
        console.log('[Connectivity] First iteration not yet counted');
      }
    });

    test('2.4: GET /lookup with iteration 8 (Round8 "8") returns found', async () => {
      // Round8 "8" = decimal 8
      const url = `${API_BASE_URL}/lookup?binary=${encodeURIComponent(FORMATTED_BINARY.EIGHT)}`;
      const { data } = await httpGet<LookupResponse>(url);

      if (data.found) {
        expect(data.entry?.decimalPairing).toBe(8);
        expect(data.entry?.stringOutput).toBe('8');
        console.log('[Connectivity] Iteration 8 verified: decimal=8, Round8="8"');
      }
    });

    test('2.5: GET /lookup with iteration 9 (Round8 "11") returns found', async () => {
      // Round8 "11" = decimal 9 (first 2-digit number)
      const url = `${API_BASE_URL}/lookup?binary=${encodeURIComponent(FORMATTED_BINARY.ELEVEN)}`;
      const { data } = await httpGet<LookupResponse>(url);

      if (data.found) {
        expect(data.entry?.decimalPairing).toBe(9);
        expect(data.entry?.stringOutput).toBe('11');
        console.log('[Connectivity] Iteration 9 verified: decimal=9, Round8="11"');
      }
    });
  });
});

/**
 * ═══════════════════════════════════════════════════════════════════════════
 * PHASE 2: HEAD WALL VALIDATION
 * ═══════════════════════════════════════════════════════════════════════════
 *
 * Validate conversion functions
 * NOTE: These tests will fail until algorithm is finalized
 */

describe('Phase 2: Scaffolded Function Validation', () => {
  /**
   * Test Suite 3: decimalToRound8 Function
   */
  describe('Test Suite 3: decimalToRound8 Function', () => {
    test('3.1: decimalToRound8 is callable', () => {
      const result = decimalToRound8(37441);

      expect(result).toBeDefined();
      expect(result).toBe('88881');

      console.log('[Scaffolded] decimalToRound8(1):', result);
    });

    // test('3.2: decimalToRound8 returns scaffolded placeholder', () => {
    //   const result = decimalToRound8(42);

    //   // Scaffolded function returns 'SCAFFOLDED:{decimal}'
    //   expect(result).toContain('SCAFFOLDED');

    //   console.log('[Scaffolded] decimalToRound8(42):', result);
    // });
  });

  /**
   * Test Suite 4: round8ToDecimal Function
   */
  describe('Test Suite 4: round8ToDecimal Function', () => {
    test('4.1: round8ToDecimal is callable', () => {
      const result = round8ToDecimal('8,88,81');

      expect(result).toBeDefined();
      expect(result).toBe(37441);
    });

    // test('4.2: round8ToDecimal returns scaffolded placeholder', () => {
    //   const result = round8ToDecimal('12345');

    //   // Scaffolded function returns -1
    //   expect(result).toBe(-1);

    //   console.log('[Scaffolded] round8ToDecimal("12345"):', result);
    // });
  });
});

/**
 * ═══════════════════════════════════════════════════════════════════════════
 * PHASE 3: CONCEPTION VALIDATION (Full Model Pipeline)
 * ═══════════════════════════════════════════════════════════════════════════
 *
 * Construction → Conception Validation:
 * - Construction: Random Round8 string generator (string comparison, no decimal)
 * - Conception: Full model pipeline (parseStringToRound8 → buffer → formattedBinary → API lookup)
 *
 * This proves the model files work correctly without circular decimal logic.
 */

describe('Phase 3: Conception Validation - Full Model Pipeline', () => {
  /**
   * Test Suite 5: Construction → Conception Pipeline
   *
   * Flow: Random Round8 String → parseStringToRound8 → buffer → formattedBinary → /lookup → verify
   */
  describe('Test Suite 5: Construction to Conception Pipeline', () => {
    test('5.1: Single random Round8 validates through full pipeline', async () => {
      // Step 1: Get current Round8 from API (max testable value)
      const { data: countData } = await httpGet<CountResponse>(`${API_BASE_URL}/count`);
      const currentRound8 = countData.currentRound8;
      console.log(`[Pipeline] Max Round8: ${currentRound8}`);

      // Step 2: Generate random Round8 string (Construction - string comparison only)
      const rawRound8 = generateRandomRound8String(currentRound8);
      const formattedRound8 = formatWithCommas(rawRound8);
      console.log(`[Pipeline] Generated: raw="${rawRound8}", formatted="${formattedRound8}"`);

      // Step 3: Convert to BigInt buffer via parseStringToRound8 (Conception)
      const buffer = parseStringToRound8(formattedRound8);
      expect(buffer).toBeDefined();
      if (buffer === undefined) {
        throw new Error(`parseStringToRound8 failed for: ${formattedRound8}`);
      }
      console.log(`[Pipeline] Buffer: ${buffer.toString()}`);

      // Step 4: Convert buffer to formattedBinary (Conception)
      const formattedBinary = createFormattedRound8BinaryString(buffer);
      console.log(`[Pipeline] FormattedBinary: ${formattedBinary}`);

      // Step 5: Lookup via API
      const lookupUrl = `${API_BASE_URL}/lookup?binary=${encodeURIComponent(formattedBinary)}`;
      const { data: lookupData } = await httpGet<LookupResponse>(lookupUrl);

      // Step 6: Validate - API's stringOutput should match our generated string
      if (lookupData.found && lookupData.entry) {
        const apiRound8 = lookupData.entry.stringOutput;
        console.log(`[Pipeline] API returned: "${apiRound8}", decimal=${lookupData.entry.decimalPairing}`);

        // Compare unformatted strings (both should match)
        expect(apiRound8).toBe(rawRound8);
        console.log('[Pipeline] ✓ Construction → Conception pipeline validated');
      } else {
        console.log('[Pipeline] Entry not yet in Forever Clock (value too new)');
      }
    });

    test('5.2: Known value "1" validates through pipeline', async () => {
      const rawRound8 = '1';
      const formattedRound8 = '1';

      // Conception pipeline
      const buffer = parseStringToRound8(formattedRound8);
      expect(buffer).toBeDefined();
      if (buffer === undefined) {
        throw new Error('parseStringToRound8 failed');
      }

      const formattedBinary = createFormattedRound8BinaryString(buffer);
      console.log(`[Pipeline] "1" → formattedBinary: ${formattedBinary}`);

      // Lookup and validate
      const { data } = await httpGet<LookupResponse>(
        `${API_BASE_URL}/lookup?binary=${encodeURIComponent(formattedBinary)}`
      );

      if (data.found && data.entry) {
        expect(data.entry.stringOutput).toBe(rawRound8);
        expect(data.entry.decimalPairing).toBe(1);
        console.log('[Pipeline] ✓ Known value "1" validated');
      }
    });

    test('5.3: Known value "8" validates through pipeline', async () => {
      const rawRound8 = '8';

      const buffer = parseStringToRound8(rawRound8);
      expect(buffer).toBeDefined();
      if (buffer === undefined) {
        throw new Error('parseStringToRound8 failed');
      }

      const formattedBinary = createFormattedRound8BinaryString(buffer);
      console.log(`[Pipeline] "8" → formattedBinary: ${formattedBinary}`);

      const { data } = await httpGet<LookupResponse>(
        `${API_BASE_URL}/lookup?binary=${encodeURIComponent(formattedBinary)}`
      );

      if (data.found && data.entry) {
        expect(data.entry.stringOutput).toBe(rawRound8);
        expect(data.entry.decimalPairing).toBe(8);
        console.log('[Pipeline] ✓ Known value "8" validated');
      }
    });

    test('5.4: Known value "11" (decimal 9) validates through pipeline', async () => {
      const rawRound8 = '11';

      const buffer = parseStringToRound8(rawRound8);
      expect(buffer).toBeDefined();
      if (buffer === undefined) {
        throw new Error('parseStringToRound8 failed');
      }

      const formattedBinary = createFormattedRound8BinaryString(buffer);
      console.log(`[Pipeline] "11" → formattedBinary: ${formattedBinary}`);

      const { data } = await httpGet<LookupResponse>(
        `${API_BASE_URL}/lookup?binary=${encodeURIComponent(formattedBinary)}`
      );

      if (data.found && data.entry) {
        expect(data.entry.stringOutput).toBe(rawRound8);
        expect(data.entry.decimalPairing).toBe(9);
        console.log('[Pipeline] ✓ Known value "11" (decimal 9) validated');
      }
    });
  });

  /**
   * Test Suite 6: Decimal Conversion Validation (uses API as ground truth)
   *
   * Flow: API lookup → decimalPairing → decimalToRound8 → compare with stringOutput
   */
  describe('Test Suite 6: Decimal Conversion Against Ground Truth', () => {
    test('6.1: decimalToRound8 matches API stringOutput for iteration 1', async () => {
      const { data } = await httpGet<LookupResponse>(
        `${API_BASE_URL}/lookup?binary=${encodeURIComponent(FORMATTED_BINARY.ONE)}`
      );

      if (data.found && data.entry) {
        const apiDecimal = data.entry.decimalPairing;
        const apiRound8 = data.entry.stringOutput;

        const computedRound8 = decimalToRound8(apiDecimal);
        console.log(`[Decimal] API: decimal=${apiDecimal}, round8="${apiRound8}"`);
        console.log(`[Decimal] Computed: decimalToRound8(${apiDecimal}) = "${computedRound8}"`);

        expect(computedRound8).toBe(apiRound8);
        console.log('[Decimal] ✓ decimalToRound8 matches ground truth');
      }
    });

    test('6.2: round8ToDecimal matches API decimalPairing for iteration 1', async () => {
      const { data } = await httpGet<LookupResponse>(
        `${API_BASE_URL}/lookup?binary=${encodeURIComponent(FORMATTED_BINARY.ONE)}`
      );

      if (data.found && data.entry) {
        const apiDecimal = data.entry.decimalPairing;
        const apiRound8 = data.entry.stringOutput;

        const computedDecimal = round8ToDecimal(formatWithCommas(apiRound8));
        console.log(`[Decimal] API: round8="${apiRound8}", decimal=${apiDecimal}`);
        console.log(`[Decimal] Computed: round8ToDecimal("${apiRound8}") = ${computedDecimal}`);

        expect(computedDecimal).toBe(apiDecimal);
        console.log('[Decimal] ✓ round8ToDecimal matches ground truth');
      }
    });
  });
});

/**
 * ═══════════════════════════════════════════════════════════════════════════
 * PHASE 4: 8-SAMPLE STATISTICAL VALIDATION
 * ═══════════════════════════════════════════════════════════════════════════
 *
 * Run 8 random samples per test (corresponds to Round8 base symbol count 1-8)
 * Uses Construction → Conception flow with API ground truth validation
 */

describe('Phase 4: 8-Sample Statistical Validation', () => {
  /**
   * Test Suite 7: 8-Sample Random Pipeline Validation
   *
   * Generates 8 random Round8 strings and validates each through full Conception pipeline
   */
  describe('Test Suite 7: 8-Sample Random Pipeline Validation', () => {
    test('7.1: 8 random Round8 strings validate through Conception pipeline', async () => {
      const SAMPLE_COUNT = 8;  // Corresponds to Round8 base (1-8)

      // Get current Round8 from API (max testable value)
      const { data: countData } = await httpGet<CountResponse>(`${API_BASE_URL}/count`);
      const currentRound8 = countData.currentRound8;
      const maxIteration = countData.iteration;

      console.log(`[8-Sample] Max Round8: ${currentRound8}, iteration: ${maxIteration}`);
      console.log(`[8-Sample] Running ${SAMPLE_COUNT} samples...`);

      let passCount = 0;
      let notFoundCount = 0;
      let failCount = 0;

      for (let i = 0; i < SAMPLE_COUNT; i++) {
        // Construction: Generate random Round8 string (string comparison only)
        const rawRound8 = generateRandomRound8String(currentRound8);
        const formattedRound8 = formatWithCommas(rawRound8);

        // Conception: Full pipeline
        const buffer = parseStringToRound8(formattedRound8);
        if (buffer === undefined) {
          failCount++;
          console.log(`[8-Sample] FAIL #${i + 1}: parseStringToRound8 failed for "${formattedRound8}"`);
          continue;
        }

        const formattedBinary = createFormattedRound8BinaryString(buffer);

        // API Lookup
        const { data } = await httpGet<LookupResponse>(
          `${API_BASE_URL}/lookup?binary=${encodeURIComponent(formattedBinary)}`
        );

        if (data.found && data.entry) {
          // Validate: API's stringOutput should match our generated string
          if (data.entry.stringOutput === rawRound8) {
            passCount++;
            console.log(`[8-Sample] ✓ #${i + 1}: "${rawRound8}" → decimal ${data.entry.decimalPairing}`);
          } else {
            failCount++;
            console.log(`[8-Sample] FAIL #${i + 1}: Expected "${rawRound8}", got "${data.entry.stringOutput}"`);
          }
        } else {
          notFoundCount++;
          console.log(`[8-Sample] ~ #${i + 1}: "${rawRound8}" not yet in Forever Clock`);
        }
      }

      console.log(`[8-Sample] Results: ${passCount} pass, ${notFoundCount} not found, ${failCount} fail`);

      // All found entries must pass; not-found entries are acceptable (value beyond current iteration)
      expect(failCount).toBe(0);
      console.log('[8-Sample] ✓ All found entries validated through Conception pipeline');
    });
  });

  /**
   * Test Suite 8: Decimal Conversion Statistical Validation
   *
   * Uses API as ground truth to validate decimalToRound8 and round8ToDecimal
   */
  describe('Test Suite 8: Decimal Conversion Statistical Validation', () => {
    test('8.1: 8 random API lookups validate decimalToRound8', async () => {
      const SAMPLE_COUNT = 8;

      const { data: countData } = await httpGet<CountResponse>(`${API_BASE_URL}/count`);
      const currentRound8 = countData.currentRound8;

      console.log(`[DecimalStats] Running ${SAMPLE_COUNT} decimalToRound8 validations...`);

      let passCount = 0;
      let notFoundCount = 0;
      let failCount = 0;

      for (let i = 0; i < SAMPLE_COUNT; i++) {
        // Generate random Round8 and lookup to get ground truth decimal
        const rawRound8 = generateRandomRound8String(currentRound8);
        const formattedRound8 = formatWithCommas(rawRound8);

        const buffer = parseStringToRound8(formattedRound8);
        if (buffer === undefined) {
          failCount++;
          continue;
        }

        const formattedBinary = createFormattedRound8BinaryString(buffer);
        const { data } = await httpGet<LookupResponse>(
          `${API_BASE_URL}/lookup?binary=${encodeURIComponent(formattedBinary)}`
        );

        if (data.found && data.entry) {
          // Use API's decimalPairing as ground truth
          const apiDecimal = data.entry.decimalPairing;
          const apiRound8 = data.entry.stringOutput;

          // Validate decimalToRound8
          const computedRound8 = decimalToRound8(apiDecimal);
          if (computedRound8 === apiRound8) {
            passCount++;
            console.log(`[DecimalStats] ✓ #${i + 1}: decimalToRound8(${apiDecimal}) = "${computedRound8}"`);
          } else {
            failCount++;
            console.log(`[DecimalStats] FAIL #${i + 1}: decimalToRound8(${apiDecimal}) = "${computedRound8}", expected "${apiRound8}"`);
          }
        } else {
          notFoundCount++;
        }
      }

      console.log(`[DecimalStats] Results: ${passCount} pass, ${notFoundCount} not found, ${failCount} fail`);
      expect(failCount).toBe(0);
    });

    test('8.2: 8 random API lookups validate round8ToDecimal', async () => {
      const SAMPLE_COUNT = 8;

      const { data: countData } = await httpGet<CountResponse>(`${API_BASE_URL}/count`);
      const currentRound8 = countData.currentRound8;

      console.log(`[DecimalStats] Running ${SAMPLE_COUNT} round8ToDecimal validations...`);

      let passCount = 0;
      let notFoundCount = 0;
      let failCount = 0;

      for (let i = 0; i < SAMPLE_COUNT; i++) {
        const rawRound8 = generateRandomRound8String(currentRound8);
        const formattedRound8 = formatWithCommas(rawRound8);

        const buffer = parseStringToRound8(formattedRound8);
        if (buffer === undefined) {
          failCount++;
          continue;
        }

        const formattedBinary = createFormattedRound8BinaryString(buffer);
        const { data } = await httpGet<LookupResponse>(
          `${API_BASE_URL}/lookup?binary=${encodeURIComponent(formattedBinary)}`
        );

        if (data.found && data.entry) {
          const apiDecimal = data.entry.decimalPairing;
          const apiRound8 = data.entry.stringOutput;

          // Validate round8ToDecimal
          const computedDecimal = round8ToDecimal(formatWithCommas(apiRound8));
          if (computedDecimal === apiDecimal) {
            passCount++;
            console.log(`[DecimalStats] ✓ #${i + 1}: round8ToDecimal("${apiRound8}") = ${computedDecimal}`);
          } else {
            failCount++;
            console.log(`[DecimalStats] FAIL #${i + 1}: round8ToDecimal("${apiRound8}") = ${computedDecimal}, expected ${apiDecimal}`);
          }
        } else {
          notFoundCount++;
        }
      }

      console.log(`[DecimalStats] Results: ${passCount} pass, ${notFoundCount} not found, ${failCount} fail`);
      expect(failCount).toBe(0);
    });
  });
});
