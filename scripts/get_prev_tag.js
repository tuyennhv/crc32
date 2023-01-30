const {exec} = require("node:child_process");
const {promisify} = require("node:util");

async function run() {
  const tag = "v1.2023.0";
  console.log("GITHUB_OUTPUT is", process.env.GITHUB_OUTPUT);
  await promisify(exec)(`prev_tag=${tag} >> $GITHUB_OUTPUT`);
}

run().catch((e) => {
  console.error(e);
  process.exit(1);
});
