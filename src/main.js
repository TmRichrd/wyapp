// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Vant from 'vant';
import Axios from 'axios'
import store from './store/index'
import 'vant/lib/index.css';
// import 'element-ui/lib/theme-chalk/index.css'
import { Lazyload } from 'vant';
import ElementUI from 'element-ui'
import Vuex from 'vuex'
// import Swiper from 'swiper';
// import 'swiper/css/swiper.min.css';
// Vue.use(Swiper)
Vue.use(Vuex)
Vue.use(ElementUI);
Vue.use(Lazyload);
Vue.use(Vant);

Vue.config.productionTip = false
Axios.defaults.baseURL = 'https://autumnfish.cn/'
Vue.prototype.$http = Axios;
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>',
  render: h => h(App)
})
