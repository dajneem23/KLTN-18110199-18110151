import { CommentServices } from '@/services';
import { mapState } from 'vuex';
export default {
  props: {
    data: Object,
    sourceId: String,
    flag: String,
    isReply: Boolean,
  },
  data() {
    return {
      isDeleted: false,
      isMe: false,
      isEdit: false,
      newCmt: '',
      cmt: {
        source_id: '',
        type: 'stories',
        content: '',
        images: [],
        reply_to: this.data.id,
      },
      replies: [],
      up_votes: [],
      down_votes: [],
      isVoteUp: false,
      isVoteDown: false,
      vote: 0,
    };
  },
  computed: {
    ...mapState(['userInfo', 'isAuthenticated', 'isPage']),
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
    this.up_votes = this.data.up_votes;
    this.down_votes = this.data.down_votes;
    // console.log(this.data);
    console.log(this.userInfo);
    if (this.author.id === this.userInfo._id) {
      this.isMe = true;
      return;
    }
  },
  created() {
    if (this.data)
      Object.keys(this.data).map((key) => {
        if (key == '_v') return;
        this[key] = this.data[key];
      });
  },
  methods: {
    repCmt() {
      const repCmtBox = document.getElementById(this.flag + this.data.id);
      if (repCmtBox.style.display == 'none') {
        repCmtBox.style.display = 'flex';
      } else {
        repCmtBox.style.display = 'none';
      }
    },
    editCmt() {
      this.isEdit = true;
    },
    closeEditCmt() {
      this.isEdit = false;
      this.newCmt = '';
      console.log('cancel');
    },
    async updateCmt(id) {
      const [result, error] = await CommentServices.update(id, {
        content: this.newCmt,
      });
      if (result) {
        this.isEdit = false;
      }
      this.content = this.newCmt;
      console.log(this.cmt.content);
    },
    async deleteCmt(id) {
      const cmt_box = document.getElementById(id);
      console.log(id);
      const [result, error] = await CommentServices.delete(id);
      if (result) {
        this.isEdit = false;
      }
      cmt_box.style.display = 'none';
    },
    async sendRepCmt() {
      this.cmt.source_id = this.sourceId;
      const result = await CommentServices.comment({
        ...this.cmt,
      });
      this.replies.push({
        ...result[0],
        author: {
          ...this.userInfo,
        },
      });
      console.log(result[0]);
      const repCmtBox = document.getElementById(this.flag + this.data.id);
      if (repCmtBox.style.display == 'none') {
        repCmtBox.style.display = 'flex';
      } else {
        repCmtBox.style.display = 'none';
      }
      this.cmt.content = '';
    },
    async upvote(id) {
      this.isVoteUp = true;
      this.isVoteDown = false;
      const [up_votes] = await CommentServices.upvote(id);
      this.up_votes = up_votes.up_votes;
      this.down_votes = up_votes.down_votes;
      console.log(up_votes);
    },
    async downvote(id) {
      this.isVoteUp = false;
      this.isVoteDown = true;
      const [down_votes] = await CommentServices.downvote(id);
      this.down_votes = down_votes.down_votes;
      this.up_votes = down_votes.up_votes;
      console.log(up_votes, down_votes);
    },
  },
};
