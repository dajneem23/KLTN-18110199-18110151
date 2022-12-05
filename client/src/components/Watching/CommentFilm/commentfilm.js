import { CommentServices } from '@/services';
export default {
  props: {
    data: Object,
    sourceId: String,
    flag:String,
  },
  data() {
    return {
      cmt: {
        source_id: '',
        type: 'stories',
        content: '',
        images: [],
        reply_to: this.data.id,
      },
      replies: [],
    };
  },
  watch: {
    data(newData) {
      if (newData)
        Object.keys(newData).map((key) => {
          if (key == '_v') return;
          this[key] = newData[key];
        });
    },
  },
  mounted() {
    // console.log(this.data);
  },
  created() {
    if (this.data)
      Object.keys(this.data).map((key) => {
        if (key == '_v') return;
        this[key] = this.data[key];
      });
  },
  methods: {
    likeCmt() {
      console.log('Like like');
    },
    repCmt() {
      const repCmtBox = document.getElementById(this.flag);
      if (repCmtBox.style.display == 'none') {
        repCmtBox.style.display = 'flex';
      } else {
        repCmtBox.style.display = 'none';
      }
    },
    async sendRepCmt() {
      this.cmt.source_id = this.sourceId;
      const result = await CommentServices.comment({
        ...this.cmt,
      });
      this.replies.push(result[0]);
      const repCmtBox = document.getElementById(this.flag);
      if (repCmtBox.style.display == 'none') {
        repCmtBox.style.display = 'flex';
      } else {
        repCmtBox.style.display = 'none';
      }
      this.cmt.content = '';
    },
  },
};
