import { HEADER_ITEM } from '../../constants';

export default {
  name: 'Header',
  methods: {
    onHomeBtnClick: function () {
      this.$refs.home.classList.add('active');
      this.$refs.manga.classList.remove('active');
      this.$refs.movie.classList.remove('active');
      this.$refs.chat.classList.remove('active');
    },
    onMangaBtnClick: function () {
      this.$refs.manga.classList.add('active');
      this.$refs.home.classList.remove('active');
      this.$refs.movie.classList.remove('active');
      this.$refs.chat.classList.remove('active');
    },
    onMovieBtnClick: function () {
      this.$refs.movie.classList.add('active');
      this.$refs.manga.classList.remove('active');
      this.$refs.home.classList.remove('active');
      this.$refs.chat.classList.remove('active');
    },
    onChatBtnClick: function () {
      this.$refs.chat.classList.add('active');
      this.$refs.movie.classList.remove('active');
      this.$refs.manga.classList.remove('active');
      this.$refs.home.classList.remove('active');
    },
  },
  data() {
    return {
      lang: 'vi',
      HEADER_ITEM,
    };
  },
};
