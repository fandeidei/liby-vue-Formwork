import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';
import Echarts from 'echarts'
import './assets/iconfont/iconfont.css'
import './libs/rem'
import './assets/fonts/font.css'
import axios from 'axios'

Vue.use(Antd);
Vue.config.productionTip = false
Vue.prototype.$echarts = Echarts
axios.defaults.withCredentials = true

/* 引入公共函数 */
import common from './assets/js/common'
Vue.use(common);


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
