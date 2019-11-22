import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';

import '@/assets/css/normalize.css'; // A modern alternative to CSS resets
import '@/styles/reset.scss'; // A modern alternative to CSS resets
import '@/icons'; // icon
import '@/permission';

import Vant from 'vant';
import 'vant/lib/index.css';

Vue.use(Vant);
Vue.config.productionTip = false;

const WIDTH = 750; // 设计稿尺寸
const setView = () => {
  document.documentElement.style.fontSize = (100 * window.innerWidth / WIDTH) + 'px';
};

window.onorientationchange = setView;
setView();

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
