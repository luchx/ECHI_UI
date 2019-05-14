// require('./theme-chalk/index.scss');

import Button from './button';
import Modal from './modal';

const components = [
  Button,
  Modal
];

function install(Vue, options = {}) {
  // Registration
  components.forEach((component) => {
    Vue.component(component.name, component);
  });
}

// Auto-install
let GlobalVue = null;
if (typeof window !== 'undefined') {
  GlobalVue = window['Vue'];
} else if (typeof global !== 'undefined') {
  GlobalVue = global['Vue'];
}
if (GlobalVue) {
  install(GlobalVue);
}

const __VERSION__ = require('../package.json').version;

export {
  install,
  Button,
  Modal,
};

export default {
  version: __VERSION__,
  install,
};