const path = require("path");

const isProduction = process.env.NODE_ENV === "production";

function resolve(dir) {
  return path.join(__dirname, dir);
}

module.exports = {
  lintOnSave: true,
  configureWebpack: {
    entry: {
      app: path.resolve(__dirname, "./src/main.ts")
    }
  },
  chainWebpack: config => {
    config.resolve.alias
      .set("@", resolve("src"))
      .set("@img", resolve("src/assets/images"))
      .set("@css", resolve("src/assets/css"))
      .set("@scss", resolve("src/assets/scss"))

    config.module
      .rule('vue')
      .use('vue-loader')
      .loader('vue-loader')
      .tap(options => {
        options.compilerOptions.preserveWhitespace = true
        return options
      })
  },
  productionSourceMap: false,
  css: {
    extract: true,
    sourceMap: false,
    loaderOptions: {
      sass: {
        data: `
          @import "@/assets/scss/theme.scss";
        `
      }
    },
    modules: false
  },
  parallel: require("os").cpus().length > 1,
  devServer: {
    port: 1001,
    open: true,
    compress: false,
    overlay: {
      warnings: true,
      errors: true
    }
  }
};
