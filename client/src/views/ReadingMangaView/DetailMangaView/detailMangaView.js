import Commentfilm from '../../../components/Watching/CommentFilm/index.vue';
import { Carousel, Slide } from 'vue-carousel';
import { MangaServices } from '@/services';
export default {
  components: {
    Commentfilm,
    Carousel,
    Slide,
  },
  data() {
    return {
      manga: [],
      lang: 'vi',
      cmt: '',
    };
  },
  watch: {
    data(newData) {
      if (newData)
        Object.keys(newData).map((key) => {
          if (key == '_v') return;
          this[key] = newData[key];
        });
      console.log(this);
    },
  },
  mounted() {},
  async created() {
    const id = this.$route.params.mangaId;
    console.log(id);
    const [result, error] = await MangaServices.getById(id);
    console.log([result, error]);
    if (result) {
      this.manga = result;
      console.log(this.manga);
      Object.keys(result).map((key) => {
        if (key == '_v') return;
        this[key] = result[key];
      });
    }
    this.manga.chapters.sort(({ index: a }, { index: b }) => a - b)
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
    goToChapter(id) {
      console.log(id);
    },
  },
};
