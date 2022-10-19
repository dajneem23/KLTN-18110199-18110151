import Comment from '../../../components/Watching/CommentFilm';
import { HOME_ITEM } from '../../../constants/homeview';
import { Carousel, Slide } from 'vue-carousel';
export default {
  components: {
    Comment,
    Carousel,
    Slide,
  },
  data() {
    return {
      lang: 'vi',
      HOME_ITEM,
    };
  },
};
