import {
  faFax,
  faPaintBrush,
  faPhone,
  faPhoneFlip,
  faSms,
  faTrash,
} from '@fortawesome/free-solid-svg-icons';
import {
  faSignalMessenger,
  faSkype,
  faViber,
  faWhatsapp,
} from '@fortawesome/free-brands-svg-icons';

import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

import { createApp } from 'vue';
import settingsLoader from './settings';
import App from './App.vue';

library.add(
  faFax,
  faPaintBrush,
  faPhone,
  faPhoneFlip,
  faSignalMessenger,
  faSkype,
  faSms,
  faTrash,
  faViber,
  faWhatsapp,
);

settingsLoader()
  .then((settings) => createApp(App)
    .component('FaIcon', FontAwesomeIcon)
    .use(settings)
    .mount('#app'))
  .catch(console.error);
