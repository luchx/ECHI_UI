import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import ElementUI from "element-ui";

import { Dialog } from "lcx-ui";

Vue.config.productionTip = false;

console.log(Dialog);

Vue.use(ElementUI);
Vue.use(Dialog);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
