import { LOGIN_ITEM } from '../../constants/loginpage';
import Toastify from '../../components/ToastifyCustom/index.vue';
import { AuthService } from '@/services';
import { mapState } from 'vuex';
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
      isSuccess: false,
      isWarnning: false,
    };
  },
  components: {
    Toastify,
  },
  computed: {
    ...mapState(['userInfo']),
  },
  methods: {
    usernameValidate() {
      LOGIN_ITEM.userName.error = '';
      if (!this.account.username.trim()) {
        LOGIN_ITEM.userName.error = 'Username is required';
      }
    },
    passwordValidate() {
      LOGIN_ITEM.passWord.error = '';
      if (!this.account.password.trim()) {
        LOGIN_ITEM.passWord.error = 'Password is required';
      }
    },
    validate() {
      this.usernameValidate();
      this.passwordValidate();
    },
    async login() {
      this.validate();
      console.log({ AuthService });
      const [result, error] = await AuthService.login({
        loginId: this.account.username,
        password: this.account.password,
      });
      console.log([result, error]);
      if (result) {
        this.isSuccess = true;
        const { user } = result;
        this.$store.commit('setUserInfo', user);
        this.$store.commit('setIsAuthenticated', true);
        console.log(this.$store.state.isAuthenticated);
        setTimeout(() => {
          this.isSuccess = false;
          this.$router.push('/');
        }, 2000);
      } else {
        this.isWarnning = true;
        setTimeout(() => {
          this.isWarnning = false;
        }, 2000);
      }
      
    },
  },
};
