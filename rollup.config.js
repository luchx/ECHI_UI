// rollup.config.js
import path from "path";
import pkg from "./package.json";
import vue from "rollup-plugin-vue";
import alias from "@rollup/plugin-alias";
import typescript from "rollup-plugin-typescript2";
import replace from "@rollup/plugin-replace";
import json from "rollup-plugin-json";
import babel from "rollup-plugin-babel";
import scss from "rollup-plugin-scss";
import image from "@rollup/plugin-image";
import postcss from "postcss";
import autoprefixer from "autoprefixer";
import csso from "postcss-csso";
import { terser } from "rollup-plugin-terser";
import minimist from "minimist";

const argv = minimist(process.argv.slice(2));

function resolve(dir) {
  return path.join(__dirname, `${dir}`);
}

const libDir = "dist";
const extensions = [".js", ".jsx", ".ts", ".tsx", ".vue"];
const format = !argv.format || argv.format;
const suffix = {
  cjs: pkg.browser,
  umd: pkg.main,
  es: pkg.module,
  iife: pkg.unpkg
};

const outputConfigs = function(format) {
  let output = {
    file: resolve(suffix[format]),
    format
  };

  if (format !== "es") {
    output = {
      ...output,
      name: "MUI",
      exports: "named",
      globals: {
        vue: "Vue",
        "element-ui": "ELEMENT"
      }
    };
  }

  return output;
};

const tsPlugin = typescript({
  check: true,
  tsconfig: resolve("tsconfig.json"),
  cacheRoot: resolve("node_modules/.mui_cache")
});

const terserConfig = function(format) {
  const config = {
    iife: [
      terser({
        compress: true,
        safari10: true,
        ie8: true
      })
    ]
  };

  return config[format] || [];
};

// Customize configs for individual targets
function buildConfig() {
  return [
    {
      input: "packages/index.ts",
      output: outputConfigs(format),
      // 减少包体积，需要声明 peerDependencies 依赖引入
      external: ["vue", "element-ui"],
      plugins: [
        tsPlugin,
        json(),
        alias({
          resolve: extensions,
          entries: {
            "@": resolve("src"),
            mui: resolve("packages")
          }
        }),
        vue({
          css: false,
          compileTemplate: true
        }),
        image(),
        scss({
          prefix: `@import "packages/theme-chalk/src/theme.scss";`,
          output: `${libDir}/mui.min.css`,
          includePaths: ["node_modules"],
          processor: css =>
            postcss([autoprefixer(), csso()])
              .process(css, { from: undefined })
              .then(result => result.css)
        }),
        replace({
          "process.env.NODE_ENV": JSON.stringify("production")
        }),
        babel({
          runtimeHelpers: true
        }),

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
        require("rollup-plugin-node-globals")(),
        ...terserConfig(format)
      ]
    }
  ];
}

// Export config
export default buildConfig();
