import "@babel/polyfill";
import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import mui from "@packages";

Vue.config.productionTip = false;

console.log(mui);

Vue.use(mui);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
