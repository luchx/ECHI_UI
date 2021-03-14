// rollup.config.js
const path = require("path");
const { getPackages } = require("@lerna/project");
const rollup = require("rollup");
const baseConfig = require("./config.base");

function resolve(dir) {
  return path.join(__dirname, `../${dir}`);
}

const runBuild = async () => {
  let index = 0;
  const pkgs = await getPackages();
  const inputs = pkgs
    .map(pkg => pkg.name)
    .filter(name => name.includes("@lcx"))
    .slice(process.argv[2], process.argv[3]);

  // eslint-disable-next-line @typescript-eslint/no-use-before-define
  build(inputs[index]);

  async function build(name) {
    if (!name) return;
    const inputOptions = {
      ...baseConfig("esm"),
      input: resolve(`packages/${name.split("@lcx/")[1]}/index.ts`)
    };
    const getOutFile = () => {
      const compName = name.split("@lcx/")[1];
      return `lib/${compName}/index.js`;
    };
    const outOptions = {
      format: "es",
      file: getOutFile(),
      paths(id) {
        if (/^@lcx/.test(id)) {
          return id.replace("@lcx", "..");
        }
      }
    };

    const bundle = await rollup.rollup(inputOptions);
    console.log(name, "done");
    await bundle.write(outOptions);
    index++;
    if (index < inputs.length) {
      await build(inputs[index]);
    }
  }
};

runBuild();
