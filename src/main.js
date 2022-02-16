import Vue from 'vue'
import App from './App'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import router from './router'
import store from './store'
import '@mdi/font/css/materialdesignicons.css'
import axios from "axios";
import VueApexCharts from 'vue-apexcharts'





// axios.defaults.withCredentials = true;
axios.defaults.baseURL = "http://127.0.0.1:8000/";

Vue.use(Vuetify)
Vue.use(VueApexCharts);

axios.interceptors.response.use(undefined, function (error) {
  if (error) {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
  
        originalRequest._retry = true;
        store.dispatch('LogOut')
        return router.push('/login')
    }
  }
})

Vue.config.productionTip = false
Vue.component("apexchart", VueApexCharts);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  vuetify : new Vuetify(),
  components: { App },
  router,
  store,
  template: '<App/>'
})


