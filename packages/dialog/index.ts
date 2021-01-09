import { VueConstructor } from "vue";
import Dialog from "./src/index.vue";

export default {
  ...Dialog,
  install(Vue: VueConstructor) {
    Vue.component(Dialog.name, Dialog);
  }
};
