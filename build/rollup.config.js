// rollup.config.js
import path from "path";
import vue from "rollup-plugin-vue";
import alias from "@rollup/plugin-alias";
import typescript from "rollup-plugin-typescript2";
import nodeResolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import replace from "@rollup/plugin-replace";
import babel from "rollup-plugin-buble";
import scss from "rollup-plugin-scss";
import postcss from "postcss";
import autoprefixer from "autoprefixer";
import cssnano from "cssnano";
import { terser } from "rollup-plugin-terser";
import minimist from "minimist";

const argv = minimist(process.argv.slice(2));

const projectRoot = path.resolve(__dirname, "..");

const baseConfig = {
  input: "packages/index.ts",
  plugins: {
    preVue: [
      typescript(),
      alias({
        resolve: [".js", ".jsx", ".ts", ".tsx", ".vue"],
        entries: {
          "@": path.resolve(projectRoot, "src"),
          "@packages": path.resolve(projectRoot, "packages")
        }
      }),
      nodeResolve({
        modulesOnly: true,
        browser: true,
        preferBuiltins: true,
        extensions: [".js", ".jsx", ".ts", ".tsx", ".vue"]
      }),
      scss({
        prefix: `@import "packages/theme-chalk/src/theme.scss";`,
        processor: css =>
          postcss([autoprefixer(), cssnano()])
            .process(css)
            .then(result => result.css)
      })
    ],
    replace: {
      "process.env.NODE_ENV": JSON.stringify("production"),
      "process.env.ES_BUILD": JSON.stringify("false")
    },
    vue: {
      css: true,
      compileTemplate: true
    },
    babel: {
      objectAssign: "Object.assign"
    }
  }
};

const external = ["vue"];

const globals = {
  vue: "Vue",
  "element-ui": "elementUi"
};

// Customize configs for individual targets
const buildFormats = [];
if (!argv.format || argv.format === "es") {
  const esConfig = {
    ...baseConfig,
    external,
    output: {
      file: "dist/mui.esm.js",
      format: "esm",
      exports: "named"
    },
    plugins: [
      replace({
        ...baseConfig.plugins.replace,
        "process.env.ES_BUILD": JSON.stringify("true")
      }),
      ...baseConfig.plugins.preVue,
      vue(baseConfig.plugins.vue),
      babel({
        objectAssign: "Object.assign",
        jsx: "h"
      }),
      commonjs()
    ]
  };
  buildFormats.push(esConfig);
}

if (!argv.format || argv.format === "cjs") {
  const umdConfig = {
    ...baseConfig,
    external,
    output: {
      compact: true,
      sourcemap: true,
      file: "dist/mui.umd.js",
      format: "cjs",
      name: "Mui",
      exports: "named",
      globals
    },
    plugins: [
      replace(baseConfig.plugins.replace),
      ...baseConfig.plugins.preVue,
      vue({
        ...baseConfig.plugins.vue,
        template: {
          ...baseConfig.plugins.vue.template,
          optimizeSSR: true
        }
      }),
      babel(baseConfig.plugins.babel),
      commonjs()
    ]
  };
  buildFormats.push(umdConfig);
}

if (!argv.format || argv.format === "iife") {
  const unpkgConfig = {
    ...baseConfig,
    external,
    output: {
      compact: true,
      sourcemap: true,
      file: "dist/mui.min.js",
      format: "iife",
      name: "Mui",
      exports: "named",
      globals
    },
    plugins: [
      replace(baseConfig.plugins.replace),
      ...baseConfig.plugins.preVue,
      vue(baseConfig.plugins.vue),
      babel(baseConfig.plugins.babel),
      commonjs(),
      terser({
        output: {
          ecma: 5
        }
      })
    ]
  };
  buildFormats.push(unpkgConfig);
}

// Export config
export default buildFormats;
