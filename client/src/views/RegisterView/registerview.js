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
        fullname: '',
      },
    };
  },
  methods: {
    fullnameValidate() {
      REGISTER_ITEM.fullName.error = '';
      if (!this.account.fullname.trim()) {
        REGISTER_ITEM.fullName.error = 'Fullname is required';
      }
    },
    usernameValidate() {
      REGISTER_ITEM.userName.error = '';
      if (!this.account.username.trim()) {
        REGISTER_ITEM.userName.error = 'Username is required';
      }
    },
    passwordValiate() {
      REGISTER_ITEM.passWord.error = '';
      if (!this.account.password.trim()) {
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
      console.log(REGISTER_ITEM.fullName.error);
      console.log(this.account);
    },
  },
};
