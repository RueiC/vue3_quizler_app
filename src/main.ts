import { createApp } from 'vue';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import {
  faCircleCheck,
  faTrashCan,
  faCircleXmark,
  faCircleExclamation,
} from '@fortawesome/free-solid-svg-icons';
import AOS from 'aos';

import App from './App.vue';
import Toast, { POSITION } from 'vue-toastification';
import type { PluginOptions } from 'vue-toastification';
import router from './router';
import { store } from './store';
import 'aos/dist/aos.css';
import './style.css';
import './includes/validator';
import 'vue-toastification/dist/index.css';

const toastOptions: PluginOptions = {
  position: POSITION.TOP_CENTER,
  timeout: 5000,
  closeOnClick: true,
  pauseOnFocusLoss: true,
  pauseOnHover: true,
  draggable: true,
  draggablePercent: 0.6,
  showCloseButtonOnHover: false,
  hideProgressBar: true,
  closeButton: 'button',
  icon: true,
  rtl: false,
};

AOS.init({
  // Settings that can be overridden on per-element basis, by `data-aos-*` attributes:
  offset: 400, // offset (in px) from the original trigger point
  delay: 100, // values from 0 to 3000, with step 50ms
  duration: 700, // values from 0 to 3000, with step 50ms
  easing: 'ease-in-out', // default easing for AOS animations
  anchorPlacement: 'top-center', // defines which position of the element regarding to window should trigger the animation
});
library.add(faCircleCheck, faTrashCan, faCircleExclamation, faCircleXmark);

const app = createApp(App);
app.use(store);
app.use(router);
app.use(Toast, toastOptions);
app.component('font-awesome-icon', FontAwesomeIcon);
app.mount('#app');
