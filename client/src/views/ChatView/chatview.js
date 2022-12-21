import BoxChatting from '../../components/Chat/BoxChatting/index.vue';
import { ChatsServices } from '@/services';
import { mapState } from 'vuex';
import { store } from '../../store/vuex';
export default {
  components: {
    BoxChatting,
  },
  data() {
    return {
      listChat: [],
      idChat: '',
      sms: '',
      isChangeMessage: false,
      items: [],
    };
  },
  computed: {
    ...mapState(['userInfo', 'isAuthenticated']),
  },
  // async created() {
  //   const [
  //     { items = [], total_count } = {
  //       items: [],
  //     },
  //     error,
  //   ] = await ChatsServices.get();
  //   this.listChat = items;
  //   console.log(this.listChat);
  //   this.total_count = total_count;
  //   console.log('created');
  // },
  async mounted() {
    await this.loadChat();
    // console.log(items);
    // this.total_count = total_count;
    // console.log(this.idChat, 'mouted');
  },
  methods: {
    async getChat(id) {
      this.idChat = id;
      // console.log(this.idChat);
      this.isChangeMessage = true;
      console.log(this.isChangeMessage);
      let chat_active = document.getElementsByClassName('friend-drawer').forEach((item) => {
        if (item.id === id) {
          item.classList.add('active-chat');
        } else {
          item.classList.remove('active-chat');
        }
      });
      // chat_active.array.forEach((item) => {
      //   if (item.id === id) {
      //     item.classList.add('active-chat');
      //   } else {
      //     item.classList.remove('active-chat');
      //   }
      // });
    },
    async changeTypeAll() {
      // console.log(this.listChat);
      await this.loadChat();
    },
    async loadChat() {
      const [
        { items = [], total_count } = {
          items: [],
        },
        error,
      ] = await ChatsServices.get({
        page: 1,
        per_page: 9999,
      });
      this.listChat = items;
      this.total_count = total_count;
      this.idChat = this.listChat[0].id;
    },
    changeTypeWait() {
      this.listChat = [];
    },
  },
};
