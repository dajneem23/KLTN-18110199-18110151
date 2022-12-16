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
      messages: [],
      users:[],
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
        this.users = result.users;
        this.chat = result;
      }
      // console.log(result, 'result');
    },
  },
  async mounted() {
    const [result, error] = await ChatsServices.getChatById(this.dataChat);
    if (result) {
      this.posts = result.messages;
    }
    this.users = result.users;
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
    async sendSms() {
      const [result, error] = await ChatsServices.createMessage(this.chat.id, {
        content: this.sms.content,
      });
      console.log(result);
      console.log(this.sms.content);
      console.log(this.chat.id);
    },
    async infiniteHandler($state) {
      const [result, error] = await ChatsServices.getChatById(this.dataChat);
      if (!result.messages.length) {
        $state.complete();
      }
      // this.messages = result.messages
      this.posts.push(...this.messages);
      this.page++;
      $state.loaded();
      $state.complete();
    },
    hiddenReply() {
      let replyBox = document.getElementById('reply-mess');
      replyBox.style.visibility = 'hidden';
    },
  },
};
