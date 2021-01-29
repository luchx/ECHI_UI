import { VueConstructor } from "vue";
import Empty from "./src/index.vue";
import "./src/index.scss";
import PRESENTED_IMAGE_DEFAULT from "./src/empty.png";

export default {
  ...Empty,
  PRESENTED_IMAGE_DEFAULT,
  install(Vue: VueConstructor) {
    Vue.component(Empty.name, Empty);
  }
};
