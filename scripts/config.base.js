// rollup.config.js
const path = require("path");
const vuePlugin = require("rollup-plugin-vue");
const image = require("@rollup/plugin-image");
const replace = require("@rollup/plugin-replace");
const json = require("@rollup/plugin-json");
// const alias = require("@rollup/plugin-alias");
const { babel } = require("@rollup/plugin-babel");
const peerDepsExternal = require("rollup-plugin-peer-deps-external");
const typescript = require("rollup-plugin-typescript2");

function resolve(dir) {
  return path.join(__dirname, `../${dir}`);
}

const extensions = [".js", ".jsx", ".ts", ".tsx", ".vue"];

// 配置 ts 支持
const tsPlugin = declare =>
  typescript({
    check: true,
    tsconfig: resolve("tsconfig.json"),
    cacheRoot: resolve("node_modules/.mui_cache"),
    tsconfigOverride: {
      compilerOptions: {
        declaration: declare,
        declarationMap: declare
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

module.exports = type => ({
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
    tsPlugin(type === "lib"),
    // alias({
    //   resolve: extensions,
    //   entries: {
    //     "@": resolve("src")
    //   }
    // }),
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
});
