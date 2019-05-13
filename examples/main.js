require('@css/reset.css');
require('@css/animate.css');
require('@scss/global.scss');
require('@/utils');

import Vue from 'vue';
import App from './App.vue';
import router from './router';

import LcxUI from 'lcx-ui';
Vue.use(LcxUI);

import {Modal} from 'lcx-ui';
console.log(Modal)
Vue.use(Modal);

Vue.config.productionTip = false;

new Vue({
  router,
  render: (h) => h(App),
}).$mount('#app');
