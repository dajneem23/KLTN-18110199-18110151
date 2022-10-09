import { HEADER_ITEM } from '../../constants';
var mark = 'home';

export default {
  name: 'Header',
  methods: {
    onHomeBtnClick: function () {
      this.$refs.home.classList.add('active');
      this.$refs.news.classList.remove('active');
      this.$refs.manga.classList.remove('active');
      this.$refs.movie.classList.remove('active');
      this.$refs.chat.classList.remove('active');
      mark = 'home';
      console.log(mark);
    },
    onNewsBtnClick: function () {
      this.$refs.news.classList.add('active');
      this.$refs.home.classList.remove('active');
      this.$refs.manga.classList.remove('active');
      this.$refs.movie.classList.remove('active');
      this.$refs.chat.classList.remove('active');
      mark = 'home';
      console.log(mark);
    },
    onMangaBtnClick: function () {
      this.$refs.manga.classList.add('active');
      this.$refs.news.classList.remove('active');
      this.$refs.home.classList.remove('active');
      this.$refs.movie.classList.remove('active');
      this.$refs.chat.classList.remove('active');
      mark = 'manga';
      console.log(mark);
    },
    onMovieBtnClick: function () {
      this.$refs.movie.classList.add('active');
      this.$refs.news.classList.remove('active');
      this.$refs.manga.classList.remove('active');
      this.$refs.home.classList.remove('active');
      this.$refs.chat.classList.remove('active');
      mark = 'movie';
      console.log(mark);
    },
    onChatBtnClick: function () {
      this.$refs.chat.classList.add('active');
      this.$refs.news.classList.remove('active');
      this.$refs.movie.classList.remove('active');
      this.$refs.manga.classList.remove('active');
      this.$refs.home.classList.remove('active');
      mark = 'chat';
      console.log(mark);
    },
  },
  data() {
    return {
      lang: 'vi',
      HEADER_ITEM,
    };
  },
  mounted() {},
};
