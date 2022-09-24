import { LOGIN_ITEM } from '../../constants/loginpage';
export default {
  name: 'LoginView',
  data() {
    return {
      lang: 'vi',
      LOGIN_ITEM,
      account: {
        username: '',
        password: '',
      },
    };
  },
  methods: {
    usernameValidate() {
      LOGIN_ITEM.userName.error = '';
      if (!this.account.username) {
        LOGIN_ITEM.userName.error = 'Username is required';
      }
    },
    passwordValiate() {
      LOGIN_ITEM.passWord.error = '';
      if (!this.account.password) {
        LOGIN_ITEM.passWord.error = 'Password is required';
      }
    },
    validate() {
      this.usernameValidate();
      this.passwordValiate();
    },
    login() {
      this.validate();
      console.log(LOGIN_ITEM.userName.error);
      console.log(LOGIN_ITEM.passWord.error);
      console.log(this.account);
    },
  },
};
