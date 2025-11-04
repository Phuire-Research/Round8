const { SumWrung } = require('./src/concepts/round8/model/Round8.cases.ts');

// Test 1: Column 0 valid position (no marquee) - simple addition
// Column 0: Display 1 [0,1,0] + Display 1 [0,1,0] = Display 2 [0,1,1]
const bufferA = new Uint8Array(64);
const bufferB = new Uint8Array(64);

bufferA[0] = 1; // Sign = 1 (positive)
bufferB[0] = 1; // Sign = 1 (positive)

// Column 0 (positions 1-3): Display 1 = [0,1,0]
bufferA[1] = 0; bufferA[2] = 1; bufferA[3] = 0;
bufferB[1] = 0; bufferB[2] = 1; bufferB[3] = 0;

// Column 20 (positions 61-63): Display 1 = [0,0,0] for baseline
bufferA[61] = 0; bufferA[62] = 0; bufferA[63] = 0;
bufferB[61] = 0; bufferB[62] = 0; bufferB[63] = 0;

console.log('Test 1: Column 0 Display 1 + Display 1');
console.log('bufferA column 0:', [bufferA[1], bufferA[2], bufferA[3]]);
console.log('bufferB column 0:', [bufferB[1], bufferB[2], bufferB[3]]);

try {
  const result = SumWrung(bufferA, bufferB);
  console.log('Result column 0:', [result[1], result[2], result[3]]);
  console.log('Expected: [0,1,1] (Display 2)');
} catch (e) {
  console.log('ERROR:', e.message);
}
