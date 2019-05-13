import Button from './components/button';
import Modal from './components/modal';

const components = [
  Button,
  Modal
];

export function install(Vue, options = {}) {
  // Registration
  components.forEach((component: any) => {
    Vue.use(component);
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
  Modal,
};