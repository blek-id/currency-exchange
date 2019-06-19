import Vue from 'vue';
import Vuex from 'vuex';
import currencies from './modules/currencies';

// Load Vuex
Vue.use(Vuex);

// Create store
export default new Vuex.Store({
  modules: {
    currencies,
  }
});