/* eslint-disable */
const { getOptions } = require("loader-utils");
const { scopedCss, genInlineComponentText, stripStyle } = require("./util");
const config = require("./config");

module.exports = function(source) {
  // @ts-ignore
  const options = getOptions(this);
  const md = config(options)
  const content = md.render(source);

  const startTag = "<!--m-component-demo:";
  const startTagLen = startTag.length;
  const endTag = ":m-component-demo-->";
  const endTagLen = endTag.length;

  let componenetsString = "";
  let componenetsStyleString = "";
  let uid = 0; // demo 的 uid
  const output = []; // 输出的内容
  let start = 0; // 字符串开始位置

  let commentStart = content.indexOf(startTag);
  let commentEnd = content.indexOf(endTag, commentStart + startTagLen);
  while (commentStart !== -1 && commentEnd !== -1) {
    output.push(content.slice(start, commentStart));

    const commentContent = content.slice(
      commentStart + startTagLen,
      commentEnd
    );
    // 组件名称
    const componentNameId = `m-block-demo_${uid}`;
    const demoComponentContent = genInlineComponentText(uid, commentContent);
    output.push(`<template slot="source"><${componentNameId} /></template>`);

    componenetsString += `${JSON.stringify(
      componentNameId
    )}: ${demoComponentContent},`;

    const css = stripStyle(commentContent);
    componenetsStyleString += scopedCss(css, `m-demo-container [data-${uid}]`);

    // 重新计算下一次的位置
    uid++;
    start = commentEnd + endTagLen;
    commentStart = content.indexOf(startTag, start);
    commentEnd = content.indexOf(endTag, commentStart + startTagLen);
  }

  // 仅允许在 demo 不存在时，才可以在 Markdown 中写 script 标签
  // todo: 优化这段逻辑
  let pageScript = "";
  if (componenetsString) {
    // 自动将样式插入 head 中，请注意这里只能解析 css
    pageScript = `<script>
      export default {
        name: 'm-demo-container',
        components: {
          ${componenetsString}
        },
        beforeCreate() {
          let style = document.querySelector("#demo-style");
          if (!style) {
            style = document.createElement("style");
            style.setAttribute("id", "demo-style");
            style.setAttribute("type", "text/css");
          }
          style.innerHTML = ${JSON.stringify(componenetsStyleString)};
          document.head.appendChild(style);
        }
      }
    </script>`;
  } else if (content.indexOf("<script>") === 0) {
    // 硬编码，有待改善
    start = content.indexOf("</script>") + "</script>".length;
    pageScript = content.slice(0, start);
  }

  output.push(content.slice(start));
  return `
    <template>
      <section class="content m-demo-container">
        ${output.join("")}
      </section>
    </template>
    ${pageScript}
  `;
};
