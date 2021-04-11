/**
 * The file enables `@/components/*.vue` to import all components modules
 * in a one-shot manner. There should not be any reason to edit this file.
 */

const files = require.context(".", true, /\.(vue|jsx)$/);
const modules = {};

files.keys().forEach(key => {
  if (key === "./index.ts") {
    return;
  }
  const component = files(key).default;
  modules[`${component.name}`] = component;
});

export default modules;
