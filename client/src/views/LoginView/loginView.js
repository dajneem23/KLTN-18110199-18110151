import { LOGIN_ITEM } from '../../constants/loginpage';
import Toastify from '../../components/ToastifyCustom/index.vue';
import { AuthService } from '@/services';
import { mapState } from 'vuex';
import axios from 'axios';
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
    async googleLogin() {
      try {
        const client = google.accounts.oauth2.initTokenClient({
          client_id: '239259098538-f5psal7n3msj632vps7fb5c47ecloqi0.apps.googleusercontent.com',
          scope: 'profile email',
          ux_mode: 'popup',
          callback: async (response) => {
            console.log({ response });
            if (response.access_token) {
              const [result, error] = await AuthService.googleLogin({
                token: response.access_token,
              });
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
            }
          },
        });
        client.requestAccessToken();
      } catch (error) {
        console.log(error);
      }
    },
  },
};
