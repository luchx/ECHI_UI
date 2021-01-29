const path = require("path");

function resolve(dir) {
  return path.join(__dirname, dir);
}

module.exports = {
  devServer: {
    port: 7000
  },
  css: {
    // 不提取 css,直接打包到 js 文件中
    extract: false,
    sourceMap: false,
    loaderOptions: {
      // 给 scss 文件注入全局变量
      scss: {
        prependData: `@import "~mui/theme-chalk/src/theme.scss";`
      }
    }
  },
  // 扩展 webpack 配置，使 packages 加入编译
  configureWebpack: {
    resolve: {
      alias: {
        "@": resolve("src"),
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
  productionSourceMap: true,
  parallel: require("os").cpus().length > 1
};
