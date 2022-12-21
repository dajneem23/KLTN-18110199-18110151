import InfiniteLoading from 'vue-infinite-loading';
import Messenge from '../Messenge/index.vue';
import { ChatsServices } from '@/services';
import { mapState } from 'vuex';
import { store } from '../../../store/vuex';
import socketClient from '@/socket';
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
      users: [
        {
          id: 0
        },
        {
          id: 1
        }
      ],
    };
  },
  computed: {
    ...mapState(['userInfo', 'isAuthenticated']),
  },
  props: {
    dataChat: String,
  },
  components: {
    Messenge,
    // InfiniteLoading,
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
    await this.loadChat();
    console.log({
      socketClient,
    });
    socketClient.listen('new_message', (data) => {
      console.log('new_message');
      this.loadChat();
    });
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
      if (!this.sms.content || !this.sms.content.length) return;
      const [result, error] = await ChatsServices.createMessage(this.chat.id, {
        content: this.sms.content,
      });
      this.sms.content = '';
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
      // this.posts.push(...this.messages);
      this.page++;
      $state.loaded();
      $state.complete();
    },
    hiddenReply() {
      let replyBox = document.getElementById('reply-mess');
      replyBox.style.visibility = 'hidden';
    },
    async loadChat() {
      const [result, error] = await ChatsServices.getChatById(this.dataChat);
      if (result) {
        this.posts = result.messages;
        this.chat = result;
        console.log(this.posts);
        socketClient.send('join', {
          room: this.chat.id,
        });
        this.users = result.users;
      }
    },
  },
};
