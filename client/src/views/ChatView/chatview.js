import BoxChatting from '../../components/Chat/BoxChatting/index.vue';
export default {
  components: {
    BoxChatting,
  },
  data() {
    return {
      sms: '',
      
    };
  },
  mounted() {
    let panel = document.getElementById('chat-panel');
    panel.scrollTop = panel.scrollHeight;
  },
  methods: {},
};
