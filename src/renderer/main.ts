
import { createApp } from 'vue'

import App from './App.vue'
const app = createApp(App)
import 'virtual:uno.css'

import './css/index.less';
import { router } from './router';

app.use(router)
app.mount('#app')


