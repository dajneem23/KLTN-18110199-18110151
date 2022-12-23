import Comment from '../Watching/CommentFilm/index.vue';
import DetailStory from '../../views/HomeView/StoryDetailView/index.vue';
import { HOME_ITEM } from '../../constants/homeview';
import { Carousel, Slide } from 'vue-carousel';
import { CommentServices, UserService, StoriesService } from '@/services';
import { mapState } from 'vuex';
import moment from 'moment';

export default {
  components: {
    Comment,
    DetailStory,
    Carousel,
    Slide,
  },
  props: {
    data: Object,
  },
  data() {
    return {
      lang: 'vi',
      HOME_ITEM,
      cmt: {
        source_id: '',
        type: 'stories',
        content: '',
        images: [],
        reply_to: null,
      },
      title: '',
      reacts: [],
      comments: [],
      img: [],
      author: { name: 'Unknown' },
      isShowDetail: false,
      // isIncludeUser: false,
      isMe: false,
    };
  },
  computed: {
    ...mapState(['userInfo', 'isAuthenticated', 'urlStrapiServe']),
    isIncludeUser() {
      if (this.userInfo) {
        return this.userInfo.following.some((user) => user.id == this.author.id || user.id == this.userInfo._id);
      }
      return false;
    },
  },
  watch: {
    data(newData) {
      if (newData)
        Object.keys(newData).map((key) => {
          if (key == '_v') return;
          this[key] = newData[key];
        });
    },
    userInfo() {
      // if (this.userInfo) {
      // console.log('user info', this.userInfo);
      // this.isIncludeUser =
      // }
    },
  },
  created() {
    if (this.data)
      Object.keys(this.data).map((key) => {
        if (key == '_v') return;
        this[key] = this.data[key];
      });
  },
  mounted() {
    if (this.author.id === this.userInfo._id) {
      this.isMe = true;
      return;
    }
    // console.log(this.author.id);
  },
  methods: {
    moment,
    async likePost(id) {
      if (this.isAuthenticated) {
        const [result, error] = await StoriesService.react(id);
        console.log([result, error]);
        if (result) {
          const { reacts } = result;
          this.reacts = reacts;
        }
      }
    },
    showCmtBox(string) {
      const value = document.getElementById(string);
      if (value.classList[1] === 'disable') {
        value.classList.remove('disable');
        value.classList.add('enable');
        console.log(value.classList);
        return;
      }
      if (value.classList[1] === 'enable') {
        value.classList.remove('enable');
        value.classList.add('disable');
        return;
      }
    },
    async sendCmt() {
      if (this.cmt.content !== '') {
        this.cmt.source_id = this.data.id;
        const result = await CommentServices.comment({
          ...this.cmt,
        });
        const [result_2, error] = await StoriesService.getById(this.data.slug);
        console.log([result_2, error]);
        if (result) {
          this.comments.push(result_2.comments[result_2.comments.length - 1]);
        }
        this.cmt.content = '';
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
    getTime() {
      data.created_at = data.created_at.toLocaleDateString('en-US');
    },
    showModel(slug) {
      this.isShowDetail = true;
    },
    hiddenModel() {
      this.isShowDetail = false;
    },
    async fetchMe() {
      const [result, eror] = await UserService.me();
      if (result) {
        this.$store.commit('setUserInfo', result);
      }
    },
  },
};
