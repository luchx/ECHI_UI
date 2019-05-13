require('@css/reset.css');
require('@css/animate.css');
require('@scss/global.scss');
require('@/utils');

import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';

import LcxUI from './page';
Vue.use(LcxUI);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
