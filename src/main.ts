import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store/index';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

//FontAwesome Icons
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

//Add icons to library
import { faTimes, faMinusCircle } from '@fortawesome/free-solid-svg-icons';
library.add(faTimes);
library.add(faMinusCircle);

//Registering fontawesome component
Vue.component('font-awesome-icon', FontAwesomeIcon);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
