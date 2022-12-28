import axios from 'axios';
import InfiniteLoading from 'vue-infinite-loading';
import Story from '../../components/Blog/index.vue';
import CreateStory from '../CreateStory/index.vue';
import { mapState } from 'vuex';
import { store } from '../../store/vuex';
import { StoriesService } from '@/services';
import { ChatsServices } from '@/services';
import socketClient from '@/socket';

export default {
  components: {
    // InfiniteLoading,
    Story,
    CreateStory,
  },
  computed: {
    ...mapState(['userInfo', 'isAuthenticated']),
  },
  data() {
    return {
      scTimer: 0,
      scY: 0,
      posts: [],
      // posts_follow: [],
      page: 1,
      per_page: 10,
      isTabHomeData: true,
      isShowUserProfile: false,
      loadMethod: 'get',
    };
  },
  watch: {
    async userInfo() {
      this.$emit('update:userInfo', this.userInfo);
      const [
        { items = [], total_count } = {
          items: [],
        },
        error,
      ] = await StoriesService.get({
        page: this.page,
        per_page: this.per_page,
      });

      this.posts.push(...items);
      this.page++;
    },
    isTabHomeData() {
      if (this.isTabHomeData) {
        this.loadMethod = 'get';
      } else {
        this.loadMethod = 'getPostsFollow';
      }
    },
  },
  methods: {
    async getPosts($state) {
      const [
        { items = [], total_count } = {
          items: [],
        },
        error,
      ] = await StoriesService[this.loadMethod]({
        page: this.page,
        per_page: this.per_page,
      });
      if (!items.length) {
        $state.complete();
      }
      this.posts.push(...items);
      this.page++;
      $state.loaded();
    },

    async createChat(id) {
      // alert(id);
      let isInclude = false;
      const [allChat, errorChat] = await ChatsServices.get();
      allChat.items.forEach((item) => {
        if (item.type === 'private') {
          item.users.forEach((user) => {
            if (user.id === id) {
              isInclude = true;
            }
          });
        }
      });
      if (!isInclude) {
        const [result, error] = await ChatsServices.createChat({
          users: [id],
        });
        socketClient.send('join', {
          room: this.result.id,
        });
        console.log(result);
      }
      // window.location.href = '/chat/';
    },
    showProfileUser() {
      this.isShowUserProfile = true;
    },
    hiddenProfileUser() {
      this.isShowUserProfile = false;
    },
    showModel() {
      const model = document.getElementById('model-add-story');
      model.style.visibility = 'visible';
    },
    hiddenModel() {
      const model = document.getElementById('model-add-story');
      model.style.visibility = 'hidden';
    },
    async handleChageTabHomeData($state) {
      if (this.isAuthenticated) {
        this.isTabHomeData = true;
        const [
          { items = [], total_count } = {
            items: [],
          },
          error,
        ] = await StoriesService.get({});
        this.posts = items;
        console.log(items, total_count);
      }
    },
    async handleChageTabFollowData() {
      if (this.isAuthenticated) {
        if (this.userInfo.following.length == 0) {
          // this.post = [];
        } else {
          this.isTabHomeData = false;
          const [
            { items = [], total_count } = {
              items: [],
            },
            error,
          ] = await StoriesService.getPostsFollow({});
          this.posts = items;
          console.log(items, total_count);
        }
      } else {
        this.$router.push('/login')
      }
    },
  },
};
