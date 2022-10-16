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
    };
  },
  mounted() {
    // console.log(store.state);
  },
  methods: {
    getPosts($state) {
      axios.get('https://jsonplaceholder.typicode.com/posts').then((response) => {
        if (response.data.length) {
          this.posts.push(...response.data);
          $state.loaded();
        } else {
          $state.complete();
        }
      });
    },
  },
};
