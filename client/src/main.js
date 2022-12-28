import Vue from 'vue';
import App from './App.vue';
import router from './router';
import './assets/index.scss';

import LazyTube from 'vue-lazytube';
import VuePlyr from 'vue-plyr';
import 'vue-plyr/dist/vue-plyr.css';
import VueCarousel from 'vue-carousel';
import { store } from './store/vuex';
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue';
import socketClient from './socket';
import InfiniteLoading from 'vue-infinite-loading';
// import GAuth from 'vue-google-oauth2';
// const gauthOption = {
//   clientId: '239259098538-f5psal7n3msj632vps7fb5c47ecloqi0.apps.googleusercontent.com',
//   scope: 'profile email',
//   prompt: 'select_account',
// };
// Vue.use(GAuth, gauthOption);
// import CKEditor from 'ckeditor4-vue';
// import CKEditor from '@ckeditor/ckeditor5-vue2';
// Vue.use(CKEditor);
Vue.use(VueCarousel);
Vue.use(VuePlyr);
Vue.use(LazyTube);
Vue.use(BootstrapVue);

Vue.config.productionTip = false;

Vue.use(InfiniteLoading, {
  slots: {
    // keep default styles
    noResults: 'No results message',

    // remove default styles
    noMore: '',

    // hide slot
    error: {
      render: (h) => h('div'),
    },
  },
});
new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
