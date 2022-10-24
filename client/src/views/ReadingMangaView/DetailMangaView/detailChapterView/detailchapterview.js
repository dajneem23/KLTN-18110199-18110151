import { MangaServices } from '@/services';
export default {
  data() {
    return {
      chapter: [],
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
    goToPrev(index) {
      console.log(index);
    },
    goToNext(index) {
      console.log(index);
    }
  },
};
