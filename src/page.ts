import Button from './components/button';

const components = [
  Button
];

export function install(Vue, options = {}) {
  // Registration
  components.forEach((Com: any) => {
    Vue.use(Com);
  });
}

// Auto-install
let GlobalVue: any = null;
if (typeof window !== 'undefined') {
  GlobalVue = window['Vue'];
} else if (typeof global !== 'undefined') {
  GlobalVue = global.Vue;
}
if (GlobalVue) {
  install(GlobalVue);
}

export default {
  version: require('../package.json').version,
  install,
  Button,
};