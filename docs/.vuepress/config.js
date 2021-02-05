const { config } = require("vuepress-theme-hope");

module.exports = config({
  base: "/",
  port: 7001,
  title: "前端 UI 库",
  description: "基于 element-ui 二次封装的 UI 组件库~ ✨",
  head: [
    // 引入 vue 代码支持
    ["script", { src: "https://cdn.jsdelivr.net/npm/vue/dist/vue.min.js" }],
  ],
  themeConfig: {
    sidebarDepth: 0,
    smoothScroll: true,
    lastUpdated: "Last Updated",
    mdEnhance: {
      enableAll: true
    },
    sidebar: [
      {
        title: "开发指南",
        collapsable: false,
        children: [
          {
            title: "安装",
            path: "/guide/introduction",
            collapsable: false,
          },
          {
            title: "快速上手",
            path: "/guide/quickstart",
            collapsable: false,
          },
          {
            title: "自定义主题",
            path: "/guide/custom-theme",
            collapsable: false,
          },
        ]
      }
    ],
    nav: [
      {
        text: "首页",
        link: "/",
      },
    ],
  },
  configureWebpack: {
    resolve: {
      alias: {
        '@img': '/images'
      }
    }
  }
});
