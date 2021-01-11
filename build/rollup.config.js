// rollup.config.js
import path from "path";
import vue from "rollup-plugin-vue";
import alias from "@rollup/plugin-alias";
import typescript from "rollup-plugin-typescript2";
import replace from "@rollup/plugin-replace";
import json from "rollup-plugin-json";
import buble from "rollup-plugin-buble";
import filesize from "rollup-plugin-filesize";
import scss from "rollup-plugin-scss";
import image from "@rollup/plugin-image";
import postcss from "postcss";
import autoprefixer from "autoprefixer";
import cssnano from "cssnano";
import { terser } from "rollup-plugin-terser";
import minimist from "minimist";

const argv = minimist(process.argv.slice(2));

function resolve(dir) {
  return path.join(__dirname, `../${dir}`);
}

const format = !argv.format || argv.format;

const outputConfigs = function(format) {
  const suffix = {
    cjs: "cjs",
    umd: "umd",
    es: "esm",
    iife: "unpkg.min"
  };
  let output = {
    file: resolve(`dist/mui.${suffix[format] || "min"}.js`),
    format
  };

  if (format !== "es") {
    output = {
      ...output,
      name: "MUI",
      exports: "default",
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
  cacheRoot: resolve("node_modules/.mui_cache"),
  tsconfigOverride: {
    compilerOptions: {
      sourceMap: true,
      declaration: false,
      declarationMap: false
    },
    exclude: ["**/__tests__", "test-dts"]
  }
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
      external: ["vue"],
      plugins: [
        filesize(),
        tsPlugin,
        json(),
        alias({
          resolve: [".js", ".jsx", ".ts", ".tsx", ".vue"],
          entries: {
            "@": resolve("src"),
            "@packages": resolve("packages")
          }
        }),
        vue({
          target: "browser",
          css: false
        }),
        image(),
        scss({
          prefix: `@import "packages/theme-chalk/src/theme.scss";`,
          output: "dist/mui.min.css",
          includePaths: ["../node_modules/"],
          processor: css =>
            postcss({
              plugins: [autoprefixer(), cssnano()]
            })
              .process(css, { from: undefined })
              .then(result => result.css)
        }),
        replace({
          "process.env.NODE_ENV": JSON.stringify("production")
        }),
        buble({
          objectAssign: "Object.assign",
          jsx: "h"
        }),

        require("@rollup/plugin-node-resolve").nodeResolve({
          browser: true,
          preferBuiltins: true,
          moduleDirectories: ["../node_modules"],
          extensions: [".js", ".jsx", ".ts", ".tsx", ".vue"]
        }),
        require("@rollup/plugin-commonjs")({
          include: /node_modules/,
          namedExports: {
            "node_modules/element-ui/lib/element-ui.common.js": [
              "Dialog",
              "Button",
              // Icon
              "Row",
              "Col",
              "Select",
              "Option",
              "Table",
              "TableColumn",
              "Input",
              "Tree",
              "Loading",
              "Tag",
              "Dropdown",
              "DropdownMenu",
              "DropdownItem",
              "Tooltip"
            ]
          },
          extensions: [".js", ".jsx", ".ts", ".tsx", ".vue"]
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
