const nodeRs = require("@node-rs/crc32");
const {itBench, setBenchOpts} = require("@dapplion/benchmark");
const Sse4Crc32 = require("sse4_crc32");
const crypto = require("node:crypto");
const jsCrc32cImport = require("../../src/js_crc32c");
const nodeRsCrc32c = nodeRs.crc32c;
const jsCrc32c = jsCrc32cImport.calculate;

/**
 * Sample output:
 crc32 implementations
    ✔ @node-rs/crc32 500 bytes                                             1146789 ops/s    872.0000 ns/op   x1.095    8258507 runs   10.0 s
    ✔ sse4_crc32c 500 bytes                                                2105263 ops/s    475.0000 ns/op   x0.905   12540470 runs   10.1 s
    ✔ js_crc32c 500 bytes                                                 91945.57 ops/s    10.87600 us/op   x1.095     887882 runs   10.0 s
    ✔ @node-rs/crc32 1000 bytes                                           959692.9 ops/s    1.042000 us/op   x1.010    7250062 runs   10.1 s
    ✔ sse4_crc32c 1000 bytes                                               1876173 ops/s    533.0000 ns/op   x0.929   11406990 runs   10.0 s
    ✔ js_crc32c 1000 bytes                                                51350.52 ops/s    19.47400 us/op   x1.005     507357 runs   10.1 s
    ✔ @node-rs/crc32 10000 bytes                                          300661.5 ops/s    3.326000 us/op   x1.027    2741648 runs   10.1 s
    ✔ sse4_crc32c 10000 bytes                                             584795.3 ops/s    1.710000 us/op   x0.972    4980898 runs   10.1 s
    ✔ js_crc32c 10000 bytes                                               5280.026 ops/s    189.3930 us/op   x0.976      52037 runs   10.1 s
    ✔ @node-rs/crc32 100000 bytes                                         44045.10 ops/s    22.70400 us/op   x0.963     434913 runs   10.1 s
    ✔ sse4_crc32c 100000 bytes                                            75958.98 ops/s    13.16500 us/op   x0.969     743657 runs   10.1 s
    ✔ js_crc32c 100000 bytes                                              533.0195 ops/s    1.876104 ms/op   x0.942       5079 runs   10.0 s
    ✔ @node-rs/crc32 1000000 bytes                                        4493.372 ops/s    222.5500 us/op   x1.022      43781 runs   10.0 s
    ✔ sse4_crc32c 1000000 bytes                                           7570.653 ops/s    132.0890 us/op   x1.032      74229 runs   10.0 s
    ✔ js_crc32c 1000000 bytes                                             51.21042 ops/s    19.52727 ms/op   x1.037        491 runs   10.1 s
 */
describe("crc32 implementations", function () {
  setBenchOpts({
    minMs: 10 * 1000,
  })

  const counts = [500, 1000, 10_000, 100_000, 1_000_000];
  for (const c of counts) {
    const bytes = crypto.randomBytes(c);

    itBench({
      id: `@node-rs/crc32 ${c} bytes`,
      fn: () => nodeRsCrc32c(bytes),
    })

    itBench({
      id: `sse4_crc32c ${c} bytes`,
      fn: () => Sse4Crc32.calculate(bytes),
    })

    itBench({
      id: `js_crc32c ${c} bytes`,
      fn: () => jsCrc32c(bytes),
    })
  }
});