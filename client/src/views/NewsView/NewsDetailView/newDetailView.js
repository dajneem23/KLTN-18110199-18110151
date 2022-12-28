import CardNews from '../../../components/CardNews/index.vue';
import Comment from '../../../components/Watching/CommentFilm';
import Loader from '../../../components/Loader/skeletonNewsDetail.vue';
import { mapState } from 'vuex';
import { NewsServices } from '@/services';
import { CommentServices } from '@/services';
import { UserService } from '@/services';
import moment from 'moment';
import { ref } from 'vue';

export default {
  components: {
    CardNews,
    Comment,
    Loader,
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
      author: {
        avatar: [
          {
            url: '',
          },
        ],
      },
      tags: [],
      up_votes: [],
      down_votes: [],
      comments: [],
      name: '',
      content: '',
      description: '',
      reacts: [],
      categories: [],
      createdAt: '',
      // isIncludeUser: false,
      isLoading: true,
      isVoteUp: false,
      isVoteDown: false,
      vote: 0,
      isMe: false,
    };
  },
  computed: {
    ...mapState(['userInfo', 'isAuthenticated']),
    isIncludeUser() {
      if (this.userInfo) {
        return this.userInfo.following.some((user) => user.id == this.author.id || user.id == this.userInfo._id);
      }
      return false;
    },
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
  async mounted() {
    const { id } = this.$route.params;
    const [result, error] = await NewsServices.getById(id);
    if (result) {
      this.news = result;
      Object.keys(result).map((key) => {
        if (key == '_v') return;
        this[key] = result[key];
      });
    }
    this.isLoading = false;
    this.totalVote = this.up_votes.length - this.down_votes.length;
    window.addEventListener('scroll', this.handleScroll);
    if (this.isAuthenticated) {
      if (this.author.id === this.userInfo._id) {
        this.isMe = true;
        return;
      }
    }
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
    window.addEventListener('scroll', this.handleScroll);
    // this.userInfo.following.forEach((user) => {
    //   if (user.id == this.author.id) {
    //     this.isIncludeUser = true;
    //     return;
    //   }
    // });
    this.isLoading = false;
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
      if (this.isAuthenticated) {
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
        this.isVoteUp = true;
        this.isVoteDown = false;
        // let down_vote = document.getElementById('triangle-down');
        // down_vote.classList.remove('down-vote');
        // let up_vote = document.getElementById('triangle-up');
        // up_vote.classList.add('up-vote');
        const [result, error] = await NewsServices.upvote(id);
        // console.log([result, error]);
        if (result) {
          // const { up_votes } = result;
          // this.up_votes = up_votes;
        }
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
        this.isVoteUp = false;
        this.isVoteDown = true;
        // let down_vote = document.getElementById('triangle-down');
        // down_vote.classList.add('down-vote');
        // let up_vote = document.getElementById('triangle-up');
        // up_vote.classList.remove('up-vote');
        const [result, error] = await NewsServices.downvote(id);
        if (result) {
          // const { down_votes } = result;
          // this.down_votes = down_votes;
        }
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
      }
    },
    async followUser(user) {
      const [result, error] = await UserService.followUser(user.id);
      if (result) {
        // this.userInfo.following.push(user);
      }
      // this.isIncludeUser = true;
      // console.log(user);
      this.fetchMe();
    },
    async unfollowUser(user) {
      const [result, error] = await UserService.followUser(user.id);
      if (result) {
        // this.userInfo.following.push(user);
      }
      // this.isIncludeUser = true;
      // console.log(user);
      this.fetchMe();
    },
    async fetchMe() {
      const [result, eror] = await UserService.me();
      if (result) {
        this.$store.commit('setUserInfo', result);
      }
    },
  },
};
