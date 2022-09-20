export default {
  name: 'DropdownCus',
  props: {
    data: Object,
    propsFilter: String,
  },
  data() {
    return {
      lang: 'vi',
    };
  },
  methods: {
    setValue(value) {
      // propsFilter = value;
      console.log(value);
    },
  },
};
