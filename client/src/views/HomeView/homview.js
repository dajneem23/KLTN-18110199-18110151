import axios from 'axios';
import InfiniteLoading from 'vue-infinite-loading';
import News from '../../components/Blog/index.vue';
import { mapState } from 'vuex';
import { store } from '../../store/vuex';
export default {
  components: {
    InfiniteLoading,
    News,
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
    getPosts($state) {
      axios
        .get('https://jsonplaceholder.typicode.com/posts', {
          params: {
            page: +this.page,
            per_page: +this.per_page,
          },
        })
        .then((response) => {
          if (response.data.length) {
            this.posts.push(...response.data);
            this.page++;
            $state.loaded();
          } else {
            $state.complete();
          }
        });
    },
  },
};
