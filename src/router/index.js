import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  { path: '/', name: 'Home', component: () => import('@/views/home.vue') },
  { path: '/explore', name: 'Explore', component: () => import('@/views/explore.vue') },
  { path: '/musicLibrary', name: 'MusicLibrary', component: () => import('@/views/musicLibrary.vue') },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})
export default router
