import { VueConstructor } from "vue";
import Button from "./src/index.vue";

export default {
  ...Button,
  install(Vue: VueConstructor) {
    Vue.component(Button.name, Button);
  }
};
