import { FILMDETAIL_ITEM } from '../../../constants/filmdetail';
import Commentfilm from '../../../components/Watching/CommentFilm/index.vue';
import Loader from '../../../components/Loader/skeletonFilmDetail.vue';
import { FilmServices } from '@/services';
import { CommentServices } from '@/services';
import { mapActions, mapState } from 'vuex';
import moment from 'moment';
export default {
  components: {
    Commentfilm,
    Loader
  },
  data() {
    return {
      isLoading: true,
      film: [],
      filmData: [],
      lang: 'vi',
      FILMDETAIL_ITEM,
      reacts: [],
      comments: [],
      name: '',
      content: '',
      description: '',
      long: 0,
      cmt: {
        source_id: '',
        type: 'films',
        content: '',
        images: [],
        reply_to: null,
      },
    };
  },
  computed: {
    ...mapState(['userInfo', 'isAuthenticated', 'urlStrapiServe']),
  },
  props: ['id', 'data'],
  watch: {
    data(newData) {
      if (newData)
        Object.keys(newData).map((key) => {
          if (key == '_v') return;
          this[key] = newData[key];
        });
    },
  },

  async created() {
    const { id } = this.$route.params;
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
      this.isLoading = false;
    }
    const takeDate = new Date(this.film.createdAt);
    this.film.createdAt = takeDate.getFullYear();
  },
  mounted() {
    let vid = document.getElementById('player');
    // this.long = vid.duration;
    console.log(vid, 'Long');
  },
  methods: {
    moment,
    async sendCmt() {
      if (this.cmt.content !== '') {
        this.cmt.source_id = this.film.id;
        const result = await CommentServices.comment({
          ...this.cmt,
        });
        const [result_2, error] = await FilmServices.getById(this.film.slug);
        console.log([result_2, error]);
        if (result) {
          this.comments.push(result_2.comments[result_2.comments.length - 1]);
          // this.comments = result_2.comments;
        }
        this.cmt.content = '';
      }
    },
    async likeFilms(slug) {
      if (this.isAuthenticated) {
        const [result, error] = await FilmServices.react(slug);
        console.log([result, error]);
        if (result) {
          const { reacts } = result;
          this.reacts = reacts;
        }
      } else {
        window.location.href = '/login/';
      }
    },
  },
};
