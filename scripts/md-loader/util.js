const { compileTemplate } = require("@vue/component-compiler-utils");
const compiler = require("vue-template-compiler");

function stripScript(content) {
  const result = content.match(/<(script)>([\s\S]+)<\/\1>/);
  return result && result[2] ? result[2].trim() : "";
}

function stripStyle(content) {
  const result = content.match(/<(style)\s*>([\s\S]+)<\/\1>/);
  return result && result[2] ? result[2].trim() : "";
}

function stripTemplate(content) {
  const result = content.match(/<(template)\s*>([\s\S]+)<\/\1>/);
  return result && result[2] ? result[2].trim() : "";
}

function pad(source) {
  return source
    .split(/\r?\n/)
    .map(line => `  ${line}`)
    .join("\n");
}

function genInlineComponentText(wrapperId, commentContent) {
  const template = stripTemplate(commentContent);
  let script = stripScript(commentContent);

  // https://github.com/vuejs/vue-loader/blob/423b8341ab368c2117931e909e2da9af74503635/lib/loaders/templateLoader.js#L46
  const finalOptions = {
    source: `<div data-${wrapperId}>${template}</div>`,
    filename: "inline-component", // TODO：这里有待调整
    compiler
  };
  const compiled = compileTemplate(finalOptions);
  // tips
  if (compiled.tips && compiled.tips.length) {
    compiled.tips.forEach(tip => {
      console.warn(tip);
    });
  }
  // errors
  if (compiled.errors && compiled.errors.length) {
    console.error(
      `\n  Error compiling template:\n${pad(compiled.source)}\n` +
        compiled.errors.map(e => `  - ${e}`).join("\n") +
        "\n"
    );
  }
  let demoComponentContent = `
    ${compiled.code}
  `;
  // todo: 这里采用了硬编码有待改进
  script = script.trim();
  if (script) {
    script = script.replace(/export\s+default/, "const democomponentExport =");
  } else {
    script = "const democomponentExport = {}";
  }
  demoComponentContent = `(function() {
    ${demoComponentContent}
    ${script}
    return {
      render,
      staticRenderFns,
      ...democomponentExport
    }
  })()`;
  return demoComponentContent;
}

// 将 css 代码块包裹
function scopedCss(cssContent, wrapper) {
  const reg = /([\s\S]*?)\{([\s\S]*?)\}/gu;
  let scopedHtml = "";
  let result;
  while ((result = reg.exec(cssContent))) {
    const [, selectors, definition] = result;
    scopedHtml += `${selectors
      .replace(/\n/g, "")
      .split(",")
      .map(selector => `.${wrapper} ${selector}`)
      .join(",")}{${definition}}`;
  }
  return scopedHtml;
}

module.exports = {
  scopedCss,
  stripScript,
  stripStyle,
  stripTemplate,
  genInlineComponentText
};
