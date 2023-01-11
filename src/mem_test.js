const nodeRs = require("@node-rs/crc32");
const crc32c = nodeRs.crc32c;

const bytes = Buffer.alloc(1000);


async function memTest() {
  const count = 1_000_000_000;
  for (let i = 0; i < count; i++) {
    crc32c(bytes);
    if (i % 100_000 === 0) {
      await new Promise((resolve) => setTimeout(resolve, 100));
      const {heapTotal, rss} = process.memoryUsage();
      console.log(
        "Memory usage",
        Math.floor((i * 100) / count) + "%",
        "heapTotal",
        toMem(heapTotal),
        "rss",
        toMem(rss)
      );
    }
  }
}

function toMem(n) {
  const bytes = Math.abs(n);
  const sign = n > 0 ? "+" : "-";
  if (bytes < 1e6) return sign + Math.floor(bytes / 10) / 100 + " KB";

  if (bytes < 1e9) return sign + Math.floor(bytes / 1e4) / 100 + " MB";

  return sign + Math.floor(bytes / 1e7) / 100 + " GB";
}

console.log("Start node-rs crc32c mem test");

memTest().then(() => console.log("Done"));