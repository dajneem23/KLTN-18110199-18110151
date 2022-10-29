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
        passworld: '',
        passWorldConfirm:''
,        name: '',
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
        REGISTER_ITEM.passWord.error = 'Passworld is required';
      }
    },
    passWorldConfirmValidate() {
      REGISTER_ITEM.passWorldConfirm.error = '';
      if (!this.account.passWorldConfirm.trim()) {
        REGISTER_ITEM.passWorldConfirm.error = 'Confirm passworld is required';
        return
      }
      if (this.account.passWorld != this.account.passWorldConfirm)
      {
        REGISTER_ITEM.passWorldConfirm.error = 'Confirm passworld is not match';  
      }
      console.log(REGISTER_ITEM.passWorldConfirm.error)
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
        console.log(user)

      }
      console.log(this.account);
    },
  },
};
