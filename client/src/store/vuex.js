import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);
export const store = new Vuex.Store({
  state: {
    userInfo: {},
    isAuthenticated: false,
  },
  mutations: {
    setUserInfo: (state, userInfo) => (state.userInfo = userInfo),
    setIsAuthenticated: (state, isAuthenticated) => (state.isAuthenticated = isAuthenticated),
  },
});
