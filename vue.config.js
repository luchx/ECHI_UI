const path = require("path");

function resolve(dir) {
  return path.join(__dirname, dir);
}

module.exports = {
  publicPath: "/",
  // 放置生成的静态资源 (js、css、img、fonts) 的 (相对于 outputDir 的) 目录。
  assetsDir: "assets",
  devServer: {
    port: 7000,
    disableHostCheck: true
  },
  css: {
    // 不提取 css,直接打包到 js 文件中
    // extract: false,
    // sourceMap: false,
    loaderOptions: {
      // 给 scss 文件注入全局变量
      scss: {
        prependData: `@import "~mui/theme-chalk/src/common/theme.scss";`
      }
    }
  },
  chainWebpack: config => {
    config.plugin("html").tap(options => {
      options[0].title = "前端 UI 库";
      return options;
    });
    // 使用自定义 loader
    config.module
      .rule("md-loader")
      .test(/\.md$/)
      .use("vue-loader")
      .loader("vue-loader")
      .options({
        compilerOptions: {
          preserveWhitespace: false
        }
      })
      .end()
      .use("md-loader")
      .loader(resolve("./scripts/md-loader/index.js"))
      .options({
        // lineNumbers: false,
        // toc: {},
        // anchor: {
        //   permalinkSymbol: "#"
        // }
      })
      .end();
  },
  // 使用 runtime 时 vue 文件
  runtimeCompiler: true,
  // 扩展 webpack 配置，使 packages 加入编译
  configureWebpack: {
    resolve: {
      alias: {
        "@": resolve("src"),
        "@img": resolve("src/assets/images"),
        "@styles": resolve("src/assets/styles"),
        // 开发阶段使用别名引用
        mui: resolve("packages")
      },
      extensions: [".tsx", ".ts", ".js", ".vue"]
    }
    // output: {
    //   // 直接暴露对象，减少 default 嵌套
    //   libraryExport: "default"
    // }
  },
  productionSourceMap: false,
  parallel: require("os").cpus().length > 1
};
