const devPresets = [
  "@vue/cli-plugin-babel/preset",
  ["@babel/preset-env", { modules: false }]
];
const buildPresets = [
  ["@babel/preset-env", { modules: false }],
  "@babel/preset-typescript"
];

module.exports = {
  presets: process.env.VUE_APP_BUILD === "true" ? devPresets : buildPresets,
  plugins: [
    [
      "component",
      {
        libraryName: "element-ui",
        styleLibraryName: "theme-chalk"
      }
    ]
  ]
};
