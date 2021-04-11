module.exports = md => {
  const fence = md.renderer.rules.fence;
  md.renderer.rules.fence = (...args) => {
    const [tokens, idx, options, env, self] = args;
    const token = tokens[idx];
    // 判断该 fence 是否在 :::demo 内
    const prevToken = tokens[idx - 1];
    const isInDemoContainer =
      prevToken &&
      prevToken.nesting === 1 &&
      prevToken.info.trim().match(/^demo\s*(.*)$/);

    if (["vue", "html"].indexOf(token.info) > -1 && isInDemoContainer) {
      return `<template #highlight>
      ${fence(tokens, idx, options, env, self)}
      </template>`;
    }
    return fence(tokens, idx, options, env, self);
  };
};
