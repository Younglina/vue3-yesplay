import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  { path: '/', name: 'Home', component: () => import('@/views/home.vue') },
  { path: '/explore', name: 'Explore', component: () => import('@/views/explore.vue') },
  { path: '/musicLibrary', name: 'MusicLibrary', component: () => import('@/views/musicLibrary.vue') },
  { path: '/playlist/:id', name: 'playlist', component: () => import('@/views/playlist.vue') },
  { path: '/album/:id', name: 'album', component: () => import('@/views/album.vue') },
  { path: '/artist/:id', name: 'artist', component: () => import('@/views/artist.vue') },
  { path: '/curList', name: 'curList', component: () => import('@/views/curList.vue') },
  { path: '/test', name: 'Test', component: () => import('@/views/test.vue') },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})
export default router
