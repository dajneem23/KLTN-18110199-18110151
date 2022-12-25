import { MangaServices } from '@/services';
import { CommentServices } from '@/services';
import { mapState } from 'vuex';
import Comment from '../../../../components/Watching/CommentFilm/index.vue';

export default {
  props: {
    slug: String,
    isShowDetail: Boolean,
    hiddenModel: {
      type: Function,
    },
  },
  data() {
    return {
      isLoading: true,
      chapter: [],
      comments: [],
      name: '',
      images: [],
      cmt: {
        source_id: '',
        type: 'manga-chapters',
        content: '',
        images: [],
        reply_to: null,
      },
    };
  },
  computed: {
    ...mapState(['userInfo', 'isAuthenticated', 'urlStrapiServe']),
  },
  components: {
    Comment,
  },
  watch: {
    data(newData) {
      if (newData)
        Object.keys(newData).map((key) => {
          if (key == '_v') return;
          this[key] = newData[key];
        });
    },
  },
  mounted() {},
  async created() {
    // const id = this.$route.params.id;
    // console.log(id);
    // console.log(this.$route.params.id);
    const [result, error] = await MangaServices.getChapterById(this.slug);
    console.log([result, error]);
    if (result) {
      this.chapter = result;
      console.log(this.chapter);
      Object.keys(result).map((key) => {
        if (key == '_v') return;
        this[key] = result[key];
      });
    }
    this.isLoading = false;
    let that = this;
    document.addEventListener('keyup', function (evt) {
      if (evt.keyCode === 27) {
        that.hiddenModel();
      }
    });
  },
  methods: {
    async sendCmt() {
      this.cmt.source_id = this.chapter.id;
      const result = await CommentServices.comment({
        ...this.cmt,
      });
      const [result_2, error] = await MangaServices.getChapterById(this.chapter.slug);
      console.log([result_2, error]);
      if (result) {
        this.comments.push(result_2.comments[result_2.comments.length - 1]);
        // this.comments = result_2.comments;
      }
      console.log(result);
      this.comments.push(result[0]);
      this.cmt.content = '';
    },
    goToPrev(index) {
      console.log(index);
    },
    goToNext(index) {
      console.log(index);
    },
  },
};
