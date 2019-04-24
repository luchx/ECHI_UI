import Vue from "vue";
import App from "./App.vue";
import lcxModal from "./lib/index";

Vue.use(lcxModal);

Vue.config.productionTip = false;

new Vue({
  render: h => h(App)
}).$mount("#app");
