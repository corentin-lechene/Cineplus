import {createRouter, createWebHistory} from '@ionic/vue-router';
import {RouteRecordRaw} from 'vue-router';
import Home from "@/views/Home/Home.vue";
import {isConfigured} from "@/router/guards";

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
  {
    path: '/movie-details/:id',
    component: () => import('@/views/MovieDetails/MovieDetails.vue')
  },
  {
    path: '/search-movie',
    component: () => import('@/views/SearchMovie/SearchMovie.vue')
  },
  {
    path: '/settings',
    component: () => import('@/views/Settings/Settings.vue')
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
});

router.beforeEach(isConfigured());

export default router
