import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';

import VueUi from '../src/main';
Vue.use(VueUi);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
