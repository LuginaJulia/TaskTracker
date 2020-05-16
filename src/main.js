import Vue from 'vue'
import App from './App.vue'
import router from './router';
import store from './store';
// import VueSocketIO from 'vue-socket.io';
// import SocketIO from "socket.io-client";

import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import VeeValidate from 'vee-validate';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import {
  faPlus,
  faList,
  faHome,
  faUser,
  faUserPlus,
  faSignInAlt,
  faSignOutAlt
} from '@fortawesome/free-solid-svg-icons';

library.add(faHome, faUser, faUserPlus, faSignInAlt, faSignOutAlt, faPlus, faList);

Vue.config.productionTip = false;

Vue.use(VeeValidate);
import VueSocketio from 'vue-socket.io-extended';
import io from 'socket.io-client';
Vue.component('font-awesome-icon', FontAwesomeIcon);
Vue.use(VueSocketio, io('http://localhost:3000').connect());
// import VueSocketIO from 'vue-socket.io-extended'
// const options = { }; //Options object to pass into SocketIO

// Vue.use(new VueSocketIO({
//   debug: true,
//   connection: SocketIO('http://localhost:3000', options), //options object is Optional
//   vuex: {
//     store,
//     actionPrefix: 'SOCKET_',
//     mutationPrefix: 'SOCKET_'
//   }
// }))  

new Vue({
  router,
  store,
  sockets:{
    connect() {
      console.log(this.$socket);
      console.log("socket connected...");      
    },
    disconnected() {
      console.log("socket disconnected...")
    }
  },
  render: h => h(App)
}).$mount('#app');

