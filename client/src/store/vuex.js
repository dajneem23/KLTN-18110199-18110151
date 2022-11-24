import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);
export const store = new Vuex.Store({
  state: {
    userInfo: {},
    isAuthenticated: false,
    urlStrapiServe: 'https://zinc-union-365709-strapi-63see6q63q-uc.a.run.app/',
  },
  mutations: {
    setUserInfo: (state, userInfo) => (state.userInfo = userInfo),
    setIsAuthenticated: (state, isAuthenticated) => (state.isAuthenticated = isAuthenticated),
    setUrlStrapiServe: (state, urlStrapiServe) => (state.urlStrapiServe = urlStrapiServe),
  },
  actions: {
    hanldeUrlImage(string) {
      return this.state.urlStrapiServe + string.toString();
    },
  },
});
