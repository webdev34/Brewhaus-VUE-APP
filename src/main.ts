import './assets/css/main.css';
import FontAwesomeIcon from './plugins/fontawesome';

import { createApp } from 'vue';
import App from './App.vue';
import router from './router';

const app = createApp(App);
app.component('font-awesome-icon', FontAwesomeIcon);
app.use(router);
app.mount('#app');
