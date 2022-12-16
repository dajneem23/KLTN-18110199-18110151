import axios from 'axios';
import InfiniteLoading from 'vue-infinite-loading';
import Story from '../../components/Blog/index.vue';
import CreateStory from '../CreateStory/index.vue';
import { mapState } from 'vuex';
import { store } from '../../store/vuex';
import { StoriesService } from '@/services';
export default {
  components: {
    InfiniteLoading,
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
    };
  },
  methods: {
    async getPosts($state) {
      const [
        { items = [], total_count } = {
          items: [],
        },
        error,
      ] = await StoriesService.get({
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

    createChat() {
      alert('chatchat');
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
      this.isTabHomeData = true;
      const [
        { items = [], total_count } = {
          items: [],
        },
        error,
      ] = await StoriesService.get({
      });
      this.posts = items;
      console.log(items, total_count);
    },
    async handleChageTabFollowData() {
      this.isTabHomeData = false;
      const [
        { items = [], total_count } = {
          items: [],
        },
        error,
      ] = await StoriesService.getPostsFollow({
      });
      this.posts = items;
      console.log(items, total_count);
    },
  },
};
