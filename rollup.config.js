// rollup.config.js
import path from "path";
import pkg from "./package.json";
import vuePlugin from "rollup-plugin-vue";
import alias from "@rollup/plugin-alias";
import typescript from "rollup-plugin-typescript2";
import peerDepsExternal from "rollup-plugin-peer-deps-external";
import replace from "@rollup/plugin-replace";
import json from "@rollup/plugin-json";
import image from "@rollup/plugin-image";
import { babel } from "@rollup/plugin-babel";
import { terser } from "rollup-plugin-terser";

function resolve(dir) {
  return path.join(__dirname, `${dir}`);
}

const extensions = [".js", ".jsx", ".ts", ".tsx", ".vue"];

const tsPlugin = typescript({
  check: true,
  tsconfig: resolve("tsconfig.json"),
  cacheRoot: resolve("node_modules/.mui_cache"),
  tsconfigOverride: {
    compilerOptions: {
      declaration: true,
      declarationMap: true
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

const createBanner = () => {
  return `/*!
  * ${pkg.name} v${pkg.version}
  * (c) ${new Date().getFullYear()} luchx
  * @license MIT
  */`;
};

const createBaseConfig = () => {
  return {
    input: "packages/index.ts",
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
          "@": resolve("src"),
          mui: resolve("packages")
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
    ],
    output: {
      sourcemap: false,
      banner: createBanner(),
      externalLiveBindings: false,
      globals: {
        vue: "Vue",
        "element-ui": "ELEMENT"
      }
    }
  };
};

function mergeConfig(baseConfig, configB) {
  const config = Object.assign({}, baseConfig);
  // plugin
  if (configB.plugins) {
    baseConfig.plugins.push(...configB.plugins);
  }

  // output
  config.output = Object.assign({}, baseConfig.output, configB.output);

  return config;
}

// es-bundle
const esBundleConfig = {
  output: {
    file: pkg.module,
    format: "es"
  }
};

// cjs
const cjsConfig = {
  plugins: [terser()],
  output: {
    file: pkg.main,
    format: "cjs",
    exports: "named",
    name: "MUI"
  }
};

// global
const globalConfig = {
  plugins: [terser()],
  output: {
    file: pkg.unpkg,
    format: "iife",
    exports: "named",
    name: "MUI"
  }
};

// globalProd
/**
 * 在配置按需引入的条件下会查找 lib/index.js 文件，防止找不到而产生的错误
 * import mui from "lcx-ui"
 */
const globalProdConfig = {
  plugins: [terser()],
  output: {
    file: "lib/index.js",
    format: "umd",
    exports: "named",
    name: "MUI"
  }
};

const prodFormatConfigs = [
  esBundleConfig,
  cjsConfig,
  globalConfig,
  globalProdConfig
];

function createPackageConfigs() {
  return prodFormatConfigs.map(formatConfig => {
    return mergeConfig(createBaseConfig(), formatConfig);
  });
}

// Export config
export default createPackageConfigs();
