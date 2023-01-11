const nodeRs = require("@node-rs/crc32");
const {itBench, setBenchOpts} = require("@dapplion/benchmark");
const jsCrc32cImport = require("../../src/js_crc32c");
const nodeRsCrc32c = nodeRs.crc32c;
const jsCrc32c = jsCrc32cImport.calculate;

describe("crc32 implementations", function () {
  setBenchOpts({
    minMs: 30 * 1000,
  })

  const bytes = Buffer.alloc(1000);

  itBench({
    id: "@node-rs/crc32",
    fn: () => {
      nodeRsCrc32c(bytes);
    }
  })

  itBench({
    id: "@js_crc32c",
    fn: () => jsCrc32c(bytes),
  })
});