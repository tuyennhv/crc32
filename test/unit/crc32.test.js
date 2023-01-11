const crypto = require("node:crypto");
const {expect} = require("chai");
const nodeRs = require("@node-rs/crc32");
const jsCrc32cImport = require("../../src/js_crc32c");

describe("crc32", function () {
  for (let i = 0; i < 1000; i++) {
    const bytes = crypto.randomBytes(i * 1000);
    it(`Test ${i}`, function () {
      expect(nodeRs.crc32c(bytes)).to.be.equal(jsCrc32cImport.calculate(bytes));
    });
  }
});