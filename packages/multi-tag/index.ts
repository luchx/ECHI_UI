import { VueConstructor } from "vue";
import MultiTag from "./src/index.vue";

export default {
  ...MultiTag,
  install(Vue: VueConstructor) {
    Vue.component(MultiTag.name, MultiTag);
  }
};
