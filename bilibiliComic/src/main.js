import Vue from 'vue'
import App from './App.vue'
import router from './router'

import Vant from 'vant';
import 'vant/lib/index.css';
import '@/assets/fonts/font.css';
import 'lib-flexible/flexible';

// Import Swiper Vue.js components
import {
  Swiper,
  SwiperSlide
} from 'swiper/vue';

// Import Swiper styles
import 'swiper/css';

import {
  Tabbar,
  TabbarItem
} from 'vant';
Vue.use(Vant);
Vue.use(Tabbar).use(TabbarItem).use(Swiper).use(SwiperSlide);
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
  beforeCreate() {
    Vue.prototype.$bus = this
  },
}).$mount('#app')