import CardNews from '../../../components/CardNews/index.vue';
import Comment from '../../../components/Watching/CommentFilm';
import { mapState } from 'vuex';
import { NewsServices } from '@/services';
export default {
  components: {
    CardNews,
    Comment,
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
      this.news = result;
      console.log(this.news);
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
      const [result, error] = await NewsServices.upvote(id);
      console.log([result, error]);
      if (result) {
        const { up_votes } = result;
        this.up_votes = up_votes;
        console.log(this.up_votes, up_votes);
      }
    },
    async downVote(id) {
      console.log('Un Vote');
      console.log(id);
      const [result, error] = await NewsServices.downvote(id);
      console.log([result, error]);
      if (result) {
        const { down_votes } = result;
        this.down_votes = down_votes;
        console.log(this.down_votes, down_votes);
      }
    },
    addWishList() {
      console.log('Add wish');
    },
  },
};
