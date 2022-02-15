

import Vuex from 'vuex';
import Vue from 'vue';
import createPersistedState from "vuex-persistedstate";
import auth from './modules/auth';
import posts from './modules/posts';
import profiles from './modules/profiles';
import admin from './modules/admin';

// Load Vuex
Vue.use(Vuex);
// Create store
export default new Vuex.Store({
  modules: {
    auth,posts,profiles,admin
  },
  plugins: [createPersistedState()]
});
