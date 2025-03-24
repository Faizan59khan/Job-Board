import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import { router } from './router';
import { requestForToken, onMessageListener } from "./firebase";

requestForToken().then((token) => {
    console.log("Token received:", token);
    localStorage.setItem("fcmToken", token);
});

onMessageListener().then((payload) => {
    console.log("Foreground notification received:", payload);
    alert(payload.notification.title + ": " + payload.notification.body);
});


const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')
