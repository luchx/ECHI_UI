/* eslint-disable */
const Config = require("markdown-it-chain");
const slugify = require("transliteration").slugify;
const anchorPlugin = require("markdown-it-anchor");
const tocPlugin = require("markdown-it-table-of-contents");
const highlight = require("./plugin/highlight");
const highlightLinesPlugin = require("./plugin/highlightLines");
const preWrapperPlugin = require("./plugin/preWrapper");
const lineNumbersPlugin = require("./plugin/lineNumbers");
const containers = require("./plugin/containers");
const codeBlock = require("./plugin/codeBlock");

module.exports = function(options) {
  const extraOptions = Object.assign(
    {
      lineNumbers: true,
      anchor: {},
      toc: {}
    },
    options || {}
  );
  const config = new Config();

  config.options
    .html(true)
    .highlight(highlight)
    .end()

    .plugin("highlight-lines")
    .use(highlightLinesPlugin)
    .end()

    .plugin("pre-wrapper")
    .use(preWrapperPlugin)
    .end()

    .plugin("anchor")
    .use(anchorPlugin, [
      Object.assign(
        {
          level: 2,
          slugify: slugify,
          permalink: true,
          permalinkBefore: true,
          permalinkSymbol: "$"
        },
        extraOptions.anchor
      )
    ])
    .end()

    .plugin("toc")
    .use(tocPlugin, [
      {
        slugify,
        includeLevel: [2, 3]
      }
    ])
    .end()

    .plugin("containers")
    .use(containers)
    .end()

    .plugin("code-block")
    .use(codeBlock)
    .end();

  if (extraOptions.lineNumbers) {
    config
      .plugin("line-numbers")
      .use(lineNumbersPlugin)
      .end();
  }

  const md = config.toMd();

  return md;
};
