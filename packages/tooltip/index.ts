import { VueConstructor } from "vue";
import Tooltip from "./src/index.vue";

export default {
  ...Tooltip,
  install(Vue: VueConstructor) {
    Vue.component(Tooltip.name, Tooltip);
  }
};
