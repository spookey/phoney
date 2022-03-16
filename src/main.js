import {
  faFax,
  faPaintBrush,
  faPhone,
  faSms,
  faTrash,
} from '@fortawesome/free-solid-svg-icons';
import {
  faSkype,
  faViber,
  faWhatsapp,
} from '@fortawesome/free-brands-svg-icons';

import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

import Vue from 'vue';
import App from './App.vue';

library.add(
  faFax,
  faPaintBrush,
  faPhone,
  faSkype,
  faSms,
  faTrash,
  faViber,
  faWhatsapp,
);
Vue.component('FaIcon', FontAwesomeIcon);

Vue.config.productionTip = false;

new Vue({
  render: (h) => h(App),
}).$mount('#app');
