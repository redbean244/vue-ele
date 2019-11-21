import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';

import '@/assets/css/normalize.css'; // A modern alternative to CSS resets
import '@/icons'; // icon
import '@/permission'; // icon
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
