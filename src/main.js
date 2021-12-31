import { createApp } from 'vue'
import App from './App.vue'

import { store } from './store/index.js'
import router from './router/index.js'
import 'element-plus/dist/index.css'
import 'vue-slider-component/theme/default.css'
//svg配置
import 'virtual:svg-icons-register'
import svgIcon from './components/SvgIcon.vue'
import svgButton from './components/SvgButton.vue'

const app = createApp(App)
app.component('svg-icon', svgIcon)
app.component('svg-button', svgButton)
app.use(router).use(store).mount('#app')

// const win = window
// if (process.env.NODE_ENV === 'development') {
//   if ('__VUE_DEVTOOLS_GLOBAL_HOOK__' in win) {
//     win.__VUE_DEVTOOLS_GLOBAL_HOOK__.Vue = app
//   }
// }
