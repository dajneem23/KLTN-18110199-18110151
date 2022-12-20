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

// import CKEditor from 'ckeditor4-vue';
// import CKEditor from '@ckeditor/ckeditor5-vue2';
console.log({
  socketClient,
});
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
