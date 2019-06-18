import Vue from 'vue';
import Router from 'vue-router';
import ExchangePage from './views/ExchangePage.vue';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'exchange',
      component: ExchangePage,
    },
  ],
});
