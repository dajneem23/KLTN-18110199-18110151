import Comment from '../../../components/Watching/CommentFilm/index.vue';
import { HOME_ITEM } from '../../../constants/homeview';
import { Carousel, Slide } from 'vue-carousel';
import { StoriesService } from '@/services';
import { CommentServices } from '@/services';
import { mapState } from 'vuex';
import moment from 'moment';
export default {
  props: {
    Slug_story: String,
    isShowDetail: Boolean,
    hiddenModel: {
      type: Function,
    },
    functionComment: {
      type: Function,
    },
  },
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
      cmt: {
        source_id: '',
        type: 'stories',
        content: '',
        images: [],
        reply_to: null,
      },
    };
  },
  mounted() {
    console.log(this.Slug_story);
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
    async sendCmt() {
      this.cmt.source_id = this.id;
      const result = await CommentServices.comment({
        ...this.cmt,
      });
      console.log(this.cmt);
      console.log(result);
    },
  },
  async created() {
    const id = this.Slug_story;
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

    let that = this;

    document.addEventListener('keyup', function (evt) {
      if (evt.keyCode === 27) {
        that.hiddenModel();
      }
    });
  },
};
