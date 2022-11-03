export default {
  data() {
    return {
      cmt: '',
    };
  },
  methods: {
    likeCmt() {
      console.log('Like like');
    },
    repCmt() {
      const repCmtBox = document.getElementById('cmtRep-write');
      console.log('rep');
      if ((repCmtBox.style.display == 'none')) {
        repCmtBox.style.display = 'flex';
      } else {
        repCmtBox.style.display = 'none';
      }
    },
    sendCmt() {},
  },
};
