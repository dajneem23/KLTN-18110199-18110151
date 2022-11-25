import Comment from '../Watching/CommentFilm/index.vue';
import { HOME_ITEM } from '../../constants/homeview';
import { onMounted } from 'vue';
import { Carousel, Slide } from 'vue-carousel';
import { StoriesService } from '@/services';
import { mapState } from 'vuex';
import moment from 'moment'; 
export default {
  components: {
    Comment,
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
      cmt: '',
      reacts: [],
      comments: [],
      author: { name: 'Unknown' },
    };
  },
  computed: {
    ...mapState(['userInfo', 'isAuthenticated','urlStrapiServe']),
  },
  watch: {
    data(newData) {
      if (newData)
        Object.keys(newData).map((key) => {
          if (key == '_v') return;
          this[key] = newData[key];
        });
      // console.log(this);
    },
  },
  created() {
    if (this.data)
      Object.keys(this.data).map((key) => {
        // console.log(key);
        if (key == '_v') return;
        this[key] = this.data[key];
      });
  },
  mounted() {
    this.data.images[0].url = this.urlStrapiServe + this.data.images[0].url;
    console.log(this.data.images);
  },
  methods: {
    moment,
    async likePost(id) {
      console.log(id);
      const [result, error] = await StoriesService.react(id);
      console.log([result, error]);
      if (result) {
        const { reacts } = result;
        this.reacts = reacts;
        // console.log(this.reacts, reacts);
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
    sendCmt() {
      console.log(this.cmt);
    },
    getTime() {
      data.created_at = data.created_at.toLocaleDateString('en-US');
    },
  },
};
