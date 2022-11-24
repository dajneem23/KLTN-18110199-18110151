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
      page: 1,
      per_page: 10,
    };
  },
  mounted() {
    console.log(this.isAuthenticated);
    console.log(this.userInfo);
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
      // console.log([items, error]);
      if (!items.length) {
        $state.complete();
      }
      this.posts.push(...items);
      this.page++;
      $state.loaded();
    },
    showModel() {
      const model = document.getElementById('model-add-story');
      model.style.visibility = 'visible';
    },
    hiddenModel() {
      const model = document.getElementById('model-add-story');
      model.style.visibility = 'hidden';
    },
  },
};
