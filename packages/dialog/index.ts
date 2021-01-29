import { VueConstructor } from "vue";
import Dialog from "./src/index.vue";
import "./src/index.scss";

export default {
  ...Dialog,
  install(Vue: VueConstructor) {
    Vue.component(Dialog.name, Dialog);
  }
};
