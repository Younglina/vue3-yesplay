import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router/index'
import './style.scss'

import 'virtual:svg-icons-register'
import svgIcon from './components/SvgIcon.vue'
import divide from './components/Divide.vue'
import Message from './components/Message'

const app = createApp(App)
app.component('SvgIcon', svgIcon)
app.component('Divide', divide)

app.use(Message)
app.use(router)
app.use(createPinia())
app.mount('#app')
