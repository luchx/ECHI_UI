export function stripScript(content) {
  const result = content.match(/<(script)>([\s\S]+)<\/\1>/);
  return result && result[2] ? result[2].trim() : "";
}

export function stripStyle(content) {
  const result = content.match(/<(style)\s*>([\s\S]+)<\/\1>/);
  return result && result[2] ? result[2].trim() : "";
}

export function stripTemplate(content) {
  const result = content.match(/<(template)\s*>([\s\S]+)<\/\1>/);
  return result && result[2] ? result[2].trim() : "";
}

// 将 css 代码块包裹
export function scopedCss(cssContent, wrapper) {
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
