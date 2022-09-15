import { REGISTER_ITEM } from '../../constants/registerpage';
export default {
  name: 'LoginView',
  data() {
    return {
      lang: 'vi',
      REGISTER_ITEM,
      account: {
        username: '',
        password: '',
        fullName: '',
      },
    };
  },
  methods: {
    fullnameValidate() {
      REGISTER_ITEM.fullName.error = '';
      if (!this.account.fullname) {
        REGISTER_ITEM.fullName.error = 'Fullname is required';
      }
    },
    usernameValidate() {
      REGISTER_ITEM.userName.error = '';
      if (!this.account.username) {
        REGISTER_ITEM.userName.error = 'Username is required';
      }
    },
    passwordValiate() {
      REGISTER_ITEM.passWord.error = '';
      if (!this.account.password) {
        REGISTER_ITEM.passWord.error = 'Password is required';
      }
    },
    validate() {
      this.fullnameValidate();
      this.usernameValidate();
      this.passwordValiate();
    },
    register() {
      this.validate();
      console.log(REGISTER_ITEM.userName.error);
      console.log(REGISTER_ITEM.passWord.error);
      console.log(this.account);
    },
  },
};
