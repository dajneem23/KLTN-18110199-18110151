import CardNews from '../../../components/CardNews/index.vue';
import Comment from '../../../components/Watching/CommentFilm';
import { mapState } from 'vuex';
import { NewsServices } from '@/services';
import { CommentServices } from '@/services';
import moment from 'moment';
export default {
  components: {
    CardNews,
    Comment,
  },
  data() {
    return {
      scTimer: 0,
      scY: 0,
      cmt: {
        source_id: '',
        type: 'articles',
        content: '',
        images: [],
        reply_to: null,
      },
      tags: [],
      up_votes: [],
      down_votes: [],
      comments: [],
      name: '',
      content: '',
      description: '',
      reacts: [],
      author: {},
    };
  },
  computed: {
    ...mapState(['userInfo', 'isAuthenticated']),
  },
  // watch: {
  //   data(newData) {
  //     if (newData)
  //       Object.keys(newData).map((key) => {
  //         if (key == '_v') return;
  //         this[key] = newData[key];
  //       });
  //     console.log(this);
  //   },
  // },
  mounted() {
    window.addEventListener('scroll', this.handleScroll);
    // this.voteCount = this.up_votes.length - this.down_votes.length;

    // const news
  },
  async created() {
    const { id } = this.$route.params;
    const [result, error] = await NewsServices.getById(id);
    console.log([result, error]);
    if (result) {
      this.news = result;
      Object.keys(result).map((key) => {
        if (key == '_v') return;
        this[key] = result[key];
      });
    }
    this.totalVote = this.up_votes.length - this.down_votes.length;
  },
  methods: {
    moment,
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
    async sendCmt() {
      this.cmt.source_id = this.news.id;
      const result = await CommentServices.comment({
        ...this.cmt,
      });
      console.log(this.cmt);
      console.log(result);
    },
    goToCmtBox() {
      const element = document.getElementById('cmt');
      element.scrollIntoView();
    },
    async upVote(id) {
      if (this.isAuthenticated) {
        const [result, error] = await NewsServices.upvote(id);
        console.log([result, error]);
        if (result) {
          const { up_votes } = result;
          this.up_votes = up_votes;
        }
      } else {
        window.location.href = '/login/';
      }

      if (this.down_votes.includes(this.userInfo._id)) {
        let down_vote = document.getElementById('triangle-down');
        down_vote.classList.remove('down-vote');
        let up_vote = document.getElementById('triangle-up');
        up_vote.classList.add('up-vote');
      }
      let vote_count = document.getElementById('voteCount');
      vote_count.innerText = this.up_votes.length - this.down_votes.length;
    },
    async downVote(id) {
      if (this.isAuthenticated) {
        const [result, error] = await NewsServices.downvote(id);
        console.log([result, error]);
        if (result) {
          const { down_votes } = result;
          this.down_votes = down_votes;
          console.log(this.down_votes, down_votes);
        }
      } else {
        window.location.href = '/login/';
      }

      if (this.up_votes.includes(this.userInfo._id)) {
        let down_vote = document.getElementById('triangle-down');
        down_vote.classList.add('down-vote');
        let up_vote = document.getElementById('triangle-up');
        up_vote.classList.remove('up-vote');
      }
      vote_count.innerText = this.up_votes.length - this.down_votes.length;
    },
    async addWishList(id) {
      if (this.isAuthenticated) {
        const [result, error] = await NewsServices.react(id);
        console.log([result, error]);
        if (result) {
          const { reacts } = result;
          this.reacts = reacts;
          // console.log(this.reacts, reacts);
        }
      } else {
        window.location.href = '/login/';
      }
    },
    followUser(user) {
      console.log('follow :', user.id);
    },
  },
};
