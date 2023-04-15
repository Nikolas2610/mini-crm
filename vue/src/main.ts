import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'
import './style.css'
// Toast notifications
import Toast from "vue-toastification";
import { options } from './plugins/notifications';
import "vue-toastification/dist/index.css";

const pinia = createPinia()

createApp(App)
    .use(pinia)
    .use(router)
    .use(Toast, options)
    .mount('#app')
