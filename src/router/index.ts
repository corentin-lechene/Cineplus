import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import Home from "@/views/Home/Home.vue";

//todo create navigation guard
const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    component: Home,
  },
  {
    path: '/intro',
    component: () => import('@/views/Intro/Intro.vue')
  },
  // {
  //   path: '/subscriptions',
  //   component: () => import('@/views/Intro/Subscriptions')
  // },
  // {
  //   path: '/movie/:id',
  //   component: () => import('@/views/Intro/Movie.vue')
  // },
  // {
  //   path: '/settings',
  //   component: () => import('@/views/Intro/Settings.vue')
  // }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
