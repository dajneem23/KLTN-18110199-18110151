import BoxChatting from '../../components/Chat/BoxChatting/index.vue';
import { ChatsServices } from '@/services';
export default {
  components: {
    BoxChatting,
  },
  data() {
    return {
      listChat: [],
      idChat: '',
      sms: '',
    };
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
    const [
      { items = [], total_count } = {
        items: [],
      },
      error,
    ] = await ChatsServices.get();
    this.listChat = items;
    console.log(this.listChat);
    this.total_count = total_count;
    this.idChat = this.listChat[0].id;
    console.log(this.idChat, 'mouted');
  },
  methods: {
    getChat(id) {
      this.idChat = id;
      console.log(this.idChat);
    },
  },
};
