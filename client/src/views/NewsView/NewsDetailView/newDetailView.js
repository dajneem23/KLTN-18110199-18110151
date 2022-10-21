import CardNews from '../../../components/CardNews/index.vue';
import Commentfilm from '../../../components/Watching/CommentFilm/index.vue';
import { mapState } from 'vuex';
import { NewsServices } from '@/services';
export default {
  components: {
    CardNews,
  },
  data() {
    return {
      scTimer: 0,
      scY: 0,
      cmt: '',
      tags: [],
      up_votes: [],
      down_votes: [],
      comments: [],
      name: '',
      content: '',
      description: '',
      author: {},
    };
  },
  computed: {
    ...mapState(['userInfo', 'isAuthenticated']),
  },
  mounted() {
    window.addEventListener('scroll', this.handleScroll);

    // const news
  },
  async created() {
    const { id } = this.$route.params;
    console.log(id);
    const [result, error] = await NewsServices.getById(id);
    console.log([result, error]);
    if (result) {
      this.story = result;
      Object.keys(result).map((key) => {
        if (key == '_v') return;
        this[key] = result[key];
      });
    }
  },
  methods: {
    handleScroll: function () {
      if (this.scTimer) return;
      this.scTimer = setTimeout(() => {
        this.scY = window.scrollY;
        clearTimeout(this.scTimer);
        this.scTimer = 0;
      }, 200);
    },
    toTop: function () {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    },
    sendCmt() {
      console.log(this.cmt);
    },
    goToCmtBox() {
      const element = document.getElementById('cmt');
      element.scrollIntoView();
    },
    async upVote(id) {
      console.log(id);
      const [result, error] = await NewsService.upvote(id);
      console.log([result, error]);
      if (result) {
        const { reacts } = result;
        this.reacts = reacts;
        // console.log(this.reacts, reacts);
      }
    },
    downVote() {
      console.log('Un Vote');
    },
    addWishList() {
      console.log('Add wish');
    },
  },
};
