const path = require("path");

function resolve(dir) {
  return path.join(__dirname, dir);
}

module.exports = {
  publicPath: "/",
  outputDir: "dist",
  assetsDir: "static",
  lintOnSave: false,
  pages: {
    index: {
      entry: "examples/main.js",
      template: "public/index.html",
      filename: "index.html",
      title: "ui-components Title"
    }
  },
  chainWebpack: config => {
    config.resolve.alias
      .set("@", resolve("examples"))
      .set("@img", resolve("examples/assets/images"))
      .set("@css", resolve("examples/assets/css"))
      .set("@scss", resolve("examples/assets/scss"));

    config.module
      .rule("vue")
      .use("vue-loader")
      .loader("vue-loader")
      .tap(options => {
        options.compilerOptions.preserveWhitespace = true;
        return options;
      });
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
