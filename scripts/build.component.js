// rollup.config.js
const path = require("path");
const { getPackages } = require("@lerna/project");
const vuePlugin = require("rollup-plugin-vue");
const image = require("@rollup/plugin-image");
const replace = require("@rollup/plugin-replace");
const json = require("@rollup/plugin-json");
const alias = require("@rollup/plugin-alias");
const { babel } = require("@rollup/plugin-babel");
const peerDepsExternal = require("rollup-plugin-peer-deps-external");
const rollup = require("rollup");
const typescript = require("rollup-plugin-typescript2");

function resolve(dir) {
  return path.join(__dirname, `../${dir}`);
}

const extensions = [".js", ".jsx", ".ts", ".tsx", ".vue"];

const tsPlugin = typescript({
  check: true,
  tsconfig: resolve("tsconfig.json"),
  cacheRoot: resolve("node_modules/.lcx_cache"),
  tsconfigOverride: {
    compilerOptions: {
      declaration: false
    },
    exclude: ["node_modules", "__tests__"]
  }
});

// 支持 node 模块化引入
const nodePlugins = [
  require("@rollup/plugin-node-resolve").nodeResolve({
    browser: true,
    preferBuiltins: true,
    extensions: extensions
  }),
  require("@rollup/plugin-commonjs")({
    include: /node_modules/,
    extensions: extensions
  }),
  require("rollup-plugin-node-builtins")(),
  require("rollup-plugin-node-globals")()
];

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
      input: resolve(`packages/${name.split("@lcx/")[1]}/index.ts`),
      // 减少包体积，需要声明 peerDependencies 依赖引入
      external: ["vue", "element-ui"],
      onwarn: (msg, warn) => {
        if (!/Circular/.test(msg)) {
          warn(msg);
        }
      },
      treeshake: {
        moduleSideEffects: false
      },
      plugins: [
        peerDepsExternal(),
        json(),
        tsPlugin,
        alias({
          resolve: extensions,
          entries: {
            "@": resolve("src")
          }
        }),
        vuePlugin({
          css: false,
          compileTemplate: true
        }),
        image(),
        replace({
          "process.env.NODE_ENV": JSON.stringify("production")
        }),
        babel({
          exclude: "node_modules/**",
          extensions: extensions,
          babelHelpers: "runtime"
        }),
        ...nodePlugins
      ]
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
