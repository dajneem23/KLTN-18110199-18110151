export default {
  data() {
    return {
      author: {
        avatar: [
          {
            url: 'https://www.gravatar.com/avatar/default?s=200&d=mp',
          },
        ],
      },
    };
  },
  props: {
    sms: Object,
    friendSms: Boolean,
    mySms: Boolean,
  },
  methods: {},
  mounted() {
    console.log(this.sms);
  },
};
