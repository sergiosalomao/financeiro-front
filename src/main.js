import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';

import router from './config/router'
import store from './store/store'

import axios from 'axios'
Vue.prototype.$http = axios

Vue.config.productionTip = false

new Vue({
  store,
  router,
  vuetify,
  render: h => h(App)
}).$mount('#app')
