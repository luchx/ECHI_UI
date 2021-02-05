import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import ElementUI from "element-ui";

import { Button } from "lcx-ui";

Vue.config.productionTip = false;

console.log(Button);

Vue.use(ElementUI);
Vue.use(Button);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
