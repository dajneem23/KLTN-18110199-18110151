import InfiniteLoading from 'vue-infinite-loading';
import Messenge from '../Messenge/index.vue';
import { ChatsServices } from '@/services';

export default {
  data() {
    return {
      chat: {},
      sms: {
        source_id: '',
        content: '',
        reply_to: null,
      },
      posts: [],
      page: 1,
      per_page: 10,
      icon: '&#128512;',
    };
  },
  props: {
    dataChat: String,
  },
  components: {
    Messenge,
    InfiniteLoading,
  },
  watch: {
    async dataChat() {
      this.$emit('update:dataChat', this.dataChat);
      const [result, error] = await ChatsServices.getChatById(this.dataChat);
      if (result) {
        this.posts = result.messages;
        this.chat = result;
      }
      console.log(result, 'result');
    },
  },
  async mounted() {
    const [result, error] = await ChatsServices.getChatById(this.dataChat);
    if (result) {
      this.posts = result.messages;
    }
    console.log(this.posts);
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
      if (!this.chat.messages.length) {
        $state.complete();
      }
      this.posts.push(...this.chat.messages);
      this.page++;
      $state.loaded();
      console.log(this.posts);
    },
    hiddenReply() {
      let replyBox = document.getElementById('reply-mess');
      replyBox.style.visibility = 'hidden';
    },
  },
};
