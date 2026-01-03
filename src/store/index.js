import { createStore } from 'vuex'

import test from './test'
import VuexPersistence from 'vuex-persist';

export default createStore({
  state: {
  },
  getters: {
  },
  mutations: {
  },
  actions: {
    inc({ commit }) {
      commit('test/incr', 2);
    },
  },
  modules: {
    test
  },
  plugins: [
    new VuexPersistence({
      storage: window.sessionStorage // Use sessionStorage instead of localStorage
    }).plugin
  ]
})
