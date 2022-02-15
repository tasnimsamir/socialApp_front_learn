import Vue from 'vue'
import App from './App'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import router from './router'
import store from './store'
import '@mdi/font/css/materialdesignicons.css'
import axios from "axios";

// axios.defaults.withCredentials = true;
axios.defaults.baseURL = "http://127.0.0.1:8000/";
// import axios from 'axios';

// const axiosInstance = axios.create({
//   baseURL: "http://127.0.0.1:8000/",
//   headers: { Authorization: `token ${this.$store.state.access_token}` },
// });

// export default axiosInstance;

Vue.use(Vuetify)

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

/* eslint-disable no-new */
new Vue({
  el: '#app',
  vuetify : new Vuetify(),
  components: { App },
  router,
  store,
  template: '<App/>'
})


