import axios from 'axios';
import InfiniteLoading from 'vue-infinite-loading';
import News from '../../components/News/index.vue';
export default {
  components: {
    InfiniteLoading,
    News,
  },
  data() {
    return {
      posts: [],
    };
  },
  methods: {
    getPosts($state) {
      axios.get('https://jsonplaceholder.typicode.com/posts').then((response) => {
        if (response.data.length ) {
          this.posts.push(...response.data);
          $state.loaded();
        } else {
          $state.complete();
        }
      });
    },
  },
};