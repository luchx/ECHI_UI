// @ts-nocheck
const fs = require("fs");
const shelljs = require("shelljs");
const path = require("path");
const { getOptions } = require("loader-utils");
const config = require("./config");

module.exports = function(source) {
  // 获取 loader 配置
  const options = getOptions(this) || {};
  const md = config(options);
  const content = md.render(source);
  // 当前文件名
  const fileName = path
    .basename(this.resourcePath)
    .replace(path.extname(this.resourcePath), "")
    .replace("-", "");
  // 缓存目录
  const defaultDir = path.dirname(this.resourcePath);
  const cacheDir =
    (options.cacheDir || defaultDir) +
    path.sep +
    ".cacheDir" +
    path.sep +
    fileName;

  if (!fs.existsSync(cacheDir)) {
    shelljs.mkdir("-p", cacheDir);
  }

  const startTag = "<!--demo-begin:"; // 匹配开启标签
  const startTagLen = startTag.length;
  const endTag = ":demo-end-->"; // 匹配关闭标签
  const endTagLen = endTag.length;

  let components = ""; // 存储组件示例
  let importVueString = ""; // 存储引入组件声明
  let uid = 0; // demo 的 uid
  const outputSource = []; // 输出的内容
  let start = 0; // 字符串开始位置

  let commentStart = content.indexOf(startTag);
  let commentEnd = content.indexOf(endTag, commentStart + startTagLen);

  while (commentStart !== -1 && commentEnd !== -1) {
    outputSource.push(content.slice(start, commentStart));
    // 获取代码块内容
    const commentContent = content.slice(
      commentStart + startTagLen,
      commentEnd
    );

    const componentNameId = `demo_${fileName}_${uid}`;
    const writeFile = `${cacheDir}/demo_${uid}.vue`;
    // 将文件写入本地
    fs.writeFileSync(writeFile, commentContent, "utf-8");
    // 声明内容插槽传入
    outputSource.push(
      `<template slot="source"><${componentNameId} /></template>`
    );
    // 添加引入声明
    importVueString += `\nimport ${componentNameId} from '${writeFile.replace(
      /\\/g,
      "/"
    )}';`;
    // 添加组件声明
    components += `${componentNameId},`;

    // 重新计算下一次的位置
    uid++;
    start = commentEnd + endTagLen;
    commentStart = content.indexOf(startTag, start);
    commentEnd = content.indexOf(endTag, commentStart + startTagLen);
  }

  // 后续内容添加
  outputSource.push(content.slice(start));

  return `
    <template>
      <section class="demo-container">
        ${outputSource.join("")}
      </section>
    </template>
    <script>
      ${importVueString}
      export default {
        name: 'demo-container',
        components: {
          ${components}
        },
      }
    </script>
  `;
};
