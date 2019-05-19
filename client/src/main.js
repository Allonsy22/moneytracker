import Vue from 'vue';
import App from './App.vue';

import Vuetify from 'vuetify';
import VueApexCharts from 'vue-apexcharts';

import 'vuetify/dist/vuetify.min.css';
import '@fortawesome/fontawesome-free/css/all.css';


import router from './router';
import store from '@/store';

const icons = {
  'food': 'fas fa-utensils',
  'medicine': 'fas fa-notes-medical',
  'transport': 'fas fa-road',
  'fun': 'fas fa-headphones',
  'shopping': 'fas fa-shopping-cart',
  'other': 'fas fa-shapes',
  'hryvnia': 'fas fa-hryvnia',
  'coins': 'fas fa-coins',
  'peoples': 'fas fa-users',
  'work': 'work',
  'pieChart': 'pie_chart',
  'list': 'list_alt',
  'delete': 'delete',
  'login': 'fas fa-sign-in-alt',
  'logout': 'fas fa-sign-out-alt',
  'user' : 'assignment_ind'
}

Vue.use(Vuetify, {
  iconfont: 'fa',
  icons: icons
});

Vue.use(VueApexCharts)
Vue.component('apexchart', VueApexCharts)

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
