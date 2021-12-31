import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '@/views/home.vue'
import Login from '@/views/login.vue'
import PlayList from '@/views/playList.vue'
import DailySonglist from '@/views/dailySonglist.vue'
import test from '@/views/test.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    meta: {
      name: '首页',
      id: 'Home',
    },
    component: Home,
  },
  {
    path: '/playList/:id',
    name: 'PlayList',
    component: PlayList,
  },
  {
    path: '/dailySonglist',
    name: 'DailySonglist',
    component: DailySonglist,
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
  },
  {
    path: '/test',
    name: 'test',
    meta: {
      name: 'test',
      id: 'test',
    },
    component: test,
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

export default router
