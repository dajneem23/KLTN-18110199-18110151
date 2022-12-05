import { MangaServices } from '@/services';
import { CommentServices } from '@/services';
import Comment from '../../../../components/Watching/CommentFilm/index.vue';
export default {
  data() {
    return {
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
  mounted() {
    console.log(this.chapter);
  },
  async created() {
    const id = this.$route.params.id;
    console.log(id);
    console.log(this.$route.params.id);
    const [result, error] = await MangaServices.getChapterById(this.$route.params.id);
    console.log([result, error]);
    if (result) {
      this.chapter = result;
      console.log(this.chapter);
      Object.keys(result).map((key) => {
        if (key == '_v') return;
        this[key] = result[key];
      });
    }
  },
  methods: {
    async sendCmt() {
      this.cmt.source_id = this.chapter.id;
      const result = await CommentServices.comment({
        ...this.cmt,
      });
      console.log(result);
      this.comments.push(result[0]);
    },
    goToPrev(index) {
      console.log(index);
    },
    goToNext(index) {
      console.log(index);
    },
  },
};
