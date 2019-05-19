import Vue from 'vue';
import Router from 'vue-router';
import App from '@/App';
import LoginPage from '@/components/main/LoginPage';
import CashList from '@/components/main/CashList';
import StatisticPage from '@/components/main/StatisticPage';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'app',
      component: App,
      children: [
        {path: 'cash', name: 'cash', component: CashList},
        {path: 'statistic', name: 'statistic', component: StatisticPage},
        {path: 'login', name: 'login', component: LoginPage}
      ]
    },
  ],
});
