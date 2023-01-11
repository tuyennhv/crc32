const crypto = require("node:crypto");
const {expect} = require("chai");
const nodeRs = require("@node-rs/crc32");
const Sse4Crc32 = require("sse4_crc32");
const jsCrc32cImport = require("../../src/js_crc32c");

describe("crc32", function () {
  for (let i = 0; i < 100; i++) {
    const bytes = crypto.randomBytes(i * 1000);
    it(`Test ${i}`, function () {
      const jsResult = jsCrc32cImport.calculate(bytes);
      expect(nodeRs.crc32c(bytes)).to.be.equal(jsResult);
      expect(Sse4Crc32.calculate(bytes)).to.be.equal(jsResult);
    });
  }
});