const nodeRs = require("@node-rs/crc32");
const {itBench, setBenchOpts} = require("@dapplion/benchmark");
const crc32c = nodeRs.crc32c;

describe("crc32 implementations", function () {
  setBenchOpts({
    minMs: 30 * 1000,
  })

  const bytes = Buffer.alloc(1000);

  itBench({
    id: "@node-rs/crc32",
    fn: () => {
      crc32c(bytes);
    }
  })
});