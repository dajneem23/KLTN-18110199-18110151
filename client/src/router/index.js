import Vue from 'vue';
import VueRouter from 'vue-router';
import HomeView from '../views/HomeView.vue';
import Error from '../views//ErrorView/ErrorView.vue';
import ReadingManga from '../views/ReadingMangaView/ReadingMangaView.vue';
import WatchingFilm from '../views/WatchingFilmView/WatchingFilm.vue';
import Chatting from '../views/ChatView/ChatView.vue';
import Login from '../views/LoginView/LoginView.vue';
import Register from '../views/RegisterView/RegisterView.vue'

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
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
    component: Error,
  },
  {
    path: '/manga/',
    name: 'manga',
    component: ReadingManga,
  },
  {
    path: '/movie/',
    name: 'movie',
    component: WatchingFilm,
  },
  {
    path: '/chat/',
    name: 'chat',
    component: Chatting,
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
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
