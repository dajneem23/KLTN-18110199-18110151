import { HEADER_ITEM } from '../../constants';
import { mapState } from 'vuex';
import { store } from '../../store/vuex';

export default {
  name: 'Header',
  computed: {
    ...mapState(['userInfo', 'isAuthenticated', 'isPage']),
  },
  mounted() {
    // store.commit('setIsPage', 'home');
    console.log(this.isPage);
  },
  methods: {
    logOut() {
      console.log('Log Out');
    },
    showtoolTip() {
      const toolTip = document.getElementById('toolTip-user');
      const caretDown = document.getElementById('caret-down');
      const caretUp = document.getElementById('caret-up');
      if (toolTip.classList.length === 2) {
        toolTip.classList.add('showToolTip');
        toolTip.style.top = '70px';
        caretDown.style.display = 'none';
        caretUp.classList.remove('caret-hidden');
      } else {
        toolTip.style.top = '-100px';
        caretDown.style.display = 'inline';
        caretUp.classList.add('caret-hidden');
        toolTip.classList.remove('showToolTip');
      }
    },
    showBoxNotification() {
      
    },
    hiddenBoxNotification() {
      
    },
    onHomeBtnClick: function () {
      // this.$refs.home.classList.add('active');
      // this.$refs.news.classList.remove('active');
      // this.$refs.manga.classList.remove('active');
      // this.$refs.movie.classList.remove('active');
      // this.$refs.chat.classList.remove('active');
      // mark = 'home';
      // console.log(mark);
      store.commit('setIsPage', 'home');
    },
    onNewsBtnClick: function () {
      // this.$refs.news.classList.add('active');
      // this.$refs.home.classList.remove('active');
      // this.$refs.manga.classList.remove('active');
      // this.$refs.movie.classList.remove('active');
      // this.$refs.chat.classList.remove('active');
      // mark = 'home';
      // console.log(mark);
      store.commit('setIsPage', 'articles');
    },
    onMangaBtnClick: function () {
      // this.$refs.manga.classList.add('active');
      // this.$refs.news.classList.remove('active');
      // this.$refs.home.classList.remove('active');
      // this.$refs.movie.classList.remove('active');
      // this.$refs.chat.classList.remove('active');
      // mark = 'manga';
      // console.log(mark);
      store.commit('setIsPage', 'manga');
    },
    onMovieBtnClick: function () {
      // this.$refs.movie.classList.add('active');
      // this.$refs.news.classList.remove('active');
      // this.$refs.manga.classList.remove('active');
      // this.$refs.home.classList.remove('active');
      // this.$refs.chat.classList.remove('active');
      // mark = 'movie';
      // console.log(mark);
      store.commit('setIsPage', 'movie');
    },
    onChatBtnClick: function () {
      // this.$refs.chat.classList.add('active');
      // this.$refs.news.classList.remove('active');
      // this.$refs.movie.classList.remove('active');
      // this.$refs.manga.classList.remove('active');
      // this.$refs.home.classList.remove('active');
      // mark = 'chat';
      // console.log(mark);
      store.commit('setIsPage', 'chat');
    },
  },
  data() {
    return {
      lang: 'vi',
      HEADER_ITEM,
      isShowNotifi: false,
    };
  },
};
