module.exports = {
  base: "/",
  port: 7001,
  title: "前端 UI 库",
  description: "移动验房 UI 组件库文档",
  themeConfig: {
    sidebarDepth: 0,
    lastUpdated: "Last Updated",
    sidebar: [
      {
        title: "安装",
        path: "/guide/introduction",
        collapsable: false,
      },
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
};
