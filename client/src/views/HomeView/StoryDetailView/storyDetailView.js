import Comment from '../../../components/Watching/CommentFilm/index.vue';
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
    ...mapState(['userInfo', 'isAuthenticated', 'urlStrapiServe']),
  },
  data() {
    return {
      story: [],
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
  mounted() {
    console.log(this.story);
  },
  methods: {
    moment,
    async likePost(id) {
      const [result, error] = await StoriesService.react(id);
      console.log([result, error]);
      if (result) {
        const { reacts } = result;
        this.reacts = reacts;
      }
    },
    sendCmt() {},
  },
  async created() {
    const { id } = this.$route.params;
    const [result, error] = await StoriesService.getById(id);
    if (result) {
      this.story = result;
      this.story.images.forEach((image) => {
        image.url = this.urlStrapiServe + image.url;
      });
      console.log(this.story.images);
      Object.keys(result).map((key) => {
        if (key == '_v') return;
        this[key] = result[key];
      });
    }
  },
};
