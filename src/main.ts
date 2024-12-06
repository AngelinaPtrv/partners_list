import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'

import '@/assets/scss/_root.scss'
import 'bootstrap/dist/js/bootstrap.js'

const app = createApp(App)

app.use(createPinia())

app.mount('#app')
