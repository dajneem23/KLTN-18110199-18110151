import Comment from '../Watching/CommentFilm/index.vue';
import { HOME_ITEM } from '../../constants/homeview';
import { onMounted } from 'vue';
import { Carousel, Slide } from 'vue-carousel';

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
    };
  },
  mounted() {

  },
  methods: {
    likePost(string, string2) {
      const valueTitle = document.getElementById(string2);
      const valueIcon = document.getElementById(string);
      if (valueTitle.classList.length === 0) {
        valueIcon.classList.add('fill-blue');
        valueTitle.classList.add('text-blue');
      } else {
        valueIcon.classList.remove('fill-blue');
        valueTitle.classList.remove('text-blue');
      }
      console.log('ahahah');
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
