import { FILMDETAIL_ITEM } from '../../../constants/filmdetail';
import Commentfilm from '../../../components/Watching/CommentFilm/index.vue';
import { FilmServices } from '@/services';
import { mapActions, mapState } from 'vuex';
import moment from 'moment';
export default {
  components: {
    Commentfilm,
  },
  data() {
    return {
      film: [],
      filmData: [],
      lang: 'vi',
      FILMDETAIL_ITEM,
      cmt: '',
    };
  },
  computed: {
    ...mapState(['urlStrapiServe']),
  },
  props: ['id', 'data'],
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
    const id = this.$route.params.filmId;
    console.log(id);
    const [result, error] = await FilmServices.getById(id);
    console.log([result, error]);
    if (result) {
      this.film = result;
      console.log(this.film);
      Object.keys(result).map((key) => {
        if (key == '_v') return;
        this[key] = result[key];
      });
    }
    const takeDate = new Date(this.film.createdAt);
    this.film.createdAt = takeDate.getFullYear();
    this.film.image.url = this.urlStrapiServe + this.film.image.url;
  },
  methods: {
    moment,
    sendCmt() {
      console.log(this.cmt);
    },
  },
};
