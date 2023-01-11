const nodeRs = require("@node-rs/crc32");
const {itBench, setBenchOpts} = require("@dapplion/benchmark");
const jsCrc32cImport = require("../../src/js_crc32c");
const nodeRsCrc32c = nodeRs.crc32c;
const jsCrc32c = jsCrc32cImport.calculate;

/**
 * Sample output:
 crc32 implementations
    ✔ @node-rs/crc32 100 bytes                                             1295337 ops/s    772.0000 ns/op        -    9134008 runs   10.0 s
    ✔ js_crc32c 100 bytes                                                 442477.9 ops/s    2.260000 us/op        -    3841293 runs   10.1 s
    ✔ @node-rs/crc32 1000 bytes                                           974658.9 ops/s    1.026000 us/op        -    7310789 runs   10.1 s
    ✔ js_crc32c 1000 bytes                                                52010.19 ops/s    19.22700 us/op        -     488547 runs   10.0 s
    ✔ @node-rs/crc32 10000 bytes                                          304692.3 ops/s    3.282000 us/op        -    2738901 runs   10.1 s
    ✔ js_crc32c 10000 bytes                                               5202.453 ops/s    192.2170 us/op        -      51317 runs   10.1 s
    ✔ @node-rs/crc32 100000 bytes                                         44553.35 ops/s    22.44500 us/op        -     440488 runs   10.1 s
    ✔ js_crc32c 100000 bytes                                              542.2614 ops/s    1.844129 ms/op        -       5165 runs   10.0 s
 */
describe("crc32 implementations", function () {
  setBenchOpts({
    minMs: 10 * 1000,
  })

  const counts = [100, 1000, 10_000, 100_000];
  for (const c of counts) {
    const bytes = Buffer.alloc(c);

    itBench({
      id: `@node-rs/crc32 ${c} bytes`,
      fn: () => {
        nodeRsCrc32c(bytes);
      }
    })

    itBench({
      id: `js_crc32c ${c} bytes`,
      fn: () => jsCrc32c(bytes),
    })
  }
});