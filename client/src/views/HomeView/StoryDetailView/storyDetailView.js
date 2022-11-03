import Comment from '../../../components/Watching/CommentFilm';
import { HOME_ITEM } from '../../../constants/homeview';
import { Carousel, Slide } from 'vue-carousel';
import { StoriesService } from '@/services';
import { mapState } from 'vuex';
import moment from 'moment';
export default {
  components: {
    Comment,
    Carousel,
    Slide,
  },
  computed: {
    ...mapState(['userInfo', 'isAuthenticated']),
  },
  data() {
    return {
      lang: 'vi',
      HOME_ITEM,
      reacts: [],
      comments: [],
      images: [],
      author: { name: 'Unknown' },
      created_at: new Date(),
      cmt: '',
    };
  },
  methods: {
    moment,
    async likePost(id) {
      console.log(id);
      const [result, error] = await StoriesService.react(id);
      console.log([result, error]);
      if (result) {
        const { reacts } = result;
        this.reacts = reacts;
      }
    },
    sendCmt() {
      console.log(this.cmt);
    },
  },
  async created() {
    const { id } = this.$route.params;
    console.log(id);
    const [result, error] = await StoriesService.getById(id);
    console.log([result, error]);
    if (result) {
      this.story = result;
      Object.keys(result).map((key) => {
        if (key == '_v') return;
        this[key] = result[key];
      });
    }
  },
};
