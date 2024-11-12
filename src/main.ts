import './assets/main.scss'
import './assets/tailwind.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import API from './utils/API'
import Cookies from './utils/Cookies'

const environment = import.meta.env?.PROD ? 'prod' : 'dev';
console.log('currently running in', environment);

if (environment == 'prod')
    Cookies.Domain = "cametek.jp"

const app = createApp(App)

app.use(router)
app.mount('#app')

if (Cookies.Get('token'))
    API.RefreshInfo();
else // clean up regardless
    API.Logout();