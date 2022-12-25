import Comment from '../../../components/Watching/CommentFilm/index.vue';
import Loader from '../../../components/Loader/skeletonMangadetail.vue';
import MangaChapter from './detailChapterView/index.vue';
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
    Loader,
    MangaChapter,
  },
  data() {
    return {
      slug_chapter:'',
      isLoading: true,
      manga: [],
      lang: 'vi',
      reacts: [],
      comments: [],
      name: '',
      content: '',
      description: '',
      categories: [],
      chapters: [],
      views: 0,
      images: [],
      cmt: {
        source_id: '',
        type: 'manga',
        content: '',
        images: [],
        reply_to: null,
      },
      isShowDetail: false,
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
    const takeDate = new Date(this.manga.createdAt);
    this.manga.createdAt = takeDate.getFullYear();
    this.isLoading = false;

  },
  methods: {
    moment,
    async sendCmt() {
      if (this.cmt.content !== '') {
        this.cmt.source_id = this.manga.id;
        const result = await CommentServices.comment({
          ...this.cmt,
        });
        const [result_2, error] = await MangaServices.getById(this.manga.slug);
        console.log([result_2, error]);
        if (result) {
          this.comments.push(result_2.comments[result_2.comments.length - 1]);
          // this.comments = result_2.comments;
        }
        this.cmt.content = '';
      }
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
    showChapter(id) {
      this.isShowDetail = true;
      this.slug_chapter = id;
    },
    hiddenModel() {
      this.isShowDetail = false;
    },
  },
};
