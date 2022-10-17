import Vue from 'vue';
import App from './App.vue';
import router from './router';
import './assets/index.scss';
import JwPagination from 'jw-vue-pagination';
import LazyTube from 'vue-lazytube';
import VuePlyr from 'vue-plyr';
import 'vue-plyr/dist/vue-plyr.css';
import VueCarousel from 'vue-carousel';
import { store } from './store/vuex';
// import CKEditor from 'ckeditor4-vue';
import CKEditor from '@ckeditor/ckeditor5-vue2';

Vue.use(CKEditor);
Vue.use(VueCarousel);
Vue.use(VuePlyr);
Vue.use(LazyTube);

Vue.component('jw-pagination', JwPagination);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
