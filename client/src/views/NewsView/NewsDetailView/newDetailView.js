import CKEditor from '../../../components/Ckeditor/CkEditor.vue';
import CardNews from '../../../components/CardNews/index.vue';
import Commentfilm from '../../../components/Watching/CommentFilm/index.vue';
import { LIST_FILM } from '../../../constants/listfilm';
export default {
  components: {
    CKEditor,
    CardNews,
    Commentfilm,
  },
  data() {
    return {
      scTimer: 0,
      scY: 0,
      LIST_FILM,
    };
  },
  mounted() {
    window.addEventListener('scroll', this.handleScroll);
  },
  methods: {
    handleScroll: function () {
      if (this.scTimer) return;
      this.scTimer = setTimeout(() => {
        this.scY = window.scrollY;
        clearTimeout(this.scTimer);
        this.scTimer = 0;
      }, 200);
    },
    toTop: function () {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    },
    goToCmtBox() {
      const element = document.getElementById('cmt');
      element.scrollIntoView();
    },
    upVote() {
      console.log('Up Vote');
    },
    unVote() {
      console.log('Un Vote');
    },
    addWishList() {
      console.log('Add wish');
    },
  },
};
