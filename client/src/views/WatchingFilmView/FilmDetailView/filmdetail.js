import { FILMDETAIL_ITEM } from "../../../constants/filmdetail";
import Commentfilm from "../../../components/Watching/CommentFilm/index.vue";
export default {
  components: {
    Commentfilm
  },
  data() {
    return {
      filmData: [],
      lang: 'vi',
      FILMDETAIL_ITEM,
      cmt:'',
    };
  },
  props: ['id', 'data'],
  mounted() {
    this.filmData = this.$route.params.filmData;
    console.log(this.$route);
    console.log('mounted');

  },
  methods: {
    sendCmt() {
      console.log(this.cmt)
    }
  },
};

