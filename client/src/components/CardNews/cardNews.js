import { NewsServices } from '@/services';
import IconUpVote from '../../assets/Icon/up-vote.svg';
import { mapState } from 'vuex';
export default {
  components: {},
  props: {
    style_x: String,
    font_title: String,
    news: Object,
  },
  data() {
    return {
      up_votes: [],
      reacts: [],
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
    },
  },
  mounted() {
    console.log('dhdhdh');
  },
  created() {
    if (this.news)
      Object.keys(this.news).map((key) => {
        if (key == '_v') return;
        this[key] = this.news[key];
      });
  },
  methods: {
    async addWishList(id) {
      console.log(id);
      const [result, error] = await NewsServices.react(id);
      console.log([result, error]);
      if (result) {
        const { reacts } = result;
        this.reacts = reacts;
        // console.log(this.reacts, reacts);
      }
    },
    async upVote(id) {
      console.log(id);
      const [result, error] = await NewsServices.upvote(id);
      console.log([result, error]);
      if (result) {
        const { up_votes } = result;
        this.up_votes = up_votes;
        console.log(this.up_votes, up_votes);
      }
    },
  },
};
