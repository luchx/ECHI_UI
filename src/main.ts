import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
// 由于 lcx-ui 项目基于 element-ui 需要全量引入
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";

import { Button, Dialog } from "lcx-ui";
import { type, copyToClipboard } from "lcx-ui/lib/shared";

console.log({
  type,
  copyToClipboard
});

Vue.config.productionTip = false;

Vue.use(ElementUI);
Vue.use(Button);
Vue.use(Dialog);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
