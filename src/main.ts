// Require all the components that start with 'BaseXXX.vue'
const components = require.context('../pakeages', true, /[a-z0-9]+\.vue$/);

export function install(Vue, options = {}) {
  // To extract the component name
  const nameReg = /([a-z0-9]+)\./i;
  // Registration
  components.keys().forEach((key: any) => {
    const name = 'c' + key.match(nameReg)[1];
    Vue.component(name, components(key).default);
  });
}

const plugin = {
  version: require('../package.json').version,
  install,
};

export default plugin;

// Auto-install
let GlobalVue: any = null;
if (typeof window !== 'undefined') {
  GlobalVue = window['Vue'];
} else if (typeof global !== 'undefined') {
  GlobalVue = global.Vue;
}
if (GlobalVue) {
  GlobalVue.use(plugin);
}
