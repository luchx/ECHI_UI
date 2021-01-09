// rollup.config.js
import path from "path";
import vue from "rollup-plugin-vue";
import alias from "@rollup/plugin-alias";
import typescript from "rollup-plugin-typescript2";
import replace from "@rollup/plugin-replace";
import babel from "rollup-plugin-buble";
import scss from "rollup-plugin-scss";
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

const globals = {
  vue: "Vue",
  "element-ui": "elementUi"
};
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
      name: "mui",
      exports: "named",
      compact: true,
      sourcemap: true,
      globals
    };
  }

  return output;
};

const nodePlugins = function(format) {
  if (format === "cjs") {
    return [];
  }
  return [
    require("@rollup/plugin-node-resolve").nodeResolve({
      modulesOnly: true,
      browser: true,
      preferBuiltins: true,
      extensions: [".js", ".jsx", ".ts", ".tsx", ".vue"]
    }),
    require("@rollup/plugin-commonjs")({
      sourceMap: false
    }),
    require("rollup-plugin-node-builtins")(),
    require("rollup-plugin-node-globals")()
  ];
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

const baseConfig = {
  input: "packages/index.ts",
  external: ["vue"],
  plugins: {
    preVue: [
      tsPlugin,
      vue({
        css: true,
        compileTemplate: true
      }),
      alias({
        resolve: [".js", ".jsx", ".ts", ".tsx", ".vue"],
        entries: {
          vue$: "vue/dist/vue.common.js",
          "@": resolve("src"),
          "@packages": resolve("packages")
        }
      }),
      scss({
        prefix: `@import "packages/theme-chalk/src/theme.scss";`,
        output: "dist/mui.min.css",
        processor: css =>
          postcss([autoprefixer(), cssnano()])
            .process(css, { from: undefined })
            .then(result => result.css)
      })
    ],
    replace: {
      "process.env.NODE_ENV": JSON.stringify("production"),
      "process.env.ES_BUILD": JSON.stringify("false")
    },
    babel: {
      objectAssign: "Object.assign"
    }
  }
};

const terserConfig = function(format) {
  const config = {
    cjs: [
      terser({
        module: true,
        compress: {
          ecma: 2015,
          pure_getters: true
        },
        safari10: true,
        toplevel: false
      })
    ],
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
      ...baseConfig,
      output: outputConfigs(format),
      plugins: [
        ...baseConfig.plugins.preVue,
        replace({
          ...baseConfig.plugins.replace,
          ...(format === "es"
            ? { "process.env.ES_BUILD": JSON.stringify("true") }
            : {})
        }),
        babel({
          ...baseConfig.plugins.babel,
          ...(format === "es" ? { jsx: "h" } : {})
        }),
        ...nodePlugins(format),
        ...terserConfig(format)
      ]
    }
  ];
}

// Export config
export default buildConfig();
