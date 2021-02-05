module.exports = {
  presets: ["@vue/cli-plugin-babel/preset"],
  plugins: [
    [
      "component",
      {
        libraryName: "lcx-ui",
        styleLibraryName: "theme-chalk"
      }
    ]
  ]
};
