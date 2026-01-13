import { createStore } from 'vuex'
//import VuexPersistence from 'vuex-persist';

import userModule from './modules/userModule'
import categoryModule from './modules/categoryModule'
import postModule from './modules/postModule'

export default createStore({
  state: {
    isLoading: false,
  },
  getters: {
  },
  mutations: {
    setLoading(state, loading){
      state.isLoading = loading
    }
  },
  actions: {
  },
  modules: {
    userModule, categoryModule, postModule
  },
  // plugins: [
  //   new VuexPersistence({
  //     storage: window.sessionStorage // Use sessionStorage instead of localStorage
  //   }).plugin
  // ]
})
