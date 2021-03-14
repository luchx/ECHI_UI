// rollup.config.js
import pkg from "./package.json";
import { terser } from "rollup-plugin-terser";
const baseConfig = require("./scripts/config.base");

const createBanner = () => {
  return `/*!
  * ${pkg.name} v${pkg.version}
  * (c) ${new Date().getFullYear()} luchx
  * @license MIT
  */`;
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

function buildConfig() {
  return prodFormatConfigs.map(formatConfig => {
    return mergeConfig(
      {
        ...baseConfig("lib"),
        input: "packages/index.ts",
        output: {
          sourcemap: false,
          banner: createBanner(),
          externalLiveBindings: false,
          globals: {
            vue: "Vue",
            "element-ui": "ELEMENT"
          }
        }
      },
      formatConfig
    );
  });
}

// Export config
export default buildConfig();
