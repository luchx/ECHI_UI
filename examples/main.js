require('@css/reset.css');
require('@css/animate.css');
require('@scss/global.scss');
require('@/utils');
// require('../lib/theme-chalk/index.scss');

import Vue from 'vue';
import App from './App.vue';
import router from './router';

// import lcx-ui from 'lcx-ui';
// Vue.use(lcx-ui);

Vue.config.productionTip = false;

new Vue({
  router,
  render: (h) => h(App),
}).$mount('#app');
