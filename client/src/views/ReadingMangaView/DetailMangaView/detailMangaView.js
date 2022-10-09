import Commentfilm from '../../../components/Watching/CommentFilm/index.vue';
import { Carousel, Slide } from 'vue-carousel';
export default {
  components: {
    Commentfilm,
    Carousel,
    Slide
  },
  data() {
    return {
      mangaData: [],
      lang: 'vi',
    };
  },
  props: ['id', 'data'],
}