import { FILMDETAIL_ITEM } from '../../../constants/filmdetail';
import Commentfilm from '../../../components/Watching/CommentFilm/index.vue';
import { FilmServices } from '@/services';
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
  },
  methods: {
    moment,
    sendCmt() {
      console.log(this.cmt);
    },
  },
};
