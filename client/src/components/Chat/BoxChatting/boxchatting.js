import InfiniteLoading from 'vue-infinite-loading';
import Messenge from '../Messenge/index.vue';
import { StoriesService } from '@/services';

export default {
  data() {
    return {
      sms: {
        source_id: '',
        content:'',
        reply_to:null,
      },
      posts: [],
      page: 1,
      per_page: 10,
      icon: '&#128512;',
    };
  },
  components: {
    Messenge,
    InfiniteLoading,
  },
  methods: {
    showEmojiBox() {
      const boxEmoji = document.getElementById('box-emoji');
      if (boxEmoji.style.visibility == 'hidden') {
        boxEmoji.style.visibility = 'visible';
      } else {
        boxEmoji.style.visibility = 'hidden';
      }
    },
    sendSms() {
      console.log(this.sms);
    },
    async infiniteHandler($state) {
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
    hiddenReply() {
      let replyBox = document.getElementById('reply-mess');
      replyBox.style.visibility = 'hidden';
    },
  },
};
