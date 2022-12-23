import moment from 'moment';
import { mapActions, mapState } from 'vuex';
export default {
  props: {
    data: Object,
  },
  data() {
    return {
      reacts: [],
      name: '',
      image:{},
    };
  },
  computed: {
    ...mapState(['urlStrapiServe']),
  },
  watch: {
    data(newData) {
      if (newData)
        Object.keys(newData).map((key) => {
          if (key == '_v') return;
          this[key] = newData[key];
          console.log(this[key])
        });
    },
  },
  mounted() {},
  created() {
    if (this.data)
      Object.keys(this.data).map((key) => {
        if (key == '_v') return;
        this[key] = this.data[key];
      });
  },
  methods: {
    moment,
  },
};
