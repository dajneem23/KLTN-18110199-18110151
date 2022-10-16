import Vue from 'vue';
import VueRouter from 'vue-router';
import HomeView from '../views/HomeView/HomeView.vue';
import NewsView from '../views/NewsView/newsView.vue';
import Error from '../views//ErrorView/ErrorView.vue';
import ReadingManga from '../views/ReadingMangaView/ReadingMangaView.vue';
import WatchingFilm from '../views/WatchingFilmView/WatchingFilm.vue';
import Chatting from '../views/ChatView/ChatView.vue';
import Login from '../views/LoginView/LoginView.vue';
import Register from '../views/RegisterView/RegisterView.vue';
import Header from '../components/Header/index.vue';
import Footer from '../components/Footer/index.vue';
import Details from '../views/WatchingFilmView/FilmDetailView/filmdetail.vue';
import DetailManga from '../views/ReadingMangaView/DetailMangaView/detailMangaView.vue';
import { UserService } from '@/services';
import { store } from '../store/vuex';

import DetailNews from '../views/NewsView/NewsDetailView/newDetailView.vue';
Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'home',
    components: {
      header: Header,
      default: HomeView,
      footer: Footer,
    },
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue'),
  },
  {
    path: '/error',
    name: 'error',
    components: {
      // header: Header,
      default: Error,
      // footer: Footer
    },
  },
  {
    path: '/manga/',
    name: 'manga',
    components: {
      header: Header,
      default: ReadingManga,
      footer: Footer,
    },
  },
  {
    path: '/movie/',
    name: 'movie',
    components: {
      header: Header,
      default: WatchingFilm,
      footer: Footer,
    },
  },
  {
    path: '/chat/',
    name: 'chat',
    components: {
      header: Header,
      default: Chatting,
      footer: Footer,
    },
  },
  {
    path: '/news/',
    name: 'news',
    components: {
      header: Header,
      default: NewsView,
      footer: Footer,
    },
  },
  {
    path: '/login/',
    name: 'login',
    component: Login,
  },
  {
    path: '/register/',
    name: 'register',
    component: Register,
  },
  {
    path: '/movie/details/:filmId/',
    name: 'details',
    components: {
      header: Header,
      default: Details,
      footer: Footer,
    },
    props: true,
  },
  {
    path: '/manga/details/:mangaId/',
    name: 'detailmanga',
    components: {
      header: Header,
      default: DetailManga,
      footer: Footer,
    },
    props: true,
  },
  {
    path: '/news/details/:newsId/',
    name: 'detailnews',
    components: {
      header: Header,
      default: DetailNews,
      footer: Footer,
    },
    props: true,
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach(async (to, from, next) => {
  let [user, error] = await UserService.me();
  console.log([user, error]);
  if (user) {
    store.commit('setUserInfo', user);
    store.commit('setIsAuthenticated', true);
  } else {
    store.commit('setUserInfo', null);
    store.commit('setIsAuthenticated', false);
  }
  next();
});
export default router;
