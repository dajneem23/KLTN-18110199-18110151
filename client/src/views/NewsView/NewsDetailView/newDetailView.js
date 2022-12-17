import CardNews from '../../../components/CardNews/index.vue';
import Comment from '../../../components/Watching/CommentFilm';
import { mapState } from 'vuex';
import { NewsServices } from '@/services';
import { CommentServices } from '@/services';
import { UserService } from '@/services';
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
      createdAt: '',
      isIncludeUser: false,
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
    this.userInfo.following.forEach((user) => {
      if (user.id == this.author.id) {
        this.isIncludeUser = true;
        return
      }

    });

    // const news
  },
  async created() {
    const { id } = this.$route.params;
    const [result, error] = await NewsServices.getById(id);
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
      if (this.cmt.content !== '') {
        this.cmt.source_id = this.news.id;
        const result = await CommentServices.comment({
          ...this.cmt,
        });
        const [result_2, error] = await NewsServices.getById(this.news.slug);
        console.log([result_2, error]);
        if (result_2) {
          this.comments.push(result_2.comments[result_2.comments.length - 1]);
          // this.comments = result_2.comments;
        }
        this.cmt.content = '';
      }
    },
    goToCmtBox() {
      const element = document.getElementById('cmt');
      element.scrollIntoView();
    },
    async upVote(id) {
      if (this.isAuthenticated) {
        this.up_votes.length += 1;
        this.down_votes.length -= 1;
        let down_vote = document.getElementById('triangle-down');
        down_vote.classList.remove('down-vote');
        let up_vote = document.getElementById('triangle-up');
        up_vote.classList.add('up-vote');
        const [result, error] = await NewsServices.upvote(id);
        console.log([result, error]);
        if (result) {
          // const { up_votes } = result;
          // this.up_votes = up_votes;
        }
      } else {
        window.location.href = '/login/';
      }

      const [result_2, error] = await NewsServices.getById(id);
      console.log([result_2, error]);
      if (result_2) {
        this.up_votes = result_2.up_votes;
        this.down_votes = result_2.down_votes;
      }
    },
    async downVote(id) {
      if (this.isAuthenticated) {
        this.up_votes.length -= 1;
        this.down_votes.length += 1;
        let down_vote = document.getElementById('triangle-down');
        down_vote.classList.add('down-vote');
        let up_vote = document.getElementById('triangle-up');
        up_vote.classList.remove('up-vote');
        const [result, error] = await NewsServices.downvote(id);
        if (result) {
          // const { down_votes } = result;
          // this.down_votes = down_votes;
        }
      } else {
        window.location.href = '/login/';
      }
      const [result_2, error] = await NewsServices.getById(id);
      console.log([result_2, error]);
      if (result_2) {
        this.up_votes = result_2.up_votes;
        this.down_votes = result_2.down_votes;
      }

      // if (this.up_votes.includes(this.userInfo._id)) {
      //   let down_vote = document.getElementById('triangle-down');
      //   down_vote.classList.add('down-vote');
      //   let up_vote = document.getElementById('triangle-up');
      //   up_vote.classList.remove('up-vote');
      // }
    },
    async addWishList(id) {
      if (this.isAuthenticated) {
        const [result, error] = await NewsServices.react(id);
        if (result) {
          const { reacts } = result;
          this.reacts = reacts;
        }
      } else {
        window.location.href = '/login/';
      }
    },
    async followUser(user) {
      const [result, error] = await UserService.followUser(this.author.id);
      if (result) {
        this.userInfo.following.push(this.author.id)
      }
    },
  },
};
