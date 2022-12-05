import Comment from '../../../components/Watching/CommentFilm/index.vue';
import { Carousel, Slide } from 'vue-carousel';
import { MangaServices } from '@/services';
import { mapState } from 'vuex';
import moment from 'moment';
import { CommentServices } from '@/services';
export default {
  components: {
    Comment,
    Carousel,
    Slide,
  },
  data() {
    return {
      manga: [],
      lang: 'vi',
      reacts: [],
      comments: [],
      name: '',
      content: '',
      description: '',
      views: 0,
      cmt: {
        source_id: '',
        type: 'manga',
        content: '',
        images: [],
        reply_to: null,
      },
    };
  },
  computed: {
    ...mapState(['userInfo', 'isAuthenticated', 'urlStrapiServe']),
  },
  // watch: {
  //   data(newData) {
  //     if (newData)
  //       Object.keys(newData).map((key) => {
  //         if (key == '_v') return;
  //         this[key] = newData[key];
  //       });
  //     console.log(this);
  //   },
  // },
  mounted() {
    console.log(this.manga);
  },

  async created() {
    const { id } = this.$route.params;
    const [result, error] = await MangaServices.getById(id);
    if (result) {
      this.manga = result;
      Object.keys(result).map((key) => {
        if (key == '_v') return;
        this[key] = result[key];
      });
    }
  },
  methods: {
    moment,
    async sendCmt() {
      this.cmt.source_id = this.manga.id;
      const result = await CommentServices.comment({
        ...this.cmt,
      });
      console.log(result);
      this.comments.push(result[0]);
    },
    // function like manga
    async likeManga(id) {
      const [result, error] = await MangaServices.react(id);
      if (result) {
        const { reacts } = result;
        this.reacts = reacts;
      }
    },
    // function change chapter
    goToChapter(id) {
      console.log(id);
    },
  },
};
