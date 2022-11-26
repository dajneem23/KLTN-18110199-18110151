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
        username: '',
        phone: '094100117  ',
      },
      passWordConfirm: '',
    };
  },
  methods: {
    fullnameValidate() {
      REGISTER_ITEM.name.error = '';
      if (!this.account.username.trim()) {
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
        REGISTER_ITEM.passWord.error = 'Passworld is required';
      }
    },
    passWorldConfirmValidate() {
      REGISTER_ITEM.passWordConfirm.error = '';
      if (!this.passWordConfirm.trim()) {
        REGISTER_ITEM.passWordConfirm.error = 'Confirm password is required';
        return;
      }
      if (this.account.password != this.passWordConfirm) {
        REGISTER_ITEM.passWordConfirm.error = 'Confirm password is not match';
      }
      console.log(REGISTER_ITEM.passWordConfirm.error);
    },
    validate() {
      this.fullnameValidate();
      this.usernameValidate();
      this.passwordValiate();
      this.passWorldConfirmValidate();
    },
    async register() {
      this.validate();
      console.log({ AuthService });
      const [result, error] = await AuthService.register(this.account);
      console.log([result, error]);
      if (result) {
        console.log('Đăng ký thành công !');
        const { user } = result;
        console.log(user);
      }
      console.log(this.account);
    },
  },
};
