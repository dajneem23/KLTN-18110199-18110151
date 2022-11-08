export default {
  props: {
    data: Array,
  },
  data() {
    return {
      cmt: '',
    };
  },
  mounted() {
    console.log(data);
  },
  methods: {
    likeCmt() {
      console.log('Like like');
    },
    repCmt() {
      const repCmtBox = document.getElementById('cmtRep-write');
      console.log('rep');
      if (repCmtBox.style.display == 'none') {
        repCmtBox.style.display = 'flex';
      } else {
        repCmtBox.style.display = 'none';
      }
    },
    sendCmt() {},
  },
};
