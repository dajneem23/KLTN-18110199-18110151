import Messenge from '../Messenge/index.vue';
export default {
  data() {
    return {
      sms:'',
    }
  },
  components: {
    Messenge,
  },
  methods: {
    showEmojiBox() {
      const boxEmoji = document.getElementById('box-emoji');
      if ((boxEmoji.style.visibility == 'hidden')) {
        boxEmoji.style.visibility = 'visible';
      } else {
        boxEmoji.style.visibility = 'hidden';
      }
    },
    sendSms() {
      console.log(this.sms);
    },
  },
};
