const { config } = require("vuepress-theme-hope");

module.exports = config({
  base: "/",
  port: 7001,
  title: "前端 UI 库",
  description: "基于 element-ui 二次封装的 UI 组件库~ ✨",
  head: [
    ["link", { type: "text/css", src: "//unpkg.com/element-ui@2.15.0/lib/theme-chalk/index.css" }],

    // 引入 vue 代码支持
    ["script", { type: "text/javascript", src: "/plugin/vue.min.js" }],
    ["script", { type: "text/javascript", src: "//unpkg.com/element-ui@2.15.0/lib/index.js" }],
  ],
  themeConfig: {
    hostname: "https://github.com/luchx/ECHI_UI.git",
    sidebarDepth: 1,
    smoothScroll: true,
    lastUpdated: "Last Updated",
    mdEnhance: {
      demo: {
        jsfiddle: false,
        codepen: true,
        vue: "//unpkg.com/vue/dist/vue.js",
        jsLib: ["//unpkg.com/element-ui@2.15.0/lib/index.js", `//cdn.jsdelivr.net/npm/lcx-ui@1.0.14/lib/index.js`],
        cssLib: ["//unpkg.com/element-ui@2.15.0/lib/theme-chalk/index.css", "//cdn.jsdelivr.net/npm/lcx-ui@1.0.14/lib/theme-chalk/index.css",]
      }
    },
    themeColor: {
      red: "#e74c3c",
      green: "#3eaf7c",
      orange: "#f39c12",
      purple: "#8e44ad",
    },
    sidebar: [
      {
        title: "开发指南",
        collapsable: false,
        children: [
          {
            title: "安装",
            path: "/guide/introduction",
            collapsable: false
          },
          {
            title: "快速上手",
            path: "/guide/quickstart",
            collapsable: false
          },
          {
            title: "自定义主题",
            path: "/guide/custom-theme",
            collapsable: false
          }
        ]
      },
      {
        title: "通用",
        collapsable: false,
        children: [
          {
            title: "Button 按钮",
            path: "/ui/button",
            collapsable: false
          }
        ]
      },
      {
        title: "数据展示",
        collapsable: false,
        children: [
          {
            title: "Empty 空状态",
            path: "/ui/empty",
            collapsable: false
          },
          {
            title: "Tooltip 文字提示",
            path: "/ui/tooltip",
            collapsable: false
          },
        ]
      },
      {
        title: "反馈",
        collapsable: false,
        children: [
          {
            title: "Dialog 对话框",
            path: "/ui/dialog",
            collapsable: false
          },
        ]
      }
    ],
    nav: [
      {
        text: "首页",
        link: "/"
      }
    ]
  },
  configureWebpack: {
    resolve: {
      alias: {
        "@img": "/images",
      }
    }
  }
});
