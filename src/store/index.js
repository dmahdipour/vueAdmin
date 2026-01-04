import { createStore } from 'vuex'
import VuexPersistence from 'vuex-persist';

import userModule from './modules/userModule'

export default createStore({
  state: {
  },
  getters: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    userModule
  },
  // plugins: [
  //   new VuexPersistence({
  //     storage: window.sessionStorage // Use sessionStorage instead of localStorage
  //   }).plugin
  // ]
})
