import Comment from '../../../components/Watching/CommentFilm/index.vue';
import { HOME_ITEM } from '../../../constants/homeview';
import { Carousel, Slide } from 'vue-carousel';
import { StoriesService } from '@/services';
import { CommentServices, UserService } from '@/services';
import { mapState } from 'vuex';
import moment from 'moment';
export default {
  props: {
    Slug_story: String,
    isShowDetail: Boolean,
    hiddenModel: {
      type: Function,
    },
    functionComment: {
      type: Function,
    },
  },
  components: {
    Comment,
    Carousel,
    Slide,
  },
  computed: {
    ...mapState(['userInfo', 'isAuthenticated', 'urlStrapiServe']),
    isIncludeUser() {
      if (this.userInfo) {
        return this.userInfo.following.some((user) => user.id == this.author.id || user.id == this.userInfo._id);
      }
      return false;
    },
    isMe() {
      if (!this.userInfo) return false;
      if (this.author.id === this.userInfo._id) {
        return true;
      }
    },
  },
  mounted() {
    if (this.isAuthenticated) {
      if (this.author.id === this.userInfo._id) {
        this.isMe = true;
        return;
      }
    }
  },
  data() {
    return {
      id: '',
      title: '',
      story: [],
      lang: 'vi',
      HOME_ITEM,
      reacts: [],
      comments: [],
      images: [],
      author: {
        name: 'Unknown',
        avatar: [
          {
            url: '',
          },
        ],
      },
      createdAt: new Date(),
      cmt: {
        source_id: '',
        type: 'stories',
        content: '',
        images: [],
        reply_to: null,
      },
    };
  },
  methods: {
    moment,
    async fetchMe() {
      const [result, eror] = await UserService.me();
      if (result) {
        this.$store.commit('setUserInfo', result);
      }
    },
    async likePost(id) {
      const [result, error] = await StoriesService.react(id);
      console.log([result, error]);
      if (result) {
        const { reacts } = result;
        this.reacts = reacts;
      }
    },
    async sendCmt() {
      if (this.isAuthenticated) {
        if (this.cmt.content !== '') {
          this.cmt.source_id = this.id;
          const result = await CommentServices.comment({
            ...this.cmt,
          });
          const [result_2, error] = await StoriesService.getById(this.slug);
          console.log([result_2, error]);
          if (result) {
            this.comments.push(result_2.comments[result_2.comments.length - 1]);
            // this.comments = result_2.comments;
          }
          this.cmt.content = '';
        }
      }
    },
    async followUser(id) {
      if (!this.isAuthenticated) {
        this.$router.push('/login');
        return;
      }
      const [result, error] = await UserService.followUser(this.author.id);
      if (result) {
        // this.userInfo.following.push(this.author);
        // const btnFL = document.getElementById(id);
        // btnFL.style.display = 'none';
        // this.isIncludeUser = true;
        // console.log(this.author);
      }
      // console.log(this.author)
      this.fetchMe();
    },
    async unfollowUser(id) {
      if (!this.isAuthenticated) {
        this.$router.push('/login');
        return;
      }
      const userID = this.author.id;
      const [result, error] = await UserService.followUser(this.author.id);
      // if (result) {
      //   this.userInfo.following = this.userInfo.following.filter(function (item) {
      //     return item.id !== userID;
      //   });
      //   console.log(this.userInfo.following);
      //   // this.userInfo.following.push(this.author);
      //   // const btnFL = document.getElementById(id);
      //   // btnFL.style.display = 'none';
      //   this.isIncludeUser = false;
      //   console.log(this.author.id);
      // }
      this.fetchMe();
    },
  },
  async created() {
    const id = this.Slug_story;
    const [result, error] = await StoriesService.getById(id);
    if (result) {
      this.story = result;
      console.log(this.story.images);
      Object.keys(result).map((key) => {
        if (key == '_v') return;
        this[key] = result[key];
      });
    }

    let that = this;

    document.addEventListener('keyup', function (evt) {
      if (evt.keyCode === 27) {
        that.hiddenModel();
      }
    });
  },
};
