import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./mui";
import "normalize.css";
import "./assets/md-theme/vue.css";
import "./assets/docs-theme/index.css";
import "@styles/common.scss";

import components from "@/components";
// 注册全局的组件
Object.keys(components).forEach(key => {
  Vue.component(key, components[key]);
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
