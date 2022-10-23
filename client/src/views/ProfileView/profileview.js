import { mapState } from 'vuex';
import { store } from '../../store/vuex';
export default {
  computed: {
    ...mapState(['userInfo', 'isAuthenticated']),
  },
  methods: {
    openCity(cityName, idButton) {
      var i;
      var x = document.getElementsByClassName('news');
      for (i = 0; i < x.length; i++) {
        x[i].style.display = 'none';
      }
      document.getElementById(cityName).style.display = 'block';
      document.getElementById(idButton).classList.add('active-btn');
      if (idButton === 'myNews') {
        document.getElementById('myWish').classList.remove('active-btn');
      } else {
        document.getElementById('myNews').classList.remove('active-btn');
      }
    },
  },
};
