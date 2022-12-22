import Comment from '../Watching/CommentFilm/index.vue';
import DetailStory from '../../views/HomeView/StoryDetailView/index.vue';
import { HOME_ITEM } from '../../constants/homeview';
import { onMounted } from 'vue';
import { Carousel, Slide } from 'vue-carousel';
import { StoriesService } from '@/services';
import { CommentServices } from '@/services';
import { UserService } from '../../services';
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
      isIncludeUser: false,
      isMe: false,
    };
  },
  computed: {
    ...mapState(['userInfo', 'isAuthenticated', 'urlStrapiServe']),
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
    this.userInfo.following.forEach((user) => {
      if ((user.id == this.author.id) || (user.id == this.userInfo._id)) {
        this.isIncludeUser = true;
        return;
      }
    });
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
      const [result, error] = await UserService.followUser(this.author.id);
      if (result) {
        this.userInfo.following.push(this.author);
        // const btnFL = document.getElementById(id);
        // btnFL.style.display = 'none';
        this.isIncludeUser = true;
        // console.log(this.author);
      }
      // console.log(this.author)
    },
    async unfollowUser(id) {
      const userID = this.author.id;
      const [result, error] = await UserService.followUser(this.author.id);
      if (result) {
        this.userInfo.following = this.userInfo.following.filter(function (item) {
          return item.id !== userID;
        });
        console.log(this.userInfo.following);
        // this.userInfo.following.push(this.author);
        // const btnFL = document.getElementById(id);
        // btnFL.style.display = 'none';
        this.isIncludeUser = false;
        console.log(this.author.id);
      }
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
  },
};
