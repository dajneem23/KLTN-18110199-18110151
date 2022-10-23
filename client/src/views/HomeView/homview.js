import axios from 'axios';
import InfiniteLoading from 'vue-infinite-loading';
import Story from '../../components/Blog/index.vue';
import { mapState } from 'vuex';
import { store } from '../../store/vuex';
import { StoriesService } from '@/services';
export default {
  components: {
    InfiniteLoading,
    Story,
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
    // console.log(store.state);
  },
  methods: {
    async getPosts($state) {
      // axios
      //   .get('https://jsonplaceholder.typicode.com/posts', {
      //     params: {
      //       page: +this.page,
      //       per_page: +this.per_page,
      //     },
      //   })
      //   .then((response) => {
      //     if (response.data.length) {
      //       this.posts.push(...response.data);
      //       this.page++;
      //       $state.loaded();
      //     } else {
      //       $state.complete();
      //     }
      //   });
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
  },
};
