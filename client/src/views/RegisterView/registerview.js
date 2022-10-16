import { REGISTER_ITEM } from '../../constants/registerpage';
import { AuthService } from '@/services';
export default {
  name: 'LoginView',
  data() {
    return {
      lang: 'vi',
      REGISTER_ITEM,
      account: {
        email: '',
        password: '',
        name: '',
        phone:'094100117  '
      },
    };
  },
  methods: {
    fullnameValidate() {
      REGISTER_ITEM.name.error = '';
      if (!this.account.name.trim()) {
        REGISTER_ITEM.name.error = 'Name is required';
      }
    },
    usernameValidate() {
      REGISTER_ITEM.email.error = '';
      if (!this.account.email.trim()) {
        REGISTER_ITEM.email.error = 'Email is required';
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
    async register() {
      this.validate();
      console.log({ AuthService });
      const [result, error] = await AuthService.register(this.account);
      console.log([result, error]);
      if (result) {
        console.log('Đăng ký thành công !');
        const { user } = result;
        console.log(user)

      }
      console.log(this.account);
    },
  },
};
