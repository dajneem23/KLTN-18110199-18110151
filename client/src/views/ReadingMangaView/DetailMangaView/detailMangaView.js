import Commentfilm from '../../../components/Watching/CommentFilm/index.vue';
import { Carousel, Slide } from 'vue-carousel';
export default {
  components: {
    Commentfilm,
    Carousel,
    Slide,
  },
  data() {
    return {
      mangaData: [],
      lang: 'vi',
      cmt: '',
    };
  },
  methods: {
    sendCmt() {
      console.log(this.cmt);
    },
    // function like manga
    likeManga() {
      console.log('Like Manga');
    },
    // function change chapter
    goToChapter() {
      console.log('Chapter change');
    },
  },
  props: ['id', 'data'],
};
