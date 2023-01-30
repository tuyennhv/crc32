const {exec} = require("node:child_process");
const {promisify} = require("node:util");

async function run() {
  const tag = "v1.2023.0";
  console.log("GITHUB_OUTPUT is", process.env.GITHUB_OUTPUT);
  const cmd = `echo "prev_tag=${tag}" >> ${process.env.GITHUB_OUTPUT}`;
  console.log("Execute command", cmd);
  await promisify(exec)(cmd);
}

run().catch((e) => {
  console.error(e);
  process.exit(1);
});
